import React, { Component } from 'react'
import Combo from '../combo'
import IconButton from '../iconbutton'

export default class DownList extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        height: 25,
        items: [],
        adjustLength: 0,
        direction: "bottom",
        trigger: "click"
    }

    render() {
        const { height, items, adjustLength, direction, trigger, el,...props } = this.props

        let popupView

        return (
            <Combo>
                <IconButton></IconButton>
            </Combo>
        )
    }
}