import React, { Component } from "react";
import { getData } from "./Store/Slices/dataSlice";
import { connect, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Category, Cart, ProductDescription } from "./pages";
import { Navbar } from "./components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GET_DATA = gql`
  query Query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

// function SaveData({ data }) {
//   const dispatch = useDispatch();

//   dispatch(getData(data));
// }

class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route
              path="*"
              element={
                <h1 style={{ textAlign: "center" }}>404 Page Not Found </h1>
              }
            />
          </Routes>
          <Query query={GET_DATA}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :{error}</div>;
              this.props.getData(data);
            }}
          </Query>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = { getData };

export default connect(null, mapDispatchToProps)(App);
