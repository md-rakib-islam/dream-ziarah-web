import { useSelector } from "react-redux";

const useMenus = () => {
  const { menuItems } = useSelector((state) => state.menus);

  const filteredMenus = menuItems?.filter((item) => {
    if (
      item.name === "About" ||
      item.name === "Contact" ||
      // item.name === "Tour" ||
      item.name === "Blog" ||
      item.name === "Tours"
    ) {
      return false;
    }
    return true;
  });

  filteredMenus.sort((a, b) => a.position - b.position);

  const modifiedMenuItems = filteredMenus?.map((item) => {
    if (item.name === "Home") {
      return {
        ...item,
        routePath: "/",
        children:
          item?.children?.length > 0
            ? item.children.map((subItem) => ({
                ...subItem,
                routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
              }))
            : [],
      };
    }
    return {
      ...item,
      routePath: `/${item?.name?.toLowerCase()}`,
      children:
        item?.children?.length > 0
          ? item.children.map((subItem) => ({
              ...subItem,
              routePath: `/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}`,
            }))
          : [],
    };
  });
  return modifiedMenuItems;
};

export default useMenus;
