import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import  Activity  from '../../containers/Activity/Activity'
import { withTheme, withStyles } from '@material-ui/core/styles'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import TripForm from '../../components/Forms/Trip';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withFirebase } from 'firekit-provider'
import { isLoading } from 'firekit'
import { change, submit } from 'redux-form';
import isGranted from 'rmw-shell/lib/utils/auth';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import * as TripActions from '../../store/actions/tripActions'
import { bindActionCreators } from 'redux';


const styles = theme => ({

})



class Trip extends Component {

  validate = (values) => {
    const { intl } = this.props;
    const errors = {}
    errors.destination = !values.destination ? intl.formatMessage({ id: 'error_required_field' }) : '';
    errors.start_date = !values.start_date ? intl.formatMessage({ id: 'error_required_field' }) : '';

    return errors
  }

  handleUpdate = (trip) => {
    this.props.UpdateTrip(trip)
  }

  handleClose = () => {
    const { setDialogIsOpen } = this.props.actions;
    setDialogIsOpen('delete_trip', false);
  }

  handleDelete = () => {
    const { uid, history } = this.props;
    this.props.DeleteTrip(uid, history);
  }

  handleSave = (values) => {
    const { history } = this.props
    if(values.id){
      this.props.UpdateTrip(values);
    }else{
      this.props.CreateTrip(values, history);
    }
    
  }


  render() {

    const {
      history,
      intl,
//      setDialogIsOpen,
      dialogs,
      match,
      isGranted,
      isAuthorised,
      uid,
//      submit,
      handleSubmit,
      isLoading,
      trips
    } = this.props;

    const {submit, setDialogIsOpen} = this.props.actions;

    const testTrip = trips.filter(u => u.id == uid)[0];
    const trip = match.params.uid ? testTrip : {
      destination: "", 
      start_date: "01-01-2019", 
      end_date: "01-01-2019", 
      comment: ""
    }

    return (
      <Activity
        isLoading={isLoading}
        iconStyleRight={{ width: '50%' }}
        appBarContent={
          <div style={{ display: 'flex' }}>
            {((!uid && isAuthorised) || (!!uid && isAuthorised)) &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => submit("trip")}
              >
                <Icon className="material-icons" >save</Icon>
              </IconButton>
            }

            {(isAuthorised) &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => { setDialogIsOpen('delete_trip', true) }}
              >
                <Icon className="material-icons" >delete</Icon>
              </IconButton>
            }
          </ div>
        }

        onBackClick={() => { history.goBack() }}
        title={intl.formatMessage({ id: match.params.uid ? 'edit_trip' : 'create_trip' })}>

        <div style={{ margin: 15, display: 'flex' }}>
          <TripForm  
            onSubmit={this.handleSave}
            initValues = {trip}
          />
        </div>

        <Dialog
          open={dialogs.delete_trip === true}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-comment"
        >
          <DialogTitle id="alert-dialog-title">{intl.formatMessage({ id: 'delete_company_title' })}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-comment">
              {intl.formatMessage({ id: 'delete_company_message' })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" >
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button value={uid} onClick={this.handleDelete} color="secondary" >
              {intl.formatMessage({ id: 'delete' })}
            </Button>
          </DialogActions>
        </Dialog>
      </Activity>
    );
  }
}

Trip.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isGranted: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const { auth, intl, dialogs, submit, tripReducer, trips, form } = state;
  const { match } = ownProps

  const uid = match.params.uid
  const path = `/trips/${auth.uid}/`;
  return {
    intl,
    dialogs,
    uid,
    isGranted: grant => isGranted(state, grant),
    isLoading: isLoading(state, `${path}/${uid}`),
    isAuthorised: auth.isAuthorised,
    auth: state.auth,
    trips,
    submit,
    form
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators( {setDialogIsOpen, change, submit}, dispatch ),
      UpdateTrip: trip => dispatch(TripActions.UpdateTrip(trip)),
      CreateTrip: (trip, history) => dispatch(TripActions.CreateTrip(trip, history)),
      DeleteTrip: (id, history) => dispatch(TripActions.DeleteTrip(id, history))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectIntl(withRouter(withFirebase(withTheme()(withStyles(styles, { withTheme: true })(Trip))))))
