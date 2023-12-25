import {useEffect, useState } from "react";
import ProductItem from "./ProductItem";



const Product = ({loading, products}) => {
  const [pro, setPro] = useState(products)
  const [filter, setFilter] = useState(false)
  const [count, setCount] = useState(0)
  const [basketToggle, setBasketToggle] = useState(false)
  const [basketClass, setBasketClass] = useState("")
  const [productsIn, setProductsIn] = useState([])
  const [price, setPrice] = useState(0)
  const [basketAmount, setBasketAmount]= useState(1)
  

  const handleBasketClick = ()=>{
    setBasketToggle(!basketToggle)
    if(basketClass === ""){
    setBasketClass("toggled-bg")
   } else {
    setBasketClass("")
   }
  }
  
  const handleBack = ()=>{
    setBasketToggle(false)
    if(basketClass === ""){
      setBasketClass("toggled-bg")
     } else {
      setBasketClass("")
     }
     setCount(() => {
      const totalCount = productsIn.reduce((total, product) => total + +product.amount, 0);
      return totalCount;
    });
     
  }
  
  useEffect(() => {
    setPro(products);
  }, [products]);
 

  console.log(products);
    
  if (loading) {
    return <p>Loading...</p>;
  }

   


    const handleChange = (e) => {
      const filteredProduct = products.filter((product) =>
        product.title.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setPro(filteredProduct);
      if (e.target.value.trim() === "") {
        setPro(products);
      }
    };


    const handleClick = ()=>{
      setFilter(!filter);
    }

    const handleLow = ()=>{
      const sortedProducts = [...products].sort((a, b) => a.price - b.price)
      setPro(sortedProducts)
      setFilter(false)
    }

    const handleHigh = ()=>{
      const sortedProducts = [...products].sort((a, b) => b.price - a.price)
      setPro(sortedProducts)
      setFilter(false)
    }

    const handleDefault = ()=>{
      const defaultProducts = [...products];
      setPro(defaultProducts);
      setFilter(false)
    }

    //Come back to it
    const handleCount = (value, theId) => {
      setCount((prevCount) => prevCount + +value);
    
      const filteredProduct = pro.find((product) => theId === product.id);
    
      setProductsIn((prevProductsIn) => {
        const updatedProductsIn = [...prevProductsIn, { ...filteredProduct, amount: +value }];
        const totalPrice = updatedProductsIn.reduce(
          (total, product) => total + parseFloat(product.price) * product.amount,
          0
        );
        
        setPrice(() => totalPrice);
    
        return updatedProductsIn;
      });
    };
    
    const addedTotal = price + 5;
   

      
  const handleBasketAmount = (e, id)=>{
    const newAmount = e.target.value
     setBasketAmount(newAmount)
    

 setProductsIn((prevProductsIn) => {
    
    const updatedProductsIn = prevProductsIn.map((product) =>
      product.id === id ? { ...product, amount: newAmount } : product
    );

    const totalPrice = updatedProductsIn.reduce(
      (total, product) => total + parseFloat(product.price) * product.amount,
      0
    );

    setPrice(()=>totalPrice);

    return updatedProductsIn;
  });
  }
  
  const handleBasketDelete = (id)=>{
    const updatedProductsIn = productsIn.filter((product)=>{
      return !(product.id == id)
    })

    setProductsIn(updatedProductsIn)

    const totalPrice = updatedProductsIn.reduce(
      (total, product) => total + parseFloat(product.price) * product.amount,
      0
    );

    setPrice(()=>totalPrice);
  }
    
    
  return (
    <>
    <div className={`container ${basketClass}`}>
    <div>
      <h2>Products</h2>
      <p>Search the product</p>
    </div>
    <div>
      <input type="text" onChange={handleChange} />
    </div>
    <div className="filter">
    <p>Filter</p>
    <button onClick={handleClick}>📅</button>
    </div>
    {filter && (
      <div>
        <div className="filter-options">
          <button onClick={handleDefault}>Featured</button>
          <button onClick={handleHigh}>High to Low</button>
          <button onClick={handleLow}>Low to High</button>
        </div>
      </div>
    )}
    <div className="quote-container">
      {pro.map((product) => (
        <ProductItem key={product.id} product={product} handleCount={handleCount}/>
      ))}
      <div className="basket-container">
      <h3>Trending</h3>
      <button className="basket" onClick={handleBasketClick}>Go to Basket : {count}</button>
      </div>
    </div>
  </div>
  <div>
    {basketToggle && (
      <div className="basket-page">
        <button onClick={handleBack} className="back-shopping">Back to Shopping</button>
        {price >  0 ? (<div>Wonderful Choise</div>) : (<div>Basket is Empty</div>) }
        {productsIn.map((product) => (
        <div className="purchase-products" key={product.id}>
          <div className="product-info">
          <img src={product.images[0]} width="150px"/>
          <div>
          <div className="sss">
          <h4>{product.title}</h4>
          <p>Large</p>
          <p>${product.price}</p>
          <select name="amount" value={product.amount} id="amount" onChange={(e)=>handleBasketAmount(e,product.id)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        </div>
          </div>
          <button onClick={()=>handleBasketDelete(product.id)}>🗑️</button>
          </div>
        </div>
      ))}
      <div className="confirm-container">
      {price> 0 ? (<p>Shipping Price: $5</p>): "" }
       
       <h4>Total Price: ${price> 0 ? addedTotal-5 : 0 }</h4>
       <button className="confirm-purchase">Confirm Purchase</button>
       </div>
      </div>
    )}
  </div>
  </>
);
};
export default Product