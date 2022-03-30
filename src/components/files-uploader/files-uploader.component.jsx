import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Pane,
  IconButton,
  UploadIcon,
  Button,
  FieldForm,
  ArrowUpIcon,
} from 'evergreen-ui';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import './files-uploader.styles.css';
import http from '../../utils/axios-instance';

const FilesUploader = ({ files, setFiles }) => {

  const userId = useSelector(selectCurrentUserId);
  const params = useParams();
  console.log(params);

  const onUploadFile = async e => {
    console.log('uploading...');

    const filesToUpload = [...e.target.files];
    try {
      const uploadedFiles = await Promise.all(filesToUpload.map(file => {
        let formData = new FormData();
        formData.append("file", file);
        return http.post(`/upload/${userId}/${params.listingid}`, formData)
      }));
      console.log(uploadedFiles);
      setFiles([...files, ...uploadedFiles.map(file => file.data)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Pane
      padding={'.68rem'}
    >
      <input
        id="upload-btn"
        type="file"
        onChange={ e => onUploadFile(e) }
        multiple='multiple'
        accept="image/*"
      />
      <label
        htmlFor="upload-btn"
        className='upload-btn-label'
      >
        <ArrowUpIcon
          color={'#3A3E58'}
          size={20}
        />
      </label>
    </Pane>
  )
}

export default FilesUploader;
