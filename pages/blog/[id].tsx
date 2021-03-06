import { client } from "../../libs/client";
import Head from "next/head";
import Header from "../../components/Header";

const BlogId = ({ blog }) => {
  console.log(blog);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-5">
        <div className="border-1 rounded-xl shadow-lg">
          <img src={blog.image.url} alt="" />
        </div>
        <h1 className="mt-3 text-xl">{blog.title}</h1>
        <div className="flex">
          {blog.category.map((tag: string) => (
            <div key={tag}>
              <p className="p-1 border-2 border-red-300 rounded-lg m-1 text-xs">
                {tag}
              </p>
            </div>
          ))}
        </div>
        <p className="m-1 text-xs">{blog.publishedAt}</p>
        <div
          className="mt-10 text-sm"
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
      </main>
    </div>
  );
};
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
export default BlogId;
