import React from 'react';
import { Pane, Spinner } from 'evergreen-ui';

const ContentSpinner = () => (
  <Pane
    display="flex"
    justifyContent="center"
    paddingTop="3rem"
    backgroundColor="white"
    opacity=".7"
    position="absolute"
    zIndex={60}
    width="100vw"
    height="100%"
  >
    <Spinner />
  </Pane>
)

export default ContentSpinner;
