'use strict';


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
  height: 84,
  initialTop: 375,
  initialLeft: 570,
};

const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const mainPin = map.querySelector(`.map__pin--main`);

const mainPinSetInitial = () => {
  mainPin.style.top = MAIN_PIN.initialTop + `px`;
  mainPin.style.left = MAIN_PIN.initialLeft + `px`;
};

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

const errorHandler = function (errorMessage) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const setInitialState = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  window.form.deactivateFormElements();
  window.form.deactivateFilterElements();
  mainPin.addEventListener(`mousedown`, mainPinMouseClickHandler);
  mainPin.addEventListener(`keydown`, mainPinEnterPressHandler);
  mainPin.addEventListener(`mousedown`, mainPinMoveHandler);
  window.pin.removePins();
  window.card.remove();
  window.form.setInitial();
  mainPinSetInitial();
  window.form.setAddress(mainPin, true);
};

const setActiveState = () => {
  window.backend.load(window.filter.onLoad, errorHandler);
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  window.form.activateFormElements();

  window.form.formFieldAddress.readOnly = true;
  mainPin.removeEventListener(`mousedown`, mainPinMouseClickHandler);
  mainPin.removeEventListener(`keydown`, mainPinEnterPressHandler);
  window.form.setAddress(mainPin);
};

window.map = {
  PIN,
  MAIN_PIN,
  LOCATION,
  setInitialState
};


