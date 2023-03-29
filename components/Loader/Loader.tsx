import classes from '../Loader/Loader.module.scss'

const Loader = () => {
  return (
    <>
      <div className={classes.Loader}>
        <div>
          <div className={classes.loadermain} />
          <p className={classes.loadingheading}>Loading..</p>
        </div>
      </div>
    </>
  );
};

export default Loader;
