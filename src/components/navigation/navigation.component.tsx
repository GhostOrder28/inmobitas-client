import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { signOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { SideSheet, Button, MenuIcon, Position, Menu } from "evergreen-ui";
import LogoIcon from "../../icons/logo-icon/logo-icon.component";
import { useTranslation } from "react-i18next";
import SignoutButton from '../signout-btn/signout-btn.component';
import "./navigation.styles.css";
import MainMenuButton from "../main-menu-button/main-menu-button.component";

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
              {currentUser && <SignoutButton onClick={signOut}/>}
            </nav>
          </Menu>
        </SideSheet>
        <Link to={"/"} className="logo-icon">
          <LogoIcon />
        </Link>
        <MainMenuButton setIsShown={setIsShown} />
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
