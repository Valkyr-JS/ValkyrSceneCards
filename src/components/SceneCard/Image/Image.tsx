import { ISceneCardPropsExtended } from "@pluginTypes/ValkyrSceneCards";
import ScenePreview from "@components/SceneCard/Preview/Preview";
const { React } = window.PluginApi;
const { ReactRouterDOM } = window.PluginApi.libraries;

const SceneCardImage: React.FC<ISceneCardPropsExtended> = ({
  scene,
  stashSettings,
  ...props
}) => {
  const history = ReactRouterDOM.useHistory();
  const cont = stashSettings?.interface.continuePlaylistDefault ?? false;

  const file = React.useMemo(
    () => (scene.files.length > 0 ? scene.files[0] : undefined),
    [scene]
  );

  function maybeRenderInteractiveSpeedOverlay() {
    return (
      <div className="scene-interactive-speed-overlay">
        {scene.interactive_speed ?? ""}
      </div>
    );
  }

  function onScrubberClick(timestamp: number) {
    const link = props.queue
      ? props.queue.makeLink(scene.id, {
          sceneIndex: props.index,
          continue: cont,
          start: timestamp,
        })
      : `/scenes/${scene.id}?t=${timestamp}`;

    history.push(link);
  }

  function isPortrait() {
    const width = file?.width ? file.width : 0;
    const height = file?.height ? file.height : 0;
    return height > width;
  }

  return (
    <>
      <ScenePreview
        image={scene.paths.screenshot ?? undefined}
        video={scene.paths.preview ?? undefined}
        isPortrait={isPortrait()}
        soundActive={stashSettings?.interface?.soundOnPreview ?? false}
        vttPath={scene.paths.vtt ?? undefined}
        onScrubberClick={onScrubberClick}
        config={props.config}
        stashSettings={stashSettings}
      />
      {maybeRenderInteractiveSpeedOverlay()}
    </>
  );
};

export default SceneCardImage;
