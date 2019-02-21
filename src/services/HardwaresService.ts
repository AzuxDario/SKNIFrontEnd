import {HardwareModel} from '@/models/HardwareModel';
import { PaginationContainer } from '@/models/PaginationContainer';

export class HardwaresService {
    private axios = require('axios');

    public async getAllHardware(): Promise<HardwareModel[]> {
        return (await this.axios('http://localhost:8000/hardwares/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    public async getHardwareByPage(pageNumber: number, pageSize: number): Promise<PaginationContainer<HardwareModel>> {
        const data = (await this.axios('http://localhost:8000/hardwares/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<HardwareModel>;

        return data;
    }
}

