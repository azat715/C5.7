const input_field_1 = document.getElementById("input_1");
const input_field_2 = document.getElementById("input_2");
const input_hint_1 = document.querySelector(".hint_1");
const input_hint_2 = document.querySelector(".hint_2");
const input_hint_3 = document.querySelector(".hint_3");
const image_frame = document.getElementsByClassName('images')[0];
const btn = document.getElementsByName('j-bt')[0];

input_field_1.addEventListener("input", () => {
    if (input_field_1.validity.valid) {
        input_hint_1.style.visibility = "hidden";
    }
})

input_field_2.addEventListener("input", () => {
    if (input_field_2.validity.valid) {
        input_hint_2.style.visibility = "hidden";
    }
})

function httpRequest (callback) {
    function get (page, limit) {
        let xhr = new XMLHttpRequest();
        let url = new URL('https://picsum.photos/v2/list');
        url.searchParams.set('limit', limit);
        url.searchParams.set('page', page);
        console.log(url)
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.response);
              }
        };
    }
    return get
}

const get = httpRequest(function (request) {
    if (image_frame.hasChildNodes()) { 
        image_frame.innerHTML = "";
        }
    request.forEach(element => {
        console.log(element);
        let image = element;
        let div_image_item = document.createElement("div");
        div_image_item.className = ".images_item";
        div_image_item.setAttribute("style", "display: block; max-width: 30%;");
        div_image_item.innerHTML = `<img src=${image.download_url} width=100% height=auto alt=${image.id}></img> \n
                                    <p>${image.author}</p>`;
        image_frame.appendChild(div_image_item);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    btn.addEventListener('click', () => {
        if (!input_field_1.validity.valid && !input_field_2.validity.valid) {
            input_hint_1.style.visibility = "hidden";
            input_hint_2.style.visibility = "hidden";
            input_hint_3.style.visibility = "visible"; 
        } else if (!input_field_1.validity.valid) {
            input_hint_1.style.visibility = "visible"; 
        } else if (!input_field_2.validity.valid) {
            input_hint_2.style.visibility = "visible"; 
        } else {
            input_hint_1.style.visibility = "hidden";
            input_hint_2.style.visibility = "hidden";
            input_hint_3.style.visibility = "hidden";
            get(input_field_1.value, input_field_2.value)
        }
     })
});