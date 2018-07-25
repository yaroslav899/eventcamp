import React, { Component } from 'react';
import { globalRecources } from '../../recources';

class SocialShare extends Component {
    render(){
        if (!this.props.data) return <div>{globalRecources.loading}</div>;
        let data = this.props.data;

        return (
            <div className="socialShare">
                <div className="addthis_inline_share_toolbox"></div>
                <div className="clear"></div>
            </div>
        )
    }
}

export default SocialShare;