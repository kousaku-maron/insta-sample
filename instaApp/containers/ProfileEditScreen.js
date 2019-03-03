import { connect } from 'react-redux'
import ProfileEditScreen from '../components/ProfileEditScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
