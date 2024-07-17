import Droplet from "@components/Icons/Droplet";

const { React } = window.PluginApi;
const { Icon } = window.PluginApi.components;
const { faBox, faEye, faStar } = window.PluginApi.libraries.FontAwesomeSolid;

const UserData: React.FC<UserDataProps> = ({
  hideZeroValueData,
  scene,
  ...props
}) => {
  const showOCount = getShowNumberData(
    props.hidePlayCount,
    hideZeroValueData,
    scene.o_counter
  );

  const showPlayCount = getShowNumberData(
    props.hideOCount,
    hideZeroValueData,
    scene.play_count
  );

  const showRating = getShowNumberData(
    props.hideRating,
    hideZeroValueData,
    scene.rating100
  );

  const showOrganized = scene.organized && !props.hideOrganized;

  // Render nothing if there is no data at all to render
  if (!showOCount && !showPlayCount && !showRating && !scene.organized)
    return null;

  const playCount = showPlayCount ? (
    <span className="vsc-play-count">
      <Icon icon={faEye} />
      <span>{scene.play_count ?? 0}</span>
    </span>
  ) : null;

  const oCount = showOCount ? (
    <span className="vsc-o-count">
      <Droplet />
      <span>{scene.o_counter ?? 0}</span>
    </span>
  ) : null;

  const organized = showOrganized ? (
    <span className="vsc-organized">
      <Icon icon={faBox} />
    </span>
  ) : null;

  const ratingType = props.ratingSystemOptions?.type ?? "stars";
  const rating100 = scene.rating100 || 0;
  let ratingNum = 0;
  if (ratingType === "decimal") ratingNum = rating100 / 10;
  else {
    switch (props.ratingSystemOptions?.starPrecision ?? "full") {
      case "half":
        ratingNum = Math.round(rating100 / 10) / 2; // Math.round(74 / 10 = 7.4) / 2 = 3.5
        break;
      case "quarter":
        ratingNum = Math.round(rating100 / 5) / 4; // Math.round(74 / 5 = 14.8) / 4 = 3.75
        break;
      case "tenth":
        ratingNum = Math.round(rating100 / 2) / 10; // Math.round(74 / 2 = 37) / 10 = 3.7
        break;
      case "full":
      default:
        ratingNum = Math.round(rating100 / 20); // Math.round(74 / 20 = 3.7) = 4
    }
  }

  const rating = showRating ? (
    <span className="vsc-rating">
      <Icon icon={faStar} />
      <span>{ratingNum}</span>
    </span>
  ) : null;

  return (
    <div className="vsc-user-data">
      {playCount}
      {oCount}
      {rating}
      {organized}
    </div>
  );
};

export default UserData;

interface UserDataProps {
  /** When `true`, the scene O count and icon will not be displayed. */
  hideOCount: boolean;
  /** When `true`, the organized icon will not be displayed for scenes marked
   * as organized. */
  hideOrganized: boolean;
  /** When `true`, the scene play count and icon will not be displayed. */
  hidePlayCount: boolean;
  /** When `true`, the scene user rating will not be displayed. */
  hideRating: boolean;
  /** When `true`, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData: boolean;
  /** The scene data. */
  scene: Scene;
  /** Stash rating system options. */
  ratingSystemOptions?: IratingSystemOptions;
}

const getShowNumberData = (
  userHidden: boolean,
  hideZeroValueData: boolean,
  data?: Maybe<number>
): boolean => {
  // If the user has hidden zero-value data, and the data is zero or unavailable, return `false`.
  if (hideZeroValueData && (data ?? 0) < 1) return false;

  // If the user has hidden this data, return `false`.
  if (userHidden) return false;

  // Otherwise return true
  return true;
};
