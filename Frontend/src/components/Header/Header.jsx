import React, { useState } from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";

// const options = [
//   "None",
//   "Atria",
//   "Callisto",
//   "Dione",
//   "Ganymede",
//   "Hangouts Call",
//   "Luna",
//   "Oberon",
//   "Phobos",
//   "Pyxis",
//   "Sedna",
//   "Titania",
//   "Triton",
//   "Umbriel",
// ];

const ITEM_HEIGHT = 48;

const Header = () => {
  // To Access the store we use UseSelector
  const authStatus = useSelector((state) => state.auth.status);
  // useNavigate is also like a router
  const navigate = useNavigate();

  const navItem = [
    {
      name: "Home",
      slug: "/", //url
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="py-3  shadow bg-[#3f418d] border-b-4 border-white text-[#f9eded] ">
      <div className="sm:hidden relative">
        <MenuIcon
          className="ml-4 hover:scale-1 hover:bg-white hover:rounded-full hover:text-indigo-400 "
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </MenuIcon>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {authStatus ? (
            <div>
              {navItem
                .filter((option) => option.active)
                .map((option) => (
                  <MenuItem key={option} onClick={handleClose}>
                    <button onClick={() => navigate(option.slug)}>
                      {option.name}
                    </button>
                  </MenuItem>
                ))}
            </div>
          ) : (
            <div>
              {navItem.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  <button onClick={() => navigate(option.slug)}>
                    {option.name}
                  </button>
                </MenuItem>
              ))}
            </div>
          )}
        </Menu>
        {authStatus && (
          <li className="absolute right-3 -top-2 flex items-center justify-center  ">
            <LogoutBtn />
          </li>
        )}
        {!authStatus && (
          <li className="absolute right-3 -top-2  flex items-center justify-center ">
            <Link to="/signup">
              <button className=" p-3 hover:underline">Signup</button>
            </Link>
          </li>
        )}
      </div>
      <Container>
        <nav className="md:flex items-center font-bold text-lg hidden sm:block ">
          <div className="sm:mr-4 ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex gap-7  items-center  sm:ml-auto">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock   sm:px-6 sm:py-2 duration-200  hover:text-[#3f418d] hover:bg-[#f9eded] rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="border  ">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
