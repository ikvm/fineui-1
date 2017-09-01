import React, { Component } from 'react';
import { Layout, AbsoluteLayout } from '../../../core/layout';

class TableResizer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            left: null
        };
    }

    _handleMouseMove(dx, tableWidth, context) {
        let newLeft = context.state.left + dx;
        context.setState({
            left: (newLeft < 19) ? 19 : (((tableWidth - newLeft) < 23) ? tableWidth - 23 : newLeft)
        });
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        const { onTableResize, tableWidth } = this.props;
        let oldX = e.pageX, initX = e.pageX;

        let mouseMove = this._handleMouseMove;
        let context = this;
        let func = (e) => {
            let newX = e.pageX;
            let dx = newX - oldX;
            oldX = newX;
            mouseMove(dx, tableWidth, context);
        };
        let func2 = (e) => {
            let newX = e.pageX;
            let dx = newX - initX;
            if (typeof (dx) !== "undefined")
                onTableResize(dx);
            document.body.removeEventListener("mousemove", func);
            document.body.removeEventListener("mouseup", func2);
        }
        document.body.addEventListener("mousemove", func);
        document.body.addEventListener("mouseup", func2)
    }

    componentWillMount() {
        this.setState({
            left: this.props.left
        });
    }

    render() {
        const { height, width, top } = this.props;

        return (
            <AbsoluteLayout className="table-resizer" style={{ position: "absolute", left: this.state.left, top: top }}>
                <div style={{ height: height, width: width }} onMouseDown={this._handleMouseDown} />
            </AbsoluteLayout>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            left: nextProps.left
        });
    }
}

export default TableResizer