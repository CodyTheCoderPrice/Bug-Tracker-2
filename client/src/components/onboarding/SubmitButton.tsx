type TProps = {
  text: string;
};

function SubmitButton(props: TProps) {
  return (
    <button
      type="submit"
      className="mx-auto mt-10 block w-[95%] rounded-lg bg-primary-200 px-4 py-2 text-white hover:bg-primary-300"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
