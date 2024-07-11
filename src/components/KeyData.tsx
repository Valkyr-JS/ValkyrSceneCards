import TextUtils from "../helpers/text";
const { React } = window.PluginApi;

const KeyData: React.FC<KeyDataProps> = ({ scene, ...props }) => {
  // Base all file data on the file with the highest resolution
  const primaryFile = scene.files.sort((a, b) => b.height - a.height)[0];

  const showDate = typeof scene.date !== "undefined" && !props.hideDate;
  const showDuration = !!primaryFile && !props.hideDuration;
  const showResolution = !!primaryFile && !props.hideResolution;

  const date = showDate ? <span className="vsc-date">{scene.date}</span> : null;

  const duration = showDuration ? (
    <span className="vsc-duration">
      {TextUtils.secondsToTimestamp(primaryFile.duration ?? 0)}
    </span>
  ) : null;

  const resolution = showResolution ? (
    <span className="vsc-resolution">
      {TextUtils.resolution(primaryFile.width, primaryFile.height)}
    </span>
  ) : null;

  // Render nothing if there is no data at all to render
  if (!showDate && !showDuration && !showResolution) return null;

  return (
    <div className="vsc-key-data">
      {date}
      {duration}
      {resolution}
    </div>
  );
};

export default KeyData;

interface KeyDataProps {
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
