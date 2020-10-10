'use strict';

(function () {
  const MOUSE_BUTTON_LEFT = 0;

  window.util = {
    isEscEvent(evt, action) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        action();
      }
    },
    isMouseLeftEvent(evt, action) {
      if (evt.button === MOUSE_BUTTON_LEFT) {
        evt.preventDefault();
        action();
      }
    }
  };
})();

