const { React } = window.PluginApi;

const Description: React.FC<DescriptionProps> = ({ scene, ...props }) => {
  if (!scene.details || props.hideDescription)
    return <div className="vsc-description" />;

  // Limit the maximum number of lines.
  const styles = { WebkitLineClamp: props.descriptionMaxLines };

  return (
    <div className="vsc-description">
      <div style={styles} className="vsc-description-inner">
        {scene.details}
      </div>
    </div>
  );
};

export default Description;

interface DescriptionProps {
  /** Set the maximum number of lines that a scene description can fill before
   * being truncated. Default is 3. */
  descriptionMaxLines: number;
  /** When `true`, the scene description will not be displayed. */
  hideDescription: boolean;
  /** The scene data. */
  scene: Scene;
}
