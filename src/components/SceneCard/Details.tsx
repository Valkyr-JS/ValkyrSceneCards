import { ISceneCardProps } from "../../../types/stashPlugin";
import Title from "../Title";

const { React } = window.PluginApi;

const Details: React.FC<ISceneCardProps> = ({ scene }) => {
  return (
    <>
      <Title scene={scene} />
    </>
  );
};

export default Details;
