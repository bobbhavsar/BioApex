// BioApex: Interactive Visual Diagrams, Molecular Nanomachines & Dynamic Pathway Animations
// Publication-grade SVG and Canvas visual models designed for USABO Finalist / IBO visual intuition.

/**
 * 1. Animated Mitochondrial Electron Transport Chain & ATP Synthase Rotary Motor
 */
export function createETCInteractiveModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-6 rounded-2xl bg-slate-950 border border-indigo-900/50 p-5 shadow-2xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
            Molecular Machine Animation
          </span>
          <h4 class="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <span>⚡</span> Mitochondrial ETC & F₀F₁-ATP Synthase Rotary Motor
          </h4>
        </div>
        <div class="flex items-center gap-2">
          <span id="etc-state-label" class="text-xs font-mono px-2 py-1 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
            Coupled Respiration (Normal)
          </span>
        </div>
      </div>

      <!-- Canvas for Electron & Proton Flux Animation -->
      <div class="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800">
        <!-- Membrane Labels -->
        <div class="absolute top-2 left-3 text-[10px] font-bold text-indigo-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          Intermembrane Space (IMS) [Low pH ≈ 7.0, High H⁺, + Charge]
        </div>
        <div class="absolute bottom-2 left-3 text-[10px] font-bold text-amber-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          Mitochondrial Matrix [High pH ≈ 7.8, Low H⁺, - Charge]
        </div>

        <canvas id="etc-canvas" width="760" height="320" class="w-full h-[280px] block"></canvas>
      </div>

      <!-- Interactive Drug / Condition Toggles -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <button id="etc-btn-normal" class="etc-ctrl-btn p-2 rounded-xl font-bold bg-indigo-600 text-white shadow transition">
          Normal State (Coupled)
        </button>
        <button id="etc-btn-dnp" class="etc-ctrl-btn p-2 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 transition">
          + 2,4-DNP (Uncoupler)
        </button>
        <button id="etc-btn-oligomycin" class="etc-ctrl-btn p-2 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 transition">
          + Oligomycin (F₀ Block)
        </button>
        <button id="etc-btn-cyanide" class="etc-ctrl-btn p-2 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-800 transition">
          + Cyanide (Complex IV Block)
        </button>
      </div>

      <!-- Real-time Mechanistic Insight Box -->
      <div id="etc-insight-box" class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
        <strong class="text-indigo-400">Mechanism:</strong> Complex I transfers 2e⁻ from NADH to Q, pumping 4 H⁺. Complex III pumps 4 H⁺ via Q-cycle. Complex IV pumps 2 H⁺ to reduce O₂ to 2 H₂O. The proton gradient rotates the c-ring (8 subunits), driving γ-stalk rotation and ATP synthesis.
      </div>
    </div>
  `;

  const canvas = document.getElementById('etc-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let state = 'normal'; // 'normal' | 'dnp' | 'oligomycin' | 'cyanide'
  let angle = 0;
  let animId = null;

  // Proton particles
  const protons = [];
  for (let i = 0; i < 45; i++) {
    protons.push({
      x: Math.random() * canvas.width,
      y: 30 + Math.random() * 80, // mostly in IMS
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: 2.5 + Math.random() * 1.5
    });
  }

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // 1. Draw Lipid Bilayer (Inner Mitochondrial Membrane)
    const memY = 120;
    const memH = 75;

    // Lipid heads top
    ctx.fillStyle = '#334155';
    for (let x = 10; x < W - 10; x += 14) {
      ctx.beginPath(); ctx.arc(x, memY, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x, memY + memH, 4, 0, Math.PI * 2); ctx.fill();
    }
    // Hydrophobic core
    ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.fillRect(0, memY, W, memH);

    // 2. Draw Complexes
    // Complex I (NADH Dehydrogenase)
    drawComplex(ctx, 80, memY - 20, 65, memH + 45, '#3b82f6', 'CI', 'NADH→Q\n(4H⁺)');
    // Complex II (Succinate Dehydrogenase)
    drawComplex(ctx, 175, memY + 15, 50, memH - 10, '#06b6d4', 'CII', 'FADH₂→Q\n(0H⁺)');
    // Ubiquinone (Q)
    drawMobileCarrier(ctx, 245, memY + 25, 20, '#eab308', 'Q', angle * 2);
    // Complex III (Cytochrome bc1)
    drawComplex(ctx, 290, memY - 15, 65, memH + 35, '#8b5cf6', 'CIII', 'Cyt bc₁\n(4H⁺)');
    // Cytochrome c
    drawMobileCarrier(ctx, 375, memY - 15, 18, '#ec4899', 'c', -angle * 2);
    // Complex IV (Cytochrome c Oxidase)
    drawComplex(ctx, 415, memY - 15, 65, memH + 35, state === 'cyanide' ? '#dc2626' : '#10b981', 'CIV', state === 'cyanide' ? 'BLOCKED' : 'Cyt aa₃\n(2H⁺)');
    // ATP Synthase (FoF1)
    drawATPSynthase(ctx, 560, memY, memH, angle, state);

    // 3. Proton Flow Animations
    ctx.fillStyle = '#67e8f9';
    protons.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (state === 'normal') {
        // Normal pumping: protons migrate to IMS, funnel through ATP synthase
        if (p.x > 540 && p.x < 620 && p.y > 60 && p.y < memY + 10) {
          p.vy = 1.8; // funneling into Fo
        } else if (p.y > memY + memH) {
          p.vy = -0.5;
        } else if (p.y < 25) {
          p.vy = 0.5;
        }
      } else if (state === 'dnp') {
        // DNP: protons leak across anywhere
        p.vy = 1.2;
        if (p.y > memY + memH + 30) p.y = 35;
      }

      if (p.x < 10) p.x = W - 15;
      if (p.x > W - 10) p.x = 15;
      if (p.y < 20) p.y = 25;
      if (p.y > H - 25) p.y = H - 30;
    });

    // 4. Update Rotation Angle based on state
    if (state === 'normal') {
      angle += 0.05; // active rotation
    } else if (state === 'dnp') {
      angle += 0.005; // gradient collapsed, slow or halted
    } else if (state === 'oligomycin') {
      // Fo physically blocked, rotation halted completely!
      angle += 0;
    } else if (state === 'cyanide') {
      angle += 0; // electron chain stopped, PMF lost
    }

    animId = requestAnimationFrame(draw);
  }

  function drawComplex(ctx, x, y, w, h, color, label, sub) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fill();
    ctx.strokeStyle = '#ffffff33';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + w / 2, y + 24);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '9px Inter, monospace';
    const lines = sub.split('\n');
    lines.forEach((l, i) => {
      ctx.fillText(l, x + w / 2, y + 42 + i * 11);
    });
  }

  function drawMobileCarrier(ctx, x, y, r, color, label, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 3.5);
  }

  function drawATPSynthase(ctx, x, memY, memH, rot, st) {
    // Fo c-ring in membrane
    ctx.fillStyle = st === 'oligomycin' ? '#f43f5e' : '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(x - 22, memY - 5, 44, memH + 10, 8);
    ctx.fill();

    // Rotational stripes on c-ring
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    for (let i = -16; i <= 16; i += 8) {
      const offset = (Math.sin(rot + i) * 6);
      ctx.beginPath();
      ctx.moveTo(x + i + offset, memY - 2);
      ctx.lineTo(x + i + offset, memY + memH + 8);
      ctx.stroke();
    }

    // Central stalk (gamma)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(x - 5, memY + memH + 5, 10, 35);

    // F1 headpiece (alpha3 beta3 hexamer)
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x, memY + memH + 52, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('F₁ Head', x, memY + memH + 50);

    ctx.font = '9px Inter, monospace';
    ctx.fillStyle = '#451a03';
    ctx.fillText('3 ATP / 360°', x, memY + memH + 63);

    // Stator arm (b2-delta)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 24, memY - 8);
    ctx.lineTo(x + 36, memY - 8);
    ctx.lineTo(x + 36, memY + memH + 52);
    ctx.lineTo(x + 28, memY + memH + 52);
    ctx.stroke();
  }

  // Interactive Buttons
  const btnNormal = document.getElementById('etc-btn-normal');
  const btnDnp = document.getElementById('etc-btn-dnp');
  const btnOligo = document.getElementById('etc-btn-oligomycin');
  const btnCyanide = document.getElementById('etc-btn-cyanide');
  const label = document.getElementById('etc-state-label');
  const insight = document.getElementById('etc-insight-box');

  const allBtns = [btnNormal, btnDnp, btnOligo, btnCyanide];

  function setActive(activeBtn, st, lblText, lblClass, insightText) {
    state = st;
    allBtns.forEach(b => {
      b.className = 'etc-ctrl-btn p-2 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition';
    });
    activeBtn.className = 'etc-ctrl-btn p-2 rounded-xl font-bold bg-indigo-600 text-white shadow transition';
    label.textContent = lblText;
    label.className = `text-xs font-mono px-2 py-1 rounded bg-slate-900 border ${lblClass}`;
    insight.innerHTML = insightText;
  }

  btnNormal.addEventListener('click', () => {
    setActive(btnNormal, 'normal', 'Coupled Respiration (Normal)', 'text-emerald-400 border-emerald-500/30',
      '<strong class="text-indigo-400">Normal Respiration:</strong> Proton-motive force (Δp ≈ 215 mV) is intact. F₀ c-ring rotates smoothly as protons re-enter the matrix, producing 3 ATP per 360° revolution. P/O ratio ≈ 2.5 for NADH.');
  });

  btnDnp.addEventListener('click', () => {
    setActive(btnDnp, 'dnp', 'Uncoupled: DNP Protonophoric Leak', 'text-amber-400 border-amber-500/30',
      '<strong class="text-amber-400">2,4-DNP Added:</strong> DNP binds protons in IMS, diffuses freely across lipid bilayer, and releases them into matrix. The proton gradient collapses (Δp → 0). Oxygen consumption surges to maximum, but ATP synthase rotation and ATP synthesis stop!');
  });

  btnOligo.addEventListener('click', () => {
    setActive(btnOligo, 'oligomycin', 'Inhibited: Oligomycin Blocks Fo', 'text-rose-400 border-rose-500/30',
      '<strong class="text-rose-400">Oligomycin Added:</strong> Binds the c-subunit of the F₀ channel, preventing proton translocation. The proton-motive force builds to high levels, exerting back-pressure on the electron transport chain, causing oxygen consumption to halt in coupled mitochondria.');
  });

  btnCyanide.addEventListener('click', () => {
    setActive(btnCyanide, 'cyanide', 'Lethal: Complex IV Halted (CN⁻)', 'text-red-400 border-red-500/30',
      '<strong class="text-red-400">Cyanide (CN⁻) Added:</strong> Binds Fe³⁺ in heme a₃ of Cytochrome c Oxidase (Complex IV), irreversibly blocking electron transfer to O₂. Electron flow through all preceding complexes ceases; cytochrome c, Q, and Complex I remain locked in their reduced states.');
  });

  draw();
}

/**
 * 2. Interactive Molecular Catalytic Cycle (Induced Fit, Transition State & Inhibitor)
 */
export function createEnzymeCatalyticCycleModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-6 rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            Active Site Dynamics
          </span>
          <h4 class="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <span>🔬</span> Induced Fit, Transition State Strain & Catalytic Triad
          </h4>
        </div>
        <div class="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button id="cat-step-1" class="cat-step-btn px-2.5 py-1 rounded-lg font-bold bg-emerald-600 text-white">1. Free [E]</button>
          <button id="cat-step-2" class="cat-step-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">2. [ES] Complex</button>
          <button id="cat-step-3" class="cat-step-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">3. [ES‡] Transition</button>
          <button id="cat-step-4" class="cat-step-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">4. [E + P]</button>
          <button id="cat-step-inh" class="cat-step-btn px-2.5 py-1 rounded-lg font-semibold text-rose-400 hover:text-rose-300">5. + Competitive [I]</button>
        </div>
      </div>

      <!-- Molecular Stage Visual -->
      <div class="relative h-[220px] rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="cat-svg" viewBox="0 0 600 220" class="w-full h-full">
          <!-- Rendered dynamically -->
        </svg>
      </div>

      <!-- Step Explanation Card -->
      <div id="cat-explanation-card" class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
        <span id="cat-exp-title" class="text-emerald-400 font-bold block text-xs">Stage 1: Free Resting Enzyme [E]</span>
        <p id="cat-exp-body">The active site pocket displays specific chemical residues (e.g. Ser195, His57, Asp102 catalytic triad). The pocket is open and ready to receive complementary substrate S with high selectivity.</p>
      </div>
    </div>
  `;

  const svg = document.getElementById('cat-svg');
  const expTitle = document.getElementById('cat-exp-title');
  const expBody = document.getElementById('cat-exp-body');
  const buttons = container.querySelectorAll('.cat-step-btn');

  const stepsData = {
    1: {
      title: "Stage 1: Free Resting Enzyme [E]",
      body: "The active site pocket displays specific catalytic amino acid residues (catalytic triad: Ser195, His57, Asp102). Substrate [S] diffuses in solution with thermal velocity towards the binding cleft.",
      render: () => `
        <!-- Enzyme Body -->
        <path d="M 120 180 C 120 70, 240 70, 280 120 C 320 70, 440 70, 440 180 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="3"/>
        <!-- Active Site Pocket -->
        <path d="M 240 120 C 260 160, 300 160, 320 120" fill="#0f172a" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="280" y="150" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="sans-serif">Active Site</text>
        <text x="280" y="195" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Free Enzyme (E)</text>
        <!-- Substrate Floating Above -->
        <g transform="translate(250, 30)">
          <polygon points="15,0 45,0 60,25 0,25" fill="#10b981" stroke="#34d399" stroke-width="2"/>
          <text x="30" y="17" fill="#022c22" font-size="10" font-weight="bold" text-anchor="middle">Substrate (S)</text>
        </g>
      `
    },
    2: {
      title: "Stage 2: Enzyme-Substrate Complex [ES] (Induced Fit)",
      body: "Substrate binds to the active site pocket via non-covalent interactions (hydrogen bonds, electrostatic, van der Waals). Koshland's Induced Fit: the enzyme undergoes conformational reorganization, gripping the substrate tightly.",
      render: () => `
        <!-- Enzyme Clamped -->
        <path d="M 130 180 C 140 75, 250 80, 275 110 C 305 80, 410 75, 430 180 Z" fill="#1e293b" stroke="#10b981" stroke-width="3.5"/>
        <!-- Substrate docked inside -->
        <g transform="translate(250, 95)">
          <polygon points="15,0 45,0 60,25 0,25" fill="#10b981" stroke="#a7f3d0" stroke-width="2"/>
          <text x="30" y="17" fill="#022c22" font-size="10" font-weight="bold" text-anchor="middle">Substrate (S)</text>
        </g>
        <text x="280" y="195" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">ES Complex (Induced Fit)</text>
      `
    },
    3: {
      title: "Stage 3: Transition State Complex [ES‡] (Maximal Binding Energy)",
      body: "Linus Pauling Principle: The enzyme active site is structurally complementary NOT to the substrate, but to the TRANSITION STATE [S‡]! The catalytic triad polarizes the scissile bond, straining the substrate into high-energy conformation and drastically reducing activation energy ΔG‡.",
      render: () => `
        <!-- Enzyme Maximum Strain -->
        <path d="M 130 180 C 140 75, 250 80, 275 110 C 305 80, 410 75, 430 180 Z" fill="#1e1b4b" stroke="#f59e0b" stroke-width="4"/>
        <!-- Strained Transition State -->
        <g transform="translate(250, 95)">
          <polygon points="15,0 45,0 60,25 0,25" fill="#f59e0b" stroke="#fef08a" stroke-width="3" stroke-dasharray="3,2"/>
          <circle cx="30" cy="12" r="6" fill="#ef4444"/>
          <text x="30" y="16" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">‡</text>
        </g>
        <text x="280" y="195" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Transition State [ES‡] (ΔG‡ Lowered)</text>
        <text x="280" y="60" fill="#f87171" font-size="11" text-anchor="middle" font-mono">Scissile bond cleavage under strain</text>
      `
    },
    4: {
      title: "Stage 4: Product Formation & Release [E + P1 + P2]",
      body: "Catalytic conversion completes; products have lower affinity for the active site than substrate or transition state and spontaneously dissociate, restoring the free enzyme [E] for the next catalytic turnover (kcat).",
      render: () => `
        <!-- Enzyme Returned to Baseline -->
        <path d="M 120 180 C 120 70, 240 70, 280 120 C 320 70, 440 70, 440 180 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="3"/>
        <!-- Product 1 Flying Left -->
        <g transform="translate(210, 35)">
          <polygon points="5,0 25,0 30,20 0,20" fill="#a855f7" stroke="#c084fc" stroke-width="1.5"/>
          <text x="15" y="14" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">P₁</text>
        </g>
        <!-- Product 2 Flying Right -->
        <g transform="translate(310, 35)">
          <polygon points="5,0 25,0 30,20 0,20" fill="#ec4899" stroke="#f472b6" stroke-width="1.5"/>
          <text x="15" y="14" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">P₂</text>
        </g>
        <text x="280" y="195" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Free Enzyme [E] Restored for Turnover</text>
      `
    },
    5: {
      title: "Stage 5: Competitive Inhibition [EI Complex]",
      body: "A competitive inhibitor mimics the substrate's shape and docks directly into the active site pocket, sterically occluding the true substrate. High concentrations of substrate ([S] >> Km) can outcompete the inhibitor, explaining why Vmax is preserved while apparent Km increases.",
      render: () => `
        <!-- Enzyme with Inhibitor -->
        <path d="M 120 180 C 120 70, 240 70, 280 120 C 320 70, 440 70, 440 180 Z" fill="#1e293b" stroke="#f43f5e" stroke-width="3.5"/>
        <!-- Inhibitor Plugged In -->
        <g transform="translate(250, 95)">
          <polygon points="15,0 45,0 55,25 5,25" fill="#f43f5e" stroke="#fecdd3" stroke-width="2"/>
          <text x="30" y="17" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Inhibitor (I)</text>
        </g>
        <!-- Blocked Substrate bounced off -->
        <g transform="translate(360, 40)">
          <polygon points="15,0 45,0 60,25 0,25" fill="#10b981" stroke="#34d399" stroke-width="2" opacity="0.5"/>
          <text x="30" y="17" fill="#022c22" font-size="9" font-weight="bold" text-anchor="middle">Blocked S</text>
        </g>
        <text x="280" y="195" fill="#fb7185" font-size="12" font-weight="bold" text-anchor="middle">Competitive [EI] Complex (Vmax unchanged, Km ↑)</text>
      `
    }
  };

  function setStep(stepNum) {
    buttons.forEach((btn, i) => {
      if (i + 1 === stepNum) {
        btn.className = "cat-step-btn px-2.5 py-1 rounded-lg font-bold bg-emerald-600 text-white";
      } else {
        btn.className = "cat-step-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
      }
    });

    const d = stepsData[stepNum];
    expTitle.textContent = d.title;
    expBody.textContent = d.body;
    svg.innerHTML = d.render();
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => setStep(i + 1));
  });

  setStep(1);
}

/**
 * 3. Interactive Hodgkin-Huxley Nav Channel S4 Voltage-Sensor & Inactivation Plug
 */
export function createNavChannelMolecularModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-6 rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
            Biophysical Nanomachine
          </span>
          <h4 class="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <span>⚡</span> Naᵥ Channel: S4 Voltage Sensor & Ball-and-Chain Inactivation
          </h4>
        </div>
        <span id="nav-state-pill" class="text-xs font-mono px-2 py-1 rounded bg-slate-900 text-cyan-400 border border-cyan-500/30">
          Closed (Resting -70 mV)
        </span>
      </div>

      <!-- Membrane & Channel SVG -->
      <div class="relative h-[240px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="nav-svg" viewBox="0 0 600 240" class="w-full h-full">
          <!-- Dynamically drawn -->
        </svg>
      </div>

      <!-- Interactive Voltage Slider -->
      <div class="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div class="flex justify-between text-xs text-slate-300">
          <span>Membrane Voltage ($V_m$): <span id="nav-volt-display" class="font-bold text-rose-400 font-mono">-70 mV</span></span>
          <span class="text-slate-400">Drag to observe S4 arginine movement & IFMT ball plugging</span>
        </div>
        <input type="range" id="nav-volt-slider" min="-90" max="40" value="-70" class="w-full accent-rose-500 cursor-pointer">
      </div>

      <!-- Biophysical Summary -->
      <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
        <strong class="text-rose-400">Gating Mechanism:</strong> Each Naᵥ pseudorepeat contains an <strong>S4 transmembrane helix</strong> with positively charged Arginine/Lysine residues every 3rd position. Depolarization pushes S4 outward electrostatically, opening the pore (m³ kinetics). Within 1 ms, the intracellular loop containing the <strong>IFMT hydrophobic motif</strong> (ball) swings into the inner pore mouth, causing inactivation (h-gate shut), enforcing the absolute refractory period!
      </div>
    </div>
  `;

  const slider = document.getElementById('nav-volt-slider');
  const voltDisp = document.getElementById('nav-volt-display');
  const statePill = document.getElementById('nav-state-pill');
  const svg = document.getElementById('nav-svg');

  function updateChannel(voltage) {
    voltDisp.textContent = `${voltage > 0 ? '+' : ''}${voltage} mV`;

    // Three states:
    // 1. Resting Closed: V < -50
    // 2. Open Activated: -50 <= V <= 0
    // 3. Inactivated Plugged: V > 0
    let poreColor = "#38bdf8";
    let statusText = "Closed (Resting)";
    let s4Y = 120; // downward resting
    let ballPlugged = false;
    let ionFlow = false;

    if (voltage < -50) {
      statusText = "Closed (m-gates shut, h-gate open)";
      statePill.className = "text-xs font-mono px-2 py-1 rounded bg-slate-900 text-cyan-400 border border-cyan-500/30";
      s4Y = 135;
      ballPlugged = false;
      ionFlow = false;
    } else if (voltage <= 0) {
      statusText = "OPEN & CONDUCTING (S4 outward, massive Na⁺ influx)";
      statePill.className = "text-xs font-mono px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50";
      s4Y = 95;
      ballPlugged = false;
      ionFlow = true;
    } else {
      statusText = "INACTIVATED (IFMT Ball Plugged, Absolute Refractory)";
      statePill.className = "text-xs font-mono px-2 py-1 rounded bg-rose-950 text-rose-300 border border-rose-500/50";
      s4Y = 90;
      ballPlugged = true;
      ionFlow = false;
    }

    statePill.textContent = statusText;

    svg.innerHTML = `
      <!-- Lipid Bilayer -->
      <rect x="0" y="70" width="600" height="70" fill="#1e293b" opacity="0.6"/>
      <line x1="0" y1="70" x2="600" y2="70" stroke="#475569" stroke-width="2"/>
      <line x1="0" y1="140" x2="600" y2="140" stroke="#475569" stroke-width="2"/>
      <text x="20" y="55" fill="#94a3b8" font-size="10" font-family="sans-serif">Extracellular [High Na⁺ ≈ 145 mM]</text>
      <text x="20" y="170" fill="#94a3b8" font-size="10" font-family="sans-serif">Intracellular [Low Na⁺ ≈ 15 mM]</text>

      <!-- Channel Left Wall (Pore Domains S5-P-S6) -->
      <path d="M 210 50 L 250 50 L 260 160 L 210 160 Z" fill="#334155" stroke="#64748b" stroke-width="2"/>
      <!-- S4 Voltage Sensor Left -->
      <rect x="170" y="${s4Y - 20}" width="25" height="55" rx="5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="182" y="${s4Y + 12}" fill="#000" font-size="11" font-weight="bold" text-anchor="middle">+++</text>
      <text x="182" y="${s4Y + 28}" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">S4</text>

      <!-- Channel Right Wall -->
      <path d="M 390 50 L 350 50 L 340 160 L 390 160 Z" fill="#334155" stroke="#64748b" stroke-width="2"/>
      <!-- S4 Voltage Sensor Right -->
      <rect x="405" y="${s4Y - 20}" width="25" height="55" rx="5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="417" y="${s4Y + 12}" fill="#000" font-size="11" font-weight="bold" text-anchor="middle">+++</text>
      <text x="417" y="${s4Y + 28}" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">S4</text>

      <!-- Inactivation Ball and Chain (IFMT Motif) -->
      <path d="M 260 160 Q 280 190, ${ballPlugged ? '300 150' : '270 210'}" fill="none" stroke="#f43f5e" stroke-width="3"/>
      <circle cx="${ballPlugged ? '300' : '270'}" cy="${ballPlugged ? '146' : '210'}" r="14" fill="#f43f5e" stroke="#fff" stroke-width="1.5"/>
      <text x="${ballPlugged ? '300' : '270'}" y="${ballPlugged ? '150' : '214'}" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">IFMT</text>

      ${ionFlow ? `
        <!-- Streaming Na+ ions entering cell -->
        <g fill="#38bdf8">
          <circle cx="300" cy="40" r="5"/><circle cx="300" cy="70" r="5"/>
          <circle cx="300" cy="100" r="5"/><circle cx="300" cy="130" r="5"/>
          <circle cx="295" cy="165" r="5"/><circle cx="305" cy="195" r="5"/>
          <path d="M 300 40 L 300 200" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4"/>
        </g>
        <text x="330" y="105" fill="#38bdf8" font-size="11" font-weight="bold">Na⁺ Current</text>
      ` : ''}

      ${!ionFlow && !ballPlugged ? `
        <text x="300" y="115" fill="#94a3b8" font-size="10" text-anchor="middle">Closed Gate</text>
      ` : ''}

      ${ballPlugged ? `
        <text x="300" y="115" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Plugged</text>
      ` : ''}
    `;
  }

  slider.addEventListener('input', (e) => {
    updateChannel(parseInt(e.target.value));
  });

  updateChannel(-70);
}

/**
 * 4. Interactive Plant Kranz Anatomy & C4 Carbon Shuttle Visualizer
 */
export function createKranzAnatomyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-6 rounded-2xl bg-slate-950 border border-emerald-900/50 p-5 shadow-2xl space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            Plant Anatomy & Ultrastructure
          </span>
          <h4 class="text-sm font-bold text-white mt-1 flex items-center gap-2">
            <span>🌿</span> Kranz Anatomy & C₄ Decarboxylation Shuttles
          </h4>
        </div>
        <div class="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button id="c4-type-nadp" class="c4-type-btn px-2.5 py-1 rounded-lg font-bold bg-emerald-600 text-white">NADP-ME (Maize)</button>
          <button id="c4-type-nad" class="c4-type-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">NAD-ME (Millet)</button>
          <button id="c4-type-pepck" class="c4-type-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">PEP-CK (Guinea Grass)</button>
        </div>
      </div>

      <!-- Kranz SVG Schematic -->
      <div class="relative h-[250px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="kranz-svg" viewBox="0 0 650 250" class="w-full h-full">
          <!-- Rendered dynamically -->
        </svg>
      </div>

      <div id="c4-desc-card" class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
        <strong class="text-emerald-400">NADP-ME Subtype:</strong> Atmospheric CO₂ hydrated to HCO₃⁻ is fixed by PEP Carboxylase into OAA, reduced to <strong>malate</strong> in mesophyll chloroplasts. Malate shuttles through plasmodesmata into bundle sheath chloroplasts where NADP-ME decarboxylates it to release CO₂ and NADPH. Bundle sheath chloroplasts are <strong>agranal</strong> (lack PSII to eliminate O₂ and prevent photorespiration)!
      </div>
    </div>
  `;

  const svg = document.getElementById('kranz-svg');
  const desc = document.getElementById('c4-desc-card');
  const buttons = container.querySelectorAll('.c4-type-btn');

  const c4Data = {
    nadp: {
      btnId: 'c4-type-nadp',
      text: `<strong class="text-emerald-400">NADP-ME Subtype (Maize, Sugarcane):</strong> OAA reduced to <strong>malate</strong> in mesophyll chloroplasts. Shuttled to bundle sheath chloroplasts and decarboxylated by NADP-ME, generating CO₂, NADPH, and pyruvate. Key feature: <em>dimorphic chloroplasts</em>—bundle sheath chloroplasts lack grana/PSII, drastically reducing local O₂ generation so Rubisco operates without photorespiration!`,
      shuttleName: 'Malate (4C)',
      returnName: 'Pyruvate (3C)',
      organelle: 'Bundle Sheath Chloroplast (Agranal)',
      enzyme: 'NADP-Malic Enzyme'
    },
    nad: {
      btnId: 'c4-type-nad',
      text: `<strong class="text-emerald-400">NAD-ME Subtype (Millet, Amaranthus):</strong> OAA transaminated to <strong>aspartate</strong> in mesophyll. Shuttled into bundle sheath <em>mitochondria</em>, converted to malate, and decarboxylated by NAD-ME, yielding CO₂, NADH, and pyruvate. Bundle sheath chloroplasts contain normal grana and active PSII.`,
      shuttleName: 'Aspartate (4C)',
      returnName: 'Alanine (3C)',
      organelle: 'Bundle Sheath Mitochondrion',
      enzyme: 'NAD-Malic Enzyme'
    },
    pepck: {
      btnId: 'c4-type-pepck',
      text: `<strong class="text-emerald-400">PEP-CK Subtype (Guinea grass, Panicum):</strong> Decarboxylation occurs directly in the bundle sheath <em>cytoplasm</em> via PEP Carboxykinase consuming ATP. Releases CO₂ directly to adjacent chloroplasts while PEP is recycled directly without pyruvate intermediate.`,
      shuttleName: 'Aspartate / Malate (4C)',
      returnName: 'PEP (3C)',
      organelle: 'Bundle Sheath Cytosol',
      enzyme: 'PEP Carboxykinase'
    }
  };

  function render(typeKey) {
    const d = c4Data[typeKey];
    buttons.forEach(b => {
      if (b.id === d.btnId) {
        b.className = "c4-type-btn px-2.5 py-1 rounded-lg font-bold bg-emerald-600 text-white";
      } else {
        b.className = "c4-type-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
      }
    });

    desc.innerHTML = d.text;

    svg.innerHTML = `
      <!-- Mesophyll Cell (Left) -->
      <rect x="30" y="25" width="260" height="200" rx="14" fill="#064e3b" opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <text x="160" y="48" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Mesophyll Cell</text>
      
      <!-- PEP Carboxylation in Mesophyll -->
      <circle cx="90" cy="110" r="30" fill="#047857" stroke="#6ee7b7" stroke-width="1.5"/>
      <text x="90" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">PEP Case</text>
      <text x="90" y="122" fill="#a7f3d0" font-size="8" text-anchor="middle">Fixes HCO₃⁻</text>

      <path d="M 120 110 L 220 110" stroke="#34d399" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="170" y="102" fill="#ecfdf5" font-size="9" text-anchor="middle font-mono font-bold">OAA (4C)</text>

      <!-- Plasmodesmata Channel (Center) -->
      <rect x="285" y="90" width="40" height="40" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
      <text x="305" y="80" fill="#94a3b8" font-size="8" text-anchor="middle">Plasmodesmata</text>

      <!-- Shuttling Arrows -->
      <path d="M 220 100 L 350 100" stroke="#fbbf24" stroke-width="3" stroke-dasharray="4,2"/>
      <text x="305" y="96" fill="#fde047" font-size="9" font-weight="bold" text-anchor="middle">${d.shuttleName} →</text>

      <path d="M 350 125 L 220 125" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,2"/>
      <text x="305" y="138" fill="#7dd3fc" font-size="9" font-weight="bold" text-anchor="middle">← ${d.returnName}</text>

      <!-- Bundle Sheath Cell (Right) -->
      <rect x="320" y="25" width="290" height="200" rx="14" fill="#1e1b4b" opacity="0.3" stroke="#818cf8" stroke-width="2"/>
      <text x="465" y="48" fill="#a5b4fc" font-size="12" font-weight="bold" text-anchor="middle">Bundle Sheath Cell (Kranz Ring)</text>

      <!-- Decarboxylation Center -->
      <rect x="360" y="80" width="230" height="70" rx="10" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
      <text x="475" y="102" fill="#c7d2fe" font-size="10" font-weight="bold" text-anchor="middle">${d.organelle}</text>
      <text x="475" y="118" fill="#fbbf24" font-size="9" text-anchor="middle font-bold">${d.enzyme}</text>
      
      <!-- High CO2 releasing to Rubisco -->
      <path d="M 475 125 L 475 160" stroke="#f43f5e" stroke-width="2.5"/>
      <text x="475" y="175" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">High [CO₂] ≈ 10,000 ppm</text>
      <text x="475" y="190" fill="#a7f3d0" font-size="9" text-anchor="middle">→ Saturates Rubisco (No Photorespiration!)</text>

      <!-- Vascular Bundle / Vein -->
      <circle cx="630" cy="125" r="25" fill="#78350f" opacity="0.4" stroke="#d97706" stroke-width="1.5"/>
      <text x="630" y="128" fill="#fde68a" font-size="8" text-anchor="middle font-bold">Xylem/Phloem</text>
    `;
  }

  document.getElementById('c4-type-nadp').addEventListener('click', () => render('nadp'));
  document.getElementById('c4-type-nad').addEventListener('click', () => render('nad'));
  document.getElementById('c4-type-pepck').addEventListener('click', () => render('pepck'));

  render('nadp');
}

/**
 * 5. Interactive GPCR & RTK Signal Transduction Cascade
 */
export function createSignalingCascadeModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-indigo-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
          Cell Signaling Cascade
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="sig-mode-gpcr" class="sig-mode-btn px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white">GPCR (Gαs/cAMP)</button>
          <button id="sig-mode-rtk" class="sig-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">RTK (Ras-MAPK)</button>
        </div>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="sig-svg" viewBox="0 0 620 220" class="w-full h-full">
          <!-- Rendered dynamically -->
        </svg>
      </div>

      <div class="flex items-center justify-between text-xs pt-1">
        <span id="sig-step-label" class="text-slate-300 font-mono">Step 1: Epinephrine binds 7TM GPCR</span>
        <button id="sig-next-step-btn" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition">
          Trigger Next Cascade Step →
        </button>
      </div>
    </div>
  `;

  let mode = 'gpcr';
  let curStep = 1;
  const maxSteps = 4;

  const svg = document.getElementById('sig-svg');
  const label = document.getElementById('sig-step-label');
  const nextBtn = document.getElementById('sig-next-step-btn');
  const gpcrBtn = document.getElementById('sig-mode-gpcr');
  const rtkBtn = document.getElementById('sig-mode-rtk');

  function renderGPCR(step) {
    let ligY = step >= 1 ? 50 : 20;
    let galphaX = step >= 2 ? 260 : 170;
    let campGlow = step >= 3;
    let pkaActive = step >= 4;

    const descriptions = [
      "1. Ligand (e.g. Epinephrine) approaches the 7-Transmembrane Helix GPCR.",
      "2. Conformational change in intracellular loops acts as GEF, catalyzing GDP → GTP exchange on Gαs.",
      "3. Gαs-GTP dissociates from Gβγ and activates Adenylyl Cyclase, converting ATP to cyclic AMP (cAMP).",
      "4. cAMP binds regulatory subunits of PKA; liberated catalytic subunits enter nucleus to phosphorylate CREB at Ser133!"
    ];

    label.textContent = descriptions[step - 1];

    svg.innerHTML = `
      <!-- Membrane -->
      <rect x="0" y="55" width="620" height="40" fill="#1e293b" opacity="0.6"/>
      <text x="15" y="45" fill="#94a3b8" font-size="9">Extracellular Space</text>
      <text x="15" y="115" fill="#94a3b8" font-size="9">Cytoplasm</text>

      <!-- Ligand -->
      <circle cx="105" cy="${ligY}" r="10" fill="#f43f5e" stroke="#fff" stroke-width="1.5"/>
      <text x="105" y="${ligY + 3}" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">L</text>

      <!-- 7TM GPCR Receptor -->
      <path d="M 85 55 Q 90 95, 95 55 Q 100 95, 105 55 Q 110 95, 115 55 Q 120 95, 125 55" fill="none" stroke="#6366f1" stroke-width="5"/>
      <text x="105" y="112" fill="#818cf8" font-size="10" font-weight="bold" text-anchor="middle">7TM GPCR</text>

      <!-- G-Alpha Subunit -->
      <circle cx="${galphaX}" cy="115" r="18" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
      <text x="${galphaX}" y="118" fill="#000" font-size="9" font-weight="bold" text-anchor="middle">Gαs</text>
      <text x="${galphaX}" y="145" fill="#fef08a" font-size="9" font-mono font-bold text-anchor="middle">${step >= 2 ? 'GTP (Active)' : 'GDP'}</text>

      <!-- Adenylyl Cyclase -->
      <rect x="290" y="45" width="45" height="60" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="2"/>
      <text x="312" y="78" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">AC</text>

      ${campGlow ? `
        <!-- cAMP Burst -->
        <g fill="#ec4899">
          <circle cx="370" cy="120" r="8"/><circle cx="390" cy="105" r="7"/><circle cx="390" cy="135" r="7"/>
          <text x="415" y="125" fill="#f472b6" font-size="11" font-weight="bold">cAMP ↑↑</text>
        </g>
      ` : ''}

      <!-- PKA Complex -->
      <g transform="translate(480, 100)">
        <rect x="0" y="0" width="80" height="50" rx="10" fill="${pkaActive ? '#10b981' : '#334155'}" stroke="#fff" stroke-width="1.5"/>
        <text x="40" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">${pkaActive ? 'Active PKA' : 'Inactive PKA'}</text>
        <text x="40" y="38" fill="#e2e8f0" font-size="8" text-anchor="middle">${pkaActive ? '→ Phosphorylates Targets' : '(Regulatory bound)'}</text>
      </g>
    `;
  }

  function renderRTK(step) {
    const descriptions = [
      "1. Growth Factor (EGF) binds monomeric RTK extracellular ligand-binding domains.",
      "2. Dimerization of RTK subunits triggers trans-autophosphorylation on intracellular tyrosine residues.",
      "3. Phosphotyrosines recruit Grb2 (SH2 domain) and SOS (GEF), activating membrane-tethered Ras-GDP → Ras-GTP.",
      "4. Ras recruits Raf (MAPKKK) → phosphorylates MEK (MAPKK) → phosphorylates ERK (MAPK) to activate transcription!"
    ];

    label.textContent = descriptions[step - 1];

    let dimerized = step >= 2;
    let rasGtp = step >= 3;
    let mapkActive = step >= 4;

    svg.innerHTML = `
      <!-- Membrane -->
      <rect x="0" y="55" width="620" height="40" fill="#1e293b" opacity="0.6"/>

      <!-- RTK Monomer Left -->
      <rect x="${dimerized ? '125' : '90'}" y="30" width="16" height="90" rx="6" fill="#f43f5e" stroke="#fff" stroke-width="1.5"/>
      <!-- RTK Monomer Right -->
      <rect x="${dimerized ? '145' : '180'}" y="30" width="16" height="90" rx="6" fill="#f43f5e" stroke="#fff" stroke-width="1.5"/>

      ${dimerized ? `
        <!-- Phosphotyrosine marks -->
        <circle cx="120" cy="110" r="5" fill="#facc15"/><text x="120" y="113" font-size="7" font-weight="bold" text-anchor="middle">P</text>
        <circle cx="165" cy="110" r="5" fill="#facc15"/><text x="165" y="113" font-size="7" font-weight="bold" text-anchor="middle">P</text>
      ` : ''}

      <!-- Grb2 / SOS Adaptor -->
      <rect x="200" y="95" width="55" height="35" rx="6" fill="#8b5cf6" opacity="${step >= 3 ? '1' : '0.4'}"/>
      <text x="227" y="116" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Grb2/SOS</text>

      <!-- Ras GTPase -->
      <circle cx="310" cy="85" r="18" fill="${rasGtp ? '#10b981' : '#64748b'}" stroke="#fff" stroke-width="1.5"/>
      <text x="310" y="88" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Ras</text>
      <text x="310" y="118" fill="${rasGtp ? '#6ee7b7' : '#94a3b8'}" font-size="8" font-mono text-anchor="middle">${rasGtp ? 'GTP (Active)' : 'GDP'}</text>

      <!-- MAPK Cascade Block -->
      <g transform="translate(380, 80)">
        <rect x="0" y="0" width="200" height="75" rx="10" fill="${mapkActive ? '#1e1b4b' : '#1e293b'}" stroke="${mapkActive ? '#a855f7' : '#475569'}" stroke-width="2"/>
        <text x="100" y="24" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">Raf (MAPKKK) → MEK (MAPKK)</text>
        <text x="100" y="44" fill="${mapkActive ? '#38bdf8' : '#94a3b8'}" font-size="11" font-weight="bold" text-anchor="middle">↓ ERK (MAPK Active)</text>
        <text x="100" y="62" fill="#e2e8f0" font-size="9" text-anchor="middle">${mapkActive ? 'Translocates to Nucleus → Drives Cyclin D' : 'Basal'}</text>
      </g>
    `;
  }

  function update() {
    if (mode === 'gpcr') renderGPCR(curStep);
    else renderRTK(curStep);
  }

  nextBtn.addEventListener('click', () => {
    curStep = (curStep % maxSteps) + 1;
    update();
  });

  gpcrBtn.addEventListener('click', () => {
    mode = 'gpcr';
    curStep = 1;
    gpcrBtn.className = "sig-mode-btn px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white";
    rtkBtn.className = "sig-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    update();
  });

  rtkBtn.addEventListener('click', () => {
    mode = 'rtk';
    curStep = 1;
    rtkBtn.className = "sig-mode-btn px-2.5 py-1 rounded-lg font-bold bg-indigo-600 text-white";
    gpcrBtn.className = "sig-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    update();
  });

  update();
}

/**
 * 6. Interactive Oxygen-Evolving Complex (OEC) Kok S-State Clock
 */
export function createKokCycleInteractiveModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-emerald-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
          Kok S-State Clock
        </span>
        <span id="kok-flash-counter" class="text-xs font-mono font-bold text-amber-400">Flashes: 0</span>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="kok-svg" viewBox="0 0 500 220" class="w-full h-full">
          <!-- Rendered dynamically -->
        </svg>
      </div>

      <div class="flex items-center justify-between gap-2 pt-1 text-xs">
        <button id="kok-flash-btn" class="flex-1 py-2 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold rounded-xl shadow transition">
          ⚡ Fire Single-Turnover Saturating Flash (1 μs)
        </button>
        <button id="kok-reset-btn" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition">
          Reset (Dark-Adapted S₁)
        </button>
      </div>

      <div id="kok-feedback-text" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Dark-adapted chloroplasts start predominantly in state <strong>S₁</strong>. Each flash extracts 1 electron via Tyr-Z.
      </div>
    </div>
  `;

  let flashCount = 0;
  let currentState = 1; // S1 is dark ground state

  const svg = document.getElementById('kok-svg');
  const counter = document.getElementById('kok-flash-counter');
  const feedback = document.getElementById('kok-feedback-text');

  // Node coordinates on a circle
  const cx = 250;
  const cy = 110;
  const r = 70;
  const states = [
    { id: 0, label: 'S₀', angle: Math.PI * 0.5 },
    { id: 1, label: 'S₁', angle: Math.PI * 0.9 },
    { id: 2, label: 'S₂', angle: Math.PI * 1.3 },
    { id: 3, label: 'S₃', angle: Math.PI * 1.7 },
    { id: 4, label: '[S₄]', angle: Math.PI * 0.1 }
  ];

  function renderClock() {
    counter.textContent = `Flashes: ${flashCount}`;

    let o2Burst = (currentState === 0 && flashCount > 0);

    let nodesHtml = states.map(s => {
      const x = cx + r * Math.cos(s.angle);
      const y = cy + r * Math.sin(s.angle);
      const isCur = s.id === currentState;

      return `
        <circle cx="${x}" cy="${y}" r="22" fill="${isCur ? '#10b981' : '#1e293b'}" stroke="${isCur ? '#a7f3d0' : '#475569'}" stroke-width="${isCur ? '3' : '1.5'}"/>
        <text x="${x}" y="${y + 4}" fill="${isCur ? '#022c22' : '#e2e8f0'}" font-size="12" font-weight="bold" text-anchor="middle">${s.label}</text>
      `;
    }).join('');

    svg.innerHTML = `
      <!-- Circular Clock Outline -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#334155" stroke-dasharray="4,4" stroke-width="2"/>
      <text x="${cx}" y="${cy - 8}" fill="#94a3b8" font-size="9" text-anchor="middle">Mn₄CaO₅</text>
      <text x="${cx}" y="${cy + 8}" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Kok Clock</text>

      ${nodesHtml}

      ${o2Burst ? `
        <!-- O2 Release burst -->
        <g transform="translate(380, 110)">
          <circle cx="0" cy="0" r="28" fill="#f43f5e" opacity="0.2"/>
          <text x="0" y="5" fill="#f43f5e" font-size="13" font-weight="bold" text-anchor="middle">O₂ RELEASE!</text>
        </g>
      ` : ''}
    `;
  }

  document.getElementById('kok-flash-btn').addEventListener('click', () => {
    flashCount++;
    if (currentState === 3) {
      // S3 -> S4 -> S0 with O2 release
      currentState = 0;
      feedback.innerHTML = `<span class="text-rose-400 font-bold">Flash ${flashCount}: [S₄] reached!</span> Two H₂O molecules cleaved, releasing <strong>1 O₂ + 4 H⁺</strong>! Cluster resets to S₀.`;
    } else {
      currentState = (currentState + 1) % 4;
      feedback.innerHTML = `Flash ${flashCount}: 1 electron extracted by $Y_Z$. Advanced to state <strong>S${currentState}</strong>.`;
    }
    renderClock();
  });

  document.getElementById('kok-reset-btn').addEventListener('click', () => {
    flashCount = 0;
    currentState = 1;
    feedback.innerHTML = `Dark-adapted chloroplasts reset to stable ground state <strong>S₁</strong>. Notice oxygen evolution will peak on the <strong>3rd flash</strong>!`;
    renderClock();
  });

  renderClock();
}

/**
 * 7. Interactive Vesicular Trafficking, Rab GTPases & SNARE Zippering Engine (Module 4)
 */
export function createTraffickingSnareModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-indigo-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
          Vesicular Nanomachine
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="snare-step-1" class="snare-btn px-2 py-1 rounded font-bold bg-indigo-600 text-white">1. COPII Bud</button>
          <button id="snare-step-2" class="snare-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white">2. Rab Tether</button>
          <button id="snare-step-3" class="snare-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white">3. SNARE Zippering</button>
          <button id="snare-step-4" class="snare-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white">4. Pore Fusion</button>
        </div>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="snare-svg" viewBox="0 0 620 220" class="w-full h-full"></svg>
      </div>

      <div id="snare-desc" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Step 1: Sar1-GTP recruits Sec23/24 inner coat and Sec13/31 outer cage at ER exit sites, deforming membrane into transport vesicle.
      </div>
    </div>
  `;

  const svg = document.getElementById('snare-svg');
  const desc = document.getElementById('snare-desc');
  const btns = container.querySelectorAll('.snare-btn');

  const steps = [
    {
      title: "Step 1: COPII Budding & Coat Assembly",
      desc: "Sar1-GEF (Sec12) loads GTP on Sar1, inserting its amphipathic helix. Sec23/24 inner coat binds cargo exit motifs (Asp-X-Glu). Sec13/31 polymerizes into a cuboctahedral cage to bud the vesicle.",
      svg: `
        <rect x="0" y="160" width="620" height="30" fill="#1e293b"/>
        <text x="20" y="180" fill="#94a3b8" font-size="10">Rough ER Membrane</text>
        <!-- Budding Vesicle with COPII coat -->
        <circle cx="280" cy="110" r="45" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
        <circle cx="280" cy="110" r="54" fill="none" stroke="#f59e0b" stroke-width="6" stroke-dasharray="10,4"/>
        <text x="280" y="114" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">COPII Vesicle</text>
        <text x="280" y="45" fill="#fbbf24" font-size="9" text-anchor="middle">Sec13/31 Outer Cage + Sar1-GTP</text>
      `
    },
    {
      title: "Step 2: Rab GTPase Docking & Effector Tethering",
      desc: "Vesicle sheds coat. Active vesicle Rab-GTP binds long coiled-coil Rab effectors and multisubunit tethering complexes on cis-Golgi membrane, pulling vesicle close.",
      svg: `
        <!-- Target Membrane -->
        <rect x="0" y="170" width="620" height="30" fill="#064e3b"/>
        <text x="20" y="190" fill="#34d399" font-size="10">cis-Golgi Target Membrane</text>
        <!-- Approaching Vesicle -->
        <circle cx="310" cy="70" r="38" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
        <!-- Rab-GTP -->
        <circle cx="340" cy="100" r="10" fill="#10b981"/>
        <text x="340" y="103" fill="#fff" font-size="7" font-weight="bold" text-anchor="middle">Rab</text>
        <!-- Tethering Filament -->
        <path d="M 340 108 Q 360 140, 370 170" stroke="#34d399" stroke-width="3" stroke-dasharray="3,3"/>
        <text x="390" y="145" fill="#6ee7b7" font-size="9">Rab Effector Tether</text>
      `
    },
    {
      title: "Step 3: Trans-SNARE 4-Helix Bundle Zippering",
      desc: "v-SNARE (synaptobrevin) on vesicle pairs with t-SNAREs (syntaxin + SNAP-25) on target. The 4 helices zipper together from N- to C-termini (ΔG ≈ -35 kBT), overcoming water hydration repulsion!",
      svg: `
        <rect x="0" y="170" width="620" height="30" fill="#064e3b"/>
        <circle cx="310" cy="115" r="38" fill="#312e81" stroke="#818cf8" stroke-width="2"/>
        <!-- 4-Helix trans-SNARE pin -->
        <path d="M 285 148 L 290 170" stroke="#f43f5e" stroke-width="3"/>
        <path d="M 295 148 L 300 170" stroke="#38bdf8" stroke-width="3"/>
        <path d="M 325 148 L 320 170" stroke="#38bdf8" stroke-width="3"/>
        <path d="M 335 148 L 330 170" stroke="#f43f5e" stroke-width="3"/>
        <text x="310" y="162" fill="#facc15" font-size="10" font-weight="bold" text-anchor="middle">4-Helix Bundle Zippering</text>
      `
    },
    {
      title: "Step 4: Full Bilayer Fusion & NSF-Mediated Recycling",
      desc: "Membranes fuse; cargo is delivered. The stable cis-SNARE complex in the target membrane is unwound by NSF (AAA+ ATPase) and α-SNAP using ATP hydrolysis to regenerate free SNARE monomers.",
      svg: `
        <!-- Fused Continuous Membrane -->
        <path d="M 0 170 L 250 170 C 260 120, 360 120, 370 170 L 620 170" fill="none" stroke="#10b981" stroke-width="5"/>
        <!-- Cargo Discharging -->
        <g fill="#ec4899">
          <circle cx="300" cy="155" r="5"/><circle cx="320" cy="150" r="5"/><circle cx="310" cy="165" r="5"/>
        </g>
        <text x="310" y="195" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fusion Pore Opened • Cargo Released</text>
        <!-- NSF Unwinding Complex -->
        <rect x="420" y="125" width="70" height="35" rx="8" fill="#eab308" stroke="#ca8a04" stroke-width="1.5"/>
        <text x="455" y="146" fill="#000" font-size="9" font-weight="bold" text-anchor="middle">NSF / α-SNAP</text>
        <text x="455" y="178" fill="#fde047" font-size="8" text-anchor="middle">ATP → ADP + Pi</text>
      `
    }
  ];

  function setStep(idx) {
    btns.forEach((b, i) => {
      b.className = i === idx 
        ? "snare-btn px-2 py-1 rounded font-bold bg-indigo-600 text-white"
        : "snare-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white";
    });
    desc.textContent = steps[idx].desc;
    svg.innerHTML = steps[idx].svg;
  }

  btns.forEach((b, i) => b.addEventListener('click', () => setStep(i)));
  setStep(0);
}

/**
 * 8. Interactive Cell Cycle Bistable MPF Switch & Apoptosome (Module 5)
 */
export function createCellCycleApoptosisModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-purple-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
          Cell Cycle & Cell Death Engine
        </span>
        <div class="flex items-center gap-2 text-xs">
          <button id="cca-btn-mpf" class="cca-mode-btn px-2.5 py-1 rounded-lg font-bold bg-purple-600 text-white">MPF (Cdc25/Wee1)</button>
          <button id="cca-btn-apop" class="cca-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">Apoptosome (Bax/Apaf-1)</button>
        </div>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="cca-svg" viewBox="0 0 600 220" class="w-full h-full"></svg>
      </div>

      <div class="flex items-center justify-between gap-3 text-xs pt-1">
        <span id="cca-desc" class="text-slate-300 font-mono text-[11px]">Wee1 holds CDK1 inactive via inhibitory phosphorylation at Thr14/Tyr15 until G2/M.</span>
        <button id="cca-action-btn" class="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow transition">
          Activate Cdc25 Trigger ⚡
        </button>
      </div>
    </div>
  `;

  let mode = 'mpf';
  let active = false;

  const svg = document.getElementById('cca-svg');
  const desc = document.getElementById('cca-desc');
  const actionBtn = document.getElementById('cca-action-btn');
  const btnMpf = document.getElementById('cca-btn-mpf');
  const btnApop = document.getElementById('cca-btn-apop');

  function render() {
    if (mode === 'mpf') {
      actionBtn.textContent = active ? "Reset to G2 Phase" : "Activate Cdc25 Phosphatase ⚡";
      desc.textContent = active
        ? "BISTABLE TRIGGER: Cdc25 removes inhibitory phosphates; active CDK1 activates more Cdc25 (positive feedback) and inhibits Wee1 (double negative feedback)!"
        : "G2 Arrest: Wee1 kinase phosphorylates CDK1 at Thr14 and Tyr15, keeping MPF in an inactive primed state.";

      svg.innerHTML = `
        <!-- CDK1 - Cyclin B complex -->
        <g transform="translate(180, 50)">
          <rect x="0" y="0" width="100" height="70" rx="14" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
          <text x="50" y="32" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">CDK1</text>
          <text x="50" y="48" fill="#bae6fd" font-size="10" text-anchor="middle">Cyclin B</text>
          ${!active ? `
            <circle cx="85" cy="15" r="9" fill="#ef4444"/><text x="85" y="18" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">Tyr15</text>
          ` : `
            <circle cx="85" cy="15" r="9" fill="#10b981"/><text x="85" y="18" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">T161</text>
          `}
        </g>

        <!-- Wee1 vs Cdc25 feedback loop -->
        <g transform="translate(380, 30)">
          <rect x="0" y="0" width="90" height="40" rx="8" fill="${active ? '#475569' : '#dc2626'}"/>
          <text x="45" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">${active ? 'Wee1 (Inhibited)' : 'Wee1 Kinase (Active)'}</text>

          <rect x="0" y="70" width="90" height="40" rx="8" fill="${active ? '#16a34a' : '#475569'}"/>
          <text x="45" y="94" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">${active ? 'Cdc25 (ACTIVE)' : 'Cdc25 (Inactive)'}</text>
        </g>

        <text x="300" y="185" fill="${active ? '#34d399' : '#f87171'}" font-size="13" font-weight="bold" text-anchor="middle">
          ${active ? '🚀 MPF ACTIVATED → Entry into Mitosis (Irreversible Bistable Switch)' : '🔒 G2 Checkpoint: Mitosis Blocked'}
        </text>
      `;
    } else {
      actionBtn.textContent = active ? "Reset Normal Survival" : "Trigger Mitochondrial MOMP ☠️";
      desc.textContent = active
        ? "INTRINSIC APOPTOSIS: Bax/Bak oligomerize in outer mitochondrial membrane → Cytochrome c released → heptameric Apaf-1 apoptosome activates Caspase-9!"
        : "Survival: Bcl-2/Bcl-xL sequester BH3-only sensors, preserving mitochondrial outer membrane integrity.";

      svg.innerHTML = `
        <!-- Mitochondria -->
        <ellipse cx="140" cy="110" rx="90" ry="50" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
        <text x="140" y="105" fill="#a5b4fc" font-size="11" font-weight="bold" text-anchor="middle">Mitochondrion</text>
        <text x="140" y="125" fill="#818cf8" font-size="9" text-anchor="middle">${active ? 'Bax/Bak Pore Open' : 'Bcl-2 Intact'}</text>

        ${active ? `
          <!-- Cytochrome c diffusing -->
          <circle cx="230" cy="95" r="7" fill="#f43f5e"/><text x="245" y="98" fill="#f43f5e" font-size="9">Cyt c</text>
          <!-- Apoptosome Wheel -->
          <g transform="translate(390, 110)">
            <circle cx="0" cy="0" r="38" fill="none" stroke="#eab308" stroke-width="5" stroke-dasharray="14,6"/>
            <circle cx="0" cy="0" r="14" fill="#ca8a04"/>
            <text x="0" y="4" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">Apaf-1</text>
            <text x="0" y="55" fill="#facc15" font-size="10" font-weight="bold" text-anchor="middle">Wheel of Death (Apoptosome)</text>
            <text x="0" y="70" fill="#fb7185" font-size="9" text-anchor="middle">→ Activates Caspase-9 → Caspase-3/7</text>
          </g>
        ` : `
          <text x="380" y="115" fill="#94a3b8" font-size="12" text-anchor="middle">Apaf-1 Monomers Inactive in Cytosol</text>
        `}
      `;
    }
  }

  actionBtn.addEventListener('click', () => {
    active = !active;
    render();
  });

  btnMpf.addEventListener('click', () => {
    mode = 'mpf';
    active = false;
    btnMpf.className = "cca-mode-btn px-2.5 py-1 rounded-lg font-bold bg-purple-600 text-white";
    btnApop.className = "cca-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    render();
  });

  btnApop.addEventListener('click', () => {
    mode = 'apop';
    active = false;
    btnApop.className = "cca-mode-btn px-2.5 py-1 rounded-lg font-bold bg-purple-600 text-white";
    btnMpf.className = "cca-mode-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    render();
  });

  render();
}

/**
 * 9. Interactive Plant Hydraulics & Torus-Margo Cavitation Valve (Module 6)
 */
export function createPlantHydraulicsModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-emerald-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
          Xylem Biophysics & Cavitation
        </span>
        <span id="hyd-state" class="text-xs font-mono font-bold text-emerald-400">Intact Water Column (Low Tension)</span>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="hyd-svg" viewBox="0 0 600 220" class="w-full h-full"></svg>
      </div>

      <div class="space-y-1">
        <div class="flex justify-between text-xs text-slate-300">
          <span>Xylem Water Tension: <span id="tension-val" class="font-bold text-amber-400 font-mono">-1.5 MPa</span></span>
          <span class="text-slate-400">Drag to induce cavitation and watch conifer Torus-Margo valve aspiration!</span>
        </div>
        <input type="range" id="tension-slider" min="-8" max="-0.5" step="0.5" value="-1.5" class="w-full accent-emerald-500 cursor-pointer">
      </div>
    </div>
  `;

  const svg = document.getElementById('hyd-svg');
  const slider = document.getElementById('tension-slider');
  const tensionVal = document.getElementById('tension-val');
  const stateLabel = document.getElementById('hyd-state');

  function update(tension) {
    tensionVal.textContent = `${tension} MPa`;
    const cavitated = tension <= -4.0;

    stateLabel.textContent = cavitated 
      ? "CAVITATION OCCURRED: Torus Aspirated Against Pit Border!" 
      : "Conducting Tracheids: Water flows freely through Margo";
    stateLabel.className = cavitated 
      ? "text-xs font-mono font-bold text-rose-400" 
      : "text-xs font-mono font-bold text-emerald-400";

    const torusOffset = cavitated ? 32 : 0; // aspirates right against border

    svg.innerHTML = `
      <!-- Tracheid 1 (Left) -->
      <rect x="50" y="30" width="220" height="160" fill="${cavitated ? '#450a0a' : '#064e3b'}" opacity="0.4" stroke="#10b981" stroke-width="2"/>
      <text x="160" y="60" fill="${cavitated ? '#f87171' : '#34d399'}" font-size="11" font-weight="bold" text-anchor="middle">
        Tracheid A ${cavitated ? '(Cavitated / Air Embolism)' : '(Conducting Sap)'}
      </text>

      <!-- Bordered Pit Chamber (Center) -->
      <path d="M 270 70 L 300 70 L 310 95 L 300 120 L 270 120 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
      <path d="M 330 70 L 300 70 L 290 95 L 300 120 L 330 120 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>

      <!-- Margo spoke-like meshwork -->
      <line x1="300" y1="70" x2="300" y2="120" stroke="#6ee7b7" stroke-width="1.5" stroke-dasharray="2,2"/>

      <!-- Impermeable Torus -->
      <circle cx="${300 + torusOffset}" cy="95" r="12" fill="#d97706" stroke="#fef3c7" stroke-width="2"/>
      <text x="${300 + torusOffset}" y="99" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">Torus</text>

      <!-- Tracheid 2 (Right) -->
      <rect x="330" y="30" width="220" height="160" fill="#064e3b" opacity="0.4" stroke="#10b981" stroke-width="2"/>
      <text x="440" y="60" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tracheid B (Protected Intact)</text>

      <text x="300" y="195" fill="#fde047" font-size="10" text-anchor="middle">
        ${cavitated ? 'VALVE SEALED: High ΔP aspirates torus over pit aperture, preventing embolism spreading!' : 'Sap flows through porous margo microfibrils'}
      </text>
    `;
  }

  slider.addEventListener('input', (e) => update(parseFloat(e.target.value)));
  update(-1.5);
}

/**
 * 10. Interactive Auxin Polar Transport & TIR1 Ubiquitin Ligase (Module 9)
 */
export function createAuxinPolarTransportModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-amber-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Phytohormone Dynamics
        </span>
        <span class="text-xs font-mono text-emerald-400">Chemiosmotic Polar Auxin Transport (PAT)</span>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="aux-svg" viewBox="0 0 600 220" class="w-full h-full"></svg>
      </div>

      <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
        <strong>Chemiosmotic Mechanism:</strong> Apoplast (pH 5.5) protonates auxin into lipophilic IAAH (enters passively). In neutral cytosol (pH 7.0), auxin dissociates into anionic IAA⁻ (trapped). Efflux occurs strictly via basal <strong>PIN efflux carriers</strong>, enforcing unidirectional basipetal transport!
      </div>
    </div>
  `;

  const svg = document.getElementById('aux-svg');
  svg.innerHTML = `
    <!-- Top Cell (Apical) -->
    <rect x="180" y="20" width="240" height="75" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
    <text x="300" y="45" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Cell 1 (Cytoplasm pH 7.0)</text>
    <text x="300" y="65" fill="#fef08a" font-size="9" text-anchor="middle">IAA⁻ Trapped Anion</text>
    <!-- Basal PIN Carrier on Cell 1 -->
    <rect x="270" y="88" width="60" height="12" rx="3" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="300" y="97" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">PIN1 Efflux</text>

    <!-- Apoplastic Wall Space -->
    <rect x="100" y="100" width="400" height="24" fill="#1e293b" opacity="0.6"/>
    <text x="140" y="116" fill="#f87171" font-size="9" font-bold>Apoplast (pH 5.5)</text>
    <!-- IAAH diffuses across -->
    <path d="M 300 95 L 300 130" stroke="#fde047" stroke-width="3" stroke-dasharray="3,2"/>
    <text x="345" y="116" fill="#fef08a" font-size="9" font-mono>IAAH Entry →</text>

    <!-- Bottom Cell (Basal) -->
    <rect x="180" y="125" width="240" height="75" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
    <text x="300" y="150" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Cell 2 (Cytoplasm pH 7.0)</text>
    <!-- Basal PIN Carrier on Cell 2 -->
    <rect x="270" y="193" width="60" height="12" rx="3" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="300" y="202" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">PIN1 Efflux</text>
  `;
}

/**
 * 11. Interactive Renal Countercurrent Multiplier & Davenport Diagram (Module 12)
 */
export function createRenalCountercurrentDavenportModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-rose-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
          Renal Physiology & Acid-Base
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="ren-mode-loop" class="ren-btn px-2.5 py-1 rounded-lg font-bold bg-rose-600 text-white">Loop of Henle</button>
          <button id="ren-mode-dav" class="ren-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white">Davenport Acid-Base</button>
        </div>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="ren-svg" viewBox="0 0 600 220" class="w-full h-full"></svg>
      </div>

      <div id="ren-desc" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        NKCC2 cotransporters in the Thick Ascending Limb pump NaCl into medullary interstitium, building a 1200 mOsm/L corticomedullary gradient!
      </div>
    </div>
  `;

  let mode = 'loop';
  const svg = document.getElementById('ren-svg');
  const desc = document.getElementById('ren-desc');
  const btnLoop = document.getElementById('ren-mode-loop');
  const btnDav = document.getElementById('ren-mode-dav');

  function render() {
    if (mode === 'loop') {
      desc.textContent = "Countercurrent Multiplier: Descending limb is permeable to H₂O (concentrating fluid to 1200 mOsm). Thick ascending limb pumps NaCl via NKCC2 (creating +8 mV lumen-positive potential).";
      svg.innerHTML = `
        <!-- Cortex & Medulla gradient zones -->
        <rect x="40" y="20" width="520" height="40" fill="#1e293b" opacity="0.3"/><text x="50" y="45" fill="#94a3b8" font-size="9">Cortex (300 mOsm/L)</text>
        <rect x="40" y="60" width="520" height="70" fill="#312e81" opacity="0.3"/><text x="50" y="95" fill="#a5b4fc" font-size="9">Outer Medulla (600 mOsm/L)</text>
        <rect x="40" y="130" width="520" height="75" fill="#4c0519" opacity="0.4"/><text x="50" y="165" fill="#fda4af" font-size="9">Inner Medulla (1200 mOsm/L)</text>

        <!-- Hairpin Loop of Henle -->
        <!-- Descending Thin Limb -->
        <path d="M 240 25 L 240 175 Q 275 195, 310 175 L 310 25" fill="none" stroke="#38bdf8" stroke-width="8"/>
        <!-- Water exit on descending limb -->
        <path d="M 235 70 L 195 70" stroke="#67e8f9" stroke-width="2" stroke-dasharray="3,2"/>
        <text x="180" y="74" fill="#67e8f9" font-size="9" font-bold>H₂O exits</text>

        <!-- NKCC2 active NaCl pump on ascending limb -->
        <path d="M 315 100 L 355 100" stroke="#f59e0b" stroke-width="2.5"/>
        <text x="365" y="104" fill="#fde047" font-size="9" font-bold>NaCl (NKCC2)</text>
        <text x="365" y="116" fill="#facc15" font-size="8">+8 mV lumen potential</text>

        <text x="275" y="185" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">1200 mOsm</text>
      `;
    } else {
      desc.textContent = "Davenport Diagram: Plot of [HCO₃⁻] vs pH. Metabolic disturbances shift along the buffer line; respiratory disturbances shift between PCO₂ isopleths!";
      svg.innerHTML = `
        <!-- Axes -->
        <line x1="80" y1="180" x2="520" y2="180" stroke="#64748b" stroke-width="2"/>
        <line x1="80" y1="180" x2="80" y2="30" stroke="#64748b" stroke-width="2"/>
        <text x="530" y="184" fill="#94a3b8" font-size="10">pH</text>
        <text x="80" y="22" fill="#94a3b8" font-size="10">[HCO₃⁻] (mEq/L)</text>

        <!-- Normal Setpoint -->
        <circle cx="280" cy="110" r="6" fill="#10b981"/>
        <text x="295" y="105" fill="#10b981" font-size="10" font-weight="bold">Normal (pH 7.40, HCO₃⁻ 24)</text>

        <!-- Respiratory Acidosis vector -->
        <path d="M 280 110 L 210 70" stroke="#f43f5e" stroke-width="2.5"/>
        <text x="190" y="65" fill="#f43f5e" font-size="9" font-bold">Resp. Acidosis (PCO₂ > 40)</text>

        <!-- Metabolic Acidosis vector -->
        <path d="M 280 110 L 210 155" stroke="#eab308" stroke-width="2.5"/>
        <text x="190" y="165" fill="#eab308" font-size="9" font-bold">Metabolic Acidosis (MUDPILES)</text>

        <!-- Metabolic Alkalosis vector -->
        <path d="M 280 110 L 370 65" stroke="#38bdf8" stroke-width="2.5"/>
        <text x="380" y="60" fill="#38bdf8" font-size="9" font-bold">Metabolic Alkalosis</text>
      `;
    }
  }

  btnLoop.addEventListener('click', () => {
    mode = 'loop';
    btnLoop.className = "ren-btn px-2.5 py-1 rounded-lg font-bold bg-rose-600 text-white";
    btnDav.className = "ren-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    render();
  });

  btnDav.addEventListener('click', () => {
    mode = 'dav';
    btnDav.className = "ren-btn px-2.5 py-1 rounded-lg font-bold bg-rose-600 text-white";
    btnLoop.className = "ren-btn px-2.5 py-1 rounded-lg font-semibold text-slate-400 hover:text-white";
    render();
  });

  render();
}

/**
 * 12. Interactive PopGen Selection Trajectory & Wright's Fst (Module 14)
 */
export function createPopGenSelectionModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-amber-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Population Genetics Trajectory
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="pg-btn-over" class="pg-btn px-2 py-1 rounded font-bold bg-amber-600 text-white">Overdominance</button>
          <button id="pg-btn-rec" class="pg-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white">Lethal Recessive</button>
        </div>
      </div>

      <div class="relative h-[200px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="pg-svg" viewBox="0 0 600 200" class="w-full h-full"></svg>
      </div>

      <div id="pg-desc" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Overdominance (Heterozygote Advantage): w₁₁ = 0.8, w₁₂ = 1.0, w₂₂ = 0.2. Allele frequencies converge stably to p̂ = s₂/(s₁ + s₂)!
      </div>
    </div>
  `;

  let mode = 'over';
  const svg = document.getElementById('pg-svg');
  const desc = document.getElementById('pg-desc');
  const btnOver = document.getElementById('pg-btn-over');
  const btnRec = document.getElementById('pg-btn-rec');

  function render() {
    if (mode === 'over') {
      desc.innerHTML = "<strong>Heterozygote Advantage (Sickle Cell):</strong> No matter whether starting frequency p = 0.1 or p = 0.9, both trajectories converge to stable polymorphic equilibrium $\\hat{p} = \\frac{s_2}{s_1 + s_2} = 0.80$!";
      svg.innerHTML = `
        <line x1="60" y1="170" x2="540" y2="170" stroke="#64748b" stroke-width="1.5"/>
        <line x1="60" y1="170" x2="60" y2="20" stroke="#64748b" stroke-width="1.5"/>
        <text x="550" y="174" fill="#94a3b8" font-size="9">Generations</text>
        <text x="35" y="25" fill="#94a3b8" font-size="9">Freq (p)</text>

        <!-- Stable Equilibrium Line p = 0.8 -->
        <line x1="60" y1="50" x2="540" y2="50" stroke="#10b981" stroke-dasharray="4,4" stroke-width="2"/>
        <text x="545" y="54" fill="#34d399" font-size="9" font-bold>p̂ = 0.80 (Stable)</text>

        <!-- Trajectory 1 starting low -->
        <path d="M 60 155 Q 160 60, 540 50" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
        <!-- Trajectory 2 starting high -->
        <path d="M 60 30 Q 140 48, 540 50" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
      `;
    } else {
      desc.innerHTML = "<strong>Recessive Lethal (w₂₂ = 0):</strong> Frequency q declines rapidly at first, then extremely slowly as rare alleles hide in protected heterozygotes (q' = q / (1 + q))!";
      svg.innerHTML = `
        <line x1="60" y1="170" x2="540" y2="170" stroke="#64748b" stroke-width="1.5"/>
        <line x1="60" y1="170" x2="60" y2="20" stroke="#64748b" stroke-width="1.5"/>
        <text x="550" y="174" fill="#94a3b8" font-size="9">Generations</text>
        <text x="35" y="25" fill="#94a3b8" font-size="9">Freq (q)</text>

        <!-- Rapid early decline, plateauing asymptote -->
        <path d="M 60 30 Q 120 130, 540 160" fill="none" stroke="#f43f5e" stroke-width="3"/>
        <text x="240" y="110" fill="#f87171" font-size="10" font-bold>Asymptotic slow clearance near 0</text>
      `;
    }
  }

  btnOver.addEventListener('click', () => {
    mode = 'over';
    btnOver.className = "pg-btn px-2 py-1 rounded font-bold bg-amber-600 text-white";
    btnRec.className = "pg-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white";
    render();
  });

  btnRec.addEventListener('click', () => {
    mode = 'rec';
    btnRec.className = "pg-btn px-2 py-1 rounded font-bold bg-amber-600 text-white";
    btnOver.className = "pg-btn px-2 py-1 rounded font-semibold text-slate-400 hover:text-white";
    render();
  });

  render();
}

/**
 * 13. Interactive Lotka-Volterra Competition Isocline Explorer (Module 15)
 */
export function createLotkaVolterraModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-cyan-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Community Ecology Dynamics
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="lv-btn-coex" class="lv-btn px-2.5 py-1 rounded font-bold bg-cyan-600 text-white">Stable Coexistence</button>
          <button id="lv-btn-sp1" class="lv-btn px-2.5 py-1 rounded font-semibold text-slate-400 hover:text-white">Sp 1 Wins</button>
          <button id="lv-btn-unstable" class="lv-btn px-2.5 py-1 rounded font-semibold text-slate-400 hover:text-white">Unstable Exclusion</button>
        </div>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="lv-svg" viewBox="0 0 600 210" class="w-full h-full"></svg>
      </div>

      <div id="lv-desc" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Stable Coexistence: α₁₂ < K₁/K₂ and α₂₁ < K₂/K₁. Intraspecific competition is stronger than interspecific competition for both species!
      </div>
    </div>
  `;

  let mode = 'coex';
  const svg = document.getElementById('lv-svg');
  const desc = document.getElementById('lv-desc');
  const bCoex = document.getElementById('lv-btn-coex');
  const bSp1 = document.getElementById('lv-btn-sp1');
  const bUnst = document.getElementById('lv-btn-unstable');

  function render() {
    if (mode === 'coex') {
      desc.textContent = "STABLE COEXISTENCE: Isoclines cross with both K intercepts inside. Both species stably coexist at the internal intersection point!";
      svg.innerHTML = `
        <line x1="80" y1="180" x2="520" y2="180" stroke="#64748b" stroke-width="2"/>
        <line x1="80" y1="180" x2="80" y2="25" stroke="#64748b" stroke-width="2"/>
        <text x="530" y="184" fill="#94a3b8" font-size="10">Species 1 (N₁)</text>
        <text x="80" y="20" fill="#94a3b8" font-size="10">Species 2 (N₂)</text>

        <!-- Species 1 Isocline (Yellow) -->
        <line x1="80" y1="50" x2="420" y2="180" stroke="#facc15" stroke-width="2.5"/>
        <text x="430" y="184" fill="#fde047" font-size="9 font-bold">K₁</text>

        <!-- Species 2 Isocline (Blue) -->
        <line x1="80" y1="150" x2="280" y2="25" stroke="#38bdf8" stroke-width="2.5"/>
        <text x="85" y="155" fill="#7dd3fc" font-size="9 font-bold">K₂</text>

        <!-- Stable Coexistence Node -->
        <circle cx="210" cy="115" r="7" fill="#10b981" stroke="#fff" stroke-width="2"/>
        <text x="230" y="112" fill="#34d399" font-size="10" font-weight="bold">Stable Attractor</text>
      `;
    } else if (mode === 'sp1') {
      desc.textContent = "SPECIES 1 WINS: Species 1 isocline lies entirely outside Species 2 isocline. Species 1 competitively excludes Species 2!";
      svg.innerHTML = `
        <line x1="80" y1="180" x2="520" y2="180" stroke="#64748b" stroke-width="2"/>
        <line x1="80" y1="180" x2="80" y2="25" stroke="#64748b" stroke-width="2"/>

        <!-- Sp 1 Isocline (Outer) -->
        <line x1="80" y1="40" x2="480" y2="180" stroke="#facc15" stroke-width="3"/>
        <text x="485" y="184" fill="#facc15" font-size="10 font-bold">K₁</text>

        <!-- Sp 2 Isocline (Inner) -->
        <line x1="80" y1="110" x2="300" y2="180" stroke="#38bdf8" stroke-width="2"/>
        <text x="85" y="115" fill="#38bdf8" font-size="9">K₂</text>

        <!-- Arrow driving to K1 -->
        <path d="M 280 100 L 460 170" stroke="#10b981" stroke-width="3" marker-end="url(#arr)"/>
        <text x="350" y="120" fill="#34d399" font-size="10" font-weight="bold">→ Competitive Exclusion of Sp 2</text>
      `;
    } else {
      desc.textContent = "UNSTABLE COMPETITIVE EXCLUSION: Isoclines cross with both K intercepts outside. Whichever species starts at higher density wins!";
      svg.innerHTML = `
        <line x1="80" y1="180" x2="520" y2="180" stroke="#64748b" stroke-width="2"/>
        <line x1="80" y1="180" x2="80" y2="25" stroke="#64748b" stroke-width="2"/>

        <line x1="80" y1="150" x2="450" y2="50" stroke="#facc15" stroke-width="2.5"/>
        <line x1="80" y1="60" x2="450" y2="170" stroke="#38bdf8" stroke-width="2.5"/>

        <circle cx="260" cy="115" r="6" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>
        <text x="275" y="118" fill="#f87171" font-size="9" font-bold">Unstable Saddle Point</text>
      `;
    }
  }

  bCoex.addEventListener('click', () => { mode = 'coex'; render(); });
  bSp1.addEventListener('click', () => { mode = 'sp1'; render(); });
  bUnst.addEventListener('click', () => { mode = 'unst'; render(); });
  render();
}

/**
 * 14. Interactive Hamilton's Rule & Hymenoptera Relatedness Calculator (Module 16)
 */
export function createKinSelectionGameTheoryModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-violet-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wider">
          Social Evolution & Game Theory
        </span>
        <div class="flex items-center gap-1.5 text-xs">
          <button id="eth-btn-kin" class="eth-btn px-2.5 py-1 rounded font-bold bg-violet-600 text-white">Haplodiploidy (r)</button>
          <button id="eth-btn-hawk" class="eth-btn px-2.5 py-1 rounded font-semibold text-slate-400 hover:text-white">Hawk-Dove ESS</button>
        </div>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="eth-svg" viewBox="0 0 600 210" class="w-full h-full"></svg>
      </div>

      <div id="eth-desc" class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Hymenoptera Haplodiploidy: Full sisters share 75% of genes (r = 0.75), whereas a female is only 50% related to her own offspring (r = 0.50)!
      </div>
    </div>
  `;

  let mode = 'kin';
  const svg = document.getElementById('eth-svg');
  const desc = document.getElementById('eth-desc');
  const bKin = document.getElementById('eth-btn-kin');
  const bHawk = document.getElementById('eth-btn-hawk');

  function render() {
    if (mode === 'kin') {
      desc.textContent = "Hamilton's Rule: rB > C. Because sister-sister r = 0.75 > mother-daughter r = 0.50, natural selection favors workers raising reproductive sisters over having their own offspring!";
      svg.innerHTML = `
        <!-- Mother Queen -->
        <circle cx="200" cy="50" r="22" fill="#8b5cf6"/><text x="200" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Queen (2n)</text>
        <!-- Father Drone -->
        <circle cx="400" cy="50" r="20" fill="#06b6d4"/><text x="400" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Drone (1n)</text>

        <!-- Sister 1 -->
        <circle cx="250" cy="150" r="20" fill="#ec4899"/><text x="250" y="154" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Sister 1</text>
        <!-- Sister 2 -->
        <circle cx="350" cy="150" r="20" fill="#ec4899"/><text x="350" y="154" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Sister 2</text>

        <!-- Relatedness Line -->
        <line x1="270" y1="150" x2="330" y2="150" stroke="#facc15" stroke-width="4"/>
        <text x="300" y="140" fill="#facc15" font-size="12" font-weight="bold" text-anchor="middle">r = 0.75</text>
        <text x="300" y="175" fill="#a7f3d0" font-size="10" text-anchor="middle">0.25 (maternal) + 0.50 (paternal)</text>
      `;
    } else {
      desc.textContent = "Hawk-Dove Payoff Matrix: When injury cost C > resource value V, neither pure strategy is stable. The mixed ESS has fraction pHawk = V/C!";
      svg.innerHTML = `
        <rect x="150" y="30" width="300" height="130" rx="10" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <line x1="300" y1="30" x2="300" y2="160" stroke="#475569" stroke-width="2"/>
        <line x1="150" y1="95" x2="450" y2="95" stroke="#475569" stroke-width="2"/>

        <text x="225" y="70" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">(V - C) / 2</text>
        <text x="375" y="70" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">V</text>
        <text x="225" y="135" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">0</text>
        <text x="375" y="135" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">V / 2</text>

        <text x="300" y="185" fill="#fde047" font-size="11" font-weight="bold" text-anchor="middle">Mixed ESS: p(Hawk) = V / C</text>
      `;
    }
  }

  bKin.addEventListener('click', () => { mode = 'kin'; render(); });
  bHawk.addEventListener('click', () => { mode = 'hawk'; render(); });
  render();
}

/**
 * 15. Interactive Cladistics & Fitch Maximum Parsimony Tree Mapper (Module 17)
 */
export function createCladisticsParsimonyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="my-4 rounded-2xl bg-slate-950 border border-pink-900/50 p-4 shadow-xl space-y-3">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase tracking-wider">
          Systematics & Cladistics
        </span>
        <span class="text-xs font-mono font-bold text-pink-400">Consistency Index CI = m / s</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg id="clad-svg" viewBox="0 0 600 210" class="w-full h-full"></svg>
      </div>

      <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
        Maximum Parsimony: Evaluates tree topologies to minimize total evolutionary character state changes (s). Monophyletic clades are defined strictly by shared derived synapomorphies!
      </div>
    </div>
  `;

  const svg = document.getElementById('clad-svg');
  svg.innerHTML = `
    <!-- Root -->
    <line x1="100" y1="170" x2="180" y2="120" stroke="#94a3b8" stroke-width="3"/>
    <!-- Node 1 -->
    <line x1="180" y1="120" x2="280" y2="70" stroke="#94a3b8" stroke-width="3"/>
    <line x1="180" y1="120" x2="300" y2="170" stroke="#94a3b8" stroke-width="3"/>
    <text x="310" y="174" fill="#a5b4fc" font-size="11" font-weight="bold">Outgroup (Taxon A)</text>

    <!-- Node 2 branches -->
    <line x1="280" y1="70" x2="420" y2="30" stroke="#94a3b8" stroke-width="3"/>
    <line x1="280" y1="70" x2="420" y2="110" stroke="#94a3b8" stroke-width="3"/>
    <text x="430" y="34" fill="#34d399" font-size="11" font-weight="bold">Taxon B (Sister)</text>
    <text x="430" y="114" fill="#34d399" font-size="11" font-weight="bold">Taxon C (Sister)</text>

    <!-- Synapomorphy tick mark -->
    <rect x="220" y="85" width="6" height="18" fill="#f43f5e"/>
    <text x="223" y="75" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">Synapomorphy 1</text>

    <text x="300" y="195" fill="#fde047" font-size="10" text-anchor="middle">
      Monophyletic Clade (B + C) supported by 1 shared derived character state
    </text>
  `;
}

// =========================================================================
// MODULE 18 (cell-6-molecular-genetics): DNA REPLICATION FORK DYNAMICS
// =========================================================================
export function createDNAReplicationForkModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
          Cell Bio: Replication Fork Nanomachine
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="rf-speed-label">Fork Speed: 1000 bp/s</span>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg id="rf-svg" viewBox="0 0 650 220" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
        <div class="flex items-center gap-2">
          <button id="rf-play-btn" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition text-xs">
            Pause / Resume
          </button>
          <span class="text-slate-400 text-[11px]" id="rf-status-txt">Leading strand 5'→3' continuous | Lagging strand Okazaki fragments</span>
        </div>
        <div class="text-[11px] font-mono text-emerald-400">
          Enzymes: DnaB Helicase • DnaG Primase • Pol III Holoenzyme • DNA Ligase
        </div>
      </div>
    </div>
  `;

  const svg = document.getElementById('rf-svg');
  let offset = 0;
  let running = true;
  let animId = null;

  function render(timeOffset) {
    if (!svg) return;
    const okOffset = (timeOffset * 0.8) % 120;

    svg.innerHTML = `
      <!-- Unwound parental dsDNA (right) -->
      <line x1="420" y1="105" x2="630" y2="105" stroke="#6366f1" stroke-width="6" stroke-dasharray="8 4"/>
      <text x="610" y="95" fill="#a5b4fc" font-size="10" font-family="monospace">5'</text>
      <text x="610" y="125" fill="#a5b4fc" font-size="10" font-family="monospace">3'</text>

      <!-- Helicase Hexamer (DnaB) -->
      <circle cx="410" cy="105" r="24" fill="#f59e0b" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
      <circle cx="410" cy="105" r="8" fill="#1e1b4b"/>
      <text x="410" y="109" fill="#ffffff" font-size="9" font-weight="black" text-anchor="middle">DnaB</text>

      <!-- Leading Strand (top branch: continuous 5'->3' toward fork) -->
      <path d="M 400 95 Q 320 50 80 50" fill="none" stroke="#94a3b8" stroke-width="4"/>
      <!-- Newly synthesized leading strand -->
      <path d="M 370 56 Q 300 56 120 56" fill="none" stroke="#10b981" stroke-width="5"/>
      <polygon points="375,56 365,51 365,61" fill="#10b981"/>
      <text x="70" y="45" fill="#94a3b8" font-size="10" font-family="monospace">Parental 3'</text>
      <text x="70" y="70" fill="#10b981" font-size="10" font-weight="bold">Leading (Continuous 5'→3')</text>

      <!-- Leading Pol III Holoenzyme + beta clamp -->
      <rect x="330" y="42" width="28" height="28" rx="6" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
      <text x="344" y="59" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Pol III</text>

      <!-- Lagging Strand (bottom branch: discontinuous away from fork) -->
      <path d="M 400 115 Q 320 160 80 160" fill="none" stroke="#94a3b8" stroke-width="4"/>
      <text x="70" y="180" fill="#94a3b8" font-size="10" font-family="monospace">Parental 5'</text>

      <!-- Okazaki fragments (moving leftward away from fork) -->
      <!-- Fragment 1 (RNA primer red + DNA green) -->
      <line x1="${260 - okOffset}" y1="154" x2="${240 - okOffset}" y2="154" stroke="#ef4444" stroke-width="5"/>
      <line x1="${240 - okOffset}" y1="154" x2="${140 - okOffset}" y2="154" stroke="#10b981" stroke-width="5"/>
      <polygon points="${135 - okOffset},154 ${145 - okOffset},149 ${145 - okOffset},159" fill="#10b981"/>

      <!-- Fragment 2 (closer to fork) -->
      <line x1="${380 - okOffset}" y1="154" x2="${360 - okOffset}" y2="154" stroke="#ef4444" stroke-width="5"/>
      <line x1="${360 - okOffset}" y1="154" x2="${280 - okOffset}" y2="154" stroke="#10b981" stroke-width="5"/>

      <!-- DnaG Primase -->
      <rect x="375" y="125" width="22" height="18" rx="4" fill="#ec4899"/>
      <text x="386" y="137" fill="#fff" font-size="7" font-weight="bold" text-anchor="middle">Primase</text>

      <!-- Single-Stranded Binding Proteins (SSBs) -->
      <circle cx="280" cy="40" r="6" fill="#8b5cf6"/>
      <circle cx="260" cy="40" r="6" fill="#8b5cf6"/>
      <circle cx="310" cy="172" r="6" fill="#8b5cf6"/>
      <circle cx="330" cy="172" r="6" fill="#8b5cf6"/>
      <text x="300" y="190" fill="#c4b5fd" font-size="8" text-anchor="middle">SSB Tetramers</text>

      <!-- DNA Ligase sealing nick -->
      <circle cx="130" cy="154" r="12" fill="#06b6d4" opacity="0.85"/>
      <text x="130" y="157" fill="#fff" font-size="7" font-weight="bold" text-anchor="middle">Ligase</text>

      <text x="325" y="210" fill="#fde047" font-size="9" text-anchor="middle" font-family="monospace">
        Trombone Model: Lagging strand loops through dimeric Pol III core complex
      </text>
    `;
  }

  function loop() {
    if (running) {
      offset += 1;
      render(offset);
    }
    animId = requestAnimationFrame(loop);
  }
  loop();

  const playBtn = document.getElementById('rf-play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      running = !running;
      playBtn.textContent = running ? "Pause" : "Resume";
    });
  }
}

// =========================================================================
// MODULE 19 (cell-7-microbiology): GRAM CELL WALL & PHAGE CYCLES
// =========================================================================
export function createMicrobiologyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-purple-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
          Microbiology: Bacterial Cell Wall & Phage Switch
        </span>
        <div class="flex items-center gap-1.5" id="micro-tab-btns">
          <button id="tab-gram-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-600 text-white">Gram Wall</button>
          <button id="tab-phage-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Phage λ Switch</button>
        </div>
      </div>

      <div class="relative h-[220px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="micro-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div id="micro-desc" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        Click the tabs above to toggle between the comparative peptidoglycan architecture (Gram+ vs Gram-) and the molecular bacteriophage λ lytic/lysogenic bistable genetic switch (cI vs Cro).
      </div>
    </div>
  `;

  const svg = document.getElementById('micro-svg');
  const desc = document.getElementById('micro-desc');
  let currentMode = 'gram';

  function renderGram() {
    svg.innerHTML = `
      <!-- GRAM POSITIVE (Left) -->
      <g transform="translate(20, 20)">
        <text x="130" y="0" fill="#a855f7" font-size="12" font-weight="black" text-anchor="middle">Gram-Positive (Stains Purple)</text>
        <!-- Lipoteichoic acids extending outward -->
        <line x1="60" y1="20" x2="60" y2="105" stroke="#ec4899" stroke-width="4"/>
        <line x1="130" y1="10" x2="130" y2="105" stroke="#ec4899" stroke-width="4"/>
        <line x1="200" y1="25" x2="200" y2="105" stroke="#ec4899" stroke-width="4"/>
        <text x="130" y="22" fill="#f472b6" font-size="8" font-weight="bold" text-anchor="middle">Teichoic / Lipoteichoic Acid</text>

        <!-- Thick Peptidoglycan (30-80 nm) -->
        <rect x="20" y="30" width="220" height="75" fill="#7e22ce" opacity="0.75" rx="4"/>
        <text x="130" y="70" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Thick Peptidoglycan (NAG-NAM)</text>
        <text x="130" y="85" fill="#e9d5ff" font-size="8" text-anchor="middle">Retains Crystal Violet-Iodine Complex</text>

        <!-- Periplasmic space -->
        <rect x="20" y="105" width="220" height="10" fill="#1e1b4b"/>
        <!-- Plasma membrane -->
        <rect x="20" y="115" width="220" height="25" fill="#3b82f6" rx="3"/>
        <text x="130" y="131" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Plasma Membrane Bilayer</text>
        <text x="130" y="160" fill="#cbd5e1" font-size="9" text-anchor="middle">Cytoplasm (Endospores in Bacillus/Clostridium)</text>
      </g>

      <!-- GRAM NEGATIVE (Right) -->
      <g transform="translate(340, 20)">
        <text x="140" y="0" fill="#f43f5e" font-size="12" font-weight="black" text-anchor="middle">Gram-Negative (Stains Pink)</text>
        
        <!-- Lipopolysaccharide (LPS) hairs -->
        <path d="M 40 30 Q 35 15 45 5 M 80 30 Q 85 10 75 5 M 130 30 Q 125 10 135 5 M 180 30 Q 185 15 175 5 M 220 30 Q 215 10 225 5" stroke="#fbbf24" stroke-width="3" fill="none"/>
        <text x="140" y="20" fill="#fbbf24" font-size="8" font-weight="bold" text-anchor="middle">LPS (Endotoxin: Lipid A + O-Antigen)</text>

        <!-- Outer Membrane -->
        <rect x="30" y="30" width="220" height="20" fill="#f43f5e" opacity="0.85" rx="3"/>
        <text x="140" y="44" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Outer Membrane (with Porins)</text>

        <!-- Periplasmic Space with Thin Peptidoglycan -->
        <rect x="30" y="50" width="220" height="55" fill="#1e1b4b"/>
        <rect x="30" y="68" width="220" height="15" fill="#7e22ce" opacity="0.85" rx="2"/>
        <text x="140" y="79" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">Thin Peptidoglycan (2-7 nm)</text>
        <text x="140" y="95" fill="#94a3b8" font-size="7" text-anchor="middle">Extensive Periplasmic Space</text>

        <!-- Inner Plasma Membrane -->
        <rect x="30" y="105" width="220" height="25" fill="#3b82f6" rx="3"/>
        <text x="140" y="121" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Inner Plasma Membrane</text>
        <text x="140" y="150" fill="#cbd5e1" font-size="8" text-anchor="middle">Decolorized by acetone; Safranin counterstain</text>
      </g>
    `;
    desc.innerHTML = `<strong>Gram-Positive vs Gram-Negative:</strong> Gram+ has a thick peptidoglycan multilayer with lipoteichoic acids retaining crystal violet. Gram- has an asymmetric outer membrane bearing toxic Lipopolysaccharide (Lipid A endotoxin) and thin peptidoglycan in the periplasmic space!`;
  }

  function renderPhage() {
    svg.innerHTML = `
      <g transform="translate(50, 20)">
        <text x="270" y="10" fill="#38bdf8" font-size="13" font-weight="black" text-anchor="middle">Bacteriophage λ Bistable Switch: cI vs. Cro</text>
        
        <!-- DNA Operator Region OR1 - OR2 - OR3 -->
        <rect x="70" y="75" width="400" height="30" fill="#334155" rx="4"/>
        <rect x="110" y="78" width="80" height="24" fill="#64748b" rx="3"/>
        <text x="150" y="94" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">O_R1 (cI high)</text>

        <rect x="230" y="78" width="80" height="24" fill="#64748b" rx="3"/>
        <text x="270" y="94" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">O_R2 (cI/Cro)</text>

        <rect x="350" y="78" width="80" height="24" fill="#64748b" rx="3"/>
        <text x="390" y="94" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">O_R3 (Cro high)</text>

        <!-- cI Repressor (Lysogeny) -->
        <circle cx="150" cy="45" r="18" fill="#10b981" stroke="#34d399" stroke-width="2"/>
        <text x="150" y="49" fill="#fff" font-size="9" font-weight="black" text-anchor="middle">cI</text>
        <path d="M 150 63 L 150 75" stroke="#10b981" stroke-width="3" marker-end="url(#arr)"/>
        <text x="80" y="35" fill="#34d399" font-size="10" font-weight="bold">Lysogeny Mode</text>
        <text x="80" y="48" fill="#a7f3d0" font-size="8">cI represses Cro & drives own promoter P_RM</text>

        <!-- Cro Repressor (Lysis) -->
        <circle cx="390" cy="45" r="18" fill="#ef4444" stroke="#f87171" stroke-width="2"/>
        <text x="390" y="49" fill="#fff" font-size="9" font-weight="black" text-anchor="middle">Cro</text>
        <path d="M 390 63 L 390 75" stroke="#ef4444" stroke-width="3"/>
        <text x="440" y="35" fill="#f87171" font-size="10" font-weight="bold">Lytic Cycle</text>
        <text x="440" y="48" fill="#fecaca" font-size="8">Cro represses cI & activates lytic genes</text>

        <!-- SOS response trigger -->
        <rect x="120" y="130" width="300" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1"/>
        <text x="270" y="146" fill="#fde047" font-size="9" font-weight="bold" text-anchor="middle">
          DNA Damage SOS Response: RecA* coprotease activates cI autocleavage!
        </text>
        <text x="270" y="158" fill="#cbd5e1" font-size="8" text-anchor="middle">
          Loss of cI triggers immediate prophage induction into the lytic cascade.
        </text>
      </g>
    `;
    desc.innerHTML = `<strong>Bistable λ Genetic Switch:</strong> Under nutrient-rich low-stress conditions, cI repressor dimers bind O_R1 and O_R2 with cooperativity, shutting down Cro and maintaining the integrated dormant <strong>prophage state (lysogeny)</strong>. UV light or DNA damage activates <strong>RecA</strong>, which cleaves cI, freeing O_R3 for <strong>Cro</strong> to initiate the destructive <strong>lytic cascade</strong>!`;
  }

  renderGram();

  document.getElementById('tab-gram-btn').addEventListener('click', () => {
    currentMode = 'gram';
    document.getElementById('tab-gram-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-purple-600 text-white";
    document.getElementById('tab-phage-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderGram();
  });

  document.getElementById('tab-phage-btn').addEventListener('click', () => {
    currentMode = 'phage';
    document.getElementById('tab-phage-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-purple-600 text-white";
    document.getElementById('tab-gram-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderPhage();
  });
}

// =========================================================================
// MODULE 20 (cell-8-biotechnology): PCR THERMAL CYCLER SIMULATOR
// =========================================================================
export function createBiotechPCRModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-teal-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
          Biotechnology: Polymerase Chain Reaction (PCR)
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="pcr-amplif-label">Target Copies: 2^n</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="pcr-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex items-center justify-between pt-1 text-xs">
        <div class="flex items-center gap-2">
          <button id="pcr-step-btn" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition text-xs shadow-md">
            Next Thermal Step →
          </button>
          <span class="text-slate-400 text-[11px]" id="pcr-step-txt">Step 1: Denaturation at 95°C</span>
        </div>
        <div class="font-mono text-emerald-400 font-bold" id="pcr-count-txt">Cycle: 1 | Amplification: 2x</div>
      </div>
    </div>
  `;

  const svg = document.getElementById('pcr-svg');
  const stepTxt = document.getElementById('pcr-step-txt');
  const countTxt = document.getElementById('pcr-count-txt');
  const amplifLabel = document.getElementById('pcr-amplif-label');
  let currentStep = 0; // 0: 95°C Denature, 1: 55°C Anneal, 2: 72°C Extend
  let cycle = 1;

  function renderPCR() {
    if (currentStep === 0) {
      // Denaturation (95°C)
      svg.innerHTML = `
        <text x="325" y="24" fill="#ef4444" font-size="13" font-weight="black" text-anchor="middle">Step 1: Denaturation (95°C) - Thermal Strand Separation</text>
        <!-- Top strand separated -->
        <line x1="80" y1="65" x2="570" y2="65" stroke="#38bdf8" stroke-width="5"/>
        <text x="60" y="70" fill="#38bdf8" font-size="10" font-family="monospace">5'</text>
        <text x="585" y="70" fill="#38bdf8" font-size="10" font-family="monospace">3'</text>
        <!-- Hydrogen bonds broken -->
        <text x="325" y="105" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">🔥 High thermal energy disrupts hydrogen bonds between complementary base pairs</text>
        <!-- Bottom strand separated -->
        <line x1="80" y1="145" x2="570" y2="145" stroke="#38bdf8" stroke-width="5"/>
        <text x="60" y="150" fill="#38bdf8" font-size="10" font-family="monospace">3'</text>
        <text x="585" y="150" fill="#38bdf8" font-size="10" font-family="monospace">5'</text>
        <text x="325" y="185" fill="#94a3b8" font-size="9" text-anchor="middle">Native double-stranded DNA template melts into two single strands with zero enzymatic helicase required</text>
      `;
      stepTxt.textContent = "Step 1: Denaturation at 95°C (Strand separation)";
    } else if (currentStep === 1) {
      // Annealing (55°C)
      svg.innerHTML = `
        <text x="325" y="24" fill="#3b82f6" font-size="13" font-weight="black" text-anchor="middle">Step 2: Annealing (55°C) - Sequence-Specific Primer Hybridization</text>
        <!-- Top template strand (5' to 3') -->
        <line x1="80" y1="65" x2="570" y2="65" stroke="#38bdf8" stroke-width="5"/>
        <!-- Reverse Primer (3' end right, pointing left 5'<-3') -->
        <line x1="480" y1="78" x2="550" y2="78" stroke="#f59e0b" stroke-width="6"/>
        <polygon points="475,78 485,73 485,83" fill="#f59e0b"/>
        <text x="515" y="95" fill="#f59e0b" font-size="9" font-weight="bold">Reverse Primer</text>

        <!-- Bottom template strand (3' to 5') -->
        <line x1="80" y1="150" x2="570" y2="150" stroke="#38bdf8" stroke-width="5"/>
        <!-- Forward Primer (5' to 3' pointing right) -->
        <line x1="100" y1="137" x2="170" y2="137" stroke="#f59e0b" stroke-width="6"/>
        <polygon points="175,137 165,132 165,142" fill="#f59e0b"/>
        <text x="110" y="125" fill="#f59e0b" font-size="9" font-weight="bold">Forward Primer</text>

        <text x="325" y="185" fill="#a5b4fc" font-size="9" text-anchor="middle">
          Molar excess of synthetic oligonucleotide primers (~20 nt, Tm ≈ 60°C) outcompetes template re-annealing
        </text>
      `;
      stepTxt.textContent = "Step 2: Annealing at 55°C (Primer hybridization)";
    } else {
      // Extension (72°C)
      svg.innerHTML = `
        <text x="325" y="24" fill="#10b981" font-size="13" font-weight="black" text-anchor="middle">Step 3: Extension (72°C) - Taq Polymerase Synthesis</text>
        
        <!-- Top strand with extended DNA -->
        <line x1="80" y1="65" x2="570" y2="65" stroke="#38bdf8" stroke-width="4"/>
        <line x1="280" y1="78" x2="550" y2="78" stroke="#10b981" stroke-width="5"/>
        <polygon points="275,78 285,73 285,83" fill="#10b981"/>
        <!-- Taq Polymerase 1 -->
        <circle cx="265" cy="78" r="14" fill="#ec4899"/>
        <text x="265" y="82" fill="#fff" font-size="7" font-weight="bold" text-anchor="middle">Taq</text>

        <!-- Bottom strand with extended DNA -->
        <line x1="80" y1="150" x2="570" y2="150" stroke="#38bdf8" stroke-width="4"/>
        <line x1="100" y1="137" x2="370" y2="137" stroke="#10b981" stroke-width="5"/>
        <polygon points="375,137 365,132 365,142" fill="#10b981"/>
        <!-- Taq Polymerase 2 -->
        <circle cx="385" cy="137" r="14" fill="#ec4899"/>
        <text x="385" y="141" fill="#fff" font-size="7" font-weight="bold" text-anchor="middle">Taq</text>

        <text x="325" y="185" fill="#34d399" font-size="9" text-anchor="middle" font-weight="bold">
          Thermostable Taq DNA Polymerase adds dNTPs at ~1000 bp/min (72°C optimum)
        </text>
      `;
      stepTxt.textContent = "Step 3: Extension at 72°C (Taq synthesis)";
    }

    const copies = Math.pow(2, cycle);
    countTxt.textContent = `Cycle: ${cycle} | Amplification: ${copies.toLocaleString()}x`;
    amplifLabel.textContent = `2^${cycle} = ${copies.toLocaleString()} copies`;
  }

  renderPCR();

  document.getElementById('pcr-step-btn').addEventListener('click', () => {
    currentStep = (currentStep + 1) % 3;
    if (currentStep === 0) {
      cycle = Math.min(cycle + 1, 30);
    }
    renderPCR();
  });
}

// =========================================================================
// MODULE 21 (plant-5-anatomy): DICOT STEM CROSS-SECTION & CASPARIAN STRIP
// =========================================================================
export function createPlantAnatomyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-emerald-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
          Plant Anatomy: Woody Dicot Cross-Section & Pores
        </span>
        <span class="text-xs font-mono font-bold text-emerald-400">Hagen-Poiseuille: Q ∝ r⁴</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="stem-svg" viewBox="0 0 650 210" class="w-full h-full select-none cursor-pointer"></svg>
      </div>

      <div id="stem-info" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        Hover over or click the anatomical rings: Epidermis/Cork → Cortex → Phloem → Vascular Cambium (bifacial meristem) → Secondary Xylem (Annual Growth Rings) → Pith.
      </div>
    </div>
  `;

  const svg = document.getElementById('stem-svg');
  const info = document.getElementById('stem-info');

  svg.innerHTML = `
    <!-- Concentric Dicot Stem Cross-Section -->
    <g transform="translate(160, 105)">
      <!-- Outer Bark (Cork / Periderm) -->
      <circle cx="0" cy="0" r="95" fill="#451a03" stroke="#78350f" stroke-width="3" id="ring-cork"/>
      <!-- Cortex -->
      <circle cx="0" cy="0" r="82" fill="#14532d" stroke="#16a34a" stroke-width="2" id="ring-cortex"/>
      <!-- Phloem (blue) -->
      <circle cx="0" cy="0" r="68" fill="#1e3a8a" stroke="#2563eb" stroke-width="2" id="ring-phloem"/>
      <!-- Vascular Cambium (thin green ring) -->
      <circle cx="0" cy="0" r="54" fill="none" stroke="#22c55e" stroke-width="4" stroke-dasharray="4 2" id="ring-cambium"/>
      <!-- Secondary Xylem (Wood: Spring/Summer rings) -->
      <circle cx="0" cy="0" r="50" fill="#7f1d1d" stroke="#b91c1c" stroke-width="2" id="ring-xylem"/>
      <circle cx="0" cy="0" r="36" fill="#991b1b" stroke="#dc2626" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="22" fill="#b91c1c" stroke="#ef4444" stroke-width="1"/>
      <!-- Pith (central parenchyma) -->
      <circle cx="0" cy="0" r="10" fill="#fef08a" id="ring-pith"/>

      <text x="0" y="3" fill="#1e1b4b" font-size="7" font-weight="black" text-anchor="middle">Pith</text>
    </g>

    <!-- Hydraulic Conduit Comparison (Right) -->
    <g transform="translate(340, 25)">
      <text x="140" y="10" fill="#38bdf8" font-size="12" font-weight="black" text-anchor="middle">Conduit Hydraulic Conductance (Q ∝ r⁴)</text>
      
      <!-- Narrow Conifer Tracheid (r = 10 um) -->
      <rect x="20" y="30" width="30" height="90" rx="4" fill="#0f172a" stroke="#60a5fa" stroke-width="2"/>
      <text x="35" y="135" fill="#94a3b8" font-size="8" text-anchor="middle">Tracheid (r=10μm)</text>
      <text x="35" y="148" fill="#cbd5e1" font-size="8" font-mono text-anchor="middle">Relative Q = 1x</text>

      <!-- Wide Angiosperm Vessel Element (r = 40 um) -->
      <rect x="140" y="30" width="120" height="90" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="3"/>
      <!-- Perforation plate simple -->
      <line x1="140" y1="60" x2="260" y2="60" stroke="#34d399" stroke-width="3" stroke-dasharray="8 6"/>
      <text x="200" y="75" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Simple Perforation Plate</text>
      <text x="200" y="135" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Vessel Element (r=40μm, 4x radius)</text>
      <text x="200" y="148" fill="#fde047" font-size="9" font-mono font-weight="bold" text-anchor="middle">Relative Q = 4⁴ = 256x Flow!</text>

      <text x="140" y="172" fill="#fca5a5" font-size="8" text-anchor="middle">
        Trade-off: High conductivity comes with severe vulnerability to freezing/drought cavitation (P50).
      </text>
    </g>
  `;

  document.getElementById('ring-cambium').addEventListener('click', () => {
    info.innerHTML = `<strong>Vascular Cambium:</strong> The lateral bifacial secondary meristem. Divides periclinally to produce <strong>secondary xylem (wood)</strong> inward and <strong>secondary phloem (inner bark)</strong> outward. Contains fusiform initials (axial system) and ray initials (horizontal transport).`;
  });
  document.getElementById('ring-xylem').addEventListener('click', () => {
    info.innerHTML = `<strong>Secondary Xylem (Annual Growth Rings):</strong> Early/spring wood has wide, thin-walled vessel elements for maximum hydraulic flux. Late/summer wood has dense, narrow conduits with thick fibers for structural stability.`;
  });
  document.getElementById('ring-phloem').addEventListener('click', () => {
    info.innerHTML = `<strong>Secondary Phloem:</strong> Sieve tube elements and companion cells responsible for translocation of photoassimilates driven by the Münch turgor pressure gradient. Protected by P-protein and callose.`;
  });
}

// =========================================================================
// MODULE 22 (plant-6-reproduction): DOUBLE FERTILIZATION & EMBRYO SAC
// =========================================================================
export function createDoubleFertilizationModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-teal-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
          Plant Reproduction: Angiosperm Double Fertilization
        </span>
        <span class="text-xs font-mono font-bold text-amber-400">7-Cell, 8-Nucleate Embryo Sac</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="fert-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex items-center justify-between pt-1 text-xs">
        <button id="fert-trigger-btn" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition text-xs shadow-md">
          Discharge Sperm Cells →
        </button>
        <span class="text-slate-300 text-[11px]" id="fert-status-txt">Pollen tube guided by synergid LURE peptides</span>
      </div>
    </div>
  `;

  const svg = document.getElementById('fert-svg');
  const btn = document.getElementById('fert-trigger-btn');
  const statusTxt = document.getElementById('fert-status-txt');
  let fertilized = false;

  function render(isDone) {
    svg.innerHTML = `
      <!-- Embryo Sac Oval Boundary (Polygonum type) -->
      <ellipse cx="360" cy="105" rx="140" ry="85" fill="#064e3b" stroke="#10b981" stroke-width="3" opacity="0.85"/>

      <!-- Chalazal End: 3 Antipodal Cells (Left) -->
      <circle cx="250" cy="75" r="14" fill="#047857"/>
      <circle cx="235" cy="105" r="14" fill="#047857"/>
      <circle cx="250" cy="135" r="14" fill="#047857"/>
      <text x="245" y="165" fill="#a7f3d0" font-size="8" text-anchor="middle">3 Antipodals (1n)</text>

      <!-- Central Cell: 2 Polar Nuclei -->
      <circle cx="${isDone ? 360 : 350}" cy="95" r="12" fill="${isDone ? '#fbbf24' : '#059669'}"/>
      <circle cx="${isDone ? 360 : 370}" cy="95" r="12" fill="${isDone ? '#fbbf24' : '#059669'}"/>
      <text x="360" y="125" fill="${isDone ? '#fef08a' : '#d1fae5'}" font-size="9" font-weight="bold" text-anchor="middle">
        ${isDone ? "★ 3n Primary Endosperm Nucleus (1n sperm + 2n polar nuclei)" : "Central Cell: 2 Polar Nuclei (1n + 1n)"}
      </text>

      <!-- Micropylar End: Egg Apparatus (Right) -->
      <!-- Egg Cell -->
      <circle cx="450" cy="105" r="16" fill="${isDone ? '#f43f5e' : '#10b981'}" stroke="#fff" stroke-width="2"/>
      <text x="450" y="108" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">${isDone ? "2n Zygote" : "Egg (1n)"}</text>
      <!-- Synergids with filiform apparatus -->
      <circle cx="465" cy="75" r="12" fill="#047857"/>
      <circle cx="465" cy="135" r="12" fill="#047857"/>
      <text x="475" y="60" fill="#6ee7b7" font-size="7">Synergid (LURE)</text>

      <!-- Pollen Tube entering Micropyle -->
      <path d="M 620 105 Q 560 105 490 105" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/>
      <text x="570" y="90" fill="#f59e0b" font-size="9" font-weight="bold">Pollen Tube</text>

      ${isDone ? `
        <!-- Discharged Sperm 1 fusing with Egg -->
        <circle cx="450" cy="105" r="5" fill="#fde047"/>
        <!-- Discharged Sperm 2 fusing with Polar Nuclei -->
        <circle cx="360" cy="95" r="5" fill="#fde047"/>
      ` : `
        <!-- Sperm cell 1 in tube -->
        <circle cx="510" cy="105" r="5" fill="#fde047"/>
        <!-- Sperm cell 2 in tube -->
        <circle cx="530" cy="105" r="5" fill="#fde047"/>
      `}

      <text x="325" y="200" fill="#fde047" font-size="10" text-anchor="middle" font-family="monospace">
        ${isDone ? "✓ Double Fertilization Complete: Diploid Embryo (2n) + Triploid Endosperm (3n)!" : "Siphonogamous tip-growth delivers 2 immotile sperm directly to female gametophyte"}
      </text>
    `;
  }

  render(false);

  btn.addEventListener('click', () => {
    fertilized = !fertilized;
    btn.textContent = fertilized ? "Reset Fertilization" : "Discharge Sperm Cells →";
    statusTxt.textContent = fertilized ? "Double fertilization achieved! (2n Zygote + 3n Endosperm)" : "Pollen tube guided by synergid LURE peptides";
    render(fertilized);
  });
}

// =========================================================================
// MODULE 23 (animal-4-digestion): PARIETAL CELL H+/K+ PUMP & GI ORGANS
// =========================================================================
export function createDigestionModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-rose-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
          Animal Phys: Parietal Cell Acid Secretion & GI Enzymes
        </span>
        <div class="flex items-center gap-1.5" id="gi-org-btns">
          <button class="gi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white" data-target="parietal">Parietal Cell</button>
          <button class="gi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700" data-target="duodenum">Duodenum</button>
          <button class="gi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700" data-target="ileum">Ileum/Lipids</button>
        </div>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="digestion-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div id="digestion-desc" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        Gastric Parietal Cell: H+/K+-ATPase pumps H+ against a 1,000,000-fold concentration gradient into the gastric lumen (pH ~ 1.0), while basolateral AE2 exports HCO3- into the blood, generating the postprandial alkaline tide!
      </div>
    </div>
  `;

  const svg = document.getElementById('digestion-svg');
  const desc = document.getElementById('digestion-desc');

  function renderParietal() {
    svg.innerHTML = `
      <!-- Parietal Cell Membrane Scheme -->
      <g transform="translate(10, 15)">
        <!-- Blood capillary (Left) -->
        <rect x="10" y="25" width="80" height="150" fill="#881337" rx="6"/>
        <text x="50" y="105" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Blood</text>
        <text x="50" y="125" fill="#fecdd3" font-size="8" text-anchor="middle">Alkaline Tide</text>

        <!-- Parietal Cell (Center) -->
        <rect x="130" y="20" width="360" height="160" fill="#1e1b4b" stroke="#6366f1" stroke-width="2" rx="8"/>
        <text x="310" y="40" fill="#a5b4fc" font-size="11" font-weight="black" text-anchor="middle">Gastric Parietal Cell (Intracellular)</text>

        <!-- Carbonic Anhydrase reaction -->
        <text x="310" y="70" fill="#fde047" font-size="10" font-family="monospace" text-anchor="middle">
          CO₂ + H₂O ⟷ H₂CO₃ ⟷ H⁺ + HCO₃⁻ (CA II)
        </text>

        <!-- Basolateral AE2 antiporter -->
        <circle cx="130" cy="115" r="16" fill="#3b82f6"/>
        <text x="130" y="119" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">AE2</text>
        <line x1="160" y1="110" x2="90" y2="110" stroke="#38bdf8" stroke-width="2" marker-end="url(#arr)"/>
        <text x="120" y="98" fill="#38bdf8" font-size="8">HCO₃⁻ out</text>
        <line x1="90" y1="125" x2="160" y2="125" stroke="#cbd5e1" stroke-width="2"/>
        <text x="120" y="140" fill="#cbd5e1" font-size="8">Cl⁻ in</text>

        <!-- Apical H+/K+-ATPase (Right) -->
        <circle cx="490" cy="95" r="18" fill="#ef4444" stroke="#fca5a5" stroke-width="2"/>
        <text x="490" y="98" fill="#fff" font-size="7" font-weight="black" text-anchor="middle">H⁺/K⁺</text>
        <line x1="460" y1="90" x2="520" y2="90" stroke="#ef4444" stroke-width="3"/>
        <text x="495" y="78" fill="#fca5a5" font-size="9" font-weight="bold">H⁺ pumped out</text>
        <line x1="520" y1="105" x2="460" y2="105" stroke="#fbbf24" stroke-width="2"/>
        <text x="495" y="125" fill="#fbbf24" font-size="8">K⁺ in (recycled)</text>

        <!-- Gastric Lumen (Right) -->
        <rect x="530" y="25" width="90" height="150" fill="#450a0a" rx="6"/>
        <text x="575" y="95" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Gastric</text>
        <text x="575" y="110" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Lumen</text>
        <text x="575" y="130" fill="#fef08a" font-size="12" font-weight="black" text-anchor="middle">pH ≈ 1.0</text>
      </g>
    `;
  }

  function renderDuodenum() {
    svg.innerHTML = `
      <g transform="translate(40, 20)">
        <text x="280" y="15" fill="#38bdf8" font-size="13" font-weight="black" text-anchor="middle">Duodenal Zymogen Activation Cascade</text>
        
        <!-- Brush border enterokinase -->
        <rect x="30" y="50" width="140" height="40" fill="#047857" rx="6"/>
        <text x="100" y="68" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">Enteropeptidase</text>
        <text x="100" y="80" fill="#a7f3d0" font-size="7" text-anchor="middle">(Duodenal Brush Border)</text>

        <!-- Trypsinogen -> Trypsin -->
        <line x1="170" y1="70" x2="230" y2="70" stroke="#34d399" stroke-width="3"/>
        <rect x="230" y="50" width="130" height="40" fill="#2563eb" rx="6"/>
        <text x="295" y="68" fill="#fff" font-size="10" font-weight="black" text-anchor="middle">TRYPSIN</text>
        <text x="295" y="80" fill="#bfdbfe" font-size="7" text-anchor="middle">Master Protease Activator</text>

        <!-- Downstream cascades -->
        <path d="M 360 60 L 420 40 M 360 70 L 420 70 M 360 80 L 420 100" stroke="#60a5fa" stroke-width="2"/>
        <text x="430" y="44" fill="#cbd5e1" font-size="9">Chymotrypsinogen ➔ <strong>Chymotrypsin</strong></text>
        <text x="430" y="74" fill="#cbd5e1" font-size="9">Procarboxypeptidase ➔ <strong>Carboxypeptidase</strong></text>
        <text x="430" y="104" fill="#cbd5e1" font-size="9">Proelastase ➔ <strong>Elastase</strong></text>

        <!-- Secretin / CCK Box -->
        <rect x="30" y="120" width="500" height="45" fill="#1e1b4b" stroke="#4338ca" rx="6"/>
        <text x="280" y="137" fill="#fde047" font-size="9" font-weight="bold" text-anchor="middle">
          Endocrine Control: Secretin triggers pancreatic duct HCO₃⁻; CCK triggers acinar enzymes & gallbladder contraction
        </text>
        <text x="280" y="152" fill="#a5b4fc" font-size="8" text-anchor="middle">
          Neutralizes gastric chyme from pH 1.0 to pH 7.5, creating the optimal enzymatic milieu for pancreatic hydrolases
        </text>
      </g>
    `;
  }

  function renderIleum() {
    svg.innerHTML = `
      <g transform="translate(30, 20)">
        <text x="290" y="15" fill="#f59e0b" font-size="13" font-weight="black" text-anchor="middle">Lipid Digestion, Micelles & Chylomicron Packaging</text>

        <!-- Micelle -->
        <circle cx="80" cy="90" r="35" fill="#78350f" stroke="#d97706" stroke-width="2"/>
        <text x="80" y="85" fill="#fef08a" font-size="8" font-weight="bold" text-anchor="middle">Mixed Micelle</text>
        <text x="80" y="98" fill="#fed7aa" font-size="7" text-anchor="middle">Bile salts + 2-MAG + FFA</text>

        <path d="M 120 90 L 170 90" stroke="#f59e0b" stroke-width="3"/>

        <!-- Enterocyte -->
        <rect x="180" y="35" width="220" height="120" fill="#14532d" stroke="#22c55e" stroke-width="2" rx="6"/>
        <text x="290" y="55" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Enterocyte (Smooth ER Re-esterification)</text>
        <text x="290" y="75" fill="#fff" font-size="8" text-anchor="middle">FFA + 2-MAG ➔ Triglycerides</text>
        <text x="290" y="95" fill="#fff" font-size="8" text-anchor="middle">+ Apolipoprotein B-48 + Cholesterol</text>
        <text x="290" y="125" fill="#fde047" font-size="10" font-weight="black" text-anchor="middle">Chylomicron Assembly</text>

        <path d="M 405 95 L 455 95" stroke="#22c55e" stroke-width="3"/>

        <!-- Lacteal (Lymphatic capillary) -->
        <rect x="460" y="45" width="120" height="100" fill="#1e3a8a" rx="6"/>
        <text x="520" y="80" fill="#60a5fa" font-size="10" font-weight="black" text-anchor="middle">Lacteal</text>
        <text x="520" y="95" fill="#93c5fd" font-size="8" text-anchor="middle">(Central Lymphatic)</text>
        <text x="520" y="115" fill="#fde047" font-size="8" font-weight="bold" text-anchor="middle">Bypasses Liver!</text>
        <text x="520" y="128" fill="#e2e8f0" font-size="7" text-anchor="middle">Enters Thoracic Duct</text>
      </g>
    `;
  }

  renderParietal();

  container.querySelectorAll('.gi-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.gi-btn').forEach(b => {
        b.className = "gi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
      });
      e.target.className = "gi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white";
      const target = e.target.getAttribute('data-target');
      if (target === 'parietal') renderParietal();
      else if (target === 'duodenum') renderDuodenum();
      else renderIleum();
    });
  });
}

// =========================================================================
// MODULE 24 (animal-5-respiration): O2-Hb DISSOCIATION & BOHR EFFECT
// =========================================================================
export function createOxyHbDissociationModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-red-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 uppercase tracking-wider">
          Respiratory Phys: O₂-Hb Dissociation & Bohr Shift
        </span>
        <span class="text-xs font-mono font-bold text-rose-400" id="bohr-p50-val">P50 = 26.6 mmHg</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="bohr-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">pH: <span id="lbl-ph" class="text-white">7.40</span></label>
          <input type="range" id="slider-ph" min="7.0" max="7.8" step="0.05" value="7.40" class="w-full accent-rose-500 cursor-pointer"/>
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">Temp: <span id="lbl-temp" class="text-white">37°C</span></label>
          <input type="range" id="slider-temp" min="30" max="42" step="1" value="37" class="w-full accent-rose-500 cursor-pointer"/>
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">2,3-BPG: <span id="lbl-bpg" class="text-white">Normal</span></label>
          <input type="range" id="slider-bpg" min="0.5" max="2.0" step="0.1" value="1.0" class="w-full accent-rose-500 cursor-pointer"/>
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">Curve Shift:</label>
          <span id="lbl-shift-type" class="text-[11px] font-bold text-emerald-400 font-mono">Normal Baseline</span>
        </div>
      </div>
    </div>
  `;

  const svg = document.getElementById('bohr-svg');
  const sliderPh = document.getElementById('slider-ph');
  const sliderTemp = document.getElementById('slider-temp');
  const sliderBpg = document.getElementById('slider-bpg');
  const lblPh = document.getElementById('lbl-ph');
  const lblTemp = document.getElementById('lbl-temp');
  const lblBpg = document.getElementById('lbl-bpg');
  const p50Val = document.getElementById('bohr-p50-val');
  const shiftType = document.getElementById('lbl-shift-type');

  function updateCurve() {
    const ph = parseFloat(sliderPh.value);
    const temp = parseFloat(sliderTemp.value);
    const bpg = parseFloat(sliderBpg.value);

    lblPh.textContent = ph.toFixed(2);
    lblTemp.textContent = `${temp}°C`;
    lblBpg.textContent = bpg === 1.0 ? "Normal" : `${bpg.toFixed(1)}x`;

    // Calculate effective P50 based on Hill equation shift
    // Normal P50 = 26.6 mmHg at pH 7.4, 37°C, 1.0x BPG
    const deltaPh = 7.40 - ph; // positive if acidosis
    const deltaTemp = temp - 37.0; // positive if fever
    const deltaBpg = (bpg - 1.0) * 15;

    const calcP50 = 26.6 + (deltaPh * 30) + (deltaTemp * 1.2) + deltaBpg;
    const clampedP50 = Math.max(12, Math.min(55, calcP50));
    p50Val.textContent = `P50 = ${clampedP50.toFixed(1)} mmHg`;

    if (clampedP50 > 28) {
      shiftType.textContent = "Right Shift (Bohr effect: enhanced O2 unloading)";
      shiftType.className = "text-[11px] font-bold text-rose-400 font-mono";
    } else if (clampedP50 < 25) {
      shiftType.textContent = "Left Shift (Higher O2 affinity / HbF mimic)";
      shiftType.className = "text-[11px] font-bold text-cyan-400 font-mono";
    } else {
      shiftType.textContent = "Normal Arterial Baseline";
      shiftType.className = "text-[11px] font-bold text-emerald-400 font-mono";
    }

    // Generate Hill curve points: theta = PO2^n / (P50^n + PO2^n), with n = 2.8
    const n = 2.8;
    const originX = 60;
    const originY = 180;
    const width = 540;
    const height = 150;

    let pathD = `M ${originX} ${originY}`;
    for (let po2 = 0; po2 <= 100; po2 += 2) {
      const sat = Math.pow(po2, n) / (Math.pow(clampedP50, n) + Math.pow(po2, n));
      const px = originX + (po2 / 100) * width;
      const py = originY - sat * height;
      pathD += ` L ${px} ${py}`;
    }

    // Also draw normal reference curve in faded gray
    let refD = `M ${originX} ${originY}`;
    for (let po2 = 0; po2 <= 100; po2 += 2) {
      const sat = Math.pow(po2, n) / (Math.pow(26.6, n) + Math.pow(po2, n));
      const px = originX + (po2 / 100) * width;
      const py = originY - sat * height;
      refD += ` L ${px} ${py}`;
    }

    svg.innerHTML = `
      <!-- Axes -->
      <line x1="${originX}" y1="${originY}" x2="${originX + width}" y2="${originY}" stroke="#64748b" stroke-width="2"/>
      <line x1="${originX}" y1="${originY}" x2="${originX}" y2="${originY - height - 10}" stroke="#64748b" stroke-width="2"/>

      <!-- Labels -->
      <text x="${originX + width / 2}" y="${originY + 22}" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">PO₂ (mmHg)</text>
      <text x="20" y="${originY - height / 2}" fill="#94a3b8" font-size="10" font-weight="bold" transform="rotate(-90 20 ${originY - height / 2})" text-anchor="middle">% O₂ Saturation</text>

      <!-- Grid lines -->
      <line x1="${originX}" y1="${originY - height * 0.5}" x2="${originX + width}" y2="${originY - height * 0.5}" stroke="#334155" stroke-dasharray="3 3"/>
      <text x="${originX - 10}" y="${originY - height * 0.5 + 4}" fill="#64748b" font-size="8">50%</text>

      <line x1="${originX}" y1="${originY - height}" x2="${originX + width}" y2="${originY - height}" stroke="#334155" stroke-dasharray="3 3"/>
      <text x="${originX - 10}" y="${originY - height + 4}" fill="#64748b" font-size="8">100%</text>

      <!-- Normal baseline reference curve (dashed) -->
      <path d="${refD}" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>
      <text x="${originX + 220}" y="${originY - 80}" fill="#94a3b8" font-size="8">Baseline (P50=26.6)</text>

      <!-- Active Dynamic Hill Curve -->
      <path d="${pathD}" fill="none" stroke="${clampedP50 > 28 ? '#f43f5e' : (clampedP50 < 25 ? '#38bdf8' : '#10b981')}" stroke-width="4"/>

      <!-- P50 point marker -->
      <circle cx="${originX + (clampedP50 / 100) * width}" cy="${originY - height * 0.5}" r="5" fill="#fde047" stroke="#fff" stroke-width="1.5"/>
      <line x1="${originX + (clampedP50 / 100) * width}" y1="${originY}" x2="${originX + (clampedP50 / 100) * width}" y2="${originY - height * 0.5}" stroke="#fde047" stroke-dasharray="2 2"/>
      <text x="${originX + (clampedP50 / 100) * width}" y="${originY + 12}" fill="#fde047" font-size="8" font-weight="bold" text-anchor="middle">${clampedP50.toFixed(1)}</text>
    `;
  }

  updateCurve();
  sliderPh.addEventListener('input', updateCurve);
  sliderTemp.addEventListener('input', updateCurve);
  sliderBpg.addEventListener('input', updateCurve);
}

// =========================================================================
// MODULE 25 (animal-6-immunity): MHC CLASS I VS II PRESENTATION
// =========================================================================
export function createImmuneResponseModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-blue-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
          Immunology: MHC Class I vs. Class II Restriction
        </span>
        <div class="flex items-center gap-1.5" id="mhc-btns">
          <button id="mhc1-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white">MHC Class I (CD8+)</button>
          <button id="mhc2-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">MHC Class II (CD4+)</button>
        </div>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="mhc-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div id="mhc-desc" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        MHC Class I: Expressed on all nucleated cells. Endogenous antigens degraded by proteasome, imported into ER by TAP, presented on alpha-chain + beta-2-microglobulin to CD8+ Cytotoxic T Cells!
      </div>
    </div>
  `;

  const svg = document.getElementById('mhc-svg');
  const desc = document.getElementById('mhc-desc');

  function renderMHC1() {
    svg.innerHTML = `
      <g transform="translate(30, 20)">
        <text x="290" y="10" fill="#60a5fa" font-size="12" font-weight="black" text-anchor="middle">MHC Class I Pathway: Endogenous Antigen Presentation to CD8⁺ CTLs</text>

        <!-- Cytosolic Proteasome -->
        <rect x="20" y="40" width="80" height="40" rx="6" fill="#7c3aed"/>
        <text x="60" y="58" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">Proteasome</text>
        <text x="60" y="70" fill="#ddd6fe" font-size="7" text-anchor="middle">Viral/Tumor Antigen</text>

        <!-- TAP Transporter -->
        <path d="M 105 60 L 145 60" stroke="#a78bfa" stroke-width="2" marker-end="url(#arr)"/>
        <rect x="150" y="35" width="45" height="50" rx="4" fill="#3b82f6"/>
        <text x="172" y="62" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">TAP1/2</text>

        <!-- Endoplasmic Reticulum Lumen -->
        <rect x="200" y="25" width="160" height="70" fill="#1e1b4b" stroke="#4338ca" stroke-dasharray="4 2" rx="6"/>
        <text x="280" y="40" fill="#c7d2fe" font-size="8" font-weight="bold" text-anchor="middle">ER Lumen: Peptide Loading</text>
        <circle cx="280" cy="65" r="12" fill="#2563eb"/>
        <circle cx="295" cy="65" r="8" fill="#93c5fd"/>
        <text x="280" y="68" fill="#fff" font-size="6" text-anchor="middle">α+β₂m</text>

        <!-- Cell Surface MHC I Complex -->
        <line x1="365" y1="60" x2="415" y2="60" stroke="#60a5fa" stroke-width="2"/>
        <rect x="420" y="35" width="40" height="50" fill="#2563eb" rx="4"/>
        <rect x="445" y="45" width="25" height="40" fill="#93c5fd" rx="3"/>
        <rect x="425" y="30" width="30" height="8" fill="#f43f5e" rx="2"/>
        <text x="440" y="25" fill="#f43f5e" font-size="7" font-weight="bold">Peptide (8-10 aa)</text>

        <!-- CD8+ T Cell Receptor Interaction -->
        <rect x="480" y="20" width="120" height="80" fill="#047857" rx="6"/>
        <text x="540" y="45" fill="#fff" font-size="10" font-weight="black" text-anchor="middle">CD8⁺ CTL</text>
        <text x="540" y="60" fill="#86efac" font-size="8" text-anchor="middle">TCR + CD8 Co-receptor</text>
        <text x="540" y="80" fill="#fef08a" font-size="8" font-weight="bold" text-anchor="middle">Perforin / Granzyme B ➔ Apoptosis!</text>

        <text x="290" y="150" fill="#94a3b8" font-size="9" text-anchor="middle">
          Rule of 8: MHC I × CD8 = 8. Found on ALL nucleated mammalian cells (erythrocytes lack MHC I).
        </text>
      </g>
    `;
    desc.innerHTML = `<strong>MHC Class I:</strong> Presents endogenous peptides (8–10 aa) derived from cytosolic proteasomal cleavage to <strong>CD8+ Cytotoxic T Lymphocytes</strong>. Heterodimer composed of polymorphic heavy alpha chain and invariant beta-2-microglobulin. Kills virus-infected or transformed tumor cells via perforin/granzymes.`;
  }

  function renderMHC2() {
    svg.innerHTML = `
      <g transform="translate(30, 20)">
        <text x="290" y="10" fill="#34d399" font-size="13" font-weight="black" text-anchor="middle">MHC Class II Pathway: Exogenous Antigen Presentation to CD4⁺ T Helpers</text>

        <!-- Endocytosis vesicle -->
        <circle cx="60" cy="60" r="28" fill="#065f46" stroke="#34d399" stroke-width="2"/>
        <text x="60" y="58" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">Endolysosome</text>
        <text x="60" y="70" fill="#a7f3d0" font-size="7" text-anchor="middle">Cathepsins (Acidic)</text>

        <line x1="95" y1="60" x2="165" y2="60" stroke="#34d399" stroke-width="2"/>

        <!-- Invariant chain CLIP exchange by HLA-DM -->
        <rect x="175" y="35" width="160" height="55" fill="#1e1b4b" stroke="#10b981" rx="6"/>
        <text x="255" y="52" fill="#6ee7b7" font-size="8" font-weight="bold" text-anchor="middle">HLA-DM Catalyzed Exchange</text>
        <text x="255" y="68" fill="#cbd5e1" font-size="7" text-anchor="middle">CLIP removed ➔ Foreign peptide (13-25 aa) loaded</text>

        <!-- Cell Surface MHC II (α + β heterodimer) -->
        <line x1="340" y1="60" x2="400" y2="60" stroke="#34d399" stroke-width="2"/>
        <rect x="405" y="35" width="30" height="50" fill="#059669" rx="3"/>
        <rect x="425" y="35" width="30" height="50" fill="#10b981" rx="3"/>
        <rect x="410" y="28" width="40" height="8" fill="#f43f5e" rx="2"/>

        <!-- CD4+ T Helper Cell Interaction -->
        <rect x="480" y="20" width="120" height="80" fill="#1d4ed8" rx="6"/>
        <text x="540" y="45" fill="#fff" font-size="10" font-weight="black" text-anchor="middle">CD4⁺ T Helper</text>
        <text x="540" y="60" fill="#93c5fd" font-size="8" text-anchor="middle">TCR + CD4 Co-receptor</text>
        <text x="540" y="80" fill="#fde047" font-size="8" font-weight="bold" text-anchor="middle">Secretes IL-2, IFN-γ / IL-4</text>

        <text x="290" y="150" fill="#94a3b8" font-size="9" text-anchor="middle">
          Rule of 8: MHC II × CD4 = 8. Restricted strictly to Professional APCs: Dendritic cells, Macrophages, B cells.
        </text>
      </g>
    `;
    desc.innerHTML = `<strong>MHC Class II:</strong> Presents exogenous endocytosed antigens (13–25 aa) to <strong>CD4+ T Helper cells</strong>. Synthesized with invariant chain (CD74) which is cleaved to CLIP; HLA-DM exchanges CLIP for antigen. Restricted strictly to professional APCs (Dendritic cells, Macrophages, B cells).`;
  }

  renderMHC1();

  document.getElementById('mhc1-btn').addEventListener('click', () => {
    document.getElementById('mhc1-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white";
    document.getElementById('mhc2-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderMHC1();
  });

  document.getElementById('mhc2-btn').addEventListener('click', () => {
    document.getElementById('mhc2-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white";
    document.getElementById('mhc1-btn').className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderMHC2();
  });
}

// =========================================================================
// MODULE 26 (animal-7-reproduction-development): SPEMANN ORGANIZER & HOX
// =========================================================================
export function createEmbryologyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-amber-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Development: Spemann Organizer & BMP Antagonism
        </span>
        <span class="text-xs font-mono font-bold text-amber-400">Neural Induction Paradigm</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="emb-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        <strong>The Spemann-Mangold Organizer (Dorsal Blastopore Lip):</strong> Default fate of ectoderm is neural! Ventral ectoderm secretes BMP4 to become epidermis. The dorsal organizer secretes Chordin, Noggin, and Follistatin to physically antagonize BMP4, inducing the neural plate (CNS).
      </div>
    </div>
  `;

  const svg = document.getElementById('emb-svg');

  svg.innerHTML = `
    <g transform="translate(40, 20)">
      <!-- Amphibian Gastrula Cross-Section (Left) -->
      <circle cx="120" cy="85" r="70" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
      
      <!-- Animal Cap Ectoderm (Top) -->
      <path d="M 50 85 A 70 70 0 0 1 190 85" fill="#3b82f6" opacity="0.6"/>
      <text x="120" y="55" fill="#93c5fd" font-size="8" font-weight="bold" text-anchor="middle">Ectoderm (Default: Neural)</text>

      <!-- Blastocoel cavity -->
      <circle cx="105" cy="75" r="24" fill="#020617"/>
      <text x="105" y="78" fill="#475569" font-size="7" text-anchor="middle">Blastocoel</text>

      <!-- Dorsal Blastopore Lip (The Organizer) -->
      <path d="M 185 85 Q 170 100 160 115" stroke="#f43f5e" stroke-width="6" fill="none"/>
      <circle cx="185" cy="85" r="7" fill="#f43f5e"/>
      <text x="210" y="90" fill="#f43f5e" font-size="8" font-weight="black">Dorsal Lip (Organizer)</text>

      <!-- Signal Arrows -->
      <line x1="260" y1="85" x2="310" y2="85" stroke="#fbbf24" stroke-width="3"/>

      <!-- Molecular Signaling Network (Right) -->
      <rect x="320" y="25" width="280" height="135" fill="#1e1b4b" stroke="#6366f1" rx="8"/>
      <text x="460" y="45" fill="#fde047" font-size="11" font-weight="black" text-anchor="middle">Molecular Circuitry of Neural Induction</text>
      
      <!-- BMP4 Ventralizing gradient -->
      <rect x="335" y="60" width="115" height="30" fill="#b91c1c" rx="4"/>
      <text x="392" y="78" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">BMP4 (Epidermal Fate)</text>

      <!-- Antagonists from organizer -->
      <rect x="475" y="60" width="115" height="30" fill="#15803d" rx="4"/>
      <text x="532" y="74" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">Chordin + Noggin</text>
      <text x="532" y="85" fill="#86efac" font-size="7" text-anchor="middle">(BMP Antagonists)</text>

      <!-- Inhibition symbol -->
      <line x1="475" y1="75" x2="455" y2="75" stroke="#ef4444" stroke-width="3"/>
      <circle cx="453" cy="75" r="3" fill="#ef4444"/>

      <!-- Result: Neural Ectoderm -->
      <rect x="365" y="105" width="190" height="40" fill="#1e3a8a" stroke="#3b82f6" rx="4"/>
      <text x="460" y="122" fill="#93c5fd" font-size="9" font-weight="bold" text-anchor="middle">BMP Blocked ➔ Neural Tube (CNS)</text>
      <text x="460" y="136" fill="#cbd5e1" font-size="8" text-anchor="middle">Brain + Spinal Cord specification</text>
    </g>
  `;
}

// =========================================================================
// MODULE 27 (animal-8-endocrine): HYPOTHALAMIC-PITUITARY AXIS & RAAS
// =========================================================================
export function createEndocrineAxisModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-indigo-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
          Endocrinology: HPA / Thyroid Negative Feedback
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="endo-feedback-txt">Long-Loop Feedback Active</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="endo-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex items-center justify-between pt-1 text-xs">
        <div class="flex items-center gap-2">
          <label class="text-[11px] text-slate-300 font-bold">Peripheral Hormone Level:</label>
          <input type="range" id="endo-hormone-slider" min="10" max="100" value="50" class="w-36 accent-indigo-500 cursor-pointer"/>
        </div>
        <span class="font-mono text-emerald-400 text-xs" id="endo-status-msg">Homeostasis: Balanced</span>
      </div>
    </div>
  `;

  const svg = document.getElementById('endo-svg');
  const slider = document.getElementById('endo-hormone-slider');
  const feedbackTxt = document.getElementById('endo-feedback-txt');
  const statusMsg = document.getElementById('endo-status-msg');

  function render(val) {
    const isSuppressed = val > 75;
    const isDeficient = val < 30;

    feedbackTxt.textContent = isSuppressed ? "CRH/ACTH Shut Down by High Cortisol" : (isDeficient ? "Disinhibited: High CRH & ACTH" : "Homeostatic Balance");
    statusMsg.textContent = isSuppressed ? "Cushingoid / Suppressed" : (isDeficient ? "Addisonian / Stimulated" : "Homeostasis: Balanced");
    statusMsg.className = isSuppressed ? "font-mono text-rose-400 text-xs" : (isDeficient ? "font-mono text-cyan-400 text-xs" : "font-mono text-emerald-400 text-xs");

    svg.innerHTML = `
      <!-- Hypothalamus (Top) -->
      <g transform="translate(225, 15)">
        <rect x="0" y="0" width="200" height="38" rx="8" fill="#4338ca"/>
        <text x="100" y="16" fill="#ffffff" font-size="10" font-weight="black" text-anchor="middle">HYPOTHALAMUS</text>
        <text x="100" y="30" fill="#c7d2fe" font-size="8" text-anchor="middle">
          Releases CRH / TRH (Level: ${isSuppressed ? "Low" : (isDeficient ? "Very High" : "Normal")})
        </text>
      </g>

      <!-- Portal Vessel Arrow -->
      <line x1="325" y1="53" x2="325" y2="75" stroke="#ef4444" stroke-width="${isSuppressed ? 1 : (isDeficient ? 4 : 2.5)}"/>
      <polygon points="325,78 320,70 330,70" fill="#ef4444"/>

      <!-- Anterior Pituitary (Middle) -->
      <g transform="translate(225, 80)">
        <rect x="0" y="0" width="200" height="38" rx="8" fill="#1e40af"/>
        <text x="100" y="16" fill="#ffffff" font-size="10" font-weight="black" text-anchor="middle">ANTERIOR PITUITARY</text>
        <text x="100" y="30" fill="#bfdbfe" font-size="8" text-anchor="middle">
          Secretes ACTH / TSH (Level: ${isSuppressed ? "Low" : (isDeficient ? "Very High" : "Normal")})
        </text>
      </g>

      <!-- Systemic Blood Arrow -->
      <line x1="325" y1="118" x2="325" y2="140" stroke="#3b82f6" stroke-width="${isSuppressed ? 1 : (isDeficient ? 4 : 2.5)}"/>
      <polygon points="325,143 320,135 330,135" fill="#3b82f6"/>

      <!-- Peripheral Target Gland (Bottom: Adrenal Cortex / Thyroid) -->
      <g transform="translate(200, 145)">
        <rect x="0" y="0" width="250" height="42" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
        <text x="125" y="18" fill="#ffffff" font-size="10" font-weight="black" text-anchor="middle">TARGET GLAND (Adrenal / Thyroid)</text>
        <text x="125" y="33" fill="#86efac" font-size="8" text-anchor="middle">
          Circulating Cortisol / T3-T4: ${val}% (Set by slider)
        </text>
      </g>

      <!-- Long-Loop Negative Feedback Arrow (Left side curved back up) -->
      <path d="M 200 165 C 100 165, 100 35, 220 35" fill="none" stroke="${isSuppressed ? '#f43f5e' : '#64748b'}" stroke-width="${isSuppressed ? 4 : 2}" stroke-dasharray="4 3"/>
      <polygon points="225,35 215,30 215,40" fill="${isSuppressed ? '#f43f5e' : '#64748b'}"/>
      <text x="90" y="105" fill="${isSuppressed ? '#f43f5e' : '#94a3b8'}" font-size="8" font-weight="bold" transform="rotate(-90 90 105)" text-anchor="middle">
        Long-Loop Negative Feedback (Inhibits CRH & ACTH)
      </text>
    `;
  }

  render(50);
  slider.addEventListener('input', (e) => {
    render(parseInt(e.target.value));
  });
}

// =========================================================================
// MODULE 28 (genetics-3-mendelian-extensions): EPISTASIS PUNNETT MATRIX
// =========================================================================
export function createEpistasisModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-amber-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          Genetics: Epistasis & Modified Dihybrid Ratios
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="epi-ratio-txt">Recessive Epistasis: 9:3:4</span>
      </div>

      <div class="flex flex-wrap items-center gap-1.5" id="epi-btns">
        <button class="epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-amber-600 text-white" data-mode="recessive">Recessive (9:3:4)</button>
        <button class="epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700" data-mode="dominant">Dominant (12:3:1)</button>
        <button class="epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700" data-mode="complementary">Duplicate Recessive (9:7)</button>
        <button class="epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700" data-mode="duplicate">Duplicate Dominant (15:1)</button>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="epi-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div id="epi-desc" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
        Labrador Retriever Coat Color: The recessive homozygous allele ee at the pigment deposition locus masks alleles at the B locus. B_E_ = Black (9), bbE_ = Brown/Chocolate (3), __ee = Yellow (4)!
      </div>
    </div>
  `;

  const svg = document.getElementById('epi-svg');
  const desc = document.getElementById('epi-desc');
  const ratioTxt = document.getElementById('epi-ratio-txt');

  function renderGrid(mode) {
    let title = "";
    let explanation = "";
    let colorMap = {}; // Maps 'AB', 'Ab', 'aB', 'ab' to fill colors

    if (mode === 'recessive') {
      title = "Recessive Epistasis (9:3:4) - Labrador Coat Color";
      ratioTxt.textContent = "Ratio: 9 : 3 : 4";
      explanation = "Recessive homozygote (ee) prevents pigment deposition regardless of B locus: 9 Black (B_E_), 3 Chocolate (bbE_), 4 Yellow (__ee).";
      colorMap = {
        'AB': '#1e293b', // Black (slate)
        'Ab': '#eab308', // Yellow (ee)
        'aB': '#78350f', // Brown/Chocolate (bbE_)
        'ab': '#eab308'  // Yellow (bbee)
      };
    } else if (mode === 'dominant') {
      title = "Dominant Epistasis (12:3:1) - Summer Squash Fruit Color";
      ratioTxt.textContent = "Ratio: 12 : 3 : 1";
      explanation = "Dominant allele W_ suppresses pigment formation: 12 White (W_Y_ + W_yy), 3 Yellow (wwY_), 1 Green (wwyy).";
      colorMap = {
        'AB': '#f8fafc', // White
        'Ab': '#f8fafc', // White
        'aB': '#eab308', // Yellow
        'ab': '#16a34a'  // Green
      };
    } else if (mode === 'complementary') {
      title = "Duplicate Recessive / Complementary (9:7) - Sweet Pea Flower Color";
      ratioTxt.textContent = "Ratio: 9 : 7";
      explanation = "Recessive allele at EITHER locus (cc or pp) blocks anthocyanin synthesis: 9 Purple (C_P_), 7 White (C_pp, ccP_, ccpp).";
      colorMap = {
        'AB': '#9333ea', // Purple
        'Ab': '#f8fafc', // White
        'aB': '#f8fafc', // White
        'ab': '#f8fafc'  // White
      };
    } else {
      title = "Duplicate Dominant Epistasis (15:1) - Shepherd's Purse Seed Capsule";
      ratioTxt.textContent = "Ratio: 15 : 1";
      explanation = "Dominant allele at EITHER locus (A_ or B_) produces triangular capsule: 15 Triangular (A_B_, A_bb, aaB_), 1 Ovoid (aabb).";
      colorMap = {
        'AB': '#10b981', // Triangular (Green)
        'Ab': '#10b981', // Triangular
        'aB': '#10b981', // Triangular
        'ab': '#ef4444'  // Ovoid (Red)
      };
    }

    desc.innerHTML = `<strong>${title}:</strong> ${explanation}`;

    // 4x4 grid representation
    // Rows: AB, Ab, aB, ab; Cols: AB, Ab, aB, ab
    const gametes = ['AB', 'Ab', 'aB', 'ab'];
    let cellsSvg = "";
    const size = 32;
    const startX = 230;
    const startY = 55;

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        // Classify genotype
        const hasA = (r === 0 || r === 1 || c === 0 || c === 1);
        const hasB = (r === 0 || r === 2 || c === 0 || c === 2);
        let key = "";
        if (hasA && hasB) key = "AB";
        else if (hasA && !hasB) key = "Ab";
        else if (!hasA && hasB) key = "aB";
        else key = "ab";

        const fill = colorMap[key];
        const x = startX + c * (size + 4);
        const y = startY + r * (size + 4);

        cellsSvg += `
          <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="4" fill="${fill}" stroke="#475569" stroke-width="1"/>
        `;
      }
    }

    svg.innerHTML = `
      <text x="325" y="24" fill="#fde047" font-size="12" font-weight="black" text-anchor="middle">${title}</text>
      
      <!-- Gamete Labels Header -->
      <text x="246" y="45" fill="#94a3b8" font-size="9" font-family="monospace">AB</text>
      <text x="282" y="45" fill="#94a3b8" font-size="9" font-family="monospace">Ab</text>
      <text x="318" y="45" fill="#94a3b8" font-size="9" font-family="monospace">aB</text>
      <text x="354" y="45" fill="#94a3b8" font-size="9" font-family="monospace">ab</text>

      <!-- Gamete Labels Left -->
      <text x="210" y="76" fill="#94a3b8" font-size="9" font-family="monospace">AB</text>
      <text x="210" y="112" fill="#94a3b8" font-size="9" font-family="monospace">Ab</text>
      <text x="210" y="148" fill="#94a3b8" font-size="9" font-family="monospace">aB</text>
      <text x="210" y="184" fill="#94a3b8" font-size="9" font-family="monospace">ab</text>

      ${cellsSvg}

      <!-- Legend on right -->
      <g transform="translate(420, 60)">
        <text x="0" y="15" fill="#cbd5e1" font-size="10" font-weight="bold">F2 Phenotypic Classes:</text>
        <circle cx="10" cy="35" r="7" fill="${colorMap['AB']}"/>
        <text x="25" y="38" fill="#e2e8f0" font-size="9">Class 1 (A_B_): 9/16</text>

        <circle cx="10" cy="55" r="7" fill="${colorMap['Ab']}"/>
        <text x="25" y="58" fill="#e2e8f0" font-size="9">Class 2 (A_bb): 3/16</text>

        <circle cx="10" cy="75" r="7" fill="${colorMap['aB']}"/>
        <text x="25" y="78" fill="#e2e8f0" font-size="9">Class 3 (aaB_): 3/16</text>

        <circle cx="10" cy="95" r="7" fill="${colorMap['ab']}"/>
        <text x="25" y="98" fill="#e2e8f0" font-size="9">Class 4 (aabb): 1/16</text>
      </g>
    `;
  }

  renderGrid('recessive');

  container.querySelectorAll('.epi-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.epi-btn').forEach(b => {
        b.className = "epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
      });
      e.target.className = "epi-btn px-2 py-0.5 rounded text-[11px] font-bold bg-amber-600 text-white";
      renderGrid(e.target.getAttribute('data-mode'));
    });
  });
}

// =========================================================================
// MODULE 29 (genetics-4-gene-regulation): LAC OPERON 4-STATE LOGIC
// =========================================================================
export function createGeneRegulationModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-cyan-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Gene Regulation: The lac Operon 4-State Logic Matrix
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="lac-state-txt">State: Off</span>
      </div>

      <div class="flex items-center justify-between gap-4 pt-1 text-xs">
        <div class="flex items-center gap-2">
          <label class="font-bold text-slate-300 text-[11px]">Glucose:</label>
          <button id="lac-glu-btn" class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">High Glucose</button>
        </div>
        <div class="flex items-center gap-2">
          <label class="font-bold text-slate-300 text-[11px]">Lactose:</label>
          <button id="lac-lac-btn" class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-[11px] border border-slate-700">Absent</button>
        </div>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="lac-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div id="lac-desc" class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono">
        Low Glucose + Presence of Lactose triggers high cAMP-CAP binding AND relieves LacI repression, driving MAXIMUM transcription!
      </div>
    </div>
  `;

  const svg = document.getElementById('lac-svg');
  const gluBtn = document.getElementById('lac-glu-btn');
  const lacBtn = document.getElementById('lac-lac-btn');
  const stateTxt = document.getElementById('lac-state-txt');
  const desc = document.getElementById('lac-desc');

  let highGlucose = true;
  let lactosePresent = false;

  function renderOperon() {
    gluBtn.textContent = highGlucose ? "High Glucose (cAMP Low)" : "Low Glucose (cAMP High)";
    gluBtn.className = highGlucose ? "px-2.5 py-1 rounded bg-amber-600/80 text-white font-bold text-[11px]" : "px-2.5 py-1 rounded bg-indigo-600 text-white font-bold text-[11px]";

    lacBtn.textContent = lactosePresent ? "Lactose Present (Allolactose)" : "Lactose Absent";
    lacBtn.className = lactosePresent ? "px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[11px]" : "px-2.5 py-1 rounded bg-rose-600/80 text-white font-bold text-[11px]";

    const capBound = !highGlucose; // low glucose means high cAMP -> CAP binds
    const repressorBound = !lactosePresent; // lactose absent means LacI binds operator

    let rate = "NONE (0%)";
    let color = "#ef4444";
    if (repressorBound) {
      rate = "REPRESSED (0%) - Repressor blocks Pol";
      color = "#ef4444";
      desc.textContent = "LacI repressor homotetramer is bound tightly to operator (lacO), sterically preventing RNA Polymerase clearance. Transcription is completely blocked!";
    } else if (!capBound && !repressorBound) {
      rate = "BASAL / LOW (5%) - No CAP Activator";
      color = "#f59e0b";
      desc.textContent = "Lactose is present (repressor off), but high glucose keeps cAMP low. Without the cAMP-CAP positive activator, RNA Polymerase binds with low affinity (basal leak).";
    } else {
      rate = "MAXIMUM (100%) - DIVERGENT ACTIVATION!";
      color = "#10b981";
      desc.textContent = "PERFECT INDUCTION: Low glucose produces high cAMP, which binds CAP. cAMP-CAP bends DNA, recruiting RNA Polymerase, while allolactose dissociates the repressor!";
    }

    stateTxt.textContent = rate;
    stateTxt.style.color = color;

    svg.innerHTML = `
      <!-- DNA Strand -->
      <rect x="50" y="90" width="550" height="30" fill="#1e293b" rx="4"/>
      
      <!-- CAP site -->
      <rect x="100" y="90" width="80" height="30" fill="#334155" stroke="#64748b"/>
      <text x="140" y="108" fill="#cbd5e1" font-size="9" font-weight="bold" text-anchor="middle">CAP Site</text>

      <!-- Promoter (lacP) -->
      <rect x="180" y="90" width="90" height="30" fill="#475569" stroke="#94a3b8"/>
      <text x="225" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">lacP Promoter</text>

      <!-- Operator (lacO) -->
      <rect x="270" y="90" width="70" height="30" fill="#64748b" stroke="#cbd5e1"/>
      <text x="305" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">lacO (Operator)</text>

      <!-- Structural Genes (lacZ, lacY, lacA) -->
      <rect x="340" y="90" width="100" height="30" fill="#047857"/>
      <text x="390" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">lacZ (β-Gal)</text>
      
      <rect x="440" y="90" width="70" height="30" fill="#065f46"/>
      <text x="475" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">lacY</text>

      <rect x="510" y="90" width="70" height="30" fill="#064e3b"/>
      <text x="545" y="108" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">lacA</text>

      <!-- CAP Protein -->
      ${capBound ? `
        <circle cx="140" cy="65" r="18" fill="#2563eb" stroke="#60a5fa" stroke-width="2"/>
        <text x="140" y="69" fill="#fff" font-size="8" font-weight="black" text-anchor="middle">cAMP-CAP</text>
        <text x="140" y="38" fill="#60a5fa" font-size="8" font-weight="bold" text-anchor="middle">Bound (Activates)</text>
      ` : `
        <circle cx="140" cy="35" r="15" fill="#1e3a8a" opacity="0.4"/>
        <text x="140" y="38" fill="#94a3b8" font-size="7" text-anchor="middle">CAP (Inactive)</text>
      `}

      <!-- RNA Polymerase -->
      ${!repressorBound ? `
        <ellipse cx="225" cy="60" rx="26" ry="18" fill="#10b981" opacity="0.85"/>
        <text x="225" y="64" fill="#fff" font-size="8" font-weight="black" text-anchor="middle">RNA Pol</text>
      ` : `
        <ellipse cx="205" cy="60" rx="20" ry="14" fill="#64748b" opacity="0.4"/>
        <text x="205" y="63" fill="#cbd5e1" font-size="7" text-anchor="middle">Blocked</text>
      `}

      <!-- LacI Repressor -->
      ${repressorBound ? `
        <rect x="290" y="55" width="30" height="32" rx="4" fill="#ef4444" stroke="#fca5a5" stroke-width="2"/>
        <text x="305" y="74" fill="#fff" font-size="8" font-weight="black" text-anchor="middle">LacI</text>
        <text x="305" y="45" fill="#fca5a5" font-size="8" font-weight="bold" text-anchor="middle">Bound</text>
      ` : `
        <!-- Repressor inactivated by allolactose -->
        <rect x="290" y="25" width="30" height="24" rx="4" fill="#991b1b" opacity="0.5"/>
        <circle cx="290" cy="37" r="5" fill="#fbbf24"/>
        <text x="335" y="38" fill="#fbbf24" font-size="7">Allolactose bound</text>
      `}

      <!-- Transcription Output Wave -->
      <g transform="translate(100, 160)">
        <text x="0" y="10" fill="#cbd5e1" font-size="10" font-weight="bold">Transcription Rate:</text>
        <rect x="130" y="0" width="350" height="16" fill="#1e293b" rx="4"/>
        <rect x="130" y="0" width="${capBound && !repressorBound ? 350 : (!capBound && !repressorBound ? 35 : 0)}" height="16" fill="${color}" rx="4"/>
        <text x="310" y="12" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">${rate}</text>
      </g>
    `;
  }

  renderOperon();

  gluBtn.addEventListener('click', () => {
    highGlucose = !highGlucose;
    renderOperon();
  });
  lacBtn.addEventListener('click', () => {
    lactosePresent = !lactosePresent;
    renderOperon();
  });
}

// =========================================================================
// MODULE 30 (eco-2-ecosystems): TROPHIC PYRAMID & 10% LINDEMAN LAW
// =========================================================================
export function createEcosystemEnergyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-teal-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
          Ecosystem: Lindeman's 10% Trophic Transfer Law
        </span>
        <span class="text-xs font-mono font-bold text-teal-400" id="eco-joules-label">Solar Input: 1,000,000 J</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="trophic-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex items-center justify-between pt-1 text-xs">
        <div class="flex items-center gap-2">
          <label class="text-[11px] text-slate-300 font-bold">Transfer Efficiency:</label>
          <button id="eff-10-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-600 text-white">10% Standard</button>
          <button id="eff-inverted-btn" class="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700">Pelagic Inverted Biomass</button>
        </div>
        <span class="font-mono text-emerald-400 text-xs" id="trophic-apex-txt">Apex Predator: 10 J</span>
      </div>
    </div>
  `;

  const svg = document.getElementById('trophic-svg');
  const btn10 = document.getElementById('eff-10-btn');
  const btnInv = document.getElementById('eff-inverted-btn');
  const apexTxt = document.getElementById('trophic-apex-txt');

  function renderStandard() {
    apexTxt.textContent = "Apex Predator: 10 J (99.9% lost as heat)";
    svg.innerHTML = `
      <g transform="translate(150, 10)">
        <!-- Apex Predators -->
        <polygon points="175,20 120,55 230,55" fill="#ef4444" stroke="#fca5a5"/>
        <text x="175" y="45" fill="#fff" font-size="9" font-weight="black" text-anchor="middle">Apex: 10 J (0.1%)</text>

        <!-- Secondary Consumers -->
        <polygon points="120,55 80,95 270,95 230,55" fill="#f59e0b" stroke="#fde68a"/>
        <text x="175" y="80" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Secondary Consumers: 100 J (1%)</text>

        <!-- Primary Consumers (Herbivores) -->
        <polygon points="80,95 40,140 310,140 270,95" fill="#3b82f6" stroke="#93c5fd"/>
        <text x="175" y="122" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Primary Consumers: 1,000 J (10%)</text>

        <!-- Primary Producers -->
        <polygon points="40,140 0,185 350,185 310,140" fill="#10b981" stroke="#6ee7b7"/>
        <text x="175" y="167" fill="#fff" font-size="11" font-weight="black" text-anchor="middle">Primary Producers (NPP): 10,000 J (1% of solar)</text>
      </g>

      <!-- Heat Dissipation Arrows (Right) -->
      <g transform="translate(520, 30)">
        <text x="0" y="20" fill="#f87171" font-size="10" font-weight="bold">90% Dissipated as Heat</text>
        <text x="0" y="35" fill="#cbd5e1" font-size="8">(2nd Law of Thermodynamics)</text>
        <path d="M 0 50 Q 30 70 10 90 Q -10 110 20 130" stroke="#f87171" stroke-width="3" fill="none" stroke-dasharray="4 2"/>
        <text x="0" y="150" fill="#fde047" font-size="8" font-mono>E_T = E_C × E_A × E_P</text>
      </g>
    `;
  }

  function renderInverted() {
    apexTxt.textContent = "Zooplankton Biomass > Phytoplankton Biomass!";
    svg.innerHTML = `
      <g transform="translate(150, 15)">
        <text x="175" y="10" fill="#38bdf8" font-size="12" font-weight="black" text-anchor="middle">Open Ocean: Inverted Biomass Pyramid</text>

        <!-- Zooplankton (Larger standing crop biomass) -->
        <rect x="30" y="35" width="290" height="55" rx="6" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
        <text x="175" y="60" fill="#ffffff" font-size="11" font-weight="black" text-anchor="middle">Zooplankton Herbivores (21 g/m²)</text>
        <text x="175" y="75" fill="#bfdbfe" font-size="8" text-anchor="middle">Longer lifespan, slower metabolic turnover</text>

        <!-- Phytoplankton (Smaller standing crop biomass) -->
        <rect x="95" y="105" width="160" height="45" rx="6" fill="#10b981" stroke="#34d399" stroke-width="2"/>
        <text x="175" y="127" fill="#ffffff" font-size="10" font-weight="black" text-anchor="middle">Phytoplankton (4 g/m²)</text>
        <text x="175" y="140" fill="#a7f3d0" font-size="7" text-anchor="middle">Astronomical turnover rate (P/B ratio)</text>

        <text x="175" y="175" fill="#fde047" font-size="9" text-anchor="middle">
          High reproductive velocity sustains an inverted standing pyramid without violating thermodynamics!
        </text>
      </g>
    `;
  }

  renderStandard();

  btn10.addEventListener('click', () => {
    btn10.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-teal-600 text-white";
    btnInv.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderStandard();
  });

  btnInv.addEventListener('click', () => {
    btnInv.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-teal-600 text-white";
    btn10.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
    renderInverted();
  });
}

// =========================================================================
// MODULE 31 (eco-3-predation-biodiversity): LOTKA-VOLTERRA PREDATOR-PREY
// =========================================================================
export function createPredatorPreyModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-cyan-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
          Ecology: Lotka-Volterra Predator-Prey Cycle (π/2 Lag)
        </span>
        <span class="text-xs font-mono font-bold text-amber-400">dN/dt = rN - aNP</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="pred-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="flex items-center justify-between pt-1 text-xs">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Prey (Hare)</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-500"></span> Predator (Lynx)</span>
        </div>
        <span class="text-slate-400 text-[11px]">Predator peaks 1/4 cycle (90°) behind prey</span>
      </div>
    </div>
  `;

  const svg = document.getElementById('pred-svg');

  // Generate coupled oscillations: prey sin(t), pred sin(t - pi/2)
  const originX = 60;
  const originY = 170;
  const width = 530;
  const height = 130;

  let preyPath = `M ${originX} ${originY - 60}`;
  let predPath = `M ${originX} ${originY - 30}`;

  for (let x = 0; x <= width; x += 4) {
    const t = (x / width) * 4 * Math.PI;
    // Prey oscillates around 65 with amplitude 45
    const preyY = originY - (65 + 45 * Math.sin(t));
    // Predator oscillates with phase lag of pi/2 (quarter cycle)
    const predY = originY - (60 + 40 * Math.sin(t - Math.PI / 2));
    preyPath += ` L ${originX + x} ${preyY}`;
    predPath += ` L ${originX + x} ${predY}`;
  }

  svg.innerHTML = `
    <!-- Axes -->
    <line x1="${originX}" y1="${originY}" x2="${originX + width}" y2="${originY}" stroke="#64748b" stroke-width="2"/>
    <line x1="${originX}" y1="${originY}" x2="${originX}" y2="${originY - height - 10}" stroke="#64748b" stroke-width="2"/>
    <text x="${originX + width / 2}" y="${originY + 20}" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">Time (Years)</text>
    <text x="20" y="${originY - height / 2}" fill="#94a3b8" font-size="10" font-weight="bold" transform="rotate(-90 20 ${originY - height / 2})" text-anchor="middle">Population Density</text>

    <!-- Prey Wave (Green) -->
    <path d="${preyPath}" fill="none" stroke="#10b981" stroke-width="3"/>
    <!-- Predator Wave (Red) -->
    <path d="${predPath}" fill="none" stroke="#ef4444" stroke-width="3"/>

    <!-- Peak callouts -->
    <circle cx="126" cy="60" r="5" fill="#10b981"/>
    <text x="126" y="48" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle">Prey Peak</text>

    <circle cx="192" cy="70" r="5" fill="#ef4444"/>
    <text x="192" y="58" fill="#ef4444" font-size="8" font-weight="bold" text-anchor="middle">Lynx Peak (+π/2)</text>

    <!-- Arrow indicating lag -->
    <line x1="126" y1="48" x2="185" y2="56" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>

    <text x="325" y="200" fill="#fde047" font-size="9" text-anchor="middle" font-family="monospace">
      Hudson's Bay Fur-Trapping Data: 10-Year Coupled Cycles of Snowshoe Hare and Canada Lynx
    </text>
  `;
}

// =========================================================================
// MODULE 32 (ethology-2-classical-behavior): HONEYBEE WAGGLE DANCE DECODER
// =========================================================================
export function createEthologyBehaviorModel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 rounded-2xl bg-slate-900/90 border border-fuchsia-900/50 space-y-3 shadow-xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase tracking-wider">
          Ethology: Karl von Frisch Waggle Dance Decoder
        </span>
        <span class="text-xs font-mono font-bold text-amber-400" id="waggle-code-txt">Angle: 45° Right | Dist: 1500m</span>
      </div>

      <div class="relative h-[210px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2">
        <svg id="waggle-svg" viewBox="0 0 650 210" class="w-full h-full select-none"></svg>
      </div>

      <div class="grid grid-cols-2 gap-4 pt-1 text-xs">
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">Sun Angle: <span id="lbl-angle" class="text-white">45° Right</span></label>
          <input type="range" id="slider-waggle-angle" min="-90" max="90" value="45" class="w-full accent-fuchsia-500 cursor-pointer"/>
        </div>
        <div>
          <label class="block text-[10px] text-slate-400 font-bold">Food Distance: <span id="lbl-dist" class="text-white">1500 meters</span></label>
          <input type="range" id="slider-waggle-dist" min="200" max="3000" step="100" value="1500" class="w-full accent-fuchsia-500 cursor-pointer"/>
        </div>
      </div>
    </div>
  `;

  const svg = document.getElementById('waggle-svg');
  const sliderAngle = document.getElementById('slider-waggle-angle');
  const sliderDist = document.getElementById('slider-waggle-dist');
  const lblAngle = document.getElementById('lbl-angle');
  const lblDist = document.getElementById('lbl-dist');
  const codeTxt = document.getElementById('waggle-code-txt');

  function renderDance() {
    const angle = parseInt(sliderAngle.value);
    const dist = parseInt(sliderDist.value);
    const duration = (dist / 1000).toFixed(1);

    lblAngle.textContent = angle >= 0 ? `${angle}° Right of Sun` : `${Math.abs(angle)}° Left of Sun`;
    lblDist.textContent = `${dist} meters (${duration}s waggle run)`;
    codeTxt.textContent = `Azimuth: ${angle}° | Distance: ${dist}m (${duration}s)`;

    svg.innerHTML = `
      <!-- Comb Vertical Reference (Gravity Up = Sun Direction) -->
      <g transform="translate(180, 105)">
        <!-- Vertical Up Arrow (Sun) -->
        <line x1="0" y1="80" x2="0" y2="-80" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 4"/>
        <polygon points="0,-85 -5,-75 5,-75" fill="#fbbf24"/>
        <text x="0" y="-90" fill="#fbbf24" font-size="9" font-weight="black" text-anchor="middle">☀ Direction of Sun (Vertical Gravity Up)</text>

        <!-- Figure-Eight Dance Loop -->
        <!-- Semicircle return left -->
        <path d="M 0 40 A 35 35 0 0 1 0 -40" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>
        <!-- Semicircle return right -->
        <path d="M 0 -40 A 35 35 0 0 1 0 40" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="3 3"/>

        <!-- Rotated Waggle Run Line -->
        <g transform="rotate(${angle})">
          <line x1="0" y1="45" x2="0" y2="-45" stroke="#ec4899" stroke-width="6"/>
          <!-- Waggle zig-zag oscillation -->
          <path d="M -6 30 L 6 20 L -6 10 L 6 0 L -6 -10 L 6 -20 L 0 -35" fill="none" stroke="#fde047" stroke-width="2"/>
          <polygon points="0,-48 -6,-38 6,-38" fill="#ec4899"/>

          <!-- Bee Body Icon -->
          <circle cx="0" cy="0" r="10" fill="#eab308" stroke="#000" stroke-width="2"/>
          <line x1="-8" y1="-3" x2="8" y2="-3" stroke="#000" stroke-width="2"/>
          <line x1="-8" y1="3" x2="8" y2="3" stroke="#000" stroke-width="2"/>
        </g>
      </g>

      <!-- Interpretation Panel (Right) -->
      <g transform="translate(400, 30)">
        <rect x="0" y="0" width="220" height="150" fill="#1e1b4b" stroke="#a21caf" rx="8"/>
        <text x="110" y="22" fill="#f5d0fe" font-size="11" font-weight="black" text-anchor="middle">Recruited Bee Navigation</text>
        
        <text x="15" y="50" fill="#e2e8f0" font-size="9">1. Angle to Sun: <strong>${Math.abs(angle)}° ${angle >= 0 ? 'Right' : 'Left'}</strong></text>
        <text x="15" y="70" fill="#e2e8f0" font-size="9">2. Distance: <strong>${dist} m</strong></text>
        <text x="15" y="90" fill="#fde047" font-size="9">3. Waggle Run Duration: <strong>${duration} seconds</strong></text>
        
        <line x1="15" y1="105" x2="205" y2="105" stroke="#475569"/>
        <text x="110" y="125" fill="#a7f3d0" font-size="8" text-anchor="middle">
          1 second of waggle run ≈ 1000 meters
        </text>
        <text x="110" y="138" fill="#a7f3d0" font-size="8" text-anchor="middle">
          Bees compensate for solar movement (15°/hr)!
        </text>
      </g>
    `;
  }

  renderDance();
  sliderAngle.addEventListener('input', renderDance);
  sliderDist.addEventListener('input', renderDance);
}
