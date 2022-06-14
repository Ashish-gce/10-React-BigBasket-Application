import React from "react";

export const Home = () => {
  return (
    <React.Fragment>
      <div className="landing-page">
        <div className="wrapper">
          <div className="d-flex flex-column justify-content-center text-center align-item-center h-100">
            <h5 className="display-4 animated zoomIn delay-1s">
              <i className="fa fa-shopping-cart mr-3" />
              BigBasket
            </h5>
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
