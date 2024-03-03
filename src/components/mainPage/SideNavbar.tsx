import Link from "next/link";
import React from "react";

interface slideNavbarProps {
  activeSlide: number;

}

const SideNavbar = ({ activeSlide }: slideNavbarProps) => {

  return (
    <>
      <div id="sideNavbar">
        <div
          id="nav1"
          className={activeSlide === 0 ? "on" : ""}
        >
          {/* <Link href={"/recipe/todayMeal"} >레시피 추천</Link> */}
          <span>레시피 추천</span>
        </div>
        <div
          id="nav2"
          className={activeSlide === 1 ? "on" : ""}
        >
          {/* <Link href={"/recipe"}>레시피 공유</Link> */}
          <span>레시피 공유</span>
        </div>
        <div
          id="nav3"
          className={activeSlide === 2 ? "on" : ""}
        >
          {/* <Link href={"/recipe/new"}>레시피 목록</Link> */}
          <span>레시피 목록</span>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
