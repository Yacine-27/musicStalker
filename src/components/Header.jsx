import { motion, AnimatePresence } from "framer-motion";
import { IoMusicalNotesOutline } from "react-icons/io5";

export default function Header() {
  return (
    <AnimatePresence>
      <motion.div
        key="header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <header className="bg-zinc-950 text-zinc-200 shadow-md flex justify-center items-center min-h-80">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IoMusicalNotesOutline size={36} />
              <div>
                <div className="text-2xl font-bold tracking-tight">
                  Trackify
                </div>
                <p className="text-sm text-zinc-400">
                  Track your journey with your newly discovered artists 🚀
                </p>
              </div>
            </div>
          </div>
        </header>
      </motion.div>
    </AnimatePresence>
  );
}
