import PostContent from "../../components/posts/post-detail/post-content";

import { getPostData, getPostsFiles } from "../../lib/posts-util";

function PostDetailPage(props) {
  return <PostContent data={props.postData} />;
}

export function getStaticProps(context) {
  const { slug } = context.params;

  const postData = getPostData(slug);

  return {
    props: {
      postData: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postsFiles = getPostsFiles();

  const slugs = postsFiles.map((file) => file.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
