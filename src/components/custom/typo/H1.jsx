
export function H1({ children, ...props }) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${props.className || ''}`}>
      {children}
    </h1>
  )
}
