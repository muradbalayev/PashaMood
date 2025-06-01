import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";
import menuLogo from "../../../assets/pashalogo.png";
import logo from "../../../assets/logo.png";

import gsap from "gsap";
import { User } from "lucide-react";
import menuImg from "../../../assets/menu-img.jpg";

import Button from "../../../components/common/Button";

const Menu = ({ isOpen, setIsOpen, isDark }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const menuColsRef = useRef([]);
  const menuOverlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuCloseRef = useRef(null);
  const menuFooterRef = useRef(null);
  const menuPatternRef = useRef(null);
  const menuBgRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navigationTimeoutRef = useRef(null);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      gsap.set(menuColsRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
      gsap.set(menuOverlayRef.current, {
        pointerEvents: "none",
      });
      gsap.set(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 0,
        }
      );
      gsap.set(menuPatternRef.current, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(menuBgRef.current, {
        xPercent: -10,
        opacity: 0,
      });
      setIsOpen(false);
    }, 750);

    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [location.pathname, setIsOpen]);

  const handleMenuOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    timeline
      .to(menuColsRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger: 0.125,
        ease: "power4.inOut",
      })
      .set(menuOverlayRef.current, {
        pointerEvents: "all",
      })
      .to(
        menuBgRef.current,
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.inOut",
        },
        "-=2"
      )

      .to(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.075,
          ease: "power2.out",
        },
        "-=1.5"
      );

    setIsOpen(true);
  };

  const handleMenuClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    timeline
      .to(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 0,
          duration: 0.5,
          stagger: 0.075,
          ease: "power2.in",
        }
      )
      .set(menuOverlayRef.current, {
        pointerEvents: "none",
      })
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .to(
        menuBgRef.current,
        {
          xPercent: -10,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in",
        },
        "-=1"
      )
      .to(
        menuColsRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.125,
          ease: "power4.inOut",
        },
        "-=0.8"
      );

    setIsOpen(false);
  };

  const handleNavigation = (to) => (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(to);
    }, 0);
  };

  const addToRefs = (el) => {
    if (el && !menuColsRef.current.includes(el)) {
      menuColsRef.current.push(el);
    }
  };

  const addToMenuItemsRef = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  return (
    <div className={`menu px-7`}>
      <div className={`menu-bar  py-4 sm:px-6 px-4  ${isHomePage ? "dark" : "bg-white"}`} >
        <div className="">
          <Link
            className="flex items-center md:w-44 w-28 "
            to="/"
            onClick={handleNavigation("/")} 
          >
            <img src={logo} alt="logo" className="w-full h-full object-cover"/>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <Link
            to="/profile"
            className={`p-3 rounded-full overflow-hidden cursor-pointer ${
              !isHomePage ? " bg-[#c50b30]" : " bg-[#c50b30]"
            }`}
          >
            <User
              className={` ${!isHomePage ? "text-white" : "text-white"} sm:size-7 `}
            />
          </Link>
          <p
            onClick={handleMenuOpen}
            className={` px-4 py-2 rounded-full border bg-[#007d56] font-semibold sm:text-[24px] text-[20px] ${
              !isHomePage ? "text-white" : "text-white"
            }`}
          >
            Menu
          </p>
        </div>
      </div>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-col" ref={addToRefs}>
          <div className="menu-bg" ref={menuBgRef}>
            <img
              src={menuLogo}
              alt="Menu Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="menu-col" ref={addToRefs}>
          <div
            className="menu-close px-4 py-2"
            ref={menuCloseRef}
            onClick={handleMenuClose}
          >
            <p>Close</p>
          </div>

          <div className="menu-items ">
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link to="/" onClick={handleNavigation("/")}>
                  Home
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link to="/profile" onClick={handleNavigation("/profile")}>
                  Profile
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link to="/partners" onClick={handleNavigation("/partners")}>
                  Partners
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link to="/game" onClick={handleNavigation("/game")}>
                  Game
                </Link>
              </p>
            </div>
            {/* <div className="pt-5">
              <Button text="Dashboard" href="/teacher/auth" />
            </div> */}
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Menu;
