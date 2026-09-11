import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const imageStreamCdn = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";

const showcaseImages = [
  {
    src: `${imageStreamCdn}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Quyosh botishidagi dengiz manzarasi bilan uyg'unlashgan siluet",
  },
  {
    src: `${imageStreamCdn}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Yumshoq ko'p rangli gradient",
  },
  {
    src: `${imageStreamCdn}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Shahar manzarasi bilan uyg'unlashgan portret",
  },
  {
    src: `${imageStreamCdn}/gradients/crimson_aura/crimson-aura-02.png`,
    alt: "Crimson aura gradienti",
  },
  {
    src: `${imageStreamCdn}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "To'q sariq fondagi harakatli portret",
  },
  {
    src: `${imageStreamCdn}/gradients/hue-flow/hue-flow-01.png`,
    alt: "Oqimli rang gradienti",
  },
  {
    src: `${imageStreamCdn}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Rangli bulutga aylanayotgan sportchi silueti",
  },
  {
    src: `${imageStreamCdn}/gradients/moon/moon-grade-03.png`,
    alt: "Oy ranglaridagi gradient",
  },
  {
    src: `${imageStreamCdn}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Rangli qush kompozitsiyasi bilan qo'l harakati",
  },
  {
    src: `${imageStreamCdn}/gradients/hero_gradient/hero-gradients-03.png`,
    alt: "Qatlamli hero gradienti",
  },
  {
    src: `${imageStreamCdn}/gradients/hue-flow/hue-flow-02.png`,
    alt: "Ikkinchi oqimli rang gradienti",
  },
  {
    src: `${imageStreamCdn}/gradients/moon/moon-grade-05.png`,
    alt: "Chuqur oy ranglaridagi gradient",
  },
];

export function VocoraStreamHero() {
  return (
    <ImageStreamHero
      images={showcaseImages}
      cards={10}
      speed={24}
      axis={61}
      path={{
        birthHeight: 2.4,
        exitHeight: 44,
        railBirth: -12,
        railExit: 45,
      }}
      className="vocora-stream-hero"
    >
      <div className="vocora-stream-content">
        <div className="vocora-stream-brand" aria-label="Vocora team">
          <span aria-hidden="true" />
          Vocora <em>team</em>
        </div>

        <div className="vocora-stream-copy">
          <p className="vocora-stream-eyebrow">
            Web • Mobile • Telegram
          </p>
          <h1>
            G&apos;oyangizni <strong>raqamli mahsulotga</strong> aylantiramiz.
          </h1>
          <p className="vocora-stream-lead">
            Landing page, veb-sayt, mobil ilova va Telegram bot — dizayn,
            dasturlash va ishga tushirish bir jamoada.
          </p>

          <div className="vocora-stream-actions">
            <a className="btn btn-primary" href="#loyihalar">
              Ishlarimizni ko&apos;rish <span aria-hidden="true">→</span>
            </a>
            <a
              className="btn btn-ghost"
              href="https://t.me/madamin0318"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegramda yozish <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="vocora-stream-proof" aria-label="Ishlash afzalliklari">
          <div>
            <strong>4 yo&apos;nalish</strong>
            <span>Web, landing, mobil va bot</span>
          </div>
          <div>
            <strong>&lt; 1 kun</strong>
            <span>ichida javob</span>
          </div>
          <div>
            <strong>End-to-end</strong>
            <span>g&apos;oyadan launchgacha</span>
          </div>
        </div>
      </div>
    </ImageStreamHero>
  );
}
