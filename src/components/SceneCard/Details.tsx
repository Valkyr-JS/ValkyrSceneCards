import type { ISceneCardPropsExtended } from "../../../types/ValkyrSceneCards";
import Description from "../Description";
import Director from "../Director";
import KeyData from "../KeyData";
import PerformersTextList from "../PerformersList/PerformersTextList";
import Studio from "../Studio";
import Title from "../Title";
import UserData from "../UserData";
import "./Details.scss";
const { React } = window.PluginApi;

const Details: React.FC<ISceneCardPropsExtended> = ({ config, scene }) => {
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
        durationPadding={config.durationPadding}
        hideDate={config.hideDate}
        hideDuration={config.hideDuration}
        hideResolution={config.hideResolution}
        resolutionIcon={config.resolutionIcon}
        scene={scene}
      />
      <Description
        descriptionMaxLines={config.descriptionMaxLines}
        hideDescription={config.hideDescription}
        scene={scene}
      />
      <PerformersTextList
        hidePerformerHoverAge={config.hidePerformerHoverAge}
        hidePerformerHoverImage={config.hidePerformerHoverImage}
        hidePerformerHoverNationality={config.hidePerformerHoverNationality}
        performerGenderColors={config.performerGenderColors}
        scene={scene}
      />
      <Director hideDirector={config.hideDirector} scene={scene} />
    </>
  );
};

export default Details;
