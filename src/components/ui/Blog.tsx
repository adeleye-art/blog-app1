/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Image, Badge, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface BlogPostProps {
    image: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    id : any
    tag: string
  }
const BlogPost : React.FC<BlogPostProps> = ({ image, title, description, date, readTime, id, tag }) => {
  return (
 
    <Box
    
    maxHeight={"420px"}
    minHeight={"420px"}
    height={"420px"}
      maxW="md"
      
      borderWidth="1px"
      
      overflow="hidden"
      position={"relative"}
      id={id}
    >
      <Image
        src={image}
        alt="Post"
        width="100%"
        height="200px"
        objectFit="cover"
      />
      <Badge
        position={"absolute"}
        top={5}
        borderRadius=""
        opacity={0.9}
        px={2}
        bgColor={"gray.300"}
        color={"#571244"}
        colorScheme="purple"
        ml={2}
      >
        {tag}
      </Badge>
      <Box p={6} display={"flex"} flexDirection="column" gap={4} justifyContent={"space-between"}>
        <Text h={"50px"} lineClamp="2" fontWeight="bold" as="h4" lineHeight="tight">
            
          {title}
        </Text>
        <Text h={"70px"} lineClamp="3" color="gray.500">{description}</Text>
        <Flex justifyContent="space-between" alignItems="baseline">
          <Box fontSize={"sm"}>
            {date} | {readTime} mins read
          </Box>
          <Link className="header-link text-sm" href={`/blog/${id}`} aria-label="View Post" >
  View Post
</Link>
        </Flex>
      </Box>
    </Box>
  
  
  );
};

export default BlogPost;
