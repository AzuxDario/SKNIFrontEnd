import { ProfileModel } from './ProfileModel';
import { SectionModel } from './SectionModel';

export class ProjectModel {
    public id!: number;
    public title!: string;
    public text!: string;
    public creation_date!: Date;
    public publication_date!: Date;
    public repository_link!: string;
    public creator!: ProfileModel;
    public section!: SectionModel;
}
