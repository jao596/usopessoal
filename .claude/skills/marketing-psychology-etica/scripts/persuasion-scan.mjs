#!/usr/bin/env node
// persuasion-scan.mjs - reads a page or a piece of copy and inventories which
// persuasion levers it actually uses, which it is missing, and where it crosses
// into manipulation. The point is the line between influence and manipulation:
// a lever is fair only when the claim under it is true, so the scan flags scarcity
// with no stated basis, shaming opt-outs, trials that auto-charge without a clear
// disclosure, and stacked false urgency. It reads text, not intent, so every hit
// is a prompt to check the claim, not a verdict.
//
// Zero dependencies. Node 18+.
//   node persuasion-scan.mjs <file.html|file.txt>
//   node persuasion-scan.mjs "inline copy to scan"
//
// Exit 1 if any manipulation risk is flagged.

import { readFileSync, existsSync } from 'node:fs'

const arg = process.argv[2]

// Levers: fair game when the underlying claim is real. Reported as present/absent.
const LEVERS = [
  { key: 'social-proof', label: 'Social proof', re: /\b(\d[\d.,]*\+?\s*(customers|users|members|companies|teams|subscribers)|trusted by|join (over )?\d|testimonial|reviews?|rated|[45](\.\d)?\s*stars?|loved by|as used by)\b/i },
  { key: 'authority', label: 'Authority', re: /\b(certified|accredit|award[- ]?winning|featured in|as seen (on|in)|expert|official|backed by|iso ?\d|peer[- ]reviewed)\b/i },
  { key: 'reciprocity', label: 'Reciprocity (give first)', re: /\b(free (guide|trial|template|tool|course|ebook|sample|plan)|no cost|on us|free gift|100% free)\b/i },
  { key: 'risk-reversal', label: 'Risk reversal / regret aversion', re: /\b(money[- ]?back|guarantee|no[- ]risk|cancel anytime|no commitment|full refund|\d+[- ]day (guarantee|trial|refund))\b/i },
  { key: 'anchoring', label: 'Anchoring / price contrast', re: /(\bwas\b.{0,12}\bnow\b|\d+%\s*off|save \$?\d|instead of|regular(ly)? \$?\d|\brrp\b|<s>|<del>|line-through)/i },
  { key: 'commitment', label: 'Commitment (small yes first)', re: /\b(start (for )?free|get started|try it (free|now)|sign up free|no credit card|create( your)? free account)\b/i },
  { key: 'specificity', label: 'Concrete numbers / specificity', re: /\b\d+([.,]\d+)?\s*(%|x|hours?|days?|minutes?|customers|users|reviews)\b/i },
  { key: 'loss-aversion', label: 'Loss aversion (framed as loss)', re: /\b(don'?t miss|missing out|leaving .* on the table|before (it'?s|they'?re) gone|stop losing)\b/i },
  { key: 'scarcity', label: 'Scarcity / urgency', re: /\b(limited (time|stock|spots|seats|edition)|only \d+ (left|remaining|spots)|while (stocks|supplies) last|ends (today|soon|in)|last chance|few (spots|seats) left|today only|selling fast|almost (gone|sold out))\b/i },
]

// Manipulation risks: levers used without a truthful, disclosed basis.
const RISKS = [
  { key: 'vague-scarcity', label: 'Scarcity with no concrete, verifiable basis',
    re: /\b(selling fast|almost (gone|sold out)|going fast|limited stock|only a few (left|remaining)|hurry|act now|don'?t wait)\b/i,
    note: 'State a real number or date, or drop it. Vague urgency reads as invented.' },
  { key: 'countdown', label: 'Countdown / expiry timer',
    re: /\b(countdown|expires in|offer ends in|deal ends in|timer)\b|setinterval|data-countdown/i,
    note: 'A timer must reflect a real deadline. A per-visit or resetting timer is a dark pattern.' },
  { key: 'confirmshaming', label: 'Confirmshaming opt-out',
    re: /\bno,?\s*(thanks,?\s*)?i\s*(don'?t|do not|hate|prefer|like paying|already|will (pass|miss))|no,? i'?m fine (paying|missing|losing)/i,
    note: 'Let people decline neutrally. Guilt-tripping the opt-out is a dark pattern.' },
  { key: 'forced-continuity', label: 'Trial that auto-charges',
    re: /\b(auto[- ]?renew|automatically (billed|charged|renew)|you will be (billed|charged)|converts to (a )?paid)\b/i,
    note: 'Disclose the charge amount and date up front, and make cancelling easy.' },
  { key: 'prechecked', label: 'Pre-selected / opt-out-by-default consent',
    re: /<input[^>]+type=["']?checkbox["']?[^>]*\bchecked\b|uncheck (this )?(box )?to (opt out|unsubscribe)/i,
    note: 'Consent must be opt-in. A pre-checked box is not consent.' },
  { key: 'pressure-stack', label: 'Stacked pressure language',
    re: /(hurry|act now|last chance|don'?t wait|limited time)[^.!?]{0,40}(hurry|act now|last chance|now|today|immediately)/i,
    note: 'Multiple urgency triggers stacked together reads as pressure, not information.' },
]

function stripHtml(t) {
  return t.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/[ \t]+/g, ' ')
}

function scan(source) {
  const lines = source.split(/\r?\n/)
  const hit = (re) => {
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(re)
      if (m) return { line: i + 1, snippet: lines[i].trim().slice(0, 90) }
    }
    // fall back to whole-source match (copy passed as one blob)
    const m = source.match(re)
    return m ? { line: null, snippet: source.slice(Math.max(0, m.index - 20), m.index + 60).replace(/\s+/g, ' ').trim() } : null
  }

  const present = [], absent = []
  for (const l of LEVERS) { const h = hit(l.re); (h ? present : absent).push({ ...l, h }) }
  const risks = []
  for (const r of RISKS) { const h = hit(r.re); if (h) risks.push({ ...r, h }) }

  console.log(`\nmarketing-psychology persuasion-scan`)
  console.log('='.repeat(56))

  console.log(`\nPersuasion levers present (${present.length}/${LEVERS.length}):`)
  if (!present.length) console.log('  (none detected - the copy leans on description alone)')
  for (const p of present) console.log(`  + ${p.label}${p.h.line ? ` (line ${p.h.line})` : ''}: "${p.h.snippet}"`)

  console.log(`\nLevers not detected (gaps to consider, only if honestly true):`)
  console.log('  ' + (absent.length ? absent.map((a) => a.label).join(', ') : 'none'))

  console.log(`\nManipulation / dark-pattern risks (${risks.length}):`)
  if (!risks.length) {
    console.log('  none detected in the text. Still verify every claim is true and every lever is genuine.')
  } else {
    for (const r of risks) {
      console.log(`\n  [RISK] ${r.label}${r.h.line ? ` (line ${r.h.line})` : ''}`)
      console.log(`     "${r.h.snippet}"`)
      console.log(`     ${r.note}`)
    }
  }

  console.log('\n' + '-'.repeat(56))
  console.log(`${present.length} lever(s) used, ${risks.length} risk(s) flagged.`)
  console.log('A lever is fair only when the claim under it is true. See references/ethics-and-diagnosis.md.')
  process.exitCode = risks.length ? 1 : 0
}

if (!arg) {
  console.error('Usage: node persuasion-scan.mjs <file.html|file.txt | "inline copy">')
  process.exitCode = 2
} else {
  let source = arg
  if (existsSync(arg)) source = readFileSync(arg, 'utf8')
  if (/<[a-z!][\s\S]*>/i.test(source)) source = stripHtml(source)
  scan(source)
}
