type TProps = {
  text: string;
};

function Header(props: TProps) {
  return <h1 className="pt-10 text-4xl font-bold">{props.text}</h1>;
}

export default Header;
