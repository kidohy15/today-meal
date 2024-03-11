import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";

interface CommentProps {
  recipeId: number;
}

export default function Comments({ recipeId }: CommentProps) {
  // 로그인 유무 확인
  const { status } = useSession();

  const searchParams = useSearchParams();
  const page: any = searchParams.get("page") ?? "1";

  // 레시피 댓글 리스트 가져오기
  const fetchComments = async () => {
    const res = await axios.get(
      `/api/comments?recipeId=${recipeId}&page=${page}`
    );

    const result = res?.data;
    console.log("comments", result)

    return result;
  };

  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`conments-${recipeId}-${page}`],
    queryFn: fetchComments,
  });

  return (
    <div className="py-8 px-2 mb-20 mx-auto">
      {/* 댓글 입력 폼 */}
      {status === "authenticated" && (
        <CommentForm recipeId={recipeId} refetch={refetch} />
      )}

      {comments && (
        <div>
          {/* 댓글 리스트 */}
          <CommentList
            comments={comments}
            refetch={refetch}
            checkRecipe={false}
          />
          {/* pagination */}
          <Pagination
            totalPage={comments?.totalPage}
            page={comments?.page}
            pathname={`/recipe/${recipeId}`}
          />
        </div>
      )}
    </div>
  );
}
