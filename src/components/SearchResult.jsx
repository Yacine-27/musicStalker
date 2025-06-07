export default function SearchResult({ name, image, onAddArtist, isAdded }) {
  console.log(image);
  return (
    <li className="flex justify-between items-center mb-1">
      <div className="flex gap-2 items-center">
        <img
          src={image}
          alt={`${name}'s photo`}
          className="object-contain w-10 rounded-4xl"
        />
        <span className="font-semibold">{name}</span>
      </div>

      <button
        onClick={onAddArtist}
        className="text-zinc-300 bg-zinc-900 p-2 rounded-xl hover:bg-zinc-600 cursor-pointer"
      >
        {isAdded ? "Remove" : "Add"}
      </button>
    </li>
  );
}
