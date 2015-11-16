# 1DV449 Laborationsrepositorie
## Ägare: Mattias Wikström, mw222rs

## Laboration 1, Webbskraparn 1.0

### Finns det några etiska aspekter vid webbskrapning. Kan du hitta något rättsfall?
Etiskt har jag svårt att se några problem med webbskrapning, då man ju endast kommer åt sådan information som finns öppet publicerad på internet. De två problem som verkar ha [lyfts fram i rättsfall][1] verkar vara antingen dåliga skrapare som genom för energiskt skrapande överbelastat företags servrar och på så sätt lett till att detta företag tappat försäljning när sidan legat nere, eller varit naiva flygbolag eller liknande som inte tyckt om att analysföretag tagit reda på deras priser för jämförelse med konkurrenter. Exemplen med flygbolagen på Wikipedia-sidan verkar ju dock vara några år gamla (från 2007) och jag tror verkligen att många företags inställning till att dela med sig av all slags data genom publika APIer har förändrats avsevärt sedan dess. 

### Finns det några riktlinjer för utvecklare att tänka på om man vill vara "en god skrapare" mot serverägarna?
Det viktigaste för serverägarna är nog att man är sparsam med sina requests mot servern. Skicka så få förfrågningar som bara är möjligt för att inte överbelasta servern. Sedan är det såklart viktigt att följa eventuella önskemål i `robots.txt` och att identifiera sig i `User-Agent` i headern på sina requests.

### Begränsningar i din lösning- vad är generellt och vad är inte generellt i din kod?
Min lösning är generell så långt att den förhoppningsvis skulle klara av att länkar, till exempel på förstasidan, skulle byta plats så att restaurang-länken kom ovanför biograf-länken eller liknande. Men annars så är det i mångt och mycket väldigt beroende av att utformningen av de tre sidorna inte förändras. 

Det är väl lite detta som är det största problemet med att bygga en skrapa, det är väldigt tidskrävande att sitta och analysera sidors olika utformning och försöka utröna olika sammanband för att få fram data som kan analyseras. Jag har definitivt insett hur mycket ett bra utformat API är värt. Jag jobbade lite med GitHubs API i projektarbetet i föregående PHP-kursen och efter att man förstått hur man skulle jobba mot APIt gick det ju att utan problem få fram väldigt precis data väldigt enkelt. Att bygga den här skrapan var desto jobbigare... 

### Vad kan robots.txt spela för roll?
En `robots.txt`-fil säger genom ["robots exclusion standard"][2] till indexerings-robotar vilka delar av delar av ens sidor som är OK att gå igenom och vilka som man helst vill att indexeringsrobotar håller sig borta från. Sökmotorer som Google och Bing och andra laglydiga internetmedborgare följer förhoppningsvis denna fil, men den sätter på inga sätt stopp för eventuella elaka robotar som är ute efter att indexera din epostadress för spam-utskick eller liknande. Det är alltså mera likt en knähög syrénhäck än en Berlinmur med elektrifierad taggtråd. 

[1]: https://en.wikipedia.org/wiki/Web_scraping#Legal_issues
[2]: https://en.wikipedia.org/wiki/Robots_exclusion_standard#About_the_standard
