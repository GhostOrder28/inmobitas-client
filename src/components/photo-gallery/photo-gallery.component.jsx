import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import http from '../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import {
  Pane,
  Spinner,
  MoreIcon,
  CrossIcon,
  TrashIcon,
  IconButton,
  Checkbox,
} from 'evergreen-ui';
import Navigation from '../navigation/navigation.component';
import FilesUploader from '../files-uploader/files-uploader.component';
import GalleryMenu from '../gallery-menu/gallery-menu.component';
import DeletionPanel from '../deletion-panel/deletion-panel.component';
import './photo-gallery.styles.css';

const pictureFullviewContainer = document.getElementById('pictureFullviewContainer');

const PhotoGallery = ({ display, listingPictures }) => {

  const userId = useSelector(selectCurrentUserId);
  const [fullscreen, setFullscreen] = useState(null);
  const [files, setFiles] = useState([]);
  const [showDeletionMenu, setShowDeletionMenu] = useState(false);
  const [markedPictures, setMarkedPictures] = useState([]);

  useEffect(() => {
    console.log(fullscreen);
    console.log('markedPictures: ', markedPictures);
  })

  useEffect(() => {
    setFiles([...files, ...listingPictures])
  }, [listingPictures])

  const toggleMark = pictureIdToDelete => {
    const picture = markedPictures.find(pictureId => pictureId === pictureIdToDelete);
    if (picture) {
      const filteredPictures = markedPictures.filter(pictureId => pictureId !== pictureIdToDelete);
      setMarkedPictures(filteredPictures)
      return;
    };
    setMarkedPictures([ ...markedPictures, pictureIdToDelete ])
  };

  const submitDeletion = async () => {
    const res = await Promise.all(markedPictures.map(pictureId => {
      const deletedPicture = http.delete(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/deletepicture/${pictureId}`)
      return deletedPicture;
    }))
    const deletedPictures = res.map(deletedPicture => parseInt(deletedPicture.data));
    const filteredPictures = files.filter(pic => !deletedPictures.some(dPic => dPic === pic.pictureId));
    setFiles(filteredPictures);
    setShowDeletionMenu(false);
    setMarkedPictures([])
  };

  return (
    <Pane
      display={ display }
      position={ 'relative' }
    >
      <GalleryMenu
        setShowDeletionMenu={ setShowDeletionMenu }
        showDeletionMenu={ showDeletionMenu }
      >
        <FilesUploader files={files} setFiles={setFiles} />
        <DeletionPanel
          showDeletionMenu={ showDeletionMenu }
          setShowDeletionMenu={ setShowDeletionMenu }
          setMarkedPictures={ setMarkedPictures }
          submitDeletion={ submitDeletion }
        />
      </GalleryMenu>
      <Pane
        display='grid'
        gridTemplateColumns={'repeat(3, 1fr)'}
        position={'relative'}
        width={'100%'}
        padding={ showDeletionMenu ? '1.5px' : '' }
        transition={ 'all .3s' }
      >
        { files.length ?
          files.map((file, idx) => {
            console.log(file);
            return (
              <Pane
                key={`image-${idx}`}
                className='gallery-img-container'
                position={'relative'}
                border={ showDeletionMenu ? '3px solid white' : ''}
              >
                <Pane
                  position='absolute'
                  top='0' left='0'
                  zIndex={90}
                  width={'100%'}
                  height={'100%'}
                  cursor={'pointer'}
                  onClick={
                    showDeletionMenu ?
                      () => toggleMark(file.pictureId) :
                      () => setFullscreen(file)
                  }
                />
                { showDeletionMenu &&
                  <Checkbox
                    position='absolute'
                    top='0'
                    right='0'
                    zIndex='98'
                    // onClick={e => e.stopPropagation()}
                    size={30}
                    checked={ markedPictures.some(pictureId => pictureId === file.pictureId) }
                    margin='.6rem'
                  />
                }
                <img
                  className='gallery-img'
                  name=''
                  src={`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/users/${userId}/pictures/s/${file.filename}_s.${file.suffix}`}
                />
              </Pane>
            )}) :
          ''
        }
      </Pane>
      { fullscreen ?
        ReactDOM.createPortal(
          <Pane
            position={'fixed'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100vw'}
            height={'100vh'}
            top={0}
            left={0}
            zIndex={9999}
          >
            <Pane position={ 'absolute' } zIndex={ 99 }>
              <img
                name=''
                src={`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/users/${userId}/pictures/l/${fullscreen.filename}_l.${fullscreen.suffix}`}
              />
            </Pane>
            <Pane
              width={'100vw'}
              height={'100vh'}
              backgroundColor={'black'}
              position={'absolute'}
              zIndex={98}
              onClick={() => setFullscreen(null)}
            >
            </Pane>
          </Pane>
        , pictureFullviewContainer) : ''
      }
    </Pane>
  )
};

export default PhotoGallery;
