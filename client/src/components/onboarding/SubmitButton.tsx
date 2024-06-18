type Props = {
  text: string;
};

function SubmitButton(props: Props) {
  return (
    <button
      type="submit"
      className="mx-auto mt-10 block w-[95%] rounded-lg bg-primary-1 px-4 py-2 text-white hover:bg-primary-2"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
