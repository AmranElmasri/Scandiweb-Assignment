import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Category, Cart, ProductDescription } from "./pages";
import { Navbar } from "./components";
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategories } from "./Store/Slices/categoriesSlice";
import { fetchProducts } from "./Store/Slices/productsSlice";

// const GET_DATA = gql`
//   query Query {
//     categories {
//       name
//       products {
//         id
//         name
//         inStock
//         gallery
//         description
//         category
//         attributes {
//           id
//           name
//           type
//           items {
//             displayValue
//             value
//             id
//           }
//         }
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//         brand
//       }
//     }
//   }
// `;

class App extends Component {
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories();
    }

    if (this.props.products.length === 0) {
      this.props.fetchProducts(this.props.activeCategory);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Category } />
            <Route path="/cart" component={Cart } />
            <Route path="/product/:id" component={ProductDescription } />
          </Switch>
          {/* <Query query={GET_DATA}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :{error}</div>;
              this.props.getData(data);
            }}
          </Query> */}
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    activeCategory: state.categories.activeCategory,
    products: state.products.products,
    cartOpen: state.data.cartOpen,
  };
};
const mapDispatchToProps = { fetchCategories, fetchProducts };

export default connect(mapStateToProps, mapDispatchToProps)(App);
