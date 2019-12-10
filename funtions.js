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
    Array.from(e.childNodes).map(child => {
        e.removeChild(child);
    });
}

function output(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

function mostrarPropiedades(objeto, nombreObjeto) {
    var resultado = ``;
    for (var i in objeto) {
        //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
        if (objeto.hasOwnProperty(i)) {
            resultado += `${nombreObjeto}.${i} = ${objeto[i]}\n`;
        }
    }
    return resultado;
}

function listaTodasLasPropiedades(o) {
    var objetoAInspeccionar;
    var resultado = [];
    for (objetoAInspeccionar = o; objetoAInspeccionar !== null; objetoAInspeccionar = Object.getPrototypeOf(objetoAInspeccionar)) {
        resultado = resultado.concat(Object.getOwnPropertyNames(objetoAInspeccionar)) + "\n";
    }
    return resultado;
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

function clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor();
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }

    return temp;
}

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

Number.prototype.toFixedNumber = function (x, base) {
    var pow = Math.pow(base || 10, x);
    return Math.round(this * pow) / pow;
}

String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

// document.getElementsByClassName();
// document.getElementsByName();
// document.getElementsByTagName();
// document.getElementsByTagNameNS();
// document.getRootNode();
// document.getSelection();
// document.hasChildNodes();
// document.hasFocus();

const color = {
    pSBC: (p, c0, c1, l) => {
        //https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js) // Version 4.0
        let r, g, b, P, f, t, h, i = parseInt,
            m = Math.round,
            a = typeof (c1) == "string";
        if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
        if (!this.pSBCr) this.pSBCr = (d) => {
            let n = d.length,
                x = {};
            if (n > 9) {
                [r, g, b, a] = d = d.split(","), n = d.length;
                if (n < 3 || n > 4) return null;
                x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
            } else {
                if (n == 8 || n == 6 || n < 4) return null;
                if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
                else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
            }
            return x
        };
        h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? {
            r: 0,
            g: 0,
            b: 0,
            a: -1
        } : {
            r: 255,
            g: 255,
            b: 255,
            a: -1
        }, p = P ? p * -1 : p, P = 1 - p;
        if (!f || !t) return null;
        if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
        else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
        a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
        if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
    },
    hex: () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    rgb: () => {
        return 'rgb(' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ')';
    },
    rgba: () => {
        return 'rgb(' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.random().toFixed(2) + ')';
    },
    hsl: () => {
        return 'hsl(' +
            Math.floor(Math.random() * 361) + ',' +
            Math.floor(Math.random() * 101) + '%,' +
            Math.floor(Math.random() * 101) + '%)';
    },
    hsla: () => {
        return 'hsl(' +
            Math.floor(Math.random() * 361) + ', ' +
            Math.floor(Math.random() * 101) + '%, ' +
            Math.floor(Math.random() * 101) + '%, ' +
            Math.random().toFixed(2) + ')';
    },
    toHex: (str, type = null) => {
        if (type !== null) {
            str = type + '(' + str.join(', ') + ')';
        }
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = str;
        return ctx.fillStyle;
    }
}

const j = {
    // Selecciona un Elemento (Solo el primero)
    $: (e, set = document) => {
        return set.querySelector(e);
    },
    // Selecciona un arreglo de Elementos
    $$: (e, set = document) => {
        return set.querySelectorAll(e);
    },
    // Selecciona un Elemento (Solo el primero) y realiza un Callback con f donde se puede hacer una función dentro
    $$$: (e, f, set = document) => {
        let element = set.querySelector(e);
        if (element) {
            f(element);
        }
    },
    // Selecciona un arreglo de Elementos y realiza un Callback con f donde se puede hacer una función dentro
    $$$$: (e, f, set = document) => {
        let elements = set.querySelectorAll(e);
        if (elements) {
            elements.forEach((e, index, array) => {
                f(e, index, array);
            });
        }
    },
    //Hace lo mismo que j.$$$ pero dentro de un intervalo donde time es el Intervalo y stop determinará el tiempo de ejecición
    $$$Interval: (e, f, time, stop = null, set = document) => {
        let element = set.querySelector(e);
        if (element) {
            this.interval = setInterval(() => {
                f(element);
            }, time);
            if (stop !== null) {
                setTimeout(() => {
                    clearInterval(this.interval);
                }, stop);
            }
        }
    },
    //Hace lo mismo que j.$$$$ pero dentro de un intervalo donde time es el Intervalo y stop determinará el tiempo de ejecición
    $$$$Interval: (e, f, time, stop = null, set = document) => {
        let elements = set.querySelectorAll(e);
        if (elements) {
            this.interval = setInterval(() => {
                elements.forEach((e, index, array) => {
                    f(e, index, array);
                });
            }, time);
            if (stop !== null) {
                setTimeout(() => {
                    clearInterval(this.interval);
                }, stop);
            }
        }
    },
    // Regresa el Nombre de la tag señalada
    $name: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).tagName;
    },
    // Regresa las clases de un Nodo (Arreglo)
    $class: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).classList;
    },
    // Regresa el Nodo padre señalado
    $parent: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).parentNode;
    },
    // Regresa el último Nodo buscado
    $last: (e, set = document) => {
        let node = set.querySelectorAll(e);
        return node[node.length - 1];
    },
    // Regresa un Nodo antes al actual mientras sea un Hijo
    $before: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).previousSibling;
    },
    // Regresa un Nodo después al actual mientras sea un Hijo
    $after: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).nextSibling;
    },
    // Regresa un ChildList (Arreglo)
    $ch: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).childNodes;
    },
    // Regresa el Primer hijo del Nodo seleccionado
    $firstCh: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).firstChild;
    },
    $lastCh: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).lastChild;
    },
    // Regresa el estilo seleccionado en 'Styles', cuando 'Property' sea diferente a nulo, establece el estilo
    $css: (e, styles, property = null, set = document) => {
        let element = (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e);
        if (property === null && element) {
            return element.style[styles];
        } else if (element) {
            element.style[styles] = property;
        }
    },
    // Establece un estilo a una seleccion de nodos, styles es un Objeto {estilo: 'estilo'}
    $$css: (e, styles, set = document) => {
        let elements = (typeof e === 'string' || e instanceof String ? set.querySelectorAll(e) : e);
        if (typeof styles == 'object' || styles instanceof Object && elements) {
            elements.forEach(e => {
                for (let property in styles)
                    e.style[property] = styles[property];
            });
        }
    },
    // Clona un Nodo
    $clone: (e, set = document) => {
        return (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).cloneNode(true);
    },
    // Crea un Elemento, se le pueden dar un Atributo, insertar dentro del elemento, otorgarlo a un Nodo
    $create: (e, attribute = null, insert = null, append = null, set = document, ns = null) => {
        if (ns === null) {
            this.element = document.createElement(e);
        } else {
            this.element = document.createElementNS(ns, e);
        }
        if (typeof attribute == 'object' || attribute instanceof Object && element) {
            for (let property in attribute)
                element.setAttribute(property, attribute[property]);
        }
        if (typeof insert === 'string' || insert instanceof String) {
            element.appendChild(document.createTextNode(insert));
        } else if (insert !== null && insert.nodeType === 1) {
            element.appendChild(insert);
        } else if (Array.isArray(insert)) {
            insert.forEach(e => {
                if (typeof e === 'string' || e instanceof String) {
                    element.appendChild(document.createTextNode(e));
                } else if (typeof e === 'object' || e instanceof Object) {
                    element.appendChild(e);
                }
            });
        }
        if (typeof append === 'string' || append instanceof String) {
            set.querySelector(append).appendChild(element);
        } else if (insert !== null && append.nodeType === 1) {
            append.appendChild(element);
        } else {
            return element;
        }
    },
    // Crea un Evento a un Nodo o con un Selector
    $addEvent: (e, n, f, set = document) => {
        let element = (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e);
        if (element) {
            element.attachEvent ? element.attachEvent('on' + n, f) : element.addEventListener(n, f, !!0);
        }
    },
    // Lo mismo que la anterior pero con un Arreglo
    $$addEvent: (e, n, f, set = document) => {
        let elements = (typeof e === 'string' || e instanceof String ? set.querySelectorAll(e) : e);
        if (elements) {
            [].forEach.call(elements, e => {
                e.attachEvent ? e.attachEvent('on' + n, f) : e.addEventListener(n, f, !!0);
            });
        }
    },
    // Oculta un Nodo, con hide = false, cancela 
    $hide: (e, hide = true, set = document) => {
        let element = (typeof e === 'string' || e instanceof String ? set.querySelector(e) : e);
        if (hide) {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    },
    // Lo mismo que la anterior pero con un Arreglo
    $$hide: (e, hide = true, set = document) => {
        let elements = (typeof e === 'string' || e instanceof String ? set.querySelectorAll(e) : e);
        if (hide && elements) {
            elements.forEach(e => {
                e.style.display = 'none';
            });
        } else if (elements) {
            elements.forEach(e => {
                e.style.display = 'block';
            });
        }
    },
    // Ready
    $ready: (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    },
    $formJson: (e, set = document) => {
        var object = {};
        new FormData(typeof e === 'string' || e instanceof String ? set.querySelector(e) : e).forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if (!Reflect.has(object, key)) {
                object[key] = value;
                return;
            }
            if (!Array.isArray(object[key])) {
                object[key] = [object[key]];
            }
            object[key].push(value);
        });
        return object;
    }
}

// // example request
// postAjax('http://foo.bar/', 'p1=1&p2=Hello+World', function (data) {
//     console.log(data);
// });

// // example request with data object
// postAjax('http://foo.bar/', {
//     p1: 1,
//     p2: 'Hello World'
// }, function (data) {
//     console.log(data);
// });