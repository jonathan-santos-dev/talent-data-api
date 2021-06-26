#Requisitos
 - Nodejs versão 14+
 - Yarn instalado globalmente
 - Váriavél de ambiente JWT_SECRET (uma key em base64 para a chave secreta JWT)
    Para fazer isso basta criar um arquivo .env e colocar `JWT_SECRET={secret em base64}`

# Instruções 

- yarn dev
    Inicia no modo de desenvolvimendo do projeto.

- yarn build
    Faz as compilações do typescript para javascript.

- yarn start 
    Inicia o servidor em modo de produção (é necessário ter compilado o typescript antes).

