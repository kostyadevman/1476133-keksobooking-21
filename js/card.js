'use strict';


(function () {
  const typeMap = {flat: `Квартира`, bungalow: `Бунгало`, house: `Дом`, palace: `Дворец`};
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content;
  const card = cardTemplate.querySelector(`.map__card`);
  const filter = map.querySelector(`.map__filters-container`);

  const getCard = (advert) => {
    const newCard = card.cloneNode(true);
    const setFeatures = () => {
      newCard.querySelector(`.popup__features`).innerHTML = ``;
      advert.offer.features.forEach((item) => {
        const featureElement = document.createElement(`li`);
        featureElement.classList.add(`popup__feature`);
        featureElement.classList.add(`popup__feature--` + item);
        newCard.querySelector(`.popup__features`).appendChild(featureElement);
      });
    };

    const setPhotos = () => {
      advert.offer.photos.forEach((item) => {
        const photoElement = newCard.querySelector(`.popup__photo`).cloneNode();
        photoElement.src = item;
        newCard.querySelector(`.popup__photos`).appendChild(photoElement);
      });
      newCard.querySelector(`.popup__photos`).firstElementChild.remove();
    };

    if (`offer` in advert) {
      newCard.querySelector(`.popup__title`).textContent = advert.offer.title;
      newCard.querySelector(`.popup__text--address`).textContent = advert.offer.address;
      newCard.querySelector(`.popup__text--price`).textContent = advert.offer.price + `₽/ночь`;
      newCard.querySelector(`.popup__type`).textContent = typeMap[advert.offer.type];
      newCard.querySelector(`.popup__text--capacity`).textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests;
      newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + advert.offer.checkin + ` выезд до ` + advert.offer.checkout;
      newCard.querySelector(`.popup__description`).textContent = advert.offer.description;
      newCard.querySelector(`.popup__avatar`).src = advert.author.avatar;
      setFeatures();
      setPhotos();
    }

    newCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
      newCard.remove();
    });

    document.addEventListener(`keydown`, function (evt) {
      window.util.isEscEvent(evt, () => {
        newCard.remove();
      });
    });

    return newCard;
  };

  const removeCardFromMap = () => {
    const existedCard = map.querySelector(`.map__card`);
    if (existedCard) {
      existedCard.remove();
    }
  };

  const renderCard = (cardItem) => {
    removeCardFromMap();
    map.insertBefore(cardItem, filter);
  };

  window.card = {
    get: getCard,
    render: renderCard,
    remove: removeCardFromMap
  };
})();
