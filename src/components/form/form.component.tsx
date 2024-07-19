import { Pane, minorScale } from "evergreen-ui"
import { FormEventHandler } from "react"

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode[] | React.ReactNode;
}

const Form = ({ onSubmit, children, ...otherProps }: FormProps) => {
  return (
    <Pane 
      is="form"
      display="flex" 
      flex={ 1 }
      flexDirection="column"
      padding={ minorScale(5) }
      gap={ minorScale(5) }
      onSubmit={ onSubmit }
      { ...otherProps }
    >
      { children }
    </Pane>
  )
}

export default Form;
