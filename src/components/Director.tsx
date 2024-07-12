const { React } = window.PluginApi;
const { makeDirectorScenesUrl } = window.PluginApi.utils.NavUtils;

const Director: React.FC<DirectorProps> = ({ scene, ...props }) => {
  // If the director is undefined, or the user has chosen to hide the data, do
  // not render the component.
  if (props.hideDirector || !scene.director) return null;

  console.log(makeDirectorScenesUrl);
  return (
    <div className="vsc-director">
      Directed by{" "}
      <a href={makeDirectorScenesUrl(scene.director)}>{scene.director}</a>
    </div>
  );
};

export default Director;

interface DirectorProps {
  /** When `true`, the scene director will not be displayed. */
  hideDirector: boolean;
  /** The scene data. */
  scene: Scene;
}
