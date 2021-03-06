/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import isGranted from 'rmw-shell/lib/utils/auth'
import * as TripActions from '../../store/actions/tripActions'
import { bindActionCreators } from 'redux'
import TripList from '../../containers/Trips/TripList'


class AllTrips extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.actions.GetAllTrips()
    this.setState({ isLoading: false })
  };

 
  render() {
    const { trips } = this.props

    const { isLoading } = this.state

    if (isLoading) {
      return <div />
    } else {
      return (
          <TripList trips={trips} admin_list = {true}/>
      )
    }
  }
}

AllTrips.propTypes = {
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { auth, trips, isLoading } = state

  return {
    trips,
    isLoading,
    auth,
    isGranted: grant => isGranted(state, grant),
    isAuthorised: auth.isAuthorised
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(TripActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withTheme()(withRouter((AllTrips)))))
