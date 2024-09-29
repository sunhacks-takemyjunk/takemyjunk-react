import "./Checkout.css";
import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";

function Checkout() {
  const navigate = useNavigate();
  const [checkedOrderText, setCheckedOrderText] = useState('');
  const [checkedOrderId, setCheckedOrderID] = useState('');


  useEffect(() => {
    if (getCookie() == null) {
      navigate("/");
    }
  }, []);


  const handleCheckout = async () => {
    let data = {customerID:getCookie()}

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
    };

    console.log(JSON.stringify(data));
    const response = await fetch(`http://localhost:3030/createorder`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.state=1){
        setCheckedOrderText('Success');
        setCheckedOrderID('New Order Created! OrderID-'+data.order_id);
        //basket.clearBikeMap(); basket.clearMiscMap();
        document.getElementById('checkout_return').showModal();
        navigate('/');
      }
      else{
        setCheckedOrderText('Failed');
        setCheckedOrderText('Failed Creating new Order! Try again Later!');
        document.getElementById('checkout_return').showModal();
      }

    })
    .catch();
    
  }



  return (
    <div class="flex flex-col space-y-10 h-screen items-center">
      <dialog id="checkout_return" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="font-bold text-lg">{checkedOrderText}</h3>
          <p class="py-4">{checkedOrderId}</p>
        </div>
      </dialog>
      <h1 className="text-xl font-bold" style={{ marginTop: 50 }}>Enter your information</h1>
      <input
        type="text"
        placeholder="Enter first name"
        class="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Enter last name"
        class="input input-bordered w-full max-w-xs"
      />
      <span>-----------------------------------------------------------------------------</span>
      <div class="flex flex-col space-y-10 h-screen items-center">
        <h1 class='text-2xl font-bold'>Current Basket</h1>
        <div>
          <div>
            <ul>
              {/* {bikeItems.map((item) =>
                item.isVisible ? (
                  <div className="container mx-auto" key={item.key}>
                    <li style={{ marginRight: 15 }}>
                      {item.key.b_model} : ${item.key.b_price}
                    </li>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleRemoveBikeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                ) : null
              )} */}
            </ul>
          </div>
        </div>
        <button
          className="btn btn-success btn-lg"
          onClick={handleCheckout}
        > Place Order </button>
      </div>
    </div>
  );
}

export default Checkout;
