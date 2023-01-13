// Переменные логичесской формы добавления карточек
const popupCard = document.querySelector('.popup_card_editors');
const popupCardForm = popupCard.querySelector('.popup__form_type_cards');
const inputDescription = popupCard.querySelector('.popup__input_type_description');
const inputLink = popupCard.querySelector('.popup__input_type_link');

const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements__template').content;

// Добавить картчку
const createCard = (img) => {

    const newCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);
    const elementsImage = newCard.querySelector('.elements__image');  // Переменная изображения карочки
    const elementsTitle = newCard.querySelector('.elements__description-title'); // Переменная названия карочки
    const elementsLike = newCard.querySelector('.elements__button-like'); // Переменная кнопки ЛАЙК
    const elementsDelete = newCard.querySelector('.elements__button-delete'); // Переменная кнопки УДАЛИТЬ

    // Наполнение каточек
    elementsImage.setAttribute("alt", img.name);
    elementsImage.setAttribute("src", img.link);
    elementsTitle.textContent = img.name;

    elementsDelete.addEventListener('click', deleteCard);
    elementsLike.addEventListener('click', likeCard);
    elementsImage.addEventListener('click', openCard);

    return newCard;
}

const renderCard = (container, cardObject, place = false) => {
    //Размещаем
    if (place) {
      container.prepend(cardObject);
    } else {
      container.append(cardObject);
    }
} 

// Удалить карту
const deleteCard = (evt) => {
    evt.target.closest(".elements__card").remove();
}

// Залайкать карту
const likeCard = (evt) => {
    evt.target.classList.toggle("elements__button-like_active");
}

// Функция сохранения изменений формы Карточек
const handleCardForm = (evt) => {
    evt.preventDefault();
        const cardToAdd = {name: inputDescription.value, link: inputLink.value};
        renderCard(elements, createCard(cardToAdd), true);
    closePopup(popupCard);
    evt.currentTarget.reset();
}



// ОТКРЫТИЕ КАРТНКИ 
const popupPic = document.querySelector('.popup_type_pic');
const popupPicImage = popupPic.querySelector(".popup__pic");
const popupPicText = popupPic.querySelector(".popup__text");

const openCard = (evt) => {
     openPopup(popupPic);

    const link = evt.currentTarget.getAttribute("src");
    const name = evt.currentTarget.getAttribute("alt");

    popupPicImage.setAttribute("alt", name);
    popupPicImage.setAttribute("src", link);
    popupPicText.textContent = name;
}


initialCards.forEach( item => renderCard(elements, createCard(item)) );

//
const content = document.querySelector('.content');
const userProfileButton = content.querySelector('.profile__button'); // Переменная кнопки редакирования профиля
const userName = content.querySelector('.profile__name'); // Переменная имени профиля 
const userJob = content.querySelector('.profile__job'); // Переменная "О себе" профиля
const cardsAdd = content.querySelector('.profile__button-add'); // Переменная добавления карточки
const closeButtons = document.querySelectorAll('.popup__button-close'); // Общая переменная зкарытия формы
const openButtons = document.querySelector('.popup') // Общая переменная открытия формы поп-ап

// Переменные логической формы редактирования пользователя
const popupUser = document.querySelector('.popup_type_user');
const popupUserForm = popupUser.querySelector('.popup__form');
const nameInput = popupUser.querySelector('.popup__input_type_name');
const jobInput = popupUser.querySelector('.popup__input_type_job');

// Функция закртия форм
const closePopup = (popup) => {
   popup.classList.remove('popup_opened');
};

// Функция открытия формы редактировани пользователя
const handleOpenProfileForm = () => {
    openPopup(popupUser);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

// Функция сохранения изменений формы редактирования пользователя
const handleFormUserSubmit = evt => {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupUser);          
}

// Функция открытия формы добавления карочки
const handleOpenCardsForm = () => {
    openPopup(popupCard);
}

//Функция открыия ФОРМ
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

userProfileButton.addEventListener('click', handleOpenProfileForm); // Присваиваем обработчик откртия редактирования пользователя
popupUserForm.addEventListener('submit', handleFormUserSubmit); // Присваиваем обработчик Пользователя
popupCardForm.addEventListener('submit', handleCardForm); // Присваиваем обработчик Карточки
cardsAdd.addEventListener('click', handleOpenCardsForm);  // Присваиваем обработчик открытия добавления карточки
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
openButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => openPopup(popup));
  });