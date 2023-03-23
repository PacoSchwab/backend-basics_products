import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

  if (error) {
    console.dir(error);
    return <h1>An error occured...</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const productData = data;

  return (
    <>
      <h2>{productData.name}</h2>{" "}
      <p>
        {productData.description} {productData.price} {productData.currency}{" "}
        {productData.category}
      </p>
    </>
  );
}
