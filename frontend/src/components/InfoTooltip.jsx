export default function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseOverlay}>
        <div className="popup__container">
          <img src={props.image} alt={props.title} className="popup__status" />
          <h2 className="popup__message">{props.title}</h2>
          <button type="button" aria-label="Закрыть" className="popup__closed" onClick={props.onClose}></button>
        </div>
      </div>
    );
  }