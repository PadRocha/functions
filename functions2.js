window.$ = (query, ctx = document) => ctx.querySelector(query)
window.$$ = (query, ctx = document) => ctx.querySelectorAll(query)

/* ----------------------------------------------------------*/
// Functiones Define
/* ----------------------------------------------------------*/

Object.defineProperty(window, 'define', {
    value: (property, ...meta) => meta.length == 2 ? Object.defineProperty(meta[0], property, meta[1]) : Object.defineProperty(window, property, meta[0]),
    writable: false,
    enumerable: true
})

/* ----------------------------------------------------------*/
// Functiones generales
/* ----------------------------------------------------------*/

function randomProbability(min, max, matrizNumeros, matrizProbabilidad) {
    for (let i = 0; i < matrizProbabilidad.length; i++)
        if (Math.random() < matrizProbabilidad[i]) return matrizNumeros[i];
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = e => {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url);
    xhr.onreadystatechange = e => {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/* ----------------------------------------------------------*/
// Funciones HTMLCOLLECTION
/* ----------------------------------------------------------*/

NodeList.prototype.attr = HTMLElement.prototype.attr = function (key, value) {
    if (!value) {
        if (!key) {
            return this.attributes
        }
        return this.getAttribute(key)
    }
    this.setAttribute(key, value)
    return this
}

HTMLElement.prototype.html = function (string) {
    if (!string)
        return this.innerHTML
    this.innerHTML = string
    return this
}

HTMLElement.prototype.text = function (string) {
    if (!string)
        return this.textContent
    this.innerText = string
    return this
}

HTMLElement.prototype.data = function (key, value) {
    if (!value) {
        if (!key) {
            return this.dataset
        }
        return this.dataset[key]
    }
    this.dataset[key] = value
    return this
}

/* ----------------------------------------------------------*/
// Funciones String
/* ----------------------------------------------------------*/

String.prototype.hexEncode = function () {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function () {
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

/* ----------------------------------------------------------*/
// Funciones Number
/* ----------------------------------------------------------*/

/* ----------------------------------------------------------*/
// Funciones Array
/* ----------------------------------------------------------*/