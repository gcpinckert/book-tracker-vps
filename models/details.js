const axios = require('axios')
const url_base = 'http://openlibrary.org'
const search_path = '/search.json?title='
const search_query_params = '&fields=title,key,author_name,cover_i,first_publish_year,number_of_pages_median&limit=3'

const details = {
  getSearchByTitleResults: async (searchTerm) => {
    const url = `${url_base}${search_path}${encodeURIComponent(searchTerm)}${search_query_params}`
    const response = await axios.get(url)
    if (!response.status === 200) return false
    return response.data.docs
  },

  getDescription: async (book) => {
    const url = `${url_base}${book.key}.json`
    const response = await axios.get(url)
    if (!response.status === 200) return 'No Description Available'
    return response.data.description
  }
}

module.exports = details