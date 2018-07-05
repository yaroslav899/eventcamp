import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import store from '../../store';
import moment from 'moment';
import {request} from '../../api';
import {NavLink} from 'react-router-dom';
import {categories, cities, free} from '../../fixtures';

class LastPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (this.props.lastPosts.list) return;
        request.getLastPosts().then(posts => {
            store.dispatch({
                type: 'LAST_POSTS_UPDATE',
                list: posts
            });
        })
    }

    render(){
        if (!this.props.lastPosts.list) return <div></div>;
        const lastPosts = this.props.lastPosts.list.map(post => <li key={post.id} className='last-post-rightside'>
            <NavLink to = {`${'kiev'}/${getParamValue(categories, post.categories[0], 'url')}/${post.id}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="last-post-title"  dangerouslySetInnerHTML={{__html: post.title.rendered}}></div>
                    </div>
                    <div className="col-6">
                        <div className="last-post-location">
                            {post.acf.cities} {post.acf.location}
                        </div>
                        <div className="last-post-date">
                            {post.acf.dateOf ? moment(post.acf.dateOf, "YYYY-MM-DD").format("DD MMM YYYY"):''}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="last-post-price">
                            {free.indexOf(post.acf.price)===-1 ? (post.acf.price + '' + post.acf.currency || '') : 'бесплатно'}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="last-post-tags">{post.acf.tags ?
                            post.acf.tags.split(',').map(tag =>
                                <span className="tagOpt">{tag}</span>
                            ) : ''}</div>
                    </div>

                </div>
            </NavLink>
        </li>);

        return (
            <div className="last-post-list">
                <h4>Последние события</h4>
                <ul>
                    {lastPosts}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        lastPosts: store.lastPosts
    }
};

const getParamValue = function(categories, id, param){
    var currentCategory = categories.filter(function(item){
        return (item.id == id)
    });
    return currentCategory[0][param]
};

export default connect(mapStateToProps)(LastPosts);