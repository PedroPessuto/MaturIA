
export function P({ children, ...props }) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${props.className || ''}`}>
      {children}
    </p>
  )
}
