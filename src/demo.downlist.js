import React, { Component, PropTypes } from "react";
import Button from "../lib/base/single/button";
import { findDOMNode } from "react-dom";

import DownList from "../lib/case/downlist";

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

class DownListDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			show1: false,
			show2: false
		};
	}

	static defaultProps = {};

	handleClick1 = () => {
		this.setState({
			show1: !this.state.show1
		});
	};

	handleClick2 = () => {
		this.setState({
			show2: !this.state.show2
		});
	};

	render() {
		const { ...props } = this.props,
			{ ...state } = this.state;
		return (
			<CenterLayout
				style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
			>
				<CenterLayout hgap={20}>
					<Button ref={c => (this.button1 = c)} handler={this.handleClick1}>
						由 Items 生成的 downlist
					</Button>
					<DownList
						show={this.state.show1}
						target={() => findDOMNode(this.button1)}
						items={mockData}
						adjustLength={3}
					/>
				</CenterLayout>
				<CenterLayout hgap={20}>
					<Button ref={c => (this.button2 = c)} handler={this.handleClick2}>
						直接写标签生成的 downlist
					</Button>
					<DownList
						show={this.state.show2}
						target={() => findDOMNode(this.button2)}
						adjustLength={3}
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
			</CenterLayout>
		);
	}
}

const mockData = [
	{
		text: "column 1",
		value: 11,
		children: [
			{
				text: "column 1.1",
				value: 211,
				selected: true
			},
			{
				text: "column 1.2",
				value: 222,
				children: [
					{
						text: "column 1.2.1",
						value: 222,
						children: [
							{
								text: "column 1.2.1.1",
								value: 222
							}
						]
					}
				]
			}
		]
	},
	[
		{
			text: "column 2",
			value: 12,
			children: [
				{
					height: 25,
					text: "column 2.1",
					value: 11
				},
				{
					text: "column 2.2",
					value: 12
				}
			]
		},
		{
			text: "column 8",
			value: 18,
			selected: true
		}
	],
	[
		{
			text: "column 9",
			value: 19
		}
	],
	{
		text: "column 10",
		value: 20,
		selected: true
	}
];

export default DownListDemo;
