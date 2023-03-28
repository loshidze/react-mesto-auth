import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { auth } from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRegisteredPopupOpen, setIsRegisteredPopupOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([profileData, cards]) => {
        setCurrentUser(profileData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRegisteredPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLikeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(data) {
    api.setProfileInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.setCard(data)
    .then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setUserEmail('');
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate('/', {replace: true});
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleRegister({password, email}) {
    auth.register(password, email)
      .then((res) => {
        navigate('/log-in', {replace: true});
        setIsRegistered(true);
        setIsRegisteredPopupOpen(true);
      })
      .catch((err) => {
        setIsRegistered(false);
        setIsRegisteredPopupOpen(true);
        console.log(err);
      })
  }

  function handleLogin({password, email}) {
    if (!password || !email) {
      return;
    }
    auth.authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} onLogout={handleLogout} />
          <Routes>
            <Route path='/' element={<ProtectedRoute
              element={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
            />}
            />
            <Route path='/sign-up' element={
              <Register onRegister={handleRegister} />
            }/>
            <Route path='/log-in' element={
              <Login onLogin={handleLogin} />
            }/>
            <Route path='*' element={loggedIn ? <Navigate to='/' /> : <Navigate to='/log-in' />}/>
          </Routes>
          <Footer />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isRegisteredPopupOpen} onClose={closeAllPopups} isRegistered={isRegistered} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
