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
import { useDispatch } from "react-redux";
import { galleryPostReq, galleryReq } from "../../ducks/Gallery/actions";
import { selectGallerySuccess } from "../../ducks/Gallery/selectors";
import { useRouter } from "next/router";
import { IPartnerDetailsInterestResponse, IPartnerDetailsPrivacyResponse } from "../../types/PartnerDetails/partnerDetails";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  galleryRef: React.RefObject<HTMLDivElement>;
  EditHide: boolean;
  userProfilerName?: string;
  privacySetting?: IPartnerDetailsPrivacyResponse | null;
  interestResponse?: IPartnerDetailsInterestResponse | null;
}
interface ImageResponse {
  galleryImages?: string[];
}
const ImageGallery: React.FC<ImageGalleryProps> = ({ EditHide, images, galleryRef, userProfilerName, privacySetting, interestResponse }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const router = useRouter();
  const { uid } = router?.query;
  const partnerId = uid && String(uid).split('RM')[0];
  const gallerySuccessResponse = useSelector(selectGallerySuccess);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>(
    "JPG, JPEG, or PNG type"
  );
  const [imageResponse, setImageResponse] = useState<ImageResponse>();

  useEffect(() => {
    if (partnerId) {
      dispatch(galleryReq({ userId: Number(partnerId) }));
    } else {
      userId && dispatch(galleryReq({ userId: userId }));
    }
  }, [dispatch, userId, partnerId]);

  useEffect(() => {
    async function uploadFiles() {
      const formData = new FormData();
      formData.append("userId", String(userId));
      const prevImg: string[] = [];
      if (imageResponse?.galleryImages?.length) {
        for (let i = 0; i < imageResponse?.galleryImages?.length; i++) {
          const image = imageResponse.galleryImages[i];
          const parts = image.split("/");
          const filename = parts[parts.length - 1];
          prevImg.push(filename);
        }
      }
      formData.append("PrevImg", JSON.stringify(prevImg));
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
              { userId: partnerId ? partnerId : userId }
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
        { userId: partnerId ? partnerId : userId }
      );
      if (response.data.jsonResponse) {
        setImageResponse(response.data.jsonResponse);
      }
    };
    getImages();
  }, [userId, partnerId]);

  useEffect(() => {
    if (gallerySuccessResponse && gallerySuccessResponse.jsonResponse) {
      setImageResponse(gallerySuccessResponse.jsonResponse);
    }
  }, [gallerySuccessResponse?.jsonResponse]);

  const onInit = () => { };
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

  const reptNameHide = () => <>{userProfilerName && userProfilerName.slice(0, 3)}<>{'*'.repeat(8) + ("`s Photos").toLocaleLowerCase()}</></>;



  const ShowNameONConditions = userProfilerName && userProfilerName?.length > 16
    ? userProfilerName?.toLocaleLowerCase().substring(0, 15).concat('...')+ "'s" + ' Photo'
    : userProfilerName?.toLocaleLowerCase()  + "'s" + ' Photo';


  return (
    <div className={classes.imageGallery} ref={galleryRef}>
      <div className="d-flex justify-content-between mb-5">
        <h5>{userProfilerName
          ? privacySetting
            ? privacySetting?.privacy_show_name === 'P'
              ? ShowNameONConditions
              : interestResponse?.Send === 'A' || interestResponse?.Recieve === 'A'  || interestResponse?.Recieve === 'S' ?
                ShowNameONConditions
                : reptNameHide()
            : ShowNameONConditions
          : 'Your Photos'}</h5>
        {
          EditHide ? null :
            <div>
              <div className={classes.addMorePhoto} onClick={handleButtonClick}>
                Add more photos
                <ImImage />
              </div>
              <span className="mt-2 text-muted">{uploadStatus}</span>
            </div>
        }
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          multiple
        />
      </div>
      {privacySetting?.privacy_show_photo === 'I' && interestResponse?.Send != 'A' && interestResponse?.Receive === null
        ?
        <div className="d-flex justify-content-between mb-5">
          <div className={classes.galleryProcted}>
            <Image src="./Images/galleryProcted.png" alt="galleryProtected" className={classes.protectedGalleryImg} />
            <h5>Please Send interest first to open gallery !! </h5>
          </div>
        </div>
        : <>
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
              :
              <div className={classes.noImageSec}>
                <video muted src="https://cdnl.iconscout.com/lottie/premium/thumb/album-zero-8311961-6631670.mp4" typeof='video/mp4' autoPlay loop={true}></video>
                <h3>No Image Found !!</h3>
              </div>
            }
          </LightGallery>
        </>
      }
    </div>
  );
};

export default ImageGallery;
