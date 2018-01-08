import React from 'react'

export default class Search extends React.Component {

  constructor() {
    super()

    this.state = {
      results: [],
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let newState = {}
    if (nextProps.results) {
      newState.results = nextProps.results
    }
    if (nextProps.loading !== undefined && nextProps.loading !== null) {
      newState.loading = nextProps.loading
    }
    this.setState(newState)
  }

  render() {
    let results = this.state.results.map(hotel => {
      let pictureStyle = {
        width: '100%',
        height: '220px',
        backgroundImage: `url(${hotel.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }
      return (
        <div className="search-result shadow-b px-2 px-lg-0 mb-3 row mx-0 py-3 bg-white" key={hotel.id}>
          <div className="hotel-picture px-1 px-lg-3 mb-3 mb-lg-0 col-12 col-lg-4 col-xl-3">
            <div style={pictureStyle}></div>
          </div>
          <div className="hotel-details pb-4 pb-lg-0 col-12 col-lg-5 col-xl-6">
            <h5 className="hotel-name mb-1 text-primary font-weight-bold">{ hotel.name }</h5>
            <div className="hotel-rating">
              { Array(hotel.stars).fill(1).map((n, index) => {
                return <img className="mb-2" src="/icons/filters/star.svg" alt="" height="20px" key={ hotel.id + "-s" + (index + 1) } />
              }) }
            </div>
            <div className="hotel-amenities">
              { hotel.amenities.map(amenity => {
                return <img className="mt-1 mr-2" src={`/icons/amenities/${ amenity.name }.svg`} alt="" height="22px" key={ hotel.id + "-a" + amenity.id } />
              }) }
            </div>
          </div>
          <div className="hotel-pricing pt-4 pb-5 pb-lg-0 pt-lg-0 text-center col-12 col-lg-3 col-xl-3 d-flex flex-column justify-content-center">
            <p className="mb-0 headline">Precio por noche habitación</p>
            <p className="price font-weight-bold">
              <span className="currency font-weight-normal">ARS</span>
              { hotel.price }
            </p>
            <a href="#" className="btn mx-3 mx-lg-2 mx-xl-3 bg-primary-color btn-primary">Ver hotel</a>
          </div>
        </div>
      )
    })
    if (this.state.loading) {
      results.push(
        <div className="search-result shadow-b px-2 px-lg-0 mb-3 mx-0 py-3 bg-white" key="loading">
          <h1 className="text-center">Cargando...</h1>
        </div>
      )
    }
    return (
      results
    )
  }
}
