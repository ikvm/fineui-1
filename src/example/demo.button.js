import React, { Component, PropTypes } from 'react'
import Button from '../components/button'


class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div style={{ margin: '10px' }}>
            {[
                <Button className="test" handler={() => console.log("handler")}></Button>,
                <Button className="test" trigger='dblclick' level="common" >common</Button>,
                <Button className="test" level="success" >success</Button>,
                <Button className="test" level="warning" >warning</Button>,
                <Button className="test" level="ignore" >ignore</Button>,
                <Button className="test" clear={true} level="common" >common clear</Button>,
                <Button className="test" clear={true} level="success" >success clear</Button>,
                <Button className="test" clear={true} level="warning" >warning clear</Button>,
                <Button className="test" clear={true} level="ignore" >ignore clear</Button>,
                <Button className="tttt" disabled={true}>common disabled</Button>,
                <Button className="tttt" disabled={true}>success disabled</Button>,
                <Button className="tttt" disabled={true}>warning disabled</Button>,
                <Button className="test" level="ignore" disabled={true}>ignore disabled</Button>
            ]}
        </div>
    }
}

export default ButtonDemo