let content = document.querySelector('.content');
let profileButton = content.querySelector('.profile__button'); // Переменная кнопки редакирования профиля
let userName = content.querySelector('.profile__name'); // Переменная имени профиля 
let userJob = content.querySelector('.profile__job'); // Переменная "О себе" профиля

// Переменные логической формы редактирования пользователя
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_job');
let closePopup = popup.querySelector('.popup__button-close');

// Функция открытия формы
function handleOpenProfileForm() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

// Функция сохранения изменений формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

// Функция закрытия формы без изменений
function handleCloseProfileForm () {
    popup.classList.remove('popup_opened');
}

profileButton.addEventListener('click', handleOpenProfileForm);
popupForm.addEventListener('submit', handleFormSubmit);
closePopup.addEventListener('click', handleCloseProfileForm);