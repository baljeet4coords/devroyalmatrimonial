import classes from "./CustomButton.module.scss";

interface CustomButtonProps {
  children: any;
  setEditDetails: (details: boolean) => void;
  buttonType: number;
}

const EditCustomButton: React.FC<CustomButtonProps> = ({
  children,
  setEditDetails,
  buttonType,
}) => {
  return buttonType ? (
    <button
      type="submit"
      className={classes.editcustomButton}
      onClick={() => setEditDetails(false)}
    >
      {children}
    </button>
  ) : (
    <button
      type="submit"
      className={`${classes.editcustomButton} ${classes.editcustomButtonGray}`}
      onClick={() => setEditDetails(false)}
    >
      {children}
    </button>
  );
};

export default EditCustomButton;
