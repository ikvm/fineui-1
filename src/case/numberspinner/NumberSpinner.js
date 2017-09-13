import React, {Component} from 'React'
import Spinner from  '../../base/spinner'
import emptyFunction from 'fbjs/lib/emptyFunction'


export default class NumberSpinner extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        value: 1,//初始值
        min: null,
        max: null,
        increment: 1, //增量
        formater:null
    }

    handleUp=()=>{

    }

    handleDown=()=>{

    }


    render() {

        const {className, value, min, max, increment,formater,...props}=this.props

        return (
            <Spinner onSpinUp={this.handleUp} onSpinDown={this.handleDown}>

            </Spinner>
        )
    }
}
