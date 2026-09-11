import { createRoot } from "react-dom/client";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import "./index.css";
import "./liquid-page.css";

const plans = [
  {
    index: "01",
    name: "Start",
    eyebrow: "Landing & Portfolio",
    price: "700 000",
    suffix: "so'mdan",
    timeline: "7–10 ish kuni",
    description:
      "G'oyani tez va professional tarzda internetga olib chiqish uchun.",
    features: [
      "1–5 sahifali zamonaviy dizayn",
      "Mobil va planshetga moslashuv",
      "Asosiy SEO sozlamalari",
      "Kontakt forma va analitika",
    ],
  },
  {
    index: "02",
    name: "Business",
    eyebrow: "Website & Telegram bot",
    price: "2 mln",
    suffix: "so'mdan",
    timeline: "14–21 ish kuni",
    description:
      "Jarayonlarni avtomatlashtirish va mijozlar oqimini oshirish uchun.",
    features: [
      "Individual UX/UI dizayn",
      "Admin panel yoki Telegram bot",
      "API va to'lov integratsiyalari",
      "Ishga tushirish va 30 kun support",
    ],
    featured: true,
  },
  {
    index: "03",
    name: "Product",
    eyebrow: "Web yoki Mobile MVP",
    price: "Kelishiladi",
    suffix: "scope asosida",
    timeline: "4–8 hafta",
    description:
      "Bozorga tayyor raqamli mahsulotni g'oyadan launchgacha yaratish uchun.",
    features: [
      "Product discovery va prototip",
      "Frontend va backend ishlab chiqish",
      "Test, deploy va monitoring",
      "Keyingi bosqich uchun roadmap",
    ],
  },
];

function openContact() {
  window.location.href = "/#aloqa";
}

function PricingPage() {
  return (
    <main className="liquid-page pricing-page">
      <LiquidEffectAnimation />

      <header className="liquid-nav" aria-label="Narxlar sahifasi navigatsiyasi">
        <a className="liquid-brand" href="/">
          <span aria-hidden="true" />
          Vocora <small>pricing</small>
        </a>
        <a className="liquid-back" href="/">
          Portfolio'ga qaytish <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="pricing-content">
        <section className="pricing-hero" aria-labelledby="pricing-title">
          <p className="liquid-kicker">Xizmat paketlari / 2026</p>
          <h1 id="pricing-title">
            Aniq narx. <em>Kuchli natija.</em>
          </h1>
          <p>
            Tayyor paketdan boshlang yoki loyihangiz uchun individual yechim
            tanlang. Har bir paketda dizayn, ishlab chiqish va ishga tushirish
            mavjud.
          </p>
          <div className="pricing-trust" aria-label="Barcha paketlarda mavjud">
            <span>Shartnoma</span>
            <span>Bosqichma-bosqich to'lov</span>
            <span>Support</span>
          </div>
        </section>

        <section className="pricing-grid" aria-label="Xizmat narxlari">
          {plans.map((plan) => (
            <article
              className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}
              key={plan.name}
            >
              <div className="pricing-card-top">
                <span className="pricing-index">{plan.index}</span>
                {plan.featured && <span className="pricing-popular">Eng mashhur</span>}
              </div>
              <p className="pricing-eyebrow">{plan.eyebrow}</p>
              <h2>{plan.name}</h2>
              <p className="pricing-card-description">{plan.description}</p>
              <div className="pricing-price">
                <strong>{plan.price}</strong>
                <span>{plan.suffix}</span>
              </div>
              <p className="pricing-timeline">
                <span aria-hidden="true" /> {plan.timeline}
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <AntiMetalButton
                className="mt-auto w-full"
                label="Muhokama qilish"
                accentFrom={plan.featured ? "#f7b476" : "#ef965c"}
                accentTo={plan.featured ? "#e8722e" : "#cf5822"}
                onClick={openContact}
              />
            </article>
          ))}
        </section>

        <section className="pricing-custom" aria-labelledby="custom-title">
          <div>
            <p className="pricing-eyebrow">Maxsus loyiha</p>
            <h2 id="custom-title">Paketga sig'maydigan g'oyangiz bormi?</h2>
            <p>
              Talablarni birga aniqlaymiz va faqat kerakli funksiyalar asosida
              individual taklif tayyorlaymiz.
            </p>
          </div>
          <AntiMetalButton
            className="w-48 shrink-0"
            label="Brief yuborish"
            accentFrom="#f7b476"
            accentTo="#e8722e"
            onClick={openContact}
          />
        </section>

        <footer className="pricing-footer">
          <span>Narxlar loyiha hajmi va integratsiyalarga qarab aniqlashtiriladi.</span>
          <span>© 2026 Vocora team</span>
        </footer>
      </div>
    </main>
  );
}

const root = document.getElementById("liquid-root");

if (root) createRoot(root).render(<PricingPage />);
