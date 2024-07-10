import Droplet from "../Icons/Droplet";

const { React } = window.PluginApi;
const { Icon } = window.PluginApi.components;
const { faBox, faEye } = window.PluginApi.libraries.FontAwesomeSolid;

const UserData: React.FC<UserDataProps> = ({ scene }) => {
  const playCount = scene.play_count ? (
    <span className="vsc-play-count">
      <Icon icon={faEye} />
      <span> {scene.play_count}</span>
    </span>
  ) : null;

  const oCount = scene.o_counter ? (
    <span className="vsc-o-count">
      <Droplet />
      <span> {scene.o_counter}</span>
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
  /** The scene data. */
  scene: Scene;
}
