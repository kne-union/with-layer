import ReactDOM from "react-dom/client";
import compose from "@kne/compose";
import React, { createRef, useState, useImperativeHandle, useEffect } from "react";
import useRefCallback from "@kne/use-ref-callback";
import { global } from "./preset";

const withLayer = WrappedComponent => {
  return ({ onCancel, onDestroy, outRef, onMount, onOk, ...props }) => {
    const [visible, setVisible] = useState(false);
    useImperativeHandle(
      outRef,
      () => {
        return {
          close: () => setVisible(false),
          setVisible,
          visible
        };
      },
      [visible, setVisible]
    );

    const mount = useRefCallback(onMount);

    useEffect(() => {
      mount();
      setVisible(true);
    }, [mount]);

    return (
      <WrappedComponent
        {...props}
        visible={visible}
        close={() => setVisible(false)}
        onOk={async () => {
          if (!onOk) {
            setVisible(false);
            return;
          }
          const res = await onOk();
          if (res !== false) {
            setVisible(false);
          }
        }}
        onCancel={(...args) => {
          setVisible(false);
          onCancel && onCancel(...args);
        }}
        afterClose={onDestroy}
      />
    );
  };
};

const createWithLayer = WrappedComponent => {
  const ref = createRef(null);
  const body = document.body;
  return (args) => {
    const LayerComponent = compose(withLayer, global.withInstall)(WrappedComponent);
    const root = document.createElement("div");
    const { withInstall, getContainer, ...props } = Object.assign({}, args);
    body.appendChild(root);
    const rootDom = ReactDOM.createRoot(root);
    const promise = new Promise((resolve) => {
      const LayerInstance = typeof withInstall === "function" ? withInstall(LayerComponent) : LayerComponent;
      rootDom.render(
        <LayerInstance
          outRef={ref}
          {...props}
          getContainer={getContainer ? getContainer : () => root}
          onDestroy={() => {
            root.style.opacity = "0";
            body.removeChild(root);
            setTimeout(() => {
              rootDom.unmount();
            }, 0);
          }}
          onMount={() => {
            resolve({
              close: ref.current.close
            });
          }}
        />
      );
    });

    const close = () => {
      return promise.then(({ close }) => {
        close();
      });
    };
    return {
      close,
      current: { close }
    };
  };
};

export default createWithLayer;
export { preset } from "./preset";
