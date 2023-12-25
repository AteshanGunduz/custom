import { useState } from "react";




const ProductItem = ({product, handleCount}) => {
    const [slideDirection, setSlideDirection] = useState('');
    const [index, setIndex] = useState(0);
    const [amountValues, setAmountValues] = useState(1)

   const example = [1,2,3]
   

    const handleLeftClick = () => {
      setSlideDirection('slide-right');
      setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : example.length - 1));
    };
  
    const handleRightClick = () => {
      setSlideDirection('slide-left');
      setIndex((prevIndex) => (prevIndex < example.length - 1 ? prevIndex + 1 : 0));
    };
  
    const handleAnimationEnd = () => {
      setSlideDirection('');
    };

  //  const handleAmountValue = ()=>{
  //   setAmountValue(value)
  //  }



  return (
    <div key={product.id} className="products">
        <h3>{product.title}</h3>
        <div className="slider">
        <button onClick={()=>handleLeftClick()}>👈</button>
        
        <div className={`imgContainer ${slideDirection}`} onAnimationEnd={handleAnimationEnd}>
        <img src={product.images[index]} width="210px"className="slider-image"/>
       </div>
       <button onClick={()=>handleRightClick()}>👉</button>
       </div>
        <p>{product.description}</p>
        <h4>${product.price}</h4>
        <div>
        <label for="amount">Amount </label>
        <select name="amount" id="amount" onChange={(e)=>{setAmountValues(e.target.value)}}>
          <option value="1" selected="" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        </div>


        
        <button className="buy" onClick={()=>handleCount(amountValues, product.id)}>Add to Basket</button>

      </div>
  )
}
export default ProductItem