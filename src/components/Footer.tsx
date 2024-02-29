export default function Footer() {
  return (
    <footer className="w-full bg-slate-800/90 flex justify-center">
      <div className="justify-start w-full md:max-w-6xl h-[300px] px-16 py-12 text-gray-400 text-lg  text-start gap-2 leading-5">
        <div className="mb-4">
          <span className="inline-block text-orange-300 font-bold text-3xl mr-3 py-3">
            YummyRecipe
          </span>
          <p className="leading-5 text-gray-400">
            레시피를 추천해주고 공유하는 사이트입니다. <br />
            해당 사이트는 비영리목적의 개발자 개인 프로젝트입니다.
          </p>
        </div>
        <div>
          <p>개발자: 김동현 </p>
        </div>

        <div>
          <p>Email: test@test.com</p>
        </div>
        <div className="whitespace-pre-wrap ">
          <p className="">
            &copy; YummyRecipe. 음식 이미지의 경우 구글 이미지를 사용하고
            있습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
