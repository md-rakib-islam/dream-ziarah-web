"use client";
import { useGetAllMenuQuery } from "@/features/menu/menuApi";
import { addMenuItems } from "@/features/menu/menuSlice";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import { clearAuthState, logoutUserThunk } from "@/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import MainMenu from "../MainMenu";
import MobileCurrencyMenu from "../MobileCurrencyMenu";
import MobileMenu from "../MobileMenu";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);

  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const {
    data,
    isSuccess: logoSuccess,
    isLoading: logoLoading,
  } = useGetLogoUrlQuery(null);
  const { data: menuData, isSuccess: menuSuccess } = useGetAllMenuQuery(null);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 10);
    };
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    if (menuSuccess) {
      dispatch(addMenuItems(menuData?.menus));
    }
  }, [dispatch, menuSuccess, menuData]);

  const logoUrl = logoSuccess
    ? data?.general_settings[0].cloudflare_favicon
    : "";

  return (
    <>
      {!logoLoading && (
        <header className={`header bg-white ${navbar ? "is-sticky" : ""}`}>
          <div className="header__container px-30 sm:px-20">
            <div className="row justify-between items-center">
              <div className="col-auto header_logo_left_space">
                <div className="d-flex items-center">
                  <Link href="/" className="header-logo mr-20">
                    <Image
                      unoptimized
                      quality={100}
                      style={{ width: "60px", height: "60px" }}
                      src={logoLoading ? "/img/logo_loading.webp" : logoUrl}
                      width={128}
                      height={128}
                      alt="Hajj, Umrah and Ziarah"
                    />
                  </Link>
                  <div className="header-menu">
                    <div className="header-menu__content">
                      <MainMenu style="text-dark-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex items-center">
                  {/* Login Section */}
                  <div className="header-login-section mr-20 xxl:d-none">
                    {isAuthenticated ? (
                      <div className="user-menu-wrapper">
                        <a
                          href="#"
                          className="user-menu-trigger d-flex items-center gap-1 text-dark-1"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="icon-user text-14"></i>
                          <span className="fw-500">{user?.first_name}</span>
                          <i className="icon icon-chevron-sm-down ml-5 text-10" />
                        </a>
                        <ul className="user-dropdown-menu">
                          <li>
                            <button
                              onClick={() => router.push("/dashboard")}
                              className="user-dropdown-item"
                            >
                              <i className="icon-route text-14"></i>
                              <span>Dashboard</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="user-dropdown-item"
                            >
                              <i className="icon-route text-14 "></i>
                              <span>Logout</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="d-flex items-center gap-1 text-dark-1"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="icon-login text-14"></i>
                        <span className="fw-500">Login</span>
                      </Link>
                    )}
                  </div>

                  {/* WhatsApp Icon */}
                  <a
                    className="btn-whatsapp-pulse whatsapp_icon mr-20"
                    href="https://api.whatsapp.com/send/?phone=966548037409&amp;text=Hi DreamZiarah, I need assistance&amp;type=phone_number&amp;lang=en"
                    target="_blank"
                  >
                    <Image
                      style={{ cursor: "pointer" }}
                      src="/img/whatsapp.svg"
                      width={30}
                      height={30}
                      alt="images"
                    />
                  </a>

                  {/* Currency Menu */}
                  <div className="row x-gap-20 items-center xxl:d-none">
                    <CurrenctyMegaMenu textClass="text-dark-1" />
                    <div className="col-auto">
                      <div className="w-1 h-20 bg-white-20" />
                    </div>
                  </div>

                  {/* Mobile Menu */}
                  <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-dark-1">
                    <div>
                      <MobileCurrencyMenu />
                    </div>
                    <div>
                      <button
                        className="d-flex items-center icon-menu text-inherit text-20"
                        data-bs-toggle="offcanvas"
                        aria-controls="mobile-sidebar_menu"
                        data-bs-target="#mobile-sidebar_menu"
                      />
                      <div
                        className="offcanvas offcanvas-start  mobile_menu-contnet"
                        tabIndex="-1"
                        id="mobile-sidebar_menu"
                        aria-labelledby="offcanvasMenuLabel"
                        data-bs-scroll="true"
                      >
                        <MobileMenu />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <style jsx>{`
        /* Custom User Menu Styles */
        .user-menu-wrapper {
          position: relative;
        }

        .user-menu-trigger {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          transition: all 0.3s ease;
        }

        .user-menu-trigger:hover {
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        .user-dropdown-menu {
          position: absolute;
          top: 100%;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid #e9ecef;
          min-width: 160px;
          padding: 8px 0;
          margin: 4px 0 0 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          list-style: none;
        }

        .user-menu-wrapper:hover .user-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .user-dropdown-item {
          width: 100%;
          background: none;
          border: none;
          padding: 10px 16px;
          text-align: left;
          color: #333;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
        }

        .user-dropdown-item:hover {
          background-color: #f8f9fa;
          color: #0d6efd;
        }

        /* Mobile dropdown adjustments */
        .mobile-login-section .dropdown-menu {
          right: 0;
          left: auto;
        }
      `}</style>
    </>
  );
};

export default Header;
