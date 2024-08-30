# Clone da Netflix

Este é um clone da interface da Netflix, desenvolvido como projeto do curso de desenvolvimento full-stack da +praTi para prática de front-end e integração com APIs. O projeto é alimentado pela [The Movie Database (TMDB)](https://www.themoviedb.org/), que fornece os dados dos filmes e séries exibidos.

## Funcionalidades

- Exibição de listas de filmes e séries populares, tendências, lançamentos e gêneros específicos.
- Busca por filmes e séries.
- Detalhes individuais de cada filme/série, incluindo sinopse, elenco, e avaliação.
- Interface amigável e responsiva.
- Autenticação simples com login pré-definido.

  
<img alt="Screenshot 1" src="https://i.ibb.co/rQDHWBh/Captura-de-tela-2024-08-29-221046.png">
<img alt="Screenshot 1" src="https://i.ibb.co/rdwm0qB/Captura-de-tela-2024-08-29-221159.png">
<img alt="Screenshot 1" src="https://i.ibb.co/pnsbpCx/Captura-de-tela-2024-08-29-221032.png">


## Tecnologias Utilizadas

- **HTML/CSS/JavaScript**: Estrutura e estilização do projeto.
- **React**: Biblioteca JavaScript para construção da interface.
- **TMDB API**: API usada para obter os dados dos filmes e séries.
- **Axios**: Cliente HTTP para fazer as requisições à API.
- **React Router**: Para navegação entre as páginas da aplicação.
- **Styled-components**: Para estilização baseada em componentes.
- **Slick-carousel** e **React-slick**: Para sliders/carrosséis.
- **Swiper**: Outro plugin de carrossel utilizado no projeto.
- **React-icons**: Ícones para a interface.

## Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale as dependências

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com a seguinte chave:

   ```env
   REACT_APP_TMDB_API_KEY=sua_chave_de_api
   ```

   Você pode obter uma chave de API gratuita se cadastrando no [TMDB](https://www.themoviedb.org/).

4. Execute o projeto

   ```bash
   npm run dev
   ```

   O projeto estará disponível em `http://localhost:5000`.


# LOGIN

Use as seguintes credenciais para acessar o projeto:

- E-mail: teste@teste.com
- Senha: 123456

# Dependências

O projeto utiliza as seguintes dependências principais:
```
"axios": "^1.7.2",
"react": "^18.3.1",
"react-dom": "^18.3.1",
"react-icons": "^5.3.0",
"react-router-dom": "^6.26.1",
"react-slick": "^0.30.2",
"slick-carousel": "^1.8.1",
"styled-components": "^6.1.12",
"swiper": "^11.1.11"
```

# Licença
Este projeto é apenas para fins educacionais e não possui uma licença específica. 

Feito com 💻 por Reinan Argolo



