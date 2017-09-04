/**
 * 基本的函数
 * Created by GUY on 2015/6/24.
 */
BI.Func = {};
BI.extend(BI.Func, {

    /**
     * 获取搜索结果
     * @param items
     * @param keyword
     * @param param  搜索哪个属性
     */
    getSearchResult: function (items, keyword, param) {
        var isArray = BI.isArray(items);
        items = isArray ? BI.flatten(items) : items;
        param || (param = "text");
        if (!BI.isKey(keyword)) {
            return {
                finded: BI.deepClone(items),
                matched: isArray ? [] : {}
            };
        }
        var t, text, py;
        keyword = BI.toUpperCase(keyword);
        var matched = isArray ? [] : {}, finded = isArray ? [] : {};
        BI.each(items, function (i, item) {
            item = BI.deepClone(item);
            t = BI.stripEL(item);
            text = t[param] || t.text || t.value || t.name || t;
            py = BI.makeFirstPY(text);
            text = BI.toUpperCase(text);
            py = BI.toUpperCase(py);
            var pidx;
            if (text.indexOf(keyword) > -1) {
                if (text === keyword) {
                    isArray ? matched.push(item) : (matched[i] = item);
                } else {
                    isArray ? finded.push(item) : (finded[i] = item);
                }
            } else if (pidx = py.indexOf(keyword), (pidx > -1 && Math.floor(pidx / text.length) === Math.floor((pidx + keyword.length - 1) / text.length))) {
                if (text === keyword || keyword.length === text.length) {
                    isArray ? matched.push(item) : (matched[i] = item);
                } else {
                    isArray ? finded.push(item) : (finded[i] = item);
                }
            }
        });
        return {
            matched: matched,
            finded: finded
        }
    },
});

/**
 * 对DOM操作的通用函数
 * @type {{}}
 */
BI.DOM = {};
BI.extend(BI.DOM, {

    /**
     * 把dom数组或元素悬挂起来,使其不对html产生影响
     * @param dom
     */
    hang: function (doms) {
        if (BI.isEmpty(doms)) {
            return;
        }
        var frag = BI.Element.createDocumentFragment();
        BI.each(doms, function (i, dom) {
            dom instanceof BI.Widget && (dom = dom.element);
            dom instanceof $ && dom[0] && frag.appendChild(dom[0]);
        });
        return frag;
    },

    isExist: function (obj) {
        return BI.Element("body").find(obj.element).length > 0;
    },

    //预加载图片
    preloadImages: function (srcArray, onload) {
        var count = 0, images = [];

        function complete() {
            count++;
            if (count >= srcArray.length) {
                onload();
            }
        }

        BI.each(srcArray, function (i, src) {
            images[i] = new Image();
            images[i].src = src;
            images[i].onload = function () {
                complete()
            };
            images[i].onerror = function () {
                complete()
            };
        });
    },

    isColor: function (color) {
        return color && (this.isRGBColor(color) || this.isHexColor(color));
    },

    isRGBColor: function (color) {
        if (!color) {
            return false;
        }
        return color.substr(0, 3) === "rgb";
    },

    isHexColor: function (color) {
        if (!color) {
            return false;
        }
        return color[0] === "#" && color.length === 7;
    },

    isDarkColor: function (hex) {
        if (!hex || !this.isHexColor(hex)) {
            return false;
        }
        var rgb = this.rgb2json(this.hex2rgb(hex));
        var grayLevel = Math.round(rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
        if (grayLevel < 192/**网上给的是140**/) {
            return true;
        }
        return false;
    },

    //获取对比颜色
    getContrastColor: function (color) {
        if (!color || !this.isColor(color)) {
            return "";
        }
        if (this.isDarkColor(color)) {
            return "#ffffff";
        }
        return "#1a1a1a";
    },

    rgb2hex: function (rgbColour) {
        if (!rgbColour || rgbColour.substr(0, 3) != "rgb") {
            return "";
        }
        var rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        var red = BI.parseInt(rgbValues[0]);
        var green = BI.parseInt(rgbValues[1]);
        var blue = BI.parseInt(rgbValues[2]);

        var hexColour = "#" + this.int2hex(red) + this.int2hex(green) + this.int2hex(blue);

        return hexColour;
    },

    rgb2json: function (rgbColour) {
        if (!rgbColour) {
            return {};
        }
        if (!this.isRGBColor(rgbColour)) {
            return {};
        }
        var rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        return {
            r: BI.parseInt(rgbValues[0]),
            g: BI.parseInt(rgbValues[1]),
            b: BI.parseInt(rgbValues[2])
        };
    },

    rgba2json: function (rgbColour) {
        if (!rgbColour) {
            return {};
        }
        var rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        return {
            r: BI.parseInt(rgbValues[0]),
            g: BI.parseInt(rgbValues[1]),
            b: BI.parseInt(rgbValues[2]),
            a: BI.parseFloat(rgbValues[3])
        };
    },

    json2rgb: function (rgb) {
        if (!BI.isKey(rgb.r) || !BI.isKey(rgb.g) || !BI.isKey(rgb.b)) {
            return "";
        }
        return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    },

    json2rgba: function (rgba) {
        if (!BI.isKey(rgba.r) || !BI.isKey(rgba.g) || !BI.isKey(rgba.b)) {
            return "";
        }
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    },

    int2hex: function (strNum) {
        var hexdig = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        return hexdig[strNum >>> 4] + '' + hexdig[strNum & 15];
    },

    hex2rgb: function (color) {
        if (!color) {
            return "";
        }
        if (!this.isHexColor(color)) {
            return color;
        }
        var tempValue = "rgb(", colorArray;

        if (color.length === 7) {
            colorArray = [BI.parseInt('0x' + color.substring(1, 3)),
                BI.parseInt('0x' + color.substring(3, 5)),
                BI.parseInt('0x' + color.substring(5, 7))];
        }
        else if (color.length === 4) {
            colorArray = [BI.parseInt('0x' + color.substring(1, 2)),
                BI.parseInt('0x' + color.substring(2, 3)),
                BI.parseInt('0x' + color.substring(3, 4))];
        }
        tempValue += colorArray[0] + ",";
        tempValue += colorArray[1] + ",";
        tempValue += colorArray[2] + ")";

        return tempValue;
    },

    rgba2rgb: function (rgbColour, BGcolor) {
        if (BI.isNull(BGcolor)) {
            BGcolor = 1;
        }
        if (rgbColour.substr(0, 4) != "rgba") {
            return "";
        }
        var rgbValues = rgbColour.match(/\d+(\.\d+)?/g);
        if (rgbValues.length < 4) {
            return "";
        }
        var R = BI.parseFloat(rgbValues[0]);
        var G = BI.parseFloat(rgbValues[1]);
        var B = BI.parseFloat(rgbValues[2]);
        var A = BI.parseFloat(rgbValues[3]);

        return "rgb(" + Math.floor(255 * (BGcolor * (1 - A )) + R * A) + "," +
            Math.floor(255 * (BGcolor * (1 - A )) + G * A) + "," +
            Math.floor(255 * (BGcolor * (1 - A )) + B * A) + ")";
    },

    getTextSizeWidth: function (text, fontSize) {
        var span = BI.Element("<span></span>").addClass("text-width-span").appendTo(BI.Element("body"));

        if (fontSize == null) {
            fontSize = 12;
        }
        fontSize = fontSize + "px";

        span.css("font-size", fontSize).text(text);

        var width = span.width();
        span.remove();

        return width;
    },

    //获取滚动条的宽度
    getScrollWidth: function () {
        if (this._scrollWidth == null) {
            var ul = BI.Element("<div>").width(50).height(50).css({
                position: "absolute",
                top: "-9999px",
                overflow: "scroll"
            }).appendTo(BI.Element("body"));
            this._scrollWidth = ul[0].offsetWidth - ul[0].clientWidth;
            ul.destroy();
        }
        return this._scrollWidth;
    }
});