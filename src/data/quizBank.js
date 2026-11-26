// BioApex: USABO Finalist & IBO Gold Challenge Problem Sets
// High-yield, analytical questions modeled after USABO Semifinal Part B/C and IBO Theoretical Exams.

export const QUIZ_SETS = [
  {
    id: "quiz-biochem-kinetics",
    moduleId: "cell-1-kinetics",
    title: "USABO Finalist Challenge: Advanced Enzyme Kinetics & Bisubstrate Analysis",
    description: "Multi-step kinetic data evaluation, Lineweaver-Burk diagnostic plotting, and inhibitor identification.",
    questions: [
      {
        id: "q-kinetics-1",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `An investigator characterizes a novel cytosolic enzyme that converts substrate $S$ to product $P$ ($[E]_t = 2.0 \\times 10^{-8} \\text{ M}$). In the absence of inhibitors, kinetic measurements yield a Lineweaver-Burk equation of:
$$\\frac{1}{v_0} = 2.5 \\times 10^3 \\left( \\frac{1}{[S]} \\right) + 5.0 \\times 10^4$$
where $v_0$ is in $\\mu\\text{M} \\cdot \\text{s}^{-1}$ and $[S]$ is in $\\mu\\text{M}$.

When an inhibitor $I$ ($[I] = 50 \\; \\mu\\text{M}$) is introduced, the double reciprocal line becomes:
$$\\frac{1}{v_0} = 2.5 \\times 10^3 \\left( \\frac{1}{[S]} \\right) + 1.5 \\times 10^5$$

Which of the following statements correctly identifies the mode of inhibition and the apparent inhibition constant?`,
        options: [
          "Competitive inhibition with $K_I = 25 \\; \\mu\\text{M}$",
          "Uncompetitive inhibition with $K_I' = 25 \\; \\mu\\text{M}$",
          "Pure non-competitive inhibition with $K_I = 50 \\; \\mu\\text{M}$",
          "Mixed inhibition with $K_I = 100 \\; \\mu\\text{M}$ and $K_I' = 25 \\; \\mu\\text{M}$",
          "Uncompetitive inhibition with $K_I' = 50 \\; \\mu\\text{M}$"
        ],
        correctIndex: 1,
        explanation: `**Step-by-step Solution:**
1. **Analyze Lineweaver-Burk lines:**
   - Uninhibited: $\\text{Slope} = \\frac{K_m}{V_{\\max}} = 2.5 \\times 10^3$, $y$-intercept $= \\frac{1}{V_{\\max}} = 5.0 \\times 10^4 \\implies V_{\\max} = 2.0 \\times 10^{-5} \\; \\mu\\text{M}/\\text{s}$.
     $K_m = \\text{Slope} \\times V_{\\max} = (2.5 \\times 10^3)(2.0 \\times 10^{-5}) = 0.05 \\; \\mu\\text{M}$.
   - Inhibited: $\\text{Slope} = 2.5 \\times 10^3$, $y$-intercept $= \\frac{1}{V_{\\max}'} = 1.5 \\times 10^5$.
2. **Key Diagnostic Observation:**
   - The **slope remains identical** ($2.5 \\times 10^3$), meaning the lines are **strictly parallel**!
   - Parallel Lineweaver-Burk plots are the unambiguous hallmark of **uncompetitive inhibition**, where the inhibitor binds exclusively to the enzyme-substrate ($ES$) complex.
3. **Calculate $K_I'$:**
   - For uncompetitive inhibition: $y\\text{-intercept}' = \\frac{\\alpha'}{V_{\\max}} = \\alpha' \\times (5.0 \\times 10^4) = 1.5 \\times 10^5$.
   - $\\alpha' = \\frac{1.5 \\times 10^5}{5.0 \\times 10^4} = 3.0$.
   - By definition, $\\alpha' = 1 + \\frac{[I]}{K_I'}$.
   - $3.0 = 1 + \\frac{50 \\; \\mu\\text{M}}{K_I'} \\implies \\frac{50}{K_I'} = 2.0 \\implies K_I' = \\mathbf{25 \\; \\mu\\text{M}}$.

*Reference: Lehninger Principles of Biochemistry, 8th Ed., Chapter 6.*`
      },
      {
        id: "q-kinetics-2",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `An oligomeric allosteric enzyme displays sigmoidal kinetics with a Hill coefficient $n_H = 3.2$. The enzyme has 4 identical physical substrate-binding sites. Which of the following deductions is rigorously correct regarding this enzyme according to the MWC (Monod-Wyman-Changeux) and KNF (Koshland-Némethy-Filmer) models?`,
        options: [
          "The enzyme exhibits negative cooperativity, which is compatible only with the MWC model.",
          "The enzyme exhibits positive cooperativity; the maximum possible theoretical value of $n_H$ for this enzyme is 4.0.",
          "The enzyme cannot transition symmetrically between states, proving the MWC concerted model must be exclusively operating.",
          "The Hill coefficient indicates that exactly 3.2 molecules of substrate bind simultaneously to each individual tetramer.",
          "Addition of a positive allosteric effector will shift the substrate saturation curve to the right, increasing the apparent $K_{0.5}$."
        ],
        correctIndex: 1,
        explanation: `**Theoretical Deduction:**
- $n_H = 3.2 > 1$ denotes **positive cooperativity**.
- The Hill coefficient $n_H$ represents an empirical measure of cooperativity, not the physical number of binding sites ($n$).
- For any allosteric macromolecule with $n$ physical binding sites, the theoretical upper limit is $n_H = n$ (which occurs only if the binding were infinitely cooperative, like an all-or-none single step). For a tetramer ($n = 4$), $n_H \\le 4.0$.
- In the MWC model, negative cooperativity ($n_H < 1$) is mathematically impossible because the transition between R and T states preserves quaternary symmetry across all subunits. Only KNF accommodates negative cooperativity.

*Reference: Voet & Voet Biochemistry, 4th Ed., Chapter 10.*`
      }
    ]
  },

  {
    id: "quiz-chemiosmosis",
    moduleId: "cell-2-chemiosmosis",
    title: "USABO Finalist Challenge: Bioenergetics & Mitochondrial Respirometry",
    description: "Proton-motive force biophysics, c-ring subunit stoichiometry, and polarographic oxygen electrode traces.",
    questions: [
      {
        id: "q-pmf-1",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `Isolated rat liver mitochondria are suspended in a respiration buffer at $25^\\circ\\text{C}$ containing pyruvate, malate, and inorganic phosphate ($P_i$). The measured inner mitochondrial membrane potential is $\\Delta \\Psi = -168 \\text{ mV}$ (matrix negative) and the pH of the matrix is $7.85$, while the intermembrane space pH is $7.05$. 

Given $\\frac{2.303 RT}{F} \\approx 59.16 \\text{ mV}$ at $25^\\circ\\text{C}$, what is the total proton-motive force ($\\Delta p$) across the inner mitochondrial membrane, and what fraction of this driving force is contributed by the electrical membrane potential?`,
        options: [
          "$\\Delta p = 215.3 \\text{ mV}$; electrical potential contributes $\\approx 78\\%$",
          "$\\Delta p = 120.7 \\text{ mV}$; electrical potential contributes $\\approx 62\\%$",
          "$\\Delta p = 215.3 \\text{ mV}$; electrical potential contributes $\\approx 50\\%$",
          "$\\Delta p = 286.4 \\text{ mV}$; electrical potential contributes $\\approx 92\\%$",
          "$\\Delta p = 168.0 \\text{ mV}$; electrical potential contributes $100\\%$"
        ],
        correctIndex: 0,
        explanation: `**Step-by-step Solution:**
1. **Mitchell's Proton-Motive Force Formula:**
   $$\\Delta p = \\Delta \\Psi - \\frac{2.303 RT}{F} \\Delta \\text{pH}$$
   Where $\\Delta \\text{pH} = \\text{pH}_{\\text{matrix}} - \\text{pH}_{\\text{IMS}} = 7.85 - 7.05 = +0.80$.
2. **Calculate Chemical Gradient Term:**
   $$- 59.16 \\text{ mV} \\times (+0.80) = -47.33 \\text{ mV}$$.
3. **Calculate Total Magnitude of Driving Force:**
   $$\\Delta p = |-168 \\text{ mV}| + |-47.33 \\text{ mV}| = 168 + 47.33 = \\mathbf{215.33 \\text{ mV}}$$.
4. **Fraction Contributed by Electrical Membrane Potential ($\\Delta \\Psi$):**
   $$\\text{Fraction} = \\frac{168 \\text{ mV}}{215.33 \\text{ mV}} \\approx \\mathbf{78.0\\%}$$.
In animal mitochondria, $\\Delta \\Psi$ consistently accounts for $75-85\\%$ of the total proton-motive force, whereas in chloroplast thylakoids, $\\Delta \\text{pH}$ accounts for nearly $100\\%$.

*Reference: Alberts: Molecular Biology of the Cell, 6th Ed., Ch. 14.*`
      }
    ]
  },

  {
    id: "quiz-plant-physiology",
    moduleId: "plant-2-photochemistry",
    title: "USABO Finalist Challenge: Kok S-State OEC Clock & Kranz Anatomy",
    description: "Oxygen evolution flash yield analysis and C4 decarboxylase compartmentalization.",
    questions: [
      {
        id: "q-oec-1",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `A dark-adapted suspension of *Spinacia oleracea* thylakoid membranes is subjected to a sequence of single-turnover saturating light flashes (1 microsecond duration each) spaced 1 second apart while monitoring oxygen evolution with a Clark-type electrode. 

Oxygen evolution is observed to peak on Flash 3, and then on Flash 7, 11, and 15. If a mutant strain is isolated where all $Mn_4CaO_5$ clusters in PSII are chemically trapped in the $S_2$ state in the dark before the experiment begins, on which flash will the **FIRST peak of oxygen release** occur?`,
        options: [
          "Flash 1",
          "Flash 2",
          "Flash 3",
          "Flash 4",
          "Flash 5"
        ],
        correctIndex: 1,
        explanation: `**Kok S-State Cycle Deduction:**
1. In wild-type dark-adapted thylakoids, the ground state distribution is almost entirely $S_1$ (because $S_1$ is thermodynamically stable in the dark, whereas $S_2$ and $S_3$ slowly decay back to $S_1$, and $S_0$ is oxidized to $S_1$).
2. Oxygen ($O_2$) is released upon the transition from $[S_4] \\to S_0$:
   $$S_1 \\xrightarrow{\\text{flash 1}} S_2 \\xrightarrow{\\text{flash 2}} S_3 \\xrightarrow{\\text{flash 3}} [S_4] \\to S_0 + O_2$$
   Hence, in normal leaves, the first peak is observed on **Flash 3**!
3. In the mutant strain, all centers are pre-set in the **$S_2$ state**:
   $$S_2 \\xrightarrow{\\text{flash 1}} S_3 \\xrightarrow{\\text{flash 2}} [S_4] \\to S_0 + O_2$$
   Therefore, exactly **2 flashes** are required to reach $S_4$ and release the first molecule of $O_2$!

*Reference: Taiz & Zeiger: Plant Physiology and Development, 6th Ed., Chapter 7.*`
      }
    ]
  },

  {
    id: "quiz-animal-wiggers",
    moduleId: "animal-2-cardio",
    title: "USABO Finalist Challenge: Hemodynamics, PV Loops & Starling Fluid Flux",
    subtitle: "Cardiac Cycle Events, Inotropy/Preload/Afterload, and Capillary Forces",
    questions: [
      {
        id: "q-cardio-1",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `A 65-year-old male with calcific aortic stenosis undergoes left heart catheterization. Which of the following alterations in the left ventricular Pressure-Volume (PV) loop would be observed compared to a normal healthy adult?`,
        options: [
          "A widened PV loop with increased Stroke Volume and decreased peak systolic pressure.",
          "A taller and narrower PV loop with marked elevation in peak left ventricular systolic pressure, increased End-Systolic Volume (ESV), and decreased Stroke Volume.",
          "A rightward shift of the loop with increased End-Diastolic Volume (EDV) and decreased End-Systolic Volume (ESV).",
          "A downward shift of the End-Systolic Pressure-Volume Relationship (ESPVR) with unaltered peak aortic pressure.",
          "Immediate elevation of left ventricular pressure throughout diastole without change in afterload."
        ],
        correctIndex: 1,
        explanation: `**Hemodynamic Analysis of Aortic Stenosis:**
1. Aortic stenosis causes fixed mechanical obstruction to left ventricular outflow during systole, massively increasing left ventricular **afterload**.
2. To overcome the narrowed valve, the left ventricle must generate dramatically higher intraventricular pressures (often $> 200\\text{ mmHg}$ while aortic pressure remains normal or low). This extends the vertical line of isovolumetric contraction much higher.
3. Due to the high opposing afterload, ejection is curtailed and terminates prematurely, leaving a higher residual volume of blood in the chamber at the end of systole $\\to$ **increased ESV**.
4. Since Stroke Volume $SV = EDV - ESV$, Stroke Volume decreases $\\to$ the loop becomes **taller and narrower**!

*Reference: Vander's Human Physiology, 15th Ed., Ch. 12; Costanzo Physiology, 6th Ed., Ch. 3.*`
      }
    ]
  },

  {
    id: "quiz-genetics-linkage",
    moduleId: "genetics-1-mapping",
    title: "USABO Finalist Challenge: Three-Point Testcross & Interference",
    description: "Multi-gene recombination frequency, coefficient of coincidence, and map distance computation.",
    questions: [
      {
        id: "q-genetics-1",
        difficulty: "USABO Finalist / IBO",
        type: "single_choice",
        prompt: `A female Drosophila melanogaster heterozygous for three recessive mutations—*scute* bristles ($sc$), *echinus* eyes ($ec$), and *crossveinless* wings ($cv$)—is crossed with a homozygous recessive male ($sc \\, ec \\, cv \\, / \\, sc \\, ec \\, cv$). The 2000 testcross progeny are classified as follows:

| Phenotype | Count |
| :--- | :--- |
| $+ \\; + \\; +$ | 808 |
| $sc \\; ec \\; cv$ | 812 |
| $sc \\; + \\; +$ | 168 |
| $+ \\; ec \\; cv$ | 172 |
| $+ \\; + \\; cv$ | 18 |
| $sc \\; ec \\; +$ | 20 |
| $+ \\; ec \\; +$ | 1 |
| $sc \\; + \\; cv$ | 1 |
| **Total** | **2000** |

What is the correct gene order, the map distance between the two outer genes, and the genetic interference ($I$)?`,
        options: [
          "Gene order: $sc - ec - cv$; Total distance: $19.1\\text{ cM}$; Interference $I = 0.71$",
          "Gene order: $ec - sc - cv$; Total distance: $19.2\\text{ cM}$; Interference $I = 0.26$",
          "Gene order: $sc - ec - cv$; Total distance: $20.0\\text{ cM}$; Interference $I = 0.50$",
          "Gene order: $sc - cv - ec$; Total distance: $18.5\\text{ cM}$; Interference $I = 0.82$",
          "Gene order: $ec - sc - cv$; Total distance: $20.0\\text{ cM}$; Interference $I = 0.90$"
        ],
        correctIndex: 0,
        explanation: `**Step-by-step Solution:**
1. **Identify Parentals (NCO):**
   $+ \\; + \\; +$ (808) and $sc \\; ec \\; cv$ (812). Total $= 1620$.
2. **Identify Double Crossovers (DCO):**
   $+ \\; ec \\; +$ (1) and $sc \\; + \\; cv$ (1). Total $= 2$.
3. **Determine Middle Gene:**
   Compare DCO ($+ \\; ec \\; +$ and $sc \\; + \\; cv$) with Parentals ($+ \\; + \\; +$ and $sc \\; ec \\; cv$).
   The allele that is switched relative to the other two is **$ec$**!
   Therefore, the gene order is: **$sc - ec - cv$**.
4. **Distances, with each single-crossover class assigned to its correct interval:**
   - Crossover between $sc$ and $ec$ gives the $sc + +$ (168) and $+ \, ec \, cv$ (172) classes: $(340 + 2)/2000 = 17.1\text{ cM}$.
   - Crossover between $ec$ and $cv$ gives the $+ \, + \, cv$ (18) and $sc \, ec \, +$ (20) classes: $(38 + 2)/2000 = 2.0\text{ cM}$.
5. **Total map distance:** $17.1 + 2.0 = \mathbf{19.1\text{ cM}}$, with the map reading $sc$ --17.1-- $ec$ --2.0-- $cv$.
6. **Interference:**
   - Expected DCO $= 0.171 \times 0.020 \times 2000 = 6.8$.
   - Coefficient of coincidence $= 2/6.8 = 0.29$.
   - Interference $I = 1 - 0.29 = \mathbf{0.71}$: a crossover in the $sc$–$ec$ interval strongly suppresses a second crossover nearby.

*Reference: Pierce: Genetics - A Conceptual Approach, 7th Ed., Chapter 7.*`
      }
    ]
  }
];
