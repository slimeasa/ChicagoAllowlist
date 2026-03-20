-- Callback para buscar veículos do jogador
ESX.RegisterServerCallback('chaveiro:getVeiculos', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if not xPlayer then
        cb(nil)
        return
    end
    
    MySQL.Async.fetchAll('SELECT * FROM owned_vehicles WHERE owner = @owner', {
        ['@owner'] = xPlayer.identifier
    }, function(result)
        if result and #result > 0 then
            local veiculos = {}
            
            for i = 1, #result do
                local vehicle = json.decode(result[i].vehicle)
                table.insert(veiculos, {
                    plate = result[i].plate,
                    vehicle_name = vehicle.model or 'Desconhecido',
                    type = result[i].type or 'car'
                })
            end
            
            cb(veiculos)
        else
            cb(nil)
        end
    end)
end)

-- Callback para comprar chave
ESX.RegisterServerCallback('chaveiro:comprarChave', function(source, cb, veiculo, preco)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if not xPlayer then
        cb(false)
        return
    end
    
    -- Verificar se o jogador tem dinheiro suficiente
    if xPlayer.getMoney() >= preco then
        -- Remover dinheiro
        xPlayer.removeMoney(preco)
        
        -- Adicionar chave ao inventário
        local metadata = {
            description = 'Chave do veículo placa: ' .. veiculo.plate,
            plate = veiculo.plate,
            vehicle = veiculo.vehicle_name
        }
        
        exports.ox_inventory:AddItem(source, Config.ChaveItem, 1, metadata)
        
        -- Log
        print(string.format('[CHAVEIRO] %s (%s) comprou uma chave para o veículo %s (Placa: %s) por R$%s',
            xPlayer.getName(),
            xPlayer.identifier,
            veiculo.vehicle_name,
            veiculo.plate,
            preco
        ))
        
        -- Você pode adicionar um webhook do Discord aqui se desejar
        SendDiscordLog(xPlayer, veiculo, preco)
        
        cb(true)
    elseif xPlayer.getAccount('bank').money >= preco then
        -- Tentar pagar com banco
        xPlayer.removeAccountMoney('bank', preco)
        
        -- Adicionar chave ao inventário
        local metadata = {
            description = 'Chave do veículo placa: ' .. veiculo.plate,
            plate = veiculo.plate,
            vehicle = veiculo.vehicle_name
        }
        
        exports.ox_inventory:AddItem(source, Config.ChaveItem, 1, metadata)
        
        -- Log
        print(string.format('[CHAVEIRO] %s (%s) comprou uma chave para o veículo %s (Placa: %s) por R$%s (BANCO)',
            xPlayer.getName(),
            xPlayer.identifier,
            veiculo.vehicle_name,
            veiculo.plate,
            preco
        ))
        
        SendDiscordLog(xPlayer, veiculo, preco)
        
        cb(true)
    else
        cb(false)
    end
end)

-- Função para enviar log ao Discord (opcional)
function SendDiscordLog(xPlayer, veiculo, preco)
    -- Descomente e configure se quiser logs no Discord
    --[[
    local webhook = 'SEU_WEBHOOK_AQUI'
    
    local embedData = {
        {
            ['title'] = '🔑 Nova Chave Fabricada',
            ['color'] = 3447003,
            ['fields'] = {
                {
                    ['name'] = 'Jogador',
                    ['value'] = xPlayer.getName() .. ' (' .. xPlayer.identifier .. ')',
                    ['inline'] = true
                },
                {
                    ['name'] = 'Veículo',
                    ['value'] = veiculo.vehicle_name,
                    ['inline'] = true
                },
                {
                    ['name'] = 'Placa',
                    ['value'] = veiculo.plate,
                    ['inline'] = true
                },
                {
                    ['name'] = 'Valor Pago',
                    ['value'] = 'R$' .. preco,
                    ['inline'] = true
                }
            },
            ['footer'] = {
                ['text'] = os.date('%d/%m/%Y %H:%M:%S')
            }
        }
    }
    
    PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({
        username = 'Chaveiro',
        embeds = embedData
    }), { ['Content-Type'] = 'application/json' })
    ]]
end

-- Comando admin para dar chaves (opcional)
ESX.RegisterCommand('darchave', 'admin', function(xPlayer, args, showError)
    local targetPlayer = ESX.GetPlayerFromId(args.id)
    
    if not targetPlayer then
        xPlayer.showNotification('Jogador não encontrado!')
        return
    end
    
    local metadata = {
        description = 'Chave administrativa',
        plate = args.plate or 'ADMIN',
        vehicle = args.vehicle or 'Admin'
    }
    
    exports.ox_inventory:AddItem(args.id, Config.ChaveItem, args.quantidade or 1, metadata)
    
    xPlayer.showNotification('Chave enviada para ' .. targetPlayer.getName())
    targetPlayer.showNotification('Você recebeu uma chave de um administrador!')
    
end, true, {
    help = 'Dar chave para um jogador',
    validate = true,
    arguments = {
        {name = 'id', help = 'ID do jogador', type = 'player'},
        {name = 'plate', help = 'Placa do veículo', type = 'string'},
        {name = 'vehicle', help = 'Nome do veículo', type = 'string'},
        {name = 'quantidade', help = 'Quantidade de chaves', type = 'number'}
    }
})

print('^2[Chaveiro]^7 Sistema de chaveiro iniciado com sucesso!')
