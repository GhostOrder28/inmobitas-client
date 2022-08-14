import React, { useState } from "react";
import { Pane } from "evergreen-ui";

type GalleryMenuProps = {
  children: React.ReactNode[];
  showDeletionMenu: boolean;
  width?: number;
};

const GalleryMenu = ({
  children,
  showDeletionMenu,
  width,
}: GalleryMenuProps) => {
  return (
    <Pane
      position={"fixed"}
      display={"flex"}
      bottom={!showDeletionMenu ? 0 : -50}
      width={width || '100%'}
      height={50}
      zIndex={97}
      backgroundColor={"#F9FAFC"}
      transition={"all .5s"}
    >
      <Pane
        display={"flex"}
        width="100%"
      >
        { children }
      </Pane>
    </Pane>
  );
};

export default GalleryMenu;
