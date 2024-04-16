import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface subNavbarProps {
  menuOn: string;
  handleItemClick: (item: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubNavbar({
  menuOn,
  handleItemClick,
  isOpen,
  setIsOpen,
}: subNavbarProps) {
  const { data, status } = useSession();

  return (
    <div className="flex w-full justify-center sm:justify-between items-center h-[112px] sm:h-16 bg-white gap-3 border-b-2 border-solid border-gray-200">
      {/* mobile button */}
      <div className="navbar__button" onClick={() => setIsOpen((val) => !val)}>
        {isOpen ? <AiOutlineClose /> : <BiMenu />}
      </div>

      {/* 홈 로고 */}
      <div className="flex sm:block">
        <Link
          href={"/"}
          className="navbar__logo"
          onClick={() => handleItemClick("")}
        >
          TodayMeal
        </Link>
      </div>

      {/* 유저관련 서브 nav */}
      <div className="sm:flex w-[250px] hidden px-10 items-center text-center gap-x-[12px] ">
        <Link
          href={"/users/mypage"}
          className={
            menuOn === "item4" ? "navbar__list__item on" : "navbar__list__item"
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
              // signOut({ callbackUrl: "http://localhost:3000/" });
              signOut({ callbackUrl: "/" });
            }}
          >
            로그아웃
          </Link>
        ) : (
          <Link
            href={"/api/auth/signIn"}
            // href={"/users/login"}
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
  );
}
