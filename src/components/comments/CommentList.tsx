import { useSession } from "next-auth/react";

/* eslint-disable @next/next/no-img-element */
interface CommentListProps {
  comments: any;
}

export default function CommentList({ comments }: CommentListProps) {
  const { data: session } = useSession();

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
                <div className="font-semibold text-black">{comment.user?.email ?? "사용자"}</div>
                <div className="text-xs">
                  {new Date(comment?.createdAt)?.toLocaleDateString()}
                </div>
              </div>
              <div className="mt-1 text-base">
                {comment.contents}
              </div>
            </div>
            <div>
              {/* 삭제는 본인꺼만 가능 */}
              {/* {comment.userId === session?.user?.id && <button>삭제</button>} */}
              <button>삭제</button>
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
