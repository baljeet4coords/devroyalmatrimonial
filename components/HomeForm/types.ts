export interface FormValues {
  emailid: string;
  mobile: string;
  password: string;
  countryCode: string;
}

export interface SignUpForm {
  onSubmitForm: (values: FormValues) => void;
}
