import type { ISceneCardProps } from "./stashPlugin";

/** Stash only creates config items when they are changed. By default they are
 * `undefined`. */
interface VSCConfigMap {
  /** When enabled, the scene O count and icon will not be displayed. */
  hideOCount?: boolean;
  /** When enabled, the organized icon will not be displayed for scenes marked
   * as organized. */
  hideOrganized?: boolean;
  /** When enabled, the parent studio will not be displayed. */
  hideParentStudio?: boolean;
  /** When enabled, the scene play count and icon will not be displayed. */
  hidePlayCount?: boolean;
  /** When enabled, numerical data that has a value of 0 will not be displayed,
   * irrespective of other settings. */
  hideZeroValueData?: boolean;
  /** Set the separator character that appears between the studio and parent
   * studio. Leave this blank to wrap the parent studio in brackets. */
  parentStudioSeparator?: string;
}

interface VSCConfigResult extends ConfigResult {
  plugins: PluginsConfig;
  ui: UIConfig;
}

/** Matches `VSCConfigMap` but with certain properties made required. */
interface VSCFinalConfigMap extends VSCConfigMap {
  hideOCount: boolean;
  hideOrganized: boolean;
  hideParentStudio: boolean;
  hidePlayCount: boolean;
  hideZeroValueData: boolean;
}

interface PluginsConfig {
  ValkyrSceneCards?: VSCConfigMap;
}

interface ISceneCardPropsExtended extends ISceneCardProps {
  /** The user's plugin config. */
  config: VSCFinalConfigMap;
}