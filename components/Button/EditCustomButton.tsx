import classes from "./CustomButton.module.scss";

interface CustomButtonProps {
  childComponent: "Save" | "Cancel";
  setEditDetails: (details: boolean) => void;
  buttonType: number;
}

const EditCustomButton: React.FC<CustomButtonProps> = ({
  childComponent,
  setEditDetails,
  buttonType,
}) => {
  return buttonType ? (
    <button
      type="submit"
      className={classes.editcustomButton}
      onClick={() => setEditDetails(false)}
    >
      {childComponent}
    </button>
  ) : (
    <button
      type="submit"
      className={`${classes.editcustomButton} ${classes.editcustomButtonGray}`}
      onClick={() => setEditDetails(false)}
    >
      {childComponent}
    </button>
  );
};

export default EditCustomButton;
