import { For, Show, createSignal } from 'solid-js'
import { Motion, Presence } from 'solid-motionone'

import { countries } from '../database.json'

import Combobox from './Combobox'

export default function App() {
  const [open, setOpen] = createSignal(true)

  const [filter, setFilter] = createSignal('')

  return (
    <main class="space-y-4 p-10">
      <div class="flex items-center space-x-10">
        <button
          data-testid="toggle-button"
          class="rounded bg-gray-300 px-4 py-3"
          onClick={() => setOpen((open) => !open)}
        >
          Filter
        </button>

        <div>{filter()}</div>
      </div>

      <Presence exitBeforeEnter>
        <Show when={open()}>
          <Motion.div
            data-testid="foo"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.15, easing: 'ease-in-out' }}
          >
            <Combobox
              placeholder="Filter by country"
              data={countries}
              input={filter}
              setInput={setFilter}
            />
          </Motion.div>
        </Show>
      </Presence>
    </main>
  )
}
