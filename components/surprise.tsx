"use client"

// The "Surprise Them" experience flow, merged into one file to keep the
// repo file count low. Combines: config, floating-background, surprise-flow,
// paywall-modal, and share-modal (ExitIntentModal + ShareModal).

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Volume2, VolumeX } from "lucide-react"

/* ============================================================
   Config: shared data + types for the "Surprise Them" flow
   ============================================================ */

export type Relationship = {
  id: string
  emoji: string
  label: string
}

export type QuestionPreset = {
  emoji: string
  text: string
}

export type MediaMode = "love-cards" | "photos"

export type SurpriseData = {
  theirName: string
  yourName: string
  relationship: string
  question: string
  mediaMode: MediaMode
  message: string
}

export const TOTAL_STEPS = 5

export const relationships: Relationship[] = [
  { id: "girlfriend", emoji: "💖", label: "Girlfriend" },
  { id: "boyfriend", emoji: "💝", label: "Boyfriend" },
  { id: "female-bestie", emoji: "💜", label: "Female Bestie" },
  { id: "male-bestie", emoji: "💙", label: "Male Bestie" },
  { id: "brother", emoji: "🧡", label: "Brother" },
  { id: "sister", emoji: "🌸", label: "Sister" },
]

// Question presets keyed by relationship id, with a sensible default.
export const questionPresets: Record<string, QuestionPreset[]> = {
  girlfriend: [
    { emoji: "💕", text: "Will you be my girlfriend?" },
    { emoji: "💍", text: "Will you be mine forever?" },
    { emoji: "🌹", text: "Will you be my valentine?" },
  ],
  boyfriend: [
    { emoji: "💕", text: "Will you be my boyfriend?" },
    { emoji: "💍", text: "Will you be mine forever?" },
    { emoji: "🌹", text: "Will you be my valentine?" },
  ],
  default: [
    { emoji: "💛", text: "Will you always be by my side?" },
    { emoji: "✨", text: "Promise we'll stay this close?" },
    { emoji: "🎉", text: "Ready for our next adventure?" },
  ],
}

export function presetsFor(relationship: string): QuestionPreset[] {
  return questionPresets[relationship] ?? questionPresets.default
}

export const messageSuggestions: Record<"hinglish" | "english", string[]> = {
  hinglish: [
    "Main ye roz nahi bolta, par sach yahi hai — tum mere din ki sabse aasan cheez ho. Baaki sab kitna bhi bhaari ho, tumhara ek message sab halka kar deta hai. Thank you ki tum ho.",
    "Pehli baar jab tum hasi thi, mujhe usi waqt laga tha ki ye yaad rakhne wala din hai. Aaj tak yaad hai. Tumhari har chhoti si baat mere liye badi hai — tum meri favourite ho.",
    "Kuch baatein bolne ka sahi waqt kabhi milta hi nahi, isliye likh raha hoon. Khush hoon, thaka hoon, chidchida hoon — jagah tum hi ho. Bas itna jaan lo, main kahin nahi ja raha.",
  ],
  english: [
    "I don't say this often, but the truth is simple — you are the easiest part of my day. No matter how heavy everything else gets, one message from you makes it all lighter. Thank you for being you.",
    "The first time you laughed, I knew right then this was a day I'd remember. I still do. Every little thing about you matters to me — you're my favourite person.",
    "There's never a right time to say some things, so I'm writing them instead. Happy, tired, grumpy — the place is always you. Just know this: I'm not going anywhere.",
  ],
}

export const happyCustomers: string[] = [
  "I have made a birthday link and payment is done",
  "thank you very much, she is feeling so special",
  "finally done bro, thanks for cooperating, best experience",
  "he really liked it, especially the letter part",
  "she really liked the surprise",
]

export const floatingEmojis = ["💕", "✨", "💖", "⭐", "💝", "💫", "🌸", "❤️"]

export const pricing = {
  original: "₹499",
  discounted: "₹199",
  discount: "60% OFF",
}

/* ============================================================
   Floating Background
   ============================================================ */

export function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-60 animate-float-emoji sm:text-3xl"
          style={{
            left: `${(i * 12 + 5) % 95}%`,
            top: `${(i * 17 + 8) % 90}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}

/* ============================================================
   Paywall Modal
   ============================================================ */

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)
  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0")
  const ss = String(remaining % 60).padStart(2, "0")
  return `${mm}:${ss}`
}

export function PaywallModal({
  open,
  onClose,
  onUnlock,
}: {
  open: boolean
  onClose: () => void
  onUnlock: () => void
}) {
  const countdown = useCountdown(600)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="animate-card-in relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl">
        <div className="flex items-center justify-center gap-2 bg-grad-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground">
          <span>Offer ends in</span>
          <span className="tabular-nums font-bold">{countdown}</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto text-lg leading-none text-primary-foreground/90 hover:text-primary-foreground"
          >
            ×
          </button>
        </div>

        <div className="p-6 text-center">
          <h2 className="font-display text-2xl font-extrabold text-foreground">
            Your surprise is ready <span aria-hidden>🎉</span>
          </h2>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground/60">
              <span aria-hidden>💬</span> Our happy customers
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
              {happyCustomers.map((c, i) => (
                <div
                  key={i}
                  className="min-w-[200px] shrink-0 rounded-2xl bg-secondary/70 p-3 text-left text-xs leading-relaxed text-foreground/70"
                >
                  “{c}”
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="text-lg text-foreground/40 line-through">{pricing.original}</span>
            <span className="font-display text-3xl font-extrabold text-foreground">{pricing.discounted}</span>
            <span className="rounded-full bg-grad-brand px-2.5 py-1 text-xs font-bold text-primary-foreground">
              {pricing.discount} <span aria-hidden>🎉</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/45">
            One-time · No subscription
          </p>

          <p className="mt-4 text-sm text-foreground/65">
            The best gifts are made, not bought <span aria-hidden>💝</span>
          </p>

          <button
            onClick={onUnlock}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-grad-brand py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-rose/25 transition-transform hover:scale-[1.02]"
          >
            <span aria-hidden>💳</span> Unlock &amp; Share Now <span aria-hidden>→</span>
          </button>

          <p className="mt-3 text-xs text-foreground/55">
            <span aria-hidden>🔒</span> Secure · <span aria-hidden>⚡</span> Instant · <span aria-hidden>💙</span> No ads
          </p>
          <p className="mt-2 text-xs text-foreground/45">
            <span aria-hidden>📅</span> Your link stays live for 90 days
          </p>
          <p className="mt-1 text-xs text-foreground/45">
            Thousands of moments delivered with love across India <span aria-hidden>🇮🇳</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Exit Intent + Share Modals
   ============================================================ */

export function ExitIntentModal({
  open,
  onStay,
  onLeave,
}: {
  open: boolean
  onStay: () => void
  onLeave: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="animate-card-in w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-2xl">
        <div className="text-5xl" aria-hidden>
          💔
        </div>
        <h2 className="mt-3 font-display text-xl font-extrabold text-foreground">
          Wait — it isn&apos;t saved yet
        </h2>
        <p className="mt-2 text-sm text-foreground/65">
          You&apos;re one step away. Don&apos;t let this moment slip away.
        </p>
        <button
          onClick={onStay}
          className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-grad-brand py-3 text-sm font-bold text-primary-foreground"
        >
          Finish the surprise <span aria-hidden>💝</span>
        </button>
        <button
          onClick={onLeave}
          className="mt-2 w-full rounded-full py-2.5 text-sm font-medium text-foreground/50 hover:text-foreground/70"
        >
          I&apos;ll let this moment go
        </button>
      </div>
    </div>
  )
}

export function ShareModal({
  open,
  onClose,
  theirName,
}: {
  open: boolean
  onClose: () => void
  theirName: string
}) {
  const [copied, setCopied] = useState(false)
  if (!open) return null

  const link = typeof window !== "undefined" ? `${window.location.origin}/surprise/demo` : "/surprise/demo"

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(
    `Hey ${theirName || ""}, I made something just for you 💝 ${link}`,
  )}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="animate-card-in relative w-full max-w-md rounded-3xl bg-card p-6 text-center shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl leading-none text-foreground/40 hover:text-foreground/70"
        >
          ×
        </button>
        <div className="text-5xl" aria-hidden>
          🔗
        </div>
        <h2 className="mt-3 font-display text-2xl font-extrabold text-foreground">
          Your surprise link is ready!
        </h2>
        <p className="mt-2 text-sm text-foreground/65">
          Send it to them and watch the magic <span aria-hidden>✨</span>
        </p>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.02]"
        >
          <span aria-hidden>📱</span> WhatsApp
        </a>
        <button
          onClick={copyLink}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose/20 bg-secondary/60 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-secondary"
        >
          <span aria-hidden>📋</span> {copied ? "Copied!" : "Copy Link"}
        </button>
        <button className="mt-3 w-full rounded-full py-2.5 text-sm font-medium text-foreground/55 hover:text-foreground/75">
          <span aria-hidden>👁️</span> Preview the recipient view
        </button>
      </div>
    </div>
  )
}

/* ============================================================
   Surprise Flow
   ============================================================ */

const emptyData: SurpriseData = {
  theirName: "",
  yourName: "",
  relationship: "",
  question: "",
  mediaMode: "love-cards",
  message: "",
}

export function SurpriseFlow() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<SurpriseData>(emptyData)
  const [muted, setMuted] = useState(false)
  const [paywall, setPaywall] = useState(false)
  const [exitIntent, setExitIntent] = useState(false)
  const [share, setShare] = useState(false)

  const update = (patch: Partial<SurpriseData>) => setData((d) => ({ ...d, ...patch }))
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-grad-soft px-4 py-6">
      <FloatingBackground />

      {/* Progress */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`text-base transition-all ${i < step ? "scale-110 opacity-100" : "opacity-30 grayscale"}`}
              aria-hidden
            >
              ❤️
            </span>
          ))}
        </div>
        <span className="ml-2 text-sm font-bold text-primary">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Card */}
      <div className="relative z-10 mt-6 w-full max-w-2xl">
        <div key={step} className="animate-card-in relative rounded-[2rem] bg-card p-6 shadow-2xl shadow-rose/10 sm:p-10">
          {/* Top controls */}
          <div className="mb-4 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={back}
                className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-secondary"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            ) : (
              <Link
                href="/#experiences"
                className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1.5 text-sm font-semibold text-primary hover:bg-secondary"
              >
                <ArrowLeft className="size-4" /> Exit
              </Link>
            )}
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label="Mute / Unmute"
              className="grid size-9 place-items-center rounded-full text-foreground/50 hover:bg-secondary/60 hover:text-foreground/80"
            >
              {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
          </div>

          {step === 1 && <StepNames data={data} update={update} onNext={next} />}
          {step === 2 && <StepRelationship update={update} onNext={next} />}
          {step === 3 && <StepQuestion data={data} update={update} onNext={next} />}
          {step === 4 && <StepMedia data={data} update={update} onNext={next} />}
          {step === 5 && <StepMessage data={data} update={update} onCreate={() => setPaywall(true)} />}
        </div>
      </div>

      <PaywallModal
        open={paywall}
        onClose={() => {
          setPaywall(false)
          setExitIntent(true)
        }}
        onUnlock={() => {
          setPaywall(false)
          setShare(true)
        }}
      />
      <ExitIntentModal
        open={exitIntent}
        onStay={() => {
          setExitIntent(false)
          setPaywall(true)
        }}
        onLeave={() => setExitIntent(false)}
      />
      <ShareModal open={share} onClose={() => setShare(false)} theirName={data.theirName} />
    </main>
  )
}

/* ---------- Step 1: Names ---------- */
function StepNames({
  data,
  update,
  onNext,
}: {
  data: SurpriseData
  update: (p: Partial<SurpriseData>) => void
  onNext: () => void
}) {
  const valid = data.theirName.trim() && data.yourName.trim()
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold text-foreground">
        Who is this for? <span aria-hidden>💝</span>
      </h2>
      <p className="mt-2 text-foreground/60">You&apos;re about to make someone&apos;s day unforgettable 🎀</p>
      <div className="mt-6 space-y-3 text-left">
        <input
          value={data.theirName}
          onChange={(e) => update({ theirName: e.target.value })}
          placeholder="Their name..."
          className="w-full rounded-2xl border border-rose/15 bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
        />
        <input
          value={data.yourName}
          onChange={(e) => update({ yourName: e.target.value })}
          placeholder="Your name..."
          className="w-full rounded-2xl border border-rose/15 bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>
      <ContinueButton disabled={!valid} onClick={onNext} label="Continue" />
    </div>
  )
}

/* ---------- Step 2: Relationship ---------- */
function StepRelationship({
  update,
  onNext,
}: {
  update: (p: Partial<SurpriseData>) => void
  onNext: () => void
}) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold text-foreground">Who are they to you?</h2>
      <p className="mt-2 text-foreground/60">Pick what fits best</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {relationships.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              update({ relationship: r.id })
              onNext()
            }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-rose/10 bg-secondary/40 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary"
          >
            <span className="text-3xl" aria-hidden>
              {r.emoji}
            </span>
            <span className="font-bold text-foreground">{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- Step 3: Question ---------- */
function StepQuestion({
  data,
  update,
  onNext,
}: {
  data: SurpriseData
  update: (p: Partial<SurpriseData>) => void
  onNext: () => void
}) {
  const presets = presetsFor(data.relationship)
  const valid = data.question.trim().length > 0
  return (
    <div className="text-center">
      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
        For {data.theirName || "them"}
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground">Pick a question</h2>
      <p className="mt-2 text-foreground/60">Or write your own below</p>

      <div className="mt-5 space-y-2.5">
        {presets.map((p) => {
          const active = data.question === p.text
          return (
            <button
              key={p.text}
              onClick={() => update({ question: p.text })}
              className={`flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition-all ${
                active
                  ? "bg-grad-brand text-primary-foreground shadow-md shadow-rose/20"
                  : "bg-secondary/50 text-foreground hover:bg-secondary"
              }`}
            >
              <span aria-hidden>{p.emoji}</span> {p.text}
            </button>
          )
        })}
      </div>

      <input
        value={presets.some((p) => p.text === data.question) ? "" : data.question}
        onChange={(e) => update({ question: e.target.value })}
        placeholder="Or type your own question..."
        className="mt-4 w-full rounded-2xl border border-rose/15 bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
      />

      <ContinueButton disabled={!valid} onClick={onNext} label="Continue" />
    </div>
  )
}

/* ---------- Step 4: Media ---------- */
function StepMedia({
  data,
  update,
  onNext,
}: {
  data: SurpriseData
  update: (p: Partial<SurpriseData>) => void
  onNext: () => void
}) {
  const setMode = (mode: MediaMode) => update({ mediaMode: mode })
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-extrabold text-foreground">
        Make it personal <span aria-hidden>💝</span>
      </h2>
      <p className="mt-2 text-foreground/60">Use love cards to express, or upload your own photos</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => setMode("love-cards")}
          className={`rounded-2xl border-2 p-4 text-left transition-all ${
            data.mediaMode === "love-cards" ? "border-primary bg-secondary/60" : "border-rose/10 bg-secondary/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">
              <span aria-hidden>🎬</span> Love Cards
            </span>
            {data.mediaMode === "love-cards" && (
              <span className="rounded-full bg-grad-brand px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                ✓ Selected
              </span>
            )}
          </div>
          <div className="mt-3 grid h-40 place-items-center rounded-xl bg-grad-warm text-4xl" aria-hidden>
            💌
          </div>
          <p className="mt-2 text-xs text-foreground/55">Curated for the moment ✨</p>
        </button>

        <button
          onClick={() => setMode("photos")}
          className={`rounded-2xl border-2 p-4 text-left transition-all ${
            data.mediaMode === "photos" ? "border-primary bg-secondary/60" : "border-rose/10 bg-secondary/30"
          }`}
        >
          <span className="font-bold text-foreground">
            <span aria-hidden>📸</span> Your Photos
          </span>
          <div className="mt-3 grid h-40 place-items-center rounded-xl border-2 border-dashed border-primary/30 text-center">
            <div>
              <div className="text-3xl" aria-hidden>
                🖼️
              </div>
              <p className="mt-1 text-sm font-semibold text-primary">Your photos appear here</p>
              <p className="text-xs text-foreground/50">Tap &quot;Upload&quot; below</p>
            </div>
          </div>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <span aria-hidden>📷</span> Tap to upload photos
          </span>
        </button>
      </div>

      <ContinueButton disabled={false} onClick={onNext} label="Continue" />
    </div>
  )
}

/* ---------- Step 5: Message ---------- */
function StepMessage({
  data,
  update,
  onCreate,
}: {
  data: SurpriseData
  update: (p: Partial<SurpriseData>) => void
  onCreate: () => void
}) {
  const [lang, setLang] = useState<"hinglish" | "english">("hinglish")
  const valid = data.message.trim().length > 0
  const max = 500
  return (
    <div className="text-center">
      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
        For {data.theirName || "them"}
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground">
        The part they&apos;ll never forget <span aria-hidden>💌</span>
      </h2>
      <p className="mt-2 text-foreground/60">
        A few honest lines. {data.theirName || "They"} will read this at the very end — make it count.
      </p>

      <textarea
        value={data.message}
        maxLength={max}
        onChange={(e) => update({ message: e.target.value })}
        placeholder="Write what you never say out loud..."
        rows={4}
        className="mt-5 w-full resize-none rounded-2xl border border-rose/15 bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
      />
      <div className="mt-1 text-right text-xs font-semibold text-foreground/45">
        {data.message.length} / {max}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-foreground/60">Stuck? Tap one to start with:</p>
        <div className="inline-flex rounded-full bg-secondary/60 p-0.5">
          {(["hinglish", "english"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors ${
                lang === l ? "bg-card text-primary shadow-sm" : "text-foreground/55"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-2 text-left">
        {messageSuggestions[lang].map((s, i) => {
          const active = data.message === s
          return (
            <button
              key={i}
              onClick={() => update({ message: s })}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed transition-all ${
                active
                  ? "border-primary bg-secondary/60 text-foreground"
                  : "border-rose/10 bg-secondary/25 text-foreground/70 hover:bg-secondary/40"
              }`}
            >
              {s}
            </button>
          )
        })}
      </div>

      <ContinueButton disabled={!valid} onClick={onCreate} label="Create the surprise ✨" />
    </div>
  )
}

/* ---------- Shared Continue button ---------- */
function ContinueButton({
  disabled,
  onClick,
  label,
}: {
  disabled: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-grad-brand py-3.5 text-base font-bold text-primary-foreground shadow-lg shadow-rose/25 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
    >
      {label.includes("✨") ? label : `${label} →`}
    </button>
  )
}
