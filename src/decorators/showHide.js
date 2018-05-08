import React from 'react';

export default (OriginalComponent) => class WrappedComponent extends React.Component {
    state = {
        openItemId: null
    };

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleOpenElement={this.toggleOpenElement}/>
    }

    toggleOpenElement = (openArticleId) => ev => {
        this.setState({
            openItemId: openArticleId === this.state.openItemId ? null : openArticleId
        });
    };

}