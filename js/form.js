'use strict';

const roomMap = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const priceMap = {flat: 1000, bungalow: 0, house: 5000, palace: 10000};
const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const formFilter = document.querySelector(`.map__filters`);
const interactiveElements = form.querySelectorAll(`.ad-form__element`);
const interactiveFilterElements = formFilter.querySelectorAll(`.map__filter`);
const interactiveFilterFeatures = formFilter.querySelector(`.map__features`);
const formFieldTitle = form.querySelector(`.ad-form__title`);
const formFieldAddress = form.querySelector(`.ad-form__address`);
const formFieldRooms = form.querySelector(`.add-form__room`);
const formFieldCapacity = form.querySelector(`.ad-form__capacity`);
const formFieldType = form.querySelector(`.ad-form__type`);
const formFieldPrice = form.querySelector(`.ad-form__price`);
const formFieldTimeIn = form.querySelector(`.ad-form__timein`);
const formFieldTimeOut = form.querySelector(`.ad-form__timeout`);
const formFieldDescription = form.querySelector(`.ad-form__description`);
const mainPin = map.querySelector(`.map__pin--main`);
const reset = form.querySelector(`.ad-form__reset`);
const successTemplate = document.querySelector(`#success`).content;
const errorTemplate = document.querySelector(`#error`).content;

formFieldType.addEventListener(`change`, function () {
  setMinPrice();
});

formFieldRooms.addEventListener(`change`, function () {
  validateRoomFitGuest();
});

formFieldCapacity.addEventListener(`change`, function () {
  validateRoomFitGuest();
});

const syncCheckTime = (major, minor) => {
  minor.options[major.selectedIndex].selected = true;
};

formFieldTimeOut.addEventListener(`change`, function () {
  syncCheckTime(formFieldTimeOut, formFieldTimeIn);
});

formFieldTimeIn.addEventListener(`change`, function () {
  syncCheckTime(formFieldTimeIn, formFieldTimeOut);
});

const setMinPrice = () => {
  const minPrice = priceMap[formFieldType.options[formFieldType.selectedIndex].value];
  formFieldPrice.placeholder = minPrice;
  formFieldPrice.setAttribute(`min`, minPrice);
};

const getAddress = (element, initial = false) => {
  let coord = {
    x: ``,
    y: ``
  };

  coord.x = Math.round(element.offsetLeft + window.map.MAIN_PIN.width / 2);

  if (initial) {
    coord.y = Math.round(element.offsetTop + window.map.MAIN_PIN.heightInit / 2);
  } else {
    coord.y = element.offsetTop + window.map.MAIN_PIN.height;
  }

  return coord.x + `, ` + coord.y;
};

const setAddress = (elem, initial) => {
  formFieldAddress.value = getAddress(mainPin, initial);
};

const validateRoomFitGuest = () => {
  formFieldRooms.setCustomValidity(``);
  const roomsCount = formFieldRooms.options[formFieldRooms.selectedIndex].value;
  const guestCount = formFieldCapacity.options[formFieldCapacity.selectedIndex].value;

  if (!roomMap[roomsCount].includes(guestCount)) {
    const messages = roomMap[roomsCount].map((item) => {
      let res = ``;
      if (item === `0`) {
        res = `не для гостей`;
      } else {
        res = `для ` + item + (item === `1` ? ` гостя` : ` гостей`);
      }

      return res;
    });
    formFieldRooms.setCustomValidity(`Подходящие значения: ` + messages.join(`, `));
  }
};

const deactivateFormElements = () => {
  interactiveElements.forEach((elem) => {
    elem.disabled = true;
  });
};

const deactivateFilterElements = () => {
  interactiveFilterElements.forEach((elem) => {
    elem.disabled = true;
  });
  interactiveFilterFeatures.disabled = true;
};

const activateFormElements = () => {
  interactiveElements.forEach((elem) => {
    elem.disabled = false;
  });
};

const activateFilterElements = () => {
  interactiveFilterElements.forEach((elem) => {
    elem.disabled = false;
  });
  interactiveFilterFeatures.disabled = false;
};

const setFromInitialState = () => {
  clearForm();
  setMinPrice();
  syncCheckTime(formFieldTimeIn, formFieldTimeOut);
  validateRoomFitGuest();
};

const successHandler = () => {
  window.map.setInitialState();
  const successMessage = successTemplate.querySelector(`.success`).cloneNode(true);
  document.querySelector(`main`).appendChild(successMessage);

  successMessage.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    successMessage.remove();
  });

  document.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.preventDefault();
      successMessage.remove();
    });
  });
};

const errorHandler = (message) => {
  const error = errorTemplate.querySelector(`.error`).cloneNode(true);
  const closeError = error.querySelector(`.error__button`);

  error.querySelector(`.error__message`).textContent = message;
  document.querySelector(`main`).appendChild(error);

  closeError.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    error.remove();
  });

  error.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    error.remove();
  });

  document.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, function () {
      error.remove();
    });
  });
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  window.backend.save(formData, successHandler, errorHandler);
};

form.addEventListener(`submit`, formSubmitHandler);

const clearForm = () => {
  formFieldTitle.value = ``;
  formFieldAddress.value = ``;
  formFieldPrice.value = ``;
  formFieldDescription.value = ``;
};

reset.addEventListener(`click`, () => {
  window.map.setInitialState();
});


window.form = {
  setInitial: setFromInitialState,
  setAddress,
  formFieldAddress,
  formFieldTimeIn,
  formFieldTimeOut,
  setMinPrice,
  validateRoomFitGuest,
  syncCheckTime,
  activateFormElements,
  deactivateFormElements,
  activateFilterElements,
  deactivateFilterElements
};

