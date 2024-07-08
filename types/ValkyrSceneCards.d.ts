/** Stash only creates config items when they are changed. By default they are
 * `undefined`. */
interface VSCConfigMap {
  /** When enabled, the description will be removed from scene cards. */
  descriptionHidden?: boolean;
  /** When enabled, the text list of performers is replaced with circular
   * avatar images of each performer. These can be customised below. */
  performerAvatarsActive?: boolean;
  /** When enabled, the top section of the performer's profile image is used for
   * their avatar. If disabled, or if no profile image is available, the
   * performer's initials are used instead. */
  performerAvatarsProfile?: boolean;
  /** When enabled, all performer avatars will be displayed in a larger size
   * than the default. */
  performerAvatarsSizeLarge?: boolean;
  /** Set the ID of the tag given to custom avatar images. Custom avatars will
   * take precedence over other types of avatars. */
  performerAvatarsTagID?: string;
}

interface VSCConfigResult extends ConfigResult {
  plugins: PluginsConfig;
  ui: UIConfig;
}

/** Matches `VSCConfigMap` but with required properties. */
interface VSCFinalConfigMap extends VSCConfigMap {
  descriptionHidden: boolean;
  performerAvatarsActive: boolean;
  performerAvatarsProfile: boolean;
  performerAvatarsSizeLarge: boolean;
  performerAvatarsTagID: string;
}

interface PluginsConfig {
  ValkyrSceneCards?: VSCConfigMap;
}
