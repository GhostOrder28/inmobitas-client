import React from "react";
import { Pane, CrossIcon, TickIcon } from "evergreen-ui";

type DeletionPanelProps = {
  showDeletionMenu: boolean;
  setShowDeletionMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMarkedPictures: React.Dispatch<React.SetStateAction<number[]>>;
  submitDeletion: () => Promise<void>;
};

const DeletionPanel = ({
  showDeletionMenu,
  setShowDeletionMenu,
  setMarkedPictures,
  submitDeletion,
}: DeletionPanelProps) => {
  return (
    <Pane
      display={"flex"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      top={"7.6rem"}
      right={".8rem"}
      width={"30%"}
      marginLeft={"auto"}
      height={showDeletionMenu ? "2.2rem" : "0rem"}
      zIndex={97}
      overflow={"hidden"}
      transition={"height .2s"}
    >
      <Pane
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
        flex={1}
        cursor={"pointer"}
        onClick={submitDeletion}
      >
        <TickIcon size={23} color={"#3A3E58"} />
      </Pane>
      <Pane
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
        flex={1}
        cursor={"pointer"}
        onClick={() => {
          setMarkedPictures([]);
          setShowDeletionMenu(!showDeletionMenu);
        }}
      >
        <CrossIcon size={23} color={"#3A3E58"} />
      </Pane>
    </Pane>
  );
};

export default DeletionPanel;
