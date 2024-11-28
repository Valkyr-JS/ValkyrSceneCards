import { default as cx } from "classnames";
import type {
  ISceneCardPropsExtended,
  VSCConfigMap,
  VSCFinalConfigMap,
} from "@pluginTypes/ValkyrSceneCards";
import { SceneCardDetails, SceneCardImage } from "@components/SceneCard";
import "./styles.scss";
import { stringToTagBannerData } from "@helpers";
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
      hideFilesize: userConfig?.hideFilesize ?? false,
      hideFramerate: userConfig?.hideFramerate ?? false,
      hideGalleries: userConfig?.hideGalleries ?? false,
      hideGroups: userConfig?.hideGroups ?? false,
      hideMarkers: userConfig?.hideMarkers ?? false,
      hideOCount: userConfig?.hideOCount ?? false,
      hideOrganized: userConfig?.hideOrganized ?? false,
      hidePlayCount: userConfig?.hidePlayCount ?? false,
      hideParentStudio: userConfig?.hideParentStudio ?? false,
      hidePerformer: userConfig?.hidePerformer ?? false,
      hidePerformerHoverAge: userConfig?.hidePerformerHoverAge ?? false,
      hidePerformerHoverImage: userConfig?.hidePerformerHoverImage ?? false,
      hidePerformerHoverNationality:
        userConfig?.hidePerformerHoverNationality ?? false,
      hideRating: userConfig?.hideRating ?? false,
      hideResolution: userConfig?.hideResolution ?? false,
      hideTags: userConfig?.hideTags ?? false,
      hideZeroValueData: userConfig?.hideZeroValueData ?? false,
      parentStudioSeparator: userConfig?.parentStudioSeparator,
      performerAvatars: userConfig?.performerAvatars ?? false,
      performerAvatarsCustomTag: userConfig?.performerAvatarsCustomTag,
      performerAvatarsProfile: userConfig?.performerAvatarsProfile ?? false,
      performerGenderColors: userConfig?.performerGenderColors ?? false,
      performerGenderFilter: userConfig?.performerGenderFilter ?? "",
      performerLimit: userConfig?.performerLimit,
      previewBlurredBackground: userConfig?.previewBlurredBackground ?? false,
      previewSceneProgressDisabled:
        userConfig?.previewSceneProgressDisabled ?? false,
      previewScrubberDisabled: userConfig?.previewScrubberDisabled ?? false,
      previewVideoDisabled: userConfig?.previewVideoDisabled ?? false,
      previewVideoHideCursor: userConfig?.previewVideoHideCursor ?? false,
      resolutionIcon: userConfig?.resolutionIcon ?? false,
      tagBanners: stringToTagBannerData(userConfig?.tagBanners ?? ""),
    };

    const wrapperClasses = cx("valkyr-scene-card", {
      ["hide-progress-bar"]: config.previewSceneProgressDisabled,
    });

    // Fetch additional data as needed
    const extendedProps: ISceneCardPropsExtended = {
      ...props,
      config,
      customAvatars: [],
      stashSettings: qConfig.data.configuration,
    };

    // Performer data - ensure there is at least one performer, or all performers will be returned for an empty array
    if (!!extendedProps.scene.performers.length) {
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
    if (
      config.performerAvatars &&
      !!config.performerAvatarsCustomTag &&
      !!extendedProps.scene.performers.length
    ) {
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
      <div className={wrapperClasses}>
        <Original {...extendedProps} />
      </div>,
    ];
  }
  return [];
});

PluginApi.patch.instead("SceneCard.Image", function (props) {
  return [<SceneCardImage {...(props as ISceneCardPropsExtended)} />];
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
  const extendedProps = props as ISceneCardPropsExtended;

  // @ts-ignore - Fallback for movies if user is on 0.26.x or lower
  const groups = extendedProps.scene.groups ?? extendedProps.scene.movies;

  const { hideGalleries, hideGroups, hideMarkers, hideTags } =
    extendedProps.config;

  // If the user has turned off all data that would sit in the footer, don't
  // render it
  if (hideGalleries && hideGroups && hideMarkers && hideTags) return [];

  // Remove certain data from the original so that data that already exists
  // elsewhere isn't displayed.
  const amendedProps = {
    ...extendedProps,
    scene: {
      ...props.scene,
      galleries: hideGalleries ? [] : extendedProps.scene.galleries,
      groups: hideGroups ? [] : groups,
      performers: [],
      o_counter: undefined,
      organized: false,
      scene_markers: hideMarkers ? [] : extendedProps.scene.scene_markers,
      tags: hideTags ? [] : extendedProps.scene.tags,
    },
  };

  /** If no relevant data is available that would render the footer, render an
   * empty one in order to keep alignment consistent. See
   * https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/components/Scenes/SceneCard.tsx#L277
   * for reference. */
  if (
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
