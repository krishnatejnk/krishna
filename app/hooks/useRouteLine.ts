"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type RouteRect = { x: number; y: number; w: number; h: number };

type RouteState = {
  d: string;
  width: number;
  height: number;
  viewBox: string;
  textRects: RouteRect[];
};

const EMPTY_ROUTE: RouteState = { d: "", width: 0, height: 0, viewBox: "0 0 0 0", textRects: [] };

function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || pts[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

// Per-line text boxes so the route mask can punch itself out from behind every glyph.
function collectTextRects(root: HTMLElement, trackBox: DOMRect): RouteRect[] {
  const out: RouteRect[] = [];
  const shifted = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).map((el) => ({
    el,
    transform: el.style.transform,
    transition: el.style.transition,
  }));
  // Neutralize in-flight reveal transforms before measuring, or punch-outs land offset by the reveal distance.
  shifted.forEach(({ el }) => {
    el.style.transition = "none";
    el.style.transform = "none";
  });

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const padX = 9;
  const padY = 3;
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const range = document.createRange();
    range.selectNodeContents(n);
    Array.from(range.getClientRects()).forEach((r) => {
      if (r.width < 1 || r.height < 1) return;
      out.push({
        x: +(r.left - trackBox.left - padX).toFixed(1),
        y: +(r.top - trackBox.top - padY).toFixed(1),
        w: +(r.width + padX * 2).toFixed(1),
        h: +(r.height + padY * 2).toFixed(1),
      });
    });
  }

  shifted.forEach(({ el, transform, transition }) => {
    el.style.transform = transform;
    void el.offsetWidth; // land the reverted transform before the transition comes back
    el.style.transition = transition;
  });

  return out;
}

export function useRouteLine() {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [route, setRoute] = useState<RouteState>(EMPTY_ROUTE);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const root = scopeRef.current;
    if (!track || !root) return;

    const trackBox = track.getBoundingClientRect();
    const height = Math.round(trackBox.height);
    const width = Math.round(trackBox.width);
    if (width <= 0 || height <= 0) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - trackBox.left, y: r.top + r.height / 2 - trackBox.top };
      })
      .sort((a, b) => a.y - b.y);
    if (!nodes.length) return;

    const sway = Math.max(90, width * 0.22);
    const pts = [{ x: nodes[0].x + 10, y: 0 }];
    nodes.forEach((node, i) => {
      const prev = pts[pts.length - 1];
      const gap = node.y - prev.y;
      if (gap > 200) {
        const dir = i % 2 === 0 ? 1 : -1;
        const mid = (prev.x + node.x) / 2;
        pts.push({ x: Math.max(20, Math.min(width - 20, mid + dir * sway)), y: prev.y + gap * 0.4 });
        pts.push({ x: Math.max(20, Math.min(width - 20, mid - dir * sway * 0.45)), y: prev.y + gap * 0.76 });
      }
      pts.push(node);
    });
    const last = pts[pts.length - 1];
    pts.push({
      x: Math.max(20, Math.min(width - 20, last.x + sway * 0.8)),
      y: Math.min(height - 40, last.y + (height - last.y) * 0.55),
    });
    pts.push({ x: Math.max(20, Math.min(width - 20, last.x + sway * 0.2)), y: height });

    setRoute({
      d: buildPath(pts),
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      textRects: collectTextRects(root, trackBox),
    });
  }, []);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(measure, 160);
    };
    const onResize = () => measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    const remeasureTimer = setTimeout(measure, 900);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(remeasureTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  return { scopeRef, trackRef, route, remeasure: measure };
}
