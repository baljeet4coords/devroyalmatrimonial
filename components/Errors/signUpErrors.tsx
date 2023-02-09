import { Image } from "react-bootstrap";

interface Errors {
  error: string;
}
const SignUpError: React.FC<Errors> = ({ error }) => {
  return (
    <div className="py-2">
      <Image src="./error.png" alt="error" className="pe-1" />
      {error}
    </div>
  );
};

export default SignUpError;
