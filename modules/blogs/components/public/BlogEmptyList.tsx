import EmptyState from '@/components/shared/states/EmptyState';

const BlogEmptyList = () => {
  return (
    <EmptyState
      title="No blogs found"
      description="We couldn't find any blogs matching your criteria."
    />
  );
};

export default BlogEmptyList;
