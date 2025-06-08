export default function TrackCard({ track, isListened, onToggle }) {
  return (
    <li
      className={`flex justify-between items-center bg-zinc-700 rounded-xl p-3 ${
        isListened ? "opacity-60" : ""
      }`}
    >
      <p className="truncate flex-1">{track.name}</p>
      <button
        onClick={onToggle}
        className="ml-4 text-green-400 text-sm hover:underline"
      >
        {isListened ? "Unmark" : "Listened"}
      </button>
    </li>
  );
}
