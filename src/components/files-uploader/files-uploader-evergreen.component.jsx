import React, { useState, useMemo, useCallback } from 'react';
import {
  Pane,
  Alert,
  FileCard,
  FileRejectionReason,
  rebaseFiles,
  FileUploader,
  IconButton,
  UploadIcon,
} from 'evergreen-ui';

const FilesUploader = ({ files, setFiles }) => {
  const acceptedMimeTypes = [MimeType.jpeg, MimeType.png]
  const maxFiles = 5
  const maxSizeInBytes = 50 * 1024 ** 2 // 50 MB
  // const [files, setFiles] = useState([])
  const [fileRejections, setFileRejections] = useState([])
  const values = useMemo(() => [...files, ...fileRejections.map((fileRejection) => fileRejection.file)], [ // TODO: log this to understand it better
    files,
    fileRejections,
  ])
  const handleRemove = useCallback(
    (file) => {
      const updatedFiles = files.filter((existingFile) => existingFile !== file)
      const updatedFileRejections = fileRejections.filter((fileRejection) => fileRejection.file !== file)

      // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
      // rejected for being over the file count limit, but might be under the limit now!)
      const { accepted, rejected } = rebaseFiles(
        [...updatedFiles, ...updatedFileRejections.map((fileRejection) => fileRejection.file)],
        { acceptedMimeTypes, maxFiles, maxSizeInBytes }
      )

      setFiles(accepted)
      setFileRejections(rejected)
    },
    [acceptedMimeTypes, files, fileRejections, maxFiles, maxSizeInBytes]
  )

  const fileCountOverLimit = files.length + fileRejections.length - maxFiles
  const fileCountError = `You can upload up to 5 files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? 'file' : 'files'
  }.`

  return (
    <FileUploader
      // acceptedMimeTypes={acceptedMimeTypes}
      label=""
      // description="You can upload up to 5 files. Files can be up to 50MB. You can upload .jpg and .pdf file formats."
      disabled={files.length + fileRejections.length >= maxFiles}
      // maxSizeInBytes={maxSizeInBytes}
      // maxFiles={maxFiles}
      onAccepted={setFiles}
      onRejected={setFileRejections}
      renderFile={
        (file, index) => {
          return <IconButton
            position={'fixed'}
            iconSize={40}
            // margin={0}
            bottom={'6rem'}
            right={'1rem'}
            type='button'
            multiple='multiple'
            icon={ UploadIcon }
            // onClick={ e => onUploadFile(e) }
                 />
        }
      }
      // renderFile={(file, index) => {
      //   const { name, size, type } = file
      //   const renderFileCountError = index === 0 && fileCountOverLimit > 0
      //
      //   // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
      //   // so don't show those errors individually on each <FileCard />
      //   const fileRejection = fileRejections.find(
      //     (fileRejection) => fileRejection.file === file && fileRejection.reason !== FileRejectionReason.OverFileLimit
      //   )
      //   const { message } = fileRejection || {}
      //
      //   return (
      //     <div key={`file-card-${index}`}>
      //       {renderFileCountError && <Alert intent="danger" title={fileCountError} />}
      //       <FileCard
      //         key={`${file.name}-${index}`}
      //         isInvalid={fileRejection != null}
      //         name={name}
      //         onRemove={() => handleRemove(file)}
      //         sizeInBytes={size}
      //         type={type}
      //         validationMessage={message}
      //       />
      //     </div>
      //   )
      // }}
      values={values}
    />
  )
}

export default FilesUploader;
