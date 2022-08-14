import React, { ReactNode } from 'react';
import { Pane } from 'evergreen-ui';

type PicturesContainerProps = {
  children: ReactNode;
  showDeletionMenu: boolean; 
}

const PicturesContainer = ({ children, showDeletionMenu }: PicturesContainerProps) => (
  <Pane
    display="grid"
    gridTemplateColumns={"repeat(3, 1fr)"}
    position={"relative"}
    width={"100%"}
    padding={showDeletionMenu ? "1.5px" : ""}
    transition={"all .3s"}
  >
    { children }
  </Pane>
)

export default PicturesContainer;
