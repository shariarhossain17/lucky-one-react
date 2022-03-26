import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import Cart from './component/cart/Cart';
import Watch from './component/watch/Watch';

const getItem = JSON.parse(localStorage.getItem("watch-cart")) || "[]"
function App() {
  const [watches,setWatch] = useState([]);
  const [cart,setCart] = useState(getItem)
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(()=>
  fetch("data.json")
  .then(res => res.json())
  .then(data => setWatch(data))
  ,[])
  useEffect(()=>{
    localStorage.setItem("watch-cart",JSON.stringify(cart))
  },[cart])
  const handleCart = (selectedWatch) => {
    let newCart = [];
    const uniqueId = cart.find(watch => watch.id === selectedWatch.id)
    if(!uniqueId){
      newCart = [...cart,selectedWatch]
    }
    else{
      alert("This Watch already added")
      newCart = [...cart]
    }
    if(newCart.length === 5){
      setIsOpen(true);
    }
    else{
      setCart(newCart)
    }
    
 }
 const chosseOneBtn = () => {
   const addedCart = cart.length;
   const random = Math.round(Math.random() * addedCart);
   const newProduct = cart[random]
   const newCart = cart.filter(product => product.id !== newProduct.id);
   for (const element of newCart) {
     cart.splice(element,1);
     let chosseCart = [...cart]
     setCart(chosseCart)
   }
  }
 const chooseAgainBtn = () =>{
   const newCart = [];
   setCart(newCart)
 }

// react modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function closeModal() {
  setIsOpen(false);
}

 
  return (
    <div>
     <h1>Watch shop</h1>
     <div className='watch-product'>
      <div className='watches'>
          {
            watches.map(watch => <Watch key={watch.id} watch = {watch} handlecart={handleCart}></Watch> )
          }
      </div>
      <div className='order'>
        <h1>selected watch</h1>
        {
          cart.map(product => <Cart key={product.id} cart={product}></Cart>)
        }
       
        <div>
          <button onClick={chosseOneBtn} className='choose-btn'>Choose one more</button> <br></br>
          <button onClick={()=> chooseAgainBtn() } className='another-btn'>Choose Again</button>
        </div>
      </div>
     </div>
     <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>You a</h2>
      </Modal>
    </div>
  );
}

export default App;
