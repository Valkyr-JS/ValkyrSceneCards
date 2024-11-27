import { default as cx } from "classnames";
import { sortPerformers } from "@helpers";
import PerformerPopover from "@components/PerformerPopover";
import "./PerformerList.scss";
import OverflowPopover from "@components/OverflowPopover";

const { React } = window.PluginApi;

const PerformersTextList: React.FC<PerformersTextListProps> = ({
  performerLimit,
  scene,
  ...props
}) => {
  // If there are no performers, or the user has chosen to hide them, or the
  // user has chosen to use performer avatars, don't render the component
  if (
    props.hidePerformer ||
    props.performerAvatars ||
    scene.performers.length < 1
  )
    return null;

  const sortedPerformers = sortPerformers(
    scene.performers,
    props.performerGenderFilter
  );
  const visiblePerformers = performerLimit
    ? sortedPerformers.slice(0, performerLimit)
    : sortedPerformers;
  const overflowPerformers = performerLimit
    ? sortedPerformers.slice(performerLimit, sortedPerformers.length)
    : [];

  return (
    <div className="vsc-performers-list vsc-performers-list__text">
      {visiblePerformers.map((pf, i) => {
        const isOneBeforeLast = i === sortedPerformers.length - 2;
        const isAnyBeforeLast = i < sortedPerformers.length - 1;
        const classes = cx("vsc-performer", {
          [`vsc-gender-color--${pf.gender?.toLowerCase() || "unknown"}`]:
            props.performerGenderColors,
        });
        let suffix = null;
        if (
          visiblePerformers.length === 2 &&
          isOneBeforeLast &&
          !overflowPerformers.length
        )
          suffix = " and ";
        else {
          if (isAnyBeforeLast) suffix = ", ";
          if (isOneBeforeLast && !overflowPerformers.length) suffix += "and ";
        }
        return (
          <PerformerPopover
            hidePerformerHoverAge={props.hidePerformerHoverAge}
            hidePerformerHoverImage={props.hidePerformerHoverImage}
            hidePerformerHoverNationality={props.hidePerformerHoverNationality}
            hidePerformerHoverName={true}
            performer={pf}
            performerGenderColors={props.performerGenderColors}
            sceneDate={scene.date}
          >
            <a href={`/performers/${pf.id}`} className={classes}>
              <span>{pf.name}</span>
            </a>
            {suffix}
          </PerformerPopover>
        );
      })}
      <OverflowPerformers performers={overflowPerformers} />
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
  /** When `true`, the performer list will be rendered as a set of avatars
   * rather than as a text list. */
  performerAvatars: boolean;
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** A comma-separated list of the genders that should be included in the
   * performer list. An empty list will show all performers. Case is
   * insensitive. */
  performerGenderFilter: string;
  /** If the number of scene performers exceeds this number, the remaining
   * performers will be replaced with overflow text. If undefined, all
   * performers will be listed. */
  performerLimit: number | undefined;
  /** The scene data. */
  scene: Scene;
}

/* ---------------------------------------------------------------------------------------------- */
/*                                       Overflow performer                                       */
/* ---------------------------------------------------------------------------------------------- */

const OverflowPerformers: React.FC<OverflowPerformersProps> = ({
  performers,
}) => {
  if (performers.length === 0) return null;

  const items = performers.map((p) => ({
    data: p,
    link: `/performers/${p.id}`,
  }));

  return (
    <OverflowPopover items={items} type="performer">
      <span className="top-meta-overflow hoverable">
        and {performers.length} more
      </span>
    </OverflowPopover>
  );
};

interface OverflowPerformersProps {
  performers: Performer[];
}
