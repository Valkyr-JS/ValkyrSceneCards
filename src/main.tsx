import "./styles.scss";
const { PluginApi } = window;
const { React } = PluginApi;

// Remove overlays
PluginApi.patch.instead("SceneCard.Details", function (props) {
  const link = `/scenes/${props.scene.id}`;
  return [
    <div className="scene-card__details">
      <a href={link}>
        <h5 className="card-section-title flex-aligned">{props.scene.title}</h5>
      </a>
      <div className="scene-card__description">{props.scene.details}</div>
      <span className="scene-card__date">{props.scene.date}</span>
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
