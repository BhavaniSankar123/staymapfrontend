import { Menu, X, ChevronDown, CircleUserRound } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import logo from '/assets/logo1.png'
import { Link, useNavigate } from 'react-router-dom'
import PostPropertyBtn from '@components/PostPropertyBtn'
import { exploreItems, profileItems, ACTION_LOGS_TYPES } from '@utils/Constants'
import allAPIs from '@utils/allAPIs'
import { useToast } from '@components/ToastProvider'
import { useAuth } from '@utils/AuthContext'


const Navbar = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const exploreRef = useRef(null);
  const profileRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();
  const isLoggedIn = isAuthenticated;
  const visibleProfileItems = profileItems
    .filter(item => {
      if (isLoggedIn && item.label === "Login / Register") return false;
      if (!isLoggedIn && item.label === "Logout") return false;
      return true;
    })
    .map(item => {
      if (isLoggedIn && user?.role === 1 && item.label === "My Favourites") {
        return { label: "My Listings", href: "/mylistings" };
      }
      if (isLoggedIn && user?.role === 0 && item.label === "My Listings") {
        return { label: "My Favourites", href: "/favourites" };
      }
      return item;
    });

  const handleExploreClick = () => {
    setExploreOpen(!exploreOpen);
    setOpenProfile(false);
  };

  const handleProfileClick = () => {
    setOpenProfile(!openProfile);
    setExploreOpen(false);
  };

  const addToLogs = async () => {
    const payload = {
      type: ACTION_LOGS_TYPES.LOGGED_OUT,
      role: 0,
      email: formData.email,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    };
    allAPIs.addToLogs(payload)
  };

  const handleLogoutClick = async () => {
    try {
      await allAPIs.logout();
      logout();
      showToast("Logout successful!", "success");
      setOpenProfile(false);
      setMobileDrawerOpen(false);
      addToLogs();
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong. Please try again.";
      showToast(message, "error");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setExploreOpen(false);
        setOpenProfile(false);
      }
      if (
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(event.target)
      ) {
        setMobileDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 py-3 px-4 md:px-10 md:py-2 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img className="h-10 w-10 md:h-10 md:w-10" src={logo} alt="Logo" />
          <span className="text-2xl font-bold text-blue-700 ml-2 hidden md:flex tracking-wide">
            Staymap
          </span>
        </Link>

        <div className="hidden lg:flex items-center">


          <Link to={"/postproperty"}>
            <PostPropertyBtn />
          </Link>
          <div className="relative" ref={exploreRef}>
            <button
              onClick={() => handleExploreClick()}
              className="flex items-center gap-1 py-2 px-4 rounded-md text-sm"
            >
              Explore Us
              <ChevronDown
                size={18}
                className={`transition-transform ${exploreOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {exploreOpen && (
              <div className="absolute left-0 w-32 bg-[#f0f0f0] rounded-md shadow-lg text-sm">
                {exploreItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => handleProfileClick()}
              className="flex items-center gap-1 text-blue-700"
            >
              <CircleUserRound size={28} />
            </button>
            {openProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-[#f0f0f0] rounded-md">
                {isLoggedIn &&
                  <a className="block px-4 py-2 text-blue-700 text-sm font-semibold">
                    Hi, {user?.name?.length > 12 ? `${user.name.slice(0, 12)}...` : user?.name}
                  </a>
                }
                {visibleProfileItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={
                      isLoggedIn && item.label === "Logout"
                        ? (e) => {
                          e.preventDefault();
                          handleLogoutClick();
                        }
                        : undefined
                    }
                    className="block px-4 py-2 text-gray-700 text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <Link to={"/postproperty"}>
            <PostPropertyBtn />
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="ml-1"
          >
            {mobileDrawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileDrawerOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#f0f0f0] shadow-md p-4 flex flex-col items-center space-y-4 lg:hidden"
          ref={mobileDrawerRef}
        >
          <div className="w-full flex flex-col items-center" ref={exploreRef}>
            <button
              onClick={() => handleExploreClick()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#f0f0f0]"
            >
              Explore Us
              <ChevronDown
                size={18}
                className={`transition-transform ${exploreOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            {exploreOpen && (
              <div className="mt-2 w-full bg-[#f0f0f0] rounded-md text-center">
                {exploreItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-center" ref={profileRef}>
            <button
              onClick={() => handleProfileClick()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#f0f0f0]"
            >
              My Profile
              <ChevronDown
                size={18}
                className={`transition-transform ${openProfile ? "rotate-180" : ""
                  }`}
              />
            </button>
            {openProfile && (
              <div className="mt-2 w-full bg-[#f0f0f0] rounded-md text-center">
                {isLoggedIn &&
                  <a className="block px-4 py-2 text-blue-700 text-sm font-semibold">
                    Hi, {user?.name?.length > 12 ? `${user.name.slice(0, 12)}...` : user?.name}
                  </a>
                }
                {visibleProfileItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={
                      isLoggedIn && item.label === "Logout"
                        ? (e) => {
                          e.preventDefault();
                          handleLogoutClick();
                        }
                        : undefined
                    }
                    className="block px-4 py-2 text-gray-700"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
