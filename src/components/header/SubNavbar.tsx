import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface subNavbarProps{
  menuOn: any;
  handleItemClick: any;
}

export default function SubNavbar({ menuOn, handleItemClick }: subNavbarProps) {
  const { data, status } = useSession();

  return (
    <div className="flex justify-between items-center h-16 bg-white gap-3 border-b-2 border-solid border-gray-200">
        <div>
          <Link
            href={"/"}
            className="navbar__logo"
            onClick={() => handleItemClick("")}
          >
            YummyRecipe
          </Link>
        </div>

        <div className="flex px-10 items-center gap-x-[12px] ">
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
  )
}