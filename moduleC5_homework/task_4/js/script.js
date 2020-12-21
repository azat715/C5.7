const firstField = document.getElementById('input_1'); // первый параметр
const secondField = document.getElementById('input_2'); // второй параметр
const hint = document.querySelector('.hint_1');
const imageFrame = document.getElementsByClassName('images')[0];
const btn = document.getElementsByName('j-bt')[0];

function httpRequestFetch(callback) {
  function get(firstParam, secondParam) {
    const absoluteBase = 'https://picsum.photos';
    const urlPathname = '/' + firstParam + '/' + secondParam;
    const url = new URL(urlPathname, absoluteBase);
    console.log(url);
    fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed with HTTP code ' + response.status);
          } else {
            return response.blob();
          }
        })
        .then((data) => {
          console.log(data);
          callback(data);
        });
  }
  return get;
}

const createImg = httpRequestFetch(function(request) {
  const image = document.createElement('img');
  const objectURL = URL.createObjectURL(request);
  image.src = objectURL;
  image.alt = objectURL;
  imageFrame.appendChild(image);
  btn.disabled = false;
});

// обработчики ввода
firstField.addEventListener('input', () => {
  if (firstField.validity.valid && secondField.validity.valid) {
    hint.style.visibility = 'hidden';
  }
});

secondField.addEventListener('input', () => {
  if (firstField.validity.valid && secondField.validity.valid) {
    hint.style.visibility = 'hidden';
  }
});

function inputValidate() {
  if (!firstField.validity.valid || !secondField.validity.valid) {
    hint.style.visibility = 'visible';
  } else {
    hint.style.visibility = 'hidden';
    return true;
  }
}

function showImgMain() {
  if (imageFrame.hasChildNodes()) {
    imageFrame.innerHTML = '';
  }
  createImg(firstField.value, secondField.value);
}

document.addEventListener('DOMContentLoaded', () => {
  btn.addEventListener('click', () => {
    if (inputValidate()) {
      showImgMain();
      btn.disabled = true;
    }
  });
});
