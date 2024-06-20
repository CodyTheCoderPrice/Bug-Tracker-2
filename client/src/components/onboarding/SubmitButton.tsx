type TProps = {
  text: string;
};

function SubmitButton(props: TProps) {
  return (
    <button
      type="submit"
      className="bg-primary-100 hover:bg-primary-200 mx-auto mt-10 block w-[95%] rounded-lg px-4 py-2 text-white"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
