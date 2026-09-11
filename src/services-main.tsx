import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import "./index.css";
import "./services-page.css";

type ServiceKey = "website" | "mobile" | "bot";

type ServiceInfo = {
  index: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  outcome: string;
  price: string;
  timeline: string;
  tags: string[];
  details: Array<{ title: string; text: string }>;
  steps: string[];
};

const serviceOrder: ServiceKey[] = ["website", "mobile", "bot"];

const services: Record<ServiceKey, ServiceInfo> = {
  website: {
    index: "01",
    navLabel: "Website",
    eyebrow: "Doimiy raqamli manzil",
    title: "Website yaratish",
    headline: "Biznesingizni 24/7 tushuntiradigan va mijoz olib keladigan platforma.",
    description:
      "Website — kompaniyangizning internetdagi asosiy nuqtasi. Unda xizmat, mahsulot, portfolio va bog‘lanish jarayoni bitta ishonchli tajribaga birlashadi.",
    outcome: "Tashrifchidan murojaatgacha",
    price: "700 000 so‘mdan",
    timeline: "7–14 ish kuni",
    tags: ["Landing", "Korporativ sayt", "Web-app", "SEO"],
    details: [
      { title: "Ishonch uyg‘otadi", text: "Brend, xizmat va natijalaringizni professional ko‘rinishda taqdim etadi." },
      { title: "Mijoz yig‘adi", text: "CTA, forma va analitika orqali tashrifchini real so‘rovga aylantiradi." },
      { title: "Har ekranda ishlaydi", text: "Desktop, planshet va telefonda tez hamda qulay tajriba beradi." },
    ],
    steps: ["Struktura va kontent", "UI/UX dizayn", "Kod, test va launch"],
  },
  mobile: {
    index: "02",
    navLabel: "Mobile app",
    eyebrow: "Doimo mijoz qo‘lida",
    title: "Mobil ilova",
    headline: "Xizmatingizni telefon ichidagi tez, sodda va odatga aylanuvchi tajribaga aylantiramiz.",
    description:
      "Mobil ilova — foydalanuvchi tez-tez qaytadigan mahsulotlar uchun qulay yechim. Kabinet, to‘lov, buyurtma va bildirishnomalar bitta ilovada ishlaydi.",
    outcome: "Bir tegishda asosiy jarayon",
    price: "Kelishiladi",
    timeline: "4–8 hafta",
    tags: ["iOS", "Android", "Push", "To‘lov"],
    details: [
      { title: "Tezkor foydalanish", text: "Muhim amallar qisqa yo‘l va tushunarli navigatsiya bilan bajariladi." },
      { title: "Qayta jalb qiladi", text: "Push-bildirishnoma va shaxsiy takliflar mijozni mahsulotga qaytaradi." },
      { title: "Real vaqt ma’lumoti", text: "Buyurtma, balans va statuslar doim yangilanib turadi." },
    ],
    steps: ["Product discovery", "Prototip va test", "Development va store"],
  },
  bot: {
    index: "03",
    navLabel: "Telegram bot",
    eyebrow: "Avtomatlashtirilgan yordamchi",
    title: "Telegram bot",
    headline: "Takroriy savol va buyurtmalarni avtomatik bajaradigan, tunu kun ishlaydigan yordamchi.",
    description:
      "Telegram bot — mijoz allaqachon ishlatadigan messenjer ichida xizmat ko‘rsatadi. Buyurtma, narx, bron va operatorga ulash jarayonlarini tezlashtiradi.",
    outcome: "Suhbatdan tayyor buyurtmagacha",
    price: "2 mln so‘mdan",
    timeline: "10–20 ish kuni",
    tags: ["Buyurtma", "CRM", "To‘lov", "Admin panel"],
    details: [
      { title: "24/7 javob beradi", text: "Ko‘p so‘raladigan savollar va asosiy xizmatlar doim ochiq bo‘ladi." },
      { title: "Jarayonni qisqartiradi", text: "Forma o‘rniga ketma-ket savollar bilan kerakli ma’lumotni yig‘adi." },
      { title: "Tizimlarga ulanadi", text: "CRM, to‘lov, Google Sheets yoki ichki API bilan ishlashi mumkin." },
    ],
    steps: ["Dialog ssenariysi", "Bot va integratsiya", "Test va monitoring"],
  },
};

function initialService(): ServiceKey {
  const value = new URLSearchParams(window.location.search).get("type");
  return value === "mobile" || value === "bot" ? value : "website";
}

function WebsiteDemo() {
  const [page, setPage] = useState<"home" | "services" | "result">("home");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const scenes = {
    home: { kicker: "Digital studio", title: "G‘oyangizni kuchli mahsulotga aylantiramiz.", action: "Loyihani boshlash" },
    services: { kicker: "Xizmatlar", title: "Dizayn, development va launch — bir jamoada.", action: "Xizmatlarni ko‘rish" },
    result: { kicker: "Natija", title: "Tez yuklanadi. Ishonch beradi. Mijoz olib keladi.", action: "Case study" },
  };
  const scene = scenes[page];

  return (
    <div className="web-demo">
      <div className="demo-toolbar" aria-label="Website demo boshqaruvi">
        <div className="demo-segment">
          <button aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>Desktop</button>
          <button aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}>Mobil</button>
        </div>
        <span>Jonli layout</span>
      </div>
      <div className={`web-device web-device--${device}`}>
        <div className="web-browser-bar">
          <span /><span /><span />
          <div>vocora.uz</div>
        </div>
        <div className="web-site">
          <nav>
            <b><i />Vocora</b>
            <div>
              {(["home", "services", "result"] as const).map((item) => (
                <button key={item} aria-pressed={page === item} onClick={() => setPage(item)}>
                  {item === "home" ? "Bosh sahifa" : item === "services" ? "Xizmatlar" : "Natija"}
                </button>
              ))}
            </div>
          </nav>
          <div className="web-scene" key={page}>
            <div className="web-scene-copy">
              <span>{scene.kicker}</span>
              <h3>{scene.title}</h3>
              <button onClick={() => setPage(page === "result" ? "home" : "result")}>{scene.action} <b>↗</b></button>
            </div>
            <div className="web-art" aria-hidden="true">
              <div className="web-orbit web-orbit--one" />
              <div className="web-orbit web-orbit--two" />
              <div className="web-cube"><span>V</span></div>
              <div className="web-pill">+47% conversion</div>
            </div>
          </div>
          <div className="web-proof">
            <span><b>0.8s</b> yuklanish</span>
            <span><b>100%</b> responsive</span>
            <span><b>SEO</b> tayyor</span>
          </div>
        </div>
      </div>
      <p className="demo-hint"><span /> Qurilma va menyuni bosib ko‘ring</p>
    </div>
  );
}

function MobileDemo() {
  const [screen, setScreen] = useState<"home" | "analytics" | "tasks">("home");

  return (
    <div className="mobile-demo">
      <div className="phone-glow" aria-hidden="true" />
      <div className="phone-frame">
        <div className="phone-speaker" />
        <div className="phone-screen" key={screen}>
          <div className="phone-status"><span>9:41</span><span>● ◒ ▰</span></div>
          {screen === "home" && (
            <div className="app-home">
              <p>Assalomu alaykum, Aziz</p>
              <h3>Bugungi rejangiz</h3>
              <div className="app-balance"><span>Umumiy balans</span><strong>12 840 000 <small>so‘m</small></strong><i>+12.4% bu oy</i></div>
              <div className="app-actions"><button>To‘lov</button><button>O‘tkazma</button><button>Tarix</button></div>
              <div className="app-row"><span><i />Yangi buyurtma</span><b>09:30</b></div>
              <div className="app-row"><span><i />Mijoz bilan uchrashuv</span><b>14:00</b></div>
            </div>
          )}
          {screen === "analytics" && (
            <div className="app-analytics">
              <p>Analitika</p><h3>O‘sish dinamikasi</h3>
              <strong>+34.8%</strong><span>so‘nggi 30 kun</span>
              <div className="app-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="app-stat-grid"><div><small>Mijozlar</small><b>1 248</b></div><div><small>Buyurtma</small><b>384</b></div></div>
            </div>
          )}
          {screen === "tasks" && (
            <div className="app-tasks">
              <p>Vazifalar</p><h3>Bugun bajariladi</h3>
              {["Dizaynni tasdiqlash", "API ni tekshirish", "Release tayyorlash"].map((task, index) => (
                <label key={task}><input type="checkbox" defaultChecked={index === 0} /><span>{task}</span><small>0{index + 1}</small></label>
              ))}
              <button className="app-add">+ Yangi vazifa</button>
            </div>
          )}
          <div className="app-nav" aria-label="Mobil demo navigatsiyasi">
            <button aria-pressed={screen === "home"} onClick={() => setScreen("home")}><span>⌂</span>Bosh</button>
            <button aria-pressed={screen === "analytics"} onClick={() => setScreen("analytics")}><span>⌁</span>Statistika</button>
            <button aria-pressed={screen === "tasks"} onClick={() => setScreen("tasks")}><span>✓</span>Vazifalar</button>
          </div>
        </div>
      </div>
      <div className="mobile-notes" aria-hidden="true">
        <div><span>01</span><b>Tez navigatsiya</b><small>3 bosishda maqsadga</small></div>
        <div><span>02</span><b>Real-time</b><small>Ma’lumot doim yangi</small></div>
        <div><span>03</span><b>Push</b><small>Mijozga vaqtida xabar</small></div>
      </div>
      <p className="demo-hint"><span /> Telefon menyusini bosib ko‘ring</p>
    </div>
  );
}

const botFlows = {
  order: {
    user: "Buyurtma bermoqchiman",
    bot: "Ajoyib! Qaysi xizmat sizga kerak?",
    options: ["Website", "Mobil ilova", "Telegram bot"],
  },
  price: {
    user: "Narxlarni ko‘rsat",
    bot: "Boshlang‘ich paketlarimiz quyidagicha:",
    options: ["Website — 700 000", "Bot — 2 mln", "Individual hisoblash"],
  },
  operator: {
    user: "Mutaxassis bilan gaplashish",
    bot: "So‘rovingiz qabul qilindi. Mutaxassisimiz tez orada siz bilan bog‘lanadi.",
    options: ["Telefon qoldirish", "Telegram username"],
  },
};

function BotDemo() {
  const [flow, setFlow] = useState<keyof typeof botFlows>("order");
  const activeFlow = botFlows[flow];

  return (
    <div className="bot-demo">
      <div className="bot-workflow" aria-hidden="true">
        <span>So‘rov</span><i>→</i><span>Bot</span><i>→</i><span>CRM</span>
      </div>
      <div className="chat-window">
        <header><div className="chat-avatar">➤</div><div><b>Vocora Assistant</b><span>bot • online</span></div><i>•••</i></header>
        <div className="chat-body" key={flow}>
          <div className="chat-message chat-message--bot">Assalomu alaykum! 👋 Sizga qanday yordam beray?</div>
          <div className="chat-message chat-message--user">{activeFlow.user}</div>
          <div className="chat-message chat-message--bot">{activeFlow.bot}</div>
          <div className="chat-options">
            {activeFlow.options.map((option) => <button key={option}>{option}</button>)}
          </div>
        </div>
        <footer><span>Xabar yozing...</span><button>➤</button></footer>
      </div>
      <div className="bot-quick" aria-label="Bot demo ssenariylari">
        <button aria-pressed={flow === "order"} onClick={() => setFlow("order")}>Buyurtma</button>
        <button aria-pressed={flow === "price"} onClick={() => setFlow("price")}>Narxlar</button>
        <button aria-pressed={flow === "operator"} onClick={() => setFlow("operator")}>Operator</button>
      </div>
      <p className="demo-hint"><span /> Ssenariyni tanlab bot javobini ko‘ring</p>
    </div>
  );
}

function ServicePreview({ service }: { service: ServiceKey }) {
  if (service === "mobile") return <MobileDemo />;
  if (service === "bot") return <BotDemo />;
  return <WebsiteDemo />;
}

function ServicesPage() {
  const [activeService, setActiveService] = useState<ServiceKey>(initialService);
  const active = services[activeService];

  useEffect(() => {
    document.title = `${active.title} — Vocora`;
  }, [active.title]);

  function selectService(service: ServiceKey, scroll = false) {
    setActiveService(service);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("type", service);
    window.history.replaceState({}, "", nextUrl);
    if (scroll) {
      window.setTimeout(() => document.querySelector(".service-lab")?.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
    }
  }

  return (
    <main className="services-page">
      <header className="services-nav">
        <a className="services-brand" href="/"><span />Vocora <small>services</small></a>
        <nav aria-label="Sahifa navigatsiyasi">
          <a href="/prices.html">Narxlar</a>
          <a className="services-back" href="/">Portfolio <span>↗</span></a>
        </nav>
      </header>

      <div className="services-wrap">
        <section className="services-hero" aria-labelledby="services-title">
          <div>
            <p className="services-kicker">Interactive service lab / 2026</p>
            <h1 id="services-title">Texnologiyani <em>ko‘rib</em>, keyin tanlang.</h1>
          </div>
          <p>Website, mobil ilova va Telegram botning farqini oddiy ta’rif bilan emas — ishlaydigan mini tajriba orqali ko‘ring.</p>
        </section>

        <div className="service-selector" role="tablist" aria-label="Xizmatni tanlang">
          {serviceOrder.map((service) => {
            const item = services[service];
            return (
              <button key={service} role="tab" aria-selected={activeService === service} onClick={() => selectService(service)}>
                <span>{item.index}</span><b>{item.navLabel}</b><i>{activeService === service ? "Tanlandi" : "Ko‘rish"} ↗</i>
              </button>
            );
          })}
        </div>

        <section className="service-lab" aria-live="polite">
          <article className="service-info" key={`info-${activeService}`}>
            <div className="service-info-top"><span>{active.index} / 03</span><i>{active.eyebrow}</i></div>
            <p className="service-label">{active.navLabel}</p>
            <h2>{active.headline}</h2>
            <p className="service-description">{active.description}</p>
            <div className="service-outcome"><span>Asosiy natija</span><strong>{active.outcome}</strong></div>
            <div className="service-meta"><div><span>Boshlanishi</span><b>{active.price}</b></div><div><span>Muddat</span><b>{active.timeline}</b></div></div>
            <div className="service-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <AntiMetalButton className="service-cta" label="Loyihani muhokama qilish" accentFrom="#f7aa6c" accentTo="#e36928" onClick={() => { window.location.href = "/#aloqa"; }} />
          </article>

          <div className="service-preview" key={`preview-${activeService}`}>
            <div className="preview-heading"><div><span className="preview-live" />Interactive preview</div><small>UI ni bosib ko‘ring</small></div>
            <ServicePreview service={activeService} />
          </div>
        </section>

        <section className="service-details" aria-labelledby="detail-title">
          <div className="details-heading"><p className="services-kicker">Nima beradi?</p><h2 id="detail-title">{active.title} biznesingizda qanday ishlaydi</h2></div>
          <div className="detail-grid">
            {active.details.map((detail, index) => (
              <article key={detail.title}><span>0{index + 1}</span><h3>{detail.title}</h3><p>{detail.text}</p></article>
            ))}
          </div>
          <div className="service-process">
            <p>Jarayon</p>
            {active.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><b>{step}</b>{index < active.steps.length - 1 && <i>→</i>}</div>)}
          </div>
        </section>

        <section className="service-compare" aria-labelledby="compare-title">
          <div><p className="services-kicker">Tezkor taqqoslash</p><h2 id="compare-title">Qaysi biri sizga mos?</h2></div>
          <div className="compare-grid">
            {serviceOrder.map((service) => (
              <button key={service} aria-pressed={activeService === service} onClick={() => selectService(service, true)}>
                <span>{services[service].index}</span><b>{services[service].navLabel}</b>
                <p>{service === "website" ? "Topilish, ishonch va sotuv uchun." : service === "mobile" ? "Doimiy foydalanish va sodiqlik uchun." : "Tez xizmat va avtomatlashtirish uchun."}</p>
              </button>
            ))}
          </div>
        </section>

        <footer className="services-footer"><span>© 2026 Vocora team</span><a href="/#aloqa">G‘oyangizni muhokama qilamiz ↗</a></footer>
      </div>
    </main>
  );
}

const root = document.getElementById("services-root");
if (root) createRoot(root).render(<ServicesPage />);
