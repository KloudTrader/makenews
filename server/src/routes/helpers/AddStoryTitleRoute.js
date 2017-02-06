import Route from "./Route";
import { addStory } from "../../storyBoard/StoryRequestHandler";

export default class AddStoryTitleRoute extends Route {
    constructor(request, response, next) {
        super(request, response, next);
        this.story = this.request.body;
        this.accessToken = this.request.cookies.AuthSession;
    }

    validate() {
        return super.validate(this.story.title);
    }

    async handle() {
        return await addStory(this.story, this.accessToken);
    }
}