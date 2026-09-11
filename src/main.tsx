import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KineticGrid from "@/components/ui/kinetic-grid";
import { TestimonialsSection } from "@/components/ui/testimonials-6";
import { VocoraStreamHero } from "@/components/vocora-stream-hero";
import { VocoraProjectCarousel } from "@/components/vocora-project-carousel";
import "./index.css";

const mountNode = document.getElementById("kinetic-root");

if (mountNode) {
  createRoot(mountNode).render(
    <StrictMode>
      <KineticGrid globalColor="monochrome" />
    </StrictMode>,
  );
}

const testimonialsMountNode = document.getElementById("testimonials-root");

if (testimonialsMountNode) {
  createRoot(testimonialsMountNode).render(
    <StrictMode>
      <TestimonialsSection />
    </StrictMode>,
  );
}

const imageStreamMountNode = document.getElementById("image-stream-root");

if (imageStreamMountNode) {
  createRoot(imageStreamMountNode).render(
    <StrictMode>
      <VocoraStreamHero />
    </StrictMode>,
  );
}

const projectCarouselMountNode = document.getElementById("project-carousel-root");

if (projectCarouselMountNode) {
  createRoot(projectCarouselMountNode).render(
    <StrictMode>
      <VocoraProjectCarousel />
    </StrictMode>,
  );
}
