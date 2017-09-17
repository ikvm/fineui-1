let temp = [
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

export default temp;
