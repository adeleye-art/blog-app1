/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  Grid,
  Input,
  Button,
  createListCollection,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import BlogPost from "./ui/Blog";
import { InputGroup } from "./ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo, useRef, useEffect } from "react";
import { convertDate } from "./lib/helper";
import { motion, AnimatePresence } from "framer-motion";

type Blog = {
    id: number;
    title: string;
    description: string;
    cover_image: string;
    published_at: string;
    reading_time_minutes: string;
    tag_list: string[];
  };

type TagType = {
  value: string;
  label: string;
};

const fetchBlogs = async (page: number): Promise<Blog[]> => {
  const { data } = await axios.get<Blog[]>(`https://dev.to/api/articles?page=${page}`);
  return data;
};

const BlogPostSection = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  // Fetch blogs using TanStack Query
  const {
    data: currentBlogs,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => fetchBlogs(page),
    staleTime: 5000,
  });

  // Update allBlogs when new data is fetched
  useEffect(() => {
    if (currentBlogs) {
      setAllBlogs(prevBlogs => {
        const uniqueBlogs = [...prevBlogs];
        currentBlogs.forEach(newBlog => {
          if (!uniqueBlogs.some(blog => blog.id === newBlog.id)) {
            uniqueBlogs.push(newBlog);
          }
        });
        return uniqueBlogs;
      });
    }
  }, [currentBlogs]);

  // Extract unique tags from all blogs
  const uniqueTags = useMemo(() => {
    const allTags = allBlogs.flatMap((blog) => blog.tag_list);
    return [...new Set(allTags)];
  }, [allBlogs]);

  // Create async collection for tags
  const tagsCollection = useMemo(() => {
    return createListCollection({
      items: uniqueTags.map((tag) => ({ label: tag, value: tag })),
      itemToString: (item) => item.label,
      itemToValue: (item) => item.value,
    });
  }, [uniqueTags]);

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag =
        !selectedTag ||
        !selectedTag.value ||
        blog.tag_list.includes(selectedTag.value);

      return matchesSearch && matchesTag;
    });
  }, [allBlogs, searchTerm, selectedTag]);

  const loadMore = () => {
    if (loadMoreButtonRef.current) {
      loadMoreButtonRef.current.blur();
    }
    setPage((prev) => prev + 1);
  };

  const handleTagChange = (value: any) => {
    setSelectedTag(value ? { value: value.value[0], label: value.value[0] } : null);
  };

  if (isLoading && page === 1) {
    return (
      <Box textAlign="center" py={10}>
        <div className="spinner"></div>
        <Text className="" color="colorPalette.600">Loading Blogs...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Failed to load blogs. Please try again.</Text>
      </Box>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <Box maxW="7xl" mx="auto" py={10} px={4}>
      <Text
        color={"#571244"}
        as="h2"
        textAlign="center"
        mb={8}
        fontSize={{ base: "xl", md: "3xl" }}
        fontWeight={"600px"}
      >
        Stay Updated with the Latest Trends in Tobams Group
      </Text>

      <HStack gap="10" alignItems="center" justifyContent="space-around" mb={8} width="full">
        <InputGroup width={"50%"} endElement={<LuSearch />}>
          <Input
            px={4}
            placeholder="Search blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            outline={"1px solid #571244"}
          />
        </InputGroup>
        <SelectRoot
          collection={tagsCollection}
          backgroundColor={"#f4f4f4"}
          px={2}
          size="sm"
          width="320px"
          onValueChange={handleTagChange}
        >
          <SelectTrigger clearable>
            <SelectValueText placeholder="All posts" />
          </SelectTrigger>
          <SelectContent>
            {tagsCollection.items.map((tag) => (
              <SelectItem item={tag} key={tag.value}>
                {tag.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </HStack>

      {filteredBlogs.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          <AnimatePresence>
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <BlogPost
                  id={blog.id}
                  title={blog.title}
                  image={blog.cover_image}
                  description={blog.description}
                  date={convertDate(blog.published_at)}
                  readTime={blog.reading_time_minutes}
                  tag={blog.tag_list[0]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Grid>
      ) : (
        <Box textAlign="center" py={10}>
          <Text color="gray.500">No blogs found matching your search or tag.</Text>
        </Box>
      )}

      {filteredBlogs.length > 0 && (
        <Box textAlign="center" mt={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              ref={loadMoreButtonRef}
              colorScheme="#571244"
              variant="outline"
              onClick={loadMore}
              disabled={isFetching}
              outline={"2px solid #571244"}
              color={"#571244"}
              p={4}
            >
              {isFetching ? <span className="spinner"></span> : "Load More"}
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default BlogPostSection;