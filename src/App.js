// // import React from "react";
// //import ListItem from"./components/ListItem"
// import Header from"./components/Layout/Header"
// import Subheader from"./components/Layout/Subheader"
// import Products from "./components/Products/Products";
// const App=() =>{
//   return (           //jsx
//     <div>
//       <Header/>
//       <Subheader/>
//       <Products/>
//     </div>
//   );
//   //return React.createElement('div',{},  React.createElement('h1',{},"hello world"));
// }

// export default App;









import Products from "./components/Products/Products";
import Header from "./components/Layout/Header"
import Subheader from "./components/Layout/Subheader";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthIndex from "./components/Auth";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkIsLoggedIn(() => {}))
  }, []) 

  return (
    <div>
      <Header/>
      <Subheader/>
      <Routes>
        {
          !authState.idToken &&
          <Route path="/:type(login|signup)" exact>
            <AuthIndex/>
          </Route>
        }
        <Navigate to="/" from="/login"/>
        <Navigate to="/" from="/signup"/>
        <Route path="/404" exact>
          <h1>Not Found!</h1>
        </Route>
        <Route path="/:category?" exact>
          <Products />
        </Route>
        <Navigate to="/404"/>
      </Routes>
    </div>
  );
}

export default App;