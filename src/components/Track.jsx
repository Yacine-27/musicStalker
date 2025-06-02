export default function Track({ track, isListened, onToggleListened }) {
  return (
    <li>
      {track.name}
      <button type="button" onClick={onToggleListened}>
        {!isListened ? "Set As Listened" : "Set as not listened"}
      </button>
    </li>
  );
}
