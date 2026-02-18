import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import "../assets/scss/ProductTable.scss";
import ProductModal from "../components/ProductModal";
import Pagination from "../components/Pagination";

const INITAL_TEMPLATE_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
  stock: "",
};

function ProductTable({ API_BASE, API_PATH }) {
  const [products, setProducts] = useState([]);

  const [templateProduct, setTemplateProduct] = useState(INITAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState("");

  const [pagination, setPagination] = useState({});

  const productModalRef = useRef(null);

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateProduct((pre) => ({ ...pre, [name]: value }));
  };

  const checkboxChange = (e) => {
    const { name, checked } = e.target;
    setTemplateProduct((pre) => ({ ...pre, [name]: checked }));
  };

  const handleModalImageChange = (index, value) => {
    setTemplateProduct((pre) => {
      const newImagesUrl = [...pre.imagesUrl];
      newImagesUrl[index] = value;
      return { ...pre, imagesUrl: newImagesUrl };
    });
  };

  const handleAddImage = () => {
    setTemplateProduct((pre) => {
      const newImage = [...pre.imagesUrl];
      newImage.push("");
      return {
        ...pre,
        imagesUrl: newImage,
      };
    });
  };

  const handleRemoveImage = (index) => {
    setTemplateProduct((pre) => {
      const newImage = [...pre.imagesUrl];
      newImage.pop();
      return { ...pre, imagesUrl: newImage };
    });
  };

  const getProduct = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
      );

      if (response.data.success === false) {
        throw new Error("API 回傳失敗");
      } else {
        console.log("取得產品資料成功");
        console.log(response.data.products);
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("取得產品資料失敗:", error);
    }
  };

  const updateProduct = async (id) => {
    let url = `${API_BASE}/api/${API_PATH}/admin/product`;
    let method = "post";
    if (modalType === "edit") {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`;
      method = "put";
    }
    if (modalType === "delete") {
      url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`;
      method = "delete";
    }

    const prdouctData = {
      data: {
        ...templateProduct,
        origin_price: Number(templateProduct.origin_price),
        price: Number(templateProduct.price),
        is_enabled: templateProduct.is_enabled ? 1 : 0,
        imagesUrl: templateProduct.imagesUrl.filter((url) => url !== ""),
      },
    };

    try {
      const response = await axios[method](url, prdouctData);
      closeModal();
      console.log(response.data);
      alert(response.data.message);
      getProduct();
    } catch (error) {
      console.log(error.response);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("請選擇一張圖片");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file-to-upload", file);

      const response = await axios.post(
        `${API_BASE}/api/${API_PATH}/admin/upload`,
        formData,
      );

      setTemplateProduct((pre) => ({
        ...pre,
        imageUrl: response.data.imageUrl,
      }));
    } catch (error) {
      console.log(error.response);
      alert("圖片上傳失敗");
    }
  };

  const openModal = (type, product) => {
    console.log(product);
    setModalType(type);
    setTemplateProduct((INITAL_TEMPLATE_DATA) => ({ ...INITAL_TEMPLATE_DATA, ...product }));
    productModalRef.current.show();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  useEffect(() => {
    getProduct();

    productModalRef.current = new bootstrap.Modal("#productModal", {
      keyboard: false,
    });
  }, []);

  return (
    <>
      <div className="product-table container py-5 lh-base">
        <div className="row g-4">
          <div className="text-end">
            <button
              type="button"
              className="btn btn-primary px-4 py-2"
              onClick={() => openModal("create", INITAL_TEMPLATE_DATA)}
            >
              新增產品
            </button>
          </div>
          <div className="peosuxrList col">
            <div className="shadow-sm rounded ">
              <div className="bg-primary text-white py-3 px-4 rounded-top mb-3">
                <h2 className="h4 mb-0">產品清單</h2>
              </div>
              <table className="table table-hover table-striped mb-0 ">
                <thead className="table-secondary">
                  <tr className="py-3">
                    <th>分類</th>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>庫存</th>
                    <th className="text-center">是否啟用</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product) => {
                      return product.id === undefined ? null : (
                        <tr key={product.id} className="align-middle py-3">
                          <td>{product.category}</td>
                          <td className="fw-medium">{product.title}</td>
                          <td className="text-center">
                            ${product.origin_price.toLocaleString()}
                          </td>
                          <td>${product.price.toLocaleString()}</td>
                          <td>{product.stock}</td>
                          <td>
                            {product.is_enabled ? (
                              <>
                                <i className="bi bi-check-circle-fill me-2 text-success"></i>
                                已啟用
                              </>
                            ) : (
                              <>
                                <i className="bi bi-x-circle-fill me-2 text-danger"></i>
                                未啟用
                              </>
                            )}
                          </td>
                          <td className="text-center">
                            <div className="btn-group">
                              <a
                                href="#"
                                className="btn btn-outline-primary btn-sm"
                                aria-current="page"
                                onClick={() => openModal("edit", product)}
                              >
                                編輯
                              </a>
                              <a
                                href="#"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => openModal("delete", product)}
                              >
                                刪除
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        載入中...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        modalType={modalType}
        templateProduct={templateProduct}
        handleModalInputChange={handleModalInputChange}
        handleModalImageChange={handleModalImageChange}
        checkboxChange={checkboxChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
        updateProduct={updateProduct}
        uploadImage={uploadImage}
        closeModal={closeModal}
      />
      <Pagination pagination={pagination} onChangePage={getProduct} />
    </>
  );
}

export default ProductTable;
