'use strict';

const URL_ADVERTS = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;
const RESPONSE_TYPE_JSON = `json`;

const load = (onLoad, onError) => {
  const xhr = window.xhr.create(onLoad, onError, RESPONSE_TYPE_JSON, TIMEOUT_IN_MS);

  xhr.open(`GET`, URL_ADVERTS);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = window.xhr.create(onLoad, onError, null, TIMEOUT_IN_MS);

  xhr.open(`POST`, URL_SAVE);
  xhr.send(data);

};
window.backend = {
  load,
  save
};

