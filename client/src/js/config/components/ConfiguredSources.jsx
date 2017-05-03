import React, { Component } from "react";
import PropTypes from "prop-types";
import R from "ramda"; //eslint-disable-line id-length
import { searchInConfiguredSources, deleteSource } from "../../sourceConfig/actions/SourceConfigurationActions";
import { connect } from "react-redux";
import Input from "./../../utils/components/Input";
import SourceFilters from "./../../newsboard/filter/SourceFilters";
import Locale from "./../../utils/Locale";

class ConfiguredSources extends Component {

    constructor() {
        super();
        this._renderSources = this._renderSources.bind(this);
        this._searchInSources = this._searchInSources.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(searchInConfiguredSources(""));
    }

    _renderSources(sourceType, searchKey) {
        const configuredSourceDOM = source =>
            <li className="source-name" key={source._id}>{source.name}
                <button className="delete-source" title={`Delete ${source.name}`} onClick={(event) => {
                    this.props.dispatch(deleteSource(source._id, sourceType, event));
                }}
                >&times;</button>
            </li>;

        if(searchKey) {
            const key = searchKey.toUpperCase();
            const configuredSources = source => source && source.name && source.name.toUpperCase().match(key);
            return R.pipe(
                R.filter(configuredSources),
                R.map(configuredSourceDOM)
            )(this.props.sources[sourceType]);
        }

        const filterHashtags = source => !source.hashtag;
        return R.map(configuredSourceDOM, R.filter(filterHashtags, this.props.sources[sourceType]));
    }

    _searchInSources() {
        let value = this.refs.configSourcesSearch.ref.input.value;
        this.props.dispatch(searchInConfiguredSources(value));
    }

    render() {
        const configureHeader = Locale.applicationStrings().messages.configurePage.header;
        return (
            <aside className="configured-sources-container">
                <h3 className="heading">{configureHeader.mySources}</h3>
                <SourceFilters searchKeyword={this.props.searchKeyword} currentTab={this.props.currentTab} renderSources={this._renderSources}/>
                <Input ref="configSourcesSearch" className={"input-box"} callback={this._searchInSources}
                    placeholder="search" addonSrc="search"
                />
            </aside>
        );
    }
}

function mapToStore(state) {
    return {
        "sources": state.configuredSources,
        "searchKeyword": state.searchInConfiguredSources,
        "currentTab": state.currentSourceTab
    };
}

ConfiguredSources.propTypes = {
    "sources": PropTypes.object.isRequired,
    "dispatch": PropTypes.func.isRequired,
    "searchKeyword": PropTypes.string,
    "currentTab": PropTypes.string.isRequired
};

export default connect(mapToStore)(ConfiguredSources);
