import {
  HeroCarousel,
  type HeroCarouselItem,
} from "@/components/ui/hero-carousel";

const carouselArt = (name: string) =>
  `https://pub-45c4a3d9611041d08fe82d52599b72b0.r2.dev/primary-showcase-assets/${name}.jpg`;

const visualStories: HeroCarouselItem[] = [
  {
    title: "Prismatic\nRift",
    image: carouselArt("prismatic-rift-anime"),
    credit: "BY AURELIA STUDIO.",
    meta: ["SAT NOV 15", "5–10 PM", "MIAMI"],
    accent: "#7b61ff",
  },
  {
    title: "Ember\nClouds",
    image: carouselArt("black-hole-ember-clouds"),
    credit: "BY MAISON DELACROIX.",
    meta: ["SUN NOV 16", "2–6 PM", "PARIS"],
    accent: "#ff4114",
  },
  {
    title: "Neon\nPortal",
    image: carouselArt("neon-cave-portal-silhouette"),
    credit: "BY STUDIO VANTA.",
    meta: ["THU NOV 20", "8–11 PM", "BERLIN"],
    accent: "#00c8ff",
  },
  {
    title: "Red\nRibbon",
    image: carouselArt("red-ribbon-typography"),
    credit: "BY CASA SOLARA.",
    meta: ["FRI NOV 21", "6–9 PM", "LISBON"],
    accent: "#e5231b",
  },
  {
    title: "Celestial\nLight",
    image: carouselArt("celestial-light-figure"),
    credit: "BY AURELIA STUDIO.",
    meta: ["SAT NOV 22", "5–10 PM", "MIAMI"],
    accent: "#2f7bff",
  },
  {
    title: "Neon\nUplight",
    image: carouselArt("neon-portrait-uplight"),
    credit: "BY ATELIER SUD.",
    meta: ["SUN NOV 23", "4–8 PM", "MARRAKECH"],
    accent: "#ff2f9c",
  },
  {
    title: "Indigo\nMarble",
    image: carouselArt("indigo-liquid-marble"),
    credit: "BY OCHRE COLLECTIVE.",
    meta: ["WED NOV 26", "7–11 PM", "LAGOS"],
    accent: "#4356c8",
  },
  {
    title: "Launch\nWindow",
    image: carouselArt("rocket-launch-gradient"),
    credit: "BY STUDIO NORTE.",
    meta: ["FRI NOV 28", "9 PM–2 AM", "SÃO PAULO"],
    accent: "#14307a",
  },
  {
    title: "Cosmic\nWave",
    image: carouselArt("astronaut-cosmic-wave"),
    credit: "BY NOIR ET CIE.",
    meta: ["SAT NOV 29", "10 PM–4 AM", "TOKYO"],
    accent: "#ff3b6b",
  },
];

export function VocoraProjectCarousel() {
  return (
    <div className="vocora-project-showcase">
      <div className="vocora-project-showcase-note">
        <span>Visual showcase</span>
        <p>Surish, aylantirish yoki klaviatura orqali ko&apos;ring</p>
      </div>
      <div className="vocora-project-carousel-frame">
        <HeroCarousel
          items={visualStories}
          defaultIndex={4}
          autoplay
          autoplayDelay={5200}
          brand="VOCORA / VISUAL LAB"
          className="vocora-project-carousel"
        />
      </div>
    </div>
  );
}
