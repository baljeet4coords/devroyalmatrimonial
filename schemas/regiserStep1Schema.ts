import * as Yup from "yup";

export const regiserStep1Schema = Yup.object().shape({
  myImageField: Yup.mixed()
    .test(
      "fileFormat",
      "Only PNG, JPG, and JPEG images are allowed",
      function (value) {
        console.log(value, 'vall');
        if (value) {
          return ["image/png", "image/jpg", "image/jpeg"].includes(value);
        }
        return true;
      }
    )
    .required("This field is required"),
});
