import React, { Component } from 'react';
import { Layout } from '../../layout'
import cn from 'classnames'

const CLASS_NAME = 'bi-icon'


class Icon extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        type: ''
    }

    render() {
        const {type, ...props} = this.props

        return <i className={ cn(CLASS_NAME, type) }></i>
    }
}


export default Icon