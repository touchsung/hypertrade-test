/// <reference types="cypress" />

describe('Product Management', () => {
  beforeEach(() => {
    // Visit the main page before each test
    cy.visit('/')
  })

  it('should display products list and pagination', () => {
    // Check if main elements are visible
    cy.contains('h1', 'Products').should('be.visible')
    cy.contains('button', 'Add Product').should('be.visible')
    
    // Verify table headers
    cy.get('table thead th').should('have.length', 6)
    cy.contains('th', 'Name').should('be.visible')
    cy.contains('th', 'SKU').should('be.visible')
    cy.contains('th', 'Price').should('be.visible')
    cy.contains('th', 'Stock').should('be.visible')
    cy.contains('th', 'Status').should('be.visible')
    cy.contains('th', 'Actions').should('be.visible')

    // Check pagination
    cy.get('button').contains('Previous').should('be.disabled')
    cy.get('button').contains('Next').should('be.visible')
  })

  it('should create a new product', () => {
    // Click add product button
    cy.contains('button', 'Add Product').click()

    // Fill in the form
    cy.get('input[name="name"]').type('Test Product')
    cy.get('input[name="sku"]').type('TEST-001')
    cy.get('input[name="price"]').type('99.99')
    cy.get('input[name="stock_quantity"]').type('100')
    cy.get('textarea[name="description"]').type('Test product description')
    cy.get('select[name="category"]').select(1) // Select first category
    cy.get('input[name="status"]').check({ force: true })

    // Submit the form
    cy.contains('button', 'Submit').click()

    // Verify the new product appears in the table
    cy.contains('td', 'Test Product').should('be.visible')
    cy.contains('td', 'TEST-001').should('be.visible')
    cy.contains('td', '$99.99').should('be.visible')
  })

  it('should edit an existing product', () => {
    // Click edit button on first product
    cy.get('[data-cy="edit-button"]').first().click()

    // Update the product details
    cy.get('input[name="name"]').clear().type('Updated Product')
    cy.get('input[name="price"]').clear().type('149.99')

    // Save changes
    cy.contains('button', 'Submit').click()

    // Verify the updated product appears in the table
    cy.contains('td', 'Updated Product').should('be.visible')
    cy.contains('td', '$149.99').should('be.visible')
  })

  it('should delete a product', () => {
    // Store the first product name in a variable
    cy.get('tr').eq(1).find('td').eq(0)
      .invoke('text')
      .then((text) => {
        // Only proceed with deletion and verification if we have the text
        assert.isNotEmpty(text);
        
        // Set up confirm handler before clicking delete
        cy.window().then((win) => {
          cy.stub(win, 'confirm').returns(true)
        })

        // Click delete button on first product
        cy.get('[data-cy="delete-button"]').first().click()

        // Wait for the deletion API call to complete and page to reload
        cy.wait(500) // Wait for API call
        cy.reload() // Reload the page to ensure fresh data

        // Verify the product is removed using the stored text
        cy.contains('td', text).should('not.exist')
      });
  })

  it('should create a new category', () => {
    // Open add product modal
    cy.contains('button', 'Add Product').click()

    // Click new category button
    cy.contains('button', 'New').click()

    // Fill in category name
    cy.get('input[name="categoryName"]').type('New Test Category')

    // Submit new category
    cy.contains('button', 'Create').click()

    // Verify new category appears in select
    cy.get('select[name="category"]').should('contain', 'New Test Category')
  })
})
