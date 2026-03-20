-- ════════════════════════════════════════════════════════════
-- INSTRUÇÕES: Adicione este código ao arquivo ox_inventory/data/items.lua
-- ════════════════════════════════════════════════════════════

['car_key'] = {
    label = 'Chave de Veículo',
    weight = 50,
    stack = false,
    close = true,
    description = 'Chave de um veículo',
    client = {
        image = 'car_key.png',
        -- Adicione exports se seu sistema de chaves usar
        -- export = 'seu_script.useCarKey'
    },
    server = {
        -- Adicione callbacks do servidor se necessário
        -- export = 'seu_script.checkCarKey'
    },
    buttons = {
        {
            label = 'Usar',
            action = function(slot)
                -- Adicione a lógica de uso da chave aqui
                -- Exemplo: TriggerEvent('seu_sistema:usarChave', slot.metadata)
            end
        }
    }
},

-- ════════════════════════════════════════════════════════════
-- NOTA IMPORTANTE:
-- ════════════════════════════════════════════════════════════
-- 
-- 1. Não esqueça de adicionar a imagem car_key.png em:
--    ox_inventory/web/images/car_key.png
--
-- 2. Se você já tem um sistema de chaves funcionando, ajuste
--    a ação do botão "Usar" para integrar com seu sistema
--
-- 3. A metadata incluirá:
--    - plate: Placa do veículo
--    - vehicle: Nome/modelo do veículo
--    - description: Descrição da chave
--
-- ════════════════════════════════════════════════════════════
