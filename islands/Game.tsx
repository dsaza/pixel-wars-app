import { useSignal } from "@preact/signals";
import { ColorPicker } from "../components/ColorPicker.tsx";
import { COLORS } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";
import { Tiles } from "../components/Tiles.tsx";

export function Game (
  { initialTiles }: { initialTiles: Color[] }
) {
  const selected = useSignal<Color>(COLORS[0])
  const grid = useSignal<Color[]>(initialTiles)
  
  return (
    <>
      <Tiles grid={grid} selectedColor={selected.value} />
      <ColorPicker selected={selected} />
    </>
  )
}