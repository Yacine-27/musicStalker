import { trimString } from "../utilities/util";
export default function ArtistCard({ artist, onSelect, onRemove }) {
  return (
    <li className="flex items-center gap-3 bg-zinc-700 rounded-xl p-3 hover:bg-zinc-600 transition">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col flex-1">
        <p className="font-semibold truncate">{trimString(artist.name)}</p>
        <div className="flex gap-2 text-sm">
          <button onClick={onSelect} className="text-blue-400 hover:underline">
            Albums
          </button>
          <button onClick={onRemove} className="text-red-400 hover:underline">
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
