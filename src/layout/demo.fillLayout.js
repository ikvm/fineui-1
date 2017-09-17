import React, { Component } from 'react'
import Label from '../../lib/base/single/label'
import { FillLayout } from '../../lib/core/layout'

export default class FillLayoutDemo extends Component {
    render() {
        return (
            <FillLayout style={ { border: 'solid 1px #cccccc' } } vgap={ 20 } hgap={ 20 }>
              <Label className='layout-bg1'>fill布局,使子元素撑满父元素.</Label>
            </FillLayout>
            );
    }
}
