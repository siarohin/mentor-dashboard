import firebase from './firebase';

export const getAuth = () => {
  return firebase.auth();
};

export const githubOAuth = () => {
  return new firebase.firebase_.auth.GithubAuthProvider();
};