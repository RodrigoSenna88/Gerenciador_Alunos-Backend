# Recuperação de senha

**RF (Requisítos funcionais)**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisítos não-funcionais)**

- Utilizar Mailtrap para testar envios em desenvolvimento;
- Utilizar o Amazon SES para envio em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regra de Negócio)**

- O link enviado por e-mail para resetar a senha deve expirar em 2h;
- O usuário precisa confirmar a senha nova após resetar a antiga;

# Atualização do perfil

**RF**

-O usuário deve poder atualizar seu perfil (nome, email senha);

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do gestor

**RF**

- O usuário deve poder listar os alunos matriculados (por turno);
- O usuário deve poder visualizar os dados de cada aluno por mês( verificando o mês que foi pago ou não);

**RNF**

- A listagem de alunos deve ser armazenada em cache;

**RN**

- O usuário poderá alterar o status de não-pago para pago referente a meses anteriores;
- O usuário deve poder alterar os dados cadastrais dos alunos;
- Sempre que o usuário alterar um dado cadastral de aluno deverá confirmar a alteração do dado;
