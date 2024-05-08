# language: pt 

Funcionalidade: Cadastro de usuário 

Cenário: Cadastro de usuário com sucesso
    Dado que acessei a página de cadastro 
    Quando informar um novo nome
    E informar um novo e-mail
    E salvar a operação
    Então o usuário será salvo com sucesso

Cenário: Não deve ser possível cadastrar um usuário com os campos em branco 
    Dado que acessei a página de cadastro 
    Quando não informar nenhum dado
    E completar a operação
    Então o usuário não será salvo com sucesso 

Cenário: Não deve ser possível cadastrar um usuário preenchendo apenas o campo nome 
    Dado que acessei a página de cadastro 
    Quando informar um novo nome
    E completar a operação
    Então não consigo fazer meu cadastro e o sistema apresenta a mensagem 'O campo e-mail é obrigatório'

Cenário: Não deve ser possível cadastrar um usuário preenchendo apenas o e-mail 
    Dado que acessei a página de cadastro 
    Quando informar um novo e-mail
    E completar a operação
    Então não consigo fazer meu cadastro e o sistema apresenta a mensagem 'O campo nome é obrigatório'

Esquema do Cenário: Não deve ser possível cadastrar um usuário utilizando um nome inválido
    Dado que acessei a página de cadastro 
    Quando informar um nome "<nome>"
    E informar um novo e-mail
    E completar a operação
    Então o usuário não será salvo com sucesso e o sistema apresenta a mensagem 'Formato do nome é inválido'
    Exemplos:
    | nome     | 
    | 2222     | 
    | Maria22  |
    | ________ |

Esquema do Cenário: Não deve ser possível cadastrar um usuário utilizando um e-mail inválido
    Dado que acessei a página de cadastro 
    Quando informar um novo nome
    E informar um e-mail "<email>"
    E completar a operação
    Então o usuário não será salvo com sucesso e o sistema apresenta a seguinte mensagem: 'Formato de e-mail inválido'
    Exemplos:
    | email             | 
    | maria             |
    | maria@            |
    | .com              |
    | @.com             |

Cenário: Não deve ser possível cadastrar um nome com menos de 4 caracteres
    Dado que acessei a página de cadastro 
    Quando informar um nome com menos de 4 caracteres 
    E informar um novo e-mail
    E completar a operação
    Então não deve ser possível cadastrar o usuário e sistema retorna a mensagem "Informe pelo menos 4 letras para o nome."

Cenário: Não deve ser possível cadastrar um nome com mais de 100 caracteres
    Dado que acessei a página de cadastro 
    Quando informar um nome com mais de 100 caracteres 
    E informar um novo e-mail
    E completar a operação
    Então não deve ser possível extrapolar a quantidade de 100 caracteres no nome de usuário 

Cenário: Não deve ser possível cadastrar um e-mail com mais de 60 caracteres
    Dado que acessei a página de cadastro 
    Quando informar um novo nome 
    E informar um novo e-mail com mais de 60 caracteres
    E completar a operação
    Então não deve ser possível extrapolar a quantidade de 60 caracteres no e-mail do usuário 

Cenário: Não deve ser possível cadastrar um usuário com e-mail já utilizado no cadastro de outro usuário
    Dado que acessei a página de cadastro 
    E que existe um usuário cadastrado 
    Quando informar um novo nome
    E informar um e-mail já cadastrado
    E completar a operação
    Então não deve ser possível criar o usuário e o sistema devolverá a mensagem "Este e-mail já é utilizado por outro usuário."
