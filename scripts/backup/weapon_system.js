Hooks.once("init", () => {
  game.settings.register("foundry-weapon-system", "requireGMApproval", {
    name: "Approvazione Master Obbligatoria per l'Usura",
    hint: "Se spuntata, le statistiche dell'arma non cambieranno fino a quando il Master non conferma l'esito dalla chat. Se deselezionata, tutto avverrà in automatico.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.registerMenu("foundry-weapon-system", "weaponSystemSettingsMenu", {
    name: "Configurazione Sistema Armi",
    label: "Configura Impostazioni",
    hint: "Pannello di configurazione per il modulo delle armi (Durabilità, Lustro & Affilatura).",
    icon: "fas fa-cogs",
    type: WeaponSystemSettingsForm,
    restricted: true
  });
});

Hooks.once("ready", () => {
  console.log("⚔️ WEAPON SYSTEM: Modulo Armi caricato con successo!");
  ui.notifications.info("⚔️ Sistema Armi (Durabilità, Lustro, Affilatura, Coti, Gemme & Rivestimenti) Attivo!");

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
      title: "Impostazioni Sistema Armi",
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
          ui.notifications.info("Impostazioni salvate con successo!");
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
  const runRenderCB = (el, dialog) => {
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
        buttons: [{ action: "close", label: "Chiudi", default: false }]
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
  const compItemInfo = index.find(i => String(i.name || "").toLowerCase().trim() === "arma smussata");
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
            ui.notifications.error(`💥 L'affilatura di "${item.name}" è scesa a 0! L'arma è ora smussata.`);
            if (item.parent) {
              ChatMessage.create({
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
        ui.notifications.info(`✨ L'affilatura di "${item.name}" è tornata attiva. Rimossi gli effetti di: Arma smussata.`);
      }
    }

    const dur = changes.flags?.["foundry-weapon-system"]?.durability?.current;
    if (dur !== undefined && dur <= 0) {
      await checkWeaponBreak(item);
      return; 
    }

    const lus = changes.flags?.["foundry-weapon-system"]?.lustro;
    if (lus !== undefined && lus <= 0) {
      ui.notifications.warn(`⚠️ Il Lustro dell'arma "${item.name}" è sceso a 0!`);
      if (item.parent) {
        ChatMessage.create({
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

    ChatMessage.create({ user: game.user.id, content: autoChatContent });

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

    ChatMessage.create({
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
        ui.notifications.warn("⚠️ Solo il Master può confermare o modificare l'usura dell'arma!");
        return;
      }

      const uuid = btn.getAttribute('data-uuid');
      const proposedDur = parseInt(btn.getAttribute('data-dur')) || 0;
      const proposedLus = parseInt(btn.getAttribute('data-lus')) || 0;
      const proposedShp = parseInt(btn.getAttribute('data-shp')) || 0;

      const item = await fromUuid(uuid);
      if (!item) {
        ui.notifications.error("Impossibile trovare l'arma.");
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

  ui.notifications.error(`💥 L'arma "${itemName}" si è spezzata ed è andata distrutta!`);
  
  ChatMessage.create({
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
        ui.notifications.info(`Recuperato rottame: ${itemData.name}`);
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

  ui.notifications.error(`💥 Il Lustro di ${item.name} è sceso a 0! Il rivestimento in ${coatingName} è andato distrutto.`);
  
  if (actor) {
    ChatMessage.create({
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
    ui.notifications.warn("L'arma deve trovarsi nell'inventario di un personaggio per essere modificata.");
    return;
  }

  injectWeaponSystemCSS();

  let flags = item.flags?.["foundry-weapon-system"];
  if (!flags || !flags.isRealistic) {
    ui.notifications.warn("Quest'arma non è impostata come Realistica.");
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

  let lostSlots = flags.lostSlots || [false, false, false];
  while (lostSlots.length < 3) lostSlots.push(false);

  let dullWeaponData = flags.dullWeaponData || null;

  let validCoatings = new Set();
  let validCoti = new Set();
  let validGemme = new Set();
  
  const pack = game.packs.get("craftingsystem.Oggetti");
  if (pack) {
    const index = await pack.getIndex();
    
    const coatingFolder = pack.folders.find(f => f.name.toLowerCase() === "rivestimento");
    if (coatingFolder) {
      index.forEach(i => { if (i.folder === coatingFolder.id) validCoatings.add(i.name.toLowerCase().trim()); });
    }

    const cotiFolder = pack.folders.find(f => f.name.toLowerCase() === "coti" || f.name.toLowerCase() === "cote");
    if (cotiFolder) {
      index.forEach(i => { if (i.folder === cotiFolder.id) validCoti.add(i.name.toLowerCase().trim()); });
    }

    const gemmeFolder = pack.folders.find(f => f.name.toLowerCase() === "gemme");
    if (gemmeFolder) {
      index.forEach(i => { if (i.folder === gemmeFolder.id) validGemme.add(i.name.toLowerCase().trim()); });
    }
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
        const gemmeFolder = pack.folders.find(f => f.name.toLowerCase() === "gemme");
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

        <div class="fvtt-weapon-panel">
          <label style="font-weight:bold; font-size:11px; color:#facc15; display:block; margin-bottom:6px;"><i class="fa-solid fa-puzzle-piece"></i> Accessori Arma</label>
          <button type="button" class="fvtt-weapon-btn btn-wip" style="width:100%; background:#020617 !important; border-color:#475569 !important; color:#94a3b8 !important;">
             <i class="fa-solid fa-plus"></i> Gestisci Accessori
          </button>
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
        ui.notifications.info(`Livello di "${item.name}" aggiornato a Livello ${newLevel}!`);
        openWeaponMenu(item);
      };
    }

    root.querySelectorAll('.btn-wip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        ui.notifications.info("🛠️ Questa funzione è ancora in lavorazione e verrà implementata prossimamente!");
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
        ui.notifications.warn(`⚠️ Questo slot richiede un'arma di almeno Livello ${reqLvl}!`);
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
              ATTENZIONE: Se la foratura fallisce, lo slot sarà distrutto per sempre e la durabilità massima dell'arma scenderà permanentemente di <b>${nextPenalty} punti</b>!
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
        ui.notifications.info(`✨ Slot ${slotIdx + 1} forato con successo (${rollDetailsText})! (+3 Permanente Usura)`);
        ChatMessage.create({
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

        ui.notifications.error(`💥 Foratura Slot ${slotIdx + 1} fallita! Slot distrutto e durabilità ridotta.`);
        ChatMessage.create({
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

          ui.notifications.info(`✨ Gemma "${gemName}" incastonata con successo (${rollDetailsText})!`);
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💎 <b>${actor.name}</b> ha incastonato la gemma <b style="color:#10b981;">${gemName}</b> in <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Successo!</i>`
          });
        } else {
          ui.notifications.error(`💥 Incastonatura fallita (${rollDetailsText})! La gemma si è frantumata.`);
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💥 <b>Incastonatura fallita per ${actor.name}!</b> La gemma <b>${gemName}</b> si è <b style="color:#ef4444;">frantumata</b> in <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Fallimento!</i>`
          });

          if (pack) {
            const index = await pack.getIndex();
            const gemFolder = pack.folders.find(f => f.name.toLowerCase() === "gemme");
            const frammentiInfo = index.find(i => (!gemFolder || i.folder === gemFolder.id) && i.name.toLowerCase().trim() === "frammenti di gemma");
            if (frammentiInfo) {
              const frammentiDoc = await pack.getDocument(frammentiInfo._id);
              if (frammentiDoc) {
                const existing = actor.items.find(i => i.name.toLowerCase().trim() === "frammenti di gemma");
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
            const gemFolder = pack.folders.find(f => f.name.toLowerCase() === "gemme");
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

          ui.notifications.info(`✨ Gemma "${gemObj.name}" rimossa con successo (${rollDetailsText}) e restituita.`);
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💎 <b>${actor.name}</b> ha rimosso la gemma <b style="color:#10b981;">${gemObj.name}</b> da <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Successo!</i>`
          });
        } else {
          ui.notifications.error(`💥 Rimozione fallita (${rollDetailsText})! La gemma si è frantumata.`);
          ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `💥 <b>Rimozione fallita per ${actor.name}!</b> La gemma <b>${gemObj.name}</b> si è <b style="color:#ef4444;">frantumata</b> durante l'estrazione da <b>${item.name}</b>.<br><i>Risultato: ${rollDetailsText} — Fallimento!</i>`
          });

          if (pack) {
            const index = await pack.getIndex();
            const gemFolder = pack.folders.find(f => f.name.toLowerCase() === "gemme");
            const frammentiInfo = index.find(i => (!gemFolder || i.folder === gemFolder.id) && i.name.toLowerCase().trim() === "frammenti di gemma");
            if (frammentiInfo) {
              const frammentiDoc = await pack.getDocument(frammentiInfo._id);
              if (frammentiDoc) {
                const existing = actor.items.find(i => i.name.toLowerCase().trim() === "frammenti di gemma");
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
          ui.notifications.warn("Non possiedi nessuna Gemma valida nel tuo inventario (controlla la cartella Gemme nel compendio)!");
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
        ui.notifications.warn("Impossibile aggiungere altre Coti in questo slot (Max 10 per slot)!");
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
            ui.notifications.info(`Aggiunte ${selectedQty}x "${coteItem.name}" allo slot ${slotIdx + 1}!`);
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
            ui.notifications.info(`Rimosse ${removeQty}x "${coteSlot.name}" dallo slot!`);
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
        ui.notifications.warn(`L'affilatura di quest'arma ha già raggiunto il massimo consentito per il suo livello (${maxAllowedShp}/100)!`);
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

      ui.notifications.info(`✨ Affilatura ripristinata a ${newSharp}/100 usufruendo di 1x ${coteSlot.name}!`);
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
            ui.notifications.warn("Non possiedi nessuna Cote nel tuo inventario!");
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
            ui.notifications.warn("L'oggetto deve trovarsi nel tuo inventario!");
            return;
          }
          if (!validCoti.has(droppedItem.name.toLowerCase().trim())) {
            ui.notifications.warn("Questo oggetto non è una Cote valida!");
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
      ui.notifications.info(`Rivestimento "${coatingName}" applicato con successo (Lustro: ${customLustro}) ed eliminato dall'inventario!`);
      openWeaponMenu(item);
    }

    if (btnRemoveRivestimento && game.user.isGM) {
      btnRemoveRivestimento.addEventListener('click', async (e) => {
        e.preventDefault();
        await removeCoatingFromWeapon(item, true); 
        ui.notifications.info(`Rivestimento rimosso da ${item.name}, Lustro azzerato a 0 e oggetto restituito nell'inventario dal Master.`);
        openWeaponMenu(item);
      });
    }

    if (slotRivestimento && !rivestimento) {
      slotRivestimento.addEventListener('click', (e) => {
        e.preventDefault();
        const validItems = actor.items.filter(i => validCoatings.has(i.name.toLowerCase().trim()));
        
        if (validItems.length === 0) {
          ui.notifications.warn("Non possiedi nessun Rivestimento valido nel tuo inventario!");
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
            ui.notifications.warn("L'oggetto deve trovarsi nel tuo inventario!");
            return;
          }
          if (!validCoatings.has(droppedItem.name.toLowerCase().trim())) {
            ui.notifications.warn("Questo oggetto non è un Rivestimento compatibile o non è stato trovato nel compendio Oggetti!");
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
      name: "Stato Arma (Realistica)",
      icon: "<i class='fa-solid fa-shield-halved' style='color: #f59e0b;'></i>",
      callback: () => game.weaponSystem.openWeaponMenu(item)
    });
  } else {
    options.push({
      name: "Rendi Realistica",
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
      "flags.foundry-weapon-system.drilledSlots": [false, false, false],
      "flags.foundry-weapon-system.lostSlots": [false, false, false],
      "flags.foundry-weapon-system.rivestimento": null
    });
    ui.notifications.info(`L'arma "${item.name}" ora segue le regole Realistiche!`);
  };

  if (foundry?.applications?.api?.DialogV2) {
    new foundry.applications.api.DialogV2({
      window: { title: `Rendi Realistica: ${item.name}` },
      content: dialogContent,
      buttons: [
        { action: "confirm", label: "Sì, Rendi Realistica", icon: "fa-solid fa-check", default: true, callback: confirmAction },
        { action: "cancel", label: "Annulla", icon: "fa-solid fa-times" }
      ]
    }).render(true);
  } else {
    new Dialog({
      title: `Rendi Realistica: ${item.name}`,
      content: dialogContent,
      buttons: {
        confirm: { icon: '<i class="fas fa-check"></i>', label: "Sì, Rendi Realistica", callback: confirmAction },
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

    ui.notifications.info(`Usura applicata a ${item.name}: -${durDmg} Durabilità, -${lusDmg} Lustro, -${shpDmg} Affilatura.`);
  };

  if (foundry?.applications?.api?.DialogV2) {
    new foundry.applications.api.DialogV2({
      window: { title: `Danno e Usura: ${item.name}` },
      content: dialogContent,
      buttons: [
        { action: "apply", label: "Applica Usura", icon: "fa-solid fa-gavel", default: true, callback: (event, button, dialog) => applyDegradation(dialog.element) },
        { action: "ignore", label: "Annulla", icon: "fa-solid fa-times" }
      ]
    }).render(true);
  } else {
    new Dialog({
      title: `Danno e Usura: ${item.name}`,
      content: dialogContent,
      buttons: {
        apply: { icon: '<i class="fas fa-gavel"></i>', label: "Applica Usura", callback: applyDegradation },
        ignore: { icon: '<i class="fas fa-times"></i>', label: "Annulla" }
      },
      default: "apply"
    }).render(true);
  }
}