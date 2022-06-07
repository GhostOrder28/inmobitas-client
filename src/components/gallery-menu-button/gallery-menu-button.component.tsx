import React from 'react';
import { IconComponent, Pane } from 'evergreen-ui';

type GalleryMenuButtonProps = {
  Icon: IconComponent;
  fn: () => void;
}

const GalleryMenuButton = ({ Icon, fn }: GalleryMenuButtonProps) => (
  <Pane
    padding={"1rem"}
    onClick={fn}
    width={"100%"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    cursor={"pointer"}
    borderRight={'1px solid #E9E9ED'}
  >
    <Icon size={"100%" as any as number} color={"#3A3E58"} />
  </Pane>
)

export default GalleryMenuButton;
