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
  const dataLoaded = !qConfig.loading;

  if (dataLoaded) {
    const userConfig: VSCConfigMap =
      qConfig.data.configuration.plugins.ValkyrSceneCards;

    const config: VSCFinalConfigMap = {
      hideOCount: userConfig.hideOCount ?? false,
      hideOrganized: userConfig.hideOrganized ?? false,
      hidePlayCount: userConfig.hidePlayCount ?? false,
      hideParentStudio: userConfig.hideParentStudio ?? false,
      hideZeroValueData: userConfig.hideZeroValueData ?? false,
      parentStudioSeparator: userConfig.parentStudioSeparator,
    };

    // Fetch additional data as needed
    const extendedProps: ISceneCardPropsExtended = { ...props, config };
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
