interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: "cliente" | "admin" | "funcionario";
  active: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  reservas: Reserva[];
}

interface Filme {
  id: string;
  usuarioId: string;
  usuario: Usuario;
  titulo: string;
  descricao: string;
  duracaoMin: number;
  genero: string;
  classificacao: string;
  idioma: string;
  lancamento: Date;
  emCartaz: boolean;
  postersUrl: string[];
  trailerUrl?: string;
  sessaoExtra: boolean;
  sessoes: Sessao[];
  createdAt: Date;
  updatedAt: Date;
}
type CreateFilmeDTO = Omit<
  Filme,
  "id" | "usuario" | "sessoes" | "createdAt" | "updatedAt"
>;
type DeleteFilmeDTO = Pick<Filme, "id">;
type UpdateFilmeDTO = Pick<
  Omit<
    Filme,
    "id" | "usuario" | "sessoes" | "createdAt" | "updatedAt" | "usuarioId"
  >
>;

interface Sessao {
  id: string;
  filmeId: string;
  filme: Filme;
  data: string;
  horario: string;
  sala: number;
  assentosTotais: number;
  assentosDisponiveis: number;
  reservas: Reserva[];
  createdAt: Date;
  updatedAt: Date;
}
type CreateSessaoDTO = Omit<
  Sessao,
  | "id"
  | "filme"
  | "reservas"
  | "createdAt"
  | "updatedAt"
  | "assentosDisponiveis"
>;
interface Reserva {
  id: string;
  usuarioId: string;
  sessaoId: string;
  usuario: Usuario;
  sessao: Sessao;
  quantidadeIngressos: number;
  assentos: string[];
  dataReserva: Date;
  createdAt: Date;
  updatedAt: Date;
}
