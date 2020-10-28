'use strict';


const AVATAR_COUNT = 8;
const ADVERT_COUNT = 8;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECK_IN = [`12:00`, `13:00`, `14:00`];
const CHECK_OUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const DEFAULT_AVATAR = `img/avatars/default.png`;
const avatars = [];
const ROOM_PRICE = {
  min: 10000,
  max: 50000
};

const ROOM_COUNT = {
  min: 1,
  max: 5
};

const GUESTS = {
  min: 1,
  max: 5
};

const fillAvatars = () => {
  let user = `default`;
  for (let i = 1; i < AVATAR_COUNT + 1; i++) {
    user = (i < 10) ? user = `0` + i : user = i;
    avatars.push(`img/avatars/user` + user + `.png`);
  }
};

const getAvatar = () => {
  const index = window.util.getRandomInt(avatars.length);
  const item = avatars[index];
  avatars.splice(index, 1);
  return item;
};

const getFeatures = () => {
  const features = [];
  const repetition = [];
  const featuresCount = window.util.getRandomArbitrary(1, FEATURES.length);
  for (let i = 0; i < featuresCount; i++) {
    const idx = window.util.getRandomInt(FEATURES.length);
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
  const xLocation = window.util.getRandomArbitrary(window.map.PIN.width / 2, x - window.map.PIN.width / 2) - window.map.PIN.width / 2;
  const yLocation = window.util.getRandomArbitrary(window.map.LOCATION.yMin + window.map.PIN.height, window.map.LOCATION.yMax + window.map.PIN.height) - window.map.PIN.height;

  const advert = {
    "author": {
      "avatar": getAvatar() || DEFAULT_AVATAR
    },
    "offer": {
      "title": `заголовок предложения`,
      "address": xLocation + `, ` + yLocation,
      "price": window.util.getRandomArbitrary(ROOM_PRICE.min, ROOM_PRICE.max),
      "type": TYPE[window.util.getRandomInt(TYPE.length)],
      "rooms": window.util.getRandomArbitrary(ROOM_COUNT.min, ROOM_COUNT.max),
      "guests": window.util.getRandomArbitrary(GUESTS.min, GUESTS.max),
      "checkin": CHECK_IN[window.util.getRandomInt(CHECK_IN.length)],
      "checkout": CHECK_OUT[window.util.getRandomInt(CHECK_OUT.length)],
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
window.data = {
  ADVERT_COUNT,
  fillAvatars,
  getAdverts
};


