import React from "react";
import { Pane, PaneProps, Text, minorScale, useTheme } from "evergreen-ui"

type FormBlockProps = {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
} & PaneProps

const FormBlock = ({ title, children, ...otherProps }: FormBlockProps) => {
  const { colors } = useTheme();

  return (
    <Pane
      position="relative"
      display="flex"
      flexDirection="column"
      gap={ minorScale(5) }
      border={ `1px solid ${colors.gray200}` }
      padding={20}
      className="form-category"
      { ...otherProps }
    >
      <Text size={600} className="form-category-header">
        { title } 
      </Text>
      { children }
    </Pane>
  )
}

export default FormBlock;
