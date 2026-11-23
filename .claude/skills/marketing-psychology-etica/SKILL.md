---
name: marketing-psychology
description: Argue a marketing decision from a named psychological model instead of from a competitor's example. Use when asked why customers do or do not buy, which persuasion or pricing principle fits a situation, how to frame an offer, or whether a tactic is fair. Diagnoses the real blocker, names the models that fit, explains the mechanism, applies it to the product, and runs an ethics pass that separates influence from manipulation. Ships a scanner that inventories persuasion levers and flags dark patterns in copy.
license: See LICENSE.md
---

# Marketing Psychology

Supplies the thinking behind buying behaviour, so a marketing decision can be argued
from a named model and a stated mechanism, not from "a competitor does this". It
covers the reasoning models, the biases that drive how buyers decide, the persuasion
and pricing levers, and the behaviour-design frameworks, and it holds every one of
them to a hard line between influence and manipulation.

The line is the point. Any lever here works better when it is true and backfires when
it is not: scarcity that is invented, an anchor that is fake, a trial that quietly
auto-charges. So every recommendation ends with an ethics pass, and the bundled
scanner flags the dark patterns that show up in copy.

## When to use

Trigger for any "why do customers do X", "which principle applies here", "how should
we frame this offer / price / message", "how do we build trust / urgency / retention
honestly", or "is this tactic manipulative". This skill reasons and argues; it does
not execute the tactic. For the build, hand off page and conversion work to the
**cro-audit** skill and growth-experiment selection to the **growth-tactics** skill.

## Inputs

- **the challenge** — the marketing decision, scenario, or behaviour in question
  (required).
- **customer beliefs** — what the audience already thinks about the problem and about
  you, if known.
- **journey stage** — first exposure, weighing options, or deciding.
- **the blocker** — what currently prevents the action (attention, understanding,
  trust, risk, friction, or price), if you know it.
- **product and audience** — enough context that the models land on this business,
  not a generic one.

## Process (the four-step method)

**0. Diagnose first.** Answer the five questions in
`references/ethics-and-diagnosis.md`: the exact behaviour wanted, the current belief,
the journey stage, the real blocker, and whether it is tested or a guess. The blocker
tells you which family of models to open. Do not bolt a lever onto the wrong problem.

**1. Name the models that fit.** Pull the few models that match the diagnosis from:
- `references/strategy-models.md` — reasoning models and growth/scaling models (how to
  think about the decision).
- `references/buyer-psychology.md` — the biases and effects that drive how buyers
  decide.
- `references/persuasion-and-pricing.md` — persuasion/influence levers and pricing
  psychology.
- `references/design-and-delivery.md` — behaviour-design and funnel/delivery models.

**2. Explain the mechanism.** For each model, say why the brain or the market behaves
this way. The mechanism is the argument; the name alone is not.

**3. Apply it to this product.** Map the model to the real audience and offer,
concretely. Two well-argued models beat ten name-dropped ones.

**4. Run the ethics pass.** Put every recommendation through the four tests in
`references/ethics-and-diagnosis.md` (truth, daylight, interest, exit). If a lever
only works because one test fails, cut it and say why. When the argument touches live
copy, run the scanner:
```
node scripts/persuasion-scan.mjs page.html
```
It inventories the levers actually present, the gaps, and any dark patterns (vague
scarcity, resetting timers, confirmshaming, hidden auto-charges, pre-checked consent).

## Principles

- **Argue from the mechanism.** A recommendation is only as good as the reason under
  it. "A competitor does it" is not a reason.
- **Diagnose before you prescribe.** The right lever depends on the real blocker;
  name it first.
- **Fewer models, better argued.** Depth beats a checklist of biases.
- **Ethics is part of the recommendation.** A tactic that fails truth, daylight,
  interest, or exit is not recommended, however well it converts.
- **The map is not the territory.** Models are tools for thinking; stay connected to
  what real customers actually do, and test.

## Output

A short diagnosis, the few models that fit (each with mechanism, application, and its
honest-use line and backfire mode), an explicit ethics pass, and a clear next step
with the one metric that would prove it. See `references/report-format.md`.

## What this skill will not do

- It will not execute tactics or write the final copy; it supplies the reasoning and
  the argument.
- It will not recommend a lever that fails the ethics tests, and it will not design
  dark patterns, false scarcity, or deceptive pricing.
- It will not apply a model without product and customer context, or present an
  untested guess as a proven fact.

## Reference map

- `references/strategy-models.md` — reasoning and growth/scaling models.
- `references/buyer-psychology.md` — biases and decision effects.
- `references/persuasion-and-pricing.md` — persuasion levers and pricing psychology.
- `references/design-and-delivery.md` — behaviour-design and delivery frameworks.
- `references/ethics-and-diagnosis.md` — the influence/manipulation line, diagnosis, and lookup.
- `references/report-format.md` — how to present the argument.
- `scripts/persuasion-scan.mjs` — inventories persuasion levers and flags dark patterns in copy.
