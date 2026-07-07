import {
    Plus,
    Minus,
    Trash2
} from "lucide-react";

function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {

    return (

        <article className="cart-item">

            <img
                src={item.imagen}
                alt={item.nombre}
            />

            <div className="cart-info">

                <h3>{item.nombre}</h3>

                <p>

                    ${Number(item.precio).toLocaleString("es-CL")} c/u

                </p>

            </div>

            <div className="cart-quantity">

                <button
                    type="button"
                    onClick={() => onDecrease(item.id_producto)}
                >

                    <Minus size={16} />

                </button>

                <span>

                    {item.cantidad}

                </span>

                <button
                    type="button"
                    onClick={() => onIncrease(item.id_producto)}
                >

                    <Plus size={16} />

                </button>

            </div>

            <strong>

                $

                {(item.precio * item.cantidad).toLocaleString("es-CL")}

            </strong>

            <button
                type="button"
                className="cart-delete-button"
                onClick={() => onRemove(item.id_producto)}
            >

                <Trash2 size={18} />

            </button>

        </article>

    );

}

export default CartItem;