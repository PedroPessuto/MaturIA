
export function H1({ children, ...props }) {
  return (
    <h1 className={`scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl ${props.className || ''}`}>
      {children}
    </h1>
  )
}
