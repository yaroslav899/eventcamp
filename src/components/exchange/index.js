import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import store from '../../store'
import {request} from '../../api';
import moment from 'moment';

class Exhange extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        return request.getExchangeData().then(posts => {
            var g = 0;
        })
    }

    render(){
        //if (!this.props.posts.length) return <div>Загрузка...</div>;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        asd
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        posts: store.filterState.list,
        categories : store.filterState.categories,
        cities : store.filterState.cities
    }
};

export default connect(mapStateToProps)(Exhange);