import React, {Component} from 'react';
import {Layout} from '../../../core/layout'
import cn from 'classnames'

const CLASS_NAME = 'bi-icon'


class Icon extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        iconCls: '',
        width: 25,
        height: 25
    }

    render() {
        const {iconCls, width, height, style, ...props} = this.props

        const styleObj = {
            width,
            height,
            ...style
        }


        return <i className={ cn(CLASS_NAME, iconCls) } style={ styleObj } {...props}/>
    }
}

export default Icon
