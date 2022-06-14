import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export const CreateProduct = () => {
  let history = useHistory(); // by the help of "history" we push to the path what we want.

  // here we are performing forms binding
  let [products, setProducts] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });
  let [submitted, setSubmitted] = useState(false);

  //   perform binding operation
  let updateInput = (event) => {
    setProducts({
      ...products,
      [event.target.name]: event.target.value, // this just like  'key : value'
    });
  };

  //  form submit to server
  let submitProduct = (event) => {
    event.preventDefault();
    let dataurl = "http://127.0.0.1:5000/api/products"; // "url" of create a new product i.e. coming from server of create a new product
    Axios.post(dataurl, products) // post(1.,2.) -> taking 2-argument  1 -> "url" of product creation
      //   //   //   //    //    //    //   2 -> local variable (products)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // updateImage
  let updateImage = async (event) => {
    let imageFile = event.target.files[0];
    let base64Image = await convertBase64String(imageFile);
    // alert(base64Image);
    // now put this image in state image location  i.e: setState()
    setProducts({
      ...products,
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
      {/* if form submitted is true then we send / (push) it to the Home page*/}
      {/* "useHistory()" -> 'push()' -> work as 🚀 🤖 redirect the page 🚀 🤖 */}
      {submitted ? (
        history.push("/products/admin")
      ) : (
        <React.Fragment>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col animated zoomIn">
                  <p className="h2 text-success">Create a Product</p>
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

          {/* <pre>{JSON.stringify(products)}</pre> */}

          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card animated zoomInLeft delay-1s">
                    <div className="card-header bg-success text-white">
                      <p className="h3">Create New</p>
                    </div>
                    <div className="card-body rgba-green-light">
                      <form onSubmit={submitProduct} autoComplete="off">
                        <div className="form-group">
                          <input
                            type="text"
                            required
                            name="name"
                            value={products.name}
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
                              required
                              type="file"
                              id="customfile"
                              className="custom-file-input"
                            />
                            <label
                              className="custom-file-label"
                              for="customfile"
                            >
                              {products.image !== "" ? (
                                <img
                                  src={products.image}
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
                            value={products.price}
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
                            value={products.qty}
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
                            value={products.info}
                            onChange={updateInput}
                            placeholder="Product Info"
                            className="form-control"
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            value="create"
                            className="btn btn-success btn-sm"
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
