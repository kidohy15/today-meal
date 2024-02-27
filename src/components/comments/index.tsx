import { useForm } from "react-hook-form";

interface CommentProps {
  recipeId: number;
}

export default function Comments({ recipeId }: CommentProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <div className="py-8 px-2 mb-20 mx-auto">
      {/* 댓글 입력 폼 */}
      <div className="flex flex-col space-y-4">
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
          })}
        >
          {/* 에러 */}
          {errors?.body?.type === "required" && (
            <div className="text-xs text-red-600">필수 입력사항입니다.</div>
          )}
          <textarea
            rows={3}
            placeholder="댓글을 작성해주세요."
            {...register("contents", { required: true })}
            className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
          ></textarea>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm float-right mt-2 rounded-md">
            작성하기
          </button>
        </form>
      </div>

      {/* 댓글 리스트 */}
    </div>
  );
}
