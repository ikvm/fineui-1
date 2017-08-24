import React, { Component } from 'react'
import { HorizontalCenterLayout, HorizontalAdaptLayout,VerticalLayout } from '../layout'
import Button from '../components/button'
import Toast from '../components/tip/toast/Toast'
import Radio from '../components/input/radio/Radio'
import RadioGroup from '../components/input/radiogroup/RadioGroup'
import Checkbox from '../components/input/checkbox'
import Label from '../components/label'

export default class InputDemo extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handler = () => {
        Toast.show('阻止冒泡失败了啊')
    }

    render() {
        return <HorizontalCenterLayout width={800}>
            <HorizontalAdaptLayout vgap={10}><Radio>Radio</Radio><Radio>单独的 radio,不过 radio 都是成群出现的吧</Radio></HorizontalAdaptLayout>

            <RadioGroup vgap={10} width={200} checkedValue='2'>
                RadioGroup
                <Radio value='1'>1</Radio>
                <Radio value='2'>2</Radio>
                <Radio value='3'>3</Radio>
            </RadioGroup>

            <HorizontalAdaptLayout  vgap={10}><Checkbox>正常的</Checkbox><Checkbox checked={true}>默认选中的</Checkbox><Checkbox disabled={true}>disabled</Checkbox></HorizontalAdaptLayout>

            <VerticalLayout>
            <Checkbox>正常的</Checkbox>
            </VerticalLayout>
        </HorizontalCenterLayout>
    }
}