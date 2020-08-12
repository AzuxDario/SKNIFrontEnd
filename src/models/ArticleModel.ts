import { CreatorModel } from '@/models/CreatorModel';
import { ArticleTagsModel } from '@/models/ArticleTagsModel';
import { GalleryModelImage } from '@/models/GalleryModelImage';
/* tslint:disable */
export class ArticleModel {
    public id!: number;
    public title!: string;
    public alias!: string;
    public text!: string;

    // tslint:disable-next-line:variable-name
    public creation_date!: Date;

    // tslint:disable-next-line:variable-name
    public publication_date!: Date;

    public creator!: CreatorModel;
    public gallery!: GalleryModelImage[];
    public tags!: ArticleTagsModel[];

    // tslint:disable-next-line:variable-name
    public comments_number!: number;

    public readMore!: boolean;
}
