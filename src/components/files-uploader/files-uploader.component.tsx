import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon, toaster } from "evergreen-ui";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import "./files-uploader.styles.css";
import axios from "axios";
import http from "../../http/http";
import { Picture } from "../listing-detail/listing-detail.types";
import {AxiosError} from "axios";
import { IsLoading } from '../photo-gallery/photo-gallery.component';

export type FilesUploaderProps = {
  files: Picture[];
  setFiles: Dispatch<SetStateAction<Picture[]>>;
  setIsLoading: Dispatch<SetStateAction<IsLoading>>;
  setNoImages: Dispatch<SetStateAction<boolean>>;
};

function batchUploader (files: File[], userId: number, listingId: string) {
  return files.map((file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return http.post(`/pictures/${userId}/${listingId}`, formData);
  })
};

const FilesUploader = ({
  setFiles,
  setIsLoading,
  setNoImages,
}: FilesUploaderProps) => {
  const userId = useSelector(selectCurrentUserId);
  const { listingid: listingId } = useParams();

  const onUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setIsLoading('upload');
    const filesToUpload = e.target.files ? [...e.target.files] : [];
    try {
      if (!userId) throw Error('userId is undefined');
      if (!listingId) throw Error('listingId is undefined');

      await http.get(`/checkverified/${userId}/${listingId}/${filesToUpload.length}`);

      const uploadedFiles = await Promise.all(batchUploader(filesToUpload, userId, listingId));

      setFiles(prev => [...prev, ...uploadedFiles.map(({ data }) => data)]);
      setNoImages(false)
      setIsLoading(null);
    } catch (err) {
      setIsLoading(null);
      if (err instanceof Error) {
        function isAxiosError (err: Error | AxiosError): err is AxiosError {
          return (err as AxiosError).isAxiosError !== undefined;
        }
        // if (isAxiosError(err) && err.response) {
        //   toaster.warning(err.response.data.unverifiedUserError.errorMessage, {
        //     description: err.response.data.unverifiedUserError.errorMessageDescription,
        //     duration: 7
        //   });
        // }
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
