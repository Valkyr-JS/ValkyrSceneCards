import { ITagBanner } from "@pluginTypes/ValkyrSceneCards";

/** Get the filename of a scene */
export const getFilename = ({ scene }: IgetFilename): string | undefined => {
  const file = scene.files.length ? scene.files[0] : undefined;
  if (!file) return undefined;

  const pathArr = file.path.split("/");
  return pathArr[pathArr.length - 1];
};

interface IgetFilename {
  /** The scene data. */
  scene: Scene;
}

export const stringToTagBannerData = (str: string): ITagBanner[] => {
  const parsed = JSON.parse(str);
  if (!Array.isArray(parsed)) return [];

  const arr: ITagBanner[] = parsed.filter((p) => {
    return !!p.tagID && !!p.classname;
  });

  return arr;
};
