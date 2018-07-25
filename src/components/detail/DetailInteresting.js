import React, { Component } from 'react'
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { request } from '../../api';
import { categories, cities, free } from '../../fixtures';
import { getValueFromParams } from '../../helper';
import { imageUrlRecources, detailRecources } from '../../recources';

class DetailInteresting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    componentDidMount(){
        let data = this.props.data;
        return request.getInterestingData(data).then(posts => {
            this.setState({
                posts: posts.filter(post => post.id != data.id)
            });
        });
    }

    render(){
        if (!this.state.posts) return <div></div>;
        const samePosts = this.state.posts.map(samePost => <li key={samePost.id} className='same-post-rightside'>
            <NavLink to={`/${'events'}/${getValueFromParams(cities, samePost.acf.cities, 'name', 'url')}/${getValueFromParams(categories, samePost.categories[0], 'id', 'url')}/${samePost.id}`}>
                <div className="row">
                    <div className="col-12">
                        <img src={samePost.acf.picture || imageUrlRecources.noPhoto } className=""/>
                        <div className="samePost-info-rightside row">
                            <div className="samePost-title col-7" dangerouslySetInnerHTML={{__html: samePost.title.rendered}}></div>
                            <div className="samePost-price col-5">
                                {samePost.acf.price}
                                {samePost.acf.currency ? ' ' + samePost.acf.currency : ''}
                            </div>
                            <div className="samePost-location col-7">
                                {samePost.acf.cities} {samePost.acf.location}
                            </div>
                            <div className="samePost-date col-5">
                                {samePost.acf.dateOf ? moment(samePost.acf.dateOf, "YYYY-MM-DD").format("DD MMM YYYY"):''}
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </li>);
        return (
            <div className="detail-interesting">
                <h4>{detailRecources.maybeInteresting}</h4>
                {samePosts}
            </div>
        )
    }
}

export default DetailInteresting;