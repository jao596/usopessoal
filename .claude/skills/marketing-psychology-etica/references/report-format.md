# Output format

This skill supplies the reasoning behind a marketing decision, so a choice can be
argued from a named model instead of from a competitor's example. It produces an
argument, not a set of tactics to paste in. Present it like this.

## 1. Diagnosis (short)

State what you are actually solving before naming any model:

- The exact behaviour you want, from whom.
- What the customer already believes.
- Where they are in the journey.
- The real blocker (attention, understanding, trust, risk, friction, or price).
- Whether this is tested or still a guess.

If the blocker is unclear, say so and say what to check with real customers.

## 2. The models that fit

For each model you bring in, four lines, in this order (this is the whole method):

- **Name** the model.
- **Mechanism**: why the brain or the market behaves this way.
- **Apply**: exactly how it maps to this product and audience.
- **Ethics**: the honest-use line it depends on, and its backfire mode.

Bring in the few models that fit the diagnosis, not a tour of the catalogue. Two
well-argued models beat ten name-dropped ones.

## 3. The ethics pass

Before any recommendation is final, run it through the four tests in
`references/ethics-and-diagnosis.md` (truth, daylight, interest, exit). If a lever
only works because one of them fails, cut it and say why. When the argument touches
live copy, note that `scripts/persuasion-scan.mjs` can inventory the levers actually
present and flag dark patterns in the text.

## 4. What to do next, and what to test

- The concrete change the argument supports.
- The one metric that would tell you it worked.
- The honest note: which part is grounded in a real customer signal and which is a
  hypothesis to test.

## Principles for the write-up

- **Argue from the mechanism, not the trend.** A recommendation is only as good as
  the reason under it. "A competitor does it" is not a reason.
- **Fewer models, better argued.** Depth beats a checklist of biases.
- **Ethics is part of the recommendation, not a disclaimer at the end.** A tactic
  that fails the tests is not recommended, however well it converts.
- **Name the boundary.** This skill reasons and argues; it does not execute the
  tactic. For the build, hand off: page and conversion work to the **cro-audit**
  skill, growth-experiment selection to the **growth-tactics** skill, and copy to a
  writing skill.
