import React from 'react';
import { IconButton, Button, MenuIcon } from 'evergreen-ui';

type MainMenuButtonProps = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>> 
}

const MainMenuButton = ({ setIsShown }: MainMenuButtonProps) => (
  <IconButton
    width={40}
    height={40}
    onClick={() => setIsShown(true)}
    icon={MenuIcon}
  />
)

export default MainMenuButton;
