'use strict';

const StatusCode = {
  OK: 200
};

const createXhr = (onLoad, onError, type = null, timeout = null) => {
  const xhr = new XMLHttpRequest();

  if (type) {
    xhr.responseType = type;
  }

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  if (timeout) {
    xhr.timeout = timeout;
  }

  return xhr;
};

window.xhr = {
  create: createXhr
};
