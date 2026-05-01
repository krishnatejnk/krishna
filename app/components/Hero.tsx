"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-24">
        <div className="grid md:grid-cols-[1fr,auto] gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-amber-500 dark:text-amber-400 text-xs font-medium tracking-widest uppercase mb-8">
              ML Engineer & Software Developer
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 dark:text-neutral-100 leading-none mb-8 tracking-tight">
              Krishna<br />Tej.
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-xl mb-3 leading-relaxed">
              Building computer vision systems and cloud-native software.
              Masters in Applied Computer Science at Dalhousie University.
            </p>
            <p className="text-neutral-400 dark:text-neutral-600 text-sm mb-12">
              Halifax, Nova Scotia, Canada
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 bg-amber-500 dark:bg-amber-400 text-white dark:text-neutral-950 text-sm font-semibold rounded hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors"
              >
                View Work
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 border border-stone-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-semibold rounded hover:border-neutral-500 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden md:block"
          >
            <div className="relative w-56 h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/profile.jpeg"
                  alt="Krishna Tej"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-amber-500 dark:border-amber-400 rounded-br-xl" />
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-amber-500 dark:border-amber-400 rounded-tl-xl" />
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-neutral-400 dark:from-neutral-600 to-transparent" />
      </motion.div>
    </section>
  );
}
