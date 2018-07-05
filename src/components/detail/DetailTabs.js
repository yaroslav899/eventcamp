import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GoogleMap from './GoogleMap'

class DetailTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        let data = this.props.data,
            address = data.acf.cities + ',' + data.acf.location;
        return(
            <Tabs>
                <TabList>
                    <Tab>Описание</Tab>
                    <Tab>Как добраться</Tab>
                </TabList>

                <TabPanel>
                    <div className="event_text" dangerouslySetInnerHTML={{__html: data.content.rendered}}></div>
                </TabPanel>
                <TabPanel>
                    <div className="row">
                        <div className="col-7">
                            <GoogleMap address={address}/>
                        </div>
                        <div className="col-5 area-2_address">
                            {data.acf.cities}, {data.acf.location}<br/>

                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        )
    }

}

export default DetailTabs;