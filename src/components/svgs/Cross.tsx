import { type JSX } from 'solid-js'

export default function SvgCross(
  props: JSX.SvgSVGAttributes<HTMLOrSVGElement>,
) {
  return (
    <svg
      onClick={props.onClick}
      class={`${props.class} h-3.5 w-3.5 text-current text-gray-700`}
      data-testid="svg-cross"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"></path>
    </svg>
  )
}
