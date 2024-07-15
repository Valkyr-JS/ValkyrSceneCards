import { WebVTT } from "videojs-vtt.js";
const { React } = window.PluginApi;

export interface ISceneSpriteInfo {
  url: string;
  start: number;
  end: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

function getSpriteInfo(vttPath: string, response: string) {
  const sprites: ISceneSpriteInfo[] = [];

  const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
  parser.oncue = (cue: VTTCue) => {
    const match = cue.text.match(/^([^#]*)#xywh=(\d+),(\d+),(\d+),(\d+)$/i);
    if (!match) return;

    sprites.push({
      url: new URL(match[1], vttPath).href,
      start: cue.startTime,
      end: cue.endTime,
      x: Number(match[2]),
      y: Number(match[3]),
      w: Number(match[4]),
      h: Number(match[5]),
    });
  };
  parser.parse(response);
  parser.flush();

  return sprites;
}

export function useSpriteInfo(vttPath: string | undefined) {
  const [spriteInfo, setSpriteInfo] = React.useState<
    ISceneSpriteInfo[] | undefined
  >();

  React.useEffect(() => {
    if (!vttPath) {
      setSpriteInfo(undefined);
      return;
    }

    fetch(vttPath).then((response) => {
      if (!response.ok) {
        setSpriteInfo(undefined);
        return;
      }

      response.text().then((text) => {
        setSpriteInfo(getSpriteInfo(vttPath, text));
      });
    });
  }, [vttPath]);

  return spriteInfo;
}
