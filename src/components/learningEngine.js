// BioApex Active Learning Engine & Interactive Pedagogy Suite
// High-Yield Examiner Traps, 'What-If' Perturbation Labs, Active Recall Flashcards & Formula Solvers

export const RANK_TIERS = [
  { minXp: 0, title: "USABO Semifinalist", badge: "🥉", color: "text-amber-500", border: "border-amber-500/40", bg: "bg-amber-500/10", nextXp: 500 },
  { minXp: 500, title: "USABO Honorable Mention", badge: "🥈", color: "text-slate-300", border: "border-slate-400/40", bg: "bg-slate-400/10", nextXp: 1200 },
  { minXp: 1200, title: "USABO National Finalist (Top 20)", badge: "🥇", color: "text-yellow-400", border: "border-yellow-500/40", bg: "bg-yellow-500/10", nextXp: 2500 },
  { minXp: 2500, title: "Team USA IBO Representative (Top 4)", badge: "💎", color: "text-cyan-400", border: "border-cyan-500/40", bg: "bg-cyan-500/10", nextXp: 4000 },
  { minXp: 4000, title: "IBO Gold Medalist", badge: "👑", color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10", nextXp: null }
];

export function getRankTier(xp) {
  for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
    if (xp >= RANK_TIERS[i].minXp) {
      return RANK_TIERS[i];
    }
  }
  return RANK_TIERS[0];
}

// =========================================================================
// 1. HIGH-YIELD EXAMINER TRAPS DATABASE (CEE & IBO SECRETS)
// =========================================================================
export const EXAMINER_TRAPS = {
  'cell-1-kinetics': [
    {
      title: "Vmax vs. kcat Confusion When [E]t Changes",
      trap: "Assuming Vmax is an intrinsic enzyme constant. Vmax = kcat * [E]t, so doubling enzyme concentration doubles Vmax without changing kcat or Km! kcat/Km is the only true intrinsic measure of catalytic efficiency.",
      campTip: "On USABO Part C, look for problems that alter enzyme purity or dilution: if Vmax changes but the x-intercept (-1/Km) is identical, enzyme concentration was varied without any inhibitor present!"
    },
    {
      title: "The Parallel Line Trap (Uncompetitive vs Mixed)",
      trap: "Confusing Pure Non-competitive with Uncompetitive inhibition. Only UNCOMPETITIVE inhibition produces strictly parallel Lineweaver-Burk lines (slope Km/Vmax is unchanged because both Km and Vmax are divided by α').",
      campTip: "Non-competitive inhibitors intersect on the x-axis (Km unchanged, Vmax decreases). Mixed inhibitors intersect in Quadrants II or III."
    }
  ],
  'cell-2-chemiosmosis': [
    {
      title: "Mitochondrial vs. Thylakoid PMF Components",
      trap: "Treating mitochondrial PMF and thylakoid PMF as identical. In mitochondria, membrane potential ΔΨ accounts for ~80% (Δp ≈ 200 mV). In chloroplast thylakoids, Mg²⁺ and Cl⁻ counter-fluxes collapse ΔΨ to near zero, so PMF is almost 100% ΔpH (over 3 pH units difference)!",
      campTip: "If an uncoupler specifically collapses the pH gradient but not membrane potential (like nigericin), ATP synthesis is heavily crippled in thylakoids but only partially in mitochondria!"
    },
    {
      title: "DNP Uncoupling vs. Oligomycin Inhibition",
      trap: "Assuming oxygen consumption and ATP synthesis always halt together. Oligomycin stops both in coupled mitochondria. However, adding DNP to oligomycin-inhibited mitochondria immediately accelerates O₂ consumption to absolute maximum while ATP synthesis remains ZERO!",
      campTip: "USABO oxygen electrode graphs frequently show successive injections: Substrate -> ADP -> Oligomycin (flattens curve) -> DNP (steep slope downward)."
    }
  ],
  'cell-3-signaling': [
    {
      title: "Cholera vs. Pertussis Toxin Molecular Targets",
      trap: "Both toxins raise intracellular cAMP, but their targets are exact opposites: Cholera toxin ADP-ribosylates Gαs (locking it in the active GTP state). Pertussis toxin ADP-ribosylates Gαi (locking it in the inactive GDP state so it cannot inhibit adenylyl cyclase)!",
      campTip: "Remember: 'C'holera 'C'onstitutively activates Gαs. 'P'ertussis 'P'revents Gαi from interacting with GPCRs."
    }
  ],
  'plant-1-hydraulics': [
    {
      title: "Positive Gravitational Water Potential",
      trap: "Assuming all components of water potential inside a tree are negative. Gravitational potential Ψg is POSITIVE (+0.01 MPa per meter of height). At 100 meters, Ψg = +1.0 MPa, which opposes water pulling and sets the theoretical biophysical limit of redwood height to ~125–130 m!",
      campTip: "Total water potential at top of a 100m tree: Ψw = Ψs + Ψp + Ψg. For water to flow upward from soil (Ψsoil ≈ -0.3 MPa), leaf Ψw must be more negative than -0.3 - 1.0 = -1.3 MPa."
    }
  ],
  'animal-1-neuro': [
    {
      title: "The Inverted Chloride Term in GHK Equation",
      trap: "Writing the GHK equation with internal chloride in the denominator. Because chloride is a monovalent ANION (z = -1), its concentration ratio is inverted ([Cl⁻]inside / [Cl⁻]outside) compared to K⁺ and Na⁺!",
      campTip: "If an exam question increases extracellular [Cl⁻], resting Vm actually hyperpolarizes (becomes more negative) because [Cl⁻]in / [Cl⁻]out decreases!"
    }
  ],
  'animal-2-cardio': [
    {
      title: "Isovolumetric Timing & Heart Sounds",
      trap: "Confusing which valves close to produce S1 vs S2. Mitral/Tricuspid closure = S1 (marks start of Isovolumetric Contraction). Aortic/Pulmonic closure = S2 (marks start of Isovolumetric Relaxation and creates the dicrotic notch).",
      campTip: "During isovolumetric contraction, ventricular pressure rises from ~10 to 80 mmHg with ZERO change in volume. Both AV and semilunar valves are closed!"
    }
  ],
  'animal-3-renal': [
    {
      title: "Inulin vs. PAH Clearance Interpretation",
      trap: "Thinking PAH clearance measures renal blood flow. Clearance of PAH measures Effective Renal PLASMA Flow (ERPF). To get total Renal Blood Flow (RBF), you must divide by (1 - Hematocrit)!",
      campTip: "Furthermore, if plasma PAH exceeds the tubular transport maximum (Tm ≈ 80 mg/min), secretion saturates and clearance drops toward GFR!"
    }
  ],
  'animal-5-respiration': [
    {
      title: "Bohr vs. Haldane Effect Directionality",
      trap: "Mixing up Bohr and Haldane effects. Bohr Effect: How pH and CO₂ affect OXYGEN binding to hemoglobin (high CO₂/H⁺ causes right shift, releasing O₂). Haldane Effect: How oxygen affects CO₂ carriage (deoxygenation increases blood capacity to carry CO₂)!",
      campTip: "Remember: 'B'ohr = 'B'reath of oxygen out at tissues. 'H'aldane = 'H'auling CO₂ away."
    }
  ],
  'genetics-1-mapping': [
    {
      title: "Genetic Interference Can Be Negative",
      trap: "Assuming interference I = 1 - COC is always positive. In microbial and fungal genetics, negative interference (I < 0) occurs frequently where a crossover in one region actually ENHANCES the probability of a second crossover nearby due to heteroduplex mismatch repair!",
      campTip: "If observed DCO exceeds expected DCO, COC > 1.0, and Interference I is negative!"
    }
  ],
  'genetics-3-mendelian-extensions': [
    {
      title: "Duplicate Recessive (9:7) vs Duplicate Dominant (15:1)",
      trap: "Mixing up the epistatic complementation ratios. 9:7 requires at least one dominant allele at BOTH loci (A_B_) to show the wildtype phenotype (sequential pathway). 15:1 requires a dominant allele at EITHER locus (A_ or B_) because enzymes are redundant!",
      campTip: "Count the phenotypic classes: 2 classes with 9:7 means complementary genes. 2 classes with 15:1 means duplicate gene function."
    }
  ],
  'genetics-4-gene-regulation': [
    {
      title: "Diauxic Lag Phase & Inducer Exclusion",
      trap: "Believing lactose enters cells freely when glucose is present. Glucose inhibits lactose permease (LacY) directly via unphosphorylated Enzyme IIA^Glc of the PTS transport system. This phenomenon is termed 'Inducer Exclusion'!",
      campTip: "Because lactose cannot enter while glucose is actively imported, allolactose cannot be made, keeping LacI bound even if lactose is abundant in the growth medium."
    }
  ],
  'eco-2-ecosystems': [
    {
      title: "Inverted Biomass Pyramids in Pelagic Ecosystems",
      trap: "Claiming an inverted biomass pyramid violates the Second Law of Thermodynamics. It does NOT! Phytoplankton have low standing crop biomass at any instant (e.g. 4 g/m²) but divide every 24 hours (high turnover P/B ratio), yielding enormous annual cumulative energy production to sustain longer-lived zooplankton (21 g/m²).",
      campTip: "An inverted ENERGY pyramid is physically impossible. An inverted BIOMASS pyramid is common in open ocean pelagic zones!"
    }
  ],
  'ethology-1-kin-selection': [
    {
      title: "Haplodiploid Sister-Brother Relatedness Asymmetry",
      trap: "Assuming sister-brother relatedness in bees/ants is 0.5 or 0.75. Full sisters share r = 0.75. However, sister to brother relatedness is only r = 0.25 (brothers develop from unfertilized eggs and receive zero genes from the father)! Mother to son is r = 0.50.",
      campTip: "This 3:1 relatedness asymmetry (0.75 sisters vs 0.25 brothers) explains why worker ants preferentially invest 3x more resources in rearing reproductive sisters over brothers!"
    }
  ]
};

// =========================================================================
// 2. INTERACTIVE 'WHAT-IF?' EXPERIMENT PERTURBATION ENGINE
// =========================================================================
export const WHAT_IF_EXPERIMENTS = {
  'cell-1-kinetics': {
    scenario: "You are testing an inhibitor on an enzyme with Km = 10 μM, Vmax = 100 μmol/s.",
    options: [
      {
        action: "Add Competitive Inhibitor (e.g. Malonate)",
        prediction: "Increases apparent Km, Vmax unchanged. Substrate saturation overcomes inhibition.",
        feedback: "Correct! The Lineweaver-Burk plot pivots around the y-intercept (1/Vmax). Slope increases."
      },
      {
        action: "Add Uncompetitive Inhibitor",
        prediction: "Decreases both apparent Km and Vmax in equal proportion. Lines run strictly parallel.",
        feedback: "Spot on! The inhibitor locks the ES complex, preventing catalytic turnover and increasing apparent substrate affinity."
      },
      {
        action: "Double Enzyme Concentration [E]t",
        prediction: "Vmax doubles to 200 μmol/s; Km and kcat remain strictly unchanged.",
        feedback: "Exact! Vmax is proportional to [E]t, whereas Km is an intrinsic kinetic affinity constant independent of enzyme quantity."
      }
    ]
  },
  'cell-2-chemiosmosis': {
    scenario: "Isolated liver mitochondria are respiring on Pyruvate + Malate with active ADP.",
    options: [
      {
        action: "Inject Oligomycin",
        prediction: "Blocks Fo proton channel; proton-motive force hyperpolarizes; O2 consumption halts completely.",
        feedback: "Correct! Without H+ backflow through ATP synthase, the massive proton gradient backpressure halts electron transport."
      },
      {
        action: "Add 2,4-DNP to Oligomycin-blocked mitochondria",
        prediction: "O2 consumption immediately accelerates to maximum velocity while ATP synthesis stays zero.",
        feedback: "Classic Olympiad experiment! DNP shuttles protons across the inner membrane, dissipating PMF as heat and uncoupling respiration from phosphorylation."
      },
      {
        action: "Add Rotenone, then rescue with Succinate",
        prediction: "Rotenone halts Complex I. Succinate donates electrons directly to Complex II (FADH2), restoring respiration!",
        feedback: "Brilliant! Complex II bypasses the Complex I block entirely, donating electrons to ubiquinone (Q)."
      }
    ]
  },
  'animal-5-respiration': {
    scenario: "A runner engages in vigorous sprint exercise: muscles produce high lactic acid and CO2.",
    options: [
      {
        action: "Local tissue pH drops from 7.4 to 7.1 (Bohr Effect)",
        prediction: "O2-Hb dissociation curve shifts right: P50 rises from 26.6 to ~38 mmHg, releasing 3x more O2!",
        feedback: "Correct! Protonation of histidine residues forms salt bridges that stabilize the low-affinity T-state, dumping oxygen where it's needed."
      },
      {
        action: "Ascent to 4000m altitude (Hypobaric Hypoxia)",
        prediction: "Erythrocytes upregulate 2,3-BPG via Rapoport-Luebering shunt, right-shifting curve for tissue delivery.",
        feedback: "Exact adaptation! Elevated 2,3-BPG binds the central cavity of deoxyhemoglobin, facilitating peripheral unloading."
      }
    ]
  },
  'plant-1-hydraulics': {
    scenario: "A drought increases xylem tension from -1.0 MPa to -3.5 MPa.",
    options: [
      {
        action: "Tension exceeds cavitation threshold P50",
        prediction: "Air seeding pulls air bubbles through pit membranes, causing acoustic embolism and loss of conductance.",
        feedback: "Correct! In conifers, the torus aspirates against the overarching border to seal the aspirated pit and isolate the embolized tracheid."
      },
      {
        action: "Roots detect soil drying and synthesize ABA",
        prediction: "ABA binds PYR/PYL, inactivates PP2C, activates SnRK2, opening SLAC1 anion channels to close stomata.",
        feedback: "The canonical plant physiology pathway! Anion efflux depolarizes guard cells, driving massive K+ loss via GORK and turgor collapse."
      }
    ]
  },
  'genetics-4-gene-regulation': {
    scenario: "E. coli is cultured in a medium containing both Glucose (10 mM) and Lactose (10 mM).",
    options: [
      {
        action: "Phase 1: Glucose is actively consumed first",
        prediction: "cAMP remains low, so CAP cannot bind. Inducer exclusion keeps lactose out. lac operon remains BASAL.",
        feedback: "Classic diauxic growth! Glucose is the preferred carbon catabolite; lac operon transcription is not induced until glucose is exhausted."
      },
      {
        action: "Phase 2: Glucose is completely depleted",
        prediction: "Adenylyl cyclase activates -> cAMP spikes -> cAMP-CAP binds promoter -> allolactose removes LacI -> 100% transcription!",
        feedback: "Magnificent! A brief diauxic lag phase occurs while lacZ and lacY mRNAs are synthesized, followed by exponential lactose utilization."
      }
    ]
  }
};

// =========================================================================
// 3. INTERACTIVE ACTIVE RECALL FLASHCARDS (OLYMPIAD ANKI MODE)
// =========================================================================
export const FLASHCARD_SETS = {
  'cell-1-kinetics': [
    { q: "What is catalytic efficiency, and what is its theoretical diffusion-controlled limit?", a: "Catalytic efficiency = kcat / Km. The physical diffusion limit in aqueous solution is 10⁸ to 10⁹ M⁻¹·s⁻¹ (achieved by catalase, carbonic anhydrase, TPI)." },
    { q: "Why are Lineweaver-Burk plots parallel in uncompetitive inhibition?", a: "Because the inhibitor binds exclusively to the ES complex, dividing both apparent Km and Vmax by the exact same factor α'. The slope (Km/Vmax) remains identical!" },
    { q: "What is the key diagnostic difference between MWC and KNF allosteric models?", a: "MWC (Concerted) forbids negative cooperativity (all subunits change state together). KNF (Sequential) allows induced-fit subunit strain, permitting both positive and negative cooperativity (nH < 1)." }
  ],
  'cell-2-chemiosmosis': [
    { q: "How many protons are translocated per pair of electrons in the Complex III Q-cycle?", a: "4 protons pumped into the intermembrane space per 2 electrons delivered to Cytochrome c (2 from initial QH₂ + 2 from recycled semiquinone uptake)." },
    { q: "What is the exact proton cost per ATP synthesized in mammalian mitochondria?", a: "3.67 H⁺/ATP (8-subunit c-ring requires 8/3 = 2.67 H⁺ for rotation, plus 1 H⁺ equivalent for ANT and phosphate translocase import)." },
    { q: "Which respiratory inhibitor blocks the Qi site of Cytochrome bc₁?", a: "Antimycin A blocks the Qi site (keeps cyt bH reduced). Stigmatellin and myxothiazol block the Qo site." }
  ],
  'animal-1-neuro': [
    { q: "Why does myelination increase the length constant (λ) while decreasing the time constant (τ)?", a: "Myelin increases transverse membrane resistance (rm), which increases λ = √(rm/ri). It also increases membrane thickness, dramatically decreasing membrane capacitance (cm), speeding conduction." },
    { q: "What is the molecular identity of the Naᵥ channel inactivation ball?", a: "The hydrophobic IFMT motif (Isoleucine - Phenylalanine - Methionine - Threonine) on the intracellular III-IV loop that swings into the inner pore." },
    { q: "What ion relieves the voltage-dependent block of NMDA receptors during LTP induction?", a: "Depolarization repels the divalent Mg²⁺ ion that physically plugs the NMDA channel pore at resting membrane potential (-70 mV)." }
  ],
  'plant-2-photochemistry': [
    { q: "Why does oxygen evolution peak on the 3rd flash in dark-adapted leaves during the Kok cycle?", a: "Because dark-adapted chloroplasts relax to the stable S₁ state (not S₀). Three single-turnover flashes step the Mn₄CaO₅ cluster: S₁ -> S₂ -> S₃ -> [S₄] -> S₀ + O₂." },
    { q: "What is Cyclic Electron Flow (CEF) and why is it essential for the Calvin cycle?", a: "CEF routes electrons from Ferredoxin back to Plastoquinone via PGR5 or NDH, generating proton gradient for ATP without producing NADPH, balancing the strict 3 ATP : 2 NADPH ratio." }
  ],
  'genetics-2-popgen': [
    { q: "What is the equilibrium frequency p̂ of allele A₁ under overdominance (heterozygote advantage)?", a: "p̂ = s₂ / (s₁ + s₂), where s₁ = 1 - w₁₁ and s₂ = 1 - w₂₂. Selection against both homozygotes maintains stable balanced polymorphism." },
    { q: "How many effective migrants per generation (Nem) are required to prevent genetic divergence due to drift?", a: "Just ONE migrant per generation (Nem ≥ 1) is sufficient to keep Fst low and prevent complete population differentiation under the island model!" }
  ]
};

// =========================================================================
// 4. CONFETTI CELEBRATION ENGINE (DOM-BASED PARTICLES)
// =========================================================================
export function triggerCelebrationConfetti() {
  const container = document.createElement('div');
  container.className = 'fixed inset-0 pointer-events-none z-50 overflow-hidden';
  document.body.appendChild(container);

  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e', '#3b82f6'];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 6;
    const duration = Math.random() * 1.5 + 1.2;
    const delay = Math.random() * 0.2;

    el.style.cssText = `
      position: absolute;
      top: -20px;
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.5}px;
      background-color: ${color};
      border-radius: 2px;
      opacity: 0.9;
      transform: rotate(${Math.random() * 360}deg);
      animation: confettiFall ${duration}s ease-out ${delay}s forwards;
    `;
    container.appendChild(el);
  }

  // Inject keyframe if not already present
  if (!document.getElementById('confetti-keyframe-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-keyframe-style';
    style.textContent = `
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    container.remove();
  }, 2500);
}
