import { Pane, Button, ButtonProps, minorScale } from "evergreen-ui";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";
import { FORM } from "../../constants/sizes.consts";

type FormSubmitProps = {
  text: string;
} & ButtonProps

const FormSubmit = ({ text, onSubmit, ...otherProps }: FormSubmitProps) => {
  const { windowInnerWidth } = useWindowDimensions();

  return (
    <Pane
      display="flex"
      justifyContent="center"
      width="100%"
      // height={ FORM.SUBMIT_HEIGHT }
    >
      <Button
        width={windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? 400 : "100%"}
        height={ FORM.SUBMIT_HEIGHT }
        type="submit"
        appearance="primary"
        id="submit-btn"
        { ...otherProps }
      >
        { text }
      </Button>
    </Pane>
  )
}

export default FormSubmit;
