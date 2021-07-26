export interface Article {
  title: string;
  date: string;
  description: string;
  slug: string;
  content: string;
  tags: string[];
  published: boolean;
  icon: string;
}

export default Article;
