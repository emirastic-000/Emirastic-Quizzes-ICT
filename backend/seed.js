const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

// Module 117 - Informatik- und Netzinfrastruktur für ein kleines Unternehmen realisieren
// Network Infrastructure for Small Business - Advanced Level
const module117Questions = [
  // === Network Fundamentals & Planning ===
  {
    module: 'Module 117',
    category: 'Network Planning',
    question: 'Ein kleines Unternehmen mit 25 Arbeitsplätzen benötigt ein neues Netzwerk. Welche Subnetzmaske sollten Sie für das Netzwerk 192.168.10.0 wählen, um Platz für zukünftiges Wachstum (bis 50 Hosts) zu lassen, aber gleichzeitig IP-Adressen effizient zu nutzen?',
    options: [
      { text: '255.255.255.0 (/24) - 254 nutzbare Hosts', isCorrect: false },
      { text: '255.255.255.192 (/26) - 62 nutzbare Hosts', isCorrect: true },
      { text: '255.255.255.240 (/28) - 14 nutzbare Hosts', isCorrect: false },
      { text: '255.255.255.128 (/25) - 126 nutzbare Hosts', isCorrect: false }
    ],
    explanation: 'Ein /26 Subnetz (255.255.255.192) bietet genau 62 nutzbare Host-Adressen (64 Adressen - 2 für Netzwerk- und Broadcast-Adresse). Dies ist optimal für 25 aktuelle + zukünftige Expansion auf 50 Hosts. /24 wäre zu verschwenderisch (254 Hosts), /28 zu klein (nur 14 Hosts), /25 funktioniert aber ist weniger effizient als nötig. VLSM (Variable Length Subnet Masking) Berechnung: 2^(32-26) = 64 Adressen total, davon 62 nutzbar. Best Practice: Immer 20-30% Reserve einplanen für Drucker, Server, IoT-Geräte.',
    difficulty: 'hard'
  },
  {
    category: 'Network Planning',
    question: 'Welche Dokumentation ist bei der Planung einer Netzinfrastruktur für ein kleines Unternehmen essentiell?',
    options: [
      { text: 'Nur eine Liste der gekauften Geräte', isCorrect: false },
      { text: 'Netzwerkdiagramm, IP-Adressplan, Kabelplan, VLAN-Schema und Backup-Konzept', isCorrect: true },
      { text: 'Ausschließlich die Router-Konfiguration', isCorrect: false },
      { text: 'Nur die Kosten und Lieferanteninformationen', isCorrect: false }
    ],
    explanation: 'Professionelle Netzwerkdokumentation umfasst: 1) NETZWERKDIAGRAMM (physisch & logisch): Layer-2/3 Topologie, Gerätestandorte. 2) IP-ADRESSPLAN: Subnetz-Zuteilungen, DHCP-Bereiche, statische IPs. 3) KABELPLAN: Patchfeld-Dokumentation, Kabellängen, Typen. 4) VLAN-SCHEMA: VLAN-IDs, Zuordnungen, Trunk-Ports. 5) BACKUP-KONZEPT: Konfigurationssicherungen, Disaster Recovery. Zusätzlich: Passwort-Vault, Änderungsprotokoll, SLA-Vereinbarungen. Tools: Visio, draw.io, NetBox, Excel/Confluence.',
    difficulty: 'medium'
  },
  {
    module: 'Module 117',
    category: 'Switching',
    question: 'Sie konfigurieren einen Switch für ein kleines Unternehmen. Welche Ports sollten standardmäßig für End-User-Geräte konfiguriert werden?',
    options: [
      { text: 'Trunk Ports mit allen VLANs', isCorrect: false },
      { text: 'Access Ports im entsprechenden VLAN mit PortFast und BPDU Guard aktiviert', isCorrect: true },
      { text: 'Promiscuous Mode für maximale Flexibilität', isCorrect: false },
      { text: 'Spanning Tree Root Bridge auf allen Ports', isCorrect: false }
    ],
    explanation: 'End-User Access Ports benötigen spezifische Sicherheits- und Performance-Konfigurationen: ACCESS PORT: Gehört zu einem einzelnen VLAN (nicht Trunk). PORTFAST: Überspringt Spanning Tree Listening/Learning States (30 Sekunden Verzögerung) → sofortige Verbindung. BPDU GUARD: Deaktiviert Port bei empfangenen BPDUs → verhindert Switching-Loops durch falsch verkabelte Switches. BEST PRACTICE Konfiguration (Cisco): switchport mode access, switchport access vlan 10, spanning-tree portfast, spanning-tree bpduguard enable. Zusätzlich: Port Security für MAC-Adressen-Limitierung.',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'VLANs',
    question: 'Warum sollten Sie in einem kleinen Unternehmen VLANs einsetzen, auch wenn alle Geräte im selben Gebäude sind?',
    options: [
      { text: 'VLANs sind nur für große Unternehmen sinnvoll', isCorrect: false },
      { text: 'Zur Sicherheitstrennung (Gast-WLAN, Drucker, Server), Broadcast-Reduktion und logischen Netzwerksegmentierung', isCorrect: true },
      { text: 'Nur um die Switch-Konfiguration komplexer zu machen', isCorrect: false },
      { text: 'VLANs haben keinen Nutzen bei weniger als 100 Geräten', isCorrect: false }
    ],
    explanation: 'VLANs bieten auch in kleinen Netzwerken erhebliche Vorteile: 1) SICHERHEIT: Segmentierung von Gäste-WLAN (VLAN 20) isoliert von Firmen-Netz (VLAN 10) und Server-Netz (VLAN 30). 2) BROADCAST-KONTROLLE: Reduziert Broadcast-Domänen → bessere Performance. 3) COMPLIANCE: Trennung von PCI-DSS relevanten Systemen (z.B. Kassensystem). 4) QoS: VoIP-Telefone in separatem VLAN (VLAN 40) mit Priorisierung. BEISPIEL-STRUKTUR: VLAN 10 Benutzer, VLAN 20 Gäste, VLAN 30 Server, VLAN 40 VoIP, VLAN 50 Management, VLAN 99 Native (unused). Inter-VLAN Routing via Layer-3 Switch oder Router.',
    difficulty: 'medium'
  },

  // === DHCP & IP Management ===
  {
    module: 'Module 117',
    category: 'DHCP',
    question: 'Sie konfigurieren einen DHCP-Server für ein Firmennetzwerk. Welche IP-Bereiche sollten Sie aus dem DHCP-Scope ausschließen?',
    options: [
      { text: 'Keine Ausschlüsse nötig, DHCP kann alle Adressen vergeben', isCorrect: false },
      { text: 'Server, Drucker, Switches, Router und andere Infrastruktur-Geräte mit statischen IPs', isCorrect: true },
      { text: 'Nur den Router ausschließen', isCorrect: false },
      { text: 'Alle Adressen unter .50 für zukünftige Nutzung reservieren', isCorrect: false }
    ],
    explanation: 'DHCP-Scope-Planung verhindert IP-Konflikte und strukturiert das Netzwerk: STATISCHE IP-BEREICHE (aus DHCP ausschließen): .1-.50 für Infrastruktur (Router .1, Switches .2-.10, Server .11-.30, Drucker .31-.40, APs .41-.50). DHCP-POOL: .51-.254 für dynamische Clients (Workstations, Laptops, Smartphones). DHCP-OPTIONEN konfigurieren: Option 3 (Default Gateway), Option 6 (DNS-Server), Option 15 (DNS-Domain), Option 42 (NTP-Server), Option 66/67 (PXE-Boot). LEASE-TIME: 8 Stunden für Büro (Workstations), 1 Stunde für Gäste-WLAN. Reservierungen für wichtige Clients (Geschäftsführung, Konferenzraum-Equipment).',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'DHCP',
    question: 'Ein Client erhält keine IP-Adresse via DHCP. Welche Troubleshooting-Schritte sollten Sie in der richtigen Reihenfolge durchführen?',
    options: [
      { text: 'Sofort den DHCP-Server neu starten', isCorrect: false },
      { text: 'Client-Konfiguration prüfen, Netzwerk-Konnektivität testen, DHCP-Relay/Helper prüfen, DHCP-Server-Logs checken', isCorrect: true },
      { text: 'Dem Client sofort eine statische IP zuweisen', isCorrect: false },
      { text: 'Den gesamten Switch neu konfigurieren', isCorrect: false }
    ],
    explanation: 'Systematisches DHCP-Troubleshooting mit 4-Schritt-Methode: SCHRITT 1 - CLIENT: ipconfig /all (Windows) oder ifconfig/ip a (Linux) → APIPA-Adresse 169.254.x.x deutet auf DHCP-Ausfall. ipconfig /release && ipconfig /renew zum Test. SCHRITT 2 - KONNEKTIVITÄT: Ping zum Gateway → funktioniert Switching? SCHRITT 3 - DHCP-RELAY: Wenn Client in anderem Subnet als DHCP-Server → ip helper-address (Cisco) oder DHCP-Relay konfiguriert? SCHRITT 4 - SERVER: DHCP-Service läuft? Scope erschöpft? Fehler in Logs? Wireshark: DHCP DORA-Prozess analysieren (Discover, Offer, Request, Acknowledge). Häufige Ursachen: Falsche VLAN-Zuordnung, fehlender DHCP-Relay, erschöpfter Scope.',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'IP Management',
    question: 'Was ist der Unterschied zwischen APIPA (169.254.x.x) und einer manuell zugewiesenen IP im selben Bereich?',
    options: [
      { text: 'Es gibt keinen Unterschied, beides sind gültige private IPs', isCorrect: false },
      { text: 'APIPA ist eine Fallback-Adresse bei DHCP-Ausfall und erlaubt nur lokale Link-Kommunikation, keine Gateway-Verbindung', isCorrect: true },
      { text: 'APIPA-Adressen sind schneller als manuelle IPs', isCorrect: false },
      { text: 'Manuell zugewiesene 169.254.x.x Adressen funktionieren besser', isCorrect: false }
    ],
    explanation: 'APIPA (Automatic Private IP Addressing) ist ein Windows-Fallback-Mechanismus: FUNKTION: Bei DHCP-Ausfall generiert der Client automatisch eine zufällige IP aus 169.254.1.0/16 (169.254.1.1 - 169.254.254.254) mittels ARP-basierter Duplikatserkennung. LIMITATION: Kein Default Gateway, kein DNS → nur lokale Link-Kommunikation im selben Subnet möglich. DIAGNOSE: 169.254.x.x zeigt DEFINITIV DHCP-Problem (Server down, keine Verbindung, Scope voll, falsches VLAN). WICHTIG: NIEMALS manuell 169.254.x.x vergeben - dieser Bereich ist für Auto-Konfiguration reserviert! RFC 3927 definiert den Standard. Linux-Äquivalent: avahi-autoipd oder systemd-networkd link-local addressing.',
    difficulty: 'medium'
  },

  // === Routing & Gateway ===
  {
    module: 'Module 117',
    category: 'Routing',
    question: 'In einem Multi-VLAN-Setup mit VLANs 10, 20 und 30 auf einem Layer-2-Switch: Wie müssen Clients in VLAN 10 mit VLAN 20 kommunizieren?',
    options: [
      { text: 'Direkt, da alle am selben Switch sind', isCorrect: false },
      { text: 'Via Router-on-a-Stick oder Layer-3-Switch für Inter-VLAN-Routing', isCorrect: true },
      { text: 'Durch Trunk-Ports zwischen den VLANs', isCorrect: false },
      { text: 'Automatisch durch Spanning Tree Protocol', isCorrect: false }
    ],
    explanation: 'VLANs sind separate Broadcast-Domänen, daher ist Routing für Inter-VLAN-Kommunikation erforderlich: OPTION 1 - ROUTER-ON-A-STICK: Ein physischer Router-Port mit Subinterfaces (802.1Q Tagging). Switch Trunk zum Router. Router-Config: interface Gi0/0.10 → encapsulation dot1q 10 → ip address 192.168.10.1 255.255.255.0. Pro: Kostengünstig. Contra: Bottleneck bei hohem Traffic. OPTION 2 - LAYER-3-SWITCH (SVI): Viel effizienter! interface vlan 10 → ip address 192.168.10.1 255.255.255.0 → ip routing (global). Routing in Hardware (ASIC) → Line-Rate-Performance. CLIENT-KONFIGURATION: Default Gateway = entsprechende VLAN-IP (VLAN 10 → GW 192.168.10.1).',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'Routing',
    question: 'Welche Routing-Methode ist für ein kleines Unternehmen mit einem einfachen Netzwerk am besten geeignet?',
    options: [
      { text: 'BGP (Border Gateway Protocol) für maximale Flexibilität', isCorrect: false },
      { text: 'Statisches Routing mit Default Route zum Internet-Gateway', isCorrect: true },
      { text: 'OSPF mit mehreren Areas für Skalierbarkeit', isCorrect: false },
      { text: 'EIGRP für schnelle Konvergenz', isCorrect: false }
    ],
    explanation: 'Für kleine Netzwerke ist statisches Routing die beste Wahl aufgrund von Einfachheit und Sicherheit: STATISCHES ROUTING: Manuelle Route-Konfiguration. Keine CPU/Bandwidth-Overhead durch Routing-Protokolle. DEFAULT ROUTE: ip route 0.0.0.0 0.0.0.0 <next-hop> (Cisco) → alles zum Internet-Gateway. Einfach zu troubleshooten und zu verstehen. WANN DYNAMISCHES ROUTING? Erst bei >3 Routern, redundanten Pfaden, komplexer Topologie. KLEINE FIRMA: Typisch nur 1-2 Router → statisch völlig ausreichend! ZUSATZ: Interne Routen zu lokalen Subnets + Default Route nach außen. VORTEIL: Keine Routing-Protokoll-Schwachstellen, volle Kontrolle, kein unerwartetes Routing-Verhalten.',
    difficulty: 'medium'
  },

  // === DNS & Services ===
  {
    module: 'Module 117',
    category: 'DNS',
    question: 'Sie richten einen lokalen DNS-Server für ein kleines Unternehmen ein. Welche DNS-Einträge sind essentiell für grundlegende Funktionalität?',
    options: [
      { text: 'Nur A-Records für Server', isCorrect: false },
      { text: 'A-Records (IPv4), AAAA (IPv6), MX (Mail), PTR (Reverse), CNAME (Aliase), SRV (Services)', isCorrect: true },
      { text: 'Nur MX-Records für E-Mail', isCorrect: false },
      { text: 'DNS wird in kleinen Firmen nicht benötigt', isCorrect: false }
    ],
    explanation: 'Professionelle DNS-Konfiguration erfordert verschiedene Record-Typen: A-RECORD: Hostname → IPv4 (server01.firma.local → 192.168.10.10). AAAA-RECORD: Hostname → IPv6 für IPv6-fähige Infrastruktur. MX-RECORD: Mail-Server-Priorität (mail.firma.ch IN MX 10 mailserver.firma.ch). PTR-RECORD: Reverse DNS (IP → Hostname) - wichtig für Mail-Server-Reputation! CNAME-RECORD: Aliase (www.firma.local → webserver.firma.local). SRV-RECORD: Service-Discovery (z.B. Active Directory: _ldap._tcp.firma.local). TXT-RECORD: SPF, DKIM, DMARC für E-Mail-Sicherheit. Zusätzlich: DNS-Forwarding zu 8.8.8.8 (Google) oder 1.1.1.1 (Cloudflare) für Internet-Auflösung.',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'DNS',
    question: 'Ein Benutzer kann www.google.com nicht aufrufen, aber die IP 8.8.8.8 ist ping-bar. Was ist das wahrscheinlichste Problem?',
    options: [
      { text: 'Der Router ist defekt', isCorrect: false },
      { text: 'DNS-Server nicht erreichbar oder falsch konfiguriert', isCorrect: true },
      { text: 'Die Firewall blockiert allen Traffic', isCorrect: false },
      { text: 'Der Switch hat einen Hardware-Fehler', isCorrect: false }
    ],
    explanation: 'Dieses klassische Problem zeigt: Netzwerk-Konnektivität funktioniert (Ping zu IP OK), aber Namensauflösung fehlgeschlagen. DIAGNOSE-SCHRITTE: 1) ipconfig /all → DNS-Server korrekt? 2) nslookup google.com → Funktioniert Auflösung? 3) nslookup google.com 8.8.8.8 → Funktioniert externer DNS? 4) ping zum konfigurierten DNS-Server. HÄUFIGE URSACHEN: A) DNS-Server-IP falsch/nicht gesetzt (DHCP-Problem: Option 6), B) Firmen-DNS-Server down, C) Firewall blockiert DNS-Port 53 UDP, D) DNS-Server hat keine Forwarder konfiguriert. LÖSUNG: DHCP Option 6 korrigieren oder temporär: DNS auf 8.8.8.8 oder 1.1.1.1 setzen. LANGFRISTIG: Redundante DNS-Server (Primary + Secondary).',
    difficulty: 'medium'
  },

  // === Wireless & Security ===
  {
    module: 'Module 117',
    category: 'Wireless',
    question: 'Welche WLAN-Sicherheitskonfiguration sollten Sie für ein Firmennetzwerk im Jahr 2025 implementieren?',
    options: [
      { text: 'WEP mit 128-bit Verschlüsselung', isCorrect: false },
      { text: 'WPA2-Personal (PSK) mit einfachem Passwort', isCorrect: false },
      { text: 'WPA3-Enterprise mit RADIUS-Authentifizierung oder mindestens WPA2/WPA3-Mixed mit starkem PSK', isCorrect: true },
      { text: 'Offenes WLAN mit MAC-Filter', isCorrect: false }
    ],
    explanation: 'WLAN-Sicherheit 2025 Best Practices: OPTIMAL: WPA3-ENTERPRISE mit 802.1X/RADIUS → individuelle Benutzer-Authentifizierung, EAP-TLS Zertifikate, kein Shared Secret, Perfect Forward Secrecy. Pro: Beste Sicherheit, User-Tracking, automatisches Re-Keying. MINIMUM: WPA2/WPA3-MIXED MODE mit starkem PSK (min. 20 Zeichen, komplex) für kleinere Firmen ohne AD. ZUSÄTZLICHE MASSNAHMEN: Separate SSIDs (Firma/Gäste), Hidden SSID für Firmen-Netz (Security durch Obscurity - nur zusätzlich!), Management Frame Protection (802.11w), Disable WPS, Regelmäßige PSK-Rotation (quartalsweise). NIEMALS: WEP (in Sekunden crackbar), offenes WLAN, WPA1, MAC-Filter allein (trivial zu umgehen).',
    difficulty: 'hard'
  },
  {
    module: 'Module 117',
    category: 'Wireless',
    question: 'Sie planen die Access Point Platzierung für optimale WLAN-Abdeckung. Welche Faktoren sind entscheidend?',
    options: [
      { text: 'Nur die Anzahl der Clients', isCorrect: false },
      { text: 'Gebäudestruktur, Materialien (Wände), Client-Dichte, Kanal-Überlappung, Frequenzband-Wahl', isCorrect: true },
      { text: 'APs einfach gleichmäßig verteilen ohne weitere Planung', isCorrect: false },
      { text: 'Nur die maximale Reichweite der APs beachten', isCorrect: false }
    ],
    explanation: 'Professionelle WLAN-Planung (Site Survey) berücksichtigt viele Faktoren: 1) GEBÄUDE-STRUKTUR: Betonwände = massive Dämpfung (-10 bis -30 dB), Glas/Holz = moderate Dämpfung. Heatmap-Analyse mit Tools wie Ekahau oder NetSpot. 2) KANAL-PLANUNG: 2.4 GHz: Nur Kanäle 1, 6, 11 nutzen (überlappungsfrei!), 5 GHz: Viel mehr Kanäle verfügbar (36, 40, 44... bis 165) → weniger Interferenz. 3) CLIENT-DICHTE: Konferenzräume brauchen mehr Kapazität → MIMO-APs, höhere Client-to-AP Ratio (max. 25-30 Clients/AP). 4) FREQUENZBAND: 5 GHz für Performance (höhere Geschwindigkeit, weniger Interferenz), 2.4 GHz für Reichweite. REGEL: 20-25% Überlappung zwischen AP-Coverage-Zellen für Roaming.',
    difficulty: 'hard'
  },

  // === Backup & Disaster Recovery ===
  {
    module: 'Module 117',
    category: 'Backup',
    question: 'Welche Backup-Strategie erfüllt die 3-2-1 Regel für ein kleines Unternehmen?',
    options: [
      { text: 'Ein Backup auf einer externen Festplatte im Büro', isCorrect: false },
      { text: '3 Backup-Kopien, auf 2 verschiedenen Medientypen, 1 Kopie offsite (Cloud/anderer Standort)', isCorrect: true },
      { text: 'Zwei Backups auf demselben NAS im selben Raum', isCorrect: false },
      { text: 'Nur Cloud-Backup ohne lokale Kopie', isCorrect: false }
    ],
    explanation: 'Die 3-2-1 Backup-Regel ist der Industrie-Standard für Datensicherheit: 3 KOPIEN: Produktiv-Daten + 2 Backups (z.B. 1 lokal, 1 offsite). 2 MEDIENTYPEN: Unterschiedliche Technologien (z.B. Festplatte + Tape ODER Festplatte + Cloud) → Schutz vor medienspezifischen Ausfällen. 1 OFFSITE: Schutz vor Brand, Diebstahl, Naturkatastrophen. BEISPIEL-SETUP: Täglich inkrementelles Backup auf lokales NAS, wöchentlich volles Backup auf externe HDD (rotiert zu Bankschließfach), täglich Cloud-Backup (Veeam/Acronis → AWS S3 oder Azure). ZUSÄTZLICH: Regelmäßige Restore-Tests (mindestens quartalsweise!), Verschlüsselung, Versionierung (gegen Ransomware). RPO/RTO definieren (Recovery Point/Time Objective).',
    difficulty: 'medium'
  },
  {
    module: 'Module 117',
    category: 'Security',
    question: 'Welche grundlegenden Netzwerk-Sicherheitsmaßnahmen sollten in einem kleinen Unternehmen implementiert sein?',
    options: [
      { text: 'Nur ein Antivirus auf den Clients', isCorrect: false },
      { text: 'Firewall, Netzwerk-Segmentierung, Patch-Management, Starke Passwörter, Backup, Logging/Monitoring', isCorrect: true },
      { text: 'Nur physische Sicherheit durch abgeschlossene Türen', isCorrect: false },
      { text: 'Sicherheit ist nur für große Unternehmen wichtig', isCorrect: false }
    ],
    explanation: 'Defense-in-Depth Strategie mit mehreren Sicherheitsebenen: 1) PERIMETER: Next-Gen-Firewall (Sophos/Fortinet/pfSense), IPS/IDS, VPN für Remote-Access. 2) SEGMENTIERUNG: VLANs für Gäste/Server/Clients, ACLs zwischen VLANs. 3) PATCH-MANAGEMENT: Automatische Windows-Updates (WSUS), regelmäßige Firmware-Updates für Netzwerk-Equipment. 4) ACCESS CONTROL: Starke Passwörter (min. 12 Zeichen), MFA wo möglich, Least-Privilege-Prinzip, regelmäßige Access Reviews. 5) BACKUP: 3-2-1 Regel, Ransomware-Schutz (immutable backups). 6) MONITORING: Syslog-Server, SIEM (Security Information and Event Management), Intrusion Detection. 7) PHYSICAL: Locked Server-Raum, Port-Security auf Switches. 8) AWARENESS: Mitarbeiter-Schulungen gegen Phishing.',
    difficulty: 'hard'
  }
];

// Module 437 - Im Support arbeiten (Working in Support)
// Enhanced with authentic Swiss ICT apprenticeship content
const moduleQuestions = [
  // === HANDLUNGSZIEL 1: Support-Anfragen bearbeiten ===
  {
    category: 'Support Process',
    question: 'Was verstehen Sie unter einer "Incident" im Kontext von ITIL?',
    options: [
      { text: 'Eine regelmäßig geplante Wartung eines IT-Systems', isCorrect: false },
      { text: 'Eine ungeplante Unterbrechung oder Qualitätsminderung eines IT-Services', isCorrect: true },
      { text: 'Ein strukturierter Änderungsantrag für IT-Services', isCorrect: false },
      { text: 'Ein neues Software-Projekt zur Optimierung', isCorrect: false }
    ],
    explanation: 'Nach ITIL ist ein Incident eine ungeplante Unterbrechung oder Reduktion der Qualität eines IT-Service. Dies ist ein zentrales Konzept in der IT-Service-Unterstützung. Beispiele: Server-Ausfall, langsame Applikation, nicht funktionierender Drucker. Wichtig: Incidents sind UNGEPLANT - geplante Wartungen sind "Changes". Das Ziel ist, den Service schnellstmöglich wiederherzustellen.',
    difficulty: 'medium'
  },
  {
    category: 'Support Process',
    question: 'Welches ist der erste Schritt bei der Bearbeitung einer Support-Anfrage?',
    options: [
      { text: 'Das Problem direkt an den 3rd Level Support eskalieren', isCorrect: false },
      { text: 'Den Kunden um Geduld bitten und später zurückrufen', isCorrect: false },
      { text: 'Die Anfrage dokumentieren und kategorisieren', isCorrect: true },
      { text: 'Sofort mit der technischen Problemlösung beginnen', isCorrect: false }
    ],
    explanation: 'Das Dokumentieren und Kategorisieren einer Support-Anfrage ist essentiell für Nachverfolgung, Eskalation und Wissensmanagement. Erfassen Sie: Kontaktdaten, genaue Problembeschreibung, Systemumgebung (OS, Software-Version), Fehlermeldungen, bereits versuchte Lösungen. Dies schafft eine Wissensdatenbank und ermöglicht spätere Analyse von Trends. Ein gut dokumentiertes Ticket spart Zeit bei Eskalation und Übergabe.',
    difficulty: 'easy'
  },
  {
    category: 'Ticketing & Documentation',
    question: 'Welche Informationen sind in einem IT-Support-Ticket essentiell?',
    options: [
      { text: 'Nur die Kontaktdaten und Telefonnummer des Kunden', isCorrect: false },
      { text: 'Kundendaten, Problemdarstellung, durchgeführte Schritte, Lösung und Zeitstempel', isCorrect: true },
      { text: 'Nur die abgerechneten Kosten und Arbeitszeit', isCorrect: false },
      { text: 'Ausschließlich technische Systemlogs ohne Kontext', isCorrect: false }
    ],
    explanation: 'Ein vollständiges Ticket beinhaltet: Kundenkontakt, detaillierte Problembeschreibung, Systemumgebung, versuchte Lösungsschritte, Erfolg/Misserfolg und Zeitstempel. Warum ist jedes Element wichtig? Kontakt ermöglicht Rückfragen, Problembeschreibung schafft Klarheit, Systemumgebung hilft bei Reproduktion, dokumentierte Schritte vermeiden Doppelarbeit, Zeitstempel dienen SLA-Tracking. Best Practice: Verwenden Sie strukturierte Felder statt Freitext wo möglich.',
    difficulty: 'easy'
  },
  {
    category: 'Support Process',
    question: 'Was ist das Ziel von "Problem Management" in der IT-Unterstützung?',
    options: [
      { text: 'Möglichst viele Support-Tickets pro Tag schließen', isCorrect: false },
      { text: 'Die Ursachen von Incidents zu identifizieren und zu beheben, um zukünftige Vorfälle zu verhindern', isCorrect: true },
      { text: 'Alle Incidents innerhalb von 5 Minuten lösen', isCorrect: false },
      { text: 'Probleme dokumentieren ohne konkrete Lösungsmaßnahmen', isCorrect: false }
    ],
    explanation: 'Problem Management konzentriert sich auf die Wurzelursachenanalyse, um wiederkehrende Incidents zu reduzieren und die Systemverfügbarkeit zu verbessern. Unterschied zu Incident Management: Incident = schnelle Service-Wiederherstellung (Symptom-Behandlung), Problem = dauerhafte Lösung (Ursachen-Beseitigung). Beispiel: 10 User melden "Drucker druckt nicht" → 10 Incidents. Problem Management findet heraus: Drucker-Treiber veraltet → Update verhindert zukünftige Incidents. Tools: Root Cause Analysis (RCA), Ishikawa-Diagramm, 5-Why-Methode.',
    difficulty: 'hard'
  },

  // === HANDLUNGSZIEL 2: Kommunikation im Support ===
  {
    category: 'Communication',
    question: 'Im Schulz von Thun Vier-Ohren-Modell, welche Ebene beschreibt die eigentliche Nachricht?',
    options: [
      { text: 'Die Selbstoffenbarung', isCorrect: false },
      { text: 'Die Beziehungsebene', isCorrect: false },
      { text: 'Die Sachebene', isCorrect: true },
      { text: 'Die Appell-Ebene', isCorrect: false }
    ],
    explanation: 'Die Sachebene (faktische Information) ist das, was explizit kommuniziert wird. Das Vier-Ohren-Modell nach Schulz von Thun zeigt 4 Ebenen: 1) Sachinhalt (Fakten/Daten), 2) Selbstoffenbarung (was der Sender über sich preisgibt), 3) Beziehungsebene (wie Sender und Empfänger zueinander stehen), 4) Appell (wozu der Sender auffordert). Beispiel im Support: "Mein PC ist schon wieder kaputt!" - Sach: PC funktioniert nicht, Selbstoffenbarung: Ich bin frustriert, Beziehung: Ich erwarte besseren Service, Appell: Reparieren Sie das sofort! Im Support sollten Sie alle 4 Ebenen wahrnehmen.',
    difficulty: 'medium'
  },
  {
    category: 'Communication',
    question: 'Wie sollte ein Support-Mitarbeiter auf einen frustrierten Kunden reagieren?',
    options: [
      { text: 'Das Problem direkt an einen Vorgesetzten eskalieren', isCorrect: false },
      { text: 'Mit Empathie zuhören, die Frustration anerkennen und sachlich auf das Problem eingehen', isCorrect: true },
      { text: 'Den Kunden auf SLA-Zeiten verweisen und vertrösten', isCorrect: false },
      { text: 'Mit komplexen technischen Details die Situation erklären', isCorrect: false }
    ],
    explanation: 'Emotionale Intelligenz und Empathie sind Schlüsselkompetenzen im IT-Support. Der richtige Ansatz: 1) Aktiv zuhören ohne Unterbrechen, 2) Frustration anerkennen ("Ich verstehe, dass dies ärgerlich ist"), 3) Verantwortung übernehmen ("Ich kümmere mich darum"), 4) Sachlich auf das Problem eingehen. Vermeiden: Defensive Haltung, Schuldzuweisungen, technisches Fachchinesisch. Merke: Ein frustrierter Kunde will gehört und ernst genommen werden, bevor er an der Lösung interessiert ist.',
    difficulty: 'easy'
  },
  {
    category: 'Communication',
    question: 'Was ist "aktives Zuhören" im Support-Kontext?',
    options: [
      { text: 'Notizen machen während der Kunde spricht', isCorrect: false },
      { text: 'Nur die wichtigsten technischen Begriffe notieren', isCorrect: false },
      { text: 'Volle Konzentration auf den Kunden, ohne Unterbrechen, mit Zusammenfassung und Klärungsfragen', isCorrect: true },
      { text: 'Parallel bereits nach Lösungen im Ticketsystem suchen', isCorrect: false }
    ],
    explanation: 'Aktives Zuhören beinhaltet: volle Aufmerksamkeit, keine Unterbrechungen, Zusammenfassungen und Verständnisfragen stellen. Die 5 Komponenten: 1) Volle Konzentration (Multitasking vermeiden), 2) Nonverbale Bestätigung ("Hm", "Ja, verstehe"), 3) Paraphrasieren ("Wenn ich Sie richtig verstehe..."), 4) Klärungsfragen ("Können Sie das genauer beschreiben?"), 5) Zusammenfassung am Ende. Vorteile: Kunde fühlt sich gehört, besseres Problemverständnis, weniger Missverständnisse, schnellere Lösung.',
    difficulty: 'medium'
  },
  {
    category: 'Communication',
    question: 'Welche Arten von Fragen sind in der Support-Kommunikation am hilfreichsten?',
    options: [
      { text: 'Geschlossene Ja/Nein Fragen für schnelle Diagnose', isCorrect: false },
      { text: 'Rhetorische Fragen um den Kunden zum Nachdenken anzuregen', isCorrect: false },
      { text: 'Suggestivfragen die zur gewünschten Antwort führen', isCorrect: false },
      { text: 'Offene Fragen wie "Was ist passiert?" um detaillierte Informationen zu sammeln', isCorrect: true }
    ],
    explanation: 'Offene Fragen ermöglichen dem Kunden, detaillierte Informationen zu geben, die für die Problemlösung essentiell sind. Fragetechniken im Support: OFFENE Fragen (W-Fragen: Was, Wie, Wann, Wo, Wer, Warum) für Details und Kontext. GESCHLOSSENE Fragen (Ja/Nein) nur zur Bestätigung konkreter Fakten. Beispiele: Schlecht: "Haben Sie auf OK geklickt?" (geschlossen, wenig Info). Gut: "Was ist genau passiert, als Sie die Datei öffnen wollten?" (offen, liefert Kontext). Die 5-Why-Methode: Fünfmal "Warum?" fragen um zur Wurzelursache zu gelangen.',
    difficulty: 'medium'
  },

  // === HANDLUNGSZIEL 3: Support-Levels und Eskalation ===
  {
    category: 'Support Levels',
    question: 'Welche sind die typischen Ebenen in einer Support-Hierarchie (nach ITIL)?',
    options: [
      { text: 'Frontend, Backend und Database Support', isCorrect: false },
      { text: 'Junior, Senior und Lead Support', isCorrect: false },
      { text: '1st Level (Erstkontakt), 2nd Level (Technisch), 3rd Level (Spezialist)', isCorrect: true },
      { text: 'Telefon-Support, E-Mail-Support, Chat-Support', isCorrect: false }
    ],
    explanation: 'Diese Strukturierung ermöglicht effiziente Eskalation komplexerer Probleme zu spezialisierten Teams. Details: 1ST LEVEL (Help Desk): Erstkontakt, Ticket-Erfassung, einfache Probleme (Passwortreset, Standardfragen), Lösungsrate ~70-80%. 2ND LEVEL (Technical Support): Komplexere technische Probleme, erweiterte Systemkenntnisse, Software-Troubleshooting, Konfiguration. 3RD LEVEL (Specialist/Engineering): Hochspezialisiert, Entwickler-Level, Systembezogene Probleme, R&D-Involvement. Vorteil: Effiziente Ressourcennutzung, schnellere Lösungen durch richtige Zuweisung.',
    difficulty: 'easy'
  },
  {
    category: 'Support Levels',
    question: 'Wann sollte ein Ticket von 1st Level zu 2nd Level eskaliert werden?',
    options: [
      { text: 'Wenn das Problem komplexer ist oder Standard-Lösungsschritte nicht funktionieren', isCorrect: true },
      { text: 'Automatisch nach 15 Minuten Bearbeitungszeit', isCorrect: false },
      { text: 'Nur wenn der Kunde explizit danach fragt', isCorrect: false },
      { text: 'Sobald der 1st Level Agent Feierabend macht', isCorrect: false }
    ],
    explanation: 'Eskalation basiert auf Problemkomplexität und verfügbarem Wissen, nicht auf Zeit oder Kundenungeduld. Eskalationskriterien: 1) Problem außerhalb des Wissensstands, 2) Standard-Lösungen funktionieren nicht, 3) Spezialwissen erforderlich (z.B. Datenbank-Admin), 4) Hohe Business-Impact erfordert Senior-Involvement. NICHT eskalieren bei: Kunde ist nur ungeduldig (Kommunikation!), Problem ist lösbar aber zeitintensiv, fehlende Eigeninitiative. Tipp: Lieber zu früh eskalieren als zu spät - Zeit ist Geld.',
    difficulty: 'medium'
  },
  {
    category: 'Support Levels',
    question: 'Was ist die Hauptaufgabe von 1st Level Support?',
    options: [
      { text: 'Ausschließlich Telefonate entgegennehmen', isCorrect: false },
      { text: 'Nur einfache Passwortzurücksetzungen durchführen', isCorrect: false },
      { text: 'Anrufe an 2nd Level weiterleiten', isCorrect: false },
      { text: 'Anfragen annehmen, klassifizieren und entweder direkt lösen oder eskalieren', isCorrect: true }
    ],
    explanation: '1st Level ist die erste Kontaktstelle und trägt große Verantwortung für Kundenerfassung und richtige Eskalation.',
    difficulty: 'easy'
  },
  {
    category: 'Support Levels',
    question: 'Was ist der Vorteil einer klaren Eskalationspolitik in einem IT-Support-Betrieb?',
    options: [
      { text: 'Mehr Hierarchieebenen für bessere Karrieremöglichkeiten', isCorrect: false },
      { text: 'Konsistente Behandlung von Issues, schnellere Lösung und bessere Ressourcennutzung', isCorrect: true },
      { text: 'Längere Bearbeitungszeiten durch gründlichere Prüfung', isCorrect: false },
      { text: 'Vermeidung direkter Kundenkommunikation', isCorrect: false }
    ],
    explanation: 'Klare Eskalationskriterien führen zu besserer Effizienz und schnellerer Problemlösung.',
    difficulty: 'hard'
  },

  // === HANDLUNGSZIEL 4: Troubleshooting und Problemlösung ===
  {
    category: 'Troubleshooting',
    question: 'Was ist die erste Maßnahme beim Troubleshooting eines technischen Problems?',
    options: [
      { text: 'Sofort das gesamte System neu installieren', isCorrect: false },
      { text: 'Alle Kabel und Hardware-Komponenten austauschen', isCorrect: false },
      { text: 'Das Problem systematisch dokumentieren und die Umgebung erfassen', isCorrect: true },
      { text: 'Einen Neustart durchführen und hoffen dass es funktioniert', isCorrect: false }
    ],
    explanation: 'Systematische Dokumentation ist der Schlüssel zu reproduzierbaren und effizienten Lösungen. Der professionelle Troubleshooting-Prozess: 1) PROBLEM IDENTIFIZIEREN: Was genau funktioniert nicht? Fehlermeldungen? Seit wann? 2) UMGEBUNG ERFASSEN: OS-Version, Software-Version, Hardware-Spezifikationen, Netzwerk-Setup. 3) ÄNDERUNGEN ERMITTELN: Was wurde zuletzt geändert? Updates? Neue Software? 4) REPRODUZIEREN: Kann das Problem konsistent reproduziert werden? Dokumentation ermöglicht: Wissenstransfer, Mustererkennung, Qualitätssicherung, Auditing.',
    difficulty: 'easy'
  },
  {
    category: 'Troubleshooting',
    question: 'Welche Methode ist beim Troubleshooting am effektivsten?',
    options: [
      { text: 'Trial-and-Error ohne Dokumentation bis etwas funktioniert', isCorrect: false },
      { text: 'Systematische Isolierung: Ein Element nach dem anderen testen bis das Problem identifiziert ist', isCorrect: true },
      { text: 'Parallel mehrere Änderungen durchführen um Zeit zu sparen', isCorrect: false },
      { text: 'Nur die wahrscheinlichste Ursache prüfen', isCorrect: false }
    ],
    explanation: 'Systematisches Troubleshooting reduziert die Zeit zur Problemidentifikation und verhindert unnötige Änderungen. Die Divide-and-Conquer Methode: 1) System in Komponenten aufteilen (Hardware/Software/Netzwerk), 2) Jede Komponente einzeln testen, 3) Problem eingrenzen durch Ausschlussprinzip. WICHTIG: Nur EINE Änderung auf einmal! Sonst wissen Sie nicht, was geholfen hat. Beispiel: PC startet nicht → Test 1: Monitor-Kabel, Test 2: Stromkabel, Test 3: RAM-Module einzeln, etc. Tools: Event Viewer, Systemlogs, Hardware-Diagnose-Tools.',
    difficulty: 'medium'
  },
  {
    category: 'Troubleshooting',
    question: 'Was sollte in der Troubleshooting-Dokumentation enthalten sein?',
    options: [
      { text: 'Nur die Zeitdauer der Problembehebung', isCorrect: false },
      { text: 'Symptome, versuchte Lösungen, Ergebnisse und was letztendlich funktioniert hat', isCorrect: true },
      { text: 'Nur erfolgreiche Lösungsansätze ohne Fehler', isCorrect: false },
      { text: 'Nur interne Notizen ohne Kundeninformationen', isCorrect: false }
    ],
    explanation: 'Vollständige Dokumentation ermöglicht Wissenstransfer und hilft bei ähnlichen zukünftigen Problemen.',
    difficulty: 'easy'
  },
  {
    category: 'Troubleshooting',
    question: 'Beim Troubleshooting zeigt sich folgendes Szenario: Ein Benutzer kann sich nicht ins WLAN einloggen. Was ist der sinnvollste erste Schritt?',
    options: [
      { text: 'Die gesamte Netzwerkinfrastruktur neu konfigurieren', isCorrect: false },
      { text: 'Das Betriebssystem des Benutzers neu installieren', isCorrect: false },
      { text: 'Das WLAN-Passwort überprüfen und die Netzwerk-Konfiguration des Geräts prüfen', isCorrect: true },
      { text: 'Dem Benutzer ein neues Gerät zuweisen', isCorrect: false }
    ],
    explanation: 'Mit einfachen Fragen beginnen (Netzwerkkennwort, Geräte-Einstellungen) bevor komplexere Maßnahmen getroffen werden. WLAN-Troubleshooting-Checkliste: 1) EINFACH: Passwort korrekt? WLAN aktiviert? Flugmodus aus? 2) KONFIGURATION: Richtige SSID ausgewählt? IP-Adresse erhalten (ipconfig)? DNS funktioniert? 3) GERÄT: Andere Geräte funktionieren? Treiber aktuell? Netzwerkadapter aktiviert? 4) NETZWERK: Router erreichbar? Signal-Stärke ausreichend? Kanalüberlastung? Prinzip: Von einfach zu komplex, von wahrscheinlich zu unwahrscheinlich.',
    difficulty: 'medium'
  },

  // === HANDLUNGSZIEL 5: Incident Management ===
  {
    category: 'Incident Management',
    question: 'Was ist der Unterschied zwischen Severity und Priority eines Incidents?',
    options: [
      { text: 'Severity ist subjektiv, Priority ist objektiv messbar', isCorrect: false },
      { text: 'Priority = technische Komplexität; Severity = Kundenzufriedenheit', isCorrect: false },
      { text: 'Severity = Auswirkung auf Geschäft; Priority = Dringlichkeit der Behandlung', isCorrect: true },
      { text: 'Sie sind identisch und werden synonym verwendet', isCorrect: false }
    ],
    explanation: 'Ein kritisches Problem (hohe Severity) kann niedrige Priority haben wenn es nur wenige Nutzer betrifft; umgekehrt kann ein kleines Problem hohe Priority haben. SEVERITY (Schweregrad): Technische/Business-Auswirkung. S1-Critical: Totaler Systemausfall, S2-High: Wesentliche Funktion ausgefallen, S3-Medium: Teilfunktion betroffen, S4-Low: Kosmetischer Fehler. PRIORITY (Dringlichkeit): Wann muss es gelöst werden? P1-Immediate: Sofort, P2-High: Heute, P3-Normal: Diese Woche, P4-Low: Geplant. Beispiel: CEO kann nicht drucken (niedrige Severity, hohe Priority). Backup-Server down nachts (hohe Severity, mittlere Priority).',
    difficulty: 'hard'
  },
  {
    category: 'Incident Management',
    question: 'Wie wird ein Incident normalerweise klassifiziert?',
    options: [
      { text: 'Nach der geografischen Lage des Kunden', isCorrect: false },
      { text: 'Nach der Abteilung des betroffenen Mitarbeiters', isCorrect: false },
      { text: 'Nach Auswirkung (Severity) und Dringlichkeit (Priority)', isCorrect: true },
      { text: 'Nach der erwarteten Lösungsdauer in Stunden', isCorrect: false }
    ],
    explanation: 'Die Klassifizierung bestimmt SLAs, Eskalationspfade und Ressourcenallokation.',
    difficulty: 'medium'
  },
  {
    category: 'Incident Management',
    question: 'Was ist ein "SLA" (Service Level Agreement) im IT-Support?',
    options: [
      { text: 'Ein Software-Lizenzvertrag für Anwendungen', isCorrect: false },
      { text: 'Eine Vereinbarung über die erwartete Verfügbarkeit und Reaktionszeiten für IT-Services', isCorrect: true },
      { text: 'Ein Standard für die Systemarchitektur', isCorrect: false },
      { text: 'Eine Sicherheitsrichtlinie für Login-Authentifizierung', isCorrect: false }
    ],
    explanation: 'SLAs definieren klare Erwartungen für Response- und Resolution-Zeiten basierend auf Severity. Ein SLA (Service Level Agreement) beinhaltet typisch: 1) VERFÜGBARKEIT: z.B. 99.9% Uptime (max 8.76h Downtime/Jahr), 2) RESPONSE TIME: Wie schnell wird reagiert? (P1: 15min, P2: 1h, P3: 4h, P4: 24h), 3) RESOLUTION TIME: Maximale Lösungszeit, 4) SUPPORT-ZEITEN: 24/7 oder Geschäftszeiten? Beispiel SLA: "P1-Incidents werden innerhalb 30 Minuten beantwortet und in 4 Stunden gelöst". Konsequenzen bei SLA-Verletzung: Finanzielle Strafzahlungen, Eskalation, Vertragsstrafen.',
    difficulty: 'medium'
  },
  {
    category: 'Incident Management',
    question: 'Was sollte nach der Behebung eines Incidents IMMER erfolgen?',
    options: [
      { text: 'Das Ticket automatisch schließen ohne weitere Aktionen', isCorrect: false },
      { text: 'Die Lösung dokumentieren, den Kunden benachrichtigen und das Ticket abschließen', isCorrect: true },
      { text: 'Nur eine E-Mail an das Team senden', isCorrect: false },
      { text: 'Das Problem in der internen Wissensdatenbank verstecken', isCorrect: false }
    ],
    explanation: 'Abschluss-Dokumentation und Kundenkommunikation sind essentiell für Zufriedenheit und Wissensverwaltung. Der professionelle Incident-Abschluss: 1) LÖSUNG DOKUMENTIEREN: Was war das Problem? Was hat funktioniert? Welche Steps wurden unternommen? 2) KNOWLEDGE BASE: Lösung in Wissensdatenbank eintragen für zukünftige Fälle, 3) KUNDEN INFORMIEREN: E-Mail mit Zusammenfassung und Lösung, Bestätigung einholen, 4) TICKET SCHLIESSEN: Status auf "Resolved" setzen, 5) FOLLOW-UP: Nach 24-48h nachfragen ob alles funktioniert. Dies verhindert "Zombie-Tickets" und steigert Kundenzufriedenheit.',
    difficulty: 'easy'
  },

  // === HANDLUNGSZIEL 6: Betrieb und Wartung ===
  {
    category: 'Customer Service',
    question: 'Was ist Preventive Maintenance (Vorbeugende Wartung)?',
    options: [
      { text: 'Wartung die ausschließlich bei Systemausfällen durchgeführt wird', isCorrect: false },
      { text: 'Geplante, regelmäßige Wartung um zukünftige Ausfälle zu verhindern', isCorrect: true },
      { text: 'Nur Software-Updates ohne Hardware-Prüfung', isCorrect: false },
      { text: 'Reaktive Maßnahmen nach Kundenbeschwerd en', isCorrect: false }
    ],
    explanation: 'Vorbeugende Wartung reduziert unerwartete Ausfallzeiten und verlängert die Hardware-Lebensdauer. PREVENTIVE MAINTENANCE umfasst: 1) HARDWARE: Lüfter reinigen, Festplatten-Gesundheit prüfen (SMART), Thermalpaste erneuern, Kabelverbindungen prüfen, 2) SOFTWARE: Updates installieren, Sicherheitspatches, Treiber-Updates, Antivirus-Scans, 3) DATEN: Backups verifizieren, Logfiles rotieren, Datenbank-Optimierung, 4) DOKUMENTATION: Inventar aktualisieren, Lizenzen prüfen. Kosten: Proaktiv 10-20% Budget, Reaktiv kann 80% kosten! Motto: "Eine Unze Prävention ist ein Pfund Heilung wert."',
    difficulty: 'medium'
  },
  {
    category: 'Customer Service',
    question: 'Welche Informationen sollte die IT-Abteilung vor dem Urlaub eines Mitarbeiters übergeben?',
    options: [
      { text: 'Nur die E-Mail-Adresse des Vertreters', isCorrect: false },
      { text: 'Alle Logins, Zugriffe, Datenstandorte und wichtige Kontakt-Informationen müssen dokumentiert sein', isCorrect: true },
      { text: 'Keine besonderen Vorkehrungen notwendig', isCorrect: false },
      { text: 'Nur die aktuell laufenden Projekte ohne Details', isCorrect: false }
    ],
    explanation: 'Dokumentation und Übergabe sind essentiell für Kontinuität und Sicherheit während Abwesenheiten.',
    difficulty: 'medium'
  },
  {
    category: 'Remote Support',
    question: 'Welche Tools sind typischerweise für Remote-Support notwendig?',
    options: [
      { text: 'Nur ein modernes Smartphone', isCorrect: false },
      { text: 'Remote-Access-Software, Chat/Kommunikation, und Ticketing-System', isCorrect: true },
      { text: 'Ausschließlich VPN-Zugang', isCorrect: false },
      { text: 'Nur E-Mail und Telefon', isCorrect: false }
    ],
    explanation: 'Remote Support erfordert Koordination mehrerer Technologien für effektive Unterstützung. Essential Remote Support Stack: 1) REMOTE ACCESS: TeamViewer, AnyDesk, Windows Remote Desktop, Chrome Remote Desktop - für Bildschirmzugriff und Steuerung, 2) KOMMUNIKATION: Teams, Zoom, Slack - für Voice/Video/Chat, 3) TICKETING: Jira Service Desk, Zendesk, ServiceNow - für Tracking, 4) DOKUMENTATION: Confluence, SharePoint - Wissensdatenbank, 5) MONITORING: Nagios, PRTG - System-Überwachung. Best Practice: Immer Kundenzustimmung einholen vor Remote-Zugriff!',
    difficulty: 'medium'
  },
  {
    category: 'Remote Support',
    question: 'Was ist ein Vorteil von Remote-Support gegenüber On-Site-Support?',
    options: [
      { text: 'Remote-Support kann alle Hardware-Defekte reparieren', isCorrect: false },
      { text: 'Schnellere Reaktion, keine Anfahrtszeit, Möglichkeit mehrere Issues parallel zu bearbeiten', isCorrect: true },
      { text: 'Remote-Support benötigt keine technischen Kenntnisse', isCorrect: false },
      { text: 'Remote-Support ist immer kostengünstiger unabhängig vom Problem', isCorrect: false }
    ],
    explanation: 'Remote Support bietet Effizienzvorteile, kann aber Limitierungen bei physischen Interaktionen haben. VORTEILE: 1) SCHNELLIGKEIT: Sofortiger Zugriff, keine Anfahrt (spart 30-60min), 2) EFFIZIENZ: Mehrere Kunden parallel betreuen, Screen-Sharing für klare Kommunikation, 3) KOSTEN: Keine Reisekosten, Zeitersparnis, 4) DOKUMENTATION: Session-Recordings, Screenshots. NACHTEILE: 1) Hardware-Probleme schwer diagnostizierbar, 2) Netzwerk-Abhängigkeit, 3) Sicherheitsrisiken, 4) Weniger persönlicher Kontakt. Faustregel: 80% der Probleme remote lösbar, 20% brauchen On-Site.',
    difficulty: 'medium'
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Verbindung zu MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Erfolgreich verbunden');

    // Clear existing questions and quizzes
    await Question.deleteMany({});
    await Quiz.deleteMany({});
    console.log('🗑️  Bestehende Fragen und Quizzes gelöscht');

    // Insert Module 117 questions
    const inserted117Questions = await Question.insertMany(module117Questions);
    console.log(`✅ ${inserted117Questions.length} Module 117 Fragen eingefügt`);

    // Insert Module 437 questions
    const insertedQuestions = await Question.insertMany(moduleQuestions);
    console.log(`✅ ${insertedQuestions.length} Module 437 Fragen eingefügt`);

    // === MODULE 437 MISSIONS / QUIZ GROUPS ===

    // Mission 1: Support-Anfragen bearbeiten
    const supportProcessQs = insertedQuestions.filter(q => q.category === 'Support Process');
    const mission1 = new Quiz({
      title: 'Mission 1: Support-Anfragen Bearbeiten',
      description: 'Beherrsche die Grundlagen der Support-Anfragenbearbeitung nach ITIL. Lerne wie man Incidents klassifiziert und dokumentiert.',
      category: 'Support Process',
      questions: supportProcessQs.map(q => q._id),
      timeLimit: 15,
      passingScore: 75
    });
    await mission1.save();
    console.log('📋 Mission 1 erstellt: Support-Anfragen Bearbeiten');

    // Mission 2: Kommunikation im Support
    const communicationQs = insertedQuestions.filter(q => q.category === 'Communication');
    const mission2 = new Quiz({
      title: 'Mission 2: Kommunikation im Support',
      description: 'Verbessere deine Kommunikationsfähigkeiten im IT-Support. Verstehe das Schulz von Thun Modell und professionelle Kundeninteraktion.',
      category: 'Communication',
      questions: communicationQs.map(q => q._id),
      timeLimit: 20,
      passingScore: 75
    });
    await mission2.save();
    console.log('💬 Mission 2 erstellt: Kommunikation im Support');

    // Mission 3: Support-Levels & Eskalation
    const supportLevelQs = insertedQuestions.filter(q => q.category === 'Support Levels');
    const ticketingQs = insertedQuestions.filter(q => q.category === 'Ticketing & Documentation');
    const mission3 = new Quiz({
      title: 'Mission 3: Support-Hierarchie & Eskalation',
      description: 'Lerne die Support-Level-Struktur und wann Tickets eskaliert werden müssen. Verstehe die Bedeutung von Dokumentation.',
      category: 'Support Levels',
      questions: [...supportLevelQs, ...ticketingQs].map(q => q._id),
      timeLimit: 20,
      passingScore: 75
    });
    await mission3.save();
    console.log('📈 Mission 3 erstellt: Support-Hierarchie & Eskalation');

    // Mission 4: Troubleshooting & Problemlösung
    const troubleshootingQs = insertedQuestions.filter(q => q.category === 'Troubleshooting');
    const mission4 = new Quiz({
      title: 'Mission 4: Troubleshooting & Problemlösung',
      description: 'Meistere systematische Fehlersuche und Problemlösungsmethoden. Lerne wie man Probleme effizient isoliert und behebt.',
      category: 'Troubleshooting',
      questions: troubleshootingQs.map(q => q._id),
      timeLimit: 25,
      passingScore: 75
    });
    await mission4.save();
    console.log('🔧 Mission 4 erstellt: Troubleshooting & Problemlösung');

    // Mission 5: Incident Management
    const incidentQs = insertedQuestions.filter(q => q.category === 'Incident Management');
    const mission5 = new Quiz({
      title: 'Mission 5: Incident Management',
      description: 'Verstehe Severity vs Priority, Klassifizierung und SLAs. Lerne professionelles Incident Management nach ITIL.',
      category: 'Incident Management',
      questions: incidentQs.map(q => q._id),
      timeLimit: 20,
      passingScore: 75
    });
    await mission5.save();
    console.log('🚨 Mission 5 erstellt: Incident Management');

    // Mission 6: Betrieb & Wartung
    const customerServiceQs = insertedQuestions.filter(q => q.category === 'Customer Service');
    const remoteQs = insertedQuestions.filter(q => q.category === 'Remote Support');
    const mission6 = new Quiz({
      title: 'Mission 6: IT-Betrieb & Wartung',
      description: 'Lerne vorbeugende Wartung, Remote Support und Geschäftskontinuität. Verstehe professionelle IT-Operationen.',
      category: 'Customer Service',
      questions: [...customerServiceQs, ...remoteQs].map(q => q._id),
      timeLimit: 20,
      passingScore: 75
    });
    await mission6.save();
    console.log('⚙️  Mission 6 erstellt: IT-Betrieb & Wartung');

    // Final Exam: Module 437 Komplett
    const allQs = insertedQuestions;
    const finalExam = new Quiz({
      title: '🏆 Modul 437 Prüfung: Im Support arbeiten',
      description: 'Die komplette Module 437 Abschlussprüfung! Teste dein gesamtes Wissen über IT-Support und Betrieb nach dem Swiss ICT EFZ Standard.',
      category: 'Comprehensive',
      questions: allQs.map(q => q._id),
      timeLimit: 60,
      passingScore: 80,
      isComprehensive: true // Mark as comprehensive exam for Swiss grading
    });
    await finalExam.save();
    console.log('🏆 Abschlussprüfung erstellt: Modul 437 Komplett (mit Schweizer Notensystem)');

    // === MODULE 117 QUIZZES ===
    
    // Module 117 Quiz 1: Network Fundamentals
    const network117Qs = inserted117Questions.filter(q => 
      q.category === 'Network Planning' || q.category === 'Switching' || q.category === 'VLANs'
    );
    const quiz117_1 = new Quiz({
      title: '🌐 Modul 117: Netzwerk-Grundlagen & Planung',
      description: 'Meistere IP-Adressierung, Subnetting, VLANs und Switch-Konfiguration für kleine Unternehmen.',
      category: 'Network Planning',
      questions: network117Qs.map(q => q._id),
      timeLimit: 25,
      passingScore: 75
    });
    await quiz117_1.save();
    console.log('🌐 Modul 117 Quiz 1 erstellt: Netzwerk-Grundlagen & Planung');

    // Module 117 Quiz 2: Services & Infrastructure
    const services117Qs = inserted117Questions.filter(q => 
      q.category === 'DHCP' || q.category === 'DNS' || q.category === 'IP Management' || q.category === 'Routing'
    );
    const quiz117_2 = new Quiz({
      title: '⚙️ Modul 117: Netzwerkdienste & Routing',
      description: 'Lerne DHCP, DNS, IP-Management und Routing-Grundlagen für Unternehmens-Netzwerke.',
      category: 'Network Services',
      questions: services117Qs.map(q => q._id),
      timeLimit: 30,
      passingScore: 75
    });
    await quiz117_2.save();
    console.log('⚙️ Modul 117 Quiz 2 erstellt: Netzwerkdienste & Routing');

    // Module 117 Quiz 3: Security & Wireless
    const security117Qs = inserted117Questions.filter(q => 
      q.category === 'Wireless' || q.category === 'Security' || q.category === 'Backup'
    );
    const quiz117_3 = new Quiz({
      title: '🔒 Modul 117: WLAN, Sicherheit & Backup',
      description: 'Verstehe WLAN-Sicherheit, Netzwerk-Schutzmaßnahmen und Backup-Strategien für KMUs.',
      category: 'Network Security',
      questions: security117Qs.map(q => q._id),
      timeLimit: 25,
      passingScore: 75
    });
    await quiz117_3.save();
    console.log('🔒 Modul 117 Quiz 3 erstellt: WLAN, Sicherheit & Backup');

    // Module 117 Final Exam
    const all117Qs = inserted117Questions;
    const finalExam117 = new Quiz({
      title: '🏆 Modul 117 Prüfung: Netzinfrastruktur für KMU',
      description: 'Die komplette Module 117 Abschlussprüfung! Teste dein gesamtes Wissen über Netzwerkplanung, -implementierung und -sicherheit.',
      category: 'Comprehensive',
      questions: all117Qs.map(q => q._id),
      timeLimit: 45,
      passingScore: 80,
      isComprehensive: true
    });
    await finalExam117.save();
    console.log('🏆 Abschlussprüfung erstellt: Modul 117 Komplett (mit Schweizer Notensystem)');

    console.log('\n=== 📊 Seed Zusammenfassung ===');
    console.log(`✅ ${inserted117Questions.length} Module 117 Fragen eingefügt`);
    console.log(`✅ ${insertedQuestions.length} Module 437 Fragen eingefügt`);
    console.log('✅ 11 Quizzes/Missions erstellt (7x M437 + 4x M117)');
    console.log('✅ Module 437 - Im Support arbeiten (6 Handlungsziele)');
    console.log('✅ Module 117 - Netzinfrastruktur für KMU (Advanced)');
    console.log('✅ Swiss ICT EFZ Standard-Inhalte');
    console.log('========================\n');

    // Seed admin user
    // ⚠️ SECURITY WARNING: This creates a default admin account for development only
    // Password: admin123456 - MUST be changed immediately in production!
    // See SECURITY.md for details
    console.log('Creating admin user...');
    const adminEmail = 'admin@module437.test';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: adminEmail,
        password: 'admin123456',
        isAdmin: true
      });
      await adminUser.save();
      console.log('✅ Admin user created: admin@module437.test / admin123456');
      console.log('⚠️  WARNING: Change this password immediately! See SECURITY.md');
    } else {
      console.log('✅ Admin user already exists');
    }
    
  } catch (error) {
    console.error('❌ Fehler beim Seed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Datenbankverbindung geschlossen');
  }
}

// Run the seeding script
seedDatabase();
