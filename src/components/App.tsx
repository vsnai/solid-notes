import { For, Show, createResource, createSignal, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Motion, Presence } from 'solid-motionone'

import { countries } from '../database.json'

import Combobox from './Combobox'

type Note = {
  id: string
  type: string
  createdBy: string
  createdAt: string
  note: string
}

type Response = {
  limit: number
  nextRecordKey: string
  results: Note[]
}

export default function App() {
  const [open, setOpen] = createSignal(true)
  const [filter, setFilter] = createSignal('')

  const [nextRecordKey, setNextRecordKey] = createSignal('')
  const [notes, setNotes] = createStore<any[]>([])

  let observer: IntersectionObserver | undefined

  onCleanup(() => observer?.disconnect())

  async function fetcher(offset: string): Promise<Response> {
    const url =
      offset === ''
        ? `http://localhost:3005/notes?limit=40`
        : `http://localhost:3005/notes?limit=40&nextRecordKey=${offset}`

    const [response] = await Promise.all([
      await fetch(url),
      new Promise((r) => setTimeout(r, 500)),
    ])

    const json = (await response.json()) as Response

    setNotes([...notes, ...json.results])

    return json
  }

  const [data] = createResource(nextRecordKey, fetcher)

  return (
    <main class="flex h-full flex-col space-y-4 overflow-auto p-10">
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

      <Show when={data()} fallback={<div>Loading ...</div>}>
        <div class="flex flex-col overflow-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th>ID</th>
                <th>Created At</th>
                <th>Activity Code</th>
                <th>Note</th>
                <th>Author</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <For each={notes}>
                {({ createdAt, type, note, createdBy }, index) => {
                  return (
                    <tr>
                      <td>{index()}</td>
                      <td>{createdAt}</td>
                      <td>{type}</td>
                      <td>{note}</td>
                      <td>{createdBy}</td>
                    </tr>
                  )
                }}
              </For>
            </tbody>
          </table>

          <div
            ref={(el) => {
              observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && data()?.nextRecordKey) {
                  setNextRecordKey(data()!.nextRecordKey)
                }
              })

              observer.observe(el)
            }}
          >
            Loading ...
          </div>
        </div>
      </Show>
    </main>
  )
}
