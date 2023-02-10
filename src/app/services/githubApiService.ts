import { Repository } from 'src/app/model/repository.model';
import { User } from 'src/app/model/users.model';

const MAX_NUMBER_OF_USERS = 5;
const BASE_URL = import.meta.env.VITE_GITHUB_API_URL;
const headers = {
  'Authorization': `Token ${import.meta.env.VITE_GITHUB_TOKEN}`
};
export const GithubApiService = {
  fetchUsersByLogin: async (login: string): Promise<User[]> => {
    const url = `${BASE_URL}search/users?q=${login}&per_page=${MAX_NUMBER_OF_USERS}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.items;
  },
  fetchUserRepos: async (login: string, page: number, responsesPerPage: number): Promise<Repository[]> => {
    const url = `${BASE_URL}users/${login}/repos?page=${page}&per_page=${responsesPerPage}`;
    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw Error('Error while fetching data');
      }
      return response.json();
    } catch (error) {
      throw Error('Error while fetching data');
    }
  }
};
