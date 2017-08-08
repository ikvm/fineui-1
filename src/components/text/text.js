import React, { Component } from 'react'


//先用这个假装一个图标
class Text extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <span style={{ userSelect: 'none' }}>{this.props.children}</span>
    }
}
export default Text