import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { VerticalLayout } from '../../core/layout'
import { getElementTop } from '../../utils/utils/getElementPosition';
import throttle from 'lodash/throttle';
import { emptyFunction, cn, translateDOMPositionXY, clamp } from 'utils'
import './Scrollbar.less'


const FACE_SIZE_MIN = 30;
const FACE_MARGIN = 4;
const FACE_MARGIN_2 = FACE_MARGIN * 2;

let requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');
let EventListener = require('fbjs/lib/EventListener');
let oldY = null;
let oldX = null;

class Scrollbar extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = this._calculateState(props.position || props.defaultPosition || 0,
            props.size,
            props.contentSize,
            props.orientation);
        this._throttleMouseMove = throttle(this._throttleMouseMove.bind(this), 1000 / 60);
    }

    static defaultProps = {
        defaultPosition: 0,
        onScroll: emptyFunction,
        orientation: 'vertical',
        zIndex: 99
    }

    _calculateState(position, size, contentSize, orientation) {
        const isHorizontal = orientation === 'horizontal';
        let scale = size / contentSize;
        let faceSize = size * scale;

        if (faceSize < FACE_SIZE_MIN) {
            scale = (size - FACE_SIZE_MIN) / (contentSize - size);
            faceSize = FACE_SIZE_MIN;
        }

        const scrollable = true;
        
        position = clamp(position, 0, contentSize - size);

        const state = {
            faceSize,
            isHorizontal,
            position,
            scale,
            scrollable
        };

        return state;
    }

    _onMouseDown = (event) => {
        const { contentSize, size } = this.props;
        let nextState;
        oldY = event.pageY;
        oldX = event.pageX;
        if (event.target !== ReactDOM.findDOMNode(this._face)) { // not on the face
            // Both `offsetX` and `layerX` are non-standard DOM property but they are
            // magically available for browsers somehow.
            const nativeEvent = event.nativeEvent;
            let position = this.state.isHorizontal ?
            nativeEvent.offsetX || nativeEvent.layerX :
            nativeEvent.offsetY || nativeEvent.layerY;

            // MouseDown on the scroll-track directly, move the center of the
            // scroll-face to the mouse position.
            const props = this.props;
            position /= this.state.scale;
            position = clamp(position, 0, contentSize - size);
            this.props.onScroll(position)
        } else {
            nextState = {};
            if (!this._eventMoveToken && !this._eventUpToken) {
                this._eventMoveToken = EventListener.listen(
                  document.body,
                  'mousemove',
                  this._throttleMouseMove
                );
                this._eventUpToken = EventListener.listen(
                  document.body,
                  'mouseup',
                  this._onMouseUp
                );
            }
        }
    }

    _onMouseUp = (e) => {
        oldY = e.pageY;
        oldX = e.pageX;
        if (this._eventMoveToken && this._eventUpToken) {
            this._eventMoveToken.remove();
            this._eventMoveToken = null;
            this._eventUpToken.remove();
            this._eventUpToken = null;
        }
    }

    _throttleMouseMove = (e) => {
        const { contentSize, size } = this.props;
        let newY = e.pageY;
        let newX = e.pageX;
        let dy = newY - oldY;
        let dx = newX - oldX;
        oldY = newY;
        oldX = newX;
        let positionChange = this.state.isHorizontal ? dx : dy;
        let newPosition = this.state.position + positionChange / this.state.scale;
        newPosition = clamp(newPosition, 0, contentSize - size)
        
        this.props.onScroll(newPosition);
        
    }

    render() {
        if (!this.state.scrollable) {
            return null;
        }

        const {size, isOpaque} = this.props

        const isHorizontal = this.state.isHorizontal;
        const isVertical = !isHorizontal;
        const isActive = this.state.focused || this.state.isDragging;
        const faceSize = this.state.faceSize;
        const verticalTop = this.props.verticalTop || 0;
        let mainStyle;
        let faceStyle;

        const mainClassName = cn({
            'scrollbar-layout-main': true,
            'scrollbar-layout-main-vertical': isVertical,
            'scrollbar-layout-main-horizontal': isHorizontal,
            'public-scrollbar-main': true,
            'public-scrollbar-main-active': isActive
        });

        const faceClassName = cn({
            'scrollbar-layout-face': true,
            'scrollbar-layout-face-horizontal': isHorizontal,
            'scrollbar-layout-face-vertical': isVertical,
            'public-scrollbar-face-active': isActive,
            'public-scrollbar-face': true
        });

        const position = this.state.position * this.state.scale + FACE_MARGIN;
        
                if (isHorizontal) {
                    mainStyle = {
                        width: size
                    };
                    faceStyle = {
                        width: faceSize - FACE_MARGIN_2
                    };
                    translateDOMPositionXY(faceStyle, position, 0);
                } else {
                    mainStyle = {
                        height: size
                    };
                    faceStyle = {
                        height: faceSize - FACE_MARGIN_2
                    };
                    translateDOMPositionXY(faceStyle, 0, position);
                }
                mainStyle.zIndex = this.props.zIndex;
                if (this.props.trackColor === 'gray') {
                    mainStyle.backgroundColor = '#f6f7f8';
                }

        return (
            <div
            //onFocus={this._onFocus.bind(this)}
            //onBlur={this._onBlur.bind(this)}
            //onKeyDown={this._onKeyDown.bind(this)}
            onMouseDown={this._onMouseDown}
            //onWheel={this._wheelHandler.onWheel.bind(this)}
            className={mainClassName}
            style={mainStyle}
            tabIndex={0}>
            <div
                ref={(ref) => this._face = ref}
                className={faceClassName}
                style={faceStyle}
            />
        </div>
        );
    }

    componentWillReceiveProps(/*object*/ nextProps) {
        const controlledPosition = nextProps.position;
        if (controlledPosition === undefined) {
            this.setState(
                this._calculateState(
                    this.state.position,
                    nextProps.size,
                    nextProps.contentSize,
                    nextProps.orientation
                )
            );
        } else {
            this.setState(
                this._calculateState(
                    controlledPosition,
                    nextProps.size,
                    nextProps.contentSize,
                    nextProps.orientation
                )
            );
        }
    }
}

Scrollbar.SIZE = 10;

export default Scrollbar