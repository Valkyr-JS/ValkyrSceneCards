import { getPerformerGenderIcon, sortPerformers } from "@helpers";
import PerformerPopover from "@components/PerformerPopover";
const { React } = window.PluginApi;
const { Icon } = window.PluginApi.components;

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

  const sortedPerformers = sortPerformers(
    scene.performers,
    props.performerGenderFilter
  );

  return (
    <ul className="vsc-performers-list vsc-performers-list__avatars">
      {sortedPerformers.map((pf) => {
        let avatar: React.JSX.Element;

        const customAvatar = props.sceneCustomAvatars.find((img) =>
          img.performers.find((p) => p.id === pf.id)
        );

        switch (true) {
          case !!customAvatar:
            avatar = <CustomAvatar performer={pf} image={customAvatar} />;
            break;
          case props.performerAvatarsProfile:
            avatar = <ProfileAvatar performer={pf} />;
            break;
          default:
            avatar = <DefaultAvatar performer={pf} />;
            break;
        }

        // Get the appropriate gender icon
        return (
          <li className="vsc-performer">
            <PerformerPopover
              hidePerformerHoverAge={props.hidePerformerHoverAge}
              hidePerformerHoverImage={props.hidePerformerHoverImage}
              hidePerformerHoverNationality={
                props.hidePerformerHoverNationality
              }
              hidePerformerHoverName={false}
              performer={pf}
              performerGenderColors={props.performerGenderColors}
              sceneDate={scene.date}
            >
              {avatar}
            </PerformerPopover>
          </li>
        );
      })}
    </ul>
  );
};

export default PerformersAvatarList;

interface PerformersAvatarListProps {
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
  /** When `true`, performer avatars will use the performer's profile image. */
  performerAvatarsProfile: boolean;
  /** When `true`, performer names will be colored according to their gender. */
  performerGenderColors: boolean;
  /** A comma-separated list of the genders that should be included in the
   * performer list. An empty list will show all performers. Case is
   * insensitive. */
  performerGenderFilter: string;
  /** The scene data. */
  scene: Scene;
  /** When set, performer avatars will use images tagged with this tag ID. */
  sceneCustomAvatars: Image[];
}

/* -------------------------------------------------------------------------- */
/*                               Avatar options                               */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Default avatar ----------------------------- */

const DefaultAvatar: React.FC<AvatarProps> = ({ performer }) => {
  // Create the performer's initials, splitting at hyphens and spaces
  const names = performer.name.split("-").join(" ").split(" ");
  let initials = "";
  names.forEach((n) => {
    initials += n.split("")[0];
  });
  const genderIcon = getPerformerGenderIcon(performer.gender);

  return (
    <a href={`/performers/${performer.id}`} className="vsc-performer-avatar">
      <span aria-label={performer.name}>{initials}</span>
      {!!genderIcon ? <Icon icon={genderIcon} /> : null}
    </a>
  );
};

interface AvatarProps {
  /** The performer details. */
  performer: Performer;
}

/* -------------------------- Profile image avatar -------------------------- */

const ProfileAvatar: React.FC<AvatarProps> = ({ performer }) => {
  // Render a default avatar if there is no image for the performer, or the
  // native default image is being used.
  if (!performer.image_path || performer.image_path.includes("default=true"))
    return <DefaultAvatar performer={performer} />;

  return (
    <a
      href={`/performers/${performer.id}`}
      className="vsc-performer-avatar vsc-performer-avatar--profile"
    >
      <img src={performer.image_path} alt={performer.name} />
    </a>
  );
};

/* --------------------------- Custom image avatar -------------------------- */

const CustomAvatar: React.FC<CustomAvatarProps> = ({ image, performer }) => {
  // Render a default avatar if there is custom image data is invalid for the performer.
  if (!image.paths.image) return <DefaultAvatar performer={performer} />;

  return (
    <a
      href={`/performers/${performer.id}`}
      className="vsc-performer-avatar vsc-performer-avatar--custom"
    >
      <img src={image.paths.image} alt={performer.name} />
    </a>
  );
};

interface CustomAvatarProps extends AvatarProps {
  /** The performer details. */
  image: Image;
}
