import Link from "next/link";
import React from "react";

const SideNavbar = () => {
  return (
    <>
      <div id="sideNavbar">
        <div id="nav1" className="on">
          <Link href={"/recipe/todayMeal"}>레시피 추천</Link>
        </div>
        <div id="nav2" className="on">
          <Link href={"/recipe"}>레시피 목록</Link>
        </div>
        <div id="nav3" className="on">
          <Link href={"/recipe/new"}>레시피 공유</Link>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
