const { default: withLayer } = _withLayer;
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
