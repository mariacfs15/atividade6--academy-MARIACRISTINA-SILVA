# language: pt 

Funcionalidade: Pesquisa de usuário utilizando o E-mail

Cenário: Pesquisa de usuário com sucesso utilizando e-mail
    Dado que já existe um usuário cadastrado  
    E que acessei a página inicial 
    Quando clicar no campo de pesquisa e informar um e-mail já cadastrado
    Então o usuário será encontrado com sucesso

Cenário: Não deve ser possível encontrar usuário utilizando e-mail não cadastrado 
    Dado que acessei a página inicial 
    Quando clicar no campo de pesquisa e informar um e-mail não cadastrado
    Então o usuário não será encontrado com sucesso

