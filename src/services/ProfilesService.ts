import { ProfileModel } from '@/models/ProfileModel';
import { PaginationContainer } from '@/models/PaginationContainer';

export class ProfilesService {
    private axios = require('axios');

    public async getAllProfiles(): Promise<ProfileModel[]> {
        return (await this.axios('http://localhost:8000/profiles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProfile(profileNumber: number): Promise<ProfileModel> {
        return (await this.axios('http://localhost:8000/profiles/' + profileNumber, {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProfilesByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProfileModel>> {
        const data = (await this.axios('http://localhost:8000/profiles/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProfileModel>;
    
        return data;
    }

}
