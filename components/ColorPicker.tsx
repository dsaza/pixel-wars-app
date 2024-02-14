import { Signal } from "@preact/signals";
import { Color } from '../shared/types.ts';
import { COLORS } from '../shared/constants.ts';

export function ColorPicker ({
  selected
}: {
  selected: Signal<Color>
}) {
  return (
    <footer>
      <div class='flex gap-8'>
        <div className="flex fixed bottom-4 left-0 right-0 justify-center gap-x-1">
          {COLORS.map((color) => (
            <button
              class={`w-8 h-8 border-4 ${selected.value === color ? 'border-white' : 'border-black'}`}
              style={`background-color: ${color};`}
              onClick={() => { selected.value = color }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}