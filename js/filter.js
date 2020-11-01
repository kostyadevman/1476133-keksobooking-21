'use strict';

const SELECTED_INDEX_ANY = 0;
const PRICE_MIDDLE = 10000;
const PRICE_HIGH = 50000;
const priceMap = {
  low: (value) => {
    return value < PRICE_MIDDLE;
  },
  middle: (value) => {
    return value >= PRICE_MIDDLE && value <= PRICE_HIGH;
  },
  high: (value) => {
    return value > PRICE_HIGH;
  }
};
let adverts = [];
const formFilters = document.querySelector(`.map__filters`);
const type = formFilters.querySelector(`#housing-type`);
const price = formFilters.querySelector(`#housing-price`);
const rooms = formFilters.querySelector(`#housing-rooms`);
const guests = formFilters.querySelector(`#housing-guests`);
const features = formFilters.querySelector(`.map__features`);


const onLoad = (data) => {
  adverts = data;
  updateAdverts();
  setFilterInitialState();
};

const isAnySelected = (field) => {
  return field.options[field.selectedIndex].value === `any`;
};

const filterType = (advert) => {
  return isAnySelected(type) ||
    advert.offer.type === type.options[type.selectedIndex].value;
};

const filterPrice = (advert) => {
  return isAnySelected(price) ||
    priceMap[price.options[price.selectedIndex].value](advert.offer.price);
};

const filterRooms = (advert) => {
  return isAnySelected(rooms) ||
    advert.offer.rooms.toString() === rooms.options[rooms.selectedIndex].value;
};

const filterGuests = (advert) => {
  return isAnySelected(guests) ||
    advert.offer.guests.toString() === guests.options[guests.selectedIndex].value;
};

const filterFeatures = (featureList) => {
  const featureSelected = [];
  features.querySelectorAll(`.map__checkbox:checked`).forEach((item) => {
    featureSelected.push(item.value);
  });
  return featureSelected.every((item) => featureList.includes(item));
};

const hasOfferKey = (advert) => {
  return advert.hasOwnProperty(`offer`);
};

const filterAdvert = (advert) => {
  return hasOfferKey(advert) &&
    filterType(advert) &&
    filterRooms(advert) &&
    filterPrice(advert) &&
    filterGuests(advert) &&
    filterFeatures(advert.offer.features);
};

const filterAdverts = () => {
  return adverts.filter((item) => {
    return filterAdvert(item);
  }) || [];
};

const updateAdverts = () => {
  window.pin.removeAll();
  window.pin.renderAll(filterAdverts());
  window.form.activateFilterElements();
};

formFilters.addEventListener(`change`, window.debounce((evt) => {
  window.card.remove();
  updateAdverts(evt);
}));

const setFilterInitialState = () => {
  formFilters.querySelectorAll(`.map__filter`).forEach(
      (item) => {
        item.selectedIndex = SELECTED_INDEX_ANY;
      });

  formFilters.querySelectorAll(`.map__checkbox `).forEach(
      (item) => {
        item.checked = false;
      }
  );
};

window.filter = {
  onLoad
};


