import { connect } from 'react-redux';
import Login from '../components/Login';
import { setUserToken } from '../actions';
import ApiService from '../services/ApiService';

const mapStateToProps = (state, props) => {
    return {
        loggedIn: !!state.user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: ({ url, username, password }) =>
            ApiService.login(url, username, password)
                .then((token) => {
                    dispatch(setUserToken(token))
                    return true;
                }).catch(() => false),
    };
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
