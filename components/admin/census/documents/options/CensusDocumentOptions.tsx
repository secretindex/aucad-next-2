import { useState } from "react"

export default function CensusDocumentOptions() {
  // Exemplo de dados que você buscaria do Supabase
  const documents = [
    {
      id: "1",
      name: "Comprovante de residência",
      options: [
        { id: "opt1", label: "Não apresentado", message: "Favor, enviar comprovante de residência" },
        { id: "opt2", label: "Emitido até 60 dias", message: "Favor, enviar comprovante emitido nos últimos 60 dias" },
        { id: "opt3", label: "Emitido até 90 dias", message: "Favor, enviar comprovante emitido nos últimos 90 dias" }
      ]
    },
    {
      id: "2",
      name: "RG",
      options: [
        { id: "opt4", label: "Documento vencido", message: "RG vencido, favor atualizar" },
        { id: "opt5", label: "Não apresentado", message: "Favor, enviar cópia do RG" }
      ]
    }
  ]

  // Estado para marcar quais opções foram selecionadas
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string[] }>({})

  const toggleOption = (docId: string, optId: string) => {
    setSelectedOptions((prev) => {
      const current = prev[docId] || []
      return {
        ...prev,
        [docId]: current.includes(optId)
          ? current.filter((id) => id !== optId)
          : [...current, optId]
      }
    })
  }

  const handleSave = () => {
    console.log("Opções selecionadas:", selectedOptions)
    // aqui você faria o insert no Supabase -> census_document_options
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Configurar documentos do censo</h2>

      {documents.map((doc) => (
        <div key={doc.id} className="mb-6 border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">{doc.name}</h3>
          <div className="space-y-2">
            {doc.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOptions[doc.id]?.includes(opt.id) || false}
                  onChange={() => toggleOption(doc.id, opt.id)}
                  className="w-4 h-4"
                />
                <span>
                  <span className="font-medium">{opt.label}</span> —{" "}
                  <span className="text-gray-600">{opt.message}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Salvar configurações
      </button>
    </div>
  )
}
