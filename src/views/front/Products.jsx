import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
      console.log(`api 取得資料`, response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      alert("無法取得產品資料");
    }
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container p-4">
        <div className="row g-3">
          {products.map((product) => {
            return (
              <div className="col-md-4 mb-3" key={product.id}>
                <div className="card ">
                  <div className="card-img">
                    {product.imageUrl ? (
                      <div className="ratio ratio-4x3">
                        <img
                          src={product.imageUrl}
                          className="img-fluid object-fit-cover"
                          alt={product.title}
                        />
                      </div>
                    ) : (
                      <div className="placeholder-img">無此產品圖片</div>
                    )}
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.content}</p>
                    <p className="card-text text-center">
                      <span className="text-muted text-decoration-line-through">
                        ${product.origin_price}
                      </span>
                      /${product.price}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={() => handleView(product.id)}
                    >
                      詳細資訊
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
