import {UserRepoData, UserRepo, GithubUser} from '../common/interfaces';
import axios from 'axios';
import { useState } from 'react';

const useGithubUserRepos = () => {
    const [userReposList, setUserReposList] = useState<UserRepoData[]>([]);
  
    const getUserRepos = async (name: string, id: number, githubUsers: GithubUser[]): Promise<void> => {
      const foundId = userReposList?.findIndex((repo) => repo.id === id);
      if (foundId !== -1 && userReposList.length !== 0) {
        const updatedReposList = [...userReposList];
        updatedReposList[foundId].open = !updatedReposList[foundId].open;
        setUserReposList(updatedReposList);
      } else {
        try {
          const res = await axios.get<UserRepo[]>(`https://api.github.com/users/${name}/repos`);
          const data: UserRepo[] = res.data.length !== 0 ? res.data : [
            {
              name: 'Not Found',
              description: githubUsers[id]?.description,
              stargazers_count: githubUsers[id]?.stargazers_count,
            },
          ];
          const updatedReposList: UserRepoData[] = [...userReposList, { data, id, open: true }];
          setUserReposList(updatedReposList);
        } catch (err) {
          const errorObj = err as Error;
          const data: UserRepo[] = [
            {
              name: "Error",
              description: errorObj.message,
              stargazers_count: 'error',
            },
          ];
          const updatedReposList: UserRepoData[] = [...userReposList, { data, id, open: true }];
          setUserReposList(updatedReposList);
        }
      }
    };
    
  
    return {
      userReposList,
      getUserRepos,
      setUserReposList,
    };
  };
  
  export default useGithubUserRepos;