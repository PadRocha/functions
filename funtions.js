export function randomProbability(min, max, matrizNumeros, matrizProbabilidad) {
    for (let i = 0; i < matrizProbabilidad.length; i++)
        if (Math.random() < matrizProbabilidad[i]) return matrizNumeros[i];
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function random(minimo,maximo) { return Math.floor(Math.random() * (maximo - minimo + 1) + minimo); }

export function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

export function addEvent(e, n, f) {return e.attachEvent?e.attachEvent('on'+n,f):e.addEventListener(n, f, !!0)}

export function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = e => {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

export function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url);
    xhr.onreadystatechange = e => {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

export function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

export function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

export function clearElement(e) {
    Array.from(e.childNodes).forEach(child => {
        e.removeChild(child);
    });
}

export function output(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

export function addProps(obj, arr, val) {

    if (typeof arr == 'string')
        arr = arr.split(".");

    obj[arr[0]] = obj[arr[0]] || {};

    var tmpObj = obj[arr[0]];

    if (arr.length > 1) {
        arr.shift();
        addProps(tmpObj, arr, val);
    }
    else
        obj[arr[0]] = val;

    return obj;

}

export function add_property(object, key, value) {
    var keys = key.split('.');

    while (keys.length > 1) {
        var k = keys.shift();

        if (!object.hasOwnProperty(k)) {
            object[k] = {};
        }

        object = object[k];
    }

    object[keys[0]] = value;
}

/* Number.prototype.toFixedNumber = function (x, base) {
    var pow = Math.pow(base || 10, x);
    return Math.round(this * pow) / pow;
}

module.exports = Number; 

String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};


// lib.js

var YourThing = function () {
}

YourThing.prototype.someMethod = function () {
  console.log('do something cool');
}

module.exports = YourThing;

// index.js

var YT = require('./lib.js');
var yourThing = new YT();
yourThing.someMethod(); */