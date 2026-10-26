import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(post);

    // Проверяем, что возвращённый пост содержит переданный текст
    expect(createdPost.text).toBe(post.text);

    // Проверяем, что сервис присвоил уникальный id
    expect(createdPost.id).toBeDefined();
    expect(typeof createdPost.id).toBe('string');

    // Проверяем, что дата создания установлена в формате ISO
    expect(createdPost.date).toBeDefined();
    expect(new Date(createdPost.date).toISOString()).toBe(createdPost.date);

    // Дополнительно убеждаемся, что пост действительно сохранился в сервисе
    expect(postsService.find(createdPost.id)).toEqual(createdPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);

    const foundPost = postsService.find(createdPost.id);

    // Проверяем, что find возвращает именно тот пост, который был создан
    expect(foundPost).toEqual(createdPost);
  });
});