import classes from "./CustomButton.module.scss";

interface CustomButtonProps {
  title: any;
  setEditDetails: (details: boolean) => void;
  buttonType: number;
}

const EditCustomButton: React.FC<CustomButtonProps> = ({
  title,
  setEditDetails,
  buttonType,
}) => {
  return buttonType ? (
    <button
      type="submit"
      className={classes.editcustomButton}
      onClick={() => setEditDetails(false)}
    >
      {title}
    </button>
  ) : (
    <button
      type="submit"
      className={`${classes.editcustomButton} ${classes.editcustomButtonGray}`}
      onClick={() => setEditDetails(false)}
    >
      {title}
    </button>
  );
};

export default EditCustomButton;
