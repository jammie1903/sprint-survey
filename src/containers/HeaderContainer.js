import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearUserToken } from '../actions';

const mapStateToProps = (state) => {
    return {
        loggedIn: !!state.user.token,
        user: state.user.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(clearUserToken()),
    };
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
