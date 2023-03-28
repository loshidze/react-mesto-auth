import React from 'react';
import PopupWithForm from './PopupWithForm';
import trueRegImage from '../images/reg-true.svg';
import falseRegImage from '../images/reg-false.svg'

function InfoTooltip({ isOpen, onClose, isRegistered }) {

  return (
    <PopupWithForm name={'infotooltip'} isOpen={isOpen} onClose={onClose}>
      <img
      className='popup__reg-icon'
        src={isRegistered ? trueRegImage : falseRegImage}
        alt={isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      />
      <p className='popup__reg-text'>
        {isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </p>
    </PopupWithForm>
  )
}

export default InfoTooltip;
