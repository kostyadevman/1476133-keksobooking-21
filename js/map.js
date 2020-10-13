'use strict';


(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const mainPinMouseClickHandler = (evt) => {
    window.util.isMouseLeftEvent(evt, setActiveState);
  };

  const mainPinEnterPressHandler = (evt) => {
    window.util.isEnterEvent(evt, setActiveState);
  };

  const setInitialState = () => {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    window.form.deactivateFormElements();
    window.form.deactivateFilterElements();
    mainPin.addEventListener(`mousedown`, mainPinMouseClickHandler);
    mainPin.addEventListener(`keydown`, mainPinEnterPressHandler);
    window.form.setAddress(mainPin, true);
  };


  const setActiveState = () => {
    window.data.fillAvatars();
    window.pin.renderPins(window.data.getAdverts(window.data.ADVERT_COUNT, map.clientWidth));
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
    window.form.activateFormElements();
    window.form.activateFilterElements();
    window.form.formFieldAddress.readOnly = true;
    mainPin.removeEventListener(`mousedown`, mainPinMouseClickHandler);
    mainPin.removeEventListener(`keydown`, mainPinEnterPressHandler);
    window.form.setAddress(mainPin);
  };

  window.map = {
    setInitialState
  };
})();

