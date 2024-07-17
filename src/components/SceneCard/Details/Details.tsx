import type { ISceneCardPropsExtended } from "@pluginTypes/ValkyrSceneCards";
import Description from "@components/Description";
import Director from "@components/Director";
import KeyData from "@components/KeyData";
import PerformersAvatarList from "@components/PerformersList/PerformersAvatarList";
import PerformersTextList from "@components/PerformersList/PerformersTextList";
import Studio from "@components/Studio";
import Title from "@components/Title";
import UserData from "@components/UserData";
import "./Details.scss";
import { makeSceneUrl } from "@helpers";
const { React } = window.PluginApi;

const Details: React.FC<ISceneCardPropsExtended> = ({
  config,
  scene,
  stashSettings,
  ...props
}) => {
  const sceneLink = makeSceneUrl({
    cont: stashSettings?.interface.continuePlaylistDefault ?? false,
    index: props.index,
    scene,
    queue: props.queue,
  });

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
          hideRating={config.hideRating}
          hideZeroValueData={config.hideZeroValueData}
          ratingSystemOptions={
            stashSettings.ui?.ratingSystemOptions as
              | IratingSystemOptions
              | undefined
          }
          scene={scene}
        />
      </div>
      <Title scene={scene} sceneLink={sceneLink} />
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
      <Director hideDirector={config.hideDirector} scene={scene} />
      <PerformersTextList
        hidePerformer={config.hidePerformer}
        hidePerformerHoverAge={config.hidePerformerHoverAge}
        hidePerformerHoverImage={config.hidePerformerHoverImage}
        hidePerformerHoverNationality={config.hidePerformerHoverNationality}
        performerAvatars={config.performerAvatars}
        performerGenderColors={config.performerGenderColors}
        scene={scene}
      />
      <PerformersAvatarList
        hidePerformer={config.hidePerformer}
        hidePerformerHoverAge={config.hidePerformerHoverAge}
        hidePerformerHoverImage={config.hidePerformerHoverImage}
        hidePerformerHoverNationality={config.hidePerformerHoverNationality}
        performerAvatars={config.performerAvatars}
        performerAvatarsProfile={config.performerAvatarsProfile}
        performerGenderColors={config.performerGenderColors}
        scene={scene}
        sceneCustomAvatars={props.customAvatars}
      />
    </>
  );
};

export default Details;
