import React, {Component} from 'react';

let initLeft;
let height;

class TableResizer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            left: null,
        };
    }

    _handleMouseMove(dx, tableWidth, context) {
        let newLeft = initLeft + dx;
        context.setState({
            left: (newLeft < 19) ? 19 : (((tableWidth - newLeft) < 23) ? tableWidth - 23 : newLeft),
        });
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        const {onTableResize, tableWidth} = this.props;
        let dx;
        let mouseMove = this._handleMouseMove;
        let context = this;
        let func = (e) => {
            let x = e.pageX;
            dx = x - 232;
            mouseMove(dx, tableWidth, context);
        };
        let func2 = (e) => {
            if (typeof(dx) != "undefined")
                onTableResize(dx);
            document.body.removeEventListener("mousemove", func);
            document.body.removeEventListener("mouseup", func2);
        }
        document.body.addEventListener("mousemove", func);
        document.body.addEventListener("mouseup", func2)
    }

    componentWillMount() {
        this.setState({
            left: this.props.left,
        });
        initLeft = this.props.left;
        height = this.props.height;
    }

    render() {

        return(
            <div className="table-resizer" style={{height: height, 
                                                   left: this.state.left,
                                                 }} 
                 onMouseDown={this._handleMouseDown}
            />
        );
    }
}

export default TableResizer