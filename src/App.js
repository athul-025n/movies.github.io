import './App.css';
import Home from './components/Home'
import React, {Suspense, lazy } from "react";
const HomeComponent = React.lazy(() => import('./components/Home.js'));
//const Admin = React.lazy(() => import("./Admin.js"));

function App() {
  return (
<Suspense fallback={<div>Loading</div>}>
<HomeComponent />
</Suspense>
  );
}

export default App;
