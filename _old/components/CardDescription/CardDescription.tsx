import { ISceneCardProps } from "../../../types/stashPlugin";
import "./CardDescription.scss";
import { TextUtils } from "../../helpers";
import PerformerList from "../PerformerList/PerformerList";

const { React } = window.PluginApi;
const { HoverPopover, Icon } = window.PluginApi.components;
const { faBox, faStar } = window.PluginApi.libraries.FontAwesomeSolid;

const CardDescription: React.FC<CardDescriptionProps> = (props) => {
  const { descriptionHidden } = props.pluginConfig;
  const link = `/scenes/${props.scene.id}`;
  const file = props.scene.files[0];

  const duration = TextUtils.secondsToTimestamp(file.duration);
  const resolution = TextUtils.resolution(file.width, file.height);

  let shortRes: string | null = "";

  const rating =
    +(props.scene.rating100 ?? 0) > 0 ? (
      <span className="vsc-card-description__rating">
        {(props.scene.rating100 || 0) / 10}
        <Icon icon={faStar} />
      </span>
    ) : null;

  const organized = props.scene.organized ? (
    <span className="vsc-card-description__organized">
      <Icon icon={faBox} />
    </span>
  ) : null;

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
        {props.scene.studio ? (
          <span className="vsc-card-description__studio">
            <a href={"/studios/" + props.scene.studio.id}>
              {props.scene.studio.name}
            </a>
          </span>
        ) : null}
        <div className="vsc-card-description__file-data">
          <span className="vsc-card-description__duration">{duration}</span>
          {shortRes ? (
            <HoverPopover
              className="vsc-card-description__resolution"
              content={
                <span className="vsc-card-description__resolution-hover">
                  {resolution}
                </span>
              }
              leaveDelay={100}
              placement="top"
            >
              {shortRes}
            </HoverPopover>
          ) : null}
          {organized}
        </div>
      </div>
      <a href={link}>
        <h5 className="card-section-title flex-aligned">{props.scene.title}</h5>
      </a>
      {descriptionHidden ? null : (
        <div className="scene-card__description vsc-card-description__details">
          <div className="vsc-card-description__details-inner">
            {props.scene.details}
          </div>
        </div>
      )}
      <PerformerList
        performers={props.scene.performers}
        pluginConfig={props.pluginConfig}
        scene={props.scene}
      />
      <div className="vsc-card-description__foot">
        <span className="vsc-card-description__date">{props.scene.date}</span>
        {rating}
      </div>
    </div>
  );
};

export default CardDescription;

interface CardDescriptionProps extends ISceneCardProps {
  /** The plugin config data. */
  pluginConfig: VSCFinalConfigMap;
}
