'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = pinTemplate.querySelector(`.map__pin`);

  const getPin = (advert) => {
    const newPin = pin.cloneNode(true);
    const img = newPin.querySelector(`.map__pin-img`);

    newPin.style.left = advert.location.x + `px`;
    newPin.style.top = advert.location.y + `px`;
    img.src = advert.author.avatar;
    img.alt = advert.offer.title;

    newPin.addEventListener(`click`, function () {
      window.card.render(window.card.get(advert));
    });
    return newPin;
  };

  const renderPins = (adverts) => {
    for (let i = 0; i < adverts.length; i++) {
      map.querySelector(`.map__pins`).appendChild(getPin(adverts[i]));
    }
  };
  window.pin = {
    renderPins
  };
})();
