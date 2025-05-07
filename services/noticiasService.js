import axios from 'axios';

const API_KEY = 'pub_842533c121cdec079bf947d29212c1ff64f18';

export const fetchDentalNews = async () => {
  try {
    const response = await axios.get('https://newsdata.io/api/1/news', {
      params: { //parâmetros para filtro
        apikey: API_KEY,
        q: 'odontologia OR dentista OR "saúde bucal"',
        language: 'pt',
        country: 'br',
       // category: 'health',
      },
    });

    console.log('Data:', response.data);
    console.log('Results:', response.data.results);
    const noticias = response.data.results.slice(0, 3); //top 3 para slides
    return noticias

  } catch (error) {
    console.error('Erro ao buscar notícias odontológicas:', error);
    return [];
  }
};
