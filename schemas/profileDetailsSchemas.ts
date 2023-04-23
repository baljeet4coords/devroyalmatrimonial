import * as Yup from "yup";

export const profileDetailsSchema = Yup.object({
  profileHandlerName: Yup.string()
    .min(3, "Please Enter AtLeast 3 chracter.")
    .required("Profile handler name is required"),
});
