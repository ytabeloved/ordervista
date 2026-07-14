function OrderTypeSelector({
    orderTypeId,
    setOrderTypeId,
    orderTypes = []
}) {
    return (
        <section className="checkout-options">
            <h2>Tipo de Pedido</h2>

            <div className="order-type-group">
                {orderTypes.map((type) => (
                    <label
                        key={type.id_tipo_pedido}
                        className="order-type-option"
                    >
                        <input
                            type="radio"
                            name="orderType"
                            checked={orderTypeId === type.id_tipo_pedido}
                            onChange={() => setOrderTypeId(type.id_tipo_pedido)}
                        />

                        {type.nombre}
                    </label>
                ))}
            </div>
        </section>
    );
}

export default OrderTypeSelector;