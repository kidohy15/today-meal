export default async function getData() {
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fetch`, {
      cache: "no-store",
    }
  );

  if (!fetchData.ok) {
    throw new Error("Fail to fetch data");
  }

  return fetchData.json();
}