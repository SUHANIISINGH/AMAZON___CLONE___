// import AddToCartIcon from"../../../assets/icons/add_cart.svg"
// import {useState} from "react";
//     const ListItem = ({ data }) => {

//         // const [message, setMessage] = useState("Not added to the cart yet")
    
//         // // let message = "Not added to the cart yet"
//         // const handleClick = () => {
//         //     // message = "Added to the cart!"
//         //     setMessage("Added to the Cart!")
//         //     console.log("Clicked, ", message)
//         // }

//         const[counter,setCounter]=useState(0)
//         const increaseCounterByOne=()=>{
//             setCounter(counter+1)
//         }
//         const decreaseCounterByOne=()=>{
//             if(counter<=0){
//                 return;
//             }
//             setCounter(counter-1)
//         }
    
//     return (
//         <div className={"item-card"}>

//                 <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
//             <div className={"item-card__information"}>
//                 <div className={"pricing"}>
//                     <span>Rs{data.discountedPrice}</span>
//                     <small>
//                         <strike>Rs{data.price}</strike>
//                     </small>
//                 </div>
//                 <div className={"title"}>
//                     <h3>{data.title}</h3>
//                 </div>
//             </div>
//             {/* <small className={"cart-message"}>{message}</small>
//              <button className={"cart-add"} onClick={()=>console.log("clicked, ",data)}> 
//              <button className={"cart-add"} onClick={handleClick}>
//                 <span>Add to Cart</span>
//                 <img src={AddToCartIcon} alt="Cart Icon"style={{ width: '40px', height: '20px' }}/>
//             </button>  */}
//             <div>
//                 <button onClick={decreaseCounterByOne}><span>-</span></button>
//                 <span className={"counter"}>{counter}</span>
//                 <button onClick={increaseCounterByOne}><span>+</span></button>
                
//             </div>
//         </div>
//     )
    
// }
// export default ListItem














import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddToCartIcon from "../../../assets/icons/add_cart.svg"
import Modal from "../../UI/Modal"
import { addItemHandler, removeItemHandler } from "../../../actions"

const ListItem = ({ data }) => {
    // const [counter, setCounter] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const item = useSelector(state => state.cart.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

    const increaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(addItemHandler(data))
    }

    const decreaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(removeItemHandler(data.id))
    }

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    return (
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>
                {
                    !item || item?.quantity < 1 ?
                    <button className={"cart-add"} onClick={increaseCounterByOne}>
                        <span>Add to Cart</span>
                        <img src={AddToCartIcon} alt="Cart Icon"/>
                    </button>
                    :
                    <div className="cart-addon">
                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                        <span>{item.quantity}</span>
                        <button onClick={increaseCounterByOne}><span>+</span></button>
                    </div>
                }
            </div>
            { showModal && 
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>₹{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {
                                !item || item?.quantity < 1 ?
                                <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                                    <span>Add to Cart</span>
                                    <img src={AddToCartIcon} alt="Cart Icon"/>
                                </button>
                                :
                                <div className="cart-addon card-addon__modal">
                                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={increaseCounterByOne}><span>+</span></button>
                                </div>
                            }
                        </div>
                    </div>
                </Modal> 
            }
        </Fragment>
    )
}

export default ListItem