"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRouteLine } from "../hooks/useRouteLine";

const RemeasureContext = createContext<(() => void) | null>(null);

export function useRemeasureRoute() {
  return useContext(RemeasureContext);
}

export default function PageRoute({ children }: { children: ReactNode }) {
  const { scopeRef, trackRef, route, remeasure } = useRouteLine();

  return (
    <RemeasureContext.Provider value={remeasure}>
      <div ref={scopeRef} className="relative mx-auto max-w-[1080px] px-6 pb-40 sm:px-10 md:px-12">
        <div
          ref={trackRef}
          className="pointer-events-none absolute inset-x-0 z-0 hidden md:block"
          style={{ top: 96, bottom: 140 }}
        >
          <svg
            width={route.width}
            height={route.height}
            viewBox={route.viewBox}
            fill="none"
            className="absolute left-0 top-0 overflow-visible"
          >
            <mask id="routeMask" maskUnits="userSpaceOnUse" x={0} y={0} width={route.width} height={route.height}>
              <rect x={0} y={0} width={route.width} height={route.height} fill="#fff" />
              {route.textRects.map((r, i) => (
                <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#000" />
              ))}
            </mask>
            <path
              d={route.d}
              stroke="#d9382b"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="0.5 9"
              mask="url(#routeMask)"
            />
          </svg>
        </div>
        {children}
      </div>
    </RemeasureContext.Provider>
  );
}
