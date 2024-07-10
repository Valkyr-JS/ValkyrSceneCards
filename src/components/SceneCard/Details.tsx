import { ISceneCardProps } from "../../../types/stashPlugin";
import Studio from "../Studio";
import Title from "../Title";
import "./Details.scss";

const { React } = window.PluginApi;

const Details: React.FC<SceneCardProps> = ({ config, scene }) => {
  return (
    <>
      <div className="vsc-top-shelf">
        <Studio scene={scene} hideStudioParent={config.hideStudioParent} />
      </div>
      <Title scene={scene} />
    </>
  );
};

export default Details;

interface SceneCardProps extends ISceneCardProps {
  /** The user's plugin config. */
  config: VSCFinalConfigMap;
}
