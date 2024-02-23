export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col bg-slate-800/90 w-full h-[300px] text-white p-20 text-center gap-2">
        <ul className="flex justify-center gap-2">
          <li>
            <p>개인정보처리방침</p>
          </li>
          <li>
            <p>홈페이지 이용약관</p>
          </li>
        </ul>

        <div>
          <span>개발자 김동현 </span>
        </div>

        <div>
          {/* <p>연락처: 010-1111-1111</p> */}
          <p>이메일: test@test.com</p>
        </div>

        <p>
          &copy; YummyRecipe. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
