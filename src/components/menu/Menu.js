import React, { Component } from 'react'
import ButtonView from '../buttonView'
import { VerticalLayout,HorizontalLayout } from '../../layout'

export default class Menu extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static defaultProps = {
        items: [{
            text: "column 8",
            value: 18
        }, {

            text: "column 9",
            value: 19
        }]
    }


    render() {
        const {items}=this.props

        return <VerticalLayout>
                <HorizontalLayout>
                {items.map((value,index)=>{
                    return <ButtonView>{value.text}</ButtonView>
                })}
                </HorizontalLayout>
            </VerticalLayout>
        
    }
}