import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";

import './App.css';

import useTelegram from "./hooks/useTelegram";

import {Header} from "./components/header";
import {Form} from "./components/form";
import {ProductList} from "./components/productList";

function App() {
  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route index element={<ProductList />} />
        <Route path="form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
