import React from 'react';
import { Button, MenuIcon } from 'evergreen-ui';

type MainMenuButtonProps = {
  setIsShown: React.Dispatch<React.SetStateAction<boolean>> 
}

const MainMenuButton = ({ setIsShown }: MainMenuButtonProps) => (
  <Button
    width={40}
    height={40}
    padding={0}
    onClick={() => setIsShown(true)}
  >
    <MenuIcon size={20} />
  </Button>
)

export default MainMenuButton;
