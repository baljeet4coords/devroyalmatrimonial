import classes from './CustomButton.module.scss';

interface ActionCustomButtonProps {
    children: any,
    onClick: () => void;
}

const ActionCustomButton: React.FC<ActionCustomButtonProps> = ({children, onClick }) => {
    return (
        <button type="submit" className={classes.ActioncustomButton} onClick={onClick}>{children}</button>
    )
};

export default ActionCustomButton;