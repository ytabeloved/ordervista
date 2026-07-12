const STORAGE_KEY = "ordervista_receipt_payments";

export function getReceiptPayments() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

export function getReceiptPayment(idPedido) {
    const payments = getReceiptPayments();
    return payments[idPedido] || null;
}

export function saveReceiptPayment(idPedido, paymentMethod) {
    const payments = getReceiptPayments();

    payments[idPedido] = {
        id_pedido: idPedido,
        metodo_pago: paymentMethod,
        estado_pago: "PAGADO",
        fecha_pago: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));

    return payments[idPedido];
}