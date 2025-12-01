import Image from 'next/image';

interface BlogCoverImageProps {
  title: string;
  imageUrl?: string;
}

const BlogCoverImage = ({ title, imageUrl }: BlogCoverImageProps) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md">
      <Image
        width={1000}
        height={1000}
        src={imageUrl || '/images/placeholder.jpg'}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BlogCoverImage;
