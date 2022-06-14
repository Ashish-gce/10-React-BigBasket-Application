import React, { useEffect, useState } from "react";
import Axios from "axios";

export const ProductList = () => {
  // below variables holes product list local information
  let [products, setProducts] = useState([]); // since data coming in the form of array
  let [errorMessage, setErrorMessage] = useState("");

  //   here we want to fetch data from 💻 ☁️ "server" as soon as page is loaded
  //   here simply when the page load i receive data and we loop the data and display in card format
  useEffect(() => {
    let dataurl = "http://127.0.0.1:5000/api/products";
    Axios.get(dataurl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  }, []); // [] -> determines array dependency means "useEffect()" calls url not more than one
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomIn">
              <p className="h2 text-success">Product List</p>
              <p className="lead">
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before the final copy is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-3">
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              <React.Fragment>
                {/* looping products to display in card format */}
                {products.map((product, index) => {
                  return (
                    <div key={product.id} className="col-md-3 mb-3">
                      <div className="card animated zoomIn delay-1s">
                        <div className="card-header bg-white text-white">
                          <img
                            src={product.image}
                            alt=""
                            width="150"
                            height="150"
                          />
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group">
                            <li className="list-group-item">
                              Name : {product.name}
                            </li>
                            <li className="list-group-item">
                              Price : &#8377; {product.price.toFixed(2)}
                            </li>
                            <li className="list-group-item">
                              Qty : {product.qty} Kgs
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="text-center">
                  <p className="display-4 text-danger font-italic font-weight-bold text-center">
                    -------- No Products Found --------
                  </p>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
