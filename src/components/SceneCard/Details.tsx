import { ISceneCardProps } from "../../../types/stashPlugin";
import Studio from "../Studio";
import Title from "../Title";
import UserData from "../UserData/UserData";
import "./Details.scss";
const { React } = window.PluginApi;

const Details: React.FC<SceneCardProps> = ({ config, scene }) => {
  console.log(scene);

  return (
    <>
      <div className="vsc-top-shelf">
        <Studio scene={scene} hideStudioParent={config.hideStudioParent} />
        <UserData scene={scene} />
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
