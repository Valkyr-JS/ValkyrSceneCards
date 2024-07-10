import { makeStudioUrl } from "../helpers";

const { React } = window.PluginApi;

const Studio: React.FC<StudioProps> = ({ scene }) => {
  const studio = scene.studio;

  if (!studio) return null;
  const link = makeStudioUrl({ studioID: studio.id });

  return (
    <a href={link} className="vsc-studio">
      {studio.name}
    </a>
  );
};

export default Studio;

interface StudioProps {
  scene: Scene;
}
