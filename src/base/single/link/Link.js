import React, { Component } from "react";
import Label from "../label";

const CLASS_NAME = "bi-link";

export default class Link extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		href: "",
		target: "_blank"
	};

	render() {
		const { children, className, href, target, ...props } = this.props;

		return (
			<Label {...props}>
				<a href={href} className={cn(className, CLASS_NAME)}>
					{children}
				</a>
			</Label>
		);
	}
}
