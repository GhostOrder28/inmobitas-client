import React from 'react';
import { Pane, Text, BanCircleIcon } from 'evergreen-ui';

type ErrorMessageProps = {
  fieldErrorMsg: string | undefined;
}

const ErrorMessage = ({ fieldErrorMsg }: ErrorMessageProps) => {
  
  return (
    fieldErrorMsg ?
    <Pane
      marginTop={'.3rem'}
      display={'flex'}
      alignItems={'center'}
    >
      <BanCircleIcon
        color="danger"
        marginRight={5}
        size={13}
      />
      <Text
        fontSize={'.75rem'}
        width={'100%'}
      >
        { fieldErrorMsg }
      </Text>
    </Pane> : null
  )
};

export default ErrorMessage;
