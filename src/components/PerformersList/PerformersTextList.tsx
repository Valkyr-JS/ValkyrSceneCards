import { default as cx } from "classnames";
import { sortPerformers } from "../../helpers";
import TextUtils from "../../helpers/text";

const { React } = window.PluginApi;
const { HoverPopover } = window.PluginApi.components;

const PerformersTextList: React.FC<PerformersTextListProps> = ({
  scene,
  ...props
}) => {
  // If there are no performers, don't render the component
  if (scene.performers.length < 1) return null;
  console.log(scene.performers);

  const sortedPerformers = sortPerformers(scene.performers);
  const totalPerformers = sortedPerformers.length;

  return (
    <div className="vsc-performers-list vsc-performers-list__text">
      {sortedPerformers.map((pf, i) => {
        const isOneBeforeLast = i === totalPerformers - 2;
        const isAnyBeforeLast = i < totalPerformers - 1;
        const classes = cx("vsc-performer", {
          [`vsc-gender-color--${pf.gender?.toLowerCase() || "unknown"}`]:
            props.performerGenderColors,
        });
        let suffix = null;
        if (totalPerformers === 2 && isOneBeforeLast) suffix = " and ";
        else {
          if (isAnyBeforeLast) suffix = ", ";
          if (isOneBeforeLast) suffix += "and ";
        }
        return (
          <PerformerPopover performer={pf} sceneDate={scene.date}>
            <a href={`/performers/${pf.id}`} className={classes}>
              <span>{pf.name}</span>
            </a>
            {suffix}
          </PerformerPopover>
        );
      })}
    </div>
  );
};

export default PerformersTextList;

interface PerformersTextListProps {
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** The scene data. */
  scene: Scene;
}

const PerformerPopover: React.FC<PerformersPopover> = ({
  performer,
  ...props
}) => {
  const showAge = !!performer.birthdate;
  const age = showAge ? (
    <span>{TextUtils.age(performer.birthdate, props.sceneDate)}</span>
  ) : null;

  const content = (
    <div className="performer-tag-container row">
      <a
        href={`/performers/${performer.id}`}
        className="performer-tag col m-auto"
      >
        <img
          className="image-thumbnail"
          alt={performer.name ?? ""}
          src={performer.image_path ?? ""}
        />
      </a>
      <div>
        {"("}
        {age}
        {")"}
      </div>
    </div>
  );

  if (showAge) {
    return (
      <HoverPopover content={content} leaveDelay={100} placement="top">
        {props.children}
      </HoverPopover>
    );
  }
  return props.children;
};

interface PerformersPopover extends React.PropsWithChildren {
  performer: Performer;
  sceneDate: Scene["date"];
}
