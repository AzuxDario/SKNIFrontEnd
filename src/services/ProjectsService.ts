import { ProjectModel } from '@/models/ProjectModel';
import { PaginationContainer } from '@/models/PaginationContainer';

export class ProjectsService {
    private axios = require('axios');

    public async getAllProjects(): Promise<ProjectModel[]> {
        return (await this.axios('http://localhost:8000/project/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProject(projectNumber: number): Promise<ProjectModel> {
        return (await this.axios('http://localhost:8000/project/' + projectNumber, {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getProjectsByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<ProjectModel>> {
        const data = (await this.axios('http://localhost:8000/project/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ProjectModel>;
        return data;
    }

}
