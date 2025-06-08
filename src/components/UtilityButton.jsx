export default function UtilityButton({ name, showComponent, onClick }) {
  return (
    <div>
      <button onClick={onClick}>
        {showComponent ? "Hide" : "Show"} {name}
      </button>
    </div>
  );
}
