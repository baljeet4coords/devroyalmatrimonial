export const feetToCm = (feet: string) => {
  const cm = +feet * 30.48;
  const cm_fix = cm.toFixed(2);
  return cm_fix;
};

export const cmToFeet = (cm: string) => {
  const feet = +cm / 30.48;
  const ft_fix = feet.toFixed(2);
  return ft_fix;
};
