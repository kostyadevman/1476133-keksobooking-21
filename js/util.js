'use strict';

const MOUSE_BUTTON_LEFT = 0;
const KEY_ESCAPE = `Escape`;
const KEY_ENTER = `Enter`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const isEscEvent = (evt, action) => {
  if (evt.key === KEY_ESCAPE) {
    evt.preventDefault();
    action();
  }
};

const isEnterEvent = (evt, action) => {
  if (evt.key === KEY_ENTER) {
    evt.preventDefault();
    action();
  }
};
const isMouseLeftEvent = (evt, action) => {
  if (evt.button === MOUSE_BUTTON_LEFT) {
    evt.preventDefault();
    action();
  }
};

window.util = {
  isEscEvent,
  isEnterEvent,
  isMouseLeftEvent,
  getRandomInt,
  getRandomArbitrary
};


