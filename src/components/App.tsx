import { Show, createSignal } from 'solid-js'
import { Motion, Presence } from 'solid-motionone'

export default function App() {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <main class="space-y-4 p-10">
      <button
        class="rounded bg-gray-300 px-4 py-3"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Toggle
      </button>

      <Presence exitBeforeEnter>
        <Show when={isOpen()}>
          <Motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.15, easing: 'ease-in-out' }}
          >
            Hello
          </Motion.div>
        </Show>
      </Presence>
    </main>
  )
}
