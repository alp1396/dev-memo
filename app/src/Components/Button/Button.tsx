import "./Button.scss"

interface ButtonProps {
  children: any
  onClick: () => void
}

function Button(props: ButtonProps) {
  return <div className="button" onClick={props.onClick}>
    {props.children}
  </div>
}

export default Button
