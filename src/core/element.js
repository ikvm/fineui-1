BI.Element = function (tag) {
    if (!(this instanceof BI.Element)) {
        return new BI.Element(tag);
    }
    this.$$el = BI.Element.module.apply(null, arguments);
    this[0] = this.$$el[0];
    this.length = this.$$el.length;
};
BI.Element.prototype = {
    append: function (cls) {
        this.$$el.append.apply(this.$$el, arguments);
        return this;
    },
    appendTo: function (ele) {
        this.$$el.appendTo(ele.$$el);
        return this;
    },

    prepend: function (cls) {
        this.$$el.prepend.apply(this.$$el, arguments);
        return this;
    },

    prependTo: function (ele) {
        this.$$el.prependTo(ele.$$el);
        return this;
    },

    before: function (ele) {
        this.$$el.before(ele.$$el);
        return this;
    },
    after: function (ele) {
        this.$$el.after(ele.$$el);
        return this;
    },

    empty: function (cls) {
        this.$$el.empty.apply(this.$$el, arguments);
        return this;
    },

    remove: function () {
        this.$$el.remove.apply(this.$$el, arguments);
        return this;
    },

    //属性
    addClass: function (cls) {
        this.$$el.addClass.apply(this.$$el, arguments);
        return this;
    },
    removeClass: function (cls) {
        this.$$el.removeClass.apply(this.$$el, arguments);
        return this;
    },
    is: function (cls) {
        var res = this.$$el.is.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    attr: function (cls) {
        var res = this.$$el.attr.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    data: function (cls) {
        var res = this.$$el.data.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    css: function (cls) {
        var res = this.$$el.css.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    text: function (cls) {
        var res = this.$$el.text.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    val: function () {
        var res = this.$$el.val.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    width: function (cls) {
        var res = this.$$el.width.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    height: function (cls) {
        var res = this.$$el.height.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    outerWidth: function (cls) {
        var res = this.$$el.outerWidth.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    outerHeight: function (cls) {
        var res = this.$$el.outerHeight.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    find: function (ele) {
        var res = this.$$el.find(ele.$$el || ele);
        return BI.Element(res);
    },
    scrollTop: function () {
        var res = this.$$el.scrollTop.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    scrollLeft: function () {
        var res = this.$$el.scrollLeft.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    position: function () {
        var res = this.$$el.position.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    offset: function () {
        var res = this.$$el.offset.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    padding: function () {
        var res = this.$$el.padding.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },

    border: function () {
        var res = this.$$el.border.apply(this.$$el, arguments);
        if (res !== this.$$el) {
            return res;
        }
        return this;
    },
    insets: function () {
        var p = this.padding(),
            b = this.border();
        return {
            'top': p.top,
            'bottom': p.bottom + b.bottom + b.top,
            'left': p.left,
            'right': p.right + b.right + b.left
        };
    },

    bounds: function (value) {
        var tmp = {hasIgnoredBounds: true};

        if (value) {
            if (!isNaN(value.x)) {
                tmp.left = value.x;
            }
            if (!isNaN(value.y)) {
                tmp.top = value.y;
            }
            if (value.width != null) {
                tmp.width = (value.width - (this.outerWidth(true) - this.width()));
                tmp.width = (tmp.width >= 0) ? tmp.width : value.width;
                // fix chrome
                //tmp.width = (tmp.width >= 0) ? tmp.width : 0;
            }
            if (value.height != null) {
                tmp.height = value.height - (this.outerHeight(true) - this.height());
                tmp.height = (tmp.height >= 0) ? tmp.height : value.height;
                // fix chrome
                //tmp.height = (tmp.height >= 0) ? tmp.height : value.0;
            }
            this.css(tmp);
            return this;
        }
        else {
            // richer:注意此方法只对可见元素有效
            tmp = this.position();
            return {
                'x': tmp.left,
                'y': tmp.top,
                // richer:这里计算外部宽度和高度的时候，都不包括边框
                'width': this.outerWidth(),
                'height': this.outerHeight()
            };
        }
    },

    //事件
    on: function () {
        this.$$el.on.apply(this.$$el, arguments);
        return this;
    },
    bind: function () {
        this.$$el.bind.apply(this.$$el, arguments);
        return this;
    },

    off: function () {
        this.$$el.off.apply(this.$$el, arguments);
        return this;
    },
    trigger: function () {
        this.$$el.trigger.apply(this.$$el, arguments);
        return this;
    },

    click: function () {
        this.$$el.click.apply(this.$$el, arguments);
        return this;
    },

    hover: function () {
        this.$$el.hover.apply(this.$$el, arguments);
        return this;
    },

    mousedown: function () {
        this.$$el.mousedown.apply(this.$$el, arguments);
        return this;
    },

    mouseup: function () {
        this.$$el.mouseup.apply(this.$$el, arguments);
        return this;
    },

    mouseover: function () {
        this.$$el.mouseover.apply(this.$$el, arguments);
        return this;
    },

    keydown: function () {
        this.$$el.keydown.apply(this.$$el, arguments);
        return this;
    },

    keyup: function () {
        this.$$el.keyup.apply(this.$$el, arguments);
        return this;
    },

    focus: function () {
        this.$$el.focus.apply(this.$$el, arguments);
        return this;
    },
    focusout: function () {
        this.$$el.focusout.apply(this.$$el, arguments);
        return this;
    },
    select: function () {
        this.$$el.select.apply(this.$$el, arguments);
        return this;
    },

    scroll: function () {
        this.$$el.scroll.apply(this.$$el, arguments);
        return this;
    },

    slideDown: function () {
        this.$$el.slideDown.apply(this.$$el, arguments);
        return this;
    },
    slideUp: function () {
        this.$$el.slideUp.apply(this.$$el, arguments);
        return this;
    },

    fadeIn: function () {
        this.$$el.fadeIn.apply(this.$$el, arguments);
        return this;
    },

    fadeOut: function () {
        this.$$el.fadeOut.apply(this.$$el, arguments);
        return this;
    },

    show: function () {
        this.$$el.show.apply(this.$$el, arguments);
        return this;
    },
    hide: function () {
        this.$$el.hide.apply(this.$$el, arguments);
        return this;
    },
};

BI.Element.createElement = function (tagName) {
    return document.createElement(tagName);
};

BI.Element.createDocumentFragment = function () {
    return document.createDocumentFragment();
};

BI.Element.registerModule = function (module) {
    BI.Element.module = module;
};