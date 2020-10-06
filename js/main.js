'use strict';

const MOUSE_BUTTON_LEFT = 0;
const ADVERT_COUNT = 8;
const AVATAR_COUNT = 8;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
// const typeMap = {flat: `Квартира`, bungalow: `Бунгало`, house: `Дом`, palace: `Дворец`};
const CHECK_IN = [`12:00`, `13:00`, `14:00`];
const CHECK_OUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const ROOM_PRICE = {
  min: 10000,
  max: 50000
};

const ROOM_COUNT = {
  min: 1,
  max: 5
};
const roomMap = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const GUESTS = {
  min: 1,
  max: 5
};

const PIN = {
  width: 50,
  height: 70
};

const MAIN_PIN = {
  widthInit: 95,
  heightInit: 95,
  width: 95,
  height: 128
};

const avatars = [];
const DEFAULT_AVATAR = `img/avatars/default.png`;

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content;
const pin = pinTemplate.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content;
// const card = cardTemplate.querySelector(`.map__card`);
// const filter = map.querySelector(`.map__filters-container`);
const form = document.querySelector(`.ad-form`);
const formFilter = document.querySelector(`.map__filters`);
const interactiveElements = form.querySelectorAll(`.ad-form__element`);
const interactiveFilterElements = formFilter.querySelectorAll(`.map__filter`);
const interactiveFilterFeatures = formFilter.querySelector(`.map__features`);
const mainPin = map.querySelector(`.map__pin--main`);
const address = form.querySelector(`.ad-form__address`);
const rooms = form.querySelector(`.add-form__room`);
const capacity = form.querySelector(`.ad-form__capacity`);


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const fillAvatars = () => {
  let user = `default`;
  for (let i = 1; i < AVATAR_COUNT + 1; i++) {
    user = (i < 10) ? user = `0` + i : user = i;
    avatars.push(`img/avatars/user` + user + `.png`);
  }
};

const getAvatar = () => {
  const index = getRandomInt(avatars.length);
  const item = avatars[index];
  avatars.splice(index, 1);
  return item;
};

const getFeatures = () => {
  const features = [];
  const repetition = [];
  const featuresCount = getRandomArbitrary(1, FEATURES.length);
  for (let i = 0; i < featuresCount; i++) {
    const idx = getRandomInt(FEATURES.length);
    if (repetition.includes(idx)) {
      i--;
    } else {
      repetition.push(idx);
      features.push(FEATURES[idx]);
    }
  }
  return features;
};

const getAdvert = (x) => {
  const xLocation = getRandomArbitrary(PIN.width / 2, x - PIN.width / 2) - PIN.width / 2;
  const yLocation = getRandomArbitrary(LOCATION_Y_MIN + PIN.height, LOCATION_Y_MAX + PIN.height) - PIN.height;

  const advert = {
    "author": {
      "avatar": getAvatar() || DEFAULT_AVATAR
    },
    "offer": {
      "title": `заголовок предложения`,
      "address": xLocation + `, ` + yLocation,
      "price": getRandomArbitrary(ROOM_PRICE.min, ROOM_PRICE.max),
      "type": TYPE[getRandomInt(TYPE.length)],
      "rooms": getRandomArbitrary(ROOM_COUNT.min, ROOM_COUNT.max),
      "guests": getRandomArbitrary(GUESTS.min, GUESTS.max),
      "checkin": CHECK_IN[getRandomInt(CHECK_IN.length)],
      "checkout": CHECK_OUT[getRandomInt(CHECK_OUT.length)],
      "features": getFeatures(),
      "description": `Описание`,
      "photos": PHOTOS
    },
    "location": {
      "x": xLocation,
      "y": yLocation
    }
  };

  return advert;
};

const getAdverts = (count, x) => {
  const advertList = [];
  for (let i = 0; i < count; i++) {
    advertList.push(getAdvert(x));
  }

  return advertList;
};

// const showMap = () => {
//   map.classList.remove(`map--faded`);
// };

const getPin = (advert) => {
  const newPin = pin.cloneNode(true);
  const img = newPin.querySelector(`.map__pin-img`);

  newPin.style.left = advert.location.x + `px`;
  newPin.style.top = advert.location.y + `px`;
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;

  return newPin;
};

const getPins = (adverts) => {
  const pins = [];
  for (let i = 0; i < adverts.length; i++) {
    pins.push(getPin(adverts[i]));
  }

  return pins;
};

const showPins = (pins) => {
  for (let i = 0; i < pins.length; i++) {
    map.appendChild(pins[i]);
  }
};

// const getCard = (advert) => {
//   const newCard = card.cloneNode(true);
//   const setFeatures = () => {
//     newCard.querySelector(`.popup__features`).innerHTML = ``;
//     advert.offer.features.forEach((item) => {
//       const featureElement = document.createElement(`li`);
//       featureElement.classList.add(`popup__feature`);
//       featureElement.classList.add(`popup__feature--` + item);
//       newCard.querySelector(`.popup__features`).appendChild(featureElement);
//     });
//   };
//
//   const setPhotos = () => {
//     advert.offer.photos.forEach((item) => {
//       const photoElement = newCard.querySelector(`.popup__photo`).cloneNode();
//       photoElement.src = item;
//       newCard.querySelector(`.popup__photos`).appendChild(photoElement);
//     });
//     newCard.querySelector(`.popup__photos`).firstElementChild.remove();
//   };
//
//   newCard.querySelector(`.popup__title`).textContent = advert.offer.title;
//   newCard.querySelector(`.popup__text--address`).textContent = advert.offer.address;
//   newCard.querySelector(`.popup__text--price`).textContent = advert.offer.price + `₽/ночь`;
//   newCard.querySelector(`.popup__type`).textContent = typeMap[advert.offer.type];
//   newCard.querySelector(`.popup__text--capacity`).textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests;
//   newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advert.offer.checkin + ` выезд до ` + advert.offer.checkout;
//   newCard.querySelector(`.popup__description`).textContent = advert.offer.description;
//   newCard.querySelector(`.popup__avatar`).src = advert.author.avatar;
//   setFeatures();
//   setPhotos();
//
//   return newCard;
// };

// const showCard = (cardPopup) => {
//   map.insertBefore(cardPopup, filter);
// };

const mainPinMouseClickHandler = (evt) => {
  if (evt.button === MOUSE_BUTTON_LEFT) {
    setActiveState();
  }
};

const mainPinPressEnterHandler = (evt) => {
  if (evt.key === `Enter`) {
    setActiveState();
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

const setInitialState = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  deactivateFormElements();
  deactivateFilterElements();

  mainPin.addEventListener(`mousedown`, mainPinMouseClickHandler);
  mainPin.addEventListener(`keydown`, mainPinPressEnterHandler);

  setAddress(mainPin, true);
};

const setActiveState = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  activateFormElements();
  activateFilterElements();
  address.disabled = true;

  mainPin.removeEventListener(`mousedown`, mainPinMouseClickHandler);
  mainPin.removeEventListener(`keydown`, mainPinPressEnterHandler);

  setAddress(mainPin);
};

const getAddress = (element, initial = false) => {
  let addr = ``;
  if (initial) {
    addr = Math.round(element.offsetTop + MAIN_PIN.heightInit / 2) + `, ` + Math.round(element.offsetLeft + MAIN_PIN.widthInit / 2);
  } else {
    addr = element.offsetTop + MAIN_PIN.height + `, ` + Math.round(element.offsetLeft + MAIN_PIN.width / 2);
  }

  return addr;
};

const setAddress = (elem, initial) => {
  address.value = getAddress(mainPin, initial);
};

const validateRoomFitGuest = () => {
  rooms.setCustomValidity(``);
  const roomsCount = rooms.options[rooms.selectedIndex].value;
  const guestCount = capacity.options[capacity.selectedIndex].value;

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
    rooms.setCustomValidity(`Подходящие значения: ` + messages.join(`, `));
  }
};

rooms.addEventListener(`change`, function () {
  validateRoomFitGuest();
});

capacity.addEventListener(`change`, function () {
  validateRoomFitGuest();
});

window.addEventListener(`load`, function () {
  validateRoomFitGuest();
});


setInitialState();
fillAvatars();
const adverts = getAdverts(ADVERT_COUNT, map.clientWidth);
const pins = getPins(adverts);
showPins(pins);

// const cardFirst = getCard(adverts[0]);
// showCard(cardFirst);

