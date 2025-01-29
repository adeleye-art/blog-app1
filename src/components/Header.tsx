"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  HStack,
  IconButton,
  Link,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HiOutlineMenu, HiOutlineX, HiOutlineUserCircle } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderVisible(scrollPosition < 50 || !isMobile); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <Box>
      {/* Full Header */}
      <Box
        bg="white"
        boxShadow="md"
        px={4}
        position="sticky"
        top={0}
        zIndex={1000}
        transition="transform 0.3s ease-in-out"
        transform={isHeaderVisible ? "translateY(0)" : "translateY(-100%)"}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack gap={4} alignItems="center">
            <Image src="/logo.svg" alt="Tobams Group Logo" />
          </HStack>

          <HStack gap={4} display={{ base: "none", md: "flex" }}>
            <Button
              bgColor={"#571244"}
              p={4}
              color="white"
              variant="outline"
              colorScheme="purple"
            >
              <HiOutlineUserCircle />
              Account
              <BiChevronDown />
            </Button>
            <Button bgColor={"#EF4353"} p={4} color="white" colorScheme="red">
              Take Assessment
            </Button>
          </HStack>

          <IconButton
            size="md"
            aria-label="Toggle Menu"
            display={{ md: "none" }}
            onClick={toggleMenu}
          >
            <Box as={isOpen ? HiOutlineX : HiOutlineMenu} boxSize={6} />
          </IconButton>
        </Flex>
        <hr />
        <Flex h={16} alignItems="center" justifyContent="center">
          <HStack as="nav" gap={6} display={{ base: "none", md: "flex" }}>
            <Link className="header-link" href="#about">
              About <BiChevronDown />
            </Link>
            <Link className="header-link" href="#what-we-do">
              What We Do <BiChevronDown />
            </Link>
            <Link className="header-link" href="#jobs">
              Jobs <BiChevronDown />
            </Link>
            <Link className="header-link" href="#projects">
              Projects
            </Link>
            <Link className="header-link" href="#academy">
              TG Academy
            </Link>
            <Link className="header-link" href="#strategic-partnership">
              Strategic Partnership
            </Link>
            <Link className="header-link" href="#pricing">
              Pricing
            </Link>
            <Link className="header-link" href="#book-consultation">
              Book a Consultation
            </Link>
          </HStack>
        </Flex>
      </Box>

      {/* Sticky Hamburger Icon */}
      {isMobile && !isHeaderVisible && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bg="white"
          boxShadow="md"
          borderRadius="full"
          p={2}
          zIndex={1100}
        >
          <IconButton
            size="lg"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          > 
            <Box as={isOpen ? HiOutlineX : HiOutlineMenu} boxSize={6} />
          </IconButton>
        </Box>
      )}

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "white",
              zIndex: 1200,
              overflowY: "auto",
            }}
          >
            {/* Close Button Inside Menu */}
            <Flex justifyContent="flex-end" p={4}>
              <IconButton
                size="lg"
                aria-label="Close Menu"
                onClick={toggleMenu}
              > 
                <Box as={HiOutlineX} boxSize={6} />
              </IconButton>
            </Flex>
            <Box pb={4} display={{ md: "none" }}>
              <HStack as="nav" gap={4} flexDirection="column" alignItems="start" px={4}>
                <Link href="#about">About</Link>
                <Link href="#what-we-do">What We Do</Link>
                <Link href="#jobs">Jobs</Link>
                <Link href="#projects">Projects</Link>
                <Link href="#academy">TG Academy</Link>
                <Link href="#strategic-partnership">Strategic Partnership</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#book-consultation">Book a Consultation</Link>
                <Box gapX={10} width={"100%"} justifyContent={"space-between"} display={"flex"}>
                <Button bgColor={"#571244"}
              p={4}
              color="white"
              variant="outline"
              colorScheme="purple">
                  <HiOutlineUserCircle />
                  Account
                </Button>
                <Button bgColor={"#EF4353"} p={4} color="white" colorScheme="red">Take Assessment</Button>
                </Box>
                
              </HStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Header;
