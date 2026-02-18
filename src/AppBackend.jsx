import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./assets/scss/style.css";
import ProductTable from "./pages/ProductTable";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);

      const { token, expired } = response.data;
      console.log("登入成功，Token:", token, "過期時間:", expired);
      // 寫入 Cookie
      Cookies.set("hexToken", token, { expires: new Date(expired * 1000) });

      document.cookie = `hexToken=${token}; expires=${new Date(
        expired * 1000,
      ).toUTCString()}; path=/`;

      axios.defaults.headers.common["Authorization"] = token;

      setIsAuth(true);
      getProduct();
    } catch (error) {
      console.error("登入失敗:", error.response.data.message);
      setIsAuth(false);
    }
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/check`);
      console.log("使用者已登入:", response.data);
      setIsAuth(true);
    } catch (error) {
      console.log(
        "尚未登入或登入已過期",
        error.response?.data?.message || error.message,
      );
      setIsAuth(false);
    }
  };

  useEffect(() => {
    // 讀取 Cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      // console.log("取得 token");
    }

    checkLogin();
  }, []);

  return (
    <>
      {!isAuth ? (
        <div className="container login">
          <div className="login-card">
            <p>
              <i className="bi bi-person-circle text-primary display-4 mb-3"></i>
            </p>
            <h2 className="h3 fw-bold mb-4">管理者登入</h2>
            <form className="form-floating" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <label htmlFor="username">
                  <i className="bi bi-envelope me-2"></i>輸入帳號
                </label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">
                  <i className="bi bi-lock me-2"></i>輸入密碼
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2">
                登入
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container welcome">
          <ProductTable API_BASE={API_BASE} API_PATH={API_PATH} />
        </div>
      )}
    </>
  );
}

export default App;
