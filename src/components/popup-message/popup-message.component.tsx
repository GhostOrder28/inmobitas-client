import React from 'react';
import { Pane, WarningSignIcon, Text } from 'evergreen-ui';

type PopupMessageProps = {
  message: string;
  displayCondition: boolean;
}

const PopupMessage = ({ displayCondition, message }: PopupMessageProps) => (
  <Pane 
    position={'fixed'}
    left={displayCondition ? 20 : -100}
    bottom={70}
    opacity={displayCondition ? 1 : 0}
    padding={15}
    elevation={2}
    borderRadius={5}
    display={'flex'}
    transition={"all .5s"}
    alignItems={'center'}
  >
    <WarningSignIcon color="warning" marginRight={16} />
    <Text>{ message }</Text>
  </Pane>
)

export default PopupMessage;
