import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KineticGrid from "@/components/ui/kinetic-grid";
import { TestimonialsSection } from "@/components/ui/testimonials-6";
import { TextRoll } from "@/components/ui/text-roll";
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

const textRollMountNode = document.getElementById("hero-text-roll");

if (textRollMountNode) {
  createRoot(textRollMountNode).render(
    <StrictMode>
      <TextRoll className="hero-text-roll">ishlaydigan</TextRoll>
    </StrictMode>,
  );
}
