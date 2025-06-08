import UtilityButton from "./UtilityButton";

export default function Utilities({ showComponents, onShowComponentChange }) {
  return (
    <div className="flex flex-col gap-3">
      <UtilityButton
        name={"Artists"}
        showComponent={showComponents.artists}
        onClick={() => {
          onShowComponentChange("artists");
        }}
      />
      <UtilityButton
        name={"Albums"}
        showComponent={showComponents.albums}
        onClick={() => {
          onShowComponentChange("albums");
        }}
      />
      <UtilityButton
        name={"Songs"}
        showComponent={showComponents.songs}
        onClick={() => {
          onShowComponentChange("songs");
        }}
      />
    </div>
  );
}
