const { PluginApi } = window;
const { React } = PluginApi;

PluginApi.patch.instead("SceneCard", function (props, _, Original) {
  console.log(props);
  return [<Original {...props} />];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function (props, _, _Original) {
  return [];
});
