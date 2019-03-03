import { connect } from 'react-redux'
import HomeScreen from '../components/HomeScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
