const { React } = window.PluginApi;
const { Link } = window.PluginApi.libraries.ReactRouterDOM;

// https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/components/Shared/GridCard/StudioOverlay.tsx
const StudioOverlay: React.FC<StudioOverlayProps> = ({ studio }) => {
  // If the studio is undefined, do not render the component.
  if (!studio) return null;

  return (
    <div className="studio-overlay">
      <Link to={`/studios/${studio.id}`}>
        <img
          className="image-thumbnail"
          loading="lazy"
          alt={studio.name}
          src={studio.image_path ?? ""}
        />
      </Link>
    </div>
  );
};

export default StudioOverlay;

interface StudioOverlayProps {
  /** The scene studio data. */
  studio: Scene["studio"];
}
