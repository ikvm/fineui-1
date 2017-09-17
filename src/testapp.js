import React, { Component, PropTypes } from "react";
import Button from "../lib/base/single/button";
import FillLayoutDemo from "./layout/demo.fillLayout";
import { findDOMNode } from "react-dom";

import Popup from "../lib/base/overlays/popup";
import DownList from "../lib/case/downlist";
import range from "lodash/range";
import "./example.less";
import demos from "./config/config";

const Group = DownList.Group;
const Item = DownList.Item;
const SubItem = DownList.SubItem;

import {
	AbsoluteLayout,
	CenterLayout,
	HorizontalCenterLayout,
	VerticalCenterLayout,
	HorizontalLayout,
	HtapeLayout,
	VtapeLayout,
	Layout,
	CardLayout,
	VerticalLayout,
	HorizontalAdaptLayout,
	VerticalAdaptLayout
} from "../lib/core/layout";

class TestApp extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			show: true
		};
	}

	static defaultProps = {};

	handleClick = () => {
		this.setState({
			show: !this.state.show
		});
	};

	render() {
		const { ...props } = this.props,
			{ ...state } = this.state;
		return (
			<CenterLayout
				style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
			>
				<Button ref={c => (this.button = c)} handler={this.handleClick}>
					downlist
				</Button>
				<DownList
					show={this.state.show}
					target={() => findDOMNode(this.button)}
				>
					<SubItem key="1" title="第一级1">
						<SubItem title="第二级1">
							<Item>第三级</Item>
						</SubItem>
					</SubItem>
					<Item key="2">第一级2</Item>
					<SubItem key="6" title="第一级3">
						<Item>第二级2</Item>
						<Item>第二级3</Item>
					</SubItem>
					<Item key="3">第一级4</Item>
					<Group key="4">
						<Item>第一级5</Item>
						<Item>第一级6</Item>
					</Group>
					<Item key="5">第一级7</Item>
				</DownList>
			</CenterLayout>
		);
	}
}
export default TestApp;
