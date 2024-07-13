import { default as cx } from "classnames";
import { sortPerformers } from "../../helpers";

const { React } = window.PluginApi;

const PerformersTextList: React.FC<PerformersTextListProps> = ({
  scene,
  ...props
}) => {
  // If there are no performers, don't render the component
  if (scene.performers.length < 1) return null;

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
          <>
            <a href={`/performers/${pf.id}`} className={classes}>
              <span>{pf.name}</span>
            </a>
            {suffix}
          </>
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
