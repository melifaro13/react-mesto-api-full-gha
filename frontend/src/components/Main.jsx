import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Main(props) {

const currentUser = React.useContext(CurrentUserContext);

    return(
    <div className="content">
        <section className="profile">
            <div className="profile__card">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                    <button type="button" aria-label="Изменить аватар" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" aria-label="Редактировать профиль" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__information">{currentUser.about}</p>
                </div>
            </div>
            <button type="button" aria-label="Добавить фотографию" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements">
        { props.cards.map((card) => (
            <Card
              card={card}
              key={card._id} 
              link={card.link}
              name={card.name}
              likes={card.likes}
              owner={card.owner}             
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ) )          
        }    
        </section>
    </div>
    )
}