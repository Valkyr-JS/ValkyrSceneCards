const { React } = window.PluginApi;

const PerformersAvatarList: React.FC<PerformersAvatarListProps> = ({
  scene,
  ...props
}) => {
  // If there are no performers, or the user has chosen to hide them, or the
  // user hasn't chosen to use performer avatars, don't render the component
  if (
    props.hidePerformer ||
    !props.performerAvatars ||
    scene.performers.length < 1
  )
    return null;

  return (
    <ul className="vsc-performers-list vsc-performers-list__avatars">
      <li>Avatar 1</li>
    </ul>
  );
};

export default PerformersAvatarList;

interface PerformersAvatarListProps {
  /** When `true`, the list of performers will not be displayed. */
  hidePerformer: boolean;
  /** When `true`, the performer list will be rendered as a set of avatars
   * rather than as a text list. */
  performerAvatars: boolean;
  /** When `true`, performer avatars will use the performer's profile image. */
  performerAvatarsProfile: boolean;
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** The scene data. */
  scene: Scene;
  /** When set, performer avatars will use images tagged with this tag ID. */
  performerAvatarsCustomTag?: string;
}
