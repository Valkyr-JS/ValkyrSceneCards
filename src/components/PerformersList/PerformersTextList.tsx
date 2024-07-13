import { default as cx } from "classnames";
import { sortPerformers } from "../../helpers";
import TextUtils from "../../helpers/text";
import "./PerformerList.scss";

const { React } = window.PluginApi;
const { HoverPopover } = window.PluginApi.components;

const PerformersTextList: React.FC<PerformersTextListProps> = ({
  scene,
  ...props
}) => {
  // If there are no performers, or the user has chosen to hide them, don't
  // render the component
  if (props.hidePerformer || scene.performers.length < 1) return null;
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
          <PerformerPopover
            hidePerformerHoverAge={props.hidePerformerHoverAge}
            hidePerformerHoverImage={props.hidePerformerHoverImage}
            hidePerformerHoverNationality={props.hidePerformerHoverNationality}
            performer={pf}
            sceneDate={scene.date}
          >
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
  /** When `true`, the list of performers will not be displayed. */
  hidePerformer: boolean;
  /** When `true`, the performer's age will not be displayed when hovering over
   * their name or avatar. */
  hidePerformerHoverAge: boolean;
  /** When `true`, the performer's image will not be displayed when hovering
   * over their name or avatar. */
  hidePerformerHoverImage: boolean;
  /** When `true`, the performer's nationality will not be displayed when
   * hovering over their name or avatar. */
  hidePerformerHoverNationality: boolean;
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** The scene data. */
  scene: Scene;
}

const PerformerPopover: React.FC<PerformersPopover> = ({
  performer,
  ...props
}) => {
  const showAge = !!performer.birthdate && !props.hidePerformerHoverAge;
  const age = showAge ? (
    <span className="vsc-performer-age">
      {TextUtils.age(performer.birthdate, props.sceneDate)}
      {" years old"}
    </span>
  ) : null;

  const showFlag = !!performer.country && !props.hidePerformerHoverNationality;
  const flag = showFlag ? (
    <span className={`fi fi-${performer.country?.toLowerCase()}`}></span>
  ) : null;

  const showImage = !!performer.image_path && !props.hidePerformerHoverImage;
  const image = showImage ? (
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
  ) : null;

  const showData =
    showFlag || showAge ? (
      <div className="vsc-performer-text-list-popover-data">
        {flag}
        {age}
      </div>
    ) : null;

  const content = (
    <div className="performer-tag-container row">
      {image}
      {showData}
    </div>
  );

  if (showData || showImage) {
    return (
      <HoverPopover content={content} leaveDelay={100} placement="top">
        {props.children}
      </HoverPopover>
    );
  }
  return props.children;
};

interface PerformersPopover extends React.PropsWithChildren {
  /** When `true`, the performer's age will not be displayed when hovering over
   * their name or avatar. */
  hidePerformerHoverAge: boolean;
  /** When `true`, the performer's image will not be displayed when hovering
   * over their name or avatar. */
  hidePerformerHoverImage: boolean;
  /** When `true`, the performer's nationality will not be displayed when
   * hovering over their name or avatar. */
  hidePerformerHoverNationality: boolean;
  /** The performer data. */
  performer: Performer;
  /** The scene date as a string, i.e. YYYY-MM-DD */
  sceneDate: Scene["date"];
}
