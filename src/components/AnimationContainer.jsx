import { motion } from "framer-motion";

export default function AnimationContainer({ children, name }) {
  return (
    <motion.div
      key={name ?? ""}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
