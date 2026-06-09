export interface Evento {
    id: string,
    projetoId: string,
    titulo: string,
    inicioEm: string,
    fimEm: string,
    local: string,
    tipo: string,
}

export interface ProximoEvento {
    titulo: string,
    dataInicio: string,
}