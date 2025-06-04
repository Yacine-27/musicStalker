import { LuListMusic } from "react-icons/lu";

export default function Logo() {
  return (
    <div className="flex cursor-pointer gap-2 px-2 mr-auto">
      <LuListMusic className="text-3xl" />
      <h3 className="hidden sm:block">MusicStalker</h3>
    </div>
  );
}
