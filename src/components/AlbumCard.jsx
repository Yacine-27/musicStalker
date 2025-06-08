import { trimString } from "../util";

export default function AlbumCard({ album, onSelect }) {
  return (
    <li className="flex items-center gap-3 bg-zinc-700 rounded-xl p-3 hover:bg-zinc-600 transition">
      <img
        src={album.image}
        alt={album.name}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <p className="font-semibold truncate">{trimString(album.name)}</p>
        <button
          onClick={onSelect}
          className="text-blue-400 text-sm hover:underline"
        >
          Show Songs
        </button>
      </div>
    </li>
  );
}
