# react-typescript-repo-finder

this is a simple website meant to find a user of github and their repository on github. This project is build using react, typescript, styled-component, antd, axios, jest. i tried to not change the design as much as posible from the requested design.


About why i choose particular installed dependencies
# styled-components
I really love this one, i think this one is the most beautiful css dependency out there, easily maintainable, easy to read, easy to customize, you can put this styled-component after all your codes. its easy to the eye, especially when you customize some css from another dependency ex: antd, mui, or your own, you dont need to change to another files and make your project seems larger by adding css files.

you can even customize your styling based on a props, like for example from this particular styled component code, you can find it at App.tsx line 73

```
const ShowingText = styled.p<{ show: string | boolean }>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;
```

this is where i used the styled component, you can find it at App.tsx line 58
```
<ShowingText show={showTextSearch}>
    Showing users for "{showTextSearch}"
</ShowingText>
```

from the code above, you can see that i am using a props to change the component opacity using css, at more complex project the possibility is limitless.

# antd
there is a lot i can choose on this category, like MUI, bootsrap, tailwind, etc.
for the big company project that want a stability, similar theme accross platform, its a little bit hard to customize but its good overall, they choose antd.

when i build the apps, i start with pure skelleton (using css, html, react), and after the code is created, the fetch works and integrated, i changed it with antd. this is because i didnt know what to choose between antd or just using tailwind before. so i need to convert this code, i didnt save this code.
```
    <div className="App-body">
        {loadingGithubUsers ? 
        <Skeleton count={showTextSearch.length <=10 ? 5: 1} height={50}/> : 
        {githubRepos.map((repo, idx) => (reposItems.length !== 0? (
            <div key={repo.id}>
            <h3>{repo.name}</h3>
            <button onClick={(e) => {getUserRepos(e, repo.name, idx)}>view repos<button>
            {userReposList.length > 0 && userReposList?.filter(repo => repo.id === idx && repo.open)[0]?.data.map(repo => (
            <div key={repo.id} style={{ background: userReposList[idx].color }}>
             ): (
            <h3>{repo.name}</h3>
            <NotFound text={"Users"}/>
            <p>{repo.description}</p>
            )}
            <p>stars: {repo.stargazers_count}</p>
            </div>
          ))}
        </div>
     ))}
    </div>
```
the code above means is when i get the list of github User, i click the view reposbutton, when i click it, it will fetch the repos of that particular user and shows it on the html pages.

so when i choose antd, i need to change those code above into this one, this can be found in App.tsx
```
    <UserList
        users={githubUsers}
        loading={loadingGithubUsers}
        activeKey={activeKeys}
        reposItems={reposItems}
        onChange={onChange}
        showTextSearch={showTextSearch}
    />
```
and make this useMemo function for the antd Collapse child. this can be found in App.tsx
```
 const reposItems: RepoItem[] = useMemo(() => githubUsers.map((repo, idx) => ({
    key: idx,
    label: repo.login,
    children: userReposList[idx]?.data ? (
      <UserRepos reposList={userReposList[idx]?.data} index={idx} />
    ) : (
      <Skeleton />
    ),
  })), [githubUsers, userReposList]);
```
and make another UserRepos component for antd Collapse children. this can be found on ./components/UserRepos.tsx
```
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
```

# axios
this one is based, i can use only fetch after all. i wanted to install react-query , but thats an overkill, i can't show any skill i have, like for example when i open the dropdown, if the data of repos already fetched before, i dont have to fetch the data again, it will minimize the cost of the server. react-query solved it automatically, axios not. so i made this code. this can be found on ./hooks/useGithubUserRepos.ts
```
    const [userReposList, setUserReposList] = useState<UserRepoData[]>([]);

    const getUserRepos = async (name: string, id: number, githubUsers: GithubUser[]): Promise<void> => {
      const foundId = userReposList?.findIndex((repo) => repo.id === id);
      if (foundId !== -1 && userReposList.length !== 0) {
        const updatedReposList = [...userReposList];
        updatedReposList[foundId].open = !updatedReposList[foundId].open;
        setUserReposList(updatedReposList);
      } else {
        ...
      }
    };
```
it's a simple code just to check if the data of particular users of github is already there or not, if it is, i dont have to fetch again, i just have to change the open = true, so the dropdown will show the list of repos.

# jest
i tried to install this so i can test the integration and component pages, but the installation have some beef with the es6 modules, i didnt really know why even the simple npm test is not working, i tried to find a couple of fixing in the internet and tried a lot of it but it's still not working,
this is the error that i found, if anyone can help it would be appreciated.
```
Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.
```


# 3 folders inside the src
when i first make this using pure react-javascript, i only needed one file with 200 lines of codes, but we want stability and easily maintainable code, so i change a couple of codes into separate components.

# the common folder
this is the place where i put all the interfaces for typescript.

# the components folder
this is the place where i put all the reusable component for the projects.
this is filled with notFound, welcome, searchForm, UserList, and UserRepos.
# the hooks folder
this is the place where i put all the fetching function for the project.
for this project i place the github users search api and repos finder api.

# where is the pages folder/router?
because the project is simple, i didnt install the react router, instead of using main/index page, i used the App.tsx to place all the main code.
when the project needs more pages, i will build the pages folder and install react router dependency.

# a couple of code i choose to write
there is a lot of ways people interpret an images, from the test provided, what i get from the image is user want the words of "Showing users for {search_user_name}" shown when the search button is clicked, and hide it when user click the dropdown of the repos.
this is why this particular code is happened, this is on App.tsx
```
  const [showTextSearch, setShowTextSearch] = useState('');

  const onChange = useCallback((keys: string | string[]) => {
    ...
    setShowTextSearch(keys.length !== 0 ? '' : githubUsersSearchText);
    ...
  }, [githubUsers, githubUsersSearchText, reposItems, setActiveKeys, setShowTextSearch, getUserRepos]);

  return (
    ...
    <ShowingText show={showTextSearch}>
        Showing users for "{showTextSearch}"
    </ShowingText>
    <UserList
        users={githubUsers}
        loading={loadingGithubUsers}
        activeKey={activeKeys}
        reposItems={reposItems}
        onChange={onChange}
        showTextSearch={showTextSearch}
      />
  )
```
so when the user click the search button, the text is updated, and user can see the "showing users", when user click the dropdown, the "showing users" text will be hidden with it. 
actually i can use the githubUsersSearchText for this, so when user typing in the search input, the words will show up, but im afraid the intention of the users is different, so i add showTextSearch useState.

# error and not found repository
i tried to install swole or similar package for the error handling, but for me, the little popup at the top is so annoying, for me its like an advertisement from a shaddy website even tho its seems cooler, so i choose to just put the error code inside the notFound category, because the user just said to handle the error without telling me how to handle it, i choose this way, because for me its cleaner this way. i place the aww snap pages for the error. this can be found on ./hooks/useGithubUserRepos.ts

```
const getUserRepos = async (name: string, id: number, githubUsers: GithubUser[]): Promise<void> => {
      const foundId = userReposList?.findIndex((repo) => repo.id === id);
      if (foundId !== -1 && userReposList.length !== 0) {
        ...
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
         ...
        } catch (err) {
          const errorObj = err as Error;
          const data: UserRepo[] = [
            {
              name: "Error",
              description: errorObj.message,
              stargazers_count: 'error',
            },
          ];
          ...
        }
      }
    };
```
from this code above, i just change the name if the result of repository is empty to "Not Found", and when its an error i changed it into "Error", i didnt remove the description and stargazer_count because so i dont have to change the typescript interface again and we dont use it anyway.

then as a result i handle it this way, this can be found on ./components/UserRepos.tsx
```
 {reposList.map((repo, idx) => {
        return repo.name === 'Not Found' ? (
        <NotFound text="Repositories" key={idx} />
        ) :repo.name === 'Error' ? (
          <NotFound text="Error" key={idx}/>
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
```

and this is the ./components/NotFound,tsx
```
const errorMessage = text === "Error" ? (
    <>
      <h1>aww snap!</h1>
      <p>I think github throttled us.</p>
    </>
  ) : (
    <>
      <h1>{text} Not Found</h1>
      <p>The requested {text} does not exist.</p>
    </>
  );
```
the intention is clear as day.

# the scroll container on repos list
when i saw the picture of the projects, i see fetch of the github user maximum is 5, we dont need to have next pages, so its simple. but then i saw we need to show all the user repos. if by the time i have 200 repos on particular user, the people who access this pages would find it annoying, so i fixed it with these simple css code, can be found on ./components/UserRepos.tsx
```
return (
    <ScrollableContainer key={index}>
    ...
    </ScrollableContainer>
)
...
const ScrollableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

```

# about the design
antd handle the mobile version easily, thats why i choose it, i can do the same with the css tools as well, but here i just wanted to show you the expertise of me using antd for a year. if you want to see me how i handle the screen size using only pure css, you can see my css code when handling the screen size in this repos https://github.com/dzulfiqarzaky/pasarnow-front-end-test/

lastly, when designing the desktop version, when i see the picture given to me, i only saw the mobile version of it. when user wanted me to make any preferences, like for example the search is on the left, the list of the repos will be on the right, i can do that as well. it just i dont have enough time to think about the good design for the desktop. so I make it simple, i just put max-width on it to 600px. you can find it on App.tsx
```
return (
    <MainContainer>
      ...
    </MainContainer>
  );


const MainContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;
```

# Thank you
thank you for reading the readme, i hope i cover all the things i wanna say, if you have anything to ask, please feel free to reach me at https://www.linkedin.com/in/dzulfiqar-zaky-02aa70181/.

