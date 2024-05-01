import { type JSX } from 'solid-js'

export default function SvgCalendar(
  props: JSX.SvgSVGAttributes<HTMLOrSVGElement>,
) {
  return (
    <svg
      class={`${props.class} h-3.5 w-3.5 text-current text-gray-700`}
      data-testid="svg-calendar"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M5.5 0.5V1.25V2H10.5V1.25V0.5H12V1.25V2H14H15.5V3.5V13.5C15.5 14.8807 14.3807 16 13 16H3C1.61929 16 0.5 14.8807 0.5 13.5V3.5V2H2H4V1.25V0.5H5.5ZM2 3.5H14V6H2V3.5ZM2 7.5V13.5C2 14.0523 2.44772 14.5 3 14.5H13C13.5523 14.5 14 14.0523 14 13.5V7.5H2Z"></path>
    </svg>
  )
}
