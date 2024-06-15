import { Link } from "react-router-dom";

function SideNavbar() {
  return (
    <nav className="w-[250px] bg-secondary-1">
      <Link to="/home" className="block">
        Home
      </Link>
      <Link to="/projects" className="block">
        Projects
      </Link>
      <Link to="/bugs" className="block">
        Bugs
      </Link>
      <Link to="/comments" className="block">
        Comments
      </Link>
    </nav>
  );
}

export default SideNavbar;
