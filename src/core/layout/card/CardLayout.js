import React, { Component } from 'react'
import cn from 'classnames'
import isNil from 'lodash/isNil'
import Layout from '../Layout'
import './CardLayout.less'

class CardLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {className, defaultShowKey, children, ...props} = this.props;
        return <Layout className={ cn('bi-card-layout', className) } {...props}>
                 { React.Children.map(children, (child) => {
                                                                                                                return <Layout key={ child.key } style={ {
                                                          position: 'absolute',
                                                          left: 0,
                                                          right: 0,
                                                          top: 0,
                                                          bottom: 0,
                                                          //研究了一下, key 是map 方法里取到的 child对象的属性,所以直接用 child.key就可以. child.props是不会保存 key 的,要想用 child.props 就要用别的关键字,keys,name,whatever
                                                          display: (isNil(defaultShowKey) || defaultShowKey === child.key) ? '' : 'none'
                                                      } }>
                                                                                                                    { child }
                                                                                                                </Layout>
                                                                                                            }) }
               </Layout>
    }
}
export default CardLayout
