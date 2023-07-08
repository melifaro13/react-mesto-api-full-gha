import React from 'react';
import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default  function EditProfileAvatar(props) {

    const avatarRef  = useRef();

    useEffect( ()=> {
        avatarRef.current.value = '';
        }, [props.isOpen]
      )

      function handleChangeAvatar() {
        return avatarRef.current.value
      }

      function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        })
      }

    return(
        <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onCloseOverlay={props.onCloseOverlay}
        onSubmit={handleSubmit}
        name={'edit-avatar'}
        title={'Обновить аватар'}
        form={'editAvatarForm'} 
        buttonText={'Сохранить'}  
        >
          <input
                type="url"
                name="avatar"
                className="form__info form__info_type_avatar"
                id="avatar"
                required
                placeholder='Ссылка на аватар'
                onChange={handleChangeAvatar}
                ref={avatarRef}
          />
            <span className="avatar-error form__info-error"></span>
        </PopupWithForm> 
    )
}