import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

interface CommentProps {
  recipeId: number;
}

export default function Comments({ recipeId }: CommentProps) {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  // 레시피 댓글 리스트 가져오기
  const fetchComments = async () => {
    const res = await axios.get(`/api/comments?recipeId=${recipeId}`);

    return res;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: [`conments-${recipeId}`],
    queryFn: fetchComments,
  });

  // console.log("comments", comments);

  return (
    <div className="py-8 px-2 mb-20 mx-auto">
      {/* 댓글 입력 폼 */}
      {status === "authenticated" && (
        <CommentForm recipeId={recipeId} />
      )}

      {/* 댓글 리스트 */}
    </div>
  );
}
