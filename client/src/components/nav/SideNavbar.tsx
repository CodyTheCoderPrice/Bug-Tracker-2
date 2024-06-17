import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleNavbarExpanded } from "@/features/system/systemSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faClipboard,
  faBug,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function SideNavbar() {
  const dispatch = useAppDispatch();

  const { navbarExpanded } = useAppSelector((state) => state.system);
  return (
    <div
      className={
        "transition-width bg-secondary-1" +
        (navbarExpanded ? " w-[250px]" : " w-[66px]")
      }
    >
      {navbarExpanded ? (
        <>
          {/* Navbar expanded */}
          <div className="h-top-bar flex items-center justify-between">
            <h1 className="ml-5 text-2xl font-bold">LOGO</h1>
            <button
              onClick={() => dispatch(toggleNavbarExpanded())}
              className="mr-5"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
          <nav className="flex flex-col">
            <Link to="/home" className="ml-6 mt-4 text-nowrap text-lg">
              <FontAwesomeIcon icon={faHouse} size="sm" className="mr-2 w-4" />
              Home
            </Link>
            <Link to="/projects" className="ml-6 mt-4 text-nowrap text-lg">
              <FontAwesomeIcon
                icon={faClipboard}
                size="sm"
                className="mr-2 w-4"
              />
              Projects
            </Link>
            <Link to="/bugs" className="ml-6 mt-4 text-nowrap text-lg">
              <FontAwesomeIcon icon={faBug} size="sm" className="mr-2 w-4" />
              Bugs
            </Link>
            <Link to="/comments" className="ml-6 mt-4 text-nowrap text-lg">
              Comments
            </Link>
          </nav>
        </>
      ) : (
        <>
          {/* Navbar minimized */}
          <div className="h-top-bar flex items-center justify-center">
            <button onClick={() => dispatch(toggleNavbarExpanded())}>
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
          <nav className="flex flex-col items-center">
            <span className="mt-4 text-lg">
              <Link to="/home">
                <FontAwesomeIcon icon={faHouse} size="sm" className="w-4" />
              </Link>
            </span>
            <span className="mt-4 text-lg">
              <Link to="/projects">
                <FontAwesomeIcon icon={faClipboard} size="sm" className="w-4" />
              </Link>
            </span>
            <span className="mt-4 text-lg">
              <Link to="/bugs">
                <FontAwesomeIcon icon={faBug} size="sm" className="w-4" />
              </Link>
            </span>
          </nav>
        </>
      )}
    </div>
  );
}

export default SideNavbar;
