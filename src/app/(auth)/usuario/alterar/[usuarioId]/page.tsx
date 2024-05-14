import FormUsuario from "@/components/form/usuario/formUsuario";

type Params = {
  usuarioId: string;
};

type Props = {
  params: Params;
};

const AlterarUsuario = ({ params: { usuarioId } }: Props) => {
  return <FormUsuario id={usuarioId}/>;
};
export default AlterarUsuario;
