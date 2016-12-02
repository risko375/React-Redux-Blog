import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

// Form field configuration object
const FIELDS = {

    title: {
    
        type: 'input',
        label: 'Title for Post'
    },
    categories: {
    
        type: 'input',
        label: 'Enter some categories for this post'
    
    },
    content: {
    
        type: 'textarea',
        label: 'Post Contents'
    }

};

class PostsNew extends Component {

    static contextTypes = {
    
        router: PropTypes.object
    };

    onSubmit(props){
        this.props.createPost(props)
            .then(() => {
            // blog post has been created, navigat user to the index
            // We navigate by calling this.context.router.push
            // with the new path to navigate to
            this.context.router.push('/');
        });
    }

    renderField(fieldConfig, field){
    
        const fieldHelper = this.props.fields[field];
        
        return(
            <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} key={fieldConfig.label}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type='text' className='form-control' {...fieldHelper}/>
                <div className="form-control-feedback">
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        
        );
    }
    




    render(){
    
    const { handleSubmit } = this.props;
    
        
    return(
    
       <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        
            <h3>Create A New Post</h3>
            {_.map(FIELDS, this.renderField.bind(this))}
            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link to='/' className='btn btn-danger'>Cancel</Link>
        
        
        </form>
    );

 }
}

function validate(values){

    const errors = {};
    
    _.each(FIELDS, (type,field) => {

        if(!values[field]) {

            errors[field] = `Enter ${field}`;
        }
    })
    
    return errors;

}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({

    form: 'PostNewForm',
    fields: _.keys(FIELDS), 
    validate
}, null, { createPost })(PostsNew);