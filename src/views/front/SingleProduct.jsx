import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/product/${id}`,
      );
      console.log(`api 取得資料`, response.data.product);
      navigate(`/product/${id}`, {
        state: { productData: response.data.product },
      });
    } catch (error) {
      console.error(error);
      alert("無法取得產品詳細資訊");
    }
  };

  const addCart = async (id, qty = parseInt(quantity, 10)) => {
    const data = { product_id: id, qty };
    console.log(`加入購物車資料`, data);
    try {
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data,
      });
      console.log(`加入購物車成功`, response.data);
      alert(`${product.title} 成功加入購物車`);
    } catch (error) {
      console.error(error);
      console.log(`加入購物車失敗`, error.response.data);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
        alert("無法取得產品詳細資訊");
      }
    };

    getProduct();
  }, [id]);

  return (
    <>
      {!product ? (
        <h2>查無產品資料</h2>
      ) : (
        <div className="container p-4">
          <div className="row">
            <div className="" style={{ width: "18rem" }}>
              <div className="card">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.content}</p>
                  <p className="card-text text-center">
                    <span className="text-muted text-decoration-line-through">
                      ${product.origin_price}
                    </span>
                    /${product.price}
                  </p>

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <label
                      htmlFor="quantity"
                      className="form-label px-2 text-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      購買數量
                    </label>
                    <input
                      type="number"
                      className="form-control text-end"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => addCart(product.id)}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleProduct;
