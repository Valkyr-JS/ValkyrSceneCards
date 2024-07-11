import TextUtils from "../helpers/text";

const { React } = window.PluginApi;

const Resolution: React.FC<ResolutionProps> = ({ file, ...props }) => {
  const showResolution = !!file && !props.hideResolution;

  // If the user has chosen to hide the resolution, render nothing
  if (!showResolution) return null;

  const resolution = TextUtils.resolution(file.width, file.height);

  // If the user has chosen to render an icon, render it
  if (props.resolutionIcon) {
    let shortRes: string | null = "";
    switch (resolution) {
      case "144p":
      case "240p":
      case "360p":
      case "480p":
      case "540p":
        shortRes = "SD";
        break;
      case "720p":
      case "1080p":
        shortRes = "HD";
        break;
      case "1440p":
        shortRes = "2K";
        break;
      default:
        shortRes = resolution || null;
        break;
    }

    return (
      <span className="vsc-resolution vsc-resolution--icon">{shortRes}</span>
    );
  }

  // Otherwise, render the default resolution text
  return <span className="vsc-resolution">{resolution}</span>;
};

export default Resolution;

interface ResolutionProps {
  /** When `true`, the scene resolution will not be displayed. */
  hideResolution: boolean;
  /** When `true`, the scene resolution be displayed as an SD/HD/2K/4K/etc.
   * icon. SD and HD icons can be hovered over for the full resolution. */
  resolutionIcon: boolean;
  /** The video file to get the resolution from. */
  file?: VideoFile;
}
