import React, { useEffect, useState } from "react";
//  "useParams()" -> to read url data  &  "useHistory()" -> to 'redirect' the page
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";

export const UpdateProduct = () => {
  // here we get id from 'url' parameter by "useParams()"
  let productId = useParams().id;
  let history = useHistory();
  let [selectedProduct, setSelectedProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });
  let [submitted, setSubmitted] = useState(false);

  // getting data from server, when page loads
  useEffect(() => {
    let dataurl = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.get(dataurl)
      .then((response) => {
        setSelectedProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);
  // [productId] -> server calls dependent on productId means server calls for every productId changed
  //   since we get different product for different productId

  let submitProduct = (event) => {
    event.preventDefault();
    let dataurl = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.put(dataurl, selectedProduct)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let updateInput = (event) => {
    setSelectedProduct({
      ...selectedProduct,
      [event.target.name]: event.target.value,
    });
  };

  // updateImage
  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    // alert(base64Image);
    // now put this image in state image location  i.e: setState()
    setSelectedProduct({
      ...selectedProduct,
      image: base64Image,
    });
  };

  // 🚀 🚀 🚀 🚀 🚀  V.V.Important  Regular JavaScript function 🚀 🚀 🚀 🚀 🚀
  // convert normal image into "base 64" string
  let convertBase64String = (imageFile) => {
    return new Promise((resolve, reject) => {
      let filereader = new FileReader();
      filereader.readAsDataURL(imageFile);
      filereader.addEventListener("load", () => {
        if (filereader.result) {
          resolve(filereader.result);
        } else {
          reject("Error Occured");
        }
      });
    });
  };
  return (
    <React.Fragment>
      {submitted ? (
        history.push("/products/admin")
      ) : (
        <React.Fragment>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col animated zoomIn">
                  <p className="h2 text-secondary">Update Product</p>
                  <p className="lead">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before the final copy is available.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  {/* <pre>{JSON.stringify(selectedProduct)}</pre> */}
                  <div className="card animated zoomInLeft delay-1s">
                    <div className="card-header bg-secondary text-white">
                      <p className="h2 text-center">Update Product</p>
                    </div>
                    <div className="card-body rgba-purple-light">
                      <form onSubmit={submitProduct} autoComplete="off">
                        <div className="form-group">
                          <input
                            type="text"
                            required
                            name="name"
                            value={selectedProduct.name}
                            onChange={updateInput}
                            placeholder="Product Name"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-file">
                            <input
                              // on changing image apply by function
                              onChange={updateImage}
                              type="file"
                              id="customfile"
                              className="custom-file-input"
                            />
                            <label
                              className="custom-file-label"
                              for="customfile"
                            >
                              {selectedProduct.image !== "" ? (
                                <img
                                  src={selectedProduct.image}
                                  alt=""
                                  width="25"
                                  height="25"
                                />
                              ) : (
                                <span>Product Image</span>
                              )}
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <input
                            type="number"
                            required
                            name="price"
                            value={selectedProduct.price}
                            onChange={updateInput}
                            placeholder="Price"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            required
                            name="qty"
                            value={selectedProduct.qty}
                            onChange={updateInput}
                            placeholder="Availabe Qty"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            rows="2"
                            required
                            name="info"
                            value={selectedProduct.info}
                            onChange={updateInput}
                            placeholder="Product Info"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            value="Update"
                            className="btn btn-secondary btn-sm"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div style={{ marginBottom: "150px" }} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
