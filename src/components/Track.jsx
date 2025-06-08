import { trimString } from "../util";
export default function Track({ track, isListened, onToggleListened }) {
  return (
    <li>
      {trimString(track.name)}
      <button type="button" onClick={onToggleListened}>
        {!isListened ? "Set as Listened" : "Set as not listened"}
      </button>
    </li>
  );
}
