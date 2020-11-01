'use strict';

const MAX_ADVERTS = 5;
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content;
const pin = pinTemplate.querySelector(`.map__pin`);

const getPin = (advert) => {
  const newPin = pin.cloneNode(true);
  const img = newPin.querySelector(`.map__pin-img`);

  newPin.style.left = advert.location.x + `px`;
  newPin.style.top = advert.location.y + `px`;
  img.src = advert.author.avatar;
  if (`offer` in advert) {
    img.alt = advert.offer.title;
  }

  newPin.addEventListener(`click`, function () {
    window.card.render(window.card.get(advert));
  });
  return newPin;
};

const renderPins = (adverts) => {
  const advertCount = adverts.length > MAX_ADVERTS ?
    MAX_ADVERTS :
    adverts.length;

  for (let i = 0; i < advertCount; i++) {
    map.querySelector(`.map__pins`).appendChild(getPin(adverts[i]));
  }
};
const removePins = () => {
  map.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((e) => e.parentNode.removeChild(e));
};

window.pin = {
  renderAll: renderPins,
  removeAll: removePins
};

