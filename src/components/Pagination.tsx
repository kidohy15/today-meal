import Link from "next/link";

interface PaginationProps {
  page: string;
  totalPage: string;
  pathname: string;
}

export default function Pagination({
  page,
  totalPage,
  pathname,
}: PaginationProps) {
  // pagination 변수
  const currentPage = parseInt(page, 10);
  const totalPages = parseInt(totalPage, 10);
  const pageNaviSize = 10; // 네비게이션 단위 수

  // 현재 페이지가 속한 네비게이션 그룹 계산
  const currentPageNavi = Math.ceil(currentPage / pageNaviSize);

  console.log("currentPageNavi", currentPageNavi);
  console.log("totalPage", totalPage);
  console.log("pathname", pathname);
  // 시작 페이지 계산
  const startPage = (currentPageNavi - 1) * pageNaviSize + 1;

  // 끝 페이지 계산
  let endPage = currentPageNavi * pageNaviSize;
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  const pageLinks = [];
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(
      <Link key={i} href={{ pathname: pathname, query: { page: i } }}>
        <span
          className={`px-5 py-3 rounded border border-solid shadow-sm bg-white ${
            i === currentPage
              ? "text-blue-600 font-bold border-blue-500"
              : "text-gray-300"
          }`}
        >
          {i}
        </span>
      </Link>
    );
  }

  return (
    <div className=" flex gap-3py-6 px-10 py-6 w-full items-center flex-wrap justify-center gap-4 text-black">
      {currentPage > 1 && (
        <Link href={{ pathname: pathname, query: { page: currentPage - 1 } }}>
          <span
            className={`px-3 py-2 rounded border border-solid border-gray-300 shadow-sm bg-white`}
          >
            이전
          </span>
        </Link>
      )}
      {pageLinks}
      {currentPage < totalPages && (
        <Link href={{ pathname: pathname, query: { page: currentPage + 1 } }}>
          <span
            className={`px-3 py-2 rounded border border-solid border-gray-300 shadow-sm bg-white`}
          >
            다음
          </span>
        </Link>
      )}
    </div>
  );
}
