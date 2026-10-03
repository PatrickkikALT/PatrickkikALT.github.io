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
    },
    "snippets": [
      {
        "language": "c",
        "filename": "chuniio.c",
        "title": {
          "en": "Reading input from shared memory",
          "nl": "Input lezen uit shared memory"
        },
        "caption": {
          "en": "Shared memory carries a 34-byte packet. Bytes 2 through 33 are the touch cells, each set to a force the game can trigger on.",
          "nl": "Shared memory draagt een pakket van 34 bytes. Byte 2 tot en met 33 zijn de touch-cellen, elk gezet op een kracht waarop het spel kan triggeren."
        },
        "code": "static unsigned __stdcall ShmThreadProc(void* arg) {\n    //open up a named shared memory link\n    g_shm_handle = CreateFileMappingA(\n        INVALID_HANDLE_VALUE,\n        NULL,\n        PAGE_READWRITE,\n        0,\n        34,\n        SHM_NAME);\n    //null handling is boring....\n    if (!g_shm_handle) {\n        OutputDebugStringA(\"ChuniVR: Could not create File Mapping.\");\n        return 1;\n    }\n\n    g_shm_ptr = (uint8_t*)MapViewOfFile(g_shm_handle, FILE_MAP_READ, 0, 0, 34);\n\n    if (!g_shm_ptr) {\n        OutputDebugStringA(\"ChuniVR: Failed to open Shared Memory\");\n        return 1;\n    }\n\n    OutputDebugStringA(\"ChuniVR: Shared Memory Mapped Successfully.\\n\");\n\n    //every frame copy input from shared memory into their corresponding pointers\n    //even if no input is there we should still send it through or chunithm thinks its dead\n    while (!g_shm_thread_stop) {\n        //custom coin opcode\n        if (g_shm_ptr[0] == 0x04) {\n          g_coin_count++;\n        }\n        else {\n          g_opbtn_state |= g_shm_ptr[0];\n        }\n        g_beam_state = g_shm_ptr[1];\n        memcpy(g_slider_state, &g_shm_ptr[2], 32); // 2 bytes offset: first 2 are opbtn and beam\n        Sleep(1); // 1ms = 1khz input\n    }\n\n    //once while loop stops we close the shared memory and stop the thread.\n    UnmapViewOfFile(g_shm_ptr);\n    CloseHandle(g_shm_handle);\n    g_shm_ptr = NULL;\n    g_shm_handle = NULL;\n\n    return 0;\n}"
      },
      {
        "language": "csharp",
        "filename": "LEDManager",
        "title": {
          "en": "Reading output from the LEDs",
          "nl": "Output lezen van de LEDs"
        },
        "caption": {
          "en": "One LED is represented by 3 bytes, in a BRG format. The pipe sends a 3x31 array, alternating between the actual keys and the dividers in between. A 0xD0 is used as an escape character.",
          "nl": "Een LED wordt weergegeven door 3 bytes, in een BRG-formaat. De pipe stuurt een 3x31 array, afwisselend tussen de daadwerkelijke toetsen en de scheidingslijnen ertussen. Een 0xD0 wordt gebruikt als escape-teken."
        },
        "code": "private void ReadFromPipe() {\n    try {\n      var rawBuffer = new byte[2048];\n      bool escapeNext = false;\n\n      while (keepReading && pipeClient.IsConnected) {\n        int bytesRead = pipeClient.Read(rawBuffer, 0, rawBuffer.Length);\n        if (bytesRead > 0) {\n          for (int i = 0; i < bytesRead; i++) {\n            byte b = rawBuffer[i];\n\n            //keep other threads from accessing this data while we are busy with it.\n            lock (receivedData) {\n              //if an escape byte is found, we need to skip it and use the next one\n              //segatools.ini:\n              //0xD0 is used as an escape character -- if you receive D0 in the output, ignore\n              //it and use the next sent byte plus one instead.\n              if (escapeNext) {\n                receivedData.Add((byte)(b + 1));\n                escapeNext = false;\n              }\n              else if (b == 0xD0) {\n                escapeNext = true;\n              }\n              else {\n                receivedData.Add(b);\n              }\n            }\n          }\n        }\n        else {\n          Thread.Sleep(1);\n        }\n      }\n    }\n    catch (Exception e) {\n      Debug.LogError(\"Error reading from pipe: \" + e.Message);\n    }\n  }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "DungeonGenerator.cs",
        "title": {
          "en": "Generating a dungeon",
          "nl": "Een dungeon genereren"
        },
        "caption": {
          "en": "A simple dungeon generator that creates a random layout.",
          "nl": "Een eenvoudige dungeon generator die een willekeurige lay-out maakt."
        },
        "code": "  private void GenerateRooms() {\n    int baseEnd = dungeonSize / 3;\n    int windowEnd = 2 * dungeonSize / 3;\n\n    for (int i = 0; i < _positions.Count; i++) {\n      bool isBossRoom = i == _positions.Count - 1;\n      GameObject newRoom;\n      if (isBossRoom) {\n        newRoom = Instantiate(bossRoom, _positions[i], Quaternion.identity);\n        newRoom.GetComponent<Room>().bossRoom = true;\n      }\n      else {\n        GameObject[] currentRoomSet = i < baseEnd ? baseRoomPrefabs :\n          i < windowEnd ? windowRoomPrefabs :\n          xRoomPrefabs;\n        newRoom = Instantiate(currentRoomSet.Random(), _positions[i], Quaternion.identity);\n      }\n\n      newRoom.GetComponent<Room>().id = i;\n      newRoom.transform.parent = parent;\n\n      roomsInstance.Add(newRoom);\n\n      if (i == 0) {\n        var room = newRoom.GetComponent<Room>();\n        room.disabled = true;\n      }\n\n      if (i > 0) {\n        Room newRoomScript = roomsInstance[i].GetComponent<Room>();\n        Room lastRoomScript = roomsInstance[i - 1].GetComponent<Room>();\n        Vector3 prevPos = _positions[i - 1];\n        Vector3 currPos = _positions[i];\n        Vector3 direction = currPos - prevPos;\n\n        GameObject hallwayPrefab = isBossRoom\n          ? bossHallwayPrefab\n          : GetHallwayForTransition(i - 1, i, baseEnd, windowEnd);\n\n        InstantiateHallwayBetween(prevPos, currPos, hallwayPrefab, isBossRoom);\n        try {\n          OpenDoors(newRoomScript, lastRoomScript, direction);\n        }\n        catch {\n          throw new IndexOutOfRangeException();\n        }\n      }\n\n      if (!isBossRoom && i % roomsUntilChest == 0 && i != 0) {\n        Transform pos = roomsInstance[i].GetComponent<Room>().chestLocations.Random();\n        Instantiate(chestPrefab, pos.position, pos.rotation);\n      }\n    }\n\n    parent.GetComponent<NavMeshSurface>().BuildNavMesh();\n  }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "SoundDetector.cs",
        "title": {
          "en": "Tripping a sound detector",
          "nl": "Een geluidsdetector triggeren"
        },
        "caption": {
          "en": "Footsteps and bumped objects emit noise. A sensor alerts if that noise reaches it.",
          "nl": "Voetstappen en aangestoten objecten maken geluid. Een sensor slaat alarm als dat geluid hem bereikt."
        },
        "code": "  public void ReceiveSound(GameObject sender, Severity severity)\n  {\n    if (!_canCurrentlyReceiveSound) return;\n    float soundSeverity = GetSoundSeverity(severity, Vector3.Distance(transform.position, sender.transform.position));\n    switch (soundSeverity)\n    {\n      case <= 1:\n        break;\n      case <= 3:\n        Counter++;\n        break;\n      case <= 6:\n        Counter += 4;\n        break;\n      default:\n        Counter += 6;\n        break;\n    }\n  }\n\n  private static float GetSoundSeverity(Severity severity, float distance)\n  {\n    float result = distance switch\n    {\n      <= 10f => 6,\n      <= 15f => 5,\n      <= 20f => 4,\n      <= 25f => 3,\n      <= 30f => 2,\n      _ => 1\n    };\n    return result * ((float)severity / 10);\n  }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "NewGeneration.cs",
        "title": {
          "en": "Generating a dungeon",
          "nl": "Een dungeon genereren"
        },
        "caption": {
          "en": "Generates a dungeon using a Wave Function Collapse algorithm, which keeps generating rooms up to the max size.",
          "nl": "Genereert een dungeon met behulp van een Wave Function Collapse-algoritme, dat blijft genereren van kamers tot de maximale grootte."
        },
        "code": "void UpdateGeneration()\n    {\n        List<Cell> newCells = new(gridList);\n        for (int x = 0; x < maxXZ; x++)\n        {\n            for (int y = 0; y < maxXZ; y++)\n            {\n                var index = x + y * maxXZ;\n                if (gridList[index].collapsed)\n                {\n                    newCells[index] = gridList[index];\n                }\n                else\n                {\n                    List<Tile> options = new();\n                    foreach (var v in tileObjects) \n                    {\n                        options.Add(v);\n                    }\n                    if (y > 0)\n                    {\n                        Cell up = gridList[x + (y - 1) * maxXZ];\n                        List<Tile> validOptions = new();\n                        foreach (var possible in up.tiles)\n                        {\n                            var valOp = Array.FindIndex(tileObjects, obj => obj == possible);\n                            var valid = tileObjects[valOp].up;\n                            validOptions = validOptions.Concat(valid).ToList();\n                        }\n                        CheckValidity(options, validOptions);\n                    }\n                    if (x < maxXZ - 1)\n                    {\n                        Cell right = gridList[x + 1 + y * maxXZ];\n                        List<Tile> validOptions = new();\n                        foreach (Tile possible in right.tiles)\n                        {\n                            var valOp = Array.FindIndex(tileObjects, obj => obj == possible);\n                            var valid = tileObjects[valOp].right;\n                            validOptions = validOptions.Concat(valid).ToList();\n                        }\n                        CheckValidity(options, validOptions);\n                    }\n                    if (y < maxXZ - 1)\n                    {\n                        Cell down = gridList[x + (y + 1) * maxXZ];\n                        List<Tile> validOptions = new();\n                        foreach (Tile possible in down.tiles)\n                        {\n                            var valOp = Array.FindIndex(tileObjects, obj => obj == possible);\n                            var valid = tileObjects[valOp].down;\n                            validOptions = validOptions.Concat(valid).ToList();\n                        }\n                        CheckValidity(options, validOptions);\n                    }\n                    if (x > 0)\n                    {\n                        Cell left = gridList[x - 1 + y * maxXZ];\n                        List<Tile> validOptions = new();\n                        foreach (Tile possible in left.tiles)\n                        {\n                            var valOp = Array.FindIndex(tileObjects, obj => obj == possible);\n                            var valid = tileObjects[valOp].left;\n                            validOptions = validOptions.Concat(valid).ToList();\n                        }\n                        CheckValidity(options, validOptions);\n                    }\n                    Tile[] newTiles = new Tile[options.Count];\n                    for (int i = 0; i < options.Count; i++)\n                    {\n                        newTiles[i] = options[i];\n                    }\n\n                    newCells[index].RecreateCell(newTiles);\n                }\n            }\n        }\n        gridList = newCells;\n        iterations++;\n        if (iterations < maxXZ * maxXZ)\n        {\n            StartCoroutine(CheckEntropy());\n        }\n    }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "BubbleGun.cs",
        "title": {
          "en": "Firing a bubble",
          "nl": "Een bubbel afvuren"
        },
        "caption": {
          "en": "This weapon had to be networked, which was also my first time working with multiplayer.",
          "nl": "Dit wapen moest worden ge-netwerkt, wat ook mijn eerste keer was om met multiplayer te werken."
        },
        "code": "    public virtual void Shoot()\n    {\n        if (_currentTask != null) return;\n        if (remainingAmmo <= 0)\n        {\n            Reload(_reloadTime);\n            return;\n        }\n        InstantiateBullet_ServerRPC(NetworkManager.LocalClientId);\n        remainingAmmo--;\n\n        HUDUpdater.Instance.UpdateAmmo(remainingAmmo);\n    }\n    \n\n    [ServerRpc(RequireOwnership = false)]\n    private void InstantiateBullet_ServerRPC(ulong clientId)\n    {\n        NetworkObject b = Instantiate(bubble, shootPos.position, shootPos.rotation * Quaternion.Euler(Random.Range(-so.spread.x, so.spread.x), Random.Range(-so.spread.y, so.spread.y), Random.Range(-so.spread.z, so.spread.z))).GetComponent<NetworkObject>();\n        b.GetComponent<Bullet>().SetVariables(transform.root.gameObject, so.damage, Random.Range(so.minSpeed, so.maxSpeed));\n        b.SpawnWithOwnership(clientId);\n    }\n\n    public void PrematureReload()\n    {\n        if (_currentTask != null) return;\n        int t = _reloadTime - (remainingAmmo * maxAmmo * 10);\n        Reload(t);\n    }"
      }
    ]
  },
  "aimtrainer": {
    "title": {
      "en": "Aim Trainer",
      "nl": "Aim Trainer"
    },
    "description": {
      "en": "My first project, a simple Unity aim trainer made for a school essay.",
      "nl": "Mijn eerste project, een simpele Unity aim trainer gemaakt voor een schoolwerkstuk."
    },
    "features": {
      "en": [
        "Mouse look",
        "Click to shoot",
        "Random target positions",
        "Score counter"
      ],
      "nl": [
        "Muis kijken",
        "Klikken om te schieten",
        "Willekeurige targetposities",
        "Scoreteller"
      ]
    },
    "information": {
      "en": [
        "Aim Trainer is the first actual project I ever made. I built it in 2022-2023 for my PWS, a final essay for school. It is a small Unity game where you look around with the mouse and click to shoot targets.",
        "A click sends a ray from the center of the screen. If it hits a target, that target jumps to a new random spot inside a box, and a score counter writes the total onto a text label. I made it in Unity 2019.3, and it is pretty rough, but it is where I started."
      ],
      "nl": [
        "Aim Trainer is het eerste echte project dat ik ooit heb gemaakt. Ik heb het in 2022 gebouwd voor mijn PWS. Het is een klein Unity-spel waarin je met de muis rondkijkt en klikt om targets te schieten.",
        "Een klik stuurt een ray vanuit het midden van het scherm. Als die een target raakt, springt die target naar een nieuwe willekeurige plek in een box, en een scoreteller schrijft het totaal op een tekstlabel. Ik heb het gemaakt in Unity 2019.3, en het is vrij ruw, maar het is waar ik begonnen ben."
      ]
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "TargetSchieter.cs",
        "title": {
          "en": "Shooting from the crosshair",
          "nl": "Schieten vanuit het vizier"
        },
        "caption": {
          "en": "The click casts a ray through the middle of the view. A hit tells that target to move.",
          "nl": "De klik stuurt een ray door het midden van het beeld. Een treffer laat die target verplaatsen."
        },
        "code": "if (Input.GetMouseButtonDown(0))\n{\n    // maakt een ray dat als cursor werkt\n    Ray ray = cam.ViewportPointToRay(new Vector3(0.5f, 0.5f));\n    if (Physics.Raycast(ray, out RaycastHit hit))\n    {\n        target target = hit.collider.gameObject.GetComponent<target>();\n        if (target != null)\n        {\n            target.Hit();\n        }\n    }\n}"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "Program.cs",
        "title": {
          "en": "Encoding and decoding messages in images",
          "nl": "Berichten coderen en decoderen in afbeeldingen"
        },
        "caption": {
          "en": "This code embeds a message into an image by modifying the least significant bits of the pixel colors, and can also decode a message from an image.",
          "nl": "Deze code embedt een bericht in een afbeelding door de minst significante bits van de pixelkleuren te wijzigen, en kan ook een bericht decoderen uit een afbeelding."
        },
        "code": "public static void EmbedMessage(string imagePath, string outputPath, string message) {\n    Bitmap bmp = new Bitmap(imagePath);\n    string binary = StringToBinary(message);\n    \n    int index = 0;\n    for (int y = 0; y < bmp.Height; y++) {\n      for (int x = 0; x < bmp.Width; x++) {\n        Color pixel = bmp.GetPixel(x, y);\n        if (index >= binary.Length) break;\n\n        byte r = pixel.R;\n        byte g = pixel.G;\n        byte b = pixel.B;\n        \n        //embed binary data into the image to create a message that can later be decoded at the end of every pixel.\n        //every time an if statement's requirements get met it does index++ so we need to check again for every color value\n        r = EmbedBit(r, binary, ref index);\n        g = EmbedBit(g, binary, ref index);\n        b = EmbedBit(b, binary, ref index);\n        bmp.SetPixel(x, y, Color.FromArgb(r, g, b));\n      }\n    }\n    bmp.Save(outputPath);\n  }\n\n  public static string DecodeMessage(string imagePath) {\n    Bitmap bmp = new Bitmap(imagePath);\n    StringBuilder binary = new StringBuilder();\n    StringBuilder text = new StringBuilder();\n    for (int y = 0; y < bmp.Height; y++) {\n      for (int x = 0; x < bmp.Width; x++) {\n        Color pixel = bmp.GetPixel(x, y);\n        \n        //get last bits from rgb\n        binary.Append((pixel.R & 1).ToString());\n        binary.Append((pixel.G & 1).ToString());\n        binary.Append((pixel.B & 1).ToString());\n\n        //when we have 8 bits, convert to a char and append to text\n        while (binary.Length >= 8) {\n          string byteString = binary.ToString(0, 8);\n          binary.Remove(0, 8);\n          char c = (char)Convert.ToByte(byteString, 2);\n          if (c == '\\0') return text.ToString(); // '/0' means end of message\n          text.Append(c);\n        }\n      }\n    }\n    return text.ToString();\n  }\n  \n  static byte EmbedBit(byte color, string binary, ref int index) {\n    //if there's still binary data left, replace the color's last bit with the next bit from the binary message\n    //index++ moves to the next bit for the next color\n    //if there's no more data, keep the color the same\n    return (index < binary.Length) ? (byte)((color & ~1) | (binary[index++] - '0')) : color;\n  }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "RemoveArcs.cs",
        "title": {
          "en": "Clearing every arc",
          "nl": "Elke arc verwijderen"
        },
        "caption": {
          "en": "This code removes all selected arcs from the map.",
          "nl": "Deze code verwijdert alle geselecteerde arcs uit de map."
        },
        "code": "        public void RemoveArcs()\n        {\n            var foundArcs = SelectionController.SelectedObjects.Where(IsArc).Cast<BaseArc>().ToList();\n            \n            if (foundArcs.Count == 0) return;\n            \n            var collection = BeatmapObjectContainerCollection.GetCollectionForType(foundArcs[0].ObjectType);\n            collection.RemoveConflictingObjects(foundArcs);\n            foreach (var arc in foundArcs)\n            {\n                collection.DeleteObject(arc, triggersAction: false);\n            }\n            BeatmapActionContainer.AddAction(new SelectionDeletedAction(foundArcs));\n        }"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "cpp",
        "filename": "entities.cpp",
        "title": {
          "en": "A very basic pig entity",
          "nl": "Een zeer eenvoudige varken entiteit"
        },
        "caption": {
          "en": "A simple pig entity that wanders around the world.",
          "nl": "Een eenvoudige varken entiteit die rondloopt in de wereld."
        },
        "code": "bool pigCellWalkable(PigGroundProbe groundProbe, int x, int z, int& groundY)\n{\n    float y = 0.0f;\n    if (!groundProbe(static_cast<float>(x) + 0.5f, static_cast<float>(z) + 0.5f, y)) return false;\n    groundY = static_cast<int>(std::floor(y));\n    return true;\n}\n\nbool pigCanMoveBetween(PigGroundProbe groundProbe, int fromX, int fromZ, int toX, int toZ)\n{\n    int fromY = 0;\n    int toY = 0;\n    if (!pigCellWalkable(groundProbe, fromX, fromZ, fromY) || !pigCellWalkable(groundProbe, toX, toZ, toY)) return false;\n    return std::abs(toY - fromY) <= 1;\n}\n\nbool findPigPathStep(PigGroundProbe groundProbe, Vector3 from, Vector3 desired, Vector3& next)\n{\n    constexpr int Radius = 4;\n    constexpr int Size = Radius * 2 + 1;\n    constexpr int Count = Size * Size;\n    const int startX = static_cast<int>(std::floor(from.x));\n    const int startZ = static_cast<int>(std::floor(from.z));\n    const int goalX = static_cast<int>(std::floor(desired.x));\n    const int goalZ = static_cast<int>(std::floor(desired.z));\n    auto indexOf = [](int lx, int lz) { return lz * Size + lx; };\n\n    std::array<int, Count> parent{};\n    std::array<int, Count> queue{};\n    parent.fill(-2);\n    int head = 0;\n    int tail = 0;\n    const int start = indexOf(Radius, Radius);\n    parent[start] = -1;\n    queue[tail++] = start;\n\n    int best = start;\n    int bestScore = std::abs(startX - goalX) + std::abs(startZ - goalZ);\n    static constexpr int ox[4] = {1, -1, 0, 0};\n    static constexpr int oz[4] = {0, 0, 1, -1};\n\n    while (head < tail)\n    {\n        const int current = queue[head++];\n        const int lx = current % Size;\n        const int lz = current / Size;\n        const int wx = startX + lx - Radius;\n        const int wz = startZ + lz - Radius;\n        const int score = std::abs(wx - goalX) + std::abs(wz - goalZ);\n        if (score < bestScore)\n        {\n            bestScore = score;\n            best = current;\n            if (score == 0) break;\n        }\n\n        for (int i = 0; i < 4; ++i)\n        {\n            const int nlx = lx + ox[i];\n            const int nlz = lz + oz[i];\n            if (nlx < 0 || nlx >= Size || nlz < 0 || nlz >= Size) continue;\n            const int ni = indexOf(nlx, nlz);\n            if (parent[ni] != -2) continue;\n            if (!pigCanMoveBetween(groundProbe, wx, wz, startX + nlx - Radius, startZ + nlz - Radius)) continue;\n            parent[ni] = current;\n            queue[tail++] = ni;\n        }\n    }\n\n    if (best == start) return false;\n    int step = best;\n    while (parent[step] != start && parent[step] != -1) step = parent[step];\n\n    const int sx = startX + (step % Size) - Radius;\n    const int sz = startZ + (step / Size) - Radius;\n    float y = 0.0f;\n    if (!groundProbe(static_cast<float>(sx) + 0.5f, static_cast<float>(sz) + 0.5f, y)) return false;\n    next = {static_cast<float>(sx) + 0.5f, y, static_cast<float>(sz) + 0.5f};\n    return true;\n}\n\nvoid addPigAt(Vector3 position, float yaw)\n{\n    PigEntity pig;\n    pig.position = position;\n    pig.yaw = yaw;\n    pig.wanderTimer = 0.8f;\n    pig.pathTimer = 0.0f;\n    pig.speed = 0.0f;\n    pig.hasTarget = false;\n    pig.hasPathStep = false;\n    pigs.push_back(pig);\n}\n}\n\nvoid SpawnPigsAround(Vector3 player, PigGroundProbe groundProbe)\n{\n    constexpr int EntityCellSize = 32;\n    constexpr int EntityCellRadius = 3;\n    constexpr int MaxPigs = 28;\n    const int centerX = floorDiv(static_cast<int>(std::floor(player.x)), EntityCellSize);\n    const int centerZ = floorDiv(static_cast<int>(std::floor(player.z)), EntityCellSize);\n\n    pigs.erase(std::remove_if(pigs.begin(), pigs.end(), [&](const PigEntity& pig) {\n        return Vector3DistanceSqr(pig.position, player) > 190.0f * 190.0f;\n    }), pigs.end());\n\n    for (int dz = -EntityCellRadius; dz <= EntityCellRadius && static_cast<int>(pigs.size()) < MaxPigs; ++dz)\n    {\n        for (int dx = -EntityCellRadius; dx <= EntityCellRadius && static_cast<int>(pigs.size()) < MaxPigs; ++dx)\n        {\n            const ChunkCoord cell{centerX + dx, centerZ + dz};\n            if (spawnedPigCells.find(cell) != spawnedPigCells.end()) continue;\n            spawnedPigCells.insert(cell);\n\n            if (hash2(cell.x, cell.z) < 0.78f) continue;\n            const int count = 1 + static_cast<int>(hash2(cell.x + 19, cell.z - 7) * 2.0f);\n            for (int i = 0; i < count && static_cast<int>(pigs.size()) < MaxPigs; ++i)\n            {\n                const float px = static_cast<float>(cell.x * EntityCellSize) + 4.0f + hash2(cell.x * 11 + i, cell.z * 17) * 24.0f;\n                const float pz = static_cast<float>(cell.z * EntityCellSize) + 4.0f + hash2(cell.x * 23, cell.z * 13 + i) * 24.0f;\n                float py = 0.0f;\n                if (!groundProbe(px, pz, py)) continue;\n\n                addPigAt({px, py, pz}, hash2(cell.x + i * 5, cell.z - i * 9) * PI * 2.0f);\n                pigs.back().wanderTimer = 0.5f + hash2(cell.x - i, cell.z + i) * 2.5f;\n                pigs.back().speed = 0.5f;\n            }\n        }\n    }\n}\n\nvoid UpdatePigs(float dt, PigGroundProbe groundProbe)\n{\n    for (PigEntity& pig : pigs)\n    {\n        pig.wanderTimer -= dt;\n        if (pig.wanderTimer <= 0.0f)\n        {\n            pig.wanderTimer = 1.2f + hash2(static_cast<int>(pig.position.x * 7.0f), static_cast<int>(pig.position.z * 5.0f)) * 2.0f;\n            const float angle = hash2(static_cast<int>(pig.position.x * 13.0f), static_cast<int>(pig.position.z * 19.0f)) * PI * 2.0f;\n            const float distance = 3.0f + hash2(static_cast<int>(pig.position.x * 3.0f), static_cast<int>(pig.position.z * 3.0f)) * 7.0f;\n            pig.target = {\n                pig.position.x + std::sin(angle) * distance,\n                pig.position.y,\n                pig.position.z + std::cos(angle) * distance\n            };\n            pig.hasTarget = true;\n            pig.hasPathStep = false;\n            pig.pathTimer = 0.0f;\n            pig.speed = 0.9f;\n        }\n\n        if (!pig.hasTarget) continue;\n\n        pig.pathTimer -= dt;\n        if (!pig.hasPathStep || pig.pathTimer <= 0.0f)\n        {\n            if (!findPigPathStep(groundProbe, pig.position, pig.target, pig.pathStep))\n            {\n                pig.hasTarget = false;\n                pig.hasPathStep = false;\n                pig.speed = 0.0f;\n                continue;\n            }\n            pig.hasPathStep = true;\n            pig.pathTimer = 0.35f;\n        }\n\n        Vector3 toStep = Vector3Subtract(pig.pathStep, pig.position);\n        toStep.y = 0.0f;\n        const float distanceToStep = Vector3Length(toStep);\n        if (distanceToStep < 0.10f)\n        {\n            pig.position = pig.pathStep;\n            pig.hasPathStep = false;\n            if (Vector3DistanceSqr(pig.position, pig.target) < 1.4f)\n            {\n                pig.hasTarget = false;\n                pig.hasPathStep = false;\n                pig.speed = 0.0f;\n            }\n        }\n        else\n        {\n            const Vector3 dir = Vector3Scale(toStep, 1.0f / distanceToStep);\n            const float move = std::min(distanceToStep, pig.speed * dt);\n            const Vector3 next = Vector3Add(pig.position, Vector3Scale(dir, move));\n            pig.position = {next.x, Lerp(pig.position.y, pig.pathStep.y, std::min(1.0f, dt * 10.0f)), next.z};\n            pig.yaw = std::atan2(dir.x, dir.z);\n        }\n    }\n}\n\nvoid SummonPig(Vector3 player, Vector3 forward, PigGroundProbe groundProbe)\n{\n    Vector3 flatForward{forward.x, 0.0f, forward.z};\n    if (Vector3LengthSqr(flatForward) < 0.01f) flatForward = {0.0f, 0.0f, 1.0f};\n    flatForward = Vector3Normalize(flatForward);\n\n    for (float distance = 2.0f; distance <= 9.0f; distance += 1.0f)\n    {\n        const float x = player.x + flatForward.x * distance;\n        const float z = player.z + flatForward.z * distance;\n        float y = 0.0f;\n        if (!groundProbe(x, z, y)) continue;\n        addPigAt({x, y, z}, std::atan2(-flatForward.x, -flatForward.z));\n        return;\n    }\n\n    const int x = static_cast<int>(std::floor(player.x + flatForward.x * 3.0f));\n    const int z = static_cast<int>(std::floor(player.z + flatForward.z * 3.0f));\n    addPigAt({static_cast<float>(x) + 0.5f, static_cast<float>(terrainHeight(x, z)) + 0.02f, static_cast<float>(z) + 0.5f}, 0.0f);\n}\n\nvoid DrawPigs(Model& pigModel, Vector3 player)\n{\n    constexpr float PigModelScale = 3.2f;\n    constexpr float PigFootOffset = 0.2032f * PigModelScale;\n    for (const PigEntity& pig : pigs)\n    {\n        if (Vector3DistanceSqr(pig.position, player) > 130.0f * 130.0f) continue;\n        DrawModelEx(\n            pigModel,\n            {pig.position.x, pig.position.y + PigFootOffset, pig.position.z},\n            {0.0f, 1.0f, 0.0f},\n            pig.yaw * RAD2DEG,\n            {PigModelScale, PigModelScale, PigModelScale},\n            WHITE\n        );\n    }\n}"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "cpp",
        "filename": "Ppm.cpp",
        "title": {
          "en": "Creating a bitmap from a PPM file.",
          "nl": "Een bitmap maken van een PPM-bestand."
        },
        "caption": {
          "en": "A function to read a PPM file and create a bitmap.",
          "nl": "Een functie om een PPM-bestand te lezen en een bitmap te maken."
        },
        "code": "HBITMAP CreateBitmapFromPPM(const PPMImage& img)\n{\n    BITMAPINFO bmi = {};\n    bmi.bmiHeader.biSize = sizeof(BITMAPINFOHEADER);\n    bmi.bmiHeader.biWidth = img.width;\n    bmi.bmiHeader.biHeight = -img.height;\n    bmi.bmiHeader.biPlanes = 1;\n    bmi.bmiHeader.biBitCount = 24;\n    bmi.bmiHeader.biCompression = BI_RGB;\n\n    HDC hdc = GetDC(nullptr);\n    HBITMAP hBitmap = CreateDIBSection(hdc, &bmi, DIB_RGB_COLORS, reinterpret_cast<void**>(&g_pBits), nullptr, 0);\n    ReleaseDC(nullptr, hdc);\n\n    if (hBitmap && g_pBits) {\n        unsigned char* dest = static_cast<unsigned char*>(g_pBits);\n        g_rowSize = ((img.width * 3 + 3) & ~3);\n\n        for (int y = 0; y < img.height; ++y) {\n            for (int x = 0; x < img.width; ++x) {\n                int srcIdx = (y * img.width + x) * 3;\n                int dstIdx = y * g_rowSize + x * 3;\n\n                dest[dstIdx + 0] = img.pixels[srcIdx + 2];\n                dest[dstIdx + 1] = img.pixels[srcIdx + 1];\n                dest[dstIdx + 2] = img.pixels[srcIdx + 0];\n            }\n        }\n\n    }\n\n    return hBitmap;\n}"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "javascript",
        "filename": "request.js",
        "title": {
          "en": "Getting the current disruptions from the NS API and pings roles based on the affected route.",
          "nl": "De huidige storingen ophalen van de NS API en pinged rollen gebaseerd op het getroffen traject."
        },
        "caption": {
          "en": "A disruption for a known route pings that route's role. Anything else is posted without a mention.",
          "nl": "Een storing op een bekend traject pinged de rol van dat traject. Al het andere wordt geplaatst zonder mention."
        },
        "code": "function parseSimple(events) {\n    return events\n    .filter(e => e.isActive)\n    .map(e => {\n        let title = e.title;\n        for (const [keyword, tag] of Object.entries(roles)) {\n            if (e.title.includes(keyword)) {\n                title += `\\n${tag}`;\n            }\n        }\n        return `**${e.type}** - _Active_\\n${title}\\n`;\n    })\n    .join('\\n');\n}\n\n\nmodule.exports = async function getStoringen() {\n    const response = await fetch(uri, {\n        headers: {\n            'Ocp-Apim-Subscription-Key': nsapi,\n        }\n    })\n\n    const json = await response.json();\n    if (!response.ok) {\n        console.log(response.statusText);\n    }\n\n    const stationNames = Array.isArray(stations)\n        ? stations\n        : stations && typeof stations === 'object'\n            ? Object.values(stations)\n            : [];\n\n    const effectiveStations = stationNames.length ? stationNames : [\"Zwolle\"];\n\n    const lowered = effectiveStations.map(s => String(s).toLowerCase());\n    const filtered = json.filter(item => {\n        const title = (item.title || '').toLowerCase();\n        return lowered.some(name => title.includes(name));\n    });\n\n    return parseSimple(filtered);\n\n}"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "javascript",
        "filename": "audio.js",
        "title": {
          "en": "Playing noise when someone speaks",
          "nl": "Geluid afspelen wanneer iemand praat"
        },
        "caption": {
          "en": "The voice connection hears a user start talking and immediately plays the noise clip back into the channel.",
          "nl": "De voice-verbinding hoort dat een gebruiker begint te praten en speelt meteen de geluidsclip terug het kanaal in."
        },
        "code": "module.exports = {\n    data: new SlashCommandBuilder()\n        .setName('join')\n        .setDescription(\"joins your channel\"),\n    async execute(interaction) {\n        const member = interaction.guild.members.cache.get(interaction.user.id);\n        const voiceChannel = member.voice.channel;\n        if (voiceChannel) {\n            interaction.reply(\"Joined your voice channel\");\n            const connection = joinVoiceChannel({\n                channelId: voiceChannel.id,\n                guildId: voiceChannel.guild.id,\n                adapterCreator: voiceChannel.guild.voiceAdapterCreator\n            })\n            const subscription = connection.subscribe(player)\n            connection.receiver.speaking.on('start', (userId) => {\n                player.play(createAudioResource(path));\n            })\n            connection.receiver.speaking.on('end', (userId) => {\n                player.stop();\n            })\n        }\n        else {\n            interaction.reply(\"You're not in a voice channel.\")\n        }\n    }\n}"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "none",
        "title": {
          "en": "none",
          "nl": "geen"
        },
        "caption": {
          "en": "Because of a confidentiality clause, I cannot show any code for this project. In agreement with my internship, I am allowed to show the finished product, but not the code.",
          "nl": "Vanwege een geheimhouding clause, kan ik geen code voor dit project laten zien. In overeenstemming met mijn stage, mag ik het eindproduct laten zien, maar niet de code."
        },
        "code": "n/a"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "none",
        "title": {
          "en": "none",
          "nl": "geen"
        },
        "caption": {
          "en": "Because of a confidentiality clause, I cannot show any code for this project. In agreement with my internship, I am allowed to show the finished product, but not the code.",
          "nl": "Vanwege een geheimhouding clause, kan ik geen code voor dit project laten zien. In overeenstemming met mijn stage, mag ik het eindproduct laten zien, maar niet de code."
        },
        "code": "n/a"
      }
    ]
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
    },
    "snippets": [
      {
        "language": "csharp",
        "filename": "SceneLockInterfacer.cs",
        "title": {
          "en": "Sending requests to the database.",
          "nl": "Verzoeken naar de database sturen."
        },
        "caption": {
          "en": "These are the functions that send requests to the database for things like accounts and locking and unlocking scenes. These are heavily documented, as this was asked of me during my internship.",
          "nl": "Dit zijn de functies die verzoeken naar de database sturen voor dingen zoals accounts en het vergrendelen en ontgrendelen van scenes. Deze zijn zwaar gedocumenteerd, aangezien dit van mij werd gevraagd tijdens mijn stage."
        },
        "code": "        /// <summary>\n        /// Sends a web request to check if the user associated with the current device is known.\n        /// </summary>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The callback receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request. </returns>\n        public RunningWebRequest GetUserKnown(Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GetUserKnown), \"Checking if user exists...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_USER_KNOWN_KEY, DeviceId)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sends a web request to register a new user associated with the current device.\n        /// </summary>\n        /// <param name=\"username\">The username of the new user to be registered. Must meet the required validation criteria before being sent.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The callback receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest SetNewUser(string username, Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(SetNewUser), \"Creating new user...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(SET_NEW_USER_KEY, DeviceId),\n                new MultipartFormDataSection(NEW_USERNAME_KEY, username)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sends a web request to check if the project associated with the current device is known.\n        /// </summary>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetProjectKnown(Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GetProjectKnown), \"Checking if project exists...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_PROJECT_KNOWN_KEY, ProductName)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sends a web request to register a new project associated with the current device.\n        /// </summary>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest SetNewProject(Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(SetNewProject), \"Creating new project...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(SET_NEW_PROJECT_KEY, ProductName)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sends a web request to get the project id associated with the current project.\n        /// </summary>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetProjectId(Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GetProjectId), \"Getting project id...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_PROJECT_ID_KEY, ProductName)\n            }, (result, response) =>\n            {\n                if (result == WebRequestResult.Success && TryParseProjectId(response, out string projectId))\n                    ProjectId = projectId;\n\n                callback?.Invoke(result, response);\n            });\n        }\n\n        /// <summary>\n        /// Sends a web request to get the project scenes associated with the current project.\n        /// </summary>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <param name=\"projectId\">The project id to get the scenes for. If not provided, the current project id is used.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetProjectScenes(Action<WebRequestResult, string> callback, string projectId = null)\n        {\n            return CreateNewWebRequest(nameof(GetProjectScenes), \"Getting project scenes...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_PROJECT_SCENES_KEY, projectId ?? ProjectId)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sends a web request to set the project scenes associated with the current project.\n        /// </summary>\n        /// <param name=\"scenes\">An IEnumerable containing all the scenes to register with this project.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <param name=\"projectId\">The project id to get the scenes for. If not provided, the current project id is used.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest SetProjectScenes(IEnumerable<string> scenes, Action<WebRequestResult, string> callback, string projectId = null)\n        {\n            string packedScenes = \"scenes?\" + string.Join(\"?\", scenes.Where(s => !string.IsNullOrWhiteSpace(s)).Select(s => s.Trim()));\n            return CreateNewWebRequest(nameof(SetProjectScenes), \"Submitting project scenes...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(SET_PROJECT_SCENES_KEY, projectId ?? ProjectId),\n                new MultipartFormDataSection(PROJECT_SCENE_NAMES_KEY, packedScenes)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Gets the scene lock data for a specific scene. <br/>\n        /// In most cases, you will want to parse the string response with <see cref=\"TryParseSceneLockData\"/> to get a <see cref=\"SceneLockSceneObject\"/> containing the data in a more structured way.\n        /// </summary>\n        /// <param name=\"sceneName\">The scene to get the data for.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetSceneLockData(string sceneName, Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GetSceneLockData) + sceneName, $\"Gathering lock data for {sceneName}...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_SCENE_LOCK_DATA_KEY, sceneName)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Sets the scene lock data for a specific scene.\n        /// </summary>\n        /// <param name=\"sceneName\">The scene to set the data for.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <param name=\"userDeviceId\">The user's device id to use for the data. If not provided, it will use the default deviceId.</param>\n        /// <param name=\"shouldSendEvent\">Whether to send an event indicating that the scene lock was set.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest SetSceneLock(string sceneName, Action<WebRequestResult, string> callback, string userDeviceId = null, bool shouldSendEvent = true)\n        {\n            return CreateNewWebRequest(nameof(SetSceneLock) + sceneName, $\"Creating scene lock for {sceneName}...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(SET_SCENE_LOCK_KEY, sceneName),\n                new MultipartFormDataSection(USER_DEVICE_KEY, userDeviceId ?? DeviceId)\n            }, (result, response) =>  \n            {\n                if (result == WebRequestResult.Success && shouldSendEvent)\n                {\n                    OnStatusLockChanged?.Invoke(true);\n                }\n                callback?.Invoke(result, response);\n            });\n        }\n\n        /// <summary>\n        /// Releases the scene lock data for a specific scene.\n        /// </summary>\n        /// <param name=\"sceneLockId\">Scene to release the lock for.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <param name=\"shouldSendEvent\">Whether to send an event indicating that the scene lock was released.</param>       \n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest ReleaseSceneLock(string sceneLockId, Action<WebRequestResult, string> callback, bool shouldSendEvent = true)\n        {\n            return CreateNewWebRequest(nameof(ReleaseSceneLock) + sceneLockId, $\"Releasing scene lock {sceneLockId}...\", new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(RELEASE_SCENE_LOCK_KEY, sceneLockId)\n            }, (result, response) =>\n            {\n                if (result == WebRequestResult.Success && shouldSendEvent)\n                {\n                    OnStatusLockChanged?.Invoke(false);\n                }\n                callback?.Invoke(result, response);\n            });\n        }\n\n        /// <summary>\n        /// Sends a web request to retrieve the count of locked scenes for a specified username.\n        /// </summary>\n        /// <param name=\"username\">The username for which the locked scene count is requested.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The callback receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing the locked scene count in string format if applicable.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetLockedSceneCountForUsername(string username,\n            Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GET_LOCKED_SCENE_COUNT_FOR_USERNAME_KEY) + username,\n                $\"Getting locked scene count for {username}...\",\n                new List<IMultipartFormSection>\n                {\n                    new MultipartFormDataSection(GET_LOCKED_SCENE_COUNT_FOR_USERNAME_KEY, username)\n                }, callback);\n        }\n\n        /// <summary>\n        /// Retrieve the username associated with a specific device ID.\n        /// </summary>\n        /// <param name=\"deviceId\">The identifier of the device for which the username is to be retrieved.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The callback receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing the retrieved username if successful.</param>\n        /// <returns>A <see cref=\"RunningWebRequest\"/> instance representing the ongoing web request.</returns>\n        public RunningWebRequest GetUsername(string deviceId, Action<WebRequestResult, string> callback)\n        {\n            return CreateNewWebRequest(nameof(GetUsername) + deviceId, $\"Getting username for {deviceId}...\",\n                new List<IMultipartFormSection>\n            {\n                new MultipartFormDataSection(GET_USERNAME_KEY, deviceId)\n            }, callback);\n        }\n\n        /// <summary>\n        /// Cancels all ongoing web requests managed by this interfacer.\n        /// </summary>\n        /// <remarks>\n        /// This method ensures that all currently running web requests are terminated and their resources are cleaned up.\n        /// It also clears the internal dictionary tracking the active requests.\n        /// </remarks>\n        public void CancelAllRequests()\n        {\n            foreach (var request in runningRequests.Values)\n            {\n                request.Cleanup();\n            }\n            runningRequests.Clear();\n        }\n\n        /// <summary>\n        /// Creates a new <see cref=\"RunningWebRequest\"/> with the specified parameters.\n        /// </summary>\n        /// <param name=\"key\">The PHP POST key used for the specific request.</param>\n        /// <param name=\"loadingText\">The loading text to display to the user while this request is active.</param>\n        /// <param name=\"form\">The data to send with the POST request.</param>\n        /// <param name=\"callback\">A callback action that is invoked upon completion of the web request.\n        /// The call back receives a <see cref=\"WebRequestResult\"/> indicating the result of the request\n        /// and a string response containing additional data if applicable.</param>\n        /// <param name=\"onSuccess\">A callback that gets called when the request returns a success code.</param>\n        /// <param name=\"onFail\">A callback that gets called when the request returns a failure code.</param>\n        /// <param name=\"onNetwork\">A callback that gets called when there is no network or server.</param>\n        /// <param name=\"onNull\">A callback that gets called when the result is unknown.</param>\n        /// <returns></returns>\n        private RunningWebRequest CreateNewWebRequest(\n            string key,\n            string loadingText,\n            List<IMultipartFormSection> form,\n            Action<WebRequestResult, string> callback,\n            Action onSuccess = null,\n            Action onFail = null,\n            Action onNetwork = null,\n            Action onNull = null)\n        {\n            if (runningRequests.TryGetValue(key, out RunningWebRequest existing))\n            {\n                if (!existing.IsDone)\n                {\n                    return existing;\n                }\n\n                runningRequests.Remove(key);\n            }\n\n            form.Add(new MultipartFormDataSection(GET_REPLY_KEY, key));\n            form.Add(new MultipartFormDataSection(PRODUCT_NAME_KEY, ProductName));\n\n            UnityWebRequest request = UnityWebRequest.Post(Url, form);\n            request.SendWebRequest();\n\n            RunningWebRequest runningRequest = new RunningWebRequest(\n                request,\n                callback,\n                loadingText,\n                onSuccess,\n                onFail,\n                onNetwork,\n                onNull,\n                () => runningRequests.Remove(key));\n\n            runningRequests[key] = runningRequest;\n            EditorApplication.update += runningRequest.Run;\n\n            return runningRequest;\n        }"
      }
    ]
  },
  "blackhole": {
    "title": {
      "en": "Black Hole Simulation",
      "nl": "Zwart Gat simulatie"
    },
    "description": {
      "en": "A simulation of a black hole in Unity",
      "nl": "Een simulatie van een zwart gat in Unity"
    },
    "features": {
      "en": [
        "Black hole",
        "What more can I say? It's a black hole."
      ],
      "nl": [
        "Zwart gat",
        "Wat kan ik nog meer zeggen? Het is een zwart gat."
      ]
    },
    "information": {
      "en": [
        "A volumetric shader in Unity that simulates a Black Hole. I made this because a friend of mine was messing around with shaders and accidentally made something resembling a black hole, causing me to become inspired to make one. I decided to base it on the black hole in Interstellar, because it looks cool.",
      ],
      "nl": [
        "Een volumetric shader in Unity die een zwart gat simuleert. Ik heb dit gemaakt omdat een vriend van mij zat te spelen met shaders en per ongeluk iets maakte dat op een zwart gat leek, hierdoor werd ik geïnspireerd om eentje te maken. Ik had besloten om het te baseren op de zwart gat in Interstaller, omdat die er cool uit ziet."
      ]
    },
    "snippets": [
      {
        "language": "hlsl",
        "filename": "BlackHoleVolumetric.hlsl",
        "title": {
          "en": "The main raymarching loop for the black hole",
          "nl": "De hoofd raymarching loop voor het zwart gat"
        },
        "caption": {
          "en": "The shader marches a ray through the black hole's volume, calculating the color at each step based on the black hole's mass and disk properties.",
          "nl": "De shader marcheert een ray door het volume van het zwart gat, en berekent de kleur op elk moment gebaseerd op de massa en disk-eigenschappen van het zwart gat."
        },
        "code": "void BlackHoleMarch(\n    float3 localCamPos,\n    float3 localRayDir,\n    float mass,\n    float diskInner,\n    float diskOuter,\n    float stepCount,\n    float2 screenUV,\n    out float4 outColor)\n{\n    mass = max(mass, 1e-5);\n    float rs = 2.0 * mass;\n    float bound = max(_BH_BoundRadius, 0.05);\n    float3 rd = normalize(localRayDir);\n    float3 box = float3(bound, bound, bound);\n\n    float tEnter, tExit;\n    if (!BH_IntersectBox(localCamPos, rd, box, tEnter, tExit))\n    {\n        outColor = float4(0.0, 0.0, 0.0, 0.0);\n        return;\n    }\n\n    tEnter = max(tEnter, 0.0);\n    if (tExit <= tEnter)\n    {\n        outColor = float4(0.0, 0.0, 0.0, 0.0);\n        return;\n    }\n\n    float3 P = localCamPos + rd * (tEnter + 1e-4);\n    float3 D = rd;\n    float3 l = cross(P, D);\n    float h2 = max(dot(l, l), 1e-12);\n\n    uint steps = (uint)clamp(stepCount, 64.0, 256.0);\n    float photonSphere = 1.5 * rs;\n    float diskIn = clamp(diskInner, photonSphere * 1.02, photonSphere * 1.08);\n    float diskOut = min(max(diskOuter, diskIn + 0.04), bound * 0.78);\n    float densityMul = max(_BH_DiskDensity, 0.0);\n    float temperature = max(_BH_Temperature, 0.05);\n    bool doppler = _BH_EnableDoppler > 0.5;\n    bool redshift = _BH_EnableRedshift > 0.5;\n\n    float3 glow = 0.0;\n    float transmittance = 1.0;\n    bool captured = false;\n    float travelled = 0.0;\n    float travelBudget = bound * 16.0;\n    float rMin = 1e9;\n    float prevY = P.y;\n\n    [loop]\n    for (uint i = 0; i < steps; i++)\n    {\n        float r2 = dot(P, P);\n        float r = sqrt(max(r2, 1e-12));\n        rMin = min(rMin, r);\n\n        if (r <= rs * 1.001 || any(isnan(P)))\n        {\n            captured = true;\n            break;\n        }\n\n        if (r < photonSphere * 0.99 && dot(P, D) < 0.0)\n        {\n            captured = true;\n            break;\n        }\n\n        if (any(abs(P) > box + 0.002) && travelled > 1e-4)\n            break;\n        if (travelled > travelBudget)\n            break;\n\n        float close = saturate(1.0 - abs(r - photonSphere) / max(5.0 * rs, 1e-4));\n        float dt = r * lerp(0.072, 0.016, close);\n        dt *= 192.0 / (float)steps;\n\n        if (P.y * D.y < 0.0)\n        {\n            float tPlane = abs(P.y) / max(abs(D.y), 1e-6);\n            dt = min(dt, max(tPlane * 0.5, bound * 0.0006));\n        }\n        dt = clamp(dt, bound * 0.0012, bound * 0.04);\n\n        float3 a0 = BH_Accel(P, rs, h2);\n        float3 P1 = P + D * dt + 0.5 * a0 * dt * dt;\n        float3 a1 = BH_Accel(P1, rs, h2);\n        float3 D1 = D + 0.5 * (a0 + a1) * dt;\n\n        if (prevY * P1.y <= 0.0)\n        {\n            float denom = prevY - P1.y;\n            float tHit = abs(denom) > 1e-8 ? saturate(prevY / denom) : 0.5;\n            float3 hit = lerp(P, P1, tHit);\n            hit.y = 0.0;\n            float rho = length(hit.xz);\n\n            if (rho >= diskIn && rho <= diskOut)\n            {\n                float3 emit = BH_DiskEmission(hit, D1, mass, rs, diskIn, diskOut,\n                                            densityMul, temperature, doppler, redshift);\n                float span = max(diskOut - diskIn, 1e-4);\n                float u = saturate((rho - diskIn) / span);\n                float radial = smoothstep(diskOut, diskOut - span * 0.22, rho);\n                float optical = saturate((0.88 + 0.12 * densityMul) * (1.0 - 0.35 * u) * radial);\n                glow += transmittance * emit;\n                transmittance *= (1.0 - optical);\n            }\n        }\n\n        P = P1;\n        D = D1;\n        prevY = P.y;\n        travelled += dt;\n        if (transmittance < 0.001)\n            break;\n    }\n    \n    if (!captured && rMin < photonSphere * 0.96)\n        captured = true;\n\n    float skim = exp(-abs(rMin - photonSphere) / max(0.05 * rs, 1e-4));\n    if (!captured)\n        glow += skim * BH_Blackbody(5600.0) * lerp(_BH_AccretionHotColor.rgb, 1.0, 0.4) * (14.0 * temperature);\n    \n    float3 rgb = max(glow, 0.0);\n    float alpha = captured ? 1.0 : saturate(1.0 - transmittance);\n    outColor = float4(rgb, alpha);\n}"
      },
      {
        "language": "hlsl",
        "filename": "BlackHoleVolumetric.hlsl",
        "title": {
          "en": "Calculates the gravitational acceleration at a point",
          "nl": "Bereken de zwaartekrachtversnelling op een punt"
        },
        "caption": {
          "en": "The acceleration is based on the mass of the black hole and the distance from the point to the black hole.",
          "nl": "De versnelling is gebaseerd op de massa van het zwart gat en de afstand van het punt tot het zwart gat."
        },
        "code": "float3 BH_Accel(float3 p, float rs, float h2)\n{\n    float r2 = max(dot(p, p), 1e-12);\n    float r = sqrt(r2);\n    return -(1.5 * rs) * h2 * p / (r2 * r2 * r);\n}"
      },
      {
        "language": "hlsl",
        "filename": "BlackHoleVolumetric.hlsl",
        "title": {
          "en": "Calculates the appearence of the accretion disk.",
          "nl": "Bereken het uiterlijk van de accretion disk."
        },
        "caption": {
          "en": "We calculate the appearence of the accretion disk by combining fractional FBM noise streaks with a blackbody spectrum and relativistic corrections.",
          "nl": "We berekenen het uiterlijk van de accretion disk door fractionele FBM ruisstrepen te combineren met een blackbody spectrum en relativistische correcties."
        },
        "code": "float3 BH_DiskEmission(float3 hit, float3 dir, float mass, float rs, float diskInner, float diskOuter,\n                       float densityMul, float temperature, bool doppler, bool redshift)\n{\n    float rho = length(hit.xz);\n    if (rho < diskInner || rho > diskOuter)\n        return 0.0;\n\n    float span = max(diskOuter - diskInner, 1e-4);\n    float u = saturate((rho - diskInner) / span);\n    float rRel = max(rho / max(diskInner, 1e-4), 1.0);\n\n    float tEmit = (1850.0 + 4200.0 * temperature) * pow(rRel, -0.72);\n\n    float time = 0.0;\n    #if defined(UNITY_SHADER_VARIABLES_INCLUDED)\n    time = _TimeParameters.x;\n    #endif\n\n    float phi = atan2(hit.z, hit.x);\n    float streaks = BH_Streaks(rho, phi, time);\n    float structure = 0.06 + 1.55 * streaks;\n\n    float innerLip = 1.0 + 2.4 * exp(-pow((rho - diskInner) / max(span * 0.07, 1e-4), 2.0));\n    float outerFade = smoothstep(diskOuter, diskOuter - span * 0.22, rho);\n    float radial = outerFade * innerLip;\n    float flux = pow(max(1.0 - u, 0.015), 1.1) * (0.4 + 2.6 / rRel);\n\n    float shift = 1.0;\n    if (doppler)\n    {\n        float beta = min(sqrt(saturate(mass / max(rho, rs * 1.05))), 0.72);\n        float gamma = rsqrt(max(1.0 - beta * beta, 1e-4));\n        float3 tangent = normalize(float3(-hit.z, 0.0, hit.x));\n        float ndot = length(dir) > 1e-8 ? dot(dir / length(dir), tangent) : 0.0;\n        float rel = 1.0 / max(gamma * (1.0 - beta * ndot), 0.12);\n        shift *= lerp(1.0, rel, 0.28);\n    }\n    if (redshift)\n        shift *= sqrt(max(1.0 - rs / max(rho, rs * 1.02), 0.0));\n\n    float tObs = clamp(tEmit * shift, 1400.0, 6800.0);\n    float3 bb = BH_Blackbody(tObs);\n    float3 gold = lerp(_BH_AccretionCoolColor.rgb, _BH_AccretionHotColor.rgb, saturate((tObs - 1600.0) / 3800.0));\n    float3 col = lerp(bb, max(gold, 0.04), 0.62);\n\n    float boost = pow(shift, 2.0);\n    float intensity = densityMul * radial * structure * flux * boost * (90.0 + 220.0 * temperature);\n    return col * intensity;\n}"
      }
    ]
  }
};
