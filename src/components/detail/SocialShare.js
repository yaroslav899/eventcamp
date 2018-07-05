import React from 'react';
import ReactDOM from 'react-dom';

class SocialShare extends React.Component {
    render(){
        if (!this.props.data) return <div>Загрузка...</div>;
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