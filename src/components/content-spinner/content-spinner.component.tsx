import { Pane, Spinner, Paragraph, majorScale, minorScale } from "evergreen-ui";
import { selectIsLoading, selectLoaderMessage } from "../../redux/app/app.selectors";
import { useSelector } from "react-redux";

const ContentSpinner = () => {
  const isLoading = useSelector(selectIsLoading);
  const loaderMessage = useSelector(selectLoaderMessage);

  return isLoading ? (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="3rem"
      backgroundColor="white"
      opacity=".85"
      position="fixed"
      zIndex={999999}
      top={0}
      left={0}
      width="100%"
      height="100%"
    >
      <Spinner />
      <Paragraph
        marginTop={minorScale(5)}
        textAlign="center"
        size="large"
        fontWeight={600}
        lineHeight={1.5}
        paddingX={majorScale(5)}
      >
        { loaderMessage }
      </Paragraph>
    </Pane>
  ) : <></>
}

export default ContentSpinner;
