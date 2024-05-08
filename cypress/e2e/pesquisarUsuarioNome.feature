# language: pt 

Funcionalidade: Pesquisa de usuário utilizando o nome

Cenário: Pesquisa de usuário com sucesso utilizando o nome 
    Dado que existe um usuário cadastrado no sistema
    E que acessei a página inicial 
    Quando clicar no campo de pesquisa e informar nome já cadastrado
    Então o usuário será encontrado com sucesso

Cenário: Não deve ser possível encontrar usuário utilizando nome não cadastrado 
    Dado que acessei a página inicial 
    Quando clicar no campo de pesquisa e informar nome não cadastrado
    Então o usuário não será encontrado com sucesso
