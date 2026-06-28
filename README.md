# Certificado VAIF Experience
## Portal Oficial de Certificados

**Link publicado:**
https://vaifexperience.github.io/Certificado-Vaif-Experience/

---

## Estrutura do projeto

```
Certificado-Vaif-Experience/
│
├── index.html       → Estrutura do portal e do certificado
├── style.css        → Identidade visual e layout
├── script.js        → Lógica de geração, download PDF e impressão
├── README.md        → Este arquivo
│
└── img/
    ├── logo-vaif.png        → Logo VAIF Experience (topo do portal e certificado)
    ├── logo-debora.png      → Assinatura Debora Olliveira (rodapé do certificado)
    └── logo-federacao.png   → Logo da Federação (rodapé do certificado)
```

---

## Como adicionar as imagens

Coloque os arquivos na pasta `img/` com exatamente esses nomes:

| Arquivo | Uso | Tamanho recomendado |
|---|---|---|
| `logo-vaif.png` | Portal e topo do certificado | PNG transparente, ~300px altura |
| `logo-debora.png` | Assinatura no rodapé | PNG transparente, ~60px altura |
| `logo-federacao.png` | Logo da Federação no rodapé | PNG transparente, ~200px altura |

> **Sem as imagens**, o portal exibe fallbacks de texto elegantes e funciona normalmente.

---

## Fluxo da participante

```
Acessa o link
    ↓
Digita o nome
    ↓
Clica em "Gerar Certificado"
    ↓
Portal desaparece (fade)
    ↓
Certificado aparece (fade)
    ↓
Opções:
  · Baixar PDF  (A4 horizontal, alta resolução)
  · Imprimir    (otimizado para impressão profissional)
  · Gerar outro (volta ao portal)
```

---

## Paleta de cores

| Nome | Hex |
|---|---|
| Off White | `#ECECEC` |
| Bege | `#DACCBD` |
| Verde Oliva | `#919780` |
| Verde Escuro | `#3B3C32` |
| Marrom | `#472D20` |
| Marrom Escuro | `#2F1E1B` |
| Ouro Champagne | `#C9A55A` |

**Fontes:** Parisienne (títulos) + Inter (corpo)

---

## Futuras implementações

- [ ] Integração Google Sheets — lista oficial de participantes
- [ ] Integração Firebase — banco de dados + área admin
- [ ] Busca por e-mail
- [ ] Portal da participante (fotos, materiais, comunidade)
- [ ] Reutilização para futuras imersões, mentorias e workshops

---

*VAIF Experience · Visão · Atitude · Identidade · Fé*
