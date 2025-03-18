import { TextUtils } from "@helpers";

const { React } = window.PluginApi;

const ResolutionIcon: React.FC<ResolutionIconProps> = ({ file, hide }) => {
  if (hide) return null;

  const resolution = TextUtils.resolution(file.width, file.height);

  /**
   * ! There is an issue with the HoverPopover component which is likely
   * happening in the PluginApi. The component only loads if called on an page
   * other than the first. I.e. it doesn't work on a hard refresh or if the
   * performer profile page is navigated to directly. Bug raised at
   * https://github.com/stashapp/stash/issues/5479 for the same issue in another
   * component.
   */
  const [componentsReady, setComponentsReady] = React.useState(false);

  // ? Short-term workaround for the above bug. Use a timeout to wait for the
  // PluginApi to fully load before continuing.
  setTimeout(() => setComponentsReady(true), 100);

  if (!componentsReady) return null;

  const { HoverPopover } = window.PluginApi.components;

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
    <HoverPopover
      className="vsc-resolution vsc-resolution--icon"
      content={
        <span className="vsc-text-hover">
          {file.width} &times; {file.height}
        </span>
      }
      leaveDelay={100}
      placement="top"
    >
      {shortRes}
    </HoverPopover>
  );
};

export default ResolutionIcon;

interface ResolutionIconProps {
  /** The video file to get the resolution from. */
  file: VideoFile;
  /** When `true`, the scene resolution icon will not be displayed. */
  hide: boolean;
}
