import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { VocoraProjectCarousel } from "@/components/vocora-project-carousel";
import { VocoraStreamHero } from "@/components/vocora-stream-hero";
import "./showcase-components.css";
import "./showcase.css";

const streamRoot = document.getElementById("image-stream-root");

if (streamRoot) {
  createRoot(streamRoot).render(
    <StrictMode>
      <VocoraStreamHero />
    </StrictMode>,
  );
}

const carouselRoot = document.getElementById("project-carousel-root");

if (carouselRoot) {
  createRoot(carouselRoot).render(
    <StrictMode>
      <VocoraProjectCarousel />
    </StrictMode>,
  );
}
