import { type JSX } from 'solid-js'

export default function SvgChevronDown(
  props: JSX.SvgSVGAttributes<HTMLOrSVGElement>,
) {
  return (
    <svg
      class={`${props.class} h-3.5 w-3.5 text-current text-gray-700`}
      data-testid="svg-chevron-down"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"></path>
    </svg>
  )
}
