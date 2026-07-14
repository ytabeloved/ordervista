import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAddresses } from "../../services/addressService";

function AddressSelector({

    orderType,
    selectedAddress,
    setSelectedAddress

}) {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {

        loadAddresses();

    }, []);

    async function loadAddresses() {

        try {

            const data = await getAddresses();

            setAddresses(data);

            if (!selectedAddress) {

                const principal = data.find(
                    address => address.principal
                );

                if (principal) {

                    setSelectedAddress(
                        principal.id_direccion
                    );

                }

            }

        } catch (error) {

            console.error(error);

        }

    }

    if (orderType !== "delivery") {

        return null;

    }

    return (

        <section className="checkout-options">

            <h2>

                Direccion de despacho

            </h2>

            <div className="address-selector">

                {addresses.map(address => (

                    <label
                        key={address.id_direccion}
                        className="address-option"
                    >

                        <input
                            type="radio"
                            checked={
                                selectedAddress ===
                                address.id_direccion
                            }
                            onChange={() =>
                                setSelectedAddress(
                                    address.id_direccion
                                )
                            }
                        />

                        <div>

                            <strong>

                                {address.direccion}

                            </strong>

                            <p>

                                {address.comuna}

                                {" - "}

                                {address.ciudad}

                            </p>

                        </div>

                    </label>

                ))}

            </div>

            <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/addresses")}
            >

                Administrar direcciones

            </button>

        </section>

    );

}

export default AddressSelector;