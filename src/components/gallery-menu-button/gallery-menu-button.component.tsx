import { IconComponent, Pane, minorScale } from "evergreen-ui";

type GalleryMenuButtonProps = {
  Icon: IconComponent;
  fn: () => void;
}

const GalleryMenuButton = ({ Icon, fn }: GalleryMenuButtonProps) => (
  <Pane
    padding="1rem"
    onClick={fn}
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    cursor="pointer"
    borderRight="1px solid #E9E9ED"
  >
    <Icon size={minorScale(5)} color="#3A3E58" />
  </Pane>
)

export default GalleryMenuButton;
