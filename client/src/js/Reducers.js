import { login, loginPageLocale } from "./login/LoginReducers";
import { combineReducers } from "redux";
import { mainHeaderStrings } from "./main/reducers/MainReducer";
import { changePassword, changePasswordStrings, userProfileStrings } from "./user/UserProfileReducer";
import { currentHeaderTab } from "./header/HeaderReducer";
import { addUrlMessage } from "./config/reducers/AddUrlReducer";
import { fetchedFeeds,
    newsBoardCurrentSourceTab,
    selectedArticle,
    fetchingWebArticle,
    fetchingFeeds
} from "./newsboard/reducers/DisplayFeedReducers";
import { configuredSources,
    currentSourceTab,
    sourceResults,
    searchInConfiguredSources,
    deleteSourceStatus
} from "./sourceConfig/reducers/SourceConfigurationReducers";
import { sourcesAuthenticationInfo } from "./config/reducers/SourcesAuthenticationInfo";
import { webArticleMarkup } from "./newsboard/reducers/DisplayArticleReducers";
import { addArticleToCollection } from "./newsboard/reducers/DisplayArticleReducers";
import { stories, untitledIndex } from "./storyboard/reducers/StoryBoardReducer";
import { displayCollection, currentCollection } from "./newsboard/reducers/DisplayCollectionReducer";
import { currentFilter, currentFilterSource } from "./newsboard/filter/FilterReducer";

const contentDiscoveryApp = combineReducers({
    login,
    loginPageLocale,
    mainHeaderStrings,
    changePassword,
    changePasswordStrings,
    configuredSources,
    fetchedFeeds,
    addUrlMessage,
    sourceResults,
    searchInConfiguredSources,
    currentSourceTab,
    currentHeaderTab,
    sourcesAuthenticationInfo,
    newsBoardCurrentSourceTab,
    selectedArticle,
    fetchingWebArticle,
    webArticleMarkup,
    addArticleToCollection,
    displayCollection,
    currentCollection,
    stories,
    currentFilter,
    currentFilterSource,
    untitledIndex,
    fetchingFeeds,
    deleteSourceStatus,
    userProfileStrings
});

export default contentDiscoveryApp;
