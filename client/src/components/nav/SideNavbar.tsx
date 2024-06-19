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

  // Shared classNames
  const logoContainerShared = "h-top-bar flex items-center";
  const navShared = "mt-2 flex flex-col";
  const linkExpandedShared =
    "text-nowrap py-3 pl-6 text-lg hover:bg-primary-3 hover:dark:bg-primary-4 ";
  const linkMiniShared =
    "py-3 text-center text-lg hover:bg-primary-3 hover:dark:bg-primary-4";
  const iconShared = "inline-block w-6";
  const iconExpandedShared = "mr-3 " + iconShared;
  const iconMiniShared = " " + iconShared;

  return (
    <div
      className={
        "shrink-0 bg-primary-2 text-gray-50 shadow transition-width dark:bg-primary-3" +
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
            <Link to="/home" className={linkExpandedShared}>
              <img
                src={menuHomeIcon}
                alt="home icon"
                className={iconExpandedShared}
              />
              Home
            </Link>
            <Link to="/projects" className={linkExpandedShared}>
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className={iconExpandedShared}
              />
              Projects
            </Link>
            <Link to="/bugs" className={linkExpandedShared}>
              <img
                src={menuBugsIcon}
                alt="bugs icon"
                className={iconExpandedShared}
              />
              Bugs
            </Link>
            <Link to="/comments" className={linkExpandedShared}>
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
            <Link to="/home" className={linkMiniShared}>
              <img
                src={menuHomeIcon}
                alt="home icon"
                className={iconMiniShared}
              />
            </Link>
            <Link to="/projects" className={linkMiniShared}>
              <img
                src={menuProjectsIcon}
                alt="projects icon"
                className={iconMiniShared}
              />
            </Link>
            <Link to="/bugs" className={linkMiniShared}>
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
