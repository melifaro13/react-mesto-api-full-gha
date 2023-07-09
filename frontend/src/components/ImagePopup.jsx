
export default function ImagePopup(props) {

    return(
    <div className={`popup popup_type_img ${props.card ? `popup_opened` : ""} `} onClick={props.onCloseOverlay}>
        <div className="popup__container-img">
            <img src={props.card?.link} alt={props.card?.name} className="popup__img"/>
            <figcaption className="popup__caption">{props.card?.name}</figcaption>
            <button type="button" aria-label="Закрыть" className="popup__closed" onClick={props.onClose}></button>
        </div>
    </div>
    )
}