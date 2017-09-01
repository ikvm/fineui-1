import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HorizontalLayout } from '../../../layout';
import { getElementLeft } from '../../../utils/utils/getElementPosition';
import cn from 'classnames';
import throttle from 'lodash/throttle';

let oldX = null;

class ScrollBarBottom extends Component {

    constructor() {
        super();
        this._throttleMouseMove = throttle(this._throttleMouseMove.bind(this), 150);
    }

    _handleMouseClick = (e) => {
        e.preventDefault();
        const { onScrollChange, coreLength, width } = this.props;
        if (oldX === null) {
            oldX = getElementLeft(ReactDOM.findDOMNode(this._bottomBar)) + 10;
        }
        let newX = e.pageX;
        let dx = newX - oldX;
        onScrollChange(dx, coreLength, width);
    }

    _onMouseUp = (e) => {
        oldX = e.pageX;
        document.body.removeEventListener("mousemove", this._throttleMouseMove);
        document.body.removeEventListener("mouseup", this._onMouseUp);
    }

    _throttleMouseMove = (e) => {
        const { onScrollChange, coreLength, width } = this.props;
        let newX = e.pageX;
        let dx = newX - oldX;
        oldX = newX;
        onScrollChange(dx, coreLength, width);
    }

    _handleMouseDown = (e) => {
        e.preventDefault();

        oldX = e.pageX;
        document.body.addEventListener("mousemove", this._throttleMouseMove);
        document.body.addEventListener("mouseup", this._onMouseUp);
    }

    componentWillMount() {
        window.isMove = false;
    }

    render() {

        const { left, top, layoutLeft, coreLength, onScrollChange, width, height, ...props } = this.props;

        return (
            <HorizontalLayout className="scroll-bar-bottom"  scrollx={false} scrolly={false} scrollable={false}
                width={width} height={height} {...{onClick: this._handleMouseClick}} verticalAlign="_middle" {...props} {...props}>
                    
                        <div className="scroll-bar-bottom-core" ref={(bottomBar) => this._bottomBar = bottomBar} onMouseDown={this._handleMouseDown}
                            style={{ left: left + 2 + "px", width: coreLength + "px" }} />
                    
            </HorizontalLayout>
        );
    }
}

export default ScrollBarBottom