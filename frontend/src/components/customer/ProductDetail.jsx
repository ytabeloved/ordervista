import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

import CustomerLayout from "../../components/customer/CustomerLayout";
import { getMenu } from "../../services/menuService";

import "../../styles/customer.css";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getMenu();

                const foundProduct = data.products.find(
                    (item) => item.id_producto === Number(id)
                );

                setProduct(foundProduct || null);
            } catch (error) {
                console.error(error);
                alert("No fue posible cargar el producto.");
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <CustomerLayout>
                <p>Cargando producto...</p>
            </CustomerLayout>
        );
    }

    if (!product) {
        return (
            <CustomerLayout>
                <p>Producto no encontrado.</p>
            </CustomerLayout>
        );
    }

    return (
        <CustomerLayout>
            <section className="product-detail">
                <button
                    className="product-detail-back"
                    onClick={() => navigate("/menu")}
                >
                    <ArrowLeft size={18} />
                    Back to menu
                </button>

                <div className="product-detail-card">
                    <div className="product-detail-image">
                        {product.imagen ? (
                            <img src={product.imagen} alt={product.nombre} />
                        ) : (
                            <div className="customer-product-placeholder">
                                Sin imagen
                            </div>
                        )}
                    </div>

                    <div className="product-detail-info">
                        <span className="customer-product-category">
                            {product.categoria}
                        </span>

                        <h1>{product.nombre}</h1>

                        <p>{product.descripcion || "Sin descripción"}</p>

                        <strong>
                            ${Number(product.precio).toLocaleString("es-CL")}
                        </strong>

                        <button className="customer-add-button">
                            <Plus size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>
        </CustomerLayout>
    );
}

export default ProductDetail;