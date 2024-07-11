import type { ISceneCardPropsExtended } from "../../../types/ValkyrSceneCards";
import KeyData from "../KeyData";
import Studio from "../Studio";
import Title from "../Title";
import UserData from "../UserData";
import "./Details.scss";
const { React } = window.PluginApi;

const Details: React.FC<ISceneCardPropsExtended> = ({ config, scene }) => {
  console.log(config, scene);

  return (
    <>
      <div className="vsc-top-line">
        <Studio
          hideParentStudio={config.hideParentStudio}
          parentStudioSeparator={config.parentStudioSeparator}
          scene={scene}
        />
        <UserData
          hideOCount={config.hideOCount}
          hideOrganized={config.hideOrganized}
          hidePlayCount={config.hidePlayCount}
          hideZeroValueData={config.hideZeroValueData}
          scene={scene}
        />
      </div>
      <Title scene={scene} />
      <KeyData
        hideDate={config.hideDate}
        hideDuration={config.hideDuration}
        hideResolution={config.hideResolution}
        resolutionIcon={config.resolutionIcon}
        scene={scene}
      />
    </>
  );
};

export default Details;
