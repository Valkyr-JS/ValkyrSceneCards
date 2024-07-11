import Droplet from "../Icons/Droplet";

const { React } = window.PluginApi;
const { Icon } = window.PluginApi.components;
const { faBox, faEye } = window.PluginApi.libraries.FontAwesomeSolid;

const UserData: React.FC<UserDataProps> = ({
  hideOCount,
  hidePlayCount,
  hideZeroValueData,
  scene,
}) => {
  const showOCount = getShowNumberData(
    hidePlayCount,
    hideZeroValueData,
    scene.o_counter
  );

  const showPlayCount = getShowNumberData(
    hideOCount,
    hideZeroValueData,
    scene.play_count
  );

  // Render nothing if there is no data at all to render
  if (!showOCount && !showPlayCount && !scene.organized) return null;

  const playCount = showPlayCount ? (
    <span className="vsc-play-count">
      <Icon icon={faEye} />
      <span> {scene.play_count ?? 0}</span>
    </span>
  ) : null;

  const oCount = showOCount ? (
    <span className="vsc-o-count">
      <Droplet />
      <span> {scene.o_counter ?? 0}</span>
    </span>
  ) : null;

  const organized = scene.organized ? (
    <span className="vsc-organized">
      <Icon icon={faBox} />
    </span>
  ) : null;

  return (
    <div className="vsc-user-data">
      {playCount}
      {oCount}
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
  /** When `true`, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData: boolean;
  /** The scene data. */
  scene: Scene;
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
