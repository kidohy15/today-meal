import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentProps {
  recipeId: number;
}

export default function Comments({ recipeId }: CommentProps) {
  // 로그인 유무 확인
  const { status } = useSession();

  // 레시피 댓글 리스트 가져오기
  const fetchComments = async () => {
    const res = await axios.get(`/api/comments?recipeId=${recipeId}`);

    return res;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: [`conments-${recipeId}`],
    queryFn: fetchComments,
  });

  return (
    <div className="py-8 px-2 mb-20 mx-auto">
      {/* 댓글 입력 폼 */}
      {status === "authenticated" && <CommentForm recipeId={recipeId} />}

      {/* 댓글 리스트 */}
      <CommentList comments={comments} />
    </div>
  );
}
