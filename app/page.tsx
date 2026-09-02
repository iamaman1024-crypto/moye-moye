import {
  SiteHeader,
  Hero,
  Experiences,
  HowItWorks,
  Stories,
  Faq,
  FinalCta,
  SiteFooter,
} from "@/components/site-sections"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Experiences />
      <HowItWorks />
      <Stories />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
