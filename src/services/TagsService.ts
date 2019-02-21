import { TagModel } from '@/models/TagModel';

export class TagsService {
    private axios = require('axios');

    public async getAllTags(): Promise<TagModel[]> {
        return (await this.axios('http://localhost:8000/tags/')).data;
    }
}
