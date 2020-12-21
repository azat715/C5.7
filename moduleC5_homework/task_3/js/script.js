const inputField = document.getElementById('input');
const inputHint = document.querySelector('.hint');
const imageFrame = document.getElementsByClassName('images')[0];
const btn = document.getElementsByName('j-bt')[0];

inputField.addEventListener('invalid', () => {
  inputHint.style.visibility = 'visible';
});

inputField.addEventListener('valid', () => {
  inputHint.style.visibility = 'hidden';
});

inputField.addEventListener('input', () => {
  if (inputField.validity.valid) {
    inputHint.style.visibility = 'hidden';
  } else {
    inputHint.style.visibility = 'visible';
  }
});

inputField.onblur = function() {
  inputHint.style.visibility = 'hidden';
};

function httpRequest(callback) {
  function get(limit) {
    const xhr = new XMLHttpRequest();
    const url = new URL('https://picsum.photos/v2/list');
    url.searchParams.set('limit', limit);
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

const get = httpRequest(function(request) {
  if (imageFrame.hasChildNodes()) {
    imageFrame.innerHTML = '';
  }
  request.forEach((element) => {
    console.log(element);
    const image = element;
    const divImageItem = document.createElement('div');
    divImageItem.className = '.images_item';
    divImageItem.setAttribute('style', 'display: block; max-width: 30%;');
    divImageItem.innerHTML = `<img src=${image.download_url} width=100% 
                              height=auto alt=${image.id}></img> 
                              <p>${image.author}</p>`;
    imageFrame.appendChild(divImageItem);
  });
  btn.disabled = false;
  btn.textContent = 'Клик ме';
});

document.addEventListener('DOMContentLoaded', () => {
  btn.addEventListener('click', (event) => {
    if (!inputField.validity.valid) {
      inputHint.style.visibility = 'visible';
    } else {
      get(inputField.value);
      btn.disabled = true;
      btn.textContent = 'Загрузка';
    }
  });
});
