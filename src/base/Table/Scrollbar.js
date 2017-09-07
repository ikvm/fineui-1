/**
 * Modified by NieShichao on 2017/09/04.
 */

import React, {Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import mixin from 'react-mixin';
import ReactComponentWithPureRenderMixin from 'react-addons-pure-render-mixin';

import {MouseMoveTracker, WheelHandler, emptyFunction, Keys, cn, translateDOMPositionXY} from 'utils';

import './Scrollbar.less'

const UNSCROLLABLE_STATE = {
    position: 0,
    scrollable: false
};

const FACE_MARGIN = 4;
const FACE_MARGIN_2 = FACE_MARGIN * 2;
const FACE_SIZE_MIN = 30;
const KEYBOARD_SCROLL_AMOUNT = 40;

let _lastScrolledScrollbar = null;

class Scrollbar extends Component {
    static propTypes = {
        contentSize: PropTypes.number.isRequired,
        defaultPosition: PropTypes.number,
        isOpaque: PropTypes.bool,
        orientation: PropTypes.oneOf(['vertical', 'horizontal']),
        onScroll: PropTypes.func,
        position: PropTypes.number,
        size: PropTypes.number.isRequired,
        trackColor: PropTypes.oneOf(['gray']),
        zIndex: PropTypes.number,
        verticalTop: PropTypes.number
    };

    static defaultProps = {
        defaultPosition: 0,
        isOpaque: false,
        onScroll: emptyFunction,
        orientation: 'vertical',
        zIndex: 99
    };

    constructor(props, context) {
        super(props, context);
        this.state = this._calculateState(props.position || props.defaultPosition || 0,
            props.size,
            props.contentSize,
            props.orientation);
    }

    componentWillReceiveProps(/*object*/ nextProps) {
        const controlledPosition = nextProps.position;
        if (controlledPosition === undefined) {
            this._setNextState(
                this._calculateState(
                    this.state.position,
                    nextProps.size,
                    nextProps.contentSize,
                    nextProps.orientation
                )
            );
        } else {
            this._setNextState(
                this._calculateState(
                    controlledPosition,
                    nextProps.size,
                    nextProps.contentSize,
                    nextProps.orientation
                ),
                nextProps
            );
        }
    }

    render() /*?object*/ {
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
            'public-scrollbar-main-opaque': isOpaque,
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
                onFocus={this._onFocus.bind(this)}
                onBlur={this._onBlur.bind(this)}
                onKeyDown={this._onKeyDown.bind(this)}
                onMouseDown={this._onMouseDown.bind(this)}
                onWheel={this._wheelHandler.onWheel.bind(this)}
                className={mainClassName}
                style={mainStyle}
                tabIndex={0}>
                <div
                    ref="face"
                    className={faceClassName}
                    style={faceStyle}
                />
            </div>
        );
    }

    componentWillMount() {
        const isHorizontal = this.props.orientation === 'horizontal';
        const onWheel = isHorizontal ? this._onWheelX : this._onWheelY;
        
        this._wheelHandler = new WheelHandler(
            onWheel.bind(this),
            this._shouldHandleX.bind(this), // Should hanlde horizontal scroll
            this._shouldHandleY.bind(this) // Should handle vertical scroll
        );
    }

    componentDidMount() {
        this._mouseMoveTracker = new MouseMoveTracker(
            this._onMouseMove.bind(this),
            this._onMouseMoveEnd.bind(this),
            document.documentElement
        );

        if (this.props.position !== undefined &&
            this.state.position !== this.props.position) {
            this._didScroll();
        }
    }

    componentWillUnmount() {
        this._nextState = null;
        this._mouseMoveTracker.releaseMouseMoves();
        if (_lastScrolledScrollbar === this) {
            _lastScrolledScrollbar = null;
        }
        delete this._mouseMoveTracker;
    }

    scrollBy(/*number*/ delta) {
        this._onWheel(delta);
    }

    _shouldHandleX(/*number*/ delta) /*boolean*/ {
        return this.props.orientation === 'horizontal' ?
            this._shouldHandleChange(delta) :
            false;
    }

    _shouldHandleY(/*number*/ delta) /*boolean*/ {
        return this.props.orientation !== 'horizontal' ?
            this._shouldHandleChange(delta) :
            false;
    }

    _shouldHandleChange(/*number*/ delta) /*boolean*/ {
        const nextState = this._calculateState(
            this.state.position + delta,
            this.props.size,
            this.props.contentSize,
            this.props.orientation
        );
        return nextState.position !== this.state.position;
    }

    _calculateState(/*number*/ position,
                    /*number*/ size,
                    /*number*/ contentSize,
                    /*string*/ orientation) /*object*/ {
        if (size < 1 || contentSize <= size) {
            return UNSCROLLABLE_STATE;
        }
        
        const stateKey = `${position}_${size}_${contentSize}_${orientation}`;
        if (this._stateKey === stateKey) {
            return this._stateForKey;
        }

        // There are two types of positions here.
        // 1) Phisical position: changed by mouse / keyboard
        // 2) Logical position: changed by props.
        // The logical position will be kept as as internal state and the `render()`
        // function will translate it into physical position to render.

        const isHorizontal = orientation === 'horizontal';
        let scale = size / contentSize;
        let faceSize = size * scale;

        if (faceSize < FACE_SIZE_MIN) {
            scale = (size - FACE_SIZE_MIN) / (contentSize - size);
            faceSize = FACE_SIZE_MIN;
        }

        const scrollable = true;
        const maxPosition = contentSize - size;

        if (position < 0) {
            position = 0;
        } else if (position > maxPosition) {
            position = maxPosition;
        }


        const isDragging = this._mouseMoveTracker ?
            this._mouseMoveTracker.isDragging() :
            false;

        // This function should only return flat values that can be compared quiclky
        // by `ReactComponentWithPureRenderMixin`.
        const state = {
            faceSize,
            isDragging,
            isHorizontal,
            position,
            scale,
            scrollable
        };

        // cache the state for later use.
        this._stateKey = stateKey;
        this._stateForKey = state;
        return state;
    }

    _onWheelY(/*number*/ deltaX, /*number*/ deltaY) {
        this._onWheel(deltaY);
    }

    _onWheelX(/*number*/ deltaX, /*number*/ deltaY) {
        this._onWheel(deltaX);
    }

    _onWheel(/*number*/ delta) {
        const props = this.props;

        // The mouse may move faster then the animation frame does.
        // Use `requestAnimationFrame` to avoid over-updating.
        this._setNextState(
            this._calculateState(
                this.state.position + delta,
                props.size,
                props.contentSize,
                props.orientation
            )
        );
    }

    _onMouseDown(/*object*/ event) {
        let nextState;

        if (event.target !== ReactDOM.findDOMNode(this.refs.face)) { // not on the face
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
            nextState = this._calculateState(
                position - (this.state.faceSize * 0.5 / this.state.scale),
                props.size,
                props.contentSize,
                props.orientation
            );
        } else {
            nextState = {};
        }

        nextState.focused = true;
        this._setNextState(nextState);

        this._mouseMoveTracker.captureMouseMoves(event);
        // Focus the node so it may receive keyboard event.
        ReactDOM.findDOMNode(this).focus();
    }

    _onMouseMove(/*number*/ deltaX, /*number*/ deltaY) {
        const props = this.props;
        let delta = this.state.isHorizontal ? deltaX : deltaY;
        delta /= this.state.scale;

        this._setNextState(
            this._calculateState(
                this.state.position + delta,
                props.size,
                props.contentSize,
                props.orientation
            )
        );
    }

    _onMouseMoveEnd() {
        this._nextState = null;
        this._mouseMoveTracker.releaseMouseMoves();
        this.setState({isDragging: false});
    }

    _onKeyDown(/*object*/ event) {
        const keyCode = event.keyCode;

        if (keyCode === Keys.TAB) {
            // Let focus move off the scrollbar.
            return;
        }

        let distance = KEYBOARD_SCROLL_AMOUNT;
        let direction = 0;

        if (this.state.isHorizontal) {
            switch (keyCode) {
                case Keys.HOME:
                    direction = -1;
                    distance = this.props.contentSize;
                    break;

                case Keys.LEFT:
                    direction = -1;
                    break;

                case Keys.RIGHT:
                    direction = 1;
                    break;

                default:
                    return;
            }
        }

        if (!this.state.isHorizontal) {
            switch (keyCode) {
                case Keys.SPACE:
                    if (event.shiftKey) {
                        direction = -1;
                    } else {
                        direction = 1;
                    }
                    break;

                case Keys.HOME:
                    direction = -1;
                    distance = this.props.contentSize;
                    break;

                case Keys.UP:
                    direction = -1;
                    break;

                case Keys.DOWN:
                    direction = 1;
                    break;

                case Keys.PAGE_UP:
                    direction = -1;
                    distance = this.props.size;
                    break;

                case Keys.PAGE_DOWN:
                    direction = 1;
                    distance = this.props.size;
                    break;

                default:
                    return;
            }
        }

        event.preventDefault();

        const props = this.props;
        this._setNextState(
            this._calculateState(
                this.state.position + (distance * direction),
                props.size,
                props.contentSize,
                props.orientation
            )
        );
    }

    _onFocus() {
        this.setState({
            focused: true
        });
    }

    _onBlur() {
        this.setState({
            focused: false
        });
    }

    _blur() {
        try {
            this._onBlur();
            ReactDOM.findDOMNode(this).blur();
        } catch (oops) {
            // pass
        }
    }

    _setNextState(/*object*/ nextState, /*?object*/ props) {
        
        props = props || this.props;
        const controlledPosition = props.position;
        const willScroll = this.state.position !== nextState.position;
        if (controlledPosition === undefined) {
            const callback = willScroll ? this._didScroll : undefined;
            this.setState(nextState, callback);
        } else if (controlledPosition === nextState.position) {
            this.setState(nextState);
        } else {
            // Scrolling is controlled. Don't update the state and let the owner
            // to update the scrollbar instead.
            if (nextState.position !== undefined &&
                nextState.position !== this.state.position) {
                
                this.props.onScroll(nextState.position);
            }
            return;
        }

        if (willScroll && _lastScrolledScrollbar !== this) {
            _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
            _lastScrolledScrollbar = this;
        }
    }

    _didScroll() {
        this.props.onScroll(this.state.position);
    }
}
Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
Scrollbar.SIZE = 10;
mixin.onClass(Scrollbar, ReactComponentWithPureRenderMixin);

export default Scrollbar;
