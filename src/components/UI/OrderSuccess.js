import Modal from "./Modal"


const OrderSuccessModal = ({ onClose, orderId }) => {
    return (
        <Modal onClose={onClose}>
            <div className="order-container">
                <div className="order-container--success">
                    
                    <div className="message">
                        <h1>Order Successfully Placed!</h1>
                        <span>OrderID #{orderId}</span>
                        {/* <span>OrderID #{Math.random().toString(32).slice(2)}</span> */}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default OrderSuccessModal