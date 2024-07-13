import type {
  ISceneCardPropsExtended,
  VSCConfigMap,
  VSCFinalConfigMap,
} from "../types/ValkyrSceneCards";
import { SceneCardDetails } from "./components/SceneCard";
import "./styles.scss";
const { PluginApi } = window;
const { GQL, React } = PluginApi;

PluginApi.patch.instead("SceneCard", function (props, _, Original) {
  // Fetch user plugin config
  const qConfig = GQL.useConfigurationQuery();
  const configLoaded = !qConfig.loading;

  if (configLoaded) {
    const userConfig: VSCConfigMap =
      qConfig.data.configuration.plugins.ValkyrSceneCards;

    const config: VSCFinalConfigMap = {
      descriptionMaxLines: userConfig.descriptionMaxLines || 3, // If config returns undefined or 0, set to default
      durationPadding: userConfig.durationPadding ?? false,
      hideDate: userConfig.hideDate ?? false,
      hideDescription: userConfig.hideDescription ?? false,
      hideDirector: userConfig.hideDirector ?? false,
      hideDuration: userConfig.hideDuration ?? false,
      hideOCount: userConfig.hideOCount ?? false,
      hideOrganized: userConfig.hideOrganized ?? false,
      hidePlayCount: userConfig.hidePlayCount ?? false,
      hideParentStudio: userConfig.hideParentStudio ?? false,
      hidePerformer: userConfig.hidePerformer ?? false,
      hidePerformerHoverAge: userConfig.hidePerformerHoverAge ?? false,
      hidePerformerHoverImage: userConfig.hidePerformerHoverImage ?? false,
      hidePerformerHoverNationality:
        userConfig.hidePerformerHoverNationality ?? false,
      hideResolution: userConfig.hideResolution ?? false,
      hideZeroValueData: userConfig.hideZeroValueData ?? false,
      parentStudioSeparator: userConfig.parentStudioSeparator,
      performerGenderColors: userConfig.performerGenderColors ?? false,
      resolutionIcon: userConfig.resolutionIcon ?? false,
    };

    // Fetch additional data as needed
    const extendedProps: ISceneCardPropsExtended = { ...props, config };

    // Performer data
    if (!!extendedProps.scene.performers) {
      const performersData = GQL.useFindPerformersQuery({
        variables: {
          filter: { per_page: -1 },
          performer_ids: extendedProps.scene.performers.map((pf) => +pf.id),
        },
      });

      if (!!performersData.data)
        extendedProps.scene = {
          ...extendedProps.scene,
          performers: performersData.data.findPerformers.performers,
        };

      console.log(extendedProps);
    }

    // Studio data
    if (!config.hideParentStudio && !!extendedProps.scene.studio) {
      const studioData = GQL.useFindStudioQuery({
        variables: { id: props.scene.studio?.id || "" },
      });

      if (!!studioData.data)
        extendedProps.scene = {
          ...extendedProps.scene,
          studio: {
            ...extendedProps.scene.studio,
            ...studioData.data.findStudio,
          },
        };
    }

    return [
      <div className="valkyr-scene-card">
        <Original {...extendedProps} />
      </div>,
    ];
  }
  return [];
});

PluginApi.patch.instead("SceneCard.Details", function (props) {
  // Render without additional data while waiting.
  return [<SceneCardDetails {...(props as ISceneCardPropsExtended)} />];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function () {
  return [];
});

// Remove popovers
PluginApi.patch.instead("SceneCard.Popovers", function () {
  return [];
});
