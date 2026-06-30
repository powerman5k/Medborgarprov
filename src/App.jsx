import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// FRÅGEBANK (Fas 1)
// ============================================================
const ALL_QUESTIONS = [
  {"id":1,"question":"Hur långt sträcker sig Sverige från norr till söder?","options":["Cirka 1 200 km","Cirka 2 000 km","Cirka 800 km","Cirka 1 600 km"],"correctAnswer":3,"chapter":1,"chapterName":"Landet Sverige","difficulty":"easy","tags":["geografi"],"explanation":"Sverige sträcker sig cirka 1 600 kilometer från den nordligaste punkten Treriksröset till den sydligaste punkten Smygehuk."},
  {"id":2,"question":"Vad heter havet vid Sveriges östra kust?","options":["Skagerrak","Kattegatt","Nordsjön","Östersjön"],"correctAnswer":3,"chapter":1,"chapterName":"Landet Sverige","difficulty":"easy","tags":["geografi"],"explanation":"Havet vid den östra kusten heter Östersjön. Haven vid den västra kusten heter Skagerrak och Kattegatt."},
  {"id":3,"question":"Vad heter Sveriges högsta berg?","options":["Sylarna","Sarek","Åre","Kebnekaise"],"correctAnswer":3,"chapter":1,"chapterName":"Landet Sverige","difficulty":"medium","tags":["geografi","natur"],"explanation":"Sveriges högsta berg är Kebnekaise som är cirka 2 000 meter högt och ligger i bergskedjan Skanderna längs gränsen mot Norge."},
  {"id":4,"question":"Vilka är de tre största sjöarna i Sverige?","options":["Vänern, Mälaren och Hjälmaren","Vänern, Vättern och Mälaren","Siljan, Storsjön och Hjälmaren","Vättern, Siljan och Storsjön"],"correctAnswer":1,"chapter":1,"chapterName":"Landet Sverige","difficulty":"easy","tags":["geografi","natur"],"explanation":"De tre största sjöarna i Sverige är Vänern, Vättern och Mälaren."},
  {"id":5,"question":"I hur många landsdelar brukar Sverige delas in?","options":["Fyra","Två","Fem","Tre"],"correctAnswer":3,"chapter":1,"chapterName":"Landet Sverige","difficulty":"easy","tags":["geografi","indelning"],"explanation":"Sverige brukar delas in i tre stora landsdelar: Götaland i söder, Svealand i mitten och Norrland i norr."},
  {"id":6,"question":"Hur många kommuner är Sverige indelat i?","options":["110","349","290","21"],"correctAnswer":2,"chapter":1,"chapterName":"Landet Sverige","difficulty":"medium","tags":["indelning"],"explanation":"Sverige är indelat i 290 kommuner samt 21 län."},
  {"id":7,"question":"Ungefär hur stor andel av Sveriges befolkning bor i städer?","options":["55 procent","85 procent","70 procent","95 procent"],"correctAnswer":1,"chapter":1,"chapterName":"Landet Sverige","difficulty":"medium","tags":["befolkning"],"explanation":"Ungefär 85 procent av Sveriges befolkning bor i städer. De tre största städerna är Stockholm, Göteborg och Malmö."},
  {"id":8,"question":"Vad är det främsta målet för Sveriges klimatlag?","options":["Utsläppen ska vara nära noll år 2045","Halvera utsläppen till 2035","Öka andelen solenergi till 50 procent","Förbjuda bensinbilar till 2030"],"correctAnswer":0,"chapter":1,"chapterName":"Landet Sverige","difficulty":"medium","tags":["klimat","miljö"],"explanation":"Ett mål i Sveriges klimatlag är att utsläppen av växthusgaser ska vara så nära noll som möjligt år 2045 – Sverige ska inte släppa ut mer än naturen kan ta upp."},
  {"id":9,"question":"Vad betyder ordet demokrati?","options":["Rättvisans lag","Majoritetsbeslut","Frihet för alla","Folkstyre"],"correctAnswer":3,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"easy","tags":["demokrati"],"explanation":"Ordet demokrati kommer från grekiskan och betyder folkstyre. Det är ett politiskt system där makten utgår från folket."},
  {"id":10,"question":"Vad innebär rättssäkerhet?","options":["Att domstolar styrs av regeringen","Att brott alltid bestraffas hårt","Att alla behandlas lika inför lagen och får en rättvis rättegång","Att polisen alltid har rätt"],"correctAnswer":2,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"medium","tags":["demokrati","rättsväsende"],"explanation":"Rättssäkerhet innebär att alla behandlas lika inför lagen och har rätt till en rättvis rättegång. Ingen får dömas utan en process där bevis och fakta granskas noggrant."},
  {"id":11,"question":"Vad kan ett lågt valdeltagande leda till?","options":["Starkare demokrati","Att fler partier bildas","Billigare val","Att människor får mindre möjligheter att påverka beslut"],"correctAnswer":3,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"medium","tags":["demokrati","val"],"explanation":"Ett lågt valdeltagande kan leda till att människor får mindre möjligheter att påverka politiska beslut i sin vardag och kan öka skillnaderna mellan olika grupper i samhället."},
  {"id":12,"question":"Vad innebär segregation?","options":["Att alla bor i samma område","Att invandrare välkomnas i samhället","Att människor lever åtskilda beroende på ekonomi eller etnisk bakgrund","Att skolor blandas med olika åldrar"],"correctAnswer":2,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"medium","tags":["demokrati","integration"],"explanation":"Segregation innebär att människor lever åtskilda beroende på hur mycket pengar de tjänar eller vilken etnisk bakgrund de har. Det kan försvaga demokratin."},
  {"id":13,"question":"Vilket av följande är INTE ett sätt att delta i demokratin?","options":["Rösta i val","Ignorera nyheter och samhällsfrågor","Kontakta politiker","Skriva debattartiklar"],"correctAnswer":1,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"easy","tags":["demokrati","delaktighet"],"explanation":"Att ignorera nyheter och samhällsfrågor är inte ett sätt att delta i demokratin. Demokratin stärks när medborgarna engagerar sig, röstar och skaffar kunskap."},
  {"id":14,"question":"Vad innebär yttrandefrihet?","options":["Rätten att inte betala skatt","Rätten att skriva och säga vad man tycker","Rätten att vägra militärtjänst","Rätten att bära vapen"],"correctAnswer":1,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"easy","tags":["demokrati","rättigheter"],"explanation":"Yttrandefrihet innebär rätten att skriva och säga vad man tycker. Det är en grundläggande förutsättning för demokrati."},
  {"id":15,"question":"Vad är integration?","options":["Att människor med olika bakgrund lever närmare varandra och känner sig delaktiga i samhället","Att invandrare anpassar sig fullständigt till majoritetssamhället","Att alla talar samma språk","Att utländska medborgare lämnar landet"],"correctAnswer":0,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"medium","tags":["demokrati","integration"],"explanation":"Integration betyder att människor med olika bakgrund och ekonomi lever närmare varandra och känner sig delaktiga i samhället."},
  {"id":16,"question":"Vad är ett hot mot demokratin?","options":["Många politiska partier","Spridning av falsk information och hat på sociala medier","Högt valdeltagande","Fria medier"],"correctAnswer":1,"chapter":2,"chapterName":"Sveriges demokratiska system","difficulty":"easy","tags":["demokrati","hot"],"explanation":"Spridning av falsk information och hat på sociala medier är ett hot mot demokratin eftersom det kan skrämma bort deltagare från den demokratiska debatten och skapa konflikter."},
  {"id":17,"question":"Hur många ledamöter har riksdagen?","options":["249","399","349","299"],"correctAnswer":2,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["riksdag","politik"],"explanation":"Riksdagen har 349 ledamöter som väljs vart fjärde år. De representerar olika partier och olika delar av landet."},
  {"id":18,"question":"Hur ofta väljs riksdagens ledamöter?","options":["Vart fjärde år","Vart tredje år","Vart femte år","Vart sjätte år"],"correctAnswer":0,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["riksdag","val"],"explanation":"Riksdagens 349 ledamöter väljs vart fjärde år i allmänna val."},
  {"id":19,"question":"Vad kallas de partier som inte stödjer regeringen?","options":["Oppositionen","Minoriteten","Reserven","Koalitionen"],"correctAnswer":0,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["riksdag","politik"],"explanation":"De partier som inte stödjer regeringen kallas för opposition. Oppositionens uppgift är att granska regeringens arbete och föreslå en annan politik."},
  {"id":20,"question":"Vad är regionernas främsta uppgift?","options":["Att ta ut tullar","Att bygga vägar","Att ansvara för hälso- och sjukvården","Att driva skolor"],"correctAnswer":2,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["regioner","sjukvård"],"explanation":"Regionernas främsta uppgift är att ansvara för hälso- och sjukvården. De driver och finansierar sjukhus och vårdcentraler."},
  {"id":21,"question":"Hur många regioner finns det i Sverige?","options":["17","25","13","21"],"correctAnswer":3,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"medium","tags":["regioner","indelning"],"explanation":"Sverige är indelat i 21 regioner som styrs av politiker som invånarna i regionen har valt."},
  {"id":22,"question":"Vad heter den myndighet som kontrollerar att andra myndigheter gör rätt?","options":["Riksbanken och Finansinspektionen","Justitieombudsmannen (JO) och Justitiekanslern (JK)","Riksrevisionen och Datainspektionen","Polisen och Åklagarmyndigheten"],"correctAnswer":1,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"hard","tags":["myndigheter","kontroll"],"explanation":"Det finns särskilda myndigheter som kontrollerar att de andra myndigheterna gör rätt – bland annat Justitieombudsmannen (JO) och Justitiekanslern (JK)."},
  {"id":23,"question":"Vad är en budgetproposition?","options":["EU:s krav på Sverige","En plan för kommunernas ekonomi","En lag om skatter","Regeringens förslag till riksdagen om statens inkomster och utgifter"],"correctAnswer":3,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"medium","tags":["riksdag","ekonomi"],"explanation":"Varje höst lämnar regeringen ett förslag till riksdagen på statens inkomster och utgifter – det kallas för budgetproposition."},
  {"id":24,"question":"Vad ansvarar kommunerna för?","options":["Skola, äldreomsorg och vatten/avlopp","Försvar och polis","Sjukvård och kollektivtrafik","Riksdag och lagstiftning"],"correctAnswer":0,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["kommuner","välfärd"],"explanation":"Kommunerna ansvarar för mycket av den service som finns för invånarna, till exempel vatten och avlopp, omsorg för äldre och barn, snöröjning och utbildning."},
  {"id":25,"question":"Hur gammal måste man vara för att få rösta i Sverige?","options":["16 år","20 år","17 år","18 år"],"correctAnswer":3,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"easy","tags":["val","rösträtt"],"explanation":"För att ha rätt att rösta ska man ha fyllt 18 år."},
  {"id":26,"question":"Vad krävs för att rösta i riksdagsvalet?","options":["Att man är svensk medborgare","Att man bott i Sverige i minst ett år","Att man är folkbokförd i Sverige","Att man är EU-medborgare"],"correctAnswer":0,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"medium","tags":["val","rösträtt"],"explanation":"För att rösta i riksdagsvalet måste man vara svensk medborgare och ha fyllt 18 år."},
  {"id":27,"question":"Hur ofta hålls val till EU-parlamentet?","options":["Vart tredje år","Vart femte år","Vart fjärde år","Vart sjätte år"],"correctAnswer":1,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"medium","tags":["val","EU"],"explanation":"Val till riksdag, regionfullmäktige och kommunfullmäktige hålls vart fjärde år. Val till EU-parlamentet hålls vart femte år."},
  {"id":28,"question":"Vad innebär proportionella val?","options":["Det parti som får flest röster tar alla platser","Statsministern utser vinnaren","Partierna får platser i proportion till andelen röster de fått","Varje region får lika många platser"],"correctAnswer":2,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"medium","tags":["val","valsystem"],"explanation":"Proportionella val innebär att partierna får platser i riksdagen utifrån den andel röster de fått. Får ett parti 20 procent av rösterna får de 20 procent av platserna."},
  {"id":29,"question":"Hur stor andel av rösterna måste ett parti få för att komma in i riksdagen?","options":["Fem procent","Två procent","Tre procent","Fyra procent"],"correctAnswer":3,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"medium","tags":["val","riksdag"],"explanation":"För att ett parti ska komma in i riksdagen måste det få minst fyra procent av rösterna. Regeln finns för att hindra att för många partier kommer in vilket skulle göra det svårare att skapa stabila majoriteter."},
  {"id":30,"question":"Vilket av dessa partier sitter i riksdagen (fram till valet 2026)?","options":["Feministiskt initiativ","Miljöpartiet","Junilistan","Piratpartiet"],"correctAnswer":1,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"medium","tags":["partier","riksdag"],"explanation":"Miljöpartiet (MP) är ett av de åtta partier som sitter i riksdagen fram till valet 2026. De övriga är C, KD, L, M, S, SD och V."},
  {"id":31,"question":"Vad är en folkomröstning?","options":["En undersökning gjord av ett opinionsföretag","Ett val till riksdagen","En omröstning om en särskild fråga som kan hållas nationellt, regionalt eller lokalt","En omröstning bland riksdagsledamöterna"],"correctAnswer":2,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"easy","tags":["val","demokrati"],"explanation":"Folkomröstningar hålls om en särskild fråga och kan hållas nationellt, i en region eller i en kommun. De är rådgivande – politikerna måste inte följa resultatet."},
  {"id":32,"question":"Vad röstade Sverige nej till i folkomröstningen 2003?","options":["Att byta till valutan euro","En ny grundlag","Medlemskap i EU","NATO-medlemskap"],"correctAnswer":0,"chapter":4,"chapterName":"Politiska val och partier","difficulty":"hard","tags":["val","historia","EU"],"explanation":"År 2003 röstade Sverige nej i en folkomröstning om att byta ut den svenska kronan mot euro. Sverige behöll därför sin egen valuta."},
  {"id":33,"question":"Hur många grundlagar har Sverige?","options":["Två","Fyra","Fem","Tre"],"correctAnswer":1,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["grundlagar","lag"],"explanation":"Sverige har fyra grundlagar: regeringsformen, tryckfrihetsförordningen, yttrandefrihetsgrundlagen och successionsordningen."},
  {"id":34,"question":"Vad skyddar tryckfrihetsförordningen?","options":["Rätten att använda internet","Radio och tv","Det fria ordet i tryckt form – böcker, tidningar och tidskrifter","Rätten att demonstrera"],"correctAnswer":2,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["grundlagar","yttrandefrihet"],"explanation":"Tryckfrihetsförordningen skyddar det fria ordet i tryckt form och ger alla rätt att fritt ge ut böcker, tidningar och tidskrifter."},
  {"id":35,"question":"Vad innebär allemansrätten?","options":["Alla har rätt att vistas i naturen oavsett vem som äger marken","Alla har rätt till sjukvård","Alla har rätt till gratis utbildning","Alla har rätt till bostad"],"correctAnswer":0,"chapter":5,"chapterName":"Lag och rätt","difficulty":"easy","tags":["grundlagar","natur"],"explanation":"Allemansrätten ger alla möjlighet att vara i naturen oavsett vem som äger marken. Den är skyddad i regeringsformen."},
  {"id":36,"question":"Vilken domstol är första instans i Sverige?","options":["Högsta domstolen","Förvaltningsrätten","Hovrätten","Tingsrätten"],"correctAnswer":3,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["domstolar","rättsväsende"],"explanation":"Tingsrätten är första instans där brottsmål och tvistemål börjar. Därefter kan man överklaga till hovrätten och i vissa fall till Högsta domstolen."},
  {"id":37,"question":"Från vilken ålder kan en person bli åtalad för brott i Sverige?","options":["12 år","15 år","18 år","13 år"],"correctAnswer":1,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["lag","brott"],"explanation":"I Sverige är en person straffmyndig och kan bli åtalad för ett brott från 15 års ålder. Under 2026 har dock regeringen lämnat ett förslag om att sänka åldern till 13 år vid allvarliga brott."},
  {"id":38,"question":"Vad är Åklagarmyndighetens uppgift?","options":["Att döma brottslingar","Att avgöra om misstänkta ska ställas inför domstol","Att verkställa straff","Att utreda brott"],"correctAnswer":1,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["rättsväsende","lag"],"explanation":"Åklagarmyndigheten avgör om personer som misstänks för brott ska ställas inför en domstol. Polisen utreder, åklagaren beslutar om åtal och domstolen dömer."},
  {"id":39,"question":"Vad menas med att domstolarna är oberoende?","options":["Att regering och riksdag inte kan bestämma hur de ska döma","Att deras beslut aldrig kan överklagas","Att de inte behöver följa lagen","Att de finansieras av privata företag"],"correctAnswer":0,"chapter":5,"chapterName":"Lag och rätt","difficulty":"medium","tags":["domstolar","rättsäkerhet"],"explanation":"Domstolarnas oberoende innebär att regering eller riksdag inte kan bestämma hur de ska döma. Det är en viktig del av rättssäkerheten."},
  {"id":40,"question":"Vad bestämmer successionsordningen?","options":["Hur lagar stiftas","Medborgarnas grundläggande rättigheter","Vem som ska bli kung eller drottning efter den nuvarande","Hur val ska genomföras"],"correctAnswer":2,"chapter":5,"chapterName":"Lag och rätt","difficulty":"hard","tags":["grundlagar","monarki"],"explanation":"Successionsordningen är den grundlag som bestämmer vem som ska bli kung eller drottning efter den nuvarande."},
  {"id":41,"question":"Vad innebär offentlighetsprincipen?","options":["Att allmänna handlingar från myndigheter är offentliga och kan begäras ut","Att alla politiska möten är öppna för allmänheten","Att journalister har rätt att delta i domstolsförhandlingar","Att staten måste finansiera alla medier"],"correctAnswer":0,"chapter":6,"chapterName":"Mediernas roll","difficulty":"medium","tags":["medier","demokrati"],"explanation":"Offentlighetsprincipen innebär att allmänna handlingar från myndigheter är offentliga. Vem som helst har rätt att ta del av dem om de inte är hemliga."},
  {"id":42,"question":"Vilka tre företag räknas som public service i Sverige?","options":["SVT, UR och Aftonbladet","SR, SVT och UR","SVT, TV4 och SR","SR, SVT och TT"],"correctAnswer":1,"chapter":6,"chapterName":"Mediernas roll","difficulty":"medium","tags":["medier","public service"],"explanation":"De tre public service-företagen i Sverige är Sveriges Radio (SR), Sveriges Television (SVT) och Utbildningsradion (UR)."},
  {"id":43,"question":"Hur finansieras public service i Sverige?","options":["Genom en avgift som tas ut via skatten","Genom reklamintäkter","Genom frivilliga donationer","Genom EU-bidrag"],"correctAnswer":0,"chapter":6,"chapterName":"Mediernas roll","difficulty":"medium","tags":["medier","public service"],"explanation":"Public service-företagen får inte tjäna pengar på reklam. De finansieras istället genom en avgift som tas ut via skatten, så att alla i landet ska ha tillgång till saklig information."},
  {"id":44,"question":"Vad innebär källkritik?","options":["Att man alltid litar på experter","Att bara läsa statliga medier","Att undvika sociala medier","Att ifrågasätta och kontrollera om information man läser eller hör är korrekt"],"correctAnswer":3,"chapter":6,"chapterName":"Mediernas roll","difficulty":"easy","tags":["medier","källkritik"],"explanation":"Källkritik innebär att ifrågasätta och kontrollera om det man läser, ser eller hör är korrekt. Det är viktigt eftersom falska uppgifter kan spridas snabbt."},
  {"id":45,"question":"Vad gäller för en person som lämnar uppgifter till tidningar eller radio?","options":["De måste alltid uppge sitt namn","De har rätt att vara anonyma och kan inte straffas för att lämna uppgifter","De behöver tillstånd från myndigheter","De kan straffas om informationen är känslig"],"correctAnswer":1,"chapter":6,"chapterName":"Mediernas roll","difficulty":"hard","tags":["medier","yttrandefrihet"],"explanation":"En person har rätt att lämna uppgifter till tidningar, radio och tv utan att straffas för det. Den som meddelar uppgifter till media har också rätt att vara anonym."},
  {"id":46,"question":"Varför är det viktigt att det finns många olika medier?","options":["För att statens kontroll ska bli enklare","För att ge medborgarna tillgång till olika perspektiv och nyheter","För att sänka priset på tidningar","För att journalister ska ha fler jobbalternativ"],"correctAnswer":1,"chapter":6,"chapterName":"Mediernas roll","difficulty":"easy","tags":["medier","demokrati"],"explanation":"Det är viktigt med många olika medier för att medborgarna ska ha tillgång till olika perspektiv. Staten ger därför ekonomiskt stöd till nyhetsmedier och dagstidningar."},
  {"id":47,"question":"Vad är en ansvarig utgivare?","options":["En journalist med lång erfarenhet","Chefen för Pressombudsmannen","En statlig kontrollant av medier","En person som är juridiskt ansvarig för vad som publiceras i en tidning, radio eller tv"],"correctAnswer":3,"chapter":6,"chapterName":"Mediernas roll","difficulty":"hard","tags":["medier","lag"],"explanation":"Tidningar, radio och tv har en ansvarig utgivare som är juridiskt ansvarig för vad som publiceras. Utgivaren måste följa lagar som skyddar mot förtal och kränkningar."},
  {"id":48,"question":"När presenterade FN sin förklaring om de mänskliga rättigheterna?","options":["1960","1948","1951","1945"],"correctAnswer":1,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["mänskliga rättigheter","FN"],"explanation":"FN presenterade förklaringen om de mänskliga rättigheterna 1948. Den innehåller 30 bestämmelser (artiklar) och slår fast att alla människor är födda fria och lika i värde."},
  {"id":49,"question":"Vad innebär Sveriges samtyckeslag?","options":["Att man måste ha tillstånd för att gifta sig","Att den som vill ha sex måste försäkra sig om att den andra personen deltar frivilligt","Att föräldrar måste godkänna sina barns relationer","Att sexköp är lagligt om båda parter är överens"],"correctAnswer":1,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["jämställdhet","lag"],"explanation":"Sveriges samtyckeslag innebär att den som vill ha sex med en person måste försäkra sig om att den andra personen deltar frivilligt. Det gäller även när personerna är gifta."},
  {"id":50,"question":"Vilket år blev barnkonventionen lag i Sverige?","options":["2010","2000","2020","2015"],"correctAnswer":2,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["barn","lag"],"explanation":"FN:s konvention om barns rättigheter (barnkonventionen) blev lag i Sverige år 2020."},
  {"id":51,"question":"Vilka fem grupper erkändes år 2000 som nationella minoriteter i Sverige?","options":["Judar, romer, samer, sverigefinnar och tornedalingar","Samer, finnar, norrmän, danskar och tyskar","Somalier, iranier, kurder, polacker och romer","Romer, samer, kurder, assyrier och judar"],"correctAnswer":0,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"hard","tags":["minoriteter","rättigheter"],"explanation":"År 2000 erkände Sverige judar, romer, samer, sverigefinnar och tornedalingar som nationella minoriteter med rätt att använda sina minoritetsspråk."},
  {"id":52,"question":"Vad gör Diskrimineringsombudsmannen (DO)?","options":["Hanterar klagomål mot polisen","Skyddar yttrande- och pressfrihet","Övervakar politiska partier","Arbetar för allas lika rättigheter och ser till att diskrimineringslagen följs"],"correctAnswer":3,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["diskriminering","myndigheter"],"explanation":"Diskrimineringsombudsmannen (DO) är en statlig myndighet som arbetar för allas lika rättigheter och möjligheter och ser till att diskrimineringslagen följs."},
  {"id":53,"question":"Vilket år blev det lagligt att vara homosexuell i Sverige?","options":["1944","1979","1964","1995"],"correctAnswer":0,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"hard","tags":["hbtqi","historia"],"explanation":"1944 blev det lagligt att vara homosexuell i Sverige. År 2003 fick homosexuella par rätt att adoptera barn och 2009 tillät Svenska kyrkan homosexuella att gifta sig i kyrkan."},
  {"id":54,"question":"Vad är ett hatbrott?","options":["Ett brott begånget i affekt","Näthat och trakasserier online","Ett brott mot en person för att de tillhör en viss grupp","Brott som begås av organiserade grupper"],"correctAnswer":2,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["diskriminering","brott"],"explanation":"Om någon begår ett brott mot en person för att de tillhör en viss grupp kallas det hatbrott. Gärningspersonen får ett strängare straff om brottet har ett hatbrottsmotiv."},
  {"id":55,"question":"Vad är hedersrelaterat våld?","options":["Våld i samband med sportevenemang","Brott begångna för att hämnas en förolämpning","När en familj eller grupp försöker kontrollera familjemedlemmars beteende med våld eller hot","Psykiska besvär orsakade av krig"],"correctAnswer":2,"chapter":7,"chapterName":"Mänskliga rättigheter","difficulty":"medium","tags":["jämställdhet","våld"],"explanation":"Hedersrelaterat våld innebär att en familj eller grupp försöker kontrollera hur människor inom familjen beter sig, med fysiskt våld, psykisk press eller sociala hot."},
  {"id":56,"question":"Hur stor andel av Sveriges arbetskraft arbetar inom privat sektor?","options":["Cirka 30 procent","Cirka 50 procent","Cirka 90 procent","Cirka 70 procent"],"correctAnswer":3,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"medium","tags":["arbetsmarknad","ekonomi"],"explanation":"Omkring 70 procent av alla som jobbar i Sverige arbetar inom den privata sektorn. Cirka 30 procent jobbar inom offentlig sektor."},
  {"id":57,"question":"Vad är ett kollektivavtal?","options":["Ett avtal om löner och arbetsvillkor som tecknas mellan fackförbund och arbetsgivare","En lag stiftad av riksdagen om löner","Ett avtal mellan stat och kommuner","En EU-förordning om arbetstider"],"correctAnswer":0,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"medium","tags":["arbetsmarknad","fackföreningar"],"explanation":"Kollektivavtal är avtal om löner och arbetsvillkor som tecknas mellan fackförbund och arbetsgivarorganisationer. I Sverige bestäms löner genom förhandlingar mellan parterna, inte av staten."},
  {"id":58,"question":"Vad är A-kassans syfte?","options":["Att betala ut barnbidrag","Att finansiera pensioner","Att finansiera sjukhusvård","Att ge ekonomiskt stöd till arbetslösa medlemmar"],"correctAnswer":3,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"easy","tags":["arbetsmarknad","försäkringar"],"explanation":"Arbetslöshetskassan (A-kassan) är en ekonomisk förening som betalar ut pengar till arbetslösa medlemmar. För att få ersättning måste man ha arbetat tillräckligt och vara aktivt arbetssökande."},
  {"id":59,"question":"Vad är LO?","options":["En myndighet som godkänner kollektivavtal","En statlig arbetsmarknadsmyndighet","En arbetsgivarorganisation för industrin","Landsorganisationen i Sverige – en av de största fackliga centralorganisationerna"],"correctAnswer":3,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"medium","tags":["arbetsmarknad","fackföreningar"],"explanation":"LO (Landsorganisationen i Sverige) är en av de tre största fackliga centralorganisationerna. De andra är TCO (Tjänstemännens centralorganisation) och SACO."},
  {"id":60,"question":"Vad gör Kronofogdemyndigheten?","options":["Kontrollerar skattedeklarationer","Ser till att skulder betalas och hjälper personer med stora skulder att få ordning på ekonomin","Godkänner lån från banker","Beslutar om bankräntor"],"correctAnswer":1,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"medium","tags":["privatekonomi","myndigheter"],"explanation":"Kronofogdemyndigheten är en statlig myndighet som ser till att skulder blir betalda. Myndigheten kan också hjälpa personer med stora skulder via skuldsanering."},
  {"id":61,"question":"Vad innebär att arbeta svart?","options":["Att arbeta nattskift","Att arbeta utan kollektivavtal","Att arbeta utan att betala skatt, vilket är olagligt","Att arbeta övertid utan betalning"],"correctAnswer":2,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"easy","tags":["arbetsmarknad","skatt"],"explanation":"Alla som arbetar betalar skatt på sin lön. Det är olagligt att arbeta utan att betala skatt – det kallas att arbeta svart."},
  {"id":62,"question":"Vad representerar Svenskt näringsliv?","options":["Privata företag på arbetsmarknaden","Fackföreningarnas intressen","Offentliga arbetsgivare","Statens intressen i löneförhandlingar"],"correctAnswer":0,"chapter":8,"chapterName":"Arbetsmarknad och privatekonomi","difficulty":"hard","tags":["arbetsmarknad","organisationer"],"explanation":"Svenskt näringsliv är den största arbetsgivarorganisationen och representerar privata företag. Arbetsgivarverket och SKR representerar offentliga arbetsplatser."},
  {"id":63,"question":"Vad är moms?","options":["En skatt på inkomst","En skatt (mervärdesskatt) på varor och tjänster","En avgift för sjukvård","En kommunal fastighetsskatt"],"correctAnswer":1,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"easy","tags":["skatter","ekonomi"],"explanation":"Moms (mervärdesskatt) är en skatt man betalar när man köper varor och tjänster. Det är en av de viktigaste inkomstkällorna för staten."},
  {"id":64,"question":"Vad finansierar staten inom välfärden?","options":["Skola och äldreomsorg","Vatten och avlopp","Pensioner, sjukförsäkring, föräldraförsäkring och barnbidrag","Sjukhus och vårdcentraler"],"correctAnswer":2,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"medium","tags":["välfärd","försäkringar"],"explanation":"Staten finansierar bland annat pensioner, sjukförsäkring, föräldraförsäkring, arbetslöshetsförsäkring, studiestöd och barnbidrag."},
  {"id":65,"question":"Vilket är kommunernas ansvar inom välfärden?","options":["Sjukvård och högre utbildning","Kollektivtrafik och länsmuseer","Pensioner och sjukförsäkring","Barnomsorg, grundskola och äldreomsorg"],"correctAnswer":3,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"medium","tags":["kommuner","välfärd"],"explanation":"Kommunerna ansvarar för barnomsorg (förskola, fritidshem), skola och utbildning samt äldreomsorg. Det är alltså kommunen – inte regionen eller staten – som driver dessa verksamheter."},
  {"id":66,"question":"Vad är primärvård?","options":["Vårdcentraler och barnavårds- och mödravårdscentraler","Specialistmottagningar på sjukhus","Akutsjukhus och universitetssjukhus","Psykiatrisk vård och rehabilitering"],"correctAnswer":0,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"medium","tags":["sjukvård","välfärd"],"explanation":"Primärvård är den närmaste vården för invånarna och inkluderar vårdcentraler, barnavårds- och mödravårdscentraler. Det är dit man vänder sig i första hand."},
  {"id":67,"question":"Vad är socialtjänstens uppgift i kommunen?","options":["Att bygga bostäder","Att bedriva sjukvård","Att ge stöd och skydd till de som behöver det, till exempel familjer utan pengar eller personer utsatta för våld","Att driva skolor"],"correctAnswer":2,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"easy","tags":["kommuner","socialtjänst"],"explanation":"I varje kommun finns en socialtjänst som ansvarar för att de som behöver får stöd och skydd – det kan gälla familjer utan pengar, hemlösa, personer med missbruksproblem eller utsatta för våld."},
  {"id":68,"question":"Vem betalar arbetsgivaravgifter?","options":["Den anställde drar av dem från lönen","Fackförbunden administrerar dem","Arbetsgivaren betalar dem till staten utöver de anställdas löner","Staten betalar dem direkt till pensionsfonden"],"correctAnswer":2,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"medium","tags":["skatter","arbetsmarknad"],"explanation":"Arbetsgivare betalar avgifter till staten för sina anställda, utöver deras löner. Pengarna går bland annat till sjukförsäkring och pensioner."},
  {"id":69,"question":"Vem ansvarar för kollektivtrafiken i Sverige?","options":["Kommunerna","Regionerna","Privata trafikbolag utan statligt uppdrag","Staten"],"correctAnswer":1,"chapter":9,"chapterName":"Välfärdssamhället","difficulty":"medium","tags":["regioner","välfärd"],"explanation":"Regionerna ser till att det finns kollektivtrafik som bussar, spårvagnar och tunnelbanor. De ansvarar alltså för kollektivtrafiken inom sin region."},
  {"id":70,"question":"Vilket år fick både män och kvinnor rösta i riksdagsvalet för första gången?","options":["1921","1909","1918","1931"],"correctAnswer":0,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"medium","tags":["historia","demokrati","rösträtt"],"explanation":"1921 genomfördes det första riksdagsvalet där både män och kvinnor fick rösta och där kvinnor kunde bli riksdagsledamöter. Därmed hade Sverige blivit en demokrati."},
  {"id":71,"question":"Vad var Saltsjöbadsavtalet?","options":["En fredsöverenskommelse efter andra världskriget","En ny grundlag om arbetsrätt","Ett avtal 1938 mellan arbetsgivare och fackförbund som lade grunden för den svenska modellen","Ett handelsavtal med Norge"],"correctAnswer":2,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"hard","tags":["historia","arbetsmarknad"],"explanation":"År 1938 slöts Saltsjöbadsavtalet mellan arbetsgivare och fackförbund. Det lade grunden för den svenska modellen där parterna – inte politikerna – kommer överens om arbetsmarknadens villkor."},
  {"id":72,"question":"Vad var miljonprogrammet?","options":["Ett program för att locka invandrare till Sverige","Ett ekonomiskt stödprogram under kriget","En satsning under 1960-talet för att bygga en miljon bostäder på tio år","En utbildningssatsning för att få fler akademiker"],"correctAnswer":2,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"medium","tags":["historia","bostäder"],"explanation":"Under 1960-talet startade staten miljonprogrammet för att lösa bostadsbristen som uppstod när många flyttade till städerna. Målet var att bygga en miljon bostäder på tio år."},
  {"id":73,"question":"Under vilket krig höll sig Sverige neutralt och stod utanför striderna?","options":["Vietnamkriget och Gulfkriget","Finska vinterkriget och Koreakriget","Första och andra världskriget","Krimkriget och Napoleonkrigen"],"correctAnswer":2,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"easy","tags":["historia","krig"],"explanation":"Sverige förklarade sig neutralt under både första världskriget (1914–1918) och andra världskriget (1939–1945) och stod utanför de direkta striderna."},
  {"id":74,"question":"Vad var idén om folkhemmet?","options":["En idé formulerad 1928 om ett samhälle där alla skulle kunna känna trygghet och gemenskap","Ett bostadsprogram för fattiga","Att alla skulle ha rätt till ett eget hem","En nationalistisk rörelse på 1930-talet"],"correctAnswer":0,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"medium","tags":["historia","politik"],"explanation":"1928 formulerade socialdemokraternas partiledare Per Albin Hansson idén om folkhemmet – ett samhälle där alla skulle kunna känna trygghet och gemenskap oavsett bakgrund."},
  {"id":75,"question":"Vem var Raoul Wallenberg?","options":["Chefen för svenska Röda Korset under kriget","En general i svenska armén","En svensk statsminister under andra världskriget","En svensk diplomat som räddade judars liv under förintelsen genom att ge dem skyddspass"],"correctAnswer":3,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"medium","tags":["historia","andra världskriget"],"explanation":"Raoul Wallenberg var en svensk diplomat som under förintelsen gav judar skyddspass – papper som visade att de var under svenskt skydd och inte kunde skickas till koncentrationsläger."},
  {"id":76,"question":"Vad kallas perioden efter andra världskriget då Sverige hade stark ekonomisk tillväxt och låg arbetslöshet?","options":["Industriåldern","Välfärdsdekaderna","Folkhemsepoken","Rekordåren"],"correctAnswer":3,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"medium","tags":["historia","ekonomi"],"explanation":"Perioden efter andra världskriget med stark ekonomisk tillväxt och låg arbetslöshet kallas för de svenska rekordåren. Socialdemokraterna hade oftast regeringsmakten under hela denna tid, från 1945 till 1976."},
  {"id":77,"question":"Ungefär hur många svenskar utvandrade till USA mellan 1850 och 1920?","options":["Cirka 500 000","Nästan tre miljoner","Över en miljon","Cirka 100 000"],"correctAnswer":2,"chapter":10,"chapterName":"Sveriges moderna historia","difficulty":"hard","tags":["historia","utvandring"],"explanation":"Över en miljon svenskar utvandrade till USA mellan 1850 och 1920 i hopp om ett bättre liv, eftersom Sverige vid den tiden var ett fattigt land med hög befolkningstillväxt."},
  {"id":78,"question":"Vilket år blev Sverige medlem i EU?","options":["1993","1991","1995","2000"],"correctAnswer":2,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"easy","tags":["EU","historia"],"explanation":"Sverige har varit medlem i EU (Europeiska unionen) sedan 1995."},
  {"id":79,"question":"Vad kallas de fyra friheterna inom EU?","options":["Fri rörlighet för personer, varor, tjänster och kapital","Yttrandefrihet, rörelsefrihet, religionsfrihet och mötesfrihet","Fri handel, fri invandring, fri utbildning och fri sjukvård","Frihet från krig, hunger, fattigdom och förtryck"],"correctAnswer":0,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"medium","tags":["EU","frihet"],"explanation":"EU:s fyra friheter innebär fri rörlighet för personer, varor, tjänster och kapital mellan medlemsländerna. Det betyder att EU-medborgare kan arbeta eller studera i ett annat EU-land."},
  {"id":80,"question":"Vilket år blev Sverige medlem i NATO?","options":["2023","2024","2022","2025"],"correctAnswer":1,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"medium","tags":["NATO","försvar","historia"],"explanation":"Sverige och Finland ansökte om NATO-medlemskap efter att Ryssland angrep Ukraina 2022. Sverige blev formellt medlem i NATO år 2024."},
  {"id":81,"question":"Vad är Sidas uppgift?","options":["Att minska fattigdom och förtryck i världen genom internationellt utvecklingssamarbete","Att rekrytera personal till FN","Att administrera Sveriges EU-bidrag","Att förvalta Sveriges utlandsskulder"],"correctAnswer":0,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"medium","tags":["internationellt","bistånd"],"explanation":"Sida (Styrelsen för internationellt utvecklingssamarbete) är en statlig myndighet som arbetar för att minska fattigdom och förtryck i världen."},
  {"id":82,"question":"Vad innebär totalförsvarsplikt i Sverige?","options":["Att man betalar en extra försvarsskatt","Att alla som bor i Sverige mellan 16 och 70 år kan bli tvungna att hjälpa till att försvara landet","Att alla medborgare måste göra militärtjänst","Att varje vuxen ska delta i civila beredskapskurser"],"correctAnswer":1,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"medium","tags":["försvar","lag"],"explanation":"Alla som bor i Sverige och är mellan 16 och 70 år kan bli tvungna att hjälpa till att försvara landet om det behövs – det kallas för totalförsvarsplikt."},
  {"id":83,"question":"Vilket krig ledde till att Sverige förlorade Finland?","options":["Dansk-svenska kriget 1700","Napoleonkrigen 1813","Trettioåriga kriget","Kriget mot Ryssland 1808–1809"],"correctAnswer":3,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"hard","tags":["historia","krig","Finland"],"explanation":"I kriget mot Ryssland 1808–1809 förlorade Sverige Finland, som hade varit en del av Sverige under nästan 700 år."},
  {"id":84,"question":"Vad är Europarådet?","options":["NATO:s politiska organ","EU:s ministerråd","FN:s europeiska avdelning","En europeisk organisation grundad 1949 som arbetar för mänskliga rättigheter, demokrati och rättsstaten"],"correctAnswer":3,"chapter":11,"chapterName":"Sverige och omvärlden","difficulty":"hard","tags":["Europa","mänskliga rättigheter"],"explanation":"Europarådet är en europeisk organisation som bildades 1949 och arbetar för mänskliga rättigheter, demokrati och rättsstatens principer. Där finns Europeiska domstolen för de mänskliga rättigheterna."},
  {"id":85,"question":"Vad innebär att Sverige är en sekulär stat?","options":["Att religion är förbjuden","Att kyrkan styr staten","Att staten är religiöst neutral och inte tar ställning för eller diskriminerar någon religion","Att bara kristendom är tillåten"],"correctAnswer":2,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"easy","tags":["religion","stat"],"explanation":"Sverige är en sekulär stat, vilket innebär att staten är religiöst neutral och inte tar ställning för eller diskriminerar någon religion. Alla har rätt att fritt välja sin tro."},
  {"id":86,"question":"Vilket år skildes staten och Svenska kyrkan åt?","options":["1951","2000","2010","1975"],"correctAnswer":1,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"medium","tags":["religion","historia"],"explanation":"År 2000 skildes staten och Svenska kyrkan åt. Svenska kyrkan blev ett av flera trossamfund i samhället, men är fortfarande det största kristna samfundet i Sverige."},
  {"id":87,"question":"När kom religionsfrihetslagen i Sverige?","options":["1951","1860","1921","1975"],"correctAnswer":0,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"hard","tags":["religion","historia","lag"],"explanation":"Religionsfrihetslagen kom 1951 och gjorde det möjligt för människor att helt fritt välja religion eller att inte tillhöra någon religion alls."},
  {"id":88,"question":"Vilken är den näst största religionen i Sverige?","options":["Judendom","Islam","Buddhism","Hinduism"],"correctAnswer":1,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"medium","tags":["religion"],"explanation":"Islam är den näst största religionen i Sverige. Antalet muslimer har ökat genom invandring, framför allt efter andra världskriget. Under 1970-talet byggdes de första moskéerna."},
  {"id":89,"question":"Ungefär hur många medlemmar har Svenska kyrkan?","options":["En miljon","Fem miljoner","Tre miljoner","Sju miljoner"],"correctAnswer":1,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"medium","tags":["religion","kristendom"],"explanation":"Svenska kyrkan har omkring fem miljoner medlemmar och är det största kristna samfundet i Sverige, med historiska rötter i den lutherska, protestantiska traditionen."},
  {"id":90,"question":"Vilket år fick judar fullständiga medborgerliga rättigheter i Sverige?","options":["1838","1910","1780","1870"],"correctAnswer":3,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"hard","tags":["religion","historia","judendom"],"explanation":"Antisemitismen var länge utbredd i Europa och det var först 1870 som judar fick fullständiga medborgerliga rättigheter i Sverige."},
  {"id":91,"question":"Vad garanterar regeringsformen gällande religion?","options":["Att alla har rätt att utöva sin religion och ingen får diskrimineras på grund av sin tro","Att religiösa skolor inte får statsbidrag","Att kristendom är statens officiella religion","Att religiösa symboler är förbjudna i offentliga miljöer"],"correctAnswer":0,"chapter":12,"chapterName":"En sekulär stat och ett mångreligiöst land","difficulty":"medium","tags":["religion","grundlagar"],"explanation":"Enligt regeringsformen har alla rätt att utöva sin religion och ingen får diskrimineras på grund av sin tro eller religiösa uppfattning."},
  {"id":92,"question":"När firas midsommarafton i Sverige?","options":["Den 21 juni varje år","Den 24 juni varje år","Första lördagen i juli","En fredag mellan 19 och 25 juni"],"correctAnswer":3,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"medium","tags":["traditioner","högtider"],"explanation":"Midsommarafton firas alltid på en fredag mellan 19 juni och 25 juni. Det är en gammal tradition som kommer från tiden före kristendomen."},
  {"id":93,"question":"Vad är Sveriges nationaldag och när firas den?","options":["Den 30 november – Anders dag","Den 6 juni – dagen då Gustav Vasa valdes till kung 1523","Den 24 december – julafton","Den 1 maj – arbetarnas dag"],"correctAnswer":1,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"easy","tags":["traditioner","nationaldag"],"explanation":"Sveriges nationaldag firas den 6 juni. Gustav Vasa valdes till svensk kung den 6 juni 1523, vilket har uppfattats som inledningen på den svenska statens självständighet."},
  {"id":94,"question":"Vilket datum firas Lucia?","options":["Den 13 december","Den 24 december","Den 21 december","Den 1 december"],"correctAnswer":0,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"easy","tags":["traditioner","lucia"],"explanation":"Lucia firas den 13 december. Firandet handlar om att sprida ljus när det är som mörkast på året. Det arrangeras luciatåg i skolor och på många andra ställen."},
  {"id":95,"question":"Vad äter man traditionellt på midsommar?","options":["Korv, potatisgratäng och mjölk","Köttbullar, lingon och rödbeta","Sill, färskpotatis och jordgubbar","Kräftor, bröd och aquavit"],"correctAnswer":2,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"easy","tags":["traditioner","midsommar","mat"],"explanation":"Vanlig mat under midsommar är sill, färskpotatis och jordgubbar. Det är en av Sveriges mest älskade mattraditoner."},
  {"id":96,"question":"Vad är Valborgsmässoafton och när firas den?","options":["En fest för att välkomna våren den 30 april med brasor och vårsånger","En kristen högtid som firas 40 dagar efter påsk","Nyårsafton enligt den gamla svenska kalendern","En högtid för att minnas de döda, firas 1 november"],"correctAnswer":0,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"medium","tags":["traditioner","valborg"],"explanation":"Valborgsmässoafton den 30 april firas för att välkomna våren. Stora brasor tänds på kvällen och man sjunger traditionella vårsånger."},
  {"id":97,"question":"Vilket persiskt/kurdiskt nyår firas i samband med vårdagjämningen?","options":["Nouruz och Newroz","Id al-fitr och Eid al-Adha","Diwali och Holi","Yom Kippur och Rosh Hashanah"],"correctAnswer":0,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"hard","tags":["traditioner","mångkultur"],"explanation":"Det persiska nyåret Nouruz och det kurdiska nyåret Newroz firas i samband med vårdagjämningen den 21 mars. De är exempel på traditioner som har kommit till Sverige med invandrare."},
  {"id":98,"question":"Vad är advent?","options":["En helg för att minnas Gustav Vasa","En svensk tradition för att välkomna sommaren","Påskens förberedelseperiod","De fyra söndagarna före juldagen den 25 december"],"correctAnswer":3,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"easy","tags":["traditioner","jul","advent"],"explanation":"Advent infaller de fyra söndagarna före juldagen den 25 december. Advent betyder ankomst och var traditionellt en förberedelseperiod inför julen."},
  {"id":99,"question":"Vad uppmärksammas på första maj i Sverige?","options":["Vårens ankomst med valborgseldarna","Sveriges nationaldag och självständighet","Arbetarnas dag – med demonstrationer arrangerade av arbetarrörelsen","Gustav Vasas val till kung"],"correctAnswer":2,"chapter":13,"chapterName":"Traditioner och högtider","difficulty":"easy","tags":["traditioner","första maj"],"explanation":"På första maj firas arbetarnas dag internationellt. Det är en helgdag i Sverige där arbetarrörelsen arrangerar demonstrationer och folk håller tal om sociala och politiska frågor."},
  {"id":100,"question":"Vilket är Sveriges statsskick?","options":["En federal stat med delstatsparlament","En konstitutionell monarki där kungen är statschef utan politisk makt","En parlamentarisk republik","En republik med vald president"],"correctAnswer":1,"chapter":3,"chapterName":"Så här styrs Sverige","difficulty":"easy","tags":["statsskick","monarki"],"explanation":"Sverige är en konstitutionell monarki. Det betyder att statschefen är en kung eller drottning som inte har någon politisk makt. Kungen fungerar som en symbol för Sverige."}
];

// ============================================================
// CORE ENGINE (Fas 2)
// ============================================================
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getQuestions({ chapters = null, difficulty = null, count = null, excludeIds = [] } = {}) {
  let filtered = ALL_QUESTIONS.filter(q => !excludeIds.includes(q.id));
  if (chapters?.length > 0) filtered = filtered.filter(q => chapters.includes(q.chapter));
  if (difficulty) filtered = filtered.filter(q => q.difficulty === difficulty);
  const shuffled = shuffle(filtered);
  return count ? shuffled.slice(0, count) : shuffled;
}

function getChapters() {
  const map = {};
  ALL_QUESTIONS.forEach(q => {
    if (!map[q.chapter]) map[q.chapter] = { id: q.chapter, name: q.chapterName, count: 0 };
    map[q.chapter].count++;
  });
  return Object.values(map).sort((a, b) => a.id - b.id);
}

function calculateScore(results) {
  const total = results.length;
  const score = results.filter(r => r.correct).length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  return { score, total, percentage, passed: percentage >= 70 };
}

function calculateChapterBreakdown(results) {
  const map = {};
  results.forEach(r => {
    const ch = r.question.chapter;
    if (!map[ch]) map[ch] = { chapter: ch, chapterName: r.question.chapterName, correct: 0, total: 0 };
    map[ch].total++;
    if (r.correct) map[ch].correct++;
  });
  return Object.values(map).map(c => ({ ...c, percentage: Math.round((c.correct / c.total) * 100) })).sort((a, b) => a.chapter - b.chapter);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function getLevelColor(pct) {
  if (pct === null || pct === undefined) return "#64748b";
  if (pct >= 80) return "#22c55e";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
}

function getLevelLabel(pct) {
  if (pct === null || pct === undefined) return "Ej övad";
  if (pct >= 80) return "Stark";
  if (pct >= 50) return "Medel";
  return "Svag";
}

// ============================================================
// STORAGE HELPERS – localStorage
// ============================================================
const KEYS = {
  history:   "mbp_history",
  errorBank: "mbp_error_bank",
  streak:    "mbp_streak",
  onboarded: "mbp_onboarded",
  xp:        "mbp_xp",
  name:      "mbp_user_name",
};

function saveHistory(record) {
  const hist = loadHistory();
  hist.unshift(record);
  localStorage.setItem(KEYS.history, JSON.stringify(hist));
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(KEYS.history) || "[]"); }
  catch { return []; }
}

function saveErrorBank(eb) {
  localStorage.setItem(KEYS.errorBank, JSON.stringify(eb));
}

function loadErrorBank() {
  try { return JSON.parse(localStorage.getItem(KEYS.errorBank) || "{}"); }
  catch { return {}; }
}

function loadOnboarded() {
  return localStorage.getItem(KEYS.onboarded) === "true";
}
function loadUserName() { return localStorage.getItem(KEYS.name) || ""; }
function saveUserName(n) { if (n) localStorage.setItem(KEYS.name, n); }

function markOnboarded() {
  localStorage.setItem(KEYS.onboarded, "true");
}

function loadStreak() {
  try { return JSON.parse(localStorage.getItem(KEYS.streak) || '{"current":0,"longest":0,"lastDate":null}'); }
  catch { return { current: 0, longest: 0, lastDate: null }; }
}

function updateStreak() {
  const s = loadStreak();
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (s.lastDate === today) return s;
  if (s.lastDate === yesterday) s.current++;
  else s.current = 1;
  s.longest = Math.max(s.longest, s.current);
  s.lastDate = today;
  localStorage.setItem(KEYS.streak, JSON.stringify(s));
  return s;
}

function loadXP() {
  return parseInt(localStorage.getItem(KEYS.xp) || "0", 10) || 0;
}
function addXP(amount) {
  const next = loadXP() + amount;
  localStorage.setItem(KEYS.xp, next.toString());
  return next;
}
function getChapterProgress(errorBank) {
  const map = {};
  ALL_QUESTIONS.forEach(q => {
    if (!map[q.chapter]) map[q.chapter] = { id: q.chapter, name: q.chapterName, correct: 0, seen: 0 };
    const e = errorBank[q.id];
    if (e && e.timesSeen > 0) { map[q.chapter].correct += e.timesCorrect; map[q.chapter].seen += e.timesSeen; }
  });
  return Object.values(map).sort((a, b) => a.id - b.id).map(c => ({
    ...c, pct: c.seen > 0 ? Math.round((c.correct / c.seen) * 100) : null,
  }));
}

// ============================================================
// STYLES
// ============================================================
const C = {
  bg: "#F9F9FC",
  surface: "#FFFFFF",
  surfaceHover: "#F4F0FB",
  border: "#E0D8F0",
  primary: "#8876A8",
  primaryDark: "#391C41",
  gold: "#CE8252",
  green: "#16a34a",
  red: "#dc2626",
  amber: "#d97706",
  textPrimary: "#0C0221",
  textSecondary: "#5A4E78",
  textMuted: "#9E93B7",
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.textPrimary}; font-family: 'Inter', sans-serif; min-height: 100vh; }
  button { cursor: pointer; border: none; font-family: inherit; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes xpPop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.12); } 100% { transform: scale(1); opacity: 1; } }
  .ai-fade { animation: fadeIn 0.3s ease; }
`;

// ============================================================
// COMPONENTS
// ============================================================

function SverigeFlag({ size = 24 }) {
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 16 10" style={{ borderRadius: 2, flexShrink: 0 }}>
      <rect width="16" height="10" fill="#006AA7"/>
      <rect x="5" width="2" height="10" fill="#FECC02"/>
      <rect y="4" width="16" height="2" fill="#FECC02"/>
    </svg>
  );
}

function ProgressBar({ value, max, color = C.primary, height = 6 }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{ background: C.border, borderRadius: 99, overflow: "hidden", height }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.4s ease" }} />
    </div>
  );
}

function Badge({ children, color = C.primary }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: color + "22", color, border: `1px solid ${color}44`, letterSpacing: "0.03em" }}>
      {children}
    </span>
  );
}

function DifficultyBadge({ difficulty }) {
  const map = { easy: [C.green, "Lätt"], medium: [C.amber, "Medel"], hard: [C.red, "Svår"] };
  const [color, label] = map[difficulty] || [C.textMuted, difficulty];
  return <Badge color={color}>{label}</Badge>;
}

// ============================================================
// ONBOARDING VIEW
// ============================================================
function OnboardingView({ onDone }) {
  const [step, setStep] = useState(0);
  const [inputName, setInputName] = useState("");
  const steps = [
    {
      icon: "🇸🇪",
      title: "Välkommen till Medborgarprov",
      body: "Det här är din personliga studieapp för att klara medborgarskapsprovet. 100 frågor täcker allt du behöver kunna – från geografi till demokrati och traditioner.",
    },
    {
      icon: "📚",
      title: "Träna i ditt eget tempo",
      body: "Välj ett eller flera kapitel och öva på det du vill. Du får direkt feedback och förklaringar efter varje svar. Perfekt för att lära sig löpande.",
    },
    {
      icon: "📝",
      title: "Testa dig med ett prov",
      body: "Provläget ger dig 40 slumpmässiga frågor på 45 minuter – precis som det riktiga provet. Du behöver 70% rätt för att bli godkänd.",
    },
    {
      icon: "📊",
      title: "Följ dina framsteg",
      body: "Din dashboard visar alla prov du gjort, kapitel du är stark eller svag i, och hur din kunskapsnivå utvecklas över tid. All data sparas automatiskt.",
    },
  ];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: C.bg }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <SverigeFlag size={28} />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, color: C.textPrimary, letterSpacing: "-0.02em" }}>Medborgarprov</span>
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 36 }}>
          <div style={{ fontSize: 52, textAlign: "center", marginBottom: 24 }}>{current.icon}</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, color: C.textPrimary, marginBottom: 12, textAlign: "center", lineHeight: 1.2 }}>{current.title}</h2>
          <p style={{ color: C.textSecondary, lineHeight: 1.7, textAlign: "center", fontSize: 15 }}>{current.body}</p>

          {isLast && (
            <div style={{ marginTop: 24 }}>
              <input
                type="text"
                placeholder="Ditt förnamn"
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && inputName.trim()) { saveUserName(inputName.trim()); markOnboarded(); onDone(inputName.trim()); } }}
                style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 15, color: C.textPrimary, background: C.bg, outline: "none", boxSizing: "border-box" }}
                autoFocus
              />
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "28px 0" }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 99, background: i === step ? C.primary : C.border, transition: "all 0.3s" }} />
            ))}
          </div>

          <button
            onClick={() => { if (isLast) { saveUserName(inputName.trim()); markOnboarded(); onDone(inputName.trim()); } else setStep(s => s + 1); }}
            style={{ width: "100%", padding: "14px", background: C.primary, color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, transition: "opacity 0.2s" }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            {isLast ? "Sätt igång →" : "Nästa →"}
          </button>

          {!isLast && (
            <button onClick={() => { markOnboarded(); onDone(); }} style={{ width: "100%", marginTop: 10, padding: "10px", background: "transparent", color: C.textMuted, fontSize: 13 }}>
              Hoppa över
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOME VIEW
// ============================================================
function HomeView({ onStartPractice, onStartExam, onDashboard, onErrorBank, onStudy, streak, history, errorBank, totalXP, userName }) {
  const lastExam = history[0];
  const totalDone = history.length;
  const weakCount = Object.values(errorBank).filter(e => e.timesSeen > 0 && (e.timesCorrect / e.timesSeen) < 0.7).length;

  // Overall readiness from errorBank
  const allEntries = Object.values(errorBank).filter(e => e.timesSeen > 0);
  const totalSeen = allEntries.reduce((s, e) => s + e.timesSeen, 0);
  const totalCorrect = allEntries.reduce((s, e) => s + e.timesCorrect, 0);
  const readiness = totalSeen > 0 ? Math.round((totalCorrect / totalSeen) * 100) : 0;

  // SVG ring
  const R = 54;
  const circ = parseFloat((2 * Math.PI * R).toFixed(1));
  const ringOffset = totalSeen > 0 ? parseFloat(((1 - readiness / 100) * circ).toFixed(1)) : circ;
  const ringColor = totalSeen === 0 ? C.border : getLevelColor(readiness);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: C.bg }}>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>

        {/* Header */}
        <div style={{ padding: "28px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: C.textMuted }}>God morgon</div>
            {userName && <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, color: C.textPrimary }}>{userName}</div>}
          </div>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.primary + "20", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: C.primary, border: `1.5px solid ${C.primary}40` }}>
            {userName ? userName[0].toUpperCase() : "🇸🇪"}
          </div>
        </div>

        {/* Progress Ring */}
        <div style={{ display: "flex", justifyContent: "center", padding: "28px 24px 8px" }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={R} fill="none" stroke={C.border} strokeWidth="11" />
              <circle cx="70" cy="70" r={R} fill="none" stroke={ringColor} strokeWidth="11"
                strokeDasharray={circ} strokeDashoffset={ringOffset}
                strokeLinecap="round" transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.4s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 30, color: C.textPrimary, lineHeight: 1 }}>
                {totalSeen > 0 ? `${readiness}%` : "–"}
              </div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                {totalSeen > 0 ? "träffsäkerhet" : "börja öva"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", gap: 8, padding: "8px 24px 24px" }}>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: C.primary }}>{totalDone}</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>prov</div>
          </div>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: C.gold }}>{streak.current > 0 ? `${streak.current}d` : "–"}</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>streak</div>
          </div>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: C.gold }}>{totalXP}</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>XP</div>
          </div>
          {lastExam && (
            <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: getLevelColor(lastExam.percentage) }}>{lastExam.percentage}%</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>senast</div>
            </div>
          )}
        </div>

        {/* 2×2 Action grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 24px" }}>
          <button
            onClick={onStartPractice}
            style={{ background: C.primary, borderRadius: 20, padding: "20px 16px", textAlign: "left", border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.87"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>📚</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: "#fff", marginBottom: 4 }}>Träna</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Välj kapitel</div>
          </button>
          <button
            onClick={onStartExam}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 16px", textAlign: "left", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
            onMouseLeave={e => e.currentTarget.style.background = C.surface}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>📝</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: C.textPrimary, marginBottom: 4 }}>Ta prov</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>40 frågor · 45 min</div>
          </button>
          <button
            onClick={onErrorBank}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 16px", textAlign: "left", cursor: "pointer", transition: "background 0.15s", position: "relative" }}
            onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
            onMouseLeave={e => e.currentTarget.style.background = C.surface}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>🎯</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: C.textPrimary, marginBottom: 4 }}>Felbank</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{weakCount > 0 ? `${weakCount} svaga frågor` : "Öva för att fylla på"}</div>
            {weakCount > 0 && (
              <div style={{ position: "absolute", top: 14, right: 14, background: C.red, color: "#fff", borderRadius: 99, fontSize: 10, fontWeight: 700, padding: "2px 7px" }}>{weakCount}</div>
            )}
          </button>
          <button
            onClick={onStudy}
            style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "20px 16px", textAlign: "left", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.surfaceHover}
            onMouseLeave={e => e.currentTarget.style.background = C.surface}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>📘</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: C.textPrimary, marginBottom: 4 }}>Studera</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>Lyssna · PDF</div>
          </button>
        </div>

        {/* Info banner */}
        <div style={{ margin: "16px 24px 0", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>📅</span>
          <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.55 }}>
            Riktiga provet startar <strong style={{ color: C.green }}>augusti 2026</strong> – anmäl via UHR när du fått anvisningsbrev från Migrationsverket.
          </div>
        </div>


      </div>

      {/* Bottom nav */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "10px 0 28px", display: "flex", justifyContent: "space-around", flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 8px" }}>
          <span style={{ fontSize: 20 }}>🏠</span>
          <span style={{ fontSize: 9, color: C.primary, fontWeight: 700 }}>Hem</span>
        </div>
        <button
          onClick={onStudy}
          style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 8px", cursor: "pointer" }}
        >
          <span style={{ fontSize: 20 }}>📘</span>
          <span style={{ fontSize: 9, color: C.textMuted }}>Studera</span>
        </button>
        <button
          onClick={onDashboard}
          style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 8px", cursor: "pointer" }}
        >
          <span style={{ fontSize: 20 }}>📊</span>
          <span style={{ fontSize: 9, color: C.textMuted }}>Stats</span>
        </button>
        <button
          onClick={onErrorBank}
          style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "0 8px", cursor: "pointer" }}
        >
          <span style={{ fontSize: 20 }}>🎯</span>
          <span style={{ fontSize: 9, color: C.textMuted }}>Felbank</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PRACTICE SETUP VIEW (Fas 4 – med kunskapsnivåer & antal-väljare)
// ============================================================
function PracticeSetupView({ onStart, onBack, errorBank }) {
  const chapters = getChapters();
  const [selected, setSelected] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const available = getQuestions({ chapters: selected.length > 0 ? selected : null, difficulty }).length;
  const finalCount = Math.min(questionCount, available);

  // Beräkna kunskapsnivå per kapitel från errorBank
  const chapterLevel = {};
  chapters.forEach(ch => {
    const chQs = ALL_QUESTIONS.filter(q => q.chapter === ch.id);
    let seen = 0, correct = 0;
    chQs.forEach(q => {
      const e = errorBank[q.id];
      if (e) { seen += e.timesSeen; correct += e.timesCorrect; }
    });
    chapterLevel[ch.id] = seen > 0 ? Math.round((correct / seen) * 100) : null;
  });

  return (
    <div style={{ minHeight: "100vh", padding: "24px 24px 40px" }}>
      <button onClick={onBack} style={{ background: "none", color: C.textSecondary, fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
        ← Tillbaka
      </button>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6 }}>Välj vad du vill öva på</h2>
      <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 24 }}>Välj kapitel och svårighetsgrad, eller öva på allt.</p>

      {/* Svårighetsgrad */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Svårighetsgrad</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[null, "easy", "medium", "hard"].map(d => {
            const labels = { null: "Alla", easy: "Lätt", medium: "Medel", hard: "Svår" };
            const colors = { null: C.primary, easy: C.green, medium: C.amber, hard: C.red };
            const active = difficulty === d;
            return (
              <button key={String(d)} onClick={() => setDifficulty(d)}
                style={{ padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500, border: `1px solid ${active ? colors[d] : C.border}`, background: active ? colors[d] + "22" : C.surface, color: active ? colors[d] : C.textSecondary, transition: "all 0.15s" }}>
                {labels[d]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Antal frågor */}
      <div style={{ marginBottom: 20, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Antal frågor</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: C.primary }}>{finalCount}</div>
        </div>
        <input type="range" min={5} max={Math.min(40, available || 40)} value={questionCount}
          onChange={e => setQuestionCount(Number(e.target.value))}
          style={{ width: "100%", accentColor: C.primary, cursor: "pointer" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: C.textMuted }}>
          <span>5</span><span>{Math.min(40, available || 40)}</span>
        </div>
      </div>

      {/* Kapitel med kunskapsnivå */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Kapitel</div>
          <button onClick={() => setSelected([])} style={{ background: "none", color: C.primary, fontSize: 12 }}>
            {selected.length === 0 ? "Alla valda" : "Välj alla"}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {chapters.map(ch => {
            const active = selected.includes(ch.id);
            const pct = chapterLevel[ch.id];
            const levelColor = getLevelColor(pct);
            return (
              <button key={ch.id} onClick={() => toggle(ch.id)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: active ? C.primary + "15" : C.surface, border: `1px solid ${active ? C.primary : C.border}`, borderRadius: 12, textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: active ? C.primary : C.textPrimary, marginBottom: pct !== null ? 5 : 0 }}>
                    Kap {ch.id} – {ch.name}
                  </div>
                  {pct !== null && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ flex: 1, height: 3, background: C.border, borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: levelColor, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, color: levelColor, flexShrink: 0 }}>{pct}%</span>
                    </div>
                  )}
                  {pct === null && <div style={{ fontSize: 10, color: C.textMuted }}>Ej övad ännu</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 12 }}>
                  <span style={{ fontSize: 11, color: C.textMuted }}>{ch.count} fr.</span>
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${active ? C.primary : C.border}`, background: active ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", flexShrink: 0, transition: "all 0.15s" }}>
                    {active ? "✓" : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          const qs = getQuestions({ chapters: selected.length > 0 ? selected : null, difficulty, count: finalCount });
          onStart(qs);
        }}
        disabled={available === 0}
        style={{ width: "100%", padding: 16, background: available > 0 ? C.primary : C.border, color: "#fff", borderRadius: 14, fontSize: 15, fontWeight: 600, opacity: available > 0 ? 1 : 0.5 }}>
        Starta träning · {finalCount} frågor
      </button>
    </div>
  );
}

// ============================================================
// FAS 8 – AI-FUNKTIONER
// ============================================================

// Hook som anropar Claude API
function useAI() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function ask(prompt) {
    setLoading(true);
    setResponse(null);
    setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setResponse(text);
    } catch (e) {
      setError("Kunde inte hämta förklaring just nu.");
    } finally {
      setLoading(false);
    }
  }

  return { ask, loading, response, error, reset: () => { setResponse(null); setError(null); } };
}

// Komponent: "Förklara enklare"-knapp + svar
function AIExplainer({ question, context = "wrong" }) {
  const { ask, loading, response, error } = useAI();
  const [open, setOpen] = useState(false);

  const prompt = context === "wrong"
    ? `En person studerar för det svenska medborgarskapsprovet. De svarade fel på denna fråga:

Fråga: "${question.question}"
Rätt svar: "${question.options[question.correctAnswer]}"
Förklaring i kursmaterialet: "${question.explanation}"

Förklara svaret på ett ännu enklare och tydligare sätt på svenska. Använd gärna ett konkret exempel eller en enkel liknelse. Håll det kort – max 3–4 meningar.`
    : `En person studerar för det svenska medborgarskapsprovet och vill förstå mer om denna fråga:

Fråga: "${question.question}"
Rätt svar: "${question.options[question.correctAnswer]}"

Ge en lite djupare förklaring av ämnet på svenska. Max 4–5 meningar.`;

  function handleOpen() {
    setOpen(true);
    if (!response && !error) ask(prompt);
  }

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "transparent", border: `1px solid ${C.primary}50`, borderRadius: 10, color: C.primary, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = C.primary + "15"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <span style={{ fontSize: 14 }}>✨</span>
        {context === "wrong" ? "Förklara enklare" : "Fördjupa förklaringen"}
      </button>
    );
  }

  return (
    <div style={{ marginTop: 10, padding: 14, background: C.primary + "10", border: `1px solid ${C.primary}30`, borderRadius: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 12, fontWeight: 700, color: C.primary }}>
        <span>✨</span> AI-förklaring
      </div>
      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 13 }}>
          <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
          Genererar förklaring...
        </div>
      )}
      {error && <div style={{ color: C.red, fontSize: 13 }}>{error}</div>}
      {response && (
        <p className="ai-fade" style={{ color: C.textSecondary, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{response}</p>
      )}
    </div>
  );
}

// ============================================================
// QUIZ VIEW – Fas 4 (live-statistik i träningsläge, förbättrad UX)
// ============================================================
function QuizView({ questions, mode, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(mode === "exam" ? 45 * 60 : null);
  const [startTime] = useState(Date.now());
  const [showQuit, setShowQuit] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const intervalRef = useRef(null);
  const resultsRef = useRef([]);

  useEffect(() => {
    if (mode === "exam") {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            finishSession(resultsRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, []);

  const q = questions[idx];

  // Live stats for practice mode
  const liveCorrect = results.filter(r => r.correct).length;
  const liveAccuracy = results.length > 0 ? Math.round((liveCorrect / results.length) * 100) : null;

  function handleAnswer(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correctAnswer;
    if (correct && mode === "practice") setXpEarned(x => x + 10);
    const newResults = [...results, { question: q, selectedIndex: i, correct }];
    setResults(newResults);
    resultsRef.current = newResults;
    if (mode === "exam") {
      setTimeout(() => advance(newResults), 500);
    }
  }

  function advance(res) {
    const r = res ?? results;
    if (idx + 1 >= questions.length) {
      clearInterval(intervalRef.current);
      finishSession(r);
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function finishSession(res) {
    const score = calculateScore(res);
    const breakdown = calculateChapterBreakdown(res);
    const duration = Math.round((Date.now() - startTime) / 1000);
    onComplete({ results: res, score, breakdown, duration, mode, xpEarned });
  }

  const timerColor = timeLeft !== null && timeLeft < 300 ? C.red : C.textSecondary;
  const letters = ["A", "B", "C", "D"];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: `20px 20px ${answered && mode === "practice" ? 230 : 32}px` }}>

      {/* Quit confirm overlay */}
      {showQuit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28, maxWidth: 340, width: "100%" }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Avsluta sessionen?</h3>
            <p style={{ color: C.textSecondary, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
              {mode === "practice"
                ? `Du har svarat på ${results.length} av ${questions.length} frågor. Dina svar sparas inte om du avslutar nu.`
                : "Provet avslutas och ditt nuvarande resultat sparas."}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowQuit(false)} style={{ flex: 1, padding: 12, background: C.surface, border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: 12, fontSize: 14, fontWeight: 500 }}>Fortsätt</button>
              <button onClick={() => finishSession(results)} style={{ flex: 1, padding: 12, background: C.red, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>Avsluta</button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setShowQuit(true)} style={{ background: "none", color: C.textMuted, fontSize: 18, lineHeight: 1, padding: "4px 8px 4px 0" }}>✕</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {timeLeft !== null && (
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: timerColor, background: timerColor + "18", padding: "4px 10px", borderRadius: 8 }}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
          {mode === "practice" && liveAccuracy !== null && (
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: getLevelColor(liveAccuracy), background: getLevelColor(liveAccuracy) + "18", padding: "4px 10px", borderRadius: 8 }}>
              {liveAccuracy}% rätt
            </div>
          )}
        </div>
        <DifficultyBadge difficulty={q.difficulty} />
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <ProgressBar value={idx} max={questions.length} color={mode === "exam" ? C.primary : C.green} />
        </div>
        {mode === "practice" && xpEarned > 0 && (
          <div style={{ flexShrink: 0, background: C.gold + "22", border: `1px solid ${C.gold}44`, borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: C.gold }}>
            ⚡ {xpEarned} XP
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 11, color: C.textMuted }}>
        <span>{idx + 1} / {questions.length}</span>
        {mode === "practice" && results.length > 0 && (
          <span>{liveCorrect} rätt · {results.length - liveCorrect} fel</span>
        )}
      </div>

      {/* Chapter label */}
      <div style={{ marginBottom: 4, fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
        Kap {q.chapter} – {q.chapterName}
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 19, color: C.textPrimary, lineHeight: 1.4, marginBottom: 24, marginTop: 8 }}>
          {q.question}
        </h2>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctAnswer;
            const isSelected = i === selected;
            let bg = C.surface, border = C.border, color = C.textPrimary, icon = null;

            if (answered && mode === "practice") {
              if (isCorrect)       { bg = C.green + "18"; border = C.green; color = C.green; icon = "✓"; }
              else if (isSelected) { bg = C.red + "18";   border = C.red;   color = C.red;   icon = "✗"; }
            } else if (answered && mode === "exam" && isSelected) {
              bg = C.primary + "18"; border = C.primary;
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: 14, textAlign: "left", color, fontSize: 14, fontWeight: 500, lineHeight: 1.4, transition: "all 0.15s", opacity: answered && !isSelected && !isCorrect ? 0.45 : 1 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: border + "25", color: border, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: answered && icon && (isSelected || isCorrect) ? 14 : 12, flexShrink: 0, border: `1.5px solid ${border}`, transition: "all 0.15s" }}>
                  {answered && (isCorrect || isSelected) && icon ? icon : letters[i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Duolingo-style bottom sheet feedback (practice mode) */}
        {answered && mode === "practice" && (() => {
          const correct = selected === q.correctAnswer;
          return (
            <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, zIndex: 50, background: correct ? "#14532d" : "#7f1d1d", borderRadius: "20px 20px 0 0", padding: "22px 24px 36px", animation: "slideUp 0.25s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                  {correct ? "✓" : "✗"}
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>
                  {correct ? "Rätt!" : "Fel!"}
                </div>
                {correct && (
                  <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "3px 12px", fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    +10 XP
                  </div>
                )}
              </div>
              <p style={{ color: correct ? "#bbf7d0" : "#fecaca", fontSize: 13, lineHeight: 1.65, margin: "0 0 16px" }}>
                {q.explanation}
              </p>
              {!correct && <AIExplainer question={q} context="wrong" />}
              <button onClick={() => advance()} style={{ width: "100%", padding: 14, background: correct ? "#22c55e" : "#ef4444", color: "#fff", borderRadius: 14, fontSize: 15, fontWeight: 700, border: "none" }}>
                {idx + 1 >= questions.length ? "Se resultat →" : "Fortsätt →"}
              </button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ============================================================
// RESULT VIEW – Fas 4 (session analytics, svaga kapitel CTA)
// ============================================================
function ResultView({ session, onHome, onRetry, onDashboard, onPracticeWeak }) {
  const { score, breakdown, mode, duration, results } = session;
  const [showDetails, setShowDetails] = useState(false);

  const weakChapters = breakdown.filter(c => c.percentage < 60);
  const strongChapters = breakdown.filter(c => c.percentage >= 80);
  const missedQuestions = results.filter(r => !r.correct);

  return (
    <div style={{ minHeight: "100vh", padding: "28px 24px 48px" }}>

      {/* Result hero */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {session.xpEarned > 0 && (
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 90, height: 90, borderRadius: "50%", background: C.gold + "22", border: `3px solid ${C.gold}`, marginBottom: 14, animation: "xpPop 0.5s ease" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 26, color: C.gold, lineHeight: 1 }}>+{session.xpEarned}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.05em" }}>XP</div>
          </div>
        )}
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 26, color: C.textPrimary, marginBottom: 8 }}>
          {score.passed ? "FANTASTISKT!" : score.percentage >= 70 ? "NÄSTAN DÄR!" : score.percentage >= 50 ? "BRA JOBBAT!" : "KÄMPA PÅ!"}
        </div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 52, color: getLevelColor(score.percentage), lineHeight: 1, marginBottom: 6 }}>
          {score.percentage}%
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: score.passed ? C.green : C.red, marginBottom: 4 }}>
          {score.passed ? "Godkänt ✓" : "Inte godkänt ännu"}
        </div>
        <div style={{ color: C.textMuted, fontSize: 13 }}>
          {score.score} av {score.total} rätt · {formatTime(duration)}
        </div>
      </div>

      {/* Session analytics strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Rätt", value: score.score, color: C.green },
          { label: "Fel", value: score.total - score.score, color: C.red },
          { label: "Tid/fråga", value: `${Math.round(duration / score.total)}s`, color: C.primary },
        ].map(s => (
          <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weak chapters CTA */}
      {weakChapters.length > 0 && (
        <div style={{ background: C.amber + "12", border: `1px solid ${C.amber}30`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.amber, marginBottom: 4 }}>
            ⚠️ Öva mer på {weakChapters.length === 1 ? "detta kapitel" : "dessa kapitel"}
          </div>
          <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 12 }}>
            {weakChapters.map(c => `Kap ${c.chapter} (${c.percentage}%)`).join(" · ")}
          </div>
          <button onClick={onPracticeWeak} style={{ padding: "8px 16px", background: C.amber, color: "#000", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
            Träna på svaga kapitel →
          </button>
        </div>
      )}

      {/* Strong chapters callout */}
      {strongChapters.length > 0 && (
        <div style={{ background: C.green + "10", border: `1px solid ${C.green}25`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>
            ✓ Bra koll på: {strongChapters.map(c => `Kap ${c.chapter}`).join(", ")}
          </div>
        </div>
      )}

      {/* Chapter breakdown */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Resultat per kapitel</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {breakdown.map(ch => (
            <div key={ch.chapter}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: C.textSecondary }}>Kap {ch.chapter} – {ch.chapterName}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: getLevelColor(ch.percentage) }}>{ch.correct}/{ch.total}</span>
              </div>
              <ProgressBar value={ch.correct} max={ch.total} color={getLevelColor(ch.percentage)} height={5} />
            </div>
          ))}
        </div>
      </div>

      {/* Missed questions toggle */}
      {missedQuestions.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setShowDetails(s => !s)}
            style={{ width: "100%", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, color: C.textSecondary, fontSize: 13, fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Visa {missedQuestions.length} felaktiga svar</span>
            <span style={{ transition: "transform 0.2s", display: "inline-block", transform: showDetails ? "rotate(180deg)" : "none" }}>▾</span>
          </button>

          {showDetails && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {missedQuestions.map((r, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Kap {r.question.chapter}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 8, lineHeight: 1.4 }}>{r.question.question}</div>
                  <div style={{ fontSize: 12, color: C.red, marginBottom: 4 }}>
                    ✗ Ditt svar: {r.question.options[r.selectedIndex] ?? "Inget"}
                  </div>
                  <div style={{ fontSize: 12, color: C.green, marginBottom: 8 }}>
                    ✓ Rätt svar: {r.question.options[r.question.correctAnswer]}
                  </div>
                  <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, background: C.bg, borderRadius: 8, padding: "8px 10px" }}>
                    {r.question.explanation}
                  </div>
                  <AIExplainer question={r.question} context="wrong" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onRetry} style={{ padding: 14, background: C.primary, color: "#fff", borderRadius: 14, fontSize: 15, fontWeight: 600 }}>
          {mode === "exam" ? "Ta nytt prov" : "Träna igen"}
        </button>
        <button onClick={onDashboard} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: 14, fontSize: 15, fontWeight: 500 }}>
          📊 Se din dashboard
        </button>
        <button onClick={onHome} style={{ padding: 12, background: "none", color: C.textMuted, fontSize: 14 }}>
          ← Tillbaka till start
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SVG LINE CHART – provutveckling över tid
// ============================================================
function LineChart({ data, width = 320, height = 140 }) {
  if (!data || data.length < 2) return (
    <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, fontSize: 13 }}>
      Ta minst 2 prov för att se diagram
    </div>
  );

  const pad = { top: 16, right: 16, bottom: 28, left: 36 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  // Vänd ordning – äldst till vänster
  const pts = [...data].reverse();
  const vals = pts.map(p => p.percentage);
  const minV = Math.max(0, Math.min(...vals) - 10);
  const maxV = Math.min(100, Math.max(...vals) + 10);

  const x = (i) => pad.left + (i / (pts.length - 1)) * W;
  const y = (v) => pad.top + H - ((v - minV) / (maxV - minV)) * H;

  // Bygg polyline-path
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.percentage)}`).join(" ");
  // Fill area under kurvan
  const areaPath = `${linePath} L${x(pts.length - 1)},${pad.top + H} L${x(0)},${pad.top + H} Z`;

  // Y-axel labels (0, 50, 70, 100)
  const yLabels = [0, 50, 70, 100].filter(v => v >= minV && v <= maxV);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor={C.primary} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.primary} />
          <stop offset="100%" stopColor="#c7b5d6" />
        </linearGradient>
      </defs>

      {/* 70%-linje (godkäntgräns) */}
      {70 >= minV && 70 <= maxV && (
        <>
          <line x1={pad.left} y1={y(70)} x2={pad.left + W} y2={y(70)}
            stroke={C.green} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          <text x={pad.left + W + 4} y={y(70) + 4} fontSize="9" fill={C.green} opacity="0.7">70%</text>
        </>
      )}

      {/* Y-axel labels */}
      {yLabels.map(v => (
        <text key={v} x={pad.left - 6} y={y(v) + 4} fontSize="9" fill={C.textMuted} textAnchor="end">{v}</text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" />

      {/* Linje */}
      <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Datapunkter */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.percentage)} r="4" fill={getLevelColor(p.percentage)} stroke={C.bg} strokeWidth="2" />
          {/* Tooltip vid hover – enkel text ovanför */}
          <text x={x(i)} y={y(p.percentage) - 8} fontSize="9" fill={getLevelColor(p.percentage)} textAnchor="middle" fontWeight="700">
            {p.percentage}%
          </text>
        </g>
      ))}

      {/* X-axel labels – datum */}
      {pts.map((p, i) => {
        if (pts.length > 6 && i % 2 !== 0) return null;
        const d = new Date(p.date);
        const label = `${d.getDate()}/${d.getMonth() + 1}`;
        return (
          <text key={i} x={x(i)} y={height - 4} fontSize="9" fill={C.textMuted} textAnchor="middle">{label}</text>
        );
      })}
    </svg>
  );
}

// ============================================================
// SVG BAR CHART – kapitelresultat
// ============================================================
function BarChart({ data, width = 320, height = 160 }) {
  const visible = data.filter(d => d.pct !== null);
  if (visible.length === 0) return (
    <div style={{ height, display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, fontSize: 13 }}>
      Öva på kapitel för att se data
    </div>
  );

  const pad = { top: 12, right: 8, bottom: 24, left: 28 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;
  const barW = Math.max(8, W / data.length - 4);
  const gap = W / data.length;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      {/* 70%-linje */}
      <line x1={pad.left} y1={pad.top + H * 0.3} x2={pad.left + W} y2={pad.top + H * 0.3}
        stroke={C.green} strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
      <text x={pad.left - 4} y={pad.top + H * 0.3 + 4} fontSize="8" fill={C.green} opacity="0.6" textAnchor="end">70</text>

      {/* Y-labels */}
      {[0, 50, 100].map(v => (
        <text key={v} x={pad.left - 4} y={pad.top + H - (v / 100) * H + 4} fontSize="8" fill={C.textMuted} textAnchor="end">{v}</text>
      ))}

      {data.map((d, i) => {
        const barH = d.pct !== null ? (d.pct / 100) * H : 0;
        const bx = pad.left + i * gap + gap / 2 - barW / 2;
        const by = pad.top + H - barH;
        const color = d.pct !== null ? getLevelColor(d.pct) : C.border;

        return (
          <g key={d.chapter}>
            {/* Background bar */}
            <rect x={bx} y={pad.top} width={barW} height={H} rx="3" fill={C.border} opacity="0.2" />
            {/* Value bar */}
            {d.pct !== null && (
              <rect x={bx} y={by} width={barW} height={barH} rx="3" fill={color} opacity="0.85" />
            )}
            {/* X label */}
            <text x={bx + barW / 2} y={height - 6} fontSize="8" fill={C.textMuted} textAnchor="middle">{d.chapter}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================
// STREAK BADGE
// ============================================================
function StreakDisplay({ streak }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 28 }}>🔥</div>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, color: C.gold, lineHeight: 1 }}>
            {streak.current} {streak.current === 1 ? "dag" : "dagar"}
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Aktiv streak</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: C.textSecondary }}>{streak.longest}</div>
        <div style={{ fontSize: 11, color: C.textMuted }}>Längsta</div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD VIEW – Fas 7 (diagram + 3 tabs + streak)
// ============================================================
function DashboardView({ history, errorBank, streak, onBack, onPracticeWeak }) {
  const [tab, setTab] = useState("overview");

  // Beräkna kapitelstats från errorBank
  const chapterStats = (() => {
    const stats = {};
    ALL_QUESTIONS.forEach(q => {
      if (!stats[q.chapter]) stats[q.chapter] = { chapter: q.chapter, name: q.chapterName, seen: 0, correct: 0, pct: null };
      const e = errorBank[q.id];
      if (e) { stats[q.chapter].seen += e.timesSeen; stats[q.chapter].correct += e.timesCorrect; }
    });
    return Object.values(stats).map(s => ({
      ...s,
      pct: s.seen > 0 ? Math.round((s.correct / s.seen) * 100) : null
    })).sort((a, b) => a.chapter - b.chapter);
  })();

  const examHistory = history.filter(h => h.mode === "exam");
  const allHistory = [...history].reverse(); // äldst först för diagram
  const weakChapters = chapterStats.filter(c => c.pct !== null && c.pct < 60);
  const avgScore = history.length > 0 ? Math.round(history.reduce((s, h) => s + h.percentage, 0) / history.length) : null;
  const bestScore = history.length > 0 ? Math.max(...history.map(h => h.percentage)) : null;
  const passRate = history.length > 0 ? Math.round((history.filter(h => h.passed).length / history.length) * 100) : null;

  const tabs = [
    ["overview", "Översikt"],
    ["history",  "Historik"],
    ["chapters", "Kapitel"],
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "24px 24px 48px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textSecondary, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}>←</button>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20 }}>Din dashboard</h2>
      </div>

      {/* KPI-kort */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Sessioner", value: history.length, color: C.primary },
          { label: "Snitt",    value: avgScore  != null ? `${avgScore}%`  : "–", color: getLevelColor(avgScore) },
          { label: "Bästa",   value: bestScore != null ? `${bestScore}%` : "–", color: getLevelColor(bestScore) },
          { label: "Klarat",  value: passRate  != null ? `${passRate}%`  : "–", color: C.green },
        ].map(card => (
          <div key={card.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 17, color: card.color, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 4, marginBottom: 20 }}>
        {tabs.map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{ flex: 1, padding: "8px 6px", borderRadius: 8, fontSize: 12, fontWeight: 500, background: tab === key ? C.primary : "transparent", color: tab === key ? "#fff" : C.textSecondary, transition: "all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── TAB: ÖVERSIKT ── */}
      {tab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Streak */}
          <StreakDisplay streak={streak} />

          {/* Provutveckling diagram */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              Provutveckling över tid
            </div>
            {history.length < 2 ? (
              <div style={{ padding: "24px 0", textAlign: "center", color: C.textMuted, fontSize: 13 }}>
                Gör minst 2 sessioner för att se din kurva
              </div>
            ) : (
              <LineChart data={history} />
            )}
          </div>

          {/* Kapitel bar chart */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Kapitelöversikt
              </div>
              <div style={{ display: "flex", gap: 10, fontSize: 10, color: C.textMuted }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.green, display: "inline-block" }} />Stark</span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.amber, display: "inline-block" }} />Medel</span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.red, display: "inline-block" }} />Svag</span>
              </div>
            </div>
            <BarChart data={chapterStats} />
            <div style={{ fontSize: 10, color: C.textMuted, textAlign: "center", marginTop: 4 }}>Kapitel (1–13)</div>
          </div>

          {/* Svaga kapitel CTA */}
          {weakChapters.length > 0 && (
            <div style={{ background: C.red + "12", border: `1px solid ${C.red}30`, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 6 }}>
                ⚠️ {weakChapters.length} {weakChapters.length === 1 ? "kapitel" : "kapitel"} under 60%
              </div>
              <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 12, lineHeight: 1.5 }}>
                {weakChapters.map(c => `Kap ${c.chapter} – ${c.name}`).join(", ")}
              </div>
              <button onClick={onPracticeWeak}
                style={{ padding: "9px 16px", background: C.red, color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                Öva på svaga kapitel →
              </button>
            </div>
          )}
          {weakChapters.length === 0 && chapterStats.some(c => c.pct !== null) && (
            <div style={{ background: C.green + "10", border: `1px solid ${C.green}25`, borderRadius: 14, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>🎯</div>
              <div style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>Inga svaga kapitel – bra jobbat!</div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: HISTORIK ── */}
      {tab === "history" && (
        <div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: C.textMuted }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📝</div>
              <div style={{ fontSize: 14 }}>Inga sessioner än. Börja träna eller ta ett prov!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {history.map((h, i) => (
                <div key={h.id || i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 5 }}>
                        {new Date(h.date).toLocaleDateString("sv-SE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Badge color={h.mode === "exam" ? C.primary : C.amber}>{h.mode === "exam" ? "Prov" : "Träning"}</Badge>
                        <Badge color={h.passed ? C.green : C.red}>{h.passed ? "Godkänt" : "Ej godkänt"}</Badge>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 30, color: getLevelColor(h.percentage), lineHeight: 1 }}>
                      {h.percentage}%
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: C.textMuted }}>
                    <span>{h.score} av {h.total} rätt</span>
                    <span>⏱ {formatTime(h.duration)}</span>
                  </div>
                  <ProgressBar value={h.score} max={h.total} color={getLevelColor(h.percentage)} height={4} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: KAPITEL ── */}
      {tab === "chapters" && (
        <div>
          {/* Radar-liknande kapitelrad */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
              Kapiteldiagram
            </div>
            <BarChart data={chapterStats} height={180} />
            <div style={{ fontSize: 10, color: C.textMuted, textAlign: "center", marginTop: 4 }}>Kapitel 1–13 · Streckat = 70%-gräns</div>
          </div>

          {/* Kapitellista */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {chapterStats.map(ch => (
              <div key={ch.chapter} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ch.pct !== null ? 8 : 0 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 12, color: C.textMuted, marginRight: 6 }}>Kap {ch.chapter}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{ch.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                    {ch.pct !== null
                      ? <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: getLevelColor(ch.pct) }}>{ch.pct}%</span>
                      : <span style={{ fontSize: 11, color: C.textMuted }}>Ej övad</span>
                    }
                    <Badge color={getLevelColor(ch.pct)}>{getLevelLabel(ch.pct)}</Badge>
                  </div>
                </div>
                {ch.pct !== null && (
                  <ProgressBar value={ch.correct} max={ch.seen} color={getLevelColor(ch.pct)} height={4} />
                )}
              </div>
            ))}
          </div>

          {weakChapters.length > 0 && (
            <button onClick={onPracticeWeak}
              style={{ marginTop: 16, width: "100%", padding: 14, background: C.red, color: "#fff", borderRadius: 14, fontSize: 14, fontWeight: 700 }}>
              Öva på {weakChapters.length} svaga {weakChapters.length === 1 ? "kapitel" : "kapitel"} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// EXAM SETUP VIEW – Fas 5
// ============================================================
function ExamSetupView({ onStart, onBack, history }) {
  const examHistory = history.filter(h => h.mode === "exam");
  const bestScore = examHistory.length > 0 ? Math.max(...examHistory.map(h => h.percentage)) : null;
  const lastExam = examHistory[0] ?? null;
  const [ready, setReady] = useState(false);

  const rules = [
    { icon: "📋", text: "40 slumpmässiga frågor från alla 13 kapitel" },
    { icon: "⏱", text: "45 minuter på dig – provet skickas in automatiskt" },
    { icon: "🔒", text: "Ingen feedback under provet – du ser svaren efteråt" },
    { icon: "✅", text: "70% rätt (28 av 40) krävs för godkänt" },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "24px 24px 40px" }}>
      <button onClick={onBack} style={{ background: "none", color: C.textSecondary, fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
        ← Tillbaka
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, color: C.textPrimary, marginBottom: 6 }}>
          Medborgarskapsprov
        </div>
        <p style={{ color: C.textSecondary, fontSize: 14, lineHeight: 1.6 }}>
          Simulera det riktiga provet under realistiska förhållanden.
        </p>
      </div>

      {/* Previous scores */}
      {examHistory.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "Försök", value: examHistory.length, color: C.primary },
            { label: "Bästa", value: `${bestScore}%`, color: getLevelColor(bestScore) },
            { label: "Senaste", value: `${lastExam.percentage}%`, color: getLevelColor(lastExam.percentage) },
          ].map(s => (
            <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Rules */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Provregler</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rules.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{r.icon}</span>
              <span style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm checkbox */}
      <button
        onClick={() => setReady(r => !r)}
        style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", background: ready ? C.primary + "15" : C.surface, border: `1.5px solid ${ready ? C.primary : C.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 20, textAlign: "left", transition: "all 0.2s" }}
      >
        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${ready ? C.primary : C.border}`, background: ready ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
          {ready && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
        </div>
        <span style={{ fontSize: 14, color: ready ? C.textPrimary : C.textSecondary, lineHeight: 1.4 }}>
          Jag förstår reglerna och är redo att börja
        </span>
      </button>

      <button
        onClick={onStart}
        disabled={!ready}
        style={{ width: "100%", padding: 16, background: ready ? C.primary : C.border, color: "#fff", borderRadius: 14, fontSize: 16, fontWeight: 700, opacity: ready ? 1 : 0.5, transition: "all 0.2s", letterSpacing: "0.01em" }}
      >
        Starta provet →
      </button>
    </div>
  );
}

// ============================================================
// EXAM RESULT VIEW – Fas 5 (certifikatskänsla + detaljerad analys)
// ============================================================
function ExamResultView({ session, onRetry, onHome, onDashboard, onPracticeWeak }) {
  const { score, breakdown, duration, results } = session;
  const [showMissed, setShowMissed] = useState(false);
  const missedQuestions = results.filter(r => !r.correct);
  const weakChapters = breakdown.filter(c => c.percentage < 60);
  const strongChapters = breakdown.filter(c => c.percentage >= 80);

  return (
    <div style={{ minHeight: "100vh", padding: "28px 24px 48px" }}>

      {/* Certificate card */}
      <div style={{
        background: score.passed
          ? `linear-gradient(135deg, #f0fdf4 0%, #f9f9fc 100%)`
          : `linear-gradient(135deg, #fff5f5 0%, #f9f9fc 100%)`,
        border: `1.5px solid ${score.passed ? C.green + "50" : C.red + "50"}`,
        borderRadius: 20,
        padding: 28,
        textAlign: "center",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: score.passed ? C.green : C.red, opacity: 0.07, borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, background: score.passed ? C.green : C.red, opacity: 0.05, borderRadius: "50%" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>{score.passed ? "🏆" : "📖"}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 52, color: score.passed ? C.green : C.red, lineHeight: 1 }}>
            {score.percentage}%
          </div>
          <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700, color: score.passed ? C.green : C.red }}>
            {score.passed ? "GODKÄNT" : "EJ GODKÄNT"}
          </div>
          <div style={{ marginTop: 8, color: C.textSecondary, fontSize: 13 }}>
            {score.score} av {score.total} rätt · {formatTime(duration)}
          </div>
          {score.passed && (
            <div style={{ marginTop: 14, fontSize: 13, color: C.green + "cc", lineHeight: 1.5 }}>
              Du klarade medborgarskapsprovet!
            </div>
          )}
          {!score.passed && (
            <div style={{ marginTop: 14, fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
              Du behövde {Math.ceil(score.total * 0.7) - score.score} fler rätt för att bli godkänd.
            </div>
          )}
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Rätt", value: score.score, color: C.green },
          { label: "Fel", value: score.total - score.score, color: C.red },
          { label: "Tid/fråga", value: `${Math.round(duration / score.total)}s`, color: C.primary },
        ].map(s => (
          <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weak chapter CTA */}
      {weakChapters.length > 0 && (
        <div style={{ background: C.amber + "12", border: `1px solid ${C.amber}35`, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.amber, marginBottom: 4 }}>
            ⚠️ Öva mer på {weakChapters.length === 1 ? "detta kapitel" : "dessa kapitel"}
          </div>
          <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 12 }}>
            {weakChapters.map(c => `Kap ${c.chapter} – ${c.chapterName} (${c.percentage}%)`).join("\n")}
          </div>
          <button onClick={onPracticeWeak} style={{ padding: "8px 16px", background: C.amber, color: "#000", borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
            Träna på svaga kapitel →
          </button>
        </div>
      )}

      {/* Chapter breakdown */}
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Kapitelresultat</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {breakdown.map(ch => (
            <div key={ch.chapter}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: C.textSecondary, flex: 1, marginRight: 8 }}>Kap {ch.chapter} – {ch.chapterName}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: getLevelColor(ch.percentage) }}>{ch.correct}/{ch.total}</span>
                  <Badge color={getLevelColor(ch.percentage)}>{getLevelLabel(ch.percentage)}</Badge>
                </div>
              </div>
              <ProgressBar value={ch.correct} max={ch.total} color={getLevelColor(ch.percentage)} height={5} />
            </div>
          ))}
        </div>
      </div>

      {/* Missed questions */}
      {missedQuestions.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setShowMissed(s => !s)}
            style={{ width: "100%", padding: "12px 16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, color: C.textSecondary, fontSize: 13, fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Visa {missedQuestions.length} felaktiga svar</span>
            <span style={{ display: "inline-block", transform: showMissed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
          </button>
          {showMissed && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {missedQuestions.map((r, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16 }}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Kap {r.question.chapter} · <DifficultyBadge difficulty={r.question.difficulty} /></div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 8, lineHeight: 1.4, marginTop: 6 }}>{r.question.question}</div>
                  <div style={{ fontSize: 12, color: C.red, marginBottom: 4 }}>✗ Ditt svar: {r.selectedIndex === -1 ? "Inget svar" : r.question.options[r.selectedIndex]}</div>
                  <div style={{ fontSize: 12, color: C.green, marginBottom: 10 }}>✓ Rätt: {r.question.options[r.question.correctAnswer]}</div>
                  <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.65, background: C.bg, borderRadius: 8, padding: "8px 10px" }}>
                    {r.question.explanation}
                  </div>
                  <AIExplainer question={r.question} context="wrong" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onRetry} style={{ padding: 14, background: C.primary, color: "#fff", borderRadius: 14, fontSize: 15, fontWeight: 600 }}>
          Ta nytt prov
        </button>
        <button onClick={onDashboard} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, color: C.textPrimary, borderRadius: 14, fontSize: 15, fontWeight: 500 }}>
          📊 Se din dashboard
        </button>
        <button onClick={onHome} style={{ padding: 12, background: "none", color: C.textMuted, fontSize: 14 }}>
          ← Tillbaka till start
        </button>
      </div>
    </div>
  );
}


// ============================================================
// FAS 6 – FELBANK VIEW
// ============================================================
function ErrorBankView({ errorBank, onBack, onStartSession }) {
  const [filterChapter, setFilterChapter] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState(null);
  const [sortBy, setSortBy] = useState("accuracy"); // accuracy | seen | recent

  // Bygg upp en berikad lista av alla frågor med felbanksdata
  const enriched = ALL_QUESTIONS
    .map(q => {
      const e = errorBank[q.id];
      if (!e || e.timesSeen === 0) return null;
      return {
        ...q,
        timesSeen: e.timesSeen,
        timesCorrect: e.timesCorrect,
        timesWrong: e.timesSeen - e.timesCorrect,
        accuracy: Math.round((e.timesCorrect / e.timesSeen) * 100),
      };
    })
    .filter(Boolean);

  // Filtrera
  const filtered = enriched
    .filter(q => filterChapter === null || q.chapter === filterChapter)
    .filter(q => filterDifficulty === null || q.difficulty === filterDifficulty);

  // Sortera
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "accuracy") return a.accuracy - b.accuracy;
    if (sortBy === "seen")     return b.timesSeen - a.timesSeen;
    return a.accuracy - b.accuracy;
  });

  // Bara frågor med minst ett fel för "svaga" – för träningsknappen
  const weakQuestions = enriched.filter(q => q.timesWrong > 0)
    .sort((a, b) => a.accuracy - b.accuracy);

  const chapters = getChapters();
  const totalSeen   = enriched.length;
  const totalWeak   = enriched.filter(q => q.accuracy < 70).length;
  const avgAccuracy = enriched.length > 0
    ? Math.round(enriched.reduce((s, q) => s + q.accuracy, 0) / enriched.length)
    : null;

  return (
    <div style={{ minHeight: "100vh", padding: "24px 24px 48px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textSecondary, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}>←</button>
        <div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, lineHeight: 1 }}>Felbank</h2>
          <p style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>Frågor du har sett och deras träffsäkerhet</p>
        </div>
      </div>

      {/* KPI-rad */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { label: "Sedda",    value: totalSeen,   color: C.primary },
          { label: "Svaga",    value: totalWeak,   color: C.red },
          { label: "Snitt",    value: avgAccuracy !== null ? `${avgAccuracy}%` : "–", color: getLevelColor(avgAccuracy) },
        ].map(c => (
          <div key={c.label} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Träna på svaga – CTA */}
      {weakQuestions.length > 0 && (
        <button
          onClick={() => onStartSession(weakQuestions.slice(0, 20))}
          style={{ width: "100%", marginBottom: 20, padding: "16px 20px", background: `linear-gradient(135deg, #fff5f5, #fef2f2)`, border: `1px solid ${C.red}40`, borderRadius: 16, textAlign: "left", color: C.textPrimary, transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 3 }}>🎯 Träna på svagaste frågorna</div>
              <div style={{ fontSize: 12, color: C.textSecondary }}>
                {Math.min(weakQuestions.length, 20)} frågor · sorterade efter lägst träffsäkerhet
              </div>
            </div>
            <span style={{ fontSize: 20, color: C.red }}>→</span>
          </div>
        </button>
      )}

      {/* Tom felbank */}
      {enriched.length === 0 && (
        <div style={{ textAlign: "center", padding: "56px 0", color: C.textMuted }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: C.textSecondary }}>Felbankens är tom</div>
          <div style={{ fontSize: 13 }}>Börja träna så samlas dina frågor här automatiskt.</div>
        </div>
      )}

      {enriched.length > 0 && (
        <>
          {/* Filter & sortering */}
          <div style={{ marginBottom: 14 }}>
            {/* Svårighetsfilter */}
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Svårighetsgrad</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {[null, "easy", "medium", "hard"].map(d => {
                const labels  = { null: "Alla", easy: "Lätt", medium: "Medel", hard: "Svår" };
                const colors  = { null: C.primary, easy: C.green, medium: C.amber, hard: C.red };
                const active  = filterDifficulty === d;
                return (
                  <button key={String(d)} onClick={() => setFilterDifficulty(d)}
                    style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${active ? colors[d] : C.border}`, background: active ? colors[d] + "22" : C.surface, color: active ? colors[d] : C.textSecondary, transition: "all 0.15s" }}>
                    {labels[d]}
                  </button>
                );
              })}
            </div>

            {/* Kapitelfilter */}
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Kapitel</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              <button onClick={() => setFilterChapter(null)}
                style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${filterChapter === null ? C.primary : C.border}`, background: filterChapter === null ? C.primary + "22" : C.surface, color: filterChapter === null ? C.primary : C.textSecondary }}>
                Alla
              </button>
              {chapters.map(ch => {
                const active = filterChapter === ch.id;
                // Visa bara kapitel som faktiskt finns i felbankens data
                const hasData = enriched.some(q => q.chapter === ch.id);
                if (!hasData) return null;
                return (
                  <button key={ch.id} onClick={() => setFilterChapter(ch.id)}
                    style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${active ? C.primary : C.border}`, background: active ? C.primary + "22" : C.surface, color: active ? C.primary : C.textSecondary }}>
                    {ch.id}
                  </button>
                );
              })}
            </div>

            {/* Sortering */}
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Sortera efter</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[["accuracy","Lägst träff"], ["seen","Mest sedd"]].map(([key, label]) => (
                <button key={key} onClick={() => setSortBy(key)}
                  style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1px solid ${sortBy === key ? C.primary : C.border}`, background: sortBy === key ? C.primary + "22" : C.surface, color: sortBy === key ? C.primary : C.textSecondary }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Resultaträknare */}
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>
            Visar {sorted.length} av {enriched.length} frågor
          </div>

          {/* Frågelista */}
          {sorted.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: C.textMuted, fontSize: 13 }}>
              Inga frågor matchar filtret.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sorted.map(q => {
                const accuracyColor = getLevelColor(q.accuracy);
                return (
                  <div key={q.id} style={{ background: C.surface, border: `1px solid ${q.accuracy < 50 ? C.red + "40" : C.border}`, borderRadius: 14, padding: 16 }}>

                    {/* Toprad: kapitel + svårighetsgrad + träffsäkerhet */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: C.textMuted }}>Kap {q.chapter}</span>
                        <DifficultyBadge difficulty={q.difficulty} />
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: accuracyColor, lineHeight: 1 }}>
                          {q.accuracy}%
                        </div>
                        <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>träffsäkerhet</div>
                      </div>
                    </div>

                    {/* Frågetext */}
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, lineHeight: 1.45, marginBottom: 10 }}>
                      {q.question}
                    </div>

                    {/* Rätt svar */}
                    <div style={{ fontSize: 12, color: C.green, marginBottom: 10 }}>
                      ✓ {q.options[q.correctAnswer]}
                    </div>

                    {/* Progressbar */}
                    <div style={{ marginBottom: 8 }}>
                      <ProgressBar value={q.timesCorrect} max={q.timesSeen} color={accuracyColor} height={4} />
                    </div>

                    {/* Stats-rad */}
                    <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.textMuted }}>
                      <span>👁 Sedd {q.timesSeen} {q.timesSeen === 1 ? "gång" : "gånger"}</span>
                      <span style={{ color: C.green }}>✓ {q.timesCorrect} rätt</span>
                      <span style={{ color: C.red }}>✗ {q.timesWrong} fel</span>
                    </div>

                    {/* AI-förklaring om frågan är svag */}
                    {q.accuracy < 70 && <AIExplainer question={q} context="deepdive" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Träna på filtrerade frågor */}
          {sorted.length > 0 && (
            <button
              onClick={() => onStartSession(shuffle(sorted).slice(0, 20))}
              style={{ marginTop: 20, width: "100%", padding: 14, background: C.primary, color: "#fff", borderRadius: 14, fontSize: 14, fontWeight: 700 }}>
              Träna på dessa {Math.min(sorted.length, 20)} frågor →
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================
// AUTH VIEWS
// ============================================================
// ============================================================
// STUDY VIEW – Utbildningsmaterial från UHR
// ============================================================
const STUDY_CHAPTERS = [
  { num: 1,  emoji: "📖", title: "Inledning",                                 file: "01_inledning" },
  { num: 2,  emoji: "🗺️", title: "Landet Sverige",                            file: "02_landet-sverige" },
  { num: 3,  emoji: "🏛️", title: "Sveriges demokratiska system",              file: "03_sveriges-demokratiska-system" },
  { num: 4,  emoji: "⚖️", title: "Så här styrs Sverige",                      file: "04_sa-har-styrs-sverige" },
  { num: 5,  emoji: "🗳️", title: "Politiska val och partier",                 file: "05_politiska-val-och-partier" },
  { num: 6,  emoji: "🔒", title: "Lag och rätt",                              file: "06_lag-och-ratt" },
  { num: 7,  emoji: "📰", title: "Mediernas roll",                            file: "07_mediernas-roll" },
  { num: 8,  emoji: "✊", title: "Mänskliga rättigheter",                     file: "08_manskliga-rattigheter" },
  { num: 9,  emoji: "💼", title: "Arbetsmarknad och privatekonomi",            file: "09_arbetsmarknad-och-privatekonomi" },
  { num: 10, emoji: "🏥", title: "Välfärdssamhället",                         file: "10_valfardssamhallet" },
  { num: 11, emoji: "📜", title: "Sveriges moderna historia",                  file: "11_sveriges-moderna-historia" },
  { num: 12, emoji: "🌍", title: "Sverige och omvärlden",                     file: "12_sverige-och-omvarlden" },
  { num: 13, emoji: "🕌", title: "En sekulär stat och ett mångreligiöst land", file: "13_en-sekular-stat-och-ett-mangreligiost-land" },
  { num: 14, emoji: "🎄", title: "Traditioner och högtider",                  file: "14_traditioner-och-hogtider" },
];

const UHR_BASE = "https://www.uhr.se/globalassets/_uhr.se/medborgarskapsprovet/utbildningsmaterial/";
const PDF_URL  = UHR_BASE + "sverige-i-fokus.pdf";

function StudyChapterCard({ chapter }) {
  const [open, setOpen] = useState(false);
  const src = UHR_BASE + chapter.file + ".mp3";

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s", borderColor: open ? C.primary + "66" : C.border }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", background: "none", display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", textAlign: "left" }}
      >
        <span style={{ fontSize: 22, flexShrink: 0, width: 32, textAlign: "center" }}>{chapter.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            Kapitel {chapter.num}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, lineHeight: 1.3 }}>{chapter.title}</div>
        </div>
        <span style={{ color: C.textMuted, fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none" }}>›</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px" }}>
          <audio
            controls
            src={src}
            preload="none"
            style={{ width: "100%", height: 40, accentColor: C.primary, colorScheme: "light" }}
          />
          <div style={{ marginTop: 10, fontSize: 12, color: C.textMuted }}>
            Ljudfil från UHR · mp3
          </div>
        </div>
      )}
    </div>
  );
}

function StudyView({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", padding: "0 0 48px" }}>
      {/* Header */}
      <div style={{ padding: "24px 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onBack}
          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textSecondary, borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 500 }}
        >
          ← Tillbaka
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SverigeFlag size={20} />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: C.textPrimary }}>Utbildningsmaterial</span>
        </div>
      </div>

      <div style={{ padding: "28px 24px 0" }}>
        {/* Intro-kort */}
        <div style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #f9f9fc 100%)", border: "1px solid #bbf7d0", borderRadius: 18, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>📘</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: C.textPrimary, marginBottom: 8 }}>
            Sverige i fokus
          </div>
          <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
            Officiellt studiematerial framtaget av UHR och Skolverket. Lyssna på kapitlen nedan eller ladda ned hela boken som PDF.
          </div>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e22", border: "1px solid #22c55e66", color: C.green, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}
          >
            📄 Öppna PDF
          </a>
        </div>

        {/* Kapitel-lista */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            14 kapitel · klicka för att lyssna
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {STUDY_CHAPTERS.map(ch => (
              <StudyChapterCard key={ch.num} chapter={ch} />
            ))}
          </div>
        </div>

        {/* Footer-notering */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>ℹ️</span>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>
            Materialet är framtaget av UHR på uppdrag av regeringen. Övningsprov från andra aktörer är inte kontrollerade av UHR.
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [view, setView] = useState("loading");
  const [history, setHistory] = useState([]);
  const [errorBank, setErrorBank] = useState({});
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState("practice");
  const [lastSession, setLastSession] = useState(null);
  const [totalXP, setTotalXP] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    bootApp();
  }, []);

  function bootApp() {
    setHistory(loadHistory());
    setErrorBank(loadErrorBank());
    setStreak(loadStreak());
    setTotalXP(loadXP());
    setUserName(loadUserName());
    setView(loadOnboarded() ? "home" : "onboarding");
  }

  function handleQuizComplete(session) {
    setLastSession(session);
    const newEb = { ...errorBank };
    session.results.forEach(r => {
      if (!newEb[r.question.id]) newEb[r.question.id] = { questionId: r.question.id, timesSeen: 0, timesCorrect: 0 };
      newEb[r.question.id].timesSeen++;
      if (r.correct) newEb[r.question.id].timesCorrect++;
    });
    setErrorBank(newEb);
    saveErrorBank(newEb);

    const record = {
      id: generateId(),
      mode: session.mode,
      date: new Date().toISOString(),
      score: session.score.score,
      total: session.score.total,
      percentage: session.score.percentage,
      passed: session.score.passed,
      duration: session.duration,
      breakdown: session.breakdown,
    };
    saveHistory(record);
    setHistory(loadHistory());
    setStreak(updateStreak());
    if (session.xpEarned > 0) setTotalXP(addXP(session.xpEarned));
    setView("result");
  }

  function startPractice(questions) {
    setQuizQuestions(questions);
    setQuizMode("practice");
    setView("quiz");
  }

  function startExam() {
    const qs = shuffle(ALL_QUESTIONS).slice(0, 40);
    setQuizQuestions(qs);
    setQuizMode("exam");
    setView("quiz");
  }

  function startWeakPractice() {
    const weakIds = Object.values(errorBank)
      .filter(e => e.timesSeen > 0 && (e.timesCorrect / e.timesSeen) < 0.6)
      .sort((a, b) => (a.timesCorrect / a.timesSeen) - (b.timesCorrect / b.timesSeen))
      .slice(0, 20)
      .map(e => e.questionId);
    const qs = shuffle(ALL_QUESTIONS.filter(q => weakIds.includes(q.id)));
    setQuizQuestions(qs.length > 0 ? qs : shuffle(ALL_QUESTIONS).slice(0, 20));
    setQuizMode("practice");
    setView("quiz");
  }

  function startErrorBankSession(questions) {
    setQuizQuestions(shuffle(questions).slice(0, 20));
    setQuizMode("practice");
    setView("quiz");
  }

  if (view === "loading") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <SverigeFlag size={24} />
        <span style={{ fontFamily: "'Sora', sans-serif", color: C.textSecondary, fontSize: 16 }}>Laddar...</span>
      </div>
    </div>
  );

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", background: C.bg, minHeight: "100vh" }}>
        {view === "onboarding"     && <OnboardingView onDone={(name) => { if (name) setUserName(name); setView("home"); }} />}
        {view === "home"           && <HomeView onStartPractice={() => setView("practice-setup")} onStartExam={() => setView("exam-setup")} onDashboard={() => setView("dashboard")} onErrorBank={() => setView("errorbank")} onStudy={() => setView("study")} streak={streak} history={history} errorBank={errorBank} totalXP={totalXP} userName={userName} />}
        {view === "study"          && <StudyView onBack={() => setView("home")} />}
        {view === "practice-setup" && <PracticeSetupView onStart={startPractice} onBack={() => setView("home")} errorBank={errorBank} />}
        {view === "exam-setup"     && <ExamSetupView onStart={startExam} onBack={() => setView("home")} history={history} />}
        {view === "errorbank"      && <ErrorBankView errorBank={errorBank} onBack={() => setView("home")} onStartSession={startErrorBankSession} />}
        {view === "quiz"           && <QuizView key={generateId()} questions={quizQuestions} mode={quizMode} onComplete={handleQuizComplete} />}
        {view === "result" && lastSession && lastSession.mode === "practice" && (
          <ResultView session={lastSession} onHome={() => setView("home")} onRetry={() => setView("practice-setup")} onDashboard={() => setView("dashboard")} onPracticeWeak={startWeakPractice} />
        )}
        {view === "result" && lastSession && lastSession.mode === "exam" && (
          <ExamResultView session={lastSession} onRetry={() => setView("exam-setup")} onHome={() => setView("home")} onDashboard={() => setView("dashboard")} onPracticeWeak={startWeakPractice} />
        )}
        {view === "dashboard"      && <DashboardView history={history} errorBank={errorBank} streak={streak} onBack={() => setView("home")} onPracticeWeak={startWeakPractice} />}
      </div>
    </>
  );
}
