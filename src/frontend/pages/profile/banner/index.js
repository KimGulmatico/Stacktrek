import { connect } from 'react-redux'
import Banner from './Banner'

const mapStateToProps = (state) => {
  const { user } = state.user
  return {
    user,
  }
}

const BannerContainer = connect(mapStateToProps)(Banner)

export default BannerContainer
