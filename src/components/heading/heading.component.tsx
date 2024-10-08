import { ReactNode, ElementType } from "react";
import { Heading as EvergreenHeading, minorScale } from "evergreen-ui";

const H1_FONT_WEIGHT = 800;
const H2_FONT_WEIGHT = 500;

function getFontWeight (headerType: string) {
  switch (headerType) {
    case "h1":
      return H1_FONT_WEIGHT;
    case "h2":
      return H2_FONT_WEIGHT;
    default:
      return H2_FONT_WEIGHT;
  }
};

type CustomHeadingProps = {
  type: string;
  children: ReactNode;
}

const Heading = ({ type, children }: CustomHeadingProps) => {
  return (
    <EvergreenHeading
      is={type as ElementType}
      size={800}
      margin={ minorScale(5) }
      fontWeight={getFontWeight(type)}
    >
      { children }
    </EvergreenHeading>
  )
};

export default Heading;
