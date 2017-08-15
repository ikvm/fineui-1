import React, { Component } from 'react'
import { VerticalLayout, CenterLayout, HorizontalCenterLayout } from '../layout'
import Label from '../components/label'
import Button from '../components/button'
import Text from '../components/text'

class LabelDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            isHighLight: false
        }
    }

    mockData =['', '高度', 'hbs', 'kd']

    redMarkHandler = () => {
        let temp = this.mockData.pop()
        this.setState({
            keyword: temp
        })
        this.mockData.unshift(temp)
    }

    highLightHandler = () => {
        this.setState({
            isHighLight: !this.state.isHighLight
        })
    }



    render() {
        return <HorizontalCenterLayout ref={ (wraper) => this.wraper = wraper } width={ 800 } style={ { backgroundColor: 'gray' } }>
                 <Text>文本组件</Text>
                 <CenterLayout>
                   <Button hgap={ 20 } handler={ this.redMarkHandler }>切换标红</Button>
                   <Button handler={ this.highLightHandler }>切换高亮</Button>
                 </CenterLayout>
                 关键点就是几个重要因素, 是否有宽高, 是否设定了文字区域宽, whiteSpace 是什么,为了看着方便,暂时先给文本区域加个小边框
                 <Label className='label-bg' whiteSpace='normal' keyword={ this.state.keyword } highLight={ this.state.isHighLight } textAlign='left' height={ 100 } width={ 600 } textWidth={ 300 }
                   textHeight={ 30 } vgap={ 20 }>这是一个 label 组件,默认居中河北省,whiteSpace为 normal,设置了宽度,高度,文字高度30,文字宽度,textAlign为left</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 100 } textWidth={ 50 } vgap={ 20 }>label</Label>
                 <Label className='label-bg' whiteSpace='normal' height={ 100 } width={ 600 } textWidth={ 300 } textHeight={ 30 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字高度30,文字宽度.如果文字太长了的话,那么滚动条是很有必要的.不信你看</Label>
                 <Label className='label-bg' whiteSpace='normal' textAlign='right' height={ 100 } width={ 600 } textWidth={ 300 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字宽度,没有文字高度,textAlign为right</Label>
                 <Label className='label-bg' whiteSpace='normal' height={ 100 } width={ 600 } textWidth={ 300 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字宽度,没有文字高度,如果文字太长了,那么滚动条是很有不要的,不信你看.多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } textWidth={ 300 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,文字宽度,没有高度,所以就是被撑开嘛,文字有多少就撑多高</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } textWidth={ 300 } textHeight={ 30 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,文字宽度,所以就是被撑开嘛,文字有多少就撑多高,这个是设置了 textHeight=30 的效果</Label>
                 <Label className='label-bg' width={ 600 } height={ 60 } textWidth={ 300 } vgap={ 20 }>这是一个 label 组件,默认居中,设置了宽度高度,文字宽度,textHeight=30 的效果</Label>
                 <Label className='label-bg' width={ 600 } textWidth={ 300 } textHeight={ 30 } vgap={ 20 }>不设高度,textHeight=30 的效果</Label>
                 <Label className='label-bg' textWidth={ 300 } textHeight={ 30 } vgap={ 20 }>不设宽度,但是设置了 textwidth,textHeight=30 的效果</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } height={ 60 } textHeight={ 30 } vgap={ 20 }>没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 的效果</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } height={ 60 } textHeight={ 30 } vgap={ 20 }>没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 可以滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } textHeight={ 30 } vgap={ 20 }>没设高度,也没有文字宽度,所以就是被撑开嘛,文字有多少就撑多高,whiteSpace为normal,textHeight=30 自然不会出现滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' width={ 600 } height={ 60 } textHeight={ 30 } vgap={ 20 }>有高度,没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 可以滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' textHeight={ 30 } vgap={ 20 }>没设高度,也没有文字宽度,要是不给宽度的话,最大宽度就是容器宽度,所以就是被撑开嘛,文字有多少就撑多高,whiteSpace为normal,textHeight=30 自然不会出现滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' height={ 60 } vgap={ 20 }>设置高度,要是不给宽度的话,最大宽度就是容器宽度,所以就是被撑开嘛,但有高度所以不会无限扩张,超过高度了会出滚动条,不信你看,多加点字效果更明显一点,在多加点.more more more more more more more more moremore more more more more more more
                   more more moremore more more</Label>
                 <Label className='label-bg' width={ 600 } height={ 60 } vgap={ 20 }>whiteSpace为nowrap,默认居中,设置了宽度高度,textHeight=30 的效果,多写几个字就出现三个点了</Label>
                 <Label className='label-bg' width={ 600 } vgap={ 20 }>whiteSpace为nowrap,默认居中,不设高度的效果</Label>
                 <Label className='label-bg' height={ 60 } width={ 250 } vgap={ 20 }>whiteSpace为nowrap,默认居中,不设宽度度的效果填满父组件,设置宽度的话如果文字太长就出现3个点了</Label>
                 <Label className='label-bg' height={ 60 } vgap={ 20 }>whiteSpace为nowrap,默认居中,不设宽度度的效果填满父组件,设置宽度的话如果文字太长就出现3个点了,多添加点文字,more more more</Label>
                 <Label className='label-bg' whiteSpace='normal' height={ 60 } textHeight={ 30 } vgap={ 20 }>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了高度,但没有宽度,文字高度30,如果文字太长了的话,那么滚动条是很有必要的.不信你看,多加点字效果更明显一点,在多加点.more more more more more more more more moremore more more
                   more more more more more more</Label>
                 <Label className='label-bg' height={ 60 } text='也可以通过text属性来设置label文字' textHeight={ 30 } vgap={ 20 }></Label>
               </HorizontalCenterLayout>

    }
}

export default LabelDemo