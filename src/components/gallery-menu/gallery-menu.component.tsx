import React, { useState } from "react";
import { WarningSignIcon, Text, Pane, TrashIcon, DocumentIcon } from "evergreen-ui";
import { Picture } from '../listing-detail/listing-detail.types';
import GalleryMenuButton from "../gallery-menu-button/gallery-menu-button.component";

type GalleryMenuProps = {
  children: React.ReactNode[];
  showDeletionMenu: boolean;
};

const GalleryMenu = ({
  children,
  showDeletionMenu,
}: GalleryMenuProps) => {
  return (
    <>
      {children[0]}
      <Pane
        position={"fixed"}
        display={"flex"}
        bottom={!showDeletionMenu ? 0 : -50}
        width={'100%'}
        height={50}
        zIndex={97}
        backgroundColor={"#F9FAFC"}
        transition={"all .5s"}
      >
        <Pane
          display={"flex"}
          width="100%"
        >
          {
            children.slice(1)
          }
        </Pane>
      </Pane>
    </>
  );
};

export default GalleryMenu;
