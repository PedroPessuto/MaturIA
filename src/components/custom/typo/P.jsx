
export function P({ children, ...props }) {
  return (
    <p className={`leading-7 ${props.className || ''}`}>
      {children}
    </p>
  )
}
