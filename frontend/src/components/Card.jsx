import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.owner._id === currentUser._id;
    const isLiked = props.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

    function handleCardClick() {
        props.onCardClick(props.card);
      }

    function handelLikeClick() {
        props.onCardLike(props.card);
      }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
      }

    return(
    <div className="element">
        <img src={props.link} alt={props.name} className="element__img" onClick={handleCardClick} />
        {isOwn && <button className="element__delete" onClick={handleDeleteClick} />} 
        <div className="element__content">
            <h2 className="element__title">{props.name}</h2>
            <div className="element__like-container">
                <button type="button" onClick={handelLikeClick} aria-label="Поставить лайк" className={cardLikeButtonClassName}></button>
                <p className="element__like-counter">{props.likes.length}</p>
            </div>
        </div>
    </div>
    )
}