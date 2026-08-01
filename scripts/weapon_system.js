// ============================================================================
// Weapon System - IT/EN runtime localization
// Internal IDs, flags, recipe keys and Compendium collection remain unchanged.
// ============================================================================
const WS_I18N = (() => {
  const FIX_PAIRS = [["Vuoto", "Empty"], ["Vuota", "Empty"], ["Liv.", "Lv."], ["Liv ", "Lv. "], ["Personaggio", "Character"], ["personaggio", "character"], ["Impostazioni salvate con successo!", "Settings saved successfully!"], ["Salva Impostazioni", "Save Settings"], ["Impostazioni", "Settings"], ["Chiudi", "Close"], ["Annulla", "Cancel"], ["Conferma", "Confirm"], ["Scegli", "Choose"], ["Clicca", "Click"], ["Trascina", "Drag"], ["Quantità", "Quantity"], ["Nessuna descrizione presente", "No description available"], ["Effetto passivo", "Passive Effect"], ["Effetti passivi", "Passive Effects"], ["Sistema Armi (Durabilità, Lustro, Affilatura, Coti, Gemme & Rivestimenti) Attivo!", "Weapon System (Durability, Luster, Sharpness, Whetstones, Gems & Coatings) Active!"], ["Configurazione Sistema Armi", "Weapon System Configuration"], ["Configura Impostazioni", "Configure Settings"], ["Impostazioni Sistema Armi", "Weapon System Settings"], ["Configurazione Modulo", "Module Configuration"], ["Approvazione Master Obbligatoria per l'Usura", "GM Approval Required for Weapon Wear"], ["Fino a quando il Master non decide l'esito dell'usura dell'arma questa non perde statistiche (se deselezionata, tutto va in automatico)", "Until the GM confirms the weapon wear result, its statistics are not reduced (when disabled, everything is applied automatically)."], ["Imposta Lustro Iniziale", "Set Initial Luster"], ["Inserisci il valore di Lustro (1 - 100):", "Enter the Luster value (1 - 100):"], ["Conferma Rivestimento", "Confirm Coating"], ["Stato Arma (Realistica)", "Weapon Status (Realistic)"], ["Stato Arma:", "Weapon Status:"], ["Stato Critico: Arma Smussata", "Critical Status: Dull Weapon"], ["Arma smussata", "Dull Weapon"], ["L'arma ha esaurito l'affilatura ed applica penalità attive.", "The weapon has no Sharpness left and active penalties apply."], ["Proprietà Realistiche", "Realistic Properties"], ["Moltiplicatore Usura", "Wear Multiplier"], ["Durabilità", "Durability"], ["Lustro", "Luster"], ["Affilatura", "Sharpness"], ["Rivestimento", "Coating"], ["Rivestimenti", "Coatings"], ["Proprietà Magica", "Magical Property"], ["Focus Magico", "Magic Focus"], ["Dettagli da:", "Details from:"], ["Nessuna descrizione speciale presente nel rivestimento.", "No special description is available for this coating."], ["Dettagli Gemma", "Gem Details"], ["Effetti della gemma", "Gem Effects"], ["Nessuna descrizione presente nella gemma.", "No description is available for this gem."], ["Dettagli Accessorio", "Accessory Details"], ["Effetti dell'accessorio", "Accessory Effects"], ["Nessuna descrizione presente nell'accessorio.", "No description is available for this accessory."], ["Accessorio", "Accessory"], ["Accessori Arma", "Weapon Accessories"], ["Solo Compendio Oggetti → Accessori Arma", "Oggetti Compendium only → Weapon Accessories"], ["Installare e rimuovere un accessorio è gratuito. Durante l'installazione l'oggetto viene tolto dall'inventario e i suoi effetti vengono applicati all'arma.", "Installing and removing an accessory is free. When installed, the item is removed from the inventory and its effects are applied only to this weapon."], ["Si sblocca al Livello", "Unlocks at Level"], ["Installa • Livello", "Install • Level"], ["Installa Accessorio", "Install Accessory"], ["Rimuovi Accessorio", "Remove Accessory"], ["Rimuovi gratuitamente", "Remove for Free"], ["Non possiedi Accessori Arma validi nell’inventario.", "You do not have any valid Weapon Accessories in your inventory."], ["Non possiedi Accessori Arma validi nell'inventario.", "You do not have any valid Weapon Accessories in your inventory."], ["Sono mostrati solo gli oggetti riconosciuti nella cartella", "Only items recognized in the folder are shown:"], ["Trascina un Accessorio Arma presente nell'inventario di questo personaggio.", "Drag a Weapon Accessory from this character's inventory."], ["Accessorio non valido.", "Invalid accessory."], ["Slot Gemme (Forature)", "Gem Slots (Drilling)"], ["Click SX: Fora/Incastona | Click DX: Rimuovi", "Left Click: Drill/Socket | Right Click: Remove"], ["Click SX: Rimuovi gemma", "Left Click: Remove Gem"], ["Disponibile (Click per effettuare la Foratura)", "Available (Click to Drill)"], ["Forato (Click per incastonare gemma)", "Drilled (Click to Socket a Gem)"], ["Forato (Vuoto)", "Drilled (Empty)"], ["Da Forare", "To Drill"], ["Incastonata", "Socketed"], ["Distrutto", "Destroyed"], ["Slot Perduto permanentemente per fallimento!", "Slot permanently lost due to failure!"], ["Richiede Arma Livello", "Requires Weapon Level"], ["Questo slot richiede un'arma di almeno Livello", "This slot requires a weapon of at least Level"], ["Lo Slot Accessorio", "Accessory Slot"], ["si sblocca al Livello", "unlocks at Level"], ["richiede un'arma di Livello", "requires a weapon of Level"], ["Rimuovi prima l'accessorio già installato in questo slot.", "Remove the accessory already installed in this slot first."], ["Impossibile recuperare l'accessorio dal Compendio Oggetti.", "Unable to retrieve the accessory from the Oggetti Compendium."], ["Impossibile installare l'accessorio.", "Unable to install the accessory."], ["Impossibile rimuovere l'accessorio.", "Unable to remove the accessory."], ["rimosso gratuitamente e restituito all'inventario", "removed for free and returned to the inventory"], ["installato nello Slot", "installed in Slot"], ["Inventario Coti", "Whetstone Inventory"], ["Coti", "Whetstones"], ["Cote", "Whetstone"], ["Click SX: Usa | Click DX: Gestisci", "Left Click: Use | Right Click: Manage"], ["Click SX: Usa 1 Cote per affilare", "Left Click: Use 1 Whetstone to sharpen"], ["Click DX: Rimuovi / Gestisci Quantità", "Right Click: Remove / Manage Quantity"], ["Slot Cote Vuoto", "Empty Whetstone Slot"], ["Clicca o Trascina una Cote dal personaggio", "Click or drag a Whetstone from the character"], ["Aggiungi Coti", "Add Whetstones"], ["Rimuovi Coti dallo Slot", "Remove Whetstones from Slot"], ["Scegli Cote per Slot", "Choose Whetstone for Slot"], ["Aggiungi all'Arma", "Add to Weapon"], ["Rimuovi e Riponi in Inventario", "Remove and Return to Inventory"], ["Impossibile aggiungere altre Coti in questo slot (Max 10 per slot)!", "You cannot add more Whetstones to this slot (maximum 10 per slot)!"], ["Non possiedi nessuna Cote nel tuo inventario!", "You do not have any Whetstones in your inventory!"], ["Questo oggetto non è una Cote valida!", "This item is not a valid Whetstone!"], ["Affilatura ripristinata a", "Sharpness restored to"], ["usufruendo di 1x", "using 1x"], ["ha già raggiunto il massimo consentito per il suo livello", "has already reached the maximum allowed for its level"], ["Livello Arma (1 a 6):", "Weapon Level (1 to 6):"], ["Gestione Master (Visibile solo al DM)", "GM Management (Visible to GM only)"], ["Applica Usura Manuale Avanzata", "Apply Advanced Manual Wear"], ["Applica Usura", "Apply Wear"], ["Danno e Usura:", "Damage and Wear:"], ["Danno Durabilità", "Durability Damage"], ["Danno Lustro", "Luster Damage"], ["Danno Affilatura", "Sharpness Damage"], ["Attuale:", "Current:"], ["Scegli Rivestimento", "Choose Coating"], ["Non possiedi nessun Rivestimento valido nel tuo inventario!", "You do not have any valid Coating in your inventory!"], ["L'oggetto deve trovarsi nel tuo inventario!", "The item must be in your inventory!"], ["Questo oggetto non è un Rivestimento compatibile o non è stato trovato nel compendio Oggetti!", "This item is not a compatible Coating or was not found in the Oggetti Compendium!"], ["Rivestimento rimosso da", "Coating removed from"], ["Lustro azzerato a 0 e oggetto restituito nell'inventario dal Master.", "Luster reset to 0 and the item returned to the inventory by the GM."], ["ed eliminato dall'inventario!", "and removed from the inventory!"], ["Foratura - Slot", "Drilling - Slot"], ["Foratura Slot", "Drilling Slot"], ["forato con successo", "drilled successfully"], ["Permanente Usura", "Permanent Wear"], ["Successo 100% (Master)", "100% Success (GM)"], ["Attenzione: Il fallimento distruggerà la gemma trasformandola in frammenti!", "Warning: failure will destroy the gem and turn it into fragments!"], ["Incastonatura Gemma", "Gem Socketing"], ["Rimozione Gemma", "Gem Removal"], ["Incastona Gemma", "Socket Gem"], ["Incastonatura fallita", "Socketing failed"], ["Rimozione fallita", "Removal failed"], ["rimossa con successo", "removed successfully"], ["e restituita", "and returned"], ["frantumata", "shattered"], ["Frammenti di gemma", "Gem Fragments"], ["Nessuna gemma presente nello slot bersaglio.", "There is no gem in the target slot."], ["Non possiedi nessuna Gemma valida nel tuo inventario (controlla la cartella Gemme nel compendio)!", "You do not have any valid Gems in your inventory (check the Gems folder in the Compendium)!"], ["Rendi Realistica:", "Enable Realistic Mode:"], ["Rendi Realistica", "Enable Realistic Mode"], ["Sì, Rendi Realistica", "Yes, Enable Realistic Mode"], ["Stai per convertire", "You are about to convert"], ["in un'arma", "into a"], ["Questo sbloccherà le statistiche di", "This will enable the following statistics:"], ["L'arma si usurerà utilizzandola in combattimento e necessiterà di manutenzione.", "The weapon will wear down when used in combat and will require maintenance."], ["Sei sicuro di voler procedere?", "Are you sure you want to continue?"], ["Questa azione non può essere annullata.", "This action cannot be undone."], ["ora segue le regole Realistiche!", "now uses the Realistic weapon rules!"], ["Critico! Nessuna Usura", "Critical Hit! No Wear"], ["Fallimento Critico", "Critical Failure"], ["Colpo Eccellente", "Excellent Hit"], ["Colpo a Segno", "Hit"], ["Mancato Pesante", "Heavy Miss"], ["Mancato", "Miss"], ["Bersaglio", "Target"], ["Calcolo Usura Arma", "Weapon Wear Calculation"], ["Usura Automatica", "Automatic Wear"], ["Tiro:", "Roll:"], ["Moltiplicatore Usura:", "Wear Multiplier:"], ["Conferma / Modifica Usura (Solo GM)", "Confirm / Edit Wear (GM Only)"], ["Solo il Master può confermare o modificare l'usura dell'arma!", "Only the GM can confirm or edit weapon wear!"], ["Impossibile trovare l'arma.", "Unable to find the weapon."], ["Recuperato rottame:", "Recovered scrap:"], ["si è spezzata ed è andata distrutta!", "broke and was destroyed!"], ["ha esaurito completamente la sua durabilità", "has completely depleted its Durability"], ["si è spezzata in mille pezzi!", "shattered into pieces!"], ["è sceso a 0!", "dropped to 0!"], ["è esaurito (0)!", "is depleted (0)!"], ["è ora priva di protezione e subisce maggiore usura.", "is now unprotected and suffers increased wear."], ["La penalità al danno si applica", "The damage penalty applies"], ["solo a questa arma", "only to this weapon"], ["è tornata attiva. Rimossi gli effetti di:", "is active again. Removed effects from:"], ["Affila il prima possibile", "Sharpen as soon as possible"], ["Segmento Rosso", "Red Segment"], ["Segmento Giallo", "Yellow Segment"], ["Segmento Verde", "Green Segment"], ["Segmento Blu", "Blue Segment"], ["Segmento Viola", "Purple Segment"], ["Fora/Incastona", "Drill/Socket"], ["Fora", "Drill"], ["L'arma è diventata", "The weapon became"], ["La gemma si è", "The gem was"], ["durante l'estrazione da", "during extraction from"], ["ha praticato con successo un foro nello Slot", "successfully drilled a hole in Slot"], ["dell'arma", "of the weapon"], ["L'arma è ora più fragile", "The weapon is now more fragile"], ["usura permanente", "permanent wear"], ["Disastro nella foratura per", "Drilling disaster for"], ["Il tentativo di forare lo Slot", "The attempt to drill Slot"], ["è fallito", "failed"], ["Lo slot è", "The slot is"], ["perso per sempre", "lost forever"], ["Totale slot rotti:", "Total broken slots:"], ["L'arma ha perso permanentemente punti di durabilità massima", "The weapon permanently lost maximum Durability points"], ["Nuovo Max:", "New Max:"], ["Risultato:", "Result:"], ["Successo!", "Success!"], ["Fallimento!", "Failure!"], ["Gestione o conferma dell'usura per l'arma", "Manage or confirm wear for weapon"], ["Il Lustro dell'arma", "The Luster of"], ["fallita!", "failed!"], ["incastonata con successo", "socketed successfully"], ["incastonato la gemma", "socketed the gem"], ["ha rimosso la gemma", "removed the gem"], ["durabilità ridotta", "Durability reduced"], ["Attivazione Irreversibile", "Irreversible Activation"], ["Questo sbloccherà le statistiche di Durabilità, Lustro, Affilatura, Coti, Accessori e Slot Gemme.", "This will enable Durability, Luster, Sharpness, Whetstones, Accessories, and Gem Slots."], ["Se la durabilità scende a 0, l'arma si distruggerà per sempre diventando un rottame.", "If Durability reaches 0, the weapon will be permanently destroyed and become scrap."]];
  const PAIRS = [["Se spuntata, le statistiche dell'arma non cambieranno fino a quando il Master non conferma l'esito dalla chat. Se deselezionata, tutto avverrà in automatico.", "When enabled, weapon statistics do not change until the GM confirms the result in chat. When disabled, wear is applied automatically."], ["Installare e rimuovere un accessorio è gratuito. Durante l'installazione l'oggetto viene tolto dall'inventario e i suoi effetti vengono applicati all'arma.", "Installing and removing an accessory is free. During installation the item is removed from inventory and its effects are applied only to the weapon."], ["ATTENZIONE: Se la foratura fallisce, lo slot sarà distrutto per sempre e la durabilità massima dell'arma scenderà permanentemente di", "WARNING: If drilling fails, the slot will be destroyed forever and the weapon maximum durability will permanently decrease by"], ["Gestione avanzata dei mestieri, requisiti per livello, competenze, livelli di sblocco e import/export JSON.", "Advanced management of professions, level requirements, proficiencies, unlock levels, and JSON import/export."], ["Job speciale: commercio, valutazione, negoziazione e gestione di beni rari. Sale solo con Punti Prestigio.", "Special Job: trade, appraisal, negotiation, and management of rare goods. Advances only with Prestige Points."], ["Estensione Crafting: Gestione avanzata Requisiti, Specializzazioni, Export/Import JSON e Mestieri Extra.", "Crafting extension: advanced Requirements, Specializations, JSON Export/Import, and Extra Jobs."], ["Questo oggetto non appartiene alla cartella \"Accessori Arma\" del Compendio CraftingSystem → Oggetti.", "This item does not belong to the \"Weapon Accessories\" folder in the CraftingSystem → Oggetti Compendium."], ["Questo oggetto non è un Rivestimento compatibile o non è stato trovato nel compendio Oggetti!", "This item is not a compatible Coating or was not found in the Oggetti Compendium!"], ["Fino a quando il Master non decide l'esito dell'usura dell'arma questa non perde statistiche", "Until the GM confirms weapon wear, its statistics will not be reduced"], ["Richiede Attestato da master, un Job Speciale collegato a 5 stelle e uno slot Master libero.", "Requires a Master Certificate, a linked Special Job at 5 stars, and one free Master slot."], ["Job speciale dedicato alla trasformazione di ingredienti, preparazioni e ricette complesse.", "Special Job dedicated to transforming ingredients, preparations, and complex recipes."], ["Job speciale: forgiatura incantata di cristalli e gemme. Sale solo con Punti Prestigio.", "Special Job: enchanted forging of crystals and gems. Advances only with Prestige Points."], ["Pannello di configurazione per il modulo delle armi (Durabilità, Lustro & Affilatura).", "Configuration panel for the weapon module (Durability, Luster & Sharpness)."], ["Job speciale: sintesi superiore di sapere, retorica e comprensione interdisciplinare.", "Special Job: advanced synthesis of knowledge, rhetoric, and interdisciplinary understanding."], ["L'affilatura di quest'arma ha già raggiunto il massimo consentito per il suo livello", "This weapon Sharpness has already reached the maximum allowed for its level"], ["Master Job: progetta mutageni e processi di trasformazione biologica controllata.", "Master Job: designs mutagens and controlled biological transformation processes."], ["Master Job: incide, stabilizza e fonde rune direttamente nei materiali lavorati.", "Master Job: engraves, stabilizes, and fuses runes directly into worked materials."], ["Nessun'arma realistica trovata nel tuo inventario per applicare il rivestimento!", "No realistic weapon found in your inventory to apply the coating!"], ["Seleziona almeno una ricetta spuntando la casella corrispondente per esportarla!", "Select at least one recipe using its checkbox before exporting!"], ["Master Job: integra tecnologia, circuiti e flussi arcani in sistemi complessi.", "Master Job: integrates technology, circuitry, and arcane flows into complex systems."], ["Master Job: custodisce, ricostruisce e interpreta le origini della conoscenza.", "Master Job: preserves, reconstructs, and interprets the origins of knowledge."], ["L'arma deve trovarsi nell'inventario di un personaggio per essere modificata.", "The weapon must be in a character inventory to be modified."], ["Cartella \"Accessori Arma\" non trovata nel Compendio CraftingSystem → Oggetti.", "\"Weapon Accessories\" folder not found in the CraftingSystem → Oggetti Compendium."], ["Master Job: progetta leghe artificiali e materiali compositi fuori standard.", "Master Job: designs artificial alloys and non-standard composite materials."], ["Job speciale: unisce alchimia e metallurgia. Sale solo con Punti Prestigio.", "Special Job: combines alchemy and metallurgy. Advances only with Prestige Points."], ["Job speciale: medicina d'eccellenza, chirurgia avanzata e dottrina clinica.", "Special Job: elite medicine, advanced surgery, and clinical doctrine."], ["Attenzione: Il fallimento distruggerà la gemma trasformandola in frammenti!", "Warning: failure will destroy the gem and turn it into fragments!"], ["Questa funzione è ancora in lavorazione e verrà implementata prossimamente!", "This feature is still in development and will be implemented soon!"], ["Trascina un Accessorio Arma presente nell'inventario di questo personaggio.", "Drag a Weapon Accessory from this character inventory."], ["Master Job: analizza alterazioni, malattie e anomalie dei tessuti viventi.", "Master Job: analyzes alterations, diseases, and anomalies in living tissue."], ["Master Job: studia e manipola il rapporto tra tempo, struttura e materia.", "Master Job: studies and manipulates the relationship between time, structure, and matter."], ["Master Job: canalizza, stabilizza e trasferisce flussi di energia arcana.", "Master Job: channels, stabilizes, and transfers arcane energy flows."], ["il sistema cercherà automaticamente il primo slot non forato e non perso.", "the system will automatically find the first undrilled, non-lost slot."], ["Job speciale: unisce chimica, medicina e ricerca sui processi biologici.", "Special Job: combines chemistry, medicine, and research into biological processes."], ["Questo Master Job non è stato selezionato. Puoi possederne al massimo 3.", "This Master Job has not been selected. You can have at most 3."], ["Ogni mestiere ha il suo livello, ricettario ed esperienza indipendenti.", "Each profession has its own independent level, recipe book, and experience."], ["Nessun'arma realistica trovata nell'inventario per il crafting gemme!", "No realistic weapon found in the inventory for gem crafting!"], ["Enchantment locale non disponibile, uso fallback sul danno dell'arma.", "Local enchantment unavailable; using weapon damage fallback."], ["Master Job: studio, raffinazione e controllo di tossine e antidoti.", "Master Job: study, refinement, and control of toxins and antidotes."], ["Lustro azzerato a 0 e oggetto restituito nell'inventario dal Master", "Luster reset to 0 and item returned to inventory by the GM"], ["Master Job: separa impurità e isola componenti di estrema purezza.", "Master Job: separates impurities and isolates components of extreme purity."], ["L'operazione può distruggere materiali o danneggiare il bersaglio.", "The operation may destroy materials or damage the target."], ["La ricetta resta sconosciuta e i materiali sono andati distrutti.", "The recipe remains unknown and the materials were destroyed."], ["Nessun Job Speciale a 5 stelle configurato per questo Master Job", "No 5-star Special Job is configured for this Master Job"], ["Prima devi scegliere questo Master Job con il pulsante dedicato.", "You must first choose this Master Job with the dedicated button."], ["Studioso delle arti, delle scienze e delle conoscenze perdute.", "Scholar of arts, sciences, and lost knowledge."], ["Nessun requisito di competenza configurato per questo livello.", "No proficiency requirement configured for this level."], ["Impossibile applicare la penalità Arma smussata solo all'arma.", "Unable to apply the Dull Weapon penalty only to this weapon."], ["Nessuna ricetta disponibile o sbloccata per le stelle attuali", "No recipes available or unlocked for the current stars"], ["Negozia accordi, media conflitti e padroneggia il protocollo.", "Negotiates agreements, mediates conflicts, and masters protocol."], ["Concia e lavora pelli, cuoio e materiali organici resistenti.", "Tans and works hides, leather, and durable organic materials."], ["Solo il Master può confermare o modificare l'usura dell'arma!", "Only the GM can confirm or modify weapon wear!"], ["Lavorazione di tessuti, stoffe, abiti e cuciture alchemiche.", "Works fabrics, textiles, garments, and alchemical stitching."], ["Studio, taglio e lavorazione delle gemme e pietre preziose.", "Study, cutting, and processing of gems and precious stones."], ["Inserisci un Kit o un Materiale di Riparazione nel 2° slot!", "Insert a Repair Kit or Repair Material in slot 2!"], ["L'arma ha perso permanentemente punti di durabilità massima", "The weapon permanently lost maximum durability points"], ["Gestione Livello per Livello e Barra Prestigio Pura pronti!", "Level-by-Level Management and Pure Prestige Bar ready!"], ["Nessuna ricetta disponibile o sbloccata per questo livello", "No recipes available or unlocked for this level"], ["Inserisci un Materiale Rivestimento Specifico nel 2° slot!", "Insert a Specific Coating Material in slot 2!"], ["Oggetto \"Arma smussata\" non trovato nel Compendio Oggetti.", "Item \"Dull Weapon\" not found in the Oggetti Compendium."], ["Impossibile recuperare l'accessorio dal Compendio Oggetti.", "Unable to retrieve the accessory from the Oggetti Compendium."], ["Non possiedi nessun Rivestimento valido nel tuo inventario", "You do not own any valid Coatings in your inventory"], ["Inserisci almeno i 2 materiali principali ed il risultato!", "Insert at least the 2 primary materials and the result!"], ["ha già raggiunto il massimo consentito per il suo livello", "has already reached the maximum allowed for its level"], ["Rimuovi prima l'accessorio già installato in questo slot.", "Remove the accessory already installed in this slot first."], ["Materiale di rivestimento insufficiente nell'inventario", "Insufficient coating material in inventory"], ["Nessun'arma trovata nell'inventario per la riparazione.", "No weapon found in the inventory for repair."], ["Inserisci l'oggetto / gemma specifico nel secondo slot!", "Insert the specific item / gem in the second slot!"], ["Nessuna descrizione speciale presente nel rivestimento.", "No special description is present on the coating."], ["Impossibile trovare l'arma da riparare nell'inventario.", "Unable to find a weapon to repair in the inventory."], ["Nessuna ricetta trovata in questa categoria/requisito.", "No recipe found in this category/requirement."], ["Importate/Aggiornate con successo le ricette dal file!", "Recipes imported/updated successfully from file!"], ["Diagnosi, cura, chirurgia e trattamento delle ferite.", "Diagnosis, treatment, surgery, and wound care."], ["Il Lustro indica lo stato del Rivestimento applicato.", "Luster indicates the state of the applied Coating."], ["Richiede 10 Destrezza e competenza in Sopravvivenza.", "Requires 10 Dexterity and proficiency in Survival."], ["Non possiedi Rivestimenti validi nel tuo inventario!", "You do not own any valid Coatings in your inventory!"], ["Non possiedi nessuna Gemma valida nel tuo inventario", "You do not own any valid Gems in your inventory"], ["Richiede 12 intelligenza e competenza in Medicina.", "Requires 12 Intelligence and proficiency in Medicine."], ["Inserisci l'oggetto / gemma specifico nel 2° slot!", "Insert the specific item / gem in slot 2!"], ["Tutti i materiali impiegati sono andati distrutti.", "All used materials were destroyed."], ["Tutti i materiali impiegati sono andati distrutti!", "All used materials were destroyed!"], ["I Master Job sono disponibili solo mentre possiedi", "Master Jobs are available only while you possess"], ["Errore nell'applicazione locale dell'Arma smussata", "Error applying the local Dull Weapon effect"], ["è ora priva di protezione e subisce maggiore usura", "is now unprotected and suffers increased wear"], ["Non ci sono slot liberi e forabili su quest'arma.", "There are no free drillable slots on this weapon."], ["scegli lo slot che contiene la gemma da estrarre.", "choose the slot containing the gem to remove."], ["Questo Master Job non è assegnato al personaggio.", "This Master Job is not assigned to the character."], ["rimosso gratuitamente e restituito all'inventario", "removed for free and returned to inventory"], ["Richiede 12 Intelligenza e competenza in Storia.", "Requires 12 Intelligence and proficiency in History."], ["Richiede 12 Carisma e competenza in Persuasione.", "Requires 12 Charisma and proficiency in Persuasion."], ["Devi inserire un'arma realistica nel primo slot!", "You must insert a realistic weapon in the first slot!"], ["Quantità dei materiali principali insufficiente!", "Insufficient quantity of primary materials!"], ["Errore: Il testo incollato non è un JSON valido.", "Error: the pasted text is not valid JSON."], ["Impossibile aggiungere altre Coti in questo slot", "Unable to add more Whetstones to this slot"], ["Materiale Rivestimento Specifico (Obbligatorio)", "Specific Coating Material (Required)"], ["si distruggerà per sempre diventando un rottame", "will be permanently destroyed and become scrap"], ["Rarità arma non valida: questa ricetta richiede", "Invalid weapon rarity: this recipe requires"], ["scegli lo slot forato su cui inserire la gemma.", "choose the drilled slot where the gem will be inserted."], ["Nessun requisito configurato per questa stella.", "No requirement configured for this star."], ["Errore nell'apertura del selettore di Mestiere.", "Error opening the Profession selector."], ["Richiede 12 Intelligenza, 10 Saggezza e Arcana.", "Requires 12 Intelligence, 10 Wisdom and Arcana."], ["Nessun oggetto nell'inventario del personaggio", "No items in the character inventory"], ["Questo slot richiede un'arma di almeno Livello", "This slot requires a weapon of at least Level"], ["Richiede 12 Saggezza e competenza in Medicina.", "Requires 12 Wisdom and proficiency in Medicine."], ["Errore: Impossibile aprire il banco da lavoro.", "Error: Unable to open the workbench."], ["Errore durante il drag & drop del rivestimento", "Error during coating drag & drop"], ["Sistema completo di crafting per Foundry VTT.", "Complete crafting system for Foundry VTT."], ["Solo il DM può modificare le Maestrie Master.", "Only the GM can modify Master Job selections."], ["Compendio craftingsystem.Oggetti non trovato.", "craftingsystem.Oggetti Compendium not found."], ["Impossibile recuperare i dettagli della gemma", "Unable to retrieve gem details"], ["oggetto restituito nell'inventario dal Master", "item returned to inventory by the GM"], ["Approvazione Master Obbligatoria per l'Usura", "GM Approval Required for Wear"], ["Hai già raggiunto il limite di 3 Master Job.", "You have already reached the limit of 3 Master Jobs."], ["ha praticato con successo un foro nello Slot", "successfully drilled a hole in Slot"], ["Ora puoi vederla e caricarla dal ricettario.", "You can now view and load it from the recipe book."], ["Non possiedi Gemme valide nel tuo inventario", "You do not own valid Gems in your inventory"], ["Non possiedi nessuna Cote nel tuo inventario", "You do not own any Whetstones in your inventory"], ["Devi inserire un'arma nello slot principale!", "You must insert a weapon in the main slot!"], ["Nessuna gemma presente nello slot bersaglio.", "No gem is present in the target slot."], ["Ricetta di riparazione salvata con successo!", "Repair recipe saved successfully!"], ["Servono 5★ in tutti i Job Speciali richiesti", "Requires 5★ in all required Special Jobs"], ["CraftingSystem: inizializzato il default Job", "CraftingSystem: initialized default Job configuration"], ["Quest'arma non è impostata come Realistica.", "This weapon is not set as Realistic."], ["Impossibile trovare la scheda dell'oggetto.", "Unable to find the item sheet."], ["effetti Arma smussata a modalità SOLO ARMA.", "Dull Weapon effects to WEAPON-ONLY mode."], ["ha esaurito completamente la sua durabilità", "has completely depleted its durability"], ["Richiede 10 Intelligenza e 12 in saggezza.", "Requires 10 Intelligence and 12 Wisdom."], ["La durabilità massima dell'arma diminuirà.", "The weapon maximum durability will decrease."], ["non trovato nella cartella Accessori Arma.", "not found in the Weapon Accessories folder."], ["Forature, Incastonatura e Rimozione gemme", "Drilling, Socketing and Gem Removal"], ["Forgia armi, armature e metalli preziosi.", "Forges weapons, armor, and precious metals."], ["si usurerà utilizzandola in combattimento", "will wear down when used in combat"], ["Gestione o conferma dell'usura per l'arma", "Manage or confirm wear for the weapon"], ["requisiti modificabili nelle impostazioni", "requirements editable in settings"], ["Nessuna descrizione presente nella gemma.", "No description is present on the gem."], ["controlla la cartella Gemme nel compendio", "check the Gems folder in the compendium"], ["Mixa pozioni, reagenti ed elisir arcani.", "Mixes potions, reagents, and arcane elixirs."], ["Quest'arma è già in perfette condizioni!", "This weapon is already in perfect condition!"], ["Lo slot verrà distrutto permanentemente.", "The slot will be permanently destroyed."], ["è tornata attiva. Rimossi gli effetti di", "is active again. Removed effects from"], ["Errore durante il drag & drop della cote", "Error during whetstone drag & drop"], ["Errore durante la lettura del file JSON.", "Error reading the JSON file."], ["gli oggetti riconosciuti nella cartella", "items recognized in the folder are shown"], ["Questa azione non può essere annullata.", "This action cannot be undone."], ["Per una ricetta di Job Speciale servono", "A Special Job recipe requires"], ["Il job selezionato non è un Master Job.", "The selected job is not a Master Job."], ["Rimuovi tutte le Maestrie e restituisci", "Remove all Master selections and refund"], ["Soglie di livello salvate con successo!", "Level thresholds saved successfully!"], ["Configura Requisiti e Specializzazioni", "Configure Requirements and Specializations"], ["Qualsiasi Arma Realistica (Automatico)", "Any Realistic Weapon (Automatic)"], ["Materiale di riparazione insufficiente", "Insufficient repair material"], ["Richiede 12 Intelligenza, 10 Saggezza.", "Requires 12 Intelligence and 10 Wisdom."], ["per accedere a questo tipo di crafting", "to access this crafting type"], ["Rivestimento applicato con successo su", "Coating successfully applied to"], ["nessun Job Speciale configurato dal DM", "no Special Job configured by the GM"], ["Creane/collegane una nei Job Speciali.", "Create/link one in Special Jobs."], ["Pannello di Configurazione Extra Jobs", "Extra Jobs Configuration Panel"], ["restituito nell'inventario dal Master", "returned to inventory by the GM"], ["Da ora è disponibile nel menu Carica.", "It is now available in the Load menu."], ["Devi inserire un'arma nel primo slot!", "You must insert a weapon in the first slot!"], ["La gemma si frantumerà e andrà persa.", "The gem will shatter and be lost."], ["Non possiedi Coti nel tuo inventario!", "You do not own any Whetstones in your inventory!"], ["Questo oggetto non è una Cote valida!", "This item is not a valid Whetstone!"], ["Serve almeno un Job Speciale a 5★ tra", "Requires at least one 5★ Special Job among"], ["Nessun personaggio associato trovato", "No associated character found"], ["Ricetta caricata nel banco da lavoro", "Recipe loaded into the workbench"], ["Ripristinata configurazione iniziale", "Initial configuration restored"], ["Richiede 10 Forza e 12 Costituzione.", "Requires 10 Strength and 12 Constitution."], ["Slot distrutto e durabilità ridotta.", "Slot destroyed and durability reduced."], ["Errore nella generazione del rottame", "Error generating scrap"], ["Nessuna specializzazione collegata a", "No specialization linked to"], ["Impossibile rimuovere il Master Job.", "Unable to remove the Master Job."], ["si è spezzata ed è andata distrutta", "has broken and was destroyed"], ["Questo sbloccherà le statistiche di", "This will unlock the statistics for"], ["ricetta segreta non ancora scoperta", "undiscovered secret recipe"], ["Requisiti & Competenze per Livello", "Requirements & Proficiencies by Level"], ["Compendio CraftingSystem → Oggetti", "CraftingSystem → Oggetti Compendium"], ["Stai per eseguire un'operazione di", "You are about to perform a"], ["I materiali sono andati distrutti.", "The materials were destroyed."], ["Compendio Oggetti non disponibile.", "Oggetti Compendium unavailable."], ["Statistiche aggiornate dal Master!", "Statistics updated by the GM!"], ["Slot 1, Slot 2, Slot 3 e Risultato", "Slot 1, Slot 2, Slot 3 and Result"], ["Impostazioni salvate con successo", "Settings saved successfully"], ["lo slot sarà distrutto per sempre", "the slot will be destroyed forever"], ["Nessuna arma realistica di rarità", "No realistic weapon of rarity"], ["Master Job non ancora selezionato", "Master Job not selected yet"], ["Configura requisiti della Stella", "Configure Star requirements"], ["deve trovarsi nel tuo inventario", "must be in your inventory"], ["L'arma è ora priva di protezione", "The weapon is now unprotected"], ["Limite di 3 Master Job raggiunto", "3 Master Job limit reached"], ["ora segue le regole Realistiche!", "now follows the Realistic rules!"], ["Job Speciali & Specializzazioni", "Special Jobs & Specializations"], ["ha riparato con successo l'arma", "successfully repaired the weapon"], ["ripristinandone la durabilità a", "restoring its durability to"], ["La penalità al danno si applica", "The damage penalty applies"], ["Scegli un Materiale o Strumento", "Choose a Material or Tool"], ["Maestor delle Leghe Sintetiche", "Master of Synthetic Alloys"], ["Kit / Materiale di Riparazione", "Repair Kit / Material"], ["Nessun oggetto nell'inventario", "No items in inventory"], ["i materiali andranno distrutti", "materials will be destroyed"], ["si è distrutto definitivamente", "was permanently destroyed"], ["Applica Usura Manuale Avanzata", "Apply Advanced Manual Wear"], ["Sei sicuro di voler procedere?", "Are you sure you want to proceed?"], ["Il tentativo di forare lo Slot", "The attempt to drill Slot"], ["Arma smussata applicata SOLO a", "Dull Weapon applied ONLY to"], ["Nessun Master Job configurato", "No Master Job configured"], ["Salva Statistiche Personaggio", "Save Character Statistics"], ["Nessun oggetto corrispondente", "No matching item"], ["Inserisci il valore di Lustro", "Enter the Luster value"], ["caricata nel banco da lavoro!", "loaded into the workbench!"], ["Oggetto Prodotto (Risultato)", "Produced Item (Result)"], ["Richiede Attestato da master", "Requires a Master Certificate"], ["si è spezzata in mille pezzi", "shattered into pieces"], ["non appartiene alla cartella", "does not belong to the folder"], ["ha sbloccato il job speciale", "unlocked the Special Job"], ["Configurazione Sistema Armi", "Weapon System Configuration"], ["Esperienza (EXP) & Prestige", "Experience (EXP) & Prestige"], ["Qualsiasi Arma (Automatico)", "Any Weapon (Automatic)"], ["Esporta Ricette Selezionate", "Export Selected Recipes"], ["EDITOR RICETTA JOB SPECIALE", "SPECIAL JOB RECIPE EDITOR"], ["Nessun requisito aggiuntivo", "No additional requirements"], ["necessiterà di manutenzione", "will require maintenance"], ["Requisiti insufficienti per", "Requirements not met for"], ["Devi raggiungere il Livello", "You must reach Level"], ["Disastro nella foratura per", "Drilling disaster for"], ["L'arma è già stata rimossa.", "The weapon has already been removed."], ["Dati Master Job non validi.", "Invalid Master Job data."], ["ha ottenuto il Job Speciale", "obtained the Special Job"], ["richiede un'arma di Livello", "requires a Level"], ["Torna alla scelta mestiere", "Back to profession selection"], ["Carica una ricetta salvata", "Load a saved recipe"], ["Riparazione non necessaria", "Repair not required"], ["RIPARAZIONE NON NECESSARIA", "REPAIR NOT REQUIRED"], ["Arma Realistica (bloccata)", "Realistic Weapon (locked)"], ["Nessun personaggio trovato", "No character found"], ["Competenze / TS / Maestrie", "Proficiencies / Saves / Masteries"], ["Il file JSON non è valido.", "The JSON file is not valid."], ["ha raggiunto il <b>Livello", "reached <b>Level"], ["ha fabbricato con successo", "successfully crafted"], ["Drop accessorio non valido", "Invalid accessory drop"], ["Soglie Livelli (EXP/Pres)", "Level Thresholds (EXP/Prestige)"], ["Impostazioni Sistema Armi", "Weapon System Settings"], ["Oggetto / Gemma Specifica", "Specific Item / Gem"], ["Conferma / Modifica Usura", "Confirm / Edit Wear"], ["Attivazione Irreversibile", "Irreversible Activation"], ["La gemma si è frantumata.", "The gem shattered."], ["Affila il prima possibile", "Sharpen as soon as possible"], ["Incastonatura fallita per", "Socketing failed for"], ["ha applicato con successo", "successfully applied"], ["Porta la specializzazione", "Raise the specialization"], ["Requisiti non soddisfatti", "Requirements not met"], ["ha ottenuto il Master Job", "obtained the Master Job"], ["Forzato a 100% dal Master", "Forced to 100% by the GM"], ["Affilatura ripristinata a", "Sharpness restored to"], ["Cronomante della Materia", "Matter Chronomancer"], ["Carica Ricetta Sbloccata", "Load Unlocked Recipe"], ["Gestione Maestrie Master", "Master Job Management"], ["e uno slot Master libero", "and one free Master slot"], ["scenderà permanentemente", "will permanently decrease"], ["per sbloccare il Livello", "to unlock Level"], ["per accedere al crafting", "to access"], ["ha tentato di fabbricare", "attempted to craft"], ["Archivista della Genesi", "Genesis Archivist"], ["MATERIALI INSUFFICIENTI", "INSUFFICIENT MATERIALS"], ["REQUISITI INSUFFICIENTI", "REQUIREMENTS NOT MET"], ["Catalizzatori Richiesti", "Required Catalysts"], ["Importa Ricette da JSON", "Import Recipes from JSON"], ["Materiali insufficienti", "Insufficient materials"], ["Percentuale di successo", "Success Chance"], ["Configurazione iniziale", "Initial configuration"], ["Affilatura ripristinata", "Sharpness restored"], ["Imposta Lustro Iniziale", "Set Initial Luster"], ["Durante l'installazione", "During installation"], ["Se la foratura fallisce", "If drilling fails"], ["ha raggiunto il Livello", "reached Level"], ["trovata nell'inventario", "found in the inventory"], ["durante l'estrazione da", "during extraction from"], ["Statistiche salvate per", "Statistics saved for"], ["Effetti dell'accessorio", "Accessory Effects"], ["Probabilità di successo", "Success Chance"], ["ha incastonato la gemma", "socketed the gem"], ["Personaggio non valido.", "Invalid character."], ["ha scelto il Master Job", "chose the Master Job"], ["Rimuovi Coti dallo Slot", "Remove Whetstones from Slot"], ["Rivestimento rimosso da", "Coating removed from"], ["Ingegnere dei Mutageni", "Mutagen Engineer"], ["Statistiche Personaggi", "Character Statistics"], ["Critico! Nessuna Usura", "Critical! No Wear"], ["Solo Compendio Oggetti", "Oggetti Compendium only"], ["Master Job selezionato", "Master Job selected"], ["Nessun oggetto trovato", "No item found"], ["Quantità Insufficiente", "Insufficient Quantity"], ["Requisiti progressione", "Progression Requirements"], ["Configura Impostazioni", "Configure Settings"], ["L'affilatura dell'arma", "The weapon's Sharpness"], ["subisce maggiore usura", "suffers increased wear"], ["Impossibile recuperare", "Unable to retrieve"], ["riparata con successo!", "successfully repaired!"], ["Esportate con successo", "Successfully exported"], ["L'arma è ora smussata.", "The weapon is now dull."], ["Accessorio non valido.", "Invalid accessory."], ["Estrattore di Purezza", "Purity Extractor"], ["LIVELLO INSUFFICIENTE", "LEVEL TOO LOW"], ["Rarità arma richiesta", "Required Weapon Rarity"], ["Proprietà Realistiche", "Realistic Properties"], ["Seleziona Personaggio", "Select Character"], ["Configurazione Modulo", "Module Configuration"], ["Conferma Rivestimento", "Confirm Coating"], ["Incastonatura fallita", "Socketing failed"], ["Questo job è bloccato", "This job is locked"], ["Rimozione fallita per", "Removal failed for"], ["installato nello Slot", "installed in Slot"], ["si sblocca al Livello", "unlocks at Level"], ["Chimico Metallurgico", "Metallurgical Chemist"], ["APPLICA RIVESTIMENTO", "APPLY COATING"], ["Ricetta non scoperta", "Undiscovered Recipe"], ["Moltiplicatore Usura", "Wear Multiplier"], ["Salva Soglie Livelli", "Save Level Thresholds"], ["Ricetta Rivestimento", "Coating Recipe"], ["Ricetta Job Speciale", "Special Job Recipe"], ["Prestigio Guadagnato", "Prestige Reward"], ["Mestieri Configurate", "Configured Professions"], ["Mestieri Configurati", "Configured Professions"], ["Inserisci Accessorio", "Insert Accessory"], ["nella professione di", "in the profession"], ["Scegli Cote per Slot", "Choose Whetstone for Slot"], ["Sì, Rendi Realistica", "Yes, Make Realistic"], ["rimossa con successo", "successfully removed"], ["aggiornato a Livello", "updated to Level"], ["Mestieri Principali", "Primary Professions"], ["Strumenti Richiesti", "Required Tools"], ["Oggetto da Riparare", "Item to Repair"], ["Modalità Realistica", "Realistic Mode"], ["Attestato da master", "Master Certificate"], ["Ricompensa Prestige", "Prestige Reward"], ["Il Lustro dell'arma", "The weapon's Luster"], ["priva di protezione", "unprotected"], ["Visibile solo al DM", "Visible to GM only"], ["Impossibile trovare", "Unable to find"], ["Stai per convertire", "You are about to convert"], ["è salito al Livello", "reached Level"], ["Bloccato al Livello", "Locked at Level"], ["ricetta sconosciuta", "unknown recipe"], ["Requisito fisso per", "Fixed requirement for"], ["Effetti della gemma", "Gem Effects"], ["ha rimosso la gemma", "removed the gem"], ["Kit di Riparazione:", "Repair Kit:"], ["Lustro azzerato a 0", "Luster reset to 0"], ["Addestrare Animali", "Animal Handling"], ["Scegli il Mestiere", "Choose Profession"], ["STRUMENTI MANCANTI", "MISSING TOOLS"], ["Frammenti di gemma", "Gem Fragments"], ["frammenti di gemma", "gem fragments"], ["Calcolo Usura Arma", "Weapon Wear Calculation"], ["Fallimento Critico", "Critical Failure"], ["solo a questa arma", "only to this weapon"], ["Salva Impostazioni", "Save Settings"], ["Ripristina Default", "Restore Defaults"], ["Strumenti Mancanti", "Missing Tools"], ["Rischio Fallimento", "Failure Risk"], ["Competenza Abilità", "Skill Proficiency"], ["Recuperato rottame", "Recovered scrap"], ["Sono mostrati solo", "Only"], ["durabilità massima", "maximum durability"], ["Configurazione per", "Configuration for"], ["L'arma è diventata", "The weapon became"], ["è andato distrutto", "was destroyed"], ["Il rivestimento in", "The coating"], ["nel tuo inventario", "in your inventory"], ["Lustro impostato a", "Luster set to"], ["Lo Slot Accessorio", "Accessory Slot"], ["Chimico Biomedico", "Biomedical Chemist"], ["Tutti i Compendii", "All Compendiums"], ["Compendio Oggetti", "Oggetti Compendium"], ["Oggetto Specifico", "Specific Item"], ["Scegli Master Job", "Choose Master Job"], ["Esporta File JSON", "Export JSON File"], ["Livello richiesto", "Required Level"], ["Solo progressione", "Progression only"], ["Gestione avanzata", "Advanced management"], ["vengono applicati", "are applied"], ["Usura applicata a", "Wear applied to"], ["Totale slot rotti", "Total broken slots"], ["Rimozione fallita", "Removal failed"], ["Crafting Fallito!", "Crafting Failed!"], ["Scegli un Oggetto", "Choose an Item"], ["Stai tentando una", "You are attempting an"], ["(e 10 ⭐ Prestige)", "(and 10 ⭐ Prestige)"], ["(e 50 ⭐ Prestige)", "(and 50 ⭐ Prestige)"], ["Rapidità di Mano", "Sleight of Hand"], ["FABBRICA OGGETTO", "CRAFT ITEM"], ["SEGRETA SCOPERTA", "SECRET DISCOVERED"], ["Oggetto Prodotto", "Produced Item"], ["Materiali Oscuri", "Dark Materials"], ["Operazione Gemme", "Gem Operation"], ["Forature & Gemme", "Drilling & Gems"], ["Usura Automatica", "Automatic Wear"], ["Colpo Eccellente", "Excellent Hit"], ["Solo questa arma", "This weapon only"], ["Modifica Ricetta", "Edit Recipe"], ["Stelle richieste", "Required Stars"], ["Successo Massimo", "Maximum Success"], ["Maestria Abilità", "Skill Mastery"], ["Nessun requisito", "No requirements"], ["Danno Durabilità", "Durability Damage"], ["Danno Affilatura", "Sharpness Damage"], ["Congratulazioni!", "Congratulations!"], ["perso per sempre", "lost forever"], ["nel Job Speciale", "in the Special Job"], ["Proprietà Magica", "Magical Property"], ["ha raggiunto <b>", "reached <b>"], ["usufruendo di 1x", "using 1x"], ["(e 5 ⭐ Prestige)", "(and 5 ⭐ Prestige)"], ["</b> su <b style", "</b> on <b style"], ["Forgiacristalli", "Crystalforger"], ["TS Costituzione", "Constitution Save"], ["Scegli Mestiere", "Choose Profession"], ["TENTA CREAZIONE", "ATTEMPT CRAFT"], ["Ricetta Segreta", "Secret Recipe"], ["Ricette Segrete", "Secret Recipes"], ["Tutte le Stelle", "All Stars"], ["Tutti i Livelli", "All Levels"], ["Arma Realistica", "Realistic Weapon"], ["Reagenti Minori", "Minor Reagents"], ["Rimozione Gemma", "Gem Removal"], ["Mancato Pesante", "Heavy Miss"], ["Maestrie Master", "Master Job selections"], ["Salva Modifiche", "Save Changes"], ["Elimina Ricetta", "Delete Recipe"], ["Nessuna Ricetta", "No Recipe"], ["Slot Accessorio", "Accessory Slot"], ["Automaticamente", "Automatically"], ["Punti Prestigio", "Prestige Points"], ["Gestione Master", "GM Management"], ["ha scoperto una", "discovered a"], ["si è frantumata", "shattered"], ["L'affilatura di", "The Sharpness of"], ["Aggiorna Scheda", "Refresh Sheet"], ["Segmento Giallo", "Yellow Segment"], ["dell'accessorio", "of the accessory"], ["nell'inventario", "in the inventory"], ["Il rivestimento", "The coating"], ["Vettori Arcani", "Arcane Vectors"], ["Accessori Arma", "Weapon Accessories"], ["Energia Arcana", "Arcane Energy"], ["Slot bersaglio", "Target Slot"], ["Durabilità Max", "Max Durability"], ["EXP Guadagnata", "EXP Reward"], ["Ricompensa EXP", "EXP Reward"], ["Sblocco Master", "Master Unlock"], ["Solo Prestigio", "Prestige only"], ["Rimuovi gratis", "Remove for free"], ["Configurazione", "Configuration"], ["trasformandola", "turning it"], ["Servono almeno", "You need at least"], ["ha tentato una", "attempted an"], ["nel Master Job", "in the Master Job"], ["Segmento Rosso", "Red Segment"], ["Segmento Verde", "Green Segment"], ["Segmento Viola", "Purple Segment"], ["nella cartella", "in the folder"], ["Sopravvivenza", "Survival"], ["Arma smussata", "Dull Weapon"], ["arma smussata", "dull weapon"], ["Incastonatura", "Socketing"], ["Colpo a Segno", "Hit"], ["Salva Ricetta", "Save Recipe"], ["Nuova Ricetta", "New Recipe"], ["Base Successo", "Base Success"], ["Competenza TS", "Save Proficiency"], ["Tiro Salvezza", "Saving Throw"], ["Catalizzatori", "Catalysts"], ["Catalizzatore", "Catalyst"], ["catalizzatori", "catalysts"], ["Insufficienti", "Insufficient"], ["insufficienti", "insufficient"], ["Insufficiente", "Insufficient"], ["insufficiente", "insufficient"], ["Professionale", "Professional"], ["Applica Usura", "Apply Wear"], ["Danno e Usura", "Damage and Wear"], ["si sblocca al", "unlocks at"], ["combattimento", "combat"], ["per la stella", "for star"], ["nel compendio", "in the compendium"], ["dal Compendio", "from the Compendium"], ["dal compendio", "from the compendium"], ["Intrattenere", "Performance"], ["Costituzione", "Constitution"], ["Intelligenza", "Intelligence"], ["ESEGUI GEMME", "EXECUTE GEM OPERATION"], ["SEGRETA • DM", "SECRET • GM"], ["Rivestimenti", "Coatings"], ["Rivestimento", "Coating"], ["rivestimento", "coating"], ["Punti Master", "Master Points"], ["Punto Master", "Master Point"], ["Applica JSON", "Apply JSON"], ["Arma Intatta", "Weapon Intact"], ["Sbloccato da", "Unlocked by"], ["Impostazioni", "Settings"], ["Progressione", "Progression"], ["Obbligatorio", "Required"], ["Danno Lustro", "Luster Damage"], ["Non possiedi", "You do not own"], ["con successo", "successfully"], ["manutenzione", "maintenance"], ["riconosciuti", "recognized"], ["ha raggiunto", "reached"], ["Sistema Armi", "Weapon System"], ["Il Lustro di", "The Luster of"], ["Segmento Blu", "Blue Segment"], ["L'arma è ora", "The weapon is now"], ["e restituita", "and returned"], ["al Livello 5", "to Level 5"], ["ha sbloccato", "unlocked"], [" reached la ", " reached the "], ["Forgia Rune", "Rune Forge"], ["Tossicologo", "Toxicologist"], ["Diplomatico", "Diplomat"], ["Pellettiere", "Leatherworker"], ["Persuasione", "Persuasion"], ["RIPARA ARMA", "REPAIR WEAPON"], ["Arti oscure", "Dark Arts"], ["Arte oscura", "Dark Art"], ["Riparazioni", "Repairs"], ["100% Sicuro", "100% Safe"], ["è scesa a 0", "dropped to 0"], ["Professione", "Profession"], ["Personaggio", "Character"], ["personaggio", "character"], ["Riparazione", "Repair"], ["riparazione", "repair"], ["Realistiche", "Realistic"], ["Descrizione", "Description"], ["Statistiche", "Statistics"], ["Disponibile", "Available"], ["disponibile", "available"], ["Selezionati", "Selected"], ["selezionati", "selected"], ["Disponibili", "Available"], ["Probabilità", "Chance"], ["probabilità", "chance"], ["viene tolto", "is removed"], ["non trovata", "not found"], ["non trovato", "not found"], ["compatibile", "compatible"], ["più fragile", "more fragile"], ["distruggerà", "will destroy"], ["Ricetta per", "Recipe for"], ["della gemma", "of the gem"], ["fallita per", "failed for"], ["è sceso a 0", "dropped to 0"], ["</b> su <b>", "</b> on <b>"], ["Pansofista", "Pansophist"], ["Tecnomante", "Technomancer"], ["Alchimista", "Alchemist"], ["Intimidire", "Intimidation"], ["Intuizione", "Insight"], ["Percezione", "Perception"], ["Durabilità", "Durability"], ["Affilatura", "Sharpness"], ["Competenza", "Proficiency"], ["ALMENO UNO", "AT LEAST ONE"], ["a 5 stelle", "at 5 stars"], ["è esaurito", "is depleted"], ["Accessorio", "Accessory"], ["Slot Gemma", "Gem Slot"], ["Slot perso", "Lost Slot"], ["Slot rotto", "Broken Slot"], ["dallo slot", "from the slot"], ["Personaggi", "Characters"], ["Inventario", "Inventory"], ["inventario", "inventory"], ["Realistica", "Realistic"], ["realistica", "realistic"], ["Fallimento", "Failure"], ["fallimento", "failure"], ["Attenzione", "Warning"], ["Automatico", "Automatic"], ["Principale", "Primary"], ["Principali", "Primary"], ["Ripristina", "Restore"], ["Esperienza", "Experience"], ["al massimo", "at most"], ["Permanente", "Permanent"], ["permanente", "permanent"], ["Installare", "Installing"], ["installare", "install"], ["si sblocca", "unlocks"], ["Slot Gemme", "Gem Slots"], ["Slot persi", "Lost Slots"], ["Slot rotti", "Broken Slots"], ["accessorio", "accessory"], ["Stato Arma", "Weapon Status"], ["frantumata", "shattered"], ["Livello di", "Level of"], ["Archiatra", "Archiater"], ["Gemmologo", "Gemologist"], ["Acrobazia", "Acrobatics"], ["Furtività", "Stealth"], ["Religione", "Religion"], ["Destrezza", "Dexterity"], ["Compendii", "Compendiums"], ["Seleziona", "Select"], ["In attesa", "Waiting"], ["allo slot", "to the slot"], ["Bersaglio", "Target"], ["Requisiti", "Requirements"], ["Requisito", "Requirement"], ["requisiti", "requirements"], ["requisito", "requirement"], ["Materiali", "Materials"], ["Materiale", "Material"], ["materiali", "materials"], ["materiale", "material"], ["Strumenti", "Tools"], ["Strumento", "Tool"], ["strumenti", "tools"], ["strumento", "tool"], ["Sbloccato", "Unlocked"], ["sbloccato", "unlocked"], ["Richiesti", "Required"], ["Richieste", "Required"], ["Richiesto", "Required"], ["Richiesta", "Required"], ["Prestigio", "Prestige"], ["Massimo 3", "Maximum 3"], ["Risultato", "Result"], ["Click per", "Click to"], ["Tira d100", "Roll d100"], ["Incastona", "Socket"], ["rimuovere", "remove"], ["Successo!", "Success!"], ["Accessori", "Accessories"], ["applicato", "applied"], ["applicata", "applied"], ["applicati", "applied"], ["applicate", "applied"], ["distrutto", "destroyed"], ["distrutta", "destroyed"], ["frammenti", "fragments"], ["procedere", "proceed"], ["annullata", "undone"], ["è fallito", "failed"], ["Nuovo Max", "New Max"], ["dell'arma", "of the weapon"], ["Lo slot è", "The slot is"], ["Patologo", "Pathologist"], ["Mercante", "Merchant"], ["Atletica", "Athletics"], ["Indagare", "Investigation"], ["Medicina", "Medicine"], ["Saggezza", "Wisdom"], ["TS Forza", "Strength Save"], ["Foratura", "Drilling"], ["Aggiungi", "Add"], ["Cerca...", "Search..."], ["Conferma", "Confirm"], ["Modifica", "Edit"], ["Quantità", "Quantity"], ["Riuscita", "Success"], ["Maestria", "Mastery"], ["5 stelle", "5 stars"], ["Aggiunte", "Added"], ["Richiede", "Requires"], ["richiede", "requires"], ["Mestieri", "Professions"], ["Mestiere", "Profession"], ["mestiere", "profession"], ["Reagenti", "Reagents"], ["Reagente", "Reagent"], ["reagenti", "reagents"], ["Forature", "Drillings"], ["forature", "drillings"], ["Dettagli", "Details"], ["Bloccato", "Locked"], ["bloccato", "locked"], ["Scoperta", "Discovered"], ["scoperta", "discovered"], ["Mancanti", "Missing"], ["mancanti", "missing"], ["Successo", "Success"], ["successo", "success"], ["Gratuito", "Free"], ["Speciale", "Special"], ["Speciali", "Special"], ["Avanzato", "Advanced"], ["Avanzata", "Advanced"], ["Standard", "Standard"], ["Click SX", "Left Click"], ["Click DX", "Right Click"], ["Visibile", "Visible"], ["Inserire", "Insert"], ["Gestisci", "Manage"], ["gratuito", "free"], ["Cartella", "Folder"], ["cartella", "folder"], ["mostrati", "shown"], ["azzerato", "reset"], ["scenderà", "will drop"], ["RICHIEDE", "REQUIRES"], ["La gemma", "The gem"], ["salvata!", "saved!"], ["smussata", "dull"], ["ª stella", " star"], ["L'arma \"", "The weapon \""], [" oppure ", " or "], ["Erudito", "Scholar"], ["Inganno", "Deception"], ["Carisma", "Charisma"], ["Mancato", "Miss"], ["Solo GM", "GM Only"], ["solo DM", "GM only"], ["Rimuovi", "Remove"], ["Annulla", "Cancel"], ["Sblocco", "Unlock"], ["Rimosse", "Removed"], ["Livelli", "Levels"], ["Livello", "Level"], ["livello", "level"], ["Servono", "Requires"], ["Ricette", "Recipes"], ["Ricetta", "Recipe"], ["ricetta", "recipe"], ["Effetti", "Effects"], ["Effetto", "Effect"], ["effetti", "effects"], ["effetto", "effect"], ["Sblocca", "Unlock"], ["Segreta", "Secret"], ["segreta", "secret"], ["Massimo", "Maximum"], ["Massima", "Maximum"], ["Normale", "Normal"], ["Normali", "Normal"], ["Nessuno", "None"], ["Nessuna", "No"], ["nessuna", "no"], ["Elimina", "Delete"], ["Importa", "Import"], ["Esporta", "Export"], ["Applica", "Apply"], ["attuale", "current"], ["attuali", "current"], ["mancano", "missing"], ["Attuale", "Current"], ["Rottame", "Scrap"], ["rottame", "scrap"], ["oggetto", "item"], ["Oggetto", "Item"], ["massima", "maximum"], ["massimo", "maximum"], ["aumenta", "increases"], ["Mancano", "Missing"], ["FALLITO", "FAILED"], ["salvata", "saved"], ["Migrati", "Migrated"], ["ricette", "recipes"], ["Gemma \"", "Gem \""], [" da <b>", " from <b>"], ["Medico", "Physician"], ["Fabbro", "Blacksmith"], ["Natura", "Nature"], ["Storia", "History"], ["Arcana", "Arcana"], ["Lustro", "Luster"], ["Svuota", "Clear"], ["Carica", "Load"], ["Chiudi", "Close"], ["Stelle", "Stars"], ["Stella", "Star"], ["stelle", "stars"], ["stella", "star"], ["Oscuri", "Dark"], ["Oscure", "Dark"], ["oscure", "dark"], ["Soglie", "Thresholds"], ["Errore", "Error"], ["errore", "error"], ["gratis", "free"], ["Valore", "Value"], ["valore", "value"], ["Liberi", "Free"], ["liberi", "free"], ["Nessun", "No"], ["nessun", "no"], ["Scegli", "Choose"], ["Forato", "Drilled"], ["forato", "drilled"], ["Forare", "Drill"], ["forare", "drill"], ["validi", "valid"], ["valida", "valid"], ["scende", "drops"], ["azione", "action"], ["sicuro", "sure"], ["pronto", "ready"], ["pronti", "ready"], ["Attivo", "Active"], ["attivo", "active"], ["Giallo", "Yellow"], ["di <b>", "of <b>"], ["nel ${", "in ${"], ["Sarto", "Tailor"], ["Cuoco", "Cook"], ["Forza", "Strength"], ["Gemme", "Gems"], ["gemme", "gems"], ["Gemma", "Gem"], ["gemma", "gem"], ["TUTTI", "ALL"], ["Serve", "Requires"], ["Usati", "Used"], ["usati", "used"], ["Salva", "Save"], ["Punti", "Points"], ["Banco", "Workbench"], ["Danno", "Damage"], ["ma ha", "but"], ["danni", "damage"], ["Rosso", "Red"], ["Verde", "Green"], ["Viola", "Purple"], ["Usura", "Wear"], ["usura", "wear"], ["Coti", "Whetstones"], ["Cote", "Whetstone"], ["Apri", "Open"], ["Tiro", "Roll"], ["Armi", "Weapons"], ["Arma", "Weapon"], ["arma", "weapon"], ["Nome", "Name"], ["Tipo", "Type"], ["Base", "Base"], ["foro", "hole"], ["si è", ""], ["nel ", "in "], ["ora", "current"], ["Usa", "Use"], ["Blu", "Blue"], ["CA", "AC"]];
  const NS = "foundry-weapon-system";
  const getStoredOverride = () => {
    try {
      const storage = game?.settings?.storage?.get?.("client");
      const fullKey = `${NS}.languageOverride`;
      const rec = storage?.get?.(fullKey);
      const raw = rec?.value ?? rec;
      if (["auto","it","en"].includes(raw)) return raw;
    } catch (_) {}
    try {
      const raw = game?.settings?.get?.(NS, "languageOverride");
      if (["auto","it","en"].includes(raw)) return raw;
    } catch (_) {}
    return "auto";
  };
  const lang = () => {
    const forced = getStoredOverride();
    if (forced === "it" || forced === "en") return forced;
    const foundryLang = String(game?.i18n?.lang || navigator?.language || "it").toLowerCase();
    return foundryLang.startsWith("en") ? "en" : "it";
  };
  const t = (value) => {
    if (typeof value !== "string" || lang() !== "en" || !value) return value;
    let out = value;
    for (const [it,en] of [...FIX_PAIRS, ...PAIRS].sort((a,b) => String(b[0]).length - String(a[0]).length)) {
      if (!out.includes(it)) continue;
      if (/^[A-Za-z0-9]+$/.test(it)) {
        out = out.replace(new RegExp("\\b" + it + "\\b", "g"), en);
      } else {
        out = out.split(it).join(en);
      }
    }
    return out;
  };
  const html = (value) => {
    if (typeof value !== "string" || lang() !== "en" || !value) return value;
    try {
      const host = document.createElement("div");
      host.innerHTML = value;
      translateDom(host);
      return host.innerHTML;
    } catch (_) {
      return value;
    }
  };
  const translateElement = (el) => {
    if (!el || el.nodeType !== 1) return;
    const tag = String(el.tagName || "").toUpperCase();
    if (["SCRIPT","STYLE","TEXTAREA","CODE","PRE"].includes(tag)) return;
    for (const attr of ["title","placeholder","aria-label"]) {
      if (el.hasAttribute?.(attr)) {
        const before = el.getAttribute(attr);
        const after = t(before);
        if (after !== before) el.setAttribute(attr, after);
      }
    }
  };
  const translateDom = (root) => {
    if (lang() !== "en" || !root) return root;
    const base = root.nodeType === 1 ? root : root?.documentElement;
    if (!base) return root;
    translateElement(base);
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentElement;
        const tag = String(parent?.tagName || "").toUpperCase();
        if (["SCRIPT","STYLE","TEXTAREA","CODE","PRE"].includes(tag)) continue;
        const before = node.nodeValue;
        const after = t(before);
        if (after !== before) node.nodeValue = after;
      } else translateElement(node);
    }
    return root;
  };
  const observe = (root) => {
    if (!root || lang() !== "en") return root;
    translateDom(root);
    if (root.__itEnLocalizationObserver) return root;
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") {
          const p = m.target?.parentElement;
          const tag = String(p?.tagName || "").toUpperCase();
          if (["SCRIPT","STYLE","TEXTAREA","CODE","PRE"].includes(tag)) continue;
          const before = m.target.nodeValue;
          const after = t(before);
          if (after !== before) m.target.nodeValue = after;
        } else if (m.type === "attributes") {
          translateElement(m.target);
        } else {
          for (const n of m.addedNodes || []) {
            if (n.nodeType === Node.TEXT_NODE) {
              const before = n.nodeValue;
              const after = t(before);
              if (after !== before) n.nodeValue = after;
            } else if (n.nodeType === 1) translateDom(n);
          }
        }
      }
    });
    obs.observe(root, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:["title","placeholder","aria-label"] });
    Object.defineProperty(root, "__itEnLocalizationObserver", { value:obs, configurable:true });
    return root;
  };
  const notify = (type, message, ...args) => ui.notifications[type](t(message), ...args);
  const chat = (data, ...args) => {
    const payload = data && typeof data === "object" ? {...data} : data;
    if (payload && typeof payload.content === "string") payload.content = t(payload.content);
    if (payload && typeof payload.flavor === "string") payload.flavor = t(payload.flavor);
    return ChatMessage.create(payload, ...args);
  };
  Hooks.once("init", () => {
    try {
      game.settings.register(NS, "languageOverride", {
        name: "Lingua modulo / Module Language",
        hint: "Auto segue la lingua di Foundry. Italiano o English forza la lingua di questo modulo. / Auto follows Foundry language. Italian or English forces this module language.",
        scope: "client", config: true, type: String, default: "auto",
        choices: { auto:"Auto (Foundry)", it:"Italiano", en:"English" },
        onChange: () => window.location.reload()
      });
    } catch (err) { console.warn(`${NS} | language setting registration failed`, err); }
  });
  return { t, html, translateDom, observe, info:(m,...a)=>notify("info",m,...a), warn:(m,...a)=>notify("warn",m,...a), error:(m,...a)=>notify("error",m,...a), chat, lang };
})();

Hooks.once("init", () => {
  game.settings.register("foundry-weapon-system", "requireGMApproval", {
    name: WS_I18N.t("Approvazione Master Obbligatoria per l'Usura"),
    hint: WS_I18N.t("Se spuntata, le statistiche dell'arma non cambieranno fino a quando il Master non conferma l'esito dalla chat. Se deselezionata, tutto avverrà in automatico."),
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.registerMenu("foundry-weapon-system", "weaponSystemSettingsMenu", {
    name: WS_I18N.t("Configurazione Sistema Armi"),
    label: WS_I18N.t("Configura Impostazioni"),
    hint: WS_I18N.t("Pannello di configurazione per il modulo delle armi (Durabilità, Lustro & Affilatura)."),
    icon: "fas fa-cogs",
    type: WeaponSystemSettingsForm,
    restricted: true
  });
});

Hooks.once("ready", () => {
  console.log("⚔️ WEAPON SYSTEM: Modulo Armi caricato con successo!");
  WS_I18N.info("⚔️ Sistema Armi (Durabilità, Lustro, Affilatura, Coti, Gemme & Rivestimenti) Attivo!");

  game.socket.on("module.foundry-weapon-system", (data) => {
    if (data.action === "promptDegradation" && game.user.isGM) {
      const activeGMs = game.users.filter(u => u.isGM && u.active);
      if (activeGMs.length > 0 && game.user.id === activeGMs[0].id) {
        game.weaponSystem.handleWeaponDegradationFlow(data);
      }
    }
  });

  game.weaponSystem = {
    initializeWeaponData,
    openWeaponMenu,
    checkWeaponBreak,
    breakCoating,
    promptRealisticMode,
    promptGMDegradation,
    applyCoatingToWeapon,
    calculateDegradation,
    handleWeaponDegradationFlow,
    activeMenus: {}
  };

  // Migra automaticamente le vecchie Armi Smussate che usavano un ActiveEffect
  // trasferito all'Actor (e quindi penalizzavano tutte le armi del personaggio).
  if (game.user.isGM) {
    setTimeout(() => migrateLegacyDullWeaponEffects().catch(err => {
      console.error("⚔️ WEAPON SYSTEM | Errore migrazione Arma smussata locale:", err);
    }), 1200);
  }
});

class WeaponSystemSettingsForm extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "weapon-system-settings-form",
      title: WS_I18N.t("Impostazioni Sistema Armi"),
      template: "templates/generic/form.html",
      width: 400,
      height: "auto",
      closeOnSubmit: true
    });
  }

  getData() { return {}; }
  async _updateObject(event, formData) {}

  render(force, options) {
    const isChecked = game.settings.get("foundry-weapon-system", "requireGMApproval");
    renderUniversalDialog({
      title: "⚙️ Impostazioni Sistema Armi",
      content: `
        <div style="padding:12px; background:#0f172a; color:#f3f4f6; font-family:'Inter', sans-serif;">
          <h3 style="margin:0 0 8px 0; color:#f59e0b; border-bottom:1px solid #334155; padding-bottom:4px;">
            <i class="fa-solid fa-gear"></i> Configurazione Modulo
          </h3>
          <div style="display:flex; align-items:center; gap:10px; margin-top:10px; background:#1e293b; padding:10px; border-radius:8px; border:1px solid #334155;">
            <input type="checkbox" id="setting-gm-approval" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            <label for="setting-gm-approval" style="font-size:11px; cursor:pointer; font-weight:bold; color:#cbd5e1;">
              Fino a quando il Master non decide l'esito dell'usura dell'arma questa non perde statistiche (se deselezionata, tutto va in automatico)
            </label>
          </div>
          <button type="button" id="save-module-settings" class="fvtt-weapon-btn" style="width:100%; margin-top:12px;">Salva Impostazioni</button>
        </div>
      `,
      width: 400,
      height: 220,
      renderCB: (sRoot, sDialog) => {
        sRoot.querySelector('#save-module-settings').onclick = async () => {
          const val = sRoot.querySelector('#setting-gm-approval').checked;
          await game.settings.set("foundry-weapon-system", "requireGMApproval", val);
          WS_I18N.info("Impostazioni salvate con successo!");
          if (sDialog && sDialog.close) sDialog.close();
        };
      }
    });
  }
}

function injectWeaponSystemCSS() {
  if (!document.getElementById("fvtt-weapon-fa")) {
    const link = document.createElement("link");
    link.id = "fvtt-weapon-fa";
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(link);
  }

  if (document.getElementById("fvtt-weapon-styles")) return;
  const style = document.createElement("style");
  style.id = "fvtt-weapon-styles";
  style.textContent = `
    .fvtt-weapon-window {
      font-family: 'Inter', system-ui, sans-serif !important;
      color: #f3f4f6 !important;
      background: #0f172a !important;
      padding: 12px;
      font-size: 13px;
      max-height: 80vh;
      overflow-y: auto !important;
    }
    .fvtt-weapon-panel {
      background: #1e293b !important;
      border: 1px solid #334155 !important;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 10px;
    }
    .fvtt-weapon-bar-bg {
      width: 100%;
      height: 14px;
      background: #020617;
      border-radius: 7px;
      overflow: hidden;
      border: 1px solid #334155;
      position: relative;
      margin-top: 4px;
    }
    .fvtt-sharpness-bar {
      width: 100%;
      height: 16px;
      background: #020617;
      border-radius: 6px;
      border: 1px solid #334155;
      display: flex;
      overflow: hidden;
      position: relative;
      margin-top: 4px;
    }
    .fvtt-sharp-seg {
      flex: 1;
      height: 100%;
      border-right: 1px solid #0f172a;
      opacity: 0.25;
      transition: all 0.3s ease;
    }
    .fvtt-sharp-seg:last-child { border-right: none; }
    .fvtt-sharp-seg.active { opacity: 1; box-shadow: inset 0 0 8px rgba(255,255,255,0.6); }
    .fvtt-sharp-seg.seg-red { background: #ef4444; }
    .fvtt-sharp-seg.seg-yellow { background: #eab308; }
    .fvtt-sharp-seg.seg-green { background: #22c55e; }
    .fvtt-sharp-seg.seg-blue { background: #3b82f6; }
    .fvtt-sharp-seg.seg-purple { background: #a855f7; }
    .fvtt-weapon-btn {
      background: linear-gradient(180deg, #d97706 0%, #b45309 100%) !important;
      color: #ffffff !important;
      font-weight: bold;
      font-size: 11px;
      border-radius: 8px;
      padding: 6px 12px;
      cursor: pointer;
      border: 1px solid #fef3c7 !important;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .fvtt-weapon-btn:hover { filter: brightness(1.2); transform: translateY(-2px); }
    .fvtt-gem-slot {
      flex: 1; background: #020617; border-radius: 8px; padding: 8px 4px; text-align: center; position: relative; transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; min-height: 54px;
    }
    .fvtt-gem-slot.unlocked { border: 1.5px dashed #38bdf8; }
    .fvtt-gem-slot.unlocked:hover { background: rgba(56, 189, 248, 0.15); border-style: solid; transform: translateY(-2px) scale(1.03); box-shadow: 0 0 10px rgba(56, 189, 248, 0.4); }
    .fvtt-gem-slot.locked { border: 1.5px dashed #475569; opacity: 0.6; cursor: not-allowed; }
    .fvtt-gem-slot.filled { border: 1.5px solid #10b981; background: rgba(16, 185, 129, 0.12); }
    .fvtt-gem-slot.drag-over { border-color: #fbbf24 !important; background: rgba(251, 191, 36, 0.25) !important; transform: scale(1.05); }
    .fvtt-cote-slot {
      width: 58px; height: 58px; background: #020617; border: 1.5px dashed #22c55e; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; position: relative; transition: all 0.2s ease;
    }
    .fvtt-cote-slot:hover { border-style: solid; background: rgba(34, 197, 94, 0.18); transform: translateY(-2px) scale(1.05); box-shadow: 0 0 12px rgba(34, 197, 94, 0.4); }
    .fvtt-cote-slot.filled { border-style: solid; border-color: #22c55e; background: rgba(34, 197, 94, 0.12); }
    .fvtt-item-card { background: #0f172a !important; border: 1px solid #334155 !important; border-radius: 8px; padding: 8px 10px; cursor: pointer; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); position: relative; }
    .fvtt-item-card:hover { border-color: #f59e0b !important; background: #1e293b !important; transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4); z-index: 10; }
    .fvtt-qty-btn { width: 26px; height: 26px; background: #1e293b; border: 1px solid #334155; color: #f3f4f6; border-radius: 6px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .fvtt-qty-btn:hover { background: #334155; border-color: #f59e0b; color: #f59e0b; }
  `;
  document.head.appendChild(style);
}

function getMaxSharpness(level) {
  if (level <= 1) return 60;
  if (level === 2) return 67;
  if (level === 3) return 73;
  if (level === 4) return 80;
  if (level === 5) return 90;
  return 100;
}

function getWeaponRarityTier(item) {
  const rarity = (item.system?.rarity || "").toLowerCase();
  if (rarity.includes("legendary") || rarity.includes("artifact")) return "legendary";
  if (rarity.includes("rare") || rarity.includes("very")) return "rare";
  return "common";
}

function getDrillSuccessRate(slotIdx, weaponItem) {
  const rarity = (weaponItem.system?.rarity || "").toLowerCase();
  let tier = "common";
  if (rarity.includes("legendary") || rarity.includes("artifact")) tier = "legendary";
  else if (rarity.includes("rare") || rarity.includes("very")) tier = "rare";

  if (tier === "legendary") {
    if (slotIdx === 0) return 10;
    if (slotIdx === 1) return 5;
    if (slotIdx === 2) return 0;
  } else if (tier === "rare") {
    if (slotIdx === 0) return 40;
    if (slotIdx === 1) return 30;
    if (slotIdx === 2) return 20;
  } else {
    if (slotIdx === 0) return 60;
    if (slotIdx === 1) return 50;
    if (slotIdx === 2) return 40;
  }
  return 50;
}

function getDrilledGemSlotsCount(level, drilledSlots, lostSlots = null) {
  const drilled = Array.isArray(drilledSlots) ? drilledSlots : [false, false, false];
  const lost = Array.isArray(lostSlots) ? lostSlots : [false, false, false];
  let count = 0;

  // Il malus da perforazione rappresenta il danno strutturale del foro.
  // Uno slot distrutto/perso continua quindi a contare come perforazione permanente.
  if (level >= 2 && (drilled[0] || lost[0])) count++;
  if (level >= 4 && (drilled[1] || lost[1])) count++;
  if (level >= 6 && (drilled[2] || lost[2])) count++;
  return count;
}

function getEmbeddedDescription(source) {
  if (!source) return "";
  const desc = source.system?.description?.value
    ?? source.system?.description?.public
    ?? source.description
    ?? "";
  return typeof desc === "string" ? desc.trim() : "";
}

function snapshotGemEffects(source) {
  if (!source?.effects) return [];
  return Array.from(source.effects).map(effect => {
    const raw = typeof effect.toObject === "function" ? effect.toObject() : foundry.utils.deepClone(effect);
    return {
      name: raw.name || raw.label || "Effetto passivo",
      changes: Array.isArray(raw.changes)
        ? raw.changes.map(change => ({
            key: String(change.key || ""),
            value: change.value ?? "",
            mode: change.mode ?? null,
            priority: change.priority ?? null
          }))
        : []
    };
  });
}

function safeImg(path) {
  if (!path || typeof path !== "string" || path.includes("$") || path.includes("{") || path.includes("undefined")) {
    return "icons/svg/item-bag.svg";
  }
  return path;
}

function extractCoatingWord(coatingName) {
  if (!coatingName) return "Rivestimento";
  const words = coatingName.trim().split(/\s+/);
  if (words.length >= 3) {
    const rawWord = words[2];
    return rawWord.charAt(0).toUpperCase() + rawWord.slice(1).toLowerCase();
  }
  return words[words.length - 1].charAt(0).toUpperCase() + words[words.length - 1].slice(1).toLowerCase();
}

function getSharpnessDetails(val) {
  const v = Math.clamp(val ?? 60, 0, 100);
  if (v <= 0) return { seg: 0, color: "#ef4444", label: "Affila il prima possibile" };
  if (v <= 20) return { seg: 1, color: "#ef4444", label: "Rosso" };
  if (v <= 40) return { seg: 2, color: "#eab308", label: "Giallo" };
  if (v <= 60) return { seg: 3, color: "#22c55e", label: "Verde" };
  if (v <= 80) return { seg: 4, color: "#3b82f6", label: "Blu" };
  return { seg: 5, color: "#a855f7", label: "Viola" };
}

function parseSharpnessFromDescription(descText) {
  if (!descText) return 20;
  const cleanText = descText.replace(/<[^>]*>?/gm, '');
  const match = cleanText.match(/(?:\+|\b)(\d{1,3})\b(?:\s*(?:punti|affilatura|sharpness))?/i);
  if (match && match[1]) {
    const val = parseInt(match[1]);
    if (val > 0 && val <= 100) return val;
  }
  return 20;
}

async function renderUniversalDialog({ title, content, renderCB, width = 420, height = 600, id = null }) {
  title = WS_I18N.t(title);
  content = WS_I18N.html(content);
  const runRenderCB = (el, dialog) => {
    if (el) WS_I18N.observe(el);
    if (!el || typeof renderCB !== "function") return;
    renderCB(el, dialog);
  };

  if (foundry?.applications?.api?.DialogV2) {
    try {
      const windowOpts = { title: title, resizable: true };
      if (id) windowOpts.id = id;

      const dialog = new foundry.applications.api.DialogV2({
        window: windowOpts,
        content: content,
        buttons: [{ action: "close", label: WS_I18N.t("Chiudi"), default: false }]
      });

      await dialog.render(true);
      setTimeout(() => {
        runRenderCB(dialog.element, dialog);
      }, 50);
      return dialog;
    } catch (e) {
      console.warn("⚔️ WEAPON SYSTEM: Fallback a Dialog V1", e);
    }
  }

  const dialog = new Dialog({
    title: title,
    content: content,
    buttons: {},
    render: (html) => {
      const root = html instanceof HTMLElement ? html : (html[0] || html);
      runRenderCB(root, dialog);
    }
  }, { width: width, height: height, resizable: true, id: id });
  await dialog.render(true);
  return dialog;
}

async function promptCoatingLustro() {
  return new Promise((resolve) => {
    renderUniversalDialog({
      title: "Imposta Lustro Iniziale",
      content: `
        <div style="padding:12px; background:#0f172a; color:#f3f4f6; font-family:'Inter', sans-serif;">
          <label style="font-size:11px; font-weight:bold; color:#f59e0b; display:block; margin-bottom:6px;">Inserisci il valore di Lustro (1 - 100):</label>
          <input type="number" id="input-coating-lustro" min="1" max="100" value="100" class="fvtt-input" style="width:100%; text-align:center; padding:6px; font-size:14px; font-weight:bold;">
          <button type="button" id="btn-confirm-lustro" class="fvtt-weapon-btn" style="width:100%; margin-top:12px;">Conferma Rivestimento</button>
        </div>
      `,
      width: 280,
      height: 200,
      renderCB: (root, dialog) => {
        root.querySelector('#btn-confirm-lustro').onclick = () => {
          const val = parseInt(root.querySelector('#input-coating-lustro').value) || 100;
          if (dialog && dialog.close) dialog.close();
          resolve(Math.clamp(val, 1, 100));
        };
      }
    });
  });
}

async function initializeWeaponData(item, options = {}) {
  if (!item || item.type !== "weapon") return;
  const maxDurability = options.durability || 100;
  const currentDurability = options.currentDurability !== undefined ? options.currentDurability : maxDurability;
  const lustro = options.lustro !== undefined ? options.lustro : 100;
  const level = options.level || 1;
  const defaultShp = level === 1 ? 50 : 60;
  const sharpness = options.sharpness !== undefined ? options.sharpness : defaultShp;
  const maxShp = getMaxSharpness(level);

  await item.update({
    "flags.foundry-weapon-system.isRealistic": true,
    "flags.foundry-weapon-system.level": level,
    "flags.foundry-weapon-system.durability": { current: currentDurability, max: maxDurability },
    "flags.foundry-weapon-system.baseMaxDurability": maxDurability,
    "flags.foundry-weapon-system.lustro": lustro,
    "flags.foundry-weapon-system.sharpness": Math.min(maxShp, sharpness),
    "flags.foundry-weapon-system.cotiInventory": [null, null, null],
    "flags.foundry-weapon-system.gemSlots": [null, null, null],
    "flags.foundry-weapon-system.accessorySlots": [null, null],
    "flags.foundry-weapon-system.drilledSlots": [false, false, false],
    "flags.foundry-weapon-system.lostSlots": [false, false, false],
    "flags.foundry-weapon-system.rivestimento": null
  });
}

const breakingWeapons = new Set();

const DULL_EFFECT_FLAG = "foundry-weapon-system";
const DULL_GLOBAL_DAMAGE_KEYS = new Set([
  "system.bonuses.mwak.damage",
  "system.bonuses.rwak.damage"
]);

function getDullWeaponPenaltyFromCompendium(compDoc) {
  if (!compDoc?.effects) return "-1000";

  for (const effect of Array.from(compDoc.effects)) {
    for (const change of (effect.changes || [])) {
      if (!DULL_GLOBAL_DAMAGE_KEYS.has(String(change.key || ""))) continue;
      const value = String(change.value ?? "").trim();
      if (value) return value;
    }
  }
  return "-1000";
}

function isOurDullEffect(effect, weaponId = null) {
  const data = effect?.flags?.[DULL_EFFECT_FLAG];
  if (!data?.isDullEffect) return false;
  return !weaponId || !data.weaponId || data.weaponId === weaponId;
}

function isLocalDullEffect(effect, weaponId = null) {
  if (!isOurDullEffect(effect, weaponId)) return false;
  return effect?.flags?.[DULL_EFFECT_FLAG]?.localOnly === true;
}

async function removeLegacyDullEffects(item, { keepLocal = true } = {}) {
  if (!item) return;

  // Effetti presenti sull'Item. Le vecchie versioni avevano transfer=true e
  // system.bonuses.mwak/rwak.damage, per cui la penalità finiva sull'Actor.
  const itemEffects = Array.from(item.effects || []).filter(effect => {
    if (!isOurDullEffect(effect, item.id)) return false;
    return !(keepLocal && isLocalDullEffect(effect, item.id));
  });
  if (itemEffects.length) {
    await item.deleteEmbeddedDocuments("ActiveEffect", itemEffects.map(e => e.id), {
      foundryWeaponSystemDullInternal: true
    });
  }

  // Compatibilità con Legacy Transferral: in alcune versioni di Foundry una copia
  // dell'effetto poteva essere materializzata direttamente sull'Actor.
  const actor = item.parent;
  if (actor?.effects) {
    const actorEffects = Array.from(actor.effects).filter(effect => {
      if (!isOurDullEffect(effect, item.id)) return false;
      return !(keepLocal && isLocalDullEffect(effect, item.id));
    });
    if (actorEffects.length) {
      await actor.deleteEmbeddedDocuments("ActiveEffect", actorEffects.map(e => e.id), {
        foundryWeaponSystemDullInternal: true
      });
    }
  }
}

function combineDamageFormula(base, penalty) {
  const b = String(base ?? "").trim();
  const p = String(penalty ?? "-1000").trim() || "-1000";
  return b ? `(${b}) + (${p})` : p;
}

async function applyLegacyLocalDullPenalty(item, penalty) {
  // Fallback per installazioni D&D5e troppo vecchie per gli Enchantment.
  // Modifica solo il danno DELLA SINGOLA ARMA e salva il valore originale.
  const ns = item.flags?.[DULL_EFFECT_FLAG] || {};
  if (ns.dullFallbackMode) return true;

  const damage = foundry.utils.deepClone(item.system?.damage || null);
  if (!damage) return false;

  if (Object.prototype.hasOwnProperty.call(damage, "bonus")) {
    await item.update({
      [`flags.${DULL_EFFECT_FLAG}.dullFallbackMode`]: "bonus",
      [`flags.${DULL_EFFECT_FLAG}.dullOriginalDamageBonus`]: damage.bonus ?? "",
      "system.damage.bonus": combineDamageFormula(damage.bonus, penalty)
    }, { foundryWeaponSystemDullInternal: true });
    return true;
  }

  if (Array.isArray(damage.parts) && damage.parts.length) {
    const originalParts = foundry.utils.deepClone(damage.parts);
    const parts = foundry.utils.deepClone(damage.parts);
    const first = parts[0];

    if (Array.isArray(first)) {
      first[0] = combineDamageFormula(first[0], penalty);
    } else if (first && typeof first === "object" && Object.prototype.hasOwnProperty.call(first, "formula")) {
      first.formula = combineDamageFormula(first.formula, penalty);
    } else {
      return false;
    }

    await item.update({
      [`flags.${DULL_EFFECT_FLAG}.dullFallbackMode`]: "parts",
      [`flags.${DULL_EFFECT_FLAG}.dullOriginalDamageParts`]: originalParts,
      "system.damage.parts": parts
    }, { foundryWeaponSystemDullInternal: true });
    return true;
  }

  return false;
}

async function restoreLegacyLocalDullPenalty(item) {
  const ns = item?.flags?.[DULL_EFFECT_FLAG] || {};
  const mode = ns.dullFallbackMode;
  if (!mode) return;

  const updates = {
    [`flags.${DULL_EFFECT_FLAG}.-=dullFallbackMode`]: null,
    [`flags.${DULL_EFFECT_FLAG}.-=dullOriginalDamageBonus`]: null,
    [`flags.${DULL_EFFECT_FLAG}.-=dullOriginalDamageParts`]: null
  };

  if (mode === "bonus") {
    updates["system.damage.bonus"] = ns.dullOriginalDamageBonus ?? "";
  } else if (mode === "parts" && Array.isArray(ns.dullOriginalDamageParts)) {
    updates["system.damage.parts"] = foundry.utils.deepClone(ns.dullOriginalDamageParts);
  }

  await item.update(updates, { foundryWeaponSystemDullInternal: true });
}

async function ensureDullWeaponLocalEffect(item, { silent = false, forceRebuild = false } = {}) {
  if (!item || item.type !== "weapon" || !item.parent) return false;

  const alreadyLocal = Array.from(item.effects || []).some(effect => isLocalDullEffect(effect, item.id));
  const legacyOnItem = Array.from(item.effects || []).some(effect => {
    if (!isOurDullEffect(effect, item.id) || isLocalDullEffect(effect, item.id)) return false;
    const hasGlobalKey = (effect.changes || []).some(c => DULL_GLOBAL_DAMAGE_KEYS.has(String(c.key || "")));
    return effect.transfer === true || hasGlobalKey;
  });
  const legacyOnActor = Array.from(item.parent.effects || []).some(effect => isOurDullEffect(effect, item.id));

  if (alreadyLocal && !forceRebuild && !legacyOnItem && !legacyOnActor) return true;

  await removeLegacyDullEffects(item, { keepLocal: !forceRebuild });
  if (forceRebuild && alreadyLocal) {
    const locals = Array.from(item.effects || []).filter(effect => isLocalDullEffect(effect, item.id));
    if (locals.length) {
      await item.deleteEmbeddedDocuments("ActiveEffect", locals.map(e => e.id), {
        foundryWeaponSystemDullInternal: true
      });
    }
  }

  const pack = game.packs.get("craftingsystem.Oggetti");
  if (!pack) {
    console.error("⚔️ WEAPON SYSTEM | Compendio craftingsystem.Oggetti non trovato.");
    return false;
  }

  const index = await pack.getIndex();
  const compItemInfo = index.find(i => ["arma smussata","dull weapon"].includes(String(i.name || "").toLowerCase().trim()));
  if (!compItemInfo) {
    console.error('⚔️ WEAPON SYSTEM | Oggetto "Arma smussata" non trovato nel Compendio Oggetti.');
    return false;
  }

  const compDoc = await pack.getDocument(compItemInfo._id);
  if (!compDoc) return false;

  const penalty = getDullWeaponPenaltyFromCompendium(compDoc);
  const addMode = CONST?.ACTIVE_EFFECT_MODES?.ADD ?? 2;
  let localCreated = false;

  // D&D5e moderno: un Enchantment modifica l'Item a cui appartiene invece dell'Actor.
  // Convertiamo quindi i due bonus globali mwak/rwak nel bonus danno locale dell'arma.
  try {
    const effectData = {
      name: `${compDoc.name} — Solo questa arma`,
      img: safeImg(compDoc.img),
      type: "enchantment",
      transfer: false,
      disabled: false,
      origin: compDoc.uuid,
      changes: [{
        key: "system.damage.bonus",
        mode: addMode,
        value: penalty,
        priority: 20
      }],
      flags: {
        [DULL_EFFECT_FLAG]: {
          isDullEffect: true,
          weaponId: item.id,
          localOnly: true,
          sourceItemUuid: compDoc.uuid,
          originalKeys: Array.from(DULL_GLOBAL_DAMAGE_KEYS),
          penalty
        }
      }
    };

    await item.createEmbeddedDocuments("ActiveEffect", [effectData], {
      foundryWeaponSystemDullInternal: true
    });
    localCreated = true;
  } catch (err) {
    console.warn("⚔️ WEAPON SYSTEM | Enchantment locale non disponibile, uso fallback sul danno dell'arma.", err);
    localCreated = await applyLegacyLocalDullPenalty(item, penalty);
  }

  if (!localCreated) {
    console.error("⚔️ WEAPON SYSTEM | Impossibile applicare la penalità Arma smussata solo all'arma.");
    return false;
  }

  const currentData = item.flags?.[DULL_EFFECT_FLAG]?.dullWeaponData;
  if (!currentData) {
    await item.update({
      [`flags.${DULL_EFFECT_FLAG}.dullWeaponData`]: {
        name: compDoc.name,
        img: safeImg(compDoc.img),
        localOnly: true,
        penalty
      }
    }, { foundryWeaponSystemDullInternal: true });
  }

  if (!silent) {
    console.log(`⚔️ WEAPON SYSTEM | Arma smussata applicata SOLO a ${item.name} (${penalty} danni).`);
  }
  return true;
}

async function clearDullWeaponLocalEffect(item) {
  if (!item) return;

  const localEffects = Array.from(item.effects || []).filter(effect => isOurDullEffect(effect, item.id));
  if (localEffects.length) {
    await item.deleteEmbeddedDocuments("ActiveEffect", localEffects.map(e => e.id), {
      foundryWeaponSystemDullInternal: true
    });
  }

  const actor = item.parent;
  if (actor?.effects) {
    const actorEffects = Array.from(actor.effects).filter(effect => isOurDullEffect(effect, item.id));
    if (actorEffects.length) {
      await actor.deleteEmbeddedDocuments("ActiveEffect", actorEffects.map(e => e.id), {
        foundryWeaponSystemDullInternal: true
      });
    }
  }

  await restoreLegacyLocalDullPenalty(item);
  await item.update({
    [`flags.${DULL_EFFECT_FLAG}.-=dullWeaponData`]: null
  }, { foundryWeaponSystemDullInternal: true });
}

async function migrateLegacyDullWeaponEffects() {
  let migrated = 0;
  for (const actor of game.actors || []) {
    for (const item of actor.items || []) {
      if (item.type !== "weapon") continue;
      const flags = item.flags?.[DULL_EFFECT_FLAG];
      if (!flags?.isRealistic) continue;

      const isDull = Number(flags.sharpness ?? 60) <= 0 || !!flags.dullWeaponData;
      if (!isDull) continue;

      const legacyOnItem = Array.from(item.effects || []).some(effect => {
        if (!isOurDullEffect(effect, item.id)) return false;
        return !isLocalDullEffect(effect, item.id)
          || effect.transfer === true
          || (effect.changes || []).some(c => DULL_GLOBAL_DAMAGE_KEYS.has(String(c.key || "")));
      });
      const legacyOnActor = Array.from(actor.effects || []).some(effect => isOurDullEffect(effect, item.id));
      const local = Array.from(item.effects || []).some(effect => isLocalDullEffect(effect, item.id));

      if (legacyOnItem || legacyOnActor || !local) {
        if (await ensureDullWeaponLocalEffect(item, { silent: true, forceRebuild: true })) migrated++;
      }
    }
  }

  if (migrated > 0) {
    console.log(`⚔️ WEAPON SYSTEM | Migrati ${migrated} effetti Arma smussata a modalità SOLO ARMA.`);
  }
}

Hooks.on("updateItem", async (item, changes, options, userId) => {
  if (userId !== game.user.id) return;
  if (item.type === "weapon" && item.parent) {
    const flags = item.flags?.["foundry-weapon-system"];
    if (!flags?.isRealistic) return;

    const newSharpness = changes.flags?.["foundry-weapon-system"]?.sharpness;
    if (newSharpness !== undefined) {
      const dullDataFlag = flags.dullWeaponData;

      if (newSharpness <= 0) {
        try {
          const wasAlreadyDull = !!dullDataFlag;
          const applied = await ensureDullWeaponLocalEffect(item, { silent: wasAlreadyDull });
          if (applied && !wasAlreadyDull) {
            WS_I18N.error(`💥 L'affilatura di "${item.name}" è scesa a 0! L'arma è ora smussata.`);
            if (item.parent) {
              WS_I18N.chat({
                speaker: ChatMessage.getSpeaker({ actor: item.parent }),
                content: `💥 <b>L'affilatura dell'arma ${item.name} è scesa a 0!</b><br>L'arma è diventata <b style="color:#ef4444;">smussata</b>. La penalità al danno si applica <b>solo a questa arma</b>.`
              });
            }
          }
        } catch (err) {
          console.error("⚔️ WEAPON SYSTEM Error nell'applicazione locale dell'Arma smussata:", err);
        }
      } else if (newSharpness > 0 && dullDataFlag) {
        await clearDullWeaponLocalEffect(item);
        WS_I18N.info(`✨ L'affilatura di "${item.name}" è tornata attiva. Rimossi gli effetti di: Arma smussata.`);
      }
    }

    const dur = changes.flags?.["foundry-weapon-system"]?.durability?.current;
    if (dur !== undefined && dur <= 0) {
      await checkWeaponBreak(item);
      return; 
    }

    const lus = changes.flags?.["foundry-weapon-system"]?.lustro;
    if (lus !== undefined && lus <= 0) {
      WS_I18N.warn(`⚠️ Il Lustro dell'arma "${item.name}" è sceso a 0!`);
      if (item.parent) {
        WS_I18N.chat({
          speaker: ChatMessage.getSpeaker({ actor: item.parent }),
          content: `⚠️ <b>Il Lustro dell'arma ${item.name} è esaurito (0)!</b> L'arma è ora priva di protezione e subisce maggiore usura.`
        });
      }
    }

    const currentCoating = item.flags?.["foundry-weapon-system"]?.rivestimento;
    if (lus !== undefined && lus <= 0 && currentCoating) {
      await breakCoating(item);
    }
  }
});

function calculateDegradation(rollTotal, targetAC, isCriticalHit = false, isCriticalFumble = false, weaponLevel = 1, currentSharpness = 60, currentLustro = 100, gemBonus = 0) {
  let baseMultiplier = 1;
  if (currentSharpness <= 0) {
    baseMultiplier = 15;
  } else {
    if (weaponLevel === 1) baseMultiplier = 5;
    else if (weaponLevel === 2) baseMultiplier = 4;
    else if (weaponLevel === 3) baseMultiplier = 3;
    else if (weaponLevel === 4) baseMultiplier = 2;
    else baseMultiplier = 1;
  }

  let lustroBonus = (currentLustro <= 0) ? 2 : 0;
  let multiplier = baseMultiplier + lustroBonus + gemBonus;

  if (isCriticalHit) {
    return { durDmg: 0, lusDmg: 0, shpDmg: 0, multiplier: multiplier, label: "Critico! Nessuna Usura" };
  }

  let baseDur = 0;
  let baseLus = 0;
  let baseShp = 0;
  let labelText = "";

  if (isCriticalFumble) {
    baseDur = 1.5;
    baseLus = 2.0;
    baseShp = 2.5;
    labelText = "Fallimento Critico";
  } else {
    const diff = rollTotal - targetAC;

    if (diff >= 0) {
      const hitRatio = Math.max(0, 1 - (diff / 12)) * 1.5;
      baseDur = hitRatio * 0.4;
      baseLus = hitRatio * 0.5;
      baseShp = hitRatio * 0.6;
      labelText = diff >= 8 ? "Colpo Eccellente" : "Colpo a Segno";
    } else {
      const missDist = Math.abs(diff);
      const missFactor = 0.5 + (missDist / 6);
      
      baseDur = missFactor * 0.5;
      baseLus = missFactor * 0.6;
      baseShp = missFactor * 0.8;
      labelText = missDist >= 6 ? `Mancato Pesante (${diff} vs CA)` : `Mancato (${diff} vs CA)`;
    }
  }

  const finalDur = Math.round(baseDur * multiplier);
  const finalLus = Math.round(baseLus * multiplier);
  const finalShp = Math.round(baseShp * multiplier);

  let penaltyText = "";
  if (currentSharpness <= 0) penaltyText += ' Affilatura a 0: x15';
  else penaltyText += ` Liv.${weaponLevel} x${baseMultiplier}`;

  if (currentLustro <= 0) penaltyText += ' + 2 (Lustro)';
  if (gemBonus > 0) penaltyText += ` + ${gemBonus} (Forature)`;

  return {
    durDmg: finalDur,
    lusDmg: finalLus,
    shpDmg: finalShp,
    multiplier: multiplier,
    label: `${labelText} (${penaltyText.trim()})`
  };
}

Hooks.on("createChatMessage", async (message, options, userId) => {
  if (userId !== game.user.id) return;

  const dnd5eFlags = message.flags?.dnd5e;
  if (!dnd5eFlags) return;

  const rollType = dnd5eFlags.roll?.type;
  if (rollType !== "attack") return;

  const itemUuid = dnd5eFlags.item?.uuid || dnd5eFlags.roll?.itemUuid;
  if (!itemUuid) return;

  const item = await fromUuid(itemUuid);
  if (!item || item.type !== "weapon" || !item.parent) return;

  const weaponFlags = item.flags?.["foundry-weapon-system"];
  if (!weaponFlags?.isRealistic || !weaponFlags?.durability) return;

  const rollObj = message.rolls?.[0];
  const rollTotal = rollObj?.total;
  if (rollTotal === undefined) return;

  const d20Die = rollObj.dice?.find(d => d.faces === 20);
  const d20Value = d20Die?.results?.[0]?.result;
  const isCriticalHit = d20Value === 20;
  const isCriticalFumble = d20Value === 1;

  let targetName = "Bersaglio";
  let targetAC = 10;

  if (game.user.targets.size > 0) {
    const targetToken = Array.from(game.user.targets)[0];
    targetName = targetToken.name;
    targetAC = targetToken.actor?.system?.attributes?.ac?.value || 10;
  }

  const degradationPayload = {
    action: "promptDegradation",
    itemUuid: item.uuid,
    actorName: item.parent.name,
    targetName: targetName,
    rollTotal: rollTotal,
    targetAC: targetAC,
    isCriticalHit: isCriticalHit,
    isCriticalFumble: isCriticalFumble
  };

  if (game.user.isGM) {
    handleWeaponDegradationFlow(degradationPayload);
  } else {
    game.socket.emit("module.foundry-weapon-system", degradationPayload);
  }
});

async function handleWeaponDegradationFlow(data) {
  const item = await fromUuid(data.itemUuid);
  if (!item) return;

  const weaponFlags = item.flags?.["foundry-weapon-system"] || {};
  const weaponLevel = weaponFlags.level || 1;
  const currentSharpness = weaponFlags.sharpness ?? 60;
  const currentLustroVal = weaponFlags.lustro ?? 100;
  const drilledSlots = weaponFlags.drilledSlots || [false, false, false];
  const lostSlots = weaponFlags.lostSlots || [false, false, false];
  const gemBonus = getDrilledGemSlotsCount(weaponLevel, drilledSlots, lostSlots) * 3;

  const calc = calculateDegradation(data.rollTotal, data.targetAC, data.isCriticalHit, data.isCriticalFumble, weaponLevel, currentSharpness, currentLustroVal, gemBonus);
  const requireApproval = game.settings.get("foundry-weapon-system", "requireGMApproval");

  const currentDur = weaponFlags.durability?.current ?? 100;
  const currentLus = weaponFlags.lustro ?? 100;
  const currentShp = weaponFlags.sharpness ?? 60;

  if (!requireApproval) {
    const newDur = Math.max(0, currentDur - calc.durDmg);
    const newLus = Math.max(0, currentLus - calc.lusDmg);
    const newShp = Math.max(0, currentShp - calc.shpDmg);

    await item.update({
      "flags.foundry-weapon-system.durability.current": newDur,
      "flags.foundry-weapon-system.lustro": newLus,
      "flags.foundry-weapon-system.sharpness": newShp
    });

    const autoChatContent = `
      <div style="font-family:'Inter', sans-serif; background:#0f172a; color:#f3f4f6; padding:10px; border-radius:8px; border:1px solid #22c55e;">
        <div style="font-weight:bold; color:#22c55e; font-size:13px; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-bolt"></i> Usura Automatica: ${item.name}
        </div>
        <div style="font-size:11px; color:#94a3b8; margin-bottom:8px;">
          <b>${data.actorName}</b> vs <b>${data.targetName}</b> (Tiro: <b style="color:#10b981;">${data.rollTotal}</b> vs CA <b style="color:#ef4444;">${data.targetAC}</b> - <i>${calc.label}</i>)
        </div>

        <div style="background:#1e293b; padding:8px; border-radius:6px; font-size:11px; display:flex; flex-direction:column; gap:4px;">
          <div style="display:flex; justify-content:space-between; color:#f59e0b;">
            <span>⚡ Moltiplicatore Usura:</span>
            <span><b>x${calc.multiplier}</b></span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#38bdf8;">
            <span>🔨 Durabilità:</span>
            <span>${currentDur} ➔ <b>${newDur}</b> (-${calc.durDmg})</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#c084fc;">
            <span>✨ Lustro:</span>
            <span>${currentLus} ➔ <b>${newLus}</b> (-${calc.lusDmg})</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#22c55e;">
            <span>⚡ Affilatura:</span>
            <span>${currentShp} ➔ <b>${newShp}</b> (-${calc.shpDmg})</span>
          </div>
        </div>
      </div>
    `;

    WS_I18N.chat({ user: game.user.id, content: autoChatContent });

  } else {
    const chatContent = `
      <div style="font-family:'Inter', sans-serif; background:#0f172a; color:#f3f4f6; padding:10px; border-radius:8px; border:1px solid #f59e0b;">
        <div style="font-weight:bold; color:#f59e0b; font-size:13px; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-shield-halved"></i> Calcolo Usura Arma: ${item.name}
        </div>
        <div style="font-size:11px; color:#94a3b8; margin-bottom:8px;">
          <b>${data.actorName}</b> vs <b>${data.targetName}</b> (Tiro: <b style="color:#10b981;">${data.rollTotal}</b> vs CA <b style="color:#ef4444;">${data.targetAC}</b> - <i>${calc.label}</i>)
        </div>

        <div style="background:#1e293b; padding:8px; border-radius:6px; font-size:11px; display:flex; flex-direction:column; gap:4px; margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; color:#f59e0b;">
            <span>⚡ Moltiplicatore Usura:</span>
            <span><b>x${calc.multiplier}</b></span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#38bdf8;">
            <span>🔨 Durabilità:</span>
            <span>${currentDur} ➔ <b>${Math.max(0, currentDur - calc.durDmg)}</b> (-${calc.durDmg})</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#c084fc;">
            <span>✨ Lustro:</span>
            <span>${currentLus} ➔ <b>${Math.max(0, currentLus - calc.lustro)}</b> (-${calc.lusDmg})</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#22c55e;">
            <span>⚡ Affilatura:</span>
            <span>${currentShp} ➔ <b>${Math.max(0, currentShp - calc.shpDmg)}</b> (-${calc.shpDmg})</span>
          </div>
        </div>

        <button type="button" class="btn-gm-apply-degradation fvtt-weapon-btn" 
          data-uuid="${item.uuid}" data-dur="${calc.durDmg}" data-lus="${calc.lusDmg}" data-shp="${calc.shpDmg}"
          style="width:100%; font-size:11px;">
          🛠️ Conferma / Modifica Usura (Solo GM)
        </button>
      </div>
    `;

    WS_I18N.chat({
      user: game.user.id,
      content: chatContent
    });
  }
}

Hooks.on("renderChatMessageHTML", (message, html) => {
  const root = html instanceof HTMLElement ? html : (html[0] || html);
  if (!root) return;
  const btn = root.querySelector('.btn-gm-apply-degradation');
  if (btn) {
    btn.onclick = async (e) => {
      e.preventDefault();
      
      if (!game.user.isGM) {
        WS_I18N.warn("⚠️ Solo il Master può confermare o modificare l'usura dell'arma!");
        return;
      }

      const uuid = btn.getAttribute('data-uuid');
      const proposedDur = parseInt(btn.getAttribute('data-dur')) || 0;
      const proposedLus = parseInt(btn.getAttribute('data-lus')) || 0;
      const proposedShp = parseInt(btn.getAttribute('data-shp')) || 0;

      const item = await fromUuid(uuid);
      if (!item) {
        WS_I18N.error("Impossibile trovare l'arma.");
        return;
      }

      promptGMDegradation(uuid, item.parent?.name || "Personaggio", null, 0, 0, proposedDur, proposedLus, proposedShp);
    };
  }
});

function refreshWeaponMenuDom(root, item) {
  const flags = item.flags?.["foundry-weapon-system"] || {};
  const durability = flags.durability || { current: 100, max: 100 };
  const durPercent = Math.min(100, Math.max(0, (durability.current / durability.max) * 100));
  const durColor = durPercent > 50 ? "#10b981" : (durPercent > 20 ? "#f59e0b" : "#ef4444");

  const durText = root.querySelector('#durability-text');
  const durFill = root.querySelector('#durability-fill');
  if (durText) durText.innerText = `${durability.current} / ${durability.max}`;
  if (durFill) { durFill.style.width = `${durPercent}%`; durFill.style.background = durColor; }

  const lustro = flags.lustro !== undefined ? flags.lustro : 100;
  const lustroPercent = Math.min(100, Math.max(0, lustro));
  const lusText = root.querySelector('#lustro-text');
  const lusFill = root.querySelector('#lustro-fill');
  if (lusText) lusText.innerText = `${lustro} / 100`;
  if (lusFill) lusFill.style.width = `${lustroPercent}%`;

  const sharpness = flags.sharpness !== undefined ? flags.sharpness : 60;
  const sharpInfo = getSharpnessDetails(sharpness);
  const shpText = root.querySelector('#sharpness-text');
  const shpLabelText = root.querySelector('#sharpness-label-text');
  if (shpText) {
    shpText.innerText = `${sharpness} / 100`;
    shpText.style.color = sharpInfo.color;
  }
  if (shpLabelText) shpLabelText.innerText = sharpInfo.label;

  const segs = root.querySelectorAll('.fvtt-sharp-seg');
  segs.forEach((seg, idx) => {
    if (idx < sharpInfo.seg) seg.classList.add('active');
    else seg.classList.remove('active');
  });

  const level = flags.level || 1;
  const lvDisplay = root.querySelector('#fvtt-display-weapon-level');
  if (lvDisplay) lvDisplay.innerText = `Proprietà Realistiche (Livello ${level})`;
}

async function checkWeaponBreak(item) {
  if (!item || item.type !== "weapon" || !item.parent) return; 
  if (breakingWeapons.has(item.id)) return;
  breakingWeapons.add(item.id);

  const actor = item.actor;
  const itemName = item.name;

  WS_I18N.error(`💥 L'arma "${itemName}" si è spezzata ed è andata distrutta!`);
  
  WS_I18N.chat({
    speaker: ChatMessage.getSpeaker({ actor }),
    content: `💥 <b>L'arma ${itemName}</b> di <b>${actor?.name || "Personaggio"}</b> ha esaurito completamente la sua durabilità: <b>si è spezzata in mille pezzi!</b>`
  });

  if (actor) {
    try {
      const compendiumUuid = "Compendium.craftingsystem.Oggetti.Item.3Gp8ny8fkwnYVCRg";
      const brokenDoc = await fromUuid(compendiumUuid);
      
      if (brokenDoc) {
        const itemData = brokenDoc.toObject();
        await actor.createEmbeddedDocuments("Item", [itemData]);
        WS_I18N.info(`Recuperato rottame: ${itemData.name}`);
      }
    } catch (err) {
      console.error("⚔️ WEAPON SYSTEM Error nella generazione del rottame:", err);
    }
  }

  try {
    await item.delete();
  } catch (err) {
    console.warn("⚔️ WEAPON SYSTEM: L'arma è già stata rimossa.", err);
  } finally {
    setTimeout(() => breakingWeapons.delete(item.id), 1000);
  }
}

async function breakCoating(item) {
  if (!item || item.type !== "weapon" || !item.parent) return;

  const flags = item.flags?.["foundry-weapon-system"];
  if (!flags || !flags.rivestimento) return;

  const actor = item.parent;
  const coatingName = flags.rivestimento.name;

  WS_I18N.error(`💥 Il Lustro di ${item.name} è sceso a 0! Il rivestimento in ${coatingName} è andato distrutto.`);
  
  if (actor) {
    WS_I18N.chat({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `💥 <b>Il Lustro dell'arma ${item.name} è sceso a 0!</b><br>Il rivestimento <b style="color:#ef4444;">${coatingName}</b> si è distrutto definitivamente!`
    });
  }

  await removeCoatingFromWeapon(item, false);
}

async function openWeaponMenu(item) {
  if (!item) return;
  const actor = item.parent;
  if (!actor) {
    WS_I18N.warn("L'arma deve trovarsi nell'inventario di un personaggio per essere modificata.");
    return;
  }

  injectWeaponSystemCSS();

  let flags = item.flags?.["foundry-weapon-system"];
  if (!flags || !flags.isRealistic) {
    WS_I18N.warn("Quest'arma non è impostata come Realistica.");
    return;
  }

  const windowId = `weapon-menu-${item.id}`;
  
  game.weaponSystem.activeMenus = game.weaponSystem.activeMenus || {};
  if (game.weaponSystem.activeMenus[item.id]) {
    try {
      await game.weaponSystem.activeMenus[item.id].close();
    } catch (e) {}
    game.weaponSystem.activeMenus[item.id] = null;
  }

  const level = flags.level || 1;
  const durability = flags.durability || { current: 100, max: 100 };
  const durPercent = Math.min(100, Math.max(0, (durability.current / durability.max) * 100));
  const durColor = durPercent > 50 ? "#10b981" : (durPercent > 20 ? "#f59e0b" : "#ef4444");

  const lustro = flags.lustro !== undefined ? flags.lustro : 100;
  const lustroPercent = Math.min(100, Math.max(0, lustro));
  
  const sharpness = flags.sharpness !== undefined ? flags.sharpness : (level === 1 ? 50 : 60);
  const sharpInfo = getSharpnessDetails(sharpness);

  const baseMult = (sharpness <= 0) ? 15 : (level === 1 ? 5 : level === 2 ? 4 : level === 3 ? 3 : level === 4 ? 2 : 1);
  const lusBonus = (lustro <= 0) ? 2 : 0;
  
  let drilledSlots = flags.drilledSlots || [false, false, false];
  while (drilledSlots.length < 3) drilledSlots.push(false);
  const gemBonus = getDrilledGemSlotsCount(level, drilledSlots, flags.lostSlots || [false, false, false]) * 3;

  const totalMult = baseMult + lusBonus + gemBonus;

  const rivestimento = flags.rivestimento || null;

  let cotiInventory = flags.cotiInventory || [null, null, null];
  while (cotiInventory.length < 3) cotiInventory.push(null);

  let gemSlots = flags.gemSlots || [null, null, null];
  while (gemSlots.length < 3) gemSlots.push(null);

  let accessorySlots = flags.accessorySlots || [null, null];
  while (accessorySlots.length < 2) accessorySlots.push(null);

  let lostSlots = flags.lostSlots || [false, false, false];
  while (lostSlots.length < 3) lostSlots.push(false);

  let dullWeaponData = flags.dullWeaponData || null;

  let validCoatings = new Set();
  let validCoti = new Set();
  let validGemme = new Set();
  let validAccessori = new Set();
  let accessoryCompIndexByName = new Map();
  let accessoryCompIndexById = new Map();
  let accessoryFolderId = null;
  
  const pack = game.packs.get("craftingsystem.Oggetti");
  if (pack) {
    const index = await pack.getIndex();
    
    const coatingFolder = pack.folders.find(f => ["rivestimento","coating","coatings"].includes(String(f.name || "").toLowerCase().trim()));
    if (coatingFolder) {
      index.forEach(i => { if (i.folder === coatingFolder.id) validCoatings.add(i.name.toLowerCase().trim()); });
    }

    const cotiFolder = pack.folders.find(f => ["coti","cote","whetstones","whetstone"].includes(String(f.name || "").toLowerCase().trim()));
    if (cotiFolder) {
      index.forEach(i => { if (i.folder === cotiFolder.id) validCoti.add(i.name.toLowerCase().trim()); });
    }

    const gemmeFolder = pack.folders.find(f => ["gemme","gems"].includes(String(f.name || "").toLowerCase().trim()));
    if (gemmeFolder) {
      index.forEach(i => { if (i.folder === gemmeFolder.id) validGemme.add(i.name.toLowerCase().trim()); });
    }

    // Gli accessori validi provengono ESCLUSIVAMENTE dalla cartella "Accessori Arma".
    const accessoriFolder = pack.folders.find(f => ["accessori arma","weapon accessories"].includes(String(f.name || "").toLowerCase().trim()));
    if (accessoriFolder) {
      accessoryFolderId = accessoriFolder.id;
      index.forEach(i => {
        if (i.folder !== accessoriFolder.id) return;
        const key = String(i.name || "").toLowerCase().trim();
        validAccessori.add(key);
        accessoryCompIndexByName.set(key, i);
        accessoryCompIndexById.set(i._id, i);
      });
    }
  }

  function getAccessoryCompInfoForInventoryItem(invItem) {
    if (!invItem) return null;
    const sourceId = String(invItem.flags?.core?.sourceId || "");
    const match = sourceId.match(/^Compendium\.craftingsystem\.Oggetti\.Item\.([^\.]+)$/i);
    if (match && accessoryCompIndexById.has(match[1])) return accessoryCompIndexById.get(match[1]);
    return accessoryCompIndexByName.get(String(invItem.name || "").toLowerCase().trim()) || null;
  }

  // Dettagli delle gemme incastonate: recupera descrizione ed effetti dal Compendio
  // anche per le gemme inserite con versioni precedenti, che salvavano solo nome/img/uuid.
  let gemInfoHtml = "";
  const gemDetailCards = [];
  for (let slotIdx = 0; slotIdx < gemSlots.length; slotIdx++) {
    const gemObj = gemSlots[slotIdx];
    if (!gemObj) continue;

    let gemDoc = null;
    if (gemObj.uuid) {
      try { gemDoc = await fromUuid(gemObj.uuid); } catch (_) {}
    }

    // L'UUID della gemma può puntare al vecchio Item dell'Actor, poi consumato.
    // In quel caso recuperiamo la sorgente originale dalla cartella Gemme del compendio.
    if (!gemDoc && pack) {
      try {
        const index = await pack.getIndex();
        const gemmeFolder = pack.folders.find(f => ["gemme","gems"].includes(String(f.name || "").toLowerCase().trim()));
        const info = index.find(i =>
          (!gemmeFolder || i.folder === gemmeFolder.id) &&
          String(i.name || "").toLowerCase().trim() === String(gemObj.name || "").toLowerCase().trim()
        );
        if (info) gemDoc = await pack.getDocument(info._id);
      } catch (err) {
        console.warn(`⚔️ WEAPON SYSTEM | Impossibile recuperare i dettagli della gemma ${gemObj.name || ''}`, err);
      }
    }

    const gemDescription = String(gemObj.description || getEmbeddedDescription(gemDoc) || "").trim();
    const gemEffects = Array.isArray(gemObj.effects) && gemObj.effects.length
      ? gemObj.effects
      : snapshotGemEffects(gemDoc);

    const effectRows = [];
    for (const effect of gemEffects) {
      const changes = Array.isArray(effect?.changes) ? effect.changes : [];
      if (!changes.length) continue;
      const formatted = changes.map(change => {
        const key = String(change?.key || "Effetto");
        const value = String(change?.value ?? "");
        return `<div style="font-size:9px; color:#cbd5e1; line-height:1.35;"><span style="color:#67e8f9; font-weight:700;">${key}</span>${value !== '' ? `: <span style="color:#f8fafc;">${value}</span>` : ''}</div>`;
      }).join('');
      effectRows.push(`
        <div style="margin-top:5px; padding:5px 6px; background:rgba(14,116,144,.10); border:1px solid rgba(34,211,238,.22); border-radius:5px;">
          <div style="font-size:9px; color:#22d3ee; font-weight:800; margin-bottom:2px;"><i class="fa-solid fa-sparkles"></i> ${effect?.name || 'Effetto passivo'}</div>
          ${formatted}
        </div>
      `);
    }

    gemDetailCards.push(`
      <div style="margin-top:8px; background:#020617; border:1px solid #164e63; border-left:3px solid #38bdf8; border-radius:6px; padding:8px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
          <img src="${gemObj.img || gemDoc?.img || 'icons/svg/item-bag.svg'}" style="width:28px; height:28px; border-radius:5px; object-fit:cover; border:1px solid #38bdf8;">
          <div style="min-width:0; flex:1;">
            <div style="font-size:10px; color:#38bdf8; font-weight:800; text-transform:uppercase;"><i class="fa-solid fa-gem"></i> Dettagli Gemma — Slot ${slotIdx + 1}</div>
            <div style="font-size:11px; color:#f3f4f6; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${gemObj.name || gemDoc?.name || 'Gemma'}</div>
          </div>
        </div>
        ${gemDescription
          ? `<div style="font-size:11px; color:#cbd5e1; line-height:1.35;">${gemDescription}</div>`
          : `<div style="font-size:10px; color:#64748b;">Nessuna descrizione presente nella gemma.</div>`}
        ${effectRows.length ? `<div style="margin-top:5px;"><div style="font-size:9px; color:#67e8f9; font-weight:800; text-transform:uppercase;">Effetti della gemma</div>${effectRows.join('')}</div>` : ''}
      </div>
    `);
  }
  if (gemDetailCards.length) gemInfoHtml = gemDetailCards.join("");

  // Dettagli accessori installati. Come per le gemme, i dati vengono salvati nello slot
  // e, per vecchie installazioni, recuperati dal Compendio Oggetti.
  let accessoryInfoHtml = "";
  const accessoryDetailCards = [];
  for (let slotIdx = 0; slotIdx < accessorySlots.length; slotIdx++) {
    const accessoryObj = accessorySlots[slotIdx];
    if (!accessoryObj) continue;

    let accessoryDoc = null;
    if (accessoryObj.sourceUuid) {
      try { accessoryDoc = await fromUuid(accessoryObj.sourceUuid); } catch (_) {}
    }
    if (!accessoryDoc && pack) {
      const info = accessoryCompIndexByName.get(String(accessoryObj.name || "").toLowerCase().trim());
      if (info) {
        try { accessoryDoc = await pack.getDocument(info._id); } catch (_) {}
      }
    }

    const accessoryDescription = String(accessoryObj.description || getEmbeddedDescription(accessoryDoc) || "").trim();
    const accessoryEffects = Array.isArray(accessoryObj.effects) && accessoryObj.effects.length
      ? accessoryObj.effects
      : snapshotGemEffects(accessoryDoc);

    const effectRows = [];
    for (const effect of accessoryEffects) {
      const changes = Array.isArray(effect?.changes) ? effect.changes : [];
      const formatted = changes.map(change => {
        const key = String(change?.key || "Effetto");
        const value = String(change?.value ?? "");
        return `<div style="font-size:9px; color:#cbd5e1; line-height:1.35;"><span style="color:#facc15; font-weight:700;">${key}</span>${value !== '' ? `: <span style="color:#f8fafc;">${value}</span>` : ''}</div>`;
      }).join('');
      if (!formatted) continue;
      effectRows.push(`
        <div style="margin-top:5px; padding:5px 6px; background:rgba(202,138,4,.10); border:1px solid rgba(250,204,21,.22); border-radius:5px;">
          <div style="font-size:9px; color:#facc15; font-weight:800; margin-bottom:2px;"><i class="fa-solid fa-sparkles"></i> ${effect?.name || 'Effetto passivo'}</div>
          ${formatted}
        </div>
      `);
    }

    accessoryDetailCards.push(`
      <div style="margin-top:8px; background:#020617; border:1px solid #713f12; border-left:3px solid #facc15; border-radius:6px; padding:8px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
          <img src="${accessoryObj.img || accessoryDoc?.img || 'icons/svg/item-bag.svg'}" style="width:28px; height:28px; border-radius:5px; object-fit:cover; border:1px solid #facc15;">
          <div style="min-width:0; flex:1;">
            <div style="font-size:10px; color:#facc15; font-weight:800; text-transform:uppercase;"><i class="fa-solid fa-puzzle-piece"></i> Dettagli Accessorio — Slot ${slotIdx + 1}</div>
            <div style="font-size:11px; color:#f3f4f6; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${accessoryObj.name || accessoryDoc?.name || 'Accessorio'}</div>
          </div>
        </div>
        ${accessoryDescription
          ? `<div style="font-size:11px; color:#cbd5e1; line-height:1.35;">${accessoryDescription}</div>`
          : `<div style="font-size:10px; color:#64748b;">Nessuna descrizione presente nell'accessorio.</div>`}
        ${effectRows.length ? `<div style="margin-top:5px;"><div style="font-size:9px; color:#facc15; font-weight:800; text-transform:uppercase;">Effetti dell'accessorio</div>${effectRows.join('')}</div>` : ''}
      </div>
    `);
  }
  if (accessoryDetailCards.length) accessoryInfoHtml = accessoryDetailCards.join("");

  let coatingInfoHtml = "";
  if (rivestimento) {
    let badges = [];

    if (rivestimento.isMagic) {
      badges.push(`
        <div style="font-size: 10px; color: #c084fc; font-weight: bold; background: rgba(192, 132, 252, 0.15); padding: 3px 6px; border-radius: 4px; border: 1px solid #c084fc; display: inline-flex; align-items: center; gap: 4px;">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Proprietà Magica
        </div>
      `);
    }

    if (rivestimento.isFocus) {
      badges.push(`
        <div style="font-size: 10px; color: #a855f7; font-weight: bold; background: rgba(168, 85, 247, 0.15); padding: 3px 6px; border-radius: 4px; border: 1px solid #a855f7; display: inline-flex; align-items: center; gap: 4px;">
          <i class="fa-solid fa-hat-wizard"></i> Focus Magico
        </div>
      `);
    }

    const descText = rivestimento.description ? rivestimento.description.trim() : "";

    coatingInfoHtml = `
      <div style="margin-top: 8px; background: #020617; border: 1px solid #334155; border-left: 3px solid #f59e0b; border-radius: 6px; padding: 8px;">
        <div style="font-size: 10px; color: #f59e0b; font-weight: bold; text-transform: uppercase; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
          <i class="fa-solid fa-scroll"></i> Dettagli da: ${rivestimento.name}
        </div>
        ${badges.length > 0 ? `<div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px;">${badges.join('')}</div>` : ''}
        ${descText ? `<div style="font-size: 11px; color: #cbd5e1; line-height: 1.35; font-style: italic;">${descText}</div>` : '<div style="font-size: 10px; color: #64748b;">Nessuna descrizione speciale presente nel rivestimento.</div>'}
      </div>
    `;
  }

  let dullWeaponHtml = "";
  if (sharpness <= 0) {
    dullWeaponHtml = `
      <div class="fvtt-weapon-panel" style="border-color: #ef4444; background: rgba(239, 68, 68, 0.08) !important;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
          <span style="font-weight:bold; font-size:12px; color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> Stato Critico: Arma Smussata</span>
          <span style="font-size:9px; color:#f87171; background:#020617; padding:2px 6px; border-radius:4px; border:1px solid #ef4444;">Attivo</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px; background:#020617; padding:8px; border-radius:6px; border:1px solid #334155;">
          <img src="${dullWeaponData?.img || 'icons/svg/item-bag.svg'}" style="width:36px; height:36px; border-radius:6px; object-fit:cover; border:1px solid #ef4444;">
          <div style="flex-grow:1;">
            <div style="font-weight:bold; font-size:12px; color:#f3f4f6;">${dullWeaponData ? dullWeaponData.name : 'Arma smussata'}</div>
            <div style="font-size:10px; color:#94a3b8;">L'arma ha esaurito l'affilatura ed applica penalità attive.</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderGemSlot(slotNum, requiredLevel) {
    const slotIdx = slotNum - 1;
    const isUnlockedByLevel = level >= requiredLevel;
    const isLost = lostSlots[slotIdx];
    const isDrilled = drilledSlots[slotIdx];
    const gemObj = gemSlots[slotIdx];

    if (!isUnlockedByLevel) {
      return `
        <div class="fvtt-gem-slot locked" title="Richiede Arma Livello ${requiredLevel}">
          <i class="fa-solid fa-lock" style="font-size:18px; color: #475569;"></i>
          <span style="display:block; font-size:9px; font-weight:bold; color:#cbd5e1; margin-top:4px;">Slot ${slotNum}</span>
          <span style="display:block; font-size:8px; color:#ef4444; margin-top:1px;">Lv. ${requiredLevel}</span>
        </div>
      `;
    }

    if (isLost) {
      return `
        <div class="fvtt-gem-slot locked" style="border-color: #ef4444; background: rgba(239,68,68,0.1);" title="Slot Perduto permanentemente per fallimento!">
          <i class="fa-solid fa-ban" style="font-size:18px; color: #ef4444;"></i>
          <span style="display:block; font-size:9px; font-weight:bold; color:#ef4444; margin-top:4px;">Slot ${slotNum}</span>
          <span style="display:block; font-size:8px; color:#ef4444; margin-top:1px;">Distrutto</span>
        </div>
      `;
    }

    if (!isDrilled) {
      return `
        <div class="fvtt-gem-slot unlocked" data-drill-slot="${slotIdx}" title="Slot ${slotNum} Disponibile (Click per effettuare la Foratura)">
          <i class="fa-solid fa-screwdriver-wrench" style="font-size:18px; color: #f59e0b;"></i>
          <span style="display:block; font-size:9px; font-weight:bold; color:#cbd5e1; margin-top:4px;">Slot ${slotNum}</span>
          <span style="display:block; font-size:8px; color:#f59e0b; margin-top:1px;">Da Forare</span>
        </div>
      `;
    }

    if (gemObj) {
      return `
        <div class="fvtt-gem-slot filled" data-gem-slot="${slotIdx}" title="${gemObj.name}&#10;Click SX: Rimuovi gemma">
          <img src="${gemObj.img}" style="width:26px; height:26px; border-radius:4px; object-fit:cover;">
          <span style="display:block; font-size:9px; font-weight:bold; color:#10b981; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">${gemObj.name}</span>
          <span style="display:block; font-size:8px; color:#f59e0b;">Incastonata</span>
        </div>
      `;
    }

    return `
      <div class="fvtt-gem-slot unlocked" data-gem-slot="${slotIdx}" title="Slot ${slotNum} Forato (Click per incastonare gemma)">
        <i class="fa-solid fa-plus" style="font-size:18px; color: #38bdf8;"></i>
        <span style="display:block; font-size:9px; font-weight:bold; color:#cbd5e1; margin-top:4px;">Slot ${slotNum}</span>
        <span style="display:block; font-size:8px; color:#38bdf8; margin-top:1px;">Forato (Vuoto)</span>
      </div>
    `;
  }

  function renderAccessorySlot(slotNum, requiredLevel) {
    const slotIdx = slotNum - 1;
    const accessoryObj = accessorySlots[slotIdx];
    const unlocked = level >= requiredLevel;

    if (!unlocked) {
      return `
        <div style="flex:1; min-width:0;">
          <button type="button" class="fvtt-weapon-btn" disabled style="width:100%; min-height:64px; background:#020617 !important; border-color:#475569 !important; color:#64748b !important; flex-direction:column; gap:3px;">
            <i class="fa-solid fa-lock" style="font-size:17px;"></i>
            <span>Accessorio ${slotNum}</span>
            <span style="font-size:8px;">Si sblocca al Livello ${requiredLevel}</span>
          </button>
        </div>`;
    }

    if (accessoryObj) {
      return `
        <div style="flex:1; min-width:0;">
          <button type="button" class="fvtt-weapon-btn fvtt-accessory-slot filled" data-accessory-slot="${slotIdx}" data-filled="true" style="width:100%; min-height:64px; background:rgba(202,138,4,.10) !important; border-color:#facc15 !important; color:#fef3c7 !important;">
            <img src="${accessoryObj.img || 'icons/svg/item-bag.svg'}" style="width:28px; height:28px; border-radius:5px; object-fit:cover; border:1px solid #facc15;">
            <span style="min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${accessoryObj.name || `Accessorio ${slotNum}`}</span>
          </button>
          <button type="button" class="fvtt-weapon-btn btn-remove-accessory" data-accessory-slot="${slotIdx}" style="width:100%; margin-top:4px; padding:3px 6px; font-size:9px; background:linear-gradient(180deg,#9f1239,#881337) !important; border-color:#f43f5e !important;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Rimuovi gratis
          </button>
        </div>`;
    }

    return `
      <div style="flex:1; min-width:0;">
        <button type="button" class="fvtt-weapon-btn fvtt-accessory-slot" data-accessory-slot="${slotIdx}" data-filled="false" style="width:100%; min-height:64px; background:#020617 !important; border-color:#facc15 !important; color:#facc15 !important; flex-direction:column; gap:3px;">
          <i class="fa-solid fa-plus" style="font-size:17px;"></i>
          <span>Accessorio ${slotNum}</span>
          <span style="font-size:8px; color:#fde68a;">Installa • Livello ${requiredLevel}+</span>
        </button>
      </div>`;
  }

  const menuHtml = `
    <div class="fvtt-weapon-window">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; border-bottom:1px solid #334155; padding-bottom:10px;">
        <img src="${item.img}" style="width:54px; height:54px; border-radius:8px; object-fit:cover; border:1px solid #f59e0b;">
        <div style="flex-grow:1;">
          <h3 style="margin:0; font-size:16px; color:#f59e0b; font-weight:bold;">${item.name}</h3>
          <span id="fvtt-display-weapon-level" style="font-size:11px; color:#38bdf8; font-weight:bold; display:block;">Proprietà Realistiche (Livello ${level})</span>
        </div>
        <button type="button" id="btn-refresh-weapon" class="fvtt-weapon-btn" style="padding:6px 10px; font-size:11px;" title="Aggiorna Scheda">
          <i class="fa-solid fa-rotate"></i>
        </button>
      </div>

      <div id="fvtt-weapon-body">
        
        ${coatingInfoHtml}
        ${gemInfoHtml}
        ${accessoryInfoHtml}
        ${dullWeaponHtml}

        <!-- PANNELLO MOLTIPLICATORE USURA -->
        <div class="fvtt-weapon-panel" style="border-color: #f59e0b; background: rgba(245, 158, 11, 0.05) !important;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:bold; font-size:12px; color:#f59e0b;"><i class="fa-solid fa-calculator"></i> Moltiplicatore Usura</span>
            <span style="font-weight:bold; font-size:14px; color:#f59e0b;">x${totalMult}</span>
          </div>
          <div style="font-size:10px; color:#94a3b8; margin-top:3px;">
            Base (Livello ${level}${sharpness <= 0 ? ' - Smussata x15' : ''}): x${baseMult} ${lusBonus > 0 ? ' + 2 (Lustro)' : ''} ${gemBonus > 0 ? ' + ' + gemBonus + ' (Forature)' : ''}
          </div>
        </div>

        <div class="fvtt-weapon-panel" style="margin-top:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-weight:bold; font-size:12px; color:#38bdf8;"><i class="fa-solid fa-hammer"></i> Durabilità</span>
            <span id="durability-text" style="font-weight:bold; font-size:12px; color:${durColor};">${durability.current} / ${durability.max}</span>
          </div>
          <div class="fvtt-weapon-bar-bg">
            <div id="durability-fill" style="width:${durPercent}%; height:100%; background:${durColor}; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <div class="fvtt-weapon-panel" style="border-color: #c084fc;">
          <div style="display:grid; grid-template-columns: 1.8fr 1fr; gap:12px; align-items:center;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span style="font-weight:bold; font-size:12px; color:#c084fc;"><i class="fa-solid fa-wand-magic-sparkles"></i> Lustro</span>
                <span id="lustro-text" style="font-weight:bold; font-size:12px; color:#c084fc;">${lustro} / 100</span>
              </div>
              <div class="fvtt-weapon-bar-bg">
                <div id="lustro-fill" style="width:${lustroPercent}%; height:100%; background:linear-gradient(90deg, #a855f7 0%, #ec4899 100%); transition:width 0.3s ease;"></div>
              </div>
              <span style="font-size:9px; color:#94a3b8; display:block; margin-top:4px;">Il Lustro indica lo stato del Rivestimento applicato.</span>
            </div>

            <div>
              <label style="font-weight:bold; font-size:10px; color:#10b981; display:block; margin-bottom:4px; text-transform:uppercase;"><i class="fa-solid fa-layer-group"></i> Rivestimento</label>
              <div id="slot-rivestimento" class="fvtt-gem-slot ${rivestimento ? 'filled' : 'unlocked'}" style="height:36px; display:flex; align-items:center; justify-content:center; gap:6px; border-color:#10b981; padding:4px; min-height:unset;">
                ${rivestimento ?
                  `<img src="${rivestimento.img}" style="width:24px; height:24px; border-radius:4px; object-fit:cover;"><span style="font-size:10px; font-weight:bold; color:#f3f4f6; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${rivestimento.name}</span>` :
                  `<i class="fa-solid fa-plus" style="color:#10b981; font-size:12px;"></i><span style="font-size:10px; color:#10b981;">Vuoto</span>`
                }
              </div>
              ${rivestimento && game.user.isGM ? `<button type="button" id="btn-remove-rivestimento" class="fvtt-weapon-btn" style="width:100%; margin-top:4px; padding:2px; font-size:9px; background: linear-gradient(180deg, #9f1239 0%, #881337 100%) !important; border-color:#f43f5e !important;"><i class="fa-solid fa-times"></i> Rimuovi (GM)</button>` : ''}
            </div>
          </div>
        </div>

        <div class="fvtt-weapon-panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span style="font-weight:bold; font-size:12px; color:${sharpInfo.color};"><i class="fa-solid fa-bolt"></i> Affilatura (<span id="sharpness-label-text">${sharpInfo.label}</span>)</span>
            <span id="sharpness-text" style="font-weight:bold; font-size:12px; color:${sharpInfo.color};">${sharpness} / 100 (Max: ${getMaxSharpness(level)})</span>
          </div>
          <!-- ETICHETTE SOPRA LA BARRA -->
          <div style="display:flex; justify-content:space-between; font-size:9px; font-weight:bold; margin-top:4px; margin-bottom:2px; text-align:center;">
            <span style="flex:1;"></span>
            <span style="flex:1;"></span>
            <span style="color:#22c55e; flex:1;">Liv 1</span>
            <span style="color:#3b82f6; flex:1;">Liv 4</span>
            <span style="color:#a855f7; flex:1;">Liv 6</span>
          </div>
          <div class="fvtt-sharpness-bar" id="sharpness-segments-container">
            <div class="fvtt-sharp-seg seg-red ${sharpInfo.seg >= 1 ? 'active' : ''}" title="Segmento Rosso (0-20)"></div>
            <div class="fvtt-sharp-seg seg-yellow ${sharpInfo.seg >= 2 ? 'active' : ''}" title="Segmento Giallo (21-40)"></div>
            <div class="fvtt-sharp-seg seg-green ${sharpInfo.seg >= 3 ? 'active' : ''}" title="Segmento Verde (41-60)"></div>
            <div class="fvtt-sharp-seg seg-blue ${sharpInfo.seg >= 4 ? 'active' : ''}" title="Segmento Blu (61-80)"></div>
            <div class="fvtt-sharp-seg seg-purple ${sharpInfo.seg >= 5 ? 'active' : ''}" title="Segmento Viola (81-100)"></div>
          </div>
        </div>

        <div class="fvtt-weapon-panel" style="border-color:#22c55e;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="font-weight:bold; font-size:11px; color:#22c55e; margin:0;"><i class="fa-solid fa-gem"></i> Inventario Coti (Max 3 Slot - Max 10/Slot)</label>
            <span style="font-size:9px; color:#94a3b8;">Click SX: Usa | Click DX: Gestisci</span>
          </div>
          <div style="display:flex; justify-content:space-between; gap:6px;">
            ${cotiInventory.map((coteSlot, sIdx) => {
              if (coteSlot) {
                return `
                  <div class="fvtt-cote-slot filled" data-slot="${sIdx}" title="${coteSlot.name} (x${coteSlot.qty}/10)&#10;Click SX: Usa 1 Cote per affilare&#10;Click DX: Rimuovi / Gestisci Quantità">
                    <img src="${coteSlot.img}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;">
                    <span style="font-size:9px; font-weight:bold; color:#22c55e; margin-top:2px;">x${coteSlot.qty}</span>
                  </div>
                `;
              } else {
                return `
                  <div class="fvtt-cote-slot" data-slot="${sIdx}" title="Slot Cote Vuoto&#10;Clicca o Trascina una Cote dal personaggio">
                    <i class="fa-solid fa-plus" style="color:#22c55e; font-size:16px;"></i>
                    <span style="font-size:8px; color:#22c55e; margin-top:2px;">Vuoto</span>
                  </div>
                `;
              }
            }).join('')}
          </div>
        </div>

        <div class="fvtt-weapon-panel" style="border-color:#facc15;">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:7px;">
            <label style="font-weight:bold; font-size:11px; color:#facc15; margin:0;"><i class="fa-solid fa-puzzle-piece"></i> Accessori Arma</label>
            <span style="font-size:8px; color:#94a3b8;">Solo Compendio Oggetti → Accessori Arma</span>
          </div>
          <div style="display:flex; gap:8px; align-items:flex-start;">
            ${renderAccessorySlot(1, 3)}
            ${renderAccessorySlot(2, 5)}
          </div>
          <div style="font-size:8px; color:#94a3b8; margin-top:6px; line-height:1.35;">
            Installare e rimuovere un accessorio è gratuito. Durante l'installazione l'oggetto viene tolto dall'inventario e i suoi effetti vengono applicati all'arma.
          </div>
        </div>

        <div class="fvtt-weapon-panel" style="border-color:#38bdf8;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="font-weight:bold; font-size:12px; color:#38bdf8; margin:0;"><i class="fa-solid fa-gem"></i> Slot Gemme (Forature)</label>
            <span style="font-size:9px; color:#94a3b8;">Click SX: Fora/Incastona | Click DX: Rimuovi</span>
          </div>
          <div style="display:flex; justify-content:space-between; gap:8px;">
            ${renderGemSlot(1, 2)}
            ${renderGemSlot(2, 4)}
            ${renderGemSlot(3, 6)}
          </div>
        </div>

        ${game.user.isGM ? `
        <div class="fvtt-weapon-panel" style="border-color: #ef4444;">
          <label style="font-weight:bold; font-size:12px; color:#ef4444; display:block; margin-bottom:6px;"><i class="fa-solid fa-gavel"></i> Gestione Master (Visibile solo al DM)</label>
          
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; background:#020617; padding:6px 10px; border-radius:6px; border:1px solid #334155;">
            <label style="font-weight:bold; font-size:11px; color:#f59e0b;">Livello Arma (1 a 6):</label>
            <div style="display:flex; align-items:center; gap:6px;">
              <select id="gm-change-weapon-level" class="fvtt-input" style="width:70px; padding:2px; font-weight:bold;">
                ${[1,2,3,4,5,6].map(lvl => `<option value="${lvl}" ${lvl === level ? 'selected' : ''}>Liv. ${lvl}</option>`).join('')}
              </select>
            </div>
          </div>

          <button type="button" id="btn-gm-degrade-manual" class="fvtt-weapon-btn" style="width:100%; background: linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%) !important; border-color:#fca5a5 !important;">
            <i class="fa-solid fa-hammer"></i> Applica Usura Manuale Avanzata
          </button>
        </div>
        ` : ''}

      </div>
    </div>
  `;

  const dialogInstance = await renderUniversalDialog({
    title: `Stato Arma: ${item.name}`,
    content: menuHtml,
    width: 460,
    height: 640,
    id: windowId,
    renderCB: (rootEl, dialogInst) => {
      attachWeaponMenuLogic(rootEl, dialogInst);
    }
  });

  if (dialogInstance) {
    game.weaponSystem.activeMenus[item.id] = dialogInstance;
  }

  function attachWeaponMenuLogic(root, dialogInst) {
    if(!root) return;

    root.querySelector('#btn-refresh-weapon')?.addEventListener('click', (e) => {
      e.preventDefault();
      openWeaponMenu(item);
    });

    const selectLevel = root.querySelector('#gm-change-weapon-level');
    if (selectLevel && game.user.isGM) {
      selectLevel.onchange = async (e) => {
        const newLevel = Math.clamp(parseInt(e.target.value) || 1, 1, 6);
        const maxAllowedShp = getMaxSharpness(newLevel);
        const currentShp = flags.sharpness ?? 60;
        const newShp = Math.min(maxAllowedShp, currentShp);

        await item.update({ 
          "flags.foundry-weapon-system.level": newLevel,
          "flags.foundry-weapon-system.sharpness": newShp
        });
        WS_I18N.info(`Livello di "${item.name}" aggiornato a Livello ${newLevel}!`);
        openWeaponMenu(item);
      };
    }

    root.querySelectorAll('.btn-wip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        WS_I18N.info("🛠️ Questa funzione è ancora in lavorazione e verrà implementata prossimamente!");
      });
    });

    // --- ACCESSORI ARMA ------------------------------------------------------
    // Slot 1: Livello arma 3. Slot 2: Livello arma 5.
    // Gli Item devono provenire dalla cartella "Accessori Arma" del Compendio Oggetti.
    async function consumeAccessoryInventoryItem(invItem) {
      const qty = Number(invItem?.system?.quantity ?? 1);
      if (qty <= 1) await invItem.delete();
      else await invItem.update({ "system.quantity": qty - 1 });
    }

    async function returnAccessoryToInventory(accessoryObj) {
      if (!pack || !accessoryObj) throw new Error("Compendio Oggetti non disponibile.");
      let compDoc = null;
      if (accessoryObj.sourceUuid) {
        try { compDoc = await fromUuid(accessoryObj.sourceUuid); } catch (_) {}
      }
      if (!compDoc) {
        const info = accessoryCompIndexByName.get(String(accessoryObj.name || "").toLowerCase().trim());
        if (info) compDoc = await pack.getDocument(info._id);
      }
      if (!compDoc) throw new Error(`Accessorio "${accessoryObj.name || ''}" non trovato nella cartella Accessori Arma.`);

      const same = actor.items.find(i =>
        String(i.name || "").toLowerCase().trim() === String(compDoc.name || "").toLowerCase().trim()
      );
      if (same) {
        await same.update({ "system.quantity": Number(same.system?.quantity ?? 1) + 1 });
      } else {
        const data = compDoc.toObject();
        delete data._id;
        delete data.id;
        data.system = data.system || {};
        data.system.quantity = 1;
        await actor.createEmbeddedDocuments("Item", [data], { weaponAccessoryReturn: true });
      }
    }

    async function installAccessory(slotIdx, invItem) {
      const reqLevel = slotIdx === 0 ? 3 : 5;
      if (level < reqLevel) {
        WS_I18N.warn(`⚠️ Lo Slot Accessorio ${slotIdx + 1} richiede un'arma di Livello ${reqLevel}.`);
        return;
      }
      const currentSlots = foundry.utils.deepClone(item.flags?.["foundry-weapon-system"]?.accessorySlots || [null, null]);
      while (currentSlots.length < 2) currentSlots.push(null);
      if (currentSlots[slotIdx]) {
        WS_I18N.warn("Rimuovi prima l'accessorio già installato in questo slot.");
        return;
      }

      const compInfo = getAccessoryCompInfoForInventoryItem(invItem);
      if (!compInfo || !accessoryFolderId) {
        WS_I18N.warn('Questo oggetto non appartiene alla cartella "Accessori Arma" del Compendio CraftingSystem → Oggetti.');
        return;
      }

      const compDoc = await pack.getDocument(compInfo._id);
      if (!compDoc) {
        WS_I18N.error("Impossibile recuperare l'accessorio dal Compendio Oggetti.");
        return;
      }

      const sourceUuid = `Compendium.${pack.collection}.Item.${compDoc.id}`;
      const description = getEmbeddedDescription(compDoc);
      const effectSnapshot = snapshotGemEffects(compDoc);
      const rawEffects = compDoc.effects ? Array.from(compDoc.effects).map(e => e.toObject()) : [];

      currentSlots[slotIdx] = {
        name: compDoc.name,
        img: compDoc.img || invItem.img || "icons/svg/item-bag.svg",
        sourceUuid,
        compendiumId: compDoc.id,
        description,
        effects: effectSnapshot
      };

      // Prima salviamo lo slot e gli effetti; solo dopo consumiamo una copia dell'accessorio.
      await item.update({ "flags.foundry-weapon-system.accessorySlots": currentSlots });

      if (rawEffects.length) {
        const effectsToCreate = rawEffects.map(raw => {
          const ef = foundry.utils.duplicate(raw);
          ef._id = foundry.utils.randomID();
          ef.origin = item.uuid;
          ef.disabled = false;
          ef.transfer = true;
          ef.flags = ef.flags || {};
          ef.flags["foundry-weapon-system"] = {
            ...(ef.flags["foundry-weapon-system"] || {}),
            isAccessoryEffect: true,
            accessorySlot: slotIdx,
            accessoryName: compDoc.name
          };
          return ef;
        });
        await item.createEmbeddedDocuments("ActiveEffect", effectsToCreate, { weaponAccessoryInstall: true });
      }

      await consumeAccessoryInventoryItem(invItem);
      WS_I18N.info(`🧩 Accessorio "${compDoc.name}" installato nello Slot ${slotIdx + 1}.`);
      openWeaponMenu(item);
    }

    async function removeAccessory(slotIdx) {
      const currentSlots = foundry.utils.deepClone(item.flags?.["foundry-weapon-system"]?.accessorySlots || [null, null]);
      while (currentSlots.length < 2) currentSlots.push(null);
      const accessoryObj = currentSlots[slotIdx];
      if (!accessoryObj) return;

      try {
        // Restituiamo prima l'oggetto: se il compendio non è disponibile, non perdiamo lo slot.
        await returnAccessoryToInventory(accessoryObj);

        const accessoryEffects = item.effects.filter(effect => {
          const f = effect.flags?.["foundry-weapon-system"];
          return !!f?.isAccessoryEffect && Number(f.accessorySlot) === Number(slotIdx);
        });
        if (accessoryEffects.length) {
          await item.deleteEmbeddedDocuments("ActiveEffect", accessoryEffects.map(e => e.id), { weaponAccessoryRemove: true });
        }

        currentSlots[slotIdx] = null;
        await item.update({ "flags.foundry-weapon-system.accessorySlots": currentSlots });
        WS_I18N.info(`🧩 Accessorio "${accessoryObj.name}" rimosso gratuitamente e restituito all'inventario.`);
        openWeaponMenu(item);
      } catch (err) {
        console.error("⚔️ WEAPON SYSTEM | Errore rimozione accessorio", err);
        WS_I18N.error(err.message || "Impossibile rimuovere l'accessorio.");
      }
    }

    function getAvailableAccessoryItems() {
      return actor.items.filter(invItem => {
        const qty = Number(invItem.system?.quantity ?? 1);
        return qty > 0 && !!getAccessoryCompInfoForInventoryItem(invItem);
      });
    }

    function openAccessoryPicker(slotIdx) {
      const reqLevel = slotIdx === 0 ? 3 : 5;
      if (level < reqLevel) {
        WS_I18N.warn(`⚠️ Lo Slot Accessorio ${slotIdx + 1} si sblocca al Livello ${reqLevel}.`);
        return;
      }
      if (!accessoryFolderId) {
        WS_I18N.error('Cartella "Accessori Arma" non trovata nel Compendio CraftingSystem → Oggetti.');
        return;
      }

      const candidates = getAvailableAccessoryItems();
      if (!candidates.length) {
        WS_I18N.warn('Non possiedi Accessori Arma validi nell’inventario.');
        return;
      }

      const cards = candidates.map(invItem => `
        <button type="button" class="fvtt-item-card accessory-picker-card" data-item-id="${invItem.id}" style="width:100%; display:flex; align-items:center; gap:8px; text-align:left; color:#f3f4f6;">
          <img src="${invItem.img || 'icons/svg/item-bag.svg'}" style="width:34px; height:34px; border-radius:5px; object-fit:cover; border:1px solid #facc15;">
          <div style="min-width:0; flex:1;">
            <div style="font-size:11px; font-weight:800; color:#facc15; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${invItem.name}</div>
            <div style="font-size:9px; color:#94a3b8;">Quantità: ${Number(invItem.system?.quantity ?? 1)}</div>
          </div>
        </button>`).join('');

      renderUniversalDialog({
        title: `Installa Accessorio — Slot ${slotIdx + 1}`,
        content: `<div style="padding:10px; background:#0f172a; color:#f3f4f6; display:flex; flex-direction:column; gap:6px; max-height:420px; overflow-y:auto;">
          <div style="font-size:10px; color:#fde68a; margin-bottom:3px;">Sono mostrati solo gli oggetti riconosciuti nella cartella <b>Accessori Arma</b>.</div>
          ${cards}
        </div>`,
        width: 390,
        height: 480,
        renderCB: (pRoot, pDialog) => {
          pRoot.querySelectorAll('.accessory-picker-card').forEach(card => {
            card.addEventListener('click', async ev => {
              ev.preventDefault();
              const invItem = actor.items.get(card.dataset.itemId);
              if (!invItem) return;
              if (pDialog?.close) await pDialog.close();
              try { await installAccessory(slotIdx, invItem); }
              catch (err) {
                console.error("⚔️ WEAPON SYSTEM | Errore installazione accessorio", err);
                WS_I18N.error(err.message || "Impossibile installare l'accessorio.");
              }
            });
          });
        }
      });
    }

    root.querySelectorAll('.fvtt-accessory-slot').forEach(slotBtn => {
      const slotIdx = Number(slotBtn.dataset.accessorySlot);
      slotBtn.addEventListener('click', async ev => {
        ev.preventDefault();
        const current = (item.flags?.["foundry-weapon-system"]?.accessorySlots || [null, null])[slotIdx];
        if (!current) {
          openAccessoryPicker(slotIdx);
          return;
        }
        let doc = null;
        if (current.sourceUuid) {
          try { doc = await fromUuid(current.sourceUuid); } catch (_) {}
        }
        if (doc?.sheet) doc.sheet.render(true);
      });

      // Drag & drop opzionale: resta comunque valida la regola della cartella Accessori Arma.
      slotBtn.addEventListener('dragover', ev => {
        if (slotBtn.dataset.filled === 'true') return;
        ev.preventDefault();
        slotBtn.classList.add('drag-over');
      });
      slotBtn.addEventListener('dragleave', () => slotBtn.classList.remove('drag-over'));
      slotBtn.addEventListener('drop', async ev => {
        if (slotBtn.dataset.filled === 'true') return;
        ev.preventDefault();
        slotBtn.classList.remove('drag-over');
        try {
          const data = JSON.parse(ev.dataTransfer.getData('text/plain'));
          const dropped = await fromUuid(data.uuid || data.itemUuid || '');
          if (!dropped || dropped.parent?.id !== actor.id) {
            WS_I18N.warn("Trascina un Accessorio Arma presente nell'inventario di questo personaggio.");
            return;
          }
          await installAccessory(slotIdx, dropped);
        } catch (err) {
          console.error("⚔️ WEAPON SYSTEM | Drop accessorio non valido", err);
          WS_I18N.warn("Accessorio non valido.");
        }
      });
    });

    root.querySelectorAll('.btn-remove-accessory').forEach(btn => {
      btn.addEventListener('click', async ev => {
        ev.preventDefault();
        ev.stopPropagation();
        await removeAccessory(Number(btn.dataset.accessorySlot));
      });
    });

    root.querySelector('#btn-gm-degrade-manual')?.addEventListener('click', (e) => {
      e.preventDefault();
      promptGMDegradation(item.uuid, item.parent?.name || "Personaggio", null, 0, 0);
    });

    // --- FORATURA SLOT ---
    async function promptDrillOperation(slotIdx) {
      const reqLvl = slotIdx === 0 ? 2 : slotIdx === 1 ? 4 : 6;
      if (level < reqLvl) {
        WS_I18N.warn(`⚠️ Questo slot richiede un'arma di almeno Livello ${reqLvl}!`);
        return;
      }

      const successRate = getDrillSuccessRate(slotIdx, item);
      const currentLostCount = (flags.lostSlots || [false, false, false]).filter(Boolean).length;
      const nextLostCount = currentLostCount + 1;
      const nextPenalty = nextLostCount === 1 ? 20 : nextLostCount === 2 ? 50 : 80;

      const dialogContent = `
        <div style="padding:14px; background:#0f172a; color:#f3f4f6; font-family:'Inter', sans-serif; text-align:center;">
          <i class="fa-solid fa-screwdriver-wrench" style="font-size:36px; color:#38bdf8; margin-bottom:8px;"></i>
          <h3 style="color:#f59e0b; margin:0 0 8px 0;">Foratura Slot ${slotIdx + 1}</h3>
          <p style="font-size:12px; color:#cbd5e1; line-height:1.4; margin-bottom:12px;">
            Arma: <b>${item.name}</b><br>
            Probabilità di successo: <b style="color:#38bdf8;">${successRate}%</b><br>
            <span style="font-size:11px; color:#f87171;">
              ATTENZIONE: Se la foratura fallisce, lo slot sarà distrutto per sempre e la durabilità massima dell'arma scenderà permanentemente di <b>${nextPenalty} points<b>!
            </span>
          </p>
          <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btn-roll-drill" class="fvtt-weapon-btn" style="background:#0284c7 !important; border-color:#38bdf8 !important;">Tira d100</button>
            <button type="button" id="btn-gm-success-drill" class="fvtt-weapon-btn" style="background:#10b981 !important; border-color:#34d399 !important;">Successo 100% (Master)</button>
            <button type="button" id="btn-cancel-drill" class="fvtt-weapon-btn" style="background:#ef4444 !important; border-color:#f87171 !important;">Annulla</button>
          </div>
        </div>
      `;

      renderUniversalDialog({
        title: `Foratura - Slot ${slotIdx + 1}`,
        content: dialogContent,
        width: 400,
        height: 290,
        renderCB: (dRoot, dInst) => {
          const closeD = () => { if (dInst && typeof dInst.close === "function") dInst.close(); };

          dRoot.querySelector('#btn-roll-drill').onclick = async () => {
            closeD();
            const roll = Math.floor(Math.random() * 100) + 1;
            const success = roll <= successRate;
            await executeDrillAction(slotIdx, success, `Tiro d100: ${roll} vs ${successRate}%`);
          };

          dRoot.querySelector('#btn-gm-success-drill').onclick = async () => {
            closeD();
            await executeDrillAction(slotIdx, true, "Forzato a 100% dal Master");
          };

          dRoot.querySelector('#btn-cancel-drill').onclick = () => {
            closeD();
          };
        }
      });
    }

    async function executeDrillAction(slotIdx, success, rollDetailsText) {
      let curDrilled = flags.drilledSlots || [false, false, false];
      while (curDrilled.length < 3) curDrilled.push(false);
      let curLost = flags.lostSlots || [false, false, false];
      while (curLost.length < 3) curLost.push(false);

      if (success) {
        curDrilled[slotIdx] = true;
        await item.update({ "flags.foundry-weapon-system.drilledSlots": curDrilled });
        WS_I18N.info(`✨ Slot ${slotIdx + 1} forato con successo (${rollDetailsText})! (+3 Permanente Usura)`);
        WS_I18N.chat({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `🔧 <b>${actor.name}</b> ha praticato con successo un foro nello Slot ${slotIdx + 1} dell'arma <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Successo! L'arma è ora più fragile (+3 usura permanente).</i>`
        });
      } else {
        curLost[slotIdx] = true;
        const lostCount = curLost.filter(Boolean).length;
        let penalty = 20;
        if (lostCount === 2) penalty = 50;
        else if (lostCount >= 3) penalty = 80;

        let baseMax = flags.baseMaxDurability;
        if (baseMax === undefined) {
          baseMax = flags.durability?.max || 100;
          await item.update({ "flags.foundry-weapon-system.baseMaxDurability": baseMax });
        }

        const newMax = Math.max(1, baseMax - penalty);
        const currentDurObj = flags.durability || { current: 100, max: 100 };
        const newCur = Math.min(currentDurObj.current ?? 100, newMax);

        await item.update({
          "flags.foundry-weapon-system.lostSlots": curLost,
          "flags.foundry-weapon-system.durability.max": newMax,
          "flags.foundry-weapon-system.durability.current": newCur
        });

        WS_I18N.error(`💥 Foratura Slot ${slotIdx + 1} fallita! Slot distrutto e durabilità ridotta.`);
        WS_I18N.chat({
          speaker: ChatMessage.getSpeaker({ actor }),
          content: `💥 <b>Disastro nella foratura per ${actor.name}!</b> Il tentativo di forare lo Slot ${slotIdx + 1} di <b>${item.name}</b> è fallito:<br>- Lo slot è <b style="color:#ef4444;">perso per sempre</b>.<br>- Totale slot rotti: <b>${lostCount}</b>. L'arma ha perso permanentemente punti di durabilità massima (Nuovo Max: ${newMax}).<br><i>Risultato: ${rollDetailsText}</i>`
        });
      }
      openWeaponMenu(item);
    }

    // --- GESTIONE GEMME (Incastonatura / Rimozione) ---
    async function promptGemOperation(slotIdx, gemItem, isRemoval = false) {
      const successRate = getDrillSuccessRate(slotIdx, item);
      const opName = isRemoval ? "Rimozione Gemma" : "Incastonatura Gemma";
      const targetGemName = isRemoval ? gemSlots[slotIdx].name : gemItem.name;

      const dialogContent = `
        <div style="padding:14px; background:#0f172a; color:#f3f4f6; font-family:'Inter', sans-serif; text-align:center;">
          <i class="fa-solid fa-gem" style="font-size:36px; color:#38bdf8; margin-bottom:8px;"></i>
          <h3 style="color:#f59e0b; margin:0 0 8px 0;">${opName} (Slot ${slotIdx + 1})</h3>
          <p style="font-size:12px; color:#cbd5e1; line-height:1.4; margin-bottom:12px;">
            Oggetto: <b>${targetGemName}</b><br>
            Probabilità di successo: <b style="color:#38bdf8;">${successRate}%</b><br>
            <span style="font-size:11px; color:#f87171;">Attenzione: Il fallimento distruggerà la gemma trasformandola in frammenti!</span>
          </p>
          <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
            <button type="button" id="btn-roll-gem" class="fvtt-weapon-btn" style="background:#0284c7 !important; border-color:#38bdf8 !important;">Tira d100</button>
            <button type="button" id="btn-gm-success-gem" class="fvtt-weapon-btn" style="background:#10b981 !important; border-color:#34d399 !important;">Successo 100% (Master)</button>
            <button type="button" id="btn-cancel-gem" class="fvtt-weapon-btn" style="background:#ef4444 !important; border-color:#f87171 !important;">Annulla</button>
          </div>
        </div>
      `;

      renderUniversalDialog({
        title: `${opName} - Slot ${slotIdx + 1}`,
        content: dialogContent,
        width: 380,
        height: 270,
        renderCB: (dRoot, dInst) => {
          const closeD = () => { if (dInst && typeof dInst.close === "function") dInst.close(); };

          dRoot.querySelector('#btn-roll-gem').onclick = async () => {
            closeD();
            const roll = Math.floor(Math.random() * 100) + 1;
            const success = roll <= successRate;
            await executeGemAction(slotIdx, gemItem, isRemoval, success, `Tiro d100: ${roll} vs ${successRate}%`);
          };

          dRoot.querySelector('#btn-gm-success-gem').onclick = async () => {
            closeD();
            await executeGemAction(slotIdx, gemItem, isRemoval, true, "Forzato a 100% dal Master");
          };

          dRoot.querySelector('#btn-cancel-gem').onclick = () => {
            closeD();
          };
        }
      });
    }

    async function executeGemAction(slotIdx, gemItem, isRemoval, success, rollDetailsText) {
      if (!isRemoval) {
        const gemName = gemItem.name;
        const gemImg = gemItem.img || "icons/svg/item-bag.svg";
        const gemUuid = gemItem.uuid;
        // Salviamo i dettagli PRIMA di consumare l'Item: se la quantità è 1,
        // l'UUID embedded non sarà più risolvibile dopo delete().
        const gemDescription = getEmbeddedDescription(gemItem);
        const gemEffectSnapshot = snapshotGemEffects(gemItem);
        const gemEffectsRaw = gemItem?.effects ? Array.from(gemItem.effects).map(e => e.toObject()) : [];

        const currentQty = gemItem.system?.quantity ?? 1;
        if (currentQty <= 1) {
          await gemItem.delete();
        } else {
          await gemItem.update({ "system.quantity": currentQty - 1 });
        }

        let curGemSlots = flags.gemSlots || [null, null, null];
        while (curGemSlots.length < 3) curGemSlots.push(null);

        if (success) {
          curGemSlots[slotIdx] = {
            name: gemName,
            img: gemImg,
            uuid: gemUuid,
            description: gemDescription,
            effects: gemEffectSnapshot
          };
          await item.update({ "flags.foundry-weapon-system.gemSlots": curGemSlots });

          // Usa lo snapshot catturato prima del consumo della gemma.
          if (gemEffectsRaw.length > 0) {
            const effectsToCreate = gemEffectsRaw.map(e => {
              const ef = foundry.utils.duplicate(e);
              ef.origin = item.uuid;
              ef.disabled = false;
              ef.transfer = true;
              ef._id = foundry.utils.randomID();
              ef.flags = ef.flags || {};
              ef.flags["foundry-weapon-system"] = { isGemEffect: true, gemName: gemName };
              return ef;
            });
            await item.createEmbeddedDocuments("ActiveEffect", effectsToCreate);
          }

          WS_I18N.info(`✨ Gemma "${gemName}" incastonata con successo (${rollDetailsText})!`);
          WS_I18N.chat({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💎 <b>${actor.name}</b> ha incastonato la gemma <b style="color:#10b981;">${gemName}</b> in <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Successo!</i>`
          });
        } else {
          WS_I18N.error(`💥 Incastonatura fallita (${rollDetailsText})! La gemma si è frantumata.`);
          WS_I18N.chat({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💥 <b>Incastonatura fallita per ${actor.name}!</b> La gemma <b>${gemName}</b> si è <b style="color:#ef4444;">frantumata</b> in <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Fallimento!</i>`
          });

          if (pack) {
            const index = await pack.getIndex();
            const gemFolder = pack.folders.find(f => ["gemme","gems"].includes(String(f.name || "").toLowerCase().trim()));
            const frammentiInfo = index.find(i => (!gemFolder || i.folder === gemFolder.id) && ["frammenti di gemma","gem fragments"].includes(String(i.name || "").toLowerCase().trim()));
            if (frammentiInfo) {
              const frammentiDoc = await pack.getDocument(frammentiInfo._id);
              if (frammentiDoc) {
                const existing = actor.items.find(i => ["frammenti di gemma","gem fragments"].includes(String(i.name || "").toLowerCase().trim()));
                if (existing) {
                  await existing.update({ "system.quantity": (existing.system?.quantity || 1) + 1 });
                } else {
                  await actor.createEmbeddedDocuments("Item", [frammentiDoc.toObject()]);
                }
              }
            }
          }
        }
      } else {
        let curGemSlots = flags.gemSlots || [null, null, null];
        const gemObj = curGemSlots[slotIdx];
        if (!gemObj) return;

        curGemSlots[slotIdx] = null;
        await item.update({ "flags.foundry-weapon-system.gemSlots": curGemSlots });

        const gemEffects = item.effects.filter(e => e.flags?.["foundry-weapon-system"]?.isGemEffect && e.flags["foundry-weapon-system"].gemName === gemObj.name);
        if (gemEffects.length > 0) {
          await item.deleteEmbeddedDocuments("ActiveEffect", gemEffects.map(e => e.id));
        }

        if (success) {
          if (pack && gemObj.name) {
            const index = await pack.getIndex();
            const gemFolder = pack.folders.find(f => ["gemme","gems"].includes(String(f.name || "").toLowerCase().trim()));
            const compInfo = index.find(i => (!gemFolder || i.folder === gemFolder.id) && i.name.toLowerCase().trim() === gemObj.name.toLowerCase().trim());
            if (compInfo) {
              const compDoc = await pack.getDocument(compInfo._id);
              const existing = actor.items.find(i => i.name.toLowerCase().trim() === gemObj.name.toLowerCase().trim());
              if (existing) {
                await existing.update({ "system.quantity": (existing.system?.quantity || 1) + 1 });
              } else {
                await actor.createEmbeddedDocuments("Item", [compDoc.toObject()]);
              }
            }
          }

          WS_I18N.info(`✨ Gemma "${gemObj.name}" rimossa con successo (${rollDetailsText}) e restituita.`);
          WS_I18N.chat({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💎 <b>${actor.name}</b> ha rimosso la gemma <b style="color:#10b981;">${gemObj.name}</b> da <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Successo!</i>`
          });
        } else {
          WS_I18N.error(`💥 Rimozione fallita (${rollDetailsText})! La gemma si è frantumata.`);
          WS_I18N.chat({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💥 <b>Rimozione fallita per ${actor.name}!</b> La gemma <b>${gemObj.name}</b> si è <b style="color:#ef4444;">frantumata</b> durante l'estrazione da <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Fallimento!</i>`
          });

          if (pack) {
            const index = await pack.getIndex();
            const gemFolder = pack.folders.find(f => ["gemme","gems"].includes(String(f.name || "").toLowerCase().trim()));
            const frammentiInfo = index.find(i => (!gemFolder || i.folder === gemFolder.id) && ["frammenti di gemma","gem fragments"].includes(String(i.name || "").toLowerCase().trim()));
            if (frammentiInfo) {
              const frammentiDoc = await pack.getDocument(frammentiInfo._id);
              if (frammentiDoc) {
                const existing = actor.items.find(i => ["frammenti di gemma","gem fragments"].includes(String(i.name || "").toLowerCase().trim()));
                if (existing) {
                  await existing.update({ "system.quantity": (existing.system?.quantity || 1) + 1 });
                } else {
                  await actor.createEmbeddedDocuments("Item", [frammentiDoc.toObject()]);
                }
              }
            }
          }
        }
      }
      openWeaponMenu(item);
    }

    root.querySelectorAll('.fvtt-gem-slot.unlocked[data-drill-slot]').forEach(slotEl => {
      const slotIdx = parseInt(slotEl.getAttribute('data-drill-slot'));
      slotEl.addEventListener('click', (e) => {
        e.preventDefault();
        promptDrillOperation(slotIdx);
      });
    });

    root.querySelectorAll('.fvtt-gem-slot.unlocked[data-gem-slot]').forEach(slotEl => {
      const slotIdx = parseInt(slotEl.getAttribute('data-gem-slot'));

      slotEl.addEventListener('click', (e) => {
        e.preventDefault();
        const validPlayerGemmes = actor.items.filter(i => validGemme.has(i.name.toLowerCase().trim()));
        if (validPlayerGemmes.length === 0) {
          WS_I18N.warn("Non possiedi nessuna Gemma valida nel tuo inventario (controlla la cartella Gemme nel compendio)!");
          return;
        }

        let listHtml = validPlayerGemmes.map(i => `
          <div class="fvtt-item-card gem-picker-card" data-id="${i.id}">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${i.img}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;">
              <span style="font-weight:bold; font-size:12px; color:#f3f4f6;">${i.name} (x${i.system?.quantity || 1})</span>
            </div>
          </div>
        `).join('');

        renderUniversalDialog({
          title: `Incastona Gemma - Slot ${slotIdx + 1}`,
          content: `<div style="padding:12px; background:#0f172a; border-radius:8px; display:flex; flex-direction:column; gap:8px;">${listHtml}</div>`,
          width: 320,
          height: 400,
          renderCB: (pRoot, pDialog) => {
            pRoot.querySelectorAll('.gem-picker-card').forEach(card => {
              card.onclick = () => {
                const selectedItem = actor.items.get(card.getAttribute('data-id'));
                if (selectedItem) {
                  if (pDialog && typeof pDialog.close === "function") pDialog.close();
                  promptGemOperation(slotIdx, selectedItem, false);
                }
              };
            });
          }
        });
      });
    });

    root.querySelectorAll('.fvtt-gem-slot.filled').forEach(slotEl => {
      const slotIdx = parseInt(slotEl.getAttribute('data-gem-slot'));
      slotEl.addEventListener('click', (e) => {
        e.preventDefault();
        promptGemOperation(slotIdx, null, true);
      });
      slotEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        promptGemOperation(slotIdx, null, true);
      });
    });

    // --- GESTIONE COTI ---
    function openCotiQuantityDialog(slotIdx, coteItem, currentInSlotQty = 0) {
      const ownedQty = coteItem.system?.quantity ?? 1;
      const maxTransferrable = Math.min(ownedQty, 10 - currentInSlotQty);

      if (maxTransferrable <= 0) {
        WS_I18N.warn("Impossibile aggiungere altre Coti in questo slot (Max 10 per slot)!");
        return;
      }

      let selectedQty = 1;

      const qtyDialogHtml = `
        <div style="padding:12px; background:#0f172a; color:#f3f4f6; text-align:center; font-family:'Inter', sans-serif;">
          <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:10px;">
            <img src="${coteItem.img}" style="width:32px; height:32px; border-radius:4px; object-fit:cover;">
            <span style="font-weight:bold; color:#22c55e; font-size:13px;">${coteItem.name}</span>
          </div>
          <p style="font-size:11px; color:#94a3b8; margin-bottom:12px;">Scegli quante unità inserire nello Slot ${slotIdx + 1}:</p>
          
          <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:14px;">
            <button type="button" class="fvtt-qty-btn" id="btn-qty-minus">-</button>
            <input type="number" id="inp-qty-val" min="1" max="${maxTransferrable}" value="1" class="fvtt-input" style="width:50px; text-align:center; font-weight:bold; font-size:13px;">
            <button type="button" class="fvtt-qty-btn" id="btn-qty-plus">+</button>
          </div>

          <button type="button" id="btn-confirm-add-coti" class="fvtt-weapon-btn" style="width:100%; background: linear-gradient(180deg, #059669 0%, #047857 100%) !important; border-color:#34d399 !important;">
            Aggiungi all'Arma
          </button>
        </div>
      `;

      renderUniversalDialog({
        title: `Aggiungi Coti - Slot ${slotIdx + 1}`,
        content: qtyDialogHtml,
        width: 280,
        height: 220,
        renderCB: (qRoot, qDialog) => {
          const inp = qRoot.querySelector('#inp-qty-val');
          const minus = qRoot.querySelector('#btn-qty-minus');
          const plus = qRoot.querySelector('#btn-qty-plus');
          const btnAdd = qRoot.querySelector('#btn-confirm-add-coti');

          minus.onclick = () => { selectedQty = Math.max(1, selectedQty - 1); inp.value = selectedQty; };
          plus.onclick = () => { selectedQty = Math.min(maxTransferrable, selectedQty + 1); inp.value = selectedQty; };
          inp.onchange = (e) => { selectedQty = Math.clamp(parseInt(e.target.value) || 1, 1, maxTransferrable); inp.value = selectedQty; };

          btnAdd.onclick = async () => {
            if (qDialog && typeof qDialog.close === "function") qDialog.close();

            if (ownedQty <= selectedQty) {
              await coteItem.delete();
            } else {
              await coteItem.update({ "system.quantity": ownedQty - selectedQty });
            }

            let currentCotiInv = flags.cotiInventory || [null, null, null];
            while (currentCotiInv.length < 3) currentCotiInv.push(null);
            
            const coteDesc = coteItem.system?.description?.value || "";
            const restoreAmount = parseSharpnessFromDescription(coteDesc);

            currentCotiInv[slotIdx] = {
              name: coteItem.name,
              img: coteItem.img,
              restoreAmount: restoreAmount,
              qty: currentInSlotQty + selectedQty
            };

            await item.update({ "flags.foundry-weapon-system.cotiInventory": currentCotiInv });
            WS_I18N.info(`Aggiunte ${selectedQty}x "${coteItem.name}" allo slot ${slotIdx + 1}!`);
            openWeaponMenu(item);
          };
        }
      });
    }

    function openCotiRemoveDialog(slotIdx) {
      let currentCotiInv = flags.cotiInventory || [null, null, null];
      let coteSlot = currentCotiInv[slotIdx];
      if (!coteSlot) return;

      let removeQty = 1;

      const removeDialogHtml = `
        <div style="padding:12px; background:#0f172a; color:#f3f4f6; text-align:center; font-family:'Inter', sans-serif;">
          <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:10px;">
            <img src="${coteSlot.img}" style="width:32px; height:32px; border-radius:4px; object-fit:cover;">
            <span style="font-weight:bold; color:#ef4444; font-size:13px;">${coteSlot.name}</span>
          </div>
          <p style="font-size:11px; color:#94a3b8; margin-bottom:12px;">Scegli quante unità rimuovere dallo slot e restituire all'inventario:</p>
          
          <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:14px;">
            <button type="button" class="fvtt-qty-btn" id="btn-rem-minus">-</button>
            <input type="number" id="inp-rem-val" min="1" max="${coteSlot.qty}" value="1" class="fvtt-input" style="width:50px; text-align:center; font-weight:bold; font-size:13px;">
            <button type="button" class="fvtt-qty-btn" id="btn-rem-plus">+</button>
          </div>

          <button type="button" id="btn-confirm-rem-coti" class="fvtt-weapon-btn" style="width:100%; background: linear-gradient(180deg, #9f1239 0%, #881337 100%) !important; border-color:#f43f5e !important;">
            Rimuovi e Riponi in Inventario
          </button>
        </div>
      `;

      renderUniversalDialog({
        title: `Rimuovi Coti dallo Slot ${slotIdx + 1}`,
        content: removeDialogHtml,
        width: 280,
        height: 220,
        renderCB: (rRoot, rDialog) => {
          const inp = rRoot.querySelector('#inp-rem-val');
          const minus = rRoot.querySelector('#btn-rem-minus');
          const plus = rRoot.querySelector('#btn-rem-plus');
          const btnRem = rRoot.querySelector('#btn-confirm-rem-coti');

          minus.onclick = () => { removeQty = Math.max(1, removeQty - 1); inp.value = removeQty; };
          plus.onclick = () => { removeQty = Math.min(coteSlot.qty, removeQty + 1); inp.value = removeQty; };
          inp.onchange = (e) => { removeQty = Math.clamp(parseInt(e.target.value) || 1, 1, coteSlot.qty); inp.value = removeQty; };

          btnRem.onclick = async () => {
            if (rDialog && typeof rDialog.close === "function") rDialog.close();

            if (pack) {
              const index = await pack.getIndex();
              const compItemInfo = index.find(i => i.name.toLowerCase().trim() === coteSlot.name.toLowerCase().trim());
              if (compItemInfo) {
                const compItem = await pack.getDocument(compItemInfo._id);
                const existing = actor.items.find(i => i.name.toLowerCase().trim() === compItem.name.toLowerCase().trim());
                if (existing) {
                  await existing.update({"system.quantity": (existing.system?.quantity || 1) + removeQty});
                } else {
                  const itemObj = compItem.toObject();
                  itemObj.system.quantity = removeQty;
                  await actor.createEmbeddedDocuments("Item", [itemObj]);
                }
              }
            }

            if (coteSlot.qty <= removeQty) {
              currentCotiInv[slotIdx] = null;
            } else {
              currentCotiInv[slotIdx].qty -= removeQty;
            }

            await item.update({ "flags.foundry-weapon-system.cotiInventory": currentCotiInv });
            WS_I18N.info(`Rimosse ${removeQty}x "${coteSlot.name}" dallo slot!`);
            openWeaponMenu(item);
          };
        }
      });
    }

    async function useCoteFromSlot(slotIdx) {
      let currentCotiInv = flags.cotiInventory || [null, null, null];
      let coteSlot = currentCotiInv[slotIdx];
      if (!coteSlot) return;

      const currentSharp = flags.sharpness !== undefined ? flags.sharpness : 60;
      const maxAllowedShp = getMaxSharpness(level);

      if (currentSharp >= maxAllowedShp) {
        WS_I18N.warn(`L'affilatura di quest'arma ha già raggiunto il massimo consentito per il suo livello (${maxAllowedShp}/100)!`);
        return;
      }

      const newSharp = Math.min(maxAllowedShp, currentSharp + (coteSlot.restoreAmount || 20));

      if (coteSlot.qty <= 1) {
        currentCotiInv[slotIdx] = null;
      } else {
        currentCotiInv[slotIdx].qty -= 1;
      }

      await item.update({
        "flags.foundry-weapon-system.sharpness": newSharp,
        "flags.foundry-weapon-system.cotiInventory": currentCotiInv
      });

      WS_I18N.info(`✨ Affilatura ripristinata a ${newSharp}/100 usufruendo di 1x ${coteSlot.name}!`);
      openWeaponMenu(item);
    }

    root.querySelectorAll('.fvtt-cote-slot').forEach(slotEl => {
      const slotIdx = parseInt(slotEl.getAttribute('data-slot'));

      slotEl.addEventListener('click', async (e) => {
        e.preventDefault();
        let currentCotiInv = flags.cotiInventory || [null, null, null];
        const currentSlot = currentCotiInv[slotIdx];

        if (currentSlot) {
          await useCoteFromSlot(slotIdx);
        } else {
          const validPlayerCoti = actor.items.filter(i => validCoti.has(i.name.toLowerCase().trim()));
          if (validPlayerCoti.length === 0) {
            WS_I18N.warn("Non possiedi nessuna Cote nel tuo inventario!");
            return;
          }

          let listHtml = validPlayerCoti.map(i => `
            <div class="fvtt-item-card cote-picker-card" data-id="${i.id}">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${i.img}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;">
                <span style="font-weight:bold; font-size:12px; color:#f3f4f6;">${i.name} (x${i.system?.quantity || 1})</span>
              </div>
            </div>
          `).join('');

          renderUniversalDialog({
            title: `Scegli Cote per Slot ${slotIdx + 1}`,
            content: `<div style="padding:12px; background:#0f172a; border-radius:8px; display:flex; flex-direction:column; gap:8px;">${listHtml}</div>`,
            width: 320,
            height: 400,
            renderCB: (pRoot, pDialog) => {
              pRoot.querySelectorAll('.cote-picker-card').forEach(card => {
                card.onclick = () => {
                  const selectedItem = actor.items.get(card.getAttribute('data-id'));
                  if (selectedItem) {
                    if (pDialog && typeof pDialog.close === "function") pDialog.close();
                    openCotiQuantityDialog(slotIdx, selectedItem, 0);
                  }
                };
              });
            }
          });
        }
      });

      slotEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        let currentCotiInv = flags.cotiInventory || [null, null, null];
        if (currentCotiInv[slotIdx]) {
          openCotiRemoveDialog(slotIdx);
        }
      });

      slotEl.addEventListener('dragover', (e) => { e.preventDefault(); slotEl.classList.add('drag-over'); });
      slotEl.addEventListener('dragleave', () => slotEl.classList.remove('drag-over'));
      slotEl.addEventListener('drop', async (e) => {
        e.preventDefault();
        slotEl.classList.remove('drag-over');
        try {
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          if (!data.uuid) return;
          const droppedItem = await fromUuid(data.uuid);

          if (!droppedItem || droppedItem.parent?.id !== actor.id) {
            WS_I18N.warn("L'oggetto deve trovarsi nel tuo inventario!");
            return;
          }
          if (!validCoti.has(droppedItem.name.toLowerCase().trim())) {
            WS_I18N.warn("Questo oggetto non è una Cote valida!");
            return;
          }

          let currentCotiInv = flags.cotiInventory || [null, null, null];
          const curQtyInSlot = currentCotiInv[slotIdx]?.qty || 0;
          openCotiQuantityDialog(slotIdx, droppedItem, curQtyInSlot);
        } catch (err) {
          console.error("Errore durante il drag & drop della cote:", err);
        }
      });
    });

    const slotRivestimento = root.querySelector('#slot-rivestimento');
    const btnRemoveRivestimento = root.querySelector('#btn-remove-rivestimento');

    async function applyCoatingManual(coatingItem) {
      const coatingName = coatingItem.name;
      const coatingImg = coatingItem.img;
      const coatingEffects = coatingItem.effects ? Array.from(coatingItem.effects).map(e => e.toObject()) : [];

      const customLustro = await promptCoatingLustro();

      const currentQty = coatingItem.system?.quantity ?? 1;
      if (currentQty <= 1) {
        await coatingItem.delete();
      } else {
        await coatingItem.update({ "system.quantity": currentQty - 1 });
      }

      await applyCoatingToWeapon(item, coatingName, coatingImg, coatingEffects, coatingItem, customLustro);
      WS_I18N.info(`Rivestimento "${coatingName}" applicato con successo (Lustro: ${customLustro}) ed eliminato dall'inventario!`);
      openWeaponMenu(item);
    }

    if (btnRemoveRivestimento && game.user.isGM) {
      btnRemoveRivestimento.addEventListener('click', async (e) => {
        e.preventDefault();
        await removeCoatingFromWeapon(item, true); 
        WS_I18N.info(`Rivestimento rimosso da ${item.name}, Lustro azzerato a 0 e oggetto restituito nell'inventario dal Master.`);
        openWeaponMenu(item);
      });
    }

    if (slotRivestimento && !rivestimento) {
      slotRivestimento.addEventListener('click', (e) => {
        e.preventDefault();
        const validItems = actor.items.filter(i => validCoatings.has(i.name.toLowerCase().trim()));
        
        if (validItems.length === 0) {
          WS_I18N.warn("Non possiedi nessun Rivestimento valido nel tuo inventario!");
          return;
        }

        let listHtml = validItems.map(i => `
          <div class="fvtt-item-card rivestimento-card" data-id="${i.id}">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${i.img}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;">
              <span style="font-weight:bold; font-size:12px; color:#f3f4f6;">${i.name} (x${i.system?.quantity || 1})</span>
            </div>
          </div>
        `).join('');

        renderUniversalDialog({
          title: "Scegli Rivestimento",
          content: `<div style="padding:12px; background:#0f172a; border-radius:8px; display:flex; flex-direction:column; gap:8px;">${listHtml}</div>`,
          width: 320,
          height: 400,
          renderCB: (pRoot, pDialog) => {
             pRoot.querySelectorAll('.rivestimento-card').forEach(card => {
               card.onclick = () => {
                 const selectedItem = actor.items.get(card.getAttribute('data-id'));
                 if (selectedItem) {
                   if (pDialog && typeof pDialog.close === "function") pDialog.close();
                   applyCoatingManual(selectedItem);
                 }
               };
             });
          }
        });
      });

      slotRivestimento.addEventListener('dragover', (e) => { e.preventDefault(); slotRivestimento.classList.add('drag-over'); });
      slotRivestimento.addEventListener('dragleave', () => slotRivestimento.classList.remove('drag-over'));
      slotRivestimento.addEventListener('drop', async (e) => {
        e.preventDefault();
        slotRivestimento.classList.remove('drag-over');
        try {
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          if (!data.uuid) return;
          const droppedItem = await fromUuid(data.uuid);
          
          if (!droppedItem || !droppedItem.parent || droppedItem.parent.id !== actor.id) {
            WS_I18N.warn("L'oggetto deve trovarsi nel tuo inventario!");
            return;
          }
          if (!validCoatings.has(droppedItem.name.toLowerCase().trim())) {
            WS_I18N.warn("Questo oggetto non è un Rivestimento compatibile o non è stato trovato nel compendio Oggetti!");
            return;
          }
          applyCoatingManual(droppedItem);
        } catch(err) {
          console.error("Errore durante il drag & drop del rivestimento:", err);
        }
      });
    }
  }
}

async function applyCoatingToWeapon(weaponItem, coatingName, coatingImg = null, coatingEffects = [], coatingDoc = null, customLustro = 100) {
  if (!weaponItem || weaponItem.type !== "weapon") return;

  const actor = weaponItem.parent;
  let flags = weaponItem.flags?.["foundry-weapon-system"] || {};

  if (flags.rivestimento) {
    await removeCoatingFromWeapon(weaponItem, false);
  }

  let updates = {};
  updates["flags.foundry-weapon-system.lustro"] = customLustro;

  const baseName = flags.originalName || weaponItem.name;
  updates["flags.foundry-weapon-system.originalName"] = baseName;

  const coatingType = extractCoatingWord(coatingName);
  updates.name = `${baseName} Rivestita in ${coatingType}`;

  let isCoatingMagic = false;
  let isCoatingFocus = false;
  let coatingDesc = "";

  if (coatingDoc) {
    coatingDesc = coatingDoc.system?.description?.value || coatingDoc.system?.description?.public || "";

    const props = coatingDoc.system?.properties;
    if (props) {
      if (props instanceof Set) {
        isCoatingMagic = props.has("mgc");
        isCoatingFocus = props.has("foc");
      } else if (Array.isArray(props)) {
        isCoatingMagic = props.includes("mgc");
        isCoatingFocus = props.includes("foc");
      } else if (typeof props === "object") {
        isCoatingMagic = !!props.mgc;
        isCoatingFocus = !!props.foc;
      }
    }
  }

  const wasOriginallyMagic = weaponItem.system.properties instanceof Set 
    ? weaponItem.system.properties.has("mgc") 
    : (Array.isArray(weaponItem.system.properties) ? weaponItem.system.properties.includes("mgc") : !!weaponItem.system.properties?.mgc);

  const wasOriginallyFocus = weaponItem.system.properties instanceof Set 
    ? weaponItem.system.properties.has("foc") 
    : (Array.isArray(weaponItem.system.properties) ? weaponItem.system.properties.includes("foc") : !!weaponItem.system.properties?.foc);

  updates["flags.foundry-weapon-system.wasOriginallyMagic"] = wasOriginallyMagic;
  updates["flags.foundry-weapon-system.wasOriginallyFocus"] = wasOriginallyFocus;

  let currentProps = weaponItem.system.properties;
  if (currentProps instanceof Set) {
    const newProps = new Set(currentProps);
    if (isCoatingMagic) newProps.add("mgc");
    if (isCoatingFocus) newProps.add("foc");
    updates["system.properties"] = Array.from(newProps);
  } else if (Array.isArray(currentProps)) {
    const newProps = [...currentProps];
    if (isCoatingMagic && !newProps.includes("mgc")) newProps.push("mgc");
    if (isCoatingFocus && !newProps.includes("foc")) newProps.push("foc");
    updates["system.properties"] = newProps;
  } else {
    if (isCoatingMagic) updates["system.properties.mgc"] = true;
    if (isCoatingFocus) updates["system.properties.foc"] = true;
  }

  updates["flags.foundry-weapon-system.rivestimento"] = {
    name: coatingName,
    img: coatingImg || "icons/svg/item-bag.svg",
    isMagic: isCoatingMagic,
    isFocus: isCoatingFocus,
    description: coatingDesc
  };

  await weaponItem.update(updates);

  if (coatingEffects && coatingEffects.length > 0) {
    const effectsToCreate = coatingEffects.map(e => {
      const ef = foundry.utils.duplicate(e);
      ef.origin = weaponItem.uuid;
      ef.disabled = false;
      ef.transfer = true;
      ef._id = foundry.utils.randomID();
      ef.flags = ef.flags || {};
      ef.flags["foundry-weapon-system"] = { isCoatingEffect: true, coatingName: coatingName };
      return ef;
    });

    await weaponItem.createEmbeddedDocuments("ActiveEffect", effectsToCreate);

    if (actor) {
      const actorEffectsToCreate = coatingEffects.map(e => {
        const ef = foundry.utils.duplicate(e);
        ef.origin = weaponItem.uuid;
        ef.disabled = false;
        ef._id = foundry.utils.randomID();
        ef.flags = ef.flags || {};
        ef.flags["foundry-weapon-system"] = { isCoatingEffect: true, weaponId: weaponItem.id, coatingName: coatingName };
        return ef;
      });
      await actor.createEmbeddedDocuments("Item", actorEffectsToCreate);
    }
  }
}

async function removeCoatingFromWeapon(weaponItem, refundToActor = false) {
  if (!weaponItem || weaponItem.type !== "weapon") return;

  const actor = weaponItem.parent;
  const flags = weaponItem.flags?.["foundry-weapon-system"];
  if (!flags || !flags.rivestimento) return;

  const coatingName = flags.rivestimento.name;

  const weaponCoatingEffects = weaponItem.effects.filter(e => e.flags?.["foundry-weapon-system"]?.isCoatingEffect && weaponItem.effects.has(e.id));
  if (weaponCoatingEffects.length > 0) {
    await weaponItem.deleteEmbeddedDocuments("ActiveEffect", weaponCoatingEffects.map(e => e.id));
  }

  if (actor) {
    const actorCoatingEffects = actor.items.filter(e => 
      e.flags?.["foundry-weapon-system"]?.isCoatingEffect && 
      (e.flags?.["foundry-weapon-system"]?.weaponId === weaponItem.id || e.origin === weaponItem.uuid) &&
      actor.items.has(e.id)
    );
    if (actorCoatingEffects.length > 0) {
      await actor.deleteEmbeddedDocuments("Item", actorCoatingEffects.map(e => e.id));
    }
  }

  if (refundToActor && actor) {
    const packObj = game.packs.get("craftingsystem.Oggetti");
    if (packObj) {
      const index = await packObj.getIndex();
      const compItemInfo = index.find(i => i.name.toLowerCase().trim() === coatingName.toLowerCase().trim());
      if (compItemInfo) {
        const compItem = await packObj.getDocument(compItemInfo._id);
        const existing = actor.items.find(i => i.name.toLowerCase().trim() === compItem.name.toLowerCase().trim());
        if (existing) {
          await existing.update({"system.quantity": (existing.system?.quantity || 1) + 1});
        } else {
          await actor.createEmbeddedDocuments("Item", [compItem.toObject()]);
        }
      }
    }
  }

  let updates = {};

  if (flags.originalName) {
    updates.name = flags.originalName;
    updates["flags.foundry-weapon-system.-=originalName"] = null;
  }

  let propsToUpdate = weaponItem.system.properties;
  if (flags.wasOriginallyMagic === false) {
    if (propsToUpdate instanceof Set) propsToUpdate.delete("mgc");
    else if (Array.isArray(propsToUpdate)) propsToUpdate = propsToUpdate.filter(p => p !== "mgc");
    else updates["system.properties.mgc"] = false;
    updates["flags.foundry-weapon-system.-=wasOriginallyMagic"] = null;
  }

  if (flags.wasOriginallyFocus === false) {
    if (propsToUpdate instanceof Set) propsToUpdate.delete("foc");
    else if (Array.isArray(propsToUpdate)) propsToUpdate = propsToUpdate.filter(p => p !== "foc");
    else updates["system.properties.foc"] = false;
    updates["flags.foundry-weapon-system.-=wasOriginallyFocus"] = null;
  }

  if (Array.isArray(propsToUpdate) || propsToUpdate instanceof Set) {
    updates["system.properties"] = Array.from(propsToUpdate);
  }

  updates["flags.foundry-weapon-system.lustro"] = 0;
  updates["flags.foundry-weapon-system.-=rivestimento"] = null;
  await weaponItem.update(updates);
}

Hooks.on("dnd5e.getItemContextOptions", (item, options) => {
  if (!item || item.type !== "weapon") return;
  const isRealistic = item.flags?.["foundry-weapon-system"]?.isRealistic;

  if (isRealistic) {
    options.push({
      name: WS_I18N.t("Stato Arma (Realistica)"),
      icon: "<i class='fa-solid fa-shield-halved' style='color: #f59e0b;'></i>",
      callback: () => game.weaponSystem.openWeaponMenu(item)
    });
  } else {
    options.push({
      name: WS_I18N.t("Rendi Realistica"),
      icon: "<i class='fa-solid fa-gavel' style='color: #ef4444;'></i>",
      callback: () => game.weaponSystem.promptRealisticMode(item)
    });
  }
});

function promptRealisticMode(item) {
  const dialogContent = `
    <div style="font-family: 'Signika', sans-serif; margin-bottom: 10px;">
      <h3 style="color: #ef4444; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
        <i class="fa-solid fa-triangle-exclamation"></i> Attivazione Irreversibile
      </h3>
      <p>Stai per convertire <b>${item.name}</b> in un'arma <strong>Realistica</strong>.</p>
      <p>Questo sbloccherà le statistiche di <b>Durabilità, Lustro, Affilatura, Coti, Accessori e Slot Gemme</b>. L'arma si usurerà utilizzandola in combattimento e necessiterà di manutenzione.</p>
      <p style="color: #b91c1c; font-weight: bold;">Se la durabilità scende a 0, l'arma si distruggerà per sempre diventando un rottame.</p>
      <p>Sei sicuro di voler procedere? <b>Questa azione non può essere annullata.</b></p>
    </div>
  `;

  const confirmAction = async () => {
    await item.update({
      "flags.foundry-weapon-system.isRealistic": true,
      "flags.foundry-weapon-system.level": 1,
      "flags.foundry-weapon-system.durability": { current: 100, max: 100 },
      "flags.foundry-weapon-system.baseMaxDurability": 100,
      "flags.foundry-weapon-system.lustro": 100,
      "flags.foundry-weapon-system.sharpness": 50,
      "flags.foundry-weapon-system.cotiInventory": [null, null, null],
      "flags.foundry-weapon-system.gemSlots": [null, null, null],
      "flags.foundry-weapon-system.accessorySlots": [null, null],
      "flags.foundry-weapon-system.drilledSlots": [false, false, false],
      "flags.foundry-weapon-system.lostSlots": [false, false, false],
      "flags.foundry-weapon-system.rivestimento": null
    });
    WS_I18N.info(`L'arma "${item.name}" ora segue le regole Realistiche!`);
  };

  if (foundry?.applications?.api?.DialogV2) {
    new foundry.applications.api.DialogV2({
      window: { title: WS_I18N.t(`Rendi Realistica: ${item.name}`) },
      content: WS_I18N.html(dialogContent),
      buttons: [
        { action: "confirm", label: WS_I18N.t("Sì, Rendi Realistica"), icon: "fa-solid fa-check", default: true, callback: confirmAction },
        { action: "cancel", label: WS_I18N.t("Annulla"), icon: "fa-solid fa-times" }
      ]
    }).render(true);
  } else {
    new Dialog({
      title: WS_I18N.t(`Rendi Realistica: ${item.name}`),
      content: WS_I18N.html(dialogContent),
      buttons: {
        confirm: { icon: '<i class="fas fa-check"></i>', label: WS_I18N.t("Sì, Rendi Realistica"), callback: confirmAction },
        cancel: { icon: '<i class="fas fa-times"></i>' }
      },
      default: "cancel"
    }).render(true);
  }
}

async function promptGMDegradation(itemUuid, actorName, targetName, rollTotal, targetAC, initDur = 0, initLus = 0, initShp = 0) {
  const item = await fromUuid(itemUuid);
  if (!item) return;

  const flags = item.flags?.["foundry-weapon-system"];
  const currentDur = flags?.durability?.current ?? 100;
  const currentLustro = flags?.lustro ?? 100;
  const currentSharp = flags?.sharpness ?? 60;

  const dialogContent = `
    <div style="font-family: 'Inter', sans-serif; padding: 10px; background: #0f172a; color: #f3f4f6; border-radius: 8px;">
      <p style="font-size:12px; color:#cbd5e1; margin-bottom:10px;">Gestione o conferma dell'usura per l'arma <b>${item.name}</b> di <b>${actorName}</b>.</p>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px; background:#1e293b; padding:8px; border-radius:6px; border:1px solid #334155;">
        <label style="font-size:11px; font-weight:bold; color:#38bdf8;"><i class="fa-solid fa-hammer"></i> Danno Durabilità (Attuale: ${currentDur}):</label>
        <input type="number" id="gm-deg-dur" value="${initDur}" min="0" max="${currentDur}" class="fvtt-input" style="width:50px; text-align:center; padding:2px;">
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px; background:#1e293b; padding:8px; border-radius:6px; border:1px solid #334155;">
        <label style="font-size:11px; font-weight:bold; color:#c084fc;"><i class="fa-solid fa-wand-magic-sparkles"></i> Danno Lustro (Attuale: ${currentLustro}):</label>
        <input type="number" id="gm-deg-lus" value="${initLus}" min="0" max="${currentLustro}" class="fvtt-input" style="width:50px; text-align:center; padding:2px;">
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px; background:#1e293b; padding:8px; border-radius:6px; border:1px solid #334155;">
        <label style="font-size:11px; font-weight:bold; color:#22c55e;"><i class="fa-solid fa-bolt"></i> Danno Affilatura (Attuale: ${currentSharp}/100):</label>
        <input type="number" id="gm-deg-shp" value="${initShp}" min="0" max="${currentSharp}" class="fvtt-input" style="width:50px; text-align:center; padding:2px;">
      </div>
    </div>
  `;

  const applyDegradation = async (html) => {
    const root = html instanceof HTMLElement ? html : (html[0] || html);
    const durDmg = parseInt(root.querySelector('#gm-deg-dur').value) || 0;
    const lusDmg = parseInt(root.querySelector('#gm-deg-lus').value) || 0;
    const shpDmg = parseInt(root.querySelector('#gm-deg-shp').value) || 0;

    if (durDmg === 0 && lusDmg === 0 && shpDmg === 0) return;

    const newDur = Math.max(0, currentDur - durDmg);
    const newLus = Math.max(0, currentLustro - lusDmg);
    const newShp = Math.max(0, currentSharp - shpDmg);

    await item.update({
      "flags.foundry-weapon-system.durability.current": newDur,
      "flags.foundry-weapon-system.lustro": newLus,
      "flags.foundry-weapon-system.sharpness": newShp
    });

    WS_I18N.info(`Usura applicata a ${item.name}: -${durDmg} Durabilità, -${lusDmg} Lustro, -${shpDmg} Affilatura.`);
  };

  if (foundry?.applications?.api?.DialogV2) {
    new foundry.applications.api.DialogV2({
      window: { title: WS_I18N.t(`Danno e Usura: ${item.name}`) },
      content: WS_I18N.html(dialogContent),
      buttons: [
        { action: "apply", label: WS_I18N.t("Applica Usura"), icon: "fa-solid fa-gavel", default: true, callback: (event, button, dialog) => applyDegradation(dialog.element) },
        { action: "ignore", label: WS_I18N.t("Annulla"), icon: "fa-solid fa-times" }
      ]
    }).render(true);
  } else {
    new Dialog({
      title: WS_I18N.t(`Danno e Usura: ${item.name}`),
      content: WS_I18N.html(dialogContent),
      buttons: {
        apply: { icon: '<i class="fas fa-gavel"></i>', label: WS_I18N.t("Applica Usura"), callback: applyDegradation },
        ignore: { icon: '<i class="fas fa-times"></i>', label: WS_I18N.t("Annulla") }
      },
      default: "apply"
    }).render(true);
  }
}