/// <reference types= "cypress" />

const { verify } = require("crypto")
const { CtrCompleter } = require("ng2-completer")

describe('Our first suite', () => {

  // beforeEach('code for every test', () =>{

  // })

  it.skip('How to use cy.get', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // by tag name
    cy.get('input')
    //by ID
    cy.get('#inputEmail')
    // by class name
    cy.get('.input-full-width')
    // by attribute name
    cy.get('[placeholder]')
    // by attribute name and value
    cy.get('[placeholder="Email"]')
    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
    // by tag name and attribute with value
    cy.get('input[placeholder="Email"]')
    // by 2 different attribute
    cy.get('[placeholder="Email"][type="email"]')
    //by tag name, and attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
    // Most recommended way: data-cy
    cy.get('[data-cy="inputEmail1"]')
  })

  it.skip('Contains, find, parents', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in') // only find first match
    cy.contains('[status="warning"]','Sign in')
    cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()

    // cy.find('button') does not work since we need to declare parents
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

  })
  it('them and wrap method test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

    // will not work, it cannot store variable
    // const firstForm = cy.contains('nb-card','Using the Grid')
    // firstForm.find('[for="inputEmail1"]').should('contain','Email')
    // firstForm.find('[for="inputPassword2"]').should('contain','Password')

    cy.contains('nb-card','Using the Grid').then(firstForm =>{
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passWord = firstForm.find('[for="inputPassword2"]').text()
      
      expect(emailLabelFirst).to.be.equal('Email')
      expect(passWord).to.be.equal('Password')
    })
  })

})

// context()