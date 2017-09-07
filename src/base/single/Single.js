import React, { Component } from "react";
import { Layout, FillLayout, CenterLayout } from "../../core/layout";

export default class Single extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultPtops = {
		readonly: false,
		title: null,
		warningTitle: null,
		tipType: null, // success或warning
		value: null
	};

	render() {
		const {
			readonly,
			title,
			warningTitle,
			tipType,
			value,
			...props
		} = this.props;

		return <FillLayout {...props}>{this.props.children}</FillLayout>;
	}
}
