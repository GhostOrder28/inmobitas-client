import { Pane } from "evergreen-ui";
import { MenuMode } from "../photo-gallery/photo-gallery.types";

type GalleryMenuProps = {
  children: React.ReactNode[];
  menuMode: MenuMode;
  width?: number;
};

const GalleryMenu = ({
  children,
  menuMode,
  width,
}: GalleryMenuProps) => {
  return (
    <Pane
      position="fixed"
      display="flex"
      bottom={menuMode ? -50 : 0}
      width={width || "100%"}
      height={50}
      zIndex={20}
      backgroundColor="#F9FAFC"
      transition="all .5s"
    >
      <Pane
        display="flex"
        width="100%"
      >
        { children }
      </Pane>
    </Pane>
  );
};

export default GalleryMenu;
