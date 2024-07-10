import { ISceneCardProps } from "../../../types/stashPlugin";
import Studio from "../Studio";
import Title from "../Title";
import "./Details.scss";

const { React } = window.PluginApi;

const Details: React.FC<ISceneCardProps> = ({ scene }) => {
  return (
    <>
      <div className="vsc-top-shelf">
        <Studio scene={scene} />
      </div>
      <Title scene={scene} />
    </>
  );
};

export default Details;
