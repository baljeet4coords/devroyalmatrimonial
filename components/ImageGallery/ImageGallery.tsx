import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Image } from "react-bootstrap";
import classes from "./ImageGallery.module.scss";
import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { ImImage } from "react-icons/im";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserId } from "../../ducks/auth/selectors";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}
interface ImageResponse {
  galleryImages?: string[];
}
const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>(
    "JPG, JPEG, or PNG type"
  );
  const [imageResponse, setImageResponse] = useState<ImageResponse>();
  const userId = useSelector(getUserId);

  useEffect(() => {
    async function uploadFiles() {
      const formData = new FormData();
      formData.append("userId", String(userId));
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("image", file);
        });
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/userImage/setGalleryImages`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setUploadStatus("Files uploaded successfully");
          const getImages = async () => {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_URL}/userImage/getUserImages`,
              { userId: userId }
            );
            if (response.data.jsonResponse) {
              setImageResponse(response.data.jsonResponse);
            }
          };
          getImages();
        } catch (error) {
          setUploadStatus("Error uploading files");
        }
        setTimeout(() => {
          setUploadStatus("");
        }, 2000);
      }
    }
    uploadFiles();
  }, [selectedFiles, userId]);

  useEffect(() => {
    const getImages = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/userImage/getUserImages`,
        { userId: userId }
      );
      if (response.data.jsonResponse) {
        setImageResponse(response.data.jsonResponse);
      }
    };
    getImages();
  }, [userId]);

  const onInit = () => {};
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setSelectedFiles(fileList);
    }
  };

  return (
    <div className={classes.imageGallery}>
      <div className="d-flex justify-content-between mb-5">
        <h5>Your Photos</h5>
        <div>
          <div className={classes.addMorePhoto} onClick={handleButtonClick}>
            Add more photos
            <ImImage />
          </div>
          <span className="mt-2 text-muted">{uploadStatus}</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
        />
      </div>
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames="text-center"
      >
        {imageResponse && imageResponse.galleryImages?.length
          ? imageResponse.galleryImages.map((img, index) => {
              return (
                <a href={`${process.env.NEXT_PUBLIC_URL}/${img}`} key={index}>
                  <Image
                    alt={"RM"}
                    src={`${process.env.NEXT_PUBLIC_URL}/${img}`}
                  />
                </a>
              );
            })
          : "No images"}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;
