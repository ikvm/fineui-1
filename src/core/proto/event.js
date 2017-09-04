/*
 * 给jQuery.Event对象添加的工具方法
 */
_.extend(BI.Element.Event.prototype, {
    // event.stopEvent
    stopEvent: function () {
        this.stopPropagation();
        this.preventDefault();
    }
});