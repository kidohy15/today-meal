import Layout from "@/components/Layout";
import { useEffect } from "react";
import MainSlidePage from "@/components/mainPage/MainSlidePage";
import SideNavbar from "@/components/mainPage/SideNavbar";
// import { QueryClient } from "react-query";

export default function Home() {
  // const queryClient = new QueryClient();

  return (
    <>
      <div className="h-screen ">
        <div className="h-full pt-[112px]">
          <MainSlidePage />
        </div>
      </div>
    </>
  );
}

// async function getServerSideProps () {
//   // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe`, {
//   const res = await fetch(`/api/recipe`, {
//     cache: "no-store",
//   });

//   const repo: RecipeApiResponse = await res.json()
//   // Pass data to the page via props

//   console.log("res", res)
//   console.log("repo", repo)

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   // return { props: { repo } }
//   return repo;
// }
