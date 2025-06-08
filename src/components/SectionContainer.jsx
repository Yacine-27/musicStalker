import AnimationContainer from "./AnimationContainer";
import { AnimatePresence } from "framer-motion";

export default function SectionContainer({
  name,
  error,
  isLoading,
  children,
  className = "",
}) {
  return (
    <AnimatePresence>
      <AnimationContainer name={name}>
        <div
          className={`flex flex-col gap-3 bg-zinc-800 rounded-2xl shadow-md p-4 ${className}`}
        >
          <div className="flex justify-between items-center px-1 mb-2">
            <h4 className="text-xl font-semibold text-white">{name}</h4>
          </div>

          {error ? (
            <p className="text-red-400">
              Error loading {name} : {error}
            </p>
          ) : isLoading ? (
            <p className="italic text-zinc-400">{"Loading " + name + "..."}</p>
          ) : (
            children
          )}
        </div>
      </AnimationContainer>
    </AnimatePresence>
  );
}
