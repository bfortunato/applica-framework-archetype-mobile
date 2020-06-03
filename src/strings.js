let language = "it"

let strings = {}
strings["en"] = {}
strings["it"] = {
    login: "Procedi",
    centraline: "Centralina",
    date: "Data",
    from:"da: ",
    to:"a: ",
    dateFormat: "YYYY-MM-DD",
    measureType: "Tipo di misura",
    measures: "Visualizza Misure",
    h: "HH:MM",
    dataMandatory: "Dati obbligatori",
    data1Required: "DATA1 è obbligatorio",
    required: "Obbligatorio",
    optional: "Opzionale",
    selectUser: "Seleziona Utente",
    generalDoor: "Porta Comune",
    dailyEnergyIn: "Energia termica giornaliera IN",
    dailyEnergyOut: "Energia termica giornaliera OUT",
    totalEnergyIn: "Energia termica totale IN",
    totalEnergyOut: "Energia termica totale OUT",
    valveState: "Stato apertura valvola",
    temperature: "Temperatura",
    relativeHumidity: "Umidità relativa interna",
    airQuality: "Qualità dell'aria",
    doorState: "Porta della stanza",
    windowState: "Finestra della stanza",
    gasRele: "Stato Relè allarme gas",
    tempControl: "Automatismo di controllo temperatura",
    activePower: "Potenza attiva",
    activeEnergy: "Energia attiva",
    ventControl: "Automatismo di controllo ventilazione",
    ventRele: "Stato relè ventilazione",
    lightRele: "Stato relè illuminazione",
    lightControl: "Automatismo di controllo illuminazione",
    external_temperature: "Temperatura esterna",
    humidity: "Umidità relativa esterna",
    solar: "Solarimetro",
    data1greaterdata2: "DATA1 deve essere precedente a DATA2",
    error: "Error",
    meanThermalEnergy: "Energia Termica Media [kWh]",
    effRoom: "Stanza Eff.",
    notEffRoom: "Stanza Non Eff.",
    meanLightEnergy: "Energia Luminosa Media [kWh]",
    meanVenEnergy: "Energia Ventilazione Media [kWh]",
    withEffRoom: "Con Stanza Efficientata",
    saving: "Risparmio"
}

export function setLanguage(language_) {
    language = language_
}

export function getLanguage() {
    return language
}

export default function M(key) {
    if (strings[language] && strings[language][key]) {
        return strings[language][key]
    } else {
        logger.w("String not found for language " + language + ":", key)
        return key
    }
}
