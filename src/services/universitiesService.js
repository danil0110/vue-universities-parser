import axios from 'axios';

class UniversitiesService {
  _baseUrl = 'http://universities.hipolabs.com';

  getUniversitiesByCountry = async (country) => {
    const { data } = await axios.get(`${this._baseUrl}/search`, {
      params: { country }
    });

    return data.map(this._transformUniversity);
  };

  // Get rid of data that we don't need
  _transformUniversity = (university) => ({
    alphaTwoCode: university.alpha_two_code,
    country: university.country,
    name: university.name,
    webPage: university.web_pages[0]
  });
}

export default new UniversitiesService();
