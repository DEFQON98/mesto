// КАРТОЧКИ
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Переменные логичесской формы добавления карточек
const popupCard = document.querySelector('.popup_card_editors');
const popupCardsForm = popupCard.querySelector('.popup__form_type_cards');
const typeDescription = popupCard.querySelector('.popup__input_type_description');
const typeLink = popupCard.querySelector('.popup__input_type_link');

const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements__template').content;

// Добавить картчку
const createCard = (img) => {

    const elementsCard = elementsTemplate.querySelector('.elements__card').cloneNode(true);
    const elementsImage = elementsCard.querySelector('.elements__image');  // Переменная изображения карочки
    const elementsTitle = elementsCard.querySelector('.elements__description-title'); // Переменная названия карочки
    const elementsLike = elementsCard.querySelector('.elements__button-like'); // Переменная кнопки ЛАЙК
    const elementsDelete = elementsCard.querySelector('.elements__button-delete'); // Переменная кнопки УДАЛИТЬ

    // Наполнение каточек
    elementsImage.setAttribute("alt", img.name);
    elementsImage.setAttribute("src", img.link);
    elementsTitle.textContent = img.name;

    elementsDelete.addEventListener('click', deleteCard);
    elementsLike.addEventListener('click', likeCard);
    elementsImage.addEventListener('click', openCard);

    return elementsCard;
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
    const popupType = evt.target.closest(".popup");
    evt.preventDefault();
    if (typeDescription.value !== "" && typeLink.value !== "") {
        const cardToAdd = {name: typeDescription.value, link: typeLink.value};
        renderCard(elements, createCard(cardToAdd), true);
    }
    closePopup(popupType);
    evt.currentTarget.reset();
}



// ОТКРЫТИЕ КАРТНКИ 
const popupPic = document.querySelector('.popup_type_pic');
const picOpen = popupPic.querySelector(".popup__pic");
const picTextOpen = popupPic.querySelector(".popup__text");
const buttonClosePicPopup = popupPic.querySelector(".popup__close");

const openCard = (evt) => {
    popupPic.classList.add('popup_opened');

    const link = evt.target.closest(".elements__card").querySelector(".elements__image").getAttribute("src");
    const name = evt.target.closest(".elements__card").querySelector(".elements__description-title").textContent;

    picOpen.setAttribute("alt", name);
    picOpen.setAttribute("src", link);
    picTextOpen.textContent = name;
}


initialCards.forEach( item => renderCard(elements, createCard(item), false) );

//
const content = document.querySelector('.content');
const profileButton = content.querySelector('.profile__button'); // Переменная кнопки редакирования профиля
const userName = content.querySelector('.profile__name'); // Переменная имени профиля 
const userJob = content.querySelector('.profile__job'); // Переменная "О себе" профиля
const cardsAdd = content.querySelector('.profile__button-add'); // Переменная добавления карточки
const popup = document.querySelector('.popup') // Общая переменная формы поп-ап
const closeButtons = document.querySelectorAll('.popup__button-close'); // Общая переменная зкарытия формы

// Переменные логической формы редактирования пользователя
const popupUser = document.querySelector('.popup_type_user');
const popupForm = popupUser.querySelector('.popup__form');
const nameInput = popupUser.querySelector('.popup__input_type_name');
const jobInput = popupUser.querySelector('.popup__input_type_job');

// Функция закртия форм
const closePopup = (popup) => {
   popup.classList.remove('popup_opened');
};

// Функция открытия формы редактировани пользователя
const handleOpenProfileForm = () => {
    popupUser.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

// Функция сохранения изменений формы редактирования пользователя
const handleFormSubmit = evt => {
    const popupType = evt.target.closest(".popup");
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(popupType);
}

// Функция открытия формы добавления карочки
const handleOpenCardsForm = () => {
    popupCard.classList.add('popup_opened');
}

profileButton.addEventListener('click', handleOpenProfileForm); // Присваиваем обработчик откртия редактирования пользователя
popupForm.addEventListener('submit', handleFormSubmit); // Присваиваем обработчик Пользователя
popupCardsForm.addEventListener('submit', handleCardForm); // Присваиваем обработчик Карточки
cardsAdd.addEventListener('click', handleOpenCardsForm);  // Присваиваем обработчик открытия добавления карточки
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});