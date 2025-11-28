const BlogTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
      {title}
    </h1>
  );
};

export default BlogTitle;
