// BioApex: One hard unit test per exam area.
// These are written as USABO Semifinal Part B/C and IBO Theoretical style problems:
// multi-step calculations, experimental data interpretation, and the specific
// distinctions that separate a finalist score from a semifinalist score.
// Every item is independent of the checkpoint bank used inside lessons.

export const UNIT_TEST_SETS = {
  cell_bio: {
    title: "Cell Biology & Biochemistry — Unit Test",
    description: "Kinetics with inhibition, proton accounting, water potential, cell-cycle timing, fatty-acid ATP yield and respiratory poisons.",
    questions: [
      {
        id: "ut-cell-1",
        difficulty: "USABO Finalist",
        prompt: `An enzyme ($K_m = 0.2\\ \\mu\\text{M}$, $V_{max} = 50\\ \\mu\\text{mol}\\,\\text{s}^{-1}$) is assayed with and without an inhibitor at $[I] = 10\\ \\mu\\text{M}$. The Lineweaver-Burk fits are:

Uninhibited: $\\dfrac{1}{v} = 4.0 \\times 10^{3}\\,\\dfrac{1}{[S]} + 2.0 \\times 10^{4}$

Inhibited: $\\dfrac{1}{v} = 1.2 \\times 10^{4}\\,\\dfrac{1}{[S]} + 2.0 \\times 10^{4}$

Which statement is correct?`,
        options: [
          "Competitive inhibition with $K_I = 5\\ \\mu\\text{M}$",
          "Uncompetitive inhibition with $K_I' = 5\\ \\mu\\text{M}$",
          "Pure non-competitive inhibition with $K_I = 20\\ \\mu\\text{M}$",
          "Mixed inhibition with $\\alpha = 3$ and $\\alpha' = 3$",
          "Competitive inhibition with $K_I = 20\\ \\mu\\text{M}$"
        ],
        correctIndex: 0,
        explanation: `The y-intercept is identical ($2.0 \\times 10^4$ in both fits), so $V_{max}$ is unchanged: the inhibitor is overcome by substrate, which is competitive. The slope rises from $4.0 \\times 10^3$ to $1.2 \\times 10^4$, a factor of 3, so $\\alpha = 1 + [I]/K_I = 3$ and $K_I = [I]/(\\alpha - 1) = 10/2 = 5\\ \\mu\\text{M}$.\n\nNote the trap in option D: a mixed inhibitor with $\\alpha = \\alpha' = 3$ is *pure non-competitive*, and it would raise the intercept threefold. Here the intercept does not move, so that option is wrong twice over.`
      },
      {
        id: "ut-cell-2",
        difficulty: "IBO Theoretical",
        prompt: `Mammalian ATP synthase has an 8-subunit c-ring. Oxidising one NADH at the respiratory chain pumps 10 H⁺, and importing ADP and Pi costs 1 additional H⁺ equivalent per ATP exported. What is the ATP yield per NADH?`,
        options: [
          "2.7 ATP",
          "2.5 ATP",
          "3.0 ATP",
          "3.3 ATP",
          "2.0 ATP"
        ],
        correctIndex: 0,
        explanation: `Each 360° rotation of the c-ring transports 8 H⁺ and releases 3 ATP, so the synthase itself costs $8/3 = 2.67$ H⁺ per ATP. Adding the 1 H⁺ equivalent for adenine nucleotide and phosphate translocases gives 3.67 H⁺ per ATP.\n\n$10\\ \\text{H}^+ / 3.67\\ \\text{H}^+\\,\\text{per ATP} = 2.72$ ATP per NADH. The 2.5 figure comes from the older convention of a 10-subunit c-ring; with the real bovine ring of 8, the yield is slightly higher.`
      },
      {
        id: "ut-cell-3",
        difficulty: "USABO Finalist",
        prompt: `A flaccid plant cell has $\\Psi_s = -0.90\\ \\text{MPa}$ and $\\Psi_p = 0$. It is placed in a solution of $\\Psi_w = -0.45\\ \\text{MPa}$. What happens, and what is the turgor pressure at equilibrium?`,
        options: [
          "Water enters until $\\Psi_p = 0.45\\ \\text{MPa}$",
          "Water leaves until $\\Psi_p = 0\\ \\text{MPa}$",
          "Water enters until $\\Psi_p = 0.90\\ \\text{MPa}$",
          "No net movement, because the solute potential is unchanged",
          "Water enters until $\\Psi_s$ rises to $-0.45\\ \\text{MPa}$"
        ],
        correctIndex: 0,
        explanation: `The cell's initial water potential is $-0.90 + 0 = -0.90\\ \\text{MPa}$, which is lower (more negative) than the $-0.45\\ \\text{MPa}$ bathing solution, so water moves in down its gradient. Water potential rises as turgor builds; equilibrium requires $\\Psi_w(cell) = -0.45$.\n\n$-0.90 + \\Psi_p = -0.45 \\Rightarrow \\Psi_p = +0.45\\ \\text{MPa}$. Solute potential barely changes because the solute is not lost — only water is gained, so $\\Psi_s$ is treated as fixed here.`
      },
      {
        id: "ut-cell-4",
        difficulty: "IBO Theoretical",
        prompt: `Flow cytometry of an exponentially growing culture (doubling time 20 h) gives 60% of cells with 2N DNA, 25% with between 2N and 4N, and 15% with 4N. Assuming steady-state age distribution, how long is S phase?`,
        options: [
          "5 h",
          "3 h",
          "12 h",
          "8 h",
          "2.5 h"
        ],
        correctIndex: 0,
        explanation: `In an asynchronous exponential culture, the fraction of cells in a phase equals that phase's duration divided by the cell cycle length. S phase is the only interval with intermediate DNA content, and 25% of cells sit there.\n\n$0.25 \\times 20\\ \\text{h} = 5$ hours. G1 is $0.60 \\times 20 = 12$ h and G2/M is $0.15 \\times 20 = 3$ h; the three sum to the 20 h cycle, which is the consistency check.`
      },
      {
        id: "ut-cell-5",
        difficulty: "USABO Finalist",
        prompt: `Using $P/O$ ratios of 2.5 for NADH and 1.5 for FADH₂, what is the net ATP yield from complete β-oxidation and oxidation of one palmitate (C16:0)?`,
        options: [
          "106 ATP",
          "129 ATP",
          "108 ATP",
          "120 ATP",
          "96 ATP"
        ],
        correctIndex: 0,
        explanation: `Palmitate gives 7 rounds of β-oxidation: 7 FADH₂, 7 NADH and 8 acetyl-CoA. Two ATP equivalents are consumed in activation to palmitoyl-CoA.\n\n$7 \\times 1.5 = 10.5$; $7 \\times 2.5 = 17.5$; $8 \\times 10 = 80$ (each acetyl-CoA yields 3 NADH, 1 FADH₂ and 1 GTP). Total $= 10.5 + 17.5 + 80 - 2 = 106$ ATP. The classic 129 figure assumes the outdated 3 and 2 P/O ratios.`
      },
      {
        id: "ut-cell-6",
        difficulty: "IBO Theoretical",
        prompt: `Isolated mitochondria oxidising glutamate + malate show these O₂ consumption rates: (i) + ADP, 100%; (ii) + oligomycin, 15%; (iii) + oligomycin then 2,4-dinitrophenol, 110%; (iv) + cyanide, 2%. Which conclusion is fully supported?`,
        options: [
          "DNP collapses the proton gradient, so electron flow resumes without ATP synthesis",
          "DNP directly stimulates ATP synthase, so ATP synthesis resumes with respiration",
          "Oligomycin blocks electron transport itself, and DNP relieves that block",
          "Cyanide is an uncoupler that accelerates reverse electron flow",
          "The 15% residual rate proves substrate-level phosphorylation is the main ATP source"
        ],
        correctIndex: 0,
        explanation: `Oligomycin blocks the F₀ proton channel, so phosphorylation stops and back-pressure on the proton-motive force slows electron transport to 15%. DNP shuttles protons across the membrane, dissipating Δp without making ATP, so electron flow resumes at full rate while ATP synthesis stays at zero — the definition of uncoupling.\n\nCyanide blocks cytochrome oxidase (complex IV), which is why the rate collapses to 2%. The residual 15% is proton leak, not substrate-level phosphorylation.`
      }
    ]
  },

  plant_bio: {
    title: "Plant Anatomy & Physiology — Unit Test",
    description: "Xylem conductance after embolism, Calvin-cycle energy accounting, Rubisco competition, growth analysis, mineral deficiency diagnosis and stomatal closure.",
    questions: [
      {
        id: "ut-plant-1",
        difficulty: "USABO Finalist",
        prompt: `A stem's xylem conduits double in radius after a wet season, but a drought then embolises 20% of them. Ignoring end effects, by what factor does whole-stem hydraulic conductance change relative to the original intact stem?`,
        options: [
          "About 12.8×",
          "About 16×",
          "About 3.2×",
          "About 6.4×",
          "No change, because embolism does not affect conductance"
        ],
        correctIndex: 0,
        explanation: `Hagen-Poiseuille gives conductance per conduit proportional to $r^4$, so doubling the radius multiplies each conduit by 16. Losing 20% of conduits leaves 0.8 of them: $16 \\times 0.8 = 12.8$.\n\nThe exam point is that radius dominates everything: a 2× radius is worth more than a 2× increase in conduit number. Embolised conduits are out of circuit entirely, because gas-filled vessels cannot transmit tension.`
      },
      {
        id: "ut-plant-2",
        difficulty: "IBO Theoretical",
        prompt: `A chloroplast exports two triose phosphates to the cytosol per turn of the Calvin cycle while fixing CO₂. How many ATP and NADPH are consumed per two exported triose phosphates?`,
        options: [
          "18 ATP and 12 NADPH",
          "9 ATP and 6 NADPH",
          "12 ATP and 12 NADPH",
          "18 ATP and 18 NADPH",
          "15 ATP and 10 NADPH"
        ],
        correctIndex: 0,
        explanation: `Each CO₂ fixed costs 3 ATP and 2 NADPH. Exporting two triose phosphates requires fixing six CO₂ (six carbons out, six in), because one triose phosphate is three carbons.\n\n$6 \\times 3 = 18$ ATP and $6 \\times 2 = 12$ NADPH. The 9 : 6 ratio would fix only three CO₂, which is one triose phosphate — the classic off-by-three error.`
      },
      {
        id: "ut-plant-3",
        difficulty: "USABO Finalist",
        prompt: `At 25 °C a C₃ leaf has 21% O₂ and 0.04% CO₂ at Rubisco. A C₄ leaf concentrates CO₂ to 0.4% in its bundle-sheath cells at the same O₂. Treating the oxygenase : carboxylase ratio as proportional to [O₂]/[CO₂], what happens to photorespiration in the C₄ leaf?`,
        options: [
          "It falls about tenfold, because the CO₂/O₂ ratio at Rubisco rises tenfold",
          "It rises tenfold, because more CO₂ competes with O₂",
          "It is unchanged, because Rubisco kinetics do not depend on gas concentrations",
          "It stops completely, because C₄ plants lack Rubisco",
          "It doubles, because the C₄ pathway consumes ATP"
        ],
        correctIndex: 0,
        explanation: `Rubisco is bifunctional and the two substrates compete at one active site, so the oxygenase fraction tracks [O₂]/[CO₂]. Raising CO₂ tenfold at fixed O₂ divides that ratio by ten.\n\nC₄ plants still use Rubisco — they simply run the Calvin cycle in bundle-sheath cells where PEP carboxylase has pumped CO₂ up. That is why C₄ grasses keep near-maximal photosynthesis at high temperature, where C₃ photorespiration can consume a third of fixed carbon.`
      },
      {
        id: "ut-plant-4",
        difficulty: "IBO Theoretical",
        prompt: `A seedling grows from 2.0 g to 8.0 g dry mass in 10 days. What is its mean relative growth rate?`,
        options: [
          "$0.139\\ \\text{g}\\,\\text{g}^{-1}\\,\\text{d}^{-1}$",
          "$0.060\\ \\text{g}\\,\\text{g}^{-1}\\,\\text{d}^{-1}$",
          "$0.600\\ \\text{g}\\,\\text{g}^{-1}\\,\\text{d}^{-1}$",
          "$1.386\\ \\text{g}\\,\\text{g}^{-1}\\,\\text{d}^{-1}$",
          "$0.800\\ \\text{g}\\,\\text{g}^{-1}\\,\\text{d}^{-1}$"
        ],
        correctIndex: 0,
        explanation: `Relative growth rate is $RGR = (\\ln W_2 - \\ln W_1)/\\Delta t = \\ln(8/2)/10 = \\ln 4 / 10 = 1.386/10 = 0.139\\ \\text{d}^{-1}$.\n\nRGR is the correct measure because growth is exponential in time; absolute growth rate (0.6 g/day here) is size-dependent and cannot be compared between plants of different mass.`
      },
      {
        id: "ut-plant-5",
        difficulty: "USABO Finalist",
        prompt: `A crop shows interveinal chlorosis confined to the youngest leaves, while older leaves remain green. Which deficiency is most consistent?`,
        options: [
          "Iron, because it is phloem-immobile and cannot leave older tissue",
          "Nitrogen, because it is phloem-mobile and is withdrawn from old leaves",
          "Potassium, because it is needed for stomatal opening in leaves",
          "Magnesium, because it is the central atom of chlorophyll",
          "Phosphorus, because it is required for ATP synthesis"
        ],
        correctIndex: 0,
        explanation: `Symptoms in young leaves mean the plant cannot move the nutrient out of old tissue — the element is phloem-immobile (Fe, Ca, Mn, B). Iron is needed for chlorophyll synthesis and for thylakoid electron carriers, so new leaves yellow while old leaves keep their supply.\n\nNitrogen, potassium, magnesium and phosphorus are all mobile: deficiency shows first in *older* leaves as they are cannibalised to supply growing tissue.`
      },
      {
        id: "ut-plant-6",
        difficulty: "IBO Theoretical",
        prompt: `During drought, ABA closes stomata. Which sequence is correct?`,
        options: [
          "ABA \u2192 PYR/PYL inhibits PP2C \u2192 SnRK2 activates SLAC1 \u2192 K\u207a exits via GORK",
          "ABA \u2192 SLAC1 inhibits SnRK2 \u2192 K\u207a enters via inward rectifiers \u2192 guard cells swell",
          "ABA \u2192 H\u207a-ATPase activation \u2192 apoplast acidification \u2192 aquaporin closure",
          "ABA \u2192 Ca\u00b2\u207a entry into the vacuole \u2192 starch synthesis \u2192 osmotic potential rises"
        ],
        correctIndex: 0,
        explanation: `ABA binds PYR/PYL, which inhibits PP2C phosphatases; freed SnRK2 kinases phosphorylate the SLAC1 anion channel. Cl⁻ and malate leave, the membrane depolarises, and voltage-gated outward K⁺ channels (GORK) open, so K⁺ follows. Water leaves osmotically and the guard cell collapses.\n\nEvery distractor reverses a step: SLAC1 is downstream of SnRK2, and the H⁺-ATPase is *inhibited* by ABA rather than activated.`
      }
    ]
  },

  animal_phys: {
    title: "Animal Anatomy & Physiology — Unit Test",
    description: "Cardiac output and ejection fraction, renal clearance and net reabsorption, alveolar gas at altitude, K⁺ equilibrium potentials, thyroid labs and cross-bridge energetics.",
    questions: [
      {
        id: "ut-animal-1",
        difficulty: "USABO Finalist",
        prompt: `A patient has end-diastolic volume 120 mL, end-systolic volume 50 mL and a heart rate of 75 min⁻¹. What are the stroke volume, ejection fraction and cardiac output?`,
        options: [
          "70 mL, 58%, 5.25 L min⁻¹",
          "70 mL, 42%, 5.25 L min⁻¹",
          "50 mL, 58%, 3.75 L min⁻¹",
          "120 mL, 58%, 9.0 L min⁻¹",
          "70 mL, 70%, 5.25 L min⁻¹"
        ],
        correctIndex: 0,
        explanation: `$SV = EDV - ESV = 120 - 50 = 70$ mL. $EF = SV/EDV = 70/120 = 58\\%$, which is low-normal (normal 55–70%). $CO = HR \\times SV = 75 \\times 70 = 5250$ mL/min = 5.25 L/min.\n\nThe 42% option divides by ESV instead of EDV — a common slip. Ejection fraction is indexed to what filled the ventricle, so EDV is always the denominator.`
      },
      {
        id: "ut-animal-2",
        difficulty: "IBO Theoretical",
        prompt: `A substance has plasma concentration 1.0 mg/dL, urine concentration 100 mg/dL and urine flow 1.0 mL/min. GFR is 125 mL/min. What is its clearance and its net tubular handling?`,
        options: [
          "100 mL/min, net reabsorption of 25 mg/min",
          "100 mL/min, net secretion of 25 mg/min",
          "125 mL/min, no net transport",
          "10 mL/min, net reabsorption of 115 mg/min",
          "1000 mL/min, net reabsorption of 900 mg/min"
        ],
        correctIndex: 0,
        explanation: `Clearance $C = (U \\times V)/P = (100 \\times 1.0)/1.0 = 100$ mL/min. Filtered load $= GFR \\times P = 125 \\times 1.0 = 125$ mg/min; excreted $= U \\times V = 100$ mg/min.\n\nSince excretion is less than the filtered load, the tubule reabsorbs the difference: 25 mg/min. Clearance below GFR always means net reabsorption; clearance above GFR (like PAH) means net secretion.`
      },
      {
        id: "ut-animal-3",
        difficulty: "USABO Finalist",
        prompt: `At 3,000 m a climber breathes $F_I O_2 = 0.15$ with $P_{atm} = 700$ mmHg, $P_{a}CO_2 = 30$ mmHg and R = 0.8. What is alveolar $P O_2$?`,
        options: [
          "About 60 mmHg",
          "About 70 mmHg",
          "About 80 mmHg",
          "About 95 mmHg",
          "About 45 mmHg"
        ],
        correctIndex: 0,
        explanation: `Alveolar gas equation: $P_A O_2 = (P_{atm} - P_{H_2O}) F_I O_2 - P_aCO_2/R = (700 - 47)(0.15) - 30/0.8 = 97.95 - 37.5 = 60.5$ mmHg.\n\nHyperventilation lowers $P_aCO_2$ and therefore protects alveolar oxygen, but it cannot fix the low inspired $P O_2$ produced by low barometric pressure. Note the water-vapour subtraction (47 mmHg) is mandatory — forgetting it is the most common error in this calculation.`
      },
      {
        id: "ut-animal-4",
        difficulty: "IBO Theoretical",
        prompt: `Using $E_K = 61 \\log([K^+]_o/[K^+]_i)$, what happens to the K⁺ equilibrium potential when plasma K⁺ rises from 3.5 to 7.0 mM with $[K^+]_i = 140$ mM?`,
        options: [
          "It depolarises by about 18 mV, from −98 to −80 mV",
          "It hyperpolarises by about 18 mV, from −80 to −98 mV",
          "It is unchanged, because the Na⁺/K⁺ pump holds the gradient",
          "It depolarises by about 3 mV",
          "It reverses to a positive value"
        ],
        correctIndex: 0,
        explanation: `$61 \\log(3.5/140) = 61 \\times (-1.602) = -97.7$ mV; $61 \\log(7.0/140) = 61 \\times (-1.301) = -79.4$ mV. Doubling external K⁺ shifts the potential by $61 \\log 2 \\approx 18$ mV in the depolarising direction.\n\nBecause the resting membrane is K⁺-dominated, the resting potential follows E_K closely, so hyperkalaemia depolarises cells and inactivates Na⁺ channels — the mechanism of hyperkalaemic cardiac arrest.`
      },
      {
        id: "ut-animal-5",
        difficulty: "USABO Finalist",
        prompt: `A patient has fatigue, cold intolerance and weight gain. Labs: free T₄ low, TSH markedly elevated, thyroid peroxidase antibodies positive. What is the diagnosis and the state of the hypothalamic-pituitary axis?`,
        options: [
          "Primary hypothyroidism; TRH and TSH rise because feedback is lost",
          "Secondary hypothyroidism; TSH is low because the pituitary has failed",
          "Graves disease; TSH is elevated because of stimulating antibodies",
          "Euthyroid sick syndrome; TSH is elevated by the illness itself",
          "Tertiary hypothyroidism; the defect lies in the hypothalamus"
        ],
        correctIndex: 0,
        explanation: `Low free T₄ with a high TSH localises the defect to the thyroid itself — the pituitary is working hard and failing to raise output, so feedback is intact but the gland cannot respond. Positive TPO antibodies make Hashimoto thyroiditis the cause.\n\nIn secondary (pituitary) or tertiary (hypothalamic) hypothyroidism, TSH would be low or inappropriately normal. In Graves disease, TSH is suppressed because the gland is overproducing hormone.`
      },
      {
        id: "ut-animal-6",
        difficulty: "IBO Theoretical",
        prompt: `During a single cross-bridge cycle in skeletal muscle, how many ATP molecules are consumed, and which step uses them?`,
        options: [
          "One ATP: hydrolysis primes the head, Pi release powers the stroke, ATP binding detaches",
          "Two ATP: one for the power stroke, one for Ca\u00b2\u207a reuptake into the sarcoplasmic reticulum",
          "One ATP: hydrolysed by actin during the power stroke",
          "Three ATP: one each for attachment, power stroke and detachment",
          "No ATP: the power stroke is driven by the Ca\u00b2\u207a gradient"
        ],
        correctIndex: 0,
        explanation: `A cycle consumes one ATP at the myosin head: hydrolysis to ADP + Pi cocks the head (recovery stroke), Pi release strengthens binding and drives the power stroke, and binding of a fresh ATP detaches myosin from actin.\n\nCa²⁺ reuptake by SERCA is a separate ATP cost paid per calcium ion transported, not per cross-bridge cycle. Rigor mortis occurs precisely because no ATP is available to detach the heads.`
      }
    ]
  },

  genetics: {
    title: "Genetics & Molecular Evolution — Unit Test",
    description: "Three-point cross with interference, selection dynamics, chi-square testing, epistasis ratios, operon logic and nondisjunction.",
    questions: [
      {
        id: "ut-gen-1",
        difficulty: "USABO Finalist",
        prompt: `A testcross of ABC/abc gives 1,015 progeny: ABC 355, abc 345, Abc 70, aBC 65, ABc 85, abC 80, AbC 8, aBc 7. What are the A–B and B–C distances and the interference?`,
        options: [
          "14.8 cM and 17.7 cM; interference ≈ 0.44",
          "14.8 cM and 17.7 cM; interference ≈ 0.56",
          "8.1 cM and 9.6 cM; interference ≈ 0.44",
          "12.5 cM and 15.2 cM; interference ≈ 0.20",
          "14.8 cM and 17.7 cM; interference = 1.0"
        ],
        correctIndex: 0,
        explanation: `Parentals are ABC and abc; double crossovers are AbC and aBc (the rarest pair).\n\nA–B recombinants $= 70 + 65 + 8 + 7 = 150 \\Rightarrow 150/1015 = 14.8\\%$. B–C recombinants $= 85 + 80 + 8 + 7 = 180 \\Rightarrow 17.7\\%$.\n\nExpected DCO $= 0.148 \\times 0.177 \\times 1015 = 26.6$; observed $= 15$. Coefficient of coincidence $= 15/26.6 = 0.56$, so interference $= 1 - 0.56 = 0.44$. Positive interference means crossovers suppress nearby crossovers.`
      },
      {
        id: "ut-gen-2",
        difficulty: "IBO Theoretical",
        prompt: `A recessive allele is lethal before reproduction in homozygotes ($w_{aa} = 0.4$), while AA and Aa have equal fitness ($w = 1$). If $q = 0.40$ now, what is $q$ after one generation?`,
        options: [
          "0.34",
          "0.40",
          "0.31",
          "0.24",
          "0.36"
        ],
        correctIndex: 0,
        explanation: `Mean fitness $\\bar{w} = p^2(1) + 2pq(1) + q^2(0.4) = 0.36 + 0.48 + 0.064 = 0.904$.\n\nAllele frequency after selection: $q' = \\dfrac{pq + q^2 w_{aa}}{\\bar{w}} = \\dfrac{(0.6)(0.4) + 0.16(0.4)}{0.904} = \\dfrac{0.304}{0.904} = 0.336 \\approx 0.34$.\n\nBecause aa is only partly unfit (0.4), q decays slowly and equilibrium is q = 0 only asymptotically. Complete lethality ($w_{aa} = 0$) would give $q' = q/(1+q) = 0.29$.`
      },
      {
        id: "ut-gen-3",
        difficulty: "USABO Finalist",
        prompt: `A monohybrid F₂ gives 787 dominant : 213 recessive out of 1,000. What is χ² (3:1 expectation) and the correct conclusion at df = 1?`,
        options: [
          "\u03c7\u00b2 \u2248 7.3, so 3:1 is rejected (critical value 3.84)",
          "\u03c7\u00b2 \u2248 3.7, so the 3:1 ratio is accepted",
          "\u03c7\u00b2 \u2248 1.8, so the 3:1 ratio is accepted",
          "\u03c7\u00b2 \u2248 14.6, so the ratio is rejected",
          "\u03c7\u00b2 cannot be computed without knowing the sample variance"
        ],
        correctIndex: 0,
        explanation: `Expected 750 : 250. $\\chi^2 = (787-750)^2/750 + (213-250)^2/250 = 1369/750 + 1369/250 = 1.825 + 5.476 = 7.30$.\n\nWith df = 1 the 5% critical value is 3.84, so 7.30 is rejected. The deviation is on the excess-dominant side, which usually signals genotyping error, differential viability of recessives, or an ascertainment bias rather than a violation of Mendel's law itself.`
      },
      {
        id: "ut-gen-4",
        difficulty: "IBO Theoretical",
        prompt: `Two pure white-flowered lines are crossed; all F₁ are purple. The F₂ is 9 purple : 7 white. What is the genetic interpretation?`,
        options: [
          "Two loci in one pathway: purple needs a dominant allele at both",
          "One locus with incomplete dominance between two alleles",
          "Duplicate dominant epistasis, where one dominant allele is enough",
          "Recessive epistasis producing a 9:3:4 ratio",
          "Two independently assorting loci with no interaction"
        ],
        correctIndex: 0,
        explanation: `The 9:7 ratio is the signature of complementary gene action: A_B_ is coloured (9/16) and every other class — A_bb, aaB_, aabb — is white (7/16). Each parental line supplies a dominant allele the other lacks, which is why F₁ is coloured and F₂ segregates 9:7.\n\nCompare with recessive epistasis (9:3:4), where one locus masks the other only when homozygous recessive, and duplicate dominance (15:1), where a single dominant allele at either locus suffices.`
      },
      {
        id: "ut-gen-5",
        difficulty: "USABO Finalist",
        prompt: `E. coli is shifted into medium with 10 mM glucose and 10 mM lactose. Which description of the lac operon is correct during the first phase of growth?`,
        options: [
          "Basal: cAMP is low, CAP cannot activate, and inducer exclusion keeps lactose out",
          "Maximal transcription: lactose inactivates LacI and glucose raises cAMP",
          "No transcription at all: LacI binds the operator and blocks RNA polymerase completely",
          "Constitutive transcription: the operon escapes both controls",
          "Transcription is high but translation is blocked by glucose"
        ],
        correctIndex: 0,
        explanation: `The lac operon needs two conditions: relief of repression (lactose → allolactose binds LacI) and activation (cAMP–CAP bound to the promoter). Glucose lowers cAMP via phosphotransferase-system signalling and also causes inducer exclusion, so lactose is not even imported.\n\nTranscription is therefore basal — leaky, not zero, because LacI repression is never absolute. Only after glucose is exhausted does cAMP rise, CAP bind, and diauxic switch to lactose.`
      },
      {
        id: "ut-gen-6",
        difficulty: "IBO Theoretical",
        prompt: `A boy with Klinefelter syndrome (47, XXY) has two maternal X chromosomes and one paternal Y. He is heterozygous at the X-linked G6PD locus, carrying a different maternal allele on each of his two X chromosomes. At which meiotic division did the error occur, and in which parent?`,
        options: [
          "Maternal meiosis I, producing an XX egg that was fertilised by a Y sperm",
          "Paternal meiosis II, producing an XY sperm",
          "Paternal meiosis I, producing an XY sperm",
          "Maternal meiosis II, producing an XX egg, but only if the sperm was X-bearing",
          "A mitotic error after fertilisation cannot be excluded"
        ],
        correctIndex: 0,
        explanation: `Two maternal X's means the egg carried both X chromosomes, so the error was maternal — the sperm contributed only the Y.\n\nThe heterozygosity is the decisive evidence: the two X's in the egg are different homologues, and homologues are the partners that separate at meiosis I. A meiosis II error would have separated sister chromatids, which are identical apart from crossing over, so it would have produced an egg homozygous at G6PD (barring a crossover between the locus and the centromere). The standard interpretation is therefore maternal meiosis I nondisjunction.\n\nPaternal errors are excluded because a paternal XY sperm would give one maternal and one paternal X, and paternal XX sperm would give two paternal X's.`
      }
    ]
  },

  ecology: {
    title: "Ecology & Demography — Unit Test",
    description: "Life-table arithmetic, logistic growth, competition coefficients, trophic transfer, species-area loss and mark-recapture.",
    questions: [
      {
        id: "ut-eco-1",
        difficulty: "USABO Finalist",
        prompt: `A cohort life table gives survival $l_x$ = 1.0, 0.8, 0.5, 0.2 at ages 0–3 and fecundity $m_x$ = 0, 2, 3, 1 at those same ages. What is the net reproductive rate $R_0$?`,
        options: [
          "3.3",
          "2.0",
          "6.0",
          "1.0",
          "4.1"
        ],
        correctIndex: 0,
        explanation: `$R_0 = \\sum l_x m_x = (1.0 \\times 0) + (0.8 \\times 2) + (0.5 \\times 3) + (0.2 \\times 1) = 0 + 1.6 + 1.5 + 0.2 = 3.3$.\n\n$R_0 > 1$ means the cohort replaces itself 3.3-fold per generation, so the population grows. Multiplying $l_x$ by $m_x$ at each age (rather than summing $m_x$) is what accounts for the probability of surviving to breed.`
      },
      {
        id: "ut-eco-2",
        difficulty: "IBO Theoretical",
        prompt: `A population grows logistically with $r = 0.4\\ \\text{yr}^{-1}$, $K = 1000$ and current $N = 250$. What is $dN/dt$?`,
        options: [
          "75 individuals per year",
          "100 individuals per year",
          "300 individuals per year",
          "50 individuals per year",
          "0, because the population is below K"
        ],
        correctIndex: 0,
        explanation: `$dN/dt = rN(1 - N/K) = 0.4 \\times 250 \\times (1 - 0.25) = 0.4 \\times 250 \\times 0.75 = 75$ per year.\n\nGrowth is fastest at $K/2 = 500$; at N = 250 the population is in the accelerating phase, so the realised rate (0.3 per capita) is below the intrinsic r of 0.4. Option B forgets the density-dependent term entirely.`
      },
      {
        id: "ut-eco-3",
        difficulty: "USABO Finalist",
        prompt: `Two species compete. $K_1 = 200$, $K_2 = 100$, $\\alpha_{12} = 1.5$, $\\alpha_{21} = 0.4$. What is the predicted outcome?`,
        options: [
          "Stable coexistence, each species limits itself more",
          "Species 1 excludes species 2",
          "Species 2 excludes species 1",
          "Either species may win depending on starting conditions",
          "Neither species can persist"
        ],
        correctIndex: 0,
        explanation: `Coexistence requires $K_1 > \\alpha_{12}K_2$ and $K_2 > \\alpha_{21}K_1$. Here $200 > 1.5 \\times 100 = 150$ ✓ and $100 > 0.4 \\times 200 = 80$ ✓, so both isoclines cross in a stable equilibrium.\n\nBiologically, each species suppresses its own growth more than it suppresses its competitor's, which is the condition for coexistence. If either inequality failed, the better competitor would exclude the other.`
      },
      {
        id: "ut-eco-4",
        difficulty: "IBO Theoretical",
        prompt: `A grassland fixes 50,000 kcal of net primary production in a year. With 10% transfer efficiency at each step, how much energy reaches the tertiary consumer?`,
        options: [
          "50 kcal",
          "500 kcal",
          "5,000 kcal",
          "5 kcal",
          "500,000 kcal"
        ],
        correctIndex: 0,
        explanation: `Primary consumers receive 5,000 kcal, secondary consumers 500 kcal, tertiary consumers 50 kcal — three 10% transfers.\n\nLindeman's efficiency multiplies consumption, assimilation and production efficiencies, so real values are often nearer 5–10% for ectotherms and 1–3% for endotherms. This steep loss is why food chains rarely exceed four or five links.`
      },
      {
        id: "ut-eco-5",
        difficulty: "USABO Finalist",
        prompt: `Using $S = cA^z$ with $z = 0.25$, what fraction of species is expected to be lost if 90% of a habitat's area is destroyed?`,
        options: [
          "About 44%",
          "About 10%",
          "About 90%",
          "About 25%",
          "About 56%"
        ],
        correctIndex: 0,
        explanation: `Remaining area is 0.1 of the original, so $S_{new}/S_{old} = 0.1^{0.25} = 0.562$, i.e. 56% of species survive and about 44% are lost.\n\nThis is the arithmetic behind the "half the species for a tenth of the area" rule of thumb. The z value matters: continental z ≈ 0.15 gives a smaller predicted loss than island z ≈ 0.25–0.35.`
      },
      {
        id: "ut-eco-6",
        difficulty: "IBO Theoretical",
        prompt: `In a closed population, 40 animals are marked and released. A later sample of 50 contains 8 marked individuals. What is the Lincoln-Petersen estimate, and which assumption matters most?`,
        options: [
          "250; closed population and marks must not affect recapture",
          "400 individuals; births must exceed deaths during the study",
          "100 individuals; the second sample must be larger than the first",
          "250 individuals; marked animals must be removed after sampling",
          "64 individuals; the ratio of marked to unmarked must equal 1"
        ],
        correctIndex: 0,
        explanation: `$N = (M \\times C)/R = (40 \\times 50)/8 = 250$.\n\nThe estimate assumes a closed population (no births, deaths, immigration or emigration between samples), equal catchability, and that marks neither attract nor deter recapture. Violating equal catchability — trap-happy or trap-shy animals — biases the estimate, which is why the method is repeated and why programmes use model-based estimators for open populations.`
      }
    ]
  },

  ethology: {
    title: "Ethology (Animal Behavior) — Unit Test",
    description: "Inclusive fitness arithmetic, hawk-dove equilibrium, optimal patch residence, ideal free distribution, sexual selection and reciprocal altruism.",
    questions: [
      {
        id: "ut-eth-1",
        difficulty: "USABO Finalist",
        prompt: `A worker bee can raise 2 of her own offspring ($r = 0.5$) or invest the same effort in raising 3 full sisters ($r = 0.75$). By Hamilton's rule, and given haplodiploidy, which is favoured?`,
        options: [
          "Helping: 2.25 gene copies versus 1.0 for own offspring",
          "Reproducing: direct fitness always outweighs indirect fitness",
          "They are equal, because the effort is the same",
          "Helping: because sisters share 100% of their genes",
          "Neither: Hamilton's rule does not apply to haplodiploid species"
        ],
        correctIndex: 0,
        explanation: `Inclusive fitness gain from helping is $r \\times B = 0.75 \\times 3 = 2.25$; from reproducing it is $0.5 \\times 2 = 1.0$. Helping wins decisively.\n\nThe 0.75 relatedness arises because full sisters share 100% of their paternal genes (father is haploid) and 50% of their maternal genes, giving $0.5 + 0.25 = 0.75$. Sister–brother relatedness is only 0.25, which is why workers favour sisters over brothers.`
      },
      {
        id: "ut-eth-2",
        difficulty: "IBO Theoretical",
        prompt: `In a hawk-dove game the resource is worth $V = 10$ and the cost of an escalated fight is $C = 14$. At the mixed-strategy equilibrium, what proportion of the population plays hawk?`,
        options: [
          "About 0.71",
          "About 0.29",
          "About 0.50",
          "About 0.14",
          "About 1.00"
        ],
        correctIndex: 0,
        explanation: `At equilibrium the payoffs to hawk and dove must be equal, which gives hawk frequency $p = V/C = 10/14 = 0.714$.\n\nWhen the cost of fighting is high relative to the prize, hawks are rare, because escalation is unprofitable. If C were less than V, the pure hawk strategy would be an ESS and p would be 1 — this is why the model predicts more escalation when contests are cheap.`
      },
      {
        id: "ut-eth-3",
        difficulty: "USABO Finalist",
        prompt: `A bird forages in patches and travels 5 min between them. According to the marginal value theorem, if travel time increases to 20 min, the optimal patch residence time`,
        options: [
          "increases: habitat average falls, so patches are exploited longer",
          "decreases, because the bird must visit more patches",
          "stays the same, because within-patch gain curves do not change at all",
          "becomes zero, because travel is too costly",
          "increases only if patches contain more prey than average"
        ],
        correctIndex: 0,
        explanation: `The forager should leave when the marginal capture rate falls to the habitat average, which already includes travel. Longer travel lowers that average, so the marginal rate takes longer to fall to it — the bird stays longer per patch.\n\nThis is the model's counter-intuitive prediction: costly travel makes animals *more* persistent in patches, not less. Only the within-patch gain curve shifts the leaving point, not the number of patches visited.`
      },
      {
        id: "ut-eth-4",
        difficulty: "IBO Theoretical",
        prompt: `In a free-living population of insect parasitoids, individuals can move freely among host patches of different quality. What distribution does the ideal free distribution predict?`,
        options: [
          "Numbers proportional to resource share, equal per-capita intake",
          "All individuals in the richest patch, because it has most resources",
          "Random distribution, independent of patch quality",
          "Equal numbers in every patch regardless of quality",
          "A stable territorial system with no movement between patches"
        ],
        correctIndex: 0,
        explanation: `If animals can assess patch quality and move without cost, competitors depress each patch's value until payoffs are equal; equilibrium numbers therefore track resource share. A patch holding 30% of resources holds about 30% of foragers.\n\nThe model fails when animals cannot assess quality, when travel is costly, or when interference makes payoffs decline faster than proportional — then the distribution is under-matched to resources.`
      },
      {
        id: "ut-eth-5",
        difficulty: "USABO Finalist",
        prompt: `In a species where males invest only gametes and females invest gametes plus gestation and lactation, which pattern does sexual selection theory predict?`,
        options: [
          "Males compete, females choose: male success varies more",
          "Females compete and males choose, because eggs are larger",
          "Neither sex competes, because both invest in offspring",
          "Both sexes compete equally, since relatedness is symmetrical",
          "Males choose, because sperm are cheaper to produce"
        ],
        correctIndex: 0,
        explanation: `Bateman's principle and Trivers' parental-investment theory: the sex with the smaller obligatory investment is limited by access to mates, so its reproductive success varies more and sexual selection acts more strongly on it. That sex competes; the higher-investing sex is the limiting resource and therefore chooses.\n\nSex-role reversal (pipefish, jacanas) confirms the logic: when males bear the investment, males choose and females compete.`
      },
      {
        id: "ut-eth-6",
        difficulty: "IBO Theoretical",
        prompt: `Two unrelated birds repeatedly interact in a prisoner's dilemma. Under what conditions can reciprocal altruism be evolutionarily stable?`,
        options: [
          "When future interaction is likely and cheating can be punished",
          "Whenever the immediate benefit of defection exceeds the cost of helping",
          "Only between close relatives with r > 0.5",
          "Only when one individual is larger and can enforce cooperation",
          "Never, because unrelated individuals cannot share genes"
        ],
        correctIndex: 0,
        explanation: `Reciprocity pays only when the shadow of the future is long: repeated interactions make the discounted future benefit of cooperation exceed the one-off gain from cheating. Detection and retaliation (tit-for-tat, punishment) are what make cheating unprofitable.\n\nKin selection does not apply here because r ≈ 0, which is exactly why reciprocity requires repeated interaction rather than relatedness.`
      }
    ]
  },

  biosystematics: {
    title: "Biosystematics & Biodiversity — Unit Test",
    description: "Molecular clock dating, parsimony scoring, clade terminology, nomenclatural rules, phylum diversity and bootstrap interpretation.",
    questions: [
      {
        id: "ut-bio-1",
        difficulty: "USABO Finalist",
        prompt: `Cytochrome b sequences differ by 9% between two sister species. If the calibrated divergence rate is 2% per million years, what is the estimated divergence time?`,
        options: [
          "4.5 million years",
          "18 million years",
          "9 million years",
          "2.25 million years",
          "0.45 million years"
        ],
        correctIndex: 0,
        explanation: `$t = d/(2r)$ if the 2% figure is a per-lineage rate, or $t = d/r$ if it is the pairwise (both lineages combined) rate. With a pairwise rate of 2% per Myr: $9/2 = 4.5$ Myr.\n\nMolecular clocks assume roughly constant substitution rates, which is why calibration with fossils or biogeographic events matters, and why clock-like rates vary among genes and lineages.`
      },
      {
        id: "ut-bio-2",
        difficulty: "IBO Theoretical",
        prompt: `The tree ((A,B),(C,D)) is evaluated with these characters: 1 = present in A and C; 2 = present in B and C; 3 = present in A, B, C and D. How many steps does this tree require, and which character is homoplasious?`,
        options: [
          "Five steps; characters 1 and 2 are homoplasious",
          "Three steps; no character is homoplasious",
          "Four steps; only character 3 is homoplasious",
          "Six steps; all three characters are homoplasious",
          "Five steps; character 3 is homoplasious"
        ],
        correctIndex: 0,
        explanation: `Character 1 links A and C, which sit in different clades on this tree, so it needs two origins (2 steps). Character 2 links B and C, also across clades (2 steps). Character 3 is present in all four taxa and can be explained as a single ancestral origin (1 step).\n\nTotal = 5 steps. Parsimony prefers the tree with fewer steps, so a tree that groups A with C (or B with C) would score better on these data — that is exactly how characters vote for topology.`
      },
      {
        id: "ut-bio-3",
        difficulty: "USABO Finalist",
        prompt: `Which statement about "fish" as a taxonomic group is correct?`,
        options: [
          "It is paraphyletic, because it excludes tetrapods",
          "It is monophyletic, because all fish share gills and fins",
          "It is polyphyletic, because fish groups arose independently",
          "It is a valid clade if sharks are excluded",
          "It cannot be evaluated without molecular data"
        ],
        correctIndex: 0,
        explanation: `Coelacanths and lungfish are more closely related to tetrapods than to ray-finned fish, so a group containing all "fish" but excluding tetrapods excludes descendants of the common ancestor — the definition of paraphyly.\n\nMonophyly requires an ancestor plus *all* descendants; polyphyly means the group has no single exclusive ancestor at all. "Reptiles" excluding birds is the same paraphyly problem.`
      },
      {
        id: "ut-bio-4",
        difficulty: "IBO Theoretical",
        prompt: `Under the International Code of Zoological Nomenclature, which statement is correct?`,
        options: [
          "The oldest available name based on a type specimen, under the Principle of Priority",
          "The most recently published name always takes precedence because it reflects current data",
          "A species name may be changed freely whenever a new phylogeny is published",
          "Type specimens are optional if photographs are available",
          "Genus and species names must both be capitalised and underlined"
        ],
        correctIndex: 0,
        explanation: `Priority fixes the valid name as the earliest available one applied to a name-bearing type specimen; later names are junior synonyms. A name is tied to its type, not to a hypothesis about relationships.\n\nNames change when a species is moved to another genus (the species epithet is retained) or when synonymy is demonstrated — not because a new tree was published. Both parts are italicised, with only the genus capitalised.`
      },
      {
        id: "ut-bio-5",
        difficulty: "USABO Finalist",
        prompt: `Which phylum contains the greatest number of described species, and what feature underlies that diversity?`,
        options: [
          "Arthropoda \u2014 jointed exoskeleton, moulted and specialised",
          "Mollusca \u2014 a mantle that secretes a shell of variable shape",
          "Chordata \u2014 a notochord and dorsal nerve cord",
          "Annelida \u2014 metameric segmentation with coelomic compartments",
          "Cnidaria \u2014 alternation of polyp and medusa generations"
        ],
        correctIndex: 0,
        explanation: `Arthropoda accounts for roughly 80% of described animal species — over a million, mostly insects. The chitinous exoskeleton permits tagmosis (specialisation of body regions) and jointed appendages that can be modified for walking, feeding, sensing or flying, while metamorphosis lets larvae and adults exploit different niches.\n\nSegmentation occurs in annelids too, but without jointed appendages and hardened exoskeletal specialisation it did not produce comparable diversity.`
      },
      {
        id: "ut-bio-6",
        difficulty: "IBO Theoretical",
        prompt: `A published phylogeny shows a clade supported by a bootstrap value of 62% while a competing arrangement scores 38%. What is the appropriate interpretation?`,
        options: [
          "Ambiguous: 62% is weak support, so that node is unresolved",
          "The clade is supported at the 95% level and can be accepted",
          "Bootstrap values measure the probability the clade is true",
          "The 38% arrangement is the correct tree because it is the alternative",
          "Bootstrap values only apply to morphological data"
        ],
        correctIndex: 0,
        explanation: `Bootstrap resamples characters and reports how often a node reappears; it measures support from the data, not the probability that a clade is real. 62% is conventionally weak (≥70% moderate, ≥95% strong), so the node should be collapsed or treated as unresolved.\n\nLow support usually means too few informative characters, conflicting signal, or rapid diversification with short internal branches.`
      }
    ]
  }
};

export function getUnitTest(domainId) {
  return UNIT_TEST_SETS[domainId] || null;
}
