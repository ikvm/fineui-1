/**
 * Created by Urthur on 2017/8/10.
 */

import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'
import cn from 'classnames'
import emptyFunction from 'fbjs/lib/emptyFunction'
import {
    Layout,
    VerticalLayout
} from '../../layout'

import './combo.less'

const CLASS_NAME = 'bi-combo';

class Combo extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        trigger: 'click',
        direction: 'bottom', //top
        popupGetter: emptyFunction
    };

    state = {
        popupShow: true
    };

    componentDidMount() {
        const {popupGetter, ...props} = this.props;
        if (popupGetter && !this.state.popupShow) {
             this._assertPopup();
        }
    }

    _assertPopup() {
        const self = this, {popupGetter, ...props} = this.props;
        this.popup = document.createElement("div");
        document.body.appendChild(this.popup);

        ReactDom.render(popupGetter, this.popup, function () {
            let position = self._getPosition();
            self.popup.style.position = 'fixed';
            self.popup.style.left = position.left;
            self.popup.style.top = position.top;
            self.popup.style.zIndex = 10000000;
        });

        this._render = true;
    }

    _getPosition() {
        const {direction} = this.props;
        let triggerX = ReactDom.findDOMNode(this.refs.trigger).getBoundingClientRect().left,
            triggerY = ReactDom.findDOMNode(this.refs.trigger).getBoundingClientRect().top,
            triggerH = ReactDom.findDOMNode(this.refs.trigger).offsetHeight,
            popupH = this.popup.offsetHeight;

        let left = triggerX + 'px', top;
        switch (direction) {
            case "bottom":
                top = (triggerY + triggerH) + 'px';
                break;
            case "top":
                top = (triggerY - popupH) + 'px';
                break;
            default:
                break;
        }

        return {
            left: left,
            top: top
        }
    }

    componentDidUpdate() {
        const {popupGetter, ...props} = this.props;
        ReactDom.render(popupGetter, this.popup);
    }

    componentWillUnmount() {
        this._unmountPopup;
    }

    _unmountPopup() {
        ReactDom.unmountComponentAtNode(this.popup);
        document.body.removeChild(this.popup);
        this._render = false;
    }

    _handler = (e) => {
        const self = this;
        e.nativeEvent.stopImmediatePropagation();

        self.setState({popupShow: !self.state.popupShow});

        if (this.state.popupShow) {
            this._assertPopup();
            document.onclick =  function (e) {
                e.stopPropagation();
                if (self._render) {
                    self._unmountPopup();
                    self.setState({popupShow: true});
                }
            };
        } else {
            if (this._render) {
                this._unmountPopup();
            }
        }
    };
    _mouseEnter = (e) => {
        this._assertPopup();
    };
    _mouseLeave = (e) => {
        this._unmountPopup();
    };

    render (){
        const self = this, {trigger, children, ...props} = this.props;

        let evs = trigger.split(","), eventArr = {};
        evs.map(function (ev) {
            switch (ev) {
                case "hover":
                    eventArr.onMouseEnter = self._mouseEnter;
                    eventArr.onMouseLeave = self._mouseLeave;
                    break;
                case "click":
                    eventArr.onClick = self._handler;
                    break;
                default:
                    break;
            }
        });

        return <VerticalLayout className={cn(CLASS_NAME)} >
            <Layout className={cn("bi-trigger")} {...eventArr} ref="trigger">
                {children}
            </Layout>
        </VerticalLayout>
    }
}
export default Combo
