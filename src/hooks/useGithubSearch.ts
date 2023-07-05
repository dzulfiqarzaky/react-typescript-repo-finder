import { useState } from 'react';
import { GithubUser } from '../common/interfaces';
const useGithubSearch = () => {
    const [githubUsers, setGithubUsers] = useState<GithubUser[]>([]);
    const [loadingGithubUsers, setLoadingGithubUsers] = useState(false);
  
    const searchRepos = async (searchText: string) => {
      setLoadingGithubUsers(true);
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${searchText}&page=1&per_page=5&sort=stars&order=desc`);
        const data = await response.json();
        setGithubUsers(data.items);
      } catch (error) {
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
    };
  };

export default useGithubSearch;