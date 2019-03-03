import { connect } from 'react-redux'
import FeedScreen from '../components/FeedScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
