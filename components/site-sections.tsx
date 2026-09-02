"use client"

// All top-level marketing page sections, merged into one file to keep the
// repo file count low: SiteHeader, Hero, Experiences, HowItWorks, Stories,
// Faq, FinalCta, SiteFooter.

import { useEffect, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  Gift,
  Heart,
  LifeBuoy,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Rocket,
  Send,
  Sparkles,
  X,
  Camera,
} from "lucide-react"

/* ============================================================
   Site Header
   ============================================================ */

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-rose/10 bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-grad-brand shadow-sm shadow-rose/30">
            <Heart className="size-5 fill-primary-foreground text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
            ourmoments
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Experiences <ChevronDown className="size-4" />
          </button>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#experiences"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-grad-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-rose/30 transition-transform hover:-translate-y-0.5"
          >
            Create Magic <Sparkles className="size-4" />
          </a>
        </nav>

        <button
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-rose/10 bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {["Experiences", ...navLinks.map((l) => l.label)].map((label, i) => (
              <a
                key={label}
                href={i === 0 ? "#experiences" : navLinks[i - 1].href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {label}
              </a>
            ))}
            <a
              href="#experiences"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-grad-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Create Magic <Sparkles className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

/* ============================================================
   Hero
   ============================================================ */

const avatars = ["P", "R", "A", "K"]

const stats = [
  { value: "50K+", label: "Surprises\nCreated" },
  { value: "7", label: "Unique\nExperiences" },
  { value: "200+", label: "Cities\nReached" },
  { value: "4.9★", label: "User\nRating" },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grad-soft pt-16">
      {/* soft blobs */}
      <div className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 size-80 rounded-full bg-coral/15 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
        {/* Left copy */}
        <div className="text-center lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose/15 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground/70 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            88 people creating right now
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm">
            <span aria-hidden>💝</span> India&apos;s #1 Digital Gifting Platform
          </div>

          <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Personalized Digital Gifts
            <br />
            for <span className="text-grad-brand">People You Love</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70 lg:mx-0">
            Create magical, interactive surprises in minutes — proposal pages, birthday celebrations,
            photo puzzles, and more. Share instantly via WhatsApp, Instagram, or any link. No design
            skills needed.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start justify-center">
            <a
              href="#experiences"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-grad-brand px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-rose/30 transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <Gift className="size-5" /> Create Your Surprise <ArrowRight className="size-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose/20 bg-background/70 px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-background sm:w-auto"
            >
              <Play className="size-4 fill-current" /> How It Works
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <span
                  key={a}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-grad-brand text-sm font-bold text-primary-foreground"
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  {a}
                </span>
              ))}
              <span className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-bold text-primary">
                +50K
              </span>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-coral">★★★★★ 4.9</div>
              <div className="text-xs text-foreground/60">Loved by 50,000+ creators</div>
            </div>
          </div>
        </div>

        {/* Right phone mockup */}
        <div className="relative mx-auto w-full max-w-sm">
          <FloatingToast
            className="absolute -left-4 top-8 z-20 animate-float-slow"
            initial="K"
            name="Karan"
            action="created an"
            kind="Apology"
            emoji="💙"
          />
          <FloatingToast
            className="absolute -right-2 bottom-24 z-20 animate-float-slower"
            initial="R"
            name="Rahul"
            action="shared a"
            kind="Birthday"
            emoji="🎂"
          />
          <PhoneMockup />
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-rose/10 bg-background/60 backdrop-blur">
        <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-rose/10 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.value} className="px-2 text-center">
              <div className="text-grad-brand font-display text-2xl font-extrabold sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 whitespace-pre-line text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-8 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
        Scroll to explore
      </div>
    </section>
  )
}

function FloatingToast({
  className,
  initial,
  name,
  action,
  kind,
  emoji,
}: {
  className?: string
  initial: string
  name: string
  action: string
  kind: string
  emoji: string
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-2xl border border-rose/10 bg-background px-3 py-2 text-xs shadow-xl shadow-rose/10 ${className ?? ""}`}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-grad-brand text-[11px] font-bold text-primary-foreground">
        {initial}
      </span>
      <span className="text-foreground/80">
        <strong className="font-semibold text-foreground">{name}</strong> {action}{" "}
        <strong className="font-semibold text-foreground">{kind}</strong> <span aria-hidden>{emoji}</span>
      </span>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="relative rounded-[2.75rem] border-[10px] border-foreground/90 bg-foreground/90 shadow-2xl shadow-rose/30">
      <div className="overflow-hidden rounded-[2rem] bg-grad-soft">
        {/* top steps */}
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex gap-1.5 text-base">
            <span aria-hidden>🌟</span>
            <span aria-hidden>🎂</span>
            <span aria-hidden>🎈</span>
            <span aria-hidden>📸</span>
            <span aria-hidden>💌</span>
          </div>
          <span className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-bold text-primary">
            STEP 1 OF 5
          </span>
        </div>
        <div className="px-5 pb-2 pt-3 text-center text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
          👁 Preview Mode
        </div>

        {/* card */}
        <div className="mx-4 mb-5 rounded-3xl bg-background p-5 shadow-lg shadow-rose/10">
          <div className="mb-1 text-center text-2xl" aria-hidden>
            🌟
          </div>
          <h3 className="text-center font-display text-lg font-bold text-foreground">
            Who&apos;s the birthday star?
          </h3>
          <p className="mt-1 text-center text-xs text-foreground/60">
            You&apos;re about to make someone&apos;s day unforgettable <span aria-hidden>🎀</span>
          </p>

          <div className="mt-4 space-y-3">
            <Field label="Their name" value="Ananya" filled />
            <Field label="Your name" value="Ra" filled typing />
            <Field label="Turning age" hint="(optional)" value="e.g. 25" />
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                Their birthday <span className="text-foreground/30">(unlocks midnight magic)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-rose/15 bg-secondary/50 px-3 py-2 text-xs text-foreground/40">
                  Day
                </div>
                <div className="rounded-xl border border-rose/15 bg-secondary/50 px-3 py-2 text-xs text-foreground/40">
                  Month
                </div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-foreground/50">
              If they open early, a countdown holds it until 12:00 AM <span aria-hidden>🎈</span>
            </p>
          </div>

          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-grad-brand py-3 text-sm font-semibold text-primary-foreground">
            Let&apos;s begin <span aria-hidden>🎂</span>
          </button>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-primary">
            <span aria-hidden>🔗</span> Private link copied
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background px-4 py-1.5 text-[11px] font-semibold text-foreground/70 shadow-lg">
        You fill in the details
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  hint,
  filled,
  typing,
}: {
  label: string
  value: string
  hint?: string
  filled?: boolean
  typing?: boolean
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-foreground/50">
        {label} {hint && <span className="text-foreground/30">{hint}</span>}
      </div>
      <div
        className={`rounded-xl border px-3 py-2 text-xs ${
          filled
            ? "border-primary/30 bg-primary/5 font-medium text-foreground"
            : "border-rose/15 bg-secondary/50 text-foreground/40"
        }`}
      >
        {value}
        {typing && <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-primary align-middle" />}
      </div>
    </div>
  )
}

/* ============================================================
   Experiences
   ============================================================ */

type Experience = {
  emoji: string
  category: string
  badge: string
  badgeEmoji: string
  title: string
  titleEmoji?: string
  description: string
  rating: string
  reviews: string
  gradient: string
  href?: string
}

const experiences: Experience[] = [
  {
    emoji: "💘",
    category: "Romance",
    badge: "MOST POPULAR",
    badgeEmoji: "★",
    title: "Surprise Them",
    titleEmoji: "❤️",
    description:
      'A beautiful, interactive surprise page with romantic animations, photo gallery, and a "Yes" button that celebrates with confetti.',
    rating: "4.9",
    reviews: "2,847 reviews",
    gradient: "linear-gradient(135deg,#ffe3ec,#ffc0d3)",
    href: "/surprise",
  },
  {
    emoji: "🎂",
    category: "Celebration",
    badge: "BESTSELLER",
    badgeEmoji: "🔥",
    title: "Birthday Surprise",
    description:
      "Animated birthday page with cake, candles, balloon burst, photo slideshow, and personalized birthday message with music.",
    rating: "4.8",
    reviews: "1,956 reviews",
    gradient: "linear-gradient(135deg,#fff3d6,#ffe0b3)",
  },
  {
    emoji: "💞",
    category: "For Her",
    badge: "JUST LAUNCHED",
    badgeEmoji: "🚀",
    title: "Girlfriend Surprise",
    description:
      "A museum of the two of you — ten rooms she opens one at a time, with your photos, your reasons and a sealed love letter. For any day, not just the big ones.",
    rating: "5.0",
    reviews: "418 reviews",
    gradient: "linear-gradient(135deg,#ffe0ec,#ffc0d3)",
  },
  {
    emoji: "🤝",
    category: "Friendship",
    badge: "JUST LAUNCHED",
    badgeEmoji: "🚀",
    title: "Best Friend Museum",
    description:
      "Nine rooms built around your friendship — knock on the door, scratch off the gallery, sign the renewal. A bestie gift for any day of the year.",
    rating: "5.0",
    reviews: "356 reviews",
    gradient: "linear-gradient(135deg,#e8eaf6,#c5cae9)",
  },
  {
    emoji: "🧠",
    category: "Interactive",
    badge: "TRENDING",
    badgeEmoji: "📈",
    title: "Photo Puzzle",
    description:
      "Turn your favorite photo into an interactive sliding puzzle. Your loved one solves it to reveal a hidden message or surprise photo.",
    rating: "4.9",
    reviews: "1,432 reviews",
    gradient: "linear-gradient(135deg,#e0f7fa,#b2ebf2)",
  },
  {
    emoji: "💕",
    category: "Couples",
    badge: "PREMIUM",
    badgeEmoji: "💝",
    title: "Anniversary Love",
    description:
      "Celebrate your journey together with a timeline of memories, love counter, romantic quotes, and a toast animation.",
    rating: "4.9",
    reviews: "1,683 reviews",
    gradient: "linear-gradient(135deg,#fdf0d5,#f7d798)",
  },
  {
    emoji: "🕊️",
    category: "Heartfelt",
    badge: "NEW",
    badgeEmoji: "✨",
    title: "Heartfelt Apology",
    description:
      'A sincere, beautifully designed sorry page with dodging "No" button, heartfelt messages, and a forgiveness meter that fills up.',
    rating: "4.7",
    reviews: "892 reviews",
    gradient: "linear-gradient(135deg,#e3f2fd,#bbdefb)",
  },
  {
    emoji: "💰",
    category: "Digital Gift",
    badge: "NEW",
    badgeEmoji: "⚡",
    title: "UPI QR Gift",
    description:
      "Create a personalized money gift page with UPI QR code, custom message, and festive animations. Perfect for digital gifting.",
    rating: "4.8",
    reviews: "1,124 reviews",
    gradient: "linear-gradient(135deg,#fff8e1,#ffe082)",
  },
  {
    emoji: "💐",
    category: "Family",
    badge: "FESTIVE",
    badgeEmoji: "🎀",
    title: "Mother's Day",
    description:
      "A touching tribute page for mom with flower animations, photo memories, thank-you messages, and a virtual hug button.",
    rating: "5.0",
    reviews: "764 reviews",
    gradient: "linear-gradient(135deg,#fce4ec,#f8bbd0)",
  },
]

export function Experiences() {
  return (
    <section id="experiences" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> 9 Magical Experiences
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Choose Your Perfect <span className="text-grad-brand">Surprise</span>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/65">
            From heartfelt surprises to fun puzzles — create unforgettable digital moments for every
            occasion. All gifts are shareable via link and work beautifully on any device.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e) => (
            <ExperienceCard key={e.title} experience={e} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ experience: e }: { experience: Experience }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-rose/10 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose/10">
      <div className="relative flex h-32 items-center justify-center" style={{ backgroundImage: e.gradient }}>
        <span className="text-5xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110" aria-hidden>
          {e.emoji}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/70 backdrop-blur">
          {e.category}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
          <span aria-hidden>{e.badgeEmoji}</span> {e.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-foreground">
          {e.title} {e.titleEmoji && <span aria-hidden>{e.titleEmoji}</span>}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/65">{e.description}</p>

        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="text-coral">★★★★★</span>
          <span className="font-bold text-foreground">{e.rating}</span>
          <span className="text-foreground/45">({e.reviews})</span>
        </div>

        <a
          href={e.href ?? "#experiences"}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-rose/15 bg-secondary/60 py-2.5 text-sm font-semibold text-primary transition-colors group-hover:bg-grad-brand group-hover:text-primary-foreground"
        >
          Create Yours Now <ArrowRight className="size-4" />
        </a>
      </div>
    </article>
  )
}

/* ============================================================
   How It Works
   ============================================================ */

const steps = [
  {
    num: "01",
    emoji: "🎁",
    title: "Pick a Surprise",
    description:
      "Choose from 7 magical experiences — proposals, birthdays, puzzles, apologies, UPI gifts, and more.",
  },
  {
    num: "02",
    emoji: "🖼️",
    title: "Add Your Magic",
    description:
      "Upload photos, write your message, pick colors, and personalize every detail to make it truly yours.",
  },
  {
    num: "03",
    emoji: "👁️",
    title: "Preview It",
    description:
      "See your surprise come to life instantly. Unlock it free by watching a short ad, or pay to skip — your choice.",
  },
  {
    num: "04",
    emoji: "📤",
    title: "Share the Link",
    description:
      "Copy your unique link and send it via WhatsApp, Instagram, or any app. Watch their reaction in real-time!",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-grad-warm py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold text-primary">
            <Rocket className="size-3.5" /> Simple &amp; Fast
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Create Magic in 4 Easy Steps
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/65">
            No design skills needed. Build a stunning digital surprise in under 5 minutes and share it
            instantly with anyone, anywhere.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="flex h-full flex-col rounded-3xl border border-rose/10 bg-background/80 p-6 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-extrabold text-primary/15">{s.num}</span>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-grad-brand text-2xl shadow-lg shadow-rose/25" aria-hidden>
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{s.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden size-6 -translate-y-1/2 text-primary/30 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#experiences"
            className="inline-flex items-center gap-2 rounded-full bg-grad-brand px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-rose/30 transition-transform hover:-translate-y-0.5"
          >
            Start Creating <ArrowRight className="size-4" /> <Sparkles className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Stories
   ============================================================ */

const summaryStats = [
  { value: "4.9/5", label: "Average rating" },
  { value: "12,847", label: "Reviews so far" },
  { value: "50K+", label: "Moments created" },
]

const testimonials = [
  {
    stars: 5,
    quote:
      "Made it at 1:40 in the morning because I had completely forgotten to order anything. Sent the link at midnight her time. She didn't reply for a good ten minutes and then just called. It's still saved on her home screen.",
    initial: "A",
    name: "Arjun M.",
    meta: "Birthday Surprise · Bengaluru",
  },
  {
    stars: 5,
    quote:
      "Felt a little stupid buying an apology, honestly. But we had been not-talking for four days and I had run out of ways to start. She read it and replied with two words. Come home.",
    initial: "R",
    name: "Rahul S.",
    meta: "Heartfelt Apology · Delhi",
  },
  {
    stars: 5,
    quote:
      "Used our wedding photos for our first anniversary. He is competitive about everything so of course he timed himself. Four minutes, and then he went very quiet.",
    initial: "P",
    name: "Priya K.",
    meta: "Photo Puzzle · Mumbai",
  },
  {
    stars: 5,
    quote:
      "Sent it to my best friend on a random Tuesday, no occasion, nothing. She sent back a voice note that was just her laughing for about forty seconds.",
    initial: "S",
    name: "Sneha T.",
    meta: "Best Friend Museum · Pune",
  },
  {
    stars: 4,
    quote:
      "Photos were slow to upload on my phone and I had to redo one of them. Still worth the twenty minutes — she screenshotted every page and put the lot in a highlight.",
    initial: "V",
    name: "Vikram J.",
    meta: "Girlfriend Surprise · Jaipur",
  },
  {
    stars: 5,
    quote:
      "Two years of long-distance and I had run out of ideas. He got as far as the timeline of our photos and said it was the first thing that made the distance feel smaller.",
    initial: "N",
    name: "Neha R.",
    meta: "Anniversary Love · Kolkata",
  },
]

export function Stories() {
  return (
    <section id="stories" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
            <span aria-hidden>💕</span> Love Stories
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What happened when they opened it
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/65">
            Most of these were put together late at night, on a phone, by someone who is not a designer
            and had about ten minutes. Here is what came back.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {summaryStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-grad-brand font-display text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs font-medium text-foreground/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="break-inside-avoid rounded-3xl border border-rose/10 bg-card p-6 shadow-sm"
            >
              <div className="text-sm text-coral">
                {"★".repeat(t.stars)}
                <span className="text-foreground/20">{"★".repeat(5 - t.stars)}</span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/75">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-grad-brand text-sm font-bold text-primary-foreground">
                  {t.initial}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                  <span className="block text-xs text-foreground/50">{t.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-grad-soft p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Make one for someone <span aria-hidden>💝</span>
          </h3>
          <p className="mt-2 text-sm text-foreground/65">
            About five minutes, on your phone. They just tap a link — nothing to install.
          </p>
          <a
            href="#experiences"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-grad-brand px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-rose/30 transition-transform hover:-translate-y-0.5"
          >
            Start Your Surprise
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FAQ
   ============================================================ */

const categories = [
  { key: "all", label: "All", emoji: "✨" },
  { key: "getting", label: "Getting Started", emoji: "🚀" },
  { key: "pricing", label: "Pricing", emoji: "💰" },
  { key: "sharing", label: "Sharing", emoji: "📤" },
  { key: "privacy", label: "Privacy & FAQ", emoji: "🔒" },
]

type FaqItem = { q: string; a: string; cat: string }

const faqs: FaqItem[] = [
  {
    cat: "getting",
    q: "What exactly am I creating?",
    a: "A personalized web page — an interactive digital surprise your loved one opens on their phone or laptop. Think animated birthday pages, proposal pages, photo puzzles, and more. No app to install; they just tap your link.",
  },
  {
    cat: "getting",
    q: "Do I need design skills or a laptop?",
    a: "Not at all. Everything works on your phone. You pick a template, add photos and a message, and we handle the animations, layout, and design. Most people finish in under five minutes.",
  },
  {
    cat: "pricing",
    q: "Can I see it before I pay?",
    a: "Yes. You can preview your entire surprise before spending anything. Unlock it free by watching a short ad, or pay a small amount to skip the ad — your choice.",
  },
  {
    cat: "sharing",
    q: "How long will I get to keep it?",
    a: "Your surprise link stays live so your loved one can revisit it any time. You'll always have access to the moments you created from your account.",
  },
  {
    cat: "privacy",
    q: "How do I actually send it to them?",
    a: "Once unlocked, you get a unique private link. Copy it and share via WhatsApp, Instagram, iMessage, or any app. Only people with the link can open it.",
  },
  {
    cat: "privacy",
    q: "Are my photos and messages private?",
    a: "Yes. Your surprise is only accessible through the private link you share. We never sell your data, and your photos are used solely to build your personalized page.",
  },
  {
    cat: "pricing",
    q: "What payment methods do you accept?",
    a: "We accept UPI, all major cards, and popular wallets. Payments are secure and processed instantly so your surprise unlocks right away.",
  },
]

export function Faq() {
  const [active, setActive] = useState("all")
  const [open, setOpen] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const filtered = faqs.filter((f) => active === "all" || f.cat === active)
  const visible = showAll ? filtered : filtered.slice(0, 5)

  return (
    <section id="faq" className="relative overflow-hidden bg-grad-soft py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Questions? <span className="text-grad-brand">We&apos;ve Got Answers</span>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-foreground/65">
            Everything worth knowing before you make your first surprise — what you get, how it
            reaches them, and what happens to your photos afterwards.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setActive(c.key)
                setOpen(0)
                setShowAll(false)
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active === c.key
                  ? "bg-grad-brand text-primary-foreground shadow-md shadow-rose/25"
                  : "border border-rose/15 bg-background/70 text-foreground/70 hover:bg-background"
              }`}
            >
              <span aria-hidden>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {visible.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-rose/10 bg-background shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-primary transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/65">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {!showAll && filtered.length > 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-rose/20 bg-background/70 px-6 py-2.5 text-sm font-semibold text-primary hover:bg-background"
            >
              View {filtered.length - 5} more questions
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-rose/10 bg-background p-6 text-center shadow-sm sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Still wondering about something?
            </h3>
            <p className="text-sm text-foreground/60">
              Got a niche question — we&apos;ll answer it within a couple of hours.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#experiences"
              className="inline-flex items-center gap-2 rounded-full bg-grad-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="size-4" /> Need help?
            </a>
            <a
              href="#experiences"
              className="inline-flex items-center gap-2 rounded-full border border-rose/20 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
            >
              <LifeBuoy className="size-4" /> Start Creating
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Final CTA
   ============================================================ */

export function FinalCta() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-grad-brand px-6 py-16 text-center shadow-2xl shadow-rose/30 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute left-8 top-8 text-4xl" aria-hidden>🎈</div>
          <div className="absolute right-10 top-12 text-3xl" aria-hidden>💝</div>
          <div className="absolute bottom-10 left-16 text-3xl" aria-hidden>✨</div>
          <div className="absolute bottom-8 right-12 text-4xl" aria-hidden>🎁</div>
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
            Ready in 5 minutes
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-5xl">
            Ready to make someone&apos;s day unforgettable?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/85">
            Join 50,000+ creators who&apos;ve turned ordinary moments into magical memories. Your
            surprise is just a few taps away.
          </p>
          <a
            href="#experiences"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-bold text-primary shadow-xl transition-transform hover:-translate-y-0.5"
          >
            <Gift className="size-5" /> Create Your Surprise <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Site Footer
   ============================================================ */

const footerColumns = [
  {
    title: "Experiences",
    links: [
      "Surprise Proposal",
      "Birthday Surprise",
      "Girlfriend Surprise",
      "Best Friend Museum",
      "Photo Puzzle",
      "Anniversary Love",
      "Heartfelt Apology",
      "UPI QR Gift",
    ],
  },
  {
    title: "Company",
    links: ["How It Works", "Love Stories", "Pricing", "FAQ", "About Us", "Contact"],
  },
]

const socials = [
  { icon: Camera, label: "Instagram" },
  { icon: Send, label: "Twitter" },
  { icon: Play, label: "YouTube" },
  { icon: Mail, label: "Email" },
]

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-grad-brand">
                <Heart className="size-5 fill-primary-foreground text-primary-foreground" />
              </span>
              <span className="font-display text-xl font-extrabold text-primary-foreground">
                ourmoments
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-footer-foreground/70">
              Crafting unforgettable digital surprises for the people you love. From heartfelt
              proposals to fun puzzles — we help you turn ordinary moments into magical, shareable
              memories.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 text-footer-foreground transition-colors hover:bg-grad-brand hover:text-primary-foreground"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#experiences"
                      className="text-sm text-footer-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-primary-foreground/5 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-lg font-bold text-primary-foreground">
                Stay in the loop
              </h3>
              <p className="text-sm text-footer-foreground/70">
                Get new experiences and seasonal templates in your inbox.
              </p>
            </div>
            <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-footer-foreground/50 focus:border-primary-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-grad-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-sm text-footer-foreground/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} OurMoments. Made with{" "}
            <Heart className="inline size-3.5 fill-primary text-primary" /> in India.
          </p>
          <div className="flex gap-6">
            <a href="#top" className="transition-colors hover:text-primary-foreground">
              Privacy Policy
            </a>
            <a href="#top" className="transition-colors hover:text-primary-foreground">
              Terms of Service
            </a>
            <a href="#top" className="transition-colors hover:text-primary-foreground">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
