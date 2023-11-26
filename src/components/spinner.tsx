interface SpinnerProps {
  color: string
  size: string
}

export default function Spinner(props: SpinnerProps) {
  const { color, size } = props

  return (
    <div
      className={`animate-spin inline-block w-${size} h-${size} border-[3px] border-current border-t-transparent rounded-full ${color}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

Spinner.defaultProps = {
  color: 'text-sky-700',
  size: '5'
}
