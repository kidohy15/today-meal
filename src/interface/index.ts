// 레시피 타입
export interface RecipeType {
  id: number;
  title: string | null; // 레시피 제목
  ingredients: string[] | null; // 레시피 재료
  contents: string | null; // 레시피 내용
  writer: string | null; // 작성자
  image: string[] | null; // 레시피 이미지
  createdAt: Date | null; // 생성일
  updatedAt: Date | null; // 수정일
  userId: number | null; // 유저id
}

// 레시피 api 결과 타입
export interface RecipeApiResponse {
  data?: RecipeType[];
  totalPage?: number;
  page?: number;
}


// 레시피 유저
export interface User {
  id: number;
  email: string | null; // 레시피 제목
  password: number | null; // 유저id
  name: string | null;
  emailVerified: Date;
  image: string | null;
}

// 레시피 댓글
export interface CommentType {
  id: number;
  recipeId: string | null; 
  userId: number | null; 
  contents: string | null;
  createdAt: Date | null; 
  writer: string | null; 
  user: User | null; 
  recipe: RecipeType;
}

// 댓글 api 결과 타입
export interface CommentApiResponse {
  data: CommentType[];
  totalPage?: number;
  page?: number;
}

