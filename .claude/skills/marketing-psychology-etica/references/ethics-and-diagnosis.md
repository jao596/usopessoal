# Ethics and diagnosis

This is the reference the rest of the skill points back to. It does two jobs: draw
the line between influence and manipulation, and help you pick the right model for a
given problem.

## The line: influence vs manipulation

Every model here can be used well or badly. The same scarcity that helps a buyer act
on a genuinely limited offer becomes a lie when the limit is invented. The test is
not "does it work". It is whether it stays true to the customer.

Run a lever through these four checks before you ship it. If it fails any one, it is
manipulation, not persuasion, and it does not go out.

- **The truth test.** Is the claim under the lever actually true? Real scarcity, a
  real anchor, a real guarantee, real numbers. A lever on top of a false claim is a
  lie with a psychology label.
- **The daylight test.** Would it survive the customer knowing exactly what you did
  and why? Persuasion holds up in daylight; manipulation depends on the customer not
  noticing.
- **The interest test.** Does the nudge move the customer toward something that is
  good for them, or only good for you? Making a genuinely good action easier is
  design. Making a bad-for-them action easier is a dark pattern.
- **The exit test.** Can they say no, pause, or leave as easily as they said yes?
  Easy in, hard out is the signature of a trap.

If a tactic passes all four, it is fair even when it is effective. If it only works
because one of them fails, the tactic is the problem.

## Dark patterns to never use

These fail the tests above by construction. The bundled `scripts/persuasion-scan.mjs`
flags the ones detectable in copy.

- Invented or vague scarcity ("selling fast", "only a few left") with no real number
  or date behind it.
- Countdown timers that reset per visit or do not map to a real deadline.
- Confirmshaming: opt-outs worded to guilt the customer ("No thanks, I like paying
  full price").
- Trials that auto-charge without the amount and date disclosed up front, or that are
  hard to cancel.
- Pre-checked consent, opt-out-by-default subscriptions, and buried recurring charges.
- Hidden costs revealed only at the last step, and misdirection that hides the real
  price or the decline option.
- Fake social proof: invented reviews, borrowed logos, numbers with no basis.

A model is a tool; the application decides the ethics. When in doubt, choose the
version you would be comfortable explaining to the customer to their face.

## Diagnosis: pick the model before the tactic

Before reaching for a principle, answer five questions. They stop you from bolting a
clever lever onto the wrong problem.

1. **What exact behaviour** do you want, from whom? Name the single action.
2. **What does the customer already believe** about this, and about you?
3. **Where in the journey** are they: first exposure, weighing options, or deciding?
4. **What is actually stopping** the action: attention, understanding, trust, risk,
   friction, or price?
5. **Has it been tested** with real customers, or is this a guess about their heads?

The honest answer to 4 usually tells you which family of models to open. Do not
apply a model without the product and customer context; there is no one-size lever.

## Challenge to model lookup

A starting point, not a rule. Diagnose first, then reach here.

| The problem | Where to look |
|---|---|
| Low conversion, unclear why | Diagnosis questions, then buyer-psychology (attribution error, friction, trust) |
| Price objections | persuasion-and-pricing (anchoring, framing, good-better-best, mental accounting) |
| Weak trust | buyer-psychology (social proof, pratfall) + persuasion-and-pricing (authority, liking) |
| Need urgency (honestly) | persuasion-and-pricing (real scarcity, loss aversion) + the ethics tests above |
| Poor retention / churn | buyer-psychology (endowment, goal-gradient, peak-end) + strategy (switching costs) |
| Growth stalled | strategy-models (constraints, feedback loops, flywheel, network effects) |
| Decision paralysis | design-and-delivery (Hick's law, defaults) + buyer-psychology (paradox of choice) |
| Weak onboarding / activation | design-and-delivery (activation energy, B = MAP, goal-gradient) |
| Deciding what to build/test | strategy-models (first principles, 80/20, opportunity cost, barbell) |

## The four-step application

For any challenge, work it in this order and write it down:

1. **Name** the model(s) that fit the diagnosis.
2. **Explain** the mechanism: why the brain or the market behaves this way.
3. **Apply** it to this product and audience, concretely.
4. **Check the ethics**: run the four tests, and note the honest-use line and the
   backfire mode, before anything ships.
