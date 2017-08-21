import React, {Component} from 'react';

let height;
let oldX;

class TableCellResizer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            left: null,
        }
    }

    _handleMouseMove(newLeft, width, context) {
        context.setState({
            left: (newLeft + width < 21) ? (21 - width) : newLeft,
        });
    }

    _handleMouseDown = (e) => {
        e.preventDefault();
        oldX = e.pageX;
        const {onTableCellResize, onResizerBar, index, width} = this.props;
        let dx;
        let newLeft = 0;
        let mouseMove = this._handleMouseMove;
        let context = this;
        let func = (e) => {
            let newX = e.pageX;
            dx = newX - oldX;
            oldX = newX;
            newLeft = this.state.left + dx;
            mouseMove(newLeft, width, context);
        };
        let func2 = (e) => {
            onTableCellResize(index, newLeft);
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            left: nextProps.left,
        });
        height = nextProps.height;
    }
    
}

export default TableCellResizer