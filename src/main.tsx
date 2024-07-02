import CardDescription from "./components/CardDescription/CardDescription";
import "./styles.scss";
const { PluginApi } = window;
const { React } = PluginApi;

// Remove overlays
PluginApi.patch.instead("SceneCard.Details", function (props) {
  return [<CardDescription {...props} />];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function () {
  return [];
});

// Remove popovers
PluginApi.patch.instead("SceneCard.Popovers", function () {
  return [];
});
