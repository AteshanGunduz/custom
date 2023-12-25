import { useState } from "react";
import Product from "./Product"
import { useFetch} from "./UseFetch";


const App = () => {
    const { loading, products } = useFetch("https://api.escuelajs.co/api/v1/products");
    

  return (
    <div className="bigbox">
   <Product loading={loading} products={products} />
   </div>
 
  )
}
export default App