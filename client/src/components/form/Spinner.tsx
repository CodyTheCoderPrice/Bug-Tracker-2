type TProps = {
  className?: string;
};

function Spinner(props: TProps) {
  return (
    <div
      className={
        props.className +
        " ml-2 inline-block h-[30px] w-[30px] rounded-[50%] bg-gradient-to-r from-[#0000] to-primary-300 p-[8px]"
      }
    />
  );
}

export default Spinner;
