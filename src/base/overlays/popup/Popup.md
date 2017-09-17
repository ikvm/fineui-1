## Popup ##

# Usege #
```jsx
import Popup from  './Popup'
class Popup extends Component{
    constructor(props, context) {
		super(props, context);
		this.state = {
			showPopup: false
		};
	}

    render(){
        return (
            <Layout>
                <button ref={c => (this.c = c)}>点击弹出</button>
                <Popup isVisiable={this.state.showPopup} target={()=>findDomNode(this.c)} direction='bottom,left'>
                    <div>弹窗内容</div>
            </Popup>
            </Layout>
        )
    }
}

```

# API #
| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| target    | 定位的参照点 | domElement\|function   |  null  |
| direction   | 弹出方向 |  string          | bottom,left |
| isVisiable | 是否显示 | boolean           | false
| buttons   | 底部按钮组 | Array< Button >     | []
| tags      | 导航栏    | Array< Reactcomponent > | []