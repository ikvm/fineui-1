import React, {Component} from 'react';
import {TableRow, Cell} from '../Component';
import {VerticalLayout} from '../../../layout'

class TableBody extends Component {

    constructor(props, context) {
        super(props, context);
    }

    _handleWheel = (e) => {
        e.preventDefault();
        let dy = e.deltaY;
        this.props.onWheelY(dy);
    }

    render() {

        const {className, array, cellState, width, height, layoutPosition, layoutLeft, top, left, startCol, ...props} = this.props;

        return(
                <VerticalLayout className={className} scrollx={false} scrolly={false} scrollable={false} 
                                width={width} height={height} left={layoutLeft}>
                    <div className="body-cover" onWheel={this._handleWheel} >
                        {
                            cellState.map((item, index) => {
                                let r = item.row;
                                let c = item.col;
                                let text = array[r][c];
                                let newLeft = item.x + left;
                                let newTop = item.y + top;
                                
                                if (newTop < height && newTop > -item.height && newLeft < width && newLeft > -item.width) {
                                    switch(layoutPosition) {
                                        case "leftBody" :
                                            if (c === startCol) {
                                                return <Cell className="cell-lack-top" key={c + r * array.length} width={item.width - 2} 
                                                             height={item.height - 1} position="absolute" text={text} 
                                                             left={newLeft} top={newTop} {...props}/>;
                                            } else {
                                                return <Cell className="cell-lack-left-top" key={c + r * array.length} width={item.width - 1} 
                                                             height={item.height - 1} position="absolute" text={text} 
                                                             left={newLeft} top={newTop} {...props}/>;
                                            }        
                                            break;
                                        default:
                                            if (c === startCol) {
                                                return <Cell className="cell-lack-top" key={c + r * array.length} width={item.width - 2} 
                                                             height={item.height - 1} position="absolute" text={text} 
                                                             left={newLeft} top={newTop} {...props}/>;
                                            } else {
                                                return <Cell className="cell-lack-left-top" key={c + r * array.length} width={item.width - 1} 
                                                             height={item.height - 1} position="absolute" text={text} 
                                                             left={newLeft} top={newTop} {...props}/>;
                                            }
                                            break;
                                    }
                                    
                                }
                                
                            })
                        }
                    </div>
                </VerticalLayout>
            );
    }
}

export default TableBody