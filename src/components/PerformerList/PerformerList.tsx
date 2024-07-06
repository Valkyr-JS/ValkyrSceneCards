import { sortPerformers } from "../../helpers/sort";
import "./PerformerList.scss";
const { GQL, React } = window.PluginApi;
//@ts-ignore
const { Icon } = window.PluginApi.components;
const { faMars, faTansgenderAlt, faVenus } =
  window.PluginApi.libraries.FontAwesomeSolid;

const PerformerList: React.FC<PerformerListProps> = (props) => {
  const {
    performerAvatarsActive,
    performerAvatarsProfile,
    performerAvatarsTagID,
  } = props.pluginConfig;
  const sortedPerformers = sortPerformers(props.performers);

  if (performerAvatarsActive) {
    const qProfileImages = GQL.useFindPerformersQuery({
      variables: {
        filter: { per_page: -1 },
        performer_ids: sortedPerformers.map((pf) => +pf.id),
      },
    });

    const qAvatars = GQL.useFindImagesQuery({
      variables: {
        filter: { per_page: -1 },
        image_filter: {
          performers: {
            modifier: CriterionModifier.Includes,
            value: sortedPerformers.map((pf) => pf.id),
          },
          tags: {
            modifier: CriterionModifier.Includes,
            value: [performerAvatarsTagID],
          },
        },
      },
    });

    if (qAvatars.loading || qProfileImages.loading) return null;
    console.log(qProfileImages);

    return (
      <div className="vsc-performer-list vsc-performer-list__avatar-list">
        {sortedPerformers.map((p) => {
          const avatarUrl = getPerformerAvatarUrl({
            avatarsQuery: qAvatars.data?.findImages,
            avatarTag: performerAvatarsTagID,
            id: p.id,
            profileImagesQuery: qProfileImages.data?.findPerformers,
          });

          const useCustomAvatar = !!performerAvatarsTagID && !!avatarUrl.custom;
          const useProfileImage =
            performerAvatarsProfile && !!avatarUrl.profile;
          if (useCustomAvatar || useProfileImage) {
            return (
              <span
                className={`vsc-performer-list__avatar vsc-performer-list__avatar--${useCustomAvatar ? "custom" : "profile"}`}
              >
                <a href={`/performers/${p.id}`}>
                  <img
                    src={
                      useCustomAvatar
                        ? (avatarUrl.custom as string)
                        : (avatarUrl.profile as string)
                    }
                    alt={p.name}
                  />
                </a>
              </span>
            );
          } else {
            const names = p.name.split(" ");
            let initials = "";
            names.forEach((n, i) => {
              if (i === 0 || i === names.length - 1) {
                initials += n.split("")[0];
              }
            });
            const genderIcon = getPerformerGenderIcon(p.gender);
            return (
              <span className="vsc-performer-list__avatar">
                <a href={`/performers/${p.id}`}>
                  <span>{initials}</span>
                  {!!genderIcon ? <Icon icon={genderIcon} /> : null}
                </a>
              </span>
            );
          }
        })}
      </div>
    );
  } else {
    return (
      <div className="vsc-performer-list">
        {sortedPerformers.map((p, i) => {
          const totalPerformers = props.performers.length;
          const isOneBeforeLast = i === totalPerformers - 2;
          const isAnyBeforeLast = i < totalPerformers - 1;

          let suffix = null;
          if (totalPerformers === 2 && isOneBeforeLast) suffix = " and ";
          else {
            if (isAnyBeforeLast) suffix = ", ";
            if (isOneBeforeLast) suffix += "and ";
          }
          return (
            <>
              <a href={`/performers/${p.id}`}>
                <span>{p.name}</span>
              </a>
              {suffix}
            </>
          );
        })}
      </div>
    );
  }
};

export default PerformerList;

interface PerformerListProps {
  /** The performers featured in the scene. */
  performers: Performer[];
  /** The plugin config data. */
  pluginConfig: VSCFinalConfigMap;
}

const getPerformerAvatarUrl = (args: IgetPerformerAvatarUrl) => {
  const avatarUrl = args.avatarsQuery?.images.find((img) =>
    img.performers.find((pf) => pf.id === args.id)
  )?.paths.image;

  const profileImageUrl = args.profileImagesQuery?.performers.find(
    (pf) => pf.id === args.id
  )?.image_path;

  // Don't return the native default image
  const url = {
    custom: avatarUrl,
    profile: !profileImageUrl?.includes("default=true")
      ? profileImageUrl
      : undefined,
  };
  return url;
};

interface IgetPerformerAvatarUrl {
  avatarsQuery?: FindImagesResultType;
  avatarTag?: string;
  id: Performer["id"];
  profileImagesQuery?: FindPerformersResultType;
}

const getPerformerGenderIcon = (gender: Performer["gender"]) => {
  switch (gender) {
    case undefined:
      return null;
    case "FEMALE":
      return faVenus;
    case "MALE":
      return faMars;
    default:
      return faTansgenderAlt;
  }
};
