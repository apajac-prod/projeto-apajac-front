import FormAcolhido from "@/components/form/acolhido/formAcolhido";

type Params = {
  acolhidoId: string;
};

type Props = {
  params: Params;
};

const AlterarAcolhido = ({ params: { acolhidoId } }: Props) => {
  return <FormAcolhido editId={acolhidoId} />;
};

export default AlterarAcolhido;
