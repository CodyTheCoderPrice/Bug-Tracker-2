import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleNavbarExpanded } from "@/features/system/systemSlice";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/logo_menu.svg";
import menuHomeIcon from "@/assets/icons/icon_menu_home.svg";
import menuProjectsIcon from "@/assets/icons/icon_menu_projects.svg";
import menuBugsIcon from "@/assets/icons/icon_menu_bugs.svg";

function SideNavbar() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { navbarExpanded } = useAppSelector((state) => state.system);

  // Shared classNames
  const logoContainerShared = " h-top-bar flex items-center ";
  const navShared = " mt-2 flex flex-col ";
  const linkShared = " text-lg hover:bg-primary-400 hover:dark:bg-primary-500 ";
  const linkExpandedShared = " text-nowrap py-3 pl-6" + linkShared;
  const linkMiniShared = " py-3 text-center" + linkShared;
  const linkSelectedShared = (path: string) => {
    return location.pathname === path ? " text-secondary-100 " : "";
  };
  const iconShared = " inline-block w-6 ";
  const iconExpandedShared = " mr-3 " + iconShared;
  const iconMiniShared = " " + iconShared;

  return (
    <div
      className={
        "shrink-0 overflow-visible bg-primary-300 text-gray-50 shadow transition-width duration-200 dark:bg-primary-400" +
        (navbarExpanded ? " w-[260px]" : " w-[66px]")
      }
    >
      {navbarExpanded ? (
        <>
          {/* Navbar expanded */}
          <div className={logoContainerShared + " justify-between"}>
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
          <nav className={navShared}>
            <Link
              to="/home"
              className={linkExpandedShared + linkSelectedShared("/home")}
            >
              <img
                src={menuHomeIcon}
                alt="home icon"
                className={iconExpandedShared}
              />
              Home
            </Link>
            <Link
              to="/projects"
              className={linkExpandedShared + linkSelectedShared("/projects")}
            >
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className={iconExpandedShared}
              />
              Projects
            </Link>
            <Link
              to="/bugs"
              className={linkExpandedShared + linkSelectedShared("/bugs")}
            >
              <img
                src={menuBugsIcon}
                alt="bugs icon"
                className={iconExpandedShared}
              />
              Bugs
            </Link>
            <Link
              to="/comments"
              className={linkExpandedShared + linkSelectedShared("/comments")}
            >
              Comments
            </Link>
          </nav>
        </>
      ) : (
        <>
          {/* Navbar minimized */}
          <div className={logoContainerShared + " justify-center"}>
            <button onClick={() => dispatch(toggleNavbarExpanded())}>
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
          <nav className={navShared}>
            <Link
              to="/home"
              className={linkMiniShared + linkSelectedShared("/home")}
            >
              <img
                src={menuHomeIcon}
                alt="home icon"
                className={iconMiniShared}
              />
            </Link>
            <Link
              to="/projects"
              className={linkMiniShared + linkSelectedShared("/projects")}
            >
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className={iconMiniShared}
              />
            </Link>
            <Link
              to="/bugs"
              className={linkMiniShared + linkSelectedShared("/bugs")}
            >
              <img
                src={menuBugsIcon}
                alt="bugs icon"
                className={iconMiniShared}
              />
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}

export default SideNavbar;
