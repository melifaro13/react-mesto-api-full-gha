import React from 'react';

export default function PopupWithForm(props) {
    
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""} `} onClick={props.onCloseOverlay}>
        <div className="popup__container">
            <h3 className="popup__text">{props.title}</h3>
            <form name={props.form} className="form" onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className="form__save-button">{props.buttonText}</button>
            </form>
        <button type="button" aria-label="Закрыть" className="popup__closed" onClick={props.onClose}></button>
        </div>
    </div>
    )
}