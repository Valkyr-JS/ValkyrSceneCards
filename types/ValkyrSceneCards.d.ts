import type { ISceneCardProps } from "./stashPlugin";

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
  /** When enabled, the scene resolution will not be displayed. */
  hideResolution?: boolean;
  /** When enabled, the scene tag count will not be displayed. */
  hideTags?: boolean;
  /** When enabled, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData?: boolean;
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
  hideResolution: boolean;
  hideTags: boolean;
  hideZeroValueData: boolean;
  performerAvatars: boolean;
  performerAvatarsProfile: boolean;
  performerGenderColors: boolean;
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
}
