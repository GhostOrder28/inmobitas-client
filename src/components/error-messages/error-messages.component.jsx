import React from 'react';
import { Pane, Text, BanCircleIcon } from 'evergreen-ui';

const ErrorMessage = ({ validationErrMsg, authErrMsg }) => {
  if (validationErrMsg) {
    return (
      <Pane
        marginTop={'.5rem'}
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
          width={300}
        >
          { validationErrMsg }
        </Text>
      </Pane>
    )
  } else if (authErrMsg) {
    return (
      <Pane>
        <BanCircleIcon
          color="danger"
          marginRight={5}
          size={13}
        />
        <Text
          fontSize={'.75rem'}
          lineHeight={0}
        >
          { authErrMsg }
        </Text>
      </Pane>
    )
  } else {
    return ''
  }
};

export default ErrorMessage;
