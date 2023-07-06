import React from 'react';
import { Collapse } from 'antd';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NotFound from './NotFound';
import Welcome from './Welcome';
import { UserListProps } from '../common/interfaces';
  
  const UserList: React.FC<UserListProps> = ({
    users,
    loading,
    activeKey,
    reposItems,
    onChange,
    showTextSearch,
    error,
  }) => {
    return (
      <>
        {loading ? (
          <Skeleton count={showTextSearch.length <= 10 ? 5 : 1} height={50} />
        ) : reposItems.length !== 0 ? (
          <Collapse
            activeKey={activeKey}
            onChange={onChange}
            expandIconPosition="end"
            items={reposItems}
          />
        ) : error ? (
          <NotFound text="Error" />
        ) : showTextSearch ? (
          <NotFound text="Users" />
        ) : (
          <Welcome />
        )}
      </>
    );
  };
  
  

export default UserList;
