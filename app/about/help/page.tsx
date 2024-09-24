import "github-markdown-css"
import ReactMarkdown from "react-markdown"

import "./texts/md-style.css"

const Help = () => {
  return (
    <>
      <ReactMarkdown className="markdown-body">
        {`
# Aucad - Auxiliar de Cadastro

Aplicativo feito para verificar o cadastro com base no que **falta**, gerando uma mensagem automática de recusa.

## Como utilizar

A interface principal é a primeira que aparece. A cada cadastro novo que você for validar, certifique-se que tenha resetado a página apertando no botão do canto inferior direito.

_Não é necessário que se aperte no botão se for a primeira vez._

Cada caixinha foi pensada para gerar **apenas uma** pequena mensagem cada, que é junta com as partes superiores e inferiores da mensagem.

Cada categoria possui seus respectivos campos obrigatórios e irá gerar uma mensagem diferente para cada um. Ao trocar de aba, o aplicativo também vai resetar o estado das outras categorias.

A mensagem é editável. Caso você clique com o botão direito dentro do campo de texto, aparecerá um pequeno menu em baixo do mouse, onde você pode selecionar textos adicionais para adicionar diretamente ao texto sem precisar digitar.

### Dicas

- Não precisa selecionar "não" em todo documento que estiver faltando. Ele será requerido por padrão caso esteja vazio;
- Alguns textos são modelos, como por exemplo, o texto para pedir o documento de identidade de algum dependente. Certifique-se de que você digitou o nome da pessoa no lugar do texto em maiúsculo.
- Se você mudar de aba no aplicativo, as caixinhas selecionadas (da página principal) serão resetadas.
- Apenas o botão de reset da página principal recarrega o aplicativo.
          `}
      </ReactMarkdown>
    </>
  )
}

export default Help
