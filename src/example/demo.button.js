import React, { Component, PropTypes } from 'react'
import Button from '../components/button'
import IconButton from '../components/iconbutton'
import TextButton from '../components/textbutton'
import { HorizontalCenterLayout } from '../layout'


class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <HorizontalCenterLayout hgap={ 20 } vgap={ 10 }>
                 <Button width={ '100%' } className="test" handler={ () => console.log("handler") }>默认</Button>
                 <Button width={ '100%' } className="test" trigger='dblclick' level="common">common</Button>
                 <Button width={ '100%' } className="test" level="success">success</Button>
                 <Button width={ '100%' } className="test" level="warning">warning</Button>
                 <Button width={ '100%' } className="test" level="ignore">ignore</Button>
                 <Button width={ '100%' } className="test" clear={ true } level="common">common clear</Button>
                 <Button width={ '100%' } className="test" clear={ true } level="success">success clear</Button>
                 <Button width={ '100%' } className="test" clear={ true } level="warning">warning clear</Button>
                 <Button width={ '100%' } className="test" clear={ true } level="ignore">ignore clear</Button>
                 <Button width={ '100%' } className="tttt" disabled={ true }>common disabled</Button>
                 <Button width={ '100%' } className="tttt" disabled={ true }>success disabled</Button>
                 <Button width={ '100%' } className="tttt" disabled={ true }>warning disabled</Button>
                 <Button width={ '100%' } className="test" level="ignore" disabled={ true }>ignore disabled</Button>
                 <Button width={ '100%' } trigger='mouseup,click,mousedown,dbclick' iconCls='abc'>带图标的 button,trigger 同时为mouseup,click,mousedown,dbclick</Button>
                 <IconButton width={ 100 } height={ 50 }></IconButton>
                 <TextButton width={ '100%' }>文字按钮</TextButton>
               </HorizontalCenterLayout>
    }
}

export default ButtonDemo