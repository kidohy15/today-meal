import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SubNavbar from "./SubNavbar";

const Navbar = () => {
  const router = useRouter();
  const [menuOn, setMenuOn] = useState("");

  const handleItemClick = (item: any) => {
    setMenuOn(item);
  };

  useEffect(() => {}, []);

  return (
    <div className="fixed z-50 flex flex-col top-0 w-full min-w-[1200px]">
      <SubNavbar menuOn={menuOn} handleItemClick={handleItemClick} />

      <div className="navbar">
        <div className="navbar__list">
          <Link
            href={"/recipe/todayMeal"}
            // className={menuOn === "on" ? "navbar__list__item" : "navbar__list__item on"}>
            className={
              menuOn === "item1"
                ? "navbar__list__item on"
                : "navbar__list__item"
            }
            onClick={() => handleItemClick("item1")}
          >
            레시피 추천받기
          </Link>
          {/* <Link href={"/"} className="navbar__list__item">
            오늘의 추천 요리
          </Link> */}
          <Link
            href={"/recipe"}
            className={
              menuOn === "item2"
                ? "navbar__list__item on"
                : "navbar__list__item"
            }
            onClick={() => handleItemClick("item2")}
          >
            레시피 목록
          </Link>
          <Link
            href={"/recipe/new"}
            className={
              menuOn === "item3"
                ? "navbar__list__item on"
                : "navbar__list__item"
            }
            onClick={() => handleItemClick("item3")}
          >
            레시피 등록
          </Link>
          {/* <Link href={"/users/likes"} className="navbar__list__item">
            레시피 찜 페이지
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
