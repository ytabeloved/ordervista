import { useEffect, useState } from "react";

import CustomerLayout from "../../components/customer/CustomerLayout";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import AddressForm from "../../components/customer/AddressForm";

import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from "../../services/addressService";

import "../../styles/customer.css";

const emptyForm = {
    direccion: "",
    comuna: "",
    ciudad: "",
    referencia: "",
    principal: false
};

function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

    const [formData, setFormData] = useState(emptyForm);

    async function loadAddresses() {
        try {
            const data = await getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar las direcciones.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAddresses();
    }, []);

    function openCreateModal() {
        setEditingAddress(null);
        setFormData(emptyForm);
        setShowModal(true);
    }

    function openEditModal(address) {
        setEditingAddress(address);

        setFormData({
            direccion: address.direccion,
            comuna: address.comuna,
            ciudad: address.ciudad,
            referencia: address.referencia || "",
            principal: address.principal === true || address.principal === 1
        });

        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setEditingAddress(null);
        setFormData(emptyForm);
    }

    async function handleSaveAddress(e) {
        e.preventDefault();

        try {
            if (editingAddress) {
                await updateAddress(editingAddress.id_direccion, formData);
            } else {
                await createAddress(formData);
            }

            await loadAddresses();
            closeModal();
        } catch (error) {
            console.error(error);
            alert("No fue posible guardar la dirección.");
        }
    }

    async function confirmDeleteAddress() {
        try {
            await deleteAddress(addressToDelete.id_direccion);
            await loadAddresses();

            setShowDeleteDialog(false);
            setAddressToDelete(null);
        } catch (error) {
            console.error(error);
            alert("No fue posible eliminar la dirección.");
        }
    }

    return (
        <CustomerLayout>
            <section className="customer-addresses">
                <header className="customer-menu-header">
                    <h1>Mis Direcciones</h1>
                    <p>Administra tus direcciones de entrega.</p>

                    <button
                        type="button"
                        className="customer-primary-button"
                        onClick={openCreateModal}
                    >
                        Nueva dirección
                    </button>
                </header>

                {loading ? (
                    <p>Cargando direcciones...</p>
                ) : (
                    <div className="address-list">
                        {addresses.length === 0 ? (
                            <div className="customer-empty-state">
                                <h3>No tienes direcciones registradas</h3>
                                <p>Agrega tu primera dirección para realizar pedidos.</p>
                            </div>
                        ) : (
                            addresses.map((address) => (
                                <article
                                    key={address.id_direccion}
                                    className="address-card"
                                >
                                    <h3>{address.direccion}</h3>

                                    <p>
                                        {address.comuna}, {address.ciudad}
                                    </p>

                                    {address.referencia && (
                                        <small>{address.referencia}</small>
                                    )}

                                    {address.principal && (
                                        <span className="address-principal">
                                            Principal
                                        </span>
                                    )}

                                    <div className="address-actions">
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() => openEditModal(address)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-danger"
                                            onClick={() => {
                                                setAddressToDelete(address);
                                                setShowDeleteDialog(true);
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                )}
            </section>

            {showModal && (
                <Modal
                    title={editingAddress ? "Editar dirección" : "Nueva dirección"}
                    onClose={closeModal}
                >
                    <AddressForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSaveAddress}
                        onCancel={closeModal}
                        submitText={editingAddress ? "Actualizar" : "Guardar"}
                    />
                </Modal>
            )}

            <ConfirmDialog
                open={showDeleteDialog}
                title="Eliminar dirección"
                message={`¿Seguro que deseas eliminar la dirección ${addressToDelete?.direccion ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDeleteAddress}
                onCancel={() => {
                    setShowDeleteDialog(false);
                    setAddressToDelete(null);
                }}
            />
        </CustomerLayout>
    );
}

export default Addresses;