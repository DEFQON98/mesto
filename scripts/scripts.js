//=======ПЕРЕМЕННЫЕ=============

//Элементы на странице
const popupUser = document.querySelector('.popup_type_user'); // Элемент редактирования пользователя
const popupCard = document.querySelector('.popup_card_editors'); // Элемент добавления карточки
const popupPic = document.querySelector('.popup_type_pic'); // Элемент открытия карточки во весь экран

const profileName = document.querySelector('.profile__name'); // Элемент имени в профиле
const profileJob = document.querySelector('.profile__job'); // Элемент рода занятий  в профиле 

const element = document.querySelector('.elements'); // Элемент картоек

const spreadedPic = popupPic.querySelector('.popup__pic'); // Элемент изображения во весь экран
const textToSpreadedPic = popupPic.querySelector('.popup__text'); // Элемент текста под изображением во весь экран

const elementTemplate = document.querySelector('.elements__template').content;

//Формы, инпуты и сабмиты
const formUser = popupUser.querySelector('.popup__form'); // Форма редактирования профиля 
const inputsUserForm = formUser.querySelectorAll('.popup__input'); // Инпуты формы редактирования профиля
const buttonSubmitUser = formUser.querySelector('.popup__button-submit'); // Кнопка сохранения изменений формы редактирования профиля

const formCard = popupCard.querySelector('.popup__form'); // Форма добавления карточек
const inputsNewCardForm = formCard.querySelectorAll('.popup__input'); // Инпуты формы добавления карочек
const buttonSubmitNewCard = formCard.querySelector('.popup__button-submit'); // Кнопка сохранения изменений формы добавления карточек

const inputName = formUser.querySelector('.popup__input_type_name'); // Инпут имени в редактировании профиля
const inputJob = formUser.querySelector('.popup__input_type_job'); // Инпут рода занятий в редактировании профиля

const inputCardName = formCard.querySelector('.popup__input_type_description'); // Инпут названия карточки
const inputCardLink = formCard.querySelector('.popup__input_type_link'); // Инпут ссылки на каринку в карточке

//Кнопки
const buttonOpenUserPopup = document.querySelector('.profile__button'); // Кнопка открыия попапа редактирования пользователя 
const buttonOpenNewCardPopup = document.querySelector('.profile__button-add'); // Кнопка открытия попапа добавления карточки
const buttonCloseUserPopup = popupUser.querySelector('.popup__button-close'); // Кнопка закрытия попапа "редактирования пользователя"
const buttonCloseCardPopup = popupCard.querySelector('.popup__button-close'); // Кнопка закрытия попапа "добавления карточки"
const buttonClosePicPopup = popupPic.querySelector('.popup__button-close'); // Кнопка закрытия попапа "изображения на весь жкран"

//=======ФУНКЦИИ=======

//Открытие попапа
const openPopup = (popupType) => {
    popupType.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapePress);
    popupType.addEventListener('click', handleSideClick);
}

//Закрытие попапа
const closePopup = (popupType) => {
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapePress);
    popupType.removeEventListener('click', handleSideClick);
}

// Открытие попапа для редактирования профиля
const openUserPopup = () => {
    openPopup(popupUser);

    // Копируем изначальное описание в форму
    inputName.value = profileName.textContent.trim();
    inputJob.value = profileJob.textContent.trim();

    // Проверяем валидность формы при открытии
    Array.from(inputsUserForm).forEach( (input) => {
        checkValidity(formUser, input, objectOfSettings);
    });
    toggleButtonState(inputsUserForm, buttonSubmitUser, objectOfSettings);    
}

// Открытие попапа для добавления карточки
const openCardPopup = () => {
    openPopup(popupCard);
    
    // Проверяем валидность при открытии
    toggleButtonState(inputsNewCardForm, buttonSubmitNewCard, objectOfSettings);
}

// Закрытие попапа клавишей ESC
const handleEscapePress = (evt) => {
    if (evt.key === 'Escape') {
        const popupType = document.querySelector('.popup_opened');
        closePopup(popupType);
    }
}

// Закрытие попапа кликом мыши за пределами самого попапа
const handleSideClick = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

const handleProfileForm = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupUser);
}

const handleNewCardForm = (evt) => {
    evt.preventDefault(); 
    const cardToAdd = {name: inputCardName.value, link: inputCardLink.value};
    renderCard(element, createCard(cardToAdd), true);
    closePopup(popupCard);
    evt.currentTarget.reset();
}

// Удалить карточку
const removeCard = (evt) => {
    evt.target.closest('.elements__card').remove();
}

// Залайкать карту
const likeCard = (evt) => {
    evt.target.classList.toggle('elements__button-like_active');
}

// Окрытие попапа изображения на вес экран
const spreadCard = (img) => {
    openPopup(popupPic);
    spreadedPic.setAttribute('alt', img.name);
    spreadedPic.setAttribute('src', img.link);
    textToSpreadedPic.textContent = img.name;
}

// Добавить карту на сайт
const createCard = (img) => {
    
    const elementCard = elementTemplate.querySelector('.elements__card').cloneNode(true);
    const elementPic = elementCard.querySelector('.elements__image');
    const elementText = elementCard.querySelector('.elements__description-title');
    const elementLike = elementCard.querySelector('.elements__button-like');
    const elementDelete = elementCard.querySelector('.elements__button-delete');

    elementPic.setAttribute('alt', img.name);
    elementPic.setAttribute('src', img.link);
    elementText.textContent = img.name;

    elementDelete.addEventListener('click', removeCard);
    elementLike.addEventListener('click', likeCard);
    elementPic.addEventListener('click', () => { spreadCard(img) });

    return elementCard;
}

const renderCard = (container, cardObject, place = false) => {
    //Размещаем
    if (place) {
      container.prepend(cardObject);
    } else {
      container.append(cardObject);
    }
} 

// Задаем начальные карты
initialCards.forEach( item => renderCard(element, createCard(item), false) );

// Слушаем события - открытие, закрытие, сабмит
buttonOpenUserPopup.addEventListener('click', openUserPopup);
buttonOpenNewCardPopup.addEventListener('click', openCardPopup);

buttonCloseUserPopup.addEventListener('click', () => {closePopup(popupUser)});
buttonCloseCardPopup.addEventListener('click', () => {closePopup(popupCard)});
buttonClosePicPopup.addEventListener('click', () => {closePopup(popupPic)});

formUser.addEventListener('submit', handleProfileForm);
formCard.addEventListener('submit', handleNewCardForm);