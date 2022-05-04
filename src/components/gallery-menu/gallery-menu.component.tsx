import React, { useState } from "react";
import { Pane, TrashIcon, MoreIcon, CrossIcon } from "evergreen-ui";

type GalleryMenuProps = {
  children: React.ReactNode[];
  setShowDeletionMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showDeletionMenu: boolean;
};

const GalleryMenu = ({
  children,
  setShowDeletionMenu,
  showDeletionMenu,
}: GalleryMenuProps) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      {children[1]}
      <Pane
        position={"fixed"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        bottom={".8rem"}
        right={!showDeletionMenu ? ".8rem" : "-4rem"}
        width={60}
        height={activeMenu ? 180 : 60}
        zIndex={97}
        borderRadius={"50px"}
        backgroundColor={"#F9FAFC"}
        boxShadow={"5px 5px 7px rgba(0, 0, 0, 0.2)"}
        overflow={"hidden"}
        transition={"all .5s"}
      >
        <Pane
          position={"absolute"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          width="100%"
        >
          <Pane
            padding={"1.15rem"}
            onClick={() => setShowDeletionMenu(!showDeletionMenu)}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            cursor={"pointer"}
          >
            <TrashIcon size={"100%" as any as number} color={"#3A3E58"} />
          </Pane>
          {children[0]}
          <Pane
            padding={"1.15rem"}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => setActiveMenu(!activeMenu)}
            cursor={"pointer"}
          >
            {!activeMenu ? (
              <MoreIcon size={"100%" as any as number} color={"#3A3E58"} />
            ) : (
              <CrossIcon size={"100%" as any as number} color={"#3A3E58"} />
            )}
          </Pane>
        </Pane>
      </Pane>
    </>
  );
};

export default GalleryMenu;
