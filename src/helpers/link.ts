/**
 * Create a url link to a scene page.
 *
 * TODO - Incorporate scene queue string
 * */
export const makeSceneUrl = ({ scene }: ImakeSceneUrl) => `/scenes/${scene.id}`;

interface ImakeSceneUrl {
  scene: Scene;
}

/** Create a url link to a studio page. */
export const makeStudioUrl = ({ studioID }: ImakeStudioUrl) =>
  `/studios/${studioID}`;

interface ImakeStudioUrl {
  studioID: Studio["id"];
}
