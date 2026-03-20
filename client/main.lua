local npcChaveiro = nil

-- Função para spawnar o NPC
local function SpawnNPC()
    local model = Config.Chaveiro.npc.model
    local coords = Config.Chaveiro.npc.coords
    
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(0)
    end
    
    npcChaveiro = CreatePed(4, model, coords.x, coords.y, coords.z - 1.0, coords.w, false, true)
    
    SetEntityAsMissionEntity(npcChaveiro, true, true)
    SetPedFleeAttributes(npcChaveiro, 0, 0)
    SetPedDiesWhenInjured(npcChaveiro, false)
    SetPedKeepTask(npcChaveiro, true)
    SetBlockingOfNonTemporaryEvents(npcChaveiro, true)
    FreezeEntityPosition(npcChaveiro, true)
    SetEntityInvincible(npcChaveiro, true)
    
    if Config.Chaveiro.npc.scenario then
        TaskStartScenarioInPlace(npcChaveiro, Config.Chaveiro.npc.scenario, 0, true)
    end
    
    -- Criar blip se habilitado
    if Config.Chaveiro.blip.enabled then
        local blip = AddBlipForCoord(coords.x, coords.y, coords.z)
        SetBlipSprite(blip, Config.Chaveiro.blip.sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, Config.Chaveiro.blip.scale)
        SetBlipColour(blip, Config.Chaveiro.blip.color)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentString(Config.Chaveiro.blip.name)
        EndTextCommandSetBlipName(blip)
    end
    
    -- Interação com ox_target (se disponível)
    if GetResourceState('ox_target') == 'started' then
        exports.ox_target:addLocalEntity(npcChaveiro, {
            {
                name = 'chaveiro_menu',
                icon = 'fas fa-key',
                label = 'Falar com Chaveiro',
                onSelect = function()
                    AbrirMenuChaveiro()
                end
            }
        })
    else
        -- Usar interação por proximidade com ox_lib
        CreateThread(function()
            local coords = Config.Chaveiro.npc.coords
            lib.zones.sphere({
                coords = vec3(coords.x, coords.y, coords.z),
                radius = Config.DistanciaInteracao,
                debug = false,
                onEnter = function()
                    lib.showTextUI('[E] Falar com Chaveiro', {
                        position = "right-center"
                    })
                end,
                onExit = function()
                    lib.hideTextUI()
                end,
                inside = function()
                    if IsControlJustReleased(0, 38) then -- E
                        AbrirMenuChaveiro()
                    end
                end
            })
        end)
    end
end

-- Função para abrir o menu do chaveiro
function AbrirMenuChaveiro()
    ESX.TriggerServerCallback('chaveiro:getVeiculos', function(veiculos)
        if not veiculos or #veiculos == 0 then
            lib.notify({
                title = 'Chaveiro',
                description = Config.Mensagens.sem_veiculos,
                type = 'error'
            })
            return
        end
        
        local options = {}
        
        for i = 1, #veiculos do
            local veiculo = veiculos[i]
            local preco = Config.Precos.chave_carro
            
            -- Determinar preço baseado no tipo de veículo (você pode expandir isso)
            if veiculo.type == 'bike' then
                preco = Config.Precos.chave_moto
            elseif veiculo.type == 'truck' then
                preco = Config.Precos.chave_caminhao
            end
            
            table.insert(options, {
                title = veiculo.vehicle_name or 'Veículo',
                description = string.format('Placa: %s | Preço: R$%s', veiculo.plate, preco),
                icon = 'car',
                iconColor = '#3b82f6',
                onSelect = function()
                    ComprarChave(veiculo, preco)
                end,
                metadata = {
                    {label = 'Modelo', value = veiculo.vehicle_name or 'Desconhecido'},
                    {label = 'Placa', value = veiculo.plate},
                    {label = 'Preço', value = 'R$' .. preco}
                }
            })
        end
        
        lib.registerContext({
            id = 'chaveiro_menu',
            title = '🔑 Chaveiro',
            options = options
        })
        
        lib.showContext('chaveiro_menu')
    end)
end

-- Função para comprar chave
function ComprarChave(veiculo, preco)
    local alert = lib.alertDialog({
        header = 'Confirmar Compra',
        content = string.format('Deseja fabricar uma chave para o veículo placa **%s** por **R$%s**?', veiculo.plate, preco),
        centered = true,
        cancel = true
    })
    
    if alert == 'confirm' then
        ESX.TriggerServerCallback('chaveiro:comprarChave', function(sucesso)
            if sucesso then
                -- Animação de fabricação
                lib.notify({
                    title = 'Chaveiro',
                    description = Config.Mensagens.fabricando,
                    type = 'info'
                })
                
                if lib.progressBar({
                    duration = Config.TempoFabricacao,
                    label = 'Fabricando chave...',
                    useWhileDead = false,
                    canCancel = true,
                    disable = {
                        car = true,
                        move = true,
                        combat = true
                    },
                    anim = {
                        dict = 'mp_common',
                        clip = 'givetake1_a'
                    }
                }) then
                    lib.notify({
                        title = 'Chaveiro',
                        description = Config.Mensagens.chave_criada,
                        type = 'success'
                    })
                else
                    lib.notify({
                        title = 'Chaveiro',
                        description = Config.Mensagens.processo_cancelado,
                        type = 'error'
                    })
                end
            else
                lib.notify({
                    title = 'Chaveiro',
                    description = Config.Mensagens.sem_dinheiro,
                    type = 'error'
                })
            end
        end, veiculo, preco)
    end
end

-- Event handlers
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    SpawnNPC()
end)

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    if DoesEntityExist(npcChaveiro) then
        DeleteEntity(npcChaveiro)
    end
end)

CreateThread(function()
    SpawnNPC()
end)
