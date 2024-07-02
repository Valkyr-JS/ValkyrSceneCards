import { ISceneCardProps } from "../../../types/stashPlugin";
import "./CardDescription.scss";

const { React } = window.PluginApi;

const CardDescription = (props: ISceneCardProps) => {
  console.log(props);

  const link = `/scenes/${props.scene.id}`;
  return (
    <div className="scene-card__details">
      <a href={link}>
        <h5 className="card-section-title flex-aligned">{props.scene.title}</h5>
      </a>
      <div className="scene-card__description vsc-card-description__details">
        {props.scene.details}
      </div>
      <span className="scene-card__date">{props.scene.date}</span>
    </div>
  );
};

export default CardDescription;
