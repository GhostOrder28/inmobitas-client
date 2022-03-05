import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { SideSheet, Button, MenuIcon, Position, Menu } from 'evergreen-ui';
import LogoIcon from '../../icons/logo-icon/logo-icon.component';
import './navigation.styles.css';

const Navigation = () => {

  const [isShown, setIsShown] = useState(false)
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='navigation flex justify-between items-center ph3 pv3'>
      <SideSheet
        width={260}
        position={Position.RIGHT}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
      >
        <Menu>
          <nav className='flex flex-column'>
            { !currentUser &&
              <>
                <Link to={'/signin'} onClick={() => setIsShown(false)}>
                  Sign In
                </Link>
                <Link to={'/signup'} onClick={() => setIsShown(false)}>
                  Sign Up
                </Link>
              </>
            }
            <Link to={'/listings'} onClick={() => setIsShown(false)}>
              Listings
            </Link>
            <Link to={'/owners'} onClick={() => setIsShown(false)}>
              Owners
            </Link>
            <Link to={'/newlisting'} onClick={() => setIsShown(false)}>
              Add new listing
            </Link>
            { currentUser &&
              <Link to={'/signin'} onClick={() => {
                setIsShown(false);
                dispatch(signOutStart())
              }}>
                Sign Out
              </Link>
            } {/* this should not be a link but a button*/}
          </nav>
        </Menu>

      </SideSheet>
      <Link to={'/'} className='logo-icon'>
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
  )
};

export default Navigation;
