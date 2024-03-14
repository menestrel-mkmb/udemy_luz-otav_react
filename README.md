# Curso de React (intermediário a avançado)

Esse repositório tem como objetivo documentar o básico já conhecido de React no modo de artigos, e utilizar o conceito de testes unitários e de integração em seções posteriores e diversificar as fontes de aprendizado para aprender outros contextos do que já foi disposto em projetos e cursos anteriores.

[Link para o curso](https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado/)

## 1.0 Inicializando um projeto react

Dependendo do toolchain desejado, deve-se utilizar templates diferentes, no caso inicial o comando ```npx create-react-app .``` foi escolhido para o script padrão (e atualmente não recomendado) para manter a coerência com o curso, ao invés dos atuais projetos com templates do next.js, remix ou vite.

Esse comando é uma automação e quick-start de ferramentas como o babel, webpack e bases para o jest, react-testing-library e webvitals, fundamentais para o ecossistema react, em que algumas das justificativas foram aprendidas no curso de automação com Gulp.

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