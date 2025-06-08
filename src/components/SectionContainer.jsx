import AnimationContainer from "./AnimationContainer";
import { AnimatePresence } from "framer-motion";

export default function SectionContainer({ name, error, isLoading, children }) {
  return (
    <AnimatePresence>
      <AnimationContainer name={name}>
        <div className="flex flex-col gap-2 bg-zinc-800 rounded-xl p-2">
          <div className="flex gap-2 justify-between px-2">
            <h4 className="text-2xl text-white font-bold">{name}:</h4>
          </div>

          {error ? (
            <p>
              Error loading {name} : {error}
            </p>
          ) : isLoading ? (
            <p>{"Loading {name}".padEnd(30, ".")}</p>
          ) : (
            children
          )}
        </div>
      </AnimationContainer>
    </AnimatePresence>
  );
}
