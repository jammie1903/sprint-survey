import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = (state, props) => {
    return {
        loggedIn: !!state.user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
