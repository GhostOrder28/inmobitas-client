import Signin from "../../components/user-auth/signin/signin.component";
import Signup from "../../components/user-auth/signup/signup.component";
import { Pane } from "evergreen-ui"
import { useLocation } from "react-router-dom";
import LogoIcon from "../../icons/logo-icon/logo-icon.component";
import ContentSpinner from "../../components/content-spinner/content-spinner.component";

const viewport = window.innerHeight;

const AuthPage = () => {
  const location = useLocation();

  return (
    <>
      <ContentSpinner />
      <Pane
        height={viewport*0.85}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingX={60}
      >
        <Pane width={"100%"}>
          <Pane display={"flex"} justifyContent={'center'} marginBottom={50}>
            <LogoIcon />
          </Pane>
          { location.pathname === "/signin" ?
            <Signin /> :
            <Signup />
          }
        </Pane>
      </Pane>
    </>
  )
}

export default AuthPage;
