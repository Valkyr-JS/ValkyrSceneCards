const { React } = window.PluginApi;

const KeyData: React.FC<KeyDataProps> = ({ scene }) => {
  return (
    <div className="vsc-key-data">
      <span className="vsc-date">YYYY-MM-DD</span>
      <span className="vsc-duration">1:23:43</span>
      <span className="vsc-resolution">1080p</span>
    </div>
  );
};

export default KeyData;

interface KeyDataProps {
  /** The scene data. */
  scene: Scene;
}
