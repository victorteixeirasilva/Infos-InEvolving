# InEvolving Landing

Landing pages `/sobre` e `/planos` do InEvolving, separadas do app principal.

## Configuração

Edite [`site.config.json`](site.config.json) na raiz para alterar:

- **links** — URLs de login, cadastro e home do app principal
- **plans** — preços, descrições, features e CTAs WhatsApp
- **segments** — blocos Individual / Time / Empresa
- **whatsappPresets** — mensagens padrão (geral, demo, quiz)

Variáveis de ambiente opcionais: veja [`.env.example`](.env.example).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000/sobre`.

## Build

```bash
npm run build
npm start
```

## Deploy

Configure `NEXT_PUBLIC_SITE_URL` e os links em `site.config.json` antes do deploy. DNS e hospedagem são responsabilidade da equipe de infra.
