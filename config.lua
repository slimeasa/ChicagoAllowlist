Config = {}

-- Configurações do NPC Chaveiro
Config.Chaveiro = {
    npc = {
        model = 's_m_m_autoshop_01', -- Modelo do NPC
        coords = vector4(-1110.0062, -1694.2411, 4.5646, 310.3192),
        scenario = 'WORLD_HUMAN_CLIPBOARD' -- Animação do NPC
    },
    
    blip = {
        enabled = true, -- Mostrar blip no mapa
        sprite = 446, -- Ícone do blip
        color = 5, -- Cor do blip (amarelo)
        scale = 0.7,
        name = 'Chaveiro'
    }
}

-- Preços das chaves
Config.Precos = {
    chave_carro = 500, -- Preço para fazer cópia de chave de carro
    chave_moto = 300,  -- Preço para fazer cópia de chave de moto
    chave_caminhao = 750 -- Preço para fazer cópia de chave de caminhão
}

-- Configurações gerais
Config.TempoFabricacao = 5000 -- Tempo para fabricar a chave em milissegundos (5 segundos)

-- Sistema de chaves (ajuste conforme seu sistema)
Config.ChaveItem = 'car_key' -- Nome do item de chave no seu ox_inventory

-- Distância de interação
Config.DistanciaInteracao = 2.5

-- Mensagens
Config.Mensagens = {
    sem_dinheiro = 'Você não tem dinheiro suficiente!',
    sem_veiculos = 'Você não possui nenhum veículo registrado!',
    chave_criada = 'Chave fabricada com sucesso!',
    chave_ja_possui = 'Você já possui uma chave deste veículo!',
    processo_cancelado = 'Processo cancelado!',
    fabricando = 'Fabricando chave...'
}
