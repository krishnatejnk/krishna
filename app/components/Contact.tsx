"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response. Please try again later.");
      }
      let data;
      try { data = await response.json(); } catch { throw new Error("Failed to parse server response."); }
      if (!response.ok) throw new Error((data.error || "Failed to send message") + (data.details ? ` ${data.details}` : ""));
      setStatus({ type: "success", message: "Message sent. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus({ type: null, message: "" }), 5000);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) setStatus({ type: null, message: "" });
  };

  const links = [
    { label: "Email", display: "krishnatejnk@gmail.com", href: "mailto:krishnatejnk@gmail.com" },
    { label: "Phone", display: "+1 (902) 989-3113", href: "tel:+19029893113" },
    { label: "LinkedIn", display: "krishnatejnk", href: "https://linkedin.com/in/krishnatejnk/" },
    { label: "GitHub", display: "krishnatejnk", href: "https://github.com/krishnatejnk" },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Get in touch.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-10">
              I&apos;m looking for ML engineering and software development roles. If you have an opportunity or just want to talk, send a message.
            </p>
            <div className="space-y-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-neutral-300 dark:text-neutral-700 text-sm w-16 shrink-0 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">{link.label}</span>
                  <span className="text-neutral-300 dark:text-neutral-700 text-sm">/</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">{link.display}</span>
                </a>
              ))}
            </div>
            <p className="text-neutral-300 dark:text-neutral-700 text-sm mt-8">Halifax, Nova Scotia, Canada</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status.type && (
              <div className={`mb-6 p-4 rounded border text-sm ${
                status.type === "success"
                  ? "border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
                  : "border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
              }`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} required
                  className="w-full px-0 py-3 bg-transparent border-b border-stone-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
                  className="w-full px-0 py-3 bg-transparent border-b border-stone-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full px-0 py-3 bg-transparent border-b border-stone-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors resize-none text-sm"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 px-6 py-3 bg-amber-500 dark:bg-amber-400 text-white dark:text-neutral-950 text-sm font-semibold rounded hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
