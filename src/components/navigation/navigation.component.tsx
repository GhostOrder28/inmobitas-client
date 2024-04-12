import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import http from '../../utils/axios-instance';
import { userSignOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  Pane,
  SideSheet, 
  Position, 
  Menu,
  OfficeIcon,
  ThListIcon,
  PersonIcon,
  PropertiesIcon,
  minorScale
} from "evergreen-ui";
import LogoIcon from "../../icons/logo-icon/logo-icon.component";
import SignoutButton from '../signout-btn/signout-btn.component';
import MainMenuButton from "../main-menu-button/main-menu-button.component";
import useWindowDimensions from '../../hooks/use-window-dimensions';
import { DESKTOP_BREAKPOINT_VALUE } from "../../constants/breakpoints.constants";

import "./navigation.styles.css";

const Navigation = () => {
  const [isShown, setIsShown] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(['ui', 'listing', 'agenda']);
  const { windowInnerWidth } = useWindowDimensions();

  const signOut = () => {
    dispatch(userSignOutStart(http));
    setIsShown(false);
  };

  return (
    <>
      <Pane
        backgroundColor={'#F9FAFC'}
      >
        <Pane
          position={'relative'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          padding={minorScale(4)}
          width={windowInnerWidth && windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? DESKTOP_BREAKPOINT_VALUE : '100%'} 
          marginX={'auto'}
        >
          <SideSheet
            width={260}
            position={Position.RIGHT}
            isShown={isShown}
            onCloseComplete={() => setIsShown(false)}
          >
            <Menu>
              <nav className="flex flex-column">
                <Link to={"/listings"} onClick={() => setIsShown(false)}>
                  <OfficeIcon marginRight={minorScale(3)} />
                  { t('listings') }
                </Link>
                <Link to={"/clients"} onClick={() => setIsShown(false)}>
                  <PersonIcon marginRight={minorScale(3)} />
                  { t('clients') }
                </Link>
                <Link to={"/newlisting"} onClick={() => setIsShown(false)}>
                  <ThListIcon marginRight={minorScale(3)} />
                  { t('addNewListing', { ns: 'listing' }) } 
                </Link>
                <Link to={"/agenda"} onClick={() => setIsShown(false)}>
                  <PropertiesIcon marginRight={minorScale(3)} />
                  { t('agenda', { ns: 'agenda' }) } 
                </Link>
                {currentUser && <SignoutButton onClick={signOut}/>}
              </nav>
            </Menu>
          </SideSheet>
          <Link to={"/"} className="logo-icon">
            <LogoIcon />
          </Link>
          <MainMenuButton setIsShown={setIsShown} />
        </Pane>
      </Pane>
      <Pane 
        width={windowInnerWidth && windowInnerWidth > DESKTOP_BREAKPOINT_VALUE ? DESKTOP_BREAKPOINT_VALUE : '100%'} 
        marginX={'auto'}
      >
        <Outlet />
      </Pane>
    </>
  );
};

export default Navigation;
