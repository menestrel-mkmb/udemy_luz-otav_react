# Curso de React (intermediário a avançado)

Esse repositório tem como objetivo documentar o básico já conhecido de React no modo de artigos, e utilizar o conceito de testes unitários e de integração em seções posteriores e diversificar as fontes de aprendizado para aprender outros contextos do que já foi disposto em projetos e cursos anteriores.

[Link para o curso](https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado/)

## 1.0 Inicializando um projeto react

Dependendo do toolchain desejado, deve-se utilizar templates diferentes, no caso inicial o comando ```npx create-react-app .``` foi escolhido para o script padrão (e atualmente não recomendado) para manter a coerência com o curso, ao invés dos atuais projetos com templates do next.js, remix ou vite.

Esse comando é uma automação e quick-start de ferramentas como o babel, webpack e bases para o jest, react-testing-library e webvitals, fundamentais para o ecossistema react, em que algumas das justificativas foram aprendidas no curso de automação com Gulp.

Para exemplificar a utilização de scripts dispostos dentro do ```package.json```, pode-se alterar um conteúdo dentro do ```App.js``` e ao utilizar o script ```npm run build``` uma pasta build será criada com o contexto estático necessário para ser utilizado no navegador. O teste foi feito localmente utilizando o LiveServer, em similitude ao script do browsersync no Gulp.

### 1.1 Estado e Hooks com componentes

Antigamente, o React tinha uma separação necessária de estado para componentes funcionais e de classes, e componentes stateless e stateful, entretanto atualmente o React faz uso de estados a partir de Hooks, sendo assim houve a mitigação desses conceitos, onde componentes funcionais ou de classe já possuem as extensões válidas e capacidade de retornar JSX para a transpilação, com isso essa necessidade de separação de componente é depreciada.

### 1.2 - Entendendo componentes de classes, bind e states

Tinha-se a necessidade de estender a classe de componente para uma classe de JS, onde era necessário passar o construtor da classe, com o construtor de componente (relativo super) e aplicar as propriedades (props) para permitir a manipulação de estado por funções para o correto ciclo de vida de renderização.

Para editar o valor de um componente de estado era necessário fazer o bind de escopo da função interna a classe com ```this.internalFunctionClass = this.internalFunctionClass.bind(this)``` dentro do construtor da classe para referenciar corretamente o maior escopo local (último this).

Além de ser necessário declarar qualquer estado inicial sobreescrevendo o objeto vazio no próprio construtor. Isso era feito utilizando o ```this.state = { attr = value };```. Para alterar em outro momento do ciclo de vida, a normatiza padrão do React de setState é utilizada (após o bind de escopo): ```this.setState({ attr = newValue });```.

Após tais normatizas efetuadas, tornava-se possível fazer quaisquer manipulação dentro do JSX e ver seu efeito dentro do virtual DOM atráves dos eventos sintéticos como em ```onClick={this.internalFunctionClass}```, visto que o método padrão de ```render``` é executado a cada troca de estado, para garantir a conformidade dos valores atuais do componente e o renderizado pelo virtual DOM.

### 1.3 Arrow functions e valores nos states

A utilização de arrow function dentro de uma classe é recomendada pela não criação de um escopo interno, ou seja, o this automaticamente é apontado para o elemento classe pai, onde o bind se torna desnecessário para métodos próprios.

Para métodos que denotam o ciclo de vida do componente e que são usuais do React, não se tem esse tipo de controle.

Entretanto, há uma alternativa para evitar a utilização de construtores para o estado nas funções próprias e eliminar também a necessidade de bind entre os escopos: a utilização de class fields.

### 1.4 Mapeando listas

Um cenário comum da necessidade de utilização do conceito de SPA é a dinamicidade parcial de páginas, no React isso é visto com a iteração de elementos em JS dentro do JSX, separados pela tag {}.

Outro ponto importante é que, para a garantia de transpilação compatível e otimização de performance da biblioteca, a atribuição de um referencial único ```key``` é utilizada.

Assim, ao querer iterar sobre um objeto de posts, por exemplo, no componente pai retornado ao JSX é necessário mapear unicamente, conforme disposto no código:

```
this.state = {
    posts: [
        {
            id: 1,
            title: 'Título 1',
            text: 'Lorem1'
        },
        {
            id: 2,
            title: 'Título 2',
            text: 'Lorem2'
        },
        {
            id: 3,
            title: 'Título 3',
            text: 'Lorem3'
        }
    ]
}

return
(<div>
{posts.map( post => <h1 key={post.id}>{post.title}</h1>)}
</div>)
```

Para o caso usual de retorno de componentes múltiplos, a regra de componente é herdada, sendo necessário o envelopamento de múltiplos componentes em um único filho, nem que seja o fragmento vazio ```<>{ children }</>```.

```
return
(<div>
{posts.map( post => (
    <div key={post.id}>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
    </div>
))}
</div>)
```

É importante notar que o componente pai continuou recebendo o discriminatório de unicidade ```key``` para o mapeamento interno do React.

### 1.5 Ciclo de vida de componentes

Para a atualização parcial e otimização de performance dos componentes na SPA, é necessário uma forma de avaliar se o conteúdo mudou, como fazer isso de forma segura e atualizar parcialmente para evitar repetir processamento desnecessário, esse é conceito de ciclo de vida.

Como ciclo básico tem-se a separação do componente em montagem ```mounting```, onde de exemplo tem-se a utilização do construtor ```constructor```, da renderização ```render``` e da montagem ```componentDidMount``` para simbolizar que o componente chegou em um primeiro estado semântico completo; na atualização ```updating``` tem-se de exemplo a indicação de atualização ```shouldComponentUpdate```, a finalização da atualização ```componentDidUpdate```, a renderização ```render``` da atualização; na desmontagem ```unmounting``` tem-se a indicação de desconstrução ```componentWillUnmount```. Há ainda a indicação de erro ```componentDidCatch``` no ciclo de vida ```errorhandling```.

Embora seja fácil evidenciar alguns métodos de componentes pelo ciclo de vida, isso é considerado legado, e a utilização desses conceitos foram diluídas em outras vertentes, como por exemplo o uso de ```fallback={component}``` para manter os princípios de bom design enquanto aguarda as dependências do escopo.

O uso de ```snapshot```, é outra forma de estado incremental para atualização das propriedades ```props``` de forma parcial, e também faz parte do contexto de ciclo de vida do componente.

Uma forma de garantir que as referências de componentes sempre estejam em estado seguro, é utilizar o contexto usual de JS para timer, em que inicializa-se um objeto ```null```, quando necessário atribui-se um timer para o objeto, para em cenários de atualizações e desconstruções a referência volte a ser nula para evitar uma atualização periódica que algo que já foi removido.

Um padrão utilizado para determinar manipulações em componentes é criar métodos iniciados em ```handle```.

Representação gráfica indicando documentação: [Diagrama de ciclo de vida](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## 2 Utilizando dados dinâmicos

A grande necessidade do conceito de SPA, a manipulação de um DOM Virtual e a atualização parcial de páginas se deu para melhorar o uso e experiência na web sob o contexto de páginas dinâmicas, em que objetos interativos variam com filtros, buscas e outros fatores, seja um post de um blog a uma página em um e-commerce, a web estática é só um envelope para seu real valor: dados dinâmicos.

Com isso disposto, tem-se a usualidade de separar a obtenção desses dados, a partir de uma interface (API), e requisitar os dados de forma específica e assíncrona, já que o ciclo de vida da aplicação web permite a montagem da página sob o contexto 'orientado a eventos' (event driven), para isso tem-se o usual método de aquisição (fetch) desses dados. Conforme demonstrado a seguir:

```
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(posts => this.setState({ posts }));
```

Uma API genérica e padrão (JSONPlaceholder typicode) foi utilizada para a demonstração de uma requisição externa, de um arquivo JSON, e sob o contexto de pipeline assíncrono já estudado no Gulp, tem-se o contexto de encadeamento de funções executadas sequencialmente à medida que as promessas (Promises) sejam recebidas pelo navegador.