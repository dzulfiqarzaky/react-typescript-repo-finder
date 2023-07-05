import { ChangeEvent, FormEvent } from 'react';
 
 export interface GithubUser {
    login: string;
    description: string;
    stargazers_count: number;
  }
  
  export interface UserRepo {
    name: string;
    description: string;
    stargazers_count: number | string;
  }
  
  export interface UserRepoData {
    data: UserRepo[];
    id: number;
    open: boolean;
  }
  
  export interface RepoItem {
    key: number;
    label: string;
    children: JSX.Element | JSX.Element[];
  }
  
  export interface NotFoundProps {
    text: string;
  }

  export interface UserListProps {
    users: GithubUser[];
    loading: boolean;
    activeKey: string | number | (string | number)[] | undefined;
    reposItems: RepoItem[];
    onChange: (key: string | string[]) => void;
    showTextSearch: string;
  }

  export interface SearchFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }