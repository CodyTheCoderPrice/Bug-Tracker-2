import { useAppDispatch, useAppSelector } from "@/app/hooks";
import logo from "@/assets/logo_bug_tracker.svg";
import { toggleNavbarExpanded } from "@/features/system/systemSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import menuHomeIcon from "@/assets/icons/icon_menu_home.svg";
import menuProjectsIcon from "@/assets/icons/icon_menu_projects.svg";
import menuBugsIcon from "@/assets/icons/icon_menu_bugs.svg";

function SideNavbar() {
  const dispatch = useAppDispatch();

  const { navbarExpanded } = useAppSelector((state) => state.system);
  return (
    <div
      className={
        "bg-primary-2 text-gray-50 shadow transition-width" +
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
              className="hover:bg-primary-3 text-nowrap py-3 pl-6 text-lg"
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
              className="hover:bg-primary-3 text-nowrap py-3 pl-6 text-lg"
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
              className="hover:bg-primary-3 text-nowrap py-3 pl-6 text-lg"
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
              className="hover:bg-primary-3 text-nowrap py-3 pl-6 text-lg"
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
              className="hover:bg-primary-3 py-3 text-center text-lg"
            >
              <img
                src={menuHomeIcon}
                alt="home icon"
                className="inline-block w-6"
              />
            </Link>
            <Link
              to="/projects"
              className="hover:bg-primary-3 py-3 text-center text-lg"
            >
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className="inline-block w-6"
              />
            </Link>
            <Link
              to="/bugs"
              className="hover:bg-primary-3 py-3 text-center text-lg"
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
