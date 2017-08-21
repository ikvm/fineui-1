/**
 * Created by Urthur on 2017/8/15.
 */

import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
import cn from 'classnames'
import emptyFunction from 'fbjs/lib/emptyFunction'
import {
    Layout,
    CenterLayout,
    VerticalLayout
} from '../../layout'

const CLASS_NAME = 'bi-react-popup';

class PopupView extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        maxWidth: 'auto',
        minWidth: 100,
        minHeight: 25
    };

    componentDidMount() {
        this._handler();
    }

    _handler() {
        const {...props} = this.props;
        this.element = ReactDom.findDOMNode(this.refs.popup);
        let fn = function (e) {
            e.stopPropagation();
        };

        this.element.addEventListener("click", fn);
        this.element.addEventListener("mousewheel", fn);
        this.element.addEventListener("mousedown", fn);
        this.element.addEventListener("mouseup", fn);
        this.element.addEventListener("mouseover", fn);
    }

    render (){
        const {children, minWidth, maxWidth, minHeight, ...props} = this.props;
        let styleOb = {
            zIndex: 100000000,
            minWidth: minWidth,
            maxWidth: maxWidth,
            minHeight: minHeight
        };

        return <VerticalLayout className={cn(CLASS_NAME)} style={{styleOb}} {...props} ref="popup">
            {children}
        </VerticalLayout>
    }
}
export default PopupView
