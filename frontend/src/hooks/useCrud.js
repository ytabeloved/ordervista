import { useEffect, useState } from "react";

function useCrud({
    getAll,
    createItem,
    updateItem,
    deleteItem,
    getId,
    initialFormData,
    mapItemToForm,
    buildPayload,
    errorMessages = {}
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState(initialFormData);

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    async function loadItems() {
        setLoading(true);

        try {
            const data = await getAll();
            setItems(data);
        } catch (error) {
            console.error(error);
            alert(errorMessages.load || "No fue posible cargar la información.");
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setFormData(initialFormData);
    }

    function openCreate() {
        setEditingItem(null);
        resetForm();
        setShowModal(true);
    }

    function openEdit(item) {
        setEditingItem(item);
        setFormData(mapItemToForm(item));
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setEditingItem(null);
        resetForm();
    }

    function openDelete(item) {
        setItemToDelete(item);
        setShowDeleteModal(true);
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
        setItemToDelete(null);
    }

    async function submit(e) {
        e.preventDefault();

        try {
            const payload = buildPayload(formData);

            if (editingItem) {
                await updateItem(getId(editingItem), payload);
            } else {
                await createItem(payload);
            }

            await loadItems();
            closeModal();
        } catch (error) {
            console.error(error);
            alert(errorMessages.save || "No fue posible guardar la información.");
        }
    }

    async function confirmDelete() {
        try {
            await deleteItem(getId(itemToDelete));
            await loadItems();
            closeDeleteModal();
        } catch (error) {
            console.error(error);
            alert(errorMessages.delete || "No fue posible eliminar la información.");
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    return {
        items,
        loading,
        formData,
        setFormData,
        showModal,
        editingItem,
        openCreate,
        openEdit,
        closeModal,
        submit,
        showDeleteModal,
        itemToDelete,
        openDelete,
        closeDeleteModal,
        confirmDelete,
        loadItems
    };
}

export default useCrud;