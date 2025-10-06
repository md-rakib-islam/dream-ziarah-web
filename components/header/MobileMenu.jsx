"use client";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";
import { useGetLogoUrlQuery } from "@/features/site-setting/siteSettingApi";
import useMenus from "@/hooks/useMenus";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { isActiveLink } from "../../utils/linkActiveChecker";
import Social from "../common/social/Social";
import ContactInfo from "./ContactInfo";
import { useAuth } from "@/context/AuthContext";

const MobileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = useMenus();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const { data, isSuccess, isLoading } = useGetLogoUrlQuery(null);

  let logoUrl = "";

  if (isSuccess) {
    logoUrl = `${data?.general_settings[0].cloudflare_favicon}`;
  }

  const currentPathName =
    pathname.split("/")[1] === "destinations"
      ? "/destinations"
      : pathname.split("/")[1] === "blog-details"
      ? "/blog"
      : pathname;

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              style={{ width: "60px", height: "60px" }}
              src={logoUrl}
              width={128}
              height={128}
              alt="Hajj, Umrah and Ziarah"
            />
          )}
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          {menuItems?.map((menu) => {
            if (menu?.children.length === 0) {
              return (
                <MenuItem
                  key={menu.id}
                  onClick={() => router.push(menu?.routePath)}
                  data-bs-dismiss="offcanvas"
                  className={
                    pathname === menu?.routePath
                      ? "menu-active-link fw-500"
                      : "fw-500"
                  }
                >
                  {menu.name}
                </MenuItem>
              );
            } else {
              return (
                <SubMenu
                  key={menu.id}
                  label={menu?.name}
                  className={
                    menu?.children?.some(
                      (item) =>
                        item.routePath?.split("/")[1] ==
                        currentPathName.split("/")[1]
                    )
                      ? "menu-active-link fw-500"
                      : "fw-500"
                  }
                >
                  {menu?.children?.map((item, i) => (
                    <MenuItem
                      data-bs-dismiss="offcanvas"
                      key={item.id}
                      onClick={() => router.push(item.routePath)}
                      className={
                        isActiveLink(item.routePath, pathname)
                          ? "menu-active-link fw-400"
                          : "inactive-menu fw-400"
                      }
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            }
          })}

          <MenuItem
            data-bs-dismiss="offcanvas"
            onClick={() => router.push("/contact")}
            className={
              pathname === "/contact" ? "menu-active-link fw-500" : "fw-500"
            }
          >
            Contact
          </MenuItem>
          {/* End Contact Menu */}

          {/* ✅ Mobile Login Section as Menu Item */}
          {isAuthenticated ? (
            <SubMenu
              label={
                <div className="d-flex items-center gap-1">
                  <i className="icon-user text-16"></i>
                  <span className="fw-500">{user?.first_name}</span>
                </div>
              }
              className="fw-500"
            >
              <MenuItem
                data-bs-dismiss="offcanvas"
                onClick={() => router.push("/dashboard")}
                className="fw-400"
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="icon-route text-14"></i>
                  <span>Dashboard</span>
                </div>
              </MenuItem>
              <MenuItem
                data-bs-dismiss="offcanvas"
                onClick={handleLogout}
                className="fw-400"
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="icon-route text-14"></i>
                  <span>Logout</span>
                </div>
              </MenuItem>
            </SubMenu>
          ) : (
            <MenuItem
              data-bs-dismiss="offcanvas"
              onClick={() => router.push("/login")}
              className="fw-500"
            >
              <div className="d-flex items-center gap-1">
                <i className="icon-login text-16"></i>
                <span className="fw-500">Login</span>
              </div>
            </MenuItem>
          )}
          {/* End Mobile Login Section */}
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
        {/* <div className="mt-20">
          <Link
            className=" button -dark-1 px-30 fw-500 text-14 bg-blue-1 h-50 text-white"
            href="/login"
          >
            Become An Expert
          </Link>
        </div> */}
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
