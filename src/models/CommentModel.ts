import { CreatorModel } from '@/models/CreatorModel';
/* tslint:disable */
export class CommentModel {
    public id!: number;
    public text!: string;

    // tslint:disable-next-line:variable-name
    public creation_date!: Date;

    // tslint:disable-next-line:variable-name
    public article_id!: number;

    public user!: CreatorModel;
}
