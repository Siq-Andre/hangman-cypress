describe('check url access', () => {
    it('check if the basic url is working', () => {
      let arrayLetters = [];
   
      cy.visit('/'); // Substitua pela URL correta, se necessário
   
      // Intercepta o console.log para capturar a palavra
      cy.window().then((win) => {
        // Substitui console.log para capturar as mensagens
        cy.stub(win.console, 'log').callsFake((msg) => {
          // Verifica se a mensagem é um array de letras
          if (Array.isArray(msg) && msg.every(char => typeof char === 'string')) {
            arrayLetters = msg;
          }
        });
      });
   
      // Aguarde um pouco para garantir que a palavra foi capturada
      cy.wait(5000).then(() => {
        // Certifique-se de que a palavra foi capturada
        expect(arrayLetters.length).to.be.greaterThan(0);
   
        // Para cada letra na palavra, encontre o botão correspondente e clique
        arrayLetters.forEach((letra) => {
          cy.get(`[data-test="letter-button-${letra}"]`).click();
        });
      });
    });
  });