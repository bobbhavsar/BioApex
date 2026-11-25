// USABOguide: USABO Finalist & IBO exam prep application core
// Enhanced Interactive Learning Engine v2
import { DOMAINS, TRACK_MODULES } from './data/curriculum.js';
import { getLessonFigure } from './data/lessonFigures.js';
import { QUIZ_SETS } from './data/quizBank.js';
import { UNIT_TEST_SETS } from './data/unitTests.js';
import { 
  renderLineweaverBurkSimulator, 
  renderGhkActionPotentialSimulator, 
  renderThreePointCrossMapper,
  renderWiggersDiagramExplorer
} from './components/simulators.js';
import {
  createETCInteractiveModel,
  createEnzymeCatalyticCycleModel,
  createNavChannelMolecularModel,
  createKranzAnatomyModel,
  createSignalingCascadeModel,
  createKokCycleInteractiveModel,
  createTraffickingSnareModel,
  createCellCycleApoptosisModel,
  createPlantHydraulicsModel,
  createAuxinPolarTransportModel,
  createRenalCountercurrentDavenportModel,
  createPopGenSelectionModel,
  createLotkaVolterraModel,
  createKinSelectionGameTheoryModel,
  createCladisticsParsimonyModel,
  createDNAReplicationForkModel,
  createMicrobiologyModel,
  createBiotechPCRModel,
  createPlantAnatomyModel,
  createDoubleFertilizationModel,
  createDigestionModel,
  createOxyHbDissociationModel,
  createImmuneResponseModel,
  createEmbryologyModel,
  createEndocrineAxisModel,
  createEpistasisModel,
  createGeneRegulationModel,
  createEcosystemEnergyModel,
  createPredatorPreyModel,
  createEthologyBehaviorModel
} from './components/interactiveIllustrations.js';
import {
  RANK_TIERS,
  getRankTier,
  EXAMINER_TRAPS,
  WHAT_IF_EXPERIMENTS,
  FLASHCARD_SETS,
  triggerCelebrationConfetti
} from './components/learningEngine.js';
import {
  formatLessonContent,
  extractKeyTerms,
  toPlainText,
  seededShuffle
} from './components/lessonContent.js';

// Modules that ship a canvas-based interactive model. Modules added later for
// syllabus coverage are text + checkpoint lessons, so their model tab is hidden.
const INTERACTIVE_MODEL_IDS = new Set([
  'cell-1-kinetics', 'cell-2-chemiosmosis', 'cell-3-signaling', 'cell-4-trafficking',
  'cell-5-checkpoints-apoptosis', 'cell-6-molecular-genetics', 'cell-7-microbiology', 'cell-8-biotechnology',
  'plant-1-hydraulics', 'plant-2-photochemistry', 'plant-3-c4-cam', 'plant-4-hormones',
  'plant-5-anatomy', 'plant-6-reproduction',
  'animal-1-neuro', 'animal-2-cardio', 'animal-3-renal', 'animal-4-digestion',
  'animal-5-respiration', 'animal-6-immunity', 'animal-7-reproduction-development', 'animal-8-endocrine',
  'genetics-1-mapping', 'genetics-2-popgen', 'genetics-3-mendelian-extensions', 'genetics-4-gene-regulation',
  'eco-1-dynamics', 'eco-2-ecosystems', 'eco-3-predation-biodiversity',
  'ethology-1-kin-selection', 'ethology-2-classical-behavior',
  'systematics-1-cladistics'
]);

// ===================== APPLICATION STATE =====================
const STATE_KEY = 'bioapex_usabo_state_v3';
const SRS_INTERVALS_MIN = [5, 60 * 24, 60 * 24 * 3, 60 * 24 * 7, 60 * 24 * 21]; // 5 min -> 3 weeks
const DEFAULT_STATE = {
  xp: 0,
  streak: 1,
  lastStudyDate: null,
  completedModules: [],
  quizScores: {},
  activeView: 'track',
  activeModuleId: 'cell-1-kinetics',
  activeQuizId: null,
  lessonStepIndex: 0,
  lessonViewMode: 'duolingo',
  stepProgress: {},
  checkpointResults: {},
  selfExplanations: {},
  flashcardProgress: {},
  whatIfCompleted: {},
  reviewLog: {}
};
let userState = { ...DEFAULT_STATE };

function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// A streak counts consecutive days of study, not consecutive actions.
function recordStudyActivity() {
  const today = dayKey();
  if (userState.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  userState.streak = userState.lastStudyDate === dayKey(yesterday) ? (userState.streak || 1) + 1 : 1;
  userState.lastStudyDate = today;
}

// Spaced repetition: "got it" promotes a card, "again" sends it back to the start.
function reviewFlashcard(cardKey, known) {
  const rec = userState.flashcardProgress[cardKey] || { box: 0, reps: 0, lapses: 0, due: 0 };
  rec.reps += 1;
  if (known) {
    rec.box = Math.min(rec.box + 1, SRS_INTERVALS_MIN.length - 1);
  } else {
    rec.box = 0;
    rec.lapses += 1;
  }
  rec.due = Date.now() + SRS_INTERVALS_MIN[rec.box] * 60000;
  userState.flashcardProgress[cardKey] = rec;
  saveState();
  return rec;
}

function reviewLabel(rec) {
  const mins = SRS_INTERVALS_MIN[rec.box];
  if (mins < 60) return `back in ${mins} min`;
  const days = Math.round(mins / (60 * 24));
  return days === 1 ? 'back tomorrow' : `back in ${days} days`;
}

// Records a checkpoint attempt so readiness reflects real mastery, not just clicks.
function recordCheckpointResult(key, correct) {
  const rec = userState.checkpointResults[key] || { attempts: 0, firstTry: null, solved: false };
  rec.attempts += 1;
  if (rec.firstTry === null) rec.firstTry = correct;
  const firstSolve = correct && !rec.solved;
  if (correct) rec.solved = true;
  userState.checkpointResults[key] = rec;
  saveState();
  return firstSolve;
}

// Finalist readiness is simply XP earned against the last rank (IBO Gold),
// so the header number always moves with the XP counter beside it.
function computeReadiness() {
  const target = RANK_TIERS[RANK_TIERS.length - 1].minXp;
  const pct = target > 0 ? Math.max(0, Math.min(100, Math.round((userState.xp / target) * 100))) : 0;
  return { pct, xp: userState.xp, target };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      userState = { ...DEFAULT_STATE, ...parsed };
      ['quizScores', 'stepProgress', 'checkpointResults', 'selfExplanations', 'flashcardProgress', 'whatIfCompleted', 'reviewLog']
        .forEach(key => { userState[key] = { ...(parsed[key] || {}) }; });
    }
  } catch (e) {
    console.error("Failed to load user state", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(userState));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

// ===================== XP FLOAT ANIMATION =====================
function showXpFloat(amount, targetEl) {
  const float = document.createElement('div');
  float.className = 'anim-xp-float fixed z-50 font-black text-lg text-amber-400 pointer-events-none';
  float.textContent = `+${amount} XP`;
  const rect = targetEl ? targetEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
  float.style.left = `${rect.left}px`;
  float.style.top = `${rect.top - 10}px`;
  document.body.appendChild(float);
  setTimeout(() => float.remove(), 1300);
}

// ===================== GENTLE WHEEL SCROLL =====================
// Native wheel jumps a long way per flick. Damp it into a short glide: the wheel
// only moves a target, and the page eases toward it. Keyboard, touch, scrollbar
// drags and programmatic scrolls stay completely native.
const WHEEL_SPEED = 0.45;
const WHEEL_EASE = 0.11;

function enableGentleScroll() {
  if (window.__gentleScroll) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.__gentleScroll = true;

  let target = window.scrollY;
  let applied = window.scrollY;
  let running = false;
  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  const stop = () => {
    running = false;
    target = window.scrollY;
    applied = window.scrollY;
  };

  const step = () => {
    const cur = window.scrollY;
    const diff = target - cur;
    if (Math.abs(diff) < 0.5) {
      applied = target;
      window.scrollTo(0, target);
      running = false;
      return;
    }
    applied = cur + diff * WHEEL_EASE;
    window.scrollTo(0, applied);
    requestAnimationFrame(step);
  };

  // Panes that scroll on their own keep native behaviour.
  const hasInnerScroll = (node) => {
    for (let el = node; el && el !== document.body; el = el.parentElement) {
      if (el.scrollHeight - el.clientHeight < 8) continue;
      const oy = getComputedStyle(el).overflowY;
      if (oy === 'auto' || oy === 'scroll') return true;
    }
    return false;
  };

  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.defaultPrevented) return;
    if (hasInnerScroll(e.target)) return;
    e.preventDefault();
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
    target = Math.max(0, Math.min(maxScroll(), target + delta * WHEEL_SPEED));
    if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  }, { passive: false });

  // Any scroll we did not cause wins: drop the glide immediately.
  window.addEventListener('scroll', () => {
    if (running && Math.abs(window.scrollY - applied) > 2) { stop(); return; }
    if (!running) target = window.scrollY;
  }, { passive: true });
  window.addEventListener('resize', () => { target = Math.min(target, maxScroll()); });
  window.__stopGentleScroll = stop;
}

// ===================== INIT & ROUTING =====================
export function initApp() {
  loadState();
  renderNavigation();
  renderCurrentView();
  setupGlobalEvents();
  enableGentleScroll();
}

function setupGlobalEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const view = el.getAttribute('data-nav');
      navigate(view);
    });
  });
}

function navigate(view, extra = {}) {
  userState.activeView = view;
  if (extra.moduleId) {
    userState.activeModuleId = extra.moduleId;
    // Resume where the learner stopped, but finished modules reopen at topic 1 for review.
    const mod = TRACK_MODULES.find(m => m.id === extra.moduleId);
    const isDone = userState.completedModules.includes(extra.moduleId);
    const resumeStep = extra.restart || isDone ? 0 : (userState.stepProgress[extra.moduleId] || 0);
    userState.lessonStepIndex = Math.min(resumeStep, mod ? mod.sections.length : 0);
  }
  if (extra.quizId) userState.activeQuizId = extra.quizId;
  else if (view === 'quiz') userState.activeQuizId = null; // nav opens the practice hub
  saveState();
  renderNavigation();
  renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    window.__stopGentleScroll?.();
  }

function renderNavigation() {
  const xpEl = document.getElementById('user-xp');
  const streakEl = document.getElementById('user-streak');
  const readinessEl = document.getElementById('user-readiness');
  const rankBadgeEmoji = document.getElementById('rank-badge-emoji');
  const rankBadgeTitle = document.getElementById('rank-badge-title');

  if (xpEl) xpEl.textContent = `${userState.xp} XP`;
  if (streakEl) streakEl.textContent = `${userState.streak} Day Streak`;
  
  if (readinessEl) {
    const readiness = computeReadiness();
    readinessEl.textContent = `${readiness.pct}% Finalist Ready`;
    readinessEl.title = `${readiness.xp} / ${readiness.target} XP \u2014 100% at IBO Gold Medalist`;
  }

  // Update rank badge
  const rank = getRankTier(userState.xp);
  if (rankBadgeEmoji) rankBadgeEmoji.textContent = rank.badge;
  if (rankBadgeTitle) rankBadgeTitle.textContent = rank.title.split('(')[0].trim();

  document.querySelectorAll('[data-nav]').forEach(btn => {
    if (btn.id === 'brand-link') return; // the logo is not a nav pill
    const view = btn.getAttribute('data-nav');
    if (view === userState.activeView) {
      btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition flex items-center gap-2";
    } else {
      btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition flex items-center gap-2";
    }
  });
}

function renderCurrentView() {
  const main = document.getElementById('app-main');
  if (!main) return;

  switch (userState.activeView) {
    case 'track':
      renderTrackView(main);
      break;
    case 'lesson':
      if (userState.lessonViewMode === 'duolingo') {
        renderDuolingoLessonView(main, userState.activeModuleId, userState.lessonStepIndex);
      } else {
        renderFullTextLessonView(main, userState.activeModuleId);
      }
      break;
    case 'flashcards':
      renderFlashcardsView(main);
      break;
    case 'whatif':
      renderWhatIfLabView(main);
      break;
    case 'quiz':
      if (userState.activeQuizId) renderQuizView(main, userState.activeQuizId);
      else renderQuizHub(main);
      break;
    case 'equations':
      renderEquationBankView(main);
      break;
    case 'textbooks':
      renderTextbooksView(main);
      break;
    default:
      renderTrackView(main);
  }

  // Trigger KaTeX rendering
  if (window.renderMathInElement) {
    window.renderMathInElement(main, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

// ===================== TRACK (ROADMAP) VIEW =====================
function renderTrackView(container) {
  const domainsList = Object.values(DOMAINS);
  const rank = getRankTier(userState.xp);
  const inProgressMod = TRACK_MODULES.find(m =>
    !userState.completedModules.includes(m.id) && (userState.stepProgress[m.id] || 0) > 0
  );
  const resumeTarget = inProgressMod
    ? { mod: inProgressMod, step: userState.stepProgress[inProgressMod.id], total: inProgressMod.sections.length }
    : null;
  const nextRank = RANK_TIERS[RANK_TIERS.indexOf(rank) + 1];
  const xpProgress = nextRank ? Math.round(((userState.xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100) : 100;

  let html = `
    <div class="max-w-4xl mx-auto space-y-10 pb-16">
      <!-- Hero Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl anim-fade-up">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              USABO Top 20 National Finalist & IBO Gold Curriculum
            </div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Olympiad Mastery Track</h1>
            <p class="text-slate-300 text-sm max-w-xl">
              Engineered exclusively for USABO semifinalists targeting national camp qualification and IBO. Each lesson features interactive animations, examiner trap alerts, what-if experiments, and active recall drills.
            </p>
          </div>
          <div class="flex flex-col gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 min-w-[200px]">
            <!-- Rank Progress -->
            <div class="flex items-center gap-3">
              <span class="text-3xl anim-float">${rank.badge}</span>
              <div class="flex-1">
                <span class="text-xs font-bold ${rank.color}">${rank.title}</span>
                <div class="mt-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-amber-500 to-indigo-500 anim-progress" style="width: ${xpProgress}%"></div>
                </div>
                ${nextRank ? `<span class="text-[10px] text-slate-500 font-mono">${userState.xp} / ${nextRank.minXp} XP to ${nextRank.title.split('(')[0].trim()}</span>` : '<span class="text-[10px] text-emerald-400 font-mono">MAX RANK!</span>'}
              </div>
            </div>
            <div class="flex items-center justify-between gap-4 pt-2 border-t border-slate-800">
              <div class="text-center">
                <span class="text-xl font-black text-amber-400">${userState.completedModules.length} / ${TRACK_MODULES.length}</span>
                <span class="block text-[10px] text-slate-400 font-medium">Nodes</span>
              </div>
              <div class="text-center">
                <span class="text-xl font-black text-indigo-400">${userState.xp}</span>
                <span class="block text-[10px] text-slate-400 font-medium">Bio XP</span>
              </div>
            </div>
            ${resumeTarget ? `
            <button id="resume-lesson-btn" class="w-full text-left px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 hover:bg-emerald-500/25 transition group">
              <span class="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">Resume</span>
              <span class="block text-[11px] font-bold text-white leading-tight mt-0.5 group-hover:text-emerald-200">${resumeTarget.mod.title.split(',')[0]}</span>
              <span class="block text-[10px] text-slate-400 font-mono mt-0.5">Topic ${resumeTarget.step + 1} of ${resumeTarget.total} \u2192</span>
            </button>` : ''}
          </div>
        </div>
      </div>

      <!-- Domain Tracks -->
      <div class="space-y-12">
  `;

  domainsList.forEach((domain, dIdx) => {
    const modules = TRACK_MODULES.filter(m => m.domainId === domain.id);
    if (modules.length === 0) return;

    html += `
      <div class="space-y-4 anim-fade-up" style="animation-delay: ${dIdx * 0.1}s">
        <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur shadow-lg">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow" style="background-color: ${domain.color}">
              ${dIdx + 1}
            </span>
            <div>
              <h2 class="text-base font-bold text-white flex items-center gap-2">
                ${domain.name}
                <span class="text-xs px-2 py-0.5 rounded font-mono bg-slate-800 text-slate-300">${domain.weight} USABO</span>
              </h2>
              <span class="text-xs text-slate-400">${domain.textbookSources.join(' • ')}</span>
            </div>
          </div>
        </div>

        <div class="relative py-4 flex flex-col items-center gap-8">
          <div class="absolute top-8 bottom-8 w-1 bg-slate-800/80 -z-0"></div>

          ${modules.map((mod, mIdx) => {
            const isCompleted = userState.completedModules.includes(mod.id);
            const hasTraps = !!EXAMINER_TRAPS[mod.id];
            const hasWhatIf = !!WHAT_IF_EXPERIMENTS[mod.id];
            const hasFlashcards = !!FLASHCARD_SETS[mod.id];
            const offsets = ['translate-x-0', '-translate-x-12', 'translate-x-12', '-translate-x-6', 'translate-x-6'];
            const offsetClass = offsets[mIdx % offsets.length];

            return `
              <div class="relative z-10 flex flex-col items-center ${offsetClass} group cursor-pointer" data-module-id="${mod.id}">
                <div class="w-20 h-20 rounded-full flex flex-col items-center justify-center p-1 transition-all transform group-hover:scale-110 shadow-2xl relative
                  ${isCompleted 
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 ring-4 ring-emerald-500/30' 
                    : 'bg-gradient-to-tr from-slate-800 to-slate-700 ring-4 ring-slate-700/50 hover:ring-indigo-500/50'}">
                  
                  ${isCompleted ? `
                    <span class="text-white text-xl font-bold">✓</span>
                    <span class="text-[9px] uppercase font-bold text-emerald-100 tracking-wider">Done</span>
                  ` : `
                    <span class="text-indigo-300 font-mono text-sm font-black">${mIdx + 1}</span>
                    <span class="text-[9px] uppercase font-bold text-slate-300 tracking-wider">${mod.xp} XP</span>
                  `}

                  ${mod.interactiveTool ? `
                    <span class="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 rounded-full text-[10px] font-black flex items-center justify-center shadow" title="Includes Interactive Simulation">
                      ⚙
                    </span>
                  ` : ''}
                </div>

                <div class="mt-2 text-center max-w-[200px]">
                  <h3 class="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition">${mod.title}</h3>
                  <span class="text-[10px] text-slate-400 font-mono">${mod.estimatedMinutes} mins • ${mod.level}</span>
                  ${!isCompleted && (userState.stepProgress[mod.id] || 0) > 0 ? `<span class="block text-[9px] text-emerald-400 font-bold mt-0.5">▶ Resume · Topic ${Math.min(userState.stepProgress[mod.id] + 1, mod.sections.length)}/${mod.sections.length}</span>` : ''}
                  <!-- Feature badges -->
                  <div class="flex items-center justify-center gap-1 mt-1 flex-wrap">
                    ${hasTraps ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">⚠ Traps</span>' : ''}
                    ${hasWhatIf ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30">⚡ Lab</span>' : ''}
                    ${hasFlashcards ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">🗂 Cards</span>' : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        ${(() => {
          const test = UNIT_TESTS.find(t => t.domainId === domain.id);
          if (!test) return '';
          const rec = quizRecord(test.id);
          const pct = rec ? Math.round((rec.correct / rec.total) * 100) : null;
          const passed = pct !== null && pct >= 80;
          return `
          <button class="unit-node w-full text-left p-4 rounded-2xl border transition ${passed ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400' : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50'}" data-quiz-id="${test.id}">
            <div class="flex items-center gap-3">
              <span class="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[13px] font-black ${passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}">${passed ? '✓' : '⧗'}</span>
              <div class="flex-1 min-w-0">
                <span class="block text-[10px] uppercase tracking-wider font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}">Unit test · ${domain.weight} of the exam</span>
                <span class="block text-sm font-bold text-white truncate">${domain.name}</span>
              </div>
              <span class="shrink-0 text-[11px] font-mono ${pct === null ? 'text-slate-500' : passed ? 'text-emerald-400' : 'text-amber-400'}">${pct === null ? test.questions.length + ' questions' : pct + '%'}</span>
            </div>
          </button>`;
        })()}
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;

  container.querySelectorAll('[data-module-id]').forEach(node => {
    node.addEventListener('click', () => {
      const modId = node.getAttribute('data-module-id');
      navigate('lesson', { moduleId: modId });
    });
  });

  container.querySelectorAll('.unit-node').forEach(node => {
    node.addEventListener('click', () => navigate('quiz', { quizId: node.getAttribute('data-quiz-id') }));
  });

  const resumeBtn = document.getElementById('resume-lesson-btn');
  if (resumeBtn && resumeTarget) {
    resumeBtn.addEventListener('click', () => navigate('lesson', { moduleId: resumeTarget.mod.id }));
  }
}

// ===================== DUOLINGO STEP-BY-STEP INTERACTIVE LESSON VIEW =====================
function renderDuolingoLessonView(container, moduleId, stepIdx) {
  const mod = TRACK_MODULES.find(m => m.id === moduleId) || TRACK_MODULES[0];
  const domain = DOMAINS[Object.keys(DOMAINS).find(k => DOMAINS[k].id === mod.domainId)];
  const totalSteps = mod.sections.length;

  if (stepIdx >= totalSteps) {
    renderLessonCelebration(container, mod);
    return;
  }

  const section = mod.sections[stepIdx];
  const progressPct = Math.round(((stepIdx + 1) / totalSteps) * 100);
  const traps = EXAMINER_TRAPS[mod.id] || [];
  const whatIf = WHAT_IF_EXPERIMENTS[mod.id] || null;
  const flashcards = FLASHCARD_SETS[mod.id] || [];
  const stepTrap = traps.length ? traps[stepIdx % traps.length] : null;

  // Shuffle choice order once per step so the answer's position can never be memorized.
  const rawCheckpoint = getStepCheckpoint(mod.id, stepIdx);
  const checkpoint = rawCheckpoint
    ? (() => {
        const shuffled = seededShuffle(
          rawCheckpoint.options.map((text, i) => ({ text, correct: i === rawCheckpoint.correctIndex })),
          `${mod.id}:${stepIdx}`
        );
        return {
          prompt: rawCheckpoint.prompt,
          explanation: rawCheckpoint.explanation,
          options: shuffled.map(o => o.text),
          correctIndex: shuffled.findIndex(o => o.correct)
        };
      })()
    : null;

  const stepKey = `${mod.id}:${stepIdx}`;
  const hasInteractiveModel = INTERACTIVE_MODEL_IDS.has(mod.id);
  const stepHint = buildStepHint(mod, section, stepTrap, flashcards);
  const keyTerms = extractKeyTerms(section.content);
  const savedExplanation = userState.selfExplanations[stepKey] || '';

  let html = `
    <div class="max-w-3xl mx-auto space-y-6 pb-28 anim-fade-up">
      <!-- Top Progress Bar -->
      <div class="flex items-center gap-3 sm:gap-4">
        <button id="duo-back-btn" class="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed" title="Previous topic" ${stepIdx === 0 ? 'disabled' : ''}>
          ←
        </button>
        <button id="duo-exit-btn" class="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition border border-slate-800" title="Back to the mastery track">
          ✕
        </button>
        <div class="flex-1 bg-slate-900 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div class="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 h-full rounded-full transition-all duration-700 shadow-sm shadow-emerald-500/50 anim-progress" style="width: ${progressPct}%"></div>
        </div>
        <div class="flex items-center gap-2">
          <button id="toggle-view-mode-btn" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition">
            📖 Full Text
          </button>
          <span class="text-xs font-mono font-bold text-amber-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
            ⚡ +25 XP
          </span>
        </div>
      </div>

      <!-- Main Step Card -->
      <div class="bg-slate-900/95 border border-slate-800/90 rounded-3xl shadow-2xl backdrop-blur overflow-hidden">
        <!-- Step Header -->
        <div class="p-6 sm:p-8 pb-4 space-y-1.5 border-b border-slate-800/80">
          <div class="flex items-center justify-between text-xs">
            <span class="px-2.5 py-0.5 rounded font-bold text-white text-[10px]" style="background-color: ${domain.color}">${domain.name}</span>
            <span class="text-slate-400 font-mono text-[11px]">Topic ${stepIdx + 1} of ${totalSteps}</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">${section.heading}</h1>
          <p class="text-xs text-slate-400 font-medium">${mod.title}</p>
        </div>

        <!-- Interactive Content Tabs -->
        <div class="border-b border-slate-800/80">
          <div class="flex overflow-x-auto px-4 sm:px-6 gap-1 py-2" id="lesson-tabs-bar">
            <button class="lesson-tab lesson-tab-active px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all" data-tab="learn">
              🔬 Learn
            </button>
            ${hasInteractiveModel ? `
            <button class="lesson-tab px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-all" data-tab="interactive">
              🧪 Interactive Model
            </button>` : ''}
            ${stepTrap ? `
            <button class="lesson-tab px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-all" data-tab="traps">
              ⚠️ Examiner Traps
            </button>` : ''}
            ${whatIf ? `
            <button class="lesson-tab px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-all" data-tab="whatif">
              ⚡ What-If Lab
            </button>` : ''}
            ${flashcards.length > 0 ? `
            <button class="lesson-tab px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-all" data-tab="flashcards">
              🗂 Active Recall
            </button>` : ''}
          </div>
        </div>

        <!-- Tab Content Panels -->
        <div class="p-6 sm:p-8 pt-5">
          <!-- LEARN TAB -->
          <div id="tab-panel-learn" class="tab-panel anim-tab-switch">
            ${renderLearnTabContent(section, mod, stepIdx)}
          </div>

          <!-- INTERACTIVE MODEL TAB -->
          ${hasInteractiveModel ? `
          <div id="tab-panel-interactive" class="tab-panel hidden">
            <div id="step-interactive-slot" class="mb-4"></div>
            <div class="text-center text-xs text-slate-500 mt-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">
                🖱 Interact with the model above — hover, click, and adjust parameters
              </span>
            </div>
          </div>` : ''}

          <!-- EXAMINER TRAPS TAB -->
          ${stepTrap ? `
          <div id="tab-panel-traps" class="tab-panel hidden">
            <div class="space-y-4 anim-tab-switch">
              <div class="flex items-center gap-2 pb-2 border-b border-rose-500/20">
                <span class="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm">⚠️</span>
                <div>
                  <h3 class="text-sm font-bold text-rose-300">Examiner Trap Alert</h3>
                  <p class="text-[10px] text-rose-400/70">Common misconceptions that cost points on USABO & IBO exams</p>
                </div>
              </div>
              ${traps.map((trap, tIdx) => `
                <div class="rounded-2xl border border-rose-500/20 overflow-hidden ${tIdx === 0 ? 'anim-fade-up' : ''}" style="animation-delay: ${tIdx * 0.15}s">
                  <div class="bg-rose-950/40 px-5 py-3 border-b border-rose-500/20">
                    <h4 class="text-xs font-bold text-rose-200 flex items-center gap-2">
                      <span class="w-5 h-5 rounded bg-rose-500/30 text-rose-300 flex items-center justify-center text-[10px] font-black">${tIdx + 1}</span>
                      ${trap.title}
                    </h4>
                  </div>
                  <div class="p-5 space-y-3 bg-slate-950/40">
                    <div>
                      <span class="text-[10px] font-bold uppercase tracking-wider text-rose-400">The Trap:</span>
                      <p class="text-xs text-slate-300 leading-relaxed mt-1">${trap.trap}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">💡 Camp Insider Tip:</span>
                      <p class="text-xs text-amber-200/80 leading-relaxed mt-1">${trap.campTip}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- WHAT-IF LAB TAB -->
          ${whatIf ? `
          <div id="tab-panel-whatif" class="tab-panel hidden">
            <div class="space-y-5 anim-tab-switch">
              <div class="flex items-center gap-2 pb-2 border-b border-violet-500/20">
                <span class="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm">⚡</span>
                <div>
                  <h3 class="text-sm font-bold text-violet-300">What-If Perturbation Lab</h3>
                  <p class="text-[10px] text-violet-400/70">Predict what happens when you change experimental conditions</p>
                </div>
              </div>
              
              <div class="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/20">
                <span class="text-[10px] font-bold uppercase tracking-wider text-violet-400">🧪 Scenario:</span>
                <p class="text-sm text-white font-medium mt-1">${whatIf.scenario}</p>
              </div>

              <div class="space-y-3" id="whatif-options-container">
                ${whatIf.options.map((opt, oIdx) => `
                  <div class="whatif-option group cursor-pointer rounded-2xl border border-slate-700/80 hover:border-violet-500/40 bg-slate-950/60 overflow-hidden transition-all option-hover-glow" data-whatif-idx="${oIdx}">
                    <div class="p-4 flex items-center gap-3">
                      <span class="w-8 h-8 shrink-0 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center text-xs font-black group-hover:bg-violet-500/30 transition">${oIdx + 1}</span>
                      <div class="flex-1">
                        <p class="text-xs font-bold text-white">${opt.action}</p>
                        <p class="text-[11px] text-slate-400 mt-0.5">🔮 Prediction: ${opt.prediction}</p>
                      </div>
                      <span class="whatif-reveal-icon text-slate-600 text-sm transition">▶</span>
                    </div>
                    <div class="whatif-feedback hidden p-4 bg-emerald-950/30 border-t border-emerald-500/20">
                      <div class="flex items-start gap-2">
                        <span class="text-emerald-400 text-sm mt-0.5">✓</span>
                        <p class="text-xs text-emerald-200 leading-relaxed">${opt.feedback}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>` : ''}

          <!-- FLASHCARDS TAB -->
          ${flashcards.length > 0 ? `
          <div id="tab-panel-flashcards" class="tab-panel hidden">
            <div class="space-y-5 anim-tab-switch">
              <div class="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">🗂</span>
                  <div>
                    <h3 class="text-sm font-bold text-cyan-300">Active Recall Flashcards</h3>
                    <p class="text-[10px] text-cyan-400/70">Tap to flip • Build long-term memory</p>
                  </div>
                </div>
                <span class="text-xs font-mono text-slate-500" id="flashcard-counter">Card 1 of ${flashcards.length}</span>
              </div>
              
              <div class="flashcard-container min-h-[200px]" id="flashcard-deck">
                ${renderFlashcardDeck(flashcards, 0)}
              </div>

              <div class="flex items-center justify-between pt-2">
                <button id="fc-prev-btn" class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition disabled:opacity-30" disabled>← Previous</button>
                <div class="flex gap-1.5" id="flashcard-dots">
                  ${flashcards.map((_, i) => `<span class="w-2 h-2 rounded-full ${i === 0 ? 'bg-cyan-400' : 'bg-slate-700'} transition"></span>`).join('')}
                </div>
                <button id="fc-next-btn" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition ${flashcards.length <= 1 ? 'disabled:opacity-30' : ''}" ${flashcards.length <= 1 ? 'disabled' : ''}>Next →</button>
              </div>

              <!-- Spaced repetition self-rating -->
              <div class="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button id="fc-again-btn" class="px-4 py-2 rounded-xl text-[11px] font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition">↺ Review again</button>
                <button id="fc-known-btn" class="px-4 py-2 rounded-xl text-[11px] font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition">✓ Got it</button>
              </div>
              <p id="fc-srs-status" class="text-center text-[10px] text-slate-500"></p>
            </div>
          </div>` : ''}
        </div>

        <!-- Concept Checkpoint -->
        <div class="p-6 sm:p-8 pt-4 border-t border-slate-800 space-y-3">
          ${checkpoint ? `
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center anim-pulse-glow">?</span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Concept Checkpoint · Unlock Next Topic</h4>
            <span class="ml-auto hidden sm:inline text-[10px] font-mono text-slate-500">First attempt is what counts</span>
          </div>
          <p class="text-xs font-semibold text-white">${checkpoint.prompt}</p>

          <div class="space-y-2 pt-1" id="checkpoint-options-list">
            ${checkpoint.options.map((opt, oIdx) => `
              <button class="step-check-opt w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-600 text-xs text-slate-300 transition-all flex items-center justify-between option-hover-glow" data-idx="${oIdx}">
                <span class="flex items-center gap-2.5">
                  <span class="w-5 h-5 shrink-0 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">${String.fromCharCode(65 + oIdx)}</span>
                  <span>${opt}</span>
                </span>
                <span class="opt-indicator text-slate-500 text-sm font-bold">○</span>
              </button>
            `).join('')}
          </div>
          ` : `
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center">🧠</span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400">Explain It Back · Retrieval Practice</h4>
          </div>
          <p class="text-xs text-slate-300">Without scrolling back: in one or two sentences, what is the mechanism in “${section.heading.replace(/^\d+\.\s*/, '')}” and why does it matter?</p>
          <textarea id="self-explain-input" rows="3" placeholder="Because…, the system…, which means…" class="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-emerald-500/60 focus:outline-none text-xs text-slate-200 leading-relaxed resize-y">${savedExplanation}</textarea>
          <div class="flex flex-wrap items-center gap-2">
            <button id="self-explain-reveal" class="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition">🔍 Compare with key ideas</button>
            <span id="self-explain-status" class="text-[10px] text-slate-500">Write at least a sentence to continue</span>
          </div>
          <div id="self-explain-model" class="hidden p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/20 space-y-1.5">
            <span class="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">A strong answer mentions</span>
            ${keyTerms.length
              ? `<ul class="space-y-1">${keyTerms.map(t => `<li class="flex items-start gap-2 text-[11px] text-emerald-100/90"><span class="text-emerald-400">✓</span><span>${t}</span></li>`).join('')}</ul>`
              : `<p class="text-[11px] text-emerald-100/90">Use the definition and the mechanism named in the lesson above.</p>`}
          </div>
          `}

          <div id="check-feedback" class="hidden p-3 rounded-xl text-xs leading-relaxed"></div>

          <!-- Hint toggle -->
          <div class="pt-1">
            <button id="hint-toggle-btn" class="text-[11px] text-slate-500 hover:text-indigo-400 transition flex items-center gap-1">
              <span>💡</span> <span>Need a hint?</span>
            </button>
            <div id="hint-content" class="hidden mt-2 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 anim-type-reveal">
              ${stepHint}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/90 px-4 py-3.5 backdrop-blur-md">
      <div class="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <div id="duo-hint-text" class="text-xs font-medium text-slate-400 truncate hidden sm:block">
          Complete the concept checkpoint to advance to the next topic!
        </div>
        <button id="duo-continue-btn" disabled class="px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-slate-800 text-slate-500 cursor-not-allowed border-b-4 border-slate-900 transition-all flex items-center gap-2 ml-auto">
          <span>Continue</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Mount interactive model immediately (for the interactive tab).
  // A model that fails must never take the lesson and checkpoint down with it.
  if (hasInteractiveModel) try {
    mountStepInteractiveModel(mod.id, stepIdx, 'step-interactive-slot');
  } catch (err) {
    console.error('Interactive model failed to mount', err);
    const slot = document.getElementById('step-interactive-slot');
    if (slot) {
      slot.innerHTML = '<div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">This model could not load on this device. The lesson text and checkpoint below still work.</div>';
    }
  }

  // Trigger KaTeX on the lesson content
  if (window.renderMathInElement) {
    window.renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  // ===== TAB SWITCHING =====
  container.querySelectorAll('.lesson-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      // Update tab styles
      container.querySelectorAll('.lesson-tab').forEach(t => {
        t.classList.remove('lesson-tab-active');
        t.classList.add('bg-slate-800/60', 'text-slate-400');
      });
      tab.classList.add('lesson-tab-active');
      tab.classList.remove('bg-slate-800/60', 'text-slate-400');
      // Show/hide panels
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      const panel = document.getElementById(`tab-panel-${target}`);
      if (panel) {
        panel.classList.remove('hidden');
        panel.classList.add('anim-tab-switch');
      }
      // If switching to interactive, remount the model
      if (target === 'interactive') {
        const slot = document.getElementById('step-interactive-slot');
        if (slot && slot.children.length === 0) {
          mountStepInteractiveModel(mod.id, stepIdx, 'step-interactive-slot');
        }
      }
    });
  });

  // ===== WHAT-IF LAB INTERACTIONS =====
  container.querySelectorAll('.whatif-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const feedback = opt.querySelector('.whatif-feedback');
      const icon = opt.querySelector('.whatif-reveal-icon');
      if (feedback.classList.contains('hidden')) {
        feedback.classList.remove('hidden');
        feedback.classList.add('anim-type-reveal');
        icon.textContent = '▼';
        opt.classList.add('border-violet-500/40');
        userState.xp += 5;
        saveState();
        renderNavigation();
        showXpFloat(5, opt);
      } else {
        feedback.classList.add('hidden');
        icon.textContent = '▶';
        opt.classList.remove('border-violet-500/40');
      }
    });
  });

  // ===== FLASHCARD INTERACTIONS =====
  if (flashcards.length > 0) {
    let currentFcIdx = 0;
    setupFlashcardInteractions(container, flashcards, currentFcIdx, (newIdx) => {
      currentFcIdx = newIdx;
      const status = document.getElementById('fc-srs-status');
      const rec = userState.flashcardProgress[`${mod.id}:${newIdx}`];
      // Keep the last rating message until this card has a schedule of its own.
      if (status && rec) status.textContent = `Card ${newIdx + 1}: ${reviewLabel(rec)}`;
    });

    const rateCard = (known) => {
      const rec = reviewFlashcard(`${mod.id}:${currentFcIdx}`, known);
      const status = document.getElementById('fc-srs-status');
      if (status) status.textContent = `${known ? '✓ Marked understood' : '↺ Back to the start'} — ${reviewLabel(rec)}`;
      const nextBtn = document.getElementById('fc-next-btn');
      if (nextBtn && !nextBtn.disabled) setTimeout(() => nextBtn.click(), 350);
    };
    document.getElementById('fc-again-btn')?.addEventListener('click', () => rateCard(false));
    document.getElementById('fc-known-btn')?.addEventListener('click', () => rateCard(true));
  }

  // ===== HINT TOGGLE =====
  const hintBtn = document.getElementById('hint-toggle-btn');
  const hintContent = document.getElementById('hint-content');
  if (hintBtn && hintContent) {
    hintBtn.addEventListener('click', () => {
      hintContent.classList.toggle('hidden');
    });
  }

  // ===== EXIT, BACK-STEP & VIEW TOGGLE =====
  document.getElementById('duo-exit-btn').addEventListener('click', () => {
    userState.stepProgress[mod.id] = Math.max(userState.stepProgress[mod.id] || 0, userState.lessonStepIndex);
    navigate('track');
  });

  const backStepBtn = document.getElementById('duo-back-btn');
  if (backStepBtn) {
    backStepBtn.addEventListener('click', () => {
      if (userState.lessonStepIndex === 0) return;
      userState.lessonStepIndex -= 1;
      saveState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderCurrentView();
    });
  }
  document.getElementById('toggle-view-mode-btn').addEventListener('click', () => {
    userState.lessonViewMode = 'full_text';
    saveState();
    renderCurrentView();
  });

  // ===== CHECKPOINT LOGIC =====
  const continueBtn = document.getElementById('duo-continue-btn');
  const feedbackEl = document.getElementById('check-feedback');
  let isAnswered = false;
  let attempts = 0;

  container.querySelectorAll('.step-check-opt').forEach(optBtn => {
    optBtn.addEventListener('click', () => {
      if (isAnswered) return;
      const chosen = parseInt(optBtn.getAttribute('data-idx'));
      isAnswered = true;

      if (chosen === checkpoint.correctIndex) {
        optBtn.className = "step-check-opt w-full text-left p-3 rounded-xl border border-emerald-500 bg-emerald-950/50 text-xs text-emerald-200 transition-all flex items-center justify-between anim-correct";
        optBtn.querySelector('.opt-indicator').innerHTML = '✓';
        optBtn.querySelector('.opt-indicator').className = 'opt-indicator text-emerald-400 text-sm font-bold';

        feedbackEl.className = "p-3 rounded-xl text-xs leading-relaxed bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 anim-type-reveal";
        feedbackEl.innerHTML = `<strong class="text-emerald-300">✓ Correct.</strong> ${checkpoint.explanation}`;
        feedbackEl.classList.remove('hidden');

        continueBtn.disabled = false;
        continueBtn.className = "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 ml-auto";
        const firstSolve = recordCheckpointResult(stepKey, true);
        if (firstSolve) {
          userState.xp += 25;
          saveState();
          renderNavigation();
          showXpFloat(25, optBtn);
        }

        // Grey out other options
        container.querySelectorAll('.step-check-opt').forEach(o => {
          if (o !== optBtn) {
            o.className = "step-check-opt w-full text-left p-3 rounded-xl border border-slate-800/40 bg-slate-950/40 text-xs text-slate-500 transition-all flex items-center justify-between opacity-50 pointer-events-none";
          }
        });
      } else {
        optBtn.className = "step-check-opt w-full text-left p-3 rounded-xl border border-rose-500 bg-rose-950/50 text-xs text-rose-200 transition-all flex items-center justify-between anim-wrong";
        optBtn.querySelector('.opt-indicator').innerHTML = '✗';
        optBtn.querySelector('.opt-indicator').className = 'opt-indicator text-rose-400 text-sm font-bold';

        attempts += 1;
        recordCheckpointResult(stepKey, false);
        feedbackEl.className = "p-3 rounded-xl text-xs leading-relaxed bg-rose-950/40 border border-rose-800/40 text-rose-200 anim-type-reveal";
        feedbackEl.innerHTML = attempts >= 2
          ? `<strong class="text-rose-300">✗ Not quite — here is the reasoning.</strong><br>${checkpoint.explanation}<br><span class="text-rose-300/80">Continue is unlocked. This topic is queued in Active Recall.</span>`
          : `<strong class="text-rose-300">✗ Not quite.</strong> Open the hint, eliminate the options that contradict it, then try again.`;
        feedbackEl.classList.remove('hidden');
        if (attempts >= 2) {
          continueBtn.disabled = false;
          continueBtn.className = "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 ml-auto";
        } else {
          const hintBox = document.getElementById('hint-content');
          if (hintBox) hintBox.classList.remove('hidden');
        }

        setTimeout(() => { 
          isAnswered = false;
          feedbackEl.classList.add('hidden');
          optBtn.className = "step-check-opt w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-600 text-xs text-slate-300 transition-all flex items-center justify-between option-hover-glow";
          optBtn.querySelector('.opt-indicator').innerHTML = '○';
          optBtn.querySelector('.opt-indicator').className = 'opt-indicator text-slate-500 text-sm font-bold';
        }, 2000);
      }
    });
  });

  // ===== SELF-EXPLANATION (used when a topic has no multiple-choice checkpoint) =====
  const explainInput = document.getElementById('self-explain-input');
  const explainReveal = document.getElementById('self-explain-reveal');
  const explainStatus = document.getElementById('self-explain-status');
  if (explainInput && explainReveal) {
    const MIN_CHARS = 15;
    const unlockContinue = () => {
      continueBtn.disabled = false;
      continueBtn.className = "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 ml-auto";
    };

    const updateStatus = () => {
      const enough = explainInput.value.trim().length >= MIN_CHARS;
      if (enough) {
        unlockContinue();
        explainStatus.textContent = 'Saved — your explanation is kept for review';
        explainStatus.className = 'text-[10px] text-emerald-400';
      } else {
        continueBtn.disabled = true;
        explainStatus.textContent = 'Write at least a sentence to continue';
        explainStatus.className = 'text-[10px] text-slate-500';
      }
    };

    explainInput.addEventListener('input', () => {
      userState.selfExplanations[stepKey] = explainInput.value;
      saveState();
      updateStatus();
    });

    explainReveal.addEventListener('click', () => {
      document.getElementById('self-explain-model').classList.remove('hidden');
      const enough = explainInput.value.trim().length >= MIN_CHARS;
      if (enough) {
        updateStatus();
      } else {
        unlockContinue();
        explainStatus.textContent = 'Compare your idea with the list, then continue';
        explainStatus.className = 'text-[10px] text-emerald-400';
      }
    });

    if (explainInput.value.trim().length >= MIN_CHARS) updateStatus();
  }

  continueBtn.addEventListener('click', () => {
    userState.lessonStepIndex++;
    recordStudyActivity();
    userState.stepProgress[mod.id] = Math.max(userState.stepProgress[mod.id] || 0, userState.lessonStepIndex);
    saveState();
    renderNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCurrentView();
  });
}

// ===================== LESSON FIGURE =====================
// One openly licensed diagram or photo per topic, with caption and attribution.
function renderLessonFigure(moduleId, stepIndex) {
  const fig = getLessonFigure(moduleId, stepIndex);
  if (!fig) return '';
  const alt = fig.caption.replace(/"/g, '&quot;');
  return `
    <figure class="rounded-xl border border-slate-800 overflow-hidden">
      <a href="${fig.src}" target="_blank" rel="noopener" class="block bg-[#fbfaf7] px-2 py-3">
        <img src="${fig.src}" alt="${alt}" loading="lazy" decoding="async"
             class="w-full max-h-[360px] object-contain mx-auto" />
      </a>
      <figcaption class="px-4 py-3 space-y-1.5 border-t border-slate-800">
        <p class="text-[12px] leading-relaxed text-slate-300">${fig.caption}</p>
        <p class="text-[10px] tracking-wide text-slate-500">
          <a href="${fig.page}" target="_blank" rel="noopener" class="underline decoration-dotted underline-offset-2 hover:text-amber-400">${fig.credit}</a>
          <span class="mx-1.5">·</span>
          <a href="${fig.article}" target="_blank" rel="noopener" class="hover:text-amber-400">source</a>
        </p>
      </figcaption>
    </figure>
  `;
}

// ===================== LEARN TAB CONTENT RENDERER =====================
function renderLearnTabContent(section, mod, stepIndex) {
  // Structured rendering: bullets, numbered steps, display math and bold key terms.
  return `
    <div class="space-y-4">
      ${renderLessonFigure(mod.id, stepIndex)}
      <div class="anim-fade-up">${formatLessonContent(section.content)}</div>

      ${mod.keyFormulas && mod.keyFormulas.length > 0 ? `
        <div class="mt-5 pt-4 border-t border-slate-800/60">
          <h3 class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
            📐 Key Equations
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${mod.keyFormulas.slice(0, 4).map(f => `
              <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 space-y-1">
                <span class="text-[10px] font-semibold text-slate-400">${f.name}</span>
                <div class="text-xs text-indigo-200 font-mono overflow-x-auto">$$${f.latex}$$</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// ===================== FLASHCARD DECK RENDERER =====================
function renderFlashcardDeck(flashcards, idx) {
  const card = flashcards[idx];
  return `
    <div class="flashcard-inner cursor-pointer select-none min-h-[180px]" id="active-flashcard">
      <div class="flashcard-front p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-cyan-500/20 min-h-[180px] flex flex-col items-center justify-center text-center">
        <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-500 mb-3">Question</span>
        <p class="text-sm font-semibold text-white leading-relaxed">${card.q}</p>
        <span class="text-[10px] text-slate-500 mt-4">Tap to reveal answer</span>
      </div>
      <div class="flashcard-back p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/20 min-h-[180px] flex flex-col items-center justify-center text-center">
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-3">Answer</span>
        <p class="text-sm text-emerald-200 leading-relaxed">${card.a}</p>
        <span class="text-[10px] text-slate-500 mt-4">Tap to flip back</span>
      </div>
    </div>
  `;
}

function setupFlashcardInteractions(container, flashcards, currentIdx, setIdx) {
  function bindFlip() {
    const fc = document.getElementById('active-flashcard');
    if (fc) {
      fc.addEventListener('click', () => fc.classList.toggle('flipped'));
    }
  }
  
  function updateDeck(idx) {
    setIdx(idx);
    const deck = document.getElementById('flashcard-deck');
    const counter = document.getElementById('flashcard-counter');
    if (deck) deck.innerHTML = renderFlashcardDeck(flashcards, idx);
    if (counter) counter.textContent = `Card ${idx + 1} of ${flashcards.length}`;
    
    // Update dots
    const dots = document.querySelectorAll('#flashcard-dots span');
    dots.forEach((d, i) => {
      d.className = `w-2 h-2 rounded-full ${i === idx ? 'bg-cyan-400' : 'bg-slate-700'} transition`;
    });

    // Update button states
    const prevBtn = document.getElementById('fc-prev-btn');
    const nextBtn = document.getElementById('fc-next-btn');
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx >= flashcards.length - 1;

    bindFlip();
  }

  bindFlip();

  const prevBtn = document.getElementById('fc-prev-btn');
  const nextBtn = document.getElementById('fc-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIdx > 0) updateDeck(--currentIdx);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIdx < flashcards.length - 1) {
        updateDeck(++currentIdx);
        userState.xp += 3;
        saveState();
        renderNavigation();
      }
    });
  }
}

// ===================== LESSON CELEBRATION =====================
function renderLessonCelebration(container, mod) {
  if (!userState.completedModules.includes(mod.id)) {
    userState.completedModules.push(mod.id);
    userState.xp += mod.xp;
    recordStudyActivity();
    saveState();
    renderNavigation();
  }
  userState.stepProgress[mod.id] = Math.max(userState.stepProgress[mod.id] || 0, mod.sections.length);
  saveState();

  const rank = getRankTier(userState.xp);

  let html = `
    <div class="max-w-xl mx-auto py-12 text-center space-y-6 anim-scale-in">
      <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/50 anim-float">
        🏆
      </div>

      <div class="space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Lesson Complete!</span>
        <h2 class="text-3xl font-black text-white">${mod.title} Mastered</h2>
        <p class="text-xs text-slate-400 max-w-md mx-auto">${mod.subtitle}</p>
      </div>

      <div class="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center anim-fade-up" style="animation-delay: 0.1s">
          <span class="block text-2xl font-black text-amber-400">+${mod.xp} XP</span>
          <span class="text-[11px] text-slate-400 font-bold uppercase">Experience</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center anim-fade-up" style="animation-delay: 0.2s">
          <span class="block text-2xl font-black text-rose-400">🔥 ${userState.streak}</span>
          <span class="text-[11px] text-slate-400 font-bold uppercase">Streak</span>
        </div>
        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center anim-fade-up" style="animation-delay: 0.3s">
          <span class="block text-[13px] font-mono tracking-widest text-amber-400">RANK</span>
          <span class="text-[11px] ${rank.color} font-bold">${rank.title.split('(')[0].trim()}</span>
        </div>
      </div>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button id="celeb-track-btn" class="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg transition">
          Continue on Track →
        </button>
        <button id="celeb-quiz-btn" class="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition">
          Take Finalist Quiz
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
  triggerCelebrationConfetti();

  document.getElementById('celeb-track-btn').addEventListener('click', () => navigate('track'));
  document.getElementById('celeb-quiz-btn').addEventListener('click', () => {
    const qSet = QUIZ_SETS.find(q => q.moduleId === mod.id) || QUIZ_SETS[0];
    navigate('quiz', { quizId: qSet.id });
  });
}

// ===================== ACTIVE RECALL: DAILY REVIEW =====================
// Every card in the app comes from either a curated prep set or a verified
// lesson checkpoint, so recall never tests anything the lessons do not teach.
const RECALL_GRADES = [
  { id: 'again', label: 'Again', hint: '1', minutes: 5, box: 0, tone: 'rose' },
  { id: 'hard', label: 'Hard', hint: '2', minutes: 60 * 24, box: 1, tone: 'amber' },
  { id: 'good', label: 'Good', hint: '3', minutes: 60 * 24 * 3, box: 2, tone: 'emerald' },
  { id: 'easy', label: 'Easy', hint: '4', minutes: 60 * 24 * 7, box: 3, tone: 'cyan' }
];

let recallCardsCache = null;
function getRecallCards() {
  if (recallCardsCache) return recallCardsCache;
  const cards = [];
  for (const [modId, list] of Object.entries(FLASHCARD_SETS)) {
    list.forEach((card, i) => {
      cards.push({ key: `${modId}:${i}`, moduleId: modId, q: card.q, a: card.a, source: 'Prep card' });
    });
  }
  for (const mod of TRACK_MODULES) {
    (CHECKPOINT_BANK[mod.id] || []).forEach((q, i) => {
      cards.push({
        key: `${mod.id}:cp:${i}`,
        moduleId: mod.id,
        q: q.prompt,
        a: `${q.options[q.correctIndex]}. ${q.explanation}`,
        source: 'Lesson checkpoint'
      });
    });
  }
  recallCardsCache = cards;
  return cards;
}

function recallDueCount(moduleId) {
  const now = Date.now();
  return getRecallCards()
    .filter(c => !moduleId || c.moduleId === moduleId)
    .filter(c => {
      const rec = userState.flashcardProgress[c.key];
      return !rec || rec.due <= now;
    }).length;
}

function gradeRecallCard(cardKey, gradeId) {
  const grade = RECALL_GRADES.find(g => g.id === gradeId) || RECALL_GRADES[2];
  const rec = userState.flashcardProgress[cardKey] || { box: 0, reps: 0, lapses: 0, due: 0 };
  rec.reps += 1;
  if (gradeId === 'again') {
    rec.box = 0;
    rec.lapses += 1;
  } else {
    rec.box = Math.min(Math.max(rec.box, grade.box), SRS_INTERVALS_MIN.length - 1);
  }
  rec.due = Date.now() + grade.minutes * 60000;
  rec.last = dayKey();
  userState.flashcardProgress[cardKey] = rec;
  const today = dayKey();
  userState.reviewLog[today] = (userState.reviewLog[today] || 0) + 1;
  userState.xp += 2;
  recordStudyActivity();
  saveState();
  renderNavigation();
}

function recallStreak() {
  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = dayKey(d);
    if ((userState.reviewLog[key] || 0) > 0) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

function renderReviewCalendar() {
  const weeks = 13;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - start.getDay() - (weeks - 1) * 7);

  const cells = [];
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const key = dayKey(date);
      const count = userState.reviewLog[key] || 0;
      const level = count === 0 ? 0 : count < 5 ? 1 : count < 12 ? 2 : count < 25 ? 3 : 4;
      cells.push({ date, key, count, level, future: date.getTime() > today.getTime() });
    }
  }

  const shades = ['bg-slate-800/50', 'bg-emerald-900', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-400'];
  const monthLabels = [];
  cells.forEach((cell, i) => {
    if (i % 7 !== 0) return;
    const label = cell.date.toLocaleString('en', { month: 'short' });
    if (monthLabels[monthLabels.length - 1] !== label) monthLabels.push(label);
  });

  return `
    <div class="recall-calendar">
      <div class="grid grid-rows-7 grid-flow-col gap-1">
        ${cells.map(cell => `
          <div class="w-4 h-4 rounded-[3px] ${cell.future ? 'bg-slate-900/60 border border-slate-800/40' : shades[cell.level]} ${cell.key === dayKey() ? 'ring-1 ring-amber-400/70' : ''}"
               title="${cell.count ? `${cell.count} card${cell.count === 1 ? '' : 's'} · ${cell.date.toDateString()}` : `No reviews · ${cell.date.toDateString()}`}"></div>
        `).join('')}
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="flex gap-5">
          ${monthLabels.map(label => `<span class="text-[9px] text-slate-600 font-mono">${label}</span>`).join('')}
        </div>
        <div class="flex items-center gap-1">
          <span class="text-[9px] text-slate-600">less</span>
          ${shades.map(s => `<span class="w-2.5 h-2.5 rounded-[2px] ${s}"></span>`).join('')}
          <span class="text-[9px] text-slate-600">more</span>
        </div>
      </div>
    </div>
  `;
}

function renderFlashcardsView(container) {
  const cards = getRecallCards();
  const dueCards = cards.filter(c => {
    const rec = userState.flashcardProgress[c.key];
    return !rec || rec.due <= Date.now();
  });
  const seen = cards.filter(c => userState.flashcardProgress[c.key]).length;
  const said = cards.filter(c => (userState.flashcardProgress[c.key]?.box || 0) >= 2).length;
  const retention = seen ? Math.round((said / seen) * 100) : 0;
  const weekReviews = Object.entries(userState.reviewLog)
    .filter(([key]) => {
      const [y, m, d] = key.split('-').map(Number);
      return Date.now() - new Date(y, m - 1, d).getTime() <= 7 * 864e5;
    })
    .reduce((sum, [, n]) => sum + n, 0);

  const decks = Object.values(DOMAINS).map(domain => ({
    domain,
    mods: TRACK_MODULES.filter(m => m.domainId === domain.id).map(mod => {
      const modCards = cards.filter(c => c.moduleId === mod.id);
      const modDue = modCards.filter(c => {
        const rec = userState.flashcardProgress[c.key];
        return !rec || rec.due <= Date.now();
      }).length;
      return { mod, total: modCards.length, due: modDue };
    }).filter(d => d.total > 0)
  })).filter(d => d.mods.length);

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-6 pb-20 anim-fade-up">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div class="space-y-2">
          <h1 class="text-2xl font-extrabold text-white flex items-center gap-2">🗂 Active Recall</h1>
          <p class="text-sm text-slate-400 max-w-xl">Cards resurface on a spaced schedule. Answer out loud before you flip — the effort of retrieval is what builds the memory.</p>
        </div>
        <button id="start-review-btn" class="shrink-0 px-6 py-3 rounded-2xl text-sm font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition flex items-center gap-2">
          Review ${dueCards.length} due <span>→</span>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${[
          ['Due now', dueCards.length, 'text-emerald-400'],
          ['Reviews this week', weekReviews, 'text-cyan-400'],
          ['Cards solid', `${said}/${cards.length}`, 'text-indigo-300'],
          ['Recall streak', `${recallStreak()}d`, 'text-amber-400']
        ].map(([label, value, tone]) => `
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3">
            <span class="block text-xl font-black ${tone}">${value}</span>
            <span class="block text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">${label}</span>
          </div>`).join('')}
      </div>

      <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Review calendar</h2>
          <span class="text-[10px] text-slate-500 font-mono">${retention}% of seen cards at box 2+</span>
        </div>
        ${renderReviewCalendar()}
      </div>

      <div class="space-y-5">
        ${decks.map(({ domain, mods }) => `
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" style="background:${domain.color}"></span>
              <h2 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">${domain.name}</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              ${mods.map(({ mod, total, due }) => `
                <button class="deck-btn text-left px-3 py-2 rounded-xl border transition ${due ? 'bg-slate-900 border-slate-700 hover:border-emerald-500/50' : 'bg-slate-900/50 border-slate-800/70 hover:border-slate-600'}" data-deck="${mod.id}">
                  <span class="block text-[11px] font-semibold text-slate-200 leading-tight">${mod.title.split(',')[0]}</span>
                  <span class="block text-[10px] font-mono mt-0.5 ${due ? 'text-emerald-400' : 'text-slate-600'}">${due} due · ${total} cards</span>
                </button>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;

  document.getElementById('start-review-btn').addEventListener('click', () => {
    openReviewSession(container, dueCards.length ? dueCards : cards, 'Today’s recall');
  });
  container.querySelectorAll('.deck-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modId = btn.getAttribute('data-deck');
      const mod = TRACK_MODULES.find(m => m.id === modId);
      openReviewSession(container, cards.filter(c => c.moduleId === modId), mod ? mod.title.split(',')[0] : 'Deck');
    });
  });
}

function openReviewSession(container, cards, label) {
  let queue = cards.slice();
  let index = 0;
  let revealed = false;
  let counts = { again: 0, hard: 0, good: 0, easy: 0 };
  const total = queue.length;
  const keyHandler = (e) => {
    if (!document.getElementById('recall-card')) return;
    if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      if (!revealed) { revealed = true; paint(); }
      return;
    }
    if (!revealed) return;
    const grade = RECALL_GRADES.find(g => g.hint === e.key);
    if (grade) { e.preventDefault(); assign(grade.id); }
  };
  document.addEventListener('keydown', keyHandler);

  function finish() {
    document.removeEventListener('keydown', keyHandler);
    const reviewed = counts.again + counts.hard + counts.good + counts.easy;
    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 pb-20 anim-fade-up">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <div class="text-4xl">${counts.again === 0 ? '🏆' : '🗂'}</div>
          <h1 class="text-2xl font-black text-white">${reviewed} card${reviewed === 1 ? '' : 's'} reviewed</h1>
          <p class="text-xs text-slate-400 max-w-md mx-auto">${label} · ${counts.again} again, ${counts.hard} hard, ${counts.good} good, ${counts.easy} easy.</p>
          <div class="flex flex-wrap justify-center gap-2 pt-2">
            <button id="recall-again-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition">↺ Another round</button>
            <button id="recall-home-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">🗂 Back to decks</button>
          </div>
        </div>
      </div>`;
    document.getElementById('recall-home-btn').addEventListener('click', () => renderFlashcardsView(container));
    document.getElementById('recall-again-btn').addEventListener('click', () => renderFlashcardsView(container));
  }

  function assign(gradeId) {
    const card = queue[index];
    counts[gradeId] += 1;
    gradeRecallCard(card.key, gradeId);
    if (gradeId === 'again') {
      // "Again" re-enters the queue three cards later so it is genuinely relearned.
      const reinsert = Math.min(index + 3, queue.length);
      queue.splice(reinsert, 0, card);
    }
    index += 1;
    revealed = false;
    if (index >= queue.length) finish();
    else paint();
  }

  function paint() {
    if (index >= queue.length) { finish(); return; }
    const card = queue[index];
    const mod = TRACK_MODULES.find(m => m.id === card.moduleId);
    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-5 pb-20 anim-fade-up">
        <div class="flex items-center justify-between">
          <button id="recall-exit-btn" class="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition">← Exit</button>
          <span class="text-[11px] font-mono text-slate-400">${index + 1} / ${queue.length}</span>
        </div>
        <div class="h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div class="h-full rounded-full bg-emerald-500 transition-all" style="width:${Math.round((index / queue.length) * 100)}%"></div>
        </div>

        <div id="recall-card" class="bg-slate-900 border border-slate-800 rounded-3xl p-7 space-y-4 min-h-[220px] flex flex-col justify-center">
          <div class="flex items-center gap-2">
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">${card.source}</span>
            ${mod ? `<span class="text-[9px] text-slate-500">${mod.title.split(',')[0]}</span>` : ''}
          </div>
          <div class="text-[15px] leading-relaxed text-slate-100">${formatLessonContent(card.q)}</div>
          ${revealed ? `
            <div class="pt-4 border-t border-slate-800 space-y-2 anim-fade-up">
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Answer</span>
              <div class="text-[13px] leading-relaxed text-emerald-100">${formatLessonContent(card.a)}</div>
            </div>` : `
            <button id="recall-reveal-btn" class="mt-2 self-start px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition">Show answer <span class="text-[10px] opacity-70 ml-1">space</span></button>`}
        </div>

        ${revealed ? `
          <div class="grid grid-cols-4 gap-2">
            ${RECALL_GRADES.map(g => `
              <button class="recall-grade px-2 py-3 rounded-xl border text-center transition ${
                g.tone === 'rose' ? 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20 text-rose-300' :
                g.tone === 'amber' ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-300' :
                g.tone === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300' :
                'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300'}" data-grade="${g.id}">
                <span class="block text-[11px] font-bold">${g.label}</span>
                <span class="block text-[9px] opacity-60 font-mono">${g.hint}</span>
              </button>`).join('')}
          </div>` : ''}
      </div>`;

    document.getElementById('recall-exit-btn').addEventListener('click', () => {
      document.removeEventListener('keydown', keyHandler);
      renderFlashcardsView(container);
    });
    document.getElementById('recall-reveal-btn')?.addEventListener('click', () => { revealed = true; paint(); });
    container.querySelectorAll('.recall-grade').forEach(btn => {
      btn.addEventListener('click', () => assign(btn.getAttribute('data-grade')));
    });
    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false
      });
    }
  }

  paint();
}

// ===================== WHAT-IF LAB VIEW =====================
function renderWhatIfLabView(container) {
  const moduleIds = Object.keys(WHAT_IF_EXPERIMENTS);

  let html = `
    <div class="max-w-4xl mx-auto space-y-8 pb-20 anim-fade-up">
      <div class="space-y-2">
        <h1 class="text-2xl font-extrabold text-white flex items-center gap-2">⚡ What-If Perturbation Lab</h1>
        <p class="text-sm text-slate-400">Predict what happens when you change experimental conditions. Train your Olympiad intuition.</p>
      </div>

      ${moduleIds.length === 0 ? `
        <div class="text-center py-16 text-slate-500">
          <span class="text-4xl block mb-3">⚡</span>
          <p class="text-sm">No experiments available yet. Complete more lessons to unlock perturbation labs!</p>
        </div>
      ` : `
        <div class="space-y-6">
          ${moduleIds.map(modId => {
            const mod = TRACK_MODULES.find(m => m.id === modId);
            const exp = WHAT_IF_EXPERIMENTS[modId];
            const domain = mod ? DOMAINS[Object.keys(DOMAINS).find(k => DOMAINS[k].id === mod.domainId)] : null;
            return `
              <div class="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div class="p-5 border-b border-slate-800/60">
                  <div class="flex items-center gap-2 mb-2">
                    ${domain ? `<span class="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-800 text-slate-300">${domain.name}</span>` : ''}
                    <span class="text-[10px] text-slate-500 font-mono">${exp.options.length} perturbations</span>
                  </div>
                  <h3 class="text-sm font-bold text-white">${mod ? mod.title : modId}</h3>
                  <div class="mt-3 p-3 rounded-xl bg-violet-950/30 border border-violet-500/20">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-violet-400">🧪 Scenario:</span>
                    <p class="text-xs text-white mt-1">${exp.scenario}</p>
                  </div>
                </div>
                <div class="p-5 space-y-3">
                  ${exp.options.map((opt, oIdx) => `
                    <div class="whatif-global-option cursor-pointer rounded-2xl border border-slate-700/80 hover:border-violet-500/40 bg-slate-950/60 overflow-hidden transition-all option-hover-glow" data-global-whatif="${modId}-${oIdx}">
                      <div class="p-4 flex items-center gap-3">
                        <span class="w-7 h-7 shrink-0 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center text-xs font-black">${oIdx + 1}</span>
                        <div class="flex-1">
                          <p class="text-xs font-bold text-white">${opt.action}</p>
                          <p class="text-[11px] text-slate-400 mt-0.5">🔮 ${opt.prediction}</p>
                        </div>
                        <span class="whatif-reveal-icon text-slate-600 text-sm">▶</span>
                      </div>
                      <div class="whatif-feedback hidden p-4 bg-emerald-950/30 border-t border-emerald-500/20 anim-type-reveal">
                        <div class="flex items-start gap-2">
                          <span class="text-emerald-400 text-sm mt-0.5">✓</span>
                          <p class="text-xs text-emerald-200 leading-relaxed">${opt.feedback}</p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  container.innerHTML = html;

  // Bind global what-if interactions
  container.querySelectorAll('.whatif-global-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const feedback = opt.querySelector('.whatif-feedback');
      const icon = opt.querySelector('.whatif-reveal-icon');
      if (feedback.classList.contains('hidden')) {
        feedback.classList.remove('hidden');
        icon.textContent = '▼';
        opt.classList.add('border-violet-500/40');
      } else {
        feedback.classList.add('hidden');
        icon.textContent = '▶';
        opt.classList.remove('border-violet-500/40');
      }
    });
  });
}

// ===================== FULL TEXT FALLBACK LESSON VIEW =====================
function renderFullTextLessonView(container, moduleId) {
  const mod = TRACK_MODULES.find(m => m.id === moduleId) || TRACK_MODULES[0];
  const domain = DOMAINS[Object.keys(DOMAINS).find(k => DOMAINS[k].id === mod.domainId)];
  const isCompleted = userState.completedModules.includes(mod.id);
  const traps = EXAMINER_TRAPS[mod.id] || [];

  let html = `
    <div class="max-w-4xl mx-auto space-y-8 pb-20">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <button id="back-to-track-btn" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5">
          <span>←</span> Back to Track
        </button>
        <div class="flex items-center gap-2 text-xs">
          <button id="toggle-duo-mode-btn" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition">
            🎮 Switch to Duolingo Mode
          </button>
          <span class="px-2.5 py-0.5 rounded font-semibold text-[10.5px] bg-slate-800 text-slate-300">${domain.name}</span>
        </div>
      </div>

      <div class="space-y-3">
        <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">${mod.title}</h1>
        <p class="text-slate-300 text-sm leading-relaxed">${mod.subtitle}</p>
        <div class="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
          <span class="font-mono">⏱ ${mod.estimatedMinutes} mins</span>
          <span>•</span>
          <span class="font-mono text-amber-400">⚡ +${mod.xp} XP</span>
          <span>•</span>
          <span class="text-indigo-400">Sources: ${mod.sources.join('; ')}</span>
        </div>
      </div>

      ${mod.keyFormulas && mod.keyFormulas.length > 0 ? `
        <div class="bg-indigo-950/40 border border-indigo-800/60 rounded-2xl p-5 space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <span>📐</span> Core Mathematical & Biophysical Equations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${mod.keyFormulas.map(f => `
              <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <span class="text-[11px] font-semibold text-slate-400 block">${f.name}</span>
                <div class="text-xs text-indigo-200 font-mono overflow-x-auto py-1">$$${f.latex}$$</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div id="full-text-visual-slot"></div>
      <div id="full-text-simulator-slot"></div>

      <!-- Examiner Traps Section -->
      ${traps.length > 0 ? `
        <div class="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-5 space-y-4">
          <h3 class="text-sm font-bold text-rose-300 flex items-center gap-2">
            <span>⚠️</span> Examiner Traps for This Module
          </h3>
          ${traps.map(trap => `
            <div class="p-4 rounded-xl bg-slate-950/60 border border-rose-500/10 space-y-2">
              <h4 class="text-xs font-bold text-rose-200">${trap.title}</h4>
              <p class="text-xs text-slate-300 leading-relaxed">${trap.trap}</p>
              <div class="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/20">
                <p class="text-[11px] text-amber-200/80"><strong>💡 Camp Tip:</strong> ${trap.campTip}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="space-y-8 text-slate-200 text-sm leading-relaxed">
        ${mod.sections.map((s, i) => `
          <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-lg">
            <h2 class="text-lg font-bold text-white border-b border-slate-800 pb-2">${s.heading}</h2>
            ${renderLessonFigure(mod.id, i)}
            <div class="space-y-3 text-slate-300">
              ${formatLessonContent(s.content)}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 flex items-center justify-between">
        <h4 class="text-base font-bold text-white">Finished reading the complete module?</h4>
        <button id="mark-complete-btn" class="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition">
          ${isCompleted ? '✓ Completed' : 'Mark Complete (+' + mod.xp + ' XP)'}
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Mount visual model (a broken canvas must not break the reading view)
  try {
    mountVisualModel(mod.id);
  } catch (err) {
    console.error('Visual model failed to mount', err);
  }

  document.getElementById('back-to-track-btn').addEventListener('click', () => navigate('track'));
  document.getElementById('toggle-duo-mode-btn').addEventListener('click', () => {
    userState.lessonViewMode = 'duolingo';
    saveState();
    renderCurrentView();
  });

  const markBtn = document.getElementById('mark-complete-btn');
  if (markBtn && !isCompleted) {
    markBtn.addEventListener('click', () => {
      if (!userState.completedModules.includes(mod.id)) {
        userState.completedModules.push(mod.id);
        userState.xp += mod.xp;
        saveState();
        renderNavigation();
        triggerCelebrationConfetti();
        showXpFloat(mod.xp, markBtn);
        markBtn.textContent = '✓ Completed';
        markBtn.classList.replace('bg-emerald-600', 'bg-slate-700');
      }
    });
  }
}

// ===================== VISUAL MODEL MOUNTING (Full Text View) =====================
function mountVisualModel(moduleId) {
  const MODEL_MAP = {
    'cell-1-kinetics': () => { createEnzymeCatalyticCycleModel('full-text-visual-slot'); renderLineweaverBurkSimulator('full-text-simulator-slot'); },
    'cell-2-chemiosmosis': () => createETCInteractiveModel('full-text-visual-slot'),
    'cell-3-signaling': () => createSignalingCascadeModel('full-text-visual-slot'),
    'cell-4-trafficking': () => createTraffickingSnareModel('full-text-visual-slot'),
    'cell-5-checkpoints-apoptosis': () => createCellCycleApoptosisModel('full-text-visual-slot'),
    'plant-1-hydraulics': () => createPlantHydraulicsModel('full-text-visual-slot'),
    'plant-2-photochemistry': () => createKokCycleInteractiveModel('full-text-visual-slot'),
    'plant-3-c4-cam': () => createKranzAnatomyModel('full-text-visual-slot'),
    'plant-4-hormones': () => createAuxinPolarTransportModel('full-text-visual-slot'),
    'animal-1-neuro': () => { createNavChannelMolecularModel('full-text-visual-slot'); renderGhkActionPotentialSimulator('full-text-simulator-slot'); },
    'animal-2-cardio': () => renderWiggersDiagramExplorer('full-text-visual-slot'),
    'animal-3-renal': () => createRenalCountercurrentDavenportModel('full-text-visual-slot'),
    'genetics-1-mapping': () => renderThreePointCrossMapper('full-text-visual-slot'),
    'genetics-2-popgen': () => createPopGenSelectionModel('full-text-visual-slot'),
    'eco-1-dynamics': () => createLotkaVolterraModel('full-text-visual-slot'),
    'ethology-1-kin-selection': () => createKinSelectionGameTheoryModel('full-text-visual-slot'),
    'systematics-1-cladistics': () => createCladisticsParsimonyModel('full-text-visual-slot'),
    'cell-6-molecular-genetics': () => createDNAReplicationForkModel('full-text-visual-slot'),
    'cell-7-microbiology': () => createMicrobiologyModel('full-text-visual-slot'),
    'cell-8-biotechnology': () => createBiotechPCRModel('full-text-visual-slot'),
    'plant-5-anatomy': () => createPlantAnatomyModel('full-text-visual-slot'),
    'plant-6-reproduction': () => createDoubleFertilizationModel('full-text-visual-slot'),
    'animal-4-digestion': () => createDigestionModel('full-text-visual-slot'),
    'animal-5-respiration': () => createOxyHbDissociationModel('full-text-visual-slot'),
    'animal-6-immunity': () => createImmuneResponseModel('full-text-visual-slot'),
    'animal-7-reproduction-development': () => createEmbryologyModel('full-text-visual-slot'),
    'animal-8-endocrine': () => createEndocrineAxisModel('full-text-visual-slot'),
    'genetics-3-mendelian-extensions': () => createEpistasisModel('full-text-visual-slot'),
    'genetics-4-gene-regulation': () => createGeneRegulationModel('full-text-visual-slot'),
    'eco-2-ecosystems': () => createEcosystemEnergyModel('full-text-visual-slot'),
    'eco-3-predation-biodiversity': () => createPredatorPreyModel('full-text-visual-slot'),
    'ethology-2-classical-behavior': () => createEthologyBehaviorModel('full-text-visual-slot')
  };

  if (MODEL_MAP[moduleId]) MODEL_MAP[moduleId]();
}

// ===================== STEP INTERACTIVE MODEL MOUNTER =====================
function mountStepInteractiveModel(moduleId, stepIdx, containerId) {
  const MODEL_MAP = {
    'cell-1-kinetics': (s) => s === 0 ? createEnzymeCatalyticCycleModel(containerId) : renderLineweaverBurkSimulator(containerId),
    'cell-2-chemiosmosis': () => createETCInteractiveModel(containerId),
    'cell-3-signaling': () => createSignalingCascadeModel(containerId),
    'cell-4-trafficking': () => createTraffickingSnareModel(containerId),
    'cell-5-checkpoints-apoptosis': () => createCellCycleApoptosisModel(containerId),
    'plant-1-hydraulics': () => createPlantHydraulicsModel(containerId),
    'plant-2-photochemistry': () => createKokCycleInteractiveModel(containerId),
    'plant-3-c4-cam': () => createKranzAnatomyModel(containerId),
    'plant-4-hormones': () => createAuxinPolarTransportModel(containerId),
    'animal-1-neuro': (s) => s === 1 ? renderGhkActionPotentialSimulator(containerId) : createNavChannelMolecularModel(containerId),
    'animal-2-cardio': () => renderWiggersDiagramExplorer(containerId),
    'animal-3-renal': () => createRenalCountercurrentDavenportModel(containerId),
    'genetics-1-mapping': () => renderThreePointCrossMapper(containerId),
    'genetics-2-popgen': () => createPopGenSelectionModel(containerId),
    'eco-1-dynamics': () => createLotkaVolterraModel(containerId),
    'ethology-1-kin-selection': () => createKinSelectionGameTheoryModel(containerId),
    'systematics-1-cladistics': () => createCladisticsParsimonyModel(containerId),
    'cell-6-molecular-genetics': () => createDNAReplicationForkModel(containerId),
    'cell-7-microbiology': () => createMicrobiologyModel(containerId),
    'cell-8-biotechnology': () => createBiotechPCRModel(containerId),
    'plant-5-anatomy': () => createPlantAnatomyModel(containerId),
    'plant-6-reproduction': () => createDoubleFertilizationModel(containerId),
    'animal-4-digestion': () => createDigestionModel(containerId),
    'animal-5-respiration': () => createOxyHbDissociationModel(containerId),
    'animal-6-immunity': () => createImmuneResponseModel(containerId),
    'animal-7-reproduction-development': () => createEmbryologyModel(containerId),
    'animal-8-endocrine': () => createEndocrineAxisModel(containerId),
    'genetics-3-mendelian-extensions': () => createEpistasisModel(containerId),
    'genetics-4-gene-regulation': () => createGeneRegulationModel(containerId),
    'eco-2-ecosystems': () => createEcosystemEnergyModel(containerId),
    'eco-3-predation-biodiversity': () => createPredatorPreyModel(containerId),
    'ethology-2-classical-behavior': () => createEthologyBehaviorModel(containerId)
  };

  if (MODEL_MAP[moduleId]) MODEL_MAP[moduleId](stepIdx);
}

// ===================== STEP CHECKPOINT QUESTION BANK =====================
const CHECKPOINT_BANK = {
    'cell-1-kinetics': [
      {
        prompt: "Which of the following enzymes operates closest to the physical diffusion-controlled limit (kcat/Km \u2248 10\u2078 - 10\u2079 M\u207b\u00b9\u00b7s\u207b\u00b9)?",
        options: ["Carbonic anhydrase (kcat/Km \u2248 1.5 \u00d7 10\u2078 M\u207b\u00b9\u00b7s\u207b\u00b9)", "Chymotrypsin (kcat/Km \u2248 1.0 \u00d7 10\u00b3 M\u207b\u00b9\u00b7s\u207b\u00b9)", "DNA Polymerase I (kcat/Km \u2248 5.0 \u00d7 10\u2075 M\u207b\u00b9\u00b7s\u207b\u00b9)"],
        correctIndex: 0,
        explanation: "Carbonic anhydrase, triose phosphate isomerase (TPI), and catalase are catalytically perfect enzymes operating at the theoretical diffusion limit!"
      },
      {
        prompt: "If an inhibitor causes double-reciprocal Lineweaver-Burk plots to run strictly parallel with no change in slope, what is its mechanism?",
        options: ["Competitive (binds free enzyme E)", "Uncompetitive (binds ES complex exclusively)", "Pure non-competitive (binds E and ES equally)"],
        correctIndex: 1,
        explanation: "Uncompetitive inhibition reduces both apparent Km and Vmax by factor \u03b1', preserving the slope Km/Vmax and generating parallel lines!"
      },
      {
        prompt: "An allosteric tetrameric enzyme exhibits negative cooperativity (nH = 0.55). According to allosteric theory, which model can account for this?",
        options: ["KNF Sequential Model only", "MWC Concerted Model only", "Both MWC and KNF models"],
        correctIndex: 0,
        explanation: "Negative cooperativity is mathematically impossible in the MWC concerted model because all subunits transition symmetrically. Only the KNF sequential model accommodates negative cooperativity!"
      },
      {
        prompt: "In a ping-pong bisubstrate mechanism, what event occurs before the second substrate B can bind?",
        options: ["Substrate B binds to form a ternary EAB complex", "The first product P is released and a modified enzyme intermediate (E*) is formed", "Both products P and Q are released simultaneously"],
        correctIndex: 1,
        explanation: "Ping-pong (double-displacement) kinetics requires product P to dissociate before substrate B docks onto the modified enzyme intermediate!"
      }
    ],
    'cell-2-chemiosmosis': [
      {
        prompt: "How many net protons are translocated into the intermembrane space per pair of electrons passing through the Cytochrome bc\u2081 complex (Complex III)?",
        options: ["2 H\u207a", "4 H\u207a (via the two-cycle Q-cycle mechanism)", "6 H\u207a"],
        correctIndex: 1,
        explanation: "The Q-cycle oxidizes 2 molecules of QH\u2082 and reduces 1 Q, pumping a net 4 H\u207a into the IMS per 2 electrons delivered to cytochrome c!"
      },
      {
        prompt: "In mammalian mitochondria, which component contributes ~80% of the total proton-motive force (\u0394p \u2248 215 mV)?",
        options: ["Electrical membrane potential (\u0394\u03a8 \u2248 -170 mV)", "pH gradient (\u0394pH)", "Osmotic hydrostatic pressure"],
        correctIndex: 0,
        explanation: "In mitochondria, electrical potential \u0394\u03a8 dominates (~80%), whereas in chloroplast thylakoids, ion counter-fluxes collapse \u0394\u03a8 so \u0394pH accounts for almost 100%!"
      },
      {
        prompt: "Mammalian ATP synthase has an 8-subunit c-ring. Accounting for phosphate and ADP symport, what is the energetic cost per ATP synthesized and exported?",
        options: ["2.67 H\u207a / ATP", "3.67 H\u207a / ATP (2.67 for c-ring + 1 for transport)", "4.67 H\u207a / ATP"],
        correctIndex: 1,
        explanation: "8 protons rotate the ring 360\u00b0 to make 3 ATP (8/3 = 2.67), plus 1 proton equivalent for ANT and phosphate translocase = 3.67 H\u207a/ATP!"
      },
      {
        prompt: "What is observed when the chemical uncoupler 2,4-dinitrophenol (DNP) is added to coupled mitochondria?",
        options: ["Oxygen consumption halts immediately", "Oxygen consumption accelerates to maximum rate while ATP synthesis ceases", "Proton-motive force builds to toxic levels"],
        correctIndex: 1,
        explanation: "DNP dissipates the proton gradient as heat, removing PMF back-pressure and driving oxygen consumption to its absolute maximum without ATP generation!"
      }
    ],
    'cell-3-signaling': [
      {
        prompt: "What is the molecular mechanism of Cholera toxin on G-protein signaling?",
        options: ["ADP-ribosylates G\u03b1s, locking it in constitutive active GTP-bound state", "ADP-ribosylates G\u03b1i, preventing adenylyl cyclase inhibition", "Phosphorylates RTKs directly"],
        correctIndex: 0,
        explanation: "Cholera toxin ADP-ribosylates G\u03b1s, inhibiting intrinsic GTPase activity so adenylyl cyclase remains constitutively active, causing massive cAMP accumulation!"
      },
      {
        prompt: "Which lipid phosphatase acts as the critical negative regulator of the PI3K-Akt cell survival cascade by dephosphorylating PIP\u2083 into PIP\u2082?",
        options: ["PTEN", "SHP-2", "PLC-\u03b2"],
        correctIndex: 0,
        explanation: "PTEN dephosphorylates PIP\u2083 into PIP\u2082, opposing PI3K. Loss-of-function mutations in PTEN drive oncogenic Akt/mTOR hyperactivation!"
      }
    ],
    'cell-4-trafficking': [
      {
        prompt: "Which small GTPase initiates COPII vesicle coat assembly at the rough ER membrane?",
        options: ["Sar1 GTPase", "Arf1 GTPase", "Dynamin"],
        correctIndex: 0,
        explanation: "Sar1-GDP is activated by ER membrane GEF Sec12, inserting its amphipathic helix to recruit the Sec23/24 inner coat!"
      },
      {
        prompt: "What provides the free energy required to disassemble the stable post-fusion cis-SNARE complex in the target membrane?",
        options: ["ATP hydrolysis catalyzed by NSF (an AAA+ ATPase) and \u03b1-SNAP", "GTP hydrolysis by Rab", "Membrane voltage dissipation"],
        correctIndex: 0,
        explanation: "NSF is a hexameric AAA+ ATPase that unwinds the tight 4-helix SNARE bundle using ATP hydrolysis, freeing SNAREs for recycling!"
      }
    ],
    'cell-5-checkpoints-apoptosis': [
      {
        prompt: "How does the dual-specificity phosphatase Cdc25 trigger entry into mitosis at the G2/M boundary?",
        options: ["Removes inhibitory phosphates from Thr14 and Tyr15 on CDK1", "Directly ubiquitinates Cyclin B", "Phosphorylates Wee1 kinase"],
        correctIndex: 0,
        explanation: "Cdc25 dephosphorylates Thr14 and Tyr15 on CDK1, creating an irreversible positive feedback loop that rapidly activates MPF!"
      },
      {
        prompt: "Which multi-protein heptameric complex forms in the cytosol upon mitochondrial release of Cytochrome c to activate Caspase-9?",
        options: ["The Apoptosome (Apaf-1 + Cytochrome c + dATP)", "The DISC (Death-Inducing Signaling Complex)", "The Proteasome"],
        correctIndex: 0,
        explanation: "Cytochrome c binds Apaf-1 in the presence of dATP, assembling the wheel-like heptameric apoptosome that recruits initiator procaspase-9!"
      }
    ],
    'plant-1-hydraulics': [
      {
        prompt: "What is the function of the torus-margo bordered pit membrane in conifer tracheids during cavitation?",
        options: ["The torus aspirates against the overarching pit border, sealing the pit to prevent air spreading", "Increases transpiration by 50%", "Secretes suberin into xylem"],
        correctIndex: 0,
        explanation: "The torus acts as a one-way safety valve: large pressure differentials aspirate the impermeable torus over the pit aperture, isolating the embolized tracheid!"
      }
    ],
    'plant-2-photochemistry': [
      {
        prompt: "In dark-adapted chloroplasts, what is the predominant initial S-state of the Oxygen-Evolving Complex (Mn\u2084CaO\u2085 cluster)?",
        options: ["S\u2081 (thermodynamically stable dark ground state)", "S\u2080", "S\u2084"],
        correctIndex: 0,
        explanation: "Because S\u2081 is stable in the dark, single-turnover flash trains require 3 flashes (S\u2081 \u2192 S\u2082 \u2192 S\u2083 \u2192 S\u2084 \u2192 S\u2080) to yield the first peak of oxygen!"
      }
    ],
    'plant-3-c4-cam': [
      {
        prompt: "Why do bundle sheath chloroplasts in NADP-ME C\u2084 plants (such as maize) exhibit agranal ultrastructure?",
        options: ["They lack PSII, minimizing local O\u2082 production to suppress Rubisco photorespiration", "They lack ATP synthase", "They cannot fix carbon in the dark"],
        correctIndex: 0,
        explanation: "Agranal bundle sheath chloroplasts lack grana and PSII, drastically lowering O\u2082 concentration around Rubisco while pumping in 10,000 ppm CO\u2082!"
      }
    ],
    'plant-4-hormones': [
      {
        prompt: "What is the biochemical role of auxin (IAA) in the TIR1 receptor complex?",
        options: ["Acts as a 'molecular glue' completing the binding pocket for the Aux/IAA repressor degron", "Directly phosphorylates ARF transcription factors", "Cleaves cellulose walls enzymatically"],
        correctIndex: 0,
        explanation: "Auxin fits into a hydrophobic pocket on the TIR1 F-box protein, creating the interaction surface that recruits Aux/IAA repressors for ubiquitination!"
      }
    ],
    'animal-1-neuro': [
      {
        prompt: "Which hydrophobic amino acid sequence on the intracellular loop of Na\u1d65 channels acts as the inactivation ball?",
        options: ["IFMT (Isoleucine - Phenylalanine - Methionine - Threonine)", "KDEL", "RGD"],
        correctIndex: 0,
        explanation: "The IFMT motif forms the hydrophobic hinged lid that swings into the inner channel mouth within 1 ms of depolarization (h-gate inactivation)!"
      }
    ],
    'animal-2-cardio': [
      {
        prompt: "In the cardiac cycle Wiggers diagram, what event marks the start of Isovolumetric Ventricular Contraction and generates the S\u2081 heart sound?",
        options: ["Closure of the atrioventricular (Mitral and Tricuspid) valves", "Closure of the Aortic valve", "Opening of the Aortic valve"],
        correctIndex: 0,
        explanation: "As ventricular pressure exceeds atrial pressure, the mitral and tricuspid valves snap shut, producing the S\u2081 sound at constant End-Diastolic Volume!"
      }
    ],
    'animal-3-renal': [
      {
        prompt: "What cotransporter in the thick ascending limb of Henle creates the lumen-positive potential (+8 mV)?",
        options: ["NKCC2 (1 Na\u207a : 1 K\u207a : 2 Cl\u207b)", "SGLT2", "NCX"],
        correctIndex: 0,
        explanation: "NKCC2 reabsorbs Na\u207a, K\u207a, and 2 Cl\u207b, while K\u207a back-leaks through apical ROMK channels, generating the +8 mV lumen-positive driving force!"
      }
    ],
    'genetics-1-mapping': [
      {
        prompt: "If 10 double crossovers are observed out of 20 expected in a three-point testcross, what is the genetic interference (I)?",
        options: ["I = 0.50 (Positive Interference)", "I = 0.20", "I = -0.50"],
        correctIndex: 0,
        explanation: "COC = Observed DCO / Expected DCO = 10 / 20 = 0.50. Interference I = 1 - COC = 1 - 0.50 = 0.50!"
      }
    ],
    'genetics-2-popgen': [
      {
        prompt: "In a population under overdominance with w\u2081\u2081 = 0.8 and w\u2082\u2082 = 0.2 (w\u2081\u2082 = 1.0), what is the stable equilibrium p\u0302?",
        options: ["p\u0302 = 0.80", "p\u0302 = 0.50", "p\u0302 = 0.20"],
        correctIndex: 0,
        explanation: "s\u2081 = 0.2; s\u2082 = 0.8. Equilibrium p\u0302 = s\u2082 / (s\u2081 + s\u2082) = 0.8 / 1.0 = 0.80!"
      }
    ],
    'eco-1-dynamics': [
      {
        prompt: "Under Lotka-Volterra competition, what condition guarantees stable species coexistence?",
        options: ["\u03b1\u2081\u2082 < K\u2081/K\u2082 and \u03b1\u2082\u2081 < K\u2082/K\u2081 (Intraspecific > interspecific competition)", "\u03b1\u2081\u2082 > K\u2081/K\u2082", "K\u2081 = K\u2082 always"],
        correctIndex: 0,
        explanation: "Stable coexistence requires each species to inhibit its own growth more strongly than it inhibits the competitor!"
      }
    ],
    'ethology-1-kin-selection': [
      {
        prompt: "In haplodiploid Hymenoptera, what is the coefficient of relatedness (r) between two full sisters?",
        options: ["r = 0.75", "r = 0.50", "r = 0.25"],
        correctIndex: 0,
        explanation: "Full sisters share 0.25 through mother (0.5 \u00d7 0.5) and 0.50 through haploid father (1.0 \u00d7 0.5) = 0.75!"
      }
    ],
    'systematics-1-cladistics': [
      {
        prompt: "What is the definition of a paraphyletic group?",
        options: ["A group that includes an ancestor and SOME but not all descendants", "A group with an ancestor and all descendants", "A group of convergent taxa"],
        correctIndex: 0,
        explanation: "A paraphyletic group (e.g. traditional 'Reptilia' excluding birds) omits one or more descendant lineages!"
      }
    ],
    'cell-6-molecular-genetics': [
      {
        prompt: "Which mechanism removes Okazaki RNA primers and which enzyme seals the nick?",
        options: ["DNA Pol \u03b4 displaces primer into a 5' flap cleaved by FEN1; DNA Ligase I seals nick", "Telomerase removes primers; Helicase seals nick", "Topoisomerase II cleaves primer directly"],
        correctIndex: 0,
        explanation: "DNA Pol \u03b4 displaces the RNA primer into a flap cleaved by FEN1, followed by DNA Ligase I sealing the backbone!"
      },
      {
        prompt: "What phosphorylation on RNA Pol II CTD triggers promoter clearance and mRNA 5' capping?",
        options: ["Ser5 phosphorylation by TFIIH kinase (CDK7)", "Lys9 acetylation by HATs", "Dephosphorylation by Cdc25"],
        correctIndex: 0,
        explanation: "TFIIH CDK7 phosphorylates Ser5 of the CTD, releasing Pol II and recruiting capping enzymes!"
      }
    ],
    'cell-7-microbiology': [
      {
        prompt: "Which outer membrane component of Gram-negative bacteria acts as endotoxin via TLR4/MD-2?",
        options: ["Lipid A moiety of LPS", "Lipoteichoic acid", "Peptidoglycan monomer"],
        correctIndex: 0,
        explanation: "Lipid A is the toxic PAMP recognized by TLR4/MD-2 to trigger massive inflammatory cytokines!"
      },
      {
        prompt: "What maintains the dormant lysogenic state in bacteriophage \u03bb?",
        options: ["cI repressor dimers bound cooperatively to O_R1 and O_R2", "RecA protease activation", "Cro binding to O_R3"],
        correctIndex: 0,
        explanation: "cI repressor binds O_R1/O_R2, repressing Cro while activating its own promoter to sustain lysogeny!"
      }
    ],
    'cell-8-biotechnology': [
      {
        prompt: "What motif is required adjacent to the protospacer for SpCas9 cleavage (CRISPR)?",
        options: ["PAM: 5'-NGG-3'", "TATA box: 5'-TATAAA-3'", "Polyadenylation signal: 5'-AATAAA-3'"],
        correctIndex: 0,
        explanation: "SpCas9 requires 5'-NGG-3' PAM to trigger DNA unwinding and R-loop formation!"
      },
      {
        prompt: "Why is Taq polymerase used in PCR instead of standard DNA Pol I?",
        options: ["Taq survives 95\u00b0C denaturation without losing activity", "Taq has 3'\u21925' proofreading", "Taq doesn't need primers"],
        correctIndex: 0,
        explanation: "From Thermus aquaticus, Taq withstands repeated 95\u00b0C cycles!"
      }
    ],
    'plant-5-anatomy': [
      {
        prompt: "By Hagen-Poiseuille (Q \u221d r\u2074), if a vessel has 4x the radius of a tracheid, how much greater is flow?",
        options: ["256-fold (4\u2074 = 256)", "16-fold", "64-fold"],
        correctIndex: 0,
        explanation: "Hydraulic conductance scales with r\u2074. 4x radius = 256x flow!"
      },
      {
        prompt: "Which meristem produces secondary xylem (wood) inward and secondary phloem outward?",
        options: ["Vascular Cambium", "Cork Cambium (Phellogen)", "Procambium"],
        correctIndex: 0,
        explanation: "The vascular cambium divides periclinally to produce wood inward and phloem outward!"
      }
    ],
    'plant-6-reproduction': [
      {
        prompt: "In double fertilization, what ploidy is the endosperm?",
        options: ["Triploid (3n: 1n sperm + 2n polar nuclei)", "Diploid (2n)", "Haploid (1n)"],
        correctIndex: 0,
        explanation: "One sperm + egg = 2n zygote; second sperm + 2 polar nuclei = 3n endosperm!"
      },
      {
        prompt: "What peptides guide the pollen tube to the micropyle?",
        options: ["LURE peptides from synergids", "Auxin (IAA)", "Defensins"],
        correctIndex: 0,
        explanation: "Synergid LURE peptides bind pollen tube tip receptor kinases for species-specific guidance!"
      }
    ],
    'animal-4-digestion': [
      {
        prompt: "How does the parietal cell maintain pH during massive H\u207a pumping?",
        options: ["Basolateral AE2 exports HCO\u2083\u207b for Cl\u207b (Alkaline Tide)", "Direct NH\u2084\u207a diffusion", "Passive H\u207a leakage"],
        correctIndex: 0,
        explanation: "Carbonic anhydrase yields H\u207a (pumped apically) and HCO\u2083\u207b (exported via AE2, creating alkaline tide)!"
      },
      {
        prompt: "Why do chylomicrons bypass the hepatic portal?",
        options: ["Too large for capillaries; enter lacteals to thoracic duct", "Degraded in portal blood", "Enter bile duct directly"],
        correctIndex: 0,
        explanation: "Chylomicrons (75-1200 nm) enter blind-ended lacteals, draining into thoracic duct!"
      }
    ],
    'animal-5-respiration': [
      {
        prompt: "Which shifts stabilize the T-state of hemoglobin (Bohr Effect)?",
        options: ["Acidosis, hypercapnia, elevated temp, increased 2,3-BPG", "Alkalosis, hypothermia, decreased 2,3-BPG", "Fetal hemoglobin (HbF)"],
        correctIndex: 0,
        explanation: "CADET shifts right: CO\u2082, Acid, 2,3-DPG/BPG, Exercise, Temperature!"
      },
      {
        prompt: "What enzyme and transporter mediate the chloride shift?",
        options: ["Carbonic Anhydrase II; Band 3 (AE1)", "Cytochrome oxidase; SGLT1", "SOD; CFTR"],
        correctIndex: 0,
        explanation: "CA II hydrates CO\u2082; Band 3 exports HCO\u2083\u207b for Cl\u207b (Hamburger phenomenon)!"
      }
    ],
    'animal-6-immunity': [
      {
        prompt: "What initiates V(D)J recombination by recognizing RSS?",
        options: ["RAG1 and RAG2 recombinases", "AID", "DNA Pol \u03b3"],
        correctIndex: 0,
        explanation: "RAG1/2 bind 12/23 RSS spacers to create coding joint hairpins for BCR/TCR diversity!"
      },
      {
        prompt: "Which cells express MHC Class II for CD4\u207a T cell activation?",
        options: ["Professional APCs: DCs, Macrophages, B cells", "All nucleated cells", "Neutrophils and CTLs only"],
        correctIndex: 0,
        explanation: "MHC II is restricted to professional APCs presenting exogenous antigens to CD4\u207a T cells!"
      }
    ],
    'animal-7-reproduction-development': [
      {
        prompt: "What does the Spemann-Mangold organizer secrete to induce neural plate?",
        options: ["Chordin, Noggin, Follistatin (BMP4 antagonists)", "Direct keratin activation", "High-dose BMP4"],
        correctIndex: 0,
        explanation: "Default ectoderm fate is neural! Organizer blocks BMP4 to allow neural tube formation!"
      },
      {
        prompt: "What ion flux triggers the cortical reaction (slow polyspermy block)?",
        options: ["IP\u2083-mediated Ca\u00b2\u207a wave causing cortical granule exocytosis", "K\u207a efflux", "ATP injection"],
        correctIndex: 0,
        explanation: "PLC-\u03b6 triggers IP\u2083/Ca\u00b2\u207a wave; cortical granules cleave ZP receptors!"
      }
    ],
    'animal-8-endocrine': [
      {
        prompt: "What does ACE cleave on pulmonary capillary endothelium in RAAS?",
        options: ["Angiotensin I \u2192 Angiotensin II (remove C-terminal dipeptide)", "Angiotensinogen \u2192 Angiotensin I", "Aldosterone \u2192 Cortisol"],
        correctIndex: 0,
        explanation: "ACE cleaves the dipeptide from Ang I to produce the vasoconstrictor Ang II!"
      },
      {
        prompt: "How does PTH elevate blood calcium across bone, kidney, intestine?",
        options: ["RANKL on osteoblasts, distal Ca\u00b2\u207a reabsorption, 1\u03b1-hydroxylase for calcitriol", "Stimulates calcitonin", "Blocks all phosphate excretion"],
        correctIndex: 0,
        explanation: "PTH: RANKL \u2192 osteoclasts, renal Ca\u00b2\u207a reabsorption, CYP27B1 \u2192 1,25-(OH)\u2082D\u2083!"
      }
    ],
    'genetics-3-mendelian-extensions': [
      {
        prompt: "In recessive epistasis (9:3:4), why does aabb share phenotype with A_bb?",
        options: ["bb blocks an upstream precursor, masking gene A", "A and B are physically linked", "Both genes on Y chromosome"],
        correctIndex: 0,
        explanation: "Recessive epistasis: absence of enzyme B blocks precursor, masking A phenotype!"
      },
      {
        prompt: "By the Breeder's Equation (R = h\u00b2S), if h\u00b2 = 0.50 and S = +8.0 cm, what is R?",
        options: ["R = +4.0 cm", "R = +8.0 cm", "R = +16.0 cm"],
        correctIndex: 0,
        explanation: "R = 0.50 \u00d7 8.0 = +4.0 cm gain per generation!"
      }
    ],
    'genetics-4-gene-regulation': [
      {
        prompt: "When does the lac operon achieve maximum transcription?",
        options: ["Low Glucose (cAMP-CAP active) AND Lactose present (LacI removed)", "High Glucose AND Lactose", "Low Glucose AND No Lactose"],
        correctIndex: 0,
        explanation: "Full induction requires BOTH cAMP-CAP activation AND allolactose relief of LacI!"
      },
      {
        prompt: "Which modification relaxes chromatin for transcription?",
        options: ["Histone acetylation by HATs (H3K9ac, H3K14ac)", "Histone methylation by HMTs", "CpG DNA methylation"],
        correctIndex: 0,
        explanation: "HATs neutralize lysine positive charge, weakening histone-DNA interaction = euchromatin!"
      }
    ],
    'eco-2-ecosystems': [
      {
        prompt: "Why can pelagic marine ecosystems have inverted biomass pyramids?",
        options: ["Phytoplankton have extremely high turnover (P/B ratio)", "Zooplankton do chemosynthesis", "Phytoplankton don't need sunlight"],
        correctIndex: 0,
        explanation: "Rapid phytoplankton division (high P/B) means low standing crop but massive annual production!"
      },
      {
        prompt: "Why is nitrogenase irreversibly inhibited by O\u2082?",
        options: ["Fe-S and Mo-Fe centers destroyed by O\u2082", "O\u2082 causes photorespiration in nitrogenase", "O\u2082 halts hydration reactions"],
        correctIndex: 0,
        explanation: "Nitrogenase metal centers are O\u2082-labile; protected by leghemoglobin in legume nodules!"
      }
    ],
    'eco-3-predation-biodiversity': [
      {
        prompt: "What is the predator-prey phase relationship in Lotka-Volterra?",
        options: ["Predator peaks \u00bc cycle (\u03c0/2) behind prey", "Perfectly synchronized", "Prey peaks \u00bd cycle behind predator"],
        correctIndex: 0,
        explanation: "Predator reproduction lags prey abundance; peak ~90\u00b0 (quarter-cycle) behind!"
      },
      {
        prompt: "Which island type has highest equilibrium species richness (MacArthur-Wilson)?",
        options: ["Large island Near mainland (high immigration + low extinction)", "Small Far island", "Small Near island"],
        correctIndex: 0,
        explanation: "Large = low extinction; Near = high immigration \u2192 maximum equilibrium S\u0302!"
      }
    ],
    'ethology-2-classical-behavior': [
      {
        prompt: "In the waggle dance, what does 'straight up' on the comb represent?",
        options: ["Current sun azimuth direction", "Magnetic North", "Hive entrance"],
        correctIndex: 0,
        explanation: "Bees translate solar azimuth to gravitational vertical: up = toward sun!"
      },
      {
        prompt: "What drives the mammalian circadian clock in the SCN?",
        options: ["CLOCK-BMAL1 transcribe PER/CRY; PER/CRY inhibit CLOCK-BMAL1", "Epinephrine oscillations", "Cardiac pacemaker cycling"],
        correctIndex: 0,
        explanation: "Transcription-translation negative feedback: PER/CRY accumulate, inhibit CLOCK-BMAL1 until proteasomal degradation resets the cycle!"
      }
    ],
    // ===== Added modules (IBO/USABO syllabus gap fill) =====
    'cell-9-biomolecules': [
      {
        prompt: "A buffer has a pKa of 6.8. Over which pH range is it most effective at resisting pH change?",
        options: ["pH 3.8 to 4.8", "pH 5.8 to 7.8", "pH 7.8 to 9.8"],
        correctIndex: 1,
        explanation: "A buffer works best within about one pH unit either side of its pKa, so a pKa of 6.8 gives an effective range near 5.8-7.8; beyond that the ratio of conjugate base to acid changes by an order of magnitude per pH unit."
      },
      {
        prompt: "Which force makes the dominant contribution to a globular protein's tertiary structure?",
        options: ["Hydrophobic collapse of nonpolar side chains away from water", "Main-chain hydrogen bonding between backbone amides", "Disulfide bonds between cysteine residues"],
        correctIndex: 0,
        explanation: "The hydrophobic effect drives burial of nonpolar residues and is the dominant folding force in aqueous solution; backbone hydrogen bonds define secondary structure and disulfides only stabilise the folded state once formed."
      },
      {
        prompt: "Which polysaccharide cannot be digested by human amylases, and why?",
        options: ["Cellulose, because it is linked by beta-1,4 glycosidic bonds", "Starch, because it is branched by alpha-1,6 bonds", "Glycogen, because it is stored in the liver"],
        correctIndex: 0,
        explanation: "Human amylases and maltases act only on alpha linkages; the beta-1,4 bonds of cellulose require microbial cellulases, which is why dietary fibre reaches the colon intact."
      }
    ],
    'cell-10-membranes-transport': [
      {
        prompt: "A plant cell has solute potential -0.6 MPa and pressure potential +0.2 MPa. It is placed in a solution with water potential -0.5 MPa. What happens?",
        options: ["Water enters the cell, because its water potential (-0.4 MPa) is higher than the solution", "Water leaves the cell, because the solution is more negative", "No net movement, because the potentials are equal"],
        correctIndex: 0,
        explanation: "Cell water potential is -0.6 + 0.2 = -0.4 MPa, which is higher (less negative) than the -0.5 MPa external solution, so water moves down its water potential gradient into the cell and turgor rises."
      },
      {
        prompt: "How many ions does the Na+/K+ ATPase move per ATP hydrolysed, and in which direction?",
        options: ["3 Na+ out and 2 K+ in", "2 Na+ out and 3 K+ in", "1 Na+ out and 1 K+ in"],
        correctIndex: 0,
        explanation: "Each cycle exports 3 Na+ and imports 2 K+, so the pump is electrogenic and contributes a few millivolts to the resting membrane potential while consuming roughly 30% of resting ATP."
      },
      {
        prompt: "Which junctional complex allows small molecules and ions to pass directly between adjacent cardiac muscle cells?",
        options: ["Gap junctions built from connexins", "Desmosomes built from cadherins", "Tight junctions built from claudins"],
        correctIndex: 0,
        explanation: "Gap junctions form aqueous pores between cells and electrically couple the myocardium; desmosomes only resist mechanical stress and tight junctions seal the paracellular route."
      }
    ],
    'cell-11-cytoskeleton-motility': [
      {
        prompt: "Which motor protein walks toward the minus (-) end of a microtubule?",
        options: ["Dynein", "Kinesin", "Myosin II"],
        correctIndex: 0,
        explanation: "Dynein is a minus-end-directed microtubule motor (retrograde axonal transport), kinesin walks toward the plus end, and myosin moves on actin rather than microtubules."
      },
      {
        prompt: "What is the microtubule arrangement of a eukaryotic ciliary or flagellar axoneme?",
        options: ["9 + 2 doublets plus central pair", "9 + 0 doublets", "9 triplets forming a ring"],
        correctIndex: 0,
        explanation: "The axoneme is nine outer doublets plus two central singlets; dynein arms slide doublets and nexin links convert sliding into bending, and loss of dynein arms causes primary ciliary dyskinesia."
      },
      {
        prompt: "Microtubules display dynamic instability. What determines whether a growing end continues to grow?",
        options: ["The presence of a GTP cap on beta-tubulin", "Phosphorylation of actin monomers", "The presence of a myosin II collar"],
        correctIndex: 0,
        explanation: "GTP-bound tubulin at the plus end forms a stabilising cap; hydrolysis behind the tip permits catastrophe, and rescue can restart growth, enabling search-and-capture of the spindle."
      }
    ],
    'cell-12-metabolism': [
      {
        prompt: "What is the net yield of glycolysis per molecule of glucose?",
        options: ["2 ATP and 2 NADH", "4 ATP and 4 NADH", "2 ATP only, with no reduced cofactor"],
        correctIndex: 0,
        explanation: "Two ATP are invested in the preparatory phase and four are produced in the payoff phase, so the net is 2 ATP plus 2 NADH per glucose; fermentation then regenerates NAD+ without extra ATP."
      },
      {
        prompt: "Per acetyl-CoA oxidised by the TCA cycle, what is produced?",
        options: ["3 NADH, 1 FADH2, 1 GTP and 2 CO2", "4 NADH, 2 FADH2 and 2 GTP", "2 NADH, 2 FADH2, 1 ATP and 1 CO2"],
        correctIndex: 0,
        explanation: "Isocitrate dehydrogenase, alpha-ketoglutarate dehydrogenase and malate dehydrogenase each yield NADH; succinate dehydrogenase yields FADH2; succinyl-CoA synthetase makes GTP; two carbons leave as CO2."
      },
      {
        prompt: "Which enzyme is the committed, allosterically regulated step of glycolysis?",
        options: ["Phosphofructokinase-1, inhibited by ATP and citrate", "Hexokinase, inhibited by glucose-6-phosphate", "Pyruvate kinase, activated by ATP"],
        correctIndex: 0,
        explanation: "PFK-1 sets the flux through glycolysis: ATP and citrate inhibit it while AMP/ADP and fructose-2,6-bisphosphate activate it, coupling glycolysis to the cell's energy charge."
      }
    ],
    'cell-13-bioinformatics': [
      {
        prompt: "A BLAST search returns an E-value of 1e-40. What does this mean?",
        options: ["About 1e-40 alignments of this score would be expected by chance in a database of this size", "The sequences are 40% identical", "The alignment is 40 base pairs long"],
        correctIndex: 0,
        explanation: "The E-value is the expected number of chance alignments with that score, so 1e-40 is overwhelming evidence of homology; identity percentage and alignment length are separate statistics."
      },
      {
        prompt: "A protein-coding gene shows dN/dS = 2.3 across codons of the antigen-binding region. What does this indicate?",
        options: ["Positive (diversifying) selection on those codons", "Strong purifying selection", "Neutral evolution with no selection"],
        correctIndex: 0,
        explanation: "When nonsynonymous substitutions accumulate faster than synonymous ones (dN/dS > 1), selection is favouring amino acid change - typical of host-pathogen arms races and immune genes."
      },
      {
        prompt: "How many reading frames must be checked when searching a double-stranded DNA sequence for an open reading frame?",
        options: ["Six: three on the forward strand and three on the reverse complement", "Three, one per codon position on the forward strand", "Two, one per strand"],
        correctIndex: 0,
        explanation: "Each strand has three possible frames, so a gene can lie in any of six frames; tools such as ORFfinder translate all six and report the longest ORF between a start and in-frame stop codon."
      }
    ],
    'cell-14-methods-biostatistics': [
      {
        prompt: "A nucleic acid sample has A260/A280 = 1.8. What does this suggest?",
        options: ["Relatively pure DNA, with little protein contamination", "Relatively pure RNA", "Heavy protein contamination"],
        correctIndex: 0,
        explanation: "Pure DNA gives about 1.8 and pure RNA about 2.0; ratios below roughly 1.6 indicate protein or phenol contamination, which absorbs strongly at 280 nm."
      },
      {
        prompt: "A dihybrid cross yields 315:108:101:32 instead of 9:3:3:1. Which test decides whether the deviation is significant?",
        options: ["Chi-square goodness of fit, with 3 degrees of freedom", "A two-sample t-test, with 3 degrees of freedom", "Linear regression of phenotype on genotype"],
        correctIndex: 0,
        explanation: "Chi-square compares observed counts with the expected Mendelian proportions; degrees of freedom = categories - 1 = 3, and the ratio 9:3:3:1 is retained if the statistic falls below the critical value."
      },
      {
        prompt: "An experiment reports a mean with a standard error bar. Which statement about the standard error is correct?",
        options: ["It is the standard deviation divided by the square root of n, so it shrinks as sample size grows", "It measures the spread of the raw observations", "It is unaffected by sample size"],
        correctIndex: 0,
        explanation: "SE = s/sqrt(n) estimates the precision of the mean rather than the variability of individuals, so error bars can look small even when individual variation is large - always check the legend."
      }
    ],
    'plant-7-mineral-nutrition': [
      {
        prompt: "A nutrient deficiency appears first in the OLDEST leaves. Which element is most likely limiting?",
        options: ["Nitrogen, a mobile element that is retranslocated to young tissue", "Calcium, an immobile element", "Iron, an immobile element needed for chlorophyll"],
        correctIndex: 0,
        explanation: "Mobile nutrients (N, P, K, Mg) are withdrawn from older tissue to supply growing points, so deficiency shows up there first; immobile elements such as Ca, Fe and B fail first in young leaves and meristems."
      },
      {
        prompt: "What is the approximate ATP cost of biological nitrogen fixation per N2 reduced?",
        options: ["16 ATP, with the reaction also releasing H2", "2 ATP", "1 GTP"],
        correctIndex: 0,
        explanation: "Nitrogenase uses about 16 ATP per N2 (8 electrons at 2 ATP each) and inevitably produces H2, which is why nodules need leghemoglobin to supply oxygen for respiration while protecting the enzyme from O2 inactivation."
      },
      {
        prompt: "In the Munsch pressure-flow model, what drives phloem sap movement?",
        options: ["A turgor pressure gradient between source and sink", "Active transport of sucrose along the whole sieve tube", "Transpiration pull from the leaves"],
        correctIndex: 0,
        explanation: "Loading sucrose at the source draws water in osmotically and raises pressure; unloading at the sink lowers it, so bulk flow follows the pressure gradient without an energy cost along the pathway."
      }
    ],
    'plant-8-growth-development': [
      {
        prompt: "Red light at 660 nm converts phytochrome Pr to Pfr. What happens when far-red light (730 nm) follows immediately?",
        options: ["Pfr reverts to Pr, reversing the response", "Pfr accumulates further", "Phytochrome is permanently degraded"],
        correctIndex: 0,
        explanation: "Phytochrome is a reversible switch, so a red then far-red pulse cancels the response - the classic red/far-red reversibility experiment in lettuce seed germination."
      },
      {
        prompt: "In cereal seeds, which hormone induces the aleurone layer to secrete alpha-amylase?",
        options: ["Gibberellin from the embryo", "Abscisic acid from the aleurone", "Ethylene from the endosperm"],
        correctIndex: 0,
        explanation: "GA diffuses from the embryo to the aleurone, which transcribes alpha-amylase and hydrolyses endosperm starch; ABA opposes this and keeps the seed dormant."
      },
      {
        prompt: "What actually determines whether a short-day plant flowers?",
        options: ["The length of the uninterrupted dark period, not the day length", "The total irradiance in the light period", "The number of leaves on the plant"],
        correctIndex: 0,
        explanation: "Night length is measured: a brief red light break in the middle of a long night prevents flowering in short-day plants, and far-red reverses that effect."
      }
    ],
    'animal-9-muscle-locomotion': [
      {
        prompt: "During muscle contraction, which band of the sarcomere stays constant in length?",
        options: ["The A band, because it spans the thick filaments", "The I band, because it is thin-filament-only", "The H zone, which narrows sharply"],
        correctIndex: 0,
        explanation: "Sliding filaments shorten the I band and H zone while the A band is unchanged - the observation that disproved filament shortening models."
      },
      {
        prompt: "What does calcium bind to in skeletal muscle to permit crossbridge formation?",
        options: ["Troponin C, which moves tropomyosin off the myosin-binding sites", "Calmodulin, which activates myosin light-chain kinase", "The ryanodine receptor itself"],
        correctIndex: 0,
        explanation: "Skeletal muscle calcium binds troponin C, shifting tropomyosin and exposing actin; smooth muscle uses calmodulin and myosin light-chain kinase instead."
      },
      {
        prompt: "Why does rigor mortis occur after death?",
        options: ["ATP depletion prevents myosin heads from detaching from actin", "Calcium is pumped back into the sarcoplasmic reticulum", "Tropomyosin permanently blocks the binding sites"],
        correctIndex: 0,
        explanation: "ATP binding, not hydrolysis, releases the crossbridge; once ATP is exhausted the heads stay attached and the muscle becomes stiff until proteolysis breaks the fibres down."
      }
    ],
    'animal-10-sensory-systems': [
      {
        prompt: "Why do vertebrate rod cells hyperpolarise in response to light?",
        options: ["Light-activated phosphodiesterase hydrolyses cGMP, closing cGMP-gated Na+ channels", "Light opens voltage-gated Na+ channels", "Light directly depolarises the inner segment"],
        correctIndex: 0,
        explanation: "The phototransduction cascade (rhodopsin to transducin to PDE) lowers cGMP, the dark current stops, and the cell hyperpolarises, reducing glutamate release."
      },
      {
        prompt: "Which middle-ear structure provides impedance matching between air and cochlear fluid?",
        options: ["The ossicles, which amplify pressure about 22-fold", "The eustachian tube", "The round window alone"],
        correctIndex: 0,
        explanation: "The malleus, incus and stapes form a lever system and a small-area-to-large-area piston that overcomes the roughly 99.9% reflection of sound at an air-fluid interface."
      },
      {
        prompt: "High-frequency sound produces maximum basilar membrane vibration at which position in the cochlea?",
        options: ["Near the base, where the membrane is narrow and stiff", "Near the apex, where the membrane is wide and floppy", "Uniformly along the whole membrane"],
        correctIndex: 0,
        explanation: "Tonotopy places high frequencies at the base and low frequencies at the apex; outer hair cell loss flattens this peak and impairs frequency discrimination."
      }
    ],
    'animal-11-homeostasis-thermoregulation': [
      {
        prompt: "A physiological rate doubles when temperature rises by 10 degrees C. What is Q10?",
        options: ["2", "1", "10"],
        correctIndex: 0,
        explanation: "Q10 is the factor by which a rate changes over a 10 degree rise, so doubling gives Q10 = 2; values of 2-3 are typical for biological reactions, and a Q10 near 1 indicates a regulated process."
      },
      {
        prompt: "How does a marine teleost fish cope with living in seawater?",
        options: ["Drinks seawater, absorbs ions in the gut and excretes excess salt through gill chloride cells", "Produces copious dilute urine and never drinks", "Matches its body osmolarity to seawater like an osmoconformer"],
        correctIndex: 0,
        explanation: "Marine teleosts are osmoregulators that lose water to the hypertonic sea, so they drink, absorb ions, excrete salt across the gills and produce little urine - the mirror image of freshwater fish."
      },
      {
        prompt: "What is the main selective advantage of excreting uric acid rather than urea or ammonia?",
        options: ["It is nearly insoluble, so it can be excreted as a paste with minimal water loss", "It costs no ATP to synthesise", "It is the least toxic and most soluble form"],
        correctIndex: 0,
        explanation: "Uric acid is energetically expensive but nearly insoluble, allowing birds, reptiles and insects to conserve water; ammonia is cheapest and most toxic, urea is intermediate."
      },
      {
        prompt: "What is the role of countercurrent heat exchange in a rete mirabile?",
        options: ["Warm arterial blood transfers heat to cold venous blood, reducing heat loss from extremities", "It concentrates oxygen for the swim bladder only", "It increases the rate of evaporative cooling"],
        correctIndex: 0,
        explanation: "Opposite flow of artery and vein keeps the core warm (arctic birds, dolphin fins) and can also concentrate gases - the same geometry serves both thermoregulation and the fish gas gland."
      }
    ],
    'genetics-5-meiosis-mutation': [
      {
        prompt: "Why do homologous chromosomes separate in anaphase I while sister chromatids stay together?",
        options: ["Centromeric cohesin is protected by shugoshin, so only arm cohesin is cleaved", "Sister chromatids are not held together after S phase", "Separase is inactive until meiosis II"],
        correctIndex: 0,
        explanation: "Separase cleaves arm cohesin at anaphase I, but shugoshin protects centromeric cohesin so that the reductional division separates homologues and the equational division separates sisters."
      },
      {
        prompt: "How many chromosome combinations can independent assortment generate in human gametes before recombination?",
        options: ["2^23, about 8.4 million", "23", "4^23"],
        correctIndex: 0,
        explanation: "Each of 23 homologous pairs orients independently, giving 2^23 combinations; crossing over multiplies the diversity far beyond that number."
      },
      {
        prompt: "Which repair pathway removes UV-induced cyclobutane pyrimidine dimers in humans?",
        options: ["Nucleotide excision repair, defective in xeroderma pigmentosum", "Photolyase-mediated direct reversal", "Mismatch repair, defective in Lynch syndrome"],
        correctIndex: 0,
        explanation: "NER excises the bulky dimer as part of an oligonucleotide patch; humans lack photolyase, and NER loss causes extreme UV sensitivity and skin cancer."
      }
    ],
    'genetics-6-natural-selection-speciation': [
      {
        prompt: "Haldane's rule states that in species crosses, which sex is more often inviable or sterile in hybrids?",
        options: ["The heterogametic sex", "The homogametic sex", "Both sexes equally, in all cases"],
        correctIndex: 0,
        explanation: "Heterogametic hybrids (XY males in mammals and Drosophila, ZW females in birds and Lepidoptera) suffer more because recessive incompatibilities on the shared X or Z are exposed."
      },
      {
        prompt: "Hybrids between two species survive but cannot produce functional gametes. What kind of barrier is this?",
        options: ["A postzygotic barrier - hybrid sterility", "A prezygotic barrier - behavioural isolation", "A prezygotic barrier - gametic incompatibility"],
        correctIndex: 0,
        explanation: "Postzygotic barriers act after fertilisation and include hybrid inviability, hybrid sterility (as in the mule) and hybrid breakdown in later generations."
      },
      {
        prompt: "Which mechanism can produce instantaneous sympatric speciation without geographic isolation?",
        options: ["Polyploidy, especially in plants", "Vicariance by a river", "Founder colonisation of a distant island"],
        correctIndex: 0,
        explanation: "A polyploid individual is reproductively isolated from its parents immediately; allopolyploidy (chromosome doubling after hybridisation) has produced many crop species, including bread wheat."
      }
    ],
    'eco-4-community-succession': [
      {
        prompt: "What defines a keystone species?",
        options: ["Its influence on community structure is disproportionate to its abundance", "It is the most abundant species in the community", "It is the first species to colonise bare rock"],
        correctIndex: 0,
        explanation: "Paine's starfish removal experiment defined the term: removing a keystone predator collapsed mussel-bed diversity even though the predator was not dominant by biomass."
      },
      {
        prompt: "What distinguishes primary from secondary succession?",
        options: ["Primary starts on substrate without soil; secondary starts where soil and seeds remain", "Primary involves only animals; secondary only plants", "Secondary succession always ends in a different climax community"],
        correctIndex: 0,
        explanation: "Because secondary succession inherits soil structure, nutrients and a seed bank, it proceeds much faster than primary succession on lava or glacial till."
      },
      {
        prompt: "The intermediate disturbance hypothesis predicts maximum diversity under which regime?",
        options: ["Intermediate frequency and intensity of disturbance", "Complete absence of disturbance", "Very frequent, severe disturbance"],
        correctIndex: 0,
        explanation: "Low disturbance lets competitive exclusion reduce richness, while high disturbance eliminates slow colonisers; intermediate regimes keep both colonisers and competitors present."
      }
    ],
    'eco-5-biomes-conservation': [
      {
        prompt: "Why do the major subtropical deserts lie near 30 degrees latitude?",
        options: ["Descending air in the Hadley cell creates high pressure and low rainfall", "They are always in continental interiors far from oceans", "Cold ocean currents generate rainfall that evaporates immediately"],
        correctIndex: 0,
        explanation: "Air rises and rains at the equator, then descends dry at about 30 degrees, producing the Sahara, Arabian, Kalahari and Australian deserts."
      },
      {
        prompt: "A fishery is managed for maximum sustainable yield. At which population size is MSY harvested?",
        options: ["About half the carrying capacity", "At the carrying capacity", "At 5% of the carrying capacity"],
        correctIndex: 0,
        explanation: "The logistic growth curve is steepest at K/2, giving MSY = rK/4; real fisheries overshoot this because abundance is hard to measure and subsidies distort incentives."
      },
      {
        prompt: "Which factor is currently the largest driver of biodiversity loss worldwide?",
        options: ["Habitat loss and fragmentation", "Invasive species", "Pollution"],
        correctIndex: 0,
        explanation: "The HIPPO ranking places habitat loss first, followed by invasives, pollution, human population growth and overexploitation; climate change compounds all of them."
      }
    ],
    'ethology-3-foraging-mating': [
      {
        prompt: "According to the marginal value theorem, when should a forager leave a patch?",
        options: ["When the patch's intake rate falls to the average rate for the habitat, including travel time", "When the patch is completely empty", "Immediately after finding the first item"],
        correctIndex: 0,
        explanation: "The optimal giving-up time equalises marginal and average returns; longer travel between patches means larger average rates foregone, so the forager should stay longer in each patch."
      },
      {
        prompt: "Trivers' parental investment theory predicts which sex will be choosier in a species where one sex invests more in offspring?",
        options: ["The sex investing more, because its reproductive success is limited by investment", "The sex investing less, because it competes for mates", "Neither sex is ever choosy"],
        correctIndex: 0,
        explanation: "The higher-investing sex becomes the limiting resource, so the lower-investing sex competes and the higher-investing sex is selected to discriminate among mates."
      },
      {
        prompt: "A palatable hoverfly resembles a stinging wasp. This is an example of which phenomenon?",
        options: ["Batesian mimicry", "Mullerian mimicry", "Aposematic honesty"],
        correctIndex: 0,
        explanation: "Batesian mimics are harmless copies of a defended model; Mullerian mimicry is shared warning colouration among several genuinely defended species."
      }
    ],
    'systematics-2-taxonomy-diversity': [
      {
        prompt: "Which phylum is a deuterostome with a water vascular system and tube feet?",
        options: ["Echinodermata", "Mollusca", "Annelida"],
        correctIndex: 0,
        explanation: "Echinoderms are deuterostomes with pentaradial adults and bilateral larvae, a calcareous endoskeleton and a water vascular system - a favourite trick given their protostome-like appearance."
      },
      {
        prompt: "Which group produces seeds but never encloses them in an ovary?",
        options: ["Gymnosperms", "Angiosperms", "Ferns"],
        correctIndex: 0,
        explanation: "Gymnosperms (conifers, cycads, ginkgo, gnetophytes) bear ovules on cone scales; angiosperms enclose ovules in a carpel, which becomes the fruit after double fertilisation."
      },
      {
        prompt: "Which character distinguishes Archaea from Bacteria?",
        options: ["Ether-linked membrane lipids and pseudopeptidoglycan instead of peptidoglycan", "The presence of a nucleus", "Circular rather than linear chromosomes"],
        correctIndex: 0,
        explanation: "Archaea have ether-linked branched lipids and no peptidoglycan, and their RNA polymerase and histones are more eukaryotic; both groups lack a nucleus and have circular chromosomes."
      }
    ],
    'animal-11-homeostasis-thermoregulation': [
      {
        prompt: "A patient develops a fever and the hypothalamic set point rises to 39 \u00b0C. What does the body do first?",
        options: ["Vasoconstriction, shivering and behavioural warming, driving core temperature up to the new set point", "Sweating and vasodilation to dump heat", "Nothing \u2014 core temperature is defended at 37 \u00b0C regardless of the set point"],
        correctIndex: 0,
        explanation: "Fever is a regulated rise in the set point, not a failure of regulation. The hypothalamus now treats 37 \u00b0C as 'too cold' and mounts heat conservation and heat production until core temperature reaches the new target."
      },
      {
        prompt: "In the countercurrent heat exchanger of a duck's leg or a dolphin's flipper, what does the arrangement achieve?",
        options: ["Warm arterial blood pre-warms cold venous blood returning to the core, so heat is retained instead of lost", "It maximises heat loss from the extremity", "It has no thermal effect and only stabilises the vessels"],
        correctIndex: 0,
        explanation: "Because artery and vein run in opposite directions, the temperature gradient is maintained along the whole length, so venous blood re-enters the body near arterial temperature. The extremity stays cold and the core stays warm."
      },
      {
        prompt: "During dehydration, ADH acts on the collecting duct to",
        options: ["insert aquaporin-2 channels in the apical membrane, increasing water reabsorption and concentrating urine", "secrete sodium into the tubular fluid to draw water with it", "dilate the afferent arteriole to raise GFR"],
        correctIndex: 0,
        explanation: "ADH (vasopressin) binds V2 receptors, raises cAMP, and shuttles aquaporin-2 into the apical membrane so water follows the medullary osmotic gradient. Without it the duct is water-impermeable and dilute urine is produced."
      }
    ],
    'genetics-5-meiosis-mutation': [
      {
        prompt: "At which stage does crossing over between non-sister chromatids of homologous chromosomes occur?",
        options: ["Pachytene of prophase I, at the synaptonemal complex", "Metaphase II", "Anaphase of mitosis"],
        correctIndex: 0,
        explanation: "Homologs pair (synapsis) in zygotene and reciprocal exchange occurs at pachytene, producing chiasmata that later hold homologs together so they orient and segregate correctly in meiosis I."
      },
      {
        prompt: "A carrier of a balanced Robertsonian translocation has only 45 chromosomes but is phenotypically normal. Why?",
        options: ["The long arms of two acrocentric chromosomes are fused, so no essential genetic material is lost", "The missing chromosome is a Y chromosome", "All genes on the fused chromosome are silenced"],
        correctIndex: 0,
        explanation: "Robertsonian fusions join two acrocentric chromosomes near their centromeres. Only short-arm satellite DNA is lost, so the carrier is healthy \u2014 but meiosis can produce unbalanced gametes, causing trisomy in offspring."
      },
      {
        prompt: "Which repair pathway removes bulky UV photoproducts such as thymine dimers?",
        options: ["Nucleotide excision repair", "Mismatch repair", "Base excision repair"],
        correctIndex: 0,
        explanation: "NER excises a short single-stranded patch around the helix-distorting lesion and resynthesises it. Defective NER causes xeroderma pigmentosum, with extreme UV sensitivity and skin cancer risk."
      }
    ],
    'genetics-6-natural-selection-speciation': [
      {
        prompt: "How is the relative fitness of a genotype defined?",
        options: ["Its per-capita contribution to the next generation's gene pool, divided by the population mean", "Its survival rate alone, ignoring reproduction", "The absolute number of offspring it produces, regardless of the rest of the population"],
        correctIndex: 0,
        explanation: "Fitness is relative and reproductive: it combines survival and fecundity into a contribution to the next generation, scaled so the population mean is 1. A genotype can have high survival and still low fitness if it reproduces poorly."
      },
      {
        prompt: "An island population has Fst = 0.25 under the island model. How many effective migrants per generation does that imply?",
        options: ["0.75", "4", "1"],
        correctIndex: 0,
        explanation: "Fst = 1/(4Nm + 1). Setting 1/(4Nm + 1) = 0.25 gives 4Nm + 1 = 4, so Nm = 0.75 \u2014 less than one effective migrant per generation, which is not enough to prevent substantial differentiation by drift."
      },
      {
        prompt: "Two tree-frog species mate readily in the lab, but hybrid tadpoles die before metamorphosis. This is",
        options: ["postzygotic isolation (hybrid inviability)", "prezygotic isolation (behavioural isolation)", "mechanical isolation"],
        correctIndex: 0,
        explanation: "Mating succeeds, so the barrier acts after zygote formation. Hybrid inviability is postzygotic, alongside hybrid sterility and hybrid breakdown; prezygotic barriers prevent fertilisation in the first place."
      }
    ],
    'eco-4-community-succession': [
      {
        prompt: "Paramecium aurelia and P. caudatum compete in the same flask; P. aurelia survives and P. caudatum declines to extinction. What does this demonstrate?",
        options: ["Competitive exclusion, with each species restricted to its realised niche", "Character displacement", "Facilitation"],
        correctIndex: 0,
        explanation: "Gause's principle: two species competing for the same limiting resource cannot coexist indefinitely. Where they overlap in culture, the better competitor excludes the other, so the surviving species occupies only its realised niche."
      },
      {
        prompt: "The intermediate disturbance hypothesis predicts maximum diversity when",
        options: ["disturbance is at intermediate frequency and intensity", "disturbance is constant and severe", "there is no disturbance at all"],
        correctIndex: 0,
        explanation: "Frequent severe disturbance keeps communities at pioneer stage, while no disturbance lets competitive dominants exclude others. Intermediate disturbance opens space often enough to sustain colonists while allowing competitive species to persist."
      },
      {
        prompt: "On bare volcanic rock, the first colonists are",
        options: ["lichens and mosses that weather rock and begin soil formation", "grasses and shrubs with deep roots", "climax forest trees"],
        correctIndex: 0,
        explanation: "Primary succession starts with no soil. Lichens and mosses trap particles, weather minerals and add organic matter, creating the substrate that later herbaceous, shrub and tree stages require \u2014 an example of facilitation."
      }
    ],
    'eco-5-biomes-conservation': [
      {
        prompt: "Which terrestrial biome has the highest net primary productivity per unit area?",
        options: ["Tropical rainforest", "Temperate grassland", "Tundra"],
        correctIndex: 0,
        explanation: "Warm temperatures, high rainfall and year-round growth give tropical rainforests the highest NPP per square metre, even though low-nutrient soils limit agriculture once the canopy is cleared. Tundra and desert are the lowest."
      },
      {
        prompt: "The species-area relationship is S = cA^z with z \u2248 0.25. If habitat area falls to 10% of its original extent, roughly what fraction of species is lost?",
        options: ["About 45%", "About 10%", "About 90%"],
        correctIndex: 0,
        explanation: "S falls by the factor 0.1^0.25 = 0.56, so roughly 44% of species are lost \u2014 the empirical basis for the rule of thumb that a tenfold area reduction removes about half the species."
      },
      {
        prompt: "Which of these is an ecosystem service provided by wetlands?",
        options: ["Nutrient retention and flood attenuation", "Increased soil erosion downstream", "Removal of all dissolved oxygen from water"],
        correctIndex: 0,
        explanation: "Wetlands slow water, trap sediment and take up nitrogen and phosphorus, reducing downstream eutrophication and peak flood flows. They also store carbon and support nursery habitat for fish."
      }
    ],
    'ethology-3-foraging-mating': [
      {
        prompt: "The marginal value theorem predicts that a foraging animal leaves a patch when",
        options: ["its instantaneous intake rate in the patch falls to the average rate for the habitat", "the patch is completely empty", "it has spent a fixed amount of time in the patch"],
        correctIndex: 0,
        explanation: "Patch residence should equalise the marginal capture rate with the habitat-wide average, which already includes travel time. Longer travel times make the average higher and the optimal stay longer."
      },
      {
        prompt: "In most sexually reproducing animals, which sex is typically the choosier and which competes for mates?",
        options: ["The sex with the higher parental investment is choosy; the other sex competes", "Males are always choosy and females always compete", "Both sexes invest equally, so neither competes"],
        correctIndex: 0,
        explanation: "Bateman's principle: the sex contributing more per offspring (usually females, through eggs, gestation or care) is a limiting resource, so the lower-investing sex competes and the higher-investing sex chooses."
      },
      {
        prompt: "A gazelle stots (jumps stiff-legged) when it spots a predator. Why is this an honest signal?",
        options: ["It is energetically costly and reveals real physical condition, so only fit animals can afford it", "It makes the gazelle harder to see", "It warns other prey without cost to the signaller"],
        correctIndex: 0,
        explanation: "Zahavi's handicap principle: a signal is trustworthy only if it is hard to fake. Stotting is costly and condition-dependent, so predators can use it to avoid wasting a chase on healthy prey."
      }
    ],
    'systematics-2-taxonomy-diversity': [
      {
        prompt: "Which is the correctly written scientific name?",
        options: ["Homo sapiens (genus capitalised, species lowercase, both italicised)", "homo Sapiens", "HOMO SAPIENS"],
        correctIndex: 0,
        explanation: "Binomial nomenclature is italicised, with the genus capitalised and the specific epithet lowercase. After first use the genus may be abbreviated (H. sapiens)."
      },
      {
        prompt: "Which plant group has vascular tissue but reproduces by spores without seeds?",
        options: ["Ferns (pteridophytes)", "Bryophytes", "Gymnosperms"],
        correctIndex: 0,
        explanation: "Ferns have xylem and phloem and a dominant sporophyte, but no seeds: spores are released from sporangia and the gametophyte is a small free-living prothallus. Bryophytes lack true vascular tissue."
      },
      {
        prompt: "Which feature defines the phylum Arthropoda?",
        options: ["Segmented body with jointed appendages and a chitinous exoskeleton, moulted to grow", "Radial symmetry with a water vascular system", "A notochord present at some life stage"],
        correctIndex: 0,
        explanation: "Arthropods are segmented, have paired jointed appendages and a chitin exoskeleton that must be shed (ecdysis) to grow \u2014 which is why insects, crustaceans, arachnids, myriapods and the extinct trilobites share the phylum."
      }
    ]
};

function getStepCheckpoint(moduleId, stepIdx) {
  const bank = CHECKPOINT_BANK;
  if (bank[moduleId] && bank[moduleId][stepIdx]) {
    return bank[moduleId][stepIdx];
  }

  // No multiple-choice checkpoint exists for this topic: the lesson uses an
  // "explain it back" retrieval prompt instead of inventing a generic question.
  return null;
}

// ===================== PRACTICE SETS: NODE QUIZZES & DOMAIN UNIT TESTS =====================
// These are assembled from the verified checkpoint bank, so every question is
// already vetted against the lesson it belongs to. Nothing is auto-generated text.
// Options are shuffled with a stable seed so the answer is never always "A"
// yet the order does not change between visits.
function shuffleOptions(question, seed) {
  const order = seededShuffle([...question.options.keys()], seed);
  return {
    ...question,
    options: order.map(i => question.options[i]),
    correctIndex: order.indexOf(question.correctIndex)
  };
}

function buildNodeQuiz(module) {
  const bank = CHECKPOINT_BANK[module.id] || [];
  if (!bank.length) return null;
  return {
    id: `node-${module.id}`,
    moduleId: module.id,
    kind: 'node',
    title: module.title.split(',')[0],
    description: `${bank.length} checkpoint questions, one per section of this node.`,
    questions: bank.map((q, i) => shuffleOptions({
      id: `nq-${module.id}-${i}`,
      difficulty: 'Node Check',
      type: 'single_choice',
      prompt: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation
    }, `${module.id}-${i}`))
  };
}

const NODE_QUIZZES = TRACK_MODULES.map(buildNodeQuiz).filter(Boolean);

// Unit tests are their own question bank (`src/data/unitTests.js`): written at
// challenge-set difficulty, never sampled from the lesson checkpoints.
function buildUnitTest(domain) {
  const set = UNIT_TEST_SETS[domain.id];
  if (!set) return null;
  return {
    id: `unit-${domain.id}`,
    domainId: domain.id,
    kind: 'unit',
    title: set.title,
    description: `${set.description} Pass mark 80%.`,
    questions: set.questions.map(q => shuffleOptions({ type: 'single_choice', ...q }, q.id))
  };
}

const UNIT_TESTS = Object.values(DOMAINS).map(buildUnitTest).filter(Boolean);

function getQuizById(id) {
  if (!id) return null;
  return QUIZ_SETS.find(q => q.id === id) ||
    NODE_QUIZZES.find(q => q.id === id) ||
    UNIT_TESTS.find(q => q.id === id) || null;
}

// Best recorded score for a set, used on the track and in the hub.
function quizRecord(id) {
  return userState.quizScores[id] || null;
}

// Contextual nudge: point at the right resource instead of restating the lesson.
function buildStepHint(mod, section, trap, flashcards) {
  if (trap) {
    return `This checkpoint tests the same distinction as the examiner trap “${trap.title}”. Re-read that trap, then eliminate every option that contradicts it.`;
  }
  if (flashcards.length) {
    return `Cover the answer and answer this recall card: “${flashcards[0].q}” The checkpoint is that idea in different wording.`;
  }
  if (mod.keyFormulas && mod.keyFormulas.length) {
    return `Start from ${mod.keyFormulas[0].name}: which term does the question change, and what must happen to the other terms?`;
  }
  return `Re-read “${section.heading}” above and separate the mechanism (what moves, binds or changes) from the outcome.`;
}

// ===================== QUIZ HUB =====================
// Everything you can be tested on: seven area unit tests, a check for every node,
// and the five long-form finalist challenge sets.
function renderQuizHub(container) {
  const nodesByDomain = Object.values(DOMAINS).map(domain => ({
    domain,
    nodes: NODE_QUIZZES.filter(q => {
      const mod = TRACK_MODULES.find(m => m.id === q.moduleId);
      return mod && mod.domainId === domain.id;
    })
  }));

  const unitRow = UNIT_TESTS.map(test => {
    const rec = quizRecord(test.id);
    const pct = rec ? Math.round((rec.correct / rec.total) * 100) : null;
    const passed = pct !== null && pct >= 80;
    return `
      <button class="unit-test-card text-left p-4 rounded-2xl border transition ${passed ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400' : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50'}" data-quiz-id="${test.id}">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] font-bold uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-slate-500'}">${passed ? 'Passed' : pct !== null ? 'Retake' : 'Unit test'}</span>
          <span class="text-[10px] font-mono ${pct === null ? 'text-slate-500' : passed ? 'text-emerald-400' : 'text-amber-400'}">${pct === null ? test.questions.length + ' Q' : pct + '%'}</span>
        </div>
        <p class="text-xs font-bold text-white mt-1.5 leading-snug">${test.title.replace(' \u2014 Unit Test', '')}</p>
        <div class="mt-2 h-1 rounded-full bg-slate-800 overflow-hidden">
          <div class="h-full rounded-full ${passed ? 'bg-emerald-500' : 'bg-indigo-500'}" style="width:${pct === null ? 0 : pct}%"></div>
        </div>
      </button>`;
  }).join('');

  const nodeGrid = nodesByDomain.map(({ domain, nodes }) => `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" style="background:${domain.color}"></span>
        <h3 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">${domain.name}</h3>
        <span class="text-[10px] text-slate-600 font-mono">${nodes.length} nodes</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${nodes.map(q => {
          const rec = quizRecord(q.id);
          const pct = rec ? Math.round((rec.correct / rec.total) * 100) : null;
          return `<button class="node-check-btn text-left px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/40 transition" data-quiz-id="${q.id}">
            <span class="block text-[11px] font-semibold text-slate-200 leading-tight">${q.title}</span>
            <span class="block text-[10px] font-mono mt-0.5 ${pct === null ? 'text-slate-600' : pct >= 80 ? 'text-emerald-400' : 'text-amber-400'}">${pct === null ? 'not attempted' : pct + '%'}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-8 pb-20 anim-fade-up">
      <div class="space-y-2">
        <h1 class="text-2xl font-extrabold text-white flex items-center gap-2">\ud83c\udfaf Quizzes & Unit Tests</h1>
        <p class="text-sm text-slate-400">Seven area unit tests (80% to pass), a short check for every node, and five long-form USABO finalist challenge sets.</p>
      </div>

      <div class="space-y-3">
        <h2 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Unit tests \u2014 one per exam area</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${unitRow}</div>
      </div>

      <div class="space-y-3">
        <h2 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Long-form finalist sets</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${QUIZ_SETS.map(set => {
            const mod = TRACK_MODULES.find(m => m.id === set.moduleId);
            const rec = quizRecord(set.id);
            const pct = rec ? Math.round((rec.correct / rec.total) * 100) : null;
            return `<button class="quiz-set-btn text-left p-4 rounded-2xl border border-slate-800 bg-slate-900 hover:border-amber-500/40 transition" data-quiz-id="${set.id}">
              <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">Challenge set</span>
              <p class="text-xs font-bold text-white mt-1.5 leading-snug">${set.title}</p>
              <p class="text-[10px] text-slate-500 mt-1">${mod ? mod.title.split(',')[0] : ''} \u00b7 ${set.questions.length} Q \u00b7 ${pct === null ? 'not attempted' : pct + '%'}</p>
            </button>`;
          }).join('')}
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Node checks \u2014 ${NODE_QUIZZES.length} of ${TRACK_MODULES.length} nodes</h2>
        ${nodeGrid}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-quiz-id]').forEach(btn => {
    btn.addEventListener('click', () => navigate('quiz', { quizId: btn.getAttribute('data-quiz-id') }));
  });
}

// ===================== QUIZ VIEW =====================
function renderQuizView(container, quizId) {
  const quiz = getQuizById(quizId) || QUIZ_SETS[0];
  let currentQIdx = 0;
  let selectedOption = null;
  let isAnswered = false;
  let lastGain = 0;
  const answers = [];

  // Keep a running score so the readiness meter and the summary use real data.
  const syncQuizScore = () => {
    userState.quizScores[quiz.id] = {
      correct: answers.filter(a => a === true).length,
      total: quiz.questions.length,
      answered: answers.filter(a => typeof a === 'boolean').length,
      lastAttempt: dayKey()
    };
    saveState();
  };

  function renderQuestion() {
    const q = quiz.questions[currentQIdx];

    let html = `
      <div class="max-w-3xl mx-auto space-y-6 pb-20 anim-fade-up">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <button id="quiz-back-btn" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition">
            \u2190 Back to Lessons
          </button>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${q.difficulty}
            </span>
            <span class="text-xs text-slate-400 font-mono">Question ${currentQIdx + 1} of ${quiz.questions.length}</span>
          </div>
        </div>

        <div class="space-y-3">
          <h2 class="text-xl font-extrabold text-white">${quiz.title}</h2>
          <p class="text-xs text-slate-400">${quiz.description}</p>
          <div class="flex flex-wrap items-center gap-2">
            <button id="quiz-hub-btn" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition">\u2190 All practice sets</button>
            ${quiz.kind === 'unit' ? '<span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Unit Test \u00b7 80% to pass</span>' : ''}
            ${quiz.kind === 'node' ? '<span class="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">Node Check</span>' : ''}
            ${!quiz.kind ? '<span class="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">Finalist Challenge</span>' : ''}
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div class="text-slate-200 text-sm leading-relaxed space-y-2">
            ${formatLessonContent(q.prompt)}
          </div>

          <div class="space-y-2.5 pt-2">
            ${q.options.map((opt, idx) => {
              let optStyle = "bg-slate-950/80 border-slate-800 hover:border-slate-600 text-slate-300";
              if (isAnswered) {
                if (idx === q.correctIndex) {
                  optStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 anim-correct";
                } else if (idx === selectedOption) {
                  optStyle = "bg-rose-950/50 border-rose-500 text-rose-200 anim-wrong";
                } else {
                  optStyle = "bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60";
                }
              } else if (selectedOption === idx) {
                optStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-200";
              }

              return `
                <div class="option-card p-3.5 rounded-xl border ${optStyle} text-xs font-medium cursor-pointer transition-all flex items-center justify-between option-hover-glow" data-opt-idx="${idx}">
                  <span class="flex-1">${opt}</span>
                  ${isAnswered && idx === q.correctIndex ? '<span class="text-emerald-400 font-bold ml-2">\u2713 Correct</span>' : ''}
                  ${isAnswered && idx === selectedOption && idx !== q.correctIndex ? '<span class="text-rose-400 font-bold ml-2">\u2717 Incorrect</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          ${!isAnswered ? `
            <div class="pt-4 flex justify-end">
              <button id="submit-ans-btn" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition">
                Submit Answer
              </button>
            </div>
          ` : `
            <div class="mt-6 pt-5 border-t border-slate-800 space-y-4 anim-type-reveal">
              <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs leading-relaxed text-slate-300">
                <span class="text-indigo-400 font-bold block uppercase tracking-wider text-[11px]">Official Olympiad Solution</span>
                <div class="space-y-2">
                  ${formatLessonContent(q.explanation)}
                </div>
              </div>

              <div class="flex flex-wrap justify-between items-center gap-2 pt-2">
                <span class="text-xs font-mono ${lastGain > 0 ? 'text-emerald-400' : 'text-slate-500'}">${lastGain > 0 ? `+${lastGain} XP earned` : 'No XP this attempt — read the reasoning, then retry.'}</span>
                <div class="flex items-center gap-2">
                  ${selectedOption !== q.correctIndex ? `
                  <button id="retry-q-btn" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition">
                    ↺ Retry
                  </button>` : ''}
                  ${currentQIdx < quiz.questions.length - 1 ? `
                  <button id="next-q-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition">
                    Next Question \u2192
                  </button>
                ` : `
                  <button id="finish-quiz-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition">
                    Finish Challenge Set \u2713
                  </button>
                `}
                </div>
              </div>
            </div>
          `}
        </div>
      </div>
    `;

    container.innerHTML = html;

    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }

    document.getElementById('quiz-back-btn').addEventListener('click', () => navigate('track'));
    document.getElementById('quiz-hub-btn')?.addEventListener('click', () => {
      userState.activeQuizId = null;
      navigate('quiz');
    });

    if (!isAnswered) {
      container.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
          selectedOption = parseInt(card.getAttribute('data-opt-idx'));
          renderQuestion();
        });
      });

      const submitBtn = document.getElementById('submit-ans-btn');
      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          if (selectedOption === null) return;
          isAnswered = true;
          const isCorrect = selectedOption === quiz.questions[currentQIdx].correctIndex;
          answers[currentQIdx] = isCorrect;
          lastGain = isCorrect ? 50 : 0;
          if (isCorrect) {
            userState.xp += 50;
            recordStudyActivity();
            saveState();
            renderNavigation();
          }
          syncQuizScore();
          renderQuestion();
        });
      }
    } else {
      const nextBtn = document.getElementById('next-q-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentQIdx++;
          selectedOption = null;
          isAnswered = false;
          renderQuestion();
        });
      }

      const retryBtn = document.getElementById('retry-q-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          answers[currentQIdx] = undefined;
          isAnswered = false;
          selectedOption = null;
          lastGain = 0;
          syncQuizScore();
          renderQuestion();
        });
      }

      const finishBtn = document.getElementById('finish-quiz-btn');
      if (finishBtn) {
        finishBtn.addEventListener('click', () => renderQuizSummary(container, quiz, answers));
      }
    }
  }

  renderQuestion();
}

// ===================== QUIZ SUMMARY =====================
function renderQuizSummary(container, quiz, answers) {
  const total = quiz.questions.length;
  const correct = answers.filter(a => a === true).length;
  const pct = Math.round((correct / total) * 100);
  const mod = TRACK_MODULES.find(m => m.id === quiz.moduleId);
  const missed = quiz.questions.filter((q, i) => answers[i] !== true);
  const passed = pct >= 80;

  recordStudyActivity();
  saveState();
  renderNavigation();

  container.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-6 pb-20 anim-fade-up">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <div class="text-4xl">${pct >= 80 ? '🏆' : pct >= 50 ? '📈' : '📚'}</div>
        <h1 class="text-2xl font-black text-white">${correct} / ${total} correct · ${pct}%</h1>
        ${quiz.kind === 'unit'
          ? `<p class="text-[11px] font-bold uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-rose-400'}">${passed ? '✓ Unit test passed — 80% threshold cleared' : 'Below the 80% pass mark — retake after review'}</p>`
          : quiz.kind === 'node'
            ? `<p class="text-[11px] font-bold uppercase tracking-wider ${passed ? 'text-emerald-400' : 'text-amber-400'}">${passed ? '✓ Node mastered' : 'Node not mastered yet'}</p>`
            : ''}
        <p class="text-xs text-slate-400 max-w-md mx-auto">${pct >= 80
          ? 'Finalist-level accuracy on this set. Move on to a domain you have not tested yet.'
          : pct >= 50
            ? 'Solid base. Re-read the reasoning for the misses below, then retake this set in a day or two.'
            : 'Rebuild the fundamentals in the lesson first, then come back — a retake after studying is what makes the score move.'}</p>
        <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button id="quiz-retry-all-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition">↺ Retry this set</button>
          ${mod ? `<button id="quiz-review-lesson-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition">📖 Review lesson</button>` : ''}
          <button id="quiz-hub-back-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">🎯 Practice sets</button>
          <button id="quiz-back-track-btn" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">🗺 Back to track</button>
        </div>
      </div>

      ${missed.length ? `
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 class="text-sm font-bold text-rose-300">Revisit these before your next attempt</h2>
        ${missed.map(q => `
          <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span class="text-[10px] font-mono text-slate-500">${q.difficulty || 'Challenge'}</span>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">${toPlainText(q.prompt, 170)}</p>
          </div>
        `).join('')}
      </div>` : ''}

      <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-1.5">
        <h2 class="text-sm font-bold text-white">How to use this result</h2>
        <p class="text-xs text-slate-400 leading-relaxed">Wrong answers teach more than right ones. Re-read the official solution for every miss, explain the mechanism aloud in one sentence, then retake this set tomorrow and again in a week. Spaced retakes are what separate a semifinalist score from a finalist score.</p>
      </div>
    </div>
  `;

  document.getElementById('quiz-retry-all-btn').addEventListener('click', () => navigate('quiz', { quizId: quiz.id }));
  document.getElementById('quiz-back-track-btn').addEventListener('click', () => navigate('track'));
  document.getElementById('quiz-hub-back-btn')?.addEventListener('click', () => {
    userState.activeQuizId = null;
    navigate('quiz');
  });
  const reviewBtn = document.getElementById('quiz-review-lesson-btn');
  if (reviewBtn && mod) reviewBtn.addEventListener('click', () => navigate('lesson', { moduleId: mod.id }));

  if (window.renderMathInElement) {
    window.renderMathInElement(container, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

// ===================== EQUATION BANK VIEW =====================
function renderEquationBankView(container) {
  const equations = [
    { domain: "Cell Bio & Biochem", name: "Michaelis-Menten Kinetics", latex: "v_0 = \\\\frac{V_{\\\\max} [S]}{K_m + [S]}", notes: "Catalytic efficiency = kcat/Km. Diffusion limit \u2248 10\u2078 - 10\u2079 M\u207b\u00b9 s\u207b\u00b9." },
    { domain: "Cell Bio & Biochem", name: "Lineweaver-Burk Double Reciprocal", latex: "\\\\frac{1}{v_0} = \\\\left( \\\\frac{K_m}{V_{\\\\max}} \\\\right) \\\\frac{1}{[S]} + \\\\frac{1}{V_{\\\\max}}", notes: "Slope = Km/Vmax; x-int = -1/Km; y-int = 1/Vmax." },
    { domain: "Cell Bio & Biochem", name: "Mitchell Proton-Motive Force", latex: "\\\\Delta p = \\\\Delta \\\\Psi - \\\\frac{2.3 RT}{F} \\\\Delta \\\\text{pH} \\\\approx \\\\Delta \\\\Psi - 59.2 \\\\Delta \\\\text{pH}", notes: "In mitochondria, \u0394\u03a8 dominates (~80%). In thylakoids, \u0394pH dominates." },
    { domain: "Plant Physiology", name: "Total Water Potential", latex: "\\\\Psi_w = \\\\Psi_s + \\\\Psi_p + \\\\Psi_g", notes: "Solute potential \u03a8s = -iCRT. Gravitational potential \u03a8g = +0.01 MPa/m." },
    { domain: "Animal Physiology", name: "Goldman-Hodgkin-Katz (GHK) Voltage", latex: "V_m = \\\\frac{RT}{F} \\\\ln \\\\left( \\\\frac{P_{\\\\text{K}}[\\\\text{K}^+]_o + P_{\\\\text{Na}}[\\\\text{Na}^+]_o + P_{\\\\text{Cl}}[\\\\text{Cl}^-]_i}{P_{\\\\text{K}}[\\\\text{K}^+]_i + P_{\\\\text{Na}}[\\\\text{Na}^+]_i + P_{\\\\text{Cl}}[\\\\text{Cl}^-]_o} \\\\right)", notes: "Note [Cl\u207b] inverted due to negative valence." },
    { domain: "Animal Physiology", name: "Starling Microvascular Filtration", latex: "J_v = K_f [ (P_c - P_i) - \\\\sigma (\\\\pi_c - \\\\pi_i) ]", notes: "\u03c3 is protein reflection coefficient; \u03c0 is colloid oncotic pressure." },
    { domain: "Genetics & Evolution", name: "Genetic Interference", latex: "I = 1 - COC = 1 - \\\\frac{\\\\text{Observed DCO}}{\\\\text{Expected DCO}}", notes: "Expected DCO = (Dist 1) * (Dist 2) * Total N." },
    { domain: "Ethology & Ecology", name: "Hamilton's Rule for Kin Selection", latex: "r B > C", notes: "Hymenoptera full sisters r = 0.75; sister-brother r = 0.25." },
    { domain: "Plant Physiology", name: "Hagen-Poiseuille Flow", latex: "Q = \\\\frac{\\\\pi r^4 \\\\Delta P}{8 \\\\eta L}", notes: "Conductance scales with r\u2074." },
    { domain: "Animal Physiology", name: "Alveolar Gas Equation", latex: "P_A\\\\text{O}_2 = (P_{\\\\text{atm}} - P_{\\\\text{H}_2\\\\text{O}}) F_I\\\\text{O}_2 - \\\\frac{P_A\\\\text{CO}_2}{R}", notes: "Normal A-a gradient is 5-10 mmHg." },
    { domain: "Animal Physiology", name: "Law of Laplace", latex: "P = \\\\frac{2 T}{r}", notes: "Surfactant (DPPC) reduces T as r decreases, preventing atelectasis." },
    { domain: "Genetics & Evolution", name: "Breeder's Equation", latex: "R = h^2 S", notes: "h\u00b2 is narrow-sense heritability (VA/VP)." },
    { domain: "Ecology & Demography", name: "Shannon-Wiener Index", latex: "H' = -\\\\sum_{i=1}^S p_i \\\\ln p_i", notes: "Pielou's evenness J' = H' / ln S." },
    { domain: "Ecology & Demography", name: "Lindeman's Trophic Efficiency", latex: "E_T = E_C \\\\times E_A \\\\times E_P \\\\approx 10\\\\%", notes: "Ectotherms ~10-40% EP; endotherms ~1-3%." }
  ];

  let html = `
    <div class="max-w-4xl mx-auto space-y-6 pb-20 anim-fade-up">
      <div class="space-y-1">
        <h1 class="text-2xl font-extrabold text-white">USABO Finalist Formula & Equation Sheet</h1>
        <p class="text-xs text-slate-400">High-yield quantitative relationships tested in Part B/C and IBO practicals.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${equations.map(eq => `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white">${eq.name}</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold">${eq.domain}</span>
            </div>
            <div class="text-xs text-indigo-300 font-mono py-2 overflow-x-auto bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              $$${eq.latex}$$
            </div>
            <p class="text-[11px] text-slate-400">${eq.notes}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// ===================== TEXTBOOKS VIEW =====================
function renderTextbooksView(container) {
  const books = [
    { title: "Campbell Biology", authors: "Urry, Cain, Wasserman, Minorsky, Orr", editions: "11th & 12th Edition", focus: "The full USABO scope: chemistry of life, the cell, genetics, evolution, diversity of life, plant and animal form and function, ecology", usaboImportance: "Core text - USABO content tracks it" },
    { title: "Brooker Biology", authors: "Brooker, Widmaier, Graham, Stiling", editions: "5th & 6th Edition", focus: "All seven USABO areas with strong physiology and clear mechanism explanations", usaboImportance: "Best first pass if Campbell feels dense" },
    { title: "IBO Theoretical Syllabus (Appendix I) + USABO Student Resource Center", authors: "International Biology Olympiad / Center for Excellence in Education", editions: "Current edition", focus: "Official topic list and weightings for the seven exam areas, including scientific reasoning and biological methods", usaboImportance: "The authoritative scope this curriculum is checked against" },
    { title: "Molecular Biology of the Cell", authors: "Alberts, Johnson, Lewis, Morgan, Raff, Roberts, Walter", editions: "6th & 7th Edition", focus: "Cell Bio, Trafficking, Checkpoints, Signaling, Cytoskeleton", usaboImportance: "Indispensable for Top 20 & IBO" },
    { title: "Principles of Biochemistry", authors: "Lehninger, Nelson, Cox", editions: "7th & 8th Edition", focus: "Enzyme Kinetics, Metabolic Pathways, Bioenergetics, Structural Biochem", usaboImportance: "Essential for Part C calculations" },
    { title: "Vander's Human Physiology", authors: "Widmaier, Raff, Strang", editions: "15th & 16th Edition", focus: "Endocrinology, Neurobiology, Renal, Cardiovascular, Immunology", usaboImportance: "Gold standard for Animal Physiology" },
    { title: "Raven's Biology of Plants", authors: "Evert, Eichhorn", editions: "8th Edition", focus: "Plant Anatomy, Kranz Anatomy, Xylem Hydraulics, Life Cycles", usaboImportance: "Core USABO plant reference" },
    { title: "Plant Physiology and Development", authors: "Taiz, Zeiger, M\u00f8ller, Murphy", editions: "6th & 7th Edition", focus: "Photobiology, Kok Cycle, Phytohormone Signaling, Cavitation", usaboImportance: "Key differentiator for Finalist camp" },
    { title: "Genetics: A Conceptual Approach", authors: "Benjamin A. Pierce", editions: "6th & 7th Edition", focus: "Three-point crosses, Tetrad analysis, Quantitative genetics, PopGen", usaboImportance: "Essential for genetics problems" }
  ];

  let html = `
    <div class="max-w-4xl mx-auto space-y-6 pb-20 anim-fade-up">
      <div class="space-y-1">
        <h1 class="text-2xl font-extrabold text-white">Recommended USABO Finalist Textbooks</h1>
        <p class="text-xs text-slate-400">The authoritative references used by CEE and IBO Scientific Committees.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${books.map(b => `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
            <div>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${b.usaboImportance}</span>
              <h3 class="text-base font-bold text-white mt-2">${b.title}</h3>
              <p class="text-xs text-slate-400">${b.authors} \u2022 <span class="text-slate-300 font-mono">${b.editions}</span></p>
            </div>
            <div class="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span class="text-indigo-400 font-semibold block text-[11px] mb-1">Key Olympiad Focus:</span>
              ${b.focus}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
}
