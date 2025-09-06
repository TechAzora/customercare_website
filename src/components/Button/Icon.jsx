import React from "react";

function Icon({
    children,
    className = "",
    ...props
}) {
    return (
        <i
            className={`${className} bi bi-${children}`}
            {...props}
        >
        </i>
    );
}

export default Icon;
