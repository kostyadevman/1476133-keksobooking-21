'use strict';


(function () {
  const LOCATION = {
    yMin: 130,
    yMax: 630
  };

  const PIN = {
    width: 50,
    height: 70
  };

  const MAIN_PIN = {
    heightInit: 65,
    width: 65,
    height: 84
  };

  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const mainPinMouseClickHandler = (evt) => {
    window.util.isMouseLeftEvent(evt, setActiveState);
  };

  const mainPinEnterPressHandler = (evt) => {
    window.util.isEnterEvent(evt, setActiveState);
  };

  const mainPinMoveHandler = (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const movePin = () => {
        let top = mainPin.offsetTop - shift.y;
        let left = mainPin.offsetLeft - shift.x;
        if (
          left >= map.clientLeft - MAIN_PIN.width / 2 &&
          left <= map.clientWidth - MAIN_PIN.width / 2 &&
          top >= LOCATION.yMin - MAIN_PIN.height &&
          top <= LOCATION.yMax - MAIN_PIN.height
        ) {
          mainPin.style.top = top + `px`;
          mainPin.style.left = left + `px`;
        }
      };
      movePin();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(mainPin, false);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
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
    mainPin.addEventListener(`mousedown`, mainPinMoveHandler);
  };

  window.map = {
    PIN,
    MAIN_PIN,
    LOCATION,
    setInitialState
  };
})();

