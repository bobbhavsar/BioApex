// BioApex: USABO Finalist (Top 20) & IBO Gold Training Application Core
// Enhanced Interactive Learning Engine v2
import { DOMAINS, TRACK_MODULES } from './data/curriculum.js';
import { QUIZ_SETS } from './data/quizBank.js';
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

// ===================== APPLICATION STATE =====================
const STATE_KEY = 'bioapex_usabo_state_v3';
let userState = {
  xp: 0,
  streak: 1,
  completedModules: [],
  quizScores: {},
  activeView: 'track',
  activeModuleId: 'cell-1-kinetics',
  activeQuizId: null,
  lessonStepIndex: 0,
  lessonViewMode: 'duolingo',
  flashcardProgress: {},
  whatIfCompleted: {}
};

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      userState = { ...userState, ...JSON.parse(saved) };
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

// ===================== INIT & ROUTING =====================
export function initApp() {
  loadState();
  renderNavigation();
  renderCurrentView();
  setupGlobalEvents();
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
    userState.lessonStepIndex = 0;
  }
  if (extra.quizId) userState.activeQuizId = extra.quizId;
  saveState();
  renderNavigation();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const total = TRACK_MODULES.length;
    const completed = userState.completedModules.length;
    const pct = Math.round((completed / total) * 100);
    readinessEl.textContent = `${pct}% Finalist Ready`;
  }

  // Update rank badge
  const rank = getRankTier(userState.xp);
  if (rankBadgeEmoji) rankBadgeEmoji.textContent = rank.badge;
  if (rankBadgeTitle) rankBadgeTitle.textContent = rank.title.split('(')[0].trim();

  document.querySelectorAll('[data-nav]').forEach(btn => {
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
      renderQuizView(main, userState.activeQuizId || 'quiz-biochem-kinetics');
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
  const checkQ = getStepCheckpoint(mod.id, stepIdx);
  const traps = EXAMINER_TRAPS[mod.id] || [];
  const whatIf = WHAT_IF_EXPERIMENTS[mod.id] || null;
  const flashcards = FLASHCARD_SETS[mod.id] || [];

  // Determine which bonus content to show for this specific step
  const stepTrap = traps[stepIdx] || traps[0] || null;
  const hasBonus = stepTrap || whatIf || flashcards.length > 0;

  let html = `
    <div class="max-w-3xl mx-auto space-y-6 pb-28 anim-fade-up">
      <!-- Top Progress Bar -->
      <div class="flex items-center gap-3 sm:gap-4">
        <button id="duo-exit-btn" class="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition border border-slate-800">
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
            <button class="lesson-tab px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-all" data-tab="interactive">
              🧪 Interactive Model
            </button>
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
            ${renderLearnTabContent(section, mod)}
          </div>

          <!-- INTERACTIVE MODEL TAB -->
          <div id="tab-panel-interactive" class="tab-panel hidden">
            <div id="step-interactive-slot" class="mb-4"></div>
            <div class="text-center text-xs text-slate-500 mt-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">
                🖱 Interact with the model above — hover, click, and adjust parameters
              </span>
            </div>
          </div>

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
            </div>
          </div>` : ''}
        </div>

        <!-- Checkpoint Question -->
        <div class="p-6 sm:p-8 pt-4 border-t border-slate-800 space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center justify-center anim-pulse-glow">?</span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-400">Concept Checkpoint • Unlock Next Step</h4>
          </div>
          <p class="text-xs font-semibold text-white">${checkQ.prompt}</p>

          <div class="space-y-2 pt-1" id="checkpoint-options-list">
            ${checkQ.options.map((opt, oIdx) => `
              <button class="step-check-opt w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-slate-600 text-xs text-slate-300 transition-all flex items-center justify-between option-hover-glow" data-idx="${oIdx}">
                <span class="flex items-center gap-2.5">
                  <span class="w-5 h-5 shrink-0 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-bold">${String.fromCharCode(65 + oIdx)}</span>
                  <span>${opt}</span>
                </span>
                <span class="opt-indicator text-slate-500 text-sm font-bold">○</span>
              </button>
            `).join('')}
          </div>

          <div id="check-feedback" class="hidden p-3 rounded-xl text-xs leading-relaxed font-mono"></div>

          <!-- Hint toggle -->
          <div class="pt-1">
            <button id="hint-toggle-btn" class="text-[11px] text-slate-500 hover:text-indigo-400 transition flex items-center gap-1">
              <span>💡</span> <span>Need a hint?</span>
            </button>
            <div id="hint-content" class="hidden mt-2 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300 anim-type-reveal">
              Think about the fundamental mechanism discussed in this topic. The correct answer relates to the core regulatory principle.
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

  // Mount interactive model immediately (for the interactive tab)
  mountStepInteractiveModel(mod.id, stepIdx, 'step-interactive-slot');

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
    });
  }

  // ===== HINT TOGGLE =====
  const hintBtn = document.getElementById('hint-toggle-btn');
  const hintContent = document.getElementById('hint-content');
  if (hintBtn && hintContent) {
    hintBtn.addEventListener('click', () => {
      hintContent.classList.toggle('hidden');
    });
  }

  // ===== EXIT & VIEW TOGGLE =====
  document.getElementById('duo-exit-btn').addEventListener('click', () => navigate('track'));
  document.getElementById('toggle-view-mode-btn').addEventListener('click', () => {
    userState.lessonViewMode = 'full_text';
    saveState();
    renderCurrentView();
  });

  // ===== CHECKPOINT LOGIC =====
  const continueBtn = document.getElementById('duo-continue-btn');
  const feedbackEl = document.getElementById('check-feedback');
  let isAnswered = false;

  container.querySelectorAll('.step-check-opt').forEach(optBtn => {
    optBtn.addEventListener('click', () => {
      if (isAnswered) return;
      const chosen = parseInt(optBtn.getAttribute('data-idx'));
      isAnswered = true;

      if (chosen === checkQ.correctIndex) {
        optBtn.className = "step-check-opt w-full text-left p-3 rounded-xl border border-emerald-500 bg-emerald-950/50 text-xs text-emerald-200 transition-all flex items-center justify-between anim-correct";
        optBtn.querySelector('.opt-indicator').innerHTML = '✓';
        optBtn.querySelector('.opt-indicator').className = 'opt-indicator text-emerald-400 text-sm font-bold';

        feedbackEl.className = "p-3 rounded-xl text-xs leading-relaxed font-mono bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 anim-type-reveal";
        feedbackEl.innerHTML = `<strong>✓ Outstanding!</strong> ${checkQ.explanation}`;
        feedbackEl.classList.remove('hidden');

        continueBtn.disabled = false;
        continueBtn.className = "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-white cursor-pointer border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 ml-auto";
        userState.xp += 25;
        saveState();
        renderNavigation();
        showXpFloat(25, optBtn);

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

        feedbackEl.className = "p-3 rounded-xl text-xs leading-relaxed font-mono bg-rose-950/40 border border-rose-800/40 text-rose-300 anim-type-reveal";
        feedbackEl.innerHTML = `<strong>✗ Not quite.</strong> ${checkQ.explanation}`;
        feedbackEl.classList.remove('hidden');

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

  continueBtn.addEventListener('click', () => {
    userState.lessonStepIndex++;
    saveState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCurrentView();
  });
}

// ===================== LEARN TAB CONTENT RENDERER =====================
function renderLearnTabContent(section, mod) {
  // Split content into paragraphs and render with progressive reveal feel
  const paragraphs = section.content.split('\n\n');
  
  return `
    <div class="space-y-4">
      ${paragraphs.map((p, idx) => `
        <div class="anim-fade-up" style="animation-delay: ${idx * 0.12}s">
          ${p.startsWith('- ') || p.startsWith('• ') ? `
            <div class="pl-3 border-l-2 border-indigo-500/40">
              <p class="text-sm text-slate-200 leading-relaxed">${p}</p>
            </div>
          ` : p.startsWith('$$') ? `
            <div class="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/20 text-center overflow-x-auto">
              <span class="text-sm text-indigo-200">${p}</span>
            </div>
          ` : `
            <p class="text-sm text-slate-200 leading-relaxed">${p}</p>
          `}
        </div>
      `).join('')}

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
    userState.streak += 1;
    saveState();
    renderNavigation();
  }

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
          <span class="block text-2xl">${rank.badge}</span>
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

// ===================== ACTIVE RECALL (FLASHCARDS) VIEW =====================
function renderFlashcardsView(container) {
  const moduleIds = Object.keys(FLASHCARD_SETS);
  
  let html = `
    <div class="max-w-4xl mx-auto space-y-8 pb-20 anim-fade-up">
      <div class="space-y-2">
        <h1 class="text-2xl font-extrabold text-white flex items-center gap-2">🗂 Active Recall Flashcards</h1>
        <p class="text-sm text-slate-400">Spaced repetition drills across all modules. Tap cards to reveal answers.</p>
      </div>

      ${moduleIds.length === 0 ? `
        <div class="text-center py-16 text-slate-500">
          <span class="text-4xl block mb-3">🗂</span>
          <p class="text-sm">No flashcard sets available yet. Complete more lessons to unlock active recall drills!</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${moduleIds.map(modId => {
            const mod = TRACK_MODULES.find(m => m.id === modId);
            const cards = FLASHCARD_SETS[modId];
            const domain = mod ? DOMAINS[Object.keys(DOMAINS).find(k => DOMAINS[k].id === mod.domainId)] : null;
            return `
              <div class="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div class="p-4 border-b border-slate-800/60 flex items-center justify-between">
                  <div>
                    ${domain ? `<span class="text-[10px] px-2 py-0.5 rounded font-bold text-white" style="background-color: ${domain.color}">${domain.name}</span>` : ''}
                    <h3 class="text-sm font-bold text-white mt-1">${mod ? mod.title : modId}</h3>
                  </div>
                  <span class="text-xs font-mono text-cyan-400">${cards.length} cards</span>
                </div>
                <div class="p-4 space-y-3">
                  ${cards.map((card, cIdx) => `
                    <div class="flashcard-container">
                      <div class="flashcard-inner cursor-pointer fc-inline" data-mod="${modId}" data-card="${cIdx}">
                        <div class="flashcard-front p-3 rounded-xl bg-slate-950/80 border border-slate-700/60 hover:border-cyan-500/30 transition">
                          <div class="flex items-start gap-2">
                            <span class="w-5 h-5 shrink-0 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold mt-0.5">${cIdx + 1}</span>
                            <p class="text-xs text-slate-300">${card.q}</p>
                          </div>
                          <span class="text-[9px] text-slate-600 mt-1 block text-right">tap to flip</span>
                        </div>
                        <div class="flashcard-back p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                          <p class="text-xs text-emerald-200 leading-relaxed">${card.a}</p>
                          <span class="text-[9px] text-slate-600 mt-1 block text-right">tap to flip back</span>
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

  // Bind flip interactions
  container.querySelectorAll('.fc-inline').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
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
                    ${domain ? `<span class="text-[10px] px-2 py-0.5 rounded font-bold text-white" style="background-color: ${domain.color}">${domain.name}</span>` : ''}
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
          <span class="px-2.5 py-0.5 rounded font-bold text-white text-[11px]" style="background-color: ${domain.color}">${domain.name}</span>
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
        ${mod.sections.map(s => `
          <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 shadow-lg">
            <h2 class="text-lg font-bold text-white border-b border-slate-800 pb-2">${s.heading}</h2>
            <div class="space-y-3 text-slate-300">
              ${s.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
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

  // Mount visual model
  mountVisualModel(mod.id);

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
function getStepCheckpoint(moduleId, stepIdx) {
  const bank = {
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
    ]
  };

  if (bank[moduleId] && bank[moduleId][stepIdx]) {
    return bank[moduleId][stepIdx];
  }

  return {
    prompt: "Which statement best summarizes the primary regulatory principle discussed in this topic?",
    options: [
      "The pathway operates under strict allosteric / thermodynamic feedback to prevent futile energy expenditure",
      "The reaction is thermodynamically reversible with \u0394G\u00b0' = 0 under all physiological conditions",
      "The mechanism bypasses all cellular compartmentalization barriers"
    ],
    correctIndex: 0,
    explanation: "Olympiad biology frequently tests how biological systems maintain homeostasis by coupling free energy changes and allosteric feedback controls."
  };
}

// ===================== QUIZ VIEW =====================
function renderQuizView(container, quizId) {
  const quiz = QUIZ_SETS.find(q => q.id === quizId) || QUIZ_SETS[0];
  let currentQIdx = 0;
  let selectedOption = null;
  let isAnswered = false;

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

        <div class="space-y-2">
          <h2 class="text-xl font-extrabold text-white">${quiz.title}</h2>
          <p class="text-xs text-slate-400">${quiz.description}</p>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div class="text-slate-200 text-sm leading-relaxed space-y-2">
            ${q.prompt.split('\n\n').map(p => `<p>${p}</p>`).join('')}
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
                  ${q.explanation.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
              </div>

              <div class="flex justify-between items-center pt-2">
                <span class="text-xs font-mono text-emerald-400">+50 XP Earned</span>
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
          if (selectedOption === quiz.questions[currentQIdx].correctIndex) {
            userState.xp += 50;
            saveState();
            renderNavigation();
          }
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

      const finishBtn = document.getElementById('finish-quiz-btn');
      if (finishBtn) {
        finishBtn.addEventListener('click', () => navigate('track'));
      }
    }
  }

  renderQuestion();
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
