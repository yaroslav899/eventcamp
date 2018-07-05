import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {request} from '../../api';

class DetailInteresting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null
        };
    }

    componentDidMount(){
        let data = this.props.data;
        return getInterestingList(data).then(posts => {
            this.setState({
                posts: posts.filter(post => post.id!=data.id)
            });
        });
    }

    render(){
        if (!this.state.posts) return <div></div>;
        console.log(this.state.posts.length)
        const samePosts = this.state.posts.map(samePost => <li key={samePost.id} className='same-post-rightside'>
                <div className="row">
                    <div className="col-12">
                        <img src={samePost.acf.picture || 'http://board.it-mir.net.ua/wp-content/uploads/2018/05/nophoto.jpg'} className=""/>
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
        </li>);
        return (
            <div className="detail-interesting">
                <h4>Может быть интересно</h4>
                {samePosts}
            </div>
        )
    }
}

const getInterestingList = function(data){
    return request.getInterestingData(data);
};


export default DetailInteresting;