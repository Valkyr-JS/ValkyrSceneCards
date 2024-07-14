import { default as cx } from "classnames";
import TextUtils from "../helpers/text";
const { React } = window.PluginApi;
const { HoverPopover } = window.PluginApi.components;

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

  // Only show image if one is available, and it isn't the default for a missing
  // image, and the user hasn't chosen to hide the images
  const showImage =
    !!performer.image_path &&
    !performer.image_path.includes("default=true") &&
    !props.hidePerformerHoverImage;

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

  const showName = !props.hidePerformerHoverName;
  const nameClasses = cx("vsc-performer-text-list-popover-name", {
    [`vsc-gender-color--${performer.gender?.toLowerCase() || "unknown"}`]:
      props.performerGenderColors,
  });
  const name = showName ? (
    <div className={nameClasses}>{performer.name}</div>
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
      {name}
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

export default PerformerPopover;

interface PerformersPopover extends React.PropsWithChildren {
  /** When `true`, the performer's age will not be displayed when hovering over
   * their name or avatar. */
  hidePerformerHoverAge: boolean;
  /** When `true`, the performer's image will not be displayed when hovering
   * over their name or avatar. */
  hidePerformerHoverImage: boolean;
  /** When `true`, the performer's name will not be displayed when hovering over
   * their name or avatar */
  hidePerformerHoverName: boolean;
  /** When `true`, the performer's nationality will not be displayed when
   * hovering over their name or avatar. */
  hidePerformerHoverNationality: boolean;
  /** The performer data. */
  performer: Performer;
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** The scene date as a string, i.e. YYYY-MM-DD */
  sceneDate: Scene["date"];
}
