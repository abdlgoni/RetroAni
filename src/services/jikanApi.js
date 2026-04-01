import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTopAnime = async (page = 1, limit = 25) => {
  try {
    const response = await apiClient.get('/top/anime', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch top anime');
  }
};

export const searchAnime = async (query, page = 1, limit = 25) => {
  try {
    const response = await apiClient.get('/anime', {
      params: { q: query, page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search anime');
  }
};

export const getAnimeById = async (id) => {
  try {
    const response = await apiClient.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch anime details');
  }
};

export const getAnimeEpisodes = async (id, page = 1) => {
  try {
    const response = await apiClient.get(`/anime/${id}/episodes`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch anime episodes');
  }
};


export const getAnimeRecommendations = async (id) => {
  try {
    const response = await apiClient.get(`/anime/${id}/recommendations`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch recommendations');
  }
};

export const getAnimeVideos = async (id) => {
  try {
    const response = await apiClient.get(`/anime/${id}/videos/episodes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch anime videos');
  }
};

export const getAnimeCharacters = async (id) => {
  try {
    const response = await apiClient.get(`/anime/${id}/characters`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch characters');
  }
};

export const getAnimeReviews = async (id, page = 1) => {
  try {
    const response = await apiClient.get(`/anime/${id}/reviews`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
  }
};

