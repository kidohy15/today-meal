import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

/* eslint-disable @next/next/no-img-element */
interface CommentListProps {
  comments: any;
  refetch: () => void;
}

export default function CommentList({ comments, refetch }: CommentListProps) {
  const { data: session } = useSession();

  const handleDeleteComment = async (commentId: number) => {
    const confirm = window.confirm("해당 댓글을 삭제하겠습니까?");

    if (confirm) {
      try {
        console.log("삭제 시작!");
        const res = await axios.delete(`/api/comments?commentId=${commentId}`);
        console.log("res", res);

        if (res.status === 200) {
          toast.success("댓글을 삭제했습니다.");
          refetch?.();
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="my-10">
      {comments?.data && comments?.data?.length > 0 ? (
        comments?.data?.map((comment: any) => (
          <div
            key={comment.id}
            className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b pb-8"
          >
            <div className="">
              {comment.user?.image ? (
                <img
                  src={comment.user?.image || null}
                  width={40}
                  height={40}
                  className="rounded-md bg-gray-100"
                  alt="user profile image"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 m-1 text-center leading-[6rem]">
                  이미지
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <div className="flex gap-2">
                <div className="font-semibold text-black">
                  {comment.user?.email ?? "사용자"}
                </div>
                <div className="text-xs">
                  {new Date(comment?.createdAt)?.toLocaleDateString()}
                </div>
              </div>
              <div className="mt-1 text-base">{comment.contents}</div>
            </div>
            <div>
              {/* 삭제는 본인꺼만 가능 */}
              {/* {comment.userId === session?.user?.id && <button>삭제</button>} */}
              <button
                onClick={() => {
                  handleDeleteComment(comment.id);
                }}
                className="text-gray-700 hover:text-gray-500"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-e-gray-200 rounded-md text-sm text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
