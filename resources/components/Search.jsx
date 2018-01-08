import React from 'react'
import Axios from 'axios'

import FilterWidget from './FilterWidget.jsx'
import SearchResults from './SearchResults.jsx'

const HOTEL_API_URL = "http://127.0.0.1:3000/api/hotels"
const SEARCH_LIMIT = 5

export default class Search extends React.Component {

  constructor() {
    super()

    this.state = {
      totalResults: 0,
      resultCount: 0,
      searchResults: [],
      searchQuery: {
        query: "",
        stars: ""
      },
      loading: false
    }
  }

  componentDidMount() {
    this._fetchHotels()
    window.addEventListener('scroll', this._handleScroll.bind(this))
  }

  _handleScroll() {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight) {
      if (this.state.loading === false && (this.state.totalResults != 0 && this.state.totalResults != this.state.resultCount)) {
        this._fetchNextPage()
      }
   }
  }

  _fetchHotels(query, stars) {
    this.setState({ loading: true })
    this._sendSearchRequest({ query, stars })
      .then(response => {
        let data = response.data
        this.setState({
          totalResults: data.total,
          resultCount: data.count,
          searchResults: data.hotels,
          searchQuery: {
            query: (query? query:''),
            stars: (stars? stars:'')
          },
          loading: false
        })
      })
  }

  _fetchNextPage() {
    this.setState({ loading: true })
    this._sendSearchRequest()
      .then(response => {
        let data = response.data
        console.log(data.total)
        this.setState({
          totalResults: data.total,
          resultCount: this.state.resultCount + data.count,
          searchResults: this.state.searchResults.concat(data.hotels),
          loading: false
        })
      })
  }

  _sendSearchRequest(params) {
    // query=foo&stars=1,2,3&limit=10&offset=0
    let searchParams = ""

    if (!params) {
      searchParams += (this.state.searchQuery.query != "")? `query=${this.state.searchQuery.query}`:''
      searchParams += (this.state.searchQuery.stars != "")? `${ (searchParams != "")? "&":"" }stars=${this.state.searchQuery.stars}`:''
    } else {
      searchParams += (params.query && params.query != "")? `query=${params.query}`:''
      searchParams += (params.stars && params.stars != "")? `${ (searchParams != "")? "&":"" }stars=${params.stars}`:''
    }

    let count = (params)? 0:this.state.resultCount

    searchParams += `${ (searchParams != "")? "&":"" }limit=${SEARCH_LIMIT}`
    searchParams += `${ (searchParams != "")? "&":"" }offset=${count}`


    let requestUrl = HOTEL_API_URL + `?${searchParams}`

    return Axios.get(requestUrl)
  }

  render() {
    return(
      <div className="container-fluid pt-lg-5">
        <div className="row">

          <div className="col-12 col-lg-4 col-xl-3 px-0 px-lg-4">
            <FilterWidget loading={this.state.loading} onSubmitSearch={this._fetchHotels.bind(this)}  ></FilterWidget>
          </div>

          <div className="col-12 col-lg-8 col-xl-9">
              <SearchResults loading={this.state.loading} results={this.state.searchResults}></SearchResults>
          </div>

        </div>
      </div>
    )
  }

}
