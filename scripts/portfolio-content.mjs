import fs from 'node:fs';
export const languages = ['en', 'lt', 'nl'];
export const words = (en, lt, nl) => ({ en, lt, nl });
export const text = (value, lang) => typeof value === 'string' ? value : value[lang] ?? value.en;
export const original = Object.fromEntries(languages.map(lang => [lang, JSON.parse(fs.readFileSync(new URL(`../assets/i18n/${lang}.json`, import.meta.url), 'utf8').replace(/^\uFEFF/, ''))]));
export const cv = 'https://drive.google.com/drive/folders/1P8uOni7oKtSDI0kj3rCFPhguP-sYuNmw?usp=sharing';
export const email = 'don.paulauskas@gmail.com';
export const linkedin = 'https://www.linkedin.com/in/donatas73a/';
export const github = 'https://github.com/Donatas333';

export const copy = {
  title: words('Donatas Paulauskas — Business Analytics & Automation', 'Donatas Paulauskas — Verslo analitika ir automatizavimas', 'Donatas Paulauskas — Bedrijfsanalyse & automatisering'),
  description: words('Business thinking meets practical execution. Explore Donatas Paulauskas’s Power BI dashboards, SQL analysis and workflow automations. Based in Eindhoven.', 'Verslo supratimas ir praktiniai sprendimai. Donato Paulausko Power BI ataskaitos, SQL analizė ir procesų automatizavimas. Eindhovenas.', 'Bedrijfsinzicht en praktische oplossingen. Ontdek de Power BI-dashboards, SQL-analyses en workflowautomatiseringen van Donatas Paulauskas in Eindhoven.'),
  skip: words('Skip to content', 'Pereiti prie turinio', 'Naar inhoud'),
  work: words('Work', 'Projektai', 'Projecten'),
  expertise: words('Expertise', 'Kompetencijos', 'Expertise'),
  about: words('About', 'Apie mane', 'Over mij'),
  contact: words('Let’s talk', 'Susisiekime', 'Laten we praten'),
  openMenu: words('Open navigation', 'Atidaryti meniu', 'Navigatie openen'),
  closeMenu: words('Close navigation', 'Uždaryti meniu', 'Navigatie sluiten'),
  heroLine1: words('Clearer data.', 'Aiškesni duomenys.', 'Heldere data.'),
  heroLine2: words('Smarter workflows.', 'Sklandesni procesai.', 'Slimmere processen.'),
  heroIntro: words('I’m Donatas, a business graduate connecting data, people and processes. I build dashboards and automations that make everyday work easier.', 'Esu Donatas – verslo absolventas, jungiantis duomenis, žmones ir procesus. Kuriu ataskaitas ir automatizacijas, kurios palengvina kasdienį darbą.', 'Ik ben Donatas, een businessafgestudeerde die data, mensen en processen verbindt. Ik bouw dashboards en automatiseringen die dagelijks werk eenvoudiger maken.'),
  viewWork: words('Explore my work', 'Peržiūrėti projektus', 'Bekijk mijn werk'),
  viewCv: words('View my CV', 'Peržiūrėti CV', 'Bekijk mijn cv'),
  profession: words('Business analytics & automation', 'Verslo analitika ir automatizavimas', 'Bedrijfsanalyse & automatisering'),
  location: words('Based in Eindhoven, Netherlands', 'Eindhovenas, Nyderlandai', 'Gevestigd in Eindhoven, Nederland'),
  selected: words('Selected work', 'Atrinkti projektai', 'Geselecteerd werk'),
  workTitle: words('Business questions.\nPractical answers.', 'Verslo klausimai.\nPraktiniai atsakymai.', 'Zakelijke vragen.\nPraktische antwoorden.'),
  workIntro: words('A selection of my work in analytics, reporting and process automation. Start with the problem. Explore the solution.', 'Analitikos, ataskaitų ir procesų automatizavimo projektai. Nuo konkrečios problemos iki veikiančio sprendimo.', 'Een selectie van mijn werk in analyse, rapportage en procesautomatisering. Van het probleem naar de oplossing.'),
  all: words('All work', 'Visi projektai', 'Alles'),
  analytics: words('SQL & Analytics', 'SQL ir analitika', 'SQL & analyse'),
  automation: words('Automation', 'Automatizavimas', 'Automatisering'),
  ai: words('AI & Web', 'DI ir svetainės', 'AI & web'),
  results: words('{count} of {total} projects', '{count} iš {total} projektų', '{count} van {total} projecten'),
  featured: words('Featured project', 'Išskirtinis projektas', 'Uitgelicht project'),
  readCase: words('Explore project', 'Apie projektą', 'Bekijk project'),
  workFoot: words('The thinking matters as much as the finished result.', 'Svarbus ir rezultatas, ir kelias iki jo.', 'De aanpak is net zo belangrijk als het eindresultaat.'),
  githubLink: words('More on GitHub', 'Daugiau GitHub', 'Meer op GitHub'),
  expertiseTitle: words('The business context.\nThe technical detail.', 'Verslo kontekstas.\nTechninis tikslumas.', 'De bedrijfscontext.\nHet technische detail.'),
  expertiseIntro: words('I work across the gap between a business need and a useful, maintainable solution.', 'Jungiu verslo poreikių supratimą ir naudingų, prižiūrimų sprendimų kūrimą.', 'Ik verbind een zakelijke behoefte met een bruikbare, onderhoudbare oplossing.'),
  aboutEyebrow: words('A little about me', 'Trumpai apie mane', 'Iets over mij'),
  aboutTitle: words('Business first.\nCuriosity always.', 'Verslas – pirmiausia.\nSmalsumas – visada.', 'Eerst het vraagstuk.\nAltijd nieuwsgierig.'),
  aboutP1: words('My background is in International Business at Fontys in Eindhoven. Working on market research, marketing and operations taught me to ask what a business actually needs before choosing the tool.', 'Fontys aukštojoje mokykloje Eindhovene baigiau tarptautinį verslą. Rinkos tyrimų, rinkodaros ir operacijų patirtis išmokė pirmiausia suprasti verslo poreikį ir tik tada rinktis įrankį.', 'Ik heb International Business gestudeerd aan Fontys in Eindhoven. Door mijn ervaring met marktonderzoek, marketing en operationele processen leerde ik eerst de behoefte te begrijpen en daarna het juiste hulpmiddel te kiezen.'),
  aboutP2: words('Today, I’m building my career in analytics and automation, with hands-on projects in SQL, Power BI, Python and Make.com. I like turning a messy process into something clear, repeatable and useful.', 'Šiandien kuriu karjerą analitikos ir automatizavimo srityse: dirbu su SQL, Power BI, Python ir Make.com. Man patinka painius procesus paversti aiškiais, pakartojamais ir naudingais sprendimais.', 'Nu bouw ik aan mijn loopbaan in analyse en automatisering, met praktische projecten in SQL, Power BI, Python en Make.com. Ik maak onoverzichtelijke processen graag helder, herhaalbaar en nuttig.'),
  based: words('Based in', 'Vieta', 'Locatie'),
  focus: words('My focus', 'Mano kryptis', 'Mijn focus'),
  focusValue: words('Analytics · Automation · Business', 'Analitika · Automatizavimas · Verslas', 'Analyse · Automatisering · Business'),
  languages: words('Languages', 'Kalbos', 'Talen'),
  languageValue: words('Lithuanian & English · learning Dutch', 'Lietuvių ir anglų · mokausi olandų', 'Litouws & Engels · ik leer Nederlands'),
  education: words('Education', 'Išsilavinimas', 'Opleiding'),
  educationValue: words('BA International Business · Fontys', 'Tarptautinio verslo bakalauras · Fontys', 'Bachelor International Business · Fontys'),
  journey: words('Experience & education', 'Patirtis ir išsilavinimas', 'Ervaring & opleiding'),
  graduation: words('Graduation project · Market entry strategy', 'Baigiamasis projektas · Įėjimo į rinką strategija', 'Afstudeerproject · Markttoetredingsstrategie'),
  graduationDesc: words('Market and competitor research translated into a practical expansion strategy.', 'Rinkos ir konkurentų tyrimas, paverstas praktine plėtros strategija.', 'Markt- en concurrentieonderzoek vertaald naar een praktische groeistrategie.'),
  internship: words('Marketing & Sales Intern', 'Rinkodaros ir pardavimų praktikantas', 'Stagiair Marketing & Sales'),
  internshipDesc: words('Campaign analysis, CRM workflows and commercial reporting.', 'Kampanijų analizė, CRM procesai ir komercinės ataskaitos.', 'Campagneanalyse, CRM-processen en commerciële rapportage.'),
  certificate: words('Data Analytics & Python Programming', 'Duomenų analitika ir Python programavimas', 'Data-analyse & Python-programmering'),
  certificateDesc: words('Practical training in SQL, Power BI, DAX and Python.', 'Praktiniai SQL, Power BI, DAX ir Python mokymai.', 'Praktijkgerichte opleiding in SQL, Power BI, DAX en Python.'),
  moreBackground: words('Education & certifications', 'Studijos ir sertifikatai', 'Opleiding & certificaten'),
  contactEyebrow: words('Have something in mind?', 'Turite idėją?', 'Een idee in gedachten?'),
  contactTitle: words('Let’s make\nit work.', 'Paverskime idėją\nsprendimu.', 'Laten we het\nlaten werken.'),
  contactIntro: words('A role, a project or a process that could work better? Tell me what you’re thinking.', 'Darbo pasiūlymas, projektas ar procesas, kurį galima patobulinti? Parašykite.', 'Een functie, een project of een proces dat beter kan? Vertel me wat je in gedachten hebt.'),
  name: words('Your name', 'Jūsų vardas', 'Je naam'),
  email: words('Email address', 'El. paštas', 'E-mailadres'),
  subject: words('What’s it about?', 'Apie ką norite pasikalbėti?', 'Waar gaat het over?'),
  subjectHint: words('A project, an opportunity, a question…', 'Projektas, galimybė, klausimas…', 'Een project, een kans, een vraag…'),
  message: words('Your message', 'Jūsų žinutė', 'Je bericht'),
  messageHint: words('A little context goes a long way.', 'Trumpai papasakokite, ko ieškote.', 'Vertel me iets meer.'),
  send: words('Send message', 'Siųsti žinutę', 'Verstuur bericht'),
  sending: words('Sending your message…', 'Žinutė siunčiama…', 'Je bericht wordt verstuurd…'),
  sent: words('Your message has been accepted. Thank you for getting in touch.', 'Jūsų žinutė priimta. Ačiū, kad susisiekėte.', 'Je bericht is ontvangen. Bedankt voor je bericht.'),
  sendError: words('Sending could not be confirmed. Your message is still here. Please email don.paulauskas@gmail.com directly.', 'Nepavyko patvirtinti išsiuntimo. Jūsų tekstas išsaugotas formoje. Parašykite tiesiogiai: don.paulauskas@gmail.com.', 'Verzenden kon niet worden bevestigd. Je tekst staat nog in het formulier. Mail rechtstreeks naar don.paulauskas@gmail.com.'),
  privacy: words('Your details are used only to respond to your message.', 'Jūsų duomenys naudojami tik atsakymui į žinutę.', 'Je gegevens worden alleen gebruikt om je bericht te beantwoorden.'),
  backTop: words('Back to top', 'Į viršų', 'Terug naar boven'),
  footer: words('Donatas Paulauskas. Built with intention.', 'Donatas Paulauskas. Kurta apgalvotai.', 'Donatas Paulauskas. Met aandacht gemaakt.'),
  backWork: words('Back to work', 'Atgal į projektus', 'Terug naar projecten'),
  caseStudy: words('Project case study', 'Projekto apžvalga', 'Projectcase'),
  source: words('View source on GitHub', 'Peržiūrėti GitHub', 'Bekijk de bron op GitHub'),
  overview: words('Overview', 'Apžvalga', 'Overzicht'),
  approach: words('Approach', 'Metodas', 'Aanpak'),
  outcome: words('The outcome', 'Rezultatas', 'Het resultaat'),
  gallery: words('A closer look', 'Iš arčiau', 'Van dichtbij'),
  challenge: words('The question behind the project.', 'Klausimas, nuo kurio viskas prasidėjo.', 'De vraag achter het project.'),
  approachHeading: words('From raw input to a useful system.', 'Nuo pradinių duomenų iki naudingo sprendimo.', 'Van ruwe input naar een bruikbaar systeem.'),
  outcomeHeading: words('What the project makes possible.', 'Ką leidžia pasiekti šis projektas.', 'Wat het project mogelijk maakt.'),
  inspect: words('Enlarge image', 'Padidinti vaizdą', 'Afbeelding vergroten'),
  closeImage: words('Close image', 'Uždaryti vaizdą', 'Afbeelding sluiten'),
  imageNote: words('Project image from my portfolio.', 'Projekto vaizdas iš mano portfolio.', 'Projectafbeelding uit mijn portfolio.'),
  reportNote: words('Original report screenshot. Explore the source for the full analysis.', 'Originali ataskaitos ekrano kopija. Visa analizė pateikta projekto šaltinyje.', 'Originele schermafbeelding van het rapport. Bekijk de bron voor de volledige analyse.'),
  nextProjects: words('Keep exploring.', 'Atraskite daugiau.', 'Ontdek meer.'),
  noJs: words('Project filters and image enlargement use JavaScript. All projects and contact details are available below.', 'Projektų filtrams ir vaizdų didinimui reikia JavaScript. Visi projektai ir kontaktai pateikti žemiau.', 'Projectfilters en afbeeldingsvergroting gebruiken JavaScript. Alle projecten en contactgegevens staan hieronder.'),
};

const W = words;
export const expertise = [
  {title:W('Dashboards that answer questions','Ataskaitos, atsakančios į klausimus','Dashboards die vragen beantwoorden'),desc:W('Power BI reports built around the decisions people need to make, with clear KPIs and a structured data model.','Power BI ataskaitos, paremtos reikalingais sprendimais, aiškiais rodikliais ir struktūruotu duomenų modeliu.','Power BI-rapporten rond de beslissingen die mensen moeten nemen, met heldere KPI’s en een gestructureerd datamodel.'),tags:['Power BI','DAX','Power Query']},
  {title:W('Reliable data, from the start','Patikimi duomenys nuo pat pradžių','Betrouwbare data vanaf het begin'),desc:W('Cleaning, joining and validating messy datasets, so every chart and business metric has a sound foundation.','Duomenų valymas, jungimas ir tikrinimas, kad kiekviena diagrama ir verslo rodiklis turėtų patikimą pagrindą.','Onoverzichtelijke datasets opschonen, koppelen en valideren, zodat elke grafiek en KPI een goede basis heeft.'),tags:['SQL','Python','Pandas']},
  {title:W('Workflows with less manual work','Mažiau rankinio darbo','Processen met minder handwerk'),desc:W('Connecting forms, emails, CRMs and business tools to take repetitive tasks out of the working day.','Formų, el. pašto, CRM ir kitų įrankių sujungimas, mažinantis pasikartojančias kasdienes užduotis.','Formulieren, e-mail, CRM en zakelijke tools verbinden om herhalende taken uit de werkdag te halen.'),tags:['Make.com','APIs','CRM']},
  {title:W('Business questions into KPIs','Verslo klausimai – į rodiklius','Zakelijke vragen vertalen naar KPI’s'),desc:W('Translating business requirements into definitions for revenue, margin, growth and operational performance.','Verslo poreikių pavertimas aiškiais pajamų, maržos, augimo ir veiklos efektyvumo rodiklių apibrėžimais.','Zakelijke behoeften vertalen naar definities voor omzet, marge, groei en operationele prestaties.'),tags:['KPI design','Reporting']},
  {title:W('A closer look at performance','Išsamesnė veiklos analizė','Prestaties beter begrijpen'),desc:W('Finding patterns in sales, customer behaviour and operations to identify where a change could make a difference.','Pardavimų, klientų elgsenos ir operacijų dėsningumų paieška, padedanti rasti prasmingus pokyčius.','Patronen vinden in verkoop, klantgedrag en processen om te zien waar een verandering verschil kan maken.'),tags:['RFM','Cohort analysis','Research']},
  {title:W('Practical AI integrations','Praktiškos DI integracijos','Praktische AI-integraties'),desc:W('Adding transcription, structured summaries and useful outputs to workflows that already serve a clear purpose.','Transkripcijų, struktūruotų santraukų ir naudingų rezultatų integravimas į aiškų tikslą turinčius procesus.','Transcriptie, gestructureerde samenvattingen en bruikbare output toevoegen aan processen met een duidelijk doel.'),tags:['AI APIs','Make.com','Transcription']},
];

export const projects = [
  {
    id:'flight',file:'portfolio-flight-analysis.html',categories:['powerbi'],style:'dashboard',selected:true,
    title:W('Understanding 5.8 million flights','5,8 milijono skrydžių analizė','Inzicht in 5,8 miljoen vluchten'),
    category:W('Power BI · Operational analytics','Power BI · Veiklos analizė','Power BI · Operationele analyse'),
    summary:W('A four-page Power BI report uncovering delay patterns across US airlines, airports and routes.','Keturių puslapių Power BI ataskaita apie JAV oro linijų, oro uostų ir maršrutų vėlavimo dėsningumus.','Een Power BI-rapport met vier pagina’s over vertragingspatronen bij Amerikaanse luchtvaartmaatschappijen, luchthavens en routes.'),
    image:'assets/img/portfolio/us-flights/flights-overview.webp',tags:['Power BI','DAX','Data modeling'],
    source:github+'/PowerBI_US_Flight_Performace',
    problem:W('Which parts of the US flight network experience the most disruption, and when? This portfolio analysis uses 5,819,079 domestic flights from 2015 to compare reliability across airlines, airports and routes.','Kurios JAV skrydžių tinklo dalys patiria daugiausia sutrikimų ir kada? Šioje analizėje naudojami 5 819 079 vidaus skrydžiai iš 2015 metų, lyginant oro linijas, oro uostus ir maršrutus.','Waar in het Amerikaanse vliegnetwerk ontstaan de meeste verstoringen, en wanneer? Deze portfolioanalyse gebruikt 5.819.079 binnenlandse vluchten uit 2015 om de betrouwbaarheid van maatschappijen, luchthavens en routes te vergelijken.'),
    approach:W('I structured the data in a star schema, added a custom date dimension and built DAX measures for delays, cancellations and diversions. Four report pages move from an executive overview to airline comparisons, network bottlenecks and time-based patterns.','Sukūriau žvaigždinę duomenų schemą, datos dimensiją ir DAX rodiklius vėlavimams, atšaukimams bei nukreipimams. Keturi ataskaitos puslapiai apima bendrą apžvalgą, oro linijų palyginimą, tinklo problemas ir laiko dėsningumus.','Ik bouwde een stermodel met een datumdimensie en DAX-measures voor vertragingen, annuleringen en omleidingen. Vier rapportpagina’s gaan van een managementoverzicht naar vergelijkingen, knelpunten en tijdspatronen.'),
    findings:[W('18.1% of flights were delayed by more than 15 minutes.','18,1 % skrydžių vėlavo daugiau nei 15 minučių.','18,1% van de vluchten had meer dan 15 minuten vertraging.'),W('Average departure delay was 9.3 minutes.','Vidutinis išvykimo vėlavimas buvo 9,3 minutės.','De gemiddelde vertrekvertraging was 9,3 minuten.'),W('Delays increased in early summer and December.','Vėlavimai dažnėjo vasaros pradžioje ir gruodį.','Vertragingen namen toe aan het begin van de zomer en in december.')],
    outcome:W('The report makes recurring patterns visible and helps frame where scheduling, congestion and reliability deserve closer investigation. These are findings from a historical dataset, not claimed improvements to airline operations.','Ataskaita parodo pasikartojančius dėsningumus ir padeda nustatyti, kur verta išsamiau tirti tvarkaraščius, spūstis ir patikimumą. Tai istorinių duomenų analizės išvados, o ne teiginiai apie pagerintą oro linijų veiklą.','Het rapport maakt terugkerende patronen zichtbaar en laat zien waar planning, congestie en betrouwbaarheid nader onderzoek verdienen. Het gaat om bevindingen uit historische data, niet om gerealiseerde verbeteringen bij luchtvaartmaatschappijen.'),
    gallery:[['assets/img/portfolio/us-flights/airline-performance.webp',W('Airline performance','Oro linijų veiklos rodikliai','Prestaties per luchtvaartmaatschappij')],['assets/img/portfolio/us-flights/airport-route-bottlenecks.webp',W('Airport & route bottlenecks','Oro uostų ir maršrutų problemos','Knelpunten bij luchthavens en routes')],['assets/img/portfolio/us-flights/delay-patterns.webp',W('Delay patterns & trends','Vėlavimų dėsningumai','Vertragingspatronen en trends')],['assets/img/portfolio/us-flights/model-view-relationships.webp',W('The data model','Duomenų modelis','Het datamodel')]],
  },
  {
    id:'sales',file:'portfolio-sales-performace.html',categories:['powerbi'],style:'dashboard',selected:true,
    title:W('Beyond the sales numbers','Kas slypi už pardavimų skaičių','Het verhaal achter de verkoopcijfers'),
    category:W('Power BI · Commercial insights','Power BI · Pardavimų analizė','Power BI · Commercieel inzicht'),
    summary:W('Making revenue growth, product concentration and profitability easier to understand.','Aiškesnis pajamų augimo, produktų koncentracijos ir pelningumo vaizdas.','Omzetgroei, productconcentratie en winstgevendheid begrijpelijk maken.'),
    image:'assets/img/portfolio/Candy-sales/sales-overview.webp',tags:['Power BI','DAX','KPI reporting'],source:github+'/PowerBI_Sales_Performance_Overview',
    problem:W('Revenue growth alone does not tell the whole story. This analysis explores multi-year sales transactions to understand product mix, margin, regional performance and seasonality.','Vien pajamų augimas neatskleidžia viso vaizdo. Analizuojami kelių metų pardavimai, siekiant suprasti produktų pasiskirstymą, maržą, regionų rezultatus ir sezoniškumą.','Omzetgroei vertelt niet het hele verhaal. Deze analyse onderzoekt verkooptransacties over meerdere jaren om de productmix, marge, regionale prestaties en seizoenspatronen te begrijpen.'),
    approach:W('I built a star schema linking sales, products, factories and a calendar table. DAX measures compare year-over-year growth, revenue share and profit margins across product and geographic views.','Sukūriau žvaigždinį modelį, jungiantį pardavimus, produktus, gamyklas ir kalendorių. DAX rodikliai leidžia lyginti metinį augimą, pajamų dalį ir pelno maržą pagal produktus bei geografiją.','Ik bouwde een stermodel dat verkoop, producten, fabrieken en een kalendertabel koppelt. DAX-measures vergelijken jaarlijkse groei, omzetaandeel en winstmarges per product en regio.'),
    findings:[W('Six products accounted for 93.3% of sales in the analysis.','Šeši produktai sudarė 93,3 % analizuojamų pardavimų.','Zes producten waren goed voor 93,3% van de geanalyseerde omzet.'),W('The report identifies Q4 as the strongest sales quarter.','Ataskaitoje ketvirtasis ketvirtis išsiskiria didžiausiais pardavimais.','Het rapport wijst het vierde kwartaal aan als sterkste verkoopkwartaal.'),W('Product and regional views help separate growth from concentration risk.','Produktų ir regionų pjūviai padeda atskirti augimą nuo koncentracijos rizikos.','Product- en regioweergaven helpen groei en concentratierisico uit elkaar te houden.')],
    outcome:W('A commercial reporting tool that puts growth in context: what drives it, where it is concentrated and how margin changes alongside it. The repository includes the report structure and findings.','Komercinių ataskaitų įrankis, rodantis augimo kontekstą: kas jį skatina, kur jis koncentruotas ir kaip keičiasi marža. Saugykloje pateikta ataskaitos struktūra bei išvados.','Een commercieel rapport dat groei in context plaatst: wat de groei drijft, waar deze geconcentreerd is en hoe de marge meebeweegt. De repository bevat de rapportstructuur en bevindingen.'),
    gallery:[['assets/img/portfolio/Candy-sales/product-analysis.webp',W('Product performance','Produktų rezultatai','Productprestaties')],['assets/img/portfolio/Candy-sales/customer-regional-segmentation.webp',W('Customer & regional segmentation','Klientų ir regionų segmentacija','Klant- en regiosegmentatie')],['assets/img/portfolio/Candy-sales/YoY-analysis.webp',W('Year-over-year performance','Metinių rezultatų palyginimas','Jaar-op-jaarprestaties')],['assets/img/portfolio/Candy-sales/star-schema-candy-sales.webp',W('The data model','Duomenų modelis','Het datamodel')]],
  },
  {
    id:'sql',file:'portfolio-ecommerce-sql.html',categories:['analytics'],style:'dashboard',selected:true,
    title:W('From transactions to customer insight','Nuo sandorių iki klientų įžvalgų','Van transacties naar klantinzicht'),
    category:W('SQL · Customer analytics','SQL · Klientų analitika','SQL · Klantanalyse'),
    summary:W('An end-to-end SQL pipeline for data cleaning, customer segmentation and cohort retention.','Pilnas SQL procesas: duomenų valymas, klientų segmentavimas ir kohortų išlaikymo analizė.','Een volledige SQL-pipeline voor dataopschoning, klantsegmentatie en cohortretentie.'),
    image:'assets/img/portfolio/ecommerce-sql-1.webp',tags:['MySQL','RFM','Cohort analysis'],source:github+'/SQL_Online_Retail_Analytics',
    problem:W('Raw transaction files are rarely ready for analysis. Online Retail II contains cancellations, invalid values and missing customer IDs that need attention before customer patterns can be trusted.','Neapdoroti sandorių failai retai tinka tiesioginei analizei. Online Retail II duomenyse yra atšaukimų, netinkamų reikšmių ir trūkstamų klientų ID, kuriuos reikia sutvarkyti prieš analizuojant elgseną.','Ruwe transactiebestanden zijn zelden direct bruikbaar. Online Retail II bevat annuleringen, ongeldige waarden en ontbrekende klantnummers die eerst moeten worden aangepakt.'),
    approach:W('I built a MySQL pipeline covering import, cleaning, validation and business analysis. Window functions support RFM scoring, while cohort queries track purchasing behaviour after the first order.','Sukūriau MySQL procesą, apimantį importą, valymą, patikrą ir verslo analizę. Langų funkcijos naudojamos RFM vertinimui, o kohortų užklausos seka pirkimus po pirmojo užsakymo.','Ik bouwde een MySQL-pipeline voor import, opschoning, validatie en bedrijfsanalyse. Windowfuncties ondersteunen RFM-scores; cohortqueries volgen het koopgedrag na de eerste bestelling.'),
    findings:[W('36,969 valid orders across 5,878 customers in the project output.','Projekto rezultate – 36 969 tinkami užsakymai ir 5 878 klientai.','De projectoutput bevat 36.969 geldige bestellingen van 5.878 klanten.'),W('RFM segments distinguish high-value, loyal and inactive customer groups.','RFM segmentai atskiria vertingiausius, lojalius ir neaktyvius klientus.','RFM-segmenten onderscheiden waardevolle, loyale en inactieve klantgroepen.'),W('Cohort analysis shows where repeat purchasing drops after acquisition.','Kohortų analizė parodo, kada mažėja pakartotiniai naujų klientų pirkimai.','Cohortanalyse laat zien waar herhaalaankopen afnemen na de eerste aankoop.')],
    outcome:W('A reproducible analytical workflow that turns raw retail records into customer segments and retention views. Each SQL stage is available in the repository for inspection.','Pakartojamas analitinis procesas, paverčiantis mažmeninės prekybos įrašus klientų segmentais ir išlaikymo analize. Kiekvienas SQL etapas pateiktas saugykloje.','Een reproduceerbare analytische workflow die retailgegevens omzet in klantsegmenten en retentieoverzichten. Elke SQL-stap is in de repository te bekijken.'),
    gallery:[['assets/img/portfolio/ecommerce-sql-2.webp',W('Customer analysis','Klientų analizė','Klantanalyse')],['assets/img/portfolio/ecommerce-sql-3.webp',W('Segmentation analysis','Segmentavimo analizė','Segmentatieanalyse')],['assets/img/portfolio/ecommerce-sql-4.webp',W('Further project output','Papildomi projekto rezultatai','Meer projectoutput')]],
  },
  {
    id:'zoom',file:'portfolio-zoom-meeting-generator.html',categories:['automation','ai'],style:'zoom',selected:true,
    title:W('Better follow-ups start with better notes','Geresni užrašai – aiškesni tolesni žingsniai','Betere opvolging begint bij betere notities'),
    category:W('AI · Workflow automation','DI · Procesų automatizavimas','AI · Workflowautomatisering'),
    summary:W('Turning meeting recordings into searchable transcripts, summaries and clear next steps.','Susitikimų įrašų pavertimas transkripcijomis, santraukomis ir aiškiais tolesniais veiksmais.','Vergaderopnames omzetten in doorzoekbare transcripties, samenvattingen en duidelijke vervolgstappen.'),
    image:'assets/img/portfolio/portfolio-zoom-intelligence.webp',tags:['Make.com','Zoom','AI APIs'],legacy:'zoomMeetingGenerator',
    outcome:W('A repeatable way to capture the context of a call and deliver structured notes for follow-up. Human review remains important for AI-generated summaries and recommendations.','Pakartojamas būdas išsaugoti pokalbio kontekstą ir pateikti struktūruotus užrašus tolesniems veiksmams. DI santraukas ir rekomendacijas svarbu peržiūrėti žmogui.','Een herhaalbare manier om de context van een gesprek vast te leggen en gestructureerde notities aan te leveren. Menselijke controle blijft belangrijk bij AI-samenvattingen en aanbevelingen.'),
    gallery:[['assets/img/portfolio/portfolio-zoom-main-2.webp',W('Meeting automation setup','Susitikimų automatizavimo nustatymai','Configuratie van de vergaderautomatisering')],['assets/img/portfolio/portfolio-zoom-main-3.webp',W('Workflow implementation','Proceso įgyvendinimas','Workflowimplementatie')]],
  },
  {
    id:'email',file:'portfolio-auto-emails.html',categories:['automation'],style:'email',selected:true,
    title:W('The right email, without the busywork','Reikiamas laiškas be rankinio darbo','De juiste e-mail, zonder het handwerk'),
    category:W('Automation · Email workflows','Automatizavimas · El. paštas','Automatisering · E-mailprocessen'),
    summary:W('Automated reminders and follow-up messages, connected to the information that triggers them.','Automatiniai priminimai ir tęstiniai laiškai, susieti su juos inicijuojančia informacija.','Automatische herinneringen en vervolgberichten, gekoppeld aan de informatie die ze activeert.'),
    image:'assets/img/portfolio/portfolio-email-automation.webp',tags:['Make.com','Email','Integrations'],legacy:'autoEmails',
    outcome:W('A reusable email workflow that connects records, timing and message delivery in one place. The project demonstrates how routine communications can be made consistent.','Daugkartinis el. pašto procesas, vienoje vietoje jungiantis įrašus, laiką ir siuntimą. Projektas parodo, kaip užtikrinti nuoseklią rutininių pranešimų komunikaciją.','Een herbruikbaar e-mailproces dat gegevens, timing en verzending verbindt. Het project laat zien hoe routinematige communicatie consistenter kan worden.'),gallery:[],
  },
  {
    id:'crm',file:'portfolio-auto-CRM.html',categories:['automation'],style:'crm',selected:true,
    title:W('Connected records. Less repetition.','Sujungti įrašai. Mažiau pasikartojimų.','Verbonden gegevens. Minder herhaling.'),
    category:W('Automation · CRM integration','Automatizavimas · CRM integracija','Automatisering · CRM-integratie'),
    summary:W('Connecting customer records and scheduled reporting to simplify everyday CRM administration.','Klientų įrašų ir reguliarių ataskaitų sujungimas, supaprastinantis kasdienį CRM administravimą.','Klantgegevens en geplande rapportages koppelen om dagelijks CRM-beheer eenvoudiger te maken.'),
    image:'assets/img/portfolio/portfolio-auto-CRM.webp',tags:['Make.com','CRM','Data sync'],legacy:'autoCRM',
    outcome:W('A connected pipeline for customer data and reporting, with fewer separate places to maintain the same information.','Sujungtas klientų duomenų ir ataskaitų procesas, kuriame tą pačią informaciją reikia prižiūrėti mažiau vietų.','Een gekoppeld proces voor klantgegevens en rapportage, met minder losse plekken waar dezelfde informatie bijgehouden moet worden.'),gallery:[],
  },
  {
    id:'website',file:'portfolio-website-build.html',categories:['ai'],style:'website',selected:true,
    title:W('A home for the work','Erdvė mano darbams','Een plek voor het werk'),
    category:W('Web · AI-assisted development','Svetainės · Kūrimas su DI','Web · AI-ondersteunde ontwikkeling'),
    summary:W('A multilingual portfolio connecting practical projects, professional background and direct contact.','Daugiakalbis portfolio, jungiantis praktinius projektus, profesinę patirtį ir tiesioginį kontaktą.','Een meertalig portfolio dat praktische projecten, professionele achtergrond en direct contact verbindt.'),
    image:'assets/img/portfolio/portfolio-website-build.webp',tags:['HTML','CSS','JavaScript'],source:github+'/donpaul.eu',
    problem:W('A portfolio needs to help someone quickly understand what I do, inspect the work and get in touch. The original site’s navigation and repeated templates made that harder than it needed to be.','Portfolio turi padėti greitai suprasti, ką darau, susipažinti su darbais ir susisiekti. Pirminės svetainės navigacija ir pasikartojantys šablonai tai apsunkino.','Een portfolio moet bezoekers snel laten begrijpen wat ik doe, het werk laten bekijken en contact mogelijk maken. De oorspronkelijke navigatie en herhaalde templates maakten dat onnodig lastig.'),
    approach:W('I use AI-assisted development alongside direct editing to build a responsive site with clear project pages. The site supports English, Lithuanian and Dutch, keyboard navigation and a connected contact form.','Naudoju DI pagalbą ir tiesioginį redagavimą kurdamas prisitaikančią svetainę su aiškiais projektų puslapiais. Svetainė palaiko anglų, lietuvių ir olandų kalbas, naršymą klaviatūra ir kontaktinę formą.','Ik combineer AI-ondersteunde ontwikkeling met directe bewerking voor een responsieve site met duidelijke projectpagina’s. De site ondersteunt Engels, Litouws en Nederlands, toetsenbordnavigatie en een gekoppeld contactformulier.'),
    outcome:W('A single, accessible place to explore the projects and understand the thinking behind them. The original portfolio artwork is shown here; the site itself continues to evolve.','Viena prieinama vieta projektams ir jų logikai pažinti. Čia pateikta originali portfolio iliustracija; pati svetainė toliau tobulinama.','Eén toegankelijke plek om de projecten en de aanpak erachter te ontdekken. Hier staat het oorspronkelijke portfoliobeeld; de site blijft zich ontwikkelen.'),gallery:[],
  },
];

// Retain the existing additional project URLs without adding them to the selected-work collection.
for (const [id,file,legacy,image,tags] of [
  ['video','portfolio-video-generator.html','videoGenerator','portfolio-video-generator.webp',['Make.com','AI APIs','Video']],
  ['captions','portfolio-auto-captions.html','autoCaptions','portfolio-auto-captions.webp',['Make.com','AI APIs','Content']],
  ['testimonials','portfolio-testimonial-generator.html','testimonialGenerator','portfolio-testimonial-generator.webp',['Make.com','Templates','Web']],
]) {
  const local = key => Object.fromEntries(languages.map(lang=>[lang, original[lang].portfolioPages?.[legacy]?.[key] || original.en.portfolioPages[legacy][key]]));
  projects.push({id,file,legacy,image:'assets/img/portfolio/'+image,tags,categories:['automation','ai'],style:'automation',selected:false,title:local('heroTitle'),summary:local('heroSub'),category:copy.automation,outcome:local('solutionWhy'),gallery:[]});
}
for (const project of projects.filter(project=>project.legacy)) {
  const local = key => Object.fromEntries(languages.map(lang=>[lang, original[lang].portfolioPages?.[project.legacy]?.[key] || original.en.portfolioPages[project.legacy][key]]));
  project.problem = local('problemWhat');
  project.approach = local('solutionDesigned');
  project.findings = [1,2,3,4].map(i=>local('workflowStep'+i+'Title')).filter(value=>value.en);
}
