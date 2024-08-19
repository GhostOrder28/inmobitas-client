import { Pane, minorScale, PaneProps } from "evergreen-ui";
import { FormEventHandler } from "react";

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: React.ReactNode[] | React.ReactNode;
} & PaneProps

const Form = ({ onSubmit, children, ...otherProps }: FormProps) => {
  return (
    <Pane 
      is="form"
      display="flex" 
      flex={ 1 }
      flexDirection={ otherProps.flexDirection || "column" }
      overflow={"scroll"}
      onSubmit={ onSubmit }
      paddingY={ minorScale(5) }
      flexGrow={1}
      { ...otherProps }
    >
      { children }
    </Pane>
  )
}

export default Form;
