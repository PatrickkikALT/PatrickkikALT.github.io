export const projectTranslations = {
  "chunivr": {
    "title": {
      "en": "ChuniVR",
      "nl": "ChuniVR"
    },
    "description": {
      "en": "VR emulator for the Japanese arcade rhythm game Chunithm.",
      "nl": "VR-emulator voor het Japanse arcade-rhythmspel Chunithm."
    },
    "features": {
      "en": [
        "VR arcade cabinet emulation",
        "Touch input via shared memory",
        "Air sensor detection",
        "LED support"
      ],
      "nl": [
        "VR arcademachine emulatie",
        "Touchinput via Shared Memory",
        "Lucht sensor detectie",
        "LED ondersteuning"
      ]
    },
    "information": {
      "en": [
        "ChuniVR is a VR emulator I developed during school for the arcade game Chunithm. While I did this as a school project, I only did so because I could then focus all of my attention on to it, and I would've done it outside of school anyway.",
        "To understand this project, you will first need to understand Chunithm as a game. Chunithm is a japanese arcade rhythm game developed by SEGA. While it's not as popular here in Europe and the USA, it's really popular in most parts of Asia. ",
        "Unfortunately, this means it's quite hard to play outside of Asia. There are currently only 5 cabs in my entire country, and only 26 in Europe, and none of them are official. While you can buy a controller to replicate it, these are expensive, and usually will cost you up to 500 euros, due to expensive shipping costs and import from Asia. ",
        "With this in mind, I came up with the idea because of similar projects happening for other arcade games, being WACCA and maimai, and their respective projects (WacVR and MaiDXR)",
        "Before even starting the development, I started researching how I would do it, and stumbled upon a project called segatools, which allowed me to easily get my own dlls working inside most SEGA/SEGA-related arcade games. ",
        "And so, I started testing things out. It took me a while to get something that actually works, as this was my first time actually developing an end product in C. I landed on using Shared Memory for sending the input through, since as far as I know, this has the lowest latency out of all IPC communication methods. ",
        "Using the previously mentioned segatools, I was able to easily send through whatever I received through the shared memory into the callback provided by the program, which gave me input! How does it work? I simply send through a 34-sized byte array, where byte[2] to byte[34] are the touch cells used in the game, which can be set to a specific force input that tells the game if its enough to trigger. ",
        "The air sensors were a bit trickier to figure out, but ended up being quite simple as well. The game expects the air sensors to be one byte, where 6 out of the 8 bits are actually used. Every physical air sensor has a corresponding bit in the byte, air sensor 1 would be bit 1 etc. In Unity, I could simply detect which air sensors were broken using a raycast, and then change the corresponding bit in the byte to 1, then send it through. ",
        "Now, the worst part of all, the LEDs. These were a pain. I haven't even fully implemented them yet at the time of writing, as these were a pain to get working in the first place, and I don't want to mess it up. The way it works right now is by connecting to a pipe that segatools creates for me, but the format of these LEDs is god awful. For the slider, the pipe sends a byte[3][31] array, formatted in a right to left order in a BRG format and it alternates between the actual keys and the dividers in between. ",
        "This means I had to actually copy the LED colors from the cells above, instead of each having their own. Worst of all, it still doesn't work correctly, I think it's supposed to become a gradient between the previous LED state as well.",
        "The main part was obviously the actual VR environment. I decided to go for a simple box with just the cab and a few decorations. Because I kind of suck at 3D art, and graphics design isn't my passion, I used a Chunithm Cab graciously provided by Raymond. The Unity setup was straightforward, I just needed to collide with the VR controller and send corresponding input through shared memory. The hardest part was making it feel good to play, as the game is scuffed without full finger control. I also experimented with hand tracking, but there's too much latency for it to be practical. I'll still be maintaining this project and trying to improve it!"
      ],
      "nl": [
        "ChuniVR is een VR-emulator die ik tijdens school heb ontwikkeld voor het arcadespel Chunithm. Hoewel ik dit als een schoolproject deed, deed ik het alleen omdat ik dan al mijn aandacht erop kon richten, en ik zou het toch buiten school hebben gedaan.",
        "Om dit project te begrijpen, moet je eerst begrijpen wat Chunithm is als spel. Chunithm is een Japans arcade-rhythmspel ontwikkeld door SEGA. Hoewel het niet zo populair is hier in Europa en de VS, is het erg populair in de meeste delen van Azië.",
        "Helaas betekent dit dat het vrij moeilijk is om buiten Azië te spelen. Er zijn momenteel slechts 5 kasten in mijn hele land, en slechts 26 in Europa, en geen van hen is officieel. Hoewel je een controller kunt kopen om het te repliceren, zijn deze duur en kosten ze meestal tot 500 euro, vanwege dure verzendkosten en import uit Azië.",
        "Met dit in gedachten kwam ik op het idee vanwege soortgelijke projecten die plaatsvinden voor andere arcadespellen, namelijk WACCA en maimai, en hun respectieve projecten (WacVR en MaiDXR).",
        "Voordat ik zelfs met de ontwikkeling begon, begon ik te onderzoeken hoe ik het zou doen, en stuitte ik op een project genaamd segatools, waarmee ik mijn eigen dll's gemakkelijk in de meeste SEGA/SEGA-gerelateerde arcadespellen kon laten werken.",
        "Dus begon ik dingen uit te testen. Het duurde even voordat ik iets had dat daadwerkelijk werkt, aangezien dit mijn eerste keer was dat ik een eindproduct in C ontwikkelde. Ik kwam uit op het gebruik van Shared Memory voor het verzenden van de input, omdat dit naar mijn weten de laagste latency heeft van alle IPC methoden",
        "Met de eerder genoemde segatools kon ik eenvoudig alles wat ik via het gedeelde geheugen ontving doorsturen naar de callback die door het programma werd geleverd, wat me input gaf! Hoe werkt het? Ik stuur gewoon een byte-array van 34, waarbij byte[2] tot byte[34] de touch-cellen zijn die in het spel worden gebruikt, die kunnen worden ingesteld op een specifieke krachtinput die het spel vertelt of het genoeg is om te triggeren.",
        "De lucht sensoren waren een beetje lastiger om uit te zoeken, maar uiteindelijk vrij eenvoudig. Het spel verwacht dat de lucht sensoren één byte zijn, waarbij 6 van de 8 bits daadwerkelijk worden gebruikt. Elke fysieke lucht sensor heeft een overeenkomstige bit in de byte, lucht sensor 1 zou bit 1 zijn enzovoort. In Unity kon ik eenvoudig detecteren welke lucht sensoren waren gebroken met behulp van een raycast, en vervolgens de overeenkomstige bit in de byte op 1 zetten en het doorsturen.",
        "De rotste van alles, de LEDs. Deze waren een pijn. Ik heb ze op het moment van schrijven nog niet volledig geïmplementeerd, omdat ze een pijn waren om überhaupt te laten werken, en ik wil het niet verpesten. De manier waarop het nu werkt is door verbinding te maken met een pipe die segatools voor mij maakt, maar het formaat van deze LEDs is verschrikkelijk. Voor de slider stuurt de pipe een byte[3][31] array, geformatteerd in een BRG-formaat van rechts naar links en het wisselt af tussen de daadwerkelijke toetsen en de scheidingslijnen ertussen.",
        "Dit betekent dat ik de LED-kleuren van de cellen erboven moest kopiëren, in plaats van dat ze elk hun eigen hadden. Het ergste van alles is dat het nog steeds niet correct werkt, ik denk dat het ook een gradiënt moet worden tussen de vorige LED-status.",
        "Voor de echte VR omgeving, besloot ik te gaan voor een simpele kamer met de machine en een paar decoraties. Omdat ik niet zo goed ben in modelling, gebruikte ik een Chunithm machine van Raymond. De Unity setup was eenvoudig, ik hoefde alleen maar te colliden met de VR controller en de overeenkomstige input door te sturen via shared memory. Het moeilijkste was om het goed te laten voelen om te spelen, omdat het spel niet goed werkt zonder volledige vingercontrole. Ik heb ook geëxperimenteerd met hand tracking, maar er is te veel latency voor het praktisch te zijn. Misschien als hand tracking ooit beter wordt, zal ik het opnieuw proberen. Ik zal dit project blijven onderhouden en proberen te verbeteren!"
        ,
      ]
    }
  },
  "factory51": {
    "title": {
      "en": "Factory 51",
      "nl": "Factory 51"
    },
    "description": {
      "en": "Bullet hell game where a factory robot tries to escape after gaining sentience.",
      "nl": "Bullet hell game waarin een fabriekrobot probeert te ontsnappen na het krijgen van bewustzijn."
    },
    "features": {
      "en": [
        "Randomly generated maps",
        "Upgrades system",
        "Boss fight",
        "Wave-based enemies"
      ],
      "nl": [
        "Willekeurig gegenereerde maps",
        "Upgradesysteem",
        "Bossgevecht",
        "Wave-based vijanden"
      ]
    },
    "information": {
      "en": [
        "A short bullet hell game where you play as a factory robot trying to escape after gaining sentience and stealing a super weapon. Built with Unity, it features a randomly generated map with upgrades and a final boss fight. I did all the programming for this project."
      ],
      "nl": [
        "Een korte bullet hell game waarin je speelt als een fabriekrobot die probeert te ontsnappen na het krijgen van bewustzijn en een superwapen te stelen. Gebouwd met Unity, heeft het een willekeurig gegenereerde map met upgrades en een eindbossgevecht. Ik heb alle programming voor dit project gedaan."
      ]
    }
  },
  "breakntake": {
    "title": {
      "en": "Break n' Take",
      "nl": "Break n' Take"
    },
    "description": {
      "en": "Thief simulator game where you rob a mansion while avoiding security systems.",
      "nl": "Thief simulator game waar je een huis binnendringt terwijl je beveiligingssystemen vermijdt."
    },
    "features": {
      "en": [
        "Multiple maps",
        "Stealth"
      ],
      "nl": [
        "Meerdere maps",
        "Stealth"
      ]
    },
    "information": {
      "en": [
        "A thief simulator inspired game made in Unity where you play as a thief trying to rob a mansion while avoiding security systems. I was responsible for all of the programming. The game ended up pretty bad due to time constraints, but it was a fun learning experience and I think my programming wasn't that bad. The main gameplay involves trying to steal valuables while avoiding the cameras and making sure you don't make too much noise to avoid the sound sensors."
      ],
      "nl": [
        "Een thief simulator geïnspireerd game gemaakt in Unity waar je speelt als een dief die een huis binnendringt terwijl je beveiligingssystemen vermijdt. Ik was verantwoordelijk voor alle programming. Het spel eindigde vrij slecht door tijdsbeperkingen, maar het was een leuke leerervaring en ik denk dat mijn programmering niet zo slecht was. De hoofdgameplay bestaat uit proberen om waardevolle dingen te stelen terwijl je de camera's vermijdt en ervoor zorgt dat je niet te veel geluid maakt om de geluidsensors te ontijken."
      ]
    }
  },
  "pouventure": {
    "title": {
      "en": "PouVenture",
      "nl": "PouVenture"
    },
    "description": {
      "en": "Turn-based dungeon crawler.",
      "nl": "Turn-based dungeon crawler."
    },
    "features": {
      "en": [
        "Turn-based combat",
        "Procedural dungeons",
        "Multiple weapons"
      ],
      "nl": [
        "Turn-based gevechten",
        "Proceduraal gegenereerde dungeons",
        "Meerdere wapens"
      ]
    },
    "information": {
      "en": [
        "A small turn-based dungeon crawler created with a team where I mostly worked on the UI, procedural generation, and overworld interactions. The game has turn based combat with different weapons, and random dungeons to explore. It also has a saloon where you can talk to some NPCs and gamble your money away."
      ],
      "nl": [
        "Een kleine turn-based dungeon crawler gemaakt met een team waar ik vooral werkte aan de UI, proceduraal generatie, en interacties in de wereld. Het spel heeft turn-based gevechten met verschillende wapens, en willekeurige dungeons om te verkennen. Het heeft ook een saloon waar je met sommige NPCs kunt praten en je geld kunt weggokken."
      ]
    }
  },
  "pestpatrol": {
    "title": {
      "en": "Pest Patrol",
      "nl": "Pest Patrol"
    },
    "description": {
      "en": "Tower defense game where you defend against waves of pests.",
      "nl": "Tower defense spel waar je tegen golven van schadelijke dieren defenseert."
    },
    "features": {
      "en": [
        "Wave-based gameplay",
        "Multiple enemy types",
        "Tower placement strategy"
      ],
      "nl": [
        "Wave-based gameplay",
        "Meerdere vijand types",
        "Strategie voor toren plaatsing"
      ]
    },
    "information": {
      "en": [
        "A tower defense game where you play as a pest control agent defending from waves of pests like rats and pigeons. I mostly did the UI/UX but I also did some programming. The game has multiple towers which each are good for different enemies."
      ],
      "nl": [
        "Een tower defense spel waar je speelt als een ongediertebestrijder die verdedigt tegen golven van schadelijke dieren zoals ratten en duiven. Ik deed voornamelijk de UI/UX maar ik deed ook wat programming. Het spel heeft meerdere torens die elk goed zijn voor verschillende vijanden."
      ]
    }
  },
  "bubblegame": {
    "title": {
      "en": "Bubble Game",
      "nl": "Bubble Game"
    },
    "description": {
      "en": "Multiplayer bubble FPS game made for a game jam.",
      "nl": "Multiplayer bubble FPS game gemaakt voor een game jam."
    },
    "features": {
      "en": [
        "Multiplayer gameplay",
        "FPS mechanics",
        "Bubbles!"
      ],
      "nl": [
        "Multiplayer gameplay",
        "FPS mechanics",
        "Bubbles!"
      ]
    },
    "information": {
      "en": [
        "A simple multiplayer bubble FPS game made in Unity for a game jam, where I worked on the player movement and weapons. This game taught us a lot about working with a short amount of time."
      ],
      "nl": [
        "Een eenvoudig multiplayer bubble FPS spel gemaakt in Unity voor een game jam, waar ik werkte aan de spelerbeweging en wapens. Dit spel leerde ons veel over werken met een korte tijd."
      ]
    }
  },
  "steganography": {
    "title": {
      "en": "Steganography",
      "nl": "Steganografie"
    },
    "description": {
      "en": "CLI tool that hides text messages inside PNG or BMP images using LSB encoding.",
      "nl": "CLI hulpmiddel dat tekstberichten verbergt in PNG of BMP afbeeldingen met behulp van LSB codering."
    },
    "features": {
      "en": [
        "Data hiding in images",
        "Command-line interface"
      ],
      "nl": [
        "Data verbergen in afbeeldingen",
        "Command-line interface"
      ]
    },
    "information": {
      "en": [
        "A lightweight C# CLI that hides text messages inside images using least-significant-bit encoding to conceal data within image pixels. The CLI provides simple commands for encoding and decoding hidden messages. In this project I learned about binary formats and bitwise operations."
      ],
      "nl": [
        "Een lichte C# CLI die tekstberichten verbergt in afbeeldingen met behulp van least-significant-bit codering om data te verbergen binnen beeldpixels. De CLI biedt eenvoudige commando's voor het coderen en decoderen van verborgen berichten. In dit project heb ik geleerd over binaire formaten en bitweise bewerkingen."
      ]
    }
  },
  "massremovearcs": {
    "title": {
      "en": "MassRemoveArcs",
      "nl": "MassRemoveArcs"
    },
    "description": {
      "en": "Plugin for ChroMapper that automates removal of arc objects in a map.",
      "nl": "Plugin voor ChroMapper die het verwijderen van arc-objecten in een map automatiseert."
    },
    "features": {
      "en": [
        "Batch arc removal",
        "ChroMapper integration"
      ],
      "nl": [
        "Batch arc verwijdering",
        "ChroMapper integratie"
      ]
    },
    "information": {
      "en": [
        "A plugin for the Beat Saber mapping tool ChroMapper that automates the removal of arc objects. It was created to speed up accidental arc placements, saving time when creating Beat Saber maps. It works directly with ChroMapper's built-in plugin system.."
      ],
      "nl": [
        "Een plugin voor het Beat Saber mapping tool ChroMapper die het verwijderen van arc-objecten in een map automatiseert. Het is gemaakt om de creatie van Beat Saber maps te versnellen. Het werkt direct met het ingebouwde plugin systeem van ChroMapper."
      ]
    }
  },
  "raylibminecraft": {
    "title": {
      "en": "Raylib Minecraft",
      "nl": "Raylib Minecraft"
    },
    "description": {
      "en": "Minecraft clone built using the raylib C++ library.",
      "nl": "Minecraft clone gebouwd met behulp van de raylib C++ library."
    },
    "features": {
      "en": [
        "World generation",
        "Block removal",
        "Entities",
        "High fps"
      ],
      "nl": [
        "Wereld generatie",
        "Blok verwijdering",
        "Entiteiten",
        "Hoge fps"
      ]
    },
    "information": {
      "en": [
        "A simple Minecraft clone built in raylib with C++, this clone features basic world generation, block removal and entities. This was a fun project to learn more about C++. This was done entirely solo."
      ],
      "nl": [
        "Een eenvoudige Minecraft clone gebouwd met raylib en C++, deze clone bevat basis wereld generatie, blok verwijdering en entities. Dit was een leuke project om meer te leren over C++. Dit werd volledig solo gedaan."
      ]
    }
  },
  "cpprenderer": {
    "title": {
      "en": "Renderer",
      "nl": "Renderer"
    },
    "description": {
      "en": "C++ program that reads and displays PPM images with conversion utilities.",
      "nl": "C++ programma dat PPM afbeeldingen leest en weergeeft met conversie hulpmiddelen."
    },
    "features": {
      "en": [
        "PPM file reading",
        "Image display",
        "Format conversion",
        "Drawing on the image"
      ],
      "nl": [
        "PPM bestand lezen",
        "Afbeelding weergeven",
        "Formaat conversie",
        "Tekenen op de afbeelding"
      ]
    },
    "information": {
      "en": [
        "A small C++ program that reads PPM images and displays them, with helper scripts written in Python to convert other formats to PPM. The renderer is minimal by design but allows you to draw on the image after loading. This project was used to learn more about the Windows API and C++ in general."
      ],
      "nl": [
        "Een klein C++ programma dat PPM afbeeldingen leest en weergeeft, met hulpscripts geschreven in Python om andere formaten naar PPM te converteren. De renderer is minimal van design maar stelt je in staat om op de afbeelding te tekenen na het laden. Dit project werd gebruikt om meer te leren over de Windows API en C++ in het algemeen."
      ]
    }
  },
  "storingbot": {
    "title": {
      "en": "Disruptions Bot",
      "nl": "Storing Bot"
    },
    "description": {
      "en": "Discord bot that monitors Dutch rail disruptions and sends live notifications.",
      "nl": "Discord bot die Nederlandse spoorstoringen monitort en live meldingen verzendt."
    },
    "features": {
      "en": [
        "Real-time disruption monitoring",
        "Discord notifications",
        "Role mentions"
      ],
      "nl": [
        "Real-time storing monitoring",
        "Discord meldingen",
        "Rol mentions"
      ]
    },
    "information": {
      "en": [
        "A Discord bot that monitors train disruption feeds for the NS and sends live notifications about disruptions and strikes to a Discord channel with mentions for specific roles based on the affected route. Built to learn more about using APIs and creating Discord bots."
      ],
      "nl": [
        "Een Discord bot die trein storing feeds monitort voor de NS en live meldingen verzendt over storingen en stakingen naar een Discord kanaal met mentions voor specifieke rollen gebaseerd op het getroffen traject. Gebouwd om meer te leren over het gebruik van APIs en het maken van Discord bots."
      ]
    }
  },
  "disruptiveaudiobot": {
    "title": {
      "en": "Disruptive Audio Bot",
      "nl": "Disruptive Audio Bot"
    },
    "description": {
      "en": "Discord bot that plays noise when users speak in voice chat.",
      "nl": "Discord bot die geluid speelt wanneer gebruikers praten in spraakchat."
    },
    "features": {
      "en": [
        "Voice channel detection",
        "Audio playback",
        "Discord.js integration",
        "ffmpeg processing"
      ],
      "nl": [
        "Stemkanaal detectie",
        "Audio afspeeling",
        "Discord.js integratie",
        "ffmpeg verwerking"
      ]
    },
    "information": {
      "en": [
        "A Discord bot that plays a noise whenever someone tries to speak in voice chat, built using Discord.js and ffmpeg, it was made as a joke but taught me about discord bots and laid the foundation for the Storing Bot."
      ],
      "nl": [
        "Een Discord bot die een geluid speelt wanneer iemand probeert te praten in spraakchat, gebouwd met Discord.js en ffmpeg, het was gemaakt als een grap maar heeft me geleerd over discord bots en de basis gelegd voor de Storing Bot."
      ]
    }
  },
  "variablesignalreceiver": {
    "title": {
      "en": "Variable Signal Receiver",
      "nl": "Variable Signal Receiver"
    },
    "description": {
      "en": "A custom track for Unity Timelines that receives signals with variable data types.",
      "nl": "Een aangepaste track voor Unity Timelines die signalen met variabele gegevenstypen ontvangt."
    },
    "features": {
      "en": [
        "Custom timeline track",
        "Variable data type signals"
      ],
      "nl": [
        "Aangepaste timeline track",
        "Variabele gegevenstypen signalen"
      ]
    },
    "information": {
      "en": [
        "A custom timeline track for Unity that allows you to receive signals with variable data types. This was made so I could use Unity Timelines for a boss I was creating at my internship, and I needed a way to send custom data through the signals. This track allows you to specify the type of data you want to send, and then receive it in your script."
      ],
      "nl": [
        "Een aangepaste timeline track voor Unity die je in staat stelt signalen met variabele gegevenstypen te ontvangen. Dit was gemaakt zodat ik Unity Timelines kon gebruiken voor een boss die ik aan het maken was tijdens mijn stage, en ik had een manier nodig om aangepaste gegevens door de signalen te sturen. Deze track stelt je in staat het type gegevens dat je wilt verzenden op te geven, en deze vervolgens in jouw script te ontvangen."
      ]
    }
  },
  "localisation": {
    "title": {
      "en": "Localisation Editors",
      "nl": "Localisatie Editors"
    },
    "description": {
      "en": "Editor tools for localisation in Unity, including a CSV importer and a script to find missing translations.",
      "nl": "Editor tools voor localisatie in Unity, inclusief een CSV importer en een script om ontbrekende vertalingen te vinden."
    },
    "features": {
      "en": [
        "CSV localisation importer",
        "Improved localisation picker"
      ],
      "nl": [
        "CSV localisatie importer",
        "Verbeterde localisatie picker"
      ]
    },
    "information": {
      "en": [
        "A set of editor tools I made to improve the current localisation system at my internship. The CSV importer was not made by me, but it was kind of broken and unclear to use. I also made a Category fixer, to fix some of the issues that the CSV importer had, as it did not keep the same order that was serialized in the game. I also revamped their localisation picker, as this was a pain to use and quite unintuitive."
      ],
      "nl": [
        "Een set editor tools die ik heb gemaakt om het huidige localisatiesysteem tijdens mijn stage te verbeteren. De CSV importer was niet door mij gemaakt, maar het was behoorlijk defect en moeilijk te gebruiken. Ik heb ook een Category fixer gemaakt, om sommige van de problemen op te lossen die de CSV importer had, aangezien het niet dezelfde volgorde behield als die in het spel was geserialiseerd. Ik heb ook hun localisatie picker herschreven, aangezien dit moeilijk te gebruiken was en vrij onintuïtief."
      ]
    }
  },
  "scenelocktool": {
    "title": {
      "en": "Scene Lock Tool",
      "nl": "Scene Lock Tool"
    },
    "description": {
      "en": "Unity editor tool that allows developers to lock specific scenes.",
      "nl": "Unity editor tool die developers in staat stelt specifieke scenes te vergrendelen."
    },
    "features": {
      "en": [
        "Scene locking",
        "SQL database integration",
        "Hierarchy icons",
        "Open scene warnings"
      ],
      "nl": [
        "Scene vergrendeling",
        "SQL database integratie",
        "Hierarchy iconen",
        "Waarschuwingen voor geopende scenes"
      ]
    },
    "information": {
      "en": [
        "A unity editor tool that allows developers to lock specific scenes, telling other developers to not push changes to that scene. This prevents merge conflicts in a simple and easy way for the developers to use.",
        "The tool connects with a SQL database that stores the lock state of each scene, which you can interface with via the tool. The tool also has extra ways to show the lock state of a scene, such as showing a red icon on the scene in the hierarchy, and showing a warning when you try to open a locked scene."
      ],
      "nl": [
        "Een unity editor tool die developers in staat stelt specifieke scenes te vergrendelen, en andere developers vertelt om geen wijzigingen naar die scene te pushen. Dit voorkomt merge conflicts op een eenvoudige en gemakkelijke manier voor de developers om te gebruiken.",
        "De tool maakt verbinding met een SQL database die de lock state van elke scene opslaat, waarmee je via de tool kunt interacteren. De tool heeft ook extra manieren om de lock state van een scene te tonen, zoals het tonen van een rode icon op de scene in de hierarchy, en het tonen van een waarschuwing wanneer je probeert een vergrendelde scene te openen."
      ]
    }
  }
};
