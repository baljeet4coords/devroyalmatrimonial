import { Image } from "react-bootstrap";

interface Errors {
  error: string | any;
}
const Errors: React.FC<Errors> = ({ error }) => {
  return (
    <div className="py-2">
      <Image src="./error2.svg" width={23} height={23} alt="error" className="pe-1" />
      {error}
    </div>
  );
};

export default Errors;
