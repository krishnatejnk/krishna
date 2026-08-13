"use client";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-dsg-charcoal px-6 py-[22px] sm:px-10">
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="font-mono text-xs uppercase tracking-[0.16em] text-dsg-ink"
      >
        Krishna
      </a>

      <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em] sm:gap-[26px]">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="text-dsg-ink-3 transition-colors hover:text-dsg-ink"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
