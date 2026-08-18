"use client";

import Reveal from "./Reveal";

const links = [
  { label: "Email", href: "mailto:krishnatejnk@gmail.com" },
  { label: "GitHub", href: "https://github.com/krishnatejnk" },
  { label: "LinkedIn", href: "https://linkedin.com/in/krishnatejnk/" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-[1] pt-32 sm:pt-40 md:pt-[150px]">
      <div data-node="1" className="absolute left-[80%] top-[172px] hidden h-[22px] w-[22px] md:block">
        <div className="absolute inset-1.5 rounded-full bg-dsg-accent" />
      </div>

      <Reveal className="flex flex-col gap-8">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink-4">04 — Contact</div>
        <h2 className="max-w-[640px] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[56px]">
          Let&apos;s talk!
        </h2>
        <div className="flex flex-wrap gap-10 pt-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="border-b border-dsg-accent-45 pb-1 font-mono text-[13px] uppercase tracking-[0.1em] text-dsg-accent transition-colors hover:border-white hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
