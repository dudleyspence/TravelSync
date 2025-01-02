import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/TravelSyncLogo.png";
import { FaSignOutAlt, FaMapMarkedAlt } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { CreateItinerary } from "./CreateItinerary";
import { JoinItinerary } from "./JoinItinerary";

function NavList({ setOpenNav }) {
  const { signOutUser } = useAuth();
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 p-3">
      <CreateItinerary setOpenNav={setOpenNav} />
      <JoinItinerary setOpenNav={setOpenNav} />

      <Button
        className="flex flex-row items-center gap-2"
        onClick={() => {
          signOutUser();
        }}
      >
        <FaSignOutAlt size={18} />
        Sign Out
      </Button>
    </ul>
  );
}

export function DashboardNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-2 z-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <img src={logo} alt="logo" className="h-12" />
        <div className="hidden lg:block">
          <NavList setOpenNav={setOpenNav} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse
        className="absolute rounded-lg top-[60px] right-0 w-[300px] bg-white shadow-md lg:hidden"
        open={openNav}
      >
        <NavList setOpenNav={setOpenNav} />
      </Collapse>
    </Navbar>
  );
}
