import { getProductById } from "../../../services/productServices";

export default function handler(request, response) {
  const { id } = request.query;

  const singleProduct = getProductById(id);
  response.status(200).json(singleProduct);
}
