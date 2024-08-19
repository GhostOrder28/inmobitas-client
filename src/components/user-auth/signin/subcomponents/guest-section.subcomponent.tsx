import { Card, Button, Text, minorScale } from "evergreen-ui"
import useWindowDimensions from "../../../../hooks/use-window-dimensions"
import { onSignInAsGuest } from "../signin.api";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectServerError } from "../../../../redux/user/user.selectors";
import FieldErrorMessage from "../../../field-error-message/field-error-message.component";
import { TABLET_BREAKPOINT_VALUE } from "../../../../constants/breakpoints.consts";

const GuestSection = () => {
  const { windowInnerWidth } = useWindowDimensions();
  const { t } = useTranslation(["ui"])

  const rateLimitErrMsg = useSelector(selectServerError("limitReachedError"));

  return (
    <Card
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      paddingY={ windowInnerWidth > TABLET_BREAKPOINT_VALUE ? null : minorScale(6) }
      elevation={1}
      className={"guest-button"}
      flex={1}
    >
      <Button 
        type="button"
        onClick={onSignInAsGuest}
        width={"70%"}
        marginX={minorScale(15)}
        appearance={"primary"}
        intent={"success"}
        size={"medium"}
      >
        { t("signinAsGuest") }
      </Button>
      <Text 
        width={"80%"}
        marginX={minorScale(15)}
        marginTop={minorScale(3)}
        textAlign={"center"}
        size={"300"}
        color={"#696f8c"}
      >
        { t("signinAsGuestMessage") }
      </Text>
      <FieldErrorMessage message={rateLimitErrMsg} />
    </Card>
  )
}

export default GuestSection;
