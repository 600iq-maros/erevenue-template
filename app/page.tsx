import { Monitor, Calendar, Check, Star, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    text: "Ako sme klientovi pomohli prekonať jeho problém + výsledky. Cieľom je aby sa návštevník webu s ním stotožnil a videl, že rovnaký problém ako má on sme už pomohli niekomu jemu podobnému vyriešiť",
    name: "Meno Priezvisko",
    role: "Povolanie",
  },
  {
    text: "Ako sme klientovi pomohli prekonať jeho problém + výsledky. Cieľom je aby sa návštevník webu s ním stotožnil a videl, že rovnaký problém ako má on sme už pomohli niekomu jemu podobnému vyriešiť",
    name: "Meno Priezvisko",
    role: "Povolanie",
  },
];

const features = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor lorem ac eros tristique fermentum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor lorem ac eros tristique fermentum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor lorem ac eros tristique fermentum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor lorem ac eros tristique fermentum.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-white">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* Purple glow effect */}
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-[50%] bg-[#C9A0E8]/30 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6 pb-28 pt-14 text-center sm:pb-36 sm:pt-16">
          {/* Logo */}
          <div className="mb-10 flex items-center justify-center gap-2">
            <Rocket className="h-6 w-6 text-text-primary" />
            <span className="text-2xl font-bold tracking-wide text-text-primary">
              WebZaTýždeň
            </span>
          </div>

          {/* Trust Badges */}
          <div className="mb-12 flex items-center justify-center gap-10 text-base font-semibold text-text-secondary">
            <span className="flex items-center gap-2.5">
              <Monitor className="h-5 w-5" />
              Nezáväzná Konzultácia
            </span>
            <span className="flex items-center gap-2.5">
              <Calendar className="h-5 w-5" />
              Online Stretnutie
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight text-text-primary sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
            Získajte [vysnívaný výsledok] za [časový úsek] vďaka [unikátna
            metóda]
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-14 max-w-xl text-lg text-text-secondary">
            Bez [strach / nepríjemná vec, ktorej sa klienti obávajú.]
          </p>

          {/* CTA Button */}
          <a
            href="#cta"
            className="inline-block rounded-full bg-primary px-16 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Chcem stretnutie
          </a>
        </div>
      </section>

      {/* ===== SECTION 2: TESTIMONIALS ===== */}
      <section className="bg-bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Section Title */}
          <h2 className="mb-16 text-center text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
            Povedali o mne 👇
          </h2>

          {/* Testimonial Grid */}
          <div className="grid gap-12 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i}>
                {/* Card with speech bubble */}
                <div className="speech-bubble rounded-2xl bg-bg-card p-8">
                  <p className="text-base leading-relaxed text-text-secondary">
                    {t.text}
                  </p>
                </div>
                {/* Author Info */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-bold text-text-primary">{t.name}</p>
                    <p className="text-sm text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <a
              href="#cta"
              className="inline-block rounded-full bg-primary px-16 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Chcem stretnutie
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: ABOUT / FEATURES SPLIT ===== */}
      <section className="bg-bg-light px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[9fr_11fr]">
          {/* Left Column — Profile Placeholder */}
          <div className="relative flex min-h-[600px] items-start rounded-3xl bg-gray-300 p-10">
            <h3 className="text-4xl font-bold leading-tight text-white">
              Meno
              <br />
              Priezvisko
            </h3>
          </div>

          {/* Right Column — Features List */}
          <div className="flex flex-col gap-5">
            {features.map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-5 rounded-2xl bg-white p-6"
              >
                {/* Icon placeholder */}
                <div className="h-24 w-24 shrink-0 rounded-2xl bg-gray-300" />
                {/* Text */}
                <p className="flex-1 text-base leading-relaxed text-text-secondary">
                  {text}
                </p>
                {/* Checkmark badge */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: FINAL CTA ===== */}
      <section id="cta" className="bg-bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-gradient-to-b from-cta-from to-cta-to px-8 py-16 text-center sm:px-16 sm:py-20">
          {/* Headline */}
          <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Prvý krok je najdôležitejší.
            <br />
            Rezervujte si stretnutie:
          </h2>

          {/* Subtext */}
          <p className="mb-10 text-lg text-text-secondary">
            Kliknite na tlačítko a objednajte sa na nezáväznú konzultáciu.
          </p>

          {/* Scarcity Indicator */}
          <div className="mb-10 flex items-center justify-center gap-2.5">
            <span className="mr-3 text-sm font-medium text-text-primary">
              Len pár miest týždenne
            </span>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-white ${
                  i >= 3 ? "opacity-60" : ""
                }`}
              >
                <Check className="h-4 w-4 text-gray-500" />
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/dotaznik"
            className="inline-block rounded-full bg-primary px-20 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Chcem stretnutie
          </Link>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            {/* Stars + Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-accent-yellow text-accent-yellow"
                />
              ))}
              <span className="ml-2 text-base font-semibold text-text-primary">
                4.9/5
              </span>
            </div>

            {/* Overlapping Avatars */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {["/avatars/person1.jpg", "/avatars/person2.jpg", "/avatars/person3.jpg", "/avatars/person4.jpg"].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Spokojný klient"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-[#B285E1]/40 object-cover"
                  />
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#B285E1]/40 bg-gray-700 text-xs font-bold text-white">
                  +76
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-bg-white px-6 pb-8 pt-12">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-12 text-sm text-text-muted">
          <Link href="/gdpr" className="hover:underline">GDPR</Link>
          <span>TOMAR Group s.r.o. 2026</span>
        </div>
      </footer>
    </main>
  );
}
