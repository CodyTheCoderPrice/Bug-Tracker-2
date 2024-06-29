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
        <span
          className={
            "block pt-2 text-sm text-warning-red-light dark:text-warning-red-dark" +
            props.className
          }
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="lg"
            className="ml-1 mr-2"
          />
          {props.message}
        </span>
      )}
    </>
  );
}

export default ErrorMessage;
