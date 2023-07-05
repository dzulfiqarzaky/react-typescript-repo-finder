import React from 'react';
import { StarFilled } from '@ant-design/icons';
import styled from 'styled-components';
import NotFound from './NotFound';

interface UserReposProps {
  reposList: {
    name: string;
    description: string;
    stargazers_count: number | string;
  }[];
  index: number;
}

const UserRepos: React.FC<UserReposProps> = ({ reposList, index }) => {
  return (
  <ScrollableContainer key={index}>
      {reposList.map((repo, idx) => {
        return repo.name === 'Not Found' ? (
          <NotFound text="Repositories" />
        ) : (
          <RepoContainer key={idx}>
            <RepoHeader>
              <RepoName>{repo.name}</RepoName>
              <StarContainer>
                <StarCount>{repo.stargazers_count}</StarCount>
                <StarFilled />
              </StarContainer>
            </RepoHeader>
            <p>{repo.description}</p>
          </RepoContainer>
        );
      })}
    </ScrollableContainer>
  );
};

const RepoContainer = styled.div`
  background: lightgray;
  padding: 15px;
  margin-left: 25px;
  margin-top: 15px;
  padding-top: 5px;
  height: 120px;
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -20px;
`;

const RepoName = styled.h3``;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 3px;
`;

const StarCount = styled.p`
  margin-bottom: 16px;
`;

const ScrollableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export default UserRepos;
