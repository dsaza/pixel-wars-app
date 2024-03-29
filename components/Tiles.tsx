import { Signal } from "@preact/signals";
import { PIXEL_SIZE, WIDTH } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";
import { useEffect } from "preact/hooks";

export function Tiles ({
  grid,
  selectedColor
} : {
  grid: Signal<Color[]>
  selectedColor: Color
}) {
  const updateGrid = async (index: number, prevColor: Color) => {
    if (prevColor === selectedColor) return

    const gridValue = grid.value
    grid.value = gridValue.with(index, selectedColor)
    
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index, color: selectedColor })
    })

    if (!response.ok) {
      console.error('Failed to update grid')

      const gridValue = grid.value
      grid.value = gridValue.with(index, prevColor)

      return
    }

    const { versionstamp }: { versionstamp: string } = await response.json()
  }
  
  useEffect(() => {
    const eventSource = new EventSource('/api/listen')

    eventSource.onmessage = (event) => {
      const { index, color } = JSON.parse(event.data)
      const gridValue = grid.value

      grid.value = gridValue.with(index, color)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="grid" style={`
      width: ${WIDTH * PIXEL_SIZE}px;
      grid-template-columns: repeat(${WIDTH}, 1fr);
    `}>
      {
        grid.value.map((color, index) => (
          <div
            style={`
              width: ${PIXEL_SIZE}px;
              height: ${PIXEL_SIZE}px;
              background-color: ${color};
            `}
            onClick={() => {
              updateGrid(index, color)
            }}
          >
          </div>
        ))
      }
    </div>
  )
}