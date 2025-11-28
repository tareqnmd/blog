import { Routes } from '@/enum/routes.enum';
import { MdAdd, MdArticle, MdCategory, MdCheckCircle, MdEdit, MdList } from 'react-icons/md';
import QuickActionCard from './QuickActionCard';
import StatCard from './StatCard';

const AdminDashboard = () => {
  return (
    <div>
      <div className="rounded-2xl bg-card-background border border-border shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted">Welcome back! Here&apos;s an overview of your blog.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          label="Total Posts"
          value={0}
          icon={<MdArticle className="w-6 h-6" />}
          iconWrapperClassName="rounded-full p-3 bg-blue-100 text-blue-700 dark:bg-blue-500 dark:text-white"
        />
        <StatCard
          label="Published"
          value={0}
          icon={<MdCheckCircle className="w-6 h-6" />}
          iconWrapperClassName="rounded-full p-3 bg-green-100 text-green-700 dark:bg-green-500 dark:text-white"
        />
        <StatCard
          label="Drafts"
          value={0}
          icon={<MdEdit className="w-6 h-6" />}
          iconWrapperClassName="rounded-full p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-400 dark:text-black"
        />
        <StatCard
          label="Categories"
          value={0}
          icon={<MdCategory className="w-6 h-6" />}
          iconWrapperClassName="rounded-full p-3 bg-purple-100 text-purple-700 dark:bg-purple-500 dark:text-white"
        />
      </div>

      <section className="mt-2">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            href={Routes.ADMIN_BLOGS}
            title="Create Blog"
            description="Write a new blog post"
            icon={<MdAdd className="w-8 h-8 group-hover:text-white transition-colors" />}
            iconWrapperClassName="rounded-full p-4 bg-blue-100 text-blue-700 dark:bg-blue-500 dark:text-white group-hover:bg-blue-600 transition-colors"
          />
          <QuickActionCard
            href={Routes.ADMIN_BLOGS}
            title="All Blogs"
            description="View and manage posts"
            icon={<MdList className="w-8 h-8 group-hover:text-white transition-colors" />}
            iconWrapperClassName="rounded-full p-4 bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white group-hover:bg-gray-700 transition-colors"
          />
          <QuickActionCard
            href={Routes.ADMIN_CATEGORIES}
            title="Categories"
            description="Manage blog categories"
            icon={<MdCategory className="w-8 h-8 group-hover:text-white transition-colors" />}
            iconWrapperClassName="rounded-full p-4 bg-purple-100 text-purple-700 dark:bg-purple-500 dark:text-white group-hover:bg-purple-600 transition-colors"
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
