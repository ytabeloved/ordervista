// Avatar reutilizable para mostrar iniciales de usuarios o clientes
function Avatar({ firstName = "", lastName = "", size = "md" }) {
    const firstInitial = firstName?.charAt(0) || "";
    const lastInitial = lastName?.charAt(0) || "";

    const initials = `${firstInitial}${lastInitial}`.toUpperCase() || "U";

    return (
        <div className={`avatar avatar-${size}`}>
            {initials}
        </div>
    );
}

export default Avatar;