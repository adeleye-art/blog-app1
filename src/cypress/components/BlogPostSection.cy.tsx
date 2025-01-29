import React from 'react';
import { mount } from 'cypress/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BlogPostSection from '@/components/BlogPost';

// Mock QueryClient
const queryClient = new QueryClient();

// Mock Data
const mockBlogs = [
  {
    id: 1,
    title: 'Sample Blog 1',
    description: 'This is a sample blog.',
    cover_image: '/path/to/image1.jpg',
    published_at: '2025-01-01T00:00:00Z',
    reading_time_minutes: '5',
    tag_list: ['React', 'JavaScript'],
  },
  {
    id: 2,
    title: 'Sample Blog 2',
    description: 'Another sample blog.',
    cover_image: '/path/to/image2.jpg',
    published_at: '2025-01-02T00:00:00Z',
    reading_time_minutes: '8',
    tag_list: ['TypeScript', 'Frontend'],
  },
];

describe('BlogPostSection Component', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://dev.to/api/articles?page=1', {
      statusCode: 200,
      body: mockBlogs,
    });
  });

  it('renders the component and displays blogs', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <BlogPostSection />
      </QueryClientProvider>
    );

    // Check if header is displayed
    cy.contains('Stay Updated with the Latest Trends in Tobams Group').should('be.visible');

    // Verify blogs are rendered
    cy.contains('Sample Blog 1').should('be.visible');
    cy.contains('Sample Blog 2').should('be.visible');
  });

  it('filters blogs based on search input', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <BlogPostSection />
      </QueryClientProvider>
    );

    // Search for a blog
    cy.get('input[placeholder="Search blogs"]').type('Sample Blog 1');
    cy.contains('Sample Blog 1').should('be.visible');
    cy.contains('Sample Blog 2').should('not.exist');
  });

  it('filters blogs by tag', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <BlogPostSection />
      </QueryClientProvider>
    );

    // Select a tag
    cy.contains('All posts').click();
    cy.contains('React').click();

    // Check if blogs are filtered by tag
    cy.contains('Sample Blog 1').should('be.visible');
    cy.contains('Sample Blog 2').should('not.exist');
  });
});
