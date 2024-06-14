type Props = {
  text: string;
};

function SubmitButton(props: Props) {
  return (
    <button
      type="submit"
      className="hover:bg-secondary-3 mx-auto mt-10 block w-[95%] rounded-lg bg-secondary-2 px-4 py-2 text-white"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
