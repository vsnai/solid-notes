import {
  Accessor,
  For,
  Setter,
  Show,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { Motion, Presence } from 'solid-motionone'

import SvgChevronDown from './svgs/ChevronDown'
import SvgCross from './svgs/Cross'
import SvgMagnifyingGlass from './svgs/MagnifyingGlass'

type Item = {
  id: string
  value: string
}

type Props = {
  placeholder: string
  data: Item[]
  input: Accessor<string>
  setInput: Setter<string>
}

export default function Combobox(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [hoveredIndex, setHoveredIndex] = createSignal(0)
  const [selected, setSelected] = createSignal<Item>()

  let ref!: HTMLElement
  let itemContainerRef: HTMLDivElement | undefined

  function handleOutsideClick(event: MouseEvent) {
    if (ref && !ref.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  onMount(() => {
    window.addEventListener('mousedown', handleOutsideClick)
  })

  onCleanup(() => {
    window.removeEventListener('mousedown', handleOutsideClick)
  })

  function filteredItems() {
    const s = props.input().toLowerCase()

    return props.data.filter(({ id, value }) => {
      return id.toLowerCase().includes(s) || value.toLowerCase().includes(s)
    })
  }

  function handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement

    props.setInput(value)
    setOpen(true)
    setHoveredIndex(0)

    scrollToItem()
  }

  function handleReset() {
    props.setInput('')
    setHoveredIndex(0)
    setSelected(undefined)
  }

  function handleKeyDown(event: KeyboardEvent) {
    const { key } = event

    if (key === 'Escape') {
      props.setInput(selected() ? selected()!.value : '')
      setHoveredIndex(0)
      setOpen(false)

      return
    }

    if (key === 'ArrowUp') {
      event.preventDefault()

      if (hoveredIndex() <= 0) {
        setHoveredIndex(filteredItems().length - 1)
      } else {
        setHoveredIndex((prev) => prev - 1)
      }

      scrollToItem()

      return
    }

    if (key === 'ArrowDown') {
      if (hoveredIndex() >= filteredItems().length - 1) {
        setHoveredIndex(0)
      } else {
        setHoveredIndex((prev) => prev + 1)
      }

      scrollToItem()

      return
    }

    if (key === 'Enter') {
      event.preventDefault()

      if (filteredItems().length > 0) {
        const country = filteredItems()[hoveredIndex()]

        props.setInput(country.value)
        setOpen(false)
        setHoveredIndex(0)
        setSelected(country)
      }

      return
    }

    if (key === 'Tab') {
      setOpen(false)
      setHoveredIndex(0)
    }

    // console.log(key)
  }

  function handleSelect(event: Event, item: Item) {
    event.preventDefault()

    props.setInput(item.value)
    setOpen(false)
    setHoveredIndex(0)
    setSelected(item)
  }

  function scrollToItem() {
    const elements = itemContainerRef?.querySelectorAll('button')

    if (elements && elements[hoveredIndex()]) {
      elements[hoveredIndex()].scrollIntoView({ block: 'center' })
    }
  }

  return (
    <main
      ref={ref}
      class="relative flex w-64 items-center"
      data-testid="combobox"
    >
      <SvgMagnifyingGlass class="absolute left-4" />

      <input
        class="h-10 w-64 rounded-md border-gray-300 px-10 text-sm transition duration-150 placeholder:text-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-300"
        placeholder={props.placeholder}
        value={props.input()}
        onInput={handleInput}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />

      <Show
        when={selected() !== undefined}
        fallback={
          <SvgChevronDown
            class={`${open() ? 'rotate-180' : ''} pointer-events-none absolute right-4 transition-transform`}
          />
        }
      >
        <SvgCross
          class="absolute right-4 z-20 cursor-pointer"
          onClick={handleReset}
        />
      </Show>

      <Presence exitBeforeEnter>
        <Show when={open()}>
          <Motion.div
            ref={itemContainerRef}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.15, easing: 'ease-in-out' }}
            tabindex="-1"
            class="absolute left-0 top-12 max-h-64 w-64 space-y-2 overflow-auto rounded-md border bg-white p-2"
          >
            <For each={filteredItems()}>
              {(item, index) => (
                <button
                  tabindex="-1"
                  class={`${hoveredIndex() === index() ? 'bg-gray-200' : ''} flex w-full items-center rounded p-2 hover:bg-gray-300`}
                  onClick={(event) => handleSelect(event, item)}
                >
                  <span class="mr-2 w-8 shrink-0 rounded bg-gray-50 px-2 py-0.5 text-xs font-light text-gray-500">
                    {item.id}
                  </span>

                  <span class="truncate">{item.value}</span>
                </button>
              )}
            </For>
          </Motion.div>
        </Show>
      </Presence>
    </main>
  )
}
