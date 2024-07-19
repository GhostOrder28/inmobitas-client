import React, { FC } from "react";
import { Pane, IconComponent } from "evergreen-ui";

type CustomTableOptionProps = {
  icon: IconComponent;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  color?: string;
  borderColor?: string;
  height?: string | number;
}

const CustomTableOption: FC<CustomTableOptionProps> = ({ icon: Icon, onClick, color, borderColor, height }) => (
  <Pane
    flex={1}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    borderLeft={`1px solid ${borderColor || "#EDEFF5"}`}
    onClick={onClick}
    height={ height || "100%" }
    width={"100%"}
  >
    <Icon color={color} />
  </Pane>

)

export default CustomTableOption;
