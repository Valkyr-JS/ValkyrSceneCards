import CardDescription from "./components/CardDescription/CardDescription";
import "./styles.scss";
const { PluginApi } = window;
const { GQL, React } = PluginApi;

// Remove overlays
PluginApi.patch.instead("SceneCard.Details", function (props) {
  const qConfig = GQL.useConfigurationQuery();

  const dataLoading = qConfig.loading;
  if (dataLoading) return [];

  const userConfig = (qConfig.data.configuration as VSCConfigResult).plugins
    .ValkyrSceneCards;

  // Compile the user's config with config defaults
  const pluginConfig: VSCFinalConfigMap = {
    descriptionHidden: getConfigProp(userConfig?.descriptionHidden, false),
    performerAvatarsActive: getConfigProp(
      userConfig?.performerAvatarsActive,
      false
    ),
    performerAvatarsProfile: getConfigProp(
      userConfig?.performerAvatarsProfile,
      false
    ),
    performerAvatarsSizeLarge: getConfigProp(
      userConfig?.performerAvatarsSizeLarge,
      false
    ),
    performerAvatarsTagID: getConfigProp(userConfig?.performerAvatarsTagID, ""),
    performerTextColors: getConfigProp(userConfig?.performerTextColors, false),
  };

  return [<CardDescription {...props} pluginConfig={pluginConfig} />];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function () {
  return [];
});

// Remove popovers
PluginApi.patch.instead("SceneCard.Popovers", function () {
  return [];
});

/** Returns the given property from the user's config, or the default value if
 * the user hasn't explicitly set it. */
function getConfigProp<T>(value: T | undefined, defaultValue: T) {
  return value ?? defaultValue;
}
