/// <reference types= "cypress" />

describe('Our first suite', () => {

  // beforeEach('code for every test', () =>{
  // })

  it('How to use cy.get', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // get() usage: https://docs.cypress.io/api/commands/get#docusaurus_skipToContent_fallback 
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

  it('Contains, find, parents', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in') // only find first match
    cy.contains('[status="warning"]','Sign in')
    cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click()

    // X cy.find('button') does not work since we need to declare parents
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

  })
  it('them and wrap method test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Not work, it cannot store variable
    // X const firstForm = cy.contains('nb-card','Using the Grid')
    // X firstForm.find('[for="inputEmail1"]').should('contain','Email')
    // X firstForm.find('[for="inputPassword2"]').should('contain','Password')

    // find is different following 2 usages: Cypress.Chainable vs JQuery
    // <label for="inputEmail1" class="label col-sm-3 col-form-label">Email</label> 
    cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')


    cy.contains('nb-card','Using the Grid').then(firstForm =>{
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passWord = firstForm.find('[for="inputPassword2"]').text()
      
      expect(emailLabelFirst).to.be.equal('Email')
      expect(passWord).to.be.equal('Password')

      cy.contains('nb-card','Basic form').then(secondForm =>{
        const passWordSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        
        expect(passWord).to.be.equal(passWordSecond)
        // wrap usage: https://docs.cypress.io/api/commands/wrap#docusaurus_skipToContent_fallback 
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })

    })
  })

  it('invoke command',() =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

 
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

    cy.get('[for="exampleInputEmail1"]').then(label=>{
      expect(label.text()).to.equal('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text=>{
      expect(text).to.equal('Email address')
    })
    // checkbox
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr','class')
      // .should('contain','check')
      .then(classValue =>{
        expect(classValue).to.contain('check')
      })
  })

  it('assert property',() =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
      // input is JQuery now so cannot use click(), need to use wrap
      // X input.click() 
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop','value').should('contain','Feb 17, 2023')
    })
  })

  it('radio button',() =>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButton =>{
      cy.wrap(radioButton)
        .first()
        .check({force: true}) // use force: true even it can hit the radio button
        .should('be.checked')

      cy.wrap(radioButton)
        .eq(1) // by index 1
        .check({force: true})
      
      cy.wrap(radioButton)
        .eq(0) // same as first()
        .should('not.be.checked')
      
      cy.wrap(radioButton)
        .eq(2)
        .should('be.disabled')
    })
  })

  it.only('radio button',() =>{
    
  })

})

// context()