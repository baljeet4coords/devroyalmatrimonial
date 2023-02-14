import countryCodes from "country-codes-list";

export const countryCodesObj = countryCodes.customList(
  "countryNameEn",
  "+{countryCallingCode}"
);
