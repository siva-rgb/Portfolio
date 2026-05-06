import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.14),transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(167,139,250,0.12),transparent_50%)]" />
      <motion.div
        className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-accent-cyan/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-accent-violet/18 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-grid-overlay bg-[length:48px_48px] opacity-[0.35]" />
    </div>
  );
}
