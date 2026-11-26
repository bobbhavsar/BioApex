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
  GENETICS: {
    id: "genetics",
    name: "Genetics & Molecular Evolution",
    weight: "20%",
    color: "#f59e0b", // Amber
    bgGradient: "from-amber-900/60 to-yellow-900/40",
    icon: "git-branch",
    textbookSources: ["Pierce: Genetics - A Conceptual Approach (6th/7th Ed)", "Griffiths: Introduction to Genetic Analysis (11th/12th Ed)", "Futuyma: Evolution (4th/5th Ed)"]
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
  {
    id: "cell-9-biomolecules",
    domainId: "cell_bio",
    title: "Chemical Basis of Life: Water, Macromolecules & Protein Folding",
    subtitle: "Water potential, buffers, carbohydrate and lipid chemistry, protein structure and the energy carriers",
    level: "USABO Finalist / IBO",
    xp: 120,
    estimatedMinutes: 22,
    prerequisites: [],
    sources: ["Lehninger Ch. 1-5", "Campbell Ch. 2-5", "Alberts MBoC Ch. 2"],
    interactiveTool: null,
    summary: "IBO Cell Biology opens with chemical components, and USABO tests them through quantitative water, buffer and protein-structure questions. This module builds the chemistry layer: hydrogen bonding and water potential, Henderson-Hasselbalch buffering, the four macromolecule classes and their glycosidic/ester/peptide/phosphodiester linkages, protein folding and denaturation, coenzymes, and the redox carriers ATP, NAD and NADP.",
    keyFormulas: [
      { name: "Henderson-Hasselbalch", latex: "pH = pK_a + \\log \\frac{[A^-]}{[HA]}" },
      { name: "Van't Hoff Osmotic Pressure", latex: "\\pi = iCRT" },
      { name: "ATP Hydrolysis Free Energy", latex: "\\Delta G^{\\circ \\prime} \\approx -30.5 \\text{ kJ/mol}" }
    ],
        sections: [
      {
        heading: "Water: dielectric screening, hydrogen bonding and the hydrophobic effect",
        content: `Water is not a passive solvent; its structure sets the energy scale of every interaction inside a cell. Each molecule carries a dipole of $1.85\\ \\text{D}$, and the liquid is an average of ~3.4 hydrogen bonds per molecule with a bond energy near $20\\ \\text{kJ}\\,\\text{mol}^{-1}$ but cooperative network character, so the enthalpy of vaporisation is $40.7\\ \\text{kJ}\\,\\text{mol}^{-1}$.

- **Dielectric screening.** Water's relative permittivity ($\\varepsilon_r \\approx 78.5$ at $25^\\circ\\text{C}$) weakens Coulomb attraction by roughly 80-fold. An ion pair that costs $\\sim 20\\ \\text{kJ}\\,\\text{mol}^{-1}$ to separate in bulk water costs hundreds inside a protein core ($\\varepsilon_r \\approx 4$); this is why buried salt bridges and metal sites are so strong, and why a charged residue placed in a lipid bilayer is destabilising.
- **Hydrophobic effect.** Nonpolar surfaces do not attract each other; water loses configurational entropy when it must order around them. Association releases that ordered water, so $\\Delta G$ for burying a $\\text{CH}_2$ group is negative *despite* no favourable solute–solute enthalpy. Because the driving force is entropy, the effect strengthens with temperature up to $\\sim 60^\\circ\\text{C}$ — the opposite of a normal van der Waals attraction. It is the organising principle behind micelles (above the critical micelle concentration), bilayer assembly, protein cores, and the binding of most drugs.
- **Colligative behaviour.** $\\pi = iMRT$; at $37^\\circ\\text{C}$ a $1\\ \\text{osmol}\\,\\text{L}^{-1}$ solution exerts $25.3\\ \\text{atm}$. Plasma at $290\\ \\text{mOsm}$ therefore holds back $\\sim 7.3\\ \\text{atm}$ ($5500\\ \\text{mmHg}$), which is why red cells need the Na$^+$/K$^+$ pump to avoid colloid-osmotic lysis. The van't Hoff factor $i$ is $\\approx 1.8$ for NaCl at physiological strength (ion pairing), not 2.
- **Self-ionisation.** $K_w = 10^{-14}$ at $25^\\circ\\text{C}$ but $K_w$ rises with temperature (neutral pH of blood is ~6.8 at $37^\\circ\\text{C}$ — "neutral" is not pH 7 in a warm cell). Proton transfer is anomalously fast by the Grotthuss relay, which is why a proton injected into water is effectively buffered within microseconds.

Exam discriminators: an osmole counts particles, an osmolarity ignores activity, and a tonicity compares only *non-permeating* solutes — urea raises osmolarity without changing tonicity.`
      },
      {
        heading: "Buffers, pKa and integrated acid–base physiology",
        content: `Buffering is the resistance of pH to added strong acid or base, and it is maximal when $pH = pK_a$; useful capacity spans roughly $pK_a \\pm 1$.

$$pH = pK_a + \\log\\frac{[A^-]}{[HA]} \\qquad \\beta = \\frac{d[B]}{dpH}$$

- **Side-chain pKa values that appear in olympiad problems:** Asp $\\approx 3.9$, Glu $\\approx 4.2$, His $\\approx 6.0$, Cys $\\approx 8.3$, Tyr $\\approx 10.1$, Lys $\\approx 10.5$, Arg $\\approx 12.5$; N-terminus $\\approx 8$–$9$, C-terminus $\\approx 2$–$3$. A neutral side chain gives $pI = (pK_{a1}+pK_{a2})/2$; an acidic side chain averages the two lowest pKas, a basic side chain the two highest. His is the workhorse general acid–base catalyst because its pKa sits near physiological pH *and* is tunable by the local electrostatic environment — the same reason a histidine in a catalytic triad can be both.
- **Charge determines behaviour.** Net charge sets electrophoretic mobility and ion-exchange retention: pepsin ($pI \\approx 1$) is neutral in the stomach, lysozyme ($pI \\approx 11$) binds cation exchangers. Protein charge also drives Donnan swelling of the extracellular matrix.
- **Open-system bicarbonate.** Physiological buffering cannot be read from a closed-form HH alone because CO$_2$ is volatile: $pH = 6.1 + \\log\\frac{[\\text{HCO}_3^-]}{0.03 \\times P_{CO_2}}$ with $[\\text{HCO}_3^-]$ in mM and $P_{CO_2}$ in mmHg. Respiratory acidosis raises $P_{CO_2}$ and lowers pH; metabolic acidosis lowers $[\\text{HCO}_3^-]$; renal compensation retains bicarbonate over 2–4 days, respiratory compensation changes ventilation within minutes. Protein and haemoglobin (the Bohr effect — deoxyHb binds H$^+$ better) supply most *non-bicarbonate* buffer, measured as base excess.
- **Renal acid handling** is the only route for net H$^+$ excretion: carbonic anhydrase generates H$^+$ in the proximal tubule, NH$_4^+$ trapping in the thick ascending limb and collecting-duct H$^+$-ATPase are titratable, and every secreted H$^+$ regenerates one HCO$_3^-$.

Trap: adding a weak acid to a buffer does not simply subtract concentration — use the ratio in HH, and remember $pH$ moves logarithmically while titration curves are plotted against equivalents of base.`
      },
      {
        heading: "Protein folding: energy landscapes, chaperones and proteostasis",
        content: `- **Hierarchy.** Primary sequence encodes secondary structure through backbone hydrogen bonding: the $\\alpha$-helix has 3.6 residues per turn, a 5.4 Å pitch (1.5 Å rise per residue) and an $i \\to i+4$ C=O···H–N bond; $\\beta$-strands pair into parallel or antiparallel sheets with pleated side chains alternating above and below the plane. Permitted backbone dihedrals are constrained on the Ramachandran plot ($\\phi$, $\\psi$), with glycine uniquely flexible and proline restricted (and able to adopt *cis* peptide bonds, slowing folding).
- **Folding is a funnel, not a search.** Levinthal's paradox dissolves once folding is viewed as a biased energy landscape: local secondary structure forms in microseconds, molten-globule intermediates follow, and side-chain packing produces the native state. Anfinsen's ribonuclease experiment proved sequence sufficiency; the corollary is that *in vivo* folding still needs help because the cytosol is crowded ($\\sim 300\\ \\text{mg}\\,\\text{mL}^{-1}$ macromolecule) and aggregation is second-order in concentration.
- **Chaperone machines.** Hsp70 with J-domain co-chaperones and nucleotide exchange factors binds exposed hydrophobic peptides in an ATP-driven cycle; Hsp60/GroEL forms an Anfinsen cage with GroES and uses ATP to discharge substrate; calnexin/calreticulin read N-glycan trimming as a folding timer. Failure triggers the unfolded protein response (IRE1, PERK, ATF6), then ERAD retrotranslocation and proteasomal degradation, then apoptosis.
- **Stability and disease.** A typical globular protein is only $5$–$15\\ \\text{kcal}\\,\\text{mol}^{-1}$ more stable than its unfolded state, so a single mutation can shift the folded/unfolded ratio by orders of magnitude at $37^\\circ\\text{C}$. Amyloid and prion propagation are template-directed: the aggregate seeds conversion of native protein, which is why prion disease is infectious and why $\\text{A}\\beta$ oligomers are toxic in Alzheimer's.
- **Disorder as function.** Intrinsically disordered regions lack a fixed structure but bind with high specificity and low affinity — ideal for signalling hubs, entropic springs (titin, elastin), and phase-separated condensates.

Trap: disulphide bonds form in the ER (oxidising, PDI-catalysed) not the cytosol (reducing glutathione), so a cytosolic protein with engineered cysteines usually stays reduced.`
      },
      {
        heading: "Nucleic acid and lipid chemistry that drives technique",
        content: `- **DNA geometry.** B-DNA: 10.5 bp per turn, 3.4 Å rise, 34 Å pitch, 20 Å diameter, wide major groove (where most sequence-specific protein contacts occur) and narrow minor groove (where AT-tracts are read). A-form DNA and RNA–DNA hybrids are shorter and wider (11 bp/turn); Z-DNA is left-handed and favoured by alternating GC under negative supercoiling. Base stacking — not hydrogen bonding — dominates duplex stability; GC pairs contribute three H-bonds and extra stacking, raising $T_m$ by roughly $0.4$–$0.9^\\circ\\text{C}$ per % GC at fixed salt. Melting is monitored by the hyperchromic effect at 260 nm, and $T_m$ rises with monovalent cation concentration because cations shield backbone phosphates.
- **RNA chemistry.** The 2′-OH makes RNA prone to alkaline hydrolysis and forces the A-form; it also allows tertiary contacts (tRNA's cloverleaf folding into an L, ribozymes, riboswitches) and 2′-O-methylation as a stability and immune-evasion mark. mRNA vaccines exploit modified nucleosides (m1Ψ) to evade innate RNA sensors.
- **Membrane lipids.** Amphipathicity drives bilayer formation; fluidity falls with chain length and rises with cis unsaturation (each cis bond adds a kink that lowers $T_m$ by ~$10$–$20^\\circ\\text{C}$). Cholesterol is a bidirectional modulator: below $T_m$ it prevents tight packing (raising fluidity), above $T_m$ it orders acyl chains (lowering fluidity) and thickens the bilayer, broadening the transition. Sphingolipid/cholesterol "rafts" concentrate signalling proteins. Lipid asymmetry is functional: phosphatidylserine on the outer leaflet is an apoptosis signal read by annexin V.
- **Permeability order** across a pure bilayer is $\\text{O}_2 > \\text{CO}_2 > \\text{ethanol} > \\text{water (slow, via aquaporins in vivo)} > \\text{glucose} > \\text{ions}$, which is why charged drugs need transporters and why liposome drug delivery must consider leakage.

Trap: a higher $T_m$ means a *more* stable duplex, so a probe designed to discriminate a single mismatch should be run close to $T_m$, not far below it.`
      }
    ]
  },

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
    id: "cell-10-membranes-transport",
    domainId: "cell_bio",
    title: "Biological Membranes, Transport & Cell Junctions",
    subtitle: "Fluid mosaic asymmetry, osmosis and tonicity, ATP-driven pumps and epithelial junctions",
    level: "USABO Finalist / IBO",
    xp: 130,
    estimatedMinutes: 24,
    prerequisites: [],
    sources: ["Alberts MBoC Ch. 10-11", "Vander's Human Physiology Ch. 4-5", "Campbell Ch. 7"],
    interactiveTool: null,
    summary: "Transport through membranes is a named IBO Cell Biology heading. This module covers membrane asymmetry and fluidity, diffusion and osmosis with tonicity predictions, aquaporin kinetics, primary versus secondary active transport, the sodium-potassium ATPase stoichiometry, and the junctional and extracellular-matrix anatomy that turns cells into tissues.",
    keyFormulas: [
      { name: "Water Potential", latex: "\\Psi_w = \\Psi_s + \\Psi_p" },
      { name: "Solute Potential", latex: "\\Psi_s = -iCRT" },
      { name: "Diffusion (Fick's Law)", latex: "J = P \\cdot A \\cdot \\Delta C" }
    ],
        sections: [
      {
        heading: "Electrochemical potential, Nernst and the Goldman framework",
        content: `Every transported solute moves down an electrochemical gradient that combines chemical and electrical work:

$$\\Delta\\mu = RT\\ln\\frac{[X]_{in}}{[X]_{out}} + zF(V_{in}-V_{out})$$

At equilibrium $\\Delta\\mu = 0$, giving the Nernst potential. At $37^\\circ\\text{C}$ the factor $2.303RT/F \\approx 61.5\\ \\text{mV}$, so $E_X = \\frac{61.5}{z}\\log_{10}\\frac{[X]_{out}}{[X]_{in}}$.

- **Reference values** for a neuron: $E_K \\approx -90\\ \\text{mV}$, $E_{Na} \\approx +60\\ \\text{mV}$, $E_{Cl} \\approx -65\\ \\text{mV}$ (Cl$^-$ is near equilibrium at rest), $E_{Ca} \\approx +130\\ \\text{mV}$ (a $10^4$-fold gradient, which is why a single Ca$^{2+}$ channel opening is a large signal).
- **Resting potential is a conductance-weighted average**, not a single Nernst potential. The Goldman–Hodgkin–Katz equation weights each ion by its permeability: with $P_{Na}/P_K \\approx 0.02$, $V_m$ sits close to $E_K$. Adding a little Na$^+$ permeability (as at a receptor) depolarises steeply because the driving force on Na$^+$ is large.
- **Driving force** is $V_m - E_X$; the current is $I_X = g_X(V_m - E_X)$. A channel can be open with zero current at its reversal potential — this is how reversal potentials are measured, and why "channel open" does not mean "ion flows".
- **Thermodynamic ceiling.** One ATP hydrolysis ($\\approx -50$ to $-60\\ \\text{kJ}\\,\\text{mol}^{-1}$ under cellular conditions) can pump at most $n$ charges against $\\Delta\\mu_{max} = \\Delta G/nF \\approx 520/n\\ \\text{mV}$ — hence the Na$^+$/K$^+$ pump's ~10:1 gradient and the Ca$^{2+}$ pump's $\\sim 10^4$ gradient are both near the same energy limit.
- **Donnan effects.** Fixed intracellular anions (proteins, phosphates) create a Gibbs–Donnan distribution of permeant ions and an osmotic imbalance that must be offset by pump-driven Na$^+$ extrusion; block the pump with ouabain and cells swell and lyse.

Trap: a *hyperpolarising* current through a Cl$^-$ channel happens when $E_{Cl}$ is more negative than $V_m$; the sign of the current is set by the driving force, not by the ion's charge alone.`
      },
      {
        heading: "Channels, carriers and the kinetics of passive transport",
        content: `- **Simple diffusion** obeys Fick's law, $J = -P\\Delta C$, where permeability $P = DK/\\Delta x$ combines diffusivity, partition coefficient and thickness. Only small uncharged species cross a pure bilayer at useful rates.
- **Carriers** undergo a conformational cycle per transport event ($10^2$–$10^4\\ \\text{s}^{-1}$), so they saturate: $J = J_{max}\\frac{[S]}{K_t + [S]}$ with a *transport* $K_t$ that is not a binding constant. GLUT1 ($K_t \\approx 1$–$3\\ \\text{mM}$) keeps glucose uptake near $V_{max}$ at plasma concentrations; GLUT4 is stored in vesicles and translocated to the membrane by insulin — the molecular basis of insulin-stimulated glucose disposal. GLUT2 (liver, $\\beta$-cell) has a high $K_t$ and acts as a concentration sensor rather than a gate.
- **Channels** pass $10^7$–$10^8$ ions $\\text{s}^{-1}$ with no per-ion conformational cycle, and they are gated rather than saturable at physiological concentrations. The K$^+$ selectivity filter (TVGYG signature) dehydrates K$^+$ and coordinates it by backbone carbonyls in four sites, excluding the smaller Na$^+$ because it cannot be adequately dehydrated — selectivity by *energetic matching*, not by pore size. Gating modes: voltage (S4 paddle), ligand (nAChR, GABA$_A$), mechanotransduction (Piezo1/2), temperature (TRP).
- **Aquaporins** are pure water channels ($\\sim 3\\times10^9$ H$_2$O molecules $\\text{s}^{-1}$ per tetramer), blocked for protons by the NPA half-helices' dipole; AQP3/7 also carry glycerol. Vasopressin inserts AQP2 into the collecting duct apical membrane by exocytosis — the fastest known regulation of water permeability.
- **Osmosis** is not a distinct force: water moves down its own chemical potential, lowered by solute. Reflection coefficient $\\sigma$ (1 for impermeant, 0 for freely permeant) determines effective osmotic pressure $\\pi_{eff} = \\sigma iRT\\Delta C$.

Trap: channel vs carrier is diagnosed by turnover number and by whether the flux shows saturation at physiological substrate concentration, not by whether the protein is "a transporter".`
      },
      {
        heading: "Primary active transport: ATPase families and strict stoichiometries",
        content: `- **P-type ATPases** are phosphorylated on a conserved aspartate during their cycle (E1 $\\to$ E2). The Na$^+$/K$^+$-ATPase exports 3 Na$^+$ and imports 2 K$^+$ per ATP, so it is electrogenic (+1 net charge out) and contributes $\\sim -5\\ \\text{mV}$ to $V_m$; it consumes 20–30% of basal metabolic rate (up to 70% in neurons) and is inhibited by ouabain and cardiac glycosides, which raise intracellular Na$^+$, slow the Na$^+$/Ca$^{2+}$ exchanger, and thereby increase cardiac contractility. SERCA pumps 2 Ca$^{2+}$ per ATP into the SR; PMCA pumps 1 Ca$^{2+}$ per ATP and is calmodulin-activated. Gastric H$^+$/K$^+$-ATPase is the target of proton-pump inhibitors, which are irreversible covalent blockers.
- **V-type ATPases** acidify lysosomes, endosomes and the plant vacuole; they are proton pumps that can run in reverse as ATP synthases in some organelles. **F-type** is the mitochondrial/chloroplast rotary machine. **ABC transporters** use ATP binding and hydrolysis on two nucleotide-binding domains to drive conformational changes in two transmembrane domains; they export substrates *out* of the cytosol (MDR1/P-glycoprotein, MRP, BCRP) and include CFTR — which is an ABC-family *channel*, not a pump, a favourite exam discrimination.
- **Stoichiometry is the thermodynamics.** Net transport work per cycle must not exceed $\\Delta G_{ATP}$; with $3$ Na$^+$ out against a 10-fold gradient and $-70\\ \\text{mV}$, the work is $\\sim 3 \\times (6 + 7)\\ \\text{kJ} \\approx 39\\ \\text{kJ}$, comfortably inside the ATP budget, while a 100-fold Ca$^{2+}$ gradient over $+130\\ \\text{mV}$ uses nearly all of it.
- **Plant and fungal cells** run on a plasma-membrane H$^+$-ATPase rather than a Na$^+$ pump, generating a proton-motive gradient that powers secondary symports — a key difference from animal physiology.

Trap: oligomycin blocks the F$_o$ proton channel, not the ATP-binding site, and in coupled mitochondria it stops respiration indirectly by hyperpolarising $\\Delta p$; cyanide blocks cytochrome oxidase directly.`
      },
      {
        heading: "Secondary active transport, epithelia and clinical correlation",
        content: `Secondary transporters couple a favourable gradient (usually Na$^+$ or H$^+$) to an unfavourable one; they are obligate exchangers or symporters with fixed stoichiometry, so they can be electrogenic.

- **SGLT1** (enterocyte, kidney) moves 2 Na$^+$ with 1 glucose, coupling the ~10-fold Na$^+$ gradient to a $\\sim 3000$-fold glucose accumulation; SGLT2 (kidney, 1:1) reabsorbs the bulk of filtered glucose, and GLUT2 then exits glucose across the basolateral membrane. Oral rehydration therapy works because luminal glucose drives Na$^+$ (and hence water) absorption through SGLT1.
- **Exchangers:** Na$^+$/Ca$^{2+}$ (NCX, 3:1, electrogenic), Na$^+$/H$^+$ (NHE1, pH and volume control), Cl$^-$/HCO$_3^-$ (band 3, the chloride shift in red cells), and the dibasic amino acid antiporter mutated in cystinuria.
- **Cotransporters and their drugs:** NKCC1/2 (loop diuretics — furosemide blocks NKCC2 in the thick ascending limb, abolishing the lumen-positive potential that drives Ca$^{2+}$ and Mg$^{2+}$ reabsorption), NCC (thiazides), ENaC (amiloride), CFTR (potentiators and correctors).
- **Epithelial logic.** Apical and basolateral membranes carry *different* transporter sets, so net transport is vectorial: glucose is absorbed at the apical SGLT1 and exits basolaterally via GLUT2, and the tight junction provides both a fence (lipid/protein segregation) and a gate (paracellular conductance). Standing gradients — the lumen-positive potential in the TAL, the acid lumen in the collecting duct — are created by these asymmetric pumps and are as important as the transporters themselves.
- **Disease logic.** Cholera toxin ADP-ribosylates G$_{\\alpha s}$, locking adenylyl cyclase on, opening CFTR and causing secretory diarrhoea that is treated with oral rehydration, not antibiotics alone. In cystic fibrosis, F508del-CFTR is retained by ER quality control and degraded (a trafficking defect), while other alleles gate poorly — two different pharmacologies, correctors versus potentiators. Proximal tubular dysfunction (Fanconi syndrome) wastes bicarbonate, glucose, phosphate and amino acids because one transporter set fails.

Trap: ouabain inhibits the Na$^+$/K$^+$ pump and therefore *indirectly* reduces every Na$^+$-coupled symport — the primary lesion is not the symporter, and the downstream effect is a rise in intracellular Na$^+$ with a fall in intracellular K$^+$.`
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
    id: "cell-12-metabolism",
    domainId: "cell_bio",
    title: "Central Metabolism: Glycolysis, TCA Cycle & Metabolic Integration",
    subtitle: "Ten-step glycolysis, oxidative decarboxylation, beta-oxidation, urea cycle and gluconeogenesis",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 30,
    prerequisites: ["cell-2-chemiosmosis"],
    sources: ["Lehninger Ch. 14-23", "Campbell Ch. 9", "Alberts MBoC Ch. 13"],
    interactiveTool: null,
    summary: "IBO lists glycolysis, the citric acid cycle and oxidative phosphorylation as required cell metabolism, yet olympiad papers test them with carbon and ATP accounting. This module supplies the stoichiometry, the committed regulatory steps, reciprocal regulation of glycolysis and gluconeogenesis, and how lipid, amino acid and carbohydrate fuels join the same pathway.",
    keyFormulas: [
      { name: "Net Glycolysis Yield", latex: "\\text{Glucose} \\to 2\\ \\text{Pyruvate}: \\; 2\\ \\text{ATP} + 2\\ \\text{NADH} \\;(-2\\ \\text{from investment})" },
      { name: "P/O Ratio", latex: "\\text{NADH} = 2.5\\ \\text{ATP}, \\quad \\text{FADH}_2 = 1.5\\ \\text{ATP}" },
      { name: "Complete Oxidation Yield", latex: "\\text{Glucose} \\to 30-32\\ \\text{ATP} + 6\\ \\text{CO}_2" }
    ],
        sections: [
      {
        heading: "Glycolysis: regulation, substrate-level phosphorylation and fate of pyruvate",
        content: `Glycolysis converts one glucose into two pyruvate with a net yield of 2 ATP (substrate-level phosphorylation) and 2 NADH, using two investment and two payoff phases.

- **Hexokinase vs glucokinase.** Hexokinase (most tissues) has $K_m \\approx 0.1\\ \\text{mM}$ and is product-inhibited by glucose-6-phosphate; glucokinase (liver, $\\beta$-cell) has $K_m \\approx 10\\ \\text{mM}$, no product inhibition, and is restrained by glucokinase regulatory protein in the nucleus. This is why liver glucose uptake tracks plasma glucose and why glucokinase acts as the $\\beta$-cell sensor (a glucokinase mutation shifts the glucose threshold for insulin release).
- **Phosphofructokinase-1 is the committed step** and the classic allosteric integrator: ATP and citrate inhibit (ATP binds an allosteric site, lowering affinity for fructose-6-phosphate), AMP, ADP and fructose-2,6-bisphosphate activate. F2,6BP is made by PFK-2 and destroyed by FBPase-2 — a single bifunctional enzyme whose kinase/phosphatase activity is switched by hormonal phosphorylation (glucagon $\\to$ cAMP $\\to$ PKA $\\to$ phosphatase on, so glycolysis off in liver; insulin reverses it).
- **Payoff phase** generates ATP by direct phosphate transfer from 1,3-bisphosphoglycerate and phosphoenolpyruvate; the only oxidation is the glyceraldehyde-3-phosphate dehydrogenase step, which requires $NAD^+$ — the real reason lactate dehydrogenase exists.
- **Pyruvate fates** are set by oxygen and tissue: pyruvate dehydrogenase (mitochondrial, needs CoA, NAD$^+$, thiamine pyrophosphate) gives acetyl-CoA; lactate dehydrogenase regenerates $NAD^+$ anaerobically (Cori cycle returns lactate to liver); pyruvate carboxylase (biotin-dependent) feeds gluconeogenesis; alanine aminotransferase shuttles amino groups. In tumours, aerobic glycolysis (Warburg) is driven by PI3K/Akt-mTOR, HIF-1$\\alpha$ and myc, not by defective mitochondria — most tumours still carry intact respiration.
- **Arsenate** uncouples the GAPDH step (arsenolysis of 1,3-BPG) so ATP yield drops without blocking flux; **iodoacetate** blocks GAPDH directly; **2-deoxyglucose** traps glucose as 2-DG-6-phosphate and inhibits hexokinase.

Trap: glycolysis nets 2 ATP and 2 NADH per glucose, but from glycogen the yield is 3 ATP because the hexokinase step is bypassed — a common off-by-one error.`
      },
      {
        heading: "Pyruvate dehydrogenase, the TCA cycle and anaplerosis",
        content: `The PDH complex (pyruvate dehydrogenase, dihydrolipoamide transacetylase, dihydrolipoamide dehydrogenase) is a massive multienzyme machine using five cofactors — thiamine pyrophosphate, lipoic acid, CoA, FAD and $NAD^+$ — which is why thiamine deficiency (beriberi, Wernicke) presents as a metabolic and neurological failure.

- **Regulation** is by covalent modification: PDH kinase phosphorylates and inactivates E1, PDH phosphatase activates. Kinase is switched on by high ATP/NADH/acetyl-CoA (fed state $\\to$ PDH off in liver, on in heart), and by insulin via phosphatase activation. Arsenite binds lipoic acid and blocks the complex; mercury does the same.
- **The TCA cycle** oxidises acetyl-CoA to $2CO_2$, yielding 3 NADH, 1 FADH$_2$, 1 GTP and reducing equivalents for the electron transport chain. Citrate synthase, isocitrate dehydrogenase (allosteric: ADP activates, ATP/NADH inhibit) and $\\alpha$-ketoglutarate dehydrogenase (inhibited by succinyl-CoA and NADH) are the regulated steps. The only substrate-level phosphorylation is succinyl-CoA synthetase (GTP/ATP).
- **Anaplerosis and cataplerosis.** The cycle is a hub, not a closed loop: pyruvate carboxylase and glutamate dehydrogenase replenish oxaloacetate and $\\alpha$-ketoglutarate, and intermediates are drained for biosynthesis (citrate for fatty acids, $\\alpha$-KG for amino acids, succinyl-CoA for haem, oxaloacetate for gluconeogenesis). Without anaplerosis, acetyl-CoA alone cannot sustain flux — the classic "TCA needs a spark" argument.
- **Isotope logic.** $^{13}$C-labelled substrates reveal which carbons appear in which position of citrate and glutamate, letting experiments demonstrate that the cycle runs in one direction and that PDH, not pyruvate carboxylase, supplies the acetyl unit for oxidation.
- **Energy accounting.** Per acetyl-CoA, 3 NADH ($\\times 2.5$) + 1 FADH$_2$ ($\\times 1.5$) + 1 GTP $\\approx 10$ ATP; per glucose, 2 cytosolic NADH add ~3–5 ATP depending on the glycerol-phosphate vs malate–aspartate shuttle, so the textbook 30–32 ATP range is a shuttle-dependent number, not a constant.

Trap: the TCA cycle does not consume oxygen directly; it stops under anoxia because NADH cannot be reoxidised, which is why flux is measured by oxygen consumption rather than by citrate production alone.`
      },
      {
        heading: "Gluconeogenesis, glycogen and the Cori cycle",
        content: `- **Gluconeogenesis** is glycolysis run backwards across three irreversible steps: pyruvate carboxylase (biotin, mitochondrial) $\\to$ PEPCK (cytosolic/mitochondrial), fructose-1,6-bisphosphatase, and glucose-6-phosphatase (ER lumen, liver and kidney only — the reason muscle cannot release free glucose). Four ATP equivalents (2 ATP, 2 GTP) plus 2 NADH are spent per glucose, which is why gluconeogenesis is favoured only when ATP and precursors are plentiful.
- **Substrate supply:** lactate (Cori cycle), glycerol (from adipose lipolysis, entering as DHAP), alanine and glutamine (from muscle proteolysis), and propionate (from odd-chain fatty acids and rumen fermentation). Acetyl-CoA from even-chain fatty acids cannot be netted into glucose in animals, because pyruvate dehydrogenase is irreversible and isocitrate dehydrogenase/$\\alpha$-KGDH lose the carbons as CO$_2$ — the biochemical reason fat cannot become glucose, only ketones.
- **Glycogen** is a branched polymer with $\\alpha$-1,4 chains and $\\alpha$-1,6 branch points, giving many non-reducing ends for rapid phosphorylase action. Glycogen synthase is activated by insulin via GSK3 inhibition; glycogen phosphorylase is activated by glucagon/epinephrine via PKA, and in muscle by AMP and Ca$^{2+}$ (energy-sensing, not hormonal). Von Gierke disease (glucose-6-phosphatase) causes severe fasting hypoglycaemia and hepatomegaly; McArdle disease (muscle phosphorylase) causes exercise intolerance with a flat lactate response.
- **Hormonal logic in fasting:** glucagon/insulin ratio rises $\\to$ cAMP $\\to$ PKA $\\to$ glycogenolysis and gluconeogenesis on, glycolysis off via PFK-2 phosphorylation; simultaneously adipose lipolysis supplies fatty acids for hepatic ketogenesis, sparing glucose for the brain. Muscle lacks glucagon receptors, so its glycogen is for local use only.
- **Cori cycle cost** is 6 ATP per glucose recycled (2 spent in muscle glycolysis to lactate, 4 in hepatic gluconeogenesis), which is why sustained anaerobiosis is metabolically expensive but protects the muscle from acid-driven failure.

Trap: glycerol enters gluconeogenesis at DHAP (not as a three-carbon acid), so it is fully glucogenic, whereas odd-chain fatty acids contribute only their propionyl-CoA.`
      },
      {
        heading: "Pentose phosphate pathway, fatty acid oxidation and nitrogen disposal",
        content: `- **Pentose phosphate pathway** produces NADPH (for reductive biosynthesis and glutathione regeneration) and ribose-5-phosphate (for nucleotides). The oxidative phase is irreversible (glucose-6-phosphate dehydrogenase, the committed and rate-limiting step, inhibited by NADPH and activated by insulin), the non-oxidative phase reshuffles sugars via transketolase/transaldolase (thiamine-dependent). G6PD deficiency is X-linked; red cells cannot regenerate GSH, so oxidant drugs (primaquine, dapsone, fava beans) cause haemolytic anaemia with Heinz bodies.
- **Fatty acid $\\beta$-oxidation** activates fatty acids to acyl-CoA (costing 2 ATP equivalents), shuttles them into mitochondria via the carnitine palmitoyltransferase system (CPT1 inhibited by malonyl-CoA, the master switch between fat synthesis and oxidation), and cleaves two carbons per cycle yielding 1 FADH$_2$, 1 NADH and 1 acetyl-CoA. Palmitate (C16) gives 8 acetyl-CoA and $\\approx 129$ ATP gross, ~106 net — the arithmetic depends on the activation and shuttle costs, so state your assumptions.
- **Ketogenesis** in liver mitochondria (HMG-CoA synthase) produces acetoacetate and $\\beta$-hydroxybutyrate, exported to brain, heart and muscle; acetone is the volatile side product. Diabetic ketoacidosis combines insulin deficiency (unopposed lipolysis) with counter-regulatory hormone excess, producing an anion-gap acidosis.
- **Nitrogen disposal** proceeds by transamination (alanine and aspartate aminotransferases, both PLP-dependent) and oxidative deamination (glutamate dehydrogenase, using $NAD^+$/NADP$^+$), then the urea cycle: carbamoyl phosphate synthetase I (mitochondrial, N-acetylglutamate-activated) condenses ammonia with bicarbonate, citrulline leaves for the cytosol, argininosuccinate synthetase and lyase add aspartate and release fumarate (linking to the TCA cycle), and arginase releases urea. Cost: 3 ATP per urea, one of which becomes AMP + PP$_i$. Fish excrete ammonia, birds and reptiles urate, mammals urea — the choice reflects water availability and toxicity.

Trap: urea synthesis consumes bicarbonate and ATP, so hyperammonaemia and acidosis coexist; measuring urea alone underestimates nitrogen flux when the cycle is blocked (carbamoyl phosphate accumulates and spills into pyrimidine synthesis).`
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
    id: "cell-11-cytoskeleton-motility",
    domainId: "cell_bio",
    title: "Cytoskeleton, Motor Proteins & Cell Motility",
    subtitle: "Actin treadmilling, microtubule dynamic instability, kinesin/dynein and the 9+2 axoneme",
    level: "USABO Finalist / IBO",
    xp: 130,
    estimatedMinutes: 22,
    prerequisites: [],
    sources: ["Alberts MBoC Ch. 16-17", "Lodish Molecular Cell Biology Ch. 17-18", "Campbell Ch. 6"],
    interactiveTool: null,
    summary: "The cytoskeleton is an explicit IBO Cell Biology topic and a favourite mechanism question. Learn the three filament systems, their nucleotide-dependent assembly, the polarity and duty ratio of each motor protein, how the mitotic spindle and the axoneme are built, and how defects produce disease.",
    keyFormulas: [
      { name: "Actin Critical Concentration", latex: "\\text{Net growth when } [G\\text{-actin}] > C_c" },
      { name: "Axoneme Arrangement", latex: "9 + 2 \\; (9 \\text{doublets} + 2 \\text{central singlet pairs})" }
    ],
        sections: [
      {
        heading: "Actin: nucleotide-driven treadmilling, nucleators and the cortex",
        content: `Actin is a 42 kDa ATPase that polymerises head-to-tail, giving a fast-growing barbed (+) end and a slow pointed (−) end. ATP-actin adds preferentially at the barbed end; hydrolysis to ADP-P$_i$ and then ADP occurs in the filament, and ADP-actin dissociates fastest, so at steady state subunits flux forward through the filament — **treadmilling** — at constant length.

- **Critical concentration** $C_c$ is lower at the barbed end, and the difference sets the steady-state flux; profilin delivers ATP-actin to barbed ends, thymosin-$\\beta_4$ sequesters the monomer pool, and ADF/cofilin severs ADP-filaments to recycle subunits.
- **Nucleators** bypass the slow trimer step: Arp2/3 creates a 70° branch off an existing filament (dendritic array in lamellipodia), formin processively elongates straight filaments (stress fibres, filopodia, cytokinetic ring). Spire and Cordón-bleu nucleate unbranched filaments. Rho-family GTPases set the geometry: RhoA $\\to$ formin/myosin II (stress fibres), Rac1 $\\to$ WAVE/Arp2/3 (lamellipodia), Cdc42 $\\to$ N-WASP/filopodia.
- **Architecture** comes from crosslinkers: $\\alpha$-actinin bundles antiparallel filaments in the Z-disc, fascin makes tight parallel bundles in filopodia, filamin forms orthogonal networks that gel the cortex, and spectrin/anchorin tie the cortex to the membrane in red cells (mutations cause hereditary spherocytosis).
- **Pharmacology** is examinable: cytochalasin caps barbed ends, latrunculin sequesters G-actin, phalloidin stabilises filaments (and is the standard fluorescent probe), jasplakinolide stabilises and nucleates.

Trap: myosin II is a *plus-end-directed* motor that walks toward the barbed end, so in the contractile ring it pulls antiparallel filaments together — filament orientation, not motor direction, determines whether a network contracts or expands.`
      },
      {
        heading: "Microtubules: dynamic instability, motors and the axoneme",
        content: `Microtubules are hollow 25 nm tubes of 13 protofilaments built from $\\alpha/\\beta$-tubulin heterodimers; GTP bound to $\\beta$-tubulin is hydrolysed after incorporation, and the resulting GTP-cap model explains **dynamic instability** — stochastic switching between growth (rescue) and shrinkage (catastrophe).

- **Nucleation** occurs at the centrosome/MTOC by $\\gamma$-tubulin ring complexes in most animal cells; plants and fungi use dispersed nucleation sites. Plus-end tracking proteins (EB1) and MAPs (tau, MAP2) stabilise subsets of microtubules, which is how a single tubulin pool builds both a stable axoneme and a rapidly remodelling spindle.
- **Motors.** Kinesin-1 walks hand-over-hand with 8 nm steps, one ATP per step, toward the plus end (anterograde axonal transport); cytoplasmic dynein with dynactin moves toward the minus end (retrograde), and axonemal dynein generates ciliary sliding. Mitotic kinesins (Eg5/kinesin-5) slide antiparallel spindle microtubules apart; kinetochore motors plus depolymerisation power chromosome movement.
- **Axoneme.** The 9+2 arrangement has nine outer doublets (A and B tubules), outer and inner dynein arms, radial spokes and nexin links; dynein sliding is converted into bending by the spokes and nexin restraint. Primary cilia lack the central pair and act as signalling antennae (Hedgehog via smoothened). Defective dynein arms cause primary ciliary dyskinesia, with *situs inversus* because nodal cilia fail to establish left–right asymmetry — hence Kartagener syndrome.
- **Drugs that act on tubulin** are clinically central: colchicine and nocodazole prevent polymerisation (spindle arrest), paclitaxel stabilises and blocks dynamics, and vinca alkaloids depolymerise at high concentration but stabilise at low — a dose-dependent reversal worth remembering.

Trap: microtubule depolymerisation does not stop transport instantly; plus-end-directed kinesin cargo can still move on remaining stable microtubules, so a "no movement" answer usually implies motor or ATP failure, not tubulin loss alone.`
      },
      {
        heading: "Intermediate filaments: tensile strength and nuclear mechanics",
        content: `Intermediate filaments (10 nm) differ fundamentally from actin and microtubules: they are **apolar** (no plus/minus ends), have no associated motors, and their subunits exchange slowly — their job is mechanical resilience, not transport.

- **Assembly** proceeds from a coiled-coil dimer $\\to$ antiparallel tetramer $\\to$ eight-tetramer unit $\\to$ rope; because tetramers are antiparallel, the filament has no net polarity and can withstand tension in both directions.
- **Family members and tissues:** keratins (epithelia; obligate type I/type II heterodimers), vimentin (mesenchyme, migrating cells), desmin (muscle Z-disc and costameres), neurofilaments (axonal calibre, the determinant of conduction velocity), lamins (nuclear lamina), GFAP (astrocytes).
- **Anchorage** is the point of the system: desmosomes link keratin filaments through desmoplakin to cadherins at cell–cell junctions, hemidesmosomes link them through integrin $\\alpha_6\\beta_4$ to laminin-332 in the basal lamina, and the LINC complex (SUN + KASH/nesprin) connects the nuclear lamina to the cytoskeleton.
- **Disease mappings** are a favourite exam item because they prove function: keratin 5/14 mutations cause epidermolysis bullosa simplex (blistering on friction), desmin mutations cause myopathy with protein aggregates, lamin A processing defects cause progeria (progerin accumulates because the farnesylated precursor is not cleaved), and GFAP mutations cause Alexander disease.
- **Mechanotransduction:** nuclear stiffness set by lamins modulates YAP/TAZ localisation, so matrix rigidity changes transcription — a mechanochemical pathway, not just a structural one.

Trap: because intermediate filaments are apolar, they cannot support directional motor transport; any answer attributing vesicle movement to intermediate filaments is wrong.`
      },
      {
        heading: "Cell migration and the crossbridge cycle",
        content: `**Migration** is a four-step cycle: (1) protrusion driven by actin polymerisation at the leading edge (lamellipodia from Arp2/3 branching, filopodia from formin bundles); (2) adhesion via integrin activation (talin, kindlin, vinculin) forming focal adhesions that transmit force to the matrix; (3) contraction by myosin II, which retracts the cell body; (4) rear release through calpain-mediated adhesion turnover. FAK and Src signal adhesion turnover, and Rho/Rac/Cdc42 coordinate the cycle. Mesenchymal migration is adhesion-dependent; amoeboid migration is not, which is why protease inhibitors often fail to block invasion.

**Muscle contraction** is the specialised version of actomyosin. In the sarcomere, titin sets passive tension and centres the thick filament; the thin filament carries tropomyosin and the troponin complex (TnC binds Ca$^{2+}$, TnI inhibits, TnT anchors).

- **Crossbridge cycle:** ATP binds myosin $\\to$ detachment; hydrolysis $\\to$ cocked head; phosphate release $\\to$ power stroke (the rate-limiting, force-generating step); ADP release $\\to$ tight binding; without ATP (rigor mortis) the head cannot detach.
- **Regulation differs by muscle type.** Striated muscle is thin-filament regulated (Ca$^{2+}$–troponin moves tropomyosin); smooth muscle is thick-filament regulated (Ca$^{2+}$–calmodulin activates myosin light-chain kinase, with myosin phosphatase opposing it and a latch state for sustained tone at low ATP cost).
- **Excitation–contraction coupling:** the T-tubule DHPR activates RyR1 in skeletal muscle by mechanical coupling; in cardiac muscle Ca$^{2+}$ entry triggers RyR2 Ca$^{2+}$-induced Ca$^{2+}$ release, which is why cardiac contractility depends on extracellular Ca$^{2+}$ and why digitalis works.
- **Mechanics:** length–tension peaks at optimal actin–myosin overlap; force–velocity is hyperbolic (Hill); summation of twitches gives tetanus when stimuli arrive faster than relaxation; motor units are recruited in order of size (Henneman's principle), and fatigue reflects Pi/H$^+$ accumulation, impaired Ca$^{2+}$ handling and glycogen depletion rather than ATP running out.

Trap: the power stroke is driven by phosphate release, not ATP binding; ATP binding causes *detachment*, so depleting ATP produces rigor, not relaxation.`
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
  - **$\\alpha$-subunit**: 5'$\\\\to$3' polymerase activity.
  - **$\\epsilon$-subunit**: 3'$\\\\to$5' proofreading exonuclease activity (removes misincorporated bases immediately).
  - **$\\beta$-sliding clamp (processivity factor)**: Ring-shaped dimer that encircles DNA and tethers Pol III to the template, conferring processivity of $\\\\gt 500{,}000$ nt before dissociation.
  - **$\\gamma$-complex (clamp loader)**: ATP-dependent; opens the $\\beta$-clamp ring and loads it onto primed template DNA at each new Okazaki fragment.
- **Lagging Strand Synthesis**: Okazaki fragments ($\\\\sim$1000–2000 nt in prokaryotes; $\\\\sim$100–200 nt in eukaryotes). After each fragment is completed:
  1. **DNA Pol I** (5'$\\\\to$3' exonuclease + polymerase): Removes the RNA primer via nick translation, replacing it with DNA.
  2. **DNA Ligase**: Seals the remaining nick by forming a phosphodiester bond (uses NAD$^+$ in E. coli; ATP in eukaryotes and T4 phage).
- **Eukaryotic Replication Fork Differences**: DNA Pol $\\alpha$/primase (initiates), Pol $\\epsilon$ (leading strand), Pol $\\delta$ (lagging strand), PCNA sliding clamp (homotrimer), RFC clamp loader, CMG helicase (Cdc45-MCM2-7-GINS, translocates 3'$\\\\to$5' on the leading strand template).`
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
  - Eukaryotes: MSH2/MSH6 (MutS$\\alpha$, recognizes single-base mismatches) or MSH2/MSH3 (MutS$\\beta$, recognizes IDLs). MLH1/PMS2 (MutL$\\alpha$). No MutH homolog; strand discrimination uses pre-existing nicks or PCNA orientation. **Lynch syndrome**: germline mutations in MLH1/MSH2 cause hereditary nonpolyposis colorectal cancer (HNPCC) due to microsatellite instability.
- **Base Excision Repair (BER)**: Corrects small, non-helix-distorting base lesions (oxidation: 8-oxoguanine; deamination: uracil from cytosine deamination).
  - **DNA glycosylase** (e.g., Uracil-DNA Glycosylase / UNG) cleaves the N-glycosidic bond, creating an **AP (apurinic/apyrimidinic) site**.
  - **AP Endonuclease (APE1)** nicks the backbone 5' to the AP site. Repair synthesis by Pol $\\beta$ and ligation.
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
  - Class I synthetases: Charge the 2'-OH of terminal adenosine (monomers, Rossmann fold). Class II: Charge the 3'-OH (dimers/tetramers, anti-parallel $\\beta$-sheet).
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
- **Peptidoglycan (Murein)**: A rigid mesh polymer of alternating **N-acetylglucosamine (NAG)** and **N-acetylmuramic acid (NAM)** linked by $\\beta$-1,4 glycosidic bonds. NAM carries a tetrapeptide side chain (L-Ala–D-Glu–meso-DAP/L-Lys–D-Ala). Cross-links between adjacent glycan chains occur via peptide bonds between the 3rd amino acid of one chain and the 4th (D-Ala) of another (direct in Gram-negatives; via pentaglycine bridge in *Staphylococcus aureus* Gram-positives).
  - **Lysozyme** cleaves the $\\beta$-1,4 bond between NAM and NAG. **Penicillin** inhibits transpeptidase (PBP, penicillin-binding protein), blocking cross-link formation.
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
  - **Porins**: Trimeric $\\beta$-barrel transmembrane proteins forming water-filled channels for passive diffusion of hydrophilic solutes $\\\\lt 600$ Da.
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
  - **Filament**: Long helical structure ($\\\\sim$5–10 $\\mu$m) composed of $\\\\sim$20{,}000 flagellin (FliC) subunits. Growth occurs at the distal tip, with FliC monomers exported through the hollow core via a Type III secretion system.
- **Rotation**: E. coli flagellar motor rotates at $\\\\sim$300 Hz, generating torque of $\\\\sim$4{,}600 pN·nm. Can switch direction:
  - **Counterclockwise (CCW) rotation** (viewed from outside): Flagella form a coherent left-handed helical bundle $\\\\to$ **run** (smooth, directed swimming at $\\\\sim$25 $\\mu$m/s).
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
  - **Specialized Transduction**: Restricted to temperate phages that integrate at specific chromosomal sites (e.g., $\\lambda$ phage integrates between *gal* and *bio* operons via integrase-mediated recombination between phage *attP* and bacterial *attB*). Aberrant excision produces a defective phage carrying adjacent chromosomal genes (*$\\lambda$dgal* or *$\\lambda$dbio*). Only genes flanking the prophage insertion site can be transduced.`
      },
      {
        heading: "4. Virology & Baltimore Classification",
        content: `Viruses are classified by genome type and replication strategy (David Baltimore, 1971):
- **Viral Structure**: Obligate intracellular parasites. Core components: nucleic acid genome + protein capsid (icosahedral, helical, or complex). Many animal viruses also possess a **lipid envelope** derived from host membranes, studded with viral glycoproteins (e.g., influenza HA/NA, HIV gp120/gp41).
  - **Icosahedral Capsid Geometry**: **Triangulation number (T-number)** = $h^2 + hk + k^2$ (where $h$, $k$ are non-negative integers). Determines the number of capsomers: 60T subunits total, 12 pentamers + $10(T-1)$ hexamers. T=1: 60 subunits (smallest, e.g., satellite tobacco necrosis virus). T=3: 180 subunits (e.g., tomato bushy stunt virus). T=25: adenovirus.
- **Baltimore Classification (7 Groups)**:
  - **Group I: dsDNA** (e.g., Herpesvirus, Adenovirus, Bacteriophage T4). Replication uses host or viral DNA-dependent DNA polymerase.
  - **Group II: ssDNA** (e.g., Parvovirus [−sense], $\\phi$X174 [+sense], M13). Convert to dsDNA replicative form before transcription.
  - **Group III: dsRNA** (e.g., Reovirus, Rotavirus). Segmented genomes. Viral RNA-dependent RNA polymerase (RdRp) transcribes −sense strand of each segment into +sense mRNA.
  - **Group IV: (+)ssRNA** (e.g., Poliovirus, SARS-CoV-2, TMV). Genome directly serves as mRNA; translated immediately upon entry. Encodes RdRp for replication via (−)ssRNA intermediate.
  - **Group V: (−)ssRNA** (e.g., Influenza, Ebola, Rabies). Genome is anti-sense; must carry RdRp within the virion to transcribe (+)sense mRNA.
  - **Group VI: (+)ssRNA-RT (Retroviruses)** (e.g., HIV, HTLV). Diploid (+)ssRNA genome. **Reverse transcriptase (RT)** synthesizes dsDNA copy (cDNA) in cytoplasm. **Integrase** inserts dsDNA (provirus) into host chromosome. Proviral DNA is transcribed by host RNA Pol II to produce genomic RNA and mRNAs.
  - **Group VII: dsDNA-RT (Pararetroviruses)** (e.g., Hepatitis B, Cauliflower Mosaic Virus). dsDNA genome with RNA intermediate. Host RNA Pol II transcribes a pregenomic RNA (pgRNA); viral RT reverse-transcribes pgRNA back to dsDNA within the capsid.
- **Bacteriophage $\\lambda$ Lysis-Lysogeny Decision**:
  - **Lytic pathway**: Activated by **Cro protein** binding to operator $O_R$ (preferentially $O_{R3}$ first), repressing *cI* transcription.
  - **Lysogenic pathway**: **cI Repressor** (also called $\\lambda$ repressor) binds cooperatively to $O_{R1}$ and $O_{R2}$, repressing lytic genes ($cro$, replication, lysis) while positively autoregulating its own transcription from $P_{RM}$.
  - **Prophage induction**: DNA damage $\\\\to$ RecA stimulates autocleavage of cI repressor (similar to LexA cleavage in SOS response) $\\\\to$ derepression of lytic genes $\\\\to$ excision and lytic replication.
- **Prions**: Infectious proteinaceous particles lacking nucleic acid. PrP$^C$ (normal, $\\alpha$-helix-rich cellular prion protein, GPI-anchored) undergoes conformational conversion to PrP$^{Sc}$ (pathogenic, $\\beta$-sheet-rich, protease-resistant, amyloid-forming). PrP$^{Sc}$ acts as a template, catalyzing autocatalytic conversion of PrP$^C$ $\\\\to$ PrP$^{Sc}$. Causes transmissible spongiform encephalopathies: Creutzfeldt-Jakob disease (CJD), bovine spongiform encephalopathy (BSE / mad cow), scrapie (sheep), kuru (human, ritualistic cannibalism).`
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
  - **Selectable marker**: Antibiotic resistance gene (e.g., $amp^R$ / $\\beta$-lactamase, $kan^R$ / aminoglycoside phosphotransferase).
  - **Multiple Cloning Site (MCS / polylinker)**: Clustered unique restriction sites for insert cloning. Located within the **lacZ$\\alpha$** gene fragment.
  - **Blue-White Screening (Insertional Inactivation)**:
    - Vector carries lacZ$\\alpha$ fragment; host strain carries lacZ$\\Delta$M15 deletion. Together they reconstitute functional $\\beta$-galactosidase via **$\\alpha$-complementation**.
    - Insertion of foreign DNA into the MCS disrupts lacZ$\\alpha$ $\\\\to$ no $\\alpha$-complementation $\\\\to$ no functional $\\beta$-galactosidase.
    - On plates with IPTG (inducer) and **X-gal** (chromogenic substrate: 5-bromo-4-chloro-3-indolyl-$\\beta$-D-galactopyranoside): $\\beta$-galactosidase cleaves X-gal $\\\\to$ blue precipitate. Recombinants (insert present) form **white colonies**; non-recombinants (self-ligated vector) form **blue colonies**.
- **cDNA vs. Genomic Libraries**:
  - **cDNA library**: Reverse transcriptase converts mRNA $\\\\to$ cDNA (represents only expressed genes in that tissue/condition; lacks introns, promoters, enhancers). Requires oligo(dT) priming from poly(A) tail or random hexamer priming.
  - **Genomic library**: Complete genome fragmented by partial restriction digest or mechanical shearing. Cloned into high-capacity vectors (BACs: $\\\\sim$100–300 kb inserts; YACs: $\\\\sim$200–2000 kb inserts; cosmids: $\\\\sim$35–45 kb; fosmids: $\\\\sim$40 kb).
  - **Library coverage formula**: $N = \\frac{\\\\ln(1-P)}{\\\\ln(1-f)}$ where $P$ = probability of any given sequence being represented, $f$ = fractional proportion of genome per clone.`
      },
      {
        heading: "2. PCR & Quantitative PCR",
        content: `The polymerase chain reaction amplifies a specific DNA target exponentially from minute quantities of template:
- **Standard PCR Components**: Template DNA, two synthetic oligonucleotide primers (forward and reverse, flanking the target), dNTPs, thermostable DNA polymerase (**Taq**: from *Thermus aquaticus*, optimal at 72°C; lacks proofreading $\\\\to$ error rate $\\\\sim 10^{-4}$/bp/cycle; use **Pfu** or **Phusion** for high-fidelity applications with 3'$\\\\to$5' exonuclease proofreading), $MgCl_2$ buffer.
- **Thermal Cycling**:
  1. **Denaturation**: 94–98°C, $\\\\sim$30 s. Melts dsDNA template into ssDNA.
  2. **Annealing**: 50–65°C (depends on primer $T_m$), $\\\\sim$30 s. Primers hybridize to complementary template strands.
  3. **Extension**: 72°C, $\\\\sim$1 min/kb. Taq extends primers in the 5'$\\\\to$3' direction, incorporating dNTPs.
  - After $n$ cycles: Theoretical yield $= 2^n$ copies (e.g., 30 cycles $= 2^{30} \\approx 10^9$ copies). In practice, amplification efficiency $E$ ranges from 0.7 to 1.0 per cycle; actual yield $= (1+E)^n$.
- **Primer Design Rules**:
  - Length: 18–25 nt. $T_m$: 55–65°C. GC content: 40–60%. Avoid self-complementarity, hairpins, primer-dimers.
  - **Wallace Rule** (short oligos $\\leq$ 20 nt): $T_m = 4(G+C) + 2(A+T)$ °C.
  - **Nearest-Neighbor Method** (more accurate): $T_m = \\frac{\\Delta H}{\\Delta S + R \\\\ln(C_T/4)} - 273.15$ where $\\Delta H$ and $\\Delta S$ are enthalpy and entropy sums of nearest-neighbor dinucleotide stacking parameters, $R = 1.987$ cal/(mol·K), and $C_T$ = total strand concentration.
- **RT-qPCR (Reverse Transcription Quantitative PCR)**:
  - Reverse transcriptase converts mRNA to cDNA; followed by real-time quantitative PCR.
  - **Detection chemistries**:
    - **SYBR Green**: Intercalating fluorescent dye that binds dsDNA nonspecifically. Cheap but detects all dsDNA (including primer-dimers and nonspecific products). Melt curve analysis required for specificity validation.
    - **TaqMan (Hydrolysis Probe)**: Sequence-specific probe with 5' fluorescent reporter and 3' quencher. During extension, Taq's 5'$\\\\to$3' exonuclease activity cleaves the probe, separating reporter from quencher $\\\\to$ fluorescence signal. Highly specific.
  - **$C_t$ (Threshold Cycle)**: Cycle number at which fluorescence exceeds background threshold. Lower $C_t$ = more starting template.
  - **$\\Delta\\Delta C_t$ Method** for relative quantification: Fold change $= 2^{-\\Delta\\Delta C_t}$, where $\\Delta\\Delta C_t = (C_{t,\\\\text{target}} - C_{t,\\\\text{ref}})_{\\\\text{treated}} - (C_{t,\\\\text{target}} - C_{t,\\\\text{ref}})_{\\\\text{control}}$. Assumes amplification efficiency $= 100\\\\%$ for both target and reference genes.`
      },
      {
        heading: "3. Electrophoresis & Blotting Techniques",
        content: `Separation and detection of nucleic acids and proteins by size:
- **Agarose Gel Electrophoresis (DNA/RNA)**:
  - Agarose concentration: 0.5–2.0% (lower % resolves larger fragments: 0.5% for 1–30 kb; 2% for 100 bp–2 kb).
  - DNA is uniformly negatively charged (phosphodiester backbone) $\\\\to$ migrates toward the anode (+). Migration rate is inversely proportional to $\\\\log_{10}$(molecular weight) for linear dsDNA.
  - **Ethidium bromide (EtBr)**: Classic intercalating fluorescent stain. Inserts between stacked base pairs, fluoresces under UV ($\\lambda_{ex}$ = 302 nm, $\\lambda_{em}$ = 590 nm). Being replaced by safer alternatives (SYBR Safe, GelRed).
  - **Supercoiled plasmid migration**: On standard agarose gels, supercoiled (Form I) migrates fastest (compact), relaxed circular (Form II, nicked) migrates slowest, and linearized (Form III) migrates at a rate proportional to its size.
  - **Pulsed-Field Gel Electrophoresis (PFGE)**: Alternating electric field directions. Resolves very large DNA molecules (50 kb – 10 Mb) that cannot migrate through standard agarose (too large to reptate through pores at a constant field angle). Used for bacterial genome fingerprinting (epidemiological typing).
- **SDS-PAGE (Proteins)**:
  - Sodium dodecyl sulfate (SDS) denatures proteins and coats them uniformly with negative charge ($\\\\sim$1.4 g SDS/g protein), masking intrinsic charge differences. Migration depends solely on molecular weight.
  - Polyacrylamide percentage: 7.5–15% (higher % for smaller proteins). Stained with Coomassie Brilliant Blue (detection limit $\\\\sim$0.1 $\\mu$g) or silver stain (detection limit $\\\\sim$1 ng).
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
    id: "cell-13-bioinformatics",
    domainId: "cell_bio",
    title: "Bioinformatics: Sequence Analysis, BLAST & Genomics",
    subtitle: "Databases, pairwise alignment, E-values, dN/dS and molecular clocks - now inside the IBO syllabus",
    level: "USABO Finalist / IBO",
    xp: 120,
    estimatedMinutes: 20,
    prerequisites: ["cell-6-molecular-genetics", "genetics-2-popgen"],
    sources: ["IBO 2024 Practical: Bioinformatics (GenBank, BLAST, statistical ecology)", "Alberts MBoC Ch. 8-9", "NCBI Handbook", "Claverie & Notredame: Bioinformatics for Beginners"],
    interactiveTool: null,
    summary: "A bioinformatics practical has appeared at every IBO since 2019 and USABO added the area from 2025. This module covers the formats and databases, reading frames and ORFs, alignment scoring and E-values, BLAST variants, phylogenomic inference with bootstrap support, and the selection statistics (dN/dS) that turn sequences into evolutionary evidence.",
    keyFormulas: [
      { name: "Karlin-Altschul Expectation", latex: "E = K m n e^{-\\lambda S}" },
      { name: "Synonymous/Nonsynonymous Ratio", latex: "\\omega = \\frac{d_N}{d_S}\\; (>1 \\text{ = positive selection, } <1 \\text{ = purifying})" },
      { name: "Number of Reading Frames", latex: "3 \\text{ per strand} \\times 2 \\text{ strands} = 6" }
    ],
        sections: [
      {
        heading: "Sequence alignment: scoring, dynamic programming and significance",
        content: `Alignment asks whether two sequences are homologous or merely similar; the statistics matter as much as the algorithm.

- **Scoring systems.** Identity matrices are crude; substitution matrices encode observed substitution frequencies. PAM (point accepted mutation) models extrapolate from close homologues (PAM250 is distant), whereas BLOSUM matrices are built from blocks of conserved regions (BLOSUM62 = 62% identity clusters, the default for proteins). Gap open penalties exceed gap extension penalties because indels are rare, and a single long indel is usually better explained than many short ones.
- **Dynamic programming.** Needleman–Wunsch finds the global optimum (equal-length, related sequences); Smith–Waterman finds local optima (domains in otherwise unrelated proteins). Both are $O(nm)$ in time — which is why heuristic seeds (BLAST/k-mer, FASTA) exist for databases. Affine gap costs require three matrices (M, $I_x$, $I_y$).
- **Significance.** The $E$-value is the expected number of hits of that score in a database of that size: $E = Kmn\\,e^{-\\lambda S}$. An $E$-value of $10^{-3}$ means one expected chance hit per 1000 searches of that database — it is *database-size dependent*, so the same alignment gets a different E-value against a bigger database. Bit scores normalise for matrix and database size and are comparable across runs.
- **Interpretation.** High identity over a short region is weak evidence of homology when the sequence is low complexity (coiled-coil, proline-rich, transmembrane stretches); profile HMMs (Pfam) and PSI-BLAST iteration capture position-specific conservation that a single matrix misses. Identical sequences in different species may reflect horizontal transfer, contamination or annotation error before they reflect biology.

Trap: a low E-value is evidence of *similarity*, and homology is an inference; convergent evolution can produce high-scoring alignments in structurally unrelated proteins.`
      },
      {
        heading: "Phylogenetics: parsimony, likelihood and the limits of a tree",
        content: `- **Character vs distance methods.** Parsimony minimises the number of state changes; maximum likelihood maximises the probability of the data under an explicit substitution model (JC69, K2P, GTR + $\\Gamma$ + invariant sites); Bayesian inference returns posterior distributions. Distance methods (UPGMA assumes a molecular clock; neighbour-joining is fast and clock-free) lose information by collapsing alignment columns into a single distance.
- **Homology vs homoplasy.** Only shared derived characters (synapomorphies) define clades; shared ancestral states (symplesiomorphies) and convergent states (homoplasies) mislead. Long-branch attraction pulls fast-evolving lineages together — the classic artefact that placed microsporidia among early eukaryotes until better models and taxon sampling corrected it.
- **Support.** Bootstrap resampling of columns gives a frequency, not a probability that the clade is true; posterior probabilities from Bayesian analyses are typically higher for the same data, so they are not interchangeable. A well-supported short internode can still reflect a rapid radiation with few informative sites.
- **Rooting.** An unrooted tree has no direction; outgroup rooting requires a taxon outside the ingroup, and midpoint rooting assumes a clock. Gene trees need not match species trees — incomplete lineage sorting, introgression and horizontal transfer all produce discordance, which is why concatenation and coalescent methods (ASTRAL) are compared.
- **Molecular clocks** are only approximately valid: generation time, metabolic rate and selection all shift rates, and fossil calibrations carry their own error. Divergence dates should be reported as intervals.

Trap: "the most parsimonious tree" is the best explanation under a model, not proof of history; adding taxa can change the answer, and identical topologies from different genes are stronger evidence than one gene with high bootstrap.`
      },
      {
        heading: "Genomics, transcriptomics and the annotation problem",
        content: `- **Genome assembly** is a graph problem: sequencing reads become contigs, contigs become scaffolds, and repeats longer than a read collapse — the reason short-read assemblies fragment at repeat-rich loci while long reads (PacBio, Nanopore) span them. Depth is Poisson-distributed, so coverage varies; $N50$ measures contiguity, not correctness. Assembly completeness is assessed by conserved single-copy orthologues (BUSCO).
- **Annotation** finds genes (ORFs, splice sites, codon usage, Kozak/Shine–Dalgarno context), assigns function by homology and domains, and is where most error lives: pseudo­genes, overlapping frames, and mis-predicted exon boundaries are common. Prokaryotic operons mean one mRNA, many proteins; eukaryotic alternative splicing means one gene, many isoforms.
- **Expression profiling.** Microarrays are hybridisation-based and relative; RNA-seq counts molecules and reports either raw counts or normalised units (TPM normalises within a sample, FPKM/RPKM historically normalised both; DESeq2/edgeR model count overdispersion with a negative binomial). Single-cell RNA-seq adds dropout, so zero counts may be technical.
- **Comparative genomics.** Orthologues (speciation) versus paralogues (duplication) must be distinguished before inferring function; synteny conservation supports orthology. dN/dS ($\\omega$) tests selection: $\\omega < 1$ purifying, $\\approx 1$ neutral, $> 1$ positive selection at specific codons (site models).
- **GWAS and QTL** connect genotype to phenotype statistically, and require correction for population structure and multiple testing — a Manhattan plot's tallest peak is a hypothesis, not a mechanism.

Trap: high expression in RNA-seq is not proof of protein abundance; translation efficiency, protein half-life and post-translational control decouple transcript from protein.`
      },
      {
        heading: "Structural bioinformatics: from sequence to shape and ligand",
        content: `- **Secondary-structure prediction** is now largely solved by deep learning (AlphaFold2/ESMFold), but the output is a *model* with per-residue confidence (pLDDT) and a predicted-aligned-error plot; low-confidence loops and disordered regions should not be over-interpreted. Experimental structures (X-ray, cryo-EM, NMR) remain the ground truth and carry resolution and $R$-factor quality metrics.
- **Folding principles** explain what predictors exploit: hydrophobic burial, secondary-structure propensities, disulphide and metal constraints, and coevolution of contacting residue pairs (the signal that made deep learning work — a covariation map is an inverse-folding contact map).
- **Docking and virtual screening** score shape complementarity and interaction energy (van der Waals, electrostatics, desolvation, hydrogen bonding). Scoring functions are the weak link: enrichment of true actives is modest, and a docking pose is a hypothesis to be tested by mutagenesis or crystallography. Free-energy perturbation and molecular dynamics refine but cost compute.
- **Pharmacophore and QSAR** models generalise across a series; Lipinski-style rules describe oral bioavailability, not potency. Conservation mapping on a structure (ConSurf) identifies functional patches faster than mutating blindly.
- **Databases** to know: GenBank/ENA (sequences), UniProt (proteins), PDB (structures), Pfam/InterPro (domains), KEGG/Reactome (pathways), GEO/ArrayExpress (expression), Ensembl/UCSC (genomes and tracks).

Trap: a predicted structure with high average confidence can still have a wrong interface; oligomeric state and ligand-bound conformation are not determined by sequence alone.`
      }
    ]
  },

  {
    id: "cell-14-methods-biostatistics",
    domainId: "cell_bio",
    title: "Experimental Design, Core Techniques & Biostatistics",
    subtitle: "Controls, spectrophotometry, electrophoresis, t-tests, chi-square and reading data figures",
    level: "USABO Finalist / IBO",
    xp: 140,
    estimatedMinutes: 26,
    prerequisites: [],
    sources: ["IBO Appendix II: Basic Skills of the Practical Part", "Campbell Ch. 1 (Scientific Inquiry)", "Alberts MBoC Ch. 4 (Methods)", "CEE Student Resource Center"],
    interactiveTool: null,
    summary: "IBO states explicitly that questions on the principles of scientific reasoning and biological methods belong in the theory paper, and USABO Part B/C embeds data interpretation. This module covers valid experimental design, the techniques whose outputs appear in figures (spectrophotometry, centrifugation, chromatography, electrophoresis, PCR), and the statistics needed to decide whether a difference is real.",
    keyFormulas: [
      { name: "Beer-Lambert Law", latex: "A = \\varepsilon c l" },
      { name: "Chi-Square Goodness of Fit", latex: "\\chi^2 = \\sum \\frac{(O - E)^2}{E}" },
      { name: "Standard Error of the Mean", latex: "SE = \\frac{s}{\\sqrt{n}}" }
    ],
        sections: [
      {
        heading: "Separation and spectroscopy: what each method can and cannot tell you",
        content: `- **Centrifugation.** Differential centrifugation separates by size/density (nuclei $1000g$, mitochondria $10{,}000g$, microsomes $100{,}000g$); density-gradient (sucrose, Percoll) and equilibrium centrifugation resolve organelles of similar size but different density. Sedimentation coefficient $s$ depends on mass *and* shape, so a large elongated protein can pellet like a small globular one. The Svedberg unit is $10^{-13}\\ \\text{s}$.
- **Chromatography.** Gel filtration separates by hydrodynamic radius (large elutes first); ion exchange by net charge (pH and pI matter — set pH one unit away from pI for tight binding); affinity by specific interaction (His-tag/Ni$^{2+}$, GST, immunoprecipitation); reverse-phase by hydrophobicity in organic solvent, which denatures. Resolution is measured by plate number and selectivity; a His-tag can alter folding, so tag cleavage and functional assay are controls, not optional extras.
- **Spectroscopy.** UV absorbance at 280 nm quantifies protein (Trp, Tyr, disulphides) and 260 nm nucleic acid; the A260/A280 ratio diagnoses contamination. Colorimetric assays (Bradford, BCA, Lowry) differ in detergent and reducing-agent compatibility. Circular dichroism reports secondary-structure content ($\\alpha$-helix minima at 208 and 222 nm). Fluorescence (intrinsic Trp, extrinsic ANS, GFP) gives sensitivity and, with FRET, nanometre distances. Mass spectrometry gives exact mass and, with tandem MS, sequence — the workhorse of proteomics; isotope labelling (SILAC, TMT) enables quantification.
- **Radioisotopes and tracers** remain the gold standard for flux: $^{14}$C for carbon skeletons, $^{32}$P for phosphorylation, $^{3}$H for turnover, $^{45}$Ca for transport. Specific activity and quenching must be controlled.

Trap: a "pure" fraction on a gel is not a functional preparation; activity assays, not band intensity, establish enrichment, and a coomassie band at the expected mass can still be a comigrating contaminant.`
      },
      {
        heading: "Electrophoresis, blotting, PCR and sequencing",
        content: `- **Electrophoresis.** SDS-PAGE denatures and coats proteins with negative charge, so migration depends on mass (with glycosylation and charge anomalies); native PAGE preserves complexes and reports shape and charge; isoelectric focusing separates by pI, and 2D gels combine both. Agarose gels resolve DNA by size, with supercoiled plasmid running anomalously fast.
- **Blotting.** Southern (DNA), northern (RNA), western (protein) transfer to a membrane after separation; detection is radioactive or chemiluminescent. A western blot is only semi-quantitative unless a loading control and a linear-range exposure are shown — "housekeeping" controls (GAPDH, actin, tubulin) can themselves change with treatment, a common critique.
- **PCR.** Denaturation (~95 °C), annealing (Tm-dependent, ~55–65 °C), extension (72 °C, $Taq$ ~1 kb/min). Primer design needs matched Tm, no 3′ complementarity, and specificity checked against the genome. $Taq$ lacks proofreading (error ~$10^{-4}$/bp); high-fidelity polymerases add it. qPCR measures amplification in real time (SYBR green or hydrolysis probes); $C_t$ is inversely proportional to starting template, and quantification requires a standard curve or the $\\Delta\\Delta C_t$ method with validated reference genes. RT-PCR (reverse transcription then PCR) measures RNA, and is not the same as RT-qPCR.
- **Sequencing.** Sanger uses dideoxynucleotide chain termination (read ~700–1000 bp); Illumina uses reversible-terminator sequencing by synthesis (short reads, massive depth); Nanopore measures current changes as a strand passes a pore (long reads, higher raw error). Assembly, variant calling and methylation detection all follow from these trade-offs.
- **Genome editing readouts:** CRISPR-Cas9 creates a double-strand break 3 bp upstream of the PAM (NGG for SpCas9); repair by NHEJ gives indels (knockout), by HDR gives precise edits (needs a template). Base and prime editors avoid double-strand breaks. Off-target prediction plus empirical validation (GUIDE-seq, amplicon sequencing) are required before claiming specificity.

Trap: a band of the right size after PCR does not prove the intended product — primer dimers, pseudogene amplification and genomic DNA contamination all give bands, so melting curves and sequencing are required.`
      },
      {
        heading: "Imaging, cytometry and single-cell resolution",
        content: `- **Light microscopy** is limited by diffraction to ~200 nm laterally. Resolution is improved by confocal pinholes (optical sectioning, rejects out-of-focus light), deconvolution, and super-resolution: STED (stimulated emission depletion), SIM (structured illumination), and single-molecule localisation (PALM/STORM) which reaches 10–20 nm. Each has trade-offs in speed, phototoxicity and live-cell compatibility.
- **Functional microscopy.** FRAP measures mobility and turnover by bleaching a region and watching recovery; FLIP measures continuous loss; FRET reports proximity under 10 nm and is used for biosensors (cameleon Ca$^{2+}$, tension sensors); TIRF images only the ~100 nm adjacent to the coverslip, ideal for single vesicles and membrane events. Calcium imaging with GCaMP and voltage imaging with ASAP indicators turn dynamics into fluorescence.
- **Electron microscopy** reaches sub-nanometre resolution but requires fixation (or vitrification in cryo-EM), so dynamics are inferred, not observed; immunogold localisation and tomography add molecular identity and 3D context.
- **Flow cytometry** measures per-cell fluorescence in suspension at $10^4$–$10^5$ cells/s; compensation for spectral overlap and proper controls (fluorescence-minus-one) are essential, and sorting (FACS) adds viability and sterility constraints. Mass cytometry (CyTOF) trades throughput for ~40 simultaneous markers without compensation artefacts.
- **Statistics of imaging and omics.** Replicate the biological unit, not the field of view; report $n$ as independent samples; avoid pseudoreplication; correct for multiple comparisons (Bonferroni is conservative, Benjamini–Hochberg controls false discovery rate); pre-register or at least report effect sizes and confidence intervals, because a p-value is not an effect size.

Trap: colocalisation of two colours is not proof of interaction — resolution (~200 nm) is far larger than a molecular complex, so FRET, proximity ligation or co-immunoprecipitation is needed.`
      },
      {
        heading: "Biostatistics for olympiad data analysis",
        content: `- **Describing data.** Mean and SD for symmetric data; median and IQR for skewed data; SEM ($= SD/\\sqrt{n}$) describes precision of the mean, not spread of the population — plotting SEM as error bars understates variability by $\\sqrt{n}$.
- **Choosing a test.** Two independent groups, continuous, roughly normal $\\to$ unpaired $t$-test (Welch's if variances differ); paired design $\\to$ paired $t$-test; three or more groups $\\to$ one-way ANOVA with post-hoc correction; two categorical variables $\\to$ $\\chi^2$ (or Fisher's exact for small counts); counts of events $\\to$ Poisson models; relationship between continuous variables $\\to$ regression/correlation. Non-parametric alternatives (Mann–Whitney, Kruskal–Wallis) test ranks, not medians, unless distributions differ only by shift.
- **What a p-value is.** $P(\\text{data} \\mid H_0)$, not $P(H_0 \\mid \\text{data})$. A $p = 0.04$ means that if the null were true, 4% of experiments would produce data at least this extreme. It says nothing about effect size, and with $n = 10^6$ a trivial difference becomes significant — hence effect sizes and confidence intervals.
- **Power and error.** Power $= 1-\\beta$ rises with effect size, $n$ and lower variance; with $\\alpha = 0.05$ and power 0.8, a study needs roughly $16/\\Delta^2$ per group for a standardised difference $\\Delta$. Multiple comparisons inflate family-wise error: 20 independent tests at $\\alpha = 0.05$ give a ~64% chance of at least one false positive.
- **Genetics-specific tests.** $\\chi^2$ goodness-of-fit tests Mendelian ratios; linkage is tested by LOD score (log$_{10}$ of the odds ratio, threshold 3 conventionally); Hardy–Weinberg equilibrium is tested with $\\chi^2$ and deviations indicate genotyping error, selection, non-random mating or population structure. Case-control association needs correction for structure and for the number of markers tested.

Trap: correlation is not causation, but more subtly, a significant interaction in a two-way ANOVA means the *effect of one factor depends on the other* — reporting two main effects and ignoring the interaction is the most common analysis error.`
      }
    ]
  },

  // ==================== ADDED: GAP FILL (PLANT & ANIMAL PHYSIOLOGY) ====================
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
        content: `Epistasis occurs when the phenotypic expression of one gene locus masks or alters the phenotypic expression of an independent unlinked locus. In an $AaBb \\times AaBb$ dihybrid cross:
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
  - *Classic Example*: Yellow coat color in mice (*Agouti* locus, $A^y$). Crossing two yellow mice ($A^y A \\times A^y A$) yields a **2 yellow : 1 agouti** phenotypic ratio among surviving offspring because homozygous $A^y A^y$ embryos die *in utero*.`
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
  $$V_P = V_G + V_E + V_{G \\times E}$$
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
  - $S$: **Selection Differential** ($S = \\bar{x}_{\\text{parents}} - \\bar{x}_{\\text{population}}$).
  - $R$: **Response to Selection** ($R = \\bar{x}_{\\text{offspring}} - \\bar{x}_{\\text{population}}$).
  - If narrow-sense heritability $h^2 = 0.60$ and parents selected for body mass average $10\\text{ g}$ heavier than the population mean ($S = 10$), the expected gain in offspring is $R = 0.60 \\times 10 = 6\\text{ g}$!`
      }
    ]
  },

  {
    id: "genetics-5-meiosis-mutation",
    domainId: "genetics",
    title: "Meiosis, Chromosomal Rearrangements & Mutation Repair",
    subtitle: "Prophase I machinery, nondisjunction, aneuploidy, mutation classes and DNA repair pathways",
    level: "USABO Finalist / IBO",
    xp: 140,
    estimatedMinutes: 26,
    prerequisites: ["genetics-1-mapping"],
    sources: ["Pierce: Genetics Ch. 2, 8, 17-18", "Alberts MBoC Ch. 5, 6", "Campbell Ch. 13, 15"],
    interactiveTool: null,
    summary: "IBO lists meiosis I and II, crossing over, mutation and modification as core genetics, but the app previously reached meiosis only inside linkage mapping. This module covers the mechanics of meiotic division, the origins of aneuploidy and structural rearrangement, sex-linked inheritance and dosage compensation, and the mutation and repair pathways that set the mutation rate.",
    keyFormulas: [
      { name: "Independent Assortment", latex: "\\text{Gamete combinations} = 2^n \\quad (n = \\text{haploid chromosome number})" },
      { name: "Chromosome Content", latex: "\\text{Meiosis I: } 2n \\to n \\; \\text{(sister chromatids remain attached)}" },
      { name: "Expected Aneuploidy Source", latex: "\\approx 90\\% \\text{ of trisomies arise from maternal meiosis I nondisjunction}" }
    ],
        sections: [
      {
        heading: "Meiosis: choreography, recombination and the sources of variation",
        content: `Meiosis halves the chromosome number in two divisions, with replication only before meiosis I.

- **Prophase I substages:** leptotene (chromosomes condense), zygotene (synapsis begins, synaptonemal complex forms), pachytene (crossing over completes; recombination nodules visible), diplotene (SC disassembles, chiasmata become visible), diakinesis (condensation, nuclear envelope breakdown). Crossing over is initiated by SPO11-catalysed double-strand breaks, resolved as crossovers (Holliday junction resolution) or non-crossovers; at least one chiasma per bivalent is required for correct segregation, which is why "obligate crossover" mutants cause nondisjunction.
- **Two divisions, different logic.** Meiosis I separates homologues (reductional), held together by chiasmata plus cohesin distal to the crossover; separase cleaves arm cohesin but centromeric cohesin is protected by shugoshin until meiosis II. Meiosis II separates sister chromatids (equational). The result is four haploid products with new allele combinations from both independent assortment ($2^{n}$ for $n$ chromosome pairs) and recombination.
- **Gametogenesis.** Spermatogenesis is continuous and yields four sperm; oogenesis is arrested in prophase I until ovulation and completes meiosis II only on fertilisation, producing one ovum and polar bodies. The long arrest explains the maternal age effect on aneuploidy: cohesin and chiasmata deteriorate over decades, raising nondisjunction risk (trisomy 21 risk rises steeply after 35).
- **Nondisjunction** at meiosis I (homologues fail to separate) or II (sister chromatids fail) produces aneuploid gametes; most autosomal aneuploids are inviable, but trisomy 21, 18, 13 and sex-chromosome aneuploids survive to term with characteristic phenotypes. Mosaicism arises from mitotic nondisjunction after fertilisation.
- **Variation arithmetic:** a human with 23 pairs can produce $2^{23} \\approx 8.4\\times10^{6}$ chromosome combinations before recombination, and recombination multiplies this further — the reason siblings (except identical twins) are genetically unique.

Trap: crossing over occurs in prophase I, not in mitosis (somatic crossing over is rare and pathological), and sister-chromatid exchange in mitosis does not generate new allele combinations.`
      },
      {
        heading: "Recombination mapping, tetrad analysis and interference",
        content: `- **Map distance.** Recombination frequency (RF) between two loci estimates genetic distance in centimorgans (1 cM = 1% recombinant gametes) only for short distances; for larger distances double crossovers make RF an underestimate, so mapping functions convert RF to distance (Haldane assumes no interference: $d = -\\tfrac{1}{2}\\ln(1-2r)$; Kosambi assumes interference).
- **Three-point crosses** order loci by comparing parental, single-crossover and double-crossover classes; the least frequent class is the double crossover, which reveals the middle gene. **Interference** $I = 1 - \\text{c.o.c.}$, where the coefficient of coincidence is observed/expected double crossovers; positive interference (I > 0) means crossovers inhibit nearby crossovers, and it declines with distance.
- **Tetrad analysis** in fungi (*Neurospora*, yeast) gives unordered (PD, NPD, T) or ordered octads. PD : NPD : T = 1:0:4 indicates linkage; PD = NPD indicates independent assortment; tetratype frequency converts to map distance, and ordered asci detect centromere linkage and gene conversion (unequal allele ratios in a single meiosis, evidence for heteroduplex repair).
- **Physical mapping complements genetics:** somatic-cell hybrids and radiation hybrids assign genes to chromosomes, FISH and array CGH detect copy-number changes, and sequencing-based linkage (GWAS, QTL mapping) uses recombination in populations to localise trait loci. LOD score $Z = \\log_{10}$(odds of linkage) with $Z \\geq 3$ as conventional significance — a likelihood ratio, not a p-value.
- **Sex-linked and mitochondrial exceptions** break the simple map: recombination is absent in male *Drosophila* (no crossing over), suppressed near centromeres in many species (heterochromatin), and impossible for mtDNA, which is inherited maternally and therefore haplotyped rather than mapped by crosses.

Trap: an RF of 50% means the loci are unlinked *or* so far apart that multiple crossovers obscure linkage — the two are distinguished by three-point crosses or by physical mapping.`
      },
      {
        heading: "Mutation: classes, mechanisms and the repair systems that oppose them",
        content: `- **Classes.** Substitutions are transitions (purine$\\leftrightarrow$purine) or transversions; indels shift the reading frame unless in multiples of three; consequences are silent (synonymous), missense (conservative or radical), nonsense, or frameshift. Regulatory and splice-site mutations can be as damaging as coding changes. Loss-of-function is usually recessive, gain-of-function usually dominant, and dominant-negative alleles act by poisoning multimers.
- **Sources.** Replication errors (polymerase misincorporation, slippage at repeats), spontaneous deamination of cytosine to uracil (a transition at CpG hotspots), oxidative damage (8-oxoG), alkylation, intercalation, UV-induced cyclobutane pyrimidine dimers and 6-4 photoproducts, and ionising-radiation double-strand breaks. Trinucleotide repeat expansion causes anticipation (Huntington's, fragile X) via slippage and repair-mediated lengthening.
- **Repair pathways** are the examinable core: **mismatch repair** (MutS$\\alpha$/MSH2-MSH6, MutL$\\alpha$/MLH1-PMS2; defects cause Lynch syndrome with microsatellite instability), **base excision repair** (glycosylases, AP endonuclease, for small lesions), **nucleotide excision repair** (XPA-XPG, for bulky adducts; defects cause xeroderma pigmentosum), **double-strand break repair** by homologous recombination (BRCA1/2, Rad51; error-free but S/G2-restricted) or non-homologous end joining (Ku70/80, DNA-PK; error-prone), **translesion synthesis** by low-fidelity polymerases (a mutagenic last resort), and **direct reversal** (photolyase in many organisms, MGMT for O$^6$-methylguanine). Fanconi anaemia genes handle interstrand crosslinks.
- **Mutator phenotypes and cancer.** Loss of mismatch repair or BRCA function raises mutation rate, accelerating tumour evolution; p53 loss removes the checkpoint that would otherwise trigger apoptosis after damage. The Ames test scores reversion in *his$^-$ Salmonella* as a mutagenicity screen, with S9 liver extract for metabolic activation.
- **Measuring mutation:** fluctuation analysis (Luria–Delbrück) distinguishes pre-existing from induced mutations; mutation accumulation lines and sequencing-based mutation spectra give rates per base per generation (humans ~$10^{-8}$).

Trap: a mutagen that increases mutation *rate* differs from a mutagen that selects pre-existing mutants; the Luria–Delbrück experiment is the classic discrimination, and a "jackpot" distribution proves mutations arise before selection.`
      },
      {
        heading: "Chromosome variation: aneuploidy, polyploidy, rearrangements and imprinting",
        content: `- **Aneuploidy** (2n ± 1) arises from nondisjunction or anaphase lag; most autosomal trisomies are lethal in utero, with 21, 18 and 13 surviving partially. Sex-chromosome aneuploids (45,X Turner; 47,XXY Klinefelter; 47,XYY; 47,XXX) are viable because of X inactivation and a low gene dose from the Y. Phenotypes follow from gene dosage and from which genes escape inactivation.
- **Polyploidy** (3n, 4n) is common in plants and often fertile (autopolyploids from within-species duplication; allopolyploids from hybridisation plus doubling, e.g. bread wheat). Endosperm is triploid, so a 2n egg + 2n sperm imbalance blocks seed development — the basis of hybrid incompatibility. In animals, polyploidy is usually lethal, though parthenogenetic and some fish/amphibian lineages are polyploid.
- **Rearrangements.** Deletions and duplications alter dosage (22q11 deletion, Charcot–Marie–Tooth type 1A duplication); inversions suppress recombination in heterozygotes (and can cause unbalanced gametes); reciprocal translocations produce unbalanced segregation (the Philadelphia chromosome t(9;22) creates BCR-ABL, a constitutively active tyrosine kinase treated by imatinib); Robertsonian fusions reduce chromosome number and cause Down syndrome in carriers. Position effects (a gene moved next to heterochromatin) and breakpoint disruptions are common mechanisms.
- **Imprinting** is parent-of-origin monoallelic expression by differential methylation: IGF2/H19 and the Prader–Willi/Angelman region on 15q11-q13 are the canonical examples, where deletion or uniparental disomy gives a phenotype that depends on which parent contributed the lesion. **X inactivation** (Xist RNA coating, random in eutherians, imprinted in marsupials) equalises dosage; escape genes explain Turner and Klinefelter phenotypes.
- **Detection:** karyotype (banding, balanced rearrangements), FISH (locus-specific), array CGH/SNP arrays (copy number and absence of heterozygosity), and sequencing (breakpoints, mosaicism). Each method trades resolution against the ability to see balanced changes.

Trap: a balanced translocation carrier is phenotypically normal but at high risk of unbalanced offspring — "balanced" describes the carrier's chromosomes, not the gametes.`
      }
    ]
  },

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
  - Structural genes: *lacZ* ($\\beta$-galactosidase), *lacY* (lactose permease), *lacA* (thiogalactoside transacetylase).
  - **Negative Control**: In the absence of lactose, homotetrameric **LacI repressor** binds tightly to the **operator ($lacO$)**, physically blocking RNA polymerase promoter clearance.
  - **Induction**: $\\beta$-galactosidase catalyzes a side reaction converting lactose into **allolactose** (the physiological inducer). Allolactose binds LacI $\to$ allosteric conformational shift $\to$ LacI dissociates from operator.
  - **Positive Control & Catabolite Repression**:
    - High Glucose: Low cAMP. Inactive **Catabolite Activator Protein (CAP / CRP)** cannot bind. Only basal transcription occurs even if lactose is present.
    - Low Glucose: Adenylyl cyclase is active $\to \\uparrow cAMP \to$ **cAMP-CAP complex** binds the CAP site upstream of promoter, bending DNA $90^\\circ$ and recruiting RNA polymerase holoenzyme.
    - Full transcription requires **BOTH**: Presence of lactose (repressor off) AND Absence of glucose (cAMP-CAP bound).
- **The *Trp* Operon (Repressible Anabolic System & Attenuation)**:
  - Repressor: TrpR is an aporepressor. High **tryptophan** acts as a **corepressor**, binding TrpR to form an active repressor that binds the operator.
  - **Attenuation Mechanics**:
    - The leader region (*trpL*) contains 4 RNA segments that can form alternative secondary structures: **1-2 hairpin** (transcription pause), **2-3 hairpin** (anti-terminator), or **3-4 hairpin** (Rho-independent intrinsic terminator followed by poly-U tract).
    - *TrpL* contains two adjacent Trp codons (UGG UGG).
    - *Low Tryptophan*: Ribosome translating *trpL* stalls at Trp codons due to lack of $Trp\\text{-tRNA}^{\\text{Trp}}$. Ribosome covers segment 1; segment 2 pairs with segment 3 (**2-3 anti-terminator hairpin**). The terminator cannot form $\to$ RNA polymerase transcribes the structural genes.
    - *High Tryptophan*: Ribosome translates through Trp codons without stalling to stop codon, covering segments 1 and 2. This frees segment 3 to pair with segment 4 (**3-4 terminator hairpin**) $\to$ RNA polymerase dissociates *before* transcribing structural genes!`
      },
      {
        heading: "2. Eukaryotic Chromatin Dynamics & Epigenetic Codes",
        content: `Chromatin architecture dictates transcriptional accessibility:
- **Nucleosome Structure**: Octamer of two copies each of core histones ($H2A, H2B, H3, H4$) wrapped by $147\\text{ bp}$ of DNA in 1.65 left-handed superhelical turns. Histone $H1$ acts as linker histone.
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
- **Promoter Architecture**: Core promoter contains **TATA Box** (at $-30\\text{ bp}$), Initiator (Inr), and Downstream Promoter Element (DPE).
  - **TFIID** (containing **TBP - TATA-Binding Protein**) binds the minor groove of the TATA box, sharply bending DNA by $80^\\circ$.
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
  2. Nuclear processing by microprocessor complex (**Drosha** RNase III and **Pasha / DGCR8**) cleaves flanking single-stranded ends, liberating a $\sim 70\\text{-nt}$ precursor miRNA (**pre-miRNA**).
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
    id: "genetics-6-natural-selection-speciation",
    domainId: "genetics",
    title: "Natural Selection, Adaptation & Speciation",
    subtitle: "Fitness, selection modes, reproductive isolating mechanisms, hybrid zones and the origin of species",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 28,
    prerequisites: ["genetics-2-popgen", "genetics-3-mendelian-extensions"],
    sources: ["Futuyma: Evolution Ch. 2-3, 9, 12-17", "Campbell Ch. 22-25", "Pierce Ch. 25-26"],
    interactiveTool: null,
    summary: "The IBO evolution list names mutation, natural selection, reproductive isolation, adaptation and fitness explicitly, while the app previously reached evolution only through population-genetic algebra. This module covers selection at the phenotype level, the evidence for adaptation, drift and gene flow, speciation modes and isolating mechanisms, hybrid zones and reinforcement, plus macroevolutionary patterns including adaptive radiation and mass extinction.",
    keyFormulas: [
      { name: "Selection as Fitness Differential", latex: "\\Delta \\bar{w} = \\frac{\\mathrm{Cov}(z, w)}{\\bar{w}}" },
      { name: "Fitness Components", latex: "w = \\text{survival} \\times \\text{mating success} \\times \\text{fecundity}" },
      { name: "Hybrid Zone Width", latex: "\\text{width} \\propto \\frac{1}{\\text{selection against hybrids}} \\left( \\text{balance with migration} \right)" }
    ],
        sections: [
      {
        heading: "Hardy–Weinberg as a null model and how populations depart from it",
        content: `Hardy–Weinberg equilibrium (HWE) states that allele and genotype frequencies stay constant in an ideal population: with alleles $A$ (frequency $p$) and $a$ (frequency $q = 1-p$), genotypes are $p^2$, $2pq$, $q^2$ after one generation of random mating.

- **Assumptions** (each is an examinable violation): no selection, no mutation, no migration, infinite population size (no drift), random mating with respect to the locus, and Mendelian segregation. Departure from any assumption is a research question, not a technicality — HWE is the null hypothesis against which evolution is detected.
- **Estimating allele frequencies.** From genotype counts, $p = (2N_{AA} + N_{Aa})/2N$. For X-linked loci, males are hemizygous: the frequency of affected males directly estimates $q$, and equilibrium is approached by oscillation because males inherit their X only from mothers.
- **Deviations and their signatures.** Heterozygote deficit indicates inbreeding ($F = 1 - H_{obs}/H_{exp}$), population structure (Wahlund effect: mixing subpopulations that differ in allele frequency produces a heterozygote deficit even with random mating inside each), or null alleles in genotyping. Heterozygote excess indicates disassortative mating, selection favouring heterozygotes, or sex-linked complications.
- **Inbreeding coefficient** $F$ is also the probability that two alleles in an individual are identical by descent; $F = 1/2$ for a selfed offspring, $1/4$ for full-sib mating, and it raises the frequency of recessive disorders (the reason rare recessive diseases cluster in consanguineous families and in isolated populations).
- **Multi-locus and quantitative versions.** Linkage disequilibrium ($D$, $r^2$) measures non-random association of alleles at different loci and decays with recombination over generations — the basis of association mapping. Quantitative traits decompose phenotypic variance into $V_P = V_A + V_D + V_I + V_E$; heritability $h^2 = V_A/V_P$ is a property of a population in an environment, not of a gene.

Trap: HWE genotype frequencies apply *after* one generation of random mating, so a population in disequilibrium at birth can be at HWE as adults; and $p^2 + 2pq + q^2 = 1$ always, so a failure to sum to 1 means an arithmetic error, not biology.`
      },
      {
        heading: "Selection: fitness, allele dynamics and the shape of adaptation",
        content: `- **Fitness and selection coefficients.** Relative fitness $w$ is standardised survival $\\times$ fecundity; the selection coefficient is $s = 1 - w$. With dominance coefficient $h$, genotype fitnesses are $1$, $1-hs$, $1-s$ for $AA$, $Aa$, $aa$.
- **Dynamics.** For a beneficial recessive allele starting rare, $\\Delta p \\approx p^2 s$ — slow at first, fast once common; for a beneficial dominant allele, $\\Delta p \\approx p q^2 s/(1-q^2)$-type expressions, fast at first. The change is fastest when allele frequencies are intermediate, which is why fixation times are long at the ends.
- **Forms of selection.** Directional shifts the mean; stabilising reduces variance around an optimum (birth weight, human birth canal); disruptive favours extremes and can produce bimodality (beak sizes in fluctuating environments, handedness in some snails). **Balancing selection** maintains polymorphism through heterozygote advantage (sickle-cell HbS in malarial regions, where AS fitness exceeds both AA and SS), negative frequency-dependent selection (self-incompatibility alleles, prey search images), or spatial/temporal heterogeneity.
- **Mutation–selection balance** predicts equilibrium frequency $q \\approx \\sqrt{\\mu/s}$ for a deleterious recessive allele, which is why the incidence of severe recessive disease is roughly the square root of mutation rate — a classic calculation.
- **Selection on quantitative traits.** The breeder's equation $R = h^2 S$ predicts response to selection; the multivariate version uses the G-matrix. Selection response can be blocked by genetic correlations, low heritability or stabilising selection already at the optimum (the "lek paradox": why does additive variance for fitness persist?).
- **Molecular signatures.** A selective sweep reduces diversity around the selected site (hitchhiking) and skews the site-frequency spectrum; $d_N/d_S > 1$ indicates positive selection at specific codons. Industrial melanism in *Biston betularia* and darwin's finches during drought are the canonical field demonstrations; antibiotic and pesticide resistance are the fastest, most medically important examples.

Trap: "survival of the fittest" is circular unless fitness is defined independently; fitness is a property of a genotype in an environment, measured as contribution to the next generation, not as strength or longevity.`
      },
      {
        heading: "Drift, gene flow and the genetics of small populations",
        content: `- **Genetic drift** is sampling variance in allele frequency between generations. Variance per generation is $p(1-p)/2N_e$, so drift is strong when $N_e$ is small. A neutral allele fixes with probability equal to its current frequency; expected time to fixation is ~$4N_e$ generations. Drift reduces heterozygosity at rate $1/2N_e$ per generation and causes random fixation of deleterious alleles in small populations.
- **Effective population size** $N_e$ is usually far below census size because of unequal sex ratios, variance in reproductive success, population fluctuations (harmonic mean effects) and overlapping generations. A single-generation bottleneck dominates: $1/N_e = 1/t \\sum 1/N_i$. Conservation genetics uses $N_e$, not headcount.
- **Founder effects and bottlenecks** reduce diversity and raise the frequency of whatever alleles the founders carried: cheetahs show extreme homogeneity, Pingelapese islanders a high frequency of achromatopsia, and island bird populations recurrent inbreeding depression.
- **Gene flow** homogenises populations: $F_{ST} = 1/(1+4N_e m)$ for the island model, so a small $F_{ST}$ implies substantial migration or large $N_e$. Isolation by distance produces clines; hybrid zones form where divergent populations meet, with tension zones maintained by selection against hybrids.
- **Inbreeding and heterosis.** Inbreeding raises homozygosity, exposing recessive deleterious alleles (inbreeding depression); crossing divergent lines restores heterozygosity and produces heterosis (hybrid vigour, the basis of hybrid maize). The two are mirror images of the same dominance effect.
- **Metapopulation dynamics** (Levins: $\\frac{dp}{dt} = cp(1-p) - ep$) explain persistence of subdivided populations through recolonisation; extinction–colonisation balance predicts occupancy, and source–sink structure means a population can persist where births exceed deaths only because immigrants arrive.

Trap: a large census population can have a tiny $N_e$; a skewed sex ratio or a few dominant breeders makes drift as strong as in a population a fraction of the size, which is why "there are thousands of them" is not a conservation argument.`
      },
      {
        heading: "Speciation: barriers, mechanisms and the genetics of incompatibility",
        content: `- **Species concepts.** Biological (reproductive isolation), morphological, phylogenetic, and genotypic cluster concepts each answer a different question; the biological species concept fails for asexuals, fossils and hybridising taxa, which is why operational criteria (diagnosability, monophyly) are used in practice.
- **Geography of speciation.** Allopatric (vicariance or dispersal) is the default; peripatric (a small founder population) accelerates drift and founder effects; parapatric involves selection across an environmental gradient; sympatric requires assortative mating strong enough to overcome recombination (polyploidy, host shifts, sexual selection, temporal isolation). Polyploid speciation is instant and common in plants (Tragopogon, Spartina anglica).
- **Reproductive isolating barriers** are prezygotic (habitat, temporal, behavioural, mechanical, gametic) or postzygotic (hybrid inviability, sterility, breakdown). **Dobzhansky–Muller incompatibilities** arise when two derived alleles at different loci are each fine but incompatible together ($A_1B_1 \\times A_2B_2 \\to A_1B_2$ unfit); the incompatibility evolves without either lineage passing through a low-fitness state, which resolves the apparent paradox of how reproductive isolation can evolve under selection.
- **Haldane's rule**: the heterogametic sex (XY males, ZW females) is the first to show hybrid sterility or inviability, explained by dominance and faster-X evolution. **Reinforcement** strengthens prezygotic isolation where hybrids are unfit; **ring species** (Ensatina salamanders) document gradual divergence around a barrier.
- **Adaptive radiation** requires ecological opportunity, release from competition and a key innovation: cichlids in African lakes (trophic morphology, sexual selection on colour), Anolis lizards (ecomorphs replicated on islands), Darwin's finches. Divergence dates come from molecular clocks, which are only approximately clock-like, so dates are reported with calibration uncertainty.

Trap: hybrid sterility and hybrid inviability are different barriers, and F1 versus F2 breakdown differs — an F1 that is vigorous but sterile indicates meiotic incompatibility, not a lack of adaptation.`
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
$$Q = \\frac{\\pi r^4 \\Delta P}{8 \\eta L}$$
Because flow scales with the fourth power of radius ($r^4$), doubling conduit radius increases conductance by **16-fold**! However, wider vessels are exponentially more susceptible to acoustic cavitation and runaway embolism under negative tension ($P_{50}$).`
      },
      {
        heading: "3. Phloem Translocation & Münch Pressure-Flow",
        content: `Transport of photoassimilates (sucrose, amino acids, signaling molecules) occurs within the phloem:
- **Sieve Element-Companion Cell Complex (SE-CC)**: Sieve tube elements lose their nucleus, vacuole, and ribosomes at maturity, retaining modified plastids and mitochondria. Connected by sieve plates with large callose-lined sieve pores. Metabolically sustained by adjacent **companion cells** via branched plasmodesmata.
- **P-Protein (Phloem Protein / Forisomes)**: In angiosperms, injury causes rapid surging of P-protein bodies and callose synthesis ($\\beta$-1,3-glucan) to plug sieve plate pores and prevent sap loss.
- **Phloem Loading (Source)**:
  - *Apoplastic Loading*: Sucrose exits mesophyll into apoplast via SWEET uniporters, then actively pumped into SE-CC via **$\\text{SUT1/SUC2}$ ($H^+/\\text{sucrose}$ symporters)** driven by plasma membrane $H^+\\text{-ATPases}$.
  - *Symplastic Polymer Trapping*: Sucrose diffuses through intermediary cells where galactinol synthase and raffinose synthase convert it into raffinose and stachyose (larger oligosaccharides unable to diffuse backward through narrow plasmodesmata).
- **Münch Pressure-Flow Hypothesis**: High sucrose concentration at source lowers solute potential ($\\Psi_s$), drawing water in from adjacent xylem $\to$ generates high hydrostatic turgor pressure ($\\Psi_p$). At sink, sucrose is unloaded and consumed/stored, water exits into xylem, lowering turgor pressure. This **hydrostatic pressure gradient ($\\Delta \\Psi_p$)** drives bulk mass flow from source to sink.`
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
- $\\Psi_g$ (gravitational potential): $+0.01\\text{ MPa per meter}$ of elevation ($0.1\\text{ bar m}^{-1}$). For a 100-meter redwood (*Sequoia sempervirens*), $\\Psi_g = +1.0\\text{ MPa}$, setting a physical biophysical limit on maximum tree height ($\sim 122-130\\text{ m}$).
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
    id: "plant-7-mineral-nutrition",
    domainId: "plant_bio",
    title: "Mineral Nutrition, Nitrogen Fixation & Phloem Transport",
    subtitle: "Essential elements, Casparian strip, root ion uptake, nitrogenase and the Munsch pressure-flow mechanism",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 26,
    prerequisites: ["plant-1-hydraulics"],
    sources: ["Raven's Biology of Plants Ch. 29-32", "Taiz & Zeiger Ch. 5-6, 10-11", "Campbell Ch. 37"],
    interactiveTool: null,
    summary: "IBO requires transport of water, minerals and assimilates plus root structure, yet the app previously covered only the xylem. This module completes plant transport: essential element criteria and deficiency diagnosis, soil cation exchange, the endodermal checkpoint, chemiosmotic ion uptake, symbiotic nitrogen fixation, and the Munsch pressure-flow mechanism that distributes assimilates from source to sink.",
    keyFormulas: [
      { name: "Munsch Pressure Flow", latex: "\\Delta \\Psi_p \\; \\text{drives bulk flow from source (high } \\Psi_p) \\text{ to sink (low } \\Psi_p)" },
      { name: "Nitrogen Fixation Cost", latex: "N_2 + 8H^+ + 8e^- + 16\\ \\text{ATP} \\to 2NH_3 + H_2" },
      { name: "Cation Exchange Capacity", latex: "\\text{CEC} \\; (\\text{cmol}_c/\\text{kg}) \\propto \\text{clay + organic matter content}" }
    ],
        sections: [
      {
        heading: "Essential elements, ion availability and deficiency diagnostics",
        content: `An element is essential only if (i) a plant cannot complete its life cycle without it, and (ii) its function is specific and not substitutable. That yields 17 elements: macro-nutrients C, H, O, N, P, K, Ca, Mg, S and micro-nutrients Fe, Mn, Zn, Cu, B, Mo, Cl, Ni. Silicon, sodium and cobalt are beneficial or essential only in some taxa — a distinction examiners test.

- **Mobility sets symptom position.** Phloem-mobile elements (N, P, K, Mg) are retranslocated from old to young tissue, so deficiency appears first in *older* leaves; immobile elements (Ca, Fe, B, Mn) cannot be rescued and symptoms appear in *young* leaves. Chlorosis (interveinal in Fe/Mn/Mg, general in N), necrosis (K, Mg), purple stems (P), hollow stems (B), whiptail in brassicas (Mo) and stunted nodulation (Ni for urease) are the classic signatures.
- **Soil chemistry governs availability, not abundance.** Cation exchange capacity arises from clay minerals and humus; pH controls speciation: phosphate is locked as Ca phosphates above pH 7 and as Fe/Al phosphates below pH 5.5; Fe and Mn become insoluble at high pH (lime-induced chlorosis) but toxic at low pH; Al$^{3+}$ becomes soluble and inhibits root growth below pH 5. Liebig's law of the minimum means the scarcest resource sets growth, and luxury consumption means tissue concentration is not a linear function of supply — which is why critical concentrations are used in Diagnosis and Recommendation Integrated System (DRIS) analysis.
- **Hydroponics and tissue analysis** are the experimental tools: solution culture with a single omitted element, plus visible symptoms, dry-weight accumulation and leaf concentration, establishes essentiality. Split-root and grafting experiments distinguish local from systemic signals.
- **Fertiliser consequences:** the Haber–Bosch process fixes atmospheric N$_2$ at high energy cost; excess N and P drive eutrophication, hypoxia and N$_2$O emissions, and nitrate leaching contaminates groundwater. Legume rotations exploit biological nitrogen fixation instead.

Trap: a nutrient can be present in soil yet unavailable, so "deficiency" is not the same as "absence"; and a symptom in young leaves rules out mobile elements such as N and K.`
      },
      {
        heading: "Nitrogen: uptake, reduction, symbiosis and the nitrogenase problem",
        content: `Nitrogen is needed for proteins, nucleic acids and chlorophyll, and plants cannot use N$_2$ directly (triple bond, 941 kJ mol$^{-1}$).

- **Uptake and reduction.** Roots absorb nitrate via NRT1/NRT2 transporters and ammonium via AMT transporters; nitrate reductase (cytosolic, NADH- or NADPH-dependent, molybdenum cofactor) reduces nitrate to nitrite, and nitrite reductase (plastid, ferredoxin) reduces nitrite to ammonium. Ammonium is immediately assimilated by glutamine synthetase (GS) and glutamate synthase (GOGAT), which costs one ATP and one reduced ferredoxin per ammonium — a strategy that keeps free ammonium, a decoupler and pH hazard, vanishingly low. Photorespiratory ammonium is recycled through the same GS-GOGAT route, which is why GS mutants are lethal.
- **Symbiotic fixation.** Flavonoid exudates from roots activate rhizobial *nod* genes, producing Nod factors that trigger root-hair curling, infection threads and cortical cell division to build the nodule. Bacteria are released into symbiosomes, differentiate into bacteroids, and nitrogenase (Fe-Mo cofactor) reduces N$_2$ to NH$_3$ at a cost of ~16 ATP per N$_2$; the enzyme is irreversibly poisoned by O$_2$, so the nodule supplies low free O$_2$ at high flux via leghaemoglobin, an oxygen-buffering protein that is a plant globin. The plant sanctions non-fixing nodules by cutting off carbon supply — an evolved enforcement mechanism.
- **Regulation and alternatives.** N status represses nodulation systemically (autoregulation of nodulation, CLE peptides), so fertiliser N suppresses fixation. Actinorhizal plants use *Frankia*; cyanobacteria associate with cycads and *Azolla*; mycorrhizae supply N as well as P. Carnivorous plants (Nepenthes, Drosera) and parasitic plants (Striga, dodder) bypass the problem entirely.

Trap: nitrogenase works anaerobically while the rest of the nodule is aerobic — the compartmentalisation, not the enzyme, is the adaptation, and free O$_2$ is buffered by leghaemoglobin, not removed.`
      },
      {
        heading: "Phosphorus, potassium and micronutrient acquisition strategies",
        content: `- **Phosphorus** is taken up as H$_2$PO$_4^-$ (acid soils) or HPO$_4^{2-}$ (alkaline), is often the limiting nutrient because it diffuses slowly and is bound to soil particles. Plants respond with high-affinity transporters (PHT1), organic-acid exudation (citrate, malate) that mobilises Ca-P, acid phosphatases that hydrolyse organic P, and root architecture changes (cluster roots in Proteaceae, increased root hairs). Arbuscular mycorrhizae extend the depletion zone and deliver P through arbuscules; the plant pays fixed carbon and the fungus can cheat, so the symbiosis is regulated bidirectionally (myc factors, strigolactones as pre-symbiotic signals). Phytate in seeds is the major storage form, mobilised by phytase during germination.
- **Potassium** is the dominant cytosolic cation, maintained by AKT1 inward-rectifier channels and HAK/KUP transporters; it sets membrane potential, turgor, enzyme activation and stomatal movement. K deficiency reduces stomatal control and drought tolerance before it reduces growth visually.
- **Iron** is abundant but insoluble at neutral pH. Non-grasses use **strategy I**: proton extrusion by H$^+$-ATPase, reduction of Fe$^{3+}$ by a plasma-membrane ferric chelate reductase, and uptake of Fe$^{2+}$ by IRT1. Grasses use **strategy II**: secretion of mugineic-acid family phytosiderophores that chelate Fe$^{3+}$, imported by YS/YSL transporters. Iron is transported as citrate or nicotianamine complexes and stored in ferritin; deficiency causes interveinal chlorosis of young leaves; excess generates hydroxyl radicals via Fenton chemistry.
- **Zinc** is taken up by ZIP transporters and is required for ~300 enzymes and zinc-finger transcription factors; **manganese** is the Mn$_4$CaO$_5$ cluster of photosystem II; **copper** is in plastocyanin and cytochrome oxidase; **boron** cross-links rhamnogalacturonan II in the wall (hence brittle, deformed growing points); **molybdenum** serves nitrate reductase and nitrogenase; **chlorine** is required for the water-splitting complex; **nickel** is the urease metal.

Trap: Fe deficiency and Mn deficiency look similar (interveinal chlorosis of young leaves); they are distinguished by soil pH response and by tissue analysis, not by eye.`
      },
      {
        heading: "Toxicity, salinity and phytoremediation",
        content: `- **Aluminium toxicity** is the primary limit to crop yield on acid soils: Al$^{3+}$ binds cell-wall pectin and DNA, inhibiting root elongation within hours. Tolerance mechanisms include organic-acid exudation (malate via ALMT1, citrate via MATE) that chelates Al outside the root, and internal detoxification.
- **Salinity** imposes two phases: an immediate osmotic phase (reduced water uptake, stomatal closure, growth inhibition) and a slower ionic phase (Na$^+$ and Cl$^-$ accumulation to toxic concentrations). Tolerance machinery: the SOS pathway (SOS3 calcineurin-like Ca$^{2+}$ sensor $\\to$ SOS2 kinase $\\to$ SOS1 plasma-membrane Na$^+$/H$^+$ antiporter), vacuolar sequestration by NHX exchangers, and accumulation of compatible solutes (proline, glycine betaine, trehalose) for osmotic adjustment without disturbing enzyme function.
- **Heavy metals.** Hyperaccumulators (Thlaspi/Noccaea for Zn-Cd, Pteris vittata for arsenic) concentrate metals in vacuoles and trichomes; detoxification uses phytochelatins (glutathione-derived peptides) and metallothioneins. Phytoremediation uses this capacity to extract, stabilise or volatilise contaminants — slow but cheap, and the biomass must then be processed.
- **Other toxicities** worth naming: Mn toxicity at low pH, boron toxicity in arid soils (marginal leaf necrosis), fluoride and ozone damage, and ammonium toxicity when it exceeds assimilatory capacity.
- **Design of a nutrient experiment:** use solution culture with chelated micronutrients, control pH and ionic strength, include a no-nutrient control, harvest at matched developmental stage, and measure both biomass and tissue concentration — because a "deficient" plant may simply be small with normal concentration.

Trap: salt stress is not just "too much Na$^+$"; the osmotic component reduces growth before any tissue accumulates toxic ion concentrations, which is why osmotic adjustment traits matter more than Na$^+$ exclusion in some species.`
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
- At pH 5.5, $\\approx 17\\%$ of indole-3-acetic acid ($pK_a = 4.75$) is protonated (uncharged $\\text{IAAH}$) and diffuses passively across the plasma membrane. The anionic form ($\\text{IAA}^-$) is imported via **AUX1 / LAX** $H^+\\text{-symporters}$.
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
    id: "plant-8-growth-development",
    domainId: "plant_bio",
    title: "Plant Growth, Photomorphogenesis & Seed Germination",
    subtitle: "Phytochrome, florigen, vernalisation, seed dormancy and hormone-controlled development",
    level: "USABO Finalist / IBO",
    xp: 150,
    estimatedMinutes: 26,
    prerequisites: ["plant-4-hormones", "plant-5-anatomy"],
    sources: ["Taiz & Zeiger Ch. 16-23", "Raven's Biology of Plants Ch. 24-27", "Campbell Ch. 38-39"],
    interactiveTool: null,
    summary: "IBO lists growth and development and germination as required plant topics, and Raven and Taiz devote five chapters to light signalling and dormancy. This module covers phytochrome switching, blue-light responses, photoperiodism and florigen, vernalisation, meristem organisation and apical dominance, and the ABA/GA switch that decides whether a seed germinates.",
    keyFormulas: [
      { name: "Phytochrome Switching", latex: "P_r \\xrightarrow{660\\ \\text{nm}} P_{fr} \\xrightarrow{730\\ \\text{nm}} P_r" },
      { name: "Phytochrome Photoequilibrium", latex: "P_{fr}/P_{total} \\approx 0.85 \\text{ under red light, } \\text{low in shade (low R:FR)}" },
      { name: "Meristem Division Products", latex: "\\text{Apical meristem} \\to \\text{tunica (surface planes)} + \\text{corpus (anticlinal/periclinal)}" }
    ],
        sections: [
      {
        heading: "Meristems, cell expansion and the mechanics of growth",
        content: `Plant growth is localised in meristems and driven by turgor-driven cell expansion inside a yielding wall.

- **Shoot apical meristem** has a tunica (surface layers, anticlinal divisions) and corpus (bulk), with a central zone of slowly dividing stem cells maintained by the WUSCHEL–CLAVATA feedback loop (WUS promotes stem cells; CLV3 peptide from the centre binds CLV1/2 receptors to repress WUS). Organ initiation at the periphery follows auxin maxima generated by PIN1-mediated polar transport.
- **Root apical meristem** has a quiescent centre that maintains surrounding initial cells; the transition zone sets the size of the division and elongation zones; the columella senses gravity through starch-filled amyloplasts, and auxin redistribution (PIN3/7) redirects growth downward.
- **Cell expansion** requires wall loosening: auxin activates plasma-membrane H$^+$-ATPases, apoplast acidification activates expansins and xyloglucan endotransglucosylases, and the wall yields to turgor. Cellulose microfibrils laid down by cellulose synthase complexes (guided by cortical microtubules) constrain the direction of expansion, so microtubule orientation sets cell shape — the reason a cellulose-synthase inhibitor produces spherical, isodiametric cells.
- **Secondary growth** comes from vascular cambium (bifacial: xylem inward, phloem outward) and cork cambium; annual rings record seasonal growth, and dendrochronology reads climate from ring width and isotope composition.
- **Determinacy and architecture:** axillary bud outgrowth is controlled by strigolactones and auxin (apical dominance), cytokinin promotes branching, and gibberellin promotes elongation (DELLA degradation). Mutations that change meristem size or determinacy produce the major plant architecture differences exploited in crops.

Trap: growth is not simply "more cells"; it is division plus expansion plus wall yielding, and a tissue can grow without dividing (expansin overexpression) or divide without growing (cell-cycle mutants).`
      },
      {
        heading: "Light as information: photomorphogenesis, photoperiod and the clock",
        content: `- **Phytochromes** interconvert between Pr (red-absorbing, inactive) and Pfr (far-red-absorbing, active); red light converts Pr$\\to$Pfr and far-red reverses it, giving plants a reversible switch that measures the red:far-red ratio. High R:FR (full sun) favours Pfr and photomorphogenesis (short hypocotyl, expanded cotyledons); low R:FR (canopy shade) favours Pr, triggering shade-avoidance: stem elongation, hyponasty, reduced branching. Pfr is also destroyed slowly in darkness, so the ratio reports both spectral quality and time.
- **Cryptochromes and phototropins** absorb blue light: cryptochrome controls de-etiolation and the circadian input; phototropin 1 mediates phototropism (auxin redistribution via PIN3), chloroplast movement and stomatal opening (blue light activates the H$^+$-ATPase, K$_{in}$ channels and anion efflux).
- **Photoperiodism** measures night length. Short-day plants (actually long-night plants, e.g. *Chenopodium*, soybean) flower when the night exceeds a critical length; long-day plants (Arabidopsis, wheat) flower when the night is shorter. A brief light break in the middle of the night reverses the response, proving that darkness, not daylength, is measured. Leaves perceive the signal and produce **florigen** (FT protein), which moves in phloem to the shoot apex and activates floral identity genes (AP1, LFY) — the mobile-signal answer to a classic question.
- **Vernalisation** satisfies a cold requirement by repressing FLC (a floral repressor) through chromatin modification; the memory persists mitotically, so a vernalised plant flowers even after warmth returns.
- **The circadian clock** (CCA1/LHY, TOC1, PRR genes) gates photoperiod sensing, starch turnover and stomatal behaviour, and has a period of ~24 h that entrains to light–dark cycles.

Trap: "short-day plant" is a historical label; the plant measures the length of the *night*, so a short-day plant is a long-night plant, and a night break inhibits flowering in it.`
      },
      {
        heading: "Hormone integration: from auxin to strigolactone",
        content: `- **Auxin (IAA)** is synthesised from tryptophan (YUCCA), transported polarly by PIN efflux carriers (chemiosmotic: protonated IAA enters, anionic IAA exits), and perceived by TIR1/AFB receptors that trigger Aux/IAA degradation and ARF-dependent transcription. Functions: apical dominance, tropisms, root initiation, vascular patterning, fruit development. Synthetic auxins (2,4-D, picloram) are herbicides because they overwhelm this machinery.
- **Cytokinin** (isopentenyladenine derivatives) is perceived by histidine kinases and promotes cell division and shoot initiation; the auxin:cytokinin ratio determines organogenesis in culture (high auxin $\\to$ roots, high cytokinin $\\to$ shoots). It also delays senescence (the basis of kinetin's discovery).
- **Gibberellin** promotes elongation and germination by degrading DELLA repressors, releasing PIF transcription factors; GA-deficient mutants are dwarfed, and GA-insensitive DELLA mutants are dwarf but GA-insensitive — the "green revolution" semi-dwarf wheat and rice alleles are exactly this.
- **Abscisic acid** closes stomata (anion efflux, K$^+$ loss, turgor drop), maintains seed dormancy (ABA:GA ratio), and signals drought; it is also the carotenoid-derived signal in root-to-shoot stress communication.
- **Ethylene** (from ACC, perceived by ETR1) drives fruit ripening, triple response (epinasty, radial swelling, hook), leaf and flower abscission, and root hair formation. **Brassinosteroids** promote elongation and photomorphogenesis; **strigolactones** inhibit branching and attract mycorrhizae; **jasmonate** and **salicylic acid** run defence against herbivores and pathogens respectively, with jasmonate–salicylate antagonism.

Trap: hormone names do not fix function — the same auxin promotes root initiation at low concentration and inhibits elongation at high concentration, and tissue sensitivity matters more than absolute level.`
      },
      {
        heading: "Germination, senescence, dormancy and stress physiology",
        content: `- **Seed germination** begins with imbibition (physical), then activation of metabolism; radicle emergence is the visible endpoint. GA from the embryo triggers $\\alpha$-amylase in the aleurone (a classic transcriptional cascade), mobilising starch to sugars; ABA opposes this, so the ABA:GA ratio gates germination. Dormancy is imposed by the seed coat (physical), by the embryo (physiological), or by a combination; breaking mechanisms include after-ripening, cold moist stratification, scarification and light.
- **Senescence** is an active, programmed process: chlorophyll degrades (yellowing), proteases and nucleases remobilise N and P to developing seeds, and autophagy genes are required. It is delayed by cytokinin, promoted by ethylene and darkness. **Abscission** at the abscission zone depends on ethylene-induced cell-wall hydrolases (polygalacturonase, cellulase) and is inhibited by auxin — the classic ethylene/auxin balance.
- **Abiotic stress signalling** converges on Ca$^{2+}$, ROS and MAPK cascades. Osmotic stress activates SnRK2 kinases via ABA receptors (PYR/PYL-PP2C), producing stomatal closure and gene induction. Compatible solutes (proline, glycine betaine) adjust osmotic potential; antioxidant systems (superoxide dismutase, ascorbate peroxidase, glutathione) control ROS; heat-shock proteins and dehydrins stabilise proteins and membranes; CBF/DREB transcription factors drive cold acclimation.
- **Biotic stress** uses pattern-triggered immunity (flg22 receptor FLS2), effector-triggered immunity (R genes, hypersensitive response, HR), systemic acquired resistance (salicylic acid, NPR1) and jasmonate-mediated herbivore defences (proteinase inhibitors, volatiles that attract predators).
- **Developmental plasticity** ties these together: a plant cannot move, so it adjusts architecture, allocation and phenology — the correct framing for any "why does the plant respond this way" question.

Trap: senescence is not decay; it is transcriptionally controlled nutrient recycling, which is why blocking it increases yield in some crops but reduces seed protein quality.`
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
    id: "animal-9-muscle-locomotion",
    domainId: "animal_phys",
    title: "Muscle Contraction, Excitation-Contraction Coupling & Locomotion",
    subtitle: "Sliding filament, crossbridge cycle, T-tubule calcium release, fibre types and skeletal levers",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["animal-1-neuro"],
    sources: ["Vander's Human Physiology Ch. 9-11", "Guyton & Hall Ch. 6-8", "Campbell Ch. 49-50"],
    interactiveTool: null,
    summary: "IBO explicitly requires support and movement, and USABO animal physiology questions repeatedly test excitation-contraction coupling and the length-tension relationship. This module covers sarcomere ultrastructure, the crossbridge cycle, T-tubule/DHP-RyR signalling, twitch summation and tetanus, muscle fibre types, and the lever and skeleton systems that convert contraction into locomotion.",
    keyFormulas: [
      { name: "Sliding Filament Prediction", latex: "A\\ \\text{band constant}; \\; I\\ \\text{band and } H\\ \\text{zone shorten}" },
      { name: "Mechanical Power", latex: "P = F \\cdot v" },
      { name: "Muscle Mechanical Advantage", latex: "MA = \\frac{\\text{effort arm}}{\\text{load arm}}" }
    ],
        sections: [
      {
        heading: "Sarcomere architecture and the sliding-filament mechanism",
        content: `Skeletal muscle is a hierarchy: muscle $\\to$ fascicle $\\to$ fibre (cell) $\\to$ myofibril $\\to$ sarcomere, the repeated unit between Z-discs (~2.2 µm at rest).

- **Filaments.** Thin filaments are F-actin with tropomyosin and the troponin complex (TnC, TnI, TnT); thick filaments are bipolar myosin II assemblies with titin running from the Z-disc to the M-line. Titin provides passive elasticity and centring, nebulin acts as a molecular ruler setting thin-filament length, and the giant protein obscurin links to the sarcoplasmic reticulum.
- **Banding.** The A-band spans the thick filament (constant length), the I-band contains only thin filaments (shortens), the H-zone is the central bare region of the thick filament (disappears on contraction), and the M-line holds thick filaments together. Sarcomere shortening is exactly the change in I-band width.
- **Sliding filament mechanism:** myosin heads bind actin, undergo a force-generating conformational change, detach on ATP binding, and re-cock on hydrolysis. Neither filament shortens; they slide. Force per head is a few piconewtons, and sarcomere force scales with the number of heads bound, which is why stretch beyond overlap (over-stretch) reduces force.
- **Length–tension** peaks at ~2.0–2.2 µm sarcomere length where actin–myosin overlap is optimal; at long lengths fewer heads can reach, at short lengths thin filaments collide and Ca$^{2+}$ sensitivity falls.
- **Energy and heat:** ATP is consumed at detachment and at Ca$^{2+}$ reuptake; the "Fenn effect" is the extra heat released when muscle does work, showing that ATP turnover depends on load, not just on activation.

Trap: the A-band does not shorten during contraction — if a diagram shows a shorter A-band, it is wrong; the I-band and H-zone are the structures that change.`
      },
      {
        heading: "Fibre types, motor units and the control of force",
        content: `- **Fibre types** are set by myosin heavy-chain isoform: type I (slow oxidative, high mitochondrial density, low ATPase, fatigue-resistant), type IIa (fast oxidative-glycolytic), type IIx/IIb (fast glycolytic, high power, easily fatigued). Human muscle is mixed; training shifts oxidative capacity and the IIa/IIx ratio but does not convert I $\\leftrightarrow$ II substantially. Myoglobin-rich red fibres explain the colour difference in poultry.
- **Motor unit** = one $\\alpha$-motoneuron plus all the fibres it innervates; fibres within a unit are of uniform type. Henneman's size principle: small, slow units are recruited first, larger fast units progressively, which is why fine movements use fatigue-resistant units and maximal force recruits everything.
- **Force modulation** works through recruitment, rate coding (fusion frequency) and synchronisation. Twitch summation produces unfused then fused tetanus when stimulation outpaces Ca$^{2+}$ reuptake; the catch-like increase in force at the start of tetanus (treppe/staircase) reflects Ca$^{2+}$ accumulation and phosphorylation of myosin light chains.
- **Proprioception and reflexes:** muscle spindles (intrafusal fibres innervated by Ia afferents) sense length and velocity, Golgi tendon organs (Ib) sense tension, and the stretch reflex (monosynaptic Ia $\\to$ $\\alpha$-motoneuron) and inverse stretch reflex (Ib inhibition) adjust stiffness. Reciprocal inhibition and recurrent inhibition via Renshaw cells shape the pattern. Central pattern generators in the spinal cord produce rhythmic locomotion without sensory feedback, which is then modulated by it.
- **Force–velocity** is hyperbolic (Hill): force falls as shortening velocity rises, so power peaks at intermediate load — the reason gearing and fibre-type mix matter for sprint versus endurance performance.

Trap: a stronger muscle is not necessarily a muscle with more fibres; neural factors (recruitment, rate coding, coordination) explain much of early strength gain, which is why strength can rise before hypertrophy.`
      },
      {
        heading: "Excitation–contraction coupling, calcium handling and fatigue",
        content: `- **The chain of events:** motor-neuron action potential $\\to$ ACh release at the neuromuscular junction (nicotinic receptor, end-plate potential) $\\to$ muscle action potential propagated along the sarcolemma and into T-tubules $\\to$ DHPR (voltage sensor) mechanically activates RyR1 $\\to$ Ca$^{2+}$ release from the sarcoplasmic reticulum $\\to$ Ca$^{2+}$ binds TnC $\\to$ tropomyosin rolls, exposing myosin-binding sites $\\to$ crossbridge cycling. Relaxation requires SERCA-mediated Ca$^{2+}$ reuptake (2 Ca$^{2+}$ per ATP) and parvalbumin buffering.
- **Skeletal versus cardiac coupling.** Skeletal muscle uses mechanical DHPR–RyR1 coupling and does not need extracellular Ca$^{2+}$ for a single twitch; cardiac muscle uses Ca$^{2+}$-induced Ca$^{2+}$ release through RyR2, so contractility depends on Ca$^{2+}$ influx through L-type channels — the basis for calcium-channel blockers and cardiac glycosides. Smooth muscle depends on Ca$^{2+}$–calmodulin-activated myosin light-chain kinase, with myosin phosphatase opposing it and a latch state allowing sustained tone at low ATP cost.
- **Pharmacology.** Curare blocks the nicotinic receptor (flaccid paralysis); succinylcholine depolarises persistently; organophosphates inhibit acetylcholinesterase (spastic paralysis, SLUDGE syndrome); ryanodine locks RyR open; dantrolene blocks RyR1 and treats malignant hyperthermia (a RyR1 gain-of-function triggered by volatile anaesthetics).
- **Fatigue** has multiple mechanisms: inorganic phosphate and H$^+$ impair crossbridge function and Ca$^{2+}$ sensitivity; SR Ca$^{2+}$ release declines; glycogen and phosphocreatine deplete; central drive falls. The phosphagen system (creatine kinase, ~10 s), glycolysis (~2 min) and oxidative phosphorylation (sustained) supply ATP in that order, and oxygen debt repays the deficit.
- **Rigor** occurs when ATP is absent: myosin cannot detach from actin, which is why muscles stiffen after death until proteolysis begins.

Trap: relaxation is an active, ATP-dependent process; ATP is required for both contraction and relaxation, so ATP depletion causes contracture, not flaccidity.`
      },
      {
        heading: "Comparative locomotion: skeletons, gaits and scaling",
        content: `- **Hydrostatic skeletons** (annelids, nematodes, cephalopod arms, vertebrate tongues) use incompressible fluid under pressure with circular and longitudinal muscle antagonism; nematodes have a fixed-volume pseudocoel and high internal pressure, producing whip-like undulation. Muscular hydrostats (tongue, elephant trunk) achieve the same with constant volume and no fluid compartment.
- **Exoskeletons** (arthropods) give protection and leverage but constrain growth, requiring ecdysis and a soft post-moult period; jointed levers allow high force with short excursions, and the jump of fleas or froghoppers uses elastic energy storage (resilin) rather than direct muscle power.
- **Vertebrate locomotion** is dominated by elastic mechanisms and gait transitions: tendons store and return energy (kangaroo hopping recovers much of the cost; human running stores energy in the Achilles tendon), and the walk–trot–gallop transition minimises cost of transport at a given speed. Fish use undulatory waves with myotomal muscle arranged in a helical array, and the body–caudal fin produces thrust at high efficiency; sharks use a heterocercal tail, teleosts a homocercal one.
- **Flight** is the highest-power locomotion: insects use indirect flight muscles (stretch-activated, asynchronous, allowing wingbeat frequency above motoneuron firing rate) or synchronous muscles; birds use the supracoracoideus for the upstroke and the pectoralis for the downstroke, with a furcula acting as an elastic spring. Wing loading and aspect ratio predict manoeuvrability versus efficiency.
- **Scaling.** Geometric similarity predicts that mass-specific strength falls with size (area/volume), so large animals need proportionally thicker bones (allometry, elastic similarity); the Froude number (inertia/gravity) predicts gait transitions across species, and Reynolds number determines whether a small swimmer experiences viscosity-dominated (laminar, ciliary) or inertia-dominated flow.

Trap: elastic storage does not reduce the work a muscle does — it reduces the *cost* by recovering energy, so a tendon cannot power a jump without prior muscle work and damping.`
      }
    ]
  },

  {
    id: "animal-10-sensory-systems",
    domainId: "animal_phys",
    title: "Sensory Systems: Photoreception, Hearing & Chemical Senses",
    subtitle: "Receptor transduction, rod/cone phototransduction, cochlear tonotopy, olfaction and autonomic integration",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["animal-1-neuro"],
    sources: ["Vander's Human Physiology Ch. 7-8", "Guyton & Hall Ch. 47-54", "Campbell Ch. 49"],
    interactiveTool: null,
    summary: "IBO requires sense organs (eyes and ears) plus autonomic reflexes, which the app previously covered only at the membrane-biophysics level. This module builds sensory transduction from receptor potential to perception: adaptation and coding, phototransduction in rods and cones, cochlear frequency mapping and hair-cell mechanotransduction, olfaction and taste, and the autonomic and reflex circuits that act on the signal.",
    keyFormulas: [
      { name: "Weber-Fechner Law", latex: "S = k \\ln I" },
      { name: "Sound Intensity in Decibels", latex: "dB = 20 \\log_{10} \\frac{P}{P_0}" },
      { name: "Cochlear Place Coding", latex: "f \\propto e^{x} \\; (x = \\text{distance from base, Greenwood function})" }
    ],
        sections: [
      {
        heading: "Transduction, coding and the psychophysics of sensation",
        content: `Every sensory system performs the same four operations: transduction (stimulus $\\to$ receptor potential), amplification, encoding (into spike trains) and processing (filtering, contrast, adaptation).

- **Adequate stimulus and receptor potential.** A receptor is a transducer with a characteristic adequate stimulus — mechanical for hair cells, photochemical for photoreceptors, chemical for taste/olfaction, thermal/chemical for nociceptors. The receptor potential is graded, so intensity is coded by amplitude; at the first spike-generating site it is converted to firing rate.
- **Coding dimensions.** Modality is coded by labelled lines (which axon, which cortical area), intensity by firing rate and by recruitment of additional units, duration by adaptation kinetics, and location by receptive-field position plus lateral inhibition. **Range fractionation** lets a population of receptors with different thresholds cover a wide dynamic range — the reason a single afferent saturates but the system does not.
- **Adaptation** is phasic (rapidly adapting, reports change; Pacinian corpuscles, olfactory receptors) or tonic (slowly adapting, reports sustained state; muscle spindles, Merkel cells). Adaptation is built into the transducer and into the circuit, which is why you do not feel your clothes.
- **Psychophysics.** Weber's law: the just-noticeable difference is a constant fraction of the background ($\\Delta I/I = k$); Fechner integrated this into a logarithmic law, and Stevens proposed a power law ($S = kI^{a}$) because brightness and electric shock scale differently. Signal detection theory separates sensitivity ($d'$) from response bias (criterion) — a criterion shift explains "the placebo made it hurt less" without any change in sensitivity.
- **Lateral inhibition** sharpens contrast: in the compound eye of *Limulus*, neighbouring ommatidia inhibit each other via the plexus, producing Mach bands and edge enhancement. The same computation appears in retinal horizontal cells and in cortical orientation columns (Hubel and Wiesel).

Trap: adaptation changes sensitivity, not the stimulus; a claim that "the receptor stopped responding to the stimulus" is wrong if the stimulus is still above threshold — the response is reduced, not absent, and the perceptual change comes from both receptor and central adaptation.`
      },
      {
        heading: "Vision: phototransduction, optics and colour",
        content: `- **Phototransduction.** In vertebrate rods, light isomerises 11-*cis*-retinal to all-*trans*-retinal, activating rhodopsin (a GPCR), which activates transducin ($G_t$), which activates phosphodiesterase-6 to hydrolyse cGMP. Falling cGMP closes cyclic-nucleotide-gated channels, so the cell **hyperpolarises** and glutamate release falls — the sign-reversing design that makes the vertebrate retina an image-forming, not a light-detecting, device. Invertebrate (arthropod, mollusc) photoreceptors use the same Gq–PLC–TRP cascade but **depolarise**, a classic contrast. Recovery requires arrestin binding, rhodopsin kinase phosphorylation and regeneration of 11-*cis*-retinal in the retinal pigment epithelium (the reason vitamin A deficiency causes night blindness).
- **Rods and cones.** Rods are more sensitive (single-photon detection), slower, and saturated in daylight; cones are faster, less sensitive, and come in three spectral classes in Old World primates (S, M, L opsins). Trichromacy is opponent-processed downstream (red–green, blue–yellow, light–dark) which explains afterimages and why "red–green colour blindness" is a single X-linked locus (L/M opsin genes).
- **Optics.** The cornea provides most refractive power (~40 D), the lens fine-tunes by accommodation: ciliary muscle contraction relaxes zonules and lets the lens round up for near vision (Helmholtz). Presbyopia is loss of lens elasticity; myopia is a long globe or over-powerful cornea (corrected with a diverging lens), hyperopia the reverse. Pupil size trades depth of field and diffraction against light gathering; the fovea trades sensitivity for acuity by having a 1:1 cone-to-ganglion pathway.
- **Retinal processing** already extracts features: centre–surround receptive fields, ON/OFF pathways, direction selectivity in some ganglion cells, and adaptation to mean luminance. The optic nerve carries ~1 million axons from ~100 million photoreceptors — compression starts in the retina.

Trap: light hyperpolarises vertebrate photoreceptors and *reduces* glutamate release; a diagram showing depolarisation is an invertebrate or a mistake.`
      },
      {
        heading: "Hearing, balance and echolocation",
        content: `- **Sound and impedance.** Sound is a pressure wave; the middle ear's ossicles (malleus, incus, stapes) and the area ratio of tympanum to oval window amplify pressure ~20-fold to match the air–cochlear-fluid impedance mismatch. Without it, most energy would reflect.
- **Cochlear mechanics.** The basilar membrane is stiff and narrow at the base, wide and floppy at the apex, so high frequencies peak at the base and low frequencies at the apex — **tonotopy** (place coding, Bekesy). Outer hair cells provide active amplification (electromotility, prestin) that sharpens tuning and produces otoacoustic emissions; inner hair cells are the true afferents (95% of the auditory nerve).
- **Hair-cell transduction.** Stereocilia are linked by tip links to mechanically gated channels; deflection toward the tallest stereocilium opens channels, K$^+$ enters down its electrochemical gradient (unusually, the endolymph is high in K$^+$ at +80 mV), depolarising the cell and opening voltage-gated Ca$^{2+}$ channels at the base. Adaptation is by myosin-based tip-link tension. Damage from noise, aminoglycosides or loop diuretics is permanent in mammals because hair cells do not regenerate (birds and fish do).
- **Pitch and localisation.** Low frequencies use phase locking (volley principle) up to ~4–5 kHz; high frequencies rely on place. Interaural time differences (low frequency) and intensity differences (high frequency) localise sound; the medial superior olive computes coincidence.
- **Vestibular system.** Semicircular canals detect angular acceleration (cupula deflection by endolymph inertia); utricle and saccule detect linear acceleration and head tilt via otoliths. Semicircular canal signals drive the vestibulo-ocular reflex with ~5 ms latency, and mismatch between canal and visual signals produces motion sickness. Nystagmus is the observable reflex.
- **Echolocation** (bats, dolphins, some birds) trades pulse design against range and resolution: constant-frequency pulses with Doppler-shift compensation favour detecting fluttering targets, frequency-modulated sweeps favour precise ranging, and the auditory system compares emission with echo — a biological radar with jamming avoidance.

Trap: pitch is not a single code — place coding dominates at high frequency and phase locking at low frequency, so a lesion at the cochlear base (high-frequency hearing loss) does not abolish low-frequency pitch.`
      },
      {
        heading: "Chemosensation, mechanosensation, nociception and exotic senses",
        content: `- **Olfaction.** Odorants bind GPCRs in olfactory sensory neurons; each neuron expresses one receptor allele (a striking example of monoallelic choice), and the bulb maps axons to glomeruli by receptor identity. Coding is combinatorial: a molecule activates a set of receptors and a receptor recognises a set of molecules. cAMP opens a CNG channel and a Ca$^{2+}$-activated Cl$^-$ channel (the main depolarising current). Adaptation involves Ca$^{2+}$–calmodulin and receptor phosphorylation. Vomeronasal (V1R/V2R) and trace-amine-associated receptors cover pheromones and amines. Humans have ~400 functional OR genes and ~600 pseudogenes — a molecular fossil record of reliance on vision.
- **Taste.** Five modalities: sweet (T1R2+T1R3), umami (T1R1+T1R3, mGluR4), bitter (T2R family, ~25 receptors), sour (PKD2L1, H$^+$-sensitive), salty (ENaC, amiloride-sensitive). Taste cells are tuned but not clonal for a single molecule; labelled lines project to distinct brainstem nuclei, which is why taste is hard to confuse across modalities. Capsaicin activates TRPV1, a heat-gated channel, which is why "spicy" is a pain modality masquerading as taste.
- **Mechanosensation.** Pacinian corpuscles (vibration, rapidly adapting), Meissner (flutter), Merkel (sustained pressure), Ruffini (stretch); Piezo1/2 are the molecular transducers in many tissues. Proprioception uses muscle spindles, Golgi tendon organs and joint receptors; loss of proprioception (large-fibre neuropathy) causes sensory ataxia with a positive Romberg sign.
- **Nociception.** Nociceptors are free nerve endings; A$\\delta$ fibres carry sharp first pain, C fibres dull second pain. Sensitisation (hyperalgesia, allodynia) involves prostaglandins, bradykinin, nerve growth factor and TRPV1 phosphorylation. **Gate control theory**: large-fibre input inhibits nociceptive transmission in the dorsal horn (the rationale for rubbing or TENS), and descending pathways from periaqueductal grey release endogenous opioids and serotonin. Referred pain arises from convergent viscerosomatic afferents onto the same second-order neuron.
- **Exotic modalities** examiners like: electroreception in sharks and platypus (ampullae of Lorenzini, Lorenzini's jelly), magnetoreception (magnetite and cryptochrome radical pairs in birds), infrared imaging in pit vipers (TRPA1), and polarised-light navigation in insects.

Trap: sensitisation is not the same as increased stimulus intensity — the receptor threshold falls and the response gain rises, which is why allodynia makes a light touch painful.`
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
- $P_i$: Interstitial hydrostatic pressure ($\\approx -2$ to $0\\text{ mmHg}$).
- $\\pi_c$: Capillary plasma oncotic pressure ($\\approx 25-28\\text{ mmHg}$, primarily albumin).
- $\\pi_i$: Interstitial fluid oncotic pressure ($\\approx 1-3\\text{ mmHg}$).
- **Net filtration** occurs at arteriolar end ($+10\\text{ mmHg}$); **net reabsorption** occurs at venular end ($-8\\text{ mmHg}$). Slight excess fluid filtered ($2-4\\text{ L/day}$) is returned to circulation via the **lymphatic system**!`
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
  - A partial pressure gradient ($\\Delta P_{\\text{O}_2}$) is maintained along the *entire length* of the capillary bed.
  - Allows blood $P_{\\text{O}_2}$ to reach up to **$80-90\%$ of the oxygen saturation** of incoming water!
  - Concurrent flow would reach equilibrium at only $50\%$, wasting the oxygen content of the water.
- **Avian Crosscurrent & Unidirectional Flow**:
  - Birds possess rigid, non-collapsible lungs with continuous parallel tubules called **parabronchi** connected to anterior and posterior **air sacs**.
  - Takes **two complete respiratory cycles** for a single bolus of air to move through the system:
    - *Inhalation 1*: Air enters posterior air sacs.
    - *Exhalation 1*: Air passes through parabronchi where gas exchange occurs.
    - *Inhalation 2*: Deoxygenated air enters anterior air sacs.
    - *Exhalation 2*: Air exits via trachea.
  - Flow across parabronchial capillaries is **crosscurrent**: blood $P_{\\text{O}_2}$ leaving the parabronchus can exceed the $P_{\\text{O}_2}$ of exhaled gas, enabling flight at extreme altitudes (e.g., Bar-headed geese over the Himalayas at $> 8,000\\text{ m}$).`
      },
      {
        heading: "2. Mammalian Pulmonary Mechanics & Surfactant",
        content: `Inspiration and expiration dynamics governed by pressure gradients:
- **Pleural Pressures**: At Functional Residual Capacity (FRC), inward elastic recoil of the lung matches outward elastic recoil of the chest wall, creating a negative intrapleural pressure ($-5\\text{ cm } H_2O$).
- **Inspiration**: Contraction of diaphragm and external intercostals expands thoracic cavity $\to$ intrapleural pressure drops to $-8\\text{ cm } H_2O \to$ alveolar pressure drops below atmospheric ($-1\\text{ cm } H_2O$) $\to$ air flows in.
- **Compliance & Laplace's Law**:
  $$P = \frac{2T}{r}$$
  - Without surfactant, smaller alveoli (smaller radius $r$) would generate much higher internal collapsing pressures than larger alveoli, causing air to empty into larger alveoli and collapsing smaller ones (**atelectasis**).
- **Pulmonary Surfactant**: Secreted by **Type II alveolar epithelial cells**; composed of **dipalmitoylphosphatidylcholine (DPPC)** and surfactant proteins (SP-A, B, C, D).
  - Molecules crowd closer together in shrinking alveoli, reducing surface tension $T$ proportionally to radius $r$, stabilizing alveoli of varying sizes and drastically increasing pulmonary compliance.`
      },
      {
        heading: "3. Oxygen-Hemoglobin Dissociation & The Bohr Effect",
        content: `Hemoglobin ($HbA$, $\\alpha_2\\beta_2$) cooperatively binds up to four $O_2$ molecules, generating a sigmoidal binding curve:
- **$P_{50}$ Parameter**: The partial pressure of oxygen at which hemoglobin is $50\%$ saturated (normal arterial $P_{50} \\approx 26.6\\text{ mmHg}$).
- **Right Shift (Decreased $O_2$ Affinity / Enhanced Tissue Delivery)**:
  - Higher $P_{50}$: Hemoglobin releases oxygen more readily to metabolically active tissues.
  - Triggers (**CADET face right**):
    1. **$\\uparrow \\text{CO}_2$** (hypercapnia).
    2. **$\\uparrow \\text{Acidity / } [\\text{H}^+]$** (decreased pH) = **The Bohr Effect**. $H^+$ protonates histidine residues (His146 on $\\beta$-chains), forming salt bridges that stabilize the low-affinity Tense (T) state.
    3. **$\\uparrow 2,3\\text{-Bisphosphoglycerate (2,3-BPG)}$**: Synthesized via the Rapoport-Luebering shunt in erythrocytes. Binds the central cavity between $\\beta$-subunits with positively charged residues (Lys82, His2, His143).
    4. **$\\uparrow \\text{Exercise / } \\uparrow \\text{Temperature}$**.
- **Left Shift (Increased $O_2$ Affinity)**:
  - Lower $P_{50}$: Binds $O_2$ tightly. Caused by $\\downarrow [H^+]$ (alkalosis), $\\downarrow P_{\\text{CO}_2}$, $\\downarrow \\text{temp}$, $\\downarrow 2,3\\text{-BPG}$.
  - **Fetal Hemoglobin ($HbF$, $\\alpha_2\\gamma_2$)**: $\\gamma$-chains replace His143 with neutral serine, slashing 2,3-BPG binding affinity! Therefore, $HbF$ has a much higher oxygen affinity than maternal $HbA$, driving transplacental oxygen transfer.`
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
  - **Peripheral Chemoreceptors (Carotid and Aortic Bodies)**: Glomus cells sense arterial **hypoxia** ($P_{\\text{O}_2} < 60\\text{ mmHg}$), hypercapnia, and metabolic acidosis ($H^+$ directly from blood). Hypoxia closes background $K^+$ channels $\to$ depolarization $\to Ca^{2+}$ influx $\to$ dopamine release onto sinus nerve (CN IX).`
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
  - Apical **$H^+/K^+\\text{-ATPase}$ (Proton Pump)** actively exports $H^+$ into the lumen in exchange for $K^+$ at a concentration gradient of $1 : 1,000,000$ (luminal pH $\\approx 1.0$).
  - Basolateral **$HCO_3^-/Cl^-$ antiporter (AE2)** extrudes $HCO_3^-$ into blood, generating the post-prandial **alkaline tide** while importing $Cl^-$, which exits into the lumen via apical $Cl^-$ channels (CFTR / Clic6).
- **Three Positive Regulators**:
  1. **Gastrin** (binds $CCK_B$ receptors $\to G_{\\alpha q} \to IP_3/Ca^{2+}$).
  2. **Acetylcholine** (vagus nerve via $M_3$ receptors $\to G_{\\alpha q} \to IP_3/Ca^{2+}$).
  3. **Histamine** (paracrine from ECL cells binds $H_2$ receptors $\to G_{\\alpha s} \to cAMP \to PKA$). Histamine potentiates gastrin and ACh signaling!
- **Negative Regulator**: **Somatostatin** from D cells binds $SSTR2$ ($G_{\\alpha i} \to \\downarrow cAMP$), directly suppressing parietal and G cells.`
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
  - Apical: **SGLT1** ($2 Na^+ : 1 \\text{ glucose/galactose}$ secondary active symport). **GLUT5** (facilitated diffusion of fructose).
  - Basolateral: **GLUT2** transports glucose, galactose, and fructose into interstitial fluid and portal capillaries.
- **Lipid Digestion & Chylomicrons**:
  - Liver bile salts emulsify dietary triglycerides into mixed **micelles** ($4-7\\text{ nm}$).
  - Pancreatic lipase and **colipase** hydrolyze triglycerides into 2-monoglycerides and free fatty acids.
  - Lipids diffuse across apical membrane; re-esterified to triglycerides in smooth ER.
  - Packaged with apolipoproteins (ApoB-48), phospholipids, and cholesterol into **Chylomicrons**.
  - Chylomicrons undergo exocytosis into **lacteals** (central lymphatic vessels), bypassing the liver and entering venous circulation directly via the thoracic duct into the left subclavian vein!`
      },
      {
        heading: "4. Gastrointestinal Endocrinology & Enterohepatic Circulation",
        content: `Peptide hormones coordinating gastrointestinal transit and metabolism:
- **Gastrin** (G cells of antrum): Stimulated by peptide fragments, stomach distension, and vagal GRP (gastrin-releasing peptide). Drives parietal $HCl$ secretion and gastric mucosal growth. Inhibited by luminal $\\text{pH} < 2.0$ via somatostatin.
- **Cholecystokinin (CCK)** (I cells of duodenum/jejunum): Stimulated by fatty acids and amino acids. Causes **gallbladder contraction**, relaxes **Sphincter of Oddi**, stimulates pancreatic acinar enzyme secretion, and slows gastric emptying.
- **Secretin** (S cells of duodenum): Stimulated by acidic chyme ($\\text{pH} < 4.5$). Stimulates pancreatic ductal cells to secrete massive watery **$\\text{HCO}_3^-$** via CFTR and $Cl^-/HCO_3^-$ exchangers, neutralizing duodenal acid.
- **Incretins (GIP and GLP-1)** (K cells and L cells): Stimulate glucose-dependent insulin secretion from pancreatic $\\beta$-cells *before* blood glucose rises (feedforward control).
- **Enterohepatic Circulation of Bile Salts**:
  - $> 95\%$ of bile acids (cholic, chenodeoxycholic acid conjugated to glycine/taurine) are actively reabsorbed in the **terminal ileum** via the **ASBT ($Na^+$-dependent bile salt transporter)**.
  - Returned to liver via portal vein and re-secreted into bile, cycling 4-12 times daily. Resection of terminal ileum causes severe bile acid malabsorption and steatorrhea.`
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
  - Hydrophilic; circulate freely dissolved in plasma; short half-life ($t_{1/2} \\approx 2-30\\text{ minutes}$). Bind cell-surface GPCRs or RTKs.
- **2. Steroid Hormones** (e.g., Cortisol, Aldosterone, Testosterone, Estradiol):
  - Synthesized on-demand from **cholesterol** in adrenal cortex, gonads, and placenta (rate-limiting step: **StAR protein** transporting cholesterol into inner mitochondrial membrane where CYP11A1 / cholesterol side-chain cleavage enzyme converts it to pregnenolone).
  - Lipophilic; diffuse across membranes immediately; circulate bound to plasma carriers (**CBG, SHBG, Albumin**); long half-life ($t_{1/2} \\approx 1-2\\text{ hours}$). Bind intracellular nuclear receptors that dimerize, bind **Hormone Response Elements (HREs)** on DNA via zinc-finger motifs, and modulate transcription.
- **3. Amine Hormones** (derived from Tyrosine):
  - *Catecholamines* (Epinephrine, Norepinephrine, Dopamine): Water-soluble; circulate free; bind surface GPCRs ($\\alpha_1, \\alpha_2, \\beta_1, \\beta_2$).
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
  1. **Zona Glomerulosa** (outer $15\%$): Lacks $17\\alpha$-hydroxylase. Synthesizes **Aldosterone** (mineralocorticoid) driven by Angiotensin II and hyperkalemia ($K^+$).
  2. **Zona Fasciculata** (middle $75\%$): Synthesizes **Cortisol** (glucocorticoid) driven by ACTH. Cortisol stimulates gluconeogenesis, lipolysis, protein catabolism, and suppresses immune responses by inhibiting $PLA_2$, $COX-2$, and $NF-\\kappa B$.
  3. **Zona Reticularis** (inner $10\%$): Synthesizes adrenal androgens (**DHEA, Androstenedione**).
- **Adrenal Medulla (Neural Crest)**: Chromaffin cells act as modified postganglionic sympathetic neurons, secreting **Epinephrine ($80\%$)** and **Norepinephrine ($20\%$)** driven by preganglionic acetylcholine.
- **The Renin-Angiotensin-Aldosterone System (RAAS)**:
  1. Renal hypoperfusion or low $NaCl$ delivery to macula densa triggers **Juxtaglomerular (JG) cells** to secrete **Renin**.
  2. Renin cleaves hepatic **Angiotensinogen** into decapeptide **Angiotensin I**.
  3. **Angiotensin-Converting Enzyme (ACE)** (primarily on pulmonary vascular endothelium) cleaves Ang I to octapeptide **Angiotensin II**.
  4. Angiotensin II actions: Potent systemic arteriolar vasoconstriction; stimulates hypothalamic thirst and ADH release; binds $AT_1$ receptors in zona glomerulosa to stimulate **Aldosterone** release.
  5. Aldosterone binds mineralocorticoid receptors in renal cortical collecting duct principal cells $\to$ upregulates apical **ENaC** ($Na^+$ channels) and basolateral **$Na^+/K^+\\text{-ATPase}$**, driving $Na^+$ reabsorption, water retention, and $K^+/H^+$ excretion.`
      },
      {
        heading: "4. Calcium Homeostasis & Pancreatic Islet Dynamics",
        content: `Endocrine control of blood calcium and blood glucose:
- **Calcium Homeostasis** (Normal serum ionized $Ca^{2+} \\approx 1.1-1.3\\text{ mmol/L}$):
  - **Parathyroid Hormone (PTH)**: Secreted by parathyroid chief cells when **Calcium-Sensing Receptors (CaSR)** detect low ionized $Ca^{2+}$.
    - *Bone*: Binds osteoblasts $\to$ upregulates **RANKL** while suppressing Osteoprotegerin (OPG) $\to$ RANKL binds RANK on osteoclast precursors $\to$ osteoclast activation and bone resorption.
    - *Kidney*: Stimulates $Ca^{2+}$ reabsorption in distal convoluted tubule; inhibits phosphate reabsorption in proximal tubule (phosphaturic effect); activates **$1\\alpha$-hydroxylase (CYP27B1)** converting calcidiol ($25\\text{-OH } D_3$) into active **Calcitriol ($1,25\\text{-(OH)}_2 D_3$)**.
    - *Intestine*: Calcitriol upregulates apical **TRPV6** channels, cytosolic **calbindin-D9k**, and basolateral **PMCA1b**, stimulating intestinal calcium and phosphate absorption.
  - **Calcitonin**: Secreted by parafollicular C cells of thyroid in response to hypercalcemia; directly inhibits osteoclastic bone resorption.
- **Pancreatic Islet Endocrine Physiology**:
  - **$\\beta$-Cells (Insulin)**: High blood glucose enters via **GLUT2** (rodents) / **GLUT1** (humans) $\to$ glucokinase glycolysis $\to \\uparrow [ATP]/[ADP] \to$ **closes ATP-sensitive $K^+$ channels ($K_{\\text{ATP}}$)** $\to$ membrane depolarization $\to$ opens voltage-gated $Ca^{2+}$ channels $\to Ca^{2+}$ influx triggers **insulin exocytosis**!
  - Insulin binds receptor tyrosine kinase (IR) $\to$ IRS1/2 $\to$ PI3K $\to$ Akt $\to$ translocation of **GLUT4** vesicles to plasma membrane in skeletal muscle and adipose tissue; stimulates glycogen synthesis and lipogenesis.
  - **$\\alpha$-Cells (Glucagon)**: Secreted during hypoglycemia; acts via GPCR-$G_{\\alpha s}-cAMP-PKA$ in liver to stimulate glycogenolysis and gluconeogenesis.`
      }
    ]
  },

  // ==================== DOMAIN 4: GENETICS & MOLECULAR EVOLUTION (20%) ====================
  {
    id: "animal-11-homeostasis-thermoregulation",
    domainId: "animal_phys",
    title: "Homeostasis, Thermoregulation, Osmoregulation & Blood",
    subtitle: "Feedback control, Q10, countercurrent heat exchange, osmotic strategies, nitrogenous waste and haemostasis",
    level: "USABO Finalist / IBO",
    xp: 160,
    estimatedMinutes: 28,
    prerequisites: ["animal-3-renal", "animal-8-endocrine"],
    sources: ["Vander's Human Physiology Ch. 5, 15-18", "Guyton & Hall Ch. 73-75", "Campbell Ch. 40, 44", "Raven's Biology of Plants Ch. 30"],
    interactiveTool: null,
    summary: "Homeostasis, thermoregulation and osmoregulation are required IBO animal topics, and the app previously treated them only inside the kidney. This module covers feedback control as a formal concept, heat exchange and Q10 with ectotherm and endotherm strategies, osmotic strategies across marine, freshwater and terrestrial environments, nitrogenous waste economics, and blood composition with haemostasis and lymph flow.",
    keyFormulas: [
      { name: "Q10 Temperature Coefficient", latex: "Q_{10} = \\left( \\frac{R_2}{R_1} \\right)^{10/(T_2 - T_1)}" },
      { name: "Osmotic Pressure", latex: "\\pi = iCRT" },
      { name: "Filtration Flow", latex: "J_v = K_f[(P_c - P_i) - \\sigma(\\pi_c - \\pi_i)]" }
    ],
        sections: [
      {
        heading: "Feedback control: set points, gain and allostasis",
        content: `Homeostasis is the regulation of an internal variable around a value that the system defends, not the absence of change.

- **Control vocabulary.** A sensor measures the variable, an integrator (usually hypothalamic) compares it with a set point, an error signal drives effectors, and negative feedback reduces the error. Positive feedback amplifies (oxytocin in labour, action-potential upstroke, blood clotting) and must be terminated by an event. Feedforward anticipates (cephalic-phase insulin release, shivering before core temperature falls).
- **Gain** quantifies correction: $G = \\text{correction}/(\\text{remaining error})$; high-gain systems hold the variable close to set point, low-gain systems allow wide swings. Time constants and delays explain oscillation (hunting) — the reason some endocrine axes overshoot.
- **Antagonistic control** is the norm: insulin/glucagon, PTH/calcitonin, ADH/ANP, sympathetic/parasympathetic. Redundancy and hierarchy mean a variable can be defended by several mechanisms with different thresholds, which is why measured "normal ranges" are statistical, not physiological, boundaries.
- **Set point versus allostasis.** Fever raises the hypothalamic set point (pyrogens $\\to$ PGE$_2$) so the body behaves as if it were cold (vasoconstriction, shivering) until the new set point is reached — different from hyperthermia, where the set point is normal but heat gain exceeds loss (heat stroke, malignant hyperthermia, MDMA). Allostasis is anticipatory adjustment of set points (stress-induced hypertension); chronic allostatic load is a disease mechanism.
- **Example integration:** plasma glucose is defended by insulin (uptake, glycogen synthesis, lipogenesis), glucagon (glycogenolysis, gluconeogenesis), cortisol and adrenaline (counter-regulatory), plus incretin and neural feedforward; calcium by PTH (bone resorption, renal reabsorption, 1$\\alpha$-hydroxylase), vitamin D (intestinal absorption), calcitonin and FGF23 (phosphate); water by ADH, thirst and RAAS.

Trap: a "set point" is not fixed for life — it changes with fever, pregnancy, altitude and chronic stress, so a value outside the population range can be homeostatically defended.`
      },
      {
        heading: "Thermal physiology: exchange, endothermy and torpor",
        content: `- **Heat exchange** occurs by radiation, conduction, convection and evaporation; evaporation is the only route that works when ambient temperature exceeds body temperature. Insulation (fur, blubber, feathers), surface-area-to-volume ratio, countercurrent heat exchange in limbs (rete mirabile in bird legs, dolphin flippers) and behavioural thermoregulation modulate the balance.
- **Ectotherms vs endotherms** is a continuum, not a dichotomy: ectotherms use external heat and have low metabolic rates; endotherms generate heat internally (BMR 5–10× higher per gram) and defend a narrow range; heterotherms switch (hummingbirds, bats, tenrecs). Mesotherms (tuna, opah, some sharks) use regional endothermy with retia mirabilia.
- **Thermoneutral zone** is the ambient range where metabolic rate is minimal; below it, heat production rises (shivering then non-shivering thermogenesis), above it, evaporative cooling rises. **Q$_{10}$** (rate ratio per 10 °C) is ~2–3 for most biological rates, which is why a 10 °C fever roughly doubles metabolic demand.
- **Shivering** is antagonistic muscle contraction without work (ATP hydrolysed for heat); **non-shivering thermogenesis** uses brown adipose tissue, where UCP1 (thermogenin) uncouples the respiratory chain so proton flow produces heat instead of ATP. Brown fat is abundant in infants and hibernators and is recruited by cold and sympathetic noradrenaline; it is present and metabolically active in adult humans.
- **Torpor, hibernation, estivation:** daily torpor (hummingbirds, some bats) drops set point and metabolic rate for hours; hibernation sustains weeks-months with periodic arousals; estivation is summer dormancy in the heat. Arousal from hibernation requires intense thermogenesis and is energetically expensive, which is why arousal frequency is optimised rather than arbitrary.
- **Fever vs hyperthermia** (above): antipyretics (NSAIDs) inhibit cyclo-oxygenase and lower the set point; they do not cool a hyperthermic patient, who needs active cooling.

Trap: sweating cools by evaporation; at 100% humidity it fails, so high humidity plus high temperature is far more dangerous than the same temperature at low humidity.`
      },
      {
        heading: "Osmoregulation and the countercurrent kidney",
        content: `- **Strategies.** Osmoconformers (marine invertebrates, hagfish) match internal osmolarity to seawater; osmoregulators maintain a set osmolarity. Freshwater teleosts are hyperosmotic to their medium: they gain water osmotically, lose ions, produce copious dilute urine and actively take up Na$^+$/Cl$^-$ through gill ionocytes. Marine teleosts are hypoosmotic: they drink seawater, absorb water and ions in the gut, excrete excess salt through gill chloride cells, and produce scant urine. Elasmobranchs retain urea and trimethylamine N-oxide to become slightly hyperosmotic, avoiding both drinking and water loss. Anadromous fish (salmon) remodel gill transporters and switch from ion uptake to ion secretion during migration, driven by prolactin and cortisol.
- **Countercurrent multiplier.** The loop of Henle generates a corticomedullary osmotic gradient: the descending limb is water-permeable and solute-impermeable, the ascending limb is water-impermeable and actively transports NaCl out, so the interstitium becomes progressively hypertonic. The vasa recta act as countercurrent exchangers, preserving the gradient without washing it away. Long loops (desert mammals) produce concentrated urine; short loops (beavers) do not. The collecting duct's final water permeability is set by ADH-driven AQP2 insertion.
- **Hormonal control.** ADH (vasopressin, V2 receptor, cAMP, AQP2) concentrates urine; RAAS (renin $\\to$ angiotensin II $\\to$ aldosterone) conserves Na$^+$ and water; ANP promotes natriuresis; aldosterone also drives K$^+$ secretion. Osmotic thirst and hypovolaemic thirst are separate (osmoreceptors in the OVLT vs baroreceptors), which is why haemorrhage and dehydration produce different drinking behaviour.
- **Invertebrate solutions:** Malpighian tubules (insects) secrete primary urine by active K$^+$ transport and modify it in the hindgut; crustaceans use antennal glands; protonephridia in flatworms.
- **Nitrogen waste** choice follows water availability: ammonia (fish, aquatic invertebrates) is toxic but cheap; urea (mammals, elasmobranchs, adult amphibians) costs ATP but is less toxic; uric acid (birds, reptiles, insects) is nearly insoluble and excreted as paste, saving water — the same logic drives the uricotelic switch in desert species.

Trap: the loop of Henle concentrates *interstitial* fluid, not urine directly; urine is concentrated later in the collecting duct, so a diuretic acting on the ascending limb abolishes the gradient and prevents concentration regardless of ADH.`
      },
      {
        heading: "Integrated regulation: calcium, glucose, stress and altitude",
        content: `- **Calcium.** Plasma Ca$^{2+}$ is defended tightly because it sets neuronal excitability and clotting. Low Ca$^{2+}$ $\\to$ PTH from parathyroid chief cells (CaSR-sensing) $\\to$ bone resorption (RANKL/OPG), renal Ca$^{2+}$ reabsorption, and 1$\\alpha$-hydroxylase activation to raise calcitriol, which increases intestinal absorption. High Ca$^{2+}$ $\\to$ calcitonin (minor in humans) and suppressed PTH; FGF23 handles phosphate. Hypocalcaemia causes tetany and prolongs the QT interval; hypercalcaemia causes constipation, polyuria and confusion ("stones, bones, abdominal groans, psychic moans").
- **Glucose.** $\\beta$-cells sense glucose via glucokinase, raising ATP/ADP, closing K$_{ATP}$ channels, depolarising, opening L-type Ca$^{2+}$ channels and releasing insulin (first phase from docked granules, second from reserve pool). Incretins (GLP-1, GIP) amplify the response; GLP-1 receptor agonists and DPP-4 inhibitors exploit this. Insulin signals through IRS-1/PI3K/Akt to translocate GLUT4 in muscle and fat, activate glycogen synthase (via GSK3 inhibition) and suppress hepatic gluconeogenesis. Counter-regulation: glucagon (glycogenolysis, gluconeogenesis), adrenaline ($\\beta_2$), cortisol (permissive, promotes gluconeogenesis), growth hormone. Chronic hyperglycaemia causes non-enzymatic glycation (HbA1c), osmotic damage (sorbitol pathway) and microvascular disease.
- **Stress axis.** CRH $\\to$ ACTH $\\to$ cortisol with negative feedback at hippocampus and hypothalamus; chronic cortisol causes insulin resistance, immunosuppression, bone loss and hippocampal atrophy. Catecholamines act within seconds (fight-or-flight), cortisol within minutes to hours (permissive and metabolic), and aldosterone adds volume retention. Selye's general adaptation syndrome is the historical framing; allostasis is the modern one.
- **Altitude.** Acute hypoxia raises ventilation via carotid-body sensing, causing respiratory alkalosis that shifts the oxygen–haemoglobin curve left; acclimatisation over days increases 2,3-BPG (shifting it right), erythropoietin-driven polycythaemia, capillary density and mitochondrial efficiency. Tibetan and Andean adaptations differ (nitric oxide–mediated flow vs haemoglobin concentration), a textbook case of convergent solutions to the same stress.

Trap: calcium and phosphate are regulated by different but interacting hormones (PTH, vitamin D, FGF23, calcitonin); a normal plasma calcium with abnormal phosphate points to FGF23 or PTH, not to calcitonin.`
      }
    ]
  },

  // ==================== ADDED: GAP FILL (GENETICS/EVOLUTION, ECOLOGY, ETHOLOGY, BIOSYSTEMATICS) ====================
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
  - Signal transduction via **MyD88** or **TRIF** activates **$\\text{NF-}\\kappa\\text{B}$** and **IRF3/7**, driving pro-inflammatory cytokines ($\\text{TNF-}\\alpha$, $\\text{IL-}1\\beta$, $\\text{IL-}6$) and Type I interferons ($\\text{IFN-}\\alpha/\\beta$).
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
  - Immunoglobulin Heavy chain ($IgH$) and $TCR\\beta$ loci contain **Variable (V)**, **Diversity (D)**, and **Joining (J)** gene segments.
  - Light chain ($Ig\\kappa, Ig\\lambda$) and $TCR\\alpha$ loci contain only V and J segments.
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
  - Present on **all nucleated cells**; presents peptides (8-10 amino acids) to **$\\text{CD8}^+$ Cytotoxic T Lymphocytes (CTLs)**.
  - Structure: Heterodimer of a polymorphic $\\alpha$-chain ($\\alpha_1, \\alpha_2, \\alpha_3$) non-covalently paired with invariant **$\\beta_2$-microglobulin**.
  - Mechanism: Cytosolic viral or tumor proteins are degraded by the **immunoproteasome**. Peptides are pumped into the ER lumen by **TAP1/TAP2 transporters**. Chaperones (calreticulin, tapasin) load peptide into MHC I groove; transported via Golgi to cell surface.
  - CTL killing: CTL releases **perforin** (forms membrane pore) and **granzymes** (serine proteases cleaving procaspases and Bid, inducing apoptosis), or engages **FasL** with target cell Fas.
- **MHC Class II Pathway (Exogenous Antigens)**:
  - Restricted to **Professional Antigen-Presenting Cells (APCs)**: Dendritic cells, Macrophages, and B lymphocytes. Presents longer peptides (13-25 amino acids) to **$\\text{CD4}^+$ T Helper cells**.
  - Structure: Heterodimer of two transmembrane chains: $\\alpha$ ($\\alpha_1, \\alpha_2$) and $\\beta$ ($\\beta_1, \\beta_2$).
  - Mechanism: Extracellular antigens endocytosed into acidic endolysosomes. MHC II synthesized in ER associates with the **Invariant Chain (Ii / CD74)** to prevent premature peptide binding. In endosome, cathepsins cleave Ii leaving a small peptide remnant (**CLIP**). **HLA-DM** catalyzes exchange of CLIP for foreign antigenic peptide; complex delivered to cell surface.`
      },
      {
        heading: "4. T-Helper Subsets & Gell-Coombs Hypersensitivity",
        content: `CD4+ T cell specialization and clinical immunopathology:
- **$\\text{CD4}^+$ T-Helper Lineage Commitment**:
  - **Th1**: Induced by $IL-12$ and $IFN-\\gamma$; master transcription factor **T-bet**. Secretes $IFN-\\gamma$; activates macrophages against intracellular pathogens (e.g., *Mycobacterium*).
  - **Th2**: Induced by $IL-4$; master transcription factor **GATA3**. Secretes $IL-4, IL-5, IL-13$; drives eosinophils, mast cells, and $IgE$ class switching against helminth parasites.
  - **Th17**: Induced by $TGF-\\beta, IL-6, IL-23$; master transcription factor **ROR$\\gamma t$**. Secretes $IL-17$; recruits neutrophils for extracellular fungal/bacterial defense.
  - **Treg (Regulatory T cell)**: Induced by $TGF-\\beta$; master transcription factor **FoxP3**. Secretes $IL-10$ and $TGF-\\beta$; suppresses autoreactive immune responses (loss causes IPEX syndrome).
- **Gell and Coombs Hypersensitivity Classification**:
  - **Type I (Immediate / Anaphylactic)**: Antigen crosslinks allergen-specific **$IgE$** bound to $Fc\\epsilon RI$ on mast cells $\to$ degranulation of histamine, leukotrienes, prostaglandins (e.g., anaphylaxis, asthma).
  - **Type II (Antibody-Mediated Cytotoxic)**: $IgG$ or $IgM$ binds cell surface antigens $\to$ complement activation or ADCC (e.g., Rh disease / erythroblastosis fetalis, Goodpasture syndrome).
  - **Type III (Immune Complex-Mediated)**: Circulating antigen-antibody complexes deposit in microvasculature, activating complement and neutrophils (e.g., Systemic Lupus Erythematosus, post-streptococcal glomerulonephritis).
  - **Type IV (Delayed-Type Hypersensitivity, DTH)**: Cell-mediated; sensitized Th1 cells release $IFN-\\gamma$, recruiting and activating macrophages 24-72 hours post-exposure (e.g., tuberculin PPD skin test, poison ivy contact dermatitis).`
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
  - **Biphasic Estradiol Feedback**: Low/moderate estradiol exerts *negative feedback* on GnRH/LH/FSH. Sustained high estradiol ($> 200\\text{ pg/mL}$ for $> 36\\text{ hours}$) switches to **positive feedback**, triggering the massive **LH Surge**!
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
  1. **Fast Block (External Fertilizers, e.g., Sea Urchin)**: Immediate influx of $Na^+$ depolarizes egg membrane from $-70\\text{ mV}$ to $+20\\text{ mV}$ within 1-3 seconds, preventing further sperm fusion (positively charged membrane repels sperm). Transient ($< 1\\text{ minute}$).
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
- **Gross Primary Productivity (GPP)**: Total rate at which primary producers convert solar energy into chemical bond energy via photosynthesis per unit area per unit time ($\\text{g C}\\cdot \\text{m}^{-2}\\cdot \\text{yr}^{-1}$ or $\\text{J}\\cdot \\text{m}^{-2}\\cdot \\text{yr}^{-1}$).
- **Net Primary Productivity (NPP)**: Energy remaining after autotrophic respiration ($R_a$):
  $$NPP = GPP - R_a$$
  - Globally, terrestrial ecosystems contribute $\\approx 55\%$ of total NPP; marine systems contribute $\\approx 45\%$.
  - Tropical rainforests and coral reefs exhibit the highest NPP per unit area ($> 2000\\text{ g}\\cdot \\text{m}^{-2}\\cdot \\text{yr}^{-1}$); open oceans have low areal NPP but account for the largest total global productivity due to sheer vast surface area.
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
  $$E_T = \\frac{P_n}{P_{n-1}} = E_C \\times E_A \\times E_P \\approx 10\% \\quad (5-20\%)$$
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
  1. **Nitrogen Fixation**: Inert atmospheric $N_2$ triple bond broken by bacterial enzyme **Nitrogenase** ($16\\text{ ATP}$ per $N_2$ fixed; irreversibly poisoned by $O_2$; protected by root nodule leghemoglobin in *Rhizobium*):
     $$N_2 + 8 H^+ + 8 e^- + 16 \\text{ ATP} \to 2 NH_3 + H_2 + 16 \\text{ ADP} + 16 P_i$$
  2. **Nitrification**: Obligate aerobic chemoautotrophic two-step oxidation:
     - *Step 1*: $NH_4^+ + 1.5 O_2 \to NO_2^- + H_2O + 2 H^+$ (catalyzed by *Nitrosomonas*).
     - *Step 2*: $NO_2^- + 0.5 O_2 \to NO_3^-$ (catalyzed by *Nitrobacter*).
  3. **Denitrification**: Facultative anaerobic respiration using nitrate as terminal electron acceptor:
     $$NO_3^- \to NO_2^- \to NO \to N_2O \to N_2 \\quad (\\text{catalyzed by } Pseudomonas, \\text{Paracoccus})$$
  4. **Anammox (Anaerobic Ammonium Oxidation)**: Occurs in specialized membrane-bound anammoxosomes in marine suboxic zones:
     $$NH_4^+ + NO_2^- \to N_2 + 2 H_2O \\quad (\\text{accounts for up to } 50\% \\text{ of oceanic } N_2 \\text{ loss})$$
- **The Phosphorus Cycle**: Lacks a gaseous atmospheric reservoir. Slow geological weathering of apatite rock releases orthophosphate ($H_2PO_4^- / HPO_4^{2-}$). Retained tightly in terrestrial biomass; lost to ocean sediments via marine sedimentation.
- **Liebig's Law of the Minimum**: Growth of a population is controlled not by the total amount of resources available, but by the scarcest essential nutrient relative to demand (e.g., Phosphorus limits freshwater lakes; Nitrogen and Iron limit open oceans).`
      },
      {
        heading: "4. Terrestrial Biome Climate Envelopes",
        content: `Global biome distribution plotted on Whittaker's Mean Annual Temperature ($T$) vs Mean Annual Precipitation ($P$) coordinate plane:
- **Tropical Rainforest**: High $T$ ($> 20^\\circ\\text{C}$), high $P$ ($> 2000\\text{ mm}$). Highly weathered, nutrient-poor **oxisols** (intense leaching; nutrients held almost entirely in living biomass, not soil).
- **Temperate Deciduous Forest**: Moderate seasonal $T$, moderate $P$ ($750-1500\\text{ mm}$). Rich nutrient **alfisols** with deep leaf litter.
- **Boreal Forest (Taiga)**: Cold winters, short cool summers, low-moderate $P$. Coniferous gymnosperms (*Picea*, *Abies*, *Pinus*). Acidic, leached **spodosols** with thick needle humus and mycorrhizae.
- **Tundra (Arctic & Alpine)**: Severe cold, low $P$ ($< 250\\text{ mm}$). Characterized by **permafrost** (permanently frozen subsoil) restricting root penetration; dominated by dwarf shrubs, sedges, lichens; freeze-thaw solifluction polygon patterning.`
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
  - Time-series: Predator population peaks **one quarter-cycle ($\\pi/2$ phase lag)** behind the prey population (demonstrated empirically in Hudson's Bay Company snowshoe hare - lynx pelt records).`
      },
      {
        heading: "2. Holling's Functional Responses I, II & III",
        content: `Relationship between prey density ($N$) and per capita consumption rate ($N_e$):
- **Type I Functional Response**: Linear increase with prey density up to a maximum saturation plateau:
  $$N_e = a N$$
  - Assumes zero handling time. Seen in passive filter feeders (e.g., *Daphnia*, baleen whales).
- **Type II Functional Response**: Decelerating consumption rate asymptotically approaching maximum saturation:
  $$N_e = \\frac{a N}{1 + a T_h N}$$
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
  $$H' = -\\sum_{i=1}^S p_i \ln p_i$$
  - $p_i$: Relative abundance of species $i$ ($p_i = n_i / N$).
  - Higher $H'$ indicates greater diversity and uncertainty in predicting the species of a random individual.
  - Maximum possible diversity for $S$ species: $H'_{\max} = \ln S$ (occurs when all species are equally abundant).
- **Pielou's Evenness ($J'$)**:
  $$J' = \\frac{H'}{H'_{\max}} = \\frac{H'}{\ln S}$$
  - $J' = 1.0$ represents perfectly equitable abundances; values near $0$ indicate extreme ecological dominance by a single species.
- **Simpson's Reciprocal Diversity Index ($1/D$)**:
  $$D = \\sum_{i=1}^S p_i^2 \implies \\frac{1}{D} = \\frac{1}{\\sum p_i^2}$$
  - $D$ represents the probability that two randomly selected individuals belong to the same species.`
      },
      {
        heading: "4. MacArthur-Wilson Island Biogeography & Disturbance",
        content: `Equilibrium model of species richness on habitat islands:
- **The Equilibrium Number of Species ($\hat{S}$)**:
  - Balance between rate of **Immigration ($I$)** of new species from mainland pool ($P$) and rate of **Extinction ($E$)** of resident species:
    - Immigration curve decelerates downward as fewer immigrant individuals belong to unrepresented species.
    - Extinction curve accelerates upward as competition increases on the island.
  - **Island Distance Effect**: Near islands have higher immigration rates than far islands $\to \\hat{S}_{\\text{near}} > \\hat{S}_{\\text{far}}$.
  - **Island Size Effect**: Large islands support larger populations (lower extinction risk from drift/stochasticity) and offer more diverse microhabitats $\to \\hat{S}_{\\text{large}} > \\hat{S}_{\\text{small}}$.
  - Ranking: $\\hat{S}_{\\text{Large, Near}} > \\hat{S}_{\\text{Large, Far}} > \\hat{S}_{\\text{Small, Near}} > \\hat{S}_{\\text{Small, Far}}$.
- **The Intermediate Disturbance Hypothesis (Connell)**:
  - *Low disturbance*: Highly competitive superior species competitively exclude inferior competitors $\to$ low species diversity.
  - *High disturbance*: Only highly tolerant or fast-reproducing r-selected species survive mortality events $\to$ low species diversity.
  - *Intermediate disturbance frequency/intensity*: Prevents competitive exclusion while allowing colonizers to establish $\to$ **maximal species diversity**!`
      }
    ]
  },

  // ==================== DOMAIN 6: ETHOLOGY (5%) ====================
  {
    id: "eco-4-community-succession",
    domainId: "ecology",
    title: "Community Structure, Keystone Species & Succession",
    subtitle: "Niches, food webs, trophic cascades, disturbance regimes and primary versus secondary succession",
    level: "USABO Finalist / IBO",
    xp: 130,
    estimatedMinutes: 24,
    prerequisites: ["eco-1-dynamics"],
    sources: ["Begon, Townsend & Harper: Ecology Ch. 8-11", "Campbell Ch. 54", "Futuyma Ch. 19"],
    interactiveTool: null,
    summary: "The IBO ecology list includes community structure and ecosystems, and USABO writes data questions about food webs and succession. This module covers the niche concept, competitive exclusion and resource partitioning, the roles of dominant, keystone and foundation species, trophic cascades and food-web metrics, disturbance and diversity, and the models of primary and secondary succession.",
    keyFormulas: [
      { name: "Shannon Diversity Index", latex: "H' = -\\sum p_i \\ln p_i" },
      { name: "Pielou Evenness", latex: "J' = \\frac{H'}{\\ln S}" },
      { name: "Species Richness Scaling", latex: "S = c A^z \\; (z \\approx 0.15-0.35 \\text{ for islands})" }
    ],
        sections: [
      {
        heading: "Succession: models, trajectories and the traits of pioneers",
        content: `Succession is directional change in community composition after a disturbance; it is a process, not a stage.

- **Primary vs secondary.** Primary succession starts on substrate with no soil or seed bank (glacier forelands, lava flows, dunes, mine spoil); secondary succession follows disturbance that leaves soil and propagules (fire, blowdown, abandoned field, flood). Secondary succession is much faster because nutrients, structure and propagules are inherited.
- **Three mechanistic models** (Connell & Slatyer): **facilitation** (early species improve conditions for later ones — N-fixing pioneers enrich soil), **tolerance** (later species are simply better competitors for light and nutrients and can establish under early ones), **inhibition** (early species suppress establishment of others, delaying succession; the pattern seen in some grasslands and algal fouling communities). All three operate simultaneously in most systems, with the balance shifting through time.
- **Pioneer traits:** high dispersal, dormancy, rapid growth, short life, high reproductive allocation, tolerance of full sun and nutrient stress. Late-successional traits are the mirror image: shade tolerance, slow growth, long life, large seeds with low dispersal, investment in defence.
- **Trajectory and endpoints.** Clements' superorganism and climax is now largely replaced by Gleason's individualistic view plus multiple stable states; "climax" is better treated as a dynamic attractor whose position depends on climate, soils, herbivory and disturbance regime. Chronosequences (space-for-time substitution) speed up study but assume sites share a starting condition and trajectory — a strong assumption.
- **Ecosystem consequences.** Biomass, soil organic matter, nitrogen capital, and species richness typically rise while productivity may peak at intermediate stages (the intermediate-succession productivity pattern). Succession is also the template for restoration: assist natural processes (propagule supply, soil amendment, nurse plants) rather than imposing a static assemblage.

Trap: facilitation does not mean early species are "necessary"; where inhibition dominates, removing the early dominants can accelerate succession, so the same intervention can help or hinder depending on the model in operation.`
      },
      {
        heading: "Disturbance regimes, alternative states and resilience",
        content: `- **Disturbance** is a discrete event that removes biomass and changes resource availability; the **regime** (frequency, intensity, extent, season) selects the traits present. Fire-adapted traits (serotiny, thick bark, resprouting, smoke-triggered germination) are evidence of a long fire regime; removing fire can convert a grassland to shrubland, not the reverse.
- **Intermediate disturbance hypothesis** predicts maximum diversity at intermediate frequency/intensity, balancing competitive exclusion at low disturbance against mortality and colonisation limitation at high disturbance. It is attractive and often over-applied: it holds best where competitive dominance is strong and disturbance creates patch heterogeneity.
- **Alternative stable states** require positive feedbacks, and the classic examples are instructive: kelp forests versus urchin barrens (urchin grazing feedback), clear versus turbid lakes (piscivore–zooplankton–phytoplankton feedback plus sediment phosphorus release), coral versus macroalgal dominance after bleaching plus overfishing. Transitions show **hysteresis** — the threshold to return is not the threshold that triggered the shift, so restoration may require reversing the driver, not just stopping it.
- **Resistance vs resilience**: resistance is the capacity to absorb change without shifting; resilience is the capacity to return. Engineering resilience (return time) and ecological resilience (magnitude of disturbance absorbed before the state changes) are different quantities and both are used loosely in policy.
- **Coupled disturbance interactions** matter: drought plus insect outbreak plus fire, or overfishing plus bleaching, produce compounding effects larger than the sum of parts; invasive grasses create a grass–fire feedback that permanently converts dry forest.
- **Management implication:** the objective is often to maintain process and heterogeneity (patch mosaic, varied seral stages) rather than a fixed species list, because the disturbance regime is what maintains the community's options.

Trap: a community that returns to its original composition after disturbance is resilient; one that merely persists because it never changes is resistant — the terms are not interchangeable.`
      },
      {
        heading: "Trophic structure: cascades, keystones and the top-down debate",
        content: `- **Trophic levels and efficiency:** only ~10% of energy passes between levels (range 5–20%), which limits food-chain length; body size, ecosystem size and productivity are the best predictors of chain length, and the "3–4 links" rule is a rough consequence of energy loss.
- **Top-down versus bottom-up.** Hairston, Smith and Slobodkin argued that herbivores are limited by predators (the world is green because plants are not herbivore-limited); bottom-up theory emphasises nutrient and plant productivity control. Modern answers are conditional: the relative strength of top-down control varies with productivity, habitat structure and the food web's asymmetry.
- **Trophic cascades** are indirect effects of predators on plants mediated by herbivores: sea otters $\\to$ urchins $\\to$ kelp (a four-level cascade with an urchin barren alternative state), wolves $\\to$ elk $\\to$ willow/aspen (with behaviourally mediated "landscape of fear" effects and a contested magnitude), and dingo removal $\\to$ mesopredator release $\\to$ small mammals. Cascades are strongest in simple, strongly interacting webs and in aquatic systems.
- **Keystone species** have effects disproportionate to their biomass (Paine's *Pisaster* removal experiment); **dominant species** have large effects simply through abundance; **ecosystem engineers** modify physical habitat (beavers, prairie dogs, corals, termites) and can be autogenic (their own bodies) or allogenic (transforming the environment).
- **Apparent competition and indirect interactions:** two prey species can suppress each other through a shared predator without competing for resources; intraguild predation mixes competition and predation, stabilising or destabilising depending on relative efficiencies. Non-consumptive effects (fear, trait-mediated indirect interactions) can equal consumptive effects in magnitude.
- **Food-web metrics:** connectance, linkage density, omnivory, modularity and nestedness describe structure; generalist webs are more robust to random extinction but vulnerable to targeted loss of highly connected species — the basis of "which species' loss matters most" questions.

Trap: removing a top predator does not necessarily increase herbivores if mesopredators take over; the sign of a cascade depends on the web's structure, so a food-chain diagram alone cannot predict it.`
      },
      {
        heading: "Assembly, diversity metrics and island biogeography",
        content: `- **Diversity metrics.** Alpha (within a site), beta (between sites, compositional turnover), gamma (regional). Species richness ignores abundance; Shannon ($H' = -\\sum p_i \\ln p_i$) and Simpson ($1-\\sum p_i^2$) weight common species differently; rarefaction and Chao estimators correct for sampling effort, and no comparison of richness is valid without equal effort or coverage-based standardisation.
- **Species–area relationship:** $S = cA^z$ with $z \\approx 0.15$–0.35 for islands and ~0.1 for nested samples. Habitat loss reduces richness according to $z$, and the "extinction debt" means the loss lags behind the habitat loss by decades — a central conservation insight.
- **Island biogeography** (MacArthur & Wilson): richness is an equilibrium between immigration (declining with isolation) and extinction (declining with area). It predicts the species–area and species–isolation relationships, and underpins reserve design — but it is a static equilibrium model and ignores nonequilibrium dynamics, speciation on large islands, and the matrix between habitat patches.
- **Metacommunity paradigms** offer four lenses: species sorting (environment filters species), patch dynamics (competition–colonisation trade-off), mass effects (dispersal swamps local dynamics), and neutral theory (drift plus dispersal, all species equivalent). Each makes different predictions about $\\beta$-diversity and about when local diversity reflects local environment.
- **Assembly rules and priority effects:** early colonists can lock in composition (alternative states at small scales), and trait-based approaches (functional diversity, community-weighted means) predict assembly better than taxonomy; phylogenetic diversity adds evolutionary history to the accounting.
- **Disturbance, productivity and diversity:** the hump-shaped productivity–diversity relationship and the scale dependence of every diversity pattern are reminders that "more productive = more diverse" fails at large scales where area and evolutionary history dominate.

Trap: two sites with equal richness can have entirely different diversity once abundance is considered, and a high $\\beta$-diversity with low $\\alpha$ means the region is heterogeneous, not that either site is poor.`
      }
    ]
  },

  {
    id: "eco-5-biomes-conservation",
    domainId: "ecology",
    title: "Climate, Biomes, Biogeography & Conservation Biology",
    subtitle: "Hadley circulation, biome contrasts, species ranges, HIPPO threats and reserve design",
    level: "USABO Finalist / IBO",
    xp: 130,
    estimatedMinutes: 24,
    prerequisites: ["eco-2-ecosystems"],
    sources: ["Begon, Townsend & Harper: Ecology Ch. 1-4, 22", "Campbell Ch. 52-56", "Ricklefs: The Economy of Nature"],
    interactiveTool: null,
    summary: "The IBO ecology list continues into ecosystems, biomes and conservation, which the app previously covered only as energy flow. This module covers the climatic machinery that produces biomes, the diagnostic features of major terrestrial and aquatic biomes, the patterns and limits of species ranges, and the conservation toolbox: threats, extinction vortex, viability analysis, reserve design and ecosystem services.",
    keyFormulas: [
      { name: "Species-Area Relationship", latex: "S = cA^z" },
      { name: "Maximum Sustainable Yield", latex: "\\text{MSY} = \\frac{rK}{4} \\; \\text{at } N = \\frac{K}{2}" },
      { name: "Population Viability Decline", latex: "\\text{extinction risk} \\propto \\frac{1}{N_e} \\text{ and increases with variance}" }
    ],
        sections: [
      {
        heading: "Climate, soils and the global distribution of biomes",
        content: `Biomes are large-scale vegetation types set primarily by temperature and precipitation, filtered by soils, fire and herbivory.

- **Whittaker diagram:** plotting mean annual temperature against precipitation separates tropical rainforest (high both), savanna (warm, seasonal), desert (low precipitation regardless of temperature), temperate forest, temperate grassland, boreal forest/taiga (cold, moderate moisture) and tundra (cold, dry). Holdridge life zones use biotemperature and potential evapotranspiration ratio; both are approximations that fail at boundaries, where fire and grazing decide between forest and grassland.
- **Determinants:** Hadley cell circulation creates wet equatorial and dry subtropical belts; rain shadows dry leeward slopes; continentality drives seasonal extremes; ocean currents shift boundaries (the Gulf Stream warms Europe). ENSO reorganises rainfall interannually, and the ITCZ migration sets savanna seasonality.
- **Soils** are the second filter: Oxisols and Ultisols (weathered, acidic, low base saturation) underlie tropical forests whose productivity depends on rapid recycling, not stored fertility — the reason slash-and-burn agriculture collapses quickly. Mollisols (grassland), Spodosols (boreal, podzolised), Andisols (volcanic, high P sorption) and Aridisols each carry characteristic vegetation. Cation exchange capacity, pH, and phosphorus availability are the practical variables.
- **Biogeographic realms** add history: the same climate supports different floras and faunas in the Nearctic, Palearctic, Neotropical, Afrotropical, Indo-Malayan, Australasian and Antarctic realms, and the Antarctic flora's relics (Nothofagus, Proteaceae) record Gondwanan fragmentation.
- **Biome shifts** are already observable: shrub encroachment into tundra and grassland, woody thickening in savanna driven by CO$_2$ and fire suppression, and forest dieback at dry margins — changes in disturbance regimes transform biomes faster than gradual climate change alone.

Trap: a biome is defined by its dominant vegetation and climate envelope, not by a single species; the same biome on different continents contains unrelated species (convergence), which is why "savanna" is a structure, not a taxon.`
      },
      {
        heading: "Productivity, nutrient limitation and biogeochemical cycling",
        content: `- **GPP and NPP.** Gross primary production is total carbon fixed; net primary production subtracts autotrophic respiration ($NPP = GPP - R_a$); net ecosystem production subtracts heterotrophic respiration too. NPP is measured by harvest, eddy covariance (NEE), or remote-sensing proxies (NDVI, EVI, solar-induced fluorescence), each with different biases.
- **Global patterns:** NPP rises with temperature and water availability and peaks in the wet tropics; ocean productivity peaks in upwelling zones and at high latitudes, with vast oligotrophic gyres where iron and nitrogen are scarce. Redfield stoichiometry (C:N:P = 106:16:1) describes plankton and links carbon to nutrient cycles.
- **Limiting nutrients.** Liebig's law: the scarcest resource limits. Terrestrial systems are usually N-limited early in succession and P-limited in old, weathered tropical soils; temperate forests respond to N deposition, and temperate grasslands to both N and P. In the ocean, nitrogen (and phosphorus) limits most regions, but iron limits the high-nutrient, low-chlorophyll (HNLC) Southern Ocean, equatorial Pacific and subarctic Pacific — iron fertilisation experiments produced blooms that were rapidly grazed, showing that carbon export is not simply a function of production.
- **Decomposition and C:N.** Litter quality (C:N, lignin, tannins) controls decomposition rates; low-quality litter immobilises N and slows cycling, feeding back to productivity. Mycorrhizal types (arbuscular vs ectomycorrhizal) shift the balance between inorganic and organic N acquisition and thus soil carbon storage.
- **Trophic transfer** is ~10% efficient, so top predators require large areas; fisheries catch levels track primary production with a lag and are distorted by fishing down the food web.
- **Carbon accounting:** forests are net sinks while growing and can become sources after disturbance; soil carbon responds slowly (centuries) while biomass responds fast, which is why "plant trees" claims must specify time horizon, permanence and albedo effects.

Trap: high NPP does not imply high biodiversity or high carbon storage; tropical forests are productive with low soil carbon, while peatlands store enormous carbon with low NPP.`
      },
      {
        heading: "Biodiversity gradients, extinction risk and fragmentation",
        content: `- **Latitudinal diversity gradient** is the oldest pattern in ecology. Competing explanations: energy/productivity, area (tropics have more land), evolutionary time (tropics are older and less disturbed by glaciation), climatic stability, and biotic interactions (stronger predation/competition driving specialisation). Evidence supports a combination, with area and time doing much of the work in the marine realm.
- **Hotspots and endemism.** Conservation prioritisation uses endemism plus threat (Myers' hotspots) or phylogenetic distinctiveness (EDGE). A hotspot with 1500 endemic plants and >70% habitat loss is a different priority from a large intact wilderness — the two strategies (hotspot versus wilderness) are complementary, not competing.
- **Extinction risk** is driven by small population size, narrow range, specialisation, slow life history and exploitation. The IUCN criteria (A–E) formalise this with quantitative thresholds for range, population size, decline rate and quantitative extinction probability. Extinction vortex: small populations suffer inbreeding depression, drift, Allee effects and environmental stochasticity that reinforce decline.
- **Fragmentation and edges.** Habitat loss is the primary driver; fragmentation adds edge effects (microclimate, windthrow, predation, invasive species), reduced connectivity and area effects. The matrix matters — a hostile matrix isolates patches more than a permeable one — and corridors increase movement and gene flow but also facilitate disease and invasion spread.
- **Extinction debt** means committed extinctions lag habitat loss; **climate velocity** (how fast isotherms move) predicts whether species can track suitable climate, and dispersal limitation, topography and fragmentation decide the answer. Invasive species, disease (amphibian chytrid, white-nose syndrome), overexploitation and pollution act synergistically with climate.

Trap: a species can be abundant and still at risk (passenger pigeon), and a small range is not necessarily vulnerable if the habitat is stable — abundance, range and trend must be read together.`
      },
      {
        heading: "Conservation genetics, protected areas and restoration practice",
        content: `- **Population viability.** Minimum viable population estimates come from population viability analysis (PVA), which models demographic and environmental stochasticity, catastrophes and genetics; the "50/500 rule" (50 for inbreeding, 500 for drift) is a heuristic now considered too low, with $N_e$ of thousands needed for long-term persistence. Recovery plans therefore target population size *and* connectivity.
- **Genetic management.** Captive breeding programmes need pedigree management to retain diversity and avoid adaptation to captivity; genetic rescue (immigrant alleles) can reverse inbreeding depression but risks outbreeding depression if populations are locally adapted. Seed banks and cryopreservation are insurance, not conservation.
- **Reserve design.** SLOSS (single large or several small) depends on species–area, edge and connectivity; the modern answer is a network with core areas, buffers, corridors and stepping stones, embedded in a permeable matrix. Zoning (no-take, multiple use), enforcement and local tenure are usually stronger determinants of outcomes than boundary geometry.
- **Restoration and rewilding.** Restoration ecology sets reference conditions and trajectories (assisted natural regeneration, soil amendment, nurse plants, hydrological repair); rewilding emphasises process, keystone species and self-organisation, accepting novel ecosystems. Success criteria must be explicit — composition, function, resilience or service delivery — because they differ.
- **Policy instruments** worth naming: the mitigation hierarchy (avoid, minimise, restore, offset), payments for ecosystem services, REDD+, the Kunming–Montreal Global Biodiversity Framework's 30×30 target, and the IUCN Red List categories. Monitoring and adaptive management are the difference between a plan and an outcome.

Trap: an offset that replaces an irreplaceable old-growth community with a planted one is not equivalent; equivalence requires like-for-like in composition, structure and function, which is why offsets are contested for high-value habitats.`
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
- **Round Dance**: Performed if food source is **close ($< 50-70\\text{ m}$)**. Indicates food presence and floral scent, but does not provide directional orientation.
- **Waggle Dance (Figure-Eight Dance)**: Performed if food source is **distant ($> 70-100\\text{ m}$)**:
  - Consists of a straight **waggle run** with abdomen vibrating, followed by alternating left and right semicircle returns.
  - **Direction Encoding**: The angle of the waggle run relative to **straight up (vertical gravity)** equals the angle between the food source and the **current position of the sun**! (e.g., a waggle run $30^\\circ$ to the right of vertical directs bees to fly $30^\\circ$ to the right of the sun's azimuth).
  - **Distance Encoding**: Duration of the waggle run is directly proportional to distance (approximately **1 second of waggle run $\\approx 1000\\text{ meters}$**).
  - **Resource Value**: Vigor and frequency of dancing reflect caloric sugar concentration.`
      },
      {
        heading: "4. Biological Rhythms & Circadian Clock Genetics",
        content: `Endogenous biological timekeeping oscillating with a period of $\\approx 24\\text{ hours}$:
- **Circadian Rhythms** persist under constant conditions (constant darkness, temperature compensation) and are synchronized (**entrained**) to the $24\\text{-hr}$ day by environmental cues (**Zeitgebers**, primarily light).
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
    id: "ethology-3-foraging-mating",
    domainId: "ethology",
    title: "Optimal Foraging, Mating Systems & Communication",
    subtitle: "Marginal value theorem, sexual selection, parental investment, honest signalling and biological rhythms",
    level: "USABO Finalist / IBO",
    xp: 130,
    estimatedMinutes: 22,
    prerequisites: ["ethology-1-kin-selection", "ethology-2-classical-behavior"],
    sources: ["Alcock: Animal Behavior Ch. 6-10, 12", "Davies, Krebs & West: An Introduction to Behavioural Ecology Ch. 4-8", "Campbell Ch. 51"],
    interactiveTool: null,
    summary: "IBO lists foraging, defensive behaviour, mating systems, parental care and biological rhythms as required ethology, none of which the app previously covered. This module covers economic decision rules in foraging, the logic of mating systems and sexual selection, honest signalling and mimicry, navigation and migration, and the circadian machinery behind biological rhythms.",
    keyFormulas: [
      { name: "Profitability", latex: "\\text{Profitability} = \\frac{E}{h} \\quad (E = \\text{energy gained}, h = \\text{handling time})" },
      { name: "Hamilton's Rule", latex: "rB > C" },
      { name: "Fisherian Sex Ratio", latex: "\\text{investment in sons} : \\text{daughters} = 1:1" }
    ],
        sections: [
      {
        heading: "Optimal foraging: currencies, patch models and functional responses",
        content: `Optimal foraging theory assumes that selection has tuned decisions to maximise a fitness currency (net energy gain, nutrient balance, or survival) subject to constraints (handling time, travel time, predation risk, digestive capacity).

- **Diet choice.** A prey type is included if it is profitable ($E/h$, energy over handling time) relative to the rate achievable by skipping it. The model predicts *no partial preferences*: items are either always taken or always ignored, and inclusion depends on the abundance of the most profitable alternatives — so a predator should drop a low-value prey from its diet when high-value prey become common. Real animals show partial preferences because of sampling, nutrient requirements and imperfect information.
- **Patch use: marginal value theorem.** A forager should leave a patch when its instantaneous return falls to the average return for the habitat (the marginal value equals the environment-wide rate). Predictions: patches are exploited longer when travel time between patches is longer, and giving-up density (GUD) is a standard field measure — higher GUD means the forager perceives higher costs (predation risk, missed opportunity).
- **Functional responses.** Holling type I (linear to a maximum), type II (decelerating, $aN/(1+ahN)$: handling time limits), type III (sigmoidal, switching and learning). Type III stabilises prey populations at low density because the predator's per-capita impact falls when prey are rare; type II can destabilise.
- **Distribution and risk.** The ideal free distribution predicts that competitors distribute so that intake equalises across patches (proportional to resources); the despotic distribution predicts that dominant individuals occupy the best patches and subordinates get less. Risk-sensitive foraging predicts preference for variance when mean intake is below a survival threshold and for certainty when above (the "daily energy budget rule"). Central-place foragers (bees, seabirds) maximise delivery rate rather than personal intake, which changes load-size optima.

Trap: optimality models are null models of *design*, not predictions of individual behaviour; the correct interpretation of a deviation is to identify the missing constraint (predation risk, toxin, nutrient limitation), not to declare the animal irrational.`
      },
      {
        heading: "Mating systems, parental investment and sexual conflict",
        content: `- **Anisogamy is the origin.** Large, nutrient-rich eggs versus small, motile sperm generate the asymmetry in potential reproductive rate that Trivers' parental investment theory explains: the sex investing more in offspring becomes a limiting resource, and the other sex competes for it. The Bateman gradient (reproductive success rising faster with mates for males) is the predicted consequence and holds in many, not all, systems.
- **Mating systems** map onto that asymmetry: monogamy (biparental care needed or mate guarding), polygyny (resource or female defence, leks), polyandry (sex-role reversal where males brood, as in jacanas and pipefish), promiscuity (scramble competition). Genetic monogamy is rare: extra-pair paternity is common in socially monogamous birds, so social and genetic mating systems must be distinguished — a favourite exam discrimination.
- **Parental investment and conflict.** Each parent benefits if the other invests more (Trivers' tug-of-war); the resolution depends on the cost of desertion and the options available (the "battle of the sexes"). Sexual conflict produces antagonistic coevolution: seminal fluid proteins that manipulate female receptivity, female counter-adaptations, and arms races in reproductive tracts.
- **Mate choice and competition.** Intrasexual selection (combat, sperm competition) and intersexual selection (choice) act together. **Sperm competition** favours larger ejaculates, longer sperm, mate guarding and copulatory plugs; **cryptic female choice** biases paternity after copulation. Alternative tactics (sneaker males, satellites, female mimicry) persist when their fitness equals that of the conventional tactic at equilibrium.
- **Costs of choice** include search time, predation risk and missed opportunities, which is why preferences are often threshold-based rather than maximising.

Trap: extra-pair paternity does not mean the social system is misdescribed; "monogamous" refers to the social bond, and both labels are needed to describe a population.`
      },
      {
        heading: "Sexual selection: runaway, good genes and honest signals",
        content: `- **Mechanisms of preference evolution.** Direct benefits (nuptial gifts, parental care, territory quality) are straightforward. Indirect benefits operate through offspring quality: **Fisher's runaway** produces self-reinforcing coevolution of preference and ornament until viability selection halts it; **Zahavi's handicap** proposes that costly ornaments are honest because only high-quality individuals can afford them (the immunocompetence handicap: testosterone raises ornament expression and suppresses immunity, so only resistant males can display fully); **sensory bias** proposes that preferences pre-exist as by-products of how sensory systems work (water mites, swordtails).
- **Honesty and condition.** Ornaments are condition-dependent, and fluctuating asymmetry is often (not always) higher in poor-condition individuals, making symmetry a candidate quality signal. The evidence for good-genes benefits is real but usually modest in magnitude, which is why the debate persists.
- **Runaway versus good genes are distinguishable**: runaway expects trait and preference to coevolve without a correlation to viability, good genes expect offspring viability benefits, and sensory bias expects the preference to exist before the ornament.
- **Post-copulatory selection** extends the same logic inside the female tract: sperm competition (lottery, displacement, incapacitation), cryptic female choice, and seminal fluid manipulation. In internally fertilising species, sexual selection continues after mating, which is why paternity is not determined by mating frequency alone.
- **Sexual conflict and speciation.** Divergent mate preferences can generate reproductive isolation rapidly (cichlid colour, *Drosophila* cuticular hydrocarbons), making sexual selection a speciation engine, not just a within-population process.

Trap: a costly ornament is not automatically a handicap — the handicap argument requires that the cost be *differentially* affordable, so a trait that is equally cheap for everyone conveys no information.`
      },
      {
        heading: "Social behaviour: kin selection, cooperation and communication",
        content: `- **Hamilton's rule:** altruism spreads when $rB > C$, where $r$ is relatedness, $B$ the benefit to the recipient and $C$ the cost to the actor. This reframes altruism as inclusive fitness and explains helping, alarm calling and sterile castes. Relatedness is computed by pedigree (full sibs $r = 0.5$, half sibs 0.25, haplodiploid sisters 0.75) but the relevant $r$ is the regression relatedness in the population, which is often lower than pedigree values.
- **Eusociality** requires overlapping generations, cooperative brood care and reproductive division of labour. Haplodiploidy (Hymenoptera) makes sisters unusually related, which helped explain female-biased worker castes, but termites are diploid and eusocial, and naked mole rats are eusocial mammals — so haplodiploidy is neither necessary nor sufficient. The ecological model (monogamy plus a defensible, long-lived nest plus dispersal risk) now explains more of the distribution.
- **Cooperation without kinship:** reciprocal altruism requires repeated interaction, recognition and enforcement (tit-for-tat, raiding in vampire bats); by-product mutualism needs no enforcement; punishment and partner choice stabilise cooperation in humans and cleaner-fish mutualisms. The prisoner's dilemma is the formal template, and the iterated version with noise explains why forgiveness (generous tit-for-tat) outperforms strict reciprocity.
- **Communication and signalling.** Signals evolve when both sender and receiver benefit; **honest signalling** is maintained by costs (handicap principle) or by indices that cannot be faked (body size, fundamental frequency). Referential alarm calls (vervet monkeys: eagle, leopard, snake) show semantic content; audience effects and eavesdropping show that signalling is strategic. Deceit (firefly femme fatale, cuckoo chicks) is predicted wherever receiver response can be exploited.
- **Social learning and culture** are documented in primates, cetaceans, birds and fish: transmission biases (conformist, prestige), teaching in meerkats and ants, and cumulative culture in humans and some birds. Culture can drive genetic change (gene–culture coevolution, lactase persistence) and is a mechanism of rapid adaptation.

Trap: "kin selection explains altruism" does not mean animals compute $r$; kin recognition by familiarity, phenotype matching or spatial cues is the proximate mechanism, and Hamilton's rule is the functional explanation — keep the two levels separate.`
      }
    ]
  },

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
  },

  // ==================== ADDED: IBO/USABO SYLLABUS GAP FILL (CELL BIOLOGY) ====================
  {
    id: "systematics-2-taxonomy-diversity",
    domainId: "biosystematics",
    title: "Taxonomy & the Diversity of Life: Prokaryotes to Vertebrates",
    subtitle: "Nomenclature, three domains, fungal and plant diversity, invertebrate phyla and vertebrate classes",
    level: "USABO Finalist / IBO",
    xp: 170,
    estimatedMinutes: 30,
    prerequisites: ["systematics-1-cladistics"],
    sources: ["Campbell Ch. 26-34", "Brusca & Brusca: Invertebrates Ch. 3-4", "Raven's Biology of Plants Ch. 12-20", "Alexopoulos: Introductory Mycology"],
    interactiveTool: null,
    summary: "IBO biosystematics requires recognising representative organisms of every major group and knowing their diagnostic features, which the app previously covered only through cladistic theory. This module covers taxonomic nomenclature, the three-domain framework with prokaryotic and fungal diversity, the plant clade transition from bryophytes to angiosperms, and the diagnostic body plans of the invertebrate phyla and vertebrate classes.",
    keyFormulas: [
      { name: "Binomial Nomenclature", latex: "\\textit{Genus species} \\; \\text{(italicised, genus capitalised, species lowercase)}" },
      { name: "Hierarchy", latex: "\\text{Domain} \\to \\text{Kingdom} \\to \\text{Phylum} \\to \\text{Class} \\to \\text{Order} \\to \\text{Family} \\to \\text{Genus} \\to \\text{Species}" }
    ],
        sections: [
      {
        heading: "Species concepts, delimitation and cryptic diversity",
        content: `- **Concepts.** Biological (reproductive isolation), morphological (diagnosable gaps), ecological (distinct niche), phylogenetic (reciprocally monophyletic), and genotypic cluster (distinct clusters in multilocus genotype space) each answer a different question; none is universally applicable (asexuals, fossils, hybridising taxa defeat the BSC, and recent divergence defeats reciprocal monophyly).
- **Delimitation in practice.** Integrative taxonomy combines morphology, DNA (COI barcoding, multilocus or genomic data), karyotype, ecology, behaviour and geography. Molecular delimitation methods (ABGD, GMYC, bPTP) partition trees into candidate species but are sensitive to sampling and to the model chosen, so they propose hypotheses, they do not certify species.
- **Cryptic diversity** is the rule rather than the exception in many taxa: what looked like one widespread species often resolves into several. This matters practically — conservation status of a "widespread" species can collapse once it is split, and disease vectors or crop pests may be species complexes with different ecologies.
- **DNA barcoding** uses a standard marker (COI for animals, *rbcL*/*matK* for plants, ITS for fungi) to assign unknown specimens to reference libraries. It works because intraspecific variation is usually much smaller than interspecific divergence (the barcode gap), and it fails when the gap is absent, when hybridisation is common, or when the library lacks close relatives. Metabarcoding extends the approach to whole communities from environmental DNA.
- **Hybridisation and introgression** blur species boundaries and can transfer adaptive alleles; some "species" are stable hybrid zones. The pragmatic test is whether the entities remain distinct where they co-occur (reproductive isolation in sympatry), which is the operational core of the BSC.

Trap: a single gene tree is not a species tree; incomplete lineage sorting and introgression both produce discordance, so delimitation requires multiple independent loci and, ideally, ecology or morphology.`
      },
      {
        heading: "Nomenclature, ranks and the logic of cladistic classification",
        content: `- **Nomenclature is a legal system, classification is a scientific hypothesis.** The ICZN (animals) and ICN (plants, algae, fungi) set rules: binomial names (genus + specific epithet, italicised), priority (the earliest valid name wins), typification (each name is anchored to a type specimen or type species), homonymy (the same name cannot be used twice in one kingdom) and synonymy (multiple names for one taxon, with the oldest valid name preferred). Authorship and year follow the name; a name in parentheses means the species was moved to a different genus after description.
- **Ranks** are Linnaean conveniences: domain, kingdom, phylum, class, order, family, genus, species, with optional prefixes (sub-, super-). Ranks are not comparable across taxa (a fish "order" and a mammal "order" are not equivalent ages), and many traditional groups are paraphyletic: Reptilia excluding birds, Pisces, Invertebrata, Protista and Dicotyledonae are all paraphyletic as traditionally used, which is why cladists either abandon them or redefine them (Reptilia including birds, "fish" replaced by specific clades).
- **Cladistic logic.** Only synapomorphies (shared derived characters) define groups; symplesiomorphies cannot, and homoplasy misleads. Monophyletic groups contain an ancestor and all descendants; paraphyletic groups exclude some descendants; polyphyletic groups unite convergences. Classification should mirror phylogeny, which is why molecular data reorganised everything from fungal taxonomy to mammalian orders.
- **PhyloCode** proposes naming clades without ranks (Pan, Aves, Mammalia as node- or branch-based definitions), but ranked nomenclature remains dominant in practice because of stability and legacy literature.
- **Practical naming issues** examiners exploit: a species name is not a description (it can be a person's name), a subspecies trinomial is legitimate, "sp." and "spp." are not italicised abbreviations for unnamed species, and sensu lato/sensu stricto distinguish broad and narrow usage after a split.

Trap: renaming a species because it moved genus does not change the specific epithet, and the original author goes in parentheses — a name's authority encodes its taxonomic history.`
      },
      {
        heading: "The tree of life: clades, body plans and the characters that define them",
        content: `- **Three domains** (Bacteria, Archaea, Eukarya) with eukaryotes emerging from within the Asgard archaeal lineage; the eukaryotic supergroups are Opisthokonta (animals, fungi, choanoflagellates), Archaeplastida (plants, green and red algae), SAR (stramenopiles, alveolates, rhizarians), Amoebozoa, and Excavata (a possibly paraphyletic assemblage).
- **Animal body-plan characters** used as synapomorphies: multicellularity with collagen and epithelia (Metazoa), true tissues and gastrulation (Eumetazoa), bilateral symmetry with three germ layers and cephalisation (Bilateria), a coelom and through-gut (varies), segmentation (Annelida, Arthropoda, Chordata independently). Sponges lack true tissues; cnidarians are diploblastic with radial symmetry; ctenophores are a separate early branch whose position remains contested.
- **Protostome split.** Ecdysozoa (moulting: nematodes, arthropods, tardigrades, onychophorans) is supported by molecular phylogeny and by ecdysis itself; Lophotrochozoa (molluscs, annelids, brachiopods, flatworms) is supported by a lophophore or trochophore larva in many members. This replaced the old coelom-based grouping — a classic example of a morphological character (coelom type) being homoplastic.
- **Deuterostomes** (echinoderms, hemichordates, chordates) share radial cleavage, enterocoely and the blastopore fate. Chordate synapomorphies: notochord, dorsal hollow nerve cord, pharyngeal slits, post-anal tail, endostyle/thyroid. Vertebrate innovations: vertebral column, cranial neural crest, bone, jaws (gnathostomes), limbs (tetrapods), amniotic egg (amniotes).
- **Plant and fungal clades.** Land plants: bryophytes (non-vascular), lycophytes, monilophytes (ferns), gymnosperms, angiosperms (with monocots and eudicots as major clades); the angiosperm synapomorphies include flowers, double fertilisation and triploid endosperm. Fungi: Chytridiomycota, Zygomycota/Mucoromycota, Ascomycota (sac fungi, lichens), Basidiomycota (mushrooms, rusts) — distinguished by sexual spore-bearing structures.
- **Reading a tree correctly:** proximity of tips means nothing; nodes are ancestors; branch length can encode time or change; rotating a node is not a change of relationship. "More evolved" is meaningless — every extant lineage has the same evolutionary age.

Trap: a group that lacks a trait is not automatically basal; loss is as common as gain, so "fish are less evolved" or "sponges are primitive" misreads the tree.`
      },
      {
        heading: "Measuring biodiversity: indices, eDNA and phylogeny in practice",
        content: `- **Counting diversity.** Species richness is the simplest and most sampling-dependent measure; rarefaction curves, Chao1 and coverage-based estimators standardise effort. Evenness measures (Pielou's $J$, Simpson's dominance) describe how abundance is partitioned; Shannon and Simpson differ in sensitivity to rare versus common species, so the index must match the question.
- **Beta diversity** quantifies turnover between sites (Jaccard, Sørensen for presence–absence; Bray–Curtis for abundance) and can be partitioned into replacement and nestedness components — turnover implies different assemblages, nestedness implies subsets, and the two demand different conservation responses.
- **Molecular biodiversity assessment** has transformed inventory: eDNA metabarcoding detects species from water or soil without capture (with false negatives from primer bias and false positives from contamination), and metagenomics adds functional potential. Reference database completeness is the limiting factor, not sequencing depth.
- **Phylogenetic diversity** measures the branch length spanned by a set of taxa, capturing evolutionary information that richness misses; EDGE scores combine evolutionary distinctiveness with extinction risk to prioritise species that are both unique and threatened. Phylogenetic clustering of a community indicates environmental filtering; overdispersion indicates competition — with the caveat that both signals can be produced by other processes.
- **Applications:** biosecurity (early detection of invasive species), fisheries stock identification, wildlife forensics, diet analysis from scats, pollinator networks, and monitoring restoration trajectories. The taxonomic impediment — too few experts and too many undescribed species — is the practical bottleneck, which is why DNA-based approaches and citizen science are complementary rather than substitutable.
- **Data infrastructure** matters: GBIF, GenBank, BOLD and museum collections are the record of biodiversity, and their gaps (tropical invertebrates, deep sea, microbes) bias every global estimate.

Trap: a metabarcoding read count is not an abundance measure; primer efficiency, gene copy number and DNA shedding rates all distort relative abundance, so presence is more reliable than proportion.`
      }
    ]
  }
];
