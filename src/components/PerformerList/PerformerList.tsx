import cx from "classnames";
import { sortPerformers } from "../../helpers/sort";
import "./PerformerList.scss";
import { IHoverPopover } from "../../../types/stashPlugin";
import { TextUtils } from "../../helpers";
const { PluginApi } = window;
const { GQL, React } = PluginApi;
const { faMars, faTansgenderAlt, faVenus } =
  window.PluginApi.libraries.FontAwesomeSolid;

const PerformerList: React.FC<PerformerListProps> = (props) => {
  const { Icon } = PluginApi.components;

  const {
    performerAvatarsActive,
    performerAvatarsProfile,
    performerAvatarsSizeLarge,
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

    const avatarListClasses = cx(
      "vsc-performer-list",
      "vsc-performer-list__avatar-list",
      {
        ["vsc-performer-list__avatar-list--large"]: performerAvatarsSizeLarge,
      }
    );

    return (
      <div className={avatarListClasses}>
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
            const avatarClasses = cx("vsc-performer-list__avatar", {
              ["vsc-performer-list__avatar--custom"]: useCustomAvatar,
              ["vsc-performer-list__avatar--profile"]: !useCustomAvatar,
            });
            return (
              <PerformerPopover performer={p} releaseDate={props.scene.date}>
                <span className={avatarClasses}>
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
              </PerformerPopover>
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
              <PerformerPopover performer={p} releaseDate={props.scene.date}>
                <span className="vsc-performer-list__avatar">
                  <a href={`/performers/${p.id}`}>
                    <span>{initials}</span>
                    {!!genderIcon ? <Icon icon={genderIcon} /> : null}
                  </a>
                </span>
              </PerformerPopover>
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
  /** The scene data. */
  scene: Scene;
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

const PerformerPopover: React.FC<PerformerPopoverProps> = ({
  performer,
  releaseDate,
  ...props
}) => {
  const { HoverPopover } = PluginApi.components;
  const qPerformer = GQL.useFindPerformerQuery({
    variables: { id: performer.id },
  });
  if (qPerformer.loading) return null;

  const Content = () => {
    const birthdate = qPerformer.data.findPerformer?.birthdate;
    return (
      <span className="vsc-performer-list__performer-hover">
        {performer.name}
        {birthdate && releaseDate
          ? " (" + TextUtils.age(birthdate, releaseDate) + ")"
          : null}
      </span>
    );
  };

  return (
    <HoverPopover
      content={<Content />}
      children={props.children}
      leaveDelay={100}
      placement="top"
    />
  );
};

interface PerformerPopoverProps extends React.PropsWithChildren {
  performer: Performer;
  releaseDate: Scene["date"];
}
