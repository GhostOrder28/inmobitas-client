import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SideSheet, Button, MenuIcon, Position, Menu } from 'evergreen-ui';
import './navigation.styles.css';

const Navigation = () => {

  const [isShown, setIsShown] = useState(false)
  const navigate = useNavigate();

  return (
    <div className='navigation flex justify-end mb4'>
      <SideSheet
        width={260}
        position={Position.RIGHT}
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
      >
        <Menu>
          <nav className='flex flex-column'>
            <Link to={'/listings'} onClick={() => setIsShown(false)}>
              Listings
            </Link>
            <Link to={'/newlisting'} onClick={() => setIsShown(false)}>
              Add new listing
            </Link>
          </nav>
        </Menu>

      </SideSheet>
      <Button
        width={50}
        onClick={() => setIsShown(true)}
      >
        <MenuIcon />
      </Button>
    </div>
  )
};

export default Navigation;
