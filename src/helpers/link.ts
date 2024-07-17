/** Create a url link to a scene page. */
export const makeSceneUrl = ({ cont, index, scene, queue }: ImakeSceneUrl) => {
  const link = queue
    ? queue.makeLink(scene.id, {
        sceneIndex: index,
        continue: cont,
      })
    : `/scenes/${scene.id}`;

  return link as string;
};

interface ImakeSceneUrl {
  cont: ConfigInterfaceResult["continuePlaylistDefault"];
  queue: any;
  scene: Scene;
  index?: number;
}

/** Create a url link to a studio page. */
export const makeStudioUrl = ({ studioID }: ImakeStudioUrl) =>
  `/studios/${studioID}`;

interface ImakeStudioUrl {
  studioID: Studio["id"];
}
