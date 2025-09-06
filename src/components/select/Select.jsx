import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    name,
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            {label && (
                <label htmlFor={id} className="form-label">
                    {label}
                </label>
            )}
            <select name={name} id={id} ref={ref}{...props} className={`form-control ${className}`}>
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);