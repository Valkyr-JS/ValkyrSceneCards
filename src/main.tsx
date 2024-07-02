const { PluginApi } = window;
const { React } = PluginApi;

PluginApi.patch.instead("SceneCard", function (props, _, Original) {
  console.log(props);
  return [<Original {...props} />];
});
