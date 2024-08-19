import { Pane, Button, ButtonProps, minorScale } from "evergreen-ui";
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { SUBMIT_BTN_SIZE } from "../../constants/sizes.consts";

type FormSubmitProps = {
  text: string;
} & ButtonProps

const FormSubmit = ({ text, onSubmit, ...otherProps }: FormSubmitProps) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT_VALUE}px)`);

  return (
    <Pane
      display="flex"
      justifyContent="center"
    >
      <Button
        id="submit-btn"
        width={ isDesktop ? 400 : "100%" }
        height={ SUBMIT_BTN_SIZE }
        type="submit"
        appearance="primary"
        marginBottom={ isDesktop ? minorScale(8) : 0 }
        { ...otherProps }
      >
        { text }
      </Button>
    </Pane>
  )
}

export default FormSubmit;
