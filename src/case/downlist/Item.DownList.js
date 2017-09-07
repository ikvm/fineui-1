import React, { Component } from "react";
import { Layout } from "../../core/layout";
import ButtonView from "../../base/single/buttonView";
import Label from "../../base/single/label";
import cn from "classnames";

const CLASS_NAME = "bi-downlist-item";

export default class DownListItem extends Component {
	constructor(props, context) {
		super(props, context);
	}

	handler = () => {
		console.log("点击了", this.props.children);
	};

	render() {
		const { className, children, ...props } = this.props;

		return (
			<ButtonView
				className={cn(className, CLASS_NAME)}
				width={178}
				handler={this.handler}
				{...props}
			>
				<Label height={25}>{children}</Label>
			</ButtonView>
		);
	}
}
