/** Stash only creates config items when they are changed. By default they are
 * `undefined`. */
interface VSCConfigMap {
  /** When enabled, the parent studio will not be displayed. */
  hideStudioParent?: boolean;
}

interface VSCConfigResult extends ConfigResult {
  plugins: PluginsConfig;
  ui: UIConfig;
}

/** Matches `VSCConfigMap` but properties are required. */
interface VSCFinalConfigMap extends VSCConfigMap {
  hideStudioParent: boolean;
}

interface PluginsConfig {
  ValkyrSceneCards?: VSCConfigMap;
}
