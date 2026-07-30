import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";

const ActionDropdown = ({ children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="
          flex h-9 w-9 items-center justify-center
          rounded-lg border border-gray-200
          bg-white text-gray-500
          transition hover:bg-[#fff8eb]
          hover:border-[#fab421] hover:text-[#fab421]
        "
      >
        <EllipsisVertical size={18} />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="
          z-[99999]
          mt-2
          w-52
          rounded-xl
          border border-gray-200
          bg-white
          shadow-xl
          focus:outline-none
        "
      >
        <div className="py-1">{children}</div>
      </MenuItems>
    </Menu>
  );
};

export default ActionDropdown;