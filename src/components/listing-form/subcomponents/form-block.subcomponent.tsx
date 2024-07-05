import React from "react";
import { Pane, Text } from "evergreen-ui"

type FormBlockProps = {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
}

const FormBlock = ({ title, children }: FormBlockProps) => {
  return (
    <Pane
      position={"relative"}
      elevation={0}
      padding={20}
      className="form-category"
    >
      <Text size={600} className="form-category-header">
        { title } 
      </Text>
      { children }
    </Pane>
  )
}

export default FormBlock;
