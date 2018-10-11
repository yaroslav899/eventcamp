import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import moment from 'moment';
import store from '../../store';
import { request } from '../../api';

class Profile extends Component {
  componentDidMount() {
    let user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    if (!user) {
      request.getUser().then((data) => {
        user = data[0];
        localStorage.setItem('user', JSON.stringify(data[0]));
      });
    }
    request.getAuthorPosts({ author: user.id }).then(posts => {
      store.dispatch({
        type: 'UPDATE_USER_POSTS',
        listPosts: posts,
      });
    });
    return;
  }

  render() {
    const posts = this.props.posts;
    let userPosts = !posts.length ? '' : posts.map(article => <li key={article.id} className="user-posts">
      <span className="postName" dangerouslySetInnerHTML={{ __html: article.title.rendered }} />
      <br/>
      <span>{article.acf.cities}, {article.acf.location} - {article.acf.dateOf ? moment(article.acf.dateOf, "YYYY-MM-DD").format("Do MMM YYYY") : ''}</span>
    </li>);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Личный кабинет</h1>
          </div>
          <div className="col-6">
            <h3>Фотография пользователя</h3>
          </div>
          <div className="col-6">
            <h3>Персональная информация</h3>
          </div>
          <div className="col-12">
            <Tabs>
              <TabList>
                <Tab>Организатор</Tab>
                <Tab>Участник</Tab>
              </TabList>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    <ul>
                      {userPosts}
                    </ul>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  <div className="col-12">
                    Организатор
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>          
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    posts: store.user.listPosts
  }
};

export default connect(mapStateToProps)(Profile);