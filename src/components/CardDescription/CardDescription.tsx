import { ISceneCardProps } from "../../../types/stashPlugin";
import "./CardDescription.scss";
import { TextUtils } from "../../helpers";
import PerformerList from "../PerformerList/PerformerList";

const { React } = window.PluginApi;

const CardDescription = (props: ISceneCardProps) => {
  const link = `/scenes/${props.scene.id}`;
  const file = props.scene.files[0];

  const duration = TextUtils.secondsToTimestamp(file.duration);
  const resolution = TextUtils.resolution(file.width, file.height);

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
    <div className="scene-card__details">
      <div className="vsc-card-description__small-bar">
        <span className="vsc-card-description__studio">
          {props.scene.studio?.name}
        </span>
        <div className="vsc-card-description__file-data">
          <span className="vsc-card-description__duration">{duration}</span>
          {shortRes ? (
            <span className="vsc-card-description__resolution">{shortRes}</span>
          ) : null}
        </div>
      </div>
      <a href={link}>
        <h5 className="card-section-title flex-aligned">{props.scene.title}</h5>
      </a>
      <div className="scene-card__description vsc-card-description__details">
        <div className="vsc-card-description__details-inner">
          {props.scene.details}
        </div>
      </div>
      <PerformerList performers={props.scene.performers} />
      <div className="vsc-card-description__foot">
        <span className="scene-card__date">{props.scene.date}</span>
      </div>
    </div>
  );
};

export default CardDescription;
