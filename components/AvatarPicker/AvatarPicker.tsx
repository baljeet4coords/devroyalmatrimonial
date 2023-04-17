import React, { useState, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import classes from "./AvtarPicker.module.scss";
import { Image } from "react-bootstrap";
import { Button } from "react-rainbow-components";
import { Modal } from "react-rainbow-components";

type Avatar = {
  name: string;
  image: string;
};

interface AvatarPickerProps {
  onGetAvatar: (name: string, file: Blob | null) => void;
  defaultImage: string;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
  onGetAvatar,
  defaultImage,
}) => {
  const defaultImageOnly = defaultImage.split("/").pop();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileExt, setFilExt] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(String(file?.lastModified));
    setFilExt(file?.type.split("/")[1] || "");
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const imageName = `${fileName}.${fileExt}`;
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImage().toDataURL();
    const canvasBlob = editorRef.current.getImageScaledToCanvas();
    canvasBlob.toBlob((blob) => {
      onGetAvatar(imageName, blob);
    });
    if (!defaultImageOnly) {
      setCroppedImage(defaultImage);
    } else {
      setCroppedImage("/Images/no-avatar.png");
    }
    setCroppedImage(canvas);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!defaultImageOnly) {
      setCroppedImage("/Images/no-avatar.png");
    } else {
      image === null && setCroppedImage(defaultImage);
    }
  }, [defaultImage]);

  useEffect(() => {
    if (image) setIsOpen(true);
  }, [image]);

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <input
        type="file"
        onChange={handleImageChange}
        ref={fileInputRef}
        id="profilepic"
        name="profilepic"
        className={classes.Profile_input}
        style={{ display: "none" }}
      />
      <Modal
        size="small"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="text-center py-3"
      >
        <p className="text-muted">
          Your expression in the picture can also make a big difference. Choose
          a picture where you are smiling or looking friendly and approachable.
          unhappy &#128522;
        </p>
        {image && (
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={250}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={scale}
            onImageReady={() => setScale(1)}
            className={classes.canvasIMG}
          />
        )}
        {image && (
          <div className={classes.BtnDiv}>
            <Button onClick={handleSave} className={classes.Btn}>
              Crop Image
            </Button>
          </div>
        )}
      </Modal>
      {croppedImage ? (
        <div className={classes.avtarWrapper}>
          <Image src={croppedImage} alt="avatar" className="text-center" />
        </div>
      ) : (
        <div className={classes.avtarWrapper}>
          <Image src={defaultImage} alt="avatar" className="text-center" />
        </div>
      )}
      <Button
        className="rainbow-m-around_medium d-flex mx-auto defaultThemeButton"
        onClick={(e: any) => handleButtonClick(e)}
      >
        {/* <FontAwesomeIcon icon={faCoffee} className="rainbow-m-right_medium" /> */}
        Add Profile Picture
      </Button>
    </>
  );
};

export default AvatarPicker;
