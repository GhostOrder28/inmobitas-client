import { Pane, Button, minorScale } from "evergreen-ui";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.consts";

type FormSubmitProps = {
  text: string;
}

const FormSubmit = ({ text }: FormSubmitProps) => {
  const { windowInnerWidth } = useWindowDimensions();

  return (
    <Pane
      display="flex"
      justifyContent="center"
      width="100%"
      marginTop={minorScale(5)}
    >
      <Button
        width={windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? 400 : "100%"}
        height={40}
        type="submit"
        appearance="primary"
        id="submit-btn"
      >
        { text }
      </Button>
    </Pane>
  )
}

export default FormSubmit;
