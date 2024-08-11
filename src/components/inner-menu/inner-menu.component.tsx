import { Pane } from "evergreen-ui";
import { MenuMode } from "../photo-gallery/photo-gallery.types";

type DeletionPanelProps = {
  entity: Exclude<MenuMode, null>
  menuMode: MenuMode;
  children: JSX.Element | JSX.Element[];
};

const InnerMenu = ({
  menuMode,
  children,
  entity,
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
      height={menuMode === entity ? "2.2rem" : "0rem"}
      zIndex={97}
      overflow={"hidden"}
      transition={"height .2s"}
      data-testid="deletion-panel-container"
    >
      { children }
    </Pane>
  );
};

export default InnerMenu;
