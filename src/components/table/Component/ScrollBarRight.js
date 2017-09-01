import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VerticalLayout } from '../../../layout'
import { getElementTop } from '../../../utils/utils/getElementPosition';
import throttle from 'lodash/throttle';

let oldY = null;

class ScrollBarRight extends Component {

    constructor() {
        super();
        this._throttleMouseMove = throttle(this._throttleMouseMove.bind(this), 150);
    }

    _handleMouseClick = (e) => {
        e.preventDefault();

        const { onScrollChange, coreLength, width } = this.props;
        if (oldY === null) {
            oldY = getElementTop(ReactDOM.findDOMNode(this._bottomBar)) + 10;
        }
        let newY = e.pageY;
        let dy = newY - oldY;
        onScrollChange(dy, coreLength, width);
    }

    _onMouseUp = (e) => {
        oldY = e.pageY;
        document.body.removeEventListener("mousemove", this._throttleMouseMove);
        document.body.removeEventListener("mouseup", this._onMouseUp);
    }

    _throttleMouseMove = (e) => {
        const { onScrollChange, coreLength, width } = this.props;
        let newY = e.pageY;
        let dy = newY - oldY;
        oldY = newY;
        onScrollChange(dy, coreLength, width);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();

        oldY = e.pageY;
        document.body.addEventListener("mousemove", this._throttleMouseMove);
        document.body.addEventListener("mouseup", this._onMouseUp);
    }

    componentWillMount() {
        window.isMove = false;
    }

    render() {

        const { top, headerRowSize, onScrollChange, ...props } = this.props;

        return (
            <VerticalLayout className="scroll-bar-right" scrollx={false} scrolly={false} scrollable={false}
                horizontalAlign="_center" {...props}>
                <div className="scroll-cover" onClick={this._handleMouseClick}>
                    <VerticalLayout scrollx={false} scrolly={false} scrollable={false}
                        horizontalAlign="_center" {...props}>
                        <div className="scroll-bar-right-core" ref={(rightBar) => this._rightBar = rightBar} onMouseDown={this._handleMouseDown} style={{ top: top + 2 + "px" }} />
                    </VerticalLayout>
                </div>
            </VerticalLayout>
        );
    }

}

export default ScrollBarRight