import { WIDTH, HEIGHT, COLORS_NAMES, KEYS, CHANNELS } from "../shared/constants.ts";
import { Grid, Color } from "./types.ts";

const db = await Deno.openKv()

export async function updateGrid (
  index: number,
  color: Color
): Promise<string> {
  const { versionstamp } = await db.set([KEYS.tiles, index], color)

  const bc = new BroadcastChannel(CHANNELS.pixelUpdate);
  bc.postMessage({ index, color, versionstamp })
  setTimeout(() => { bc.close() }, 5);

  return versionstamp
}

export async function getGrid (): Promise<Grid> {
  await new Promise(resolve => setTimeout(resolve, 500))

  const tiles = new Array(WIDTH * HEIGHT).fill(COLORS_NAMES.red)
  const versionstamps = new Array(WIDTH * HEIGHT).fill('')

  const pixels = db.list<string>({ prefix: [KEYS.tiles] })

  for await (const pixel of pixels) {
    const index = Number(pixel.key[1])

    tiles[index] = pixel.value
    versionstamps[index] = pixel.versionstamp
  }

  return {
    tiles,
    versionstamps
  }
}
