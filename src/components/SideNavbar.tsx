import React from "react";

const SideNavbar = () => {
  return (
    <>
      <div id="sideNavbar">
        <i></i>
        <div id="nav1" className="on">
          레시피 추천
        </div>
        <div id="nav2" className="on">
          레시피 목록
        </div>
        <div id="nav3" className="on">
          레시피 공유
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
