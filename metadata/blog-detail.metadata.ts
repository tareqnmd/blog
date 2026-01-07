import { APP_CONFIG, BASE_URL } from '@/constant';
import { Routes } from '@/enum';
import { IBlog } from '@/modules/blogs/blog.type';
import { blogService } from '@/service/blog.service';
import { Metadata } from 'next';

async function getBlog(slug: string): Promise<IBlog | null> {
  const res = await blogService.getBlogBySlug(slug);
  return res?.data?.[0] ?? null;
}

export async function generateBlogMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const blogUrl = `${BASE_URL}${Routes.BLOGS}/${blog.slug}`;
  const blogTitle = blog.title;
  const blogDescription = blog.metaDescription || `Read "${blog.title}" on ${APP_CONFIG.name}`;
  const blogImage = blog.coverImage || '/images/meta/og-image.png';
  const keywords = blog.metaKeywords || blog.tags || undefined;
  const authorName = blog.author?.name || APP_CONFIG.author;
  const authorUrl = APP_CONFIG.authorUrl;

  return {
    title: blogTitle,
    description: blogDescription,
    keywords: keywords,
    authors: [{ name: authorName, url: authorUrl }],
    alternates: {
      canonical: `${Routes.BLOGS}/${blog.slug}`,
    },
    openGraph: {
      title: blogTitle,
      description: blogDescription,
      url: blogUrl,
      type: 'article',
      publishedTime: blog.publishedAt || blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [authorUrl, authorName],
      images: [
        {
          url: blogImage,
          alt: blogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogTitle,
      description: blogDescription,
      images: [blogImage],
      creator: APP_CONFIG.authorHandle,
    },
  };
}
