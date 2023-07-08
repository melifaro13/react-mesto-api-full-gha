import React from 'react';
import { useState, useEffect } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setName(currentUser.name)
        setAbout(currentUser.about)
      }, [currentUser, props.isOpen]);
    
    function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateUser({
        name: name,
        about: about,
        })
    }

    function handleChangeName(evt) {
        setName(evt.target.value)
      }
    
    function handleChangeAbout(evt) {
        setAbout(evt.target.value)
      }

    return (
    <PopupWithForm 
              isOpen={props.isOpen}
              onClose={props.onClose}
              onCloseOverlay={props.onCloseOverlay}
              onSubmit={handleSubmit}
              name={'edit-profile'}
              title={'Редактировать профиль'}
              form={'editProfileForm'}
              buttonText={'Сохранить'}
              >
                <input
                      type="text"
                      name="name"
                      className="form__info form__info_type_name"
                      id="name"
                      required
                      placeholder='Имя'
                      minLength="2"
                      maxLength="40"
                      value={name || ""}
                      onChange={handleChangeName}
                />
                <span className="name-error form__info-error"></span>
                <input
                      type="text"
                      name="about"
                      className="form__info form__info_type_job"
                      id="job"
                      required
                      placeholder='О себе'
                      minLength="2"
                      maxLength="200"
                      value={about || ""}
                      onChange={handleChangeAbout}
                />
                <span className="job-error form__info-error"></span>
            </PopupWithForm>
    );
}