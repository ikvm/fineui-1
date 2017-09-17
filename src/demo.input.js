import React, { Component } from 'react'
import { HorizontalCenterLayout, HorizontalAdaptLayout, VerticalLayout } from '../lib/core/layout'
import Button from '../lib/base/single/button'
import Toast from '../lib/base/single/tip/toast/Toast'
import Radio from '../lib/base/single/input/radio/Radio'
import RadioGroup from '../lib/base/single/input/radiogroup/RadioGroup'
import Checkbox from '../lib/base/single/input/checkbox'
import Label from '../lib/base/single/label'
import Spinner from  '../lib/base/spinner'

export default class InputDemo extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handler = () => {
    Toast.show('阻止冒泡失败了啊')
  }

  formater=(v)=>{
      return `$ ${v}`
    }

    parser=(v)=>{
      return v.substr(2)
    }

  render() {
    return <HorizontalCenterLayout width={ 800 }>
             <HorizontalAdaptLayout vgap={ 10 }>
               <Radio>Radio</Radio>
               <Radio>单独的 radio,不过 radio 都是成群出现的吧</Radio>
             </HorizontalAdaptLayout>
             <RadioGroup vgap={ 10 } width={ 200 } checkedValue='2'>
               RadioGroup
               <Radio value='1'>1</Radio>
               <Radio value='2'>2</Radio>
               <Radio value='3'>3</Radio>
             </RadioGroup>
             <HorizontalAdaptLayout vgap={ 10 }>
               <Checkbox>正常的</Checkbox>
               <Checkbox checked={ true }>默认选中的</Checkbox>
               <Checkbox disabled={ true }>disabled</Checkbox>
             </HorizontalAdaptLayout>
             <VerticalLayout vgap={20}>
               <Checkbox>
                 <Label>'Checkbox'标签内放啥都行,显示在右边</Label>
               </Checkbox>
               <Checkbox>
                 <Radio>放个 radio</Radio>
               </Checkbox>
               <Checkbox>
                 <Button>放个 button</Button>
               </Checkbox>
             </VerticalLayout>
            <Spinner height={25} formater={this.formater} parser={this.parser}/>
           </HorizontalCenterLayout>
  }
}
