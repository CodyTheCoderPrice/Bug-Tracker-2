import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleNavbarExpanded } from "@/features/system/systemSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/logo_menu.svg";
import menuHomeIcon from "@/assets/icons/icon_menu_home.svg";
import menuProjectsIcon from "@/assets/icons/icon_menu_projects.svg";
import menuBugsIcon from "@/assets/icons/icon_menu_bugs.svg";

function SideNavbar() {
  const dispatch = useAppDispatch();

  const { navbarExpanded } = useAppSelector((state) => state.system);
  return (
    <div
      className={
        "shrink-0 bg-primary-2 text-gray-50 shadow transition-width" +
        (navbarExpanded ? " w-[260px]" : " w-[66px]")
      }
    >
      {navbarExpanded ? (
        <>
          {/* Navbar expanded */}
          <div className="h-top-bar flex items-center justify-between">
            <img
              src={logo}
              alt="LOGO: Bug Tracker"
              className="ml-3 w-[170px]"
            />
            <button
              onClick={() => dispatch(toggleNavbarExpanded())}
              className="mr-5"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
          <nav className="flex flex-col">
            <Link
              to="/home"
              className="text-nowrap py-3 pl-6 text-lg hover:bg-primary-3"
            >
              <img
                src={menuHomeIcon}
                alt="home icon"
                className="mr-3 inline-block w-6"
              />
              Home
            </Link>
            <Link
              to="/projects"
              className="text-nowrap py-3 pl-6 text-lg hover:bg-primary-3"
            >
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className="mr-3 inline-block w-6"
              />
              Projects
            </Link>
            <Link
              to="/bugs"
              className="text-nowrap py-3 pl-6 text-lg hover:bg-primary-3"
            >
              <img
                src={menuBugsIcon}
                alt="bugs icon"
                className="mr-3 inline-block w-6"
              />
              Bugs
            </Link>
            <Link
              to="/comments"
              className="text-nowrap py-3 pl-6 text-lg hover:bg-primary-3"
            >
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
          <nav className="flex flex-col">
            <Link
              to="/home"
              className="py-3 text-center text-lg hover:bg-primary-3"
            >
              <img
                src={menuHomeIcon}
                alt="home icon"
                className="inline-block w-6"
              />
            </Link>
            <Link
              to="/projects"
              className="py-3 text-center text-lg hover:bg-primary-3"
            >
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className="inline-block w-6"
              />
            </Link>
            <Link
              to="/bugs"
              className="py-3 text-center text-lg hover:bg-primary-3"
            >
              <img
                src={menuBugsIcon}
                alt="bugs icon"
                className="inline-block w-6"
              />
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}

export default SideNavbar;
