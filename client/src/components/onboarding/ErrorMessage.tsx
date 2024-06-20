import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  message: string | undefined;
  className?: string;
};

function ErrorMessage(props: TProps) {
  return (
    <>
      {props.message && (
        <p className={"text-warning-red-light pt-2 text-sm " + props.className}>
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
          <span className="pl-3">{props.message}</span>
        </p>
      )}
    </>
  );
}

export default ErrorMessage;
