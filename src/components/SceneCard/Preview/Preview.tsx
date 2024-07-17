import { default as cx } from "classnames";
import PreviewScrubber from "./PreviewScrubber";
import type { IScenePreviewPropsExtended } from "@pluginTypes/ValkyrSceneCards";
import "./Preview.scss";
const { React } = window.PluginApi;

const ScenePreview: React.FC<IScenePreviewPropsExtended> = ({
  config,
  image,
  video,
  isPortrait,
  soundActive,
  vttPath,
  onScrubberClick,
  ...props
}) => {
  const videoEl = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0)
          // Catch is necessary due to DOMException if user hovers before clicking on page
          videoEl.current?.play()?.catch(() => {});
        else videoEl.current?.pause();
      });
    });

    if (videoEl.current) observer.observe(videoEl.current);
  });

  React.useEffect(() => {
    if (videoEl?.current?.volume)
      videoEl.current.volume = soundActive ? 0.05 : 0;
  }, [soundActive]);

  /* ----------------------------- Config options ----------------------------- */

  const classes = cx("scene-card-preview", {
    blurredBackground: config.previewBlurredBackground,
    portrait: isPortrait,
  });

  const backgroundImage =
    config.previewBlurredBackground && !!image
      ? "url(" + image + ")"
      : undefined;
  const styles: React.CSSProperties = {
    backgroundImage: backgroundImage,
  };

  /* -------------------------------- Component ------------------------------- */

  return (
    <div className={classes} style={styles}>
      <img
        className="scene-card-preview-image"
        loading="lazy"
        src={image}
        alt=""
      />
      <video
        disableRemotePlayback
        playsInline
        muted={!soundActive}
        className="scene-card-preview-video"
        loop
        preload="none"
        ref={videoEl}
        src={video}
      />
      <PreviewScrubber vttPath={vttPath} onClick={onScrubberClick} />
    </div>
  );
};

export default ScenePreview;
