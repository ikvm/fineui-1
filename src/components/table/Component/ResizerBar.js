import React, {Component} from 'react';

class ResizerBar extends Component {

    render() { 
        const {height, left, flag} = this.props;

        return (
            <div className="resizer-bar" style={{height: height, 
                                                 left: left, 
                                                 display: (flag != null) ? "block" : "none",}}/>
        );
    }
}

export default ResizerBar