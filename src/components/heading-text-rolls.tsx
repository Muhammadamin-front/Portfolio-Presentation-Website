import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { TextRoll } from "@/components/ui/text-roll";

const HEADING_SELECTOR = "h1, h2, h3";

export function HeadingTextRolls() {
  useEffect(() => {
    const page = document.getElementById("public-view");
    if (!page) return;

    const mountedRoots = new Map<HTMLElement, Root>();
    let contentObserver: MutationObserver | null = null;
    let readyObserver: MutationObserver | null = null;
    let started = false;

    const animateHeading = (heading: HTMLElement) => {
      if (heading.dataset.textRollReady === "true") return;
      heading.dataset.textRollReady = "true";

      const walker = document.createTreeWalker(
        heading,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement?.closest("[data-text-roll-word]")) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        },
      );
      const textNodes: Text[] = [];
      let current: Node | null;

      while ((current = walker.nextNode())) {
        textNodes.push(current as Text);
      }

      let characterOffset = 0;

      textNodes.forEach((textNode) => {
        const parts = (textNode.textContent ?? "").split(/(\s+)/);
        const fragment = document.createDocumentFragment();

        parts.forEach((part) => {
          if (!part) return;

          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
            return;
          }

          const wordRoot = document.createElement("span");
          wordRoot.className = "heading-text-roll-word";
          wordRoot.dataset.textRollWord = "true";
          fragment.append(wordRoot);

          const baseDelay = characterOffset * 0.018;
          characterOffset += part.length + 1;
          const root = createRoot(wordRoot);

          root.render(
            <TextRoll
              className="heading-text-roll"
              duration={0.42}
              loop
              loopDelay={1.6}
              getEnterDelay={(index) => baseDelay + index * 0.035}
              getExitDelay={(index) => baseDelay + index * 0.035 + 0.14}
              transition={{ ease: [0.22, 1, 0.36, 1] }}
            >
              {part}
            </TextRoll>,
          );
          mountedRoots.set(wordRoot, root);
        });

        textNode.replaceWith(fragment);
      });
    };

    const processNode = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches(HEADING_SELECTOR)) {
        animateHeading(node);
      }

      node
        .querySelectorAll<HTMLElement>(HEADING_SELECTOR)
        .forEach(animateHeading);
    };

    const startAnimations = () => {
      if (started) return;
      started = true;

      page
        .querySelectorAll<HTMLElement>(HEADING_SELECTOR)
        .forEach(animateHeading);

      contentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach(processNode);
        });
      });
      contentObserver.observe(page, { childList: true, subtree: true });
    };

    if (document.documentElement.classList.contains("ready")) {
      startAnimations();
    } else {
      readyObserver = new MutationObserver(() => {
        if (!document.documentElement.classList.contains("ready")) return;
        readyObserver?.disconnect();
        readyObserver = null;
        startAnimations();
      });
      readyObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      readyObserver?.disconnect();
      contentObserver?.disconnect();
      mountedRoots.forEach((root) => root.unmount());
      mountedRoots.clear();
    };
  }, []);

  return null;
}
