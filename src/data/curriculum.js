// BioApex: USABO Finalist (Top 20) & IBO Gold Curriculum Database
// Rigorously sourced from Alberts (MBoC), Lehninger, Vander's, Guyton, Raven's, Taiz & Zeiger, Pierce, Futuyma, Begon.

export const DOMAINS = {
  CELL_BIO: {
    id: "cell_bio",
    name: "Cell Biology & Biochemistry",
    weight: "20%",
    color: "#6366f1", // Indigo
    bgGradient: "from-indigo-900/60 to-purple-900/40",
    icon: "dna",
    textbookSources: ["Alberts: Molecular Biology of the Cell (6th/7th Ed)", "Lehninger: Principles of Biochemistry (7th/8th Ed)", "Lodish: Molecular Cell Biology"]
  },
  PLANT_BIO: {
    id: "plant_bio",
    name: "Plant Anatomy & Physiology",
    weight: "15%",
    color: "#10b981", // Emerald
    bgGradient: "from-emerald-900/60 to-teal-900/40",
    icon: "sprout",
    textbookSources: ["Raven: Biology of Plants (8th Ed)", "Taiz, Zeiger, Møller, Murphy: Plant Physiology and Development (6th/7th Ed)"]
  },
  ANIMAL_PHYS: {
    id: "animal_phys",
    name: "Animal Anatomy & Physiology",
    weight: "25%",
    color: "#ef4444", // Rose/Red
    bgGradient: "from-rose-900/60 to-red-900/40",
    icon: "heart-pulse",
    textbookSources: ["Vander's Human Physiology (15th/16th Ed)", "Guyton and Hall: Textbook of Medical Physiology (14th Ed)", "Costanzo: Physiology (6th/7th Ed)"]
  },
  GENETICS: {
    id: "genetics",
    name: "Genetics & Molecular Evolution",
    weight: "20%",
    color: "#f59e0b", // Amber
    bgGradient: "from-amber-900/60 to-yellow-900/40",
    icon: "git-branch",
    textbookSources: ["Pierce: Genetics - A Conceptual Approach (6th/7th Ed)", "Griffiths: Introduction to Genetic Analysis (11th/12th Ed)", "Futuyma: Evolution (4th/5th Ed)"]
  },
  ECOLOGY: {
    id: "ecology",
    name: "Ecology & Demography",
    weight: "10%",
    color: "#06b6d4", // Cyan
    bgGradient: "from-cyan-900/60 to-blue-900/40",
    icon: "globe",
    textbookSources: ["Begon, Townsend, Harper: Ecology - From Individuals to Ecosystems (4th/5th Ed)", "Ricklefs: The Economy of Nature"]
  },
  ETHOLOGY: {
    id: "ethology",
    name: "Ethology (Animal Behavior)",
    weight: "5%",
    color: "#8b5cf6", // Violet
    bgGradient: "from-violet-900/60 to-fuchsia-900/40",
    icon: "feather",
    textbookSources: ["Alcock: Animal Behavior (10th/11th Ed)", "Davies, Krebs, West: An Introduction to Behavioural Ecology"]
  },
  BIOSYSTEMATICS: {
    id: "biosystematics",
    name: "Biosystematics & Biodiversity",
    weight: "5%",
    color: "#ec4899", // Pink
    bgGradient: "from-pink-900/60 to-rose-900/40",
    icon: "network",
    textbookSources: ["Tree of Life Web Project", "Maddison & Schulz: Phylogenetics and Comparative Biology", "Brusca & Brusca: Invertebrates"]
  }
};

export const TRACK_MODULES = [
  // ==================== DOMAIN 1: CELL BIOLOGY & BIOCHEMISTRY (20%) ====================
  {
    id: "cell-1-kinetics",
    domainId: "cell_bio",
    title: "Enzyme Kinetics, Allostery & Bisubstrate Mechanisms",
    subtitle: "Lineweaver-Burk, Eadie-Hofstee, MWC vs KNF, and Ping-Pong kinetics",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: [],
    sources: ["Lehninger Ch. 6 (Enzymes)", "Voet & Voet Biochemistry Ch. 12-13"],
    interactiveTool: "lineweaver_burk_simulator",
    summary: "Beyond standard Michaelis-Menten: derive catalytic efficiency (kcat/Km), analyze three linear transformations, evaluate Monod-Wyman-Changeux (MWC) vs Koshland-Némethy-Filmer (KNF) cooperative binding, and distinguish ordered, random, and ping-pong bisubstrate mechanisms.",
    keyFormulas: [
      { name: "Michaelis-Menten Equation", latex: "v_0 = \\frac{V_{\\max} [S]}{K_m + [S]} = \\frac{k_{cat} [E]_t [S]}{K_m + [S]}" },
      { name: "Lineweaver-Burk (Double Reciprocal)", latex: "\\frac{1}{v_0} = \\left( \\frac{K_m}{V_{\\max}} \\right) \\frac{1}{[S]} + \\frac{1}{V_{\\max}}" },
      { name: "Eadie-Hofstee Transformation", latex: "v_0 = -K_m \\left( \\frac{v_0}{[S]} \\right) + V_{\\max}" },
      { name: "Hanes-Woolf Transformation", latex: "\\frac{[S]}{v_0} = \\frac{1}{V_{\\max}} [S] + \\frac{K_m}{V_{\\max}}" },
      { name: "Hill Equation for Cooperativity", latex: "\\log \\left( \\frac{\\theta}{1 - \\theta} \\right) = n_H \\log [S] - \\log K_d" }
    ],
    sections: [
      {
        heading: "1. Catalytic Efficiency & The Diffusion Limit",
        content: `In high-level USABO questions, enzymes are rarely operating at substrate saturation ($[S] \\gg K_m$). Under physiological conditions where $[S] \\ll K_m$, the rate equation simplifies to:
$$v_0 \\approx \\frac{k_{cat}}{K_m} [E]_t [S]$$
Here, the second-order rate constant $\\frac{k_{cat}}{K_m}$ represents **catalytic efficiency**. 
- The theoretical diffusion-controlled limit is $10^8$ to $10^9 \\text{ M}^{-1}\\text{s}^{-1}$. 
- Enzymes operating near this limit (termed *catalytically perfect*) include **carbonic anhydrase** ($k_{cat}/K_m \\approx 1.5 \\times 10^8$), **triose phosphate isomerase (TPI)**, **catalase**, and **acetylcholinesterase**.
- If an enzyme reaches this limit, every encounter between enzyme and substrate leads to catalysis; further optimization can only occur by channeling substrates between adjacent active sites (metabolic tunneling).`
      },
      {
        heading: "2. Linear Diagnostic Plots & Inhibition Topologies",
        content: `USABO Part B/C and IBO practicals frequently provide raw kinetic data requiring diagnosis:
1. **Competitive Inhibition**: 
   - Inhibitor binds exclusively to free enzyme ($E$).
   - Apparent $K_m' = K_m(1 + [I]/K_I) > K_m$. $V_{\\max}$ unchanged.
   - Lineweaver-Burk: Lines intersect exactly on the $y$-axis ($1/V_{\\max}$).
2. **Uncompetitive Inhibition**:
   - Inhibitor binds strictly to the enzyme-substrate complex ($ES$).
   - Apparent $V_{\\max}' = V_{\\max}/\\alpha'$ and $K_m' = K_m/\\alpha'$.
   - Lineweaver-Burk: Produces strictly **parallel lines** (slope $K_m/V_{\\max}$ is preserved).
3. **Non-competitive (Mixed) Inhibition**:
   - Inhibitor binds both $E$ and $ES$ with affinities $K_I$ and $K_I'$.
   - Pure non-competitive ($K_I = K_I'$): $V_{\\max}$ decreases, $K_m$ unchanged; lines intersect on the $x$-axis.
   - Mixed ($K_I \\ne K_I'$): Lines intersect in quadrant II ($K_I < K_I'$) or quadrant III ($K_I > K_I'$).`
      },
      {
        heading: "3. Allosteric Cooperativity: MWC vs. KNF Models",
        content: `Oligomeric enzymes exhibiting sigmoidal kinetics are modeled via two canonical paradigms:
- **Concerted Model (Monod-Wyman-Changeux / MWC)**: All subunits must exist in the same quaternary conformation simultaneously (all **Tense [T]** or all **Relaxed [R]**). Binding of substrate shifts the equilibrium towards the high-affinity R state. Negative cooperativity is *forbidden* under MWC.
- **Sequential Model (Koshland-Némethy-Filmer / KNF)**: Subunit transitions occur sequentially via induced fit. Binding of ligand to one subunit alters the tertiary structure of that subunit and induces neighboring conformational strain. Allows **both positive and negative cooperativity** ($n_H < 1$).
- **Hill Coefficient ($n_H$) Rules**:
  - $n_H = 1$: Non-cooperative (hyperbolic Michaelis-Menten).
  - $n_H > 1$: Positive cooperativity (e.g., hemoglobin $n_H \\approx 2.8$ for 4 binding sites; $n_H$ cannot exceed total number of physical binding sites $n$).
  - $n_H < 1$: Negative cooperativity (e.g., tyrosyl-tRNA synthetase).`
      },
      {
        heading: "4. Multi-Substrate Mechanisms: Ternary vs. Ping-Pong",
        content: `For bisubstrate reactions ($A + B \\to P + Q$):
- **Sequential Ordered (Ternary Complex)**: $A$ must bind before $B$; ternary complex $EAB$ forms. Products released in defined sequence. Lineweaver-Burk lines at varying $[B]$ intersect to the left of the $y$-axis.
- **Sequential Random (Ternary Complex)**: Either $A$ or $B$ can bind first.
- **Ping-Pong (Double-Displacement)**: First substrate binds, transfers a chemical group to the enzyme forming a modified enzyme intermediate ($E^*$), and leaves as product $P$ before substrate $B$ binds!
  - Diagnostic: Lineweaver-Burk lines at different constant concentrations of second substrate are **strictly parallel**!`
      }
    ]
  },

  {
    id: "cell-2-chemiosmosis",
    domainId: "cell_bio",
    title: "Bioenergetics, Proton-Motive Force & Mitochondrial Complexes",
    subtitle: "Complexes I-IV, Q-Cycle, Mitchell PMF, and c-Ring Rotational Stoichiometry",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["cell-1-kinetics"],
    sources: ["Alberts MBoC Ch. 14 (Energy Conversion)", "Lehninger Ch. 19 (Oxidative Phosphorylation)"],
    interactiveTool: "mitochondrial_pmf_calculator",
    summary: "Dissect electron flow through mitochondrial respiratory complexes I, II, III, IV, the Q-cycle proton pumping mechanism, thermodynamic proton-motive force calculations, and the c-ring rotational stoichiometry governing the exact H+/ATP and P/O ratios.",
    keyFormulas: [
      { name: "Proton-Motive Force (Mitchell)", latex: "\\Delta p = \\Delta \\Psi - \\frac{2.3 RT}{F} \\Delta \\text{pH} \\approx \\Delta \\Psi - 59 \\Delta \\text{pH} \\text{ (in mV at } 25^\\circ\\text{C)}" },
      { name: "Free Energy of Proton Transport", latex: "\\Delta G = F \\Delta p = F \\Delta \\Psi + 2.303 RT \\Delta \\text{pH}" },
      { name: "Redox Potential to Free Energy", latex: "\\Delta G^{\\circ \\prime} = -n F \\Delta E^{\\circ \\prime}" },
      { name: "ATP Synthase Stoichiometry", latex: "\\text{H}^+/\\text{ATP} = \\frac{\\text{c-ring subunits}}{3} + 1 \\text{ (for } \\text{P}_i \\text{ symport)}" }
    ],
    sections: [
      {
        heading: "1. Electron Flow & The Two-Stroke Q-Cycle at Complex III",
        content: `Complex III (Cytochrome $bc_1$ complex, ubiquinol-cytochrome c oxidoreductase) resolves the problem of transferring electrons from a two-electron carrier (ubiquinol, $QH_2$) to a one-electron carrier (cytochrome $c$, carrying heme iron $Fe^{3+} \\to Fe^{2+}$).
- **Step 1 (First $QH_2$ oxidation at $Q_o$ site)**:
  - $QH_2$ binds near the intermembrane space (P-side).
  - 1st electron transfers to the **Rieske Fe-S center**, then to Cytochrome $c_1$, then to Cytochrome $c$.
  - 2nd electron transfers to **Cytochrome $b_L$**, then to **Cytochrome $b_H$**, and onto an oxidized quinone ($Q$) at the matrix $Q_i$ site, forming a stable **semiquinone radical ($\\cdot Q^-$)**.
  - $2 H^+$ released into the intermembrane space.
- **Step 2 (Second $QH_2$ oxidation at $Q_o$ site)**:
  - Second $QH_2$ oxidized at $Q_o$ site.
  - 1st electron goes to another Cytochrome $c$.
  - 2nd electron passes via $b_L$ and $b_H$ to the semiquinone radical at $Q_i$, picking up $2 H^+$ from the matrix to regenerate $QH_2$.
- **Net Balance of Q-cycle**: 
  - Net: $1 QH_2 + 2 \\text{ cyt } c_1 (Fe^{3+}) + 2 H^+_{\\text{matrix}} \\to Q + 2 \\text{ cyt } c_1 (Fe^{2+}) + 4 H^+_{\\text{IMS}}$.
  - Crucial olympiad fact: **4 protons are pumped across the membrane per pair of electrons transferred to cytochrome c**!`
      },
      {
        heading: "2. The Proton-Motive Force (PMF) Biophysics",
        content: `The electrochemical potential across the inner mitochondrial membrane (IMM) consists of two components:
$$\\Delta p = \\Delta \\Psi - \\frac{2.303 RT}{F} \\Delta \\text{pH}$$
- In mitochondria, membrane potential $\\Delta \\Psi$ dominates: $\\approx -160$ to $-180\\text{ mV}$ (matrix negative relative to IMS).
- $\\Delta \\text{pH} \\approx 0.75$ to $1.0$ pH units (matrix basic $\\sim 7.8$, IMS $\\sim 7.0$).
- Total $\\Delta p \\approx 200 - 220\\text{ mV}$.
- **Contrast with Chloroplast Thylakoid Membrane**:
  - In thylakoids, $Mg^{2+}$ and $Cl^-$ counter-ion fluxes collapse $\\Delta \\Psi$ almost to zero.
  - Therefore, the thylakoid proton-motive force is almost entirely composed of $\\Delta \\text{pH}$ ($\> 3.0$ pH units; lumen pH $\\approx 5.0$, stroma $\\approx 8.0$)!`
      },
      {
        heading: "3. c-Ring Rotational Mechanics & Modern P/O Ratios",
        content: `The $F_oF_1$-ATP synthase operates as a rotary rotary motor:
- The central stalk ($\\gamma-\\epsilon$) rotates $360^\\circ$ through three catalytic $\\beta$-subunit conformations: **Open (O)**, **Loose (L)**, and **Tight (T)**. One full $360^\\circ$ revolution synthesizes exactly **3 ATP molecules**.
- The membrane-embedded $c$-ring rotation requires 1 proton per $c$-subunit (proton enters cytosolic half-channel, protonates a conserved Asp/Glu carboxylate, rotates $360^\\circ$, and deprotonates into the matrix half-channel).
- **Mammalian mitochondria have $c = 8$ subunits**:
  - $8 H^+$ rotate the ring $360^\\circ$, producing 3 ATP.
  - Thus, synthesis alone requires $8/3 = 2.67 H^+ / \\text{ATP}$.
  - Transport: Exporting ATP$^{4-}$ and importing ADP$^{3-}$ via the adenine nucleotide translocase (ANT) consumes 1 full elementary charge from $\\Delta \\Psi$. Symporting $H_2PO_4^-$ with $1 H^+$ via phosphate translocase consumes $1 H^+$.
  - Total energetic cost per ATP: $2.67 + 1 = 3.67 H^+ / \\text{ATP}$.
  - Since $10 H^+$ are pumped per $NADH$ (4 by Complex I, 4 by Complex III, 2 by Complex IV): Modern P/O ratio for $NADH = 10 / 3.67 \\approx \\mathbf{2.5}$.
  - For $FADH_2$ ($succinate$), $6 H^+$ pumped: P/O ratio $= 6 / 3.67 \\approx \\mathbf{1.5}$.`
      },
      {
        heading: "4. Respiratory Inhibitors vs. Uncouplers Diagnostic Matrix",
        content: `USABO experimental data interpretation will ask you to analyze oxygen consumption vs ATP synthesis curves:
- **Complex I inhibitor**: Rotenone, Amytal, Piericidin A (blocks transfer from Fe-S to Q). Succinate can bypass!
- **Complex II inhibitor**: Malonate (competitive inhibitor of succinate dehydrogenase).
- **Complex III inhibitor**: Antimycin A (blocks $Q_i$ site; keeps $b_H$ reduced), Myxothiazol / Stigmatellin (blocks $Q_o$ site).
- **Complex IV inhibitor**: Cyanide ($CN^-$), Carbon monoxide ($CO$), Azide ($N_3^-$) (bind $Fe^{3+}$ or $Fe^{2+}$ of heme $a_3$). Completely halts respiration.
- **ATP Synthase inhibitor**: Oligomycin (binds $F_o$ $c$-subunit, blocks $H^+$ channel). Oxygen consumption halts in coupled mitochondria due to back-pressure of high PMF!
- **Uncouplers**: 2,4-Dinitrophenol (DNP), FCCP, UCP1 (Thermogenin). Dissipate $\\Delta p$ as heat without ATP synthesis. **Oxygen consumption accelerates to maximum rate**, independent of oligomycin or ADP availability!`
      }
    ]
  },

  {
    id: "cell-3-signaling",
    domainId: "cell_bio",
    title: "Signal Transduction: GPCRs, RTKs, and Nuclear Receptors",
    subtitle: "Gαs/Gαi/Gαq, MAPK, PI3K/Akt/mTOR, Wnt/β-Catenin, and Notch/Delta",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["cell-1-kinetics"],
    sources: ["Alberts MBoC Ch. 15 (Cell Signaling)", "Lodish Molecular Cell Biology Ch. 15-16"],
    interactiveTool: null,
    summary: "Master the bifurcation of G-protein coupled cascades (adenylyl cyclase vs PLCβ-IP3-DAG), receptor tyrosine kinase (RTK) dimerization, the Ras-Raf-MEK-ERK and PI3K-Akt pathways, morphogen signaling (Wnt/β-catenin destruction complex), and contact-dependent Notch/Delta lateral inhibition.",
    keyFormulas: [
      { name: "Scatchard Equation for Receptor Binding", latex: "\\frac{[B]}{[F]} = -\\frac{1}{K_d} [B] + \\frac{B_{\\max}}{K_d}" },
      { name: "Amplification Factor in GPCR", latex: "1 \\text{ ligand} \\to 100 \\text{ } G_\\alpha\\text{-GTP} \\to 10^4 \\text{ cAMP} \\to 10^5 \\text{ active PKA} \\to 10^7 \\text{ phosphorylated targets}" }
    ],
    sections: [
      {
        heading: "1. GPCR Heterotrimeric G-Protein Subtypes & Toxins",
        content: `Heterotrimeric G-proteins consist of $\\alpha$, $\\beta$, and $\\gamma$ subunits:
- **$G_{\\alpha s}$**: Activates Adenylyl Cyclase $\\to \\uparrow [\\text{cAMP}] \\to$ binds PKA regulatory subunits $\\to$ catalytic subunits enter nucleus and phosphorylate **CREB** at Ser133.
  - *Cholera Toxin* ($Vibrio cholerae$): ADP-ribosylates $G_{\\alpha s}$ arginine residue $\\to$ inhibits intrinsic GTPase activity $\\to$ constitutive activation $\\to$ massive cAMP $\\to$ PKA phosphorylates CFTR chloride channel $\\to$ secretory diarrhea.
- **$G_{\\alpha i}$**: Inhibits Adenylyl Cyclase $\\to \\downarrow [\\text{cAMP}]$.
  - *Pertussis Toxin* ($Bordetella pertussis$): ADP-ribosylates $G_{\\alpha i}$ cysteine residue $\\to$ prevents $G_{\\alpha i}$ from interacting with receptors $\\to$ locks $G_{\\alpha i}$ in GDP-bound inactive state $\\to$ cannot inhibit Adenylyl Cyclase $\\to \\uparrow [\\text{cAMP}]$.
- **$G_{\\alpha q}$**: Activates Phospholipase C-$\\beta$ (PLC-$\\beta$) $\\to$ cleaves membrane $PIP_2$ into:
  1. **$IP_3$ (Inositol 1,4,5-trisphosphate)**: Soluble, diffuses to ER membrane ligand-gated $Ca^{2+}$ release channels.
  2. **DAG (Diacylglycerol)**: Remains in membrane; recruits and co-activates **Protein Kinase C (PKC)** along with $Ca^{2+}$.`
      },
      {
        heading: "2. RTK Activation: Ras-MAPK & PI3K-Akt Cascades",
        content: `Receptor Tyrosine Kinases (e.g., EGFR, Insulin receptor) undergo ligand-induced dimerization and **trans-autophosphorylation** on intracellular tyrosine residues:
- **Ras-MAPK Pathway**:
  - Phosphotyrosine binds **SH2 domain** of adaptor protein **Grb2**.
  - Grb2 binds **SOS** (a Guanine Nucleotide Exchange Factor / GEF) via its **SH3 domains**.
  - SOS stimulates **Ras** (a monomeric small GTPase anchored via farnesyl lipid anchor) to release GDP and bind GTP.
  - Active Ras-GTP recruits and activates **Raf (MAPKKK)** $\\to$ phosphorylates **MEK (MAPKK)** $\\to$ phosphorylates **ERK (MAPK)** $\\to$ phosphorylates transcription factors (e.g., Myc, Fos, Jun) driving G1/S cyclins.
  - Ras is inactivated by **GAPs (GTPase-Activating Proteins)**; loss-of-function mutation in neurofibromin (NF1, a GAP) or oncogenic mutant Ras (G12V, defective in GTP hydrolysis) leads to uncontrolled proliferation.
- **PI3K / Akt / mTOR Survival Pathway**:
  - Phosphotyrosine recruits **PI 3-Kinase** $\\to$ phosphorylates $PIP_2$ into **$PIP_3$**.
  - $PIP_3$ docks both **Akt (PKB)** and **PDK1** via their **Pleckstrin Homology (PH) domains**.
  - PDK1 phosphorylates Akt. Activated Akt dissociates and phosphorylates **Bad** (preventing apoptosis), **GSK3** (activating glycogen synthesis), and activates **mTORC1** (stimulating protein translation and cell growth).
  - **PTEN** is a lipid phosphatase that dephosphorylates $PIP_3 \\to PIP_2$; PTEN loss is a frequent hallmark of human malignancies.`
      },
      {
        heading: "3. Non-Kinase Morphogen Signaling: Wnt, Notch & Hedgehog",
        content: `Olympiad exams test embryonic patterning pathways that do not rely on traditional secondary messengers:
- **Wnt / $\\beta$-Catenin Pathway**:
  - *Absence of Wnt*: $\\beta$-catenin is captured by the **destruction complex** (Axin, APC, GSK3$\\beta$, CK1), phosphorylated, and degraded by 26S proteasome via $\\beta$-TrCP ubiquitin ligase.
  - *Presence of Wnt*: Wnt binds **Frizzled** and co-receptor **LRP5/6** $\\to$ recruits **Dishevelled (Dvl)** $\\to$ disrupts the destruction complex $\\to \\beta$-catenin accumulates, translocates to nucleus, displaces Groucho co-repressors, and binds **TCF/LEF** transcription factors to drive Target gene expression.
- **Notch / Delta Lateral Inhibition**:
  - Direct cell-cell contact. Delta ligand on signaling cell binds Notch receptor on neighboring cell.
  - Triggers two sequential proteolytic cleavages: first by ADAM metalloprotease, then inside the membrane by **$\\gamma$-secretase (Presenilin complex)**.
  - The **Notch Intracellular Domain (NICD)** is released, enters nucleus, and acts as a transcriptional co-activator with CSL.`
      }
    ]
  },

  {
    id: "cell-4-trafficking",
    domainId: "cell_bio",
    title: "Vesicular Trafficking, Endocytosis & Organellar Sorting",
    subtitle: "Signal Hypothesis, COPII, COPI, Clathrin, SNARE Assembly, and Rab GTPases",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: ["cell-2-chemiosmosis"],
    sources: ["Alberts MBoC Ch. 12-13 (Intracellular Compartments & Traffic)"],
    interactiveTool: null,
    summary: "Detail the molecular mechanics of co-translational ER translocation, coat proteins (COPII anterograde, COPI retrograde, Clathrin endocytic), Rab GTPase targeting, and v-/t-SNARE membrane fusion and NSF-mediated recycling.",
    keyFormulas: [
      { name: "SNARE Complex Energy", latex: "\\Delta G_{\\text{zippering}} \\approx -35 k_B T \\text{ (sufficient to overcome electrostatic water hydration barrier)}" }
    ],
    sections: [
      {
        heading: "1. The Signal Hypothesis & ER Co-Translational Translocation",
        content: `Secretory and transmembrane proteins possess an N-terminal hydrophobic signal peptide (15–30 residues):
1. **Signal Recognition Particle (SRP)** (a ribonucleoprotein complex containing 7SL RNA and 6 proteins) binds the signal sequence as it emerges from the ribosome exit tunnel.
2. SRP halts translation elongation (translational pause) and docks onto the **SRP Receptor** in the rough ER membrane.
3. Both SRP and SRP receptor hydrolyze **GTP**, releasing the nascent chain onto the **Sec61 translocon** (heterotrimeric channel).
4. Signal peptidase cleaves the signal peptide inside the ER lumen.
5. Transmembrane topology is dictated by alternating **hydrophobic start-transfer** and **stop-transfer sequences**, with positively charged residues oriented toward the cytosol (*Positive-Inside Rule*).`
      },
      {
        heading: "2. Vesicle Coat Machineries: COPII, COPI & Clathrin",
        content: `Budding vesicles are driven by distinct cytosolic protein coats:
- **COPII**: Anterograde transport from **ER $\\to$ cis-Golgi**.
  - Initiated by **Sar1 GTPase**: Sar1-GDP is activated by ER transmembrane GEF **Sec12**, exposing an amphipathic helix that embeds into the outer leaflet.
  - Recruits **Sec23/Sec24 inner coat** (Sec24 binds cargo exit motifs like di-acidic Asp-X-Glu).
  - Recruits **Sec13/Sec31 outer coat** which polymerizes into a cage, deforming the membrane into a bud.
- **COPI**: Retrograde transport from **trans-Golgi $\\to$ cis-Golgi $\\to$ ER**.
  - Retrieves escaped resident ER proteins. Luminal ER chaperones (e.g., BiP, PDI) contain a C-terminal **KDEL motif** (Lys-Asp-Glu-Leu).
  - Golgi has lower pH than ER, enhancing KDEL receptor affinity for KDEL. Upon retrograde return to neutral ER lumen, ligand is released.
  - COPI coat recruitment is driven by **Arf1 GTPase**.
- **Clathrin**: Transport from **trans-Golgi network $\\to$ endosomes/lysosomes**, and from **plasma membrane $\\to$ endosomes (receptor-mediated endocytosis)**.
  - Clathrin consists of a **triskelion** (3 heavy chains + 3 light chains).
  - Binds membrane via **Adaptor Protein complexes** (AP2 at plasma membrane; AP1/GGA at Golgi).
  - Vesicle scission requires **Dynamin**, a large GTPase that forms a helical collar around the vesicle neck and constricts upon GTP hydrolysis.`
      },
      {
        heading: "3. Rab GTPases & The SNARE Fusion Hypothesis",
        content: `Targeting and fusion of transport vesicles with correct acceptor compartments:
- **Rab GTPases**: Confer compartment identity. Active Rab-GTP on vesicle recruits specific **Rab effectors** and tethering factors on the target membrane (e.g., coiled-coil tethers or multisubunit tethering complexes like Exocyst, COG, CORVET).
- **SNAREs (Soluble N-ethylmaleimide-sensitive factor Attachment protein Receptors)**:
  - **v-SNARE** on vesicle (e.g., synaptobrevin / VAMP) interacts with **t-SNAREs** on target membrane (e.g., syntaxin-1 and SNAP-25).
  - Forms a parallel **four-helix bundle** (trans-SNARE complex or 'SNAREpin').
  - The mechanical zippering of the four-helix bundle pulls the two hydrophobic bilayers within 1.5 nm of each other, expelling water molecules and driving outer leaflet hemifusion, followed by full fusion pore opening.
- **Disassembly**: Following fusion, the stable cis-SNARE complex in the target membrane is unwound by **NSF (an AAA+ ATPase)** and its adaptor **$\\alpha$-SNAP**, hydrolyzing ATP to restore free monomers for recycling.`
      }
    ]
  },

  {
    id: "cell-5-checkpoints-apoptosis",
    domainId: "cell_bio",
    title: "Cell Cycle Checkpoints, p53-Rb Pathways & Apoptosis Cascades",
    subtitle: "Cyclin-CDK Regulation, Wee1/Cdc25, Intrinsic vs Extrinsic Apoptotic Execution",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["cell-3-signaling"],
    sources: ["Alberts MBoC Ch. 17 (Cell Cycle) & Ch. 18 (Apoptosis)"],
    interactiveTool: null,
    summary: "Dissect the molecular circuitry of cell cycle control: CDK activation/inhibition, the G1/S restriction point (pRb, E2F), G2/M transition (MPF, Wee1, Cdc25), DNA damage repair signaling (ATM/ATR, Chk1/Chk2, p53, p21), and the intrinsic (Bcl-2, Apaf-1 apoptosome) vs extrinsic (FasL, FADD, Caspase-8) apoptotic pathways.",
    keyFormulas: [
      { name: "Hill Equation for MPF Activation Switch", latex: "\\text{Bistable trigger: positive feedback via Cdc25 and double-negative feedback via Wee1}" }
    ],
    sections: [
      {
        heading: "1. Cyclin-CDK Complexes & Enzymatic Regulation",
        content: `Progression through eukaryotic cell cycle phases is driven by Cyclin-Dependent Kinases (CDKs):
- **Cyclin D - CDK4/6**: Early G1 phase (mitogen responsive).
- **Cyclin E - CDK2**: G1/S transition (restriction point passage).
- **Cyclin A - CDK2**: S phase progression (initiates DNA replication once per cycle).
- **Cyclin A / Cyclin B - CDK1**: G2/M transition and entry into mitosis.
- **Three-tier regulation of CDK1 (MPF)**:
  1. Cyclin B synthesis and binding to CDK1.
  2. **CAK (CDK-Activating Kinase)** phosphorylates CDK1 at Thr161 (activating mark).
  3. **Wee1 kinase** phosphorylates CDK1 at Thr14 and Tyr15 (inhibitory mark; holds MPF inactive during G2).
  4. At G2/M threshold, **Cdc25 phosphatase** removes the inhibitory phosphates from Thr14/Tyr15, activating CDK1.
  5. Active CDK1 phosphorylates and activates Cdc25 (positive feedback) while phosphorylating and inactivating Wee1 (double-negative feedback), creating an irreversible, switch-like bistable transition into mitosis!`
      },
      {
        heading: "2. The G1 Restriction Point: pRb and E2F",
        content: `The critical decision to commit to division occurs at the Restriction Point (Start in yeast):
- In quiescent (G0) or early G1 cells, **Retinoblastoma protein (pRb)** is unphosphorylated and binds transcription factor **E2F**, recruiting histone deacetylases (HDACs) to repress gene expression.
- Extracellular mitogens activate Ras-MAPK $\\to \\uparrow$ Cyclin D $\\to$ Cyclin D-CDK4/6 hypophosphorylates pRb.
- Hypophosphorylated pRb releases a small amount of E2F $\\to$ transcribes Cyclin E.
- Cyclin E-CDK2 hyperphosphorylates pRb in a positive feedback loop $\\to$ complete release of E2F.
- Free E2F drives transcription of S-phase genes: DNA polymerase $\\alpha$, thymidine kinase, PCNA, and Cyclin A.`
      },
      {
        heading: "3. DNA Damage Checkpoints: ATM/ATR, p53 & p21",
        content: `Surveillance mechanisms ensure genome integrity:
- **Double-Strand Breaks (DSBs)** activate **ATM kinase**; **Single-Stranded DNA / Stalled Stalls** activate **ATR kinase**.
- ATM/ATR phosphorylate and activate checkpoint kinases **Chk2 / Chk1**.
- Chk2/ATM phosphorylate tumor suppressor **p53** at Ser15/Ser20, preventing its association with **MDM2** (an E3 ubiquitin ligase that normally targets p53 for rapid proteasomal destruction).
- Stabilized tetrameric p53 acts as a transcription factor activating:
  - **p21 (CDKN1A)**: A CKI (CDK inhibitor) of the CIP/KIP family that binds and inhibits Cyclin E-CDK2 and Cyclin A-CDK2, arresting cells in G1.
  - **GADD45**: Promotes nucleotide excision repair.
  - If DNA damage is irreparable, p53 upregulates pro-apoptotic factors **Bax, Puma, and Noxa**.`
      },
      {
        heading: "4. Apoptosis: Intrinsic vs. Extrinsic Molecular Pathways",
        content: `Cell death must occur without inflammatory leakage:
- **Intrinsic (Mitochondrial) Pathway**:
  - Regulated by the Bcl-2 family:
    - *Anti-apoptotic*: Bcl-2, Bcl-xL, Mcl-1 (possess BH1–BH4 domains).
    - *Pro-apoptotic effectors*: Bax, Bak (possess BH1–BH3 domains).
    - *BH3-only sensors*: Bad, Bim, Bid, Puma, Noxa.
  - Under apoptotic stress, BH3-only proteins neutralize Bcl-2, allowing Bax/Bak to oligomerize in the outer mitochondrial membrane (MOMP - Mitochondrial Outer Membrane Permeabilization).
  - **Cytochrome $c$** is released into cytosol $\\to$ binds **Apaf-1** in presence of dATP $\\to$ forms a wheel-like heptameric **Apoptosome**!
  - Apoptosome recruits and activates initiator **Procaspase-9** via CARD domains.
  - Caspase-9 cleaves and activates executioner **Caspase-3 and Caspase-7**.
- **Extrinsic (Death Receptor) Pathway**:
  - FasL or TNF-$\\alpha$ binds trimeric death receptors (Fas / TNFR1) $\\to$ recruits **FADD** adaptor via death domains (DD) and death effector domains (DED).
  - Recruits and activates initiator **Procaspase-8 / Procaspase-10** (forming DISC - Death-Inducing Signaling Complex).
  - Caspase-8 directly activates Caspase-3, and cleaves **Bid into tBid**, which translocates to mitochondria to activate Bax/Bak (crosstalk linking extrinsic to intrinsic pathway).
- Executioner Caspase targets: ICAD (releases CAD endonuclease to cleave DNA into 180-200 bp ladder), Nuclear lamins (nuclear condensation), Actin/Focal adhesion kinase (cell shrinkage and blebbing).`
      }
    ]
  },

  {
    id: "cell-6-molecular-genetics",
    domainId: "cell_bio",
    title: "DNA Replication, Transcription & Translation Machinery",
    subtitle: "Replication Fork Dynamics, RNA Pol II CTD Code, Spliceosome, and Ribosomal Decoding",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["cell-5-checkpoints-apoptosis"],
    sources: ["Alberts MBoC Ch. 5-6 (DNA Replication, Transcription, Translation)", "Lodish MCB Ch. 4-5"],
    interactiveTool: null,
    summary: "Dissect the molecular architecture of the replication fork (helicase, primase, DNA pol III holoenzyme, sliding clamp, Okazaki fragments, DNA pol I, ligase), proofreading and mismatch repair (MutS/MutL), telomerase mechanism, prokaryotic vs eukaryotic transcription (RNA Pol I/II/III, TFIID/TBP/TFIIH/CTD phosphorylation Ser5/Ser2), 5' capping, splicing (snRNPs U1/U2/U4/U5/U6, branch point, lariat), 3' polyadenylation, and translation (70S vs 80S, A/P/E sites, wobble, aminoacyl-tRNA synthetases, EF-Tu/EF-G).",
    keyFormulas: [
      { name: "Replication Fork Speed (E. coli)", latex: "\\\\sim 1000 \\\\text{ nt/s} \\\\times 2 \\\\text{ forks} \\\\to \\\\sim 40 \\\\text{ min to replicate } 4.6 \\\\times 10^6 \\\\text{ bp genome}" },
      { name: "Replication Error Rate (after proofreading + MMR)", latex: "\\\\sim 10^{-9} \\\\text{ to } 10^{-10} \\\\text{ errors per base pair per replication}" }
    ],
    sections: [
      {
        heading: "1. Replication Fork Architecture & Leading/Lagging Strand Coordination",
        content: `The replisome is a molecular machine coordinating simultaneous synthesis of both daughter strands:
- **Helicase (DnaB in E. coli)**: Hexameric ring that encircles the lagging strand template and translocates 5'$\\\\to$3', unwinding the parental duplex at $\\\\sim$1000 nt/s. Powered by ATP/dTTP hydrolysis. Recruited to the origin by DnaA (initiator protein that recognizes 9-mer repeats in *oriC* and melts AT-rich 13-mer repeats).
- **Single-Stranded Binding Protein (SSB)**: Cooperative tetramers coat ssDNA, preventing reannealing, secondary structure formation, and nuclease degradation.
- **Primase (DnaG)**: Synthesizes short RNA primers ($\\\\sim$10–12 nt in E. coli, $\\\\sim$8–10 nt in eukaryotes) on the lagging strand template to provide a free 3'-OH for DNA polymerase.
- **DNA Pol III Holoenzyme** (E. coli): The replicative polymerase.
  - **$\\\\alpha$-subunit**: 5'$\\\\to$3' polymerase activity.
  - **$\\\\epsilon$-subunit**: 3'$\\\\to$5' proofreading exonuclease activity (removes misincorporated bases immediately).
  - **$\\\\beta$-sliding clamp (processivity factor)**: Ring-shaped dimer that encircles DNA and tethers Pol III to the template, conferring processivity of $\\\\gt 500{,}000$ nt before dissociation.
  - **$\\\\gamma$-complex (clamp loader)**: ATP-dependent; opens the $\\\\beta$-clamp ring and loads it onto primed template DNA at each new Okazaki fragment.
- **Lagging Strand Synthesis**: Okazaki fragments ($\\\\sim$1000–2000 nt in prokaryotes; $\\\\sim$100–200 nt in eukaryotes). After each fragment is completed:
  1. **DNA Pol I** (5'$\\\\to$3' exonuclease + polymerase): Removes the RNA primer via nick translation, replacing it with DNA.
  2. **DNA Ligase**: Seals the remaining nick by forming a phosphodiester bond (uses NAD$^+$ in E. coli; ATP in eukaryotes and T4 phage).
- **Eukaryotic Replication Fork Differences**: DNA Pol $\\\\alpha$/primase (initiates), Pol $\\\\epsilon$ (leading strand), Pol $\\\\delta$ (lagging strand), PCNA sliding clamp (homotrimer), RFC clamp loader, CMG helicase (Cdc45-MCM2-7-GINS, translocates 3'$\\\\to$5' on the leading strand template).`
      },
      {
        heading: "2. DNA Repair: Proofreading, Mismatch Repair, BER & NER",
        content: `Genome integrity requires overlapping repair mechanisms, each with distinct substrate specificities:
- **Proofreading (3'$\\\\to$5' Exonuclease)**: Built into replicative polymerases. Detects geometric distortion at the polymerase active site caused by mismatched Watson-Crick geometry. Transfers the primer terminus from the polymerase site to the exonuclease site. Reduces error rate from $\\\\sim 10^{-5}$ to $\\\\sim 10^{-7}$ per bp.
- **Mismatch Repair (MMR)**: Post-replicative correction system (reduces error rate to $\\\\sim 10^{-9}$–$10^{-10}$).
  - In E. coli: **MutS** (homodimer) recognizes mismatches and small insertion/deletion loops (IDLs).
  - MutS recruits **MutL** (homodimer), forming a ternary sliding complex.
  - **MutH** (endonuclease, E. coli-specific) nicks the unmethylated (newly synthesized) strand at hemimethylated **GATC** sites (Dam methylase methylates adenine).
  - Exonuclease degrades the nicked strand past the mismatch, and Pol III resynthesizes.
  - Eukaryotes: MSH2/MSH6 (MutS$\\\\alpha$, recognizes single-base mismatches) or MSH2/MSH3 (MutS$\\\\beta$, recognizes IDLs). MLH1/PMS2 (MutL$\\\\alpha$). No MutH homolog; strand discrimination uses pre-existing nicks or PCNA orientation. **Lynch syndrome**: germline mutations in MLH1/MSH2 cause hereditary nonpolyposis colorectal cancer (HNPCC) due to microsatellite instability.
- **Base Excision Repair (BER)**: Corrects small, non-helix-distorting base lesions (oxidation: 8-oxoguanine; deamination: uracil from cytosine deamination).
  - **DNA glycosylase** (e.g., Uracil-DNA Glycosylase / UNG) cleaves the N-glycosidic bond, creating an **AP (apurinic/apyrimidinic) site**.
  - **AP Endonuclease (APE1)** nicks the backbone 5' to the AP site. Repair synthesis by Pol $\\\\beta$ and ligation.
- **Nucleotide Excision Repair (NER)**: Corrects bulky, helix-distorting lesions (UV-induced cyclobutane pyrimidine dimers (CPDs), 6-4 photoproducts, benzo[a]pyrene adducts).
  - In E. coli: **UvrABC excinuclease** recognizes distortion, makes dual incisions (8 nt 5' and 4–5 nt 3' of lesion), and helicase UvrD removes the 12–13 nt oligonucleotide. Pol I fills; ligase seals.
  - In humans: **XP (xeroderma pigmentosum)** proteins (XPA–XPG). XPC-RAD23B recognizes distortion; TFIIH (XPB and XPD helicases) unwinds. XPG cuts 3'; ERCC1-XPF cuts 5'. Removes $\\\\sim$24–32 nt segment. Mutations in any XP gene cause extreme UV sensitivity and $\\\\gt$1000-fold elevated skin cancer risk.`
      },
      {
        heading: "3. Eukaryotic Transcription & RNA Processing",
        content: `Eukaryotic gene expression involves a highly regulated transcriptional machinery and extensive co-transcriptional RNA processing:
- **Three RNA Polymerases**: RNA Pol I (28S, 18S, 5.8S rRNA in nucleolus), RNA Pol II (all mRNAs, most snRNAs, miRNAs), RNA Pol III (tRNAs, 5S rRNA, U6 snRNA, 7SL RNA). Only Pol II transcripts receive a 5' cap and poly(A) tail.
- **Preinitiation Complex (PIC) Assembly at Pol II Promoters**:
  1. **TFIID** (contains **TBP**: TATA-Binding Protein) recognizes the TATA box ($\\\\sim$–25 to –30). TBP binds the minor groove, inducing a sharp $\\\\sim$80° bend in DNA. TAFs (TBP-Associated Factors) recognize other core promoter elements (Inr, DPE, MTE).
  2. **TFIIA** and **TFIIB** stabilize TBP-DNA binding. TFIIB positions Pol II at the transcription start site (+1).
  3. **Pol II** is recruited as a Pol II-TFIIF complex.
  4. **TFIIE** recruits **TFIIH** (a 10-subunit complex with two enzymatic activities):
     - **XPB/XPD helicases**: Melt $\\\\sim$11–15 bp around the start site (open complex formation).
     - **CDK7 kinase (CAK module)**: Phosphorylates Ser5 of the **CTD heptad repeats** (consensus Y$_1$S$_2$P$_3$T$_4$S$_5$P$_6$S$_7$, repeated 52 times in human Pol II). Ser5-P recruits the capping enzyme.
  5. **P-TEFb (CDK9/Cyclin T)**: Phosphorylates Ser2 of CTD heptad repeats during productive elongation. Ser2-P recruits splicing factors and the 3' processing/polyadenylation machinery.
- **5' Capping**: 7-methylguanosine cap ($m^7GpppN$) added co-transcriptionally when nascent RNA is $\\\\sim$20–30 nt long. Three enzymatic steps: (1) RNA 5' triphosphatase removes terminal phosphate, (2) guanylyltransferase adds GMP in 5'–5' linkage, (3) methyltransferase methylates guanine at N-7.
  - Cap functions: Protects mRNA from 5'$\\\\to$3' exonuclease degradation, recruits eIF4E for ribosome binding (cap-dependent translation initiation), promotes splicing of the first intron, and facilitates nuclear export via CBC (Cap-Binding Complex).
- **Polyadenylation**: Cleavage at the poly(A) signal (AAUAAA, recognized by CPSF; downstream GU-rich element recognized by CstF) followed by synthesis of $\\\\sim$200 adenylate residues by poly(A) polymerase (PAP). Poly(A) tail bound by PABP protects the 3' end from deadenylation and enhances translation initiation via PABP–eIF4G interaction (mRNA circularization / closed-loop model).`
      },
      {
        heading: "4. Translation & Ribosome Mechanics",
        content: `The ribosome is a ribozyme—catalysis of peptide bond formation is mediated by 23S rRNA (peptidyl transferase center), not protein:
- **Prokaryotic Ribosome**: 70S = 30S ($16S$ rRNA + 21 proteins) + 50S ($23S$ rRNA + $5S$ rRNA + 31 proteins).
- **Eukaryotic Ribosome**: 80S = 40S ($18S$ rRNA + 33 proteins) + 60S ($28S$ + $5.8S$ + $5S$ rRNAs + 46 proteins).
- **Aminoacyl-tRNA Synthetases**: 20 enzymes, each charging a specific tRNA with its cognate amino acid in a two-step reaction:
  1. Amino acid + ATP $\\\\to$ aminoacyl-AMP + PP$_i$ (adenylation).
  2. Aminoacyl-AMP + tRNA $\\\\to$ aminoacyl-tRNA + AMP.
  - Class I synthetases: Charge the 2'-OH of terminal adenosine (monomers, Rossmann fold). Class II: Charge the 3'-OH (dimers/tetramers, anti-parallel $\\\\beta$-sheet).
  - Proofreading: Editing site hydrolyzes mischarged amino acids (e.g., IleRS editing site rejects Val-tRNA$^{Ile}$).
- **Wobble Base Pairing** (Crick, 1966): Position 3 of the codon (5' of the anticodon) tolerates non-Watson-Crick pairing. Inosine (I) at anticodon position 1 can pair with U, C, or A at codon position 3. Explains why fewer than 61 tRNAs suffice for all sense codons.
- **Initiation (Prokaryotic)**: 30S binds mRNA; 16S rRNA anti-Shine-Dalgarno sequence (3'-AUUCCUCCACUAG-5') base-pairs with the Shine-Dalgarno sequence (5'-AGGAGG-3') upstream of AUG. fMet-tRNA$^{fMet}$ (formylmethionine) is delivered by **IF2-GTP** to the P-site. 50S joins; IF1 and IF3 are ejected.
- **Initiation (Eukaryotic)**: Cap-dependent scanning model. eIF4F complex (eIF4E binds cap, eIF4A is DEAD-box RNA helicase, eIF4G is scaffold) recruits 43S pre-initiation complex (40S + eIF1/1A/3/5 + Met-tRNA$_i^{Met}$·eIF2·GTP ternary complex). 43S scans 5'$\\\\to$3' until first AUG in optimal Kozak context (gcc**A/G**ccAUGG). 60S joins; eIF5B-GTP hydrolysis.
- **Elongation Cycle**:
  1. **Decoding (A-site)**: Aminoacyl-tRNA delivered by **EF-Tu·GTP** (eEF1A in eukaryotes). Correct codon-anticodon match triggers GTPase activation of EF-Tu; EF-Tu·GDP released. Kinetic proofreading: two sequential irreversible GTP hydrolysis steps (initial selection + proofreading) amplify discrimination beyond thermodynamic differences.
  2. **Peptidyl Transfer**: Peptidyl transferase center (23S rRNA) catalyzes nucleophilic attack of incoming amino group on the ester bond linking the growing polypeptide to the P-site tRNA. Mechanism: substrate-assisted catalysis involving the 2'-OH of the P-site tRNA A76 ribose.
  3. **Translocation**: **EF-G·GTP** (eEF2 in eukaryotes) catalyzes movement of the ribosome one codon in the 3' direction: deacylated tRNA moves P$\\\\to$E site; peptidyl-tRNA moves A$\\\\to$P site. EF-G·GDP dissociates.
- **Termination**: Stop codons (UAA, UAG, UGA) recognized by **Release Factors**: RF1 (UAA, UAG), RF2 (UAA, UGA) in prokaryotes; eRF1 (all three) in eukaryotes. RF inserts a GGQ motif into the peptidyl transferase center, promoting hydrolysis of the ester bond. RF3·GTP (eRF3) catalyzes RF1/RF2 dissociation. Ribosome recycling: RRF + EF-G in prokaryotes; ABCE1 ATPase in eukaryotes.`
      }
    ]
  },

  {
    id: "cell-7-microbiology",
    domainId: "cell_bio",
    title: "Prokaryotic Biology, Virology & Bacterial Genetics",
    subtitle: "Gram Staining, Flagellar Motor, Phage Life Cycles, Hfr Conjugation & Baltimore Classification",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: ["cell-6-molecular-genetics"],
    sources: ["Alberts MBoC Ch. 23-24 (Pathogens & Innate Immunity)", "Madigan: Brock's Biology of Microorganisms"],
    interactiveTool: null,
    summary: "Master prokaryotic cell architecture (Gram+/- cell wall with peptidoglycan NAG-NAM crosslinks, LPS outer membrane, teichoic acid), the flagellar motor (proton-motive force, MotA/MotB stators, hook/filament/basal body, run-tumble chemotaxis CheY), bacterial genetics (transformation/competence, F plasmid conjugation/Hfr interrupted mating, generalized vs specialized transduction), viral structure (capsid T-number, envelope), lytic vs lysogenic cycles (lambda phage cI repressor/cro), retrovirus life cycle (reverse transcriptase, integrase, provirus), Baltimore classification (7 groups), and prions (PrPc → PrPSc).",
    keyFormulas: [
      { name: "Flagellar Motor Rotation Speed", latex: "\\\\sim 300 \\\\text{ Hz (revolutions per second) in } E. coli \\\\text{; up to } \\\\sim 1700 \\\\text{ Hz in } Vibrio" }
    ],
    sections: [
      {
        heading: "1. Prokaryotic Cell Architecture: Gram-Positive vs. Gram-Negative",
        content: `The bacterial cell envelope is the primary target of antibiotics and the basis of Gram staining:
- **Peptidoglycan (Murein)**: A rigid mesh polymer of alternating **N-acetylglucosamine (NAG)** and **N-acetylmuramic acid (NAM)** linked by $\\\\beta$-1,4 glycosidic bonds. NAM carries a tetrapeptide side chain (L-Ala–D-Glu–meso-DAP/L-Lys–D-Ala). Cross-links between adjacent glycan chains occur via peptide bonds between the 3rd amino acid of one chain and the 4th (D-Ala) of another (direct in Gram-negatives; via pentaglycine bridge in *Staphylococcus aureus* Gram-positives).
  - **Lysozyme** cleaves the $\\\\beta$-1,4 bond between NAM and NAG. **Penicillin** inhibits transpeptidase (PBP, penicillin-binding protein), blocking cross-link formation.
- **Gram-Positive Envelope**:
  - Thick peptidoglycan layer ($\\\\sim$20–80 nm, up to 40 layers).
  - **Teichoic acids** (wall teichoic acid anchored to PG; lipoteichoic acid anchored to cytoplasmic membrane): Negatively charged polymers of glycerol phosphate or ribitol phosphate. Functions: cation homeostasis ($Mg^{2+}$ binding), cell wall rigidity, antigenic determinant.
  - Crystal violet–iodine complex is retained within thick PG during ethanol decolorization step $\\\\to$ **purple** stain.
- **Gram-Negative Envelope**:
  - Thin peptidoglycan layer ($\\\\sim$2–7 nm, 1–3 layers) in the **periplasmic space**.
  - **Outer Membrane (OM)**: An asymmetric lipid bilayer. Inner leaflet: phospholipids. Outer leaflet: **Lipopolysaccharide (LPS)**:
    - **Lipid A** (endotoxin): Glucosamine disaccharide with 6 fatty acyl chains. Triggers TLR4-mediated innate immune activation; responsible for septic shock (fever, hypotension, DIC).
    - **Core oligosaccharide**: Short chain of sugars including KDO (3-deoxy-D-manno-octulosonic acid).
    - **O-antigen**: Highly variable repeating oligosaccharide units; basis of serotyping.
  - **Porins**: Trimeric $\\\\beta$-barrel transmembrane proteins forming water-filled channels for passive diffusion of hydrophilic solutes $\\\\lt 600$ Da.
  - **Braun's lipoprotein**: Covalently links OM to PG.
  - Crystal violet washes out during ethanol decolorization; counterstain safranin $\\\\to$ **pink/red** stain.`
      },
      {
        heading: "2. The Bacterial Flagellar Motor & Chemotaxis",
        content: `The bacterial flagellum is one of the most sophisticated molecular machines in nature, a rotary motor driven by the proton-motive force (or $Na^+$-motive force in marine bacteria):
- **Structure (Gram-negative)**:
  - **Basal body**: Four rings—L ring (outer membrane), P ring (peptidoglycan), MS ring (cytoplasmic membrane), C ring (cytoplasmic, contains the switching complex FliG/FliM/FliN).
  - **Stator units**: **MotA/MotB** complexes (11–13 stator units per motor) anchored to the peptidoglycan. MotA is a proton channel; each proton transit through MotA drives a conformational change that exerts torque on the FliG ring.
  - **Rod**: Rigid shaft passing through the basal body rings.
  - **Hook**: A flexible universal joint ($\\\\sim$55 nm, composed of FlgE subunits).
  - **Filament**: Long helical structure ($\\\\sim$5–10 $\\\\mu$m) composed of $\\\\sim$20{,}000 flagellin (FliC) subunits. Growth occurs at the distal tip, with FliC monomers exported through the hollow core via a Type III secretion system.
- **Rotation**: E. coli flagellar motor rotates at $\\\\sim$300 Hz, generating torque of $\\\\sim$4{,}600 pN·nm. Can switch direction:
  - **Counterclockwise (CCW) rotation** (viewed from outside): Flagella form a coherent left-handed helical bundle $\\\\to$ **run** (smooth, directed swimming at $\\\\sim$25 $\\\\mu$m/s).
  - **Clockwise (CW) rotation**: Bundle flies apart $\\\\to$ **tumble** (random reorientation).
- **Chemotaxis Signal Transduction**:
  - Methyl-accepting chemotaxis proteins (MCPs, e.g., Tar for aspartate, Tsr for serine) form trimers of dimers in polar clusters.
  - In absence of attractant: MCP activates histidine kinase **CheA** (bound via adaptor **CheW**).
  - CheA autophosphorylates and transfers phosphoryl group to **CheY**.
  - **CheY-P** diffuses to the flagellar switch complex (FliM) and promotes **CW rotation** (tumbling).
  - Attractant binding to MCP $\\\\to$ inhibits CheA $\\\\to$ less CheY-P $\\\\to$ CCW rotation (smooth runs up the attractant gradient).
  - **CheZ** (phosphatase): Rapidly dephosphorylates CheY-P, allowing fast signal termination.
  - **Adaptation (Exact Adaptation)**: **CheR** (methyltransferase) adds methyl groups to MCPs, restoring CheA activity. **CheB** (methylesterase, activated by CheA phosphorylation) removes methyl groups. This integral feedback loop ensures the system responds to *changes* in concentration, not absolute levels.`
      },
      {
        heading: "3. Bacterial Genetic Exchange: Transformation, Conjugation & Transduction",
        content: `Horizontal gene transfer is the primary driver of bacterial evolution and antibiotic resistance dissemination:
- **Transformation**: Uptake of free, naked DNA from the environment.
  - **Natural competence** in *Streptococcus pneumoniae* (Griffith's experiment, 1928; Avery-MacLeod-McCarty, 1944): Competence-stimulating peptide (CSP) quorum sensing $\\\\to$ ComD/ComE two-component system $\\\\to$ expression of competence genes. dsDNA binds the cell surface; one strand is degraded by endonuclease; the remaining ssDNA is threaded through a pseudopilus-associated channel and integrated by RecA-mediated homologous recombination.
  - *Bacillus subtilis*: ComK master regulator; DNA uptake via ComGA/ComGC pseudopilus.
  - **Artificial competence**: CaCl$_2$ treatment (chemical competence) or electroporation to introduce plasmid DNA.
- **Conjugation**: Cell-to-cell DNA transfer via direct contact.
  - **F Plasmid** ($\\\\sim$100 kb): Encodes the **F pilus** (Type IV secretion system). F$^+$ donor extends pilus to F$^-$ recipient, retracts it to bring cells into contact, forms a **mating bridge** (conjugation junction).
  - **Rolling-circle replication**: Relaxase (TraI) nicks one strand of the F plasmid at the **oriT** site, covalently attaches to the 5' end via a phosphotyrosine linkage, and the nicked strand is transferred 5'$\\\\to$3' into the recipient through the Type IV secretion channel. Complementary strand is synthesized in both donor and recipient.
  - **Hfr (High-frequency recombination)**: F plasmid integrates into the bacterial chromosome via homologous recombination at IS elements. During conjugation, Hfr transfers chromosomal genes adjacent to the integrated oriT. Transfer begins at oriT and proceeds linearly.
    - **Interrupted Mating Experiment**: Blender disruption at timed intervals maps gene order and distance. Genes closest to oriT transfer first. Complete chromosome transfer takes $\\\\sim$100 minutes in E. coli but is rarely completed; most recombinants receive only proximal markers.
  - **F' (F-prime)**: Imprecise excision of integrated F from Hfr $\\\\to$ F plasmid now carries adjacent chromosomal genes (sexduction). F' can transfer these genes at high frequency to recipients (merodiploids for complementation analysis).
- **Transduction**:
  - **Generalized Transduction**: During lytic phage replication (e.g., P1 in E. coli), host DNA is fragmented. Occasionally, a phage head accidentally packages a random fragment of host DNA ($\\\\sim$100 kb for P1) instead of phage DNA. The resulting *transducing particle* injects host DNA into a new recipient, where it recombines into the chromosome. Any gene can be transferred; frequency $\\\\sim 10^{-6}$ per phage.
  - **Specialized Transduction**: Restricted to temperate phages that integrate at specific chromosomal sites (e.g., $\\\\lambda$ phage integrates between *gal* and *bio* operons via integrase-mediated recombination between phage *attP* and bacterial *attB*). Aberrant excision produces a defective phage carrying adjacent chromosomal genes (*$\\\\lambda$dgal* or *$\\\\lambda$dbio*). Only genes flanking the prophage insertion site can be transduced.`
      },
      {
        heading: "4. Virology & Baltimore Classification",
        content: `Viruses are classified by genome type and replication strategy (David Baltimore, 1971):
- **Viral Structure**: Obligate intracellular parasites. Core components: nucleic acid genome + protein capsid (icosahedral, helical, or complex). Many animal viruses also possess a **lipid envelope** derived from host membranes, studded with viral glycoproteins (e.g., influenza HA/NA, HIV gp120/gp41).
  - **Icosahedral Capsid Geometry**: **Triangulation number (T-number)** = $h^2 + hk + k^2$ (where $h$, $k$ are non-negative integers). Determines the number of capsomers: 60T subunits total, 12 pentamers + $10(T-1)$ hexamers. T=1: 60 subunits (smallest, e.g., satellite tobacco necrosis virus). T=3: 180 subunits (e.g., tomato bushy stunt virus). T=25: adenovirus.
- **Baltimore Classification (7 Groups)**:
  - **Group I: dsDNA** (e.g., Herpesvirus, Adenovirus, Bacteriophage T4). Replication uses host or viral DNA-dependent DNA polymerase.
  - **Group II: ssDNA** (e.g., Parvovirus [−sense], $\\\\phi$X174 [+sense], M13). Convert to dsDNA replicative form before transcription.
  - **Group III: dsRNA** (e.g., Reovirus, Rotavirus). Segmented genomes. Viral RNA-dependent RNA polymerase (RdRp) transcribes −sense strand of each segment into +sense mRNA.
  - **Group IV: (+)ssRNA** (e.g., Poliovirus, SARS-CoV-2, TMV). Genome directly serves as mRNA; translated immediately upon entry. Encodes RdRp for replication via (−)ssRNA intermediate.
  - **Group V: (−)ssRNA** (e.g., Influenza, Ebola, Rabies). Genome is anti-sense; must carry RdRp within the virion to transcribe (+)sense mRNA.
  - **Group VI: (+)ssRNA-RT (Retroviruses)** (e.g., HIV, HTLV). Diploid (+)ssRNA genome. **Reverse transcriptase (RT)** synthesizes dsDNA copy (cDNA) in cytoplasm. **Integrase** inserts dsDNA (provirus) into host chromosome. Proviral DNA is transcribed by host RNA Pol II to produce genomic RNA and mRNAs.
  - **Group VII: dsDNA-RT (Pararetroviruses)** (e.g., Hepatitis B, Cauliflower Mosaic Virus). dsDNA genome with RNA intermediate. Host RNA Pol II transcribes a pregenomic RNA (pgRNA); viral RT reverse-transcribes pgRNA back to dsDNA within the capsid.
- **Bacteriophage $\\\\lambda$ Lysis-Lysogeny Decision**:
  - **Lytic pathway**: Activated by **Cro protein** binding to operator $O_R$ (preferentially $O_{R3}$ first), repressing *cI* transcription.
  - **Lysogenic pathway**: **cI Repressor** (also called $\\\\lambda$ repressor) binds cooperatively to $O_{R1}$ and $O_{R2}$, repressing lytic genes ($cro$, replication, lysis) while positively autoregulating its own transcription from $P_{RM}$.
  - **Prophage induction**: DNA damage $\\\\to$ RecA stimulates autocleavage of cI repressor (similar to LexA cleavage in SOS response) $\\\\to$ derepression of lytic genes $\\\\to$ excision and lytic replication.
- **Prions**: Infectious proteinaceous particles lacking nucleic acid. PrP$^C$ (normal, $\\\\alpha$-helix-rich cellular prion protein, GPI-anchored) undergoes conformational conversion to PrP$^{Sc}$ (pathogenic, $\\\\beta$-sheet-rich, protease-resistant, amyloid-forming). PrP$^{Sc}$ acts as a template, catalyzing autocatalytic conversion of PrP$^C$ $\\\\to$ PrP$^{Sc}$. Causes transmissible spongiform encephalopathies: Creutzfeldt-Jakob disease (CJD), bovine spongiform encephalopathy (BSE / mad cow), scrapie (sheep), kuru (human, ritualistic cannibalism).`
      }
    ]
  },

  {
    id: "cell-8-biotechnology",
    domainId: "cell_bio",
    title: "Molecular Biotechnology: PCR, CRISPR & Recombinant DNA",
    subtitle: "Restriction Mapping, Blue-White Screening, Sanger vs NGS, and CRISPR-Cas9 HDR",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: ["cell-6-molecular-genetics"],
    sources: ["Alberts MBoC Ch. 8 (Analyzing Cells, Molecules, and Systems)", "Pierce Genetics Ch. 19"],
    interactiveTool: null,
    summary: "Master Type II restriction enzymes (palindromic recognition, sticky vs blunt ends), plasmid vectors (ori, MCS, selectable markers, lacZ alpha-complementation/X-gal blue-white screening), cDNA vs genomic libraries, PCR (Taq polymerase, primer design, Tm = 4(G+C)+2(A+T), thermal cycling, RT-qPCR with SYBR/TaqMan), gel electrophoresis (agarose for DNA, PAGE for proteins, ethidium bromide intercalation), Southern/Northern/Western blotting, Sanger dideoxy sequencing, NGS (Illumina bridge amplification), CRISPR-Cas9 (gRNA 20nt spacer, PAM NGG, DSB → NHEJ knockout or HDR knock-in with donor template), RNAi (Dicer, siRNA, RISC/Ago2), and GFP/fluorescent reporters.",
    keyFormulas: [
      { name: "Melting Temperature (Wallace Rule, short oligos)", latex: "T_m = 4(G+C) + 2(A+T) \\\\text{ °C (for primers } \\\\leq 20 \\\\text{ nt)}" },
      { name: "PCR Amplification", latex: "N = N_0 \\\\times 2^n \\\\text{ (theoretical; } n = \\\\text{number of cycles)}" }
    ],
    sections: [
      {
        heading: "1. Restriction Enzymes & Cloning",
        content: `Recombinant DNA technology depends on the precise cutting and joining of DNA molecules:
- **Type II Restriction Endonucleases**: Recognize specific palindromic sequences (4–8 bp) and cleave within or near the recognition site. Require $Mg^{2+}$ as cofactor.
  - **Sticky (cohesive) ends**: Staggered cuts producing short single-stranded overhangs (e.g., EcoRI: 5'-G$\\downarrow$AATTC-3' / 3'-CTTAA$\\uparrow$G-5' $\\\\to$ 4-nt 5' overhangs). Compatible sticky ends from any source can be ligated, enabling recombinant DNA construction.
  - **Blunt ends**: Cuts directly through the axis of symmetry (e.g., SmaI: 5'-CCC$\\downarrow$GGG-3'). Lower ligation efficiency; can ligate any blunt-ended fragments regardless of origin.
  - **Isoschizomers**: Different enzymes recognizing the same sequence (e.g., HpaII and MspI both recognize CCGG but differ in methylation sensitivity). **Neoschizomers** cut at different positions within the same site.
- **Plasmid Vectors**: Small, circular, autonomously replicating dsDNA.
  - **Origin of replication (ori)**: e.g., pUC ori (high copy, $\\\\sim$500–700 copies/cell), pBR322 ori ($\\\\sim$15–20 copies/cell), pSC101 ori ($\\\\sim$5 copies/cell).
  - **Selectable marker**: Antibiotic resistance gene (e.g., $amp^R$ / $\\\\beta$-lactamase, $kan^R$ / aminoglycoside phosphotransferase).
  - **Multiple Cloning Site (MCS / polylinker)**: Clustered unique restriction sites for insert cloning. Located within the **lacZ$\\\\alpha$** gene fragment.
  - **Blue-White Screening (Insertional Inactivation)**:
    - Vector carries lacZ$\\\\alpha$ fragment; host strain carries lacZ$\\\\Delta$M15 deletion. Together they reconstitute functional $\\\\beta$-galactosidase via **$\\\\alpha$-complementation**.
    - Insertion of foreign DNA into the MCS disrupts lacZ$\\\\alpha$ $\\\\to$ no $\\\\alpha$-complementation $\\\\to$ no functional $\\\\beta$-galactosidase.
    - On plates with IPTG (inducer) and **X-gal** (chromogenic substrate: 5-bromo-4-chloro-3-indolyl-$\\\\beta$-D-galactopyranoside): $\\\\beta$-galactosidase cleaves X-gal $\\\\to$ blue precipitate. Recombinants (insert present) form **white colonies**; non-recombinants (self-ligated vector) form **blue colonies**.
- **cDNA vs. Genomic Libraries**:
  - **cDNA library**: Reverse transcriptase converts mRNA $\\\\to$ cDNA (represents only expressed genes in that tissue/condition; lacks introns, promoters, enhancers). Requires oligo(dT) priming from poly(A) tail or random hexamer priming.
  - **Genomic library**: Complete genome fragmented by partial restriction digest or mechanical shearing. Cloned into high-capacity vectors (BACs: $\\\\sim$100–300 kb inserts; YACs: $\\\\sim$200–2000 kb inserts; cosmids: $\\\\sim$35–45 kb; fosmids: $\\\\sim$40 kb).
  - **Library coverage formula**: $N = \\\\frac{\\\\ln(1-P)}{\\\\ln(1-f)}$ where $P$ = probability of any given sequence being represented, $f$ = fractional proportion of genome per clone.`
      },
      {
        heading: "2. PCR & Quantitative PCR",
        content: `The polymerase chain reaction amplifies a specific DNA target exponentially from minute quantities of template:
- **Standard PCR Components**: Template DNA, two synthetic oligonucleotide primers (forward and reverse, flanking the target), dNTPs, thermostable DNA polymerase (**Taq**: from *Thermus aquaticus*, optimal at 72°C; lacks proofreading $\\\\to$ error rate $\\\\sim 10^{-4}$/bp/cycle; use **Pfu** or **Phusion** for high-fidelity applications with 3'$\\\\to$5' exonuclease proofreading), $MgCl_2$ buffer.
- **Thermal Cycling**:
  1. **Denaturation**: 94–98°C, $\\\\sim$30 s. Melts dsDNA template into ssDNA.
  2. **Annealing**: 50–65°C (depends on primer $T_m$), $\\\\sim$30 s. Primers hybridize to complementary template strands.
  3. **Extension**: 72°C, $\\\\sim$1 min/kb. Taq extends primers in the 5'$\\\\to$3' direction, incorporating dNTPs.
  - After $n$ cycles: Theoretical yield $= 2^n$ copies (e.g., 30 cycles $= 2^{30} \\\\approx 10^9$ copies). In practice, amplification efficiency $E$ ranges from 0.7 to 1.0 per cycle; actual yield $= (1+E)^n$.
- **Primer Design Rules**:
  - Length: 18–25 nt. $T_m$: 55–65°C. GC content: 40–60%. Avoid self-complementarity, hairpins, primer-dimers.
  - **Wallace Rule** (short oligos $\\\\leq$ 20 nt): $T_m = 4(G+C) + 2(A+T)$ °C.
  - **Nearest-Neighbor Method** (more accurate): $T_m = \\\\frac{\\\\Delta H}{\\\\Delta S + R \\\\ln(C_T/4)} - 273.15$ where $\\\\Delta H$ and $\\\\Delta S$ are enthalpy and entropy sums of nearest-neighbor dinucleotide stacking parameters, $R = 1.987$ cal/(mol·K), and $C_T$ = total strand concentration.
- **RT-qPCR (Reverse Transcription Quantitative PCR)**:
  - Reverse transcriptase converts mRNA to cDNA; followed by real-time quantitative PCR.
  - **Detection chemistries**:
    - **SYBR Green**: Intercalating fluorescent dye that binds dsDNA nonspecifically. Cheap but detects all dsDNA (including primer-dimers and nonspecific products). Melt curve analysis required for specificity validation.
    - **TaqMan (Hydrolysis Probe)**: Sequence-specific probe with 5' fluorescent reporter and 3' quencher. During extension, Taq's 5'$\\\\to$3' exonuclease activity cleaves the probe, separating reporter from quencher $\\\\to$ fluorescence signal. Highly specific.
  - **$C_t$ (Threshold Cycle)**: Cycle number at which fluorescence exceeds background threshold. Lower $C_t$ = more starting template.
  - **$\\\\Delta\\\\Delta C_t$ Method** for relative quantification: Fold change $= 2^{-\\\\Delta\\\\Delta C_t}$, where $\\\\Delta\\\\Delta C_t = (C_{t,\\\\text{target}} - C_{t,\\\\text{ref}})_{\\\\text{treated}} - (C_{t,\\\\text{target}} - C_{t,\\\\text{ref}})_{\\\\text{control}}$. Assumes amplification efficiency $= 100\\\\%$ for both target and reference genes.`
      },
      {
        heading: "3. Electrophoresis & Blotting Techniques",
        content: `Separation and detection of nucleic acids and proteins by size:
- **Agarose Gel Electrophoresis (DNA/RNA)**:
  - Agarose concentration: 0.5–2.0% (lower % resolves larger fragments: 0.5% for 1–30 kb; 2% for 100 bp–2 kb).
  - DNA is uniformly negatively charged (phosphodiester backbone) $\\\\to$ migrates toward the anode (+). Migration rate is inversely proportional to $\\\\log_{10}$(molecular weight) for linear dsDNA.
  - **Ethidium bromide (EtBr)**: Classic intercalating fluorescent stain. Inserts between stacked base pairs, fluoresces under UV ($\\\\lambda_{ex}$ = 302 nm, $\\\\lambda_{em}$ = 590 nm). Being replaced by safer alternatives (SYBR Safe, GelRed).
  - **Supercoiled plasmid migration**: On standard agarose gels, supercoiled (Form I) migrates fastest (compact), relaxed circular (Form II, nicked) migrates slowest, and linearized (Form III) migrates at a rate proportional to its size.
  - **Pulsed-Field Gel Electrophoresis (PFGE)**: Alternating electric field directions. Resolves very large DNA molecules (50 kb – 10 Mb) that cannot migrate through standard agarose (too large to reptate through pores at a constant field angle). Used for bacterial genome fingerprinting (epidemiological typing).
- **SDS-PAGE (Proteins)**:
  - Sodium dodecyl sulfate (SDS) denatures proteins and coats them uniformly with negative charge ($\\\\sim$1.4 g SDS/g protein), masking intrinsic charge differences. Migration depends solely on molecular weight.
  - Polyacrylamide percentage: 7.5–15% (higher % for smaller proteins). Stained with Coomassie Brilliant Blue (detection limit $\\\\sim$0.1 $\\\\mu$g) or silver stain (detection limit $\\\\sim$1 ng).
  - **Native PAGE**: No SDS; proteins migrate based on charge, size, and shape (retains native conformation and enzyme activity).
- **Blotting Techniques**:
  - **Southern Blot** (Edwin Southern, 1975): DNA separated by gel electrophoresis $\\\\to$ transferred to nitrocellulose/nylon membrane $\\\\to$ hybridized with labeled DNA probe (radioactive $^{32}$P or non-radioactive DIG/biotin). Detects specific DNA sequences, restriction fragment length polymorphisms (RFLPs), transgene integration.
  - **Northern Blot**: Same principle for RNA. Detects specific mRNA transcripts, transcript size, and expression levels. RNA must be run on denaturing formaldehyde-agarose gel (disrupts secondary structure).
  - **Western Blot (Immunoblot)**: Proteins separated by SDS-PAGE $\\\\to$ transferred to PVDF or nitrocellulose membrane $\\\\to$ probed with primary antibody (specific for target protein) and enzyme-conjugated secondary antibody (HRP or AP). Detection by chemiluminescence (ECL), colorimetric (DAB/BCIP-NBT), or fluorescent substrates.
  - Mnemonic: **S**outhern = DNA, **N**orthern = RNA, **W**estern = protein (named by convention: Southern was the inventor; Northern and Western are playful derivatives).`
      },
      {
        heading: "4. CRISPR-Cas9 & Modern Genome Editing",
        content: `CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats) revolutionized genome engineering:
- **Natural CRISPR-Cas Adaptive Immunity in Prokaryotes**:
  - **Adaptation**: Cas1-Cas2 complex captures short fragments of invading phage/plasmid DNA (protospacers) and integrates them as new spacers into the CRISPR locus.
  - **Expression**: CRISPR locus is transcribed into a long pre-crRNA, processed into individual **crRNAs** (each containing one spacer sequence).
  - **Interference**: crRNA guides Cas effector proteins to complementary foreign DNA. In Type II systems, crRNA base-pairs with **tracrRNA** (trans-activating crRNA) and associates with **Cas9** endonuclease.
- **Engineered CRISPR-Cas9 System** (Jinek et al., 2012; Doudna & Charpentier):
  - crRNA and tracrRNA fused into a single chimeric **guide RNA (gRNA / sgRNA)** with a 20-nt **spacer sequence** complementary to the target.
  - Cas9 (from *Streptococcus pyogenes*, SpCas9) is a bilobed protein with two nuclease domains:
    - **RuvC domain**: Cleaves the non-target strand (the strand NOT base-paired with the gRNA).
    - **HNH domain**: Cleaves the target strand (the strand base-paired with the gRNA).
  - **PAM (Protospacer Adjacent Motif)**: SpCas9 requires a 5'-**NGG**-3' PAM immediately 3' of the target sequence on the non-target strand. PAM recognition is essential for Cas9 binding and DNA unwinding (R-loop formation). No PAM $\\\\to$ no cleavage (prevents self-targeting of the CRISPR locus, which lacks PAMs adjacent to spacers).
  - Cas9 generates a **blunt-ended double-strand break (DSB)** 3 bp upstream of the PAM.
- **Cellular Repair Outcomes**:
  - **NHEJ (Non-Homologous End Joining)**: Error-prone; Ku70/Ku80 and DNA Ligase IV rejoin broken ends with insertions or deletions (indels) $\\\\to$ frameshift mutations $\\\\to$ **gene knockout**. Dominant pathway; active throughout the cell cycle.
  - **HDR (Homology-Directed Repair)**: High-fidelity; requires a donor template (dsDNA or ssODN) with homology arms flanking the desired edit $\\\\to$ precise **gene knock-in**, point mutations, epitope tags, reporter fusions. Active only in S/G2 phases when sister chromatid is available as template. Efficiency: typically 5–50% depending on cell type and delivery method.
- **Cas9 Variants & Derivatives**:
  - **Cas9 nickase (Cas9n)**: D10A mutation inactivates RuvC domain; only HNH nicks the target strand. Paired nickases (two gRNAs targeting opposite strands offset by 20–60 bp) create a staggered DSB with dramatically reduced off-target effects.
  - **dCas9 (dead Cas9)**: Both D10A and H840A mutations; catalytically inactive. Fused to transcriptional activators (**CRISPRa**: VP64, p65, Rta) or repressors (**CRISPRi**: KRAB domain) for programmable gene regulation without DNA cleavage.
  - **Base Editors**: dCas9 or Cas9n fused to a cytidine deaminase (CBE: C$\\\\to$T / G$\\\\to$A) or adenosine deaminase (ABE: A$\\\\to$G / T$\\\\to$C). Enables precise point mutations without DSBs.
  - **Prime Editing**: Cas9 H840A nickase fused to an engineered reverse transcriptase. pegRNA encodes both the target-binding spacer and the desired edit as an RT template. Enables all 12 point mutations, small insertions, and small deletions without DSBs or donor templates.
- **RNA Interference (RNAi)**:
  - **Dicer** (RNase III family): Cleaves long dsRNA or pre-miRNA hairpins into $\\\\sim$21-nt **siRNA** (small interfering RNA) or **miRNA** duplexes with 2-nt 3' overhangs.
  - Guide strand is loaded into **RISC (RNA-Induced Silencing Complex)** containing **Argonaute 2 (Ago2)**.
  - siRNA: Perfect complementarity $\\\\to$ Ago2 Slicer activity cleaves target mRNA between positions 10–11 of the guide $\\\\to$ mRNA degradation (**post-transcriptional gene silencing**).
  - miRNA: Partial complementarity (seed region: nt 2–8 of miRNA binds 3' UTR of target mRNA) $\\\\to$ translational repression and mRNA deadenylation/decay via GW182/TNRC6 and CCR4-NOT complex.`
      }
    ]
  },

  // ==================== DOMAIN 2: PLANT ANATOMY & PHYSIOLOGY (15%) ====================
  {
    id: "plant-1-hydraulics",
    domainId: "plant_bio",
    title: "Plant Water Relations, Cavitation & Pit Membrane Mechanics",
    subtitle: "Water Potential Thermodynamics, Scholander Pressure, Bordered Pits, and Xylem Embolism",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: [],
    sources: ["Taiz & Zeiger Ch. 3-4 (Water & Mineral Nutrition)", "Raven's Biology of Plants Ch. 23-25"],
    interactiveTool: null,
    summary: "Master the biophysics of water potential (solute, pressure, matric, gravitational), the cohesion-tension theory, vulnerability curves (P50), air seeding through pit membranes, and the anatomical adaptations of gymnosperm torus-margo pits versus angiosperm scalariform/simple perforation plates.",
    keyFormulas: [
      { name: "Total Water Potential", latex: "\\Psi_w = \\Psi_s + \\Psi_p + \\Psi_g" },
      { name: "Van 't Hoff Solute Potential", latex: "\\Psi_s = -i C R T" },
      { name: "Capillary Radius & Air-Seeding Pressure", latex: "\\Delta P = \\frac{2 \\gamma \\cos \\theta}{r_p} \\text{ (Young-Laplace air-seeding equation)}" }
    ],
    sections: [
      {
        heading: "1. Water Potential Components & Scholander Chamber",
        content: `Water moves from regions of higher (less negative) water potential to lower (more negative) water potential:
$$\\Psi_w = \\Psi_s + \\Psi_p + \\Psi_g$$
- $\\Psi_s$ (solute/osmotic potential): Zero for pure water, negative in solution.
- $\\Psi_p$ (hydrostatic pressure potential): Positive in turgid cells (turgor pressure); **negative (tension)** inside xylem conduits under transpiration!
- $\\Psi_g$ (gravitational potential): $+0.01\\text{ MPa per meter}$ of elevation ($0.1\\text{ bar/m}$). For a 100-meter redwood (*Sequoia sempervirens*), $\\Psi_g = +1.0\\text{ MPa}$, setting a physical biophysical limit on maximum tree height ($\sim 122-130\\text{ m}$).
- **The Scholander Pressure Bomb**:
  - A excised leafy twig is sealed in a steel chamber with the cut petiole exposed to atmosphere.
  - Pressurized nitrogen gas is applied to the chamber until the xylem sap meniscus just returns to the cut surface.
  - The balancing pressure applied ($P_{\\text{applied}}$) equals the negative hydrostatic pressure (tension) in the xylem immediately prior to excision: $\\Psi_{p,\\text{xylem}} = -P_{\\text{applied}}$.`
      },
      {
        heading: "2. Cohesion-Tension Theory & Xylem Vulnerability Curves",
        content: `Water is pulled under continuous negative pressure (metastable state):
- Evaporation at the menisci of mesophyll cell walls generates extreme capillary tension (radius of curvature $r \\approx 5-10\\text{ nm} \\to$ capillary tension $\\approx -1.5$ to $-3.0\\text{ MPa}$).
- **Cavitation**: If tension exceeds a threshold, dissolved gases nucleate or air is pulled across pit membranes (**air seeding**), forming a vapor bubble (embolism) that breaks the continuous water column.
- **Xylem Vulnerability Curves**:
  - Plot percentage loss of hydraulic conductivity (PLC) versus xylem water tension ($\\Psi_x$).
  - Characterized by the **$P_{50}$ parameter**: the xylem water potential causing a $50\\%$ loss of conductivity.
  - Mesic species have high $P_{50}$ (e.g., $-1.5\\text{ MPa}$); desert xerophytes (*Juniperus*, *Artemisia*) withstand severe tensions ($P_{50} < -8.0\\text{ MPa}$).`
      },
      {
        heading: "3. Anatomical Adaptations: Torus-Margo Pits vs. Vessel Elements",
        content: `Gymnosperms vs Angiosperms exhibit distinct hydraulic architectures:
- **Conifer Tracheids & Torus-Margo Pits**:
  - Tracheids are single, imperforate cells with closed end walls.
  - Inter-tracheid bordered pit pairs feature a specialized membrane:
    - **Margo**: A porous, spoke-like meshwork of cellulose microfibrils permeable to water.
    - **Torus**: An impermeable, thickened central cushion.
  - *Valve action*: When a tracheid cavitates, the massive pressure difference aspirates the torus against the overarching pit border, sealing the pit aperture and preventing air from spreading to adjacent intact tracheids!
- **Angiosperm Vessel Elements**:
  - Wide, hollow cylinders stacked end-to-end with open **perforation plates** (scalariform or simple).
  - High hydraulic conductivity (Hagen-Poiseuille flow rate scales with fourth power of conduit radius: $Q \\propto r^4$).
  - Trade-off: Much more vulnerable to freeze-thaw-induced cavitation and air-seeding than narrow conifer tracheids!`
      }
    ]
  },

  {
    id: "plant-2-photochemistry",
    domainId: "plant_bio",
    title: "Photochemistry: Z-Scheme, Kok Cycle & Cyclic Electron Flow",
    subtitle: "Photosystem II, Oxygen-Evolving Complex Mn4CaO5 Cluster, Cyt b6f, and PSI",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["plant-1-hydraulics"],
    sources: ["Taiz & Zeiger Ch. 7-8 (Photosynthesis: Light & Carbon Reactions)"],
    interactiveTool: "z_scheme_photosystem_explorer",
    summary: "Deconstruct the biophysics of photosynthetic electron transport: the Kok S-state clock of the oxygen-evolving Mn4CaO5 cluster, charge separation at P680 and P700, plastoquinol oxidation at Cyt b6f, cyclic vs non-cyclic photophosphorylation, and the regulation of non-photochemical quenching (NPQ/qE).",
    keyFormulas: [
      { name: "Water Splitting Reaction", latex: "2 \\text{H}_2\\text{O} \\xrightarrow{4 h\\nu} \\text{O}_2 + 4 \\text{H}^+_{\\text{lumen}} + 4 e^-" },
      { name: "Kok Cycle S-State Transitions", latex: "S_0 \\xrightarrow{h\\nu} S_1 \\xrightarrow{h\\nu} S_2 \\xrightarrow{h\\nu} S_3 \\xrightarrow{h\\nu} [S_4] \\to S_0 + \\text{O}_2" },
      { name: "Cyclic Electron Flow Balance", latex: "\\text{PSI} \\to \\text{Ferredoxin} \\to \\text{PGR5/NDH} \\to \\text{Plastoquinone} \\to \\text{Cyt } b_6f \\to \\text{Plastocyanin} \\to \\text{PSI}" }
    ],
    sections: [
      {
        heading: "1. The Oxygen-Evolving Complex (OEC) & The Kok Cycle",
        content: `Water oxidation occurs at the catalytic center of Photosystem II:
- The catalytic cofactor is a distorted cubane cluster: **$\\text{Mn}_4\\text{CaO}_5$**.
- Driven by light flashes, the OEC steps through five intermediate oxidation states ($S_0$ through $S_4$):
  - In dark-adapted chloroplasts, the stable ground state is predominantly $S_1$ (not $S_0$, because $S_1$ is thermodynamically stable in the dark).
  - Each single turnover flash extracts 1 electron via a redox-active tyrosine residue ($Y_Z$, Tyr161 of the D1 protein).
  - Upon reaching the transient $S_4$ state after four flashes, two coordinated water molecules form an O-O bond, releasing $1 \\text{ O}_2$ and $4 \\text{ H}^+$ into the thylakoid lumen, resetting the cluster to $S_0$.
  - **Diagnostic Flash-Yield Pattern**: When dark-adapted leaves are exposed to a train of microsecond flashes, oxygen evolution peaks on the **3rd flash**, and subsequently exhibits a **periodicity of 4** (flashes 7, 11, 15...). The oscillation dampens over time due to photochemical misses ($\sim 10\\%$) and double-hits.`
      },
      {
        heading: "2. The Z-Scheme Redox Energetics",
        content: `Excitation and sequential electron transfers:
1. **P680** (PSII special pair of chlorophylls) absorbs $680\\text{ nm}$ photon $\\to P680^*$.
   - $P680^*$ transfers an electron within 3 picoseconds to **Pheophytin** (chlorophyll lacking central $Mg^{2+}$).
   - Pheophytin transfers electron to firmly bound plastoquinone **$Q_A$**, which transfers to mobile plastoquinone **$Q_B$**.
   - $P680^+$ generated is the strongest biological oxidizing agent known ($E^{\\circ \\prime} \\approx +1.25\\text{ V}$), powerful enough to extract electrons from water ($E^{\\circ \\prime} = +0.82\\text{ V}$).
2. **Plastoquinone Pool & Cytochrome $b_6f$**:
   - Fully reduced $Q_B$ accepts $2 H^+$ from the stroma to form $PQH_2$ (plastoquinol) and diffuses into the thylakoid lipid bilayer.
   - Oxidized at **Cytochrome $b_6f$ complex** via a Q-cycle identical in principle to mitochondrial Complex III, translocating $4 H^+$ per $2 e^-$ into the lumen.
3. **Plastocyanin & PSI**:
   - Copper-containing water-soluble protein **Plastocyanin** ($PC, Cu^{2+}/Cu^+$) transfers electron from Cyt $b_6f$ to $P700^+$.
   - **P700** is excited by light $\\to P700^* \\to$ passes electron through monomeric chlorophyll $A_0 \\to$ phylloquinone $A_1 \\to$ three [4Fe-4S] clusters ($F_X, F_A, F_B$) $\\to$ **Ferredoxin (Fd)**.
   - Ferredoxin-NADP+ Reductase (**FNR**) transfers electrons from 2 reduced Fd to $NADP^+ + H^+ \\to NADPH$.`
      },
      {
        heading: "3. Linear vs. Cyclic Electron Flow & ATP/NADPH Balancing",
        content: `The Calvin-Benson cycle requires an exact stoichiometric ratio of **3 ATP : 2 NADPH** per $CO_2$ fixed (1.5 ATP/NADPH):
- Non-cyclic (linear) electron transport produces approximately $1.28$ ATP per NADPH (due to the 14-subunit $c$-ring of chloroplast ATP synthase requiring $14 H^+ / 3 \\text{ ATP} = 4.67 H^+/\\text{ATP}$).
- To eliminate the ATP deficit, plants engage in **Cyclic Electron Flow (CEF)** around PSI:
  - Electrons from reduced Ferredoxin are routed back to the Plastoquinone pool via **PGR5/PGRL1** or the **NDH (NADH-dehydrogenase-like) complex**, bypassing PSII and FNR.
  - Plastoquinone transfers electrons back through Cyt $b_6f$, pumping protons into the lumen and generating PMF for ATP synthesis with **zero net NADPH formation**!
  - Essential for photoprotection and induction of **Non-Photochemical Quenching (NPQ)** via luminal acidification activating the PsbS protein and violaxanthin deepoxidase (xanthophyll cycle: violaxanthin $\\to$ antheraxanthin $\\to$ zeaxanthin).`
      }
    ]
  },

  {
    id: "plant-3-c4-cam",
    domainId: "plant_bio",
    title: "Carbon Fixation Pathways: C4 Subtypes, Kranz Anatomy & CAM",
    subtitle: "Rubisco Oxygenase Salvage Cycle, NADP-ME vs NAD-ME vs PEP-CK, and Diurnal CAM Cycling",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 28,
    prerequisites: ["plant-2-photochemistry"],
    sources: ["Taiz & Zeiger Ch. 8 (Photosynthesis: Carbon Reactions)", "Raven's Biology of Plants Ch. 7"],
    interactiveTool: null,
    summary: "Contrast the three biochemical subtypes of C4 photosynthesis (NADP-ME in maize, NAD-ME in millet, PEP-CK in guinea grass), analyze Kranz anatomy and dimorphic chloroplasts, track the photorespiratory glycolate rescue pathway across 3 organelles, and model diurnal CAM acid fluctuations.",
    keyFormulas: [
      { name: "Rubisco Carboxylation vs Oxygenation", latex: "\\text{Carboxylation: } \\text{RuBP} + \\text{CO}_2 + \\text{H}_2\\text{O} \\to 2 \\times 3\\text{-PGA}" },
      { name: "Rubisco Oxygenation Side Reaction", latex: "\\text{Oxygenation: } \\text{RuBP} + \\text{O}_2 \\to 3\\text{-PGA} + 2\\text{-phosphoglycolate}" },
      { name: "Photorespiratory Salvage Stoichiometry", latex: "2 \\times 2\\text{-phosphoglycolate} \\to 1 \\times 3\\text{-PGA} + \\text{CO}_2 + \\text{NH}_3 \\text{ (25% fixed carbon lost)}" }
    ],
    sections: [
      {
        heading: "1. The Photorespiratory Salvage Cycle Across Three Organelles",
        content: `When Rubisco fixes $O_2$ instead of $CO_2$, the toxic byproduct **2-phosphoglycolate** must be salvaged via an energy-expensive multicompartmental pathway:
1. **Chloroplast**: 2-phosphoglycolate is dephosphorylated by phosphoglycolate phosphatase to **glycolate**.
2. **Peroxisome**: Glycolate is exported to peroxisome and oxidized by glycolate oxidase to **glyoxylate**, generating $H_2O_2$ (degraded by catalase). Glyoxylate is transaminated by glutamate-glyoxylate aminotransferase to **glycine**.
3. **Mitochondrion**: Two molecules of glycine enter the mitochondrion. The **Glycine Decarboxylase Multienzyme Complex (GDC)** and serine hydroxymethyltransferase (SHMT) convert 2 glycines into **1 serine + $CO_2$ + $NH_3$ + NADH**.
4. **Peroxisome**: Serine returns to peroxisome, transaminated to hydroxypyruvate, and reduced to **glycerate** using NADH.
5. **Chloroplast**: Glycerate is phosphorylated by glycerate kinase using 1 ATP to regenerate **3-phosphoglycerate (3-PGA)**.
- Net cost: For every $2 O_2$ fixed, **1 carbon is lost as $CO_2$** ($25\\%$ of fixed carbon), consuming 1 ATP and 1 reducing equivalent without any carbon gain.`
      },
      {
        heading: "2. The Three Biochemical Subtypes of C4 Photosynthesis",
        content: `All C4 plants utilize **PEP carboxylase** ($K_m \\text{ for } HCO_3^- \\ll K_m \\text{ of Rubisco for } CO_2$; lacks oxygenase activity) to capture bicarbonate in mesophyll cells, forming oxaloacetate (OAA, 4C). However, the transport metabolite, bundle sheath decarboxylase, and chloroplast ultrastructure differ across three evolutionary subtypes:
- **1. NADP-Malic Enzyme (NADP-ME) Subtype** (e.g., Maize, Sugarcane, Sorghum):
  - OAA reduced to **malate** in mesophyll chloroplasts via NADP-malate dehydrogenase.
  - Malate transported to bundle sheath cells.
  - Decarboxylated in bundle sheath **chloroplasts** by **NADP-ME** $\\to$ releases $CO_2$ (feeding Rubisco) + pyruvate + NADPH.
  - Chloroplast ultrastructure: **Dimorphic chloroplasts!** Bundle sheath chloroplasts are **agranal** (lack thylakoid grana, lack PSII, minimize local $O_2$ production!) while mesophyll chloroplasts are granal.
- **2. NAD-Malic Enzyme (NAD-ME) Subtype** (e.g., Millet, *Atriplex*, *Amaranthus*):
  - OAA transaminated to **aspartate** in mesophyll.
  - Aspartate translocated to bundle sheath **mitochondria**, converted back to OAA, reduced to malate, and decarboxylated by **NAD-ME** to pyruvate + $CO_2$ + NADH.
  - Bundle sheath chloroplasts have normal grana and active PSII.
- **3. PEP-Carboxykinase (PEP-CK) Subtype** (e.g., Guinea grass, *Panicum maximum*):
  - Decarboxylation occurs in bundle sheath **cytoplasm** via **PEP-CK**, consuming ATP to release $CO_2$ and PEP directly!`
      },
      {
        heading: "3. Crassulacean Acid Metabolism (CAM) Diurnal Dynamics",
        content: `Temporal separation of carboxylation and decarboxylation within the same cell:
- **Night (Dark Phase)**:
  - Stomata open; water vapor deficit is lowest.
  - Atmospheric $CO_2$ hydration into $HCO_3^-$ catalyzed by carbonic anhydrase.
  - **PEP carboxylase** is phosphorylated at a specific Ser residue by nocturnal **PPCK (PEP carboxylase kinase)**, rendering it active and insensitive to malate feedback inhibition.
  - Oxaloacetate reduced to malate and pumped into large central vacuoles via a $V\\text{-type } H^+\\text{-ATPase}$ and tonoplast malate channels ($ALMT9$). Nocturnal acidification: vacuolar sap pH drops to $\\approx 3.0$.
- **Day (Light Phase)**:
  - Stomata close tightly to conserve water (transpiration ratio $\\approx 50-100\\text{ g } H_2O / \\text{g } CO_2$ fixed, vs $250-350$ for C4 and $400-500$ for C3).
  - Malate exits vacuole and is decarboxylated by NADP-ME or PEP-CK, generating internal $[CO_2]$ exceeding $10,000\\text{ ppm}$ ($\> 1\\%$)!
  - High $CO_2$ saturates Rubisco and completely suppresses photorespiration.
  - Daytime **PP2A phosphatase** dephosphorylates PEP carboxylase, rendering it inactive and highly sensitive to malate inhibition, preventing futile cycling!`
      }
    ]
  },

  {
    id: "plant-4-hormones",
    domainId: "plant_bio",
    title: "Phytohormone Signaling: F-Box E3 Ligases & Phosphorelays",
    subtitle: "Auxin TIR1/PIN Polarity, Cytokinin Two-Component Systems, Gibberellin DELLA, and ABA-SnRK2",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["plant-3-c4-cam"],
    sources: ["Taiz & Zeiger Ch. 15 (Abscisic Acid), Ch. 19 (Auxin), Ch. 20 (Cytokinins), Ch. 21 (Gibberellins), Ch. 22 (Ethylene)"],
    interactiveTool: null,
    summary: "Dissect the molecular signaling mechanisms of plant hormones: the ubiquitin-proteasome derepression paradigm (Auxin TIR1, Gibberellin GID1/DELLA, Jasmonate COI1/JAZ), bacterial-like two-component phosphorelays (Cytokinin), and the PYR/PYL/RCAR - PP2C - SnRK2 stomatal closure cascade.",
    keyFormulas: [
      { name: "Auxin Chemiosmotic Polar Transport Model", latex: "\\text{Apoplast (pH 5.5): } \\text{IAAH} \\text{ permeates passively} \\to \\text{Cytosol (pH 7.0): } \\text{IAA}^- \\text{ trapped, exits strictly via basal PINs}" }
    ],
    sections: [
      {
        heading: "1. The F-Box Ubiquitin Ligase Paradigm: Auxin & Gibberellin",
        content: `Major plant hormones do not use cell-surface GPCRs; they act through intracellular co-receptors triggering proteolysis of transcriptional repressors:
- **Auxin (IAA) Signaling**:
  - In low auxin, **Aux/IAA proteins** bind **ARF (Auxin Response Factor)** transcription factors, acting as transcriptional repressors by recruiting TOPLESS co-repressors.
  - Auxin acts as a **molecular glue**: it fits into a hydrophobic pocket of the **TIR1 (Transport Inhibitor Response 1)** F-box protein (part of the $SCF^{\\text{TIR1}}$ E3 ubiquitin ligase complex).
  - Auxin binding completes the binding pocket for the degron domain (Domain II) of Aux/IAA proteins.
  - Aux/IAA is polyubiquitinated and degraded by the 26S proteasome $\\to$ ARFs are liberated to activate auxin-responsive genes.
- **Gibberellin (GA) Signaling**:
  - Repressors are **DELLA proteins** (named after their conserved N-terminal Asp-Glu-Leu-Leu-Ala motif; e.g., GAI, RGA).
  - GA binds its soluble receptor **GID1 (Gibberellin Insensitive Dwarf 1)**.
  - GA-GID1 undergoes a conformational change, forming a lid that wraps around the DELLA domain.
  - This recruits the F-box protein **SLY1 / GID2** ($SCF^{\\text{SLY1}}$), driving DELLA polyubiquitination and 26S proteasome degradation $\\to$ growth promotion.`
      },
      {
        heading: "2. Chemiosmotic Polar Auxin Transport (PAT)",
        content: `Unidirectional polar transport of auxin (basipetal in shoots, acropetal in root stele, basipetal in root epidermis):
- The cell wall apoplast is maintained at **acidic pH $\\approx 5.5$** by plasma membrane $H^+\\text{-ATPases}$.
- At pH 5.5, $\\approx 17\\%$ of indole-3-acetic acid ($pK_a = 4.75$) is protonated (uncharged $\\text{IAAH}$) and diffuses passively across the plasma membrane. The anionic form ($\text{IAA}^-$) is imported via **AUX1 / LAX** $H^+\\text{-symporters}$.
- Inside the neutral cytosol (**pH $\\approx 7.0$**), virtually all auxin dissociates into anionic $\\text{IAA}^-$ ($> 99.4\\%$).
- Lipophilic $\\text{IAA}^-$ cannot cross the hydrophobic lipid bilayer on its own and is trapped inside the cell (*ion trapping*).
- Efflux occurs exclusively through asymmetric, localized **PIN-FORMED (PIN)** efflux carrier proteins located at the basal (bottom) plasma membrane of stele cells.
- Direction of PIN trafficking and membrane targeting is regulated by phosphorylation by **PBN1 / AGC kinases** and dephosphorylation by **PP2A phosphatases**.`
      },
      {
        heading: "3. Abscisic Acid (ABA) & Guard Cell Stomatal Closure",
        content: `The definitive USABO finalist signaling pathway for drought response:
1. Drought induces ABA accumulation in leaves.
2. ABA binds **PYR/PYL/RCAR** intracellular receptors.
3. The ABA-PYR complex binds and **inhibits Group A PP2C (Protein Phosphatase 2C)** enzymes (e.g., ABI1, ABI2).
4. With PP2C phosphatases inhibited, **SnRK2 kinases** (e.g., OST1) autophosphorylate and become active!
5. Active SnRK2 phosphorylates:
   - **SLAC1 (Slow Anion Channel 1)**: Drives massive $Cl^-$ and malate$^{2-}$ efflux from guard cells.
   - **Respiratory Burst Oxidase Homolog (RBOH)**: Generates apoplastic ROS $\\to$ opens plasma membrane $Ca^{2+}$ channels.
   - Inhibits **$H^+\\text{-ATPase}$** and inward $K^+$ channels ($KAT1$).
6. Anion efflux depolarizes the guard cell plasma membrane from $-150\\text{ mV}$ to $-40\\text{ mV}$.
7. Membrane depolarization opens **GORK (Gated Outward-Rectifying $K^+$ channels)** $\\to$ massive efflux of $K^+$ ions down their electrochemical gradient.
8. Solute loss lowers guard cell osmolarity $\\to$ water exits osmomically $\\to$ guard cells lose turgor $\\to$ stomatal pore closes!`
      }
    ]
  },

  
  {
    id: "plant-5-anatomy",
    domainId: "plant_bio",
    title: "Plant Tissue Systems, Vascular Anatomy & Secondary Growth",
    subtitle: "Dermal-Ground-Vascular Organization, Münch Pressure-Flow, Vascular Cambium & Annual Rings",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: ["plant-4-hormones"],
    sources: ["Raven's Biology of Plants Ch. 23-26", "Taiz & Zeiger Ch. 1-2 (Plant Cells & Tissues)"],
    interactiveTool: null,
    summary: "Dissect plant primary and secondary anatomy: parenchyma, collenchyma, sclerenchyma (fibers and sclereids), xylem vessel elements vs tracheids (Hagen-Poiseuille hydraulic conductance), phloem sieve elements and companion cells, the symplastic/apoplastic phloem loading mechanisms, and vascular/cork cambium bifacial activity.",
    keyFormulas: [
      { name: "Hagen-Poiseuille Conduit Conductance", latex: "Q = \frac{\pi r^4 \Delta P}{8 \eta L} \quad (\text{Conductance scales with } r^4)" },
      { name: "Münch Phloem Turgor Gradient", latex: "\Delta \Psi_p = \Psi_{p,\text{source}} - \Psi_{p,\text{sink}} > 0 \implies J_v = L_p \Delta \Psi_p" }
    ],
    sections: [
      {
        heading: "1. The Three Tissue Systems & Cell Specialization",
        content: `Plant vegetative organs are partitioned into three continuous tissue systems:
- **Dermal Tissue System**: Protoderm-derived epidermis. Covered by a polyester cutin and wax cuticle. Specialized cells include guard cells (stomatal complexes with subsidiary cells) and trichomes (glandular defense, boundary layer resistance). In roots, root hairs expand the absorption surface area.
- **Ground Tissue System**: Ground meristem-derived. Comprises three fundamental cell types:
  1. **Parenchyma**: Thin primary cell walls; metabolically active; totipotent; performs photosynthesis (chlorenchyma), starch storage (amyloplasts), and gas aeration (aerenchyma).
  2. **Collenchyma**: Unevenly thickened non-lignified primary cell walls (rich in pectin and hemicellulose). Provides plastic, flexible support to elongating stems and petioles (e.g., angular, lamellar, lacunar collenchyma).
  3. **Sclerenchyma**: Thick, lignified secondary cell walls; dead at functional maturity. Divided into **fibers** (long, slender bundles in xylem/phloem) and **sclereids** (isodiametric stone cells, brachysclereids in pears, astrosclereids in water lilies).
- **Endodermis & Casparian Strip**: Innermost cortical layer in roots. Possesses radial and transverse walls impregnated with hydrophobic **suberin** and lignin (the Casparian strip), physically blocking the apoplastic route and forcing all water and ions to enter the symplast through selective plasma membrane transport proteins.`
      },
      {
        heading: "2. Xylem Hydraulics & Hagen-Poiseuille Law",
        content: `Water-conducting elements (tracheary elements) undergo programmed cell death leaving hollow cell wall conduits:
- **Tracheids**: Found in all vascular plants (only conduit type in gymnosperms). Spindle-shaped cells with overlapping tapered ends and bordered pits. Resistant to freeze-thaw-induced cavitation but exhibit high hydraulic resistance.
- **Vessel Elements**: Found predominantly in angiosperms and gnetophytes. Shorter, wider cells stacked end-to-end to form continuous hollow pipes (**vessels**). End walls feature open **perforation plates** (simple or scalariform).
- **Hagen-Poiseuille Law**: Volume flow rate through a cylindrical pipe:
$$Q = \frac{\pi r^4 \Delta P}{8 \eta L}$$
Because flow scales with the fourth power of radius ($r^4$), doubling conduit radius increases conductance by **16-fold**! However, wider vessels are exponentially more susceptible to acoustic cavitation and runaway embolism under negative tension ($P_{50}$).`
      },
      {
        heading: "3. Phloem Translocation & Münch Pressure-Flow",
        content: `Transport of photoassimilates (sucrose, amino acids, signaling molecules) occurs within the phloem:
- **Sieve Element-Companion Cell Complex (SE-CC)**: Sieve tube elements lose their nucleus, vacuole, and ribosomes at maturity, retaining modified plastids and mitochondria. Connected by sieve plates with large callose-lined sieve pores. Metabolically sustained by adjacent **companion cells** via branched plasmodesmata.
- **P-Protein (Phloem Protein / Forisomes)**: In angiosperms, injury causes rapid surging of P-protein bodies and callose synthesis ($\beta$-1,3-glucan) to plug sieve plate pores and prevent sap loss.
- **Phloem Loading (Source)**:
  - *Apoplastic Loading*: Sucrose exits mesophyll into apoplast via SWEET uniporters, then actively pumped into SE-CC via **$\text{SUT1/SUC2}$ ($H^+/\text{sucrose}$ symporters)** driven by plasma membrane $H^+\text{-ATPases}$.
  - *Symplastic Polymer Trapping*: Sucrose diffuses through intermediary cells where galactinol synthase and raffinose synthase convert it into raffinose and stachyose (larger oligosaccharides unable to diffuse backward through narrow plasmodesmata).
- **Münch Pressure-Flow Hypothesis**: High sucrose concentration at source lowers solute potential ($\Psi_s$), drawing water in from adjacent xylem $\to$ generates high hydrostatic turgor pressure ($\Psi_p$). At sink, sucrose is unloaded and consumed/stored, water exits into xylem, lowering turgor pressure. This **hydrostatic pressure gradient ($\Delta \Psi_p$)** drives bulk mass flow from source to sink.`
      },
      {
        heading: "4. Secondary Growth: Vascular & Cork Cambia",
        content: `Woody plants achieve lateral thickening via two secondary lateral meristems:
- **Vascular Cambium**: Arises from fascicular cambium (within vascular bundles) and interfascicular cambium (in medullary rays), forming a continuous meristematic cylinder.
  - Consists of two initial types:
    1. **Fusiform initials**: Vertically oriented; divide periclinally to produce **secondary xylem (wood)** to the interior and **secondary phloem (inner bark)** to the exterior.
    2. **Ray initials**: Horizontally oriented; divide to produce vascular rays (parenchymatous horizontal transport of water, nutrients, and starch).
  - *Growth Rings*: Early wood (spring wood) features wide, thin-walled vessel elements for maximum hydraulic capacity. Late wood (summer wood) features narrow, thick-walled conduits with abundant fibers for structural support.
- **Cork Cambium (Phellogen)**: Initiates in the outer cortex or pericycle. Divides periclinally to produce **cork (phellem)** outward (dead, suberized cells) and **phelloderm** inward.
- **Periderm**: Phelloderm + Phellogen + Phellem. Replaces epidermis as outer bark. **Lenticels** are spongy ruptures in the cork facilitating gas exchange for living cortex cells.`
      }
    ]
  },

  {
    id: "plant-6-reproduction",
    domainId: "plant_bio",
    title: "Plant Reproduction: Alternation of Generations & Double Fertilization",
    subtitle: "Bryophyte-Fern-Angiosperm Life Cycles, Embryo Sac Development & Self-Incompatibility",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 28,
    prerequisites: ["plant-5-anatomy"],
    sources: ["Raven's Biology of Plants Ch. 19-21 (Plant Reproduction)", "Taiz & Zeiger Ch. 21"],
    interactiveTool: null,
    summary: "Trace the evolutionary trend of gametophyte reduction across plant lineages: homospory vs heterospory, the Polygonum-type 7-cell 8-nucleate female embryo sac, pollen tube guidance (LURE peptides), double fertilization forming the diploid zygote and triploid endosperm, and gametophytic vs sporophytic self-incompatibility mechanisms.",
    keyFormulas: [
      { name: "Angiosperm Endosperm Ploidy", latex: "n_{\text{sperm}} + 2n_{\text{central cell}} = 3n \text{ (Triploid endosperm)}" }
    ],
    sections: [
      {
        heading: "1. Alternation of Generations Across Plant Evolution",
        content: `All embryophytes exhibit a haplodiplontic life cycle alternating between a haploid multicellular **gametophyte ($1n$)** and a diploid multicellular **sporophyte ($2n$)**:
- **Bryophytes (Liverworts, Mosses, Hornworts)**:
  - Dominant, photosynthetic, free-living gametophyte ($1n$).
  - Sporophyte ($2n$) is unbranched, physiologically dependent on gametophyte (matrotrophy), anchored by a foot, and terminates in a single capsule/sporangium. Flagellated sperm requires liquid water for chemotaxis to archegonium.
- **Seedless Vascular Plants (Lycophytes & Monilophytes/Ferns)**:
  - Independent sporophyte ($2n$) is the dominant phase.
  - Gametophyte is a small, free-living heart-shaped thallus (**prothallus**) possessing antheridia and archegonia. Homosporous (one spore type $\to$ bisexual gametophyte) or heterosporous (*Selaginella*, *Azolla*).
- **Seed Plants (Gymnosperms & Angiosperms)**:
  - Extreme reduction of gametophyte: female gametophyte is completely retained within the ovule (integumented megasporangium); male gametophyte is reduced to a microscopic desiccation-resistant **pollen grain**. Water-independent fertilization via pollen tube (**siphonogamy**).`
      },
      {
        heading: "2. Megasporogenesis & The Polygonum Embryo Sac",
        content: `Female gametophyte development within the angiosperm ovule (Polygonum-type, occurring in $> 70\%$ of angiosperms):
1. A single diploid **Megaspore Mother Cell (Megasporocyte, $2n$)** inside the nucellus undergoes meiosis to produce 4 linear haploid megaspores.
2. Three micropylar megaspores undergo programmed cell death; the single functional **chalazal megaspore ($1n$)** survives.
3. The functional megaspore undergoes three consecutive rounds of free-nuclear mitosis without cytokinesis, generating an 8-nucleate coenocyte.
4. Cellularization yields the mature **7-cell, 8-nucleate embryo sac (female gametophyte)**:
   - **Egg Apparatus (Micropylar end)**: 1 **Egg Cell ($1n$)** flanked by 2 **Synergid Cells ($1n$)**. Synergids possess a thickened invaginated cell wall (**filiform apparatus**) that secretes attractant peptides (**LUREs**) to guide pollen tube entry.
   - **Central Cell**: Largest cell, containing **2 polar nuclei** ($1n + 1n$).
   - **Antipodal Cells (Chalazal end)**: 3 cells ($1n$) involved in nutrient transfer before degenerating.`
      },
      {
        heading: "3. Microsporogenesis, Pollen Tube Growth & Double Fertilization",
        content: `Male gametogenesis and siphonogamous double fertilization:
- **Pollen Grain**: In anther locules, microsporocytes ($2n$) undergo meiosis $\to$ tetrad of microspores ($1n$). Each microspore divides mitotically into a **Vegetative (Tube) Cell** and a **Generative Cell** (which divides mitotically into **2 immotile sperm cells**). Outer wall is durable **exine** (composed of crosslinked carotenoid polymer **sporopollenin**).
- **Pollen Tube Growth**: Hydrated pollen grain germinates on stigma; tube cell extends by extreme **tip growth** driven by oscillatory apical $Ca^{2+}$ gradients and exocytosis of pectin-rich vesicles.
- **Double Fertilization**:
  1. The pollen tube enters one degenerating synergid via the micropyle and ruptures, discharging both sperm cells.
  2. **First Fertilization**: Sperm $1$ ($1n$) fuses with the egg cell nucleus ($1n$) $\to$ diploid **Zygote ($2n$)**, which develops into the embryo.
  3. **Second Fertilization**: Sperm $2$ ($1n$) fuses with both polar nuclei ($1n + 1n$) in the central cell $\to$ triploid primary endosperm nucleus ($3n$) $\to$ divides to form **Triploid Endosperm ($3n$)** nutrient tissue!
  - Gymnosperm contrast: Gymnosperms undergo single fertilization; their nutritive female gametophyte tissue is haploid ($1n$), formed *before* fertilization.`
      },
      {
        heading: "4. Genetic Mechanisms of Self-Incompatibility (SI)",
        content: `To prevent inbreeding depression, hermaphroditic angiosperms utilize molecular recognition systems controlled by the polymorphic **S-locus**:
- **Gametophytic Self-Incompatibility (GSI)** (e.g., Solanaceae, Rosaceae):
  - Pollen phenotype is determined by its own haploid $S$-allele.
  - The style secretes **S-RNases** into the extracellular matrix.
  - Pollen tube internalizes S-RNases. If the pollen's $S$-allele matches either $S$-allele of the diploid pistil ($S_1$ pollen on $S_1S_2$ pistil), the S-RNase escapes ubiquitination by the pollen F-box protein (SLF) and enzymatically degrades pollen tube ribosomal RNA, arresting tube growth midway down the style.
- **Sporophytic Self-Incompatibility (SSI)** (e.g., Brassicaceae):
  - Pollen phenotype is determined by the diploid genotype of the pollen-producing parent plant (tapetum deposits $S$-proteins into pollen coat).
  - Tapetum-derived small ligand **SCR/SP11** on pollen coat binds the female **SRK (S-receptor kinase)** on the stigmatic papilla cell.
  - Matching alleles trigger SRK dimerization, transphosphorylation, and activation of ARC1 E3 ligase $\to$ degrades stigmatic compatibility factors $\to$ pollen hydration and germination are completely blocked at the stigmatic surface!`
      }
    ]
  },

  // ==================== DOMAIN 3: ANIMAL ANATOMY & PHYSIOLOGY (25%) ====================
  {
    id: "animal-1-neuro",
    domainId: "animal_phys",
    title: "Neurobiophysics: GHK Equation, Cable Theory & Hodgkin-Huxley",
    subtitle: "Nernst Potentials, Length/Time Constants, Gating Kinetics, and LTP/LTD Mechanisms",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 30,
    prerequisites: [],
    sources: ["Vander's Human Physiology Ch. 6 (Neuronal Signaling)", "Guyton & Hall Ch. 5-7 (Membrane Potentials)", "Kandel: Principles of Neural Science Ch. 6-12"],
    interactiveTool: "action_potential_ghk_calculator",
    summary: "Master the mathematical biophysics of excitable membranes: Goldman-Hodgkin-Katz membrane voltage, cable theory space and time constants, Hodgkin-Huxley m3h and n4 gating variable kinetics, quantal MEPP statistics, and molecular mechanisms of LTP (CaMKII autophosphorylation) versus LTD.",
    keyFormulas: [
      { name: "Goldman-Hodgkin-Katz (GHK) Voltage Equation", latex: "V_m = \\frac{RT}{F} \\ln \\left( \\frac{P_{\\text{K}} [\\text{K}^+]_o + P_{\\text{Na}} [\\text{Na}^+]_o + P_{\\text{Cl}} [\\text{Cl}^-]_i}{P_{\\text{K}} [\\text{K}^+]_i + P_{\\text{Na}} [\\text{Na}^+]_i + P_{\\text{Cl}} [\\text{Cl}^-]_o} \\right)" },
      { name: "Cable Theory Length Constant (Space Constant)", latex: "\\lambda = \\sqrt{\\frac{r_m}{r_i + r_o}} \\approx \\sqrt{\\frac{r_m}{r_i}} \\propto \\sqrt{\\frac{R_m \\cdot d}{4 R_i}}" },
      { name: "Cable Theory Time Constant", latex: "\\tau = r_m c_m = R_m C_m" }
    ],
    sections: [
      {
        heading: "1. Resting Membrane Potential & The GHK Voltage Equation",
        content: `At rest, the neuronal membrane is not at thermodynamic equilibrium, but in a steady state maintained by the $Na^+/K^+\\text{-ATPase}$ ($3 Na^+$ out for $2 K^+$ in, contributing $\\approx -5\\text{ mV}$ electrogenically):
- Relative permeabilities at rest: $P_{\\text{K}} : P_{\\text{Na}} : P_{\\text{Cl}} \\approx 1.0 : 0.04 : 0.45$.
- Notice that $[Cl^-]$ terms in the GHK equation are inverted (inside in numerator, outside in denominator) because chloride is a monovalent anion ($z = -1$).
- **Equilibrium Potentials (Mammalian Neuron at $37^\\circ\\text{C}$)**:
  - $E_{\\text{K}} = 61.5 \\log_{10}(4 / 140) \\approx -95\\text{ mV}$.
  - $E_{\\text{Na}} = 61.5 \\log_{10}(145 / 15) \\approx +60\\text{ mV}$.
  - $E_{\\text{Cl}} = -61.5 \\log_{10}(110 / 10) \\approx -64\\text{ mV}$.
  - $E_{\\text{Ca}} = \\frac{61.5}{2} \\log_{10}(2 / 0.0001) \\approx +132\\text{ mV}$.
- Driving force on an ion: $I_{\\text{ion}} = g_{\\text{ion}} (V_m - E_{\\text{ion}})$. If $(V_m - E_{\\text{ion}}) < 0$ for a cation, inward current flows.`
      },
      {
        heading: "2. Cable Theory & Saltatory Conduction Biophysics",
        content: `Passive spread of subthreshold electrical potentials along a dendrite or unmyelinated axon:
- **Length Constant ($\\lambda$)**: Distance at which a voltage deflection decays to $1/e$ ($37\\%$) of its initial value:
  $$\\lambda = \\sqrt{\\frac{r_m}{r_i}}$$
  - To increase $\\lambda$ (maximizing conduction distance before regeneration is needed), an axon can:
    1. Increase diameter $d$ (squid giant axon, $d \\approx 500-1000\\,\\mu\\text{m}$): internal longitudinal resistance $r_i$ decreases with $d^2$, while membrane resistance $r_m$ decreases with $d$, so $\\lambda \\propto \\sqrt{d}$.
    2. Myelination (vertebrates): Myelin adds multiple lipid bilayer wrappings in series, increasing transverse membrane resistance $r_m$ hundreds-fold!
- **Time Constant ($\\tau$)**: Time required for membrane potential to charge to $1 - 1/e$ ($63\\%$) of steady state:
  $$\\tau = r_m c_m$$
  - Myelin increases the separation between extracellular and intracellular conducting fluids, decreasing membrane capacitance $c_m$ dramatically ($C = \\epsilon A / d$).
  - At **Nodes of Ranvier**, high density of voltage-gated $Na_v$ channels ($> 1000/\\mu\\text{m}^2$) rapidly regenerates the action potential, while low capacitance of the internode permits rapid electrotonic spread: **saltatory conduction**!`
      },
      {
        heading: "3. Hodgkin-Huxley Gating Kinetics",
        content: `The mathematical model of the action potential:
- **Voltage-Gated Sodium Channel ($Na_v$)**:
  - Contains **two distinct gates**: an **activation gate ($m$)** and an **inactivation gate ($h$)**.
  - Sodium conductance is modeled as $g_{\\text{Na}} = \\bar{g}_{\\text{Na}} m^3 h$.
  - Depolarization rapidly increases $m$ ($m^3$ kinetics creates steep sigmoidal activation).
  - Depolarization also causes the cytoplasmic inactivation ball (consisting of hydrophobic IFMT motif - isoleucine, phenylalanine, methionine, threonine) to swing into the channel pore, closing the $h$ gate (*ball-and-chain model*).
  - The $h$ gate closes slowly, terminating inward $Na^+$ current and establishing the **absolute refractory period**.
- **Voltage-Gated Potassium Channel ($K_v$, Delayed Rectifier)**:
  - Conductance modeled as $g_{\\text{K}} = \\bar{g}_{\\text{K}} n^4$.
  - Activation variable $n$ responds with a delay relative to $m$, opening just as $Na_v$ channels inactivate.
  - Efflux of $K^+$ repolarizes membrane toward $E_{\\text{K}}$, causing after-hyperpolarization (undershoot) and establishing the **relative refractory period**.`
      },
      {
        heading: "4. Long-Term Potentiation (LTP) & Synaptic Plasticity",
        content: `Cellular basis of learning and memory in hippocampal CA1 pyramidal neurons:
1. High-frequency stimulation (tetanus) releases glutamate from presynaptic Schaffer collaterals.
2. Glutamate binds post-synaptic **AMPA receptors** ($Na^+$ influx depolarsizing membrane) and **NMDA receptors**.
3. At resting potential ($-70\\text{ mV}$), the pore of the NMDA receptor is physically blocked by an extracellular **$Mg^{2+}$ ion**.
4. Sustained AMPA-mediated depolarization repels the positively charged $Mg^{2+}$ out of the pore by electrostatic repulsion.
5. Glutamate and glycine binding to unblocked NMDA receptors permits massive **$Ca^{2+}$ influx**.
6. $Ca^{2+}$ binds calmodulin $\\to$ activates **$\\text{Ca}^{2+}/\\text{calmodulin-dependent protein kinase II (CaMKII)}$**.
7. CaMKII undergoes **autophosphorylation at Thr286**, converting it into an autonomous, constitutively active enzyme even after $Ca^{2+}$ levels return to baseline!
8. CaMKII phosphorylates existing AMPA receptors (increasing single-channel conductance) and drives exocytosis of intracellular vesicles containing AMPA receptors into the postsynaptic density (long-term potentiation).
9. **Long-Term Depression (LTD)**: Low-frequency stimulation produces modest, prolonged $Ca^{2+}$ rises $\\to$ activates high-affinity **calcineurin (PP2B)** $\\to$ dephosphorylates AMPA receptors, triggering their clathrin-dependent endocytosis.`
      }
    ]
  },

  {
    id: "animal-2-cardio",
    domainId: "animal_phys",
    title: "Cardiovascular Dynamics: Wiggers Diagram, PV Loops & Starling Forces",
    subtitle: "Cardiac Cycle Events, Inotropy/Preload/Afterload, Einthoven Vectors, and Capillary Fluid Exchange",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 30,
    prerequisites: ["animal-1-neuro"],
    sources: ["Vander's Human Physiology Ch. 12 (Cardiovascular Physiology)", "Costanzo Physiology Ch. 3", "Guyton & Hall Ch. 9-16"],
    interactiveTool: "wiggers_cardiac_cycle_explorer",
    summary: "Integrate the 7 phases of the cardiac cycle across the Wiggers diagram, analyze left ventricular Pressure-Volume loops under altered inotropy/preload/afterload, calculate mean electrical QRS axis via Einthoven's triangle, and compute net capillary microvascular filtration using Starling's equation.",
    keyFormulas: [
      { name: "Cardiac Output & Fick Principle", latex: "CO = HR \\times SV = \\frac{\\dot{V}_{\\text{O}_2}}{[\\text{O}_2]_{\\text{arterial}} - [\\text{O}_2]_{\\text{venous}}}" },
      { name: "Ejection Fraction", latex: "EF = \\frac{SV}{EDV} = \\frac{EDV - ESV}{EDV} \\times 100\\%" },
      { name: "Starling Equation for Capillary Filtration", latex: "J_v = K_f [ (P_c - P_i) - \\sigma (\\pi_c - \\pi_i) ]" },
      { name: "Mean Arterial Pressure (MAP)", latex: "MAP = DBP + \\frac{1}{3} (SBP - DBP) = CO \\times TPR" }
    ],
    sections: [
      {
        heading: "1. The Master Wiggers Diagram: 7 Cardiac Phases",
        content: `Mastering the synchronized curves of ventricular pressure, atrial pressure, aortic pressure, ventricular volume, ECG, and phonocardiogram:
- **Phase 1: Atrial Systole**: Corresponds to PR interval on ECG. Atrial contraction gives the **'a' wave** of atrial pressure and injects the final $10-20\\%$ of ventricular filling ('atrial kick'). Fourth heart sound ($S_4$, abnormal stiffness/hypertrophy).
- **Phase 2: Isovolumetric Ventricular Contraction**: Follows QRS complex. Ventricular pressure exceeds atrial pressure $\\to$ **Mitral valve closes** producing **$S_1$ heart sound**. Both AV and semilunar valves are closed. Ventricular volume is constant at End-Diastolic Volume ($EDV \\approx 120\\text{ mL}$). Produces **'c' wave** in atrial pressure (bulging of tricuspid/mitral leaflets into atria).
- **Phase 3: Rapid Ventricular Ejection**: Ventricular pressure exceeds aortic pressure $\\to$ **Aortic valve opens**. Ventricular volume plummets; aortic and ventricular pressures rise together to peak systolic pressure ($\sim 120\\text{ mmHg}$).
- **Phase 4: Reduced Ventricular Ejection**: Ventricular repolarization begins (T wave). Ejection rate slows; aortic pressure begins to decline.
- **Phase 5: Isovolumetric Ventricular Relaxation**: Ventricular pressure drops below aortic pressure $\\to$ **Aortic valve snaps shut**, generating the **$S_2$ heart sound** and the **dicrotic notch (incisura)** on the aortic pressure tracing (rebound of blood off closed semilunar cusps). Volume remains constant at End-Systolic Volume ($ESV \\approx 50\\text{ mL}$).
- **Phase 6: Rapid Ventricular Filling**: Ventricular pressure falls below atrial pressure $\\to$ **Mitral valve opens**. Blood accumulated in atria rushes into ventricles. Third heart sound ($S_3$, normal in youth/athletes; pathological volume overload in heart failure).
- **Phase 7: Reduced Ventricular Filling (Diastasis)**: Longest phase at normal heart rates. Passive filling slows as ventricles reach compliance limit.`
      },
      {
        heading: "2. Pressure-Volume (PV) Loops: Preload, Afterload & Inotropy",
        content: `The counterclockwise trajectory on a Left Ventricular Pressure vs Volume plane:
- **Corner A (EDV, low pressure)**: Mitral valve closes.
- **Line A $\\to$ B**: Isovolumetric contraction (vertical line up at constant volume).
- **Corner B**: Aortic valve opens.
- **Curve B $\\to$ C**: Systolic ejection. Peak ventricular pressure reached.
- **Corner C (ESV, high pressure)**: Aortic valve closes. Width of loop is **Stroke Volume ($SV = EDV - ESV$)**.
- **Line C $\\to$ D**: Isovolumetric relaxation (vertical line down at constant volume).
- **Corner D**: Mitral valve opens.
- **Line D $\\to$ A**: Diastolic filling along the Passive End-Diastolic Pressure-Volume Relationship (EDPVR).
- **Altered Hemodynamic Conditions**:
  - **Increased Preload** (increased venous return): Increases EDV; loop widens to the right; SV increases (*Frank-Starling law*).
  - **Increased Afterload** (aortic stenosis, systemic hypertension): Higher aortic pressure required to open valve; isovolumetric line extends higher; ejection is curtailed; ESV increases; SV decreases.
  - **Increased Inotropy / Contractility** ($\\beta_1$-adrenergic stimulation): Shifts the End-Systolic Pressure-Volume Relationship (ESPVR) slope upwards and to the left; lower ESV; ejection fraction and SV increase markedly!`
      },
      {
        heading: "3. Einthoven's Triangle & Mean QRS Electrical Axis",
        content: `Hexaxial reference system and vector analysis:
- Bipolar limb leads: Lead I ($0^\\circ$, right arm $\\to$ left arm), Lead II ($+60^\\circ$, right arm $\\to$ left leg), Lead III ($+120^\\circ$, left arm $\\to$ left leg).
- Einthoven's Law: $\\text{Lead I} + \\text{Lead III} = \\text{Lead II}$.
- **Normal Mean Electrical Axis**: $-30^\\circ$ to $+90^\\circ$.
  - **Left Axis Deviation (LAD, $-30^\\circ$ to $-90^\\circ$)**: Net positive in Lead I, net negative in Lead II and aVF. Seen in left ventricular hypertrophy, left anterior fascicular block.
  - **Right Axis Deviation (RAD, $+90^\\circ$ to $+180^\\circ$)**: Net negative in Lead I, net positive in aVF. Seen in right ventricular hypertrophy, pulmonary embolism.`
      },
      {
        heading: "4. Microvascular Fluid Exchange: Starling Forces",
        content: `Transvascular fluid flux governed by hydrostatic and oncotic pressures:
$$J_v = K_f [ (P_c - P_i) - \\sigma (\\pi_c - \\pi_i) ]$$
- $K_f$: Capillary hydraulic filtration coefficient (high in fenestrated renal glomeruli, low in blood-brain barrier).
- $\\sigma$: Osmotic reflection coefficient for plasma proteins ($0 \\le \\sigma \\le 1$; $\\sigma \\approx 1.0$ in continuous capillaries).
- $P_c$: Capillary hydrostatic pressure ($\sim 35\\text{ mmHg}$ at arteriolar end, dropping to $15\\text{ mmHg}$ at venular end).
- $P_i$: Interstitial hydrostatic pressure ($\approx -2$ to $0\\text{ mmHg}$).
- $\\pi_c$: Capillary plasma oncotic pressure ($\approx 25-28\\text{ mmHg}$, primarily albumin).
- $\\pi_i$: Interstitial fluid oncotic pressure ($\approx 1-3\\text{ mmHg}$).
- **Net filtration** occurs at arteriolar end ($+10\\text{ mmHg}$); **net reabsorption** occurs at venular end ($-8\\text{ mmHg}$). Slight excess fluid filtered ($2-4\\text{ L/day}$) is returned to circulation via the **lymphatic system**!`
      }
    ]
  },

  {
    id: "animal-3-renal",
    domainId: "animal_phys",
    title: "Renal Physiology & Davenport Acid-Base Diagnostics",
    subtitle: "Clearance, Inulin/PAH, Countercurrent Multiplication, Tm Splay, and Anion Gap",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 30,
    prerequisites: ["animal-2-cardio"],
    sources: ["Vander's Human Physiology Ch. 14 (Kidneys and Regulation of Water/Inorganic Ions)", "Costanzo Physiology Ch. 5-6"],
    interactiveTool: "davenport_acid_base_calculator",
    summary: "Master renal quantitative calculations: inulin clearance for GFR, PAH clearance for RPF, filtration fraction, tubular transport maximum (Tm) and splay, the countercurrent multiplication mechanism in the loop of Henle, and diagnostic interpretation of acid-base disorders using the Davenport diagram.",
    keyFormulas: [
      { name: "Renal Clearance", latex: "C_x = \\frac{U_x \\times V}{P_x}" },
      { name: "Glomerular Filtration Rate (GFR)", latex: "GFR = C_{\\text{inulin}} = \\frac{U_{\\text{inulin}} \\times V}{P_{\\text{inulin}}}" },
      { name: "Renal Plasma & Blood Flow", latex: "RPF = C_{\\text{PAH}} = \\frac{U_{\\text{PAH}} \\times V}{P_{\\text{PAH}}}, \\quad RBF = \\frac{RPF}{1 - \\text{Hematocrit}}" },
      { name: "Filtration Fraction (FF)", latex: "FF = \\frac{GFR}{RPF} \\approx 0.20 \\text{ (normal 20%)}" },
      { name: "Serum Anion Gap", latex: "\\text{AG} = [\\text{Na}^+] - ([\\text{Cl}^-] + [\\text{HCO}_3^-]) \\text{ (Normal: } 10-12 \\text{ mEq/L)}" }
    ],
    sections: [
      {
        heading: "1. Clearance Principles & Glomerular Dynamics",
        content: `Renal clearance is the virtual volume of plasma cleared of a substance per unit time:
- **Inulin**: Freely filtered across glomerular barrier, neither reabsorbed nor secreted nor metabolized by nephron tubules. Therefore:
  $$\\text{Filtered Load} = GFR \\times P_{\\text{inulin}} = \\text{Excretion Rate} = U_{\\text{inulin}} \\times V \\implies GFR = \\frac{U_{\\text{inulin}} \\times V}{P_{\\text{inulin}}}$$
- **Para-aminohippurate (PAH)**: Freely filtered AND completely secreted into tubular lumen by organic anion transporters (OAT1/3) in proximal tubule on a single pass through the kidney (at low plasma concentrations below $T_m$). Therefore, clearance of PAH measures **Effective Renal Plasma Flow (ERPF)**.
- **Evaluating Clearance Ratios ($C_x / C_{\\text{inulin}}$)**:
  - $C_x / C_{\\text{inulin}} = 1.0$: Substance handled like inulin (filtered only).
  - $C_x / C_{\\text{inulin}} < 1.0$: Net tubular **reabsorption** (e.g., glucose $= 0$, $Na^+ < 0.01$, urea $\\approx 0.5$).
  - $C_x / C_{\\text{inulin}} > 1.0$: Net tubular **secretion** (e.g., PAH, $K^+$ under high aldosterone, creatinine $\\sim 1.1$).`
      },
      {
        heading: "2. Glucose Titration: Threshold, Tm & Splay",
        content: `Tubular maximum transport kinetics in the proximal convoluted tubule:
- Filtered load of glucose increases linearly with plasma glucose ($GFR \\times P_{\\text{glucose}}$).
- Glucose is reabsorbed by high-capacity **SGLT2** ($1 Na^+ : 1 \\text{ glucose}$) in early S1 proximal tubule and **SGLT1** ($2 Na^+ : 1 \\text{ glucose}$) in late S3 segment, and exits basolaterally via GLUT2.
- **Transport Maximum ($T_m$)**: When all carrier proteins are saturated ($T_m \\approx 375\\text{ mg/min}$).
- **Renal Threshold**: Plasma glucose concentration at which glucose first appears in the urine (glucosuria, $\\approx 200\\text{ mg/dL}$).
- **Splay**: The deviation between the theoretical threshold (where filtered load exceeds $T_m$, $\\sim 300\\text{ mg/dL}$) and the actual threshold ($200\\text{ mg/dL}$). Caused by:
  1. Low binding affinity ($K_m$) of carriers near saturation.
  2. Nephron heterogeneity (some nephrons have shorter proximal tubules and saturate earlier than others).`
      },
      {
        heading: "3. Countercurrent Multiplication in the Loop of Henle",
        content: `Generation of the corticopapillary osmotic gradient (up to $1200\\text{ mOsm/L}$ in deep renal medulla):
- **Descending Thin Limb**: Highly permeable to water (aquaporin-1, AQP1), completely impermeable to $NaCl$. Water exits into hypertonic interstitium; luminal fluid concentrates to $1200\\text{ mOsm/L}$ at hairpin turn.
- **Ascending Thick Limb (TAL)**: Completely impermeable to water. Actively pumps solutes via the **$NKCC2$ cotransporter** ($1 Na^+ : 1 K^+ : 2 Cl^-$).
  - Driven by basolateral $Na^+/K^+\\text{-ATPase}$.
  - $K^+$ back-leaks into tubular lumen via **ROMK channels**, creating a **lumen-positive electrical potential (+8 mV)**!
  - This $+8\\text{ mV}$ potential drives paracellular reabsorption of divalent cations ($Ca^{2+}$ and $Mg^{2+}$).
  - Loop diuretics (furosemide) block NKCC2, dissipating the gradient and causing severe diuresis and $Ca^{2+}$ excretion.
- **Vasa Recta (Countercurrent Exchanger)**: Hairpin-shaped medullary capillaries that passively maintain the gradient without washing it out (low blood flow, slow hairpin exchange).
- **Urea Recycling**: Contributes $\\sim 50\\%$ of papillary hyperosmolarity. ADH activates **UT-A1 / UT-A3** transporters in inner medullary collecting ducts, diffusing urea into the interstitium.`
      },
      {
        heading: "4. The Davenport Diagram & Acid-Base Disorders",
        content: `Acid-base balance coordinates $[H^+]$, $[HCO_3^-]$, and $P_{\\text{CO}_2}$ via the Henderson-Hasselbalch equation:
$$\\text{pH} = 6.1 + \\log_{10} \\left( \\frac{[\\text{HCO}_3^-]}{0.03 \\times P_{\\text{CO}_2}} \\right)$$
Normal values: $\\text{pH} = 7.40$, $[HCO_3^-] = 24\\text{ mEq/L}$, $P_{\\text{CO}_2} = 40\\text{ mmHg}$.
- **Four Primary Acid-Base Disturbances**:
  1. **Respiratory Acidosis**: $\\uparrow P_{\\text{CO}_2} \\to \\downarrow \\text{pH}$. Compensated by kidneys retaining $[HCO_3^-]$ (acute: $\\uparrow [HCO_3^-]$ by 1 for each $10\\,\\uparrow P_{\\text{CO}_2}$; chronic: $\\uparrow [HCO_3^-]$ by 3.5).
  2. **Respiratory Alkalosis**: $\\downarrow P_{\\text{CO}_2} \\to \\uparrow \\text{pH}$ (hyperventilation). Compensated by kidneys excreting $[HCO_3^-]$.
  3. **Metabolic Acidosis**: $\\downarrow [HCO_3^-] \\to \\downarrow \\text{pH}$. Compensated by hyperventilation (Winter's formula: expected $P_{\\text{CO}_2} = 1.5 [HCO_3^-] + 8 \\pm 2$).
     - Calculate **Anion Gap**: $\\text{AG} = [Na^+] - ([Cl^-] + [HCO_3^-])$.
     - High Anion Gap ($> 12$): **MUDPILES** (Methanol, Uremia, DKA, Propylene glycol, Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates).
     - Normal Anion Gap (Hyperchloremic): Diarrhea, Renal Tubular Acidosis (RTA).
  4. **Metabolic Alkalosis**: $\\uparrow [HCO_3^-] \\to \\uparrow \\text{pH}$ (vomiting, antacids). Compensated by hypoventilation ($\\uparrow P_{\\text{CO}_2}$).`
      }
    ]
  },

  
  {
    id: "animal-4-digestion",
    domainId: "animal_phys",
    title: "Digestion, Nutrient Absorption & GI Endocrinology",
    subtitle: "Comparative GI Anatomy, Enzymatic Cascades, SGLT1/GLUT2 Transport & Enterohepatic Bile Cycling",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["animal-3-renal"],
    sources: ["Vander's Human Physiology Ch. 15 (Digestion & Absorption)", "Guyton & Hall Ch. 63-66"],
    interactiveTool: null,
    summary: "Deconstruct gastrointestinal physiology: comparative digestive architectures (ruminants, avians, hindgut fermenters), gastric HCl secretion via parietal cell H+/K+-ATPases, pancreatic zymogen activation cascades, brush border disaccharidases and peptidases, apical/basolateral enterocyte transport (SGLT1, GLUT5, GLUT2, chylomicron exocytosis into lacteals), and regulatory gastrointestinal endocrinology (gastrin, CCK, secretin, GIP, GLP-1).",
    keyFormulas: [
      { name: "Parietal Cell Acid Secretion Net Reaction", latex: "\text{CO}_2 + \text{H}_2\text{O} \\xrightarrow{\text{CA}} \text{H}_2\text{CO}_3 \to \text{H}^+_{\text{lumen}} (\text{via } \text{H}^+/\text{K}^+\text{-ATPase}) + \text{HCO}_3^-_{\text{blood}} (\text{Alkaline tide})" }
    ],
    sections: [
      {
        heading: "1. Comparative Vertebrate Digestive Specializations",
        content: `Vertebrate digestive tracts are adapted to diet and cellulose digestion:
- **Ruminants (Foregut Fermenters)** (e.g., cattle, sheep, deer):
  - Four-chambered stomach:
    1. **Rumen**: Giant fermentation vat populated by anaerobic cellulolytic bacteria, protozoa, and fungi. Microbes hydrolyze cellulose and hemicellulose into **Volatile Fatty Acids (VFAs)**: acetate ($C_2$), propionate ($C_3$), butyrate ($C_4$). Propionate is the primary gluconeogenic precursor for the host liver.
    2. **Reticulum**: Honeycomb lining; coordinates regurgitation of cud (rumination) for mechanical re-chewing.
    3. **Omasum**: Folds of laminae ('leaves'); reabsorbs water, $HCO_3^-$, and residual VFAs.
    4. **Abomasum**: The true acid stomach (secretes $HCl$ and pepsinogen) where microbial protein is digested and absorbed downstream.
- **Hindgut Fermenters** (e.g., horses, rabbits, koalas):
  - Fermentation occurs in an enlarged **cecum** and colon downstream of the stomach and small intestine.
  - Disadvantage: Microbial protein cannot be absorbed by the small intestine and is excreted in feces. Lagomorphs (rabbits) resolve this via **cecotrophy** (ingesting nutrient-rich soft cecotropes directly from the anus).
- **Avian Digestive System**:
  - **Crop**: Esophageal pouch for food storage and pre-softening.
  - **Proventriculus**: Glandular stomach secreting $HCl$ and pepsinogen.
  - **Gizzard (Ventriculus)**: Muscular grinding chamber lined with tough keratin-like **koilin** membrane; contains ingested grit/stones.`
      },
      {
        heading: "2. Gastric Acid Secretion & Parietal Cell Dynamics",
        content: `Gastric mucosa contains functional tubular glands:
- **Cell Types**: Mucous neck cells (mucus + $HCO_3^-$ mucosal barrier), Chief cells (pepsinogen), Enterochromaffin-like (ECL) cells (histamine), D cells (somatostatin), G cells (gastrin).
- **Parietal Cell Secretion of Hydrochloric Acid ($HCl$)**:
  - Intracellular carbonic anhydrase (CA) hydrates $CO_2$ to generate $H^+$ and $HCO_3^-$.
  - Apical **$H^+/K^+\text{-ATPase}$ (Proton Pump)** actively exports $H^+$ into the lumen in exchange for $K^+$ at a concentration gradient of $1 : 1,000,000$ (luminal pH $\approx 1.0$).
  - Basolateral **$HCO_3^-/Cl^-$ antiporter (AE2)** extrudes $HCO_3^-$ into blood, generating the post-prandial **alkaline tide** while importing $Cl^-$, which exits into the lumen via apical $Cl^-$ channels (CFTR / Clic6).
- **Three Positive Regulators**:
  1. **Gastrin** (binds $CCK_B$ receptors $\to G_{\alpha q} \to IP_3/Ca^{2+}$).
  2. **Acetylcholine** (vagus nerve via $M_3$ receptors $\to G_{\alpha q} \to IP_3/Ca^{2+}$).
  3. **Histamine** (paracrine from ECL cells binds $H_2$ receptors $\to G_{\alpha s} \to cAMP \to PKA$). Histamine potentiates gastrin and ACh signaling!
- **Negative Regulator**: **Somatostatin** from D cells binds $SSTR2$ ($G_{\alpha i} \to \\downarrow cAMP$), directly suppressing parietal and G cells.`
      },
      {
        heading: "3. Pancreatic Zymogen Activation & Nutrient Absorption",
        content: `Pancreatic exocrine secretion and enterocyte transport mechanisms:
- **Enterokinase / Enteropeptidase**: Anchored to duodenal brush border. Cleaves trypsinogen into **active trypsin** by removing an N-terminal hexapeptide.
- **Trypsin Cascade**: Trypsin autocatalytically activates more trypsinogen and cleaves:
  - Chymotrypsinogen $\to$ Chymotrypsin (endopeptidase cleaving hydrophobic/aromatic residues).
  - Proelastase $\to$ Elastase.
  - Procarboxypeptidase A & B $\to$ Carboxypeptidase A & B (exopeptidases removing C-terminal amino acids).
- **Carbohydrate Absorption**:
  - Apical: **SGLT1** ($2 Na^+ : 1 \text{ glucose/galactose}$ secondary active symport). **GLUT5** (facilitated diffusion of fructose).
  - Basolateral: **GLUT2** transports glucose, galactose, and fructose into interstitial fluid and portal capillaries.
- **Lipid Digestion & Chylomicrons**:
  - Liver bile salts emulsify dietary triglycerides into mixed **micelles** ($4-7\text{ nm}$).
  - Pancreatic lipase and **colipase** hydrolyze triglycerides into 2-monoglycerides and free fatty acids.
  - Lipids diffuse across apical membrane; re-esterified to triglycerides in smooth ER.
  - Packaged with apolipoproteins (ApoB-48), phospholipids, and cholesterol into **Chylomicrons**.
  - Chylomicrons undergo exocytosis into **lacteals** (central lymphatic vessels), bypassing the liver and entering venous circulation directly via the thoracic duct into the left subclavian vein!`
      },
      {
        heading: "4. Gastrointestinal Endocrinology & Enterohepatic Circulation",
        content: `Peptide hormones coordinating gastrointestinal transit and metabolism:
- **Gastrin** (G cells of antrum): Stimulated by peptide fragments, stomach distension, and vagal GRP (gastrin-releasing peptide). Drives parietal $HCl$ secretion and gastric mucosal growth. Inhibited by luminal $\text{pH} < 2.0$ via somatostatin.
- **Cholecystokinin (CCK)** (I cells of duodenum/jejunum): Stimulated by fatty acids and amino acids. Causes **gallbladder contraction**, relaxes **Sphincter of Oddi**, stimulates pancreatic acinar enzyme secretion, and slows gastric emptying.
- **Secretin** (S cells of duodenum): Stimulated by acidic chyme ($\text{pH} < 4.5$). Stimulates pancreatic ductal cells to secrete massive watery **$\text{HCO}_3^-$** via CFTR and $Cl^-/HCO_3^-$ exchangers, neutralizing duodenal acid.
- **Incretins (GIP and GLP-1)** (K cells and L cells): Stimulate glucose-dependent insulin secretion from pancreatic $\beta$-cells *before* blood glucose rises (feedforward control).
- **Enterohepatic Circulation of Bile Salts**:
  - $> 95\%$ of bile acids (cholic, chenodeoxycholic acid conjugated to glycine/taurine) are actively reabsorbed in the **terminal ileum** via the **ASBT ($Na^+$-dependent bile salt transporter)**.
  - Returned to liver via portal vein and re-secreted into bile, cycling 4-12 times daily. Resection of terminal ileum causes severe bile acid malabsorption and steatorrhea.`
      }
    ]
  },

  {
    id: "animal-5-respiration",
    domainId: "animal_phys",
    title: "Respiratory Physiology: Gas Exchange, O₂ Transport & Ventilation Control",
    subtitle: "Countercurrent Exchange, O₂-Hb Dissociation Curve, Bohr/Haldane Effects & Chemoreceptor Feedback",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 30,
    prerequisites: ["animal-4-digestion"],
    sources: ["Vander's Human Physiology Ch. 13 (Respiration)", "Guyton & Hall Ch. 40-42", "Costanzo Physiology Ch. 4"],
    interactiveTool: null,
    summary: "Master respiratory biophysics and clinical physiology: comparative respiratory mechanics (fish countercurrent gill lamellae, avian crosscurrent parabronchi and non-collapsible air sacs), mammalian compliance and pulmonary surfactant (Laplace's law DPPC), oxygen-hemoglobin dissociation dynamics (P50, Bohr right-shift, 2,3-BPG, fetal HbF), carbon dioxide carriage (chloride shift, Haldane effect), and central vs peripheral chemoreceptor feedback loops.",
    keyFormulas: [
      { name: "Alveolar Gas Equation", latex: "P_A\text{O}_2 = P_I\text{O}_2 - \frac{P_A\text{CO}_2}{R} = (P_{\text{atm}} - P_{\text{H}_2\text{O}}) F_I\text{O}_2 - \frac{P_A\text{CO}_2}{R}" },
      { name: "Law of Laplace (Alveolar Stability)", latex: "P = \frac{2 T}{r} \quad (\text{Surfactant reduces } T \text{ dynamically as } r \text{ decreases})" },
      { name: "Fick's Law of Gas Diffusion", latex: "\dot{V}_{\text{gas}} = \frac{A \cdot D \cdot (P_1 - P_2)}{T} \propto \frac{A \cdot \text{Solubility}}{\Delta x \cdot \sqrt{\text{MW}}} \Delta P" }
    ],
    sections: [
      {
        heading: "1. Comparative Gas Exchange: Gills, Parabronchi & Lungs",
        content: `Respiratory structures across animal phyla optimize the parameters of Fick's Law:
- **Fish Gill Countercurrent Exchange**:
  - Water flows across secondary lamellae in the exact *opposite direction* to capillary blood flow.
  - A partial pressure gradient ($\Delta P_{\text{O}_2}$) is maintained along the *entire length* of the capillary bed.
  - Allows blood $P_{\text{O}_2}$ to reach up to **$80-90\%$ of the oxygen saturation** of incoming water!
  - Concurrent flow would reach equilibrium at only $50\%$, wasting the oxygen content of the water.
- **Avian Crosscurrent & Unidirectional Flow**:
  - Birds possess rigid, non-collapsible lungs with continuous parallel tubules called **parabronchi** connected to anterior and posterior **air sacs**.
  - Takes **two complete respiratory cycles** for a single bolus of air to move through the system:
    - *Inhalation 1*: Air enters posterior air sacs.
    - *Exhalation 1*: Air passes through parabronchi where gas exchange occurs.
    - *Inhalation 2*: Deoxygenated air enters anterior air sacs.
    - *Exhalation 2*: Air exits via trachea.
  - Flow across parabronchial capillaries is **crosscurrent**: blood $P_{\text{O}_2}$ leaving the parabronchus can exceed the $P_{\text{O}_2}$ of exhaled gas, enabling flight at extreme altitudes (e.g., Bar-headed geese over the Himalayas at $> 8,000\text{ m}$).`
      },
      {
        heading: "2. Mammalian Pulmonary Mechanics & Surfactant",
        content: `Inspiration and expiration dynamics governed by pressure gradients:
- **Pleural Pressures**: At Functional Residual Capacity (FRC), inward elastic recoil of the lung matches outward elastic recoil of the chest wall, creating a negative intrapleural pressure ($-5\text{ cm } H_2O$).
- **Inspiration**: Contraction of diaphragm and external intercostals expands thoracic cavity $\to$ intrapleural pressure drops to $-8\text{ cm } H_2O \to$ alveolar pressure drops below atmospheric ($-1\text{ cm } H_2O$) $\to$ air flows in.
- **Compliance & Laplace's Law**:
  $$P = \frac{2T}{r}$$
  - Without surfactant, smaller alveoli (smaller radius $r$) would generate much higher internal collapsing pressures than larger alveoli, causing air to empty into larger alveoli and collapsing smaller ones (**atelectasis**).
- **Pulmonary Surfactant**: Secreted by **Type II alveolar epithelial cells**; composed of **dipalmitoylphosphatidylcholine (DPPC)** and surfactant proteins (SP-A, B, C, D).
  - Molecules crowd closer together in shrinking alveoli, reducing surface tension $T$ proportionally to radius $r$, stabilizing alveoli of varying sizes and drastically increasing pulmonary compliance.`
      },
      {
        heading: "3. Oxygen-Hemoglobin Dissociation & The Bohr Effect",
        content: `Hemoglobin ($HbA$, $\alpha_2\beta_2$) cooperatively binds up to four $O_2$ molecules, generating a sigmoidal binding curve:
- **$P_{50}$ Parameter**: The partial pressure of oxygen at which hemoglobin is $50\%$ saturated (normal arterial $P_{50} \approx 26.6\text{ mmHg}$).
- **Right Shift (Decreased $O_2$ Affinity / Enhanced Tissue Delivery)**:
  - Higher $P_{50}$: Hemoglobin releases oxygen more readily to metabolically active tissues.
  - Triggers (**CADET face right**):
    1. **$\\uparrow \text{CO}_2$** (hypercapnia).
    2. **$\\uparrow \text{Acidity / } [\text{H}^+]$** (decreased pH) = **The Bohr Effect**. $H^+$ protonates histidine residues (His146 on $\beta$-chains), forming salt bridges that stabilize the low-affinity Tense (T) state.
    3. **$\\uparrow 2,3\text{-Bisphosphoglycerate (2,3-BPG)}$**: Synthesized via the Rapoport-Luebering shunt in erythrocytes. Binds the central cavity between $\beta$-subunits with positively charged residues (Lys82, His2, His143).
    4. **$\\uparrow \text{Exercise / } \\uparrow \text{Temperature}$**.
- **Left Shift (Increased $O_2$ Affinity)**:
  - Lower $P_{50}$: Binds $O_2$ tightly. Caused by $\\downarrow [H^+]$ (alkalosis), $\\downarrow P_{\text{CO}_2}$, $\\downarrow \text{temp}$, $\\downarrow 2,3\text{-BPG}$.
  - **Fetal Hemoglobin ($HbF$, $\alpha_2\gamma_2$)**: $\gamma$-chains replace His143 with neutral serine, slashing 2,3-BPG binding affinity! Therefore, $HbF$ has a much higher oxygen affinity than maternal $HbA$, driving transplacental oxygen transfer.`
      },
      {
        heading: "4. Carbon Dioxide Carriage & Ventilatory Control",
        content: `Three modes of $CO_2$ transport and neurological chemical feedback:
- **Modes of $CO_2$ Carriage**:
  1. **Dissolved in Plasma** ($pprox 7\%$).
  2. **Carbaminohemoglobin** ($pprox 23\%$): $CO_2$ reacts reversibly with uncharged N-terminal amino groups of deoxyhemoglobin.
  3. **Bicarbonate ($HCO_3^-$)** ($pprox 70\%$): In erythrocytes, **Carbonic Anhydrase II** rapidly hydrates $CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-$.
     - **The Chloride Shift (Hamburger Phenomenon)**: $HCO_3^-$ is pumped out into plasma via the **Band 3 anion exchanger (AE1)** in exchange for plasma $Cl^-$.
- **The Haldane Effect**: Deoxygenation of hemoglobin increases its capacity to carry $CO_2$ (deoxyhemoglobin is a better proton buffer and forms carbamino compounds more readily than oxyhemoglobin).
- **Chemical Control of Breathing**:
  - **Central Chemoreceptors (Ventral Medulla)**: Sense $[H^+]$ in cerebrospinal fluid (CSF). $CO_2$ freely crosses blood-brain barrier and forms $H^+$ via CSF carbonic anhydrase; dominant driver of resting ventilation!
  - **Peripheral Chemoreceptors (Carotid and Aortic Bodies)**: Glomus cells sense arterial **hypoxia** ($P_{\text{O}_2} < 60\text{ mmHg}$), hypercapnia, and metabolic acidosis ($H^+$ directly from blood). Hypoxia closes background $K^+$ channels $\to$ depolarization $\to Ca^{2+}$ influx $\to$ dopamine release onto sinus nerve (CN IX).`
      }
    ]
  },

  {
    id: "animal-6-immunity",
    domainId: "animal_phys",
    title: "Immunology: Innate Defense, Adaptive Immunity & MHC Restriction",
    subtitle: "TLR/PAMP Recognition, Complement Cascades, V(D)J Recombination & T-Cell Restriction",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 32,
    prerequisites: ["animal-5-respiration"],
    sources: ["Vander's Human Physiology Ch. 18 (Defense Mechanisms)", "Janeway's Immunobiology (9th/10th Ed)"],
    interactiveTool: null,
    summary: "Dissect the molecular and cellular architecture of the immune system: pattern recognition receptors (TLR4/MD-2/LPS, TLR3/dsRNA, MyD88/TRIF signaling), the three complement activation pathways converging on C3 convertase and MAC assembly, V(D)J somatic recombination (RAG1/RAG2, Ku70/80, TdT junctional diversity), class switch recombination (AID), MHC Class I vs Class II processing and presentation pathways, and T-cell subset differentiation.",
    keyFormulas: [
      { name: "Complement C3 Convertases", latex: "\text{Classical/Lectin: } \text{C4b2a}, \quad \text{Alternative: } \text{C3bBb}" },
      { name: "Theoretical BCR/TCR Diversity", latex: "\text{Combinatorial} \times \text{Junctional Diversity} > 10^{14} \text{ unique antigen receptors}" }
    ],
    sections: [
      {
        heading: "1. Innate Immunity: PRRs, TLRs & The Complement Cascade",
        content: `Innate defenses detect conserved pathogen signatures without prior clonal expansion:
- **Pattern Recognition Receptors (PRRs)** bind **Pathogen-Associated Molecular Patterns (PAMPs)**:
  - **Toll-Like Receptors (TLRs)**:
    - *TLR4* (cell surface with MD-2 and CD14): Recognizes Gram-negative **lipopolysaccharide (LPS)**.
    - *TLR5* (cell surface): Recognizes bacterial **flagellin**.
    - *TLR3* (endosomal): Recognizes viral **double-stranded RNA (dsRNA)**.
    - *TLR7/8* (endosomal): Recognizes single-stranded RNA (ssRNA).
    - *TLR9* (endosomal): Recognizes unmethylated **CpG DNA motifs**.
  - Signal transduction via **MyD88** or **TRIF** activates **NF-$\kappa$B** and **IRF3/7**, driving pro-inflammatory cytokines ($TNF-\alpha, IL-1\beta, IL-6$) and Type I interferons ($IFN-\alpha/\beta$).
- **The Complement Cascade**:
  - Three distinct triggering pathways:
    1. **Classical Pathway**: $C1qrs$ binds antibody-antigen complexes ($IgM$ pentamer or clustered $IgG$).
    2. **Lectin Pathway**: Mannose-Binding Lectin (MBL) or ficolins bind terminal mannose/fructose on microbes.
    3. **Alternative Pathway**: Spontaneous 'tick-over' hydrolysis of $C3$ to $C3(H_2O)$, binding Factor B and Factor D.
  - Convergence: Classical/Lectin assemble **C4b2a** ($C3$ convertase); Alternative assembles **C3bBb** ($C3$ convertase).
  - Convertases cleave $C3 \to C3a$ (anaphylatoxin recruiting mast cells) and **$C3b$** (major opsonin for macrophage phagocytosis).
  - $C5$ convertases ($C4b2a3b$ or $C3bBb3b$) cleave $C5 \to C5a$ (potent neutrophil chemoattractant) and $C5b$.
  - $C5b$ recruits $C6, C7, C8$ and multiple $C9$ monomers to polymerize the transmembrane **Membrane Attack Complex (MAC, $C5b-9$)**, causing osmotic lysis of target pathogens!`
      },
      {
        heading: "2. V(D)J Somatic Recombination & B-Cell Diversification",
        content: `Generating an immense repertoire of $B$-cell receptors ($BCR$) and $T$-cell receptors ($TCR$) from limited germline genes:
- **V(D)J Recombination**:
  - Immunoglobulin Heavy chain ($IgH$) and $TCR\beta$ loci contain **Variable (V)**, **Diversity (D)**, and **Joining (J)** gene segments.
  - Light chain ($Ig\kappa, Ig\lambda$) and $TCR\alpha$ loci contain only V and J segments.
  - **RAG1 and RAG2 Endonucleases**: Recognize conserved **Recombination Signal Sequences (RSS)** with 12-bp and 23-bp spacers (*12/23 Rule* ensures $V$ joins only to $D$, and $D$ to $J$). RAG cleaves double-stranded DNA, forming DNA hairpin intermediates.
  - **Junctional Diversity**: Hairpins are nicked asymmetrically by **Artemis endonuclease**, generating **P-nucleotides** (palindromic). **Terminal Deoxynucleotidyl Transferase (TdT)** randomly inserts non-templated **N-nucleotides** before DNA ligase IV joins the coding ends.
- **Somatic Hypermutation & Class Switch Recombination**:
  - Occurs in germinal centers of secondary lymphoid organs after antigen activation.
  - Driven by **Activation-Induced Cytidine Deaminase (AID)**, which deaminates cytosine to uracil in single-stranded DNA.
  - Mismatch repair and base excision repair generate point mutations in hypervariable regions (Complementarity Determining Regions, CDRs) $\to$ **Affinity Maturation**!
  - Class Switching: AID targets switch ($S$) regions upstream of constant heavy ($C_H$) genes, looping out DNA to switch from $IgM/IgD$ to $IgG$, $IgA$, or $IgE$ without altering antigen specificity.`
      },
      {
        heading: "3. MHC Restriction: Class I vs. Class II Antigen Presentation",
        content: `T cells recognize antigens only when presented as peptide fragments within Major Histocompatibility Complex molecules:
- **MHC Class I Pathway (Endogenous Antigens)**:
  - Present on **all nucleated cells**; presents peptides (8-10 amino acids) to **$\text{CD8}^+$ Cytotoxic T Lymphocytes (CTLs)**.
  - Structure: Heterodimer of a polymorphic $\alpha$-chain ($\alpha_1, \alpha_2, \alpha_3$) non-covalently paired with invariant **$\beta_2$-microglobulin**.
  - Mechanism: Cytosolic viral or tumor proteins are degraded by the **immunoproteasome**. Peptides are pumped into the ER lumen by **TAP1/TAP2 transporters**. Chaperones (calreticulin, tapasin) load peptide into MHC I groove; transported via Golgi to cell surface.
  - CTL killing: CTL releases **perforin** (forms membrane pore) and **granzymes** (serine proteases cleaving procaspases and Bid, inducing apoptosis), or engages **FasL** with target cell Fas.
- **MHC Class II Pathway (Exogenous Antigens)**:
  - Restricted to **Professional Antigen-Presenting Cells (APCs)**: Dendritic cells, Macrophages, and B lymphocytes. Presents longer peptides (13-25 amino acids) to **$\text{CD4}^+$ T Helper cells**.
  - Structure: Heterodimer of two transmembrane chains: $\alpha$ ($\alpha_1, \alpha_2$) and $\beta$ ($\beta_1, \beta_2$).
  - Mechanism: Extracellular antigens endocytosed into acidic endolysosomes. MHC II synthesized in ER associates with the **Invariant Chain (Ii / CD74)** to prevent premature peptide binding. In endosome, cathepsins cleave Ii leaving a small peptide remnant (**CLIP**). **HLA-DM** catalyzes exchange of CLIP for foreign antigenic peptide; complex delivered to cell surface.`
      },
      {
        heading: "4. T-Helper Subsets & Gell-Coombs Hypersensitivity",
        content: `CD4+ T cell specialization and clinical immunopathology:
- **$\text{CD4}^+$ T-Helper Lineage Commitment**:
  - **Th1**: Induced by $IL-12$ and $IFN-\gamma$; master transcription factor **T-bet**. Secretes $IFN-\gamma$; activates macrophages against intracellular pathogens (e.g., *Mycobacterium*).
  - **Th2**: Induced by $IL-4$; master transcription factor **GATA3**. Secretes $IL-4, IL-5, IL-13$; drives eosinophils, mast cells, and $IgE$ class switching against helminth parasites.
  - **Th17**: Induced by $TGF-\beta, IL-6, IL-23$; master transcription factor **ROR$\gamma t$**. Secretes $IL-17$; recruits neutrophils for extracellular fungal/bacterial defense.
  - **Treg (Regulatory T cell)**: Induced by $TGF-\beta$; master transcription factor **FoxP3**. Secretes $IL-10$ and $TGF-\beta$; suppresses autoreactive immune responses (loss causes IPEX syndrome).
- **Gell and Coombs Hypersensitivity Classification**:
  - **Type I (Immediate / Anaphylactic)**: Antigen crosslinks allergen-specific **$IgE$** bound to $Fc\epsilon RI$ on mast cells $\to$ degranulation of histamine, leukotrienes, prostaglandins (e.g., anaphylaxis, asthma).
  - **Type II (Antibody-Mediated Cytotoxic)**: $IgG$ or $IgM$ binds cell surface antigens $\to$ complement activation or ADCC (e.g., Rh disease / erythroblastosis fetalis, Goodpasture syndrome).
  - **Type III (Immune Complex-Mediated)**: Circulating antigen-antibody complexes deposit in microvasculature, activating complement and neutrophils (e.g., Systemic Lupus Erythematosus, post-streptococcal glomerulonephritis).
  - **Type IV (Delayed-Type Hypersensitivity, DTH)**: Cell-mediated; sensitized Th1 cells release $IFN-\gamma$, recruiting and activating macrophages 24-72 hours post-exposure (e.g., tuberculin PPD skin test, poison ivy contact dermatitis).`
      }
    ]
  },

  {
    id: "animal-7-reproduction-development",
    domainId: "animal_phys",
    title: "Reproduction, Embryonic Development & Morphogenesis",
    subtitle: "HPG Axis, Acrosome/Cortical Reactions, Gastrulation & Hox Gene Collinearity",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 32,
    prerequisites: ["animal-6-immunity"],
    sources: ["Vander's Human Physiology Ch. 17 (Reproduction)", "Gilbert: Developmental Biology (11th/12th Ed)", "Alberts MBoC Ch. 21-22"],
    interactiveTool: null,
    summary: "Integrate reproductive endocrinology and animal embryology: the hypothalamic-pituitary-gonadal (HPG) pulsatile feedback axis, spermatogenesis vs oogenesis, the cortical reaction and blocks to polyspermy, blastomere cleavage dynamics, Spemann-Mangold dorsal lip organizer signaling (BMP antagonism via chordin/noggin), Drosophila maternal effect cascades (bicoid/nanos), and homeotic Hox gene spatial/temporal collinearity.",
    keyFormulas: [
      { name: "Cortical Reaction Calcium Wave", latex: "\text{IP}_3 \to \text{ER } \text{Ca}^{2+} \text{ release} \to \text{Cortical granule exocytosis} \to \text{Hardening of fertilization envelope}" }
    ],
    sections: [
      {
        heading: "1. The HPG Axis & Gametogenesis",
        content: `Endocrine coordination of male and female reproduction:
- **Male Reproduction**:
  - Pulsatile **GnRH** from hypothalamus stimulates anterior pituitary gonadotropes to secrete **LH** and **FSH**.
  - **LH** binds Leydig (interstitial) cells $\to \\uparrow cAMP \to$ synthesis of **Testosterone**.
  - **FSH** binds Sertoli cells ('nurse cells' forming the blood-testis barrier with tight junctions) $\to$ stimulates spermatogenesis, secretes **Androgen-Binding Protein (ABP)**, and secretes **Inhibin B** (negative feedback selectively on pituitary FSH).
  - Spermatogenesis: Spermatogonium ($2n$) $\to$ primary spermatocyte ($2n$) $\to$ Meiosis I $\to$ 2 secondary spermatocytes ($1n$) $\to$ Meiosis II $\to$ 4 spermatids ($1n$) $\to$ spermiogenesis (acrosome formation, mitochondrial sheath, flagellum) $\to$ spermatozoa.
- **Female Ovarian & Uterine Cycles**:
  - **Follicular Phase**: FSH stimulates cohort of primordial follicles. Dominant follicle secretes rising **Estradiol**.
  - **Biphasic Estradiol Feedback**: Low/moderate estradiol exerts *negative feedback* on GnRH/LH/FSH. Sustained high estradiol ($> 200\text{ pg/mL}$ for $> 36\text{ hours}$) switches to **positive feedback**, triggering the massive **LH Surge**!
  - **Ovulation**: LH surge resumes Meiosis I in primary oocyte (arrested in prophase I since fetal life), arresting in **metaphase II** as a secondary oocyte, and ruptures the Graafian follicle.
  - **Luteal Phase**: Ruptured follicle transforms into **Corpus Luteum**, secreting massive **Progesterone** and estradiol, preparing secretory endometrium for implantation. If unfertilized, corpus luteum degenerates into corpus albicans; progesterone withdrawal triggers menstruation.`
      },
      {
        heading: "2. Fertilization & The Prevention of Polyspermy",
        content: `Molecular events of sperm-egg fusion:
- **Capacitation**: In the female reproductive tract, cholesterol efflux from sperm plasma membrane increases motility (hyperactivation) and membrane fluidity.
- **Acrosome Reaction**: Sperm binds glycoprotein **ZP3** on the egg's zona pellucida $\to Ca^{2+}$ influx $\to$ exocytosis of acrosomal enzymes (hyaluronidase, acrosin) to digest path through zona pellucida.
- **Fusion**: Sperm protein **Izumo1** binds egg membrane receptor **Juno**, initiating gamete fusion.
- **Blocks to Polyspermy**:
  1. **Fast Block (External Fertilizers, e.g., Sea Urchin)**: Immediate influx of $Na^+$ depolarizes egg membrane from $-70\text{ mV}$ to $+20\text{ mV}$ within 1-3 seconds, preventing further sperm fusion (positively charged membrane repels sperm). Transient ($< 1\text{ minute}$).
  2. **Slow Block (Cortical Reaction, Universal)**: Sperm PLC-$\zeta$ hydrolyzes $PIP_2 \to IP_3 \to$ triggers a self-propagating **wave of intracellular free $Ca^{2+}$** sweeping from site of sperm entry. High $Ca^{2+}$ drives exocytosis of **cortical granules** releasing ovoperoxidase, proteases, and mucopolysaccharides. Proteases cleave ZP receptors (ZP2/ZP3), and water hydration lifts the zona pellucida away from the membrane, creating a hardened, impenetrable **Fertilization Envelope**.`
      },
      {
        heading: "3. Cleavage Patterns, Gastrulation & The Spemann Organizer",
        content: `Morphogenetic reorganization of the early blastula:
- **Cleavage Archetypes** dictated by yolk content and distribution:
  - *Holoblastic (Complete)*: Isolecithal (sea urchin, mammals) or mesolecithal (amphibians).
  - *Meroblastic (Incomplete)*: Telolecithal (dense yolk, discoidal cleavage at blastodisc in birds/fish) or centrolecithal (superficial cleavage around central yolk in insects).
- **Gastrulation**: Conversion of blastula into a triploblastic gastrula with three primary germ layers:
  - **Ectoderm**: Epidermis, neural tube (CNS), neural crest cells (PNS, melanocytes, facial skeleton, adrenal medulla).
  - **Mesoderm**: Notochord, somites (skeletal muscle, axial skeleton, dermis), intermediate mesoderm (kidneys, gonads), lateral plate mesoderm (circulatory system, heart, coelomic lining).
  - **Endoderm**: Epithelial lining of gastrointestinal tract, liver, pancreas, respiratory tract, thyroid.
- **The Spemann-Mangold Organizer Experiment (1924)**:
  - Transplantation of the **dorsal blastopore lip** of an amphibian gastrula to the ventral side of a host embryo induced a complete secondary body axis (conjoined twin with secondary neural tube and somites).
  - Molecular basis: Default state of ectoderm is neural! Ventral blastomeres secrete **BMP4 (Bone Morphogenetic Protein 4)**, which directs ectoderm to become epidermis.
  - The dorsal organizer secretes BMP antagonists: **Chordin**, **Noggin**, and **Follistatin**. These bind BMP4 in the extracellular space, preventing receptor binding and permitting overlying ectoderm to develop into the neural plate!`
      },
      {
        heading: "4. Genetic Pattern Formation & Hox Gene Collinearity",
        content: `Hierarchical gene regulatory networks establishing the anterior-posterior body axis:
- **Drosophila Maternal Effect Genes**:
  - *Bicoid*: Maternal mRNA anchored at anterior pole by Dynein. Upon fertilization, translates into a transcription factor that diffuses posteriorly, establishing an **anterior-to-posterior concentration gradient**. Acts as a morphogen activating anterior target genes (*hunchback*) at high thresholds.
  - *Nanos*: Maternal mRNA anchored at posterior pole by Kinesin; represses translation of maternal *hunchback* mRNA in the posterior.
- **Segmentation Gene Hierarchy**:
  1. Maternal Effect Genes (bicoid, nanos, caudal) $\to$
  2. **Gap Genes** (*Krüppel*, *knirps*, *giant*): Divide embryo into broad multi-segment domains; mutations delete contiguous blocks of segments.
  3. **Pair-Rule Genes** (*even-skipped*, *fushi tarazu*): Expressed in 7 periodic transverse stripes; mutations delete alternate segment boundaries.
  4. **Segment Polarity Genes** (*engrailed*, *wingless*): Establish anterior-posterior boundaries within each of the 14 parasegments via Wnt/Hedgehog signaling.
- **Homeotic Selector (Hox) Genes**:
  - Assign unique anatomical identity to each body segment (e.g., *Antennapedia* complex, *Bithorax* complex).
  - Contain a conserved 180-bp DNA sequence (**Homeobox**) encoding a 60-amino-acid DNA-binding domain (**Homeodomain** with helix-turn-helix motif).
  - **Collinearity Rule**: The physical order of Hox genes along the chromosome corresponds exactly to their:
    1. **Spatial Collinearity**: Order of anterior-to-posterior expression boundaries in the embryo.
    2. **Temporal Collinearity**: Order of activation timing during development (3' genes expressed earlier and more anteriorly; 5' genes expressed later and more posteriorly).
  - *Homeotic Mutations*: Transformation of one body part into another (e.g., *Antennapedia* mutation converts antennae into walking legs; *Ultrabithorax* ($Ubx$) loss-of-function transforms halteres into a second pair of wings, producing a 4-winged fly).`
      }
    ]
  },

  {
    id: "animal-8-endocrine",
    domainId: "animal_phys",
    title: "Endocrine System: Hypothalamic-Pituitary Axes & Hormone Signaling",
    subtitle: "Hormone Classes, RAAS, Thyroid Axis, Calcium Homeostasis & Insulin/Glucagon",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["animal-7-reproduction-development"],
    sources: ["Vander's Human Physiology Ch. 11 (Endocrine System)", "Guyton & Hall Ch. 76-78", "Costanzo Physiology Ch. 8-9"],
    interactiveTool: null,
    summary: "Master the endocrine regulatory network: hormone chemical classification (peptides, catecholamines, thyroid hormones, steroids), hypothalamic neurosecretory control (portal hypophyseal system vs posterior axonal transport), the Renin-Angiotensin-Aldosterone System (RAAS), calcium homeostasis (PTH, calcitonin, 1,25-(OH)2D3 calcitriol), thyroid synthesis and deiodination, and pancreatic islet metabolic integration.",
    keyFormulas: [
      { name: "Renin-Angiotensin-Aldosterone Axis", latex: "\text{Angiotensinogen} \\xrightarrow{\text{Renin}} \text{Ang I} \\xrightarrow{\text{ACE}} \text{Ang II} \to \text{Aldosterone release + Vasoconstriction}" }
    ],
    sections: [
      {
        heading: "1. Chemical Classes & Receptors of Hormones",
        content: `Hormones fall into distinct structural classes governing their transport and signaling:
- **1. Peptides & Proteins** (e.g., Insulin, Glucagon, ACTH, PTH):
  - Synthesized as preprohormones in rough ER $\to$ signal sequence cleaved to prohormone $\to$ packaged in secretory vesicles in Golgi $\to$ mature hormone stored until exocytosis.
  - Hydrophilic; circulate freely dissolved in plasma; short half-life ($t_{1/2} \approx 2-30\text{ minutes}$). Bind cell-surface GPCRs or RTKs.
- **2. Steroid Hormones** (e.g., Cortisol, Aldosterone, Testosterone, Estradiol):
  - Synthesized on-demand from **cholesterol** in adrenal cortex, gonads, and placenta (rate-limiting step: **StAR protein** transporting cholesterol into inner mitochondrial membrane where CYP11A1 / cholesterol side-chain cleavage enzyme converts it to pregnenolone).
  - Lipophilic; diffuse across membranes immediately; circulate bound to plasma carriers (**CBG, SHBG, Albumin**); long half-life ($t_{1/2} \approx 1-2\text{ hours}$). Bind intracellular nuclear receptors that dimerize, bind **Hormone Response Elements (HREs)** on DNA via zinc-finger motifs, and modulate transcription.
- **3. Amine Hormones** (derived from Tyrosine):
  - *Catecholamines* (Epinephrine, Norepinephrine, Dopamine): Water-soluble; circulate free; bind surface GPCRs ($\alpha_1, \alpha_2, \beta_1, \beta_2$).
  - *Thyroid Hormones* ($T_3, T_4$): Iodinated diphenyl ethers; lipophilic; circulate $> 99.9\%$ bound to **Thyroxine-Binding Globulin (TBG)**; bind intracellular nuclear thyroid hormone receptors (TRs).`
      },
      {
        heading: "2. The Hypothalamic-Pituitary Network",
        content: `The central conductor of endocrine homeostasis:
- **Anterior Pituitary (Adenohypophysis)**:
  - Derived embryologically from an oral ectoderm upgrowth (**Rathke's pouch**).
  - Controlled by hypothalamic hypophysiotropic hormones transported via the **Hypothalamo-Hypophyseal Portal System**:
    - **TRH** $\to$ Thyrotropes $\to$ **TSH** (thyroid).
    - **CRH** $\to$ Corticotropes $\to$ **ACTH** (adrenal cortex).
    - **GnRH** $\to$ Gonadotropes $\to$ **LH & FSH** (gonads).
    - **GHRH** (+) and **Somatostatin** (-) $\to$ Somatotropes $\to$ **Growth Hormone (GH)** (stimulates hepatic **IGF-1**).
    - **Dopamine (Prolactin-Inhibiting Hormone)** (-) $\to$ Lactotropes $\to$ **Prolactin (PRL)**.
  - *Feedback Loops*: Long-loop negative feedback (peripheral gland hormone inhibits pituitary and hypothalamus); Short-loop feedback (anterior pituitary hormone inhibits hypothalamus).
- **Posterior Pituitary (Neurohypophysis)**:
  - Down-growth of neural ectoderm from diencephalon. Consists of pituicytes and unmyelinated axon terminals whose cell bodies reside in the hypothalamus:
    - **Supraoptic Nucleus**: Synthesizes **Antidiuretic Hormone (ADH / Arginine Vasopressin)**.
    - **Paraventricular Nucleus**: Synthesizes **Oxytocin**.
  - Transported down hypothalamo-hypophyseal tract bound to **neurophysin** carriers and stored in Herring bodies for calcium-dependent exocytosis.`
      },
      {
        heading: "3. The Adrenal Gland & The RAAS Axis",
        content: `Adrenal functional zoning and blood pressure regulation:
- **Adrenal Cortex (Mesoderm)**: Three distinct concentric zones (**GFR = Salt, Sugar, Sex**):
  1. **Zona Glomerulosa** (outer $15\%$): Lacks $17\alpha$-hydroxylase. Synthesizes **Aldosterone** (mineralocorticoid) driven by Angiotensin II and hyperkalemia ($K^+$).
  2. **Zona Fasciculata** (middle $75\%$): Synthesizes **Cortisol** (glucocorticoid) driven by ACTH. Cortisol stimulates gluconeogenesis, lipolysis, protein catabolism, and suppresses immune responses by inhibiting $PLA_2$, $COX-2$, and $NF-\kappa B$.
  3. **Zona Reticularis** (inner $10\%$): Synthesizes adrenal androgens (**DHEA, Androstenedione**).
- **Adrenal Medulla (Neural Crest)**: Chromaffin cells act as modified postganglionic sympathetic neurons, secreting **Epinephrine ($80\%$)** and **Norepinephrine ($20\%$)** driven by preganglionic acetylcholine.
- **The Renin-Angiotensin-Aldosterone System (RAAS)**:
  1. Renal hypoperfusion or low $NaCl$ delivery to macula densa triggers **Juxtaglomerular (JG) cells** to secrete **Renin**.
  2. Renin cleaves hepatic **Angiotensinogen** into decapeptide **Angiotensin I**.
  3. **Angiotensin-Converting Enzyme (ACE)** (primarily on pulmonary vascular endothelium) cleaves Ang I to octapeptide **Angiotensin II**.
  4. Angiotensin II actions: Potent systemic arteriolar vasoconstriction; stimulates hypothalamic thirst and ADH release; binds $AT_1$ receptors in zona glomerulosa to stimulate **Aldosterone** release.
  5. Aldosterone binds mineralocorticoid receptors in renal cortical collecting duct principal cells $\to$ upregulates apical **ENaC** ($Na^+$ channels) and basolateral **$Na^+/K^+\text{-ATPase}$**, driving $Na^+$ reabsorption, water retention, and $K^+/H^+$ excretion.`
      },
      {
        heading: "4. Calcium Homeostasis & Pancreatic Islet Dynamics",
        content: `Endocrine control of blood calcium and blood glucose:
- **Calcium Homeostasis** (Normal serum ionized $Ca^{2+} \approx 1.1-1.3\text{ mmol/L}$):
  - **Parathyroid Hormone (PTH)**: Secreted by parathyroid chief cells when **Calcium-Sensing Receptors (CaSR)** detect low ionized $Ca^{2+}$.
    - *Bone*: Binds osteoblasts $\to$ upregulates **RANKL** while suppressing Osteoprotegerin (OPG) $\to$ RANKL binds RANK on osteoclast precursors $\to$ osteoclast activation and bone resorption.
    - *Kidney*: Stimulates $Ca^{2+}$ reabsorption in distal convoluted tubule; inhibits phosphate reabsorption in proximal tubule (phosphaturic effect); activates **$1\alpha$-hydroxylase (CYP27B1)** converting calcidiol ($25\text{-OH } D_3$) into active **Calcitriol ($1,25\text{-(OH)}_2 D_3$)**.
    - *Intestine*: Calcitriol upregulates apical **TRPV6** channels, cytosolic **calbindin-D9k**, and basolateral **PMCA1b**, stimulating intestinal calcium and phosphate absorption.
  - **Calcitonin**: Secreted by parafollicular C cells of thyroid in response to hypercalcemia; directly inhibits osteoclastic bone resorption.
- **Pancreatic Islet Endocrine Physiology**:
  - **$\beta$-Cells (Insulin)**: High blood glucose enters via **GLUT2** (rodents) / **GLUT1** (humans) $\to$ glucokinase glycolysis $\to \\uparrow [ATP]/[ADP] \to$ **closes ATP-sensitive $K^+$ channels ($K_{\text{ATP}}$)** $\to$ membrane depolarization $\to$ opens voltage-gated $Ca^{2+}$ channels $\to Ca^{2+}$ influx triggers **insulin exocytosis**!
  - Insulin binds receptor tyrosine kinase (IR) $\to$ IRS1/2 $\to$ PI3K $\to$ Akt $\to$ translocation of **GLUT4** vesicles to plasma membrane in skeletal muscle and adipose tissue; stimulates glycogen synthesis and lipogenesis.
  - **$\alpha$-Cells (Glucagon)**: Secreted during hypoglycemia; acts via GPCR-$G_{\alpha s}-cAMP-PKA$ in liver to stimulate glycogenolysis and gluconeogenesis.`
      }
    ]
  },

  // ==================== DOMAIN 4: GENETICS & MOLECULAR EVOLUTION (20%) ====================
  {
    id: "genetics-1-mapping",
    domainId: "genetics",
    title: "Linkage Mapping, Three-Point Crosses & Tetrad Analysis",
    subtitle: "Recombination Frequencies, Interference (1-COC), Lod Scores, and Ordered Tetrads",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: [],
    sources: ["Pierce: Genetics Ch. 7 (Linkage, Recombination, and Mapping)", "Griffiths: Introduction to Genetic Analysis Ch. 4-5"],
    interactiveTool: "three_point_cross_linkage_mapper",
    summary: "Systematically solve three-point testcrosses: identify parental vs double crossover classes, establish gene order, compute map distances, calculate interference (I = 1 - COC), evaluate lod scores, and perform ordered and unordered tetrad analysis in Neurospora and yeast.",
    keyFormulas: [
      { name: "Coefficient of Coincidence (COC)", latex: "COC = \\frac{\\text{Observed DCO Frequency}}{\\text{Expected DCO Frequency}} = \\frac{\\text{Observed DCO}}{(\\text{Dist}_1) \\times (\\text{Dist}_2) \\times N}" },
      { name: "Interference", latex: "I = 1 - COC \\quad (I > 0: \\text{positive interference; } I < 0: \\text{negative interference})" },
      { name: "Gene-Centromere Distance (Ordered Tetrads)", latex: "d = \\frac{1}{2} \\left( \\frac{\\text{Second-Division Asymmetric Asci (SDS)}}{\\text{Total Asci}} \\right) \\times 100 \\text{ cM}" },
      { name: "Lod Score (Z)", latex: "Z = \\log_{10} \\left( \\frac{P(\\text{Data} \\mid \\theta)}{P(\\text{Data} \\mid \\theta = 0.5)} \\right) \\quad (Z \\ge 3.0 \\text{ confirms linkage})" }
    ],
    sections: [
      {
        heading: "1. Three-Point Testcross Algorithmic Workflow",
        content: `Analyzing offspring from a trihybrid testcross ($AaBbCc \\times aabbcc$):
1. **Identify Parentals (Non-crossovers, NCO)**: The two reciprocal phenotypic classes with the highest counts.
2. **Identify Double Crossovers (DCO)**: The two reciprocal phenotypic classes with the lowest counts.
3. **Determine Gene Order**: Compare the alleles present in the DCO classes with the parental classes. **Only the middle gene will be swapped between the two homologs in the DCO!**
4. **Compute Map Distances**:
   - Distance between gene 1 and gene 2 (middle) $= \\frac{\\text{SCO}_{1-2} + \\text{DCO}}{\\text{Total Offspring}} \\times 100\\text{ cM}$.
   - Distance between middle gene 2 and gene 3 $= \\frac{\\text{SCO}_{2-3} + \\text{DCO}}{\\text{Total Offspring}} \\times 100\\text{ cM}$.
5. **Compute Interference ($I$)**:
   - $\\text{Expected DCO count} = \\text{Dist}_1 \\times \\text{Dist}_2 \\times N$.
   - $\\text{Coefficient of Coincidence } (COC) = \\frac{\\text{Observed DCO}}{\\text{Expected DCO}}$.
   - $\\text{Interference } I = 1 - COC$.
   - If $I = 1.0$, complete interference (no double crossovers observed). If $I = 0.40$, a crossover in region 1 reduces probability of crossover in region 2 by $40\\%$.`
      },
      {
        heading: "2. Lod Score (Logarithm of the Odds) Analysis",
        content: `Used in human pedigree genetics where sample sizes are small and planned testcrosses are impossible:
$$Z = \\log_{10} \\left( \\frac{L(\\theta)}{L(0.5)} \\right) = \\log_{10} \\left( \\frac{\\theta^R (1 - \\theta)^{NR}}{(0.5)^{R + NR}} \\right)$$
- $\\theta$: Recombination fraction ($0 \\le \\theta \\le 0.5$).
- $R$: Number of recombinant individuals; $NR$: Number of non-recombinant individuals.
- **Clinical Significance Thresholds**:
  - $Z \\ge +3.0$: Confirmed statistical evidence for linkage ($1000 : 1$ odds in favor of linkage).
  - $Z \\le -2.0$: Exclusion of linkage at that recombination fraction $\\theta$.
  - $-2.0 < Z < 3.0$: Inconclusive; requires additional pedigrees.`
      },
      {
        heading: "3. Tetrad Analysis in Neurospora & Yeast",
        content: `Ascomycete fungi retain the four meiotic products within an ascus:
- **Ordered Tetrads (*Neurospora crassa*)**:
  - Spores are arranged linearly according to the two meiotic divisions (plus one post-meiotic mitosis yielding 8 linear ascospores).
  - **First-Division Segregation (FDS, 4:4 pattern)**: Segregation of alleles occurred at Meiosis I $\\to$ no crossover between gene and centromere!
  - **Second-Division Segregation (SDS, 2:2:2:2 or 2:4:2 pattern)**: Crossover occurred between gene and centromere!
  - Distance from gene to centromere: $d = \\frac{1}{2} \\left( \\frac{\\text{SDS asci}}{\\text{Total asci}} \\right) \\times 100\\text{ cM}$ (factor of $1/2$ because only two of the four chromatids in the bivalent crossed over).
- **Unordered Tetrads (*Saccharomyces cerevisiae*)**:
  - Classify asci into **Parental Ditype (PD)**, **Non-Parental Ditype (NPD)**, and **Tetratype (TT)**.
  - If $PD \\gg NPD$: The two genes are **linked** on the same chromosome!
  - If $PD \\approx NPD$: The two genes are on separate chromosomes (independent assortment).
  - Map distance between two linked genes:
    $$d = \\frac{NPD + 0.5 TT}{\\text{Total Asci}} \\times 100\\text{ cM}$$`
      }
    ]
  },

  {
    id: "genetics-2-popgen",
    domainId: "genetics",
    title: "Population Genetics: Selection Models, Inbreeding & Neutral Theory",
    subtitle: "Overdominance, Mutation-Selection Balance, Ne, Wright's FST, and dN/dS Ratios",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["genetics-1-mapping"],
    sources: ["Futuyma: Evolution Ch. 6-7 (Genetics of Populations)", "Herron & Freeman: Evolutionary Analysis Ch. 6-7"],
    interactiveTool: null,
    summary: "Master quantitative evolutionary genetics: multi-allelic Hardy-Weinberg, general selection models, overdominance equilibrium, mutation-selection balance for lethal recessives, effective population size (Ne) corrections, Wright's F-statistics, and the dN/dS molecular evolution test for selection.",
    keyFormulas: [
      { name: "Overdominance Equilibrium Frequency", latex: "\\hat{p} = \\frac{s_2}{s_1 + s_2}, \\quad \\hat{q} = \\frac{s_1}{s_1 + s_2} \\quad (w_{11}=1-s_1, w_{12}=1, w_{22}=1-s_2)" },
      { name: "Mutation-Selection Balance (Recessive)", latex: "\\hat{q} = \\sqrt{\\frac{\\mu}{s}} \\quad (\\hat{q} = \\frac{\\mu}{s} \\text{ for dominant})" },
      { name: "Effective Population Size (Sex Ratio Unequal)", latex: "N_e = \\frac{4 N_m N_f}{N_m + N_f}" },
      { name: "Wright's Fixation Index (FST)", latex: "F_{ST} = \\frac{V_p}{\\bar{p}(1 - \\bar{p})} = \\frac{H_T - \\bar{H}_S}{H_T} \\approx \\frac{1}{4 N_e m + 1}" },
      { name: "dN/dS (ω) Ratio Test", latex: "\\omega = \\frac{d_N}{d_S} \\quad (\\omega < 1: \\text{purifying; } \\omega = 1: \\text{neutral; } \\omega > 1: \\text{positive Darwinian selection})" }
    ],
    sections: [
      {
        heading: "1. The General Viability Selection Model",
        content: `Tracking allele frequency change under differential fitness:
- Genotypes: $A_1A_1$, $A_1A_2$, $A_2A_2$ with initial frequencies $p^2$, $2pq$, $q^2$.
- Relative fitness values: $w_{11}$, $w_{12}$, $w_{22}$.
- Mean population fitness: $\\bar{w} = p^2 w_{11} + 2pq w_{12} + q^2 w_{22}$.
- Frequency of allele $A_1$ in next generation:
  $$p' = \\frac{p^2 w_{11} + pq w_{12}}{\\bar{w}}$$
- **Equilibria**:
  - **Overdominance (Heterozygote Advantage)**: $w_{12} > w_{11}$ and $w_{12} > w_{22}$. Leads to stable polymorphism!
    - Example: Sickle-cell trait ($HbA/HbS$) in malaria-endemic regions.
    - Equilibrium: $\\hat{p} = \\frac{s_2}{s_1 + s_2}$, where $s_1 = 1 - w_{11}$ and $s_2 = 1 - w_{22}$.
  - **Underdominance (Heterozygote Disadvantage)**: $w_{12} < w_{11}$ and $w_{12} < w_{22}$. Unstable equilibrium point; one allele will inevitably be fixed depending on starting frequency.`
      },
      {
        heading: "2. Effective Population Size ($N_e$)",
        content: `The size of an idealized Fisher-Wright population that experiences the same rate of genetic drift as the actual population:
- **Unequal Sex Ratios**:
  $$N_e = \\frac{4 N_m N_f}{N_m + N_f}$$
  - If a breeding population has $N_m = 2$ males and $N_f = 98$ females (total 100), $N_e = \\frac{4(2)(98)}{2 + 98} = 7.84$! Drift behaves as if the population had only 8 individuals.
- **Fluctuating Populations Over Time**:
  - $N_e$ is the **harmonic mean** of the population sizes across generations:
    $$\\frac{1}{N_e} = \\frac{1}{t} \\sum_{i=1}^t \\frac{1}{N_i}$$
  - A single bottleneck event (e.g., $N_1 = 1000, N_2 = 10, N_3 = 1000$) dominates the entire harmonic mean, slashing long-term effective population size.`
      },
      {
        heading: "3. Wright's F-Statistics & Population Substructure",
        content: `Quantifying inbreeding and genetic differentiation:
- Hierarchical relationship:
  $$(1 - F_{IT}) = (1 - F_{IS})(1 - F_{ST})$$
  - $F_{IS}$: Inbreeding coefficient of individuals relative to their local subpopulation (due to non-random mating within demes).
  - $F_{ST}$: Fixation index measuring genetic differentiation among subpopulations relative to total population.
  - $F_{IT}$: Total inbreeding coefficient of an individual relative to the whole metapopulation.
- **Island Model of Gene Flow**:
  $$F_{ST} \\approx \\frac{1}{4 N_e m + 1}$$
  - $N_e m$: Number of effective migrants per generation.
  - If $N_e m > 1$ (even just **one migrant per generation**), gene flow is sufficient to prevent complete genetic divergence due to drift!`
      },
      {
        heading: "4. Molecular Evolution & The $d_N/d_S$ Selection Test",
        content: `Detecting evolutionary forces at the protein coding sequence level:
- **Kimura's Neutral Theory of Molecular Evolution**:
  - The vast majority of evolutionary changes at the molecular level are caused by random drift of selectively neutral or nearly neutral mutations.
  - Rate of neutral substitution per generation equals the neutral mutation rate per gamete: $K = \\mu_0$, completely independent of population size $N$!
- **Non-synonymous vs. Synonymous Substitutions**:
  - $d_N$: Rate of non-synonymous substitutions per non-synonymous site (changes amino acid).
  - $d_S$: Rate of synonymous substitutions per synonymous site (silent mutation).
  - **Interpreting $\\omega = d_N / d_S$**:
    - $\\omega < 1$: **Purifying (Negative) Selection**. Eliminates deleterious amino acid substitutions to preserve protein function (majority of conserved housekeeping enzymes, e.g., actin, histone H4 $\\omega < 0.05$).
    - $\\omega = 1$: **Neutral Drift**. Amino acid changes are functionally neutral.
    - $\\omega > 1$: **Positive (Darwinian Diversifying) Selection**. Rapid adaptive evolution driven by selective advantage (antigen recognition groove of MHC molecules, snake venoms, viral spike proteins).`
      }
    ]
  },

  
  {
    id: "genetics-3-mendelian-extensions",
    domainId: "genetics",
    title: "Advanced Mendelian Genetics: Epistasis, Penetrance & Quantitative Traits",
    subtitle: "Modified Dihybrid Ratios, Genomic Imprinting, X-Inactivation & Heritability",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 28,
    prerequisites: ["genetics-2-popgen"],
    sources: ["Pierce: Genetics - A Conceptual Approach Ch. 5, 12, 23", "Griffiths: Introduction to Genetic Analysis Ch. 2-6"],
    interactiveTool: null,
    summary: "Master complex non-Mendelian inheritance patterns: epistasis topologies and modified dihybrid F2 ratios (recessive 9:3:4, dominant 12:3:1, duplicate recessive 9:7, duplicate dominant 15:1), complementation testing, penetrance vs expressivity, dosage compensation (lyonization and XIST lncRNA), parent-of-origin genomic imprinting (Igf2/H19 ICR), and quantitative genetics (narrow-sense vs broad-sense heritability and the Breeder's Equation).",
    keyFormulas: [
      { name: "Broad-Sense Heritability", latex: "H^2 = \frac{V_G}{V_P} = \frac{V_A + V_D + V_I}{V_G + V_E}" },
      { name: "Narrow-Sense Heritability", latex: "h^2 = \frac{V_A}{V_P} \quad (V_A: \text{Additive genetic variance})" },
      { name: "Breeder's Equation for Response to Selection", latex: "R = h^2 S \quad (R: \text{Response to selection}, S: \text{Selection differential})" }
    ],
    sections: [
      {
        heading: "1. Epistasis Topologies & Modified 9:3:3:1 Ratios",
        content: `Epistasis occurs when the phenotypic expression of one gene locus masks or alters the phenotypic expression of an independent unlinked locus. In an $AaBb \times AaBb$ dihybrid cross:
- **Standard Dihybrid Ratio**: $9\,(A\_B\_) : 3\,(A\_bb) : 3\,(aaB\_) : 1\,(aabb)$.
- **Recessive Epistasis (9:3:4)**: Homozygous recessive genotype $aa$ masks the phenotypic expression of alleles at locus $B$.
  - *Example*: Labrador coat color. Genotype $ee$ (recessive locus for pigment deposition) produces yellow labs regardless of whether the pigment locus is black ($B\_$) or brown ($bb$).
- **Dominant Epistasis (12:3:1)**: Presence of a single dominant allele $A$ masks alleles at locus $B$.
  - Genotypes $9\,A\_B\_ + 3\,A\_bb$ yield the epistatic phenotype ($12$), while $3\,aaB\_$ and $1\,aabb$ show distinct phenotypes (e.g., summer squash fruit color).
- **Duplicate Recessive Epistasis / Complementary Genes (9:7)**: Homozygous recessive at *either* locus ($aa$ or $bb$) blocks the biochemical pathway, yielding identical mutant phenotypes.
  - Only $A\_B\_$ produces wild-type color ($9$), while $3\,A\_bb + 3\,aaB\_ + 1\,aabb = 7$ are albino (e.g., sweet pea flower color, where enzymes $A$ and $B$ are sequential in anthocyanin biosynthesis).
- **Duplicate Genes with Cumulative Effect (9:6:1)**: Dominant alleles at both loci produce one phenotype ($9$), dominant at either locus produces an intermediate phenotype ($3 + 3 = 6$), and double recessive produces the third ($1$).
- **Duplicate Dominant Epistasis (15:1)**: A dominant allele at *either* locus ($A\_$ or $B\_$) produces the wild-type phenotype (e.g., shepherd's purse triangular seed capsule; only double recessive $aabb$ produces ovoid capsules).
- **Dominant and Recessive (Inhibitory) Epistasis (13:3)**: Dominant allele $A$ acts as an inhibitor of dominant allele $B$ ($9\,A\_B\_ + 3\,A\_bb + 1\,aabb = 13$; only $3\,aaB\_$ show phenotype).
- **Complementation Test**: Crossing two homozygous recessive mutants producing wild-type offspring indicates mutations reside in **different genes** (they complement). If offspring are mutant, mutations are allelic (same gene).`
      },
      {
        heading: "2. Penetrance, Expressivity & Lethal Alleles",
        content: `Phenotypic variation arising from genetic background and environment:
- **Penetrance**: The percentage of individuals with a given genotype who exhibit the associated phenotype.
  - *Incomplete Penetrance*: Polydactyly may exhibit $70\%$ penetrance (an individual carrying the dominant allele has a $30\%$ chance of displaying completely normal digits).
- **Expressivity**: The degree or severity with which a particular genotype is expressed phenotypically in a single individual (e.g., variable expression of neurofibromatosis type 1 café-au-lait spots and neurofibromas).
- **Recessive Lethal Alleles**: Alleles essential for survival that cause embryonic death when homozygous.
  - *Classic Example*: Yellow coat color in mice (*Agouti* locus, $A^y$). Crossing two yellow mice ($A^y A \times A^y A$) yields a **2 yellow : 1 agouti** phenotypic ratio among surviving offspring because homozygous $A^y A^y$ embryos die *in utero*.`
      },
      {
        heading: "3. Dosage Compensation, XIST & Genomic Imprinting",
        content: `Epigenetic mechanisms regulating gene dosage:
- **Dosage Compensation (Lyonization)**:
  - In mammalian female somatic cells ($XX$), one of the two X chromosomes is randomly and permanently silenced in early embryogenesis, condensing into a heterochromatic **Barr Body**.
  - Controlled by the **X Inactivation Center (XIC)** encoding the long non-coding RNA **XIST**.
  - XIST RNA coats the future inactive X chromosome ($Xi$) in cis, recruiting histone methyltransferases (**Polycomb Repressive Complex 2 / PRC2**), depositing repressive **H3K27me3** marks, macroH2A, and extensive CpG DNA methylation.
  - Females are functional **genetic mosaics** for X-linked alleles (e.g., calico cat coat color, anhidrotic ectodermal dysplasia).
- **Genomic Imprinting (Parent-of-Origin Expression)**:
  - Epigenetic silencing of a specific allele depending strictly on whether it was inherited from the mother or the father, established in the parental germline via differential DNA methylation of **Imprinting Control Regions (ICRs)**.
  - *Igf2 / H19 Locus*:
    - Maternal chromosome: Unmethylated ICR binds **CTCF insulator protein**, blocking downstream enhancer from activating *Igf2*; enhancer instead activates *H19* lncRNA.
    - Paternal chromosome: Methylated ICR prevents CTCF binding; enhancer bypasses *H19* and directly activates paternal **Igf2** (Insulin-like Growth Factor 2).
  - *Prader-Willi vs. Angelman Syndromes*: Deletion of 15q11-q13 inherited from father causes Prader-Willi (loss of paternally expressed *SNRPN*); same deletion inherited from mother causes Angelman syndrome (loss of maternally expressed *UBE3A*).`
      },
      {
        heading: "4. Quantitative Genetics & Heritability Partitioning",
        content: `Polygenic traits exhibiting continuous variation across a population:
- **Phenotypic Variance ($V_P$) Decomposition**:
  $$V_P = V_G + V_E + V_{G \times E}$$
  Genetic variance ($V_G$) decomposes into:
  $$V_G = V_A + V_D + V_I$$
  - $V_A$: Additive genetic variance (variance due to additive effect of individual alleles; directly responds to natural or artificial selection).
  - $V_D$: Dominance genetic variance (non-linear interactions between alleles at same locus).
  - $V_I$: Epistatic (genic interaction) variance (interactions between alleles at different loci).
- **Heritability Metrics**:
  - **Broad-Sense Heritability ($H^2 = V_G / V_P$)**: Proportion of phenotypic variance attributable to total genetic variation ($0 \le H^2 \le 1$). Measured in monozygotic vs dizygotic twin concordance.
  - **Narrow-Sense Heritability ($h^2 = V_A / V_P$)**: Proportion of phenotypic variance attributable *strictly to additive genetic variance*. Governs resemblance between parents and offspring.
- **The Breeder's Equation**:
  $$R = h^2 S$$
  - $S$: **Selection Differential** ($S = \bar{x}_{\text{parents}} - \bar{x}_{\text{population}}$).
  - $R$: **Response to Selection** ($R = \bar{x}_{\text{offspring}} - \bar{x}_{\text{population}}$).
  - If narrow-sense heritability $h^2 = 0.60$ and parents selected for body mass average $10\text{ g}$ heavier than the population mean ($S = 10$), the expected gain in offspring is $R = 0.60 \times 10 = 6\text{ g}$!`
      }
    ]
  },

  {
    id: "genetics-4-gene-regulation",
    domainId: "genetics",
    title: "Gene Regulation: Operons, Chromatin Remodeling & Epigenetics",
    subtitle: "Lac/Trp Operon Logic, Histone Code, CpG Methylation & miRNA Silencing",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["genetics-3-mendelian-extensions"],
    sources: ["Alberts MBoC Ch. 7 (Control of Gene Expression)", "Pierce: Genetics Ch. 16-17", "Lodish: Molecular Cell Biology Ch. 7-9"],
    interactiveTool: null,
    summary: "Dissect transcriptional and epigenetic regulatory circuits: prokaryotic operon logic (lac operon dual negative/positive control, catabolite repression, trp operon attenuation and leader RNA secondary hairpin dynamics), eukaryotic chromatin remodeling (HATs/HDACs, histone methyl marks, CpG island methylation), transcription factor combinatorial architecture (enhancers, silencers, insulators, Mediator), and post-transcriptional silencing by miRNAs and siRNAs.",
    keyFormulas: [
      { name: "Diauxic Growth Monod Kinetics", latex: "\mu = \mu_{\max} \frac{[S]}{K_s + [S]} \quad (\text{Glucose consumed first; lag phase before lactose utilization})" }
    ],
    sections: [
      {
        heading: "1. Prokaryotic Operon Logic: Lac & Trp Systems",
        content: `Prokaryotes organize functionally related genes into polycistronic transcription units (**operons**):
- **The *Lac* Operon (Inducible Catabolic System)**:
  - Structural genes: *lacZ* ($\beta$-galactosidase), *lacY* (lactose permease), *lacA* (thiogalactoside transacetylase).
  - **Negative Control**: In the absence of lactose, homotetrameric **LacI repressor** binds tightly to the **operator ($lacO$)**, physically blocking RNA polymerase promoter clearance.
  - **Induction**: $\beta$-galactosidase catalyzes a side reaction converting lactose into **allolactose** (the physiological inducer). Allolactose binds LacI $\to$ allosteric conformational shift $\to$ LacI dissociates from operator.
  - **Positive Control & Catabolite Repression**:
    - High Glucose: Low cAMP. Inactive **Catabolite Activator Protein (CAP / CRP)** cannot bind. Only basal transcription occurs even if lactose is present.
    - Low Glucose: Adenylyl cyclase is active $\to \\uparrow cAMP \to$ **cAMP-CAP complex** binds the CAP site upstream of promoter, bending DNA $90^\circ$ and recruiting RNA polymerase holoenzyme.
    - Full transcription requires **BOTH**: Presence of lactose (repressor off) AND Absence of glucose (cAMP-CAP bound).
- **The *Trp* Operon (Repressible Anabolic System & Attenuation)**:
  - Repressor: TrpR is an aporepressor. High **tryptophan** acts as a **corepressor**, binding TrpR to form an active repressor that binds the operator.
  - **Attenuation Mechanics**:
    - The leader region (*trpL*) contains 4 RNA segments that can form alternative secondary structures: **1-2 hairpin** (transcription pause), **2-3 hairpin** (anti-terminator), or **3-4 hairpin** (Rho-independent intrinsic terminator followed by poly-U tract).
    - *TrpL* contains two adjacent Trp codons (UGG UGG).
    - *Low Tryptophan*: Ribosome translating *trpL* stalls at Trp codons due to lack of $Trp\text{-tRNA}^{\text{Trp}}$. Ribosome covers segment 1; segment 2 pairs with segment 3 (**2-3 anti-terminator hairpin**). The terminator cannot form $\to$ RNA polymerase transcribes the structural genes.
    - *High Tryptophan*: Ribosome translates through Trp codons without stalling to stop codon, covering segments 1 and 2. This frees segment 3 to pair with segment 4 (**3-4 terminator hairpin**) $\to$ RNA polymerase dissociates *before* transcribing structural genes!`
      },
      {
        heading: "2. Eukaryotic Chromatin Dynamics & Epigenetic Codes",
        content: `Chromatin architecture dictates transcriptional accessibility:
- **Nucleosome Structure**: Octamer of two copies each of core histones ($H2A, H2B, H3, H4$) wrapped by $147\text{ bp}$ of DNA in 1.65 left-handed superhelical turns. Histone $H1$ acts as linker histone.
- **Histone Post-Translational Modifications (The Histone Code)**:
  - **Acetylation**: Catalyzed by **Histone Acetyltransferases (HATs)** on conserved lysine residues (e.g., H3K9ac, H3K14ac). Neutralizes the positive charge of lysine, eliminating electrostatic attraction to the negatively charged DNA phosphate backbone $\to$ opens chromatin (**euchromatin**) and recruits bromodomain-containing transcription factors. Reversed by **Histone Deacetylases (HDACs)**.
  - **Methylation**: Catalyzed by Histone Methyltransferases (HMTs) on lysine and arginine residues. Does not alter electrical charge!
    - **H3K4me3**: Marks active promoters.
    - **H3K36me3**: Marks actively transcribing gene bodies.
    - **H3K9me3**: Recruits Heterochromatin Protein 1 (HP1) $\to$ forms constitutive heterochromatin.
    - **H3K27me3**: Deposited by Polycomb Repressive Complex 2 (PRC2) $\to$ facultative heterochromatic silencing of developmental genes.
- **DNA Methylation**:
  - Addition of methyl group to 5-carbon of cytosine in **CpG dinucleotides** by DNA Methyltransferases (**DNMT1** for maintenance methylation after replication; **DNMT3a/3b** for de novo methylation).
  - Unmethylated **CpG Islands** reside at promoters of $> 60\%$ of mammalian genes.
  - Hypermethylation of CpG islands recruits Methyl-CpG-Binding Domain proteins (**MBDs / MeCP2**), which recruit HDACs and histone methyltransferases, establishing permanent transcriptional silencing.`
      },
      {
        heading: "3. Eukaryotic Transcriptional Complex Assembly",
        content: `Combinatorial control and remote regulatory elements:
- **Promoter Architecture**: Core promoter contains **TATA Box** (at $-30\text{ bp}$), Initiator (Inr), and Downstream Promoter Element (DPE).
  - **TFIID** (containing **TBP - TATA-Binding Protein**) binds the minor groove of the TATA box, sharply bending DNA by $80^\circ$.
  - Sequential recruitment of TFIIA, TFIIB, TFIIF, RNA Polymerase II, TFIIE, and **TFIIH**.
  - **TFIIH Functions**: Contains a DNA helicase to melt the promoter into an open bubble, and a cyclin-dependent kinase (**CDK7**) that phosphorylates the C-Terminal Domain (CTD) of RNA Pol II at **Ser5**, triggering promoter clearance.
- **Enhancers, Silencers & The Mediator Complex**:
  - Enhancers contain clusters of binding sites for sequence-specific transcription factors (activators). Can function at distances of tens of kilobases upstream or downstream, and in either orientation.
  - DNA looping brings remote enhancers to the promoter, mediated by **Cohesin** and the multisubunit **Mediator Complex**.
- **Insulators & Chromatin Loops**:
  - **Insulator Elements** bound by **CTCF** establish Topologically Associating Domains (TADs). Prevent an enhancer from inappropriately activating a neighboring gene outside its domain and block heterochromatin spreading.`
      },
      {
        heading: "4. Post-Transcriptional Regulation: microRNAs & RNAi",
        content: `Fine-tuning gene expression post-transcriptionally:
- **microRNA (miRNA) Biogenesis & Silencing**:
  1. Primary microRNAs (**pri-miRNAs**) with stem-loop hairpins transcribed by RNA Pol II.
  2. Nuclear processing by microprocessor complex (**Drosha** RNase III and **Pasha / DGCR8**) cleaves flanking single-stranded ends, liberating a $\sim 70\text{-nt}$ precursor miRNA (**pre-miRNA**).
  3. Exported to cytoplasm by **Exportin-5** and Ran-GTP.
  4. Cytoplasmic cleavage by **Dicer** RNase III removes hairpin loop, producing a 21-25 nucleotide double-stranded miRNA duplex.
  5. The guide strand is loaded into the **RNA-Induced Silencing Complex (RISC)** containing an **Argonaute protein (Ago2)**; passenger strand is degraded.
  6. The **Seed Region** (nucleotides 2-8 of miRNA) base-pairs with the **$3'$ UTR** of target mRNAs:
     - *Imperfect complementarity* (typical in animals): Inhibits translation and recruits deadenylase complexes (CCR4-NOT) to accelerate mRNA decay.
     - *Perfect complementarity* (typical in plants and siRNAs): Triggers direct endonucleolytic cleavage of mRNA by Argonaute (**slicer activity**).
- **Iron Regulatory Proteins (IRP/IRE System)**:
  - *Ferritin* mRNA contains an Iron Response Element (IRE) in its $5'$ UTR. Under low iron, IRP binds $5'$ IRE, blocking translation. Under high iron, iron binds IRP $\to$ dissociates $\to$ ferritin synthesized.
  - *Transferrin Receptor* mRNA contains IREs in its $3'$ UTR. Under low iron, IRP binds $3'$ IRE, protecting mRNA from endonuclease cleavage. Under high iron, IRP dissociates $\to$ mRNA degraded.`
      }
    ]
  },

  // ==================== DOMAIN 5: ECOLOGY (10%) ====================
  {
    id: "eco-1-dynamics",
    domainId: "ecology",
    title: "Population Demography & Lotka-Volterra Interspecific Competition",
    subtitle: "Life Tables lx/mx, R0, Generation Time, Competition Isoclines, and Chaos",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: [],
    sources: ["Begon, Townsend, Harper: Ecology Ch. 4-8", "Ricklefs: Economy of Nature Ch. 11-14"],
    interactiveTool: null,
    summary: "Model demographic life tables (lx, mx, R0, generation time T, Euler-Lotka equation), time-lagged logistic growth leading to limit cycles and chaos, and solve Lotka-Volterra competition phase-plane isoclines to predict competitive exclusion versus stable coexistence.",
    keyFormulas: [
      { name: "Net Reproductive Rate", latex: "R_0 = \\sum_{x=0}^{\\infty} l_x m_x" },
      { name: "Cohort Generation Time", latex: "T_c = \\frac{\\sum x l_x m_x}{R_0}, \\quad r \\approx \\frac{\\ln R_0}{T_c}" },
      { name: "Time-Lagged Logistic Equation", latex: "\\frac{dN}{dt} = r N(t) \\left[ 1 - \\frac{N(t - \\tau)}{K} \\right] \\quad (r\\tau > 1.57: \\text{limit cycles/chaos})" },
      { name: "Lotka-Volterra Interspecific Competition", latex: "\\frac{dN_1}{dt} = r_1 N_1 \\left( \\frac{K_1 - N_1 - \\alpha_{12} N_2}{K_1} \\right), \\quad \\frac{dN_2}{dt} = r_2 N_2 \\left( \\frac{K_2 - N_2 - \\alpha_{21} N_1}{K_2} \\right)" }
    ],
    sections: [
      {
        heading: "1. Demographic Life Tables & Intrinsic Rate of Increase",
        content: `Quantitative cohort analysis:
- $x$: Age class.
- $l_x$: Age-specific survivorship ($l_x = N_x / N_0$). Fraction of original cohort surviving to age $x$.
- $m_x$ ($b_x$): Age-specific fecundity. Average number of female offspring produced per female of age $x$.
- **Net Reproductive Rate ($R_0$)**:
  $$R_0 = \\sum l_x m_x$$
  - $R_0 > 1$: Population is growing.
  - $R_0 = 1$: Population is stationary.
  - $R_0 < 1$: Population is declining.
- **Generation Time ($T$)**: Mean age of mothers at the birth of their offspring:
  $$T = \\frac{\\sum x l_x m_x}{R_0}$$
- **Intrinsic Rate of Natural Increase ($r$)**:
  $$r \\approx \\frac{\\ln R_0}{T}$$
  - A short generation time $T$ magnifies the effect of $R_0$ on the exponential growth rate $r$.`
      },
      {
        heading: "2. Time Lags & Non-Linear Chaotic Dynamics",
        content: `In natural populations, growth rate does not respond instantaneously to density, but with a reaction time-lag $\\tau$:
$$\\frac{dN}{dt} = r N(t) \\left[ 1 - \\frac{N(t - \\tau)}{K} \\right]$$
The behavior is dictated by the product **$r\\tau$**:
- $0 < r\\tau < 0.368$: Smooth monotonic approach to carrying capacity $K$.
- $0.368 < r\\tau < 1.57$: **Damped oscillations** converging to $K$.
- $r\\tau > 1.57$: **Stable limit cycles** (perpetual oscillations around $K$).
- For discrete logistic maps ($x_{t+1} = R x_t (1 - x_t)$), increasing growth rate $R > 3.0$ triggers period-doubling bifurcations ($2 \\to 4 \\to 8 \\to 16$), culminating in deterministic **chaos** at $R > 3.57$!`
      },
      {
        heading: "3. Lotka-Volterra Competition Phase-Plane Analysis",
        content: `Zero-growth isoclines for two competing species ($dN_1/dt = 0$ and $dN_2/dt = 0$):
- Species 1 isocline: $N_1 = K_1 - \\alpha_{12} N_2$. (Intercepts: $N_1 = K_1$ on $x$-axis; $N_2 = K_1/\\alpha_{12}$ on $y$-axis).
- Species 2 isocline: $N_2 = K_2 - \\alpha_{21} N_1$. (Intercepts: $N_1 = K_2/\\alpha_{21}$ on $x$-axis; $N_2 = K_2$ on $y$-axis).
- **The Four Possible Outcomes**:
  1. **Species 1 isocline entirely above/outside Species 2**: Species 1 always wins; Species 2 driven to extinction.
  2. **Species 2 isocline entirely above/outside Species 1**: Species 2 always wins; Species 1 driven to extinction.
  3. **Isoclines cross, and both $K$ intercepts are on the inside**:
     $$K_1 < \\frac{K_2}{\\alpha_{21}} \\quad \\text{and} \\quad K_2 < \\frac{K_1}{\\alpha_{12}} \\implies \\alpha_{12} < \\frac{K_1}{K_2} \\quad \\text{and} \\quad \\alpha_{21} < \\frac{K_2}{K_1}$$
     - **Stable Coexistence!** Intraspecific competition is stronger than interspecific competition for both species!
  4. **Isoclines cross, and both $K$ intercepts are on the outside**: Unstable equilibrium; outcome depends on initial starting densities (competitive exclusion of one species).`
      }
    ]
  },

  
  {
    id: "eco-2-ecosystems",
    domainId: "ecology",
    title: "Ecosystem Ecology: Energy Flow, Trophic Efficiency & Biogeochemistry",
    subtitle: "GPP/NPP, Lindeman's 10% Rule, Biogeochemical Cycles & Biome Classification",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 25,
    prerequisites: ["eco-1-dynamics"],
    sources: ["Begon, Townsend, Harper: Ecology Ch. 11-14 (Ecosystems)", "Ricklefs: The Economy of Nature Ch. 18-22"],
    interactiveTool: null,
    summary: "Model energy thermodynamics and elemental stoichiometry through ecosystems: Gross vs Net Primary Productivity (GPP, NPP, NEP), Lindeman's trophic efficiency breakdown (consumption, assimilation, production efficiencies), inverted biomass pyramids in aquatic pelagic systems, biogeochemical cycling (Carbon, Nitrogen, Phosphorus, Sulfur), Liebig's Law of the Minimum, and terrestrial biome climate envelopes.",
    keyFormulas: [
      { name: "Primary Productivity Net Balance", latex: "NPP = GPP - R_{\text{autotroph}}, \quad NEP = GPP - (R_{\text{autotroph}} + R_{\text{heterotroph}})" },
      { name: "Trophic Transfer Efficiency", latex: "E_T = E_C \times E_A \times E_P = \frac{I_n}{P_{n-1}} \times \frac{A_n}{I_n} \times \frac{P_n}{A_n} = \frac{P_n}{P_{n-1}} \approx 10\%" },
      { name: "Redfield Atomic Ratio (Marine Plankton)", latex: "106\,\text{C} : 16\,\text{N} : 1\,\text{P}" }
    ],
    sections: [
      {
        heading: "1. Primary Productivity Thermodynamics & Carbon Accounting",
        content: `Energy capture by autotrophs sets the thermodynamic ceiling for ecosystems:
- **Gross Primary Productivity (GPP)**: Total rate at which primary producers convert solar energy into chemical bond energy via photosynthesis per unit area per unit time ($\text{g C}\cdot \text{m}^{-2}\cdot \text{yr}^{-1}$ or $\text{J}\cdot \text{m}^{-2}\cdot \text{yr}^{-1}$).
- **Net Primary Productivity (NPP)**: Energy remaining after autotrophic respiration ($R_a$):
  $$NPP = GPP - R_a$$
  - Globally, terrestrial ecosystems contribute $\approx 55\%$ of total NPP; marine systems contribute $\approx 45\%$.
  - Tropical rainforests and coral reefs exhibit the highest NPP per unit area ($> 2000\text{ g}\cdot \text{m}^{-2}\cdot \text{yr}^{-1}$); open oceans have low areal NPP but account for the largest total global productivity due to sheer vast surface area.
- **Net Ecosystem Productivity (NEP)**: Total carbon accumulation of the entire ecosystem:
  $$NEP = GPP - (R_a + R_h) = NPP - R_h$$
  - $R_h$: Heterotrophic respiration (microbial decomposition and herbivore/carnivore consumption).
  - $NEP > 0$: The ecosystem acts as a net **carbon sink**.
  - $NEP < 0$: The ecosystem acts as a net **carbon source** (e.g., thawing tundra, dying old-growth forest under drought).`
      },
      {
        heading: "2. Trophic Dynamics & Ecological Transfer Efficiencies",
        content: `Energy transfer between trophic levels is governed by the Second Law of Thermodynamics:
- **Lindeman's Efficiency ($E_T$)**: Ratio of production at trophic level $n$ to production at level $n-1$:
  $$E_T = \frac{P_n}{P_{n-1}} = E_C \times E_A \times E_P \approx 10\% \quad (5-20\%)$$
  1. **Consumption Efficiency ($E_C = I_n / P_{n-1}$)**: Percentage of available prey biomass ingested by the predator. Low in forests ($< 5\%$ of wood/leaves consumed by herbivores; $95\%$ enters detrital food chain); high in marine phytoplankton systems ($> 50\%$).
  2. **Assimilation Efficiency ($E_A = A_n / I_n$)**: Percentage of ingested food absorbed across gut wall. Low for herbivores consuming fiber/lignin ($20-50\%$); high for carnivores ($80-90\%$).
  3. **Production Efficiency ($E_P = P_n / A_n$)**: Percentage of assimilated energy converted into new biomass (growth + reproduction).
     - **Ectotherms** (insects, fish, reptiles): High $E_P$ ($10-40\%$) because they do not expend energy on metabolic thermoregulation.
     - **Endotherms** (birds, mammals): Extremely low $E_P$ ($1-3\%$) because $> 95\%$ of assimilated energy is dissipated as heat!
- **Inverted Biomass Pyramids**: In open marine systems, phytoplankton biomass at any single moment is *smaller* than zooplankton herbivore biomass! This occurs because phytoplankton have an astronomically high **turnover rate** (high production-to-biomass ratio, $P/B$); rapid cell divisions sustain a larger, longer-lived herbivore biomass.`
      },
      {
        heading: "3. Global Biogeochemical Cycles: Carbon, Nitrogen & Phosphorus",
        content: `Nutrient cycles couple biological, geological, and atmospheric reservoirs:
- **The Nitrogen Cycle**:
  1. **Nitrogen Fixation**: Inert atmospheric $N_2$ triple bond broken by bacterial enzyme **Nitrogenase** ($16\text{ ATP}$ per $N_2$ fixed; irreversibly poisoned by $O_2$; protected by root nodule leghemoglobin in *Rhizobium*):
     $$N_2 + 8 H^+ + 8 e^- + 16 \text{ ATP} \to 2 NH_3 + H_2 + 16 \text{ ADP} + 16 P_i$$
  2. **Nitrification**: Obligate aerobic chemoautotrophic two-step oxidation:
     - *Step 1*: $NH_4^+ + 1.5 O_2 \to NO_2^- + H_2O + 2 H^+$ (catalyzed by *Nitrosomonas*).
     - *Step 2*: $NO_2^- + 0.5 O_2 \to NO_3^-$ (catalyzed by *Nitrobacter*).
  3. **Denitrification**: Facultative anaerobic respiration using nitrate as terminal electron acceptor:
     $$NO_3^- \to NO_2^- \to NO \to N_2O \to N_2 \quad (\text{catalyzed by } Pseudomonas, \text{Paracoccus})$$
  4. **Anammox (Anaerobic Ammonium Oxidation)**: Occurs in specialized membrane-bound anammoxosomes in marine suboxic zones:
     $$NH_4^+ + NO_2^- \to N_2 + 2 H_2O \quad (\text{accounts for up to } 50\% \text{ of oceanic } N_2 \text{ loss})$$
- **The Phosphorus Cycle**: Lacks a gaseous atmospheric reservoir. Slow geological weathering of apatite rock releases orthophosphate ($H_2PO_4^- / HPO_4^{2-}$). Retained tightly in terrestrial biomass; lost to ocean sediments via marine sedimentation.
- **Liebig's Law of the Minimum**: Growth of a population is controlled not by the total amount of resources available, but by the scarcest essential nutrient relative to demand (e.g., Phosphorus limits freshwater lakes; Nitrogen and Iron limit open oceans).`
      },
      {
        heading: "4. Terrestrial Biome Climate Envelopes",
        content: `Global biome distribution plotted on Whittaker's Mean Annual Temperature ($T$) vs Mean Annual Precipitation ($P$) coordinate plane:
- **Tropical Rainforest**: High $T$ ($> 20^\circ\text{C}$), high $P$ ($> 2000\text{ mm}$). Highly weathered, nutrient-poor **oxisols** (intense leaching; nutrients held almost entirely in living biomass, not soil).
- **Temperate Deciduous Forest**: Moderate seasonal $T$, moderate $P$ ($750-1500\text{ mm}$). Rich nutrient **alfisols** with deep leaf litter.
- **Boreal Forest (Taiga)**: Cold winters, short cool summers, low-moderate $P$. Coniferous gymnosperms (*Picea*, *Abies*, *Pinus*). Acidic, leached **spodosols** with thick needle humus and mycorrhizae.
- **Tundra (Arctic & Alpine)**: Severe cold, low $P$ ($< 250\text{ mm}$). Characterized by **permafrost** (permanently frozen subsoil) restricting root penetration; dominated by dwarf shrubs, sedges, lichens; freeze-thaw solifluction polygon patterning.`
      }
    ]
  },

  {
    id: "eco-3-predation-biodiversity",
    domainId: "ecology",
    title: "Predator-Prey Dynamics, Species Diversity & Island Biogeography",
    subtitle: "Functional Responses, Shannon-Wiener Index, Species-Area Curves & MacArthur-Wilson Model",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 28,
    prerequisites: ["eco-2-ecosystems"],
    sources: ["Begon, Townsend, Harper: Ecology Ch. 6-10", "Ricklefs: The Economy of Nature Ch. 14-17"],
    interactiveTool: null,
    summary: "Analyze non-linear consumer-resource interactions and biodiversity theory: Lotka-Volterra predator-prey oscillations with phase-plane orbital trajectories, Holling's Type I, II, and III functional responses, species diversity indices (Shannon-Wiener H', Simpson's D, Pielou's evenness), the MacArthur-Wilson Equilibrium Theory of Island Biogeography, and Connell's Intermediate Disturbance Hypothesis.",
    keyFormulas: [
      { name: "Lotka-Volterra Predator-Prey Equations", latex: "\frac{dN}{dt} = r N - a N P, \quad \frac{dP}{dt} = f a N P - q P" },
      { name: "Shannon-Wiener Diversity Index", latex: "H' = -\sum_{i=1}^S p_i \ln p_i, \quad J' = \frac{H'}{\ln S} \text{ (Pielou's evenness)}" },
      { name: "Species-Area Power Relationship", latex: "S = c A^z \implies \log S = \log c + z \log A \quad (z \approx 0.20-0.35)" }
    ],
    sections: [
      {
        heading: "1. Predator-Prey Dynamics & Phase-Plane Analysis",
        content: `Mathematical formulation of consumer-resource population cycling:
$$\frac{dN}{dt} = r N - a N P \quad (\text{Prey})$$
$$\frac{dP}{dt} = f a N P - q P \quad (\text{Predator})$$
- $r$: Intrinsic growth rate of prey.
- $a$: Attack rate (capture efficiency).
- $f$: Conversion efficiency of consumed prey into predator offspring.
- $q$: Per capita predator starvation/mortality rate.
- **Zero-Growth Isoclines**:
  - Prey isocline ($dN/dt = 0$): $P = r / a$ (horizontal line in $N-P$ phase plane).
  - Predator isocline ($dP/dt = 0$): $N = q / (f a)$ (vertical line in $N-P$ phase plane).
- **Phase-Plane Orbit**: Counterclockwise neutral cycle around the central equilibrium point $(N^*, P^*)$.
  - Time-series: Predator population peaks **one quarter-cycle ($\pi/2$ phase lag)** behind the prey population (demonstrated empirically in Hudson's Bay Company snowshoe hare - lynx pelt records).`
      },
      {
        heading: "2. Holling's Functional Responses I, II & III",
        content: `Relationship between prey density ($N$) and per capita consumption rate ($N_e$):
- **Type I Functional Response**: Linear increase with prey density up to a maximum saturation plateau:
  $$N_e = a N$$
  - Assumes zero handling time. Seen in passive filter feeders (e.g., *Daphnia*, baleen whales).
- **Type II Functional Response**: Decelerating consumption rate asymptotically approaching maximum saturation:
  $$N_e = \frac{a N}{1 + a T_h N}$$
  - $T_h$: **Handling time** (time spent capturing, subduing, chewing, and digesting prey).
  - At high prey density, handling time limits feeding rate. **Destabilizing** to prey populations because predation rate (percentage mortality $N_e / N$) decreases as prey density rises (**inverse density-dependent**).
- **Type III Functional Response**: Sigmoidal S-shaped curve:
  - Consumption rate accelerates at low prey densities before saturating.
  - Caused by:
    1. Search image formation by predators.
    2. **Prey switching**: Predators ignore rare prey and target abundant alternate prey.
    3. Refuge saturation: Preys exceed safe shelter availability.
  - **Stabilizing** because predation acts in a strictly **density-dependent** manner at low to moderate prey densities!`
      },
      {
        heading: "3. Quantifying Biodiversity: Richness vs. Evenness",
        content: `Mathematical metrics capturing community structure:
- **Species Richness ($S$)**: Total number of distinct species in a sample.
- **Shannon-Wiener Diversity Index ($H'$)**:
  $$H' = -\sum_{i=1}^S p_i \ln p_i$$
  - $p_i$: Relative abundance of species $i$ ($p_i = n_i / N$).
  - Higher $H'$ indicates greater diversity and uncertainty in predicting the species of a random individual.
  - Maximum possible diversity for $S$ species: $H'_{\max} = \ln S$ (occurs when all species are equally abundant).
- **Pielou's Evenness ($J'$)**:
  $$J' = \frac{H'}{H'_{\max}} = \frac{H'}{\ln S}$$
  - $J' = 1.0$ represents perfectly equitable abundances; values near $0$ indicate extreme ecological dominance by a single species.
- **Simpson's Reciprocal Diversity Index ($1/D$)**:
  $$D = \sum_{i=1}^S p_i^2 \implies \frac{1}{D} = \frac{1}{\sum p_i^2}$$
  - $D$ represents the probability that two randomly selected individuals belong to the same species.`
      },
      {
        heading: "4. MacArthur-Wilson Island Biogeography & Disturbance",
        content: `Equilibrium model of species richness on habitat islands:
- **The Equilibrium Number of Species ($\hat{S}$)**:
  - Balance between rate of **Immigration ($I$)** of new species from mainland pool ($P$) and rate of **Extinction ($E$)** of resident species:
    - Immigration curve decelerates downward as fewer immigrant individuals belong to unrepresented species.
    - Extinction curve accelerates upward as competition increases on the island.
  - **Island Distance Effect**: Near islands have higher immigration rates than far islands $\to \hat{S}_{\text{near}} > \hat{S}_{\text{far}}$.
  - **Island Size Effect**: Large islands support larger populations (lower extinction risk from drift/stochasticity) and offer more diverse microhabitats $\to \hat{S}_{\text{large}} > \hat{S}_{\text{small}}$.
  - Ranking: $\hat{S}_{\text{Large, Near}} > \hat{S}_{\text{Large, Far}} > \hat{S}_{\text{Small, Near}} > \hat{S}_{\text{Small, Far}}$.
- **The Intermediate Disturbance Hypothesis (Connell)**:
  - *Low disturbance*: Highly competitive superior species competitively exclude inferior competitors $\to$ low species diversity.
  - *High disturbance*: Only highly tolerant or fast-reproducing r-selected species survive mortality events $\to$ low species diversity.
  - *Intermediate disturbance frequency/intensity*: Prevents competitive exclusion while allowing colonizers to establish $\to$ **maximal species diversity**!`
      }
    ]
  },

  // ==================== DOMAIN 6: ETHOLOGY (5%) ====================
  {
    id: "ethology-1-kin-selection",
    domainId: "ethology",
    title: "Kin Selection, Haplodiploidy & Evolutionary Game Theory",
    subtitle: "Hamilton's Rule, Hymenoptera Relatedness, Hawk-Dove ESS Payoff Matrices",
    level: "USABO Finalist / IBO",
    xp: 140,
    estimatedMinutes: 20,
    prerequisites: [],
    sources: ["Alcock: Animal Behavior Ch. 11-13", "Davies, Krebs, West: Behavioural Ecology Ch. 6, 11"],
    interactiveTool: null,
    summary: "Calculate coefficients of relatedness (r) in haplodiploid systems, apply Hamilton's rule (rB > C) to social evolution and eusociality, and analyze Evolutionary Stable Strategies (ESS) using Hawk-Dove game theoretic payoff matrices and the Marginal Value Theorem.",
    keyFormulas: [
      { name: "Hamilton's Rule for Kin Selection", latex: "r B > C \\quad (r: \\text{relatedness, } B: \\text{fitness benefit, } C: \\text{cost to altruist})" },
      { name: "Hawk-Dove Payoff Matrix", latex: "\\text{Hawk vs Hawk: } \\frac{V - C}{2}, \\quad \\text{Hawk vs Dove: } V, \\quad \\text{Dove vs Hawk: } 0, \\quad \\text{Dove vs Dove: } \\frac{V}{2}" },
      { name: "Mixed ESS Equilibrium Frequency", latex: "p_{\\text{Hawk}} = \\frac{V}{C} \\quad (\\text{when } V < C)" }
    ],
    sections: [
      {
        heading: "1. Hamilton's Rule & Haplodiploid Pedigree Relatedness",
        content: `Altruistic traits are favored by natural selection if the inclusive fitness gain exceeds the cost:
$$r B > C$$
- **Haplodiploidy in Hymenoptera (Ants, Bees, Wasps)**:
  - Males are haploid (develop from unfertilized eggs via arrhenotokous parthenogenesis; father has no father and no sons).
  - Females are diploid.
  - A father passes **$100\\%$ of his genes** to all his daughters.
  - A mother passes **$50\\%$ of her genes** to daughters and sons.
- **Calculating Relatedness ($r$) between Family Members**:
  - **Full Sisters**: Share $1/2$ their genes through mother ($0.5 \\times 0.5 = 0.25$) and ALL their genes through father ($0.5 \\times 1.0 = 0.5$).
    $$r_{\\text{sister-sister}} = 0.25 + 0.5 = \\mathbf{0.75}$$
  - **Sister to Brother**: Brothers develop from unfertilized egg; receive zero genes from father.
    $$r_{\\text{sister-brother}} = 0.5 \\times 0.5 = \\mathbf{0.25}$$
  - **Mother to Daughter / Son**:
    $$r = 0.50$$
  - **The Eusociality Consequence**: A female worker is more closely related to her full sisters ($r = 0.75$) than she would be to her own offspring ($r = 0.50$)! This asymmetric relatedness pre-adapts haplodiploid insects to eusocial worker policing and queen rearing.`
      },
      {
        heading: "2. Evolutionary Game Theory & The Hawk-Dove ESS",
        content: `An Evolutionary Stable Strategy (ESS) is a behavioral strategy that, once adopted by a population, cannot be invaded by any rare mutant alternative strategy:
- Let resource value be $V$, and cost of serious injury in escalated fighting be $C$.
- **Payoff Matrix (Payoff to Row player against Column player)**:
  - Hawk vs Hawk: $\\frac{V - C}{2}$
  - Hawk vs Dove: $V$
  - Dove vs Hawk: $0$
  - Dove vs Dove: $\\frac{V}{2}$
- **Analysis**:
  - Case 1: If $V > C$ (resource is more valuable than injury cost), Hawk is a pure ESS. Everyone plays Hawk.
  - Case 2: If $V < C$ (injury is costly, e.g., weapons, antlers), neither pure Hawk nor pure Dove is an ESS!
    - If all are Dove, a mutant Hawk enters and gets $V > V/2$, invading successfully.
    - If all are Hawk, each gets $(V-C)/2 < 0$, so a mutant Dove enters and gets $0 > (V-C)/2$, invading successfully.
    - **Mixed ESS**: The stable equilibrium is a mixed population with fraction $p$ of Hawks:
      $$p E(\\text{Hawk}, \\text{Hawk}) + (1-p) E(\\text{Hawk}, \\text{Dove}) = p E(\\text{Dove}, \\text{Hawk}) + (1-p) E(\\text{Dove}, \\text{Dove})$$
      $$p \\left( \\frac{V - C}{2} \\right) + (1 - p) V = 0 + (1 - p) \\frac{V}{2} \\implies p = \\frac{V}{C}$$`
      }
    ]
  },

  
  {
    id: "ethology-2-classical-behavior",
    domainId: "ethology",
    title: "Classical Ethology: Innate Behavior, Learning & Communication",
    subtitle: "FAPs, Tinbergen's Four Questions, Conditioning, Waggle Dance & Circadian Clocks",
    level: "USABO Finalist / IBO",
    xp: 140,
    estimatedMinutes: 22,
    prerequisites: ["ethology-1-kin-selection"],
    sources: ["Alcock: Animal Behavior Ch. 2-7", "Davies, Krebs, West: Behavioural Ecology Ch. 2-5, 14"],
    interactiveTool: null,
    summary: "Master classical and modern ethological principles: Tinbergen's Four Questions (Proximate vs Ultimate), Fixed Action Patterns (FAPs) and supernormal sign stimuli, non-associative (habituation/sensitization) vs associative learning (Classical Pavlovian vs Operant Skinnerian), Lorenzian filial/sexual imprinting, honeybee waggle dance communication geometry, and molecular circadian clocks (SCN, PER/TIM feedback loops).",
    keyFormulas: [
      { name: "Tinbergen's Four Questions", latex: "\text{Proximate: Causation (Mechanism) + Ontogeny (Development); } \text{Ultimate: Adaptive Value (Function) + Phylogeny (Evolution)}" },
      { name: "Waggle Dance Encoding", latex: "\theta_{\text{dance}} = \text{Angle to Sun}, \quad t_{\text{waggle run}} \propto \text{Distance to Food (1 s } \approx 1000\text{ m)}" }
    ],
    sections: [
      {
        heading: "1. Tinbergen's Four Questions & Innate Behavioral Programs",
        content: `Niko Tinbergen established four complementary levels of biological analysis:
1. **Proximate Mechanisms (How?)**:
   - **Causation (Mechanism)**: Sensory, neural, and hormonal machinery eliciting the behavior (e.g., testosterone triggering song nuclei in male canaries).
   - **Ontogeny (Development)**: How behavior changes over the individual's lifetime through gene-environment interaction (e.g., learning song from tutor).
2. **Ultimate Causes (Why?)**:
   - **Adaptive Value (Function)**: How behavior enhances individual inclusive fitness and survival (e.g., song attracts mates and defends territory).
   - **Phylogeny (Evolution)**: Evolutionary history and ancestral origins of behavior (e.g., modified courtship displays derived from ancestral preening).
- **Fixed Action Patterns (FAPs)**:
  - Stereotyped, invariant, innate motor sequences executed to completion once initiated, even if the triggering stimulus is removed.
  - Triggered by a specific external sensory cue (**Sign Stimulus / Releaser**) processed by an **Innate Releasing Mechanism (IRM)**.
  - *Classic Examples*:
    - Male three-spined stickleback (*Gasterosteus aculeatus*): Red belly of rival male elicits attack behavior (models lacking fish features but possessing red bottom elicit full attack).
    - Greylag goose egg rolling: Visual sight of displaced egg elicits bill-tucking retrieval; goose continues rolling motions even if experimenter removes egg mid-sequence.
- **Supernormal Stimuli**: An exaggerated artificial sign stimulus that elicits a stronger behavioral response than the natural stimulus (e.g., oystercatchers prefer incubating giant artificial speckled eggs over their own eggs).`
      },
      {
        heading: "2. Learning Paradigms: Non-Associative & Associative",
        content: `Modification of behavior based on experience:
- **Non-Associative Learning**:
  - **Habituation**: Progressive decline in behavioral response to a repeated, harmless stimulus (e.g., *Aplysia* gill withdrawal reflex habituates due to decreased presynaptic neurotransmitter release from sensory neurons).
  - **Sensitization**: Prolonged enhancement of response to a benign stimulus following a noxious, threatening stimulus.
- **Associative Learning**:
  - **Classical Conditioning (Pavlovian)**: An animal associates an involuntary physiological response with a novel stimulus:
    - *Unconditioned Stimulus (US)* (food) naturally elicits *Unconditioned Response (UR)* (salivation).
    - Pairing a *Conditioned Stimulus (CS)* (metronome/bell) with US causes CS alone to elicit the *Conditioned Response (CR)* (salivation).
  - **Operant Conditioning (Trial-and-Error / Skinnerian)**: An animal associates a voluntary behavioral action with a consequence (**Reinforcement** increases behavior frequency; **Punishment** decreases behavior frequency).
- **Imprinting (Konrad Lorenz)**:
  - Rapid, irreversible learning restricted to a biologically determined **Critical Period (Sensitive Period)** early in development.
  - *Filial Imprinting*: Young precocial waterfowl (geese, ducks) imprint on the first moving, vocalizing object encountered after hatching.
  - *Sexual Imprinting*: Courtship preferences in adulthood are permanently established by observing parental phenotype during the sensitive period.`
      },
      {
        heading: "3. Animal Communication: Honeybee Waggle Dance",
        content: `Karl von Frisch deciphered the symbolic communication dance of *Apis mellifera*:
- Performed by successful forager honeybees on the vertical comb inside a dark hive to recruit nestmates to rich nectar/pollen sources:
- **Round Dance**: Performed if food source is **close ($< 50-70\text{ m}$)**. Indicates food presence and floral scent, but does not provide directional orientation.
- **Waggle Dance (Figure-Eight Dance)**: Performed if food source is **distant ($> 70-100\text{ m}$)**:
  - Consists of a straight **waggle run** with abdomen vibrating, followed by alternating left and right semicircle returns.
  - **Direction Encoding**: The angle of the waggle run relative to **straight up (vertical gravity)** equals the angle between the food source and the **current position of the sun**! (e.g., a waggle run $30^\circ$ to the right of vertical directs bees to fly $30^\circ$ to the right of the sun's azimuth).
  - **Distance Encoding**: Duration of the waggle run is directly proportional to distance (approximately **1 second of waggle run $\approx 1000\text{ meters}$**).
  - **Resource Value**: Vigor and frequency of dancing reflect caloric sugar concentration.`
      },
      {
        heading: "4. Biological Rhythms & Circadian Clock Genetics",
        content: `Endogenous biological timekeeping oscillating with a period of $\approx 24\text{ hours}$:
- **Circadian Rhythms** persist under constant conditions (constant darkness, temperature compensation) and are synchronized (**entrained**) to the $24\text{-hr}$ day by environmental cues (**Zeitgebers**, primarily light).
- **Mammalian Master Clock**: The **Suprachiasmatic Nucleus (SCN)** of the anterior hypothalamus:
  - Receives light input directly from retinal ganglion cells expressing photopigment **Melanopsin** via the **Retinohypothalamic Tract (RHT)**.
  - Coordinates pineal gland secretion of **Melatonin** (secreted in darkness; suppressed by light).
- **The Molecular Transcription-Translation Negative Feedback Loop**:
  1. Transcription factors **CLOCK** and **BMAL1** heterodimerize in the nucleus and bind E-box elements in promoters of *Period* (*Per1, Per2, Per3*) and *Cryptochrome* (*Cry1, Cry2*) genes.
  2. PER and CRY proteins accumulate in cytoplasm, form complexes, and are phosphorylated by **Casein Kinase I (CK1)**.
  3. Translocate back into nucleus during nighttime.
  4. Physically bind CLOCK-BMAL1, **inhibiting their own transcription**!
  5. PER and CRY are progressively degraded by proteasome, relieving repression and initiating the next 24-hour cycle.`
      }
    ]
  },

  // ==================== DOMAIN 7: BIOSYSTEMATICS & BIODIVERSITY (5%) ====================
  {
    id: "systematics-1-cladistics",
    domainId: "biosystematics",
    title: "Phylogenetic Systematics: Parsimony, Fitch Algorithm & Major Clades",
    subtitle: "Synapomorphies, Homoplasy (CI/RI), Eukaryotic Supergroups, and Metazoan Embryology",
    level: "USABO Finalist / IBO",
    xp: 140,
    estimatedMinutes: 22,
    prerequisites: [],
    sources: ["Brusca & Brusca: Invertebrates Ch. 2-4", "Raven's Biology of Plants Ch. 12-19", "Tree of Life Project"],
    interactiveTool: null,
    summary: "Reconstruct phylogenies using Maximum Parsimony and the Fitch algorithm, calculate Consistency and Retention Indices (CI, RI), classify monophyletic, paraphyletic, and polyphyletic groups, and master the key synapomorphies of the 5 Eukaryotic Supergroups and animal embryology.",
    keyFormulas: [
      { name: "Consistency Index (CI)", latex: "CI = \\frac{m}{s} \\quad (m: \\text{minimum possible changes, } s: \\text{actual steps on tree})" },
      { name: "Retention Index (RI)", latex: "RI = \\frac{g - s}{g - m} \\quad (g: \\text{maximum possible steps on any tree})" }
    ],
    sections: [
      {
        heading: "1. Cladistic Terminology & Parsimony Metrics",
        content: `Modern systematics classifies taxa based strictly on shared derived characteristics:
- **Synapomorphy**: Shared derived character state (e.g., hair in mammals, flowers in angiosperms; informative for clade grouping).
- **Symplesiomorphy**: Shared ancestral character state (e.g., vertebral column in reptiles; non-informative for grouping reptiles against mammals).
- **Autapomorphy**: Derived character state unique to a single terminal taxon (uninformative for tree topology).
- **Homoplasy**: Convergent evolution or character reversal mimicking synapomorphy (e.g., wings in bats and birds).
- **Taxon Categories**:
  - **Monophyletic (Clade)**: An ancestor and ALL of its descendants (e.g., Mammalia, Aves).
  - **Paraphyletic**: An ancestor and SOME, but not all, of its descendants (e.g., traditional "Reptilia" excluding birds; "Gymnosperms" in some traditional classifications; "Protists").
  - **Polyphyletic**: Taxa grouped together without their most recent common ancestor (e.g., "Pachyderms", "Warm-blooded animals").
- **Parsimony Indices**:
  - $CI = m / s$: Measures degree of homoplasy ($CI = 1.0$ indicates zero homoplasy).
  - $RI = (g - s) / (g - m)$: Measures synapomorphy retention ($RI = 1.0$ indicates maximum synapomorphic signal).`
      },
      {
        heading: "2. The 5 Major Eukaryotic Supergroups",
        content: `The modern eukaryotic tree of life replaces the obsolete 5-kingdom model:
1. **Archaeplastida (Plantae)**: Primary endosymbiosis of a beta-cyanobacterium with two membranes.
   - *Glaucophytes*: Possess **cyanelles** retaining a vestigial peptidoglycan wall between membranes!
   - *Rhodophyta (Red Algae)*: Phycobilisomes, floridean starch, lack flagellated stages entirely.
   - *Chloroplastida (Green Algae & Embryophytes)*: Chlorophylls $a + b$, thylakoid grana, starch in plastids.
2. **SAR Supergroup**:
   - *Stramenopiles*: Heterokont flagella (one tinsel flagellum with tripartite mastigonemes + one smooth whiplash). Brown algae, Diatoms (silica frustules with hypotheca/epitheca), Oomycetes (cell walls of cellulose, diploid dominant).
   - *Alveolates*: Cortical alveoli (membrane-bound sacs). Dinoflagellates (cellulose thecal plates, transverse/longitudinal flagella), Apicomplexans (apical complex for host invasion, non-photosynthetic apicoplast), Ciliates (macronucleus + micronucleus, infraciliature).
   - *Rhizaria*: Filose or reticulose pseudopodia. Foraminifera (calcareous multichambered tests), Radiolaria (siliceous skeletons with axopodia).
3. **Excavata**: "Excavated" ventral feeding groove.
   - *Euglenozoans*: Paraxonemal crystalline rod in flagella. Kinetoplastids (*Trypanosoma*) possess a giant mitochondrial DNA disk (kinetoplast).
   - *Metamonads*: Amitochondriate parasites with modified organelles (Diplomonads like *Giardia* have mitosomes; Parabasalids like *Trichomonas* have hydrogenosomes).
4. **Amoebozoa**: Lobe-shaped or tubular pseudopodia (lobopodia). Slime molds (plasmodial *Physarum* vs cellular *Dictyostelium* using cAMP signaling).
5. **Opisthokonta**: Single posterior whiplash flagellum at some life stage. Includes Fungi, Choanoflagellates (collared flagellates), and Metazoa.`
      },
      {
        heading: "3. Metazoan Embryological Archetypes",
        content: `Fundamental splits in animal development:
- **Parazoa (Porifera)**: Lack true tissues, totipotent cells (choanocytes, amoebocytes).
- **Diploblasts (Cnidaria & Ctenophora)**: Ectoderm + Endoderm; radial or biradial symmetry; mesoglea.
- **Triploblasts (Bilateria)**: Ectoderm + Mesoderm + Endoderm.
  - **Protostomes (Spiralia & Ecdysozoa)**:
    - Cleavage: **Spiral and determinate** (mosaic development; isolated blastomere dies or forms partial embryo).
    - Blastopore fate: Becomes the **mouth** (anus develops secondarily).
    - Coelom formation: **Schizocoely** (solid blocks of mesoderm split to form coelomic cavity).
  - **Deuterostomes (Echinodermata, Hemichordata, Chordata)**:
    - Cleavage: **Radial and indeterminate** (regulative development; isolated blastomeres can form complete monozygotic twins).
    - Blastopore fate: Becomes the **anus** (mouth forms from secondary stomodaeal invagination).
    - Coelom formation: **Enterocoely** (mesodermal pouches outpocket from the archenteron wall).`
      }
    ]
  }
];
