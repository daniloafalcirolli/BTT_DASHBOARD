import React from 'react'

const Input = ({ label, type, name, value, onChange, className, disabled }) => {
    return (
        <div className={`${className ? className : ''}`}>
            <label htmlFor={name}>
                {label}
            </label>
            <input type={type} id={name} value={value === null ? "" : value} onChange={onChange} disabled={disabled && 'disabled'}/>
        </div>
    )
}

export default Input