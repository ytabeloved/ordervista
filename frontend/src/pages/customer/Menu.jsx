import { useEffect, useState } from "react";

import CustomerLayout from "../../components/customer/CustomerLayout";
import CategoryTabs from "../../components/customer/CategoryTabs";
import ProductGrid from "../../components/customer/ProductGrid";

import { getMenu } from "../../services/menuService";

import "../../styles/customer.css";

function Menu() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMenu() {
            try {
                const data = await getMenu();

                setCategories(data.categories || []);
                setProducts(data.products || []);
            } catch (error) {
                console.error(error);
                alert("No fue posible cargar el menú.");
            } finally {
                setLoading(false);
            }
        }

        loadMenu();
    }, []);

    return (
        <CustomerLayout>
            <section className="customer-menu">
                <header className="customer-menu-header">
                    <h1>Nuestro Menú</h1>

                    <p>
                        Ingredientes frescos, sabores audaces, elaborados diariamente
                    </p>
                </header>

                <div className="customer-search">
                    <input
                        type="text"
                        placeholder="Buscar en el menú..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p>Cargando menú...</p>
                ) : (
                    <>
                        <CategoryTabs
                            categories={categories}
                            selected={selectedCategory}
                            onChange={setSelectedCategory}
                        />

                        <ProductGrid
                            products={products}
                            selectedCategory={selectedCategory}
                            search={search}
                        />
                    </>
                )}
            </section>
        </CustomerLayout>
    );
}

export default Menu;