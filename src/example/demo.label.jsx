import React, { Component } from 'react'
//import { VerticalLayout } from '../layout'
import * as allLayout from '../layout'
import Label from '../components/label'

class LabelDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const VerticalLayout = allLayout.VerticalLayout
        const HorizontalLayout = allLayout.HorizontalLayout
        return <VerticalLayout width={800}>
            <Label whiteSpace='normal' textAlign='left' height={100} width={600} textWidth={300} textHeight={30} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字高度30,文字宽度,textAlign为left</Label>
            <Label whiteSpace='normal'  height={100} width={600} textWidth={300} textHeight={30} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字高度30,文字宽度.如果文字太长了的话,那么滚动条是很有必要的.不信你看</Label>

            <Label whiteSpace='normal' textAlign='right' height={100} width={600} textWidth={300} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字宽度,没有文字高度,textAlign为right</Label>
            <Label whiteSpace='normal' height={100} width={600} textWidth={300} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,高度,文字宽度,没有文字高度,如果文字太长了,那么滚动条是很有不要的,不信你看.多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>

            <Label whiteSpace='normal' width={600} textWidth={300} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,文字宽度,没有高度,所以就是被撑开嘛,文字有多少就撑多高</Label>
            <Label whiteSpace='normal' width={600} textWidth={300} textHeight={30} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了宽度,文字宽度,所以就是被撑开嘛,文字有多少就撑多高,这个是设置了 textHeight=30 的效果</Label>

            <Label width={600} height={60} textWidth={300} vgap={20}>这是一个 label 组件,默认居中,设置了宽度高度,文字宽度,textHeight=30 的效果</Label>
            <Label width={600} textWidth={300} textHeight={30} vgap={20}>不设高度,textHeight=30 的效果</Label>

            <Label whiteSpace='normal' width={600} height={60} textHeight={30} vgap={20}>没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 的效果</Label>
            <Label whiteSpace='normal' width={600} height={60} textHeight={30} vgap={20}>没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 可以滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>

            <Label whiteSpace='normal' width={600} textHeight={30} vgap={20}>没设高度,也没有文字宽度,所以就是被撑开嘛,文字有多少就撑多高,whiteSpace为normal,textHeight=30 自然不会出现滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>
            <Label whiteSpace='normal' width={600} height={60} textHeight={30} vgap={20}>有高度,没有文字宽度,那么就撑满容器,whiteSpace为normal,textHeight=30 可以滚动的效果,多加点字效果更明显一点,在多加点.more more more more more more more more more</Label>

            <Label width={600} height={60} vgap={20}>whiteSpace为nowrap,默认居中,设置了宽度高度,textHeight=30 的效果,多写几个字就出现三个点了</Label>
            <Label width={600} vgap={20}>whiteSpace为nowrap,默认居中,不设高度的效果</Label>

            <Label height={60} vgap={20}>whiteSpace为nowrap,默认居中,不设宽度度的效果填满父组件</Label>
            <Label whiteSpace='normal' height={60} textHeight={30} vgap={20}>这是一个 label 组件,默认居中,whiteSpace为 normal,设置了高度,文字高度30,如果文字太长了的话,那么滚动条是很有必要的.不信你看,多加点字效果更明显一点,在多加点.more more more more more more more more moremore more more more more more more more more</Label>
        </VerticalLayout>

    }
}

export default LabelDemo