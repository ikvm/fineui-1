import React, {Component} from 'react';
import {TableRow} from '../Component';
import {VerticalLayout} from '../../../layout';

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

        const {array, className, width, height, scrollx, scrolly, scrollable, ...props} = this.props;

        return(
                <VerticalLayout className={className} scrollx={scrollx} scrolly={scrolly} scrollable={scrollable} 
                                width={width} height={height}>
                    <div className="body-cover" onWheel={this._handleWheel}>
                        {
                            array.map((arrayRow, index) => {
                                return(
                                    <TableRow key={index} rowIndex={index} array={arrayRow} {...props}/>
                                );
                            })
                        }
                    </div>
                </VerticalLayout>
            );
    }
}

export default TableBody