import { LuListMusic } from "react-icons/lu";

export default function Logo() {
  return (
    <div className="flex cursor-pointer gap-2 p-2 rounded-xl bg-zinc-800 items-center  shadow-2xl">
      <LuListMusic className="text-3xl" />
      <h3 className="hidden sm:block text-main">MusicStalker</h3>
    </div>
  );
}
