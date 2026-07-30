import { Menu } from "@headlessui/react";

const DropdownItem = ({
  icon,
  children,
  className = "",
  danger = false,
  as: Component = "button",
  ...props
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          {...props}
          className={`
            flex w-full items-center gap-3
            px-4 py-2.5
            text-sm font-medium
            transition-colors duration-150

            ${
              active
                ? "bg-[#fff8eb] text-[#fab421]"
                : danger
                ? "text-red-600"
                : "text-gray-700"
            }

            ${className}
          `}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </Component>
      )}
    </Menu.Item>
  );
};

export default DropdownItem;