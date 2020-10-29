'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const getPreview = (choseElem, previewElem) => {
  const file = choseElem.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      previewElem.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

window.file = {
  preview: getPreview
};
