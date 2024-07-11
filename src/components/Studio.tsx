import { makeStudioUrl } from "../helpers";

const { React } = window.PluginApi;

const Studio: React.FC<StudioProps> = ({ scene, ...props }) => {
  const { studio } = scene;

  // If the studio is undefined, do not render the component.
  if (!studio) return null;

  const link = makeStudioUrl({ studioID: studio.id });

  return (
    <span className="vsc-studio">
      <a href={link}>{studio.name}</a>
      <ParentStudio
        childStudio={studio}
        hideParentStudio={props.hideParentStudio}
      />
    </span>
  );
};

export default Studio;

interface StudioProps {
  /** The scene data. */
  scene: Scene;
  /** When `true`, the parent studio will not be displayed. */
  hideParentStudio: boolean;
}

/* -------------------------------------------------------------------------- */
/*                           Parent studio component                          */
/* -------------------------------------------------------------------------- */

const ParentStudio: React.FC<ParentStudioProps> = ({
  childStudio,
  ...props
}) => {
  // If the parent studio is undefined, or the user has set the parent studio to
  // hidden, do not render the component.
  if (props.hideParentStudio || !childStudio.parent_studio) return null;

  const { parent_studio } = childStudio;
  const link = makeStudioUrl({ studioID: parent_studio.id });

  return (
    <>
      {" ("}
      <a href={link}>{parent_studio.name}</a>
      {")"}
    </>
  );
};

interface ParentStudioProps {
  /** When `true`, the parent studio will not be displayed. */
  hideParentStudio: boolean;
  /** Child studio data. */
  childStudio: Studio;
}
