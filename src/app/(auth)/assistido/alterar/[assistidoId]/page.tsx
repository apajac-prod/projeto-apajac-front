import FormAssistido from "@/components/form/assistido/formAssistido";

type Params = {
  assistidoId: string;
};

type Props = {
  params: Params;
};

const AlterarAssistido = ({ params: { assistidoId } }: Props) => {
  return <FormAssistido editId={assistidoId} />;
};

export default AlterarAssistido;
