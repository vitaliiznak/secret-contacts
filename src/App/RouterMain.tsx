import { observer } from 'mobx-react-lite';

import React from 'react';
import { Layout } from 'antd';
import { css } from '@emotion/css';
import { useStore } from '../stores/rootContext';
import StorageChoose from '../screens/Main/StorageChoose';
import KeySet from '../screens/Main/KeySet';
import Main from '../screens/Main';

const RouterMain = () => {
  const {
    contactsStore: { filePath, encKey },
  } = useStore();
  /* 
  if (!ready) {
    return (
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Spin size='large' />
      </div>
    )
  } */
  // eslint-disable-next-line no-extra-boolean-cast
  let Screen;
  if (filePath === undefined) {
    Screen = StorageChoose;
  } else if (filePath === null && encKey === undefined) {
    Screen = KeySet;
  } else {
    Screen = Main;
  }

  return (
    <Layout
      className={css`
        height: 100vh;
      `}
    >
      <div
        className={css`
          max-width: 800px;
          margin: 0 auto;
        `}
      >
        <Screen />
      </div>
    </Layout>
  );
};

export default observer(RouterMain);
