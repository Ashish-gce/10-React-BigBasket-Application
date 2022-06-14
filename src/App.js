import React from "react";
import "./App.css";
import { Home } from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { ProductList } from "./components/products/ProductList";
import { ProductAdmin } from "./components/products/ProductAdmin";
import { CreateProduct } from "./components/products/CreateProduct";
import { UpdateProduct } from "./components/products/UpdateProduct";

const App = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-success  navbar-expand-sm z-depth-0">
        <div className="container">
          <a href="/" className="navbar-brans text-white h3">
            BigBasket Full-Stack Application with React Hooks
          </a>
          <ul className="ml-auto font-weight-bold text-white">
            <li>Login</li>
          </ul>
        </div>
      </nav>

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/list" component={ProductList} />
          <Route exact path="/products/admin" component={ProductAdmin} />
          <Route exact path="/products/create" component={CreateProduct} />
          <Route exact path="/products/:id" component={UpdateProduct} />
        </Switch>
      </Router>

      {/* <div style={{ marginBottom: 150 }}></div> */}
    </React.Fragment>
  );
};

export default App;
