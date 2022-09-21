import React, { ChangeEventHandler } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon, toaster } from "evergreen-ui";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import "./files-uploader.styles.css";
import http from "../../utils/axios-instance";
import { Picture } from "../listing-detail/listing-detail.types";
import {AxiosError} from "axios";

export type FilesUploaderProps = {
  files: Picture[];
  setFiles: React.Dispatch<React.SetStateAction<Picture[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNoImages: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilesUploader = ({
  files,
  setFiles,
  setIsLoading,
  setNoImages,
}: FilesUploaderProps) => {
  const userId = useSelector(selectCurrentUserId);
  const params = useParams();

  const onUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setIsLoading(true);
    const filesToUpload = e.target.files ? [...e.target.files] : [];
    try {
      await http.get(`/checkverified/${userId}/${params.listingid}/${filesToUpload.length}`);
      const uploadedFiles = await Promise.all(
        filesToUpload.map((file: File) => {
          let formData = new FormData();
          formData.append("file", file);
          return http.post(`/pictures/${userId}/${params.listingid}`, formData);
        })
      );
      console.log(uploadedFiles);      
      setFiles([...files, ...uploadedFiles.map((file) => file.data)]);
      setNoImages(false)
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        function isAxiosError (err: Error | AxiosError): err is AxiosError {
          return (err as AxiosError).isAxiosError !== undefined;
        }
        if (isAxiosError(err) && err.response) {
          toaster.warning(err.response.data.unverifiedUserError.errorMessage, {
            description: err.response.data.unverifiedUserError.errorMessageDescription,
            duration: 7
          });
        }
      } else {
        console.error(err);
      }
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
        <ArrowUpIcon size={20} color={"#3A3E58"} />
      </label>
    </>
  );
};

export default FilesUploader;
