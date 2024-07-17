import { getFilename } from "@helpers";
const { React } = window.PluginApi;

const Title: React.FC<TitleProps> = ({ scene, sceneLink }) => {
  // Title should be the given title > filename > "Untitled"
  const filename = getFilename({ scene }) ?? "Untitled";
  const title = scene.title || filename;

  return (
    <a href={sceneLink} className="vsc-title">
      <h5>{title}</h5>
    </a>
  );
};

export default Title;

interface TitleProps {
  scene: Scene;
  sceneLink: string;
}
