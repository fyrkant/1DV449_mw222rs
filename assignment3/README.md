# Laboration 3, Mashup

[Här kan du applikationen ute i den friska luften](http://mw222rs.github.io/1DV449_mw222rs/assignment3/client/)

## Reflektionsfrågor, laboration 3

### Vad finns det för krav du måste anpassa dig efter i de olika API:erna?

För Googles API kräver de att man registrerar sin app via deras developers console för att på så sätt få tag i en "browser key" som man sedan använder när man kallar på googles API JavaScript-kod. Detta är gratis upp till ett visst antal (jag tror att det är 25 000) förfrågningar per månad, sedan börjar de ta betalt.

Gällande Sveriges Radios API verkar de vara väldigt öppna och kräver varken någon sorts nyckel eller token från utvecklaren och verkar heller inte ha några hårda kvoter man måste hålla sig till med antal förfrågningar per månad. 

För övrigt märkte jag själv hur snabbt man kan slå i taket med dessa kvoter när jag gjorde mitt projekt i PHP-kursen och använde mig av Githubs API för att hämta ut repositorie-information. Problemet var bara att när jag skulle stilsätta min sida hade jag satt på auto-reload för att snabbt kunna reda ut CSS-härvan så för varje sparning av mina CSS-filer gjordes ett nytt antal förfrågningar till github och det tog inte särskilt lång tid innan jag blev avstängd - dock endast en kort stund, kanske 15 minuter. Bättre att dra ner data till en fil under utvecklingsprocessen!


### Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?

När en användare kommer till min applikation kallar min server på SRs API och sparar datat till servern. Nästa gång en användare kommer till sidan kollar servern först på den cacheade filen och kollar hur gammal den är, är den under 5 minuter får användaren cachen annars skickar servern en förfrågan till SR för ny data. 5 minuter är en helt obefogad gräns egentligen och skulle kanske kunna sättas till en längre tid. 

### Vad finns det för risker kring säkerhet och stabilitet i din applikation?

Jag vet egentligen inte om det finns några särskilda säkerhetsrisker med min applikation, då den ju inte hanterar någon inmatning från användaren eller liknande. Stabiliteten är väl även den någorlunda bra, med undantag att den ju såklart i väldigt stor del är beroende på SRs APIs utformning av sin data. Skulle de få för sig att byta namn på någon nyckel i sin JSON-data skulle nog en hel del börja krångla. 

### Hur har du tänkt kring säkerheten i din applikation?

Jag har inte kunnat kommit på några större brister i säkerheten i min applikation. 

### Hur har du tänkt kring optimeringen i din applikation?

Det mesta jag har tänkt runt optimering är väl att jag för första gången jobbat med WebSockets som ett sätt att skicka data snabbt och utan omladdning från server till klient, något som jag tycker har funkar väldigt bra, särskilt med den lösning med React och redux som jag valt. Sedan har jag använt mig av ramverket [MDL](http://www.getmdl.io/) (material design lite) för stilsättningen av sidan och det kan väl ifrågasättas om sidan hade kunnats göra bättre optimerad med egen skriven CSS och markup, men då hade jag å andra sidan nog inte haft tid att implementera alla de funktioner jag ville. 
