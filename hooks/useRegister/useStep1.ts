import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { convertTimeStamp } from "../../utils/dayjs";

const registerUser = async (values: any) => {
  const formData = new FormData();

  formData.append("userId", String(values.userId));
  formData.append("profilefor", String(values.profilefor));
  formData.append("profileHandlerName", String(values.profileHandlerName));
  formData.append("dob", String(values.dob && convertTimeStamp(values.dob)));
  formData.append("selectgender", String(values.selectgender));
  formData.append("fullname", String(values.fullname));
  formData.append("cast", String(values.cast));
  formData.append("challenged", String(values.challenged));
  formData.append("isHiv", String(values.isHiv));
  formData.append("mothertongue", String(values.mothertongue));
  formData.append("religion", String(values.religion));
  formData.append("isManglik", String(values.isManglik));
  formData.append("maritalstatus", String(values.maritalstatus));
  formData.append("childrenstatus", String(values.childrenstatus));
  formData.append("height", String(values.height));
  formData.append("profilepic", String(values.profilepic));
  formData.append("image", values.image);

  if (values.isReduxEmpty) {
    formData.append("actionType", "c");
  } else {
    formData.append("actionType", "u");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 1 form");
  }
};

export const useStep1Register = () => {
  const registerUserMutation = useMutation(registerUser);

  const Step1Query = () => {
    const { data, isLoading, error } = useQuery("step1", () => registerUser);

    return { data, isLoading, error };
  };

  return {
    registerUserMutation,
    Step1Query,
  };
};
