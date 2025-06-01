export default function Track({ track, onListen }) {
  return (
    <li>
      {track.name}
      <button
        type="button"
        onClick={() => {
          onListen(track.id);
        }}
      >
        {!track.listenedTo ? "Set As Listened" : "Set as not listened"}
      </button>
    </li>
  );
}
