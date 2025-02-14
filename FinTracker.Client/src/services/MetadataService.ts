import BaseService from './baseService';

class MetadataService extends BaseService {

    constructor() {
        super()
    }

    // there's a better way to do this...

    private availableYears: number[] | undefined

    async getAvailableYears(): Promise<number[]> {

        if (!this.availableYears) 
            this.availableYears = await this.get<number[]>('/Metadata/AvailableYears')

        return this.availableYears
    }

    forgetYears(): void {
        this.availableYears = undefined;
    }
}

export default new MetadataService();