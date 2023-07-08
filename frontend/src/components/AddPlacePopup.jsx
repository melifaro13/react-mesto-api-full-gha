import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

    const [placeName, setPlaceName] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    useEffect(() => {
        setPlaceName('')
        setPlaceLink('')
      }, [props.isOpen]);

    function handleSubmit(evt) {
    evt.preventDefault()
    props.onAddPlace({
        name: placeName,
        link: placeLink,
        })
    }
    
    function handleChangePlaceName(evt) {
        setPlaceName(evt.target.value)
    }
        
    function handleChangePlaceLink(evt) {
        setPlaceLink(evt.target.value)
    }

    return(
        <PopupWithForm 
              isOpen={props.isOpen}
              onClose={props.onClose}
              onCloseOverlay={props.onCloseOverlay}
              name={'add-card'}
              title={'Новое место'}
              form={'addCardForm'}
              buttonText={'Создать'}
              onSubmit={handleSubmit}
            >
                <input
                      type="text"
                      name="place"
                      className="form__info form__info_type_place"
                      id="place"
                      required
                      placeholder='Название'
                      minLength="2"
                      maxLength="20"
                      onChange={handleChangePlaceName}
                />
                <span className="place-error form__info-error"></span>
                <input
                      type="url"
                      name="link"
                      className="form__info form__info_type_link"
                      id="link"
                      required
                      placeholder='Ссылка на картинку'
                      onChange={handleChangePlaceLink}
                />
                <span className="link-error form__info-error"></span>
              </PopupWithForm>    

    )
}