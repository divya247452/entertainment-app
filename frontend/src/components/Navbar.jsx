import React, { useState, useRef, useEffect } from "react";
import { MdMovieCreation } from "react-icons/md";
import { SiWindows } from "react-icons/si";
import { PiFilmStripFill } from "react-icons/pi";
import { IoBookmark } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { PiTelevisionFill } from "react-icons/pi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const useCurrentPage = () => {
  const location = useLocation();
  
    // Extract the pathname
  const path = location.pathname;
  
    // Determine which page the user is on
  const currentPage = path === '/' ? 'home'
                    : path.startsWith('/bookmarks') ? 'bookmarks'
                    : path.startsWith('/movies') ? 'movies'
                    : path.startsWith('/tvseries') ? 'tvseries'
                    : 'unknown';

  return currentPage;
};

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Logs Out the user
  const [logoutApi] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const currentPage = useCurrentPage();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the dropdownRef is defined and if the click target is outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky z-10 top-0 md:max-h-[90vh] shadow-lg flex rounded-lg md:flex-col bg-gun-metal items-center justify-between p-2 md:py-3 md:px-0 z-50">
      <div className="flex md:flex-col md:gap-[60px] items-center justify-between flex-grow md:flex-grow-0">
        <Link to="/" aria-label="Home">
          <MdMovieCreation size={36} className="text-custom-red" />
        </Link>

        <div className={`flex md:flex-col gap-4 items-center flex-grow md:flex-grow-0 justify-center md:justify-between`}>
          <Link to="/" aria-label="Home">
            <SiWindows className={`${currentPage === 'home' ? 'text-white' : 'text-custom-light-blue'}`} size={18} />
          </Link>
          <Link to="/movies" aria-label="movies">
            <PiFilmStripFill size={26} className={`rotate-90 ${currentPage === 'movies' ? 'text-white' : 'text-custom-light-blue'}`} />
          </Link>
          <Link to="/tvseries" aria-label="Tv Series">
            <PiTelevisionFill className={`${currentPage === 'tvseries' ? 'text-white' : 'text-custom-light-blue'}`} size={24} />
          </Link>
          <Link to="/bookmarks" aria-label="Bookmarks">
            <IoBookmark className={`${currentPage === 'bookmarks' ? 'text-white' : 'text-custom-light-blue'}`} size={24} />
          </Link>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        {userInfo ? (
          <>
            <button
              onClick={handleDropdownToggle}
              className="flex items-center rounded-full px-3 text-[32px] font-medium text-gray-900 bg-red-500 rounded-full shadow-sm hover:bg-white"
            >
              {userInfo.name[0]}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 md:left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-1">
                  <p
                    onClick={logoutHandler}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" aria-label="Login">
            <FaCircleUser size={32} className="text-red-500" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
