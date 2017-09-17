import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {cn, clamp, MouseMoveTracker } from 'utils'
import { AbsoluteLayout } from '../../core/layout'

const RESIZER_WIDTH = 1

class ColumnResizeHandle extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool.isRequired,

        /**
         * This is the height of the line
         */
        height: PropTypes.number.isRequired,

        /**
         * Offset from left border of the table, please note
         * that the line is a border on diff. So this is really the
         * offset of the column itself.
         */
        leftOffset: PropTypes.number.isRequired,

        /**
         * The line is a border on a diff, so this is essentially
         * the width of column.
         */
        initialWidth: PropTypes.number,

        /**
         * The minimum width this dragger will collapse to
         */
        minWidth: PropTypes.number,

        /**
         * The maximum width this dragger will collapse to
         */
        maxWidth: PropTypes.number,

        /**
         * Initial click event on the header cell.
         */
        initialEvent: PropTypes.object,

        /**
         * When resizing is complete this is called.
         */
        onColumnResizeEnd: PropTypes.func,

        /**
         * Column key for the column being resized.
         */
        columnKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    constructor(props, state) {
        super(props, state)
        this.state = {
            leftOffset: props.leftOffset,
            width: props.initWidth
        };
    }
    

    componentWillReceiveProps(/*object*/ newProps) {
        if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
            this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
            this.setState({
                leftOffset: newProps.leftOffset
            })
        }
    }

    componentDidMount() {
        this._mouseMoveTracker = new MouseMoveTracker(
            this._onMove.bind(this),
            this._onColumnResizeEnd.bind(this),
            document.body
        );
    }

    componentWillUnmount() {
        this._mouseMoveTracker.releaseMouseMoves();
        this._mouseMoveTracker = null;
    }

    render() /*object*/ {
        return (
            <AbsoluteLayout.Item
                height={this.props.height}
                width={RESIZER_WIDTH}
                style={{
                    left: this.state.leftOffset,
                    top: 0,
                    backgroundColor: '#0284ff',
                    ...(!this.props.visible && {display: 'none'})
                }}/>
        );
    }

    _onMove(/*number*/ deltaX) {
        let newLeft = this.state.leftOffset + deltaX;
        let width = this.state.width + deltaX;
        const minLeft = this.props.leftOffset - this.props.initWidth + this.props.minWidth;
        const maxLeft = this.props.leftOffset - this.props.initWidth + this.props.maxWidth;
        newLeft = clamp(newLeft, minLeft, maxLeft);
        width = clamp(width, this.props.minWidth, this.props.maxWidth);
        
        this.setState({
            leftOffset: newLeft,
            width: width
        });
    }

    _onColumnResizeEnd() {
        this._mouseMoveTracker.releaseMouseMoves();
        this.props.onColumnResizeEnd(
            this.state.width,
            this.props.columnKey
        );
    }
}

export default ColumnResizeHandle;
