import React from 'react';
import { Pane, Text, BanCircleIcon, minorScale } from 'evergreen-ui';

type ErrorMessageProps = {
  fieldErrorMsg: string | undefined;
}

const ErrorMessage = ({ fieldErrorMsg }: ErrorMessageProps) => {
  return (
    fieldErrorMsg ?
    <Pane
      marginTop={minorScale(1)}
      display={'flex'}
      alignItems={'center'}
      data-testid='error-message-container'
    >
      <BanCircleIcon
        color="danger"
        marginRight={minorScale(1)}
        size={minorScale(3)}
      />
      <Text size={300} width={'100%'}>
        { fieldErrorMsg }
      </Text>
    </Pane> : null
  )
};

export default ErrorMessage;
