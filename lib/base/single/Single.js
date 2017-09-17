import React, { Component } from "react";
import  cn from  'classnames'
import { Layout, FillLayout, VerticalCenterLayout,CenterLayout } from "../../core/layout";


const CLASS_NAME='fct-single'

export default class Single extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		readonly: false,
		title: null,
		warningTitle: null,
		tipType: null, // success或warning
		value: null
	};

	render() {
		const {
		    className,
			readonly,
			title,
			warningTitle,
			tipType,
			value,
			...props
		} = this.props;

		return <FillLayout className={cn(className,CLASS_NAME)} {...props}>{this.props.children !== undefined ? this.props.children : value}</FillLayout>;
	}
}
