import * as path from 'path';
import * as fs from 'fs';
import { PostInfo, BlogStorageErrorType } from './blog-storage';
import * as Config from './config';
import * as FileUtils from './file-utils';
var leftPad = require('left-pad');

export type PostInfo = { id: string; date: string; title: string };

export type Post = PostInfo & { content: string };
export type PostCreationData = Post & { id: undefined };

export type BlogStorageErrorType = 'NOT_FOUND';

export class BlogStorageError extends Error {
  constructor(public type: BlogStorageErrorType, message?: string) {
    super(message);
  }
}

export class FileBasedBlogStorage {
  createPost() {}

  public getOverview(): Promise<PostInfo[]> {
    return this.loadListFromFile();
  }

  public async findAll(): Promise<Post[]> {
    const list = await this.loadListFromFile();
    const promises = list.map(p => this.addContentTo(p));
    return Promise.all(promises);
  }

  public async findById(id: string) {
    const list = await this.loadListFromFile();
    const post = list.find(p => p.id === id);
    if (!post) throw new BlogStorageError('NOT_FOUND');
    return this.addContentTo(post);
  }

  public async create(data: PostCreationData) {
    const list = await this.loadListFromFile();
    const id = this.generateId(list);
    list.unshift({ id, title: data.title, date: data.date });
    await Promise.all([
      this.writeListToFile(list),
      this.writePostContentToFile(id, data.content)
    ]);
    return id;
  }

  public async update(post: Post) {
    const list = await this.loadListFromFile();

    const existing = list.find(p => p.id === post.id);
    if (!existing) throw new BlogStorageError('NOT_FOUND');
    Object.assign(existing, { date: post.date, title: post.title });

    await Promise.all([
      this.writeListToFile(list),
      this.writePostContentToFile(post.id, post.content)
    ]);
    return post;
  }

  public async delete(id: string) {
    const list = await this.loadListFromFile();

    // only updating list, not really deleting markdown file
    const updatedList = list.filter(item => {
      return item.id !== id;
    });
    if (list.length === updatedList.length) {
      throw new BlogStorageError('NOT_FOUND');
    }
    this.writeListToFile(updatedList);
  }

  private generateId(list): string {
    var id = Math.max(...list.map(item => Number.parseInt(item.id))) + 1;
    return leftPad(id, 3, 0);
  }

  private async addContentTo(info: PostInfo): Promise<Post> {
    const content = await this.loadPostContentFromFile(info.id);
    return { ...info, content };
  }

  private loadListFromFile(): Promise<PostInfo[]> {
    return Config.load()
      .then(config => path.resolve(config.posts, 'list.json'))
      .then(filePath => FileUtils.readFile(filePath))
      .then(content => JSON.parse(content).posts);
  }

  private async writeListToFile(list: PostInfo[]) {
    const config = await Config.load();
    var listFile = path.resolve(config.posts, 'list.json');
    const content = JSON.stringify({ posts: list }, null, 2);
    await FileUtils.writeFile(listFile, content);
  }

  private loadPostContentFromFile(id): Promise<string> {
    return Config.load()
      .then(config => path.resolve(config.posts, `${id}.md`))
      .then(filePath => FileUtils.readFile(filePath));
  }

  private async writePostContentToFile(id: string, content: string) {
    const config = await Config.load();
    var contentFile = path.resolve(config.posts, `${id}.md`);
    await FileUtils.writeFile(contentFile, content);
  }
}
