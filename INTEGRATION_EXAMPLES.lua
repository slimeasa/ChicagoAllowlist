-- ════════════════════════════════════════════════════════════
-- EXEMPLOS DE INTEGRAÇÃO COM SISTEMAS DE CHAVES
-- ════════════════════════════════════════════════════════════

--[[
    Este arquivo contém exemplos de como integrar o sistema de chaveiro
    com diferentes sistemas de chaves populares no FiveM.
    
    Edite o arquivo server/main.lua na callback 'chaveiro:comprarChave'
    para usar os exports do seu sistema de chaves.
]]

-- ════════════════════════════════════════════════════════════
-- EXEMPLO 1: Sistema de Chaves Simples (Item no Inventário)
-- ════════════════════════════════════════════════════════════

-- Já está implementado no script! 
-- Simplesmente adiciona o item car_key com metadata da placa


-- ════════════════════════════════════════════════════════════
-- EXEMPLO 2: qb-vehiclekeys ou sistemas similares
-- ════════════════════════════════════════════════════════════

-- Substituir na callback chaveiro:comprarChave:
--[[
    -- Dar a chave usando o export do qb-vehiclekeys
    TriggerEvent('qb-vehiclekeys:server:GiveVehicleKeys', source, veiculo.plate)
    
    -- Ou se usar export:
    exports['qb-vehiclekeys']:GiveKeys(source, veiculo.plate)
]]


-- ════════════════════════════════════════════════════════════
-- EXEMPLO 3: wasabi_carlock ou sistemas de lock
-- ════════════════════════════════════════════════════════════

--[[
    -- Dar chave usando wasabi_carlock
    exports.wasabi_carlock:GiveKey(source, veiculo.plate)
]]


-- ════════════════════════════════════════════════════════════
-- EXEMPLO 4: cd_garage com sistema de chaves integrado
-- ════════════════════════════════════════════════════════════

--[[
    -- Adicionar chave no sistema do cd_garage
    TriggerEvent('cd_garage:AddKeys', source, veiculo.plate)
]]


-- ════════════════════════════════════════════════════════════
-- EXEMPLO 5: t1ger_keys ou outros sistemas custom
-- ════════════════════════════════════════════════════════════

--[[
    -- Adicionar chave
    exports['t1ger_keys']:addKey(source, veiculo.plate)
]]


-- ════════════════════════════════════════════════════════════
-- EXEMPLO 6: Sistema próprio com database
-- ════════════════════════════════════════════════════════════

--[[
    -- Inserir na database do seu sistema de chaves
    MySQL.Async.execute('INSERT INTO vehicle_keys (owner, plate, vehicle) VALUES (@owner, @plate, @vehicle)', {
        ['@owner'] = xPlayer.identifier,
        ['@plate'] = veiculo.plate,
        ['@vehicle'] = veiculo.vehicle_name
    })
]]


-- ════════════════════════════════════════════════════════════
-- COMO IMPLEMENTAR NO SEU SERVIDOR
-- ════════════════════════════════════════════════════════════

--[[
    1. Identifique qual sistema de chaves seu servidor usa
    2. Copie o exemplo correspondente acima
    3. Abra o arquivo server/main.lua
    4. Encontre a callback 'chaveiro:comprarChave'
    5. Substitua ou adicione a linha que dá a chave ao jogador
    
    Exemplo de como fica no código:
    
    ESX.RegisterServerCallback('chaveiro:comprarChave', function(source, cb, veiculo, preco)
        local xPlayer = ESX.GetPlayerFromId(source)
        
        if xPlayer.getMoney() >= preco then
            xPlayer.removeMoney(preco)
            
            -- SUBSTITUA ESTA LINHA PELO EXPORT DO SEU SISTEMA:
            -- exports.ox_inventory:AddItem(source, Config.ChaveItem, 1, metadata)
            
            -- POR EXEMPLO (qb-vehiclekeys):
            -- TriggerEvent('qb-vehiclekeys:server:GiveVehicleKeys', source, veiculo.plate)
            
            cb(true)
        else
            cb(false)
        end
    end)
]]


-- ════════════════════════════════════════════════════════════
-- VERIFICAÇÃO DE CHAVES NO SISTEMA
-- ════════════════════════════════════════════════════════════

--[[
    Se você quiser verificar se o jogador JÁ possui uma chave
    antes de permitir a compra, adicione uma verificação antes
    de processar o pagamento:
    
    -- Exemplo com ox_inventory:
    local hasKey = exports.ox_inventory:Search(source, 'count', Config.ChaveItem, {plate = veiculo.plate})
    if hasKey > 0 then
        TriggerClientEvent('ox_lib:notify', source, {
            title = 'Chaveiro',
            description = 'Você já possui uma chave deste veículo!',
            type = 'error'
        })
        cb(false)
        return
    end
    
    -- Exemplo com sistema custom (database):
    MySQL.Async.fetchScalar('SELECT COUNT(*) FROM vehicle_keys WHERE owner = @owner AND plate = @plate', {
        ['@owner'] = xPlayer.identifier,
        ['@plate'] = veiculo.plate
    }, function(count)
        if count > 0 then
            TriggerClientEvent('ox_lib:notify', source, {
                title = 'Chaveiro',
                description = 'Você já possui uma chave deste veículo!',
                type = 'error'
            })
            cb(false)
        else
            -- Processar compra...
        end
    end)
]]


-- ════════════════════════════════════════════════════════════
-- MÚLTIPLAS CHAVES
-- ════════════════════════════════════════════════════════════

--[[
    Se você quiser permitir que o jogador compre múltiplas chaves
    do mesmo veículo (para dar a amigos, por exemplo):
    
    1. Remova a verificação de chave existente
    2. Opcionalmente, adicione um limite de chaves por veículo
    3. Ajuste o preço (pode cobrar mais pela segunda chave, etc)
    
    Exemplo:
    
    local totalKeys = exports.ox_inventory:Search(source, 'count', Config.ChaveItem, {plate = veiculo.plate})
    
    if totalKeys >= 3 then
        -- Limite de 3 chaves por veículo
        TriggerClientEvent('ox_lib:notify', source, {
            title = 'Chaveiro',
            description = 'Você já possui o máximo de chaves para este veículo!',
            type = 'error'
        })
        cb(false)
        return
    end
    
    -- Cobrar mais por chaves adicionais
    local precoFinal = preco * (totalKeys + 1)
]]
