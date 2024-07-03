import { sortPerformers } from "../../helpers/sort";
import "./PerformerList.scss";
const { GQL, React } = window.PluginApi;
//@ts-ignore
const { Icon } = window.PluginApi.components;
const { faMars, faTansgenderAlt, faVenus } =
  window.PluginApi.libraries.FontAwesomeSolid;

const PerformerList: React.FC<PerformerListProps> = (props) => {
  const qConfig = GQL.useConfigurationQuery();
  if (qConfig.loading) return null;

  const sortedPerformers = sortPerformers(props.performers);

  const performerAvatarsShow: boolean | undefined =
    qConfig.data.configuration.plugins.ValkyrSceneCards.performerAvatarsShow;

  if (performerAvatarsShow) {
    const qAllAvatars = GQL.useFindImagesQuery({
      variables: {
        filter: { per_page: -1 },
        image_filter: {
          tags: { modifier: CriterionModifier.Includes, value: ["1824"] },
        },
      },
    });

    if (qAllAvatars.loading) return null;

    return (
      <div className="vsc-performer-list vsc-performer-list__avatar-list">
        {sortedPerformers.map((p) => {
          const avatarUrl = getPerformerAvatarUrl(
            p.id,
            qAllAvatars.data.findImages
          );

          if (!!avatarUrl) {
            return (
              <span className="vsc-performer-list__avatar">
                <a href={`/performers/${p.id}`}>
                  <img src={avatarUrl} alt={p.name} />
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
            console.log(genderIcon);
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
  performers: Performer[];
}

const getPerformerAvatarUrl = (
  id: Performer["id"],
  allAvatarsQuery: FindImagesResultType
) => {
  const url = allAvatarsQuery.images.find((img) =>
    img.performers.find((pf) => pf.id === id)
  )?.paths.image;

  return !!url ? url : null;
};

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
