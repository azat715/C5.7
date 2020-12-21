const pageField = document.getElementById('input_1'); // номер страницы
const limitField = document.getElementById('input_2'); // лимит
const pageHint = document.querySelector('.hint_1');
const limitHint = document.querySelector('.hint_2');
const inputHint = document.querySelector('.hint_3');
const imageFrame = document.getElementsByClassName('images')[0];
const btn = document.getElementsByName('j-bt')[0];

let query = {};

// вспомогательные функции
function httpRequest(callback) {
  function get() {
    const xhr = new XMLHttpRequest();
    const url = new URL('https://picsum.photos/v2/list');
    url.searchParams.set('limit', query.limit);
    url.searchParams.set('page', query.page);
    console.log(url);
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.response);
      }
    };
  }
  return get;
}

function selectorVisibility(status, ...items) {
  items.forEach((element) => {
    element.style.visibility = status;
  });
}

// обработчики ввода
pageField.addEventListener('input', () => {
  if (pageField.validity.valid) {
    selectorVisibility('hidden', pageHint, inputHint);
  }
});

limitField.addEventListener('input', () => {
  if (limitField.validity.valid) {
    selectorVisibility('hidden', limitHint, inputHint);
  }
});

// валидация  ввода
function inputValidate() {
  if (!pageField.validity.valid && !limitField.validity.valid) {
    selectorVisibility('hidden', pageHint, limitHint);
    inputHint.style.visibility = 'visible';
  } else if (!pageField.validity.valid) {
    pageHint.style.visibility = 'visible';
  } else if (!limitField.validity.valid) {
    limitHint.style.visibility = 'visible';
  } else {
    selectorVisibility('hidden', pageHint, limitHint);
    inputHint.style.visibility = 'hidden';
    return true;
  }
}

// создание div images
function createImg(image) {
  const divImageItem = document.createElement('div');
  divImageItem.className = '.images_item';
  divImageItem.setAttribute('style', 'display: block; max-width: 30%;');
  divImageItem.innerHTML = `<img src=${image.download_url} width=100% 
                            height=auto alt=${image.id}></img>
                            <p>${image.author}</p>`;
  imageFrame.appendChild(divImageItem);
}

const createImgFrame = httpRequest(function(request) {
  request.forEach((element) => {
    console.log(element);
    createImg(element);
  });
});

function showImgMain() {
  if (imageFrame.hasChildNodes()) {
    imageFrame.innerHTML = '';
  }
  createImgFrame();
}

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('is_reloaded')) {
    if (localStorage.getItem('savedQuery')) {
      query = JSON.parse(localStorage.getItem('savedQuery'));
      pageField.value = query.page;
      limitField.value = query.limit;
      showImgMain();
    }
  } else {
    sessionStorage.setItem('is_reloaded', true);
  }
  btn.addEventListener('click', () => {
    if (inputValidate()) {
      query = {
        page: pageField.value,
        limit: limitField.value,
      };
      localStorage.setItem('savedQuery', JSON.stringify(query));
      showImgMain();
    }
  });
});
