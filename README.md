# 🔑 Sistema de Chaveiro - FiveM

Sistema completo de chaveiro para servidores FiveM com ESX, ox_inventory e ox_lib.

## 📋 Características

- ✅ NPC Chaveiro com localização customizável
- ✅ Menu interativo para compra de chaves
- ✅ Suporte para ox_target e interação por proximidade
- ✅ Sistema de pagamento (dinheiro ou banco)
- ✅ Metadata nas chaves (placa, modelo do veículo)
- ✅ Blip no mapa
- ✅ Logs de transações
- ✅ Animações de fabricação
- ✅ Totalmente configurável
- ✅ Comando admin para dar chaves

## 📦 Dependências

- ✅ ESX Legacy
- ✅ ox_inventory
- ✅ ox_lib
- ✅ ox_target (opcional)
- ✅ MySQL

## 🔧 Instalação

1. **Extrair o script** para a pasta `resources` do seu servidor

2. **Adicionar ao server.cfg**:
```cfg
ensure chaveiro
```

3. **Configurar o item da chave** no ox_inventory:

Adicione ao arquivo `ox_inventory/data/items.lua`:

```lua
['car_key'] = {
    label = 'Chave de Veículo',
    weight = 50,
    stack = false,
    close = true,
    description = 'Chave de um veículo',
    client = {
        image = 'car_key.png'
    }
},
```

4. **Adicionar imagem da chave**:
   - Adicione uma imagem chamada `car_key.png` na pasta `ox_inventory/web/images/`
   - Você pode baixar uma imagem de chave de carro online

5. **Reiniciar o servidor** ou usar `ensure chaveiro`

## ⚙️ Configuração

Edite o arquivo `config.lua` para personalizar:

### Localização do NPC
```lua
Config.Chaveiro = {
    npc = {
        model = 's_m_m_autoshop_01',
        coords = vector4(-1110.0062, -1694.2411, 4.5646, 310.3192),
        scenario = 'WORLD_HUMAN_CLIPBOARD'
    }
}
```

### Preços
```lua
Config.Precos = {
    chave_carro = 500,
    chave_moto = 300,
    chave_caminhao = 750
}
```

### Item da Chave
```lua
Config.ChaveItem = 'car_key' -- Altere se usar outro nome
```

### Tempo de Fabricação
```lua
Config.TempoFabricacao = 5000 -- Em milissegundos
```

## 🎮 Como Usar

### Para Jogadores:
1. Vá até o chaveiro no mapa (marcado com blip)
2. Interaja com o NPC (E ou ox_target)
3. Selecione o veículo para o qual deseja fazer uma chave
4. Confirme a compra
5. Aguarde a fabricação
6. Receba a chave no inventário

### Para Administradores:

**Comando para dar chaves:**
```
/darchave [id] [placa] [veículo] [quantidade]
```

Exemplo:
```
/darchave 1 ABC1234 Sultan 1
```

## 🔄 Integração com Sistemas de Chaves

Este script cria o item da chave no inventário com metadata. Você precisa integrar com seu sistema de chaves existente.

### Exemplo de metadata criada:
```lua
{
    description = 'Chave do veículo placa: ABC1234',
    plate = 'ABC1234',
    vehicle = 'Sultan'
}
```

### Como integrar:

**Se você usa um sistema de chaves que verifica items:**

No seu script de veículos, verifique se o jogador possui o item `car_key` com a placa correta:

```lua
local item = exports.ox_inventory:GetItem(source, 'car_key', {plate = plate})
if item then
    -- Jogador tem a chave
end
```

**Ou use exports do seu sistema de chaves:**

Se você já tem um sistema de chaves, edite o arquivo `server/main.lua` na função `chaveiro:comprarChave` para usar os exports do seu sistema ao invés de adicionar o item diretamente.

## 📝 Logs do Discord (Opcional)

Para habilitar logs no Discord:

1. Abra `server/main.lua`
2. Encontre a função `SendDiscordLog`
3. Descomente o código
4. Adicione seu webhook do Discord

## 🐛 Problemas Comuns

### NPC não spawna:
- Verifique se as coordenadas estão corretas
- Verifique se o modelo do ped existe

### Menu não abre:
- Certifique-se que ox_lib está funcionando
- Verifique o console F8 por erros

### Chave não é adicionada:
- Verifique se o item `car_key` está configurado no ox_inventory
- Verifique se o nome do item no config está correto

### Jogador não tem veículos no menu:
- Verifique se a tabela `owned_vehicles` tem veículos registrados
- Verifique se o identifier do jogador está correto

## 📞 Suporte

Para suporte, abra uma issue ou entre em contato.

## 📄 Licença

Este script é de uso livre. Modifique como desejar!

---

**Desenvolvido com ❤️ para a comunidade FiveM**
