type Props = {
  text: string;
};

function SubmitButton(props: Props) {
  return (
    <button
      type="submit"
      className="bg-primary-1 hover:bg-secondary-2 mt-10 block w-full rounded px-4 py-2 text-white"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
