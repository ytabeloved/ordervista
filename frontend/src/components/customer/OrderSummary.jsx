function OrderSummary({
    subtotal,
    delivery = 0,
    tax = 0,
    total,
    onPlaceOrder,
    onClearCart
}) {

    return (

        <aside className="cart-summary">

            <h2>Resumen del Pedido</h2>

            <div className="summary-row">

                <span>Subtotal</span>

                <span>
                    ${subtotal.toLocaleString("es-CL")}
                </span>

            </div>

            <div className="summary-row">

                <span>Despacho</span>

                <span>
                    ${delivery.toLocaleString("es-CL")}
                </span>

            </div>

            <div className="summary-row">

                <span>Impuesto</span>

                <span>

                    {tax === 0
                        ? "Included"
                        : `$${tax.toLocaleString("es-CL")}`}

                </span>

            </div>

            <hr />

            <div className="summary-total">

                <span>Total</span>

                <strong>

                    ${total.toLocaleString("es-CL")}

                </strong>

            </div>

            <button
                type="button"
                className="customer-primary-button"
                onClick={onPlaceOrder}
            >

                Reealizar el pedido

            </button>

            <button
                type="button"
                className="btn-secondary"
                onClick={onClearCart}
            >

                Limmpiar el carrito

            </button>

        </aside>

    );

}

export default OrderSummary;