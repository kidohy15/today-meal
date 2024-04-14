import { useState } from "react";

function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div>
          <div className="lg:block absolute inset-0 w-full h-full justify-end bg-black brightness-50 opacity-75 z-0"></div>
          {/* 팝업 닫기 버튼 */}
          <span
            className="absolute top-[15%] right-10 cursor-pointer text-6xl text-right text-white"
            onClick={togglePopup}
          >
            &times;
          </span>{" "}
          <div className="w-full absolute top-[30%] left-[50%] ml-[-50%] font-bold text-white">
            <h2 className="text-center text-4xl leading-[300%]">알림</h2>
            <p className="text-center text-lg leading-5">
              현재 로그인/회원가입 시스템 점검 중에 있습니다.{" "}
              <br />
              서비스를 이용하시는 분들께 양해 말씀 전하며 잠시{" "}
              <span className="text-red-400">임시 아이디를 사용</span>
              해주시기 바랍니다. <br />
              빠른 시일 내에 조치하겠습니다. <br />
            </p>
            <span className="flex justify-center m-5">
              ID : test@test.com <br />
              PW : qwer1234 <br />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
