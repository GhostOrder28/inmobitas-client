import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { signOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { SideSheet, Button, MenuIcon, Position, Menu } from "evergreen-ui";
import LogoIcon from "../../icons/logo-icon/logo-icon.component";
import { useTranslation } from "react-i18next";
import "./navigation.styles.css";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(['ui', 'listing']);

  const signOut = () => {
    dispatch(signOutStart());
    navigate("/signin");
    setIsShown(false);
  };

  return (
    <>
      <div className="navigation relative flex justify-between items-center ph3 pv3">
        <SideSheet
          width={260}
          position={Position.RIGHT}
          isShown={isShown}
          onCloseComplete={() => setIsShown(false)}
        >
          <Menu>
            <nav className="flex flex-column">
              <Link to={"/listings"} onClick={() => setIsShown(false)}>
                { t('listings') }
              </Link>
              <Link to={"/owners"} onClick={() => setIsShown(false)}>
                { t('clients') }
              </Link>
              <Link to={"/newlisting"} onClick={() => setIsShown(false)}>
                { t('addNewListing', { ns: 'listing' }) } 
              </Link>
              {currentUser && (
                <Button
                  intent="danger"
                  display={"flex"}
                  justifyContent={"start"}
                  paddingLeft={"1rem"}
                  marginTop={".65rem"}
                  marginLeft={"1.2rem"}
                  marginRight={"1.2rem"}
                  size="large"
                  onClick={signOut}
                >
                  { t('signout') } 
                </Button>
              )}
            </nav>
          </Menu>
        </SideSheet>
        <Link to={"/"} className="logo-icon">
          <LogoIcon />
        </Link>
        <Button
          width={40}
          height={40}
          padding={0}
          onClick={() => setIsShown(true)}
        >
          <MenuIcon size={20} />
        </Button>
        {/* TODO: currently there is a fading blue shade when user click or touch the button */}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
