describe('Тестовое задание СТЕК', () => {
  const districtName = `Тест-район ${Date.now()}`;

  beforeEach(() => {
    cy.visit('https://demo.app.stack-it.ru/fl/');
    cy.get('[data-cy="login"]').type('DEMOWEB');
    cy.get('[data-cy="password"]').type('awdrgy');
    cy.get('[data-cy="submit-btn"]').click();
    cy.contains('Адресный фонд').click();
    cy.contains('Адреса проживающих').click();

    cy.on('uncaught:exception', () => {
      return false;
    });
  });

  it('1. Проверка открытия диалогового окна добавления района', () => {
    // Открываем форму
    cy.get('[data-cy="btn-add"]').click();
    cy.contains('Район').click();

    // Проверяем, что диалоговое окно открылось
    cy.get('[role="dialog"]').should('be.visible');
    // Проверяем заголовок окна
    cy.get('[role="dialog"]').within(() => {
      cy.contains('Район (создание)').should('exist');
    });

    // Проверяем наличие обязательных полей  
    cy.get('[data-test-id="Название района"]').should('exist');
    cy.get('[data-test-id="Номер в списке"]').should('exist');

    // Проверяем наличие кнопок сохранения и отмены
    cy.contains('button', 'Внести').should('exist');
    cy.contains('button', 'Отмена').should('exist');
    cy.contains('Отмена').click();
  })

  it('2. Добавление нового района в таблицу', () => {
    //const districtName = `Тест-район ${Date.now()}`;

    // Открываем форму
    cy.get('[data-cy="btn-add"]').click();
    cy.contains('Район').click();

    // Заполняем форму
    cy.get('[data-test-id="Название района"]').type(districtName);

    // Сохраняем
    cy.contains('Внести').click();

    // Проверяем, что запись появилась в таблице
    cy.contains(districtName).should('exist');

  })

  it('3. Редактирование существующего района', () => {
    //const districtName = `Тест-район ${Date.now()}`;

    cy.contains(districtName).parent('td').parent('tr').within(() => {
      // all searches are automatically rooted to the found tr element

      cy.get('td').eq(9).get('button').click()
    })

    // Редактируем форму
    cy.get('[data-test-id="Название района"]').clear();
    cy.get('[data-test-id="Название района"]').type('На удаление');
    cy.get('[data-test-id="Название района"]').type('{enter}');
    // Сохраняем
    //cy.contains('Сохранить').click();

    // Проверяем, что запись появилась в таблице
    cy.contains('На удаление').should('exist');

  })

  it('4. Удаление района', () => {
    //const districtName = `Тест-район ${Date.now()}`;

    cy.contains('На удаление').parent('td').parent('tr').within(() => {
      // all searches are automatically rooted to the found tr element

      cy.get('td').eq(0).get('input').click({ force: true }).should('be.checked');
    })

    cy.get('[data-cy="btn-delete"]').click();
    cy.get('[data-cy="btn-yes"]').click();
    // Проверяем что запись удалилась.
    cy.contains('На удаление').should('not.exist');
  })

  it('5. Проверка, что невозможно создать район не указав Название района', () => {

    // Открываем форму
    cy.get('[data-cy="btn-add"]').click();
    cy.contains('Район').click();


    // Сохраняем
    cy.contains('Внести').click();

    // Проверяем, что запись появилось соощение обшибке
    cy.contains('Поле не может быть пустым').should('exist');

  })

})