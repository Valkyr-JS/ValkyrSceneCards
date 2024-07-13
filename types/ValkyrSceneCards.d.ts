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
  /** When enabled, the scene O count and icon will not be displayed. */
  hideOCount?: boolean;
  /** When enabled, the organized icon will not be displayed for scenes marked
   * as organized. */
  hideOrganized?: boolean;
  /** When enabled, the parent studio will not be displayed. */
  hideParentStudio?: boolean;
  /** When enabled, the scene play count and icon will not be displayed. */
  hidePlayCount?: boolean;
  /** When enabled, the scene resolution will not be displayed. */
  hideResolution?: boolean;
  /** When enabled, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData?: boolean;
  /** Set the separator character that appears between the studio and parent
   * studio. Leave this blank to wrap the parent studio in brackets. */
  parentStudioSeparator?: string;
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
  hideOCount: boolean;
  hideOrganized: boolean;
  hideParentStudio: boolean;
  hidePlayCount: boolean;
  hideResolution: boolean;
  hideZeroValueData: boolean;
  performerGenderColors: boolean;
  resolutionIcon: boolean;
}

interface PluginsConfig {
  ValkyrSceneCards?: VSCConfigMap;
}

interface ISceneCardPropsExtended extends ISceneCardProps {
  /** The user's plugin config. */
  config: VSCFinalConfigMap;
}
