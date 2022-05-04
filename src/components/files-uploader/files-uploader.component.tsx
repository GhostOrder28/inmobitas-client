import React, { ChangeEventHandler } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon } from "evergreen-ui";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import "./files-uploader.styles.css";
import http from "../../utils/axios-instance";

import { Picture } from "../listing-detail/listing-detail.types";

type FilesUploaderProps = {
  files: Picture[];
  setFiles: React.Dispatch<React.SetStateAction<Picture[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilesUploader = ({
  files,
  setFiles,
  setIsLoading,
}: FilesUploaderProps) => {
  const userId = useSelector(selectCurrentUserId);
  const params = useParams();

  const onUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setIsLoading(true);
    const filesToUpload = e.target.files ? [...e.target.files] : [];
    try {
      const uploadedFiles = await Promise.all(
        filesToUpload.map((file: File) => {
          let formData = new FormData();
          formData.append("file", file);
          return http.post(`/upload/${userId}/${params.listingid}`, formData);
        })
      );
      setFiles([...files, ...uploadedFiles.map((file) => file.data)]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <input
        id="upload-btn"
        type="file"
        onChange={(e) => onUploadFile(e)}
        multiple
        accept="image/*"
      />
      <label htmlFor="upload-btn" className="upload-btn-label">
        <ArrowUpIcon size={"100%" as any as number} color={"#3A3E58"} />
      </label>
    </>
  );
};

export default FilesUploader;
