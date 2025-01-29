"use client";
import { notFound } from 'next/navigation';
import { Box, Heading, Text, Grid, Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import BlogPost from "@/components/ui/Blog";
import { useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  body_html: string;
  published_at: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
}

const fetchBlogById = async (id: string): Promise<BlogPost> => {
  if (!id) throw new Error("Blog ID is required");
  
  try {
    const { data } = await axios.get(`https://dev.to/api/articles/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Blog post not found");
    }
    throw new Error("Failed to fetch the blog post");
  }
};

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const { data } = await axios.get<Blog[]>("https://dev.to/api/articles");
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

const BlogPostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: blog,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError
  } = useQuery<BlogPost, Error>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id as string),
    enabled: !!id,
    retry: 1,
  });

  const {
    data: blogs = [],
    isLoading: isBlogsLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    initialData: queryClient.getQueryData<Blog[]>(["blogs"]) || [],
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  useEffect(() => {
if (isBlogError) {
    if (blogError?.message === "Blog post not found") {
      notFound();
    } else {
      console.error("Blog fetch error:", blogError);
    }
  }
  }, [isBlogError, blogError, router]);

  if (isBlogLoading || isBlogsLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        gap={4}
      >
        <div className="spinner"></div>
        <Text color="colorPalette.600">Loading Blog...</Text>
      </Box>
    );
  }

  if (!blog) {
    return null;
  }

  const randomBlogs = blogs
    .filter((b) => b.id.toString() !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const sanitizedContent = DOMPurify.sanitize(blog.body_html);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <Box maxWidth="1100px" margin="auto" p={6}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={0}
      >
        <Box mb={8}>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            fontSize="2rem"
            fontWeight="bold"
          >
            {blog.title}
          </Heading>
          <Text color="gray.500">
            Published on {new Date(blog.published_at).toLocaleDateString()}
          </Text>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={1}
      >
        <Box
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          mb={8}
          margin="auto"
          css={{
            "& img": { maxWidth: "100%", height: "auto" },
            "& p": { marginBottom: 4 },
            "& h2, & h3": { marginTop: 6, marginBottom: 4 },
          }}
        />
      </motion.div>

      {randomBlogs.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          custom={2}
        >
          <Box>
            <Heading as="h2" size="xl" mb={6}>
              Related Articles
            </Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
              {randomBlogs.map((relatedBlog) => (
                <BlogPost
                  key={relatedBlog.id}
                  id={relatedBlog.id}
                  title={relatedBlog.title}
                  image={relatedBlog.cover_image}
                  description={relatedBlog.description}
                  date={new Date(relatedBlog.published_at).toLocaleDateString()}
                  readTime={relatedBlog.reading_time_minutes.toString()}
                  tag={relatedBlog.tag_list[0]}
                />
              ))}
            </Grid>
          </Box>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={3}
      >
        <Box textAlign="center" mt={8}>
          <Button
            onClick={() => router.push("/")}
            css={{
              outline: "2px solid #571244",
              color: "#571244",
              padding: 4,
              fontWeight: "bold",
              _hover: {
                backgroundColor: "#571244",
                color: "white",
              },
            }}
          >
            Explore More
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default BlogPostPage;