
export function Small({ children, ...props }) {
  return (
    <small className={`text-sm font-medium leading-none ${props.className || ''}`}>
      {children}
    </small>
  );
}
