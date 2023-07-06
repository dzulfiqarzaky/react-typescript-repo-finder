import { useState } from 'react';
import axios from 'axios';
import { GithubUser } from '../common/interfaces';

const useGithubSearch = () => {
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
  const [loadingGithubUsers, setLoadingGithubUsers] = useState(false);
  const [error, setError] = useState(false);
  const searchRepos = async (searchText: string) => {
    setLoadingGithubUsers(true);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchText}&page=1&per_page=5&sort=stars&order=desc`);
      const data = response.data;
      setGithubUsers(data.items);
    } catch (error: any) {
      setError(true);
      setLoadingGithubUsers(false);
      console.log(error);
    } finally {
      setLoadingGithubUsers(false);
    }
  };

  return {
    githubUsers,
    loadingGithubUsers,
    searchRepos,
    error,
  };
};

export default useGithubSearch;