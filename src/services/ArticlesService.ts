import { ArticleModel } from '@/models/ArticleModel';
import { PaginationContainer } from '@/models/PaginationContainer';

export class ArticlesService {
    private axios = require('axios');
    private readMoreGuard = '---readmore---';

    public async getAllArticles(): Promise<ArticleModel[]> {
        return (await this.axios('http://localhost:8000/articles/', {
            params: {
                format: 'json',
            },
        })).data;
    }

    // tslint:disable-next-line:max-line-length
    public async getArticles(pageNumber: number, pageSize: number, fullText: boolean): Promise<PaginationContainer<ArticleModel>> {
        const data = (await this.axios('http://localhost:8000/articles/', {
            params: {
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ArticleModel>;

        if (!fullText) {
            this.cutTextAfterReadMore(data.results);
        }

        return data;
    }

    // tslint:disable-next-line:max-line-length
    public async getArticlesWithTag(tag: string, pageNumber: number, pageSize: number, fullText: boolean): Promise<PaginationContainer<ArticleModel>> {
        const data = (await this.axios('http://localhost:8000/articles/', {
            params: {
                tagname: tag,
                format: 'json',
                offset: (pageNumber - 1) * pageSize,
                limit: pageSize,
            },
        })).data as PaginationContainer<ArticleModel>;

        if (!fullText) {
            this.cutTextAfterReadMore(data.results);
        }

        return data;
    }

    public async getArticle(id: number): Promise<ArticleModel> {
        const article = (await this.axios('http://localhost:8000/articles/' + id, {
            params: {
                format: 'json',
            },
        })).data as ArticleModel;

        const readMoreIndex = article.text.indexOf(this.readMoreGuard);
        if (readMoreIndex !== -1) {
            article.text = article.text.replace(this.readMoreGuard, '');
        }

        return article;
    }

    public generateAliasForTitle(title: string) {
        if (title === undefined) {
            return '';
        }

        return title.trim().toLowerCase().replace(/ /g, '-');
    }

    private cutTextAfterReadMore(articles: ArticleModel[]) {
        for (const article of articles) {
            const readMoreIndex = article.text.indexOf(this.readMoreGuard);
            if (readMoreIndex !== -1) {
                article.text = article.text.slice(0, readMoreIndex);
                article.readMore = true;
            }
        }
    }
}
