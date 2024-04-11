# Curso de React (intermediário a avançado)

Esse repositório tem como objetivo documentar o básico já conhecido de React no modo de artigos, e utilizar o conceito de testes unitários e de integração em seções posteriores e diversificar as fontes de aprendizado para aprender outros contextos do que já foi disposto em projetos e cursos anteriores.

[Link para o curso](https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado/)

## 1.0 - Inicializando um projeto react

Dependendo do toolchain desejado, deve-se utilizar templates diferentes, no caso inicial o comando `npx create-react-app .` foi escolhido para o script padrão (e atualmente não recomendado) para manter a coerência com o curso, ao invés dos atuais projetos com templates do next.js, remix ou vite.

Esse comando é uma automação e quick-start de ferramentas como o babel, webpack e bases para o jest, react-testing-library e webvitals, fundamentais para o ecossistema react, em que algumas das justificativas foram aprendidas no curso de automação com Gulp.

Para exemplificar a utilização de scripts dispostos dentro do `package.json`, pode-se alterar um conteúdo dentro do `App.js` e ao utilizar o script `npm run build` uma pasta build será criada com o contexto estático necessário para ser utilizado no navegador. O teste foi feito localmente utilizando o LiveServer, em similitude ao script do browsersync no Gulp.

Embora o conteúdo estático na pasta build seja substituído ao executar o script, caso seja necessário adicionar algum componente estático ao site, pode-se editar o arquivo final (embora minificado) e fazer uso de um site que não é inteiramente iterado pelo React. O parágrafo disposto contempla apenas a definição de que todas as ferramentas encadeadas (toolchain) da biblioteca são apenas uma forma de automatizar a vida do desenvolvedor, e que a web continua utilizando apenas arquivos: `.html .css .js`, e conteúdo estático como imagens e vetores.

### 1.1 - Estado e Hooks com componentes

Antigamente, o React tinha uma separação necessária de estado para componentes funcionais e de classes; e componentes stateless e stateful, entretanto atualmente o React faz uso de estados a partir de Hooks.

Assim, ocorreu uma mitigação desses conceitos, onde componentes (por padrão, funcionais) já possuem as extensões válidas e capacidade de retornar JSX para a transpilação dos elementos, modificando a estrutura das funções internas de um componente, e tornando depreciado a utilização de construtor, controladores de ciclo de vida (agora é utilizado o hook de useEffect) e a necessidade de vínculo do referencial de objeto this a um bind para utilização de métodos nos eventos sintéticos.

### 1.2 - Entendendo componentes de classes, bind e states

Tinha-se a necessidade de estender a classe de componente para uma classe de JS, onde era necessário passar o construtor da classe, com o construtor de componente (relativo super) e aplicar as propriedades (props) para permitir a manipulação de estado por funções para o correto ciclo de vida de renderização.

Para editar o valor de um componente de estado era necessário fazer o bind de escopo da função interna a classe com `this.internalFunctionClass = this.internalFunctionClass.bind(this)` dentro do construtor da classe para referenciar corretamente o maior escopo local (último this).

Além de ser necessário declarar qualquer estado inicial sobreescrevendo o objeto vazio no próprio construtor. Isso era feito utilizando o `this.state = { attr = value };`. Para alterar em outro momento do ciclo de vida, a normatiza padrão do React de setState é utilizada (após o bind de escopo): `this.setState({ attr = newValue });`.

Após tais normatizas efetuadas, tornava-se possível fazer quaisquer manipulação dentro do JSX e ver seu efeito dentro do virtual DOM atráves dos eventos sintéticos como em `onClick={this.internalFunctionClass}`, visto que o método padrão de `render` é executado a cada troca de estado, para garantir a conformidade dos valores atuais do componente e o renderizado pelo virtual DOM.

### 1.3 - Arrow functions e valores nos states

A utilização de arrow function dentro de uma classe é recomendada pela não criação de um escopo interno, ou seja, o this automaticamente é apontado para o elemento classe pai, onde o bind se torna desnecessário para métodos próprios.

Para métodos que denotam o ciclo de vida do componente e que são usuais do React, não se tem esse tipo de controle.

Entretanto, há uma alternativa para evitar a utilização de construtores para o estado nas funções próprias e eliminar também a necessidade de bind entre os escopos: a utilização de class fields.

### 1.4 - Mapeando listas

Um cenário comum da necessidade de utilização do conceito de SPA é a dinamicidade parcial de páginas, no React isso é visto com a iteração de elementos em JS dentro do JSX, separados pela tag {}.

Outro ponto importante é que, para a garantia de transpilação compatível e otimização de performance da biblioteca, a atribuição de um referencial único `key` é utilizada.

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

Para o caso usual de retorno de componentes múltiplos, a regra de componente é herdada, sendo necessário o envelopamento de múltiplos componentes em um único filho, nem que seja o fragmento vazio `<>{ children }</>`.

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

É importante notar que o componente pai continuou recebendo o discriminatório de unicidade `key` para o mapeamento interno do React.

### 1.5 - Ciclo de vida de componentes

Para a atualização parcial e otimização de performance dos componentes na SPA, é necessário uma forma de avaliar se o conteúdo mudou, como fazer isso de forma segura e atualizar parcialmente para evitar repetir processamento desnecessário, esse é conceito de ciclo de vida.

Como ciclo básico tem-se a separação do componente em montagem `mounting`, onde de exemplo tem-se a utilização do construtor `constructor`, da renderização `render` e da montagem `componentDidMount` para simbolizar que o componente chegou em um primeiro estado semântico completo; na atualização `updating` tem-se de exemplo a indicação de atualização `shouldComponentUpdate`, a finalização da atualização `componentDidUpdate`, a renderização `render` da atualização; na desmontagem `unmounting` tem-se a indicação de desconstrução `componentWillUnmount`. Há ainda a indicação de erro `componentDidCatch` no ciclo de vida `errorhandling`.

Embora seja fácil evidenciar alguns métodos de componentes pelo ciclo de vida, isso é considerado legado, e a utilização desses conceitos foram diluídas em outras vertentes, como por exemplo o uso de `fallback={component}` para manter os princípios de bom design enquanto aguarda as dependências do escopo.

O uso de `snapshot`, é outra forma de estado incremental para atualização das propriedades `props` de forma parcial, e também faz parte do contexto de ciclo de vida do componente.

Uma forma de garantir que as referências de componentes sempre estejam em estado seguro, é utilizar o contexto usual de JS para timer, em que inicializa-se um objeto `null`, quando necessário atribui-se um timer para o objeto, para em cenários de atualizações e desconstruções a referência volte a ser nula utilizando `clearTimeout(this.state.timerRef)` para evitar uma atualização periódica que algo que já foi removido.

Um padrão utilizado para determinar manipulações em componentes é criar métodos iniciados em `handle`. Outro ponto é a utilização do método async-await para Promessas feitas dentro de funções de ciclo de vida como demonstrado em:

```
async componentDidMount () {
    await this.getPosts();
}
```

Representação gráfica indicando documentação: [Diagrama de ciclo de vida](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## 2.0 - Utilizando dados dinâmicos

A grande necessidade do conceito de SPA, a manipulação de um DOM Virtual e a atualização parcial de páginas se deu para melhorar o uso e experiência na web sob o contexto de páginas dinâmicas, em que objetos interativos variam com filtros, buscas e outros fatores, seja um post de um blog a uma página em um e-commerce, a web estática é só um envelope para seu real valor: dados dinâmicos.

Com isso disposto, tem-se a usualidade de separar a obtenção desses dados, a partir de uma interface (API), e requisitar os dados de forma específica e assíncrona, já que o ciclo de vida da aplicação web permite a montagem da página sob o contexto 'orientado a eventos' (event driven), para isso tem-se o usual método de aquisição (fetch) desses dados. Conforme demonstrado a seguir:

```
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(posts => this.setState({ posts }));
```

Uma API genérica e padrão (JSONPlaceholder typicode) foi utilizada para a demonstração de uma requisição externa, de um arquivo JSON, e sob o contexto de pipeline assíncrono já estudado no Gulp, tem-se o contexto de encadeamento de funções executadas sequencialmente à medida que as promessas (Promises) sejam recebidas pelo navegador.

Para demonstrar a iteração de múltiplas requisições, utilizou-se outro endpoint da API para concatenar fotos aos posts, e unificar em um objeto dentro do state, conforme código a seguir:

```
getPosts = async () => {
    const postsJson = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json());
    const photosJson = await fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => response.json());

    let completePosts = [];

    postsJson.forEach((post, index) => {
      completePosts.push({
        ...post,
        ...photosJson[index],
      })
    })

    this.setState({ posts: completePosts });
  }
```

Assim, disposto do objeto com a propriedade `url` com o link da imagem, é possível iterar no JSX e conferir o resultado no card com o conteúdo dos endpoints `/posts` e `/photos`.

## 3.0 - Organização no React

O React é uma biblioteca declarativa em componentes, o que significa que tudo que é implícito deve ser evitado, e tem-se o conceito de componentização para agregar o máximo de vantagem ao reutilizar semântica similar em diferentes partes.

Com isso há o contexto de separação de nós `nodes` em algumas vertentes: modularização, extensão e outros aspectos como responsabilidade única, contexto único, tipos de hooks e etc; entretanto, esses outros aspectos são convenções cujos encontram-se mais próximas do conceito de arquitetura no React, e devem ser abordadas em uma parte futura dessa documentação.

Sobre a modularização e extensividade, tem-se o interesse em abstrair as divisões fundamentais de uma aplicação, seja na separação de objetos visuais, regras de negócio, componentes funcionais para serviços, middlewares de verificação, parser de serviços e outros.

### 3.1 - Componentes

Sendo assim, para a aplicação desse conceito no exemplo de projeto atual, deve-se separar os componentes visuais, dos quais podem ser divididos em: container de lista, item de lista (card) e permitindo ainda subdivisões dentro do item como: título, descrição e miniatura de chamada.

Para isso, dentro da pasta `src/components` há a criação desses componentes, em uma pasta com seu nome, com um arquivo chamado `index.js` com as variações: `.js .jsx .ts e .tsx`, para javascript, componente visual js, typescript e componente visual ts, respectivamente; assim como para o arquivo de estilo, há o padrão `styles.css` com as variações `.module.css, .scss, .module.scss`, ambas convenções demonstradas no exemplo abaixo:

```
│  src
│   ├── components
│   │   ├── PostCard
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
```

E por padrão, dentro do arquivo `PostCard/index.jsx`, uma função exportada padrão do componente com a estrutura, e seus requisitos de props, bem como o retorno do documento JSX:

```
export default function PostCard(props){
    return(<>JSX</>)
}
```

Após utilizar esse padrão, nota-se que o uso da chave única não é mais necessário dentro do componente visual, e o mesmo é utilizado na chamada de seu componente para uso interno do React.

### 3.2 - Elementos e Instâncias

O uso de componentes, sejam eles funcionais ou de classe, é o padrão utilizado na biblioteca React, para a transformação do código em HTML é feita uma transpilação para o Virtual DOM, o resultado dessa transpilação resulta em um nó: com nenhum, um ou múltiplos filhos de elementos.

Sendo assim, elementos são o resultado de retorno de um componentes, como a recursão é utilizada no React, o elemento contém elementos filhos, e ao analisar o resultado final em HTMl, vemos que esses elementos são passados a partir de nós de tags HTML; quando um elemento tem mesmo valor semântico, mas diferente valor informativo, a esse é dado o nome de instância, para controlar e mapear instâncias, o React faz uso de um identificador único dentro de uma coleção, denominado ```key`.

```
│  src
│   ├── components
│   │   ├── Posts
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
│   │   ├── PostCard
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
```

Adicionando o componente envelope `Posts` ao exemplo do item 3.1, e o uso de uma API que retorna 100 posts, tem-se a seguinte abstração. Componentes: Posts e PostCard. Elementos: `<article class="posts">{children}</article>` e `<div class="card">{children}</div>`. Instâncias: 1 Posts e 100 PostCard.

### 3.3 - Fluxo de dados entre componentes

O intuito desse modelo explicita como o React utiliza as props e seus componentes, e traz implícito uma diretiva importante do React, a direção do fluxo de dados é sempre do pai para o filho.

Considerando a hierarquia de componentes, a transpilação gera um contexto cada vez mais limitado de escopo para os elementos filhos, sendo assim, chamadas para uma hierarquia maior são obrigatoriamente feitas a partir do que é chamado de `callback functions`, e caso seja necessária manipulação múltipla de um determinado valor, ou se usa a má prática de `prop drilling`, ou se utiliza a criação de um `Provider` de contexto global, como `Context API` ou `Redux`.

### 3.4 - Eventos Sintéticos

A utilização de `callbacks` ou funções de gerenciamento de estado e hooks são controlados a partir de eventos sintéticos, similares aos eventos de DOM. Esses passam por uma camada de abstração para que seja permitida algumas coisas, como: compatibilidade entre plataformas e navegadores, funções específicas definidas pela biblioteca, e funções de similitude aos eventos nativos do HTMl, há ainda a capacidade de executar um overwrite da chamada dos eventos de similitude com o uso de `event.nativeEvent`.

Há algumas convenções que se diferem dos eventos nativos do HTML, como o uso de camelCase para a nomenclatura dos eventos, e outros detalhes técnicos mais avançados como a propagação de eventos do `event handler` precisa ser parada de forma explícita utilizando `preventDefault()`.

### 3.5 - Templates/Pages

No Next.js e outros frameworks React há uma padronização sobre componentes estruturais que definem o formato de uma seção completa do SPA, podendo citar os arquivos `page, template e layout` em suas variações `.js .jsx .ts e .tsx`, essas estruturas tem funções similares, e a hierarquia é definida pelo framework. No geral, o objetivo é situar a posição de componentes nas páginas, utilizando junto estratégias de renderizações paralelas e parciais. Para exemplificar segue a transformação do Componente App para o Template da página Home:

```
│  src
│   ├── components
│   │   ├── ...
│   ├── templates
│   │   ├── Home
│   │   │   ├── index.jsx
│   │   │   ├── styles.css
```

### 3.6 - Ordem de estado

Antes do uso de hooks para gerenciamento de estado, era recomendado encadear ao método de utilização do estado uma função de `callback` ao setState de atribuição, para garantir o fluxo de dados em processamento.

Em vulgo, para evitar um efeito indesejado semelhante ao de `race conditions`, pode-se utilizar o `params` opcional de `setState(state: any, callback?: void fn)`, tornando previsível do caso otimista ter o uso consistente do estado desejado, visto que outros eventos na aplicação podem desencadear outros hooks que tornam essa condição um problema.

Como exemplo, após fazer a requisição da API, faz-se necessário encadear pelo callback a chamada para popular os componentes a serem renderizados, para garantir que o processamento não utilize estados anteriores ao desejado.

Outro detalhe a ser adicionado é que o estado atual pode ser desconstruído para uma função anônima afim de se obter o estado anterior e as propriedades anteriores como parâmetros a serem comparados.

Com a utilização de hooks, é possível fazer a interação entre useState e useEffect em "iteração parcial" para garantir esse comportamento de forma simplificada.

## 4 - Testes

Com o conceito de entregas incrementais, e esteira de desenvolvimento contínuo e integrado, a utilização de testes se tornou fundamental para projetos de escopo maiores. Seja para garantir a consistência de features entre versões, como para verificar casos de borda (edge cases) de funcionamento do sistema, testar verificações fora do uso otimista de chamadas assíncronas, verificações pontuais de interface a partir de dados camuflados, e testar a robustez e a qualidade de anti-frágil de sistemas completos. Para cada funcionalidade e escopo de desenvolvimento há seu tipo de teste, sendo eles: unitários, de integração ou ponta a ponta/E2E (end-to-end).

Para que um arquivo seja automaticamente reconhecido pelo watcher de teste em `npm test`, deve-se utilizar a convenção de nomenclatura para `Component.test.js`, possibilitando algumas outras flexões para tipos diferentes de testes, como `.spec` para testes unitários, e a extensão `.jsx` para componentes visuais.

### 4.1 - Testes Unitários

A menor parte de sentido completo em um projeto React é chamada de componente, os testes unitários têm como objetivo fazer verificações de semântica e informativas para saber o que esperar do comportamento e propriedades da instância do VirtualDOM.

É considerado uma boa prática durante a criação de testes a adição do `expect.assertions(1)` para garantir que seja executada uma afirmação verdadeira, e retirar o viés de que um teste vazio é considerado um sucesso. Entretanto, o uso normativo de expectativa de asserção se dá em testes assíncronos, em que possa ser relevante avaliar um escopo externo como uma API.

A estrutura de um teste normalmente se dá em um agrupamento definido por `describe('name', () => { fn[] it() })`, e dentro de cada `it() ou test()` é criado o verbete e a instância de teste, e definida a expectativa booleana do teste, conforme demonstrado abaixo:

```
imports ...
describe('<Button /> See more posts', () => {
    it('should render the button with the text "Load more posts"', () => {
        expect.assertions(1);
        render(<Button text='Load more posts' />);
        const button = screen.getByRole('button', { name: /load more posts/i });
        expect(button).toBeInTheDocument();
    });
});
```

Também é considerado fundamental a descrição do erro em inglês, para facilitar e padronizar projetos internacionais, e manter frases mais curtas e sem idioma com caracteres especiais como a acentuação do português.

Para testes assíncronos, e que envolvem chamadas externas, ainda que de um único componente, é preciso fazer uma camuflagem/`mock` na comunicação, para simplificar o que será testado e otimizar o tempo de desenvolvimento, uma dessas estratégias envolve reter as requisições HTTP como se fosse um loop de DNS, em que ao invés de chamar a interface externa, uma resposta mais enxuta e rápida, mas com a mesma estrutura satisfaz o problema.

Como a filosofia de testes unitário é testar a menor parte, uma chamada externa deve ser refutada por: eventos externos como a rede estar com problema, o sistema externo estar com problemas, o limite de requisições já ter sido usado são justificativas de erros ardilosos que podem indicar um mal funcionamento no componente interno, por um problema externo.

Outro problema é a concatenação de requisições, em um projeto grande testar várias páginas com múltiplas requisições podem levar a uma waterfall de segundos em cada tela ociosos do sistema e do desenvolvedor apenas aguardando uma resposta, que de forma otimista só irá demorar mais.

Para a utilização de camufladores é preciso replicar a estrutura do dado a ser testado de forma enxuta, fazendo uso de dados fictícios e identificáveis mais simples, menor tamanho de dados para teste e também o uso dos métodos:

```
beforeAll(()=>{ initMock(); })
afterEach(()=>{ resetMock(); })
afterAll(()=>{ closeMock(); })
```

Sendo esses, respectivamente:

- iniciar o serviço/`worker` antes para garantir que a camuflagem esteja em nível de execução no início dos testes
- resetar os dados para garantir que nenhum teste de `POST` tenha alterado os dados ENTRE TESTES e tenha consistência da arquitetura `REST` em continuar `stateless`
- finalizar o serviço de mock para evitar problemas com a utilização real de outro serviço.

#### 4.1.1 - Problema MSW com Jest e módulos ESM

Durante a execução do curso, as versões atuais dos pacotes não são mais compatíveis de verificação por problema na transpilação de módulo TS pelo babel. Após tentar burlar essas verificações, iniciar um projeto em Vite moderno para tentar contornar e procurar soluções na documentação e na internet, o timeboxing foi atingido, e para o objetivo linear da aprendizagem.

Ao final do curso será avaliada a necessidade de revisão desse módulo, e foi adiada unicamente por já ter explicitado o uso futuro no curso de tal recurso em projetos modernos, caso seja necessário, uma versão legada do projeto será criada nas exatas versões do atual módulo, para a amostragem de código.

## 5 - React Hooks

Os hooks foram desenvolvidos com o objetivo de centralizar o controle de ciclo de vida de componentes e estados de componentes internos para padronizar a solução de questões como `bind.this`, `componentDidMount`, `componentWillUnmount` e alguns problemas com chamadas assíncronas, aquisição de dados de estados passados de forma não proposital e para iniciar o processo de seleção de renderização usando memória e referências, para modificar menos componentes e aumentar a performance da biblioteca em cenários de muitas interações.

Uma normativa obrigatória de nomenclatura é o termo `use` no início de todos os tipos de hooks, já normativa em seu uso é de que, para garantir sua execução, os mesmos devem ser filhos direto da função de componente, ou seja, não deve-se utilizar quaisquer verificação com um hook encapsulado como em `if(true){useEffect(fn, []?);}`.

### 5.1 - useState

Para garantir que um certo dado esteja em seu estado correto, e ela tenha um indicativo de `trigger` para atualização da renderização, o `useState` é utilizado.

Assim, todo dado possui um valor padrão inicial, e um callback único para alteração de seu valor, sua semântica é definida por `const [value: any, setValue: fn?] = useState(initialValue: any);` em que há uma desconstrução de um array delimitando o valor e seu `callback` opcional de alteração.

Portanto, alterar o estado se torna pontual, e não se faz mais necessário espalhar o restante do estado e lidar com um objeto único grande sem uma conexão direta e definida entre dois valores do componente.

```
  App...
  const [counter, setCounter] = useState(0);

  const handleClickCounter = () => {
    setCounter(counter + 1);
  };

  return(
    ...
    <h2>Contador: {counter}</h2>
    <button type="button" onClick={handleClickCounter}>
    +
    </button>
    ...
  );
```

Conforme demonstrado acima, utilizando eventos sintéticos em conjunto com hook para controle de estado é mantido a coesão de um código menos verboso, passando pelo rigor de verificação de ciclo de vida e transição de estados do React.

Entretanto, uma vez com esse contexto, ao iniciar o desenvolvimento de aplicativos com hooks que tentam simular o ciclo de vida é comum obter casos em que o estado alcançado por uma função ou expressão é anterior ou de uma promessa em andamento e ter uma discrepância entre a legibilidade de código e a intenção de execução, nesse caso há uma alternativa simples para gerenciamento de valores crus, passando como parâmetro do valor da função de callback uma função anônima e pegando o parâmetro que é o valor atual e previsível, como demonstrado abaixo:

```
  App...
  const [counter, setCounter] = useState(0);

  const handleSafeClickCounter = () => {
    setCounter((c) => c + 1);
  };

  return(
    ...
    <h2>Contador: {counter}</h2>
    <button type="button" onClick={handleSafeClickCounter}>
    +s
    </button>
    ...
  );
```

Para valores e componentes mais complexos, como o caso de exemplos anteriores com o `allPosts`, `filteredPosts` e `posts`, há o uso do hook useReducer, que será visto posteriormente nesse documento.

### 5.2 - useEffect

Sobre os casos de ciclo de vida de componentes, com a centralização de gerenciamento de estados indo para os hooks, as funções anteriores de `componentDidUpdate`, `componentDidMount` e outras funções de efeitos colaterais tiveram sua implementação em sintaxes específicas do Hook denominado `useEffect`. Como adição dessa sintaxe, torna-se explícito lidar com as dependências de atualizações de forma correta, e com isso utilizar estados de valores de forma inteligente, e quando necessário se fazer uso do recurso de parâmetro do valor anterior, visto ao final da última seção, bem como encapsular algumas mudanças específicas de componentes dentro de outros hooks como `useCallback` e `useMemo`.

Para alcançar o efeito desejado de `componentDidMount` com `useEffect` é utilizado o escopo:

```
useEffect(() => {
    console.log("componentDidMount");
}, []);
```

Para alcançar o efeito desejado de `componentDidUpdate` com `useEffect` é utilizado o escopo:

```
useEffect(() => {
    console.log("componentDidUpdate");
});
```

Para citar, como a montagem de componente resulta em uma atualização, pode-se utilizar o 2º bloco com a mesma função do 1º, conforme a [documentação do React](https://legacy.reactjs.org/docs/hooks-effect.html).
