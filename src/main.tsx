import { ISceneCardProps } from "../types/stashPlugin";
import type {
  ISceneCardPropsExtended,
  VSCConfigMap,
  VSCFinalConfigMap,
} from "../types/ValkyrSceneCards";
import { SceneCardDetails } from "./components/SceneCard";
import "./styles.scss";
const { PluginApi } = window;
const { GQL, React } = PluginApi;

PluginApi.patch.instead("SceneCard", function (props, _, Original) {
  // Fetch user plugin config
  const qConfig = GQL.useConfigurationQuery();
  const configLoaded = !qConfig.loading;

  if (configLoaded) {
    const userConfig: VSCConfigMap | undefined =
      qConfig.data.configuration.plugins.ValkyrSceneCards;

    const config: VSCFinalConfigMap = {
      descriptionMaxLines: userConfig?.descriptionMaxLines || 3, // If config returns undefined or 0, set to default
      durationPadding: userConfig?.durationPadding ?? false,
      hideDate: userConfig?.hideDate ?? false,
      hideDescription: userConfig?.hideDescription ?? false,
      hideDirector: userConfig?.hideDirector ?? false,
      hideDuration: userConfig?.hideDuration ?? false,
      hideOCount: userConfig?.hideOCount ?? false,
      hideOrganized: userConfig?.hideOrganized ?? false,
      hidePlayCount: userConfig?.hidePlayCount ?? false,
      hideParentStudio: userConfig?.hideParentStudio ?? false,
      hidePerformer: userConfig?.hidePerformer ?? false,
      hidePerformerHoverAge: userConfig?.hidePerformerHoverAge ?? false,
      hidePerformerHoverImage: userConfig?.hidePerformerHoverImage ?? false,
      hidePerformerHoverNationality:
        userConfig?.hidePerformerHoverNationality ?? false,
      hideResolution: userConfig?.hideResolution ?? false,
      hideZeroValueData: userConfig?.hideZeroValueData ?? false,
      parentStudioSeparator: userConfig?.parentStudioSeparator,
      performerAvatars: userConfig?.performerAvatars ?? false,
      performerAvatarsCustomTag: userConfig?.performerAvatarsCustomTag,
      performerAvatarsProfile: userConfig?.performerAvatarsProfile ?? false,
      performerGenderColors: userConfig?.performerGenderColors ?? false,
      resolutionIcon: userConfig?.resolutionIcon ?? false,
    };

    // Fetch additional data as needed
    const extendedProps: ISceneCardPropsExtended = {
      ...props,
      config,
      customAvatars: [],
    };

    // Performer data
    if (!!extendedProps.scene.performers) {
      const performersData = GQL.useFindPerformersQuery({
        variables: {
          filter: { per_page: -1 },
          performer_ids: extendedProps.scene.performers.map((pf) => +pf.id),
        },
      });

      if (!!performersData.data)
        extendedProps.scene = {
          ...extendedProps.scene,
          performers: performersData.data.findPerformers.performers,
        };
    }

    // Studio data
    if (!config.hideParentStudio && !!extendedProps.scene.studio) {
      const studioData = GQL.useFindStudioQuery({
        variables: { id: props.scene.studio?.id || "" },
      });

      if (!!studioData.data)
        extendedProps.scene = {
          ...extendedProps.scene,
          studio: {
            ...extendedProps.scene.studio,
            ...studioData.data.findStudio,
          },
        };
    }

    // Custom avatars
    if (config.performerAvatars && !!config.performerAvatarsCustomTag) {
      const avatarData = GQL.useFindImagesQuery({
        variables: {
          image_filter: {
            performers: {
              modifier: CriterionModifier.Includes,
              value: extendedProps.scene.performers.map((pf) => pf.id),
            },
            tags: {
              modifier: CriterionModifier.Includes,
              value: [config.performerAvatarsCustomTag],
            },
          },
        },
      });

      if (!!avatarData.data)
        extendedProps.customAvatars = avatarData.data.findImages.images;
    }

    return [
      <div className="valkyr-scene-card">
        <Original {...extendedProps} />
      </div>,
    ];
  }
  return [];
});

PluginApi.patch.instead("SceneCard.Details", function (props) {
  // Render without additional data while waiting.
  return [<SceneCardDetails {...(props as ISceneCardPropsExtended)} />];
});

// Remove overlays
PluginApi.patch.instead("SceneCard.Overlays", function () {
  return [];
});

// Remove popovers
PluginApi.patch.instead("SceneCard.Popovers", function (props, _, Original) {
  // Remove certain data from the original so that data that already exists
  // elsewhere isn't displayed.
  const amendedProps: ISceneCardProps = {
    ...props,
    scene: {
      ...props.scene,
      performers: [],
      o_counter: undefined,
      organized: false,
    },
  };

  // @ts-ignore - Fallback for movies if user is on 0.26.x or lower
  const groups = amendedProps.scene.groups ?? amendedProps.scene.movies;

  /** If no relevant data is available that would render the footer, render an
   * empty one in order to keep alignment consistent. See
   * https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/components/Scenes/SceneCard.tsx#L277
   * for reference. */
  if (
    !amendedProps.compact &&
    amendedProps.scene.tags.length === 0 &&
    groups.length === 0 &&
    amendedProps.scene.scene_markers.length === 0 &&
    amendedProps.scene.galleries.length === 0
  ) {
    return [
      <>
        <hr />
        <div className="card-popovers"></div>
      </>,
    ];
  }

  return [<Original {...amendedProps} />];
});
