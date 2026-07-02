import { ImageIcon } from "lucide-react";

function ProductImage({
    image,
    name,
    description,
    size = "md"
}) {
    return (
        <div className={`product-image-cell ${size}`}>
            {image ? (
                <img
                    src={image}
                    alt={name}
                />
            ) : (
                <div className="product-image-placeholder">
                    <ImageIcon size={24} />
                </div>
            )}

            <div className="product-image-info">
                <strong>{name}</strong>

                {description && (
                    <p>{description}</p>
                )}
            </div>
        </div>
    );
}

export default ProductImage;