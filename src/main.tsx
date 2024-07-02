import "./styles.scss";
const { PluginApi } = window;
const { React } = PluginApi;

// Remove overlays
PluginApi.patch.instead("SceneCard.Details", function (props) {
  console.log(props);
  return [
    <div className="scene-card__details">
      <span className="scene-card__date">{props.scene.date}</span>
      <div className="scene-card__description">{props.scene.details}</div>
    </div>,
  ];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function () {
  return [];
});

// Remove popovers
PluginApi.patch.instead("SceneCard.Popovers", function () {
  return [];
});
