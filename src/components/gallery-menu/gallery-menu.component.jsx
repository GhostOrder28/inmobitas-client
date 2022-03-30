import React, { useState } from 'react';
import { Pane, TrashIcon, MoreIcon, CrossIcon } from 'evergreen-ui';
// import DeletionPanel from '../deletion-panel/deletion-panel.component';

const GalleryMenu = ({ children, setShowDeletionMenu, showDeletionMenu }) => {

  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      { children[1] }
      <Pane
        className={activeMenu ? 'gallery-menu-hide' : 'gallery-menu-show'}
        position={ 'fixed' }
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        bottom={ '.8rem' }
        right={ !showDeletionMenu ? '.8rem' : '-4rem' }
        width={50}
        height={activeMenu ? 140 : 50}
        zIndex={ 97 }
        borderRadius={'25px'}
        backgroundColor={'#F9FAFC'}
        boxShadow={'5px 5px 7px rgba(0, 0, 0, 0.2)'}
        overflow={'hidden'}
        transition={'all .5s'}
      >
        <Pane
          padding={'.68rem'}
          onClick={ () => setShowDeletionMenu(!showDeletionMenu) }
        >
          <TrashIcon
            size={20}
            cursor={'pointer'}
            color={'#3A3E58'}
          />
        </Pane>
        { children[0] }
        <Pane
          padding={'.68rem'}
        >
          { !activeMenu ?
            <MoreIcon
              className={ 'upload-icon' }
              size={20}
              color={'#3A3E58'}
              cursor={'pointer'}
              onClick={() => setActiveMenu(!activeMenu)}
            /> :
            <>
              <CrossIcon
                size={20}
                padding={0}
                color={'#3A3E58'}
                cursor={'pointer'}
                onClick={() => setActiveMenu(!activeMenu)}
              />
            </>
          }
        </Pane>
      </Pane>
    </>
  )
};

export default GalleryMenu;
