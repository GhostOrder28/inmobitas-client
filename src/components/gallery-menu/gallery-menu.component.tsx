import React, { useState } from "react";
import { WarningSignIcon, Text, Pane, TrashIcon, DocumentIcon } from "evergreen-ui";
import { Picture } from '../listing-detail/listing-detail.types';

type GalleryMenuProps = {
  children: React.ReactNode[];
  setShowDeletionMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showDeletionMenu: boolean;
  generatePresentation: () => Promise<void>;
  files: Picture[];

};

const GalleryMenu = ({
  children,
  setShowDeletionMenu,
  showDeletionMenu,
  generatePresentation,
  files
}: GalleryMenuProps) => {

  return (
    <>
      {children[1]}
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
          <Pane
            padding={"1rem"}
            onClick={() => generatePresentation()}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            borderRight={'1px solid #E9E9ED'}
          >
            <DocumentIcon size={"100%" as any as number} color={"#3A3E58"} />
          </Pane>
          <Pane
            padding={"1rem"}
            onClick={() => setShowDeletionMenu(!showDeletionMenu)}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
            borderRight={'1px solid #E9E9ED'}
          >
            <TrashIcon size={"100%" as any as number} color={"#3A3E58"} />
          </Pane>
          {
            children[0] // upload button
          }
        </Pane>
      </Pane>
    </>
  );
};

export default GalleryMenu;
