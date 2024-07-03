import { ISceneCardProps } from "../../../types/stashPlugin";
import "./CardDescription.scss";
import { TextUtils } from "../../helpers";

const { React } = window.PluginApi;

const CardDescription = (props: ISceneCardProps) => {
  console.log(props);

  const link = `/scenes/${props.scene.id}`;

  const resolution = TextUtils.resolution(
    props.scene.files[0].width,
    props.scene.files[0].height
  );

  let shortRes = "";

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
      shortRes = resolution || "";
      break;
  }
  return (
    <div className="scene-card__details">
      <a href={link}>
        <h5 className="card-section-title flex-aligned">{props.scene.title}</h5>
      </a>
      <div className="scene-card__description vsc-card-description__details">
        {props.scene.details}
      </div>
      <span className="scene-card__date">{props.scene.date}</span>
      <div>
        <span className="vsc-card-description__resolution">{shortRes}</span>
      </div>
    </div>
  );
};

export default CardDescription;
