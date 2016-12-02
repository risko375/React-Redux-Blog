import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    
    // Gives access to router to allow redirect on delete post
    static contextTypes = {
    
        router: PropTypes.object
    };
    
    componentWillMount() {
    
        this.props.fetchPost(this.props.params.id);
    }
    
    onDeleteClick(){
    
        this.props.deletePost(this.props.params.id)
            // after successful delete return user to index page
            .then(() => {this.context.router.push('/'); });
    }

    render(){
        
        const {post} = this.props;
        
        // Loading shows while network request still working so this.props.post is null
        
        if(!post){
            return <div>Loading...</div>
        
        }
    
        return(
        
        <div>
            <Link to='/'>Back to Index</Link>
            <p></p>
            <button 
                className='btn btn-danger float-xs-right'
                onClick={this.onDeleteClick.bind(this)}>
                Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>Categories: {post.categories}</h6>
            <p>{post.content}</p>
        </div>
            
        );
    }
}

function mapStateToProps(state) {

    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);