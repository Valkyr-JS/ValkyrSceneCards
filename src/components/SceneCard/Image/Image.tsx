import { ISceneCardPropsExtended } from "../../../../types/ValkyrSceneCards";
import ScenePreview from "./Preview";
const { React } = window.PluginApi;
const { ReactRouterDOM } = window.PluginApi.libraries;

const SceneCardImage: React.FC<ISceneCardPropsExtended> = ({
  stashSettings,
  ...props
}) => {
  const history = ReactRouterDOM.useHistory();
  const cont = stashSettings?.interface.continuePlaylistDefault ?? false;

  const file = React.useMemo(
    () => (props.scene.files.length > 0 ? props.scene.files[0] : undefined),
    [props.scene]
  );

  function maybeRenderInteractiveSpeedOverlay() {
    return (
      <div className="scene-interactive-speed-overlay">
        {props.scene.interactive_speed ?? ""}
      </div>
    );
  }

  function onScrubberClick(timestamp: number) {
    const link = props.queue
      ? props.queue.makeLink(props.scene.id, {
          sceneIndex: props.index,
          continue: cont,
          start: timestamp,
        })
      : `/scenes/${props.scene.id}?t=${timestamp}`;

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
        image={props.scene.paths.screenshot ?? undefined}
        video={props.scene.paths.preview ?? undefined}
        isPortrait={isPortrait()}
        soundActive={stashSettings?.interface?.soundOnPreview ?? false}
        vttPath={props.scene.paths.vtt ?? undefined}
        onScrubberClick={onScrubberClick}
      />
      {maybeRenderInteractiveSpeedOverlay()}
    </>
  );
};

export default SceneCardImage;
