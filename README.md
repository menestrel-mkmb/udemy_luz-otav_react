# Curso de React (intermediário a avançado)

Esse repositório tem como objetivo documentar o básico já conhecido de React no modo de artigos, e utilizar o conceito de testes unitários e de integração em seções posteriores e diversificar as fontes de aprendizado para aprender outros contextos do que já foi disposto em projetos e cursos anteriores.

[Link para o curso](https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado/)

## 1.0 Inicializando um projeto react

Dependendo do toolchain desejado, deve-se utilizar templates diferentes, no caso inicial o comando ```npx create-react-app .``` foi escolhido para o script padrão (e atualmente não recomendado) para manter a coerência com o curso, ao invés dos atuais projetos com templates do next.js, remix ou vite.

Esse comando é uma automação e quick-start de ferramentas como o babel, webpack e bases para o jest, react-testing-library e webvitals, fundamentais para o ecossistema react, em que algumas das justificativas foram aprendidas no curso de automação com Gulp.

## 2.0 Estado e Hooks com componentes

Antigamente, o React tinha uma separação necessária de estado para componentes funcionais e de classes, e componentes stateless e stateful, entretanto atualmente o React faz uso de estados a partir de Hooks, sendo assim houve a mitigação desses conceitos, onde componentes funcionais ou de classe já possuem as extensões válidas e capacidade de retornar JSX para a transpilação, com isso essa necessidade de separação de componente é depreciada.