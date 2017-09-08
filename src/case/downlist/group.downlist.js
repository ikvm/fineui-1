import React, { Component } from "react";
import { Layout, VerticalLayout } from "../../core/layout";

const Line = props => {
	return (
		<Layout
			width={180}
			tgap={-1}
			style={{ borderBottom: "1px solid #cccccc" }}
		/>
	);
};

export default class DownListGroup extends Component {
	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		title: ""
	};

	render() {
		const { title } = this.props;

		return (
			<VerticalLayout>
				<Line />
				{this.props.children}
				<Line />
			</VerticalLayout>
		);
	}
}
