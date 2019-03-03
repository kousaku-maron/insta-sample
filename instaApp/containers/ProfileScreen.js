import { connect } from 'react-redux'
import userActions from '../actions/user'
import ProfileScreen from '../components/ProfileScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    handleSetUserProperties: (properties) => dispatch(userActions.setUserProperties(properties)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
