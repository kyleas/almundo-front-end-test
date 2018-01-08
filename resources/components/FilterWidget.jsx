import React from 'react'

export default class Search extends React.Component {

  constructor() {
    super()

    this.state = {
      searchQuery: "",
      allStars: true,
      stars: [
        false,
        false,
        false,
        false,
        false
      ],
      loading: false,
      hiddenQuery: false,
      hiddenStars: false,
      hiddenFilters: false
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: nextProps.loading })
  }

  _onSubmitForm(e) {
    e.preventDefault()
    let stars = ''
    this.state.stars.forEach((star, index) => {
      if (star) {
        stars += (stars != '')? ',':''
        stars += (index + 1)
      }
    })
    this.props.onSubmitSearch(this.state.searchQuery, stars)
  }

  _setStars(n) {
    let allStars = this.state.allStars
    let stars = this.state.stars
    if (n == -1) {
      allStars = !allStars
      stars.fill(false)
    } else {
      stars[n] = !stars[n]
      allStars = false
    }

    this.setState({
      allStars,
      stars
    })
  }

  _onSearchQueryChange(e) {
    this.setState({ searchQuery: e.target.value })
  }

  _toggleQuery() {
    this.setState({hiddenQuery: !this.state.hiddenQuery})
  }

  _toggleStars() {
    this.setState({hiddenStars: !this.state.hiddenStars})
  }

  _toggleFilters() {
    this.setState({hiddenFilters: !this.state.hiddenFilters})
  }

  render() {
    return (
      <div className="filter-widget shadow-b mb-5">
        <div className="widget-title text-center text-lg-left px-2 px-lg-4 pt-3 pb-2 bg-white text-dark font-weight-bold">
          <h5>
            Filtros
            <a href="#" onClick={this._toggleFilters.bind(this)} className="ml-2 d-lg-none"><i className={`fa ${this.state.hiddenFilters? 'fa-caret-down':'fa-caret-up'}`}></i></a>
          </h5>
        </div>
        <div className={`widget-body ${this.state.hiddenFilters? 'hidden-widget':''}`}>
          <div className="filter-section text-center text-lg-left mt-1 px-2 px-md-3 py-2 px-lg-4 py-md-3 bg-white">
            <div className="section-title font-weight-bold text-primary">
              <img className="mb-1 mr-1" src="/icons/filters/search.svg" alt="" height="18px" />
              Nombre de hotel
              <a href="#" onClick={this._toggleQuery.bind(this)} className="ml-2 ml-lg-0 float-lg-right text-primary"><i className={`fa ${this.state.hiddenQuery? 'fa-caret-down':'fa-caret-up'}`}></i></a>
            </div>
            <div className={`section-content my-2 ${this.state.hiddenQuery? 'hidden-content':''}`}>
              <form onSubmit={this._onSubmitForm.bind(this)}>
                <div className="row form-row">
                  <div className="form-group col-12 col-lg-8">
                    <input className="form-control" type="text" name="search" placeholder="Ingrese el nombre del hotel" value={this.state.searchQuery} onChange={this._onSearchQueryChange.bind(this)}/>
                  </div>
                  <div className="form-group col-12 col-lg-4">
                    <button type="submit" name="button" className="btn btn-primary" disabled={this.state.loading}>Aceptar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="filter-section text-center text-lg-left mt-1 px-2 px-md-3 py-2 px-lg-4 py-md-3 bg-white">
            <div className="section-title font-weight-bold text-primary">
              <img className="mb-1 mr-1" src="/icons/filters/tpstar.svg" alt="" height="18px" />
              Estrellas
              <a href="#" onClick={this._toggleStars.bind(this)} className="ml-2 ml-lg-0 text-primary float-lg-right"><i className={`fa ${this.state.hiddenStars? 'fa-caret-down':'fa-caret-up'}`}></i></a>
            </div>
            <div className={`section-content text-left pl-2 pl-lg-0 my-2 mt-4 ${this.state.hiddenStars? 'hidden-content':''}`}>
              <form>
                <div className="form-check">
                  <input className="form-check-input ml-0" type="checkbox" onChange={this._setStars.bind(this, -1)} checked={ this.state.allStars } id="starCheck" />
                  <label className="form-check-label" htmlFor="starCheck">Todas las estrellas</label>
                </div>
                { Array(5).fill(1).map((n, index) => {
                  return (
                    <div className="form-check" key={ 'star-checkbox-' + (index + 1) }>
                      <input className="form-check-input ml-0" type="checkbox" onChange={this._setStars.bind(this, index)} checked={ this.state.stars[index] } id={"starCheck" + (index + 1)} />
                      <label className="form-check-label" htmlFor={"starCheck" + (index + 1)}>
                        { Array(index + 1).fill(1).map((m, _index) => {
                          return <img className="mb-2" src="/icons/filters/star.svg" alt="" height="20px" key={ 'sc-' + (index + 1) + '-s-' + (_index + 1) } />
                        }) }
                      </label>
                    </div>
                  )
                }) }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
