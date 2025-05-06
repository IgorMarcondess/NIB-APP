// import axios from 'axios';

// const API_KEY = 'pub_8425361e6016114a525abfaa1e1bb1d8f347c'; 

// export const fetchDentalNews = async () => {
//   try {
//     const response = await axios.get('https://newsdata.io/api/1/news', {
//       params: { //parâmetros para filtro
//         apikey: API_KEY,
//         q: 'odontologia OR dentista OR "saúde bucal"',
//         language: 'pt',
//         country: 'br',
//         category: 'health',
//       },
//     });

//     console.log(response)
//     const noticias = response.data.results.slice(0, 3); //top 3 para slides
//     return noticias

//   } catch (error) {
//     console.error('Erro ao buscar notícias odontológicas:', error);
//     return [];
//   }
// };
