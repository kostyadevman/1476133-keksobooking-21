'use strict';

(function () {
  let adverts = [];
  const formFilters = document.querySelector(`.map__filters`);
  const type = formFilters.querySelector(`#housing-type`);


  const onLoad = (data) => {
    adverts = data;
    updateAdverts();
  };

  const updateAdverts = () => {
    let filtered = adverts.filter((advert) => {
      if (type.options[type.selectedIndex].value === `any`) {
        return true;
      }
      return advert.offer.type === type.options[type.selectedIndex].value;
    }
    ) || [];
    window.pin.removePins();
    window.pin.renderPins(filtered);
    window.form.activateFilterElements();
  };

  formFilters.querySelectorAll(`.map__filter,.map__checkbox`).forEach(
      (item) => item.addEventListener(`change`, function (evt) {
        window.card.remove();
        if (evt.target === type) {
          updateAdverts();
        }
      }));

  window.filter = {
    onLoad
  };
})();

