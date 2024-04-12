import React, { ReactNode } from 'react';
import { Pane } from 'evergreen-ui';
import { MenuMode } from '../photo-gallery/photo-gallery.component';

type PicturesContainerProps = {
  children: ReactNode;
  menuMode: MenuMode; 
}

const PicturesContainer = ({ children, menuMode }: PicturesContainerProps) => (
  <Pane
    display="grid"
    gridTemplateColumns={"repeat(3, 1fr)"}
    position={"relative"}
    zIndex={10}
    width={"100%"}
    padding={menuMode === 'pictures' ? "1.5px" : ""}
    transition={"all .3s"}
  >
    { children }
  </Pane>
)

export default PicturesContainer;
