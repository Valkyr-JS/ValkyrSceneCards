import { makeStudioUrl } from "@helpers";

const { React } = window.PluginApi;

const Studio: React.FC<StudioProps> = ({ scene, ...props }) => {
  const { studio } = scene;

  // If the studio is undefined, do not render the component.
  if (!studio) return null;

  const link = makeStudioUrl({ studioID: studio.id });

  return (
    <span className="vsc-studio">
      {props.parentStudioFirst ? null : <a href={link}>{studio.name}</a>}
      <ParentStudio
        childStudio={studio}
        hideParentStudio={props.hideParentStudio}
        parentStudioFirst={props.parentStudioFirst}
        parentStudioSeparator={props.parentStudioSeparator}
      />
      {props.parentStudioFirst ? <a href={link}>{studio.name}</a> : null}
    </span>
  );
};

export default Studio;

interface StudioProps {
  /** The scene data. */
  scene: Scene;
  /** When `true`, the parent studio will not be displayed. */
  hideParentStudio: boolean;
  /** When enabled, the parent studio appears before the studio. */
  parentStudioFirst: boolean;
  /** Set the separator character that appears between the studio and parent
   * studio. Leave `undefined` to wrap the parent studio in brackets. */
  parentStudioSeparator?: string;
}

/* -------------------------------------------------------------------------- */
/*                           Parent studio component                          */
/* -------------------------------------------------------------------------- */

const ParentStudio: React.FC<ParentStudioProps> = ({
  childStudio,
  parentStudioSeparator,
  ...props
}) => {
  // If the parent studio is undefined, or the user has set the parent studio to
  // hidden, do not render the component.
  if (props.hideParentStudio || !childStudio.parent_studio) return null;

  const { parent_studio } = childStudio;
  const link = makeStudioUrl({ studioID: parent_studio.id });

  const wrapInBrackets = !parentStudioSeparator;
  const separator = !!parentStudioSeparator
    ? " " + parentStudioSeparator + " "
    : null;

  return (
    <>
      {wrapInBrackets ? (props.parentStudioFirst ? "(" : " (") : null}
      {props.parentStudioFirst ? null : separator}
      <a href={link}>{parent_studio.name}</a>
      {props.parentStudioFirst ? separator : null}
      {wrapInBrackets ? (props.parentStudioFirst ? ") " : ")") : null}
    </>
  );
};

interface ParentStudioProps {
  /** Child studio data. */
  childStudio: Studio;
  /** When `true`, the parent studio will not be displayed. */
  hideParentStudio: boolean;
  /** When enabled, the parent studio appears before the studio. */
  parentStudioFirst: boolean;
  /** Set the separator character that appears between the studio and parent
   * studio. Leave `undefined` to wrap the parent studio in brackets. */
  parentStudioSeparator?: string;
}
