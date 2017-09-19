import React, {Component} from "react";
import cn from "classnames";
import {
    CenterLayout,
    Layout,
    HorizontalAdaptLayout,
    VerticalAdaptLayout,
    HorizontalCenterLayout,
    VerticalCenterLayout
} from "../../../core/layout";
import Text from "../text";
import Single from "../Single";
import isNumber from "lodash/isNumber";
import every from "lodash/every";

const CLASS_NAME = "fct-label";

class Label extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        textAlign: "center",
        whiteSpace: "nowrap", //normal  or  nowrap
        forceCenter: false, //是否无论如何都要居中, 不考虑超出边界的情况, 在未知宽度和高度时有效
        textWidth: null,
        textHeight: null,
        text: "",
        py: "",
        keyword: "",
        highLight: false
    };

    _isValid(num) {
        if (isNumber(num) && num > 0) {
            return true;
        } else {
            return false;
        }
    }

    _createCenterEl() {
        const {
            className,
            text,
            textWidth,
            textAlign,
            forceCenter,
            py,
            keyword,
            highLight,
            whiteSpace,
            textHeight,
            style,
            ...props
        } = this.props;

        if (this._isValid(textWidth)) {
            //如果设置了文字宽度
            //设置文字宽度的情况下,如果 textAlign 为 left 或者 right,不仅文字排列要变,内层
            if (whiteSpace === "normal") {
                //如果设置 normal,就涉及到换行的问题了,要给包裹文字的布局组件加上 whitespace
                return (
                    <Single
                        className={cn(CLASS_NAME, className)}
                        scrolly={true}
                        scrollable={true}
                        {...props}
                    >
                        <Text
                            width={textWidth}
                            keyword={keyword}
                            py={py}
                            highLight={highLight}
                            textAlign={textAlign}
                            lineHeight={textHeight}
                            whiteSpace={whiteSpace}
                        >
                            {this.props.children !== undefined ? this.props.children : text}
                        </Text>
                    </Single>
                );
            } else {
                //whitespace 如果是 nowrap,我理解的就是不换行,超出了就三个小点了
                return (
                    <Single className={cn(CLASS_NAME, className)} {...props}>
                        <Text
                            width={textWidth}
                            keyword={keyword}
                            py={py}
                            highLight={highLight}
                            whiteSpace={whiteSpace}
                            textAlign={textAlign}
                            lineHeight={this.props.height}
                            scrollx={false}
                        >
                            {this.props.children !== undefined ? this.props.children : text}
                        </Text>
                    </Single>
                );
            }
        } else {
            //如果没文字宽度的话,那撑满父容器就好了
            if (whiteSpace === "normal") {
                return (
                    <Single
                        className={cn(CLASS_NAME, className)}
                        scrolly={true}
                        scrollable={true}
                        {...props}
                    >
                        {/*这里有一个需要注意,因为有不设置宽度,但是又设置了高度的情况,那么肯定需要滚动,但是不知道宽度怎么滚动啊,所以这里width 设为 '100%'*/}
                        <Text
                            keyword={keyword}
                            py={py}
                            highLight={highLight}
                            whiteSpace={whiteSpace}
                            textAlign={textAlign}
                            lineHeight={textHeight}
                        >
                            {this.props.children !== undefined ? this.props.children : text}
                        </Text>
                    </Single>
                );
            } else {
                //whitespace 如果是 nowrap,那就不换行咯
                //既然用少嵌套了一层 dom,那么要文字垂直居中就只能用 lineheight=height 实现了,用 centerlayout 会出现textoverflow 样式失效的问题

                const styleObj = {
                    maxWidth: '100%'
                }

                return (
                    <Text
                        className={cn(CLASS_NAME, className)}
                        keyword={keyword}
                        py={py}
                        highLight={highLight}
                        whiteSpace="nowrap"
                        textAlign={textAlign}
                        lineHeight={this.props.height}
                        {...props}
                    >
                        {this.props.children !== undefined ? this.props.children : text}
                    </Text>
                );
            }
        }
    }

    render() {
        // const { className, baseCls, textAlign, height, whiteSpace, ...props } = this.props
        return this._createCenterEl();
    }
}

export default Label;
