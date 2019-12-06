function randomProbability(min, max, matrizNumeros, matrizProbabilidad) {
    for (let i = 0; i < matrizProbabilidad.length; i++)
        if (Math.random() < matrizProbabilidad[i]) return matrizNumeros[i];
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}

function syntaxHighlight(json) {
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

function addEvent(e, n, f) {
    return e.attachEvent ? e.attachEvent('on' + n, f) : e.addEventListener(n, f, !!0)
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

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function clearElement(e) {
    Array.from(e.childNodes).forEach(child => {
        e.removeChild(child);
    });
}

function output(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

function add_property(obj, key, val) {
    if (typeof key == 'string')
        key = key.split(".");

    while (key.length > 1) {
        var k = key.shift();
        if (!obj.hasOwnProperty(k)) {
            obj[k] = {};
        }
        obj = obj[k];
    }
    obj[key[0]] = val;
}

const g = {
    $: (e, set = document) => {
        return set.querySelector(e);
    },
    $last: (e, set = document) => {
        let node = set.querySelectorAll(e);
        return node[node.length - 1];
    },
    $before: (e, set = document) => {
        return set.querySelectorAll(e).previousSibling;
    },
    $after: (e, set = document) => {
        return set.querySelectorAll(e).nextSibling;
    },
    $ch: (e, set = document) => {
        return set.querySelector(e).childNodes;
    },
    $firstCh: (e, set = document) => {
        return set.querySelector(e).firstChild;
    },
    $lastCh: (e, set = document) => {
        return set.querySelector(e).lastChild;
    },
    $$: (e, set = document) => {
        return set.querySelectorAll(e);
    }
}

// document.getElementsByClassName();
// document.getElementsByName();
// document.getElementsByTagName();
// document.getElementsByTagNameNS();
// document.getRootNode();
// document.getSelection();
// document.hasChildNodes();
// document.hasFocus();

String.prototype.capitalize = function (str) {
    if (!str) {
        str = this;
    }
    let sentences = str.split('.');
    let updated = [];

    sentences.map(function (sentence) {
        if (sentence) {
            if (sentence[0] !== ' ') {
                let output = sentence.charAt(0).toUpperCase() + sentence.slice(1);
                updated.push(output);
            } else {
                let output = sentence.charAt(1).toUpperCase() + sentence.slice(2);
                updated.push(' ' + output);
            }
        }
    });

    let final = updated.join('.');

    if (str.endsWith('.')) {
        final += '.';
    }

    return final;
}


// Number.prototype.toFixedNumber = function (x, base) {
//     var pow = Math.pow(base || 10, x);
//     return Math.round(this * pow) / pow;
// }

// module.exports = Number; 

// String.prototype.allReplace = function (obj) {
//     var retStr = this;
//     for (var x in obj) {
//         retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
//     }
//     return retStr;
// };


// // lib.js

// var YourThing = function () {
// }

// YourThing.prototype.someMethod = function () {
//   console.log('do something cool');
// }

// module.exports = YourThing;

// // index.js

// var YT = require('./lib.js');
// var yourThing = new YT();
// yourThing.someMethod();