import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export const ProductAdmin = () => {
  let [products, setProducts] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  //   get all products
  let getAllProducts = () => {
    let dataurl = "http://127.0.0.1:5000/api/products";
    Axios.get(dataurl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  // Delete Product operation perform
  let deleteProduct = (productId) => {
    // deal with "URL" to delete the product
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    Axios.delete(dataURL)
      .then((response) => {
        setProducts(response.data);
        getAllProducts(); // here we call/get all remaining products after product deletion
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
      });
  };

  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomIn">
              <p className="h2 text-success">Product Admin</p>
              <p className="lead">
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before the final copy is available.
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create New
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col animated zoonInLeft delay-1s">
              <table className="table table-hover table-striped text-center table-success">
                <thead className="bg-success text-white">
                  <tr>
                    <th>Sno</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {products.length > 0 ? (
                    <React.Fragment>
                      {products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {product._id.substr(product._id.length - 5)}
                            </td>
                            <td>
                              <img
                                src={product.image}
                                alt=""
                                width="50"
                                height="50"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td> ⚖️ {product.qty} Kgs</td>
                            <td>&#8377; {product.price} per/kg</td>
                            <td>
                              <Link
                                to={`/products/${product._id}`}
                                className="btn btn-success btn-sm"
                              >
                                {/* now, fetch this "id" from url in Component and from them send this data to server and 'populate' them in our form  */}
                                Update
                              </Link>

                              {/* bind(), b'z we're passing some data with them. */}
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={deleteProduct.bind(this, product._id)} // bind(this, product._id) -> here onClick we providing "productId" (particular) and delete that product
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <tr>
                        <td
                          colSpan="6"
                          className="text-danger font-weight-bold"
                        >
                          -------- No Products Found --------------
                        </td>
                      </tr>
                    </React.Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
