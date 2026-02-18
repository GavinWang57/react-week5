import { useState, useEffect, use } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
  const [cartsData, setCartsData] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);

  const getCarts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      console.log(`取得的購物車資料:`, response.data.data);

      setFinalTotal(response.data.data.final_total);
      setCartsData(response.data.data.carts);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCart = async (cartId, productId, qty = 1) => {
    const data = {
      product_id: productId,
      qty,
    };
    try {
      const response = await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
        { data },
      );
      console.log(`更新購物車數量:`, response.data);
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCart = async (cartId) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${cartId}`,
      );
      console.log(`刪除購物車項目:`, response.data);
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      console.log(`清空購物車:`, response.data);
      getCarts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <>
      <div className="product-table container py-5 lh-base">
        <div className="row g-4">
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-danger px-4 py-2"
              onClick={clearCart}
            >
              清空購物車
            </button>
          </div>
          <div className="peosuxrList col">
            <div className="shadow-sm rounded ">
              <div className="bg-primary text-white py-3 px-4 rounded-top mb-3">
                <h2 className="h4 mb-0">購物車清單</h2>
              </div>
              <table className="table table-hover table-striped mb-0 ">
                <thead className="table-secondary">
                  <tr className="py-3">
                    <th>項次</th>
                    <th>編輯</th>
                    <th>產品名稱</th>
                    <th>單價</th>
                    <th>數量/單位</th>
                    <th>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {cartsData.length > 0 ? (
                    cartsData.map((item, index) => (
                      <tr key={item.id} className="align-middle py-3">
                        <td>{index + 1}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteCart(item.id)}
                            >
                              刪除
                            </button>
                          </div>
                        </td>
                        <td className="fw-medium">{item.product.title}</td>
                        <td>${item.product.price}</td>
                        <td>
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              className="form-control"
                              aria-label=""
                              defaultValue={item.qty}
                              onChange={(e) =>
                                updateCart(
                                  item.id,
                                  item.product.id,
                                  Number(e.target.value),
                                )
                              }
                            />
                            <span className="input-group-text">
                              {item.product.unit}
                            </span>
                          </div>
                        </td>
                        <td>${item.total}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="h2 text-center py-5 text-secondary"
                      >
                        目前購物車沒有商品……
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  {cartsData.length > 0 && (
                    <tr className="table-secondary">
                      <td colSpan="3" className="text-end fw-bold">
                        總計：
                      </td>
                      <td colSpan="2" className="fw-bold">
                        ${finalTotal}
                      </td>
                    </tr>
                  )}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
