import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import done from '../images/Done.svg';
import cancel from '../images/Cancel.svg';

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mailName, setMailName] = useState(null);
  const [popupImage, setPopupImage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);

  useEffect(() => {
    auth.getToken()
      .then((res) => {
          setMailName(res.email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(`Ошибка: ${err}`)});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setPopupImage(done);
        setPopupTitle('Вы успешно зарегистрировались!');
        navigate('/signin');
      })
      .catch((e) => {
        console.log(e);
        setPopupImage(cancel);
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(handleInfoTooltip);
  }


  function onLogin(email, password) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then(() => {
          setIsLoggedIn(true);
          setMailName(email);
          navigate('/', { replace: true });
      })
      .catch(() => {
        setPopupImage(cancel);
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
        handleInfoTooltip();
      });
  }

  // function onLogin(email, password) {
  //   auth.authorize(email, password)
  //     .then(() => {
  //       setIsLoggedIn(true);
  //       setMailName(email);
  //       navigate('/', { replace: true });
  //     })
  //     .catch(() => {
  //       setPopupImage(cancel);
  //       setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
  //       handleInfoTooltip();
  //     });
  // }

  useEffect(() => {
    if (isLoggedIn === true) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, card]) => {
        setCurrentUser(info);
        setCards(card);
      })
      .catch((err) => {
        console.error(err);
      });
  }
 }, [isLoggedIn]);

  function handleUpdateAvatar(newAvatar) {
    api
      .editProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(newUserInfo) {
    api.editProfile(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((user) => (user._id === card._id ? newCard : user))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function closePopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltip(false);
  }

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closePopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  async function onSignOut() {
    try {
      await auth.logout();
      setIsLoggedIn(false);
      setMailName(null);
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          mail={mailName}
          onClick={onSignOut}
          isLogged={isLoggedIn}
        />  
        <Routes>
          <Route
            path='/signin'
            element={ <Login onLogin={onLogin} /> }
          />

          <Route
            path='/signup'
            element={ <Register onRegister={onRegister} /> }
          />

          <Route
            path='/'
            element={
              <>
                <ProtectedRouteElement
                  element={Main}
                  isLogged={isLoggedIn}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />

          <Route
            path='*'
            element={<Navigate to={isLoggedIn ? '/' : '/signin'} />}
          />
        </Routes>

        <EditProfileAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
        />

        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          isOpen={infoTooltip}
          onClose={closePopups}
          onCloseOverlay={closeByOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
