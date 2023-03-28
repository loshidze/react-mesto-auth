import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const inputCardName = React.useRef();
  const inputCardImage = React.useRef();

  React.useEffect(() => {
    inputCardName.current.value = '';
    inputCardImage.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace ({
      name: inputCardName.current.value,
      link: inputCardImage.current.value,
    });
  }

  return (
    <PopupWithForm name={'card'} title='Новое место' buttonSubmit={'Создать'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input" ref={inputCardName} id="cardname" type="text" name="cardname" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="cardname-error popup__input-text-error"></span>
      <input className="popup__input" ref={inputCardImage} id="link" type="url" name="link" placeholder="Ссылка на картинку" required/>
      <span className="link-error popup__input-text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
