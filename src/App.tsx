import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import SearchForm from './components/SearchForm';
import UserList from './components/UserList';
import UserRepos from './components/UserRepos';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useGithubSearch from './hooks/useGithubSearch';
import useGithubUserRepos from './hooks/useGithubUserRepos';
import { RepoItem } from './common/interfaces';

const App: React.FC = () => {
  const [githubUsersSearchText, setGithubUsersSearchText] = useState('');
  const [showTextSearch, setShowTextSearch] = useState('');
  const [activeKeys, setActiveKeys] = useState<(string | number)[]>([]);
  const { error, githubUsers, loadingGithubUsers, searchRepos } = useGithubSearch();
  const { userReposList, getUserRepos, setUserReposList } = useGithubUserRepos();

  const searchUsers = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowTextSearch(githubUsersSearchText);
    setUserReposList([]);
    setActiveKeys([]);
    await searchRepos(githubUsersSearchText);
  }, [githubUsersSearchText, searchRepos, setShowTextSearch, setUserReposList, setActiveKeys]);

  const reposItems: RepoItem[] = useMemo(() => githubUsers.map((repo, idx) => ({
    key: idx,
    label: repo.login,
    children: userReposList[idx]?.data ? (
      <UserRepos reposList={userReposList[idx]?.data} index={idx} />
    ) : (
      <Skeleton />
    ),
  })), [githubUsers, userReposList]);

  const onChange = useCallback((keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
    setShowTextSearch(keys.length !== 0 ? '' : githubUsersSearchText);
    if (Array.isArray(keys) && keys.length > 0) {
      keys.forEach((key) => {
        const id = +key;
        const name = reposItems[id]?.label;
        if (name) {
          getUserRepos(name, id, githubUsers);
        }
      });
    }
  }, [githubUsers, githubUsersSearchText, reposItems, setActiveKeys, setShowTextSearch, getUserRepos]);

  return (
    <MainContainer>
      <SearchForm
        onSubmit={searchUsers}
        value={githubUsersSearchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubUsersSearchText(e.target.value)}
      />
      <ShowingText show={showTextSearch}>
        Showing users for "{showTextSearch}"
      </ShowingText>
      <UserList
        users={githubUsers}
        loading={loadingGithubUsers}
        activeKey={activeKeys}
        reposItems={reposItems}
        onChange={onChange}
        error={error}
        showTextSearch={showTextSearch}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;
const ShowingText = styled.p<{ show: string | boolean }>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;

export default App;
