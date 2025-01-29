/// <reference types="cypress" />
import React from "react";
import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "@/components/ui/provider";
import BlogPostPage from "@/app/blog/[id]/page";

const queryClient = new QueryClient();

describe("BlogPostPage Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://dev.to/api/articles/:id", {
      fixture: "blogPost.json", 
    }).as("fetchBlogPost");

    cy.intercept("GET", "https://dev.to/api/articles", {
      fixture: "blogs.json", 
    }).as("fetchBlogs");

    mount(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <BlogPostPage />
          </Provider>
      </QueryClientProvider>
    );
  });

  it("renders loading state", () => {
    cy.contains("Loading Blogs...").should("be.visible");
  });

  it("renders blog post details correctly", () => {
    cy.wait("@fetchBlogPost");

    cy.contains("Sample Blog Title").should("be.visible"); 
    cy.contains("Published on").should("be.visible");
    cy.get("[dangerouslySetInnerHTML]").should("exist"); 
  });

  it("renders related articles", () => {
    cy.wait("@fetchBlogs");

    cy.contains("Related Articles").should("be.visible");
    cy.get("[data-testid='related-article']").should("have.length", 3); 
  });

  it("handles API errors gracefully", () => {
    cy.intercept("GET", "https://dev.to/api/articles/:id", { statusCode: 500 }).as("fetchBlogPostError");

    cy.mount(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <BlogPostPage />
          </Provider>
      </QueryClientProvider>
    );

    cy.wait("@fetchBlogPostError");

    cy.contains("Failed to load the blog post. Please try again later.").should("be.visible");
  });
});
