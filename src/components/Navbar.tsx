import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link href={"/"} className="navbar__logo">로고</Link>
        <div className="navbar__list">
          <Link href={"/recipe"} className="navbar__list__item">
            레시피 목록
          </Link>
          <Link href={"/recipe/new"} className="navbar__list__item">
            레시피 등록
          </Link>
          <Link href={"/users/likes"} className="navbar__list__item">
            레시피 찜 페이지
          </Link>
          <Link href={"/users/mypage"} className="navbar__list__item">
            마이 페이지
          </Link>
          <Link href={"/api/auth/signin"} className="navbar__list__item">
            로그인 페이지
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
