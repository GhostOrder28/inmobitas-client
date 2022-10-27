import React, { FC } from 'react';
import { Pane, Spinner, Paragraph, majorScale, minorScale } from 'evergreen-ui';

type ContentSpinnerProps = {
  waitMessage?: string;
}

const ContentSpinner: FC<ContentSpinnerProps> = ({ waitMessage }) => (
  <Pane
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    paddingTop="3rem"
    backgroundColor="white"
    opacity=".85"
    position="absolute"
    zIndex={60}
    width="100%"
    height="100%"
  >
    <Spinner />
    <Paragraph
      marginTop={minorScale(5)}
      textAlign={'center'}
      size={900}
      fontWeight={600}
      lineHeight={1.5}
      paddingX={majorScale(5)}
    >
      { waitMessage }
    </Paragraph>
  </Pane>
)

export default ContentSpinner;
