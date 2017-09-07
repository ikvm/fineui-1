import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import Popup from "../../base/overlays/popup";
import Button from "../../base/single/button";
import { Layout } from "../../core/layout";
import DownListItem from "./Item.DownList";
import DownListPopup from "./DownListPopup";

export default class SubItem extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			showChildren: false
		};
	}

	static defaultProps = {
		title: ""
	};

	handleMouseOver = () => {
		this.setState({
			showChildren: true
		});
	};

	handleonMouseOut = () => {
		this.setState({
			showChildren: false
		});
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.showChildren !== nextState.showChildren;
	}

	render() {
		const { children, title } = this.props;

		return (
			<Layout
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleonMouseOut}
			>
				<DownListItem ref={_ref => (this.target = _ref)}>{title}</DownListItem>
				<DownListPopup
					target={() => findDOMNode(this.target)}
					isVisiable={this.state.showChildren}
					direction="right,top"
				>
					{children}
				</DownListPopup>
			</Layout>
		);
	}
}
