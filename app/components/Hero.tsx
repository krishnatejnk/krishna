"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-[1] flex min-h-[78vh] flex-col justify-center pt-32 sm:pt-40 md:pt-[200px]"
    >
      <div data-node="1" className="absolute left-0 top-[170px] hidden h-[18px] w-[18px] md:block">
        <div className="absolute inset-1 rounded-full bg-dsg-accent" />
      </div>

      <Reveal className="mx-auto grid w-full max-w-[880px] items-center gap-12 md:grid-cols-[1fr,268px] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-dsg-accent">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-dsg-accent" />
            <span>Open to new roles</span>
          </div>
          <h1 className="text-balance text-[44px] font-medium leading-[0.98] tracking-[-0.03em] text-white sm:text-[58px] lg:text-[76px]">
            Krishna Tej
          </h1>
          <p className="max-w-[460px] text-base leading-relaxed text-dsg-ink-2 sm:text-lg lg:text-[19px]">
            Software engineer working across full-stack products, cloud infrastructure and distributed
            systems. I like the parts of a system where correctness and interface design meet.
          </p>
          <div className="flex flex-wrap gap-3.5 pt-1.5">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="border border-dsg-accent bg-dsg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-transparent hover:text-dsg-accent"
            >
              See the work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="border border-dsg-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-dsg-ink transition-colors hover:border-dsg-ink"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="animate-drift">
          <div className="relative aspect-[3/4] w-full max-w-[268px] overflow-hidden border border-dsg-frame">
            <Image src="/profile.jpeg" alt="Krishna Tej" fill className="object-cover" priority />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
