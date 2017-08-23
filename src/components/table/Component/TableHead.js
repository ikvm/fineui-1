import React, {Component} from 'react';
import {HeadCell, Cell} from '../Component';
import {HorizontalLayout} from '../../../layout';

class TableHead extends Component {

    render() {

        const {className, array, cellState, width, height, layoutPosition, top, left, startCol, layoutLeft, endCol, ...props} = this.props;
        
        return(
                <HorizontalLayout className={className}  scrollx={false} scrolly={false} scrollable={false}  verticalAlign="_middle"
                                  width={width} height={height} left={layoutLeft}>
                    {
                        cellState.map((item, index) => {
                            let r = item.row;
                            let c = item.col;
                            let text = array[r][c];
                            let newLeft = item.x + left;
                            let newTop = item.y + top;
                            switch(layoutPosition) {
                                case "leftHead":
                                    if (c === startCol) {
                                        return <HeadCell className="cell-complete" col={item.col} key={text} 
                                                         width={item.width - 2} height={item.height - 2} text={text}
                                                         position="absolute" left={newLeft} top={0} {...props}/>;
                                    }
                                    else if (c != endCol) {
                                        return <HeadCell className="cell-lack-left" col={item.col} key={text} 
                                                         width={item.width - 1} height={item.height - 2} text={text}
                                                         position="absolute" left={newLeft} top={0} {...props}/>;
                                    } else {
                                        return <Cell className="cell-lack-left" key={text} width={item.width - 1} 
                                                     height={item.height - 2} position="absolute" text={text} 
                                                     left={newLeft} top={0} {...props}/>;
                                    }
                                    break;
                                case "rightHead":
                                    if (newLeft < width && newLeft > -item.width) {
                                        if (c === startCol) {
                                            return <HeadCell className="cell-complete" col={item.col} key={text} 
                                                             width={item.width - 2} height={item.height - 2} text={text}
                                                             position="absolute" left={newLeft} top={0} {...props}/>;
                                        } else {
                                            return <HeadCell className="cell-lack-left" col={item.col} key={text} 
                                                             width={item.width - 1} height={item.height - 2} 
                                                             position="absolute" text={text} left={newLeft} top={0} 
                                                             {...props}/>;
                                        }
                                    }

                            }
                        })
                    }
                </HorizontalLayout>
            );
    }
}

export default TableHead