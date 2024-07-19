import { Button, LogOutIcon } from "evergreen-ui";
import { useTranslation } from "react-i18next"

type SignoutButtonProps = {
  onClick: () => void;
}

const SignoutButton = ({ onClick }: SignoutButtonProps) => {
  const { t } = useTranslation(["ui"]);
  return (
    <Button
      intent="danger"
      display={"flex"}
      justifyContent={"start"}
      paddingLeft={"1rem"}
      marginTop={".65rem"}
      marginLeft={"1.2rem"}
      marginRight={"1.2rem"}
      size="large"
      onClick={onClick}
    >
      <LogOutIcon marginRight={10} />
      { t("signout") } 
    </Button>
  )
}

export default SignoutButton;
