type Props = {
  text: string;
};

function Header(props: Props) {
  return <h1 className="pt-6 text-4xl font-bold">{props.text}</h1>;
}

export default Header;
