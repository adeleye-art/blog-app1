"use client";

import {
  Box,
  Text,
  Flex,
  Link,
  Stack,
  Icon,
  Grid,
  Image,
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#11040E" color="gray.300" py={10} px={6}>
      {/* Footer Top Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
        gap={20}
        maxW="7xl"
        mx="auto"
      >
        {/* About Section */}
        <Box>
          <Image
            src="/logo.svg"
            alt="Tobams Logo"
            width={200}
            height={50}
            mb={10}
          />
          <Text mb={4}>
            Tobams Group is an innovative consultancy reshaping the future of
            tech talent development in Africa, specializing in talent
            acquisition, internships, and skill development with a global
            perspective.
          </Text>
          <Flex gap={3}>
            <Link href="#" aria-label="LinkedIn">
              <Icon as={FaLinkedinIn} boxSize={5} />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Icon as={FaInstagram} boxSize={5} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Icon as={FaTwitter} boxSize={5} />
            </Link>
          </Flex>
        </Box>

        {/* What We Do */}
        <Stack gapY={2}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            What We Do
          </Text>
          <Link href="#">Sustainability Services</Link>
          <Link href="#">Strategy Planning and Implementation</Link>
          <Link href="#">Tech Talent Solutions</Link>
          <Link href="#">Training and Development</Link>
          <Link href="#">IT Consulting Services</Link>
          <Link href="#">Social Impact</Link>
          <Link href="#">Talent Recruitment</Link>
        </Stack>

        {/* Company */}
        <Stack gapY={2}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Company
          </Text>
          <Link href="#">About</Link>
          <Link href="#">Jobs</Link>
          <Link href="#">Projects</Link>
          <Link href="#">Our Founder</Link>
          <Link href="#">Business Model</Link>
          <Link href="#">The Team</Link>
          <Link href="#">Contact Us</Link>
        </Stack>

        {/* Solutions */}
        <Stack gapY={2}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Solution
          </Text>
          <Link href="#">Tobams Group Academy</Link>
          <Link href="#">Help a Tech Talent</Link>
          <Link href="#">Campus Ambassadors Program</Link>
          <Link href="#">Join Our Platform</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Book a Consultation</Link>
          <Link href="#">Join Our Slack Community</Link>
        </Stack>
      </Grid>

      {/* Footer Bottom Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={6}
        maxW="7xl"
        mx="auto"
        alignItems="start"
        mt={20}
        bg={"#1f131c"}
        boxShadow={"md"}
        rounded={"md"}
        p={10}
        mb={10}
      >
        <Box pr={6} borderRight="1px dashed" borderColor="gray.700">
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            borderColor="gray.700"
          >
            Registered Offices
          </Text>
          <Box mb={4}>
            <Text fontWeight="bold" color="#EF4353">
              United Kingdom
            </Text>
            <Text fontSize="sm" color="gray.400">
              07451196 (Registered by Company House)
            </Text>
            <Text fontSize="sm" color="gray.400">
              Vine Cottages, 215 North Street, Romford, Essex, United Kingdom,
              RM1 4QA.
            </Text>
          </Box>
        </Box>

        <Box pr={6} borderRight="1px dashed"   borderColor="gray.700">
        <Text fontWeight="bold" mt={12} color="#EF4353">Nigeria</Text>
          <Text fontSize="sm" color="gray.400">
            RC 1048722 (Registered by the Corporate Affairs Commission)
          </Text>
          <Text fontSize="sm" color="gray.400">
            4, Muaz Close, Angwar-Rimi
          </Text>
        </Box>

        <Box>
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            borderColor="gray.700"
          >
            Contact Information
          </Text>
          <Box>
  <Flex align="center" mt={2}>
    <FaEnvelope color="#EF4353" style={{ marginRight: "8px" }} />
    <Link href="mailto:thetream@tobamsgroup.com" color="#EF4353" fontSize="sm">
      thetream@tobamsgroup.com
    </Link>
  </Flex>

  <Flex align="center" mt={2}>
    <FaPhone color="#EF4353" style={{ marginRight: "8px" }} />
    <Link href="tel:+44786600748" color="#EF4353" fontSize="sm">
      +44786600748
    </Link>
  </Flex>
</Box>
        </Box>
      </Grid>

      <Stack direction={{ base: "column", md: "row" }} justifyContent="space-between " mx="auto"  maxW="7xl"  >
        <Text fontSize="sm" textAlign="center" color="gray.500" >
          Copyright © Tobams Group. 2024. All rights reserved.
        </Text>
        <Flex direction={{ base: "column", md: "row" }} alignItems="center" justifyContent="center" gap={3} color="gray.400" fontSize="sm">
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookies Policy</Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Footer;
