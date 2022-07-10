import React from 'react';
import FilesUploader from './files-uploader.component';
import { Picture } from '../listing-detail/listing-detail.types';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/redux-store';

it('should render FilesUploader', () => {
  const setStateMock = jest.fn();
  const useStateMock: any = (useState: any) => [useState, setStateMock];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);
  const [isLoading, setIsLoading] = useStateMock();
  const [noImages, setNoImages] = useStateMock();
  const [files, setFiles] = useStateMock([
    {
      filename: 'myfile.jpg',
      pictureId: 1,
      smallSizeUrl: 'myfile-small.jpg',
      largeSizeUrl: 'myfile-large.jpg'
    }
  ]);

  const snapshot = render(
    <Provider store={store}>
      <FilesUploader
        files={files}
        setFiles={setFiles}
        setIsLoading={setIsLoading}
        setNoImages={setNoImages}
      />
    </Provider>
  );
  expect(snapshot).toMatchSnapshot();
  //screen.debug()
})
