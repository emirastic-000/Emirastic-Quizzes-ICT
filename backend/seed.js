const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

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
    explanation: 'Nach ITIL ist ein Incident eine ungeplante Unterbrechung oder Reduktion der Qualität eines IT-Service. Dies ist ein zentrales Konzept in der IT-Service-Unterstützung.',
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
    explanation: 'Das Dokumentieren und Kategorisieren einer Support-Anfrage ist essentiell für Nachverfolgung, Eskalation und Wissensmanagement.',
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
    explanation: 'Ein vollständiges Ticket beinhaltet: Kundenkontakt, detaillierte Problembeschreibung, Systemumgebung, versuchte Lösungsschritte, Erfolg/Misserfolg und Zeitstempel.',
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
    explanation: 'Problem Management konzentriert sich auf die Wurzelursachenanalyse, um wiederkehrende Incidents zu reduzieren und die Systemverfügbarkeit zu verbessern.',
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
    explanation: 'Die Sachebene (faktische Information) ist das, was explizit kommuniziert wird. Die Beziehungsebene betrifft die Beziehung zwischen den Parteien.',
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
    explanation: 'Emotionale Intelligenz und Empathie sind Schlüsselkompetenzen im IT-Support für eine gute Kundenbeziehung.',
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
    explanation: 'Aktives Zuhören beinhaltet: volle Aufmerksamkeit, keine Unterbrechungen, Zusammenfassungen und Verständnisfragen stellen.',
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
    explanation: 'Offene Fragen ermöglichen dem Kunden, detaillierte Informationen zu geben, die für die Problemlösung essentiell sind.',
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
    explanation: 'Diese Strukturierung ermöglicht effiziente Eskalation komplexerer Probleme zu spezialisierten Teams.',
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
    explanation: 'Eskalation basiert auf Problemkomplexität und verfügbarem Wissen, nicht auf Zeit oder Kundenungeduld.',
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
    explanation: 'Systematische Dokumentation ist der Schlüssel zu reproduzierbaren und effizienten Lösungen.',
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
    explanation: 'Systematisches Troubleshooting reduziert die Zeit zur Problemidentifikation und verhindert unnötige Änderungen.',
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
    explanation: 'Mit einfachen Fragen beginnen (Netzwerkkennwort, Geräte-Einstellungen) bevor komplexere Maßnahmen getroffen werden.',
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
    explanation: 'Ein kritisches Problem (hohe Severity) kann niedrige Priority haben wenn es nur wenige Nutzer betrifft; umgekehrt kann ein kleines Problem hohe Priority haben.',
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
    explanation: 'SLAs definieren klare Erwartungen für Response- und Resolution-Zeiten basierend auf Severity.',
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
    explanation: 'Abschluss-Dokumentation und Kundenkommunikation sind essentiell für Zufriedenheit und Wissensverwaltung.',
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
    explanation: 'Vorbeugende Wartung reduziert unerwartete Ausfallzeiten und verlängert die Hardware-Lebensdauer.',
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
    explanation: 'Remote Support erfordert Koordination mehrerer Technologien für effektive Unterstützung.',
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
    explanation: 'Remote Support bietet Effizienzvorteile, kann aber Limitierungen bei physischen Interaktionen haben.',
    difficulty: 'medium'
  }
];

async function seedDatabase() {
  try {
    console.log('🔌 Verbindung zu MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Erfolgreich verbunden');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Bestehende Fragen gelöscht');

    // Insert questions
    const insertedQuestions = await Question.insertMany(moduleQuestions);
    console.log(`✅ ${insertedQuestions.length} Fragen eingefügt`);

    // Clear existing quizzes
    await Quiz.deleteMany({});

    // === MISSIONS / QUIZ GROUPS ===

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
      passingScore: 80
    });
    await finalExam.save();
    console.log('🏆 Abschlussprüfung erstellt: Modul 437 Komplett');

    console.log('\n=== 📊 Seed Zusammenfassung ===');
    console.log(`✅ ${insertedQuestions.length} Fragen eingefügt`);
    console.log('✅ 7 Quizzes/Missions erstellt');
    console.log('✅ Module 437 - Im Support arbeiten (6 Handlungsziele)');
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
