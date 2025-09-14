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
  titulo: string;
  descricao: string;
  duracao: number;
  sessoes: Sessao[];
  createdAt: Date;
  updatedAt: Date;
}

interface Sessao {
  id: string;
  filmeId: string;
  filme: Filme;
  data: Date;
  horario: string;
  sala: number;
  assentosTotais: number;
  assentosDisponiveis: number;
  reservas: Reserva[];
  createdAt: Date;
  updatedAt: Date;
}

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
