import { Outlet, Link } from "react-router-dom";

function FrontendLayout() {
  return (
    <>
      <header className="">
        <div className="container p-3">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link className="navbar-brand" to="#">
                React Coffee Shop
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      首頁
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/product"
                    >
                      產品列表
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/cart">
                      購物車
                    </Link>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container">
          <p className="text-center">© 2025 gavin. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default FrontendLayout;
