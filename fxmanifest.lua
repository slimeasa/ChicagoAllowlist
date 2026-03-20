fx_version 'cerulean'
game 'gta5'

author 'Seu Nome'
description 'Sistema de Chaveiro para FiveM'
version '1.0.0'

shared_scripts {
    '@es_extended/imports.lua',
    '@ox_lib/init.lua',
    'config.lua'
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    'server/*.lua'
}

lua54 'yes'
