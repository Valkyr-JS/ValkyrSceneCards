import "./styles.scss";
const { PluginApi } = window;
const { React } = PluginApi;

PluginApi.patch.instead("SceneCard", function (props, _, Original) {
  console.log("SceneCard: ", props);

  // Add parent class for scoping
  return [
    <div className="valkyr-scene-card">
      <Original {...props} />
    </div>,
  ];
});

PluginApi.patch.instead("SceneCard.Details", function (props, _, Original) {
  return [<Original {...props} />];
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
