/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import Activity from '../../containers/Activity/Activity'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import * as TripActions from '../../store/actions/tripActions'
import { bindActionCreators } from 'redux'
import TripSearch from './TripSearch'

class Trips extends Component {
  constructor() {
    super()
    this.state = {
      tripFilter: ""
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.actions.GetTrips()
    this.setState({ isLoading: false })
  };

  getDayCountsToStart(trip) {
    const start_date = new Date(trip.start_date)
    const now = new Date()
    const end_date = new Date(trip.end_date)
    const diff = Math.floor(
      (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
        Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate())) /
        (1000 * 60 * 60 * 24)
    )
    if (diff < 0) {
      return `Trip starts in ${Math.abs(diff)} days`
    } else {
      return `Trip finished in ${end_date.toLocaleDateString()}`
    }
  }

  filterTrips = (tripFilter) => {
    this.setState({
      tripFilter
    })

  }

  renderList(trips) {
    const { history, auth } = this.props
    console.log(this.state.filteredTrips)

    const tripFilter = this.state.tripFilter;
    
    if (trips === undefined) {
      return <div />
    }

    return trips.filter((trip) => {
      let tripDestination = trip.destination.toLowerCase() 
      return tripDestination.indexOf(
        tripFilter.toLowerCase()) !== -1
    }).map((trip, index) => {
      return (
        <div key={index}>
          <ListItem
            key={index}
            onClick={() => {
              history.push(`/trips/edit/${trip.id}`)
            }}
            id={index}
          >
            <ListItemText
              primary={trip.destination}
              secondary={this.getDayCountsToStart(trip)}
            />
          </ListItem>
          <Divider inset />
        </div>
      )
    })
  }

  render() {
    const { intl, theme, history, isAuthorised, trips } = this.props

    const { isLoading } = this.state

    if (isLoading) {
      return <div />
    } else {
      return (
        <Activity
          isLoading={isLoading}
          containerStyle={{ overflow: 'hidden' }}
          title={intl.formatMessage({ id: 'trips' })}
          appBarContent={<TripSearch handleSearch = {this.filterTrips} />}
        >
          <Scrollbar>
            <div
              style={{
                overflow: 'none',
                backgroundColor: theme.palette.convasColor
              }}
            >
              <List
                id="test"
                style={{ height: '100%' }}
                ref={field => {
                  this.list = field
                }}
              >
                {this.renderList(trips)}
              </List>
            </div>

            <div
              style={{ position: 'fixed', right: 18, zIndex: 3, bottom: 18 }}
            >
              {isAuthorised && (
                <Button
                  variant="fab"
                  color="secondary"
                  onClick={() => {
                    history.push('/trips/create')
                  }}
                >
                  <Icon className="material-icons">add</Icon>
                </Button>
              )}
            </div>
          </Scrollbar>
        </Activity>
      )
    }
  }
}

Trips.propTypes = {
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
)(injectIntl(withTheme()(withRouter((Trips)))))
