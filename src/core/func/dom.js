/**
 * guy
 * 最基础的dom操作
 */
BI.extend(BI.Element.prototype, {

    destroy: function () {
        this.remove();
        if (BI.isIE() === true) {
            this[0].outerHTML = '';
        }
    },
    /**
     * 高亮显示
     * @param text 必需
     * @param keyword
     * @param py 必需
     * @returns {*}
     * @private
     */
    __textKeywordMarked__: function (text, keyword, py) {
        if (!BI.isKey(keyword) || (text + "").length > 100) {
            return this.text((text + "").replaceAll(" ", "　"));
        }
        keyword = keyword + "";
        keyword = BI.toUpperCase(keyword);
        var textLeft = (text || "") + "";
        py = (py || BI.makeFirstPY(text)) + "";
        if (py != null) {
            py = BI.toUpperCase(py);
        }
        this.empty();
        while (true) {
            var tidx = BI.toUpperCase(textLeft).indexOf(keyword);
            var pidx = null;
            if (py != null) {
                pidx = py.indexOf(keyword);
                if (pidx >= 0) {
                    pidx = pidx % text.length;
                }
            }

            if (tidx >= 0) {
                this.append(textLeft.substr(0, tidx));
                this.append(BI.Element("<span>").addClass("bi-keyword-red-mark")
                    .text(textLeft.substr(tidx, keyword.length).replaceAll(" ", "　")));

                textLeft = textLeft.substr(tidx + keyword.length);
                if (py != null) {
                    py = py.substr(tidx + keyword.length);
                }
            } else if (pidx != null && pidx >= 0 && Math.floor(pidx / text.length) === Math.floor((pidx + keyword.length - 1) / text.length)) {
                this.append(textLeft.substr(0, pidx));
                this.append(BI.Element("<span>").addClass("bi-keyword-red-mark")
                    .text(textLeft.substr(pidx, keyword.length).replaceAll(" ", "　")));
                if (py != null) {
                    py = py.substr(pidx + keyword.length);
                }
                textLeft = textLeft.substr(pidx + keyword.length);
            } else {
                this.append(textLeft);
                break;
            }
        }

        return this;
    },

    getDomHeight: function (parent) {
        var clone = BI.Element(this).clone();
        clone.appendTo(BI.Element(parent || "body"));
        var height = clone.height();
        clone.remove();
        return height;
    },

    //是否有竖直滚动条
    hasVerticalScroll: function () {
        return this.height() > 0 && this[0].clientWidth < this[0].offsetWidth;
    },

    //是否有水平滚动条
    hasHorizonScroll: function () {
        return this.width() > 0 && this[0].clientHeight < this[0].offsetHeight;
    },

    //获取计算后的样式
    getStyle: function (name) {
        var node = this[0];
        var computedStyle = void 0;

        // W3C Standard
        if (window.getComputedStyle) {
            // In certain cases such as within an iframe in FF3, this returns null.
            computedStyle = window.getComputedStyle(node, null);
            if (computedStyle) {
                return computedStyle.getPropertyValue(BI.hyphenate(name));
            }
        }
        // Safari
        if (document.defaultView && document.defaultView.getComputedStyle) {
            computedStyle = document.defaultView.getComputedStyle(node, null);
            // A Safari bug causes this to return null for `display: none` elements.
            if (computedStyle) {
                return computedStyle.getPropertyValue(BI.hyphenate(name));
            }
            if (name === 'display') {
                return 'none';
            }
        }
        // Internet Explorer
        if (node.currentStyle) {
            if (name === 'float') {
                return node.currentStyle.cssFloat || node.currentStyle.styleFloat;
            }
            return node.currentStyle[BI.camelize(name)];
        }
        return node.style && node.style[BI.camelize(name)];
    },

    __isMouseInBounds__: function (e) {
        var offset2Body = this.offset();
        return !(e.pageX < offset2Body.left || e.pageX > offset2Body.left + this.outerWidth()
        || e.pageY < offset2Body.top || e.pageY > offset2Body.top + this.outerHeight())
    },

    __hasZIndexMask__: function (zindex) {
        return zindex && this.zIndexMask[zindex] != null;
    },

    __buildZIndexMask__: function (zindex, domArray) {
        this.zIndexMask = this.zIndexMask || {};//存储z-index的mask
        this.indexMask = this.indexMask || [];//存储mask
        var mask = BI.createWidget({
            type: "bi.center_adapt",
            cls: "bi-z-index-mask",
            items: domArray
        });

        mask.element.css({"z-index": zindex});
        BI.createWidget({
            type: "bi.absolute",
            element: this,
            items: [{
                el: mask,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }]
        });
        this.indexMask.push(mask);
        zindex && (this.zIndexMask[zindex] = mask);
        return mask.element;
    },

    __releaseZIndexMask__: function (zindex) {
        if (zindex && this.zIndexMask[zindex]) {
            this.indexMask.remove(this.zIndexMask[zindex]);
            this.zIndexMask[zindex].destroy();
            return;
        }
        this.indexMask = this.indexMask || [];
        var indexMask = this.indexMask.pop();
        indexMask && indexMask.destroy();
    }
});

BI.extend(BI.Element, {

    getLeftPosition: function (combo, popup, extraWidth) {
        return {
            left: combo.element.offset().left - popup.element.outerWidth() - (extraWidth || 0)
        };
    },

    getRightPosition: function (combo, popup, extraWidth) {
        var el = combo.element;
        return {
            left: el.offset().left + el.outerWidth() + (extraWidth || 0)
        }
    },

    getTopPosition: function (combo, popup, extraHeight) {
        return {
            top: combo.element.offset().top - popup.element.outerHeight() - (extraHeight || 0)
        };
    },

    getBottomPosition: function (combo, popup, extraHeight) {
        var el = combo.element;
        return {
            top: el.offset().top + el.outerHeight() + (extraHeight || 0)
        };
    },

    isLeftSpaceEnough: function (combo, popup, extraWidth) {
        return BI.Element.getLeftPosition(combo, popup, extraWidth).left >= 0;
    },

    isRightSpaceEnough: function (combo, popup, extraWidth) {
        var viewBounds = popup.element.bounds(), windowBounds = BI.Element("body").bounds();
        return BI.Element.getRightPosition(combo, popup, extraWidth).left + viewBounds.width <= windowBounds.width;
    },

    isTopSpaceEnough: function (combo, popup, extraHeight) {
        return BI.Element.getTopPosition(combo, popup, extraHeight).top >= 0;
    },

    isBottomSpaceEnough: function (combo, popup, extraHeight) {
        var viewBounds = popup.element.bounds(), windowBounds = BI.Element("body").bounds();
        return BI.Element.getBottomPosition(combo, popup, extraHeight).top + viewBounds.height <= windowBounds.height;
    },

    isRightSpaceLarger: function (combo) {
        var windowBounds = BI.Element("body").bounds();
        return windowBounds.width - combo.element.offset().left - combo.element.bounds().width >= combo.element.offset().left;
    },

    isBottomSpaceLarger: function (combo) {
        var windowBounds = BI.Element("body").bounds();
        return windowBounds.height - combo.element.offset().top - combo.element.bounds().height >= combo.element.offset().top;
    },

    getLeftAlignPosition: function (combo, popup, extraWidth) {
        var viewBounds = popup.element.bounds(), windowBounds = BI.Element("body").bounds();
        var left = combo.element.offset().left + extraWidth;
        if (left + viewBounds.width > windowBounds.width) {
            left = windowBounds.width - viewBounds.width;
        }
        if (left < 0) {
            left = 0;
        }
        return {
            left: left
        }
    },

    getLeftAdaptPosition: function (combo, popup, extraWidth) {
        if (BI.Element.isLeftSpaceEnough(combo, popup, extraWidth)) {
            return BI.Element.getLeftPosition(combo, popup, extraWidth);
        }
        return {
            left: 0
        }
    },

    getRightAlignPosition: function (combo, popup, extraWidth) {
        var comboBounds = combo.element.bounds(), viewBounds = popup.element.bounds();
        var left = combo.element.offset().left + comboBounds.width - viewBounds.width - extraWidth;
        if (left < 0) {
            left = 0;
        }
        return {
            left: left
        }
    },

    getRightAdaptPosition: function (combo, popup, extraWidth) {
        if (BI.Element.isRightSpaceEnough(combo, popup, extraWidth)) {
            return BI.Element.getRightPosition(combo, popup, extraWidth);
        }
        return {
            left: BI.Element("body").bounds().width - popup.element.bounds().width
        }
    },

    getTopAlignPosition: function (combo, popup, extraHeight, needAdaptHeight) {
        var comboOffset = combo.element.offset();
        var comboBounds = combo.element.bounds(), popupBounds = popup.element.bounds(),
            windowBounds = BI.Element("body").bounds();
        var top, adaptHeight;
        if (BI.Element.isBottomSpaceEnough(combo, popup, -1 * comboBounds.height + extraHeight)) {
            top = comboOffset.top + extraHeight;
        } else if (needAdaptHeight) {
            top = comboOffset.top + extraHeight;
            adaptHeight = windowBounds.height - top;
        } else {
            top = windowBounds.height - popupBounds.height;
            if (top < extraHeight) {
                adaptHeight = windowBounds.height - extraHeight;
            }
        }
        if (top < extraHeight) {
            top = extraHeight;
        }
        return adaptHeight ? {
            top: top,
            adaptHeight: adaptHeight
        } : {
            top: top
        }
    },

    getTopAdaptPosition: function (combo, popup, extraHeight, needAdaptHeight) {
        var popupBounds = popup.element.bounds(), windowBounds = BI.Element("body").bounds();
        if (BI.Element.isTopSpaceEnough(combo, popup, extraHeight)) {
            return BI.Element.getTopPosition(combo, popup, extraHeight);
        }
        if (needAdaptHeight) {
            return {
                top: 0,
                adaptHeight: combo.element.offset().top - extraHeight
            }
        }
        if (popupBounds.height + extraHeight > windowBounds.height) {
            return {
                top: 0,
                adaptHeight: windowBounds.height - extraHeight
            }
        }
        return {
            top: 0
        }
    },

    getBottomAlignPosition: function (combo, popup, extraHeight, needAdaptHeight) {
        var comboOffset = combo.element.offset();
        var comboBounds = combo.element.bounds(), popupBounds = popup.element.bounds(),
            windowBounds = BI.Element("body").bounds();
        var top, adaptHeight;
        if (BI.Element.isTopSpaceEnough(combo, popup, -1 * comboBounds.height + extraHeight)) {
            top = comboOffset.top + comboBounds.height - popupBounds.height - extraHeight;
        } else if (needAdaptHeight) {
            top = 0;
            adaptHeight = comboOffset.top + comboBounds.height - extraHeight;
        } else {
            top = 0;
            if (popupBounds.height + extraHeight > windowBounds.height) {
                adaptHeight = windowBounds.height - extraHeight;
            }
        }
        if (top < 0) {
            top = 0;
        }
        return adaptHeight ? {
            top: top,
            adaptHeight: adaptHeight
        } : {
            top: top
        }
    },

    getBottomAdaptPosition: function (combo, popup, extraHeight, needAdaptHeight) {
        var comboOffset = combo.element.offset();
        var comboBounds = combo.element.bounds(), popupBounds = popup.element.bounds(),
            windowBounds = BI.Element("body").bounds();
        if (BI.Element.isBottomSpaceEnough(combo, popup, extraHeight)) {
            return BI.Element.getBottomPosition(combo, popup, extraHeight);
        }
        if (needAdaptHeight) {
            return {
                top: comboOffset.top + comboBounds.height + extraHeight,
                adaptHeight: windowBounds.height - comboOffset.top - comboBounds.height - extraHeight
            }
        }
        if (popupBounds.height + extraHeight > windowBounds.height) {
            return {
                top: extraHeight,
                adaptHeight: windowBounds.height - extraHeight
            }
        }
        return {
            top: windowBounds.height - popupBounds.height - extraHeight
        }
    },

    getCenterAdaptPosition: function (combo, popup) {
        var comboOffset = combo.element.offset();
        var comboBounds = combo.element.bounds(), popupBounds = popup.element.bounds(),
            windowBounds = BI.Element("body").bounds();
        var left;
        if (comboOffset.left + comboBounds.width / 2 + popupBounds.width / 2 > windowBounds.width) {
            left = windowBounds.width - popupBounds.width;
        } else {
            left = comboOffset.left + comboBounds.width / 2 - popupBounds.width / 2;
        }
        if (left < 0) {
            left = 0;
        }
        return {
            left: left
        }
    },

    getMiddleAdaptPosition: function (combo, popup) {
        var comboOffset = combo.element.offset();
        var comboBounds = combo.element.bounds(), popupBounds = popup.element.bounds(),
            windowBounds = BI.Element("body").bounds();
        var top;
        if (comboOffset.top + comboBounds.height / 2 + popupBounds.height / 2 > windowBounds.height) {
            top = windowBounds.height - popupBounds.height;
        } else {
            top = comboOffset.top + comboBounds.height / 2 - popupBounds.height / 2;
        }
        if (top < 0) {
            top = 0;
        }
        return {
            top: top
        }
    },

    getComboPositionByDirections: function (combo, popup, extraWidth, extraHeight, needAdaptHeight, directions) {
        extraWidth || (extraWidth = 0);
        extraHeight || (extraHeight = 0);
        var i, direct;
        var leftRight = [], topBottom = [];
        var isNeedAdaptHeight = false, tbFirst = false, lrFirst = false;
        var left, top, pos;
        for (i = 0; i < directions.length; i++) {
            direct = directions[i];
            switch (direct) {
                case "left":
                    leftRight.push(direct);
                    break;
                case "right":
                    leftRight.push(direct);
                    break;
                case "top":
                    topBottom.push(direct);
                    break;
                case "bottom":
                    topBottom.push(direct);
                    break;
            }
        }
        for (i = 0; i < directions.length; i++) {
            direct = directions[i];
            switch (direct) {
                case "left":
                    if (!isNeedAdaptHeight) {
                        var tW = tbFirst ? extraHeight : extraWidth, tH = tbFirst ? 0 : extraHeight;
                        if (BI.Element.isLeftSpaceEnough(combo, popup, tW)) {
                            left = BI.Element.getLeftPosition(combo, popup, tW).left;
                            if (topBottom[0] === "bottom") {
                                pos = BI.Element.getTopAlignPosition(combo, popup, tH, needAdaptHeight);
                                pos.dir = "left,bottom";
                            } else {
                                pos = BI.Element.getBottomAlignPosition(combo, popup, tH, needAdaptHeight);
                                pos.dir = "left,top";
                            }
                            if (tbFirst) {
                                pos.change = "left";
                            }
                            pos.left = left;
                            return pos;
                        }
                    }
                    lrFirst = true;
                    break;
                case "right":
                    if (!isNeedAdaptHeight) {
                        var tW = tbFirst ? extraHeight : extraWidth, tH = tbFirst ? extraWidth : extraHeight;
                        if (BI.Element.isRightSpaceEnough(combo, popup, tW)) {
                            left = BI.Element.getRightPosition(combo, popup, tW).left;
                            if (topBottom[0] === "bottom") {
                                pos = BI.Element.getTopAlignPosition(combo, popup, tH, needAdaptHeight);
                                pos.dir = "right,bottom";
                            } else {
                                pos = BI.Element.getBottomAlignPosition(combo, popup, tH, needAdaptHeight);
                                pos.dir = "right,top";
                            }
                            if (tbFirst) {
                                pos.change = "right";
                            }
                            pos.left = left;
                            return pos;
                        }
                    }
                    lrFirst = true;
                    break;
                case "top":
                    var tW = lrFirst ? extraHeight : extraWidth, tH = lrFirst ? extraWidth : extraHeight;
                    if (BI.Element.isTopSpaceEnough(combo, popup, tH)) {
                        top = BI.Element.getTopPosition(combo, popup, tH).top;
                        if (leftRight[0] === "right") {
                            pos = BI.Element.getLeftAlignPosition(combo, popup, tW, needAdaptHeight);
                            pos.dir = "top,right";
                        } else {
                            pos = BI.Element.getRightAlignPosition(combo, popup, tW);
                            pos.dir = "top,left";
                        }
                        if (lrFirst) {
                            pos.change = "top";
                        }
                        pos.top = top;
                        return pos;
                    }
                    if (needAdaptHeight) {
                        isNeedAdaptHeight = true;
                    }
                    tbFirst = true;
                    break;
                case "bottom":
                    var tW = lrFirst ? extraHeight : extraWidth, tH = lrFirst ? extraWidth : extraHeight;
                    if (BI.Element.isBottomSpaceEnough(combo, popup, tH)) {
                        top = BI.Element.getBottomPosition(combo, popup, tH).top;
                        if (leftRight[0] === "right") {
                            pos = BI.Element.getLeftAlignPosition(combo, popup, tW, needAdaptHeight);
                            pos.dir = "bottom,right";
                        } else {
                            pos = BI.Element.getRightAlignPosition(combo, popup, tW);
                            pos.dir = "bottom,left";
                        }
                        if (lrFirst) {
                            pos.change = "bottom";
                        }
                        pos.top = top;
                        return pos;
                    }
                    if (needAdaptHeight) {
                        isNeedAdaptHeight = true;
                    }
                    tbFirst = true;
                    break;
            }
        }

        switch (directions[0]) {
            case "left":
            case "right":
                if (BI.Element.isRightSpaceLarger(combo)) {
                    left = BI.Element.getRightAdaptPosition(combo, popup, extraWidth).left;
                } else {
                    left = BI.Element.getLeftAdaptPosition(combo, popup, extraWidth).left;
                }
                if (topBottom[0] === "bottom") {
                    pos = BI.Element.getTopAlignPosition(combo, popup, extraHeight, needAdaptHeight);
                    pos.left = left;
                    pos.dir = directions[0] + ",bottom";
                    return pos;
                }
                pos = BI.Element.getBottomAlignPosition(combo, popup, extraHeight, needAdaptHeight);
                pos.left = left;
                pos.dir = directions[0] + ",top";
                return pos;
            default :
                if (BI.Element.isBottomSpaceLarger(combo)) {
                    pos = BI.Element.getBottomAdaptPosition(combo, popup, extraHeight, needAdaptHeight);
                } else {
                    pos = BI.Element.getTopAdaptPosition(combo, popup, extraHeight, needAdaptHeight);
                }
                if (leftRight[0] === "right") {
                    left = BI.Element.getLeftAlignPosition(combo, popup, extraWidth, needAdaptHeight).left;
                    pos.left = left;
                    pos.dir = directions[0] + ",right";
                    return pos;
                }
                left = BI.Element.getRightAlignPosition(combo, popup, extraWidth).left;
                pos.left = left;
                pos.dir = directions[0] + ",left";
                return pos;
        }
    },


    getComboPosition: function (combo, popup, extraWidth, extraHeight, needAdaptHeight, directions, offsetStyle) {
        extraWidth || (extraWidth = 0);
        extraHeight || (extraHeight = 0);
        var bodyHeight = BI.Element("body").bounds().height - extraHeight;
        var maxHeight = Math.min(popup.attr("maxHeight") || bodyHeight, bodyHeight);
        popup.resetHeight && popup.resetHeight(maxHeight);
        var position = BI.Element.getComboPositionByDirections(combo, popup, extraWidth, extraHeight, needAdaptHeight, directions || ['bottom', 'top', 'right', 'left']);
        switch (offsetStyle) {
            case "center":
                if (position.change) {
                    var p = BI.Element.getMiddleAdaptPosition(combo, popup);
                    position.top = p.top;
                } else {
                    var p = BI.Element.getCenterAdaptPosition(combo, popup);
                    position.left = p.left;
                }
                break;
            case "middle":
                if (position.change) {
                    var p = BI.Element.getCenterAdaptPosition(combo, popup);
                    position.left = p.left;
                } else {
                    var p = BI.Element.getMiddleAdaptPosition(combo, popup);
                    position.top = p.top;
                }
                break;
        }
        if (needAdaptHeight === true) {
            popup.resetHeight && popup.resetHeight(Math.min(bodyHeight - position.top, maxHeight));
        }
        return position;
    }
});