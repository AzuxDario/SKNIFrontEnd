import { ProfileModel } from './ProfileModel';
/* tslint:disable */
export class UserModel {
    public id!: number;
    public username!: string;
    public email!: string;
    public groups!: number[];
    public profile!: ProfileModel;
    public first_name!: string;
    public last_name!: string;
}