import { getFilename, makeSceneUrl } from "../helpers";
const { React } = window.PluginApi;

const Title: React.FC<TitleProps> = ({ scene }) => {
  // Title should be the given title > filename > "Untitled"
  const filename = getFilename({ scene }) ?? "Untitled";
  const title = scene.title || filename;
  const link = makeSceneUrl({ scene });

  return (
    <a href={link} className="vsc-title">
      <h5>{title}</h5>
    </a>
  );
};

export default Title;

interface TitleProps {
  /** The scene data. */
  scene: Scene;
}
