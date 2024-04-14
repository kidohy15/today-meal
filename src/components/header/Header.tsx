import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SubNavbar from "./SubNavbar";
import { useLocation } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [menuOn, setMenuOn] = useState("");
  const { status } = useSession();
  // const urlPathname = window.location.pathname

  useEffect(() => {

  }, [isOpen]);

  // useLayoutEffect(() => {
  //   const urlPathname = location.pathname;
  //   console.log(urlPathname);
  //   if (urlPathname === "/recipe/todayMeal") {
  //     setMenuOn("item1")
  //   } else if (urlPathname === "/recipe") {
  //     setMenuOn("item2")
  //   } else {
  //     setMenuOn("");
  //   }
  // },[menuOn])

  const handleItemClick = (item: string): void => {
    setMenuOn(item);
  };

  return (
    <div className="fixed z-50 mx-auto flex flex-col top-0 w-full">
      <SubNavbar
        menuOn={menuOn}
        handleItemClick={handleItemClick}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="navbar">
        <div className="navbar__list">
          <Link
            href={"/recipe/todayMeal"}
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
      {/* mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link
              href="/recipe/todayMeal"
              className="navbar__list__item--mobile"
              onClick={() => setIsOpen(false)}
            >
              레시피 추천받기
            </Link>
            <Link
              href="/recipe"
              className="navbar__list__item--mobile"
              onClick={() => setIsOpen(false)}
            >
              레시피 목록
            </Link>
            <Link
              href="/recipe/new"
              className="navbar__list__item--mobile"
              onClick={() => setIsOpen(false)}
            >
              레시피 등록
            </Link>
            <Link
              href={"/users/mypage"}
              className={
                menuOn === "item4"
                  ? "navbar__list__item--mobile on"
                  : "navbar__list__item--mobile"
              }
              onClick={() => setIsOpen(false)}
            >
              마이 페이지
            </Link>
            {status === "authenticated" ? (
              <Link
                href={""}
                className="navbar__list__item--mobile"
                onClick={() => {
                  signOut({ callbackUrl: "http://127.0.0.1:3000/" });
                  setIsOpen(false);
                }}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                href={"/api/auth/signin"}
                className={
                  menuOn === "item5"
                    ? "navbar__list__item--mobile on"
                    : "navbar__list__item--mobile"
                }
                onClick={() => setIsOpen(false)}
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
