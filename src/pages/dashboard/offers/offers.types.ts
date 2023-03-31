export interface KeyValues {
  name: string;
  id: string;
  email: string;
}

export interface KeyModified {}

export interface Owner {
  keyValues: KeyValues;
  keyModified: KeyModified;
}

export interface NChteAnzahl {
  value: string;
}

export interface Currency {
  value: string;
}

export interface Approval {
  delegate: boolean;
  approve: boolean;
  reject: boolean;
  resubmit: boolean;
}

export interface ReviewProcess {
  approve: boolean;
  reject: boolean;
  resubmit: boolean;
}

export interface LeadStatus {
  value: string;
}

export interface Ursprungslayout {
  value: string;
}

export interface KeyModified2 {}

export interface Layout {
  keyModified: KeyModified2;
  name: string;
  id: string;
}

export interface LeadSource {
  value: string;
}

export interface Hoteltyp {
  value: string;
}

export interface Anrede {
  value: string;
}

export interface StRendeBereicheFunnel {
  value: string;
}

export interface HabenSieSchonEinmalEineHTGemacht {
  value: string;
}

export interface AnzahlDerNChte2Sitzung {
  value: string;
}

export interface Generiert {
  value: string;
}

export interface KeyValues2 {
  name: string;
  id: string;
  email: string;
}

export interface KeyModified3 {}

export interface CreatedBy {
  keyValues: KeyValues2;
  keyModified: KeyModified3;
}

export interface Zimmertyp2SItzung {
  value: string;
}

export interface WannSollDieBehandlungStattfinden {
  value: string;
}

export interface AusgehenderAnrufFR {
  value: string;
}

export interface Sprache {
  value: string;
}

export interface WelcheBereicheStRen1 {
  value: string;
}

export interface Anrufversuch {
  value: string;
}

export interface StandortHT {
  value: string;
}

export interface HaarlinieDrBalwi {
  value: string;
}

export interface Zimmertyp {
  value: string;
}

export interface Department {
  value: string;
}

export interface ConvertedDetail {}

export interface Haarfarbe {
  value: string;
}

export interface ILead {
  Owner: Owner;
  $field_states?: any;
  Bilder_Campaign?: any;
  KevinElit_gesagt: boolean;
  Konvertierender_Link?: any;
  N_chte_Anzahl: NChteAnzahl;
  Quellen: string;
  Schwangerschaft?: any;
  Short_Link: string;
  Suite?: any;
  Datum_Telefon_Termin_Erstellung?: any;
  $process_flow: boolean;
  Klinik?: any;
  Currency: Currency;
  CTA_vor_Konvertierung?: any;
  Seit_wann_leiden_Sie_unter_Haarausfall: string;
  Source_Telefon_Termin?: any;
  Ungeeignet?: any;
  Client_ID?: any;
  Shortlink_Berater?: any;
  Shortlink_Nachbereitung?: any;
  HP_3_Sitzung?: any;
  $approval: Approval;
  Warum_nicht_konvertiert?: any;
  HT_wann_und_wo?: any;
  Wie_viele_sitzungen?: any;
  Offer_ID_erstellen: boolean;
  Vorschlag_senden: boolean;
  Last_Medium?: any;
  Behandlungsdauer?: any;
  Alter?: any;
  bernachtung_2_Sitzung: number;
  Sprache1?: any;
  Google_CLID?: any;
  HT_welche_Erfahrungen?: any;
  Follow_Up_durch?: any;
  Angebot_senden_PRP?: any;
  SMS_Kampagne_gesendet_am?: any;
  Rabattsumme_HP?: any;
  Lead_L_schen: boolean;
  Haarausfallsituation?: any;
  Berater_Zeitpunkt?: any;
  AV_TT_Neuer_Termin?: any;
  $review_process: ReviewProcess;
  Angebotspreis_2_Sitzung?: any;
  Leads_ID_Kopie: string;
  Geeignet_f_r_Zeitpunkt?: any;
  Flugbest_tigung?: any;
  Lead_Status: LeadStatus;
  Reopen_Z_hler?: any;
  Worauf_legen_Sie_besonders_Wert_neu: any[];
  Setter_Telefon_Termin?: any;
  Anrede_3: any[];
  Telefon_Termin_Erstellung?: any;
  Reopen_Tage?: any;
  Seiten_vor_Konvertierung?: any;
  Geschlecht: string;
  Angebot_senden_DE?: any;
  Zwei_Sitzungen_1: boolean;
  Sitzungen_vor_Kontaktaufnahme?: any;
  Fake_Zeitpunkt?: any;
  Ticket?: any;
  Tun_Sie_aktuell_etwas_gegen_Ihre_Haarsituation?: any;
  Ursprungslayout: Ursprungslayout;
  Geheilte_Krankheiten?: any;
  Altersgruppe?: any;
  Affiliate_Link?: any;
  Medium_Neu_Neu: string;
  besteht_aktuell_Haarausfall?: any;
  Preis_mit_Rabatt_DE?: any;
  Terminvorschlag?: any;
  $orchestration: boolean;
  SMS_Hasan: boolean;
  Behandlungsart_HP?: any;
  Preisfeld_Analytics?: any;
  Layout: Layout;
  Lead_Source: LeadSource;
  Neues_Angebot_senden?: any;
  Klinik_Adresse_und_Hotel: boolean;
  Unsere_Garantie: boolean;
  Wie_auf_uns_Aufmerksam_geworden?: any;
  Email_Funnel_deaktivieren: boolean;
  Bilder_Medium?: any;
  Email: string;
  Angebot_Bilder?: any;
  $currency_symbol: string;
  DHI_Haartransplantation_Preis?: any;
  Preis_mit_Rabatt_2_Sitzung?: any;
  Haarausfall_in_der_Familie?: any;
  Bild_2?: any;
  Bild_3?: any;
  Bild_1?: any;
  Shortlink_Anti_Storno?: any;
  Kommt_von_Tophair: boolean;
  Bild_4?: any;
  Last_Activity_Time: Date;
  Verpasster_Anruf_am?: any;
  In_welchem_Zeitraum_m_chten_Sie_HT_durchf_hren?: any;
  Unsubscribed_Mode?: any;
  Behandlung1?: any;
  Sitzungsdauer_HP?: any;
  $converted: boolean;
  Exchange_Rate: number;
  Behandlung3?: any;
  Behandlung2?: any;
  Zip_Code?: any;
  $approved: boolean;
  Berater_Telefon_Nummer?: any;
  Flow_geeignet?: any;
  Krankheiten?: any;
  HP_5_Sitzung?: any;
  Wohnstatus?: any;
  Call2?: any;
  Whatsapp_Liste?: any;
  Hoteltyp: Hoteltyp;
  Last_Click?: any;
  Term: string;
  Notizen_zum_Lead?: any;
  KevinElit_Code: boolean;
  Ergebnisse_Referenzen: boolean;
  Setter_nicht_erreicht: boolean;
  Shortlink_Telefon_Termin: string;
  Shortlink_Vorbereitung?: any;
  Campaign: string;
  WhatsApp_erledigt?: any;
  Ohne_SMS_Vorank_ndigung: boolean;
  G_ltigkeit?: any;
  Rabatt?: any;
  M_chte_ein_schriftliches_Angebot: boolean;
  Angebotspreis_HP?: any;
  Methode_Analyse?: any;
  Notizen_zur_Haaranalyse?: any;
  FUE_Haartransplantation_Preis?: any;
  Berat_nachfassen: boolean;
  Nehmen_Sie_Medikamente_gegen_Haarausfall?: any;
  in_Liste_anzeigen: boolean;
  Rating?: any;
  Paket_ausw_hlen?: any;
  Notizen_zum_Termin?: any;
  Angebot_Terminvorschlag: boolean;
  Augenbrauentransplantation_Preis?: any;
  Rabattoption_DE?: any;
  HP_Alle_Sitzungen_best_tigen: boolean;
  $review?: any;
  SMS_21_07_2021: boolean;
  Methode_DE?: any;
  Verpasster_Anruf_zur_ckgerufen?: any;
  Grafts_2_Sitzung_Analyse?: any;
  Modified_Time: Date;
  Berater_Dashboard?: any;
  Was_h_tten_Sie_sich_gew_nscht_bzw_wann_h_tten_Sie?: any;
  Anrede: Anrede;
  G_ltig_bis?: any;
  Shortlink_Anmeldeformular?: any;
  Setting_Liste: string;
  Gesettet_Zeitpunkt?: any;
  Bart_FUE_Preis?: any;
  Marketing_Feedback: any[];
  $in_merge: boolean;
  Telefon_Termin_Datum?: any;
  Bild_Upload_1?: any;
  $approval_state: string;
  Verk_ufer_Team?: any;
  Bilder_Content?: any;
  DHI_Haartransplantation_Preis_2_Sitzung?: any;
  Medium_Tel_Termin?: any;
  Leads_ID: string;
  Letzte_Kontaktaufnahme: Date;
  FUE_Haartransplantation_Preis_2_Sitzung?: any;
  Rauchen_Alkohol_Rauschmittel: any[];
  Sitzungen_HP?: any;
  $sharing_permission: string;
  Empfehlung_von?: any;
  St_rende_Bereiche_Funnel: StRendeBereicheFunnel[];
  Bilder_angefordert_Zeitpunkt?: any;
  Rauchen_Sie1?: any;
  Ergebnis_Erwartung?: any;
  ge_ffnet_mit?: any;
  $state: string;
  Haben_Sie_schon_einmal_eine_HT_gemacht: HabenSieSchonEinmalEineHTGemacht;
  Berater_2: any[];
  id: string;
  AV_Erstkontakt?: any;
  Setting_durchgef_hrt_Neu?: any;
  Preis_fehlt: boolean;
  Angebotspreis_DE?: any;
  Created_Time: Date;
  Vorige_Behandlungen?: any;
  Anzahl_der_N_chte_2_Sitzung: AnzahlDerNChte2Sitzung;
  Angebotspreis?: any;
  Generiert: Generiert;
  zu_behandelnde_Bereiche: any[];
  Angebots_Datum_HP?: any;
  SMS_Berater?: any;
  Zeit_auf_der_Seite?: any;
  Anzahl_Quellen?: any;
  Shop: boolean;
  Was_hat_dich_bis_jetzt_abgehalten?: any;
  Einw_nde: any[];
  Anreise2?: any;
  FBCLID?: any;
  Anreise1?: any;
  Grafts_Angebot_2_Sitzung?: any;
  Wie_ist_Ihr_Berufsstatus?: any;
  Country?: any;
  Sind_Sie_mit_Elithair_vertraut?: any;
  Last_Call: Date;
  Created_By: CreatedBy;
  Anreise3?: any;
  Zusatzbehandlung_Preis?: any;
  Wochentag?: any;
  AV_AW?: any;
  AV_Aktiver_TV?: any;
  Erkl_rung?: any;
  OP_woanders_Stattgefunden?: any;
  Zahlenfeld_Analytics?: any;
  Haartransplantation_Preis?: any;
  Graftzahl?: any;
  Behandlungsart_d?: any;
  $canvas_id?: any;
  Salutation?: any;
  Wie_auf_uns_Aufmerksam_geworden1: any[];
  Full_Name: string;
  Zimmertyp_2_SItzung: Zimmertyp2SItzung;
  AV_Anzahlung?: any;
  Funktion_ausl_sen: boolean;
  Warum_m_chten_Sie_ein_HP_durchf_hren?: any;
  Preis_mit_Rabatt?: any;
  Grafts_Angebot_DE?: any;
  Lead_Conversion_Time?: any;
  Bilder_anfordern?: any;
  Sonderpreis_Mitarbeiter?: any;
  D_mmerschlaf: boolean;
  Telefon_Termin?: any;
  Anzahlung_angefordert?: any;
  TT_nicht_durchgef_hrt?: any;
  AV_Bilder?: any;
  Angebotspreis_PRP?: any;
  Email_Opt_Out: boolean;
  First_Click?: any;
  Wie_vertraut_sind_Sie_mit_Elithair_3: any[];
  HP_2_Sitzung?: any;
  G_ltigkeit_HP?: any;
  Rabatt_HP?: any;
  Wann_soll_die_Behandlung_stattfinden: WannSollDieBehandlungStattfinden;
  Blutwerte: boolean;
  NEO_FUE_Set_vor_Ort: boolean;
  Shortlink_Offer?: any;
  Follow_Up_Notizen?: any;
  Standort?: any;
  Mobile: string;
  Ausgehender_Anruf_f_r: AusgehenderAnrufFR;
  SMS_Kampagnen?: any;
  AV_TT?: any;
  Kontaktieren_am?: any;
  Tag: any[];
  Medikamente_Auch_gegen_Haarausfall?: any;
  Warum_keine_Bilder_gesendet?: any;
  AV_Inaktiver_TV?: any;
  Einw_nde_Gespr_chsprotokoll?: any;
  Sprache: Sprache;
  Notizen_Gespr_chsprotokoll?: any;
  Gesamtzahlung_vor_Ort: boolean;
  Setting_nicht_m_glich?: any;
  Kein_Switch_Begr_ndung?: any;
  bernachtung_Preis: number;
  Angebots_Datum?: any;
  Grafts_Analyse?: any;
  Aussage_zur_Haarsituation?: any;
  Welche_Bereiche_st_ren1: WelcheBereicheStRen1[];
  Bestandskunde?: any;
  Stillen_Sie?: any;
  Bedarfsermittlung: boolean;
  Bilder?: any;
  Leiden_Familienmitglieder_unter_Haarausfall?: any;
  Analyse_durchgef_hrt_von?: any;
  Anrufversuch: Anrufversuch;
  Medikamente?: any;
  Formel_6: number;
  Last_opened?: any;
  neue_Bilder?: any;
  Standort_HT: StandortHT;
  Setting_Notizen: any[];
  Content_Tel_Termin?: any;
  Telefon_Termin_Uhrzeit?: any;
  PRP_Offer_ID?: any;
  Methode?: any;
  First_Call_difference: number;
  $wizard_connection_path?: any;
  Tel_Termin_bei?: any;
  Allergien?: any;
  $editable: boolean;
  City?: any;
  HP_1_Sitzung?: any;
  Behandlungsart: any[];
  Finanzierung1?: any;
  Vorher_Nachher?: any;
  Last_7_Numbers: string;
  Bilder_Source?: any;
  Content: string;
  Rabattoption_HT?: any;
  Blutbild_vorhanden?: any;
  Haarlinie_Dr_Balwi: HaarlinieDrBalwi;
  Gesamtpreis_HP?: any;
  Trinken_Sie?: any;
  Seit_wann_besch_ftigen_Sie_sich_mit_HT?: any;
  Angebot_senden_HP?: any;
  Doppelzimmer?: any;
  AV_Angebot?: any;
  Verpassten_Anruf_Zur_ckgerufen: boolean;
  Letzte_ffnung?: any;
  Wenn_ja_wieso_dort_nicht_bei_uns?: any;
  Notizen_HP?: any;
  Zwei_Sitzungen_Analyse: boolean;
  Abreise1?: any;
  Abreise2?: any;
  Abreise3?: any;
  Phone: string;
  Zimmertyp: Zimmertyp;
  Rabattsumme_DE?: any;
  department: Department[];
  geeignet_f_r: any[];
  Wie_ist_der_Haarausfall?: any;
  Preise?: any;
  op?: any;
  HP_Offer_ID?: any;
  HP_4_Sitzung?: any;
  $converted_detail: ConvertedDetail;
  Unsubscribed_Time?: any;
  First_Call: Date;
  Wie_vertraut_sind_Sie?: any;
  Kein_Switch: boolean;
  Nutzen_Sie_Haargel?: any;
  Geh_rt_zu?: any;
  Haarfarbe: Haarfarbe;
  Voriges_Bild_1?: any;
  Voriges_Bild_2?: any;
  URL_der_Quelle: string;
  Von_wann?: any;
  Last_Name: string;
  Voriges_Bild_3?: any;
  Beratung_bewerten: boolean;
  Offer_ID: string;
  Setter?: any;
  VIP?: any;
  Gespr_chsnotizen?: any;
  Worauf_legen_Sie_besonders_Wert?: any;
}

// End of generated code
export interface IOfferTemplate {
  id: number;
  name: string;
  body: string;
}



export interface ITemplates {
  id: number;
  name: string;
  category: string;
}