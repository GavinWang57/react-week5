function ProductModal({
  modalType,
  templateProduct,
  handleModalInputChange,
  handleModalImageChange,
  checkboxChange,
  handleAddImage,
  handleRemoveImage,
  uploadImage,
  updateProduct,
  closeModal,
}) {
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content ">
            <div
              className={`modal-header text-white bg-${modalType === "delete" ? "danger" : "dark"}`}
            >
              <h2 className="modal-title fs-4 " id="productModalLabel">
                {modalType === "delete"
                  ? "刪除"
                  : modalType === "edit"
                    ? "編輯"
                    : "新增"}
                產品
              </h2>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body bg-secondary bg-opacity-10 p-4">
              <form>
                <div className="row g-3 text-center">
                  <div className="col-4 p-3">
                    {/* 圖片上傳 */}
                    <div className="mb-3">
                      <label htmlFor="imageUpload" className="form-label">
                        上傳圖片
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="imageUpload"
                        name="imageUpload"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => uploadImage(e)}
                      />
                    </div>

                    {/* 圖片網址 */}
                    <div className="mb-3">
                      <label
                        htmlFor="imageUrl"
                        className="form-label text-center mb-2"
                      >
                        <div className="h5">主要圖片網址</div>
                      </label>
                      <input
                        type="url"
                        className="form-control mb-2"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="請輸入圖片網址"
                        value={templateProduct.imageUrl}
                        onChange={handleModalInputChange}
                      />
                      {templateProduct.imageUrl === "" ? null : (
                        <img
                          src={templateProduct.imageUrl}
                          alt="主要圖片"
                          className="img-fluid rounded mb-4"
                          onLoad={() => console.log(`圖片 主要圖片 載入成功`)}
                          onError={(e) => {
                            console.error(`圖片 主要圖片 載入失敗`);
                            e.target.src =
                              "https://via.placeholder.com/300x200?text=圖片載入失敗";
                          }}
                        />
                      )}
                    </div>
                    {/* 更多圖片網址 */}
                    <div className="shadow-sm rounded p-2 bg-white">
                      <div className="h5">更多圖片</div>

                      {templateProduct.imagesUrl.length > 0 &&
                        templateProduct.imagesUrl.map((imgUrl, index) => (
                          <div key={index} className="mb-3">
                            <label
                              htmlFor={`imagesUrl-${index}`}
                              className="form-label text-center mb-2"
                            >
                              輸入更多圖片網址
                            </label>
                            <input
                              type="url"
                              className="form-control mb-2"
                              id={`imagesUrl-${index}`}
                              name="imagesUrl"
                              placeholder="請輸入更多圖片網址"
                              value={imgUrl}
                              onChange={(e) =>
                                handleModalImageChange(index, e.target.value)
                              }
                            />
                            {imgUrl && imgUrl.trim() !== "" ? (
                              <img
                                src={imgUrl}
                                alt={`更多圖片 ${index + 1}`}
                                className="img-fluid mb-4 rounded"
                                onLoad={() =>
                                  console.log(`圖片 ${index + 1} 載入成功`)
                                }
                                onError={(e) => {
                                  console.error(`圖片 ${index + 1} 載入失敗`);
                                  e.target.src =
                                    "https://via.placeholder.com/300x200?text=圖片載入失敗";
                                }}
                              />
                            ) : (
                              <div className="text-muted small p-3 border border-dashed rounded">
                                尚未輸入圖片網址
                              </div>
                            )}
                          </div>
                        ))}

                      <div>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm mb-3"
                          onClick={handleAddImage}
                        >
                          新增圖片
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm mb-3"
                          onClick={handleRemoveImage}
                        >
                          刪除圖片
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="row text-start g-3">
                      {/* 標題 */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="title" className="form-label mb-1">
                          產品標題 <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="請輸入產品標題"
                          required
                          value={templateProduct.title}
                          onChange={handleModalInputChange}
                        />
                      </div>

                      {/* 分類 */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="category" className="form-label">
                          產品分類 <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          required
                          value={templateProduct.category}
                          onChange={handleModalInputChange}
                        >
                          <option value="">請選擇分類</option>
                          <option value="咖啡豆">咖啡豆</option>
                          <option value="茶葉">茶葉</option>
                          <option value="茶包">茶包</option>
                          <option value="濾掛咖啡">濾掛咖啡</option>
                          <option value="其他">其他</option>
                        </select>
                      </div>

                      {/* 庫存 */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="stock" className="form-label mb-1">
                          庫存 <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock"
                          name="stock"
                          min="0"
                          placeholder="0"
                          required
                          value={templateProduct.stock}
                          onChange={handleModalInputChange}
                        />
                      </div>

                      {/* 單位 */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="unit" className="form-label mb-1">
                          計價單位
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="unit"
                          name="unit"
                          placeholder="例：個、件、組"
                          value={templateProduct.unit}
                          onChange={handleModalInputChange}
                        />
                      </div>

                      {/* 原價 */}
                      <div className="col-md-4 mb-3">
                        <label
                          htmlFor="origin_price"
                          className="form-label mb-1"
                        >
                          原價 <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">NT$</span>
                          <input
                            type="number"
                            className="form-control"
                            id="origin_price"
                            name="origin_price"
                            min="0"
                            placeholder="0"
                            required
                            value={templateProduct.origin_price}
                            onChange={handleModalInputChange}
                          />
                        </div>
                      </div>

                      {/* 售價 */}
                      <div className="col-md-4 mb-3">
                        <label htmlFor="price" className="form-label mb-1">
                          售價 <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">NT$</span>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            min="0"
                            placeholder="0"
                            required
                            value={templateProduct.price}
                            onChange={handleModalInputChange}
                          />
                        </div>
                      </div>

                      {/* 產品描述 */}
                      <div className="col-6 mb-3">
                        <label
                          htmlFor="description"
                          className="form-label mb-1"
                        >
                          產品描述
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="3"
                          placeholder="請輸入產品描述"
                          value={templateProduct.description}
                          onChange={handleModalInputChange}
                        ></textarea>
                      </div>

                      {/* 說明內容 */}
                      <div className="col-6 mb-3">
                        <label htmlFor="content" className="form-label mb-1">
                          詳細說明
                        </label>
                        <textarea
                          className="form-control"
                          id="content"
                          name="content"
                          rows="3"
                          placeholder="請輸入產品詳細說明內容"
                          value={templateProduct.content}
                          onChange={handleModalInputChange}
                        ></textarea>
                      </div>

                      {/* 是否啟用 */}
                      <div className="col-6 mb-3">
                        <div className="form-check text-start">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="is_enabled"
                            name="is_enabled"
                            checked={templateProduct.is_enabled}
                            onChange={checkboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="is_enabled"
                          >
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer bg-secondary bg-opacity-10 mb-4 me-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => closeModal()}
              >
                關閉
              </button>
              <button
                type="button"
                className={`btn btn-${modalType === "delete" ? "danger" : "primary"}`}
                onClick={() => updateProduct(templateProduct.id)}
              >
                {modalType === "delete"
                  ? "刪除產品"
                  : modalType === "edit"
                    ? "更新產品"
                    : "新增產品"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductModal;
