import { ImageStreamHero } from "@/components/ui/image-stream-hero";

const portfolioImages = [
  {
    src: "/projects/anivoai-home.jpg",
    alt: "AnivoAI sun'iy intellekt platformasi",
  },
  {
    src: "/projects/fermiclinic-home.jpg",
    alt: "FermiClinic tibbiyot platformasi",
  },
  {
    src: "/projects/testkorea-bot.jpg",
    alt: "Test Korea Telegram bot loyihasi",
  },
  {
    src: "/projects/fermi-home.jpg",
    alt: "Fermi korporativ veb-sayti",
  },
];

export function VocoraStreamHero() {
  return (
    <ImageStreamHero
      images={portfolioImages}
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
