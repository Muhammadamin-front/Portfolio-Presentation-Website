import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import KineticGrid from "@/components/ui/kinetic-grid";
import { TestimonialsSection } from "@/components/ui/testimonials-6";
import { HeadingTextRolls } from "@/components/heading-text-rolls";
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

const headingRollMountNode = document.getElementById("heading-roll-effects");

if (headingRollMountNode) {
  createRoot(headingRollMountNode).render(<HeadingTextRolls />);
}
