import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faClipboard, faBug } from "@fortawesome/free-solid-svg-icons";

function SideNavbar() {
  const linkStyle = "ml-4 mt-2 block text-lg";

  return (
    <nav className="w-[250px] bg-secondary-1">
      <div className="h-top-bar flex items-center justify-center">
        <h1 className="text-2xl font-bold">LOGO</h1>
      </div>
      <Link to="/home" className={linkStyle}>
        <FontAwesomeIcon icon={faHouse} size="sm" className="mr-2 w-4" />
        Home
      </Link>
      <Link to="/projects" className={linkStyle}>
        <FontAwesomeIcon icon={faClipboard} size="sm" className="mr-2 w-4" />
        Projects
      </Link>
      <Link to="/bugs" className={linkStyle}>
        <FontAwesomeIcon icon={faBug} size="sm" className="mr-2 w-4" />
        Bugs
      </Link>
      <Link to="/comments" className={linkStyle}>
        Comments
      </Link>
    </nav>
  );
}

export default SideNavbar;
