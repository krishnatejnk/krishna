"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useRemeasureRoute } from "./PageRoute";

export default function Reveal({ children, className, ...rest }: HTMLMotionProps<"div">) {
  const remeasure = useRemeasureRoute();

  return (
    <motion.div
      data-reveal="1"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      onAnimationComplete={() => remeasure?.()}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
