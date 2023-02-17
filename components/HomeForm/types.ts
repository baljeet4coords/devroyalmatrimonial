export interface SignUpFormValues {
  emailid?: string;
  mobile?: string;
  password?: string;
  countryCode?: string;
}

export interface SignUpForm {
  onSubmitForm: (values: SignUpFormValues) => void;
}
