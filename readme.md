
#.env.local
NEXTAUTH_URL=http://localhost:3000/
JWT_SECRET=superuser
NEXTAUTH_SECRET=superuser
NEXT_PUBLIC_API_BASE_URL=https://vef2-2023-h1-production.up.railway.app
# Vefforritun 2, 2023, hópverkefni 2

Útfæra skal React framenda með Next.js ofan á vefþjónustur úr hópverkefni 1.

## Virkni

Virkni fer mestmegnis eftir því hvað var útfært í hópverkefni 1.

Verkefnið skal hafa a.m.k. þrjár mismunandi síður/virkni fyrir utan forsíðu. T.d. listi af færslum með síðuflettingum, stök færsla, leitarniðurstöður.

Lausn skal þó almennt hafa eftirfarandi:

### Valmynd og haus

Útfæra skal valmynd sem fer á milli mismunandi síða á vef þar sem hver síða birtir ákveðna virkni úr vefþjónustu. Þessi valmynd skal vera aðgengileg á öllum síðum og sýna hvaða síða er valin.

Aukalega ef virkni er til staðar sem alltaf ætti að vera hægt að komast í skal birta hana (t.d. leit eða körfuvirkni) almennt/í haus.

### Fótur

Allar síðu skulu hafa sameiginlegan fót sem birtir eitthvað einfalt (t.d. „copyright“ upplýsingar).

Ef til staðar er innskráning/virkni sem aðeins er fyrir stjórnendur skal hafa tengil á það í fæti.

### Forsíða

Forsíða hefur „statísk“ gögn með dummy content og mynd, setjið inn eigið með t.d. `lorem ipsum` texti og myndum frá [Unsplash](unsplash.com/).

### Notendur

Útfæra skal innskráningu á móti notendaumsjón í vefþjónustum og birta/leyfa aðgerðir sérstaklega fyrir innskráða notendur.

Ef skráning notanda er útfærð getur hún talist til síðu/virkni.

### Myndavirkni

Útbúa skal virkni á móti myndavirkni í vefþjónustu þ.a. hægt sé að setja inn myndir gegnum form.

## Útlit

Setja skal upp einfalt, skalanlegt útlit fyrir vefinn. Mælst er til að nota grid og flexbox.

Leyfilegt er að nota Sass.

## Next.js og almenn virkni

Setja skal verkefnið upp með Next.js og TypeScript. Setja skal upp með _server-side rendering_.

Þegar kallað er í vefþjónustu skal birta loading state og bregðast við villum. Þar sem gögn geta verið tóm skal huga að empty state.

Ef síða finnst ekki skal birta 404 síðu.

Ef reynt er að skoða síðu sem ekki er heimild til að skoða skal birta að ekki sé heimild til að skoða.

## Tæki og tól

Setja skal upp eslint fyrir JavaScript. Engar villur skulu koma fram ef npm run lint er keyrt. Leyfilegt er að skilgreina hvaða reglusett er notað, ekki er krafa um að nota það sem hefur verið notað í öðrum verkefnum.

### Hýsing

Setja skal upp vefinn á Render, Railway eða Heroku (ath að uppsetning á Heroku mun kosta) tengt við GitHub með postgres settu upp.

### README

Í rót verkefnis skal vera `README.md` skjal sem tilgreinir:

- Upplýsingar um hvernig setja skuli upp verkefnið.
- Innskráning fyrir `admin` stjórnanda ásamt lykilorði.
- Nöfn og notendanöfn allra í hóp.

## Hópavinna

Verkefnið skal unnið í hóp, helst með þremur einstaklingum. Hópar með tveim eða fjórum einstaklingum eru einnig í lagi, ekki er dregið úr kröfum fyrir færri í hóp en gerðar eru auknar kröfur ef fleiri en þrír einstaklingar eru í hóp.

Hægt er að auglýsa eftir hóp á slack á rásinni `#vef2-2023-vantar-hóp`.

Hafið samband við kennara ef ekki tekst eða ekki er mögulegt að vinna í hóp.

Í hópverkefni 2 verður unninn framendi ofan á þessar vefþjónustur og því getur verið gott að halda áfram í sama hóp. Það er hinsvegar ekki krafa og hægt að skipta um hóp, mynda nýjan eða hugsanlega vinna sem einstaklingsverkefni.

Notast skal við Git og GitHub. Engar zip skrár með kóða ættu að ganga á milli í hópavinnu, heldur á að „committa“ allan kóða og vinna gegnum Git.

Sjást ætti á commit history að allir meðlimir hóps hafi tekið þátt í verkefni.

Útbúa ætti a.m.k. fimm Pull Request (PR) þar sem búið er að fara yfir af öðrum meðlim í hóp.

## Mat

- 20% Verkefni uppsett í Next.js og tengist vefþjónustum, almenn virkni útfærð.
- 30% Útfærslur á móti vefþjónustum, a.m.k. þrjár síður.
- 10% Útlit.
- 10% Innskráning notanda.
- 10% Útfært á móti myndavirkni.
- 10% Tæki, tól og test. README uppsett, verkefni keyrir í hýsingu.
- 10% Hópavinna með Git og GitHub PR.

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 26. mars 2023.

## Skil

Tilnefna skal hópstjóra sem skráir sig í ákveðinn hóp undir „Hópverkefni 2“ í Canvas. Aðrir nemendur skrá sig í framhaldinu í sama hóp, hópstjóri getur líka skráð aðra nemendur í hópinn.

Útbúa skal hóp jafnvel ef verkefnið er unnið sem einstaklingsverkefni.

Hópstjóri skal skila fyrir hönd allra í Canvas í seinasta lagi föstudaginn 21. apríl 2023.

**Mikilvægt er að öll skil séu gerð í hóp annars munu ekki allir nemendur fá einkunn.**

Skil skulu innihalda:

- GitHub notendanöfn allra (passa þarf að allir nemendur séu í hópnum!)
- Slóð á verkefnið keyrandi í hýsingu
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `ofurtumi`
  - `osk`

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |

