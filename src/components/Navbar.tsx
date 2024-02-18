import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [menuOn, setMenuOn] = useState("");

  const handleItemClick = (item: any) => {
    setMenuOn(item);
  };
  console.log("data", data);
  console.log("status", status);

  useEffect(() => {}, []);

  return (
    <>
      <div className="navbar">
        <Link
          href={"/"}
          className="navbar__logo"
          onClick={() => handleItemClick("")}
        >
          YummyRecipe
        </Link>
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
            오늘 뭐먹지?
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
          <Link
            href={"/users/mypage"}
            className={
              menuOn === "item4"
                ? "navbar__list__item on"
                : "navbar__list__item"
            }
            onClick={() => handleItemClick("item4")}
          >
            마이 페이지
          </Link>
          {status === "authenticated" ? (
            <Link
              href={""}
              className="navbar__list__item"
              onClick={() => {
                signOut({ callbackUrl: "http://localhost:3000/" });
              }}
            >
              로그아웃
            </Link>
          ) : (
            <Link
              href={"/api/auth/signin"}
              className={
                menuOn === "item5"
                  ? "navbar__list__item on"
                  : "navbar__list__item"
              }
              onClick={() => handleItemClick("item5")}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
