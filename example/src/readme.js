import * as component_165 from '@kne/with-layer';
import * as component_166 from 'antd/lib/modal';
import * as component_167 from 'antd/lib/button';
import * as component_168 from 'lodash';
const readmeConfig = {
    name: `@kne/with-layer`,
    description: ``,
    summary: `<p>让类似Antd Modal的使用传送门(createPortal)创建的弹窗类的组件可以用函数的方式调用。</p>
<ul>
<li>由于已经脱离原来的上下文(context)，所以弹窗内无法使用弹窗外的context，如果有些全局的context，需要在preset中设置withInstall，它是一个高阶组件</li>
<li>也可以在调用withLayer的时候传入withInstall来做context中继，它会后于preset的withInstall执行而不会覆盖</li>
</ul>`,
    api: `<p>const instance = withLayer(props)</p>
<table>
<thead>
<tr>
<th>属性名</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>withInstall</td>
<td>一个高阶组件，辅助实现context中继</td>
<td>function</td>
<td>-</td>
</tr>
</tbody>
</table>
<p>其他参数参考 <a href="https://ant.design/components/modal-cn/">antd Modal</a></p>`,
    example: {
        isFull: false,
        className: `with_layer_8f130`,
        style: ``,
        list: [{
    title: `普通的弹窗示例`,
    description: `展示一个普通的弹窗示例`,
    code: `const { default: withLayer } = _withLayer;
const { default: Button } = button;
const { default: Modal } = modal;
const { omit } = lodash;

const createModal = withLayer((props) => {
  const others = omit(props, ["close"]);
  return <Modal {...others}>
    我是一个弹窗<Button onClick={props.close}>关闭</Button>
  </Modal>;
});

const BaseExample = () => {
  return <Button type="primary" onClick={() => {
    const instance = createModal({
      title: "弹窗示例"
    });
  }}>弹出弹窗</Button>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "_withLayer",
    packageName: "@kne/with-layer",
    component: component_165
},{
    name: "modal",
    packageName: "antd/lib/modal",
    component: component_166
},{
    name: "button",
    packageName: "antd/lib/button",
    component: component_167
},{
    name: "lodash",
    packageName: "lodash",
    component: component_168
}]
},{
    title: `context中继`,
    description: `展示context中继的方法`,
    code: `const { default: withLayer } = _withLayer;
const { default: Button } = button;
const { default: Modal } = modal;
const { omit } = lodash;
const { createContext, useContext } = React;

const createModal = withLayer((props) => {
  const others = omit(props, ["close"]);
  const contextValue = useContext(context);
  return <Modal {...others}>
    我是一个弹窗<Button onClick={props.close}>关闭</Button>{JSON.stringify(contextValue)}
  </Modal>;
});

const context = createContext({});

const { Provider } = context;

const InnerComponent = () => {
  const contextValue = useContext(context);
  return <Button type="primary" onClick={() => {
    const instance = createModal({
      title: "弹窗示例",
      withInstall: (WrappedComponents) => (props) => <Provider
        value={contextValue}><WrappedComponents {...props} /></Provider>
    });
  }}>弹出弹窗</Button>;
};

const BaseExample = () => {
  return <Provider value={{test:123}}>
    <InnerComponent />
  </Provider>;
};

render(<BaseExample />);

`,
    scope: [{
    name: "_withLayer",
    packageName: "@kne/with-layer",
    component: component_165
},{
    name: "modal",
    packageName: "antd/lib/modal",
    component: component_166
},{
    name: "button",
    packageName: "antd/lib/button",
    component: component_167
},{
    name: "lodash",
    packageName: "lodash",
    component: component_168
}]
}]
    }
};
export default readmeConfig;
