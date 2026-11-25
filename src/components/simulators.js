// BioApex: Interactive Olympiad Simulators & Biophysics Engines

export function renderLineweaverBurkSimulator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 class="text-lg font-bold text-indigo-300 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
            Enzyme Kinetics & Lineweaver-Burk Diagnostic Engine
          </h3>
          <p class="text-xs text-slate-400">Evaluate catalytic parameters ($V_{\\max}, K_m$) and test inhibition topologies in real time</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">IBO Biophysics Tool</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Controls Column -->
        <div class="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Maximal Velocity ($V_{\\max}$): <span id="vmax-val" class="text-indigo-400 font-mono">100</span> μM/s</label>
            <input type="range" id="vmax-slider" min="20" max="200" value="100" class="w-full accent-indigo-500 cursor-pointer">
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Michaelis Constant ($K_m$): <span id="km-val" class="text-indigo-400 font-mono">25</span> μM</label>
            <input type="range" id="km-slider" min="5" max="100" value="25" class="w-full accent-indigo-500 cursor-pointer">
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-300 block mb-1">Inhibition Mode</label>
            <select id="inhibition-type" class="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 focus:ring-2 focus:ring-indigo-500">
              <option value="none">None (Uninhibited Baseline)</option>
              <option value="competitive">Competitive (Binds Free Enzyme E)</option>
              <option value="uncompetitive">Uncompetitive (Binds ES Complex Only)</option>
              <option value="noncompetitive">Pure Non-Competitive (Binds E and ES with equal affinity)</option>
              <option value="mixed">Mixed Inhibition (KI &ne; KI')</option>
            </select>
          </div>

          <div id="inhibitor-controls" class="space-y-3 pt-2 border-t border-slate-800/80">
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Inhibitor Concentration $[I]$: <span id="inhibitor-val" class="text-rose-400 font-mono">50</span> μM</label>
              <input type="range" id="inhibitor-slider" min="0" max="150" value="50" class="w-full accent-rose-500 cursor-pointer">
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-300 block mb-1">Inhibitor Constant $K_I$: <span id="ki-val" class="text-rose-400 font-mono">25</span> μM</label>
              <input type="range" id="ki-slider" min="5" max="100" value="25" class="w-full accent-rose-500 cursor-pointer">
            </div>
          </div>

          <!-- Kinetic Output Stats -->
          <div class="bg-indigo-950/40 border border-indigo-900/60 rounded-xl p-3 text-xs space-y-1.5 font-mono">
            <div class="flex justify-between text-slate-300">
              <span>Apparent $V_{\\max}'$:</span>
              <span id="stat-vmax" class="text-indigo-300 font-bold">100.0 μM/s</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>Apparent $K_m'$:</span>
              <span id="stat-km" class="text-indigo-300 font-bold">25.0 μM</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>Slope ($K_m'/V_{\\max}'$):</span>
              <span id="stat-slope" class="text-amber-300 font-bold">0.250</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>LB X-intercept ($-1/K_m'$):</span>
              <span id="stat-xint" class="text-emerald-300 font-bold">-0.040</span>
            </div>
            <div class="flex justify-between text-slate-300">
              <span>LB Y-intercept ($1/V_{\\max}'$):</span>
              <span id="stat-yint" class="text-emerald-300 font-bold">0.010</span>
            </div>
          </div>
        </div>

        <!-- Canvas Charts Column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-slate-300">Double Reciprocal Plot: $1/v_0$ vs $1/[S]$ (Lineweaver-Burk)</span>
              <div class="flex items-center gap-4 text-[11px]">
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-indigo-500"></span> Uninhibited</span>
                <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-rose-500"></span> + Inhibitor</span>
              </div>
            </div>
            <canvas id="lb-canvas" width="600" height="260" class="w-full h-[230px] rounded-lg bg-slate-900 border border-slate-800"></canvas>
          </div>

          <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-bold text-slate-300">Direct Saturation Curve: $v_0$ vs $[S]$ (Michaelis-Menten)</span>
              <span class="text-[11px] text-slate-400">Hyperbolic saturation approach to $V_{\\max}$</span>
            </div>
            <canvas id="mm-canvas" width="600" height="180" class="w-full h-[150px] rounded-lg bg-slate-900 border border-slate-800"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;

  // Simulator Logic
  const vmaxSlider = document.getElementById("vmax-slider");
  const kmSlider = document.getElementById("km-slider");
  const inhType = document.getElementById("inhibition-type");
  const inhSlider = document.getElementById("inhibitor-slider");
  const kiSlider = document.getElementById("ki-slider");

  const vmaxVal = document.getElementById("vmax-val");
  const kmVal = document.getElementById("km-val");
  const inhVal = document.getElementById("inhibitor-val");
  const kiVal = document.getElementById("ki-val");

  const statVmax = document.getElementById("stat-vmax");
  const statKm = document.getElementById("stat-km");
  const statSlope = document.getElementById("stat-slope");
  const statXint = document.getElementById("stat-xint");
  const statYint = document.getElementById("stat-yint");

  const lbCanvas = document.getElementById("lb-canvas");
  const mmCanvas = document.getElementById("mm-canvas");

  function update() {
    const Vmax = parseFloat(vmaxSlider.value);
    const Km = parseFloat(kmSlider.value);
    const mode = inhType.value;
    const I = parseFloat(inhSlider.value);
    const Ki = parseFloat(kiSlider.value);

    vmaxVal.textContent = Vmax.toFixed(0);
    kmVal.textContent = Km.toFixed(0);
    inhVal.textContent = I.toFixed(0);
    kiVal.textContent = Ki.toFixed(0);

    let VmaxApp = Vmax;
    let KmApp = Km;

    const alpha = 1 + I / Ki;
    const alphaPrime = 1 + I / (Ki * 2); // for mixed

    if (mode === "competitive") {
      KmApp = Km * alpha;
      VmaxApp = Vmax;
    } else if (mode === "uncompetitive") {
      VmaxApp = Vmax / alpha;
      KmApp = Km / alpha;
    } else if (mode === "noncompetitive") {
      VmaxApp = Vmax / alpha;
      KmApp = Km;
    } else if (mode === "mixed") {
      VmaxApp = Vmax / alphaPrime;
      KmApp = Km * (alpha / alphaPrime);
    }

    const slopeApp = KmApp / VmaxApp;
    const xIntApp = -1 / KmApp;
    const yIntApp = 1 / VmaxApp;

    statVmax.textContent = `${VmaxApp.toFixed(1)} μM/s`;
    statKm.textContent = `${KmApp.toFixed(1)} μM`;
    statSlope.textContent = slopeApp.toFixed(4);
    statXint.textContent = xIntApp.toFixed(4);
    statYint.textContent = yIntApp.toFixed(4);

    drawLineweaverBurk(lbCanvas, Vmax, Km, VmaxApp, KmApp, mode !== "none");
    drawMichaelisMenten(mmCanvas, Vmax, Km, VmaxApp, KmApp, mode !== "none");
  }

  function drawLineweaverBurk(canvas, Vmax, Km, VmaxApp, KmApp, hasInh) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Axes setup
    const originX = W * 0.35;
    const originY = H * 0.85;

    // Grid lines
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x, H - 20); ctx.stroke();
    }
    for (let y = 20; y < H - 20; y += 30) {
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    // Y-axis (1/v)
    ctx.beginPath(); ctx.moveTo(originX, 15); ctx.lineTo(originX, H - 15); ctx.stroke();
    // X-axis (1/[S])
    ctx.beginPath(); ctx.moveTo(20, originY); ctx.lineTo(W - 20, originY); ctx.stroke();

    // Axis Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText("1/[S] (μM⁻¹)", W - 85, originY - 8);
    ctx.fillText("1/v₀ (μM⁻¹·s)", originX + 8, 25);
    ctx.fillText("0", originX - 12, originY + 14);

    // Scale mapping
    const xScale = 1800; // pixels per (1/[S]) unit
    const yScale = 2500; // pixels per (1/v) unit

    // Baseline Line (Indigo)
    drawLine(ctx, Km, Vmax, "#6366f1", originX, originY, xScale, yScale);

    // Inhibitor Line (Rose)
    if (hasInh) {
      drawLine(ctx, KmApp, VmaxApp, "#f43f5e", originX, originY, xScale, yScale);
    }
  }

  function drawLine(ctx, Km, Vmax, color, ox, oy, sx, sy) {
    const slope = Km / Vmax;
    const yInt = 1 / Vmax;
    const xInt = -1 / Km;

    const x1 = xInt - 0.015;
    const x2 = 0.12;

    const px1 = ox + x1 * sx;
    const py1 = oy - (slope * x1 + yInt) * sy;
    const px2 = ox + x2 * sx;
    const py2 = oy - (slope * x2 + yInt) * sy;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.stroke();

    // Plot intercept points
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ox + xInt * sx, oy, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ox, oy - yInt * sy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMichaelisMenten(canvas, Vmax, Km, VmaxApp, KmApp, hasInh) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const ox = 45;
    const oy = H - 25;

    // Axes
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, 10); ctx.lineTo(ox, oy); ctx.lineTo(W - 20, oy); ctx.stroke();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px Inter, sans-serif";
    ctx.fillText("[S] (μM)", W - 60, oy - 6);
    ctx.fillText("v₀ (μM/s)", ox + 6, 20);

    const maxS = 150;
    const sx = (W - ox - 30) / maxS;
    const sy = (oy - 20) / 200;

    // Baseline Curve
    drawMMCurve(ctx, Vmax, Km, "#6366f1", ox, oy, sx, sy, maxS);

    if (hasInh) {
      drawMMCurve(ctx, VmaxApp, KmApp, "#f43f5e", ox, oy, sx, sy, maxS);
    }
  }

  function drawMMCurve(ctx, Vm, Km, color, ox, oy, sx, sy, maxS) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let s = 0; s <= maxS; s += 2) {
      const v = (Vm * s) / (Km + s);
      const px = ox + s * sx;
      const py = oy - v * sy;
      if (s === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Event Listeners
  [vmaxSlider, kmSlider, inhType, inhSlider, kiSlider].forEach(el => {
    el.addEventListener("input", update);
  });

  update();
}

export function renderGhkActionPotentialSimulator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 class="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            Goldman-Hodgkin-Katz (GHK) & Action Potential Simulator
          </h3>
          <p class="text-xs text-slate-400">Calculate membrane equilibrium voltages and trigger Hodgkin-Huxley dynamic action potentials</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/30">Neurobiophysics Engine</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sliders -->
        <div class="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div class="text-xs font-bold text-slate-200 border-b border-slate-800 pb-1">Ion Concentrations (mM) & Relative Permeabilities</div>
          
          <div>
            <div class="flex justify-between text-xs text-slate-300 mb-1">
              <span>$K^+$ Permeability ($P_K$):</span>
              <span id="pk-val" class="text-emerald-400 font-mono">1.00</span>
            </div>
            <input type="range" id="pk-slider" min="0.1" max="2.0" step="0.05" value="1.0" class="w-full accent-emerald-500 cursor-pointer">
          </div>

          <div>
            <div class="flex justify-between text-xs text-slate-300 mb-1">
              <span>$Na^+$ Permeability ($P_{Na}$):</span>
              <span id="pna-val" class="text-amber-400 font-mono">0.04</span>
            </div>
            <input type="range" id="pna-slider" min="0.01" max="1.5" step="0.01" value="0.04" class="w-full accent-amber-500 cursor-pointer">
          </div>

          <div>
            <div class="flex justify-between text-xs text-slate-300 mb-1">
              <span>$Cl^-$ Permeability ($P_{Cl}$):</span>
              <span id="pcl-val" class="text-cyan-400 font-mono">0.45</span>
            </div>
            <input type="range" id="pcl-slider" min="0.05" max="1.0" step="0.05" value="0.45" class="w-full accent-cyan-500 cursor-pointer">
          </div>

          <div class="pt-2 border-t border-slate-800">
            <label class="text-xs font-semibold text-slate-300 block mb-1">Extracellular $K^+$ $[K^+]_o$: <span id="ko-val" class="text-emerald-400 font-mono">4.5</span> mM</label>
            <input type="range" id="ko-slider" min="1.0" max="20.0" step="0.5" value="4.5" class="w-full accent-emerald-500 cursor-pointer">
            <span class="text-[10px] text-slate-400">Simulate hyperkalemia effect on resting potential</span>
          </div>

          <button id="trigger-ap-btn" class="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <span>⚡ Fire Action Potential Stimulus</span>
          </button>
        </div>

        <!-- Displays & Waveform -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Ion Nernst Cards -->
          <div class="grid grid-cols-4 gap-2 text-center text-xs">
            <div class="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-2.5">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">E(K+)</span>
              <span id="ek-val" class="text-sm font-bold text-emerald-400 font-mono">-92.4 mV</span>
            </div>
            <div class="bg-amber-950/40 border border-amber-800/40 rounded-xl p-2.5">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">E(Na+)</span>
              <span id="ena-val" class="text-sm font-bold text-amber-400 font-mono">+61.2 mV</span>
            </div>
            <div class="bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-2.5">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">E(Cl-)</span>
              <span id="ecl-val" class="text-sm font-bold text-cyan-400 font-mono">-64.1 mV</span>
            </div>
            <div class="bg-purple-950/40 border border-purple-800/40 rounded-xl p-2.5">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">GHK Vm</span>
              <span id="vm-val" class="text-sm font-bold text-purple-300 font-mono">-70.5 mV</span>
            </div>
          </div>

          <!-- AP Canvas -->
          <div class="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div class="flex justify-between items-center mb-1 text-xs">
              <span class="font-bold text-slate-300">Membrane Potential Waveform $V_m(t)$ vs Time</span>
              <span id="ap-state-badge" class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Resting State</span>
            </div>
            <canvas id="ap-canvas" width="600" height="260" class="w-full h-[240px] rounded-lg bg-slate-900 border border-slate-800"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;

  const pkSlider = document.getElementById("pk-slider");
  const pnaSlider = document.getElementById("pna-slider");
  const pclSlider = document.getElementById("pcl-slider");
  const koSlider = document.getElementById("ko-slider");

  const pkVal = document.getElementById("pk-val");
  const pnaVal = document.getElementById("pna-val");
  const pclVal = document.getElementById("pcl-val");
  const koVal = document.getElementById("ko-val");

  const ekVal = document.getElementById("ek-val");
  const enaVal = document.getElementById("ena-val");
  const eclVal = document.getElementById("ecl-val");
  const vmVal = document.getElementById("vm-val");

  const apCanvas = document.getElementById("ap-canvas");
  const triggerBtn = document.getElementById("trigger-ap-btn");
  const stateBadge = document.getElementById("ap-state-badge");

  let isAnimating = false;
  let animFrame = 0;

  function calculateGHK() {
    const pK = parseFloat(pkSlider.value);
    const pNa = parseFloat(pnaSlider.value);
    const pCl = parseFloat(pclSlider.value);
    const Ko = parseFloat(koSlider.value);

    pkVal.textContent = pK.toFixed(2);
    pnaVal.textContent = pNa.toFixed(2);
    pclVal.textContent = pCl.toFixed(2);
    koVal.textContent = Ko.toFixed(1);

    // Intracellular & Extracellular standards (mM at 37 C)
    const Ki = 140.0;
    const Nao = 145.0;
    const Nai = 15.0;
    const Clo = 110.0;
    const Cli = 10.0;

    const RT_F = 61.5; // at 37°C in mV

    const EK = RT_F * Math.log10(Ko / Ki);
    const ENa = RT_F * Math.log10(Nao / Nai);
    const ECl = -RT_F * Math.log10(Clo / Cli);

    // GHK: Notice Cli is in numerator and Clo is in denominator!
    const numerator = (pK * Ko) + (pNa * Nao) + (pCl * Cli);
    const denominator = (pK * Ki) + (pNa * Nai) + (pCl * Clo);
    const Vm = RT_F * Math.log10(numerator / denominator);

    ekVal.textContent = `${EK.toFixed(1)} mV`;
    enaVal.textContent = `${ENa.toFixed(1)} mV`;
    eclVal.textContent = `${ECl.toFixed(1)} mV`;
    vmVal.textContent = `${Vm.toFixed(1)} mV`;

    return { Vm, EK, ENa, ECl };
  }

  function drawStaticWaveform() {
    const { Vm, EK, ENa } = calculateGHK();
    const ctx = apCanvas.getContext("2d");
    const W = apCanvas.width;
    const H = apCanvas.height;
    ctx.clearRect(0, 0, W, H);

    // Axes & grid
    drawGrid(ctx, W, H, Vm, EK, ENa);

    // Steady resting voltage line
    const yRest = mapVoltToY(Vm, H);
    ctx.strokeStyle = "#a855f7";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(40, yRest);
    ctx.lineTo(W - 20, yRest);
    ctx.stroke();
  }

  function drawGrid(ctx, W, H, Vm, EK, ENa) {
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let v = -100; v <= 60; v += 20) {
      const y = mapVoltToY(v, H);
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 20, y); ctx.stroke();
      ctx.fillStyle = "#64748b";
      ctx.font = "10px Inter, sans-serif";
      ctx.fillText(`${v} mV`, 5, y + 3);
    }

    // Threshold line (-55 mV)
    const yThresh = mapVoltToY(-55, H);
    ctx.strokeStyle = "#eab308";
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(40, yThresh); ctx.lineTo(W - 20, yThresh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#eab308";
    ctx.fillText("Threshold (-55 mV)", W - 120, yThresh - 5);
  }

  function mapVoltToY(v, H) {
    // Map -100 mV to H-30, and +60 mV to 30
    const minV = -100;
    const maxV = 60;
    return H - 30 - ((v - minV) / (maxV - minV)) * (H - 60);
  }

  function animateActionPotential() {
    if (isAnimating) return;
    isAnimating = true;
    animFrame = 0;
    const { Vm, ENa, EK } = calculateGHK();

    const totalSteps = 160;
    const wave = [];

    for (let i = 0; i < totalSteps; i++) {
      let v = Vm;
      if (i < 20) {
        v = Vm; // baseline
      } else if (i < 30) {
        // depolarizing stimulus
        const progress = (i - 20) / 10;
        v = Vm + progress * (-55 - Vm);
      } else if (i < 55) {
        // rapid Na+ upstroke to near ENa (+40 mV)
        const progress = (i - 30) / 25;
        v = -55 + Math.sin((progress * Math.PI) / 2) * (Math.min(ENa - 15, 45) - -55);
      } else if (i < 85) {
        // repolarization (K+ efflux)
        const progress = (i - 55) / 30;
        v = 45 - progress * (45 - (EK + 3));
      } else if (i < 120) {
        // hyperpolarizing after-potential (undershoot)
        const progress = (i - 85) / 35;
        v = (EK + 3) + progress * (Vm - (EK + 3));
      } else {
        v = Vm;
      }
      wave.push(v);
    }

    function step() {
      const ctx = apCanvas.getContext("2d");
      const W = apCanvas.width;
      const H = apCanvas.height;
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, W, H, Vm, EK, ENa);

      const dx = (W - 70) / totalSteps;

      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i <= animFrame; i++) {
        const x = 45 + i * dx;
        const y = mapVoltToY(wave[i], H);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // State label update
      if (animFrame < 20) stateBadge.textContent = "Resting State (P_K dominates)";
      else if (animFrame < 30) stateBadge.textContent = "Subthreshold Depolarization";
      else if (animFrame < 55) stateBadge.textContent = "Voltage-Gated Na+ Activation (m-gates open)";
      else if (animFrame < 85) stateBadge.textContent = "Na+ Inactivation (h-gates shut) & Kv Opening (n-gates)";
      else if (animFrame < 120) stateBadge.textContent = "Delayed Rectifier Undershoot (Relative Refractory)";
      else stateBadge.textContent = "Restored Resting Potential";

      animFrame++;
      if (animFrame < totalSteps) {
        requestAnimationFrame(step);
      } else {
        isAnimating = false;
      }
    }

    step();
  }

  [pkSlider, pnaSlider, pclSlider, koSlider].forEach(el => {
    el.addEventListener("input", drawStaticWaveform);
  });

  triggerBtn.addEventListener("click", animateActionPotential);

  drawStaticWaveform();
}

export function renderThreePointCrossMapper(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 class="text-lg font-bold text-amber-400 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
            Three-Point Testcross & Linkage Map Solver
          </h3>
          <p class="text-xs text-slate-400">Algorithmic chromosome order, map distance in centiMorgans, and genetic interference ($I = 1 - COC$)</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30">Pierce Genetics Engine</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Input Table -->
        <div class="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div class="text-xs font-bold text-slate-300">Enter Progeny Counts from Trihybrid Testcross ($AaBbCc \\times aabbcc$):</div>
          
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label class="text-[11px] text-slate-400 block">$+ \\; + \\; +$ (NCO 1)</label>
              <input type="number" id="cnt-nco1" value="780" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$a \\; b \\; c$ (NCO 2)</label>
              <input type="number" id="cnt-nco2" value="765" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$a \\; + \\; +$ (SCO 1A)</label>
              <input type="number" id="cnt-sco1a" value="145" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$+ \\; b \\; c$ (SCO 1B)</label>
              <input type="number" id="cnt-sco1b" value="155" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$+ \\; + \\; c$ (SCO 2A)</label>
              <input type="number" id="cnt-sco2a" value="72" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$a \\; b \\; +$ (SCO 2B)</label>
              <input type="number" id="cnt-sco2b" value="78" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$+ \\; b \\; +$ (DCO 1)</label>
              <input type="number" id="cnt-dco1" value="2" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
            <div>
              <label class="text-[11px] text-slate-400 block">$a \\; + \\; c$ (DCO 2)</label>
              <input type="number" id="cnt-dco2" value="3" class="w-full bg-slate-900 border border-slate-700 text-slate-200 p-1.5 rounded font-mono">
            </div>
          </div>

          <button id="calc-linkage-btn" class="w-full mt-2 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition">
            Compute Chromosome Map & Interference
          </button>
        </div>

        <!-- Output Cards -->
        <div class="lg:col-span-2 space-y-4">
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-amber-950/40 border border-amber-800/40 rounded-xl p-3 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Deduced Gene Order</span>
              <span id="res-gene-order" class="text-base font-bold text-amber-300 font-mono">a - b - c</span>
            </div>
            <div class="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-3 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Total Map Length</span>
              <span id="res-map-length" class="text-base font-bold text-indigo-300 font-mono">22.8 cM</span>
            </div>
            <div class="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-3 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Interference (I)</span>
              <span id="res-interference" class="text-base font-bold text-emerald-300 font-mono">0.78</span>
            </div>
          </div>

          <!-- Chromosome Map Visual -->
          <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div class="text-xs font-bold text-slate-300">Genetic Chromosome Map Representation</div>
            
            <div class="relative py-6 px-4 bg-slate-900 rounded-lg border border-slate-800">
              <div class="h-3 bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 rounded-full w-full relative">
                <!-- Marker 1 -->
                <div class="absolute left-[5%] -top-3 flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-900"></span>
                  <span id="marker-1-name" class="text-xs font-bold text-amber-300 mt-1">Gene A</span>
                  <span class="text-[10px] text-slate-400 font-mono">0.0 cM</span>
                </div>
                <!-- Marker 2 (Middle) -->
                <div class="absolute left-[55%] -top-3 flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-indigo-400 border-2 border-slate-900"></span>
                  <span id="marker-2-name" class="text-xs font-bold text-indigo-300 mt-1">Gene B</span>
                  <span id="marker-2-dist" class="text-[10px] text-slate-400 font-mono">15.2 cM</span>
                </div>
                <!-- Marker 3 -->
                <div class="absolute left-[95%] -top-3 flex flex-col items-center">
                  <span class="w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                  <span id="marker-3-name" class="text-xs font-bold text-emerald-300 mt-1">Gene C</span>
                  <span id="marker-3-dist" class="text-[10px] text-slate-400 font-mono">22.8 cM</span>
                </div>
              </div>
            </div>

            <!-- Detailed Steps -->
            <div id="linkage-breakdown" class="text-xs text-slate-300 space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
              <div>Total Progeny ($N$): 2000</div>
              <div>Region 1 Distance: 15.25 cM</div>
              <div>Region 2 Distance: 7.75 cM</div>
              <div>Expected DCOs: (0.1525)(0.0775)(2000) = 23.64</div>
              <div>Observed DCOs: 5</div>
              <div>Coefficient of Coincidence (COC): 5 / 23.64 = 0.211</div>
              <div>Interference ($I = 1 - COC$): 1 - 0.211 = 0.789 (Strong positive interference)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById("calc-linkage-btn");
  btn.addEventListener("click", () => {
    const nco1 = parseFloat(document.getElementById("cnt-nco1").value) || 0;
    const nco2 = parseFloat(document.getElementById("cnt-nco2").value) || 0;
    const sco1a = parseFloat(document.getElementById("cnt-sco1a").value) || 0;
    const sco1b = parseFloat(document.getElementById("cnt-sco1b").value) || 0;
    const sco2a = parseFloat(document.getElementById("cnt-sco2a").value) || 0;
    const sco2b = parseFloat(document.getElementById("cnt-sco2b").value) || 0;
    const dco1 = parseFloat(document.getElementById("cnt-dco1").value) || 0;
    const dco2 = parseFloat(document.getElementById("cnt-dco2").value) || 0;

    const N = nco1 + nco2 + sco1a + sco1b + sco2a + sco2b + dco1 + dco2;
    const dcoTotal = dco1 + dco2;
    const sco1Total = sco1a + sco1b;
    const sco2Total = sco2a + sco2b;

    const dist1 = ((sco1Total + dcoTotal) / N) * 100;
    const dist2 = ((sco2Total + dcoTotal) / N) * 100;
    const totalDist = dist1 + dist2;

    const expectedDCO = ((dist1 / 100) * (dist2 / 100)) * N;
    const coc = expectedDCO > 0 ? (dcoTotal / expectedDCO) : 0;
    const interference = 1 - coc;

    document.getElementById("res-map-length").textContent = `${totalDist.toFixed(1)} cM`;
    document.getElementById("res-interference").textContent = interference.toFixed(2);
    document.getElementById("marker-2-dist").textContent = `${dist1.toFixed(1)} cM`;
    document.getElementById("marker-3-dist").textContent = `${totalDist.toFixed(1)} cM`;

    document.getElementById("linkage-breakdown").innerHTML = `
      <div>Total Progeny ($N$): ${N}</div>
      <div>Region 1 Distance: ${dist1.toFixed(2)} cM</div>
      <div>Region 2 Distance: ${dist2.toFixed(2)} cM</div>
      <div>Expected DCOs: (${(dist1/100).toFixed(4)}) &times; (${(dist2/100).toFixed(4)}) &times; ${N} = ${expectedDCO.toFixed(2)}</div>
      <div>Observed DCOs: ${dcoTotal}</div>
      <div>Coefficient of Coincidence ($COC$): ${coc.toFixed(3)}</div>
      <div>Interference ($I = 1 - COC$): ${interference.toFixed(3)}</div>
    `;
  });
}

export function renderWiggersDiagramExplorer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 class="text-lg font-bold text-rose-400 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            Wiggers Diagram & Left Ventricular PV-Loop Explorer
          </h3>
          <p class="text-xs text-slate-400">Step through the 7 phases of the cardiac cycle with synchronized pressures, ECG, and valve events</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/30">Vander's Hemodynamics</span>
      </div>

      <!-- Phase Selector Tabs -->
      <div class="flex overflow-x-auto gap-2 pb-3 mb-4 border-b border-slate-800 text-xs">
        <button data-phase="1" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-rose-600 text-white whitespace-nowrap">1. Atrial Systole</button>
        <button data-phase="2" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">2. Isovolumetric Contraction</button>
        <button data-phase="3" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">3. Rapid Ejection</button>
        <button data-phase="4" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">4. Reduced Ejection</button>
        <button data-phase="5" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">5. Isovolumetric Relaxation</button>
        <button data-phase="6" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">6. Rapid Filling</button>
        <button data-phase="7" class="phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">7. Diastasis</button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Interactive Phase Detail -->
        <div id="phase-detail-card" class="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div class="flex items-center justify-between">
            <span id="phase-title" class="font-bold text-rose-400 text-sm">Phase 1: Atrial Systole</span>
            <span id="phase-ecg" class="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">P Wave / PR Interval</span>
          </div>

          <div class="space-y-2 text-slate-300">
            <p id="phase-desc">Atrial depolarization triggers atrial myocardium contraction. Generates the atrial 'a' wave and tops off ventricular filling (adds final ~10-20% of EDV, 'atrial kick').</p>
            
            <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px]">
              <div class="flex justify-between"><span>Mitral Valve:</span> <span id="valv-mv" class="text-emerald-400">OPEN</span></div>
              <div class="flex justify-between"><span>Aortic Valve:</span> <span id="valv-av" class="text-rose-400">CLOSED</span></div>
              <div class="flex justify-between"><span>LV Pressure:</span> <span id="val-lvp" class="text-indigo-400">8 mmHg</span></div>
              <div class="flex justify-between"><span>LV Volume:</span> <span id="val-lvv" class="text-cyan-400">120 mL (EDV)</span></div>
              <div class="flex justify-between"><span>Acoustic Sound:</span> <span id="val-sound" class="text-amber-400">S4 (if atrial gallop)</span></div>
            </div>
          </div>
        </div>

        <!-- Wiggers Synchronized Canvas -->
        <div class="lg:col-span-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div class="flex justify-between items-center mb-1 text-xs">
            <span class="font-bold text-slate-300">Synchronized Hemodynamic Curves</span>
            <div class="flex items-center gap-3 text-[11px]">
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-indigo-500"></span> LV Press</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-rose-500"></span> Aortic Press</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-cyan-400"></span> LV Vol</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-amber-400"></span> ECG</span>
            </div>
          </div>
          <canvas id="wiggers-canvas" width="600" height="280" class="w-full h-[260px] rounded-lg bg-slate-900 border border-slate-800"></canvas>
        </div>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll(".phase-tab");
  let currentPhase = 1;

  const phaseData = {
    1: {
      title: "Phase 1: Atrial Systole",
      ecg: "P Wave / PR Interval",
      desc: "Atria contract; 'a' wave in atrial pressure. Ventricles reach End-Diastolic Volume (EDV ≈ 120 mL). Atrial kick is critical in stiff non-compliant hearts.",
      mv: "OPEN", av: "CLOSED", lvp: "8-10 mmHg", lvv: "120 mL (EDV)", sound: "S4 (if non-compliant ventricle)",
      cursorX: 0.08
    },
    2: {
      title: "Phase 2: Isovolumetric Contraction",
      ecg: "QRS Complex",
      desc: "Ventricular depolarization. LVP exceeds LAP → Mitral valve snaps closed (S1 heart sound). Both valves closed; tension rises at constant volume (EDV). Produces 'c' wave in LAP.",
      mv: "CLOSED (S1)", av: "CLOSED", lvp: "10 → 80 mmHg", lvv: "Constant at 120 mL", sound: "S1 (Mitral/Tricuspid closure)",
      cursorX: 0.22
    },
    3: {
      title: "Phase 3: Rapid Ejection",
      ecg: "ST Segment",
      desc: "LVP exceeds Aortic pressure (~80 mmHg) → Aortic valve opens. Ventricle contracts forcefully; rapid volume drop as blood enters aorta. Peak pressure reached (~120 mmHg).",
      mv: "CLOSED", av: "OPEN", lvp: "80 → 120 mmHg", lvv: "120 → 70 mL", sound: "None (physiological)",
      cursorX: 0.38
    },
    4: {
      title: "Phase 4: Reduced Ejection",
      ecg: "T Wave Peak",
      desc: "Ventricular repolarization begins. Ventricular ejection rate decelerates; pressures in LV and aorta begin downward trajectory.",
      mv: "CLOSED", av: "OPEN", lvp: "120 → 100 mmHg", lvv: "70 → 50 mL (ESV)", sound: "None",
      cursorX: 0.52
    },
    5: {
      title: "Phase 5: Isovolumetric Relaxation",
      ecg: "End of T Wave",
      desc: "LVP falls below aortic pressure → Aortic valve closes with S2 sound. Rebound off closed cusps creates dicrotic notch (incisura). Volume constant at ESV (~50 mL).",
      mv: "CLOSED", av: "CLOSED (S2)", lvp: "100 → 8 mmHg", lvv: "Constant at 50 mL (ESV)", sound: "S2 (Aortic/Pulmonic closure)",
      cursorX: 0.65
    },
    6: {
      title: "Phase 6: Rapid Ventricular Filling",
      ecg: "TP Interval",
      desc: "LVP falls below LAP → Mitral valve opens. Blood stored in left atrium rushes into ventricle (~70% of filling). In young athletes/volume overload, generates S3.",
      mv: "OPEN", av: "CLOSED", lvp: "3-5 mmHg", lvv: "50 → 100 mL", sound: "S3 (Rapid ventricular filling)",
      cursorX: 0.78
    },
    7: {
      title: "Phase 7: Diastasis (Reduced Filling)",
      ecg: "Late TP Interval",
      desc: "Passive filling slows as ventricular compliance limits expansion. Heart rate increases primarily curtail this phase.",
      mv: "OPEN", av: "CLOSED", lvp: "5-8 mmHg", lvv: "100 → 110 mL", sound: "None",
      cursorX: 0.92
    }
  };

  function updatePhase(p) {
    currentPhase = p;
    tabs.forEach(t => {
      const ph = parseInt(t.getAttribute("data-phase"));
      if (ph === p) {
        t.className = "phase-tab px-3 py-1.5 rounded-lg font-semibold bg-rose-600 text-white whitespace-nowrap";
      } else {
        t.className = "phase-tab px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap";
      }
    });

    const d = phaseData[p];
    document.getElementById("phase-title").textContent = d.title;
    document.getElementById("phase-ecg").textContent = d.ecg;
    document.getElementById("phase-desc").textContent = d.desc;
    document.getElementById("valv-mv").textContent = d.mv;
    document.getElementById("valv-av").textContent = d.av;
    document.getElementById("val-lvp").textContent = d.lvp;
    document.getElementById("val-lvv").textContent = d.lvv;
    document.getElementById("val-sound").textContent = d.sound;

    drawWiggers(d.cursorX);
  }

  function drawWiggers(cursorXRatio) {
    const canvas = document.getElementById("wiggers-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Draw background phase demarcations
    const phasesX = [0, 0.15, 0.28, 0.46, 0.60, 0.72, 0.85, 1.0];
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    phasesX.forEach(px => {
      ctx.beginPath(); ctx.moveTo(px * W, 0); ctx.lineTo(px * W, H); ctx.stroke();
    });

    // 1. Aortic Pressure (Rose)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 75);
    ctx.lineTo(0.28 * W, 80);
    ctx.bezierCurveTo(0.38 * W, 30, 0.46 * W, 30, 0.60 * W, 70); // systolic peak ~120
    ctx.lineTo(0.62 * W, 65); // dicrotic notch
    ctx.lineTo(W, 80);
    ctx.stroke();

    // 2. LV Pressure (Indigo)
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 110);
    ctx.lineTo(0.15 * W, 108);
    ctx.lineTo(0.28 * W, 80); // opens AV
    ctx.bezierCurveTo(0.38 * W, 25, 0.46 * W, 25, 0.60 * W, 70); // LV peak
    ctx.lineTo(0.70 * W, 115); // drops below LAP
    ctx.lineTo(W, 110);
    ctx.stroke();

    // 3. LV Volume (Cyan)
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(0.15 * W, 145);
    ctx.lineTo(0.28 * W, 145); // isovolumetric
    ctx.lineTo(0.46 * W, 190); // rapid ejection
    ctx.lineTo(0.60 * W, 205); // reduced ejection to ESV
    ctx.lineTo(0.70 * W, 205); // isovolumetric relaxation
    ctx.lineTo(0.85 * W, 160); // rapid filling
    ctx.lineTo(W, 150);
    ctx.stroke();

    // 4. ECG (Amber)
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 255);
    ctx.bezierCurveTo(0.06 * W, 245, 0.09 * W, 245, 0.12 * W, 255); // P wave
    ctx.lineTo(0.18 * W, 255); // PR
    ctx.lineTo(0.20 * W, 260); // Q
    ctx.lineTo(0.22 * W, 225); // R peak
    ctx.lineTo(0.24 * W, 265); // S
    ctx.lineTo(0.28 * W, 255); // J
    ctx.lineTo(0.44 * W, 255); // ST
    ctx.bezierCurveTo(0.50 * W, 240, 0.54 * W, 240, 0.58 * W, 255); // T wave
    ctx.lineTo(W, 255);
    ctx.stroke();

    // Phase Indicator Line (White dashed)
    const curX = cursorXRatio * W;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(curX, 0);
    ctx.lineTo(curX, H);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      const ph = parseInt(t.getAttribute("data-phase"));
      updatePhase(ph);
    });
  });

  updatePhase(1);
}
