type Props = {
  text: string;
};

function Divider(props: Props) {
  return (
    <div className="flex items-center pt-6 text-center text-gray-400 before:mr-[1em] before:flex-1 before:border-b before:border-gray-400 before:content-[''] after:ml-[1em] after:flex-1 after:border-b after:border-gray-400 after:content-['']">
      {props.text}
    </div>
  );
}

export default Divider;
