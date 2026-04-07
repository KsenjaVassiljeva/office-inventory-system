# Inventuurisüsteem (Inventory)

## Projekti kirjeldus
See rakendus on inventuurisüsteem väikekontorile seadmete haldamiseks. Süsteem võimaldab hallata seadmete nimekirja ja jälgida nende kasutust.

Rakenduses on kaks kasutajarolli:
- **Admin** – saab lisada ja kustutada seadmeid
- **Töötaja** – saab vaadata seadmete nimekirja ja märkida kasutust

Rakendus on mõeldud väikestele ettevõtetele või meeskondadele, kes vajavad lihtsat lahendust inventuuri haldamiseks.

---

## Arhitektuuri põhjendus

Projekt kasutab järgmisi tehnoloogiaid:

- **Node.js** – backend ja API loomiseks
- **PocketBase** – andmebaas ja autentimine
- **HTML, CSS, JavaScript** – frontend

**Valiku põhjendus:**
- PocketBase võimaldab kiiresti luua backendi ilma keerulise seadistuseta
- Node.js on lihtne ja sobib hästi API loomiseks
- Vanilla JavaScript hoiab projekti kerge ja arusaadava
- Sobib hästi väikesele projektile ja õppimiseks


## Paigaldusjuhend

### 1. Klooni repositoorium
```
bash
git clone https://github.com/sinu-kasutaja/inventory-system.git
cd inventory-system

npm install

./pocketbase serve

node app.js

## Meeskonnaliikmed ja töö jaotus

Ksenja Vassijeva
- Backend (Node.js, API)
- PocketBase seadistamine
- Frontend (HTML, CSS, JavaScript)
Zahhar Simanski
- documentation
- kirjuta README
