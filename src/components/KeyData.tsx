import { TextUtils } from "@helpers";
import ResolutionIcon from "./ResolutionIcon";
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
  const showResolution = !!primaryFile && !hideResolution;

  // Render nothing if there is no data at all to render
  if (!showDate && !showDuration && hideResolution) return null;

  // Date
  const date = showDate ? <span className="vsc-date">{scene.date}</span> : null;

  // Resolution
  const showResolutionAsIcon = showResolution && resolutionIcon;
  const showResolutionAsText = showResolution && !resolutionIcon;
  const resolutionText = showResolutionAsText ? (
    <span className="vsc-resolution">
      {TextUtils.resolution(primaryFile.width, primaryFile.height)}
    </span>
  ) : null;

  // Duration
  let duration: React.JSX.Element | null = null;

  if (showDuration) {
    let timestamp = TextUtils.secondsToTimestamp(primaryFile.duration ?? 0);
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
    <div className="vsc-key-data">
      <ResolutionIcon file={primaryFile} hide={!showResolutionAsIcon} />
      {date}
      {duration}
      {resolutionText}
    </div>
  );
};

export default KeyData;

interface KeyDataProps {
  /** When `true`, the scene duration will be padded out to HH:MM:SS. For
   * example, 6:37 would appear as 00:06:37. */
  durationPadding: boolean;
  /** When `true`, the scene date will not be displayed. */
  hideDate: boolean;
  /** When `true`, the scene duration will not be displayed. */
  hideDuration: boolean;
  /** When `true`, the scene resolution will not be displayed. */
  hideResolution: boolean;
  /** When `true`, the scene resolution be displayed as an SD/HD/2K/4K/etc.
   * icon. SD and HD icons can be hovered over for the full resolution. */
  resolutionIcon: boolean;
  /** The scene data. */
  scene: Scene;
}
