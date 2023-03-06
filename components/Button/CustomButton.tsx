import classes from './CustomButton.module.scss';

interface CustomButtonProps {
    children: any,
    onClick: () => void;
}

const CustomButton:React.FC<CustomButtonProps> = ({ children, onClick }) => {
  return (
    <button type="submit" className={classes.customButton} onClick={onClick}>{children}</button>
  )
};

export default CustomButton;