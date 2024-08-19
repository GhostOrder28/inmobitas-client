import useCalculateAppSize from "../../hooks/use-calculate-app-size";
import { Pane } from "evergreen-ui";

type PageContainerProps = {
  children: React.ReactNode[] | React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  const { appHeight } = useCalculateAppSize();

  return (
    <Pane 
      display="flex" 
      flexDirection="column"
      height={ appHeight }
      marginX="auto" 
      overflow="scroll"
    >
      { children }
    </Pane>
  )
};

export default PageContainer;
