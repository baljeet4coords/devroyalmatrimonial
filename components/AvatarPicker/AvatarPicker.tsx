import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button } from "react-bootstrap";
import classes from "./AvtarPicker.module.scss";

interface AvatarPickerProps {
  onGetAvatar: ({
    name,
    image,
    fileObj,
  }: {
    name: string;
    image: string;
    fileObj: File | null;
  }) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onGetAvatar }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileExt, setFilExt] = useState<string>();
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files?.[0];
    setFileName(String(file?.lastModified));
    setFilExt(file?.type.split("/")[1]);
    if (files && files.length > 0) {
      setFileObj(files[0]);
    }
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImage().toDataURL();
    onGetAvatar({
      name: `${fileName}.${fileExt}`,
      image: canvas,
      fileObj: fileObj,
    });
  };

  return (
    <>
      <input
        type="file"
        onChange={handleImageChange}
        accept=".jpg,.jpeg,.png"
        id="profilepic"
        name="profilepic"
        className={classes.Profile_input}
      />
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
    </>
  );
};

export default AvatarPicker;
