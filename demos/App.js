import React, { Component, PropTypes } from "react";
import Button from "../src/base/single/button";
import TreeDemo from "./demo.tree";
import ComboDemo from "./demo.combo";
import ButtonDemo from "./demo.button";
import LabelDemo from "./demo.label";
import GridDemo from "./Layout/demo.gird";
import EditorDemo from "./demo.editor";
import PagerDemo from "./demo.pager";
import Tree from "../src/components/tree";
import HorizontalLayoutDemo from "./layout/demo.horizontalLayout";
import VerticalLayoutDemo from "./layout/demo.verticlaLayout";
import CenterLayoutDemo from "./Layout/demo.centerLayout";
import HorizontalCenterLayoutDemo from "./layout/demo.horizontalCenterLayout";
import VerticalCenterLayoutDemo from "./layout/demo.verticalCenterLayout";
import HorizontalAdaptLayoutDemo from "./layout/demo.horizontalAdaptLayout";
import VerticalAdaptLayoutDemo from "./layout/demo.verticalAdaptLayout";
import VtapeLayoutDemo from "./layout/demo.vtapelayout";
import HtapeLayoutDemo from "./layout/demo.htapelayout";
import LeftLayoutDemo from "./layout/demo.leftLayout";
import RightLayoutDemo from "./layout/demo.rightLayout";
import TipsDemo from "./demo.tips.js";
import InputDemo from "./demo.input";
import TabsDemo from "./demo.tabs";
//eslint warning 和react warning太多了,先注释了
import TableDemo from "./demo.table";
import DownListDemo from "./demo.downlist";
import range from "lodash/range";
import "./example.less";

import demos from "./config/config";

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
} from "../src/core/layout";

class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			defaultShowKey: "ButtonDemo",
			demos: demos
		};
	}

	static defaultProps = {};

	changeCard = key => {
		this.setState({
			defaultShowKey: key
		});
	};

	handleTreeEvent = args => {
		if (args.value) {
			this.changeCard(args.value);
		}
	};

	render() {
		const { ...props } = this.props,
			{ ...state } = this.state;
		return (
			<HorizontalAdaptLayout
				style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
			>
				<HorizontalAdaptLayout.Item
					width={200}
					height={"100%"}
					scrollx={false}
					style={{
						borderRight: " 1px solid #eff1f4",
						backgroundColor: "#ffffff"
					}}
				>
					<Tree handler={this.handleTreeEvent} nodes={state.demos} />
				</HorizontalAdaptLayout.Item>
				<HorizontalAdaptLayout.Item scrolly={true} height={"100%"}>
					<CardLayout defaultShowKey={state.defaultShowKey}>
						<ButtonDemo key="ButtonDemo" />
						<LabelDemo key="LabelDemo" />
						<TreeDemo key="TreeDemo" />
						{/* <TableDemo key='TableDemo'></TableDemo> */}
						<GridDemo key="GridLayoutDemo" />
						<EditorDemo key="EditorDemo" />
						<ComboDemo key="ComboDemo" />
						<PagerDemo key="PagerDemo" />
						<HorizontalLayoutDemo key="HorizontalLayoutDemo" />
						<VerticalLayoutDemo key="VerticalLayoutDemo" />
						<CenterLayoutDemo key="CenterLayoutDemo" />
						<HorizontalCenterLayoutDemo key="HorizontalCenterLayoutDemo" />
						<VerticalCenterLayoutDemo key="VerticalCenterLayoutDemo" />
						<HorizontalAdaptLayoutDemo key="HorizontalAdaptLayoutDemo" />
						<VerticalAdaptLayoutDemo key="VerticalAdaptLayoutDemo" />
						<VtapeLayoutDemo key="VtapeLayoutDemo" />
						<HtapeLayoutDemo key="HtapeLayoutDemo" />
						<LeftLayoutDemo key="LeftLayoutDemo" />
						<RightLayoutDemo key="RightLayoutDemo" />
						<TipsDemo key="TipsDemo" />
						<InputDemo key="InputDemo" />
						<TabsDemo key="TabsDemo" />
						<TableDemo key="TableDemo" />
						<DownListDemo key="DownListDemo" />
					</CardLayout>
				</HorizontalAdaptLayout.Item>
			</HorizontalAdaptLayout>
		);
	}
}
export default App;
