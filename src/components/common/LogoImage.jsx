import React from "react";

export default function LogoImage({ maxWidth = "170px" }) {
  return (
    <img
      src="/images/logo/logo_old.png"
      alt="Sui Southern Gas Company Limited"
      className="h-9 w-auto object-contain"  style={{ maxWidth }}
    />
  );
}


