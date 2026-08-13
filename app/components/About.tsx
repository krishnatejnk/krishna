"use client";

import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative z-[1] pl-6 pt-32 sm:pl-10 sm:pt-40 md:pl-24 md:pt-[150px]">
      <div data-node="1" className="absolute left-[4%] top-[178px] hidden h-3 w-3 rounded-full border-2 border-dsg-accent bg-dsg-charcoal md:block" />

      <Reveal className="flex flex-col gap-3.5 pb-12">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink-4">02 — Background</div>
        <h2 className="text-4xl font-medium tracking-[-0.02em] text-white">About</h2>
      </Reveal>

      <Reveal className="grid gap-14 md:grid-cols-[1.15fr,1fr] md:gap-[72px]">
        <div className="flex flex-col gap-5 text-lg leading-[1.7] text-dsg-ink-2">
          <p>
            I build software end to end: interfaces people actually use, and the services behind them.
            Most of my recent work has been in cloud and distributed systems, with a steady side interest
            in graphics and simulation.
          </p>
          <p>
            I care about the details that don&apos;t show up in a demo — clear failure states, honest
            loading, interfaces that explain themselves.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-dsg-ink-4">Education</div>
            <div className="text-[17px] text-dsg-ink">MACS, Dalhousie University</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
