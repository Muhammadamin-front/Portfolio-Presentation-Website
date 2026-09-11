import {
  HeroCarousel,
  type HeroCarouselItem,
} from "@/components/ui/hero-carousel";

const projects: HeroCarouselItem[] = [
  {
    id: "anivoai",
    title: "AnivoAI\nSmart Farm",
    image: "/projects/anivoai-home.jpg",
    credit: "VOCORA TEAM / CASE 01",
    meta: ["AI PLATFORM", "LIVE"],
    accent: "#315d30",
  },
  {
    id: "fermiclinic",
    title: "FermiClinic\nHealthcare",
    image: "/projects/fermiclinic-home.jpg",
    credit: "VOCORA TEAM / CASE 02",
    meta: ["WEB PLATFORM", "LIVE"],
    accent: "#6d2430",
  },
  {
    id: "testkorea",
    title: "Test Korea\nTelegram Bot",
    image: "/projects/testkorea-bot.jpg",
    credit: "VOCORA TEAM / CASE 03",
    meta: ["AUTOMATION", "LIVE"],
    accent: "#28446e",
  },
  {
    id: "fermi",
    title: "Fermi\nDigital Platform",
    image: "/projects/fermi-home.jpg",
    credit: "VOCORA TEAM / CASE 04",
    meta: ["CORPORATE WEB", "LIVE"],
    accent: "#8a3f21",
  },
];

export function VocoraProjectCarousel() {
  return (
    <div className="vocora-project-showcase">
      <div className="vocora-project-showcase-note">
        <span>Tanlangan ishlar</span>
        <p>Surish, aylantirish yoki klaviatura orqali ko&apos;ring</p>
      </div>
      <div className="vocora-project-carousel-frame">
        <HeroCarousel
          items={projects}
          defaultIndex={0}
          autoplay
          autoplayDelay={5200}
          brand="VOCORA / SELECTED WORK"
          className="vocora-project-carousel"
        />
      </div>
    </div>
  );
}
