
export function H4({ children, ...props }) {
  return (<h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${props.className || ''}`}>
    {children}
  </h4>
  )
}
