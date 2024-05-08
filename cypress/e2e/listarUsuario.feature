# language: pt 

Funcionalidade: Listar usuários

Cenário: Listagem de usuários com sucesso
    Dado que existe usuário cadastrado na base de dados 
    Quando acessar a página inicial 
    Então deverá existir uma lista de usuários 

Cenário: O sistema deve apresentar a opção de criação de usuário, caso a base de dados esteja vazia
    Dado que acessei a página inicial 
    Quando não existir nenhum usuário cadastrado na base de dados 
    Então o sistema deverá apresentar a opção para cadastrar um novo usuário

Cenário: O sistema deve apresentar a opção "Próxima" caso existam mais de 6 usuários cadastrados na base de dados
    Dado que acessei a página inicial 
    Quando existir mais de 6 usuários cadastrados no sistema 
    Então o sistema deverá habilitar a opção "Próxima"

Cenário: Não deve ser possível avançar para a próxima página se não existirem usuários a serem exibidos nela 
    Dado que acessei a página inicial 
    Quando não existir mais de 6 usuários cadastrados na base de dados 
    Então o sistema não deverá habilitar a opção "Próxima"

Cenário: Deve ser possível voltar na página anterior da lista de usuários 
    Dado que acessei a página inicial 
    Quando existir mais de uma página de usuários cadastrados na base de dados 
    Então o sistema deverá permitir voltar para a página anterior 

Cenário: Deve ser possível avançar entre as páginas da lista de usuários 
    Dado que acessei a página inicial 
    Quando existir mais de uma página de usuários cadastrados na base de dados 
    Então o sistema deverá permitir o avanço entre elas 

Cenário: Devem ser exibidas as opções: detalhes e excluir usuário
    Dado que acessei a página inicial 
    Quando existir uma lista de usuários cadastrada no sistema
    Então o sistema deverá habilitar as opções de detalhes e exclusão dos usuários