import { gcd, TextUtils } from "@helpers";
import ResolutionIcon from "./Icons/ResolutionIcon";
const { React } = window.PluginApi;

const KeyData: React.FC<KeyDataProps> = ({
  hideResolution,
  resolutionIcon,
  scene,
  ...props
}) => {
  // Base all file data on the file with the highest resolution
  const primaryFile = [...scene.files].sort((a, b) => b.height - a.height)[0];

  const showDate = !!scene.date && !props.hideDate;
  const showDuration = !!primaryFile && !props.hideDuration;
  const showFilesize = !!primaryFile && !props.hideFilesize;

  // Render nothing if there is no data at all to render
  if (!showDate && !showDuration && !showFilesize && hideResolution)
    return null;

  return (
    <div className="vsc-key-data">
      <SharedFileData
        durationPadding={props.durationPadding}
        file={primaryFile}
        hideDate={props.hideDate}
        hideDuration={props.hideDuration}
        scene={scene}
      />
      <UniqueFileData
        file={primaryFile}
        hideAspectRatio={props.hideAspectRatio}
        hideFilesize={props.hideFilesize}
        hideFramerate={props.hideFramerate}
        hideResolution={hideResolution}
        resolutionIcon={resolutionIcon}
      />
    </div>
  );
};

export default KeyData;

interface KeyDataProps {
  /** When `true`, the scene duration will be padded out to HH:MM:SS. For
   * example, 6:37 would appear as 00:06:37. */
  durationPadding: boolean;
  /** When enabled, the scene aspect ratio will not be displayed. */
  hideAspectRatio: boolean;
  /** When `true`, the scene date will not be displayed. */
  hideDate: boolean;
  /** When `true`, the scene duration will not be displayed. */
  hideDuration: boolean;
  /** When `true`, the file size will not be displayed. */
  hideFilesize: boolean;
  /** When `true`, the frame rate will not be displayed. */
  hideFramerate: boolean;
  /** When `true`, the scene resolution will not be displayed. */
  hideResolution: boolean;
  /** When `true`, the scene resolution be displayed as an SD/HD/2K/4K/etc.
   * icon. SD and HD icons can be hovered over for the full resolution. */
  resolutionIcon: boolean;
  /** The scene data. */
  scene: Scene;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                        Shared file data                                        */
/* ---------------------------------------------------------------------------------------------- */

const SharedFileData: React.FC<SharedFileProps> = (props) => {
  if (props.hideDate && props.hideDuration) return null;

  // Date
  const date = !props.hideDate ? (
    <span className="vsc-date">{props.scene.date}</span>
  ) : null;

  // Duration
  let duration: React.JSX.Element | null = null;

  if (!props.hideDuration) {
    let timestamp = TextUtils.secondsToTimestamp(props.file?.duration ?? 0);
    if (props.durationPadding) {
      const reverseTimes = timestamp.split(":").reverse();
      if (reverseTimes.length === 1) reverseTimes.push("00", "00");
      if (reverseTimes.length === 2) reverseTimes.push("00");

      timestamp = reverseTimes
        .map((v) => (v.length < 2 ? "0" + v : v))
        .reverse()
        .join(":");
    }
    duration = <span className="vsc-duration">{timestamp}</span>;
  }

  return (
    <div className="vsc-shared-file-data">
      {date}
      {duration}
    </div>
  );
};

interface SharedFileProps {
  /** When `true`, the scene duration will be padded out to HH:MM:SS. For
   * example, 6:37 would appear as 00:06:37. */
  durationPadding: boolean;
  /** The file referenced for this data. */
  file?: VideoFile;
  /** When `true`, the scene date will not be displayed. */
  hideDate: boolean;
  /** When `true`, the scene duration will not be displayed. */
  hideDuration: boolean;
  /** The scene data. */
  scene: Scene;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                        Unique file data                                        */
/* ---------------------------------------------------------------------------------------------- */

const UniqueFileData: React.FC<UniqueFileProps> = ({ file, ...props }) => {
  if (
    !file ||
    (props.hideFilesize && props.hideFramerate && props.hideResolution)
  )
    return null;

  // File size
  const sizeData = TextUtils.fileSize(file.size);

  // If the file is less than a gigabyte, round it to the nerest integer.
  // Otherwise, round to two decimal places.
  let size = 0;
  switch (sizeData.unit) {
    case "byte":
    case "kilobyte":
    case "megabyte":
      size = Math.round(sizeData.size);
      break;
    default:
      size = Math.round(sizeData.size * 100) / 100;
      break;
  }
  const filesize = !props.hideFilesize ? (
    <span className="vsc-filesize">
      {size}
      {TextUtils.formatFileSizeUnit(sizeData.unit)}
    </span>
  ) : null;

  // Frame rate
  const framerate = !props.hideFramerate ? (
    <span className="vsc-framerate">{file.frame_rate}fps</span>
  ) : null;

  // Resolution
  const showResolutionAsIcon = !props.hideResolution && props.resolutionIcon;
  const showResolutionAsText = !props.hideResolution && !props.resolutionIcon;
  const resolutionText = showResolutionAsText ? (
    <span className="vsc-resolution">
      {TextUtils.resolution(file.width, file.height)}
    </span>
  ) : null;

  // Aspect ratio
  const commonDenom = gcd(file.width, file.height);
  const width = Math.round(file.width / commonDenom);
  const height = Math.round(file.height / commonDenom);
  const aspectRatio = (
    <span className="vsc-aspect-ratio">
      {width}&thinsp;:&thinsp;{height}
    </span>
  );

  return (
    <div className="vsc-unique-file-data">
      {filesize}
      {framerate}
      {aspectRatio}
      {resolutionText}
      <ResolutionIcon file={file} hide={!showResolutionAsIcon} />
    </div>
  );
};

type UniqueFileProps = {
  /** The file referenced for this data. */
  file?: VideoFile;
  /** When enabled, the scene aspect ratio will not be displayed. */
  hideAspectRatio: boolean;
  /** When `true`, the file size will not be displayed. */
  hideFilesize: boolean;
  /** When `true`, the frame rate will not be displayed. */
  hideFramerate: boolean;
  /** When `true`, the scene resolution will not be displayed. */
  hideResolution: boolean;
  /** When `true`, the scene resolution be displayed as an SD/HD/2K/4K/etc.
   * icon. SD and HD icons can be hovered over for the full resolution. */
  resolutionIcon: boolean;
};
