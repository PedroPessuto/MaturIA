
export function Large({ children, ...props }) {
  return (
    <small className={`text-lg font-semibold ${props.className || ''}`}>
      {children}
    </small>
  )
}
