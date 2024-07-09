import { makeSceneUrl } from "../helpers";

const { React } = window.PluginApi;

const Title: React.FC<TitleProps> = ({ scene }) => {
  const title = scene.title ?? "Untitled";
  const link = makeSceneUrl({ scene });

  return (
    <a href={link}>
      <h5>{title}</h5>
    </a>
  );
};

export default Title;

interface TitleProps {
  scene: Scene;
}
