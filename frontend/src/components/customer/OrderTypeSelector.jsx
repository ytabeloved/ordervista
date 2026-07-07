function OrderTypeSelector({
    orderType,
    setOrderType
}) {

    return (

        <section className="checkout-options">

            <h2>Order Type</h2>

            <div className="order-type-group">

                <label className="order-type-option">

                    <input
                        type="radio"
                        name="orderType"
                        checked={orderType === "delivery"}
                        onChange={() => setOrderType("delivery")}
                    />

                    Delivery

                </label>

                <label className="order-type-option">

                    <input
                        type="radio"
                        name="orderType"
                        checked={orderType === "pickup"}
                        onChange={() => setOrderType("pickup")}
                    />

                    Pickup

                </label>

                <label className="order-type-option">

                    <input
                        type="radio"
                        name="orderType"
                        checked={orderType === "inperson"}
                        onChange={() => setOrderType("inperson")}
                    />

                    In Person

                </label>

            </div>

        </section>

    );

}

export default OrderTypeSelector;