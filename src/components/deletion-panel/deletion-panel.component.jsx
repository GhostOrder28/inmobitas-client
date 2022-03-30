import React from 'react';
import { Pane, CrossIcon, TickIcon } from 'evergreen-ui';

const DeletionPanel = ({ showDeletionMenu, setShowDeletionMenu, setMarkedPictures, submitDeletion }) => {
  return (
    <Pane
      display={ 'flex' }
      alignItems={'center'}
      justifyContent={'flex-end'}
      top={ '7.6rem' }
      right={ '.8rem' }
      width={ '30%' }
      marginLeft={ 'auto' }
      height={ showDeletionMenu ? '2.2rem' : '0rem' }
      zIndex={ 97 }
      // backgroundColor={'#F9FAFC'}
      overflow={'hidden'}
      transition={'height .2s'}
    >
      <Pane
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'100%'}
        flex={1}
        // backgroundColor={'#52BD95'}
        cursor={'pointer'}
        onClick={ submitDeletion }
      >
        <TickIcon size={20} />
      </Pane>
      <Pane
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        height={'100%'}
        flex={1}
        // backgroundColor={'#D14343'}
        cursor={'pointer'}
        onClick={ () => {
          setMarkedPictures([])
          setShowDeletionMenu(!showDeletionMenu)
        }}
      >
        <CrossIcon size={20} />
      </Pane>
    </Pane>
  )
};

export default DeletionPanel;
