function Pagination({ pagination, onChangePage }) {
  const handlePageChange = (e, page) => {
    e.preventDefault();
    onChangePage(page);
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        {/* {JSON.stringify({ pagination })} */}
        <ul className="pagination justify-content-center pb-5">
          <li className="page-item">
            <a
              className={`page-link ${!pagination.has_pre ? "disabled" : ""}`}
              onClick={(e) => handlePageChange(e, pagination.current_page - 1)}
              href="#"
            >
              前一頁
            </a>
          </li>

          {Array.from({ length: pagination.total_pages }).map((_, index) => (
            <li className="page-item" key={index}>
              <a
                className={`page-link ${index + 1 === pagination.current_page ? "active" : ""}`}
                onClick={(e) => handlePageChange(e, index + 1)}
                href="#"
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li className={`page-item ${!pagination.has_next ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={(e) => handlePageChange(e, pagination.current_page + 1)}
              href="#"
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
