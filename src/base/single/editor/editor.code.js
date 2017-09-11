/**
 *
 * Created by GUY on 2016/1/15.
 * @class BI.CodeEditor
 * @extends BI.Single
 */
BI.CodeEditor = BI.inherit(BI.Single, {
    _defaultConfig: function () {
        return BI.extend(BI.CodeEditor.superclass._defaultConfig.apply(), {
            baseCls: 'bi-code-editor bi-card',
            value: '',
            watermark: "",
            lineHeight: 2,
            readOnly: false,
            //参数显示值构造函数
            paramFormatter: function (v) {
                return v;
            }
        });
    },
    _init: function () {
        BI.CodeEditor.superclass._init.apply(this, arguments);
        var o = this.options, self = this;
        this.editor = CodeMirror(this.element[0], {
            textWrapping: true,
            lineWrapping: true,
            lineNumbers: false,
            readOnly: o.readOnly
        });
        o.lineHeight === 1 ? this.element.addClass("codemirror-low-line-height") : this.element.addClass("codemirror-high-line-height");
        this.editor.on("change", function (cm, change) {
            BI.nextTick(function () {
                self.fireEvent(BI.CodeEditor.EVENT_CHANGE)
            });
        });

        this.editor.on("focus", function () {
            self.watermark.setVisible(false);
            self.fireEvent(BI.CodeEditor.EVENT_FOCUS);
        });

        this.editor.on("blur", function () {
            self.watermark.setVisible(BI.isEmptyString(self.getValue()));
            self.fireEvent(BI.CodeEditor.EVENT_BLUR);
        });

        // this.editor.on("blur", function () {
        //     self.editor.execCommand("goLineEnd");
        // });

        //水印
        this.watermark = BI.createWidget({
            type: "bi.label",
            text: o.watermark,
            cls: "bi-water-mark",
            whiteSpace: "nowrap",
            textAlign: "left"
        });
        this.watermark.element.bind(
            "mousedown", function (e) {
                self.insertString("");
                self.editor.focus();
                e.stopEvent();
            }
        );
        this.watermark.element.bind("click", function (e) {
            self.editor.focus();
            e.stopEvent();
        });
        BI.createWidget({
            type: "bi.absolute",
            element: this,
            items: [{
                el: this.watermark,
                top: 0,
                left: 5
            }]
        });

        if (BI.isKey(o.value)) {
            BI.nextTick(function () {
                self.setValue(o.value);
            });
        }
    },

    _setEnable: function (b) {
        BI.CodeEditor.superclass._setEnable.apply(this, arguments);
        this.editor.setOption("readOnly", b === true ? false : "nocursor")
    },

    _checkWaterMark: function () {
        var o = this.options;
        if (BI.isEmptyString(this.editor.getValue()) && BI.isKey(o.watermark)) {
            this.watermark && this.watermark.visible();
        } else {
            this.watermark && this.watermark.invisible();
        }
    },

    insertParam: function (param) {
        var value = param;
        param = this.options.paramFormatter(param);
        var from = this.editor.getCursor();
        this.editor.replaceSelection(param);
        var to = this.editor.getCursor();
        var options = {className: 'param', atomic: true};
        if (BI.isNotNull(param.match(/^<!.*!>$/))) {
            options.className = 'error-param';
        }
        options.value = value;
        this.editor.markText(from, to, options);
        this.editor.replaceSelection(" ");
        this.editor.focus();
    },

    insertString: function (str) {
        this.editor.replaceSelection(str);
        this.editor.focus();
    },

    getValue: function () {
        return this.editor.getValue("\n", function (line) {
            var rawText = line.text, value = line.text, num = 0;
            value.text = rawText;
            _.forEach(line.markedSpans, function (i, ms) {
                switch (i.marker.className) {
                    case "param":
                    case "error-param":
                        var fieldNameLength = i.to - i.from;
                        value = value.substr(0, i.from + num) + "$\{" + i.marker.value + "\}" + value.substr(i.to + num, value.length);
                        //加上${}的偏移
                        num += 3;
                        //加上实际值和显示值的长度差的偏移
                        num += (i.marker.value.length - fieldNameLength);
                        break;
                }
            });
            return value;
        });
    },

    _analyzeContent: function (v) {
        var regx = /\$[\{][^\}]*[\}]|(\s+)|\w*\w|\$\{[^\$\(\)\+\-\*\/)\$,]*\w\}|\$\{[^\$\(\)\+\-\*\/]*\w\}|\$\{[^\$\(\)\+\-\*\/]*[\u4e00-\u9fa5]\}|\w|(.)|\n/g;
        return v.match(regx);
    },

    setValue: function (v) {
        var self = this, result;
        this.refresh();
        self.editor.setValue("");
        result = this._analyzeContent(v || "");
        BI.each(result, function (i, item) {
            var fieldRegx = /\$[\{][^\}]*[\}]/;
            var str = item.match(fieldRegx);
            if (BI.isNotEmptyArray(str)) {
                self.insertParam(str[0].substring(2, item.length - 1));
            } else {
                self.insertString(item);
            }
        });
        this._checkWaterMark();
    },

    focus: function () {
        this.editor.focus();
    },
    
    blur: function () {
        this.editor.getInputField().blur();
    },

    setStyle: function (style) {
        this.style = style;
        this.element.css(style);
    },

    getStyle: function () {
        return this.style;
    },

    refresh: function () {
        var self = this;
        BI.nextTick(function () {
            self.editor.refresh();
        });
    }
});
BI.CodeEditor.EVENT_CHANGE = "EVENT_CHANGE";
BI.CodeEditor.EVENT_BLUR = "EVENT_BLUR";
BI.CodeEditor.EVENT_FOCUS = "EVENT_FOCUS";
BI.shortcut("bi.code_editor", BI.CodeEditor);