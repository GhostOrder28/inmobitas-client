import React, { FC } from 'react';
import { Pane, Heading, Link as LinkWrapper, majorScale } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../hooks/use-window-dimensions';

type NoDataMessageType = {
  messageText: string;
  linkText?: string;
  url?: string;
}

const NoDataMessage: FC<NoDataMessageType> = ({ messageText, linkText, url }) => {
  const { windowInnerWidth, windowInnerHeight } = useWindowDimensions();
  return (
    <Pane
      position={'absolute'}
      display={'flex'}
      justifyContent={'center'}
      top={ windowInnerHeight / 2 }
      left={ 0 }
      paddingX={majorScale(4)}
      width={ windowInnerWidth }
    >
      <Heading is={'h1'} color={'#474d66'}>
        {messageText}
        { linkText && url &&
          <Link to={url} className='link blue'>
          {linkText}
          </Link>
        }
      </Heading>
    </Pane>
  )
}

export default NoDataMessage;
