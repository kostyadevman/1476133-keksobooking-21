'use strict';

const ADVERT_COUNT = 8;
const AVATAR_COUNT = 8;
const TYPE = [`palace`, `flat`, `house `, `bungalow`];
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
  min: 1000,
  max: 3000
};

const ROOM_COUNT = {
  min: 1,
  max: 5
};

const GUESTS = {
  min: 1,
  max: 5
};

const PIN = {
  width: 50,
  height: 70
};

const avatars = [];
const DEFAULT_AVATAR = `img/avatars/default.png`;

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

const getType = () => {
  return TYPE[getRandomInt(TYPE.length)];
};

const getCheckin = () => {
  return CHECK_IN[getRandomInt(CHECK_IN.length)];
};

const getCheckout = () => {
  return CHECK_OUT[getRandomInt(CHECK_OUT.length)];
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
  const advert = {};
  const author = {};
  const offer = {};
  const location = {};

  author.avatar = getAvatar() || DEFAULT_AVATAR;
  location.x = getRandomArbitrary(PIN.width / 2, x - PIN.width / 2) - PIN.width / 2;
  location.y = getRandomArbitrary(LOCATION_Y_MIN + PIN.height, LOCATION_Y_MAX + PIN.height) - PIN.height;
  offer.title = `заголовок предложения`;
  offer.address = location.x + `, ` + location.y;
  offer.price = getRandomArbitrary(ROOM_PRICE.min, ROOM_PRICE.max);
  offer.type = getType();
  offer.rooms = getRandomArbitrary(ROOM_COUNT.min, ROOM_COUNT.max);
  offer.guests = getRandomArbitrary(GUESTS.min, GUESTS.max);
  offer.checkin = getCheckin();
  offer.checkout = getCheckout();
  offer.features = getFeatures();
  offer.description = `Описание`;
  offer.photos = PHOTOS;

  advert.autor = author;
  advert.offer = offer;
  advert.location = location;

  return advert;
};

const getAdverts = (count, x) => {
  const advertList = [];
  for (let i = 0; i < count; i++) {
    advertList.push(getAdvert(x));
  }

  return advertList;
};

const showMap = () => {
  const map = document.querySelector(`.map`);
  map.classList.remove(`map--faded`);
  return map;
};

const getPin = (advert, template) => {
  const pin = template.querySelector(`.map__pin`);
  const newPin = pin.cloneNode(true);
  const img = newPin.querySelector(`.map__pin-img`);

  newPin.style.left = advert.location.x + `px`;
  newPin.style.top = advert.location.y + `px`;
  img.src = advert.autor.avatar;
  img.alt = advert.offer.title;

  return newPin;
};

const getPins = (adverts) => {
  const pins = [];
  const pinTemplate = document.querySelector(`#pin`).content;
  for (let i = 0; i < adverts.length; i++) {
    pins.push(getPin(adverts[i], pinTemplate));
  }

  return pins;
};

const showPins = (pins, map) => {
  for (let i = 0; i < pins.length; i++) {
    map.appendChild(pins[i]);
  }
};

fillAvatars();
const map = showMap();
const adverts = getAdverts(ADVERT_COUNT, map.clientWidth);
const pins = getPins(adverts);
showPins(pins, map);

