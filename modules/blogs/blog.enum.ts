export enum TagField {
  ID = 'id',
  NAME = 'name',
  SLUG = 'slug',
}

export enum BlogField {
  ID = 'id',
  TITLE = 'title',
  COVER_IMAGE = 'coverImage',
  SLUG = 'slug',
  AUTHOR = 'author',
  AUTHOR_ID = 'authorId',
  CONTENT = 'content',
  CATEGORY_ID = 'categoryId',
  CATEGORY = 'category',
  TAGS = 'tags',
  VIEWS = 'views',
  STATUS = 'status',
  IS_FEATURED = 'isFeatured',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PUBLISHED_AT = 'publishedAt',
  META_KEYWORDS = 'metaKeywords',
  META_DESCRIPTION = 'metaDescription',
}

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
