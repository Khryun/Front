import { Button } from "antd";


interface ButtonsStepProps {
  onClick: () => void,
  children: string,
  block?: boolean,
}


const ButtonStep = (props: ButtonsStepProps) => {
  return (
    <Button
      block={props.block ?? true}
      className="button_next_step"
      type="primary"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}


export default ButtonStep;