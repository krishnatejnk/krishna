"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-100 dark:border-neutral-900 py-8 px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-neutral-400 dark:text-neutral-700 text-sm">
          © {currentYear} Krishna Tej. Built with Next.js.
        </p>
        <div className="flex gap-6">
          {[
            { name: "GitHub", url: "https://github.com/krishnatejnk" },
            { name: "LinkedIn", url: "https://linkedin.com/in/krishnatejnk/" },
            { name: "Email", url: "mailto:krishnatejnk@gmail.com" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith("http") ? "_blank" : undefined}
              rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-neutral-400 dark:text-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-400 text-sm transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
