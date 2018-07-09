import { connect } from 'react-redux';
import { createSurvey } from '../actions';
import Create from '../components/Create';

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: sprintName => {
            dispatch(createSurvey(sprintName))
        }
    }
}

const CreateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);

export default CreateContainer;
