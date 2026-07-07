import CustomerNavbar from "./CustomerNavbar";

function CustomerLayout({ children }) {
    return (
        <div className="customer-layout">
            <CustomerNavbar />

            <main className="customer-main">
                {children}
            </main>
        </div>
    );
}

export default CustomerLayout;