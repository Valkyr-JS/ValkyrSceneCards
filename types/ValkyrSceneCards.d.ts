import type { ISceneCardProps, IScenePreviewProps } from "./stashPlugin";

/** Stash only creates config items when they are changed. By default they are
 * `undefined`. */
interface VSCConfigMap {
  /** Set the maximum number of lines that a scene description can fill before
   * being truncated. Default is 3. */
  descriptionMaxLines?: number;
  /** When enabled, the scene duration will be padded out to HH:MM:SS. For
   * example, 6:37 would appear as 00:06:37. */
  durationPadding?: boolean;
  /** When enabled, the scene date will not be displayed. */
  hideDate?: boolean;
  /** When enabled, the scene description will not be displayed. */
  hideDescription?: boolean;
  /** When enabled, the scene director will not be displayed. */
  hideDirector?: boolean;
  /** When enabled, the scene duration will not be displayed. */
  hideDuration?: boolean;
  /** When enabled, the file size will not be displayed. */
  hideFilesize?: boolean;
  /** When enabled, the frame rate will not be displayed. */
  hideFramerate?: boolean;
  /** When enabled, the scene galleries count will not be displayed. */
  hideGalleries?: boolean;
  /** When enabled, the scene groups (movies in Stash 0.26 and older) count will not be displayed. */
  hideGroups?: boolean;
  /** When enabled, the scene markers count will not be displayed. */
  hideMarkers?: boolean;
  /** When enabled, the scene O count and icon will not be displayed. */
  hideOCount?: boolean;
  /** When enabled, the organized icon will not be displayed for scenes marked
   * as organized. */
  hideOrganized?: boolean;
  /** When enabled, the parent studio will not be displayed. */
  hideParentStudio?: boolean;
  /** When enabled, the list of performers will not be displayed. */
  hidePerformer?: boolean;
  /** When enabled, the performer's age will not be displayed when hovering over
   * their name or avatar. */
  hidePerformerHoverAge?: boolean;
  /** When enabled, the performer's image will not be displayed when hovering
   * over their name or avatar. */
  hidePerformerHoverImage?: boolean;
  /** When enabled, the performer's nationality will not be displayed when
   * hovering over their name or avatar. */
  hidePerformerHoverNationality?: boolean;
  /** When enabled, the scene play count and icon will not be displayed. */
  hidePlayCount?: boolean;
  /** When enabled, the scene user rating will not be displayed. */
  hideRating?: boolean;
  /** When enabled, the scene resolution will not be displayed. */
  hideResolution?: boolean;
  /** When enabled, the scene tag count will not be displayed. */
  hideTags?: boolean;
  /** When enabled, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData?: boolean;
  /** When enabled, the parent studio appears before the studio. */
  parentStudioFirst?: boolean;
  /** Set the separator character that appears between the studio and parent
   * studio. Leave this blank to wrap the parent studio in brackets. */
  parentStudioSeparator?: string;
  /** When enabled, the performer list will be rendered as a set of avatars
   * rather than as a text list. By default these appear as the performer
   * initials against a background image indicating their gender. These can be
   * overriden with the "Set tag ID for custom performer images" and "Use
   * performer profile images as avatars" options. */
  performerAvatars?: boolean;
  /** When set, performer avatars will use images tagged with this tag ID. This
   * option overrides default and profile picture avatars. "Display the
   * performer list as avatars" must be set to true in order to use. */
  performerAvatarsCustomTag?: string;
  /** When enabled, performer avatars will use the performer's profile image.
   * The avatar will display the topmost square of the profile image. "Display
   * the performer list as avatars" must be set to true in order to use. */
  performerAvatarsProfile?: boolean;
  /** When enabled, performer names will be colored according to their gender.
   * These colors can be changed via CSS variables. See the readme in the link
   * for details. */
  performerGenderColors?: boolean;
  /** Enter a comma-separated list of the genders that should be included in the
   * performer list. An empty list will show all performers. Acceptable values
   * are; MALE, FEMALE, TRANSGENDER MALE, TRANSGENDER FEMALE, INTERSEX, and NON
   * BINARY. Case is insensitive. */
  performerGenderFilter?: string;
  /** If the number of scene performers exceeds this number, the remaining
   * performers will be replaced with overflow text. If empty, all performers
   * will be listed. */
  performerLimit?: number;
  /** When enabled, scene preview images and videos will show a blurred copy of
   * the thumbnail where there is letterboxing. This typically only happens for
   * portrait thumbnails. */
  previewBlurredBackground?: boolean;
  /** When enabled, the thumbnail image and preview video are contained to, and
   * centered within, the space available, as opposed to filling it as per the
   * default. This may cause letterboxing. */
  previewContained?: boolean;
  /** When enabled, the progress indicator for partially-watched scenes will be
   * disabled. */
  previewSceneProgressDisabled?: boolean;
  /** When enabled, the video scrubber will be disabled on scene cards. */
  previewScrubberDisabled?: boolean;
  /** When enabled, the video previews that play when hovering on a card will be
   * disabled. */
  previewVideoDisabled?: boolean;
  /** When enabled, the cursor will be hidden when hovering over the scene
   * preview video. */
  previewVideoHideCursor?: boolean;
  /** When enabled, the scene rating is displayed as a banner in the same way as
   * the default Stash experience. */
  ratingBanner?: boolean;
  /** When enabled, the scene resolution be displayed as an SD/HD/2K/4K/etc.
   * icon. SD and HD icons can be hovered over for the full resolution. */
  resolutionIcon?: boolean;
}

interface VSCConfigResult extends ConfigResult {
  plugins: PluginsConfig;
  ui: UIConfig;
}

/** Matches `VSCConfigMap` but with certain properties made required. */
interface VSCFinalConfigMap extends VSCConfigMap {
  descriptionMaxLines: number;
  durationPadding: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideDirector: boolean;
  hideDuration: boolean;
  hideFilesize: boolean;
  hideFramerate: boolean;
  hideGalleries: boolean;
  hideGroups: boolean;
  hideMarkers: boolean;
  hideOCount: boolean;
  hideOrganized: boolean;
  hideParentStudio: boolean;
  hidePerformer: boolean;
  hidePerformerHoverAge: boolean;
  hidePerformerHoverImage: boolean;
  hidePerformerHoverNationality: boolean;
  hidePlayCount: boolean;
  hideRating: boolean;
  hideResolution: boolean;
  hideTags: boolean;
  hideZeroValueData: boolean;
  parentStudioFirst: boolean;
  performerAvatars: boolean;
  performerAvatarsProfile: boolean;
  performerGenderColors: boolean;
  performerGenderFilter: string;
  previewBlurredBackground: boolean;
  previewContained: boolean;
  previewSceneProgressDisabled: boolean;
  previewScrubberDisabled: boolean;
  previewVideoDisabled: boolean;
  previewVideoHideCursor: boolean;
  ratingBanner: boolean;
  resolutionIcon: boolean;
}

interface PluginsConfig {
  ValkyrSceneCards?: VSCConfigMap;
}

interface ISceneCardPropsExtended extends ISceneCardProps {
  /** The user's plugin config. */
  config: VSCFinalConfigMap;
  /** Custom avatar images. */
  customAvatars: Image[];
  /** Stash configuration settings. Not to be confused with `config`, which is
   * exclusively this plugin's settings, though also defined in Stash. */
  stashSettings: ConfigResult;
}

interface IScenePreviewPropsExtended extends IScenePreviewProps {
  /** The user's plugin config. */
  config: VSCFinalConfigMap;
  /** Stash configuration settings. Not to be confused with `config`, which is
   * exclusively this plugin's settings, though also defined in Stash. */
  stashSettings: ConfigResult;
}
