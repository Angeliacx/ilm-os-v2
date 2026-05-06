const ILM_DATA = {
  notionRoot: {
    title: "ILM - Agency OS",
    id: "3377b2136958815ea26cc183973a37e0",
    url: "https://www.notion.so/ILM-Agency-OS-3377b2136958815ea26cc183973a37e0?assetsVersion=23.13.20260506.0609&cookie_sync_completed=true"
  },
  notionPages: [
    ["Dashboard CEO", "3377b213695881369426d12679b06dee"],
    ["Vanessa", "3377b213695881b2b8aef95e825929dd"],
    ["Olesia", "3377b213695881b78e7fe93014522dc4"],
    ["Juliette", "3377b213695881118247c7a26b2020e5"],
    ["Equipe & Ressources", "3377b213695881e99da3c1a853c936c6"],
    ["Process & Guides", "3377b213695881f58c42e0b7dcf2774f"],
    ["Roles, Missions & KPIs", "3377b2136958812d8e7bf834eba0a07c"],
    ["Ned - Espace Operationnel", "3397b2136958810c8c17dce33889686c"],
    ["Onboarding Process", "3387b2136958810f954de1ff6b3739b0"],
    ["Planning & Taches (DB)", "f623aa0233b2469ba7152e52665bc2f1"],
    ["Budget & Comptabilite", "3397b213695881f483d3d31a96c5966c"],
    ["Marvin - Fiche", "33d7b2136958811c8ea5f9ce4dddaaca"],
    ["Koce - Fiche", "33d7b2136958818eb4f5c4cb26582151"],
    ["Louis - Fiche", "33d7b21369588175a305d7982ce5fb56"],
    ["Deadlines Avril 2026", "33d7b213695881c48fb8c9f071972535"],
    ["Recaps Hebdomadaires", "33d7b213695881ff8089d84d9355c990"]
  ],
  databases: [
    {
      name: "DB Suivi Modeles",
      id: "30d7b213695880cb8840e4690d9736bc",
      source: "collection://30d7b213-6958-81b6-85a8-000be61edbf9",
      columns: ["Name", "Statut", "Manager", "Revenue MTD", "IG Principal", "MYM", "Nb Comptes IG", "Niche", "Onboarding %", "OnlyFans", "TikTok", "Type", "Urgence"]
    }
  ],
  connections: [
    {
      name: "Notion ILM",
      owner: "Jordan",
      status: "Blocked",
      priority: "High",
      purpose: "Lire la page Agency OS, synchroniser les missions et reutiliser les bases existantes.",
      next: "Installer ChatGPT/Notion MCP dans Notion puis partager la page ILM Agency OS avec la connexion."
    },
    {
      name: "Instagram / Meta",
      owner: "Jordan",
      status: "To configure",
      priority: "High",
      purpose: "Recuperer followers, reach, impressions, reels performants et evolution des comptes.",
      next: "Verifier que les comptes IG sont en Business/Creator et relies a Meta Business."
    },
    {
      name: "TikTok",
      owner: "Team",
      status: "To configure",
      priority: "Medium",
      purpose: "Suivre publications, vues, formats gagnants et repost des reels IG.",
      next: "Lister les comptes prioritaires et choisir entre suivi manuel, export ou API TikTok."
    },
    {
      name: "Telegram Vanessa",
      owner: "Jordan",
      status: "Ready to plan",
      priority: "High",
      purpose: "Piloter le funnel Telegram et automatiser une fois les 20 videos pretes.",
      next: "Valider le bot, le canal, la structure des posts et les liens de tracking."
    },
    {
      name: "OnlyFans / MYM",
      owner: "Marvin",
      status: "Manual first",
      priority: "High",
      purpose: "Suivre revenus, abonnes, PPV, contenu importe et plateformes de vente.",
      next: "Demarrer avec saisie/export manuel, puis verifier les outils tiers fiables."
    },
    {
      name: "Substy / Unly",
      owner: "Jordan",
      status: "In progress",
      priority: "High",
      purpose: "Tester comprehension contenu, descriptions, PPV logic et catalogue.",
      next: "Noter les scripts, les contenus importes et les resultats des tests."
    },
    {
      name: "X / Influence",
      owner: "Team",
      status: "To do",
      priority: "Medium",
      purpose: "Ouvrir un canal d'acquisition supplementaire et chercher agences d'influence.",
      next: "Definir comptes, format de posts, tracking links et rythme de test."
    },
    {
      name: "Vercel / Domaines",
      owner: "Jordan",
      status: "Live",
      priority: "High",
      purpose: "Heberger ILM OS, proteger l'acces et preparer les deeplinks propres.",
      next: "Choisir le domaine Vanessa et ajouter les mots de passe equipe."
    }
  ],
  kpiBlueprints: [
    {
      model: "Vanessa",
      owner: "Jordan + Sophie + Marvin",
      focus: "Relance, revenus MYM/OF, Telegram, TikTok et comptes US.",
      metrics: [
        ["Revenue MTD", "A renseigner"],
        ["MYM import", "A faire"],
        ["Telegram videos", "0 / 20"],
        ["TikTok daily repost", "A lancer"],
        ["Buzz reels", "A produire"]
      ]
    },
    {
      model: "Juliette",
      owner: "Louis + Jordan",
      focus: "Positionnement Arthemys, IA, Unly, OF/MYM et branding biker girl.",
      metrics: [
        ["Unly", "Complet"],
        ["RDV", "19h30"],
        ["IA strategy", "Jeudi"],
        ["OF n2", "A certifier"],
        ["Banner + PP", "A briefer"]
      ]
    },
    {
      model: "Olesia",
      owner: "Ned + Jordan",
      focus: "Niche, warm-up IG, reels, onboarding et validation des comptes.",
      metrics: [
        ["Niche", "A definir"],
        ["IG comptes", "2 connus"],
        ["Warm-up", "A suivre"],
        ["Reels", "A produire"],
        ["OF/MYM", "Pas encore"]
      ]
    }
  ],
  models: [
    {
      name: "Vanessa",
      alias: "Madame Vanessa / Sophie Banks",
      status: "Active",
      progress: 90,
      type: "Face visible",
      niche: "Lifestyle / Mode / Glamour",
      manager: "Sophie + Jordan",
      color: "green",
      image: "/assets/models/vanessa.jpeg",
      platforms: ["IG 11 comptes", "OF actif", "MYM pret"],
      principal: "Madamevanessaoff (35k)",
      instagram: [
        { label: "mme_vanessaa", url: "https://www.instagram.com/mme_vanessaa/" },
        { label: "queenvanessa_off", url: "https://www.instagram.com/queenvanessa_off/" },
        { label: "queenvanessaoff", url: "https://www.instagram.com/queenvanessaoff/" },
        { label: "vanessaspicyyy", url: "https://www.instagram.com/vanessaspicyyy/" },
        { label: "madamevanessaoff", url: "https://www.instagram.com/madamevanessaoff/" }
      ],
      revenueLinks: [
        { type: "OnlyFans", label: "madamevanessaoff", url: "https://onlyfans.com/madamevanessaoff" },
        { type: "MYM", label: "Sophiebanks", url: "https://mym.fans/Sophiebanks" },
        { type: "Website", label: "mmevanessa.com", url: "https://www.mmevanessa.com/" },
        { type: "Telegram", label: "Canal Vanessa", url: "https://t.me/+KfrNnp3lETU4OWY8" }
      ],
      risks: ["Queenvanessa_off restreint", "Vacances 18-26 avril"],
      tasks: ["MYM quotidien", "Repartition MYM/OF", "Skrill MYM", "Lives", "Contenu avant 18/04", "Lien Sophie sur MYM"]
    },
    {
      name: "Olesia",
      status: "Onboarding",
      progress: 20,
      type: "Face visible",
      niche: "A trouver",
      manager: "Ned",
      color: "yellow",
      image: "/assets/models/olesia.jpg",
      persona: "Spirituelle, artistique, voyageuse, yoga, pas mainstream, ukrainienne a Zurich.",
      platforms: ["IG 3 comptes", "OF/MYM pas encore"],
      principal: "liabunnyy / second compte a confirmer",
      instagram: [
        { label: "liabunnyy", url: "https://www.instagram.com/liabunnyy/" },
        { label: "emmyjoliie", url: "https://www.instagram.com/emmyjoliie/" }
      ],
      risks: ["Niche a definir", "Comptes a voir avec Julien"],
      tasks: ["Niche", "Reels", "IG a jour", "OF Infloww", "Verifier comptes"]
    },
    {
      name: "Juliette",
      alias: "Arthemys",
      status: "Onboarding",
      progress: 10,
      type: "No face",
      niche: "Biker girl mysterieuse + boudoir",
      manager: "Louis + Jordan",
      color: "yellow",
      image: "/assets/models/juliette.jpg",
      persona: "Moto/casque, lingerie boudoir, lifestyle artistique, POV mystere. Ton flirty, doux, taquin.",
      platforms: ["IG a creer", "OF n2 a certifier", "IA visage"],
      principal: "arthybike / rideusearthy / vroomarthy",
      instagram: [
        { label: "arthybike", url: "https://www.instagram.com/arthybike/" },
        { label: "rideusearthy", url: "https://www.instagram.com/rideusearthy/" },
        { label: "vroomarthy", url: "https://www.instagram.com/vroomarthy/" }
      ],
      revenueLinks: [
        { type: "MYM", label: "Arthemisv4", url: "https://mym.fans/Arthemisv4" },
        { type: "OnlyFans", label: "arthyv4", url: "https://onlyfans.com/arthyv4" },
        { type: "OnlyFans 2", label: "arthemisv4", url: "https://onlyfans.com/arthemisv4" }
      ],
      risks: ["Contrats", "4 questions Louis", "Hard limit: pas de porno, pas de nu"],
      tasks: ["Questions Louis", "Drive", "OF n2 certifier", "Warm-up", "Feed", "Contrats"]
    }
  ],
  team: [
    ["Jordan", "CEO / Direction", "Tous", "iPhone 11 + iPhone 8"],
    ["Sophie", "Gestionnaire comptes", "Vanessa", "iPhone 13"],
    ["Marvin", "Resp. Chatting & Pole Media", "Toutes", "iPhone 13"],
    ["Ned", "Social media manager", "Olesia", "iPhone 13 PRO + Samsung"],
    ["Florian", "Operationnel", "Vanessa", "iPhone 15"],
    ["Koce", "Chatteur", "Toutes", "-"],
    ["Louis", "Resp. Pole IA", "Juliette", "-"]
  ],
  missions: {
    Marvin: ["Scripts chatting", "Planning chatteurs", "Remontees customs", "Retro-planning OF/MYM", "Infloww OF", "OFFMY MYM", "MYM Vanessa quotidien"],
    Koce: ["Chatting quotidien OF + MYM", "Suivi scripts Marvin", "Remontee customs"],
    Louis: ["Process IA", "Retouches et variantes", "Veille outils", "Manager Juliette"]
  },
  phones: [
    ["iPhone 11", "Jordan", "Vanessa", "~4"],
    ["iPhone 8", "Jordan", "Dispo", "0"],
    ["iPhone 13 Sophie", "Sophie", "Vanessa", "3"],
    ["iPhone 13 Marvin", "Marvin", "Vanessa", "2"],
    ["iPhone 13 PRO", "Ned", "Olesia", "2"],
    ["Samsung", "Ned", "Olesia", "3"],
    ["iPhone 15", "Florian", "Vanessa", "2"],
    ["Tel Koce", "Koce", "Libre", "0"]
  ],
  operationalTasks: [
    {
      id: "vanessa-telegram-mai",
      group: "Vanessa / Sophie Banks",
      title: "Telegram Mai",
      priority: "High",
      status: "To do",
      owner: "Vanessa",
      deadline: "Mai",
      summary: "Produire 20 videos courtes Telegram pour preparer l'automatisation par Jordan.",
      actions: [
        "Formats: miroir, outfit, routine, GRWM, mood of the day, small teaser.",
        "Concept: Tu choisis la Vanessa de demain.",
        "Jordan automatise Telegram une fois les videos pretes."
      ]
    },
    {
      id: "vanessa-tiktok-reposting",
      group: "Vanessa / Sophie Banks",
      title: "TikTok",
      priority: "High",
      status: "To do",
      owner: "Team",
      deadline: "Daily",
      summary: "Poster chaque jour sur TikTok les reels Instagram qui ont bien performe.",
      actions: [
        "Identifier les reels IG les plus performants.",
        "Reposter quotidiennement sur TikTok.",
        "Suivre les signaux de traction pour amplifier rapidement."
      ]
    },
    {
      id: "vanessa-ai-carousel",
      group: "Vanessa / Sophie Banks",
      title: "AI Carousel",
      priority: "Medium",
      status: "To do",
      owner: "Jordan",
      deadline: "Optional",
      summary: "Creer un carousel IA age 28 pour chercher du contenu Instagram viral.",
      actions: [
        "Selectionner 22 a 30 photos de Vanessa.",
        "Generer une version age 28 coherente.",
        "Monter un carousel Instagram oriente viralite."
      ]
    },
    {
      id: "vanessa-buzz-reels",
      group: "Vanessa / Sophie Banks",
      title: "Buzz Reels",
      priority: "High",
      status: "To do",
      owner: "Team",
      deadline: "ASAP",
      summary: "Recreer rapidement les reels suggestifs qui performent pour relancer Vanessa.",
      actions: [
        "Lister les concepts reels qui performent.",
        "Recreer vite les formats suggestifs compatibles IG/TikTok.",
        "Objectif: relance Vanessa et ouverture des comptes US."
      ]
    },
    {
      id: "vanessa-uncove",
      group: "Vanessa / Sophie Banks",
      title: "Uncove",
      priority: "Medium",
      status: "To do",
      owner: "Jordan",
      deadline: "Before confirmation",
      summary: "Reprendre le compte Uncove avec le bot @Sophie Banks.",
      actions: [
        "Verifier l'acces au compte Uncove.",
        "Controler le contrat avant de confirmer le montant exact du.",
        "Valider le bot @Sophie Banks seulement apres verification."
      ]
    },
    {
      id: "vanessa-substy-testing",
      group: "Vanessa / Sophie Banks",
      title: "Substy",
      priority: "High",
      status: "To do",
      owner: "Jordan",
      deadline: "ASAP",
      summary: "Lancer le test Substy et verifier la comprehension contenu + PPV.",
      actions: [
        "Ajouter des descriptions photo/video.",
        "Tester si le bot comprend le contenu.",
        "Verifier la logique PPV et les recommandations."
      ]
    },
    {
      id: "vanessa-ppv-outside-of",
      group: "Vanessa / Sophie Banks",
      title: "PPV outside OF",
      priority: "Medium",
      status: "To do",
      owner: "Marvin",
      deadline: "Optional",
      summary: "Structurer un systeme PPV hors OnlyFans depuis Telegram, Instagram et Substy.",
      actions: [
        "Definir plateforme, pricing, paiement et livraison.",
        "Construire le funnel depuis Telegram/Instagram/Substy.",
        "Documenter le process pour execution par l'equipe."
      ]
    }
  ],
  dailyOps: {
    date: "2026-05-06",
    doneToday: [
      {
        title: "Louis - implementation IA avancee",
        owner: "Louis",
        area: "IA",
        summary: "Avance de l'implementation IA. A revoir jeudi pour juger le rendu."
      },
      {
        title: "Strategie preparee pour jeudi",
        owner: "Jordan",
        area: "Direction",
        summary: "Strategie a montrer jeudi."
      },
      {
        title: "Acces Drive ouverts",
        owner: "Jordan",
        area: "Drive",
        summary: "Droits donnes pour acceder a Instagram, OF, TikTok et Threads."
      },
      {
        title: "Unly Sophie lance",
        owner: "Jordan",
        area: "Sophie",
        summary: "Unly prepare pour Sophie afin de voir le rendu demain."
      },
      {
        title: "Contenu Juliette mis dans le Drive",
        owner: "Jordan",
        area: "Juliette",
        summary: "Action faite a la place de Marvin car il etait parti."
      },
      {
        title: "Infloww mis en route",
        owner: "Team",
        area: "Operations",
        summary: "Infloww est active."
      },
      {
        title: "Unly Juliette alimente",
        owner: "Jordan",
        area: "Juliette",
        summary: "Unly est complet. Tout le contenu MYM a ete importe sur Unly."
      },
      {
        title: "Substy Sophie alimente",
        owner: "Jordan",
        area: "Sophie",
        summary: "Substy contient deux scripts: Rose Veloute et Red Lion."
      },
      {
        title: "Comptabilite Sophie encaissee",
        owner: "Sophie",
        area: "Comptabilite",
        summary: "Sophie a recu ses sous sur les 1318 dollars. Reste Marvin a traiter."
      }
    ],
    nextTasks: [
      {
        id: "ops-vanessa-mym-content-tonight",
        group: "Daily Ops",
        title: "Mettre tout Vanessa sur MYM",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Ce soir",
        summary: "Travail prioritaire du soir: importer et ranger tout le contenu Vanessa sur MYM.",
        actions: ["Verifier les medias Vanessa.", "Importer sur MYM.", "Controler titres, descriptions et rangement."]
      },
      {
        id: "ops-juliette-rdv",
        group: "Daily Ops",
        title: "RDV Juliette",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain 19h30",
        summary: "Rendez-vous Juliette a 19h30.",
        actions: ["Preparer les points Unly, bannieres, PP et avance IA avant le rendez-vous."]
      },
      {
        id: "ops-unly-juliette-account",
        group: "Daily Ops",
        title: "Unly Juliette - compte",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain",
        summary: "Utiliser le compte jyoravers@gmail.com pour Unly Juliette.",
        actions: ["Verifier l'acces.", "Controler que le contenu importe est bien range."]
      },
      {
        id: "ops-unly-sophie-account",
        group: "Daily Ops",
        title: "Unly Sophie - compte",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain",
        summary: "Utiliser le compte jordancalas99@gmail.com pour Unly Sophie.",
        actions: ["Importer les contenus Sophie depuis MYM.", "Mettre en place le nouveau code fait sur Codex."]
      },
      {
        id: "ops-sophie-mym-to-unly",
        group: "Daily Ops",
        title: "Importer Sophie MYM vers Unly",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain",
        summary: "Importer tous les contenus de Sophie sur MYM vers Unly.",
        actions: ["Verifier les medias.", "Ranger les contenus.", "Tester l'affichage avec le nouveau code."]
      },
      {
        id: "ops-juliette-banner-pp",
        group: "Daily Ops",
        title: "Banniere et PP Juliette",
        priority: "Medium",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain",
        summary: "Donner la banniere et la photo de profil a faire a Juliette.",
        actions: ["Preparer brief visuel.", "Valider format et usage."]
      },
      {
        id: "ops-x-launch",
        group: "Daily Ops",
        title: "Se mettre sur X",
        priority: "Medium",
        status: "To do",
        owner: "Team",
        deadline: "Demain",
        summary: "Commencer le travail sur X.",
        actions: ["Definir comptes prioritaires.", "Lister les formats a tester."]
      },
      {
        id: "ops-tax-declaration",
        group: "Daily Ops",
        title: "Declaration de revenu",
        priority: "High",
        status: "To do",
        owner: "Jordan",
        deadline: "Demain",
        summary: "Finir la declaration de revenu avec les papiers.",
        actions: ["Rassembler les papiers.", "Finaliser la declaration."]
      },
      {
        id: "ops-influence-agency",
        group: "Daily Ops",
        title: "Trouver une agence d'influence",
        priority: "Medium",
        status: "To do",
        owner: "Jordan",
        deadline: "Cette semaine",
        summary: "Chercher une agence d'influence utile pour ILM.",
        actions: ["Lister les options.", "Comparer offres, reseau, conditions."]
      },
      {
        id: "ops-domain-vercel",
        group: "Daily Ops",
        title: "Vercel + nom de domaine",
        priority: "High",
        status: "In progress",
        owner: "Jordan",
        deadline: "Cette semaine",
        summary: "Recreer un Vercel avec un nom de domaine propre.",
        actions: ["Finaliser le dashboard.", "Brancher le domaine.", "Verifier la protection par mot de passe."]
      },
      {
        id: "ops-elie-domain",
        group: "Daily Ops",
        title: "Affaire Elie + ilovemodels.fr",
        priority: "Medium",
        status: "To do",
        owner: "Jordan",
        deadline: "A partir du 12/05",
        summary: "Recuperer l'affaire Elie quand il revient le 12, puis recuperer ilovemodels.fr.",
        actions: ["Relancer Elie le 12.", "Verifier transfert ou recuperation du domaine."]
      },
      {
        id: "ops-marvin-payment",
        group: "Daily Ops",
        title: "Comptabilite Marvin",
        priority: "Medium",
        status: "To do",
        owner: "Jordan",
        deadline: "A confirmer",
        summary: "Traiter la part Marvin liee aux 1318 dollars Sophie quand la date de paiement est claire.",
        actions: ["Confirmer quand lui donner.", "Noter le montant exact.", "Marquer comme paye apres versement."]
      }
    ]
  },
  deeplinkDomains: [
    {
      name: "mmevanessa.com",
      status: "Unavailable",
      priority: "High",
      note: "Indisponible a l'achat au 06/05/2026. Ne pas bloquer le travail dessus ce soir."
    },
    {
      name: "mmevanessa.co",
      status: "Available",
      priority: "High",
      note: "Option simple et proche du nom voulu. Disponible cote Vercel a 17.99 dollars/an."
    },
    {
      name: "sophiebanks.co",
      status: "Available",
      priority: "High",
      note: "Option propre pour Sophie Banks. Disponible cote Vercel a 17.99 dollars/an."
    },
    {
      name: "mmevanessa.fr",
      status: "Available",
      priority: "Medium",
      note: "Semble disponible, mais prix non supporte par Vercel. A acheter hors Vercel si besoin."
    },
    {
      name: "sophiebanks.fr",
      status: "Available",
      priority: "Medium",
      note: "Semble disponible, mais prix non supporte par Vercel. Bon plan B francophone."
    }
  ],
  teamWorkspaces: [
    {
      name: "Jordan",
      role: "CEO / Direction",
      access: "ILM_PASSWORD",
      objective: "Piloter priorites, domaine, Notion, comptabilite et arbitrages.",
      tasks: ["Valider domaine deeplink Vanessa", "Publier les prochaines evolutions ILM OS", "Finaliser declaration de revenu"]
    },
    {
      name: "Louis",
      role: "Pole IA",
      access: "ILM_PASSWORD_LOUIS",
      objective: "Faire avancer IA Juliette et montrer la strategie jeudi.",
      tasks: ["Presenter avance IA jeudi", "Structurer Juliette IA", "Preparer process reutilisable"]
    },
    {
      name: "Vanessa",
      role: "Modele / contenu",
      access: "ILM_PASSWORD_VANESSA",
      objective: "Produire le contenu utile pour MYM, Telegram, TikTok et relance US.",
      tasks: ["20 videos Telegram", "Contenu MYM complet", "Formats Buzz Reels"]
    },
    {
      name: "Juliette",
      role: "Modele / Arthemys",
      access: "ILM_PASSWORD_JULIETTE",
      objective: "Avancer Unly, visuels, rendez-vous et positionnement biker girl.",
      tasks: ["RDV 19h30", "Banniere + PP", "Validation Unly"]
    },
    {
      name: "Marvin",
      role: "Chatting & Media",
      access: "ILM_PASSWORD_MARVIN",
      objective: "Structurer PPV, contenu, Infloww et suivi operations modeles.",
      tasks: ["PPV hors OF", "Comptabilite a confirmer", "Support contenu Vanessa/Juliette"]
    },
    {
      name: "Team",
      role: "Execution",
      access: "ILM_PASSWORD_TEAM",
      objective: "Executer les actions quotidiennes sans perdre les infos dans les notes.",
      tasks: ["TikTok reposting", "X launch", "Agence influence"]
    }
  ],
  accessMatrix: [
    {
      role: "Jordan",
      passwordEnv: "ILM_PASSWORD",
      scope: "Tout voir, arbitrer, publier, domaines, finances, connexions.",
      firstView: "Dashboard"
    },
    {
      role: "Louis",
      passwordEnv: "ILM_PASSWORD_LOUIS",
      scope: "Juliette, IA, process visuels, avance strategie jeudi.",
      firstView: "Equipe / Modeles"
    },
    {
      role: "Vanessa",
      passwordEnv: "ILM_PASSWORD_VANESSA",
      scope: "Missions Vanessa, contenus Telegram, MYM, TikTok, buzz reels.",
      firstView: "Dashboard"
    },
    {
      role: "Juliette",
      passwordEnv: "ILM_PASSWORD_JULIETTE",
      scope: "Missions Arthemys, RDV, Unly, bannieres, contenus a valider.",
      firstView: "Modeles"
    },
    {
      role: "Marvin",
      passwordEnv: "ILM_PASSWORD_MARVIN",
      scope: "Chatting, PPV, Infloww, MYM/OF, retro-planning contenu.",
      firstView: "Deadlines"
    },
    {
      role: "Team",
      passwordEnv: "ILM_PASSWORD_TEAM",
      scope: "Execution quotidienne, TikTok, X, agences, checklist operations.",
      firstView: "Dashboard"
    }
  ],
  recipes: [
    {
      title: "Notion ILM",
      goal: "Donner au dashboard une source operationnelle centrale.",
      status: "Bloque autorisation",
      owner: "Jordan",
      steps: [
        "Installer ChatGPT dans Notion MCP si le bouton Install apparait encore.",
        "Partager explicitement la page ILM Agency OS avec la connexion.",
        "Tester l'acces depuis Codex.",
        "Ensuite seulement: synchroniser pages, missions et DB Suivi Modeles."
      ]
    },
    {
      title: "Meta / Instagram",
      goal: "Faire remonter les KPI IG sans copier-coller manuel.",
      status: "A preparer",
      owner: "Jordan",
      steps: [
        "Passer les comptes prioritaires en Business ou Creator.",
        "Relier chaque IG a une page Facebook.",
        "Verifier Meta Business Manager.",
        "Creer ou autoriser une app Meta pour insights.",
        "Stocker META_ACCESS_TOKEN dans Vercel, jamais dans le code."
      ]
    },
    {
      title: "Telegram Vanessa",
      goal: "Transformer Telegram en funnel propre et mesurable.",
      status: "Pret a cadrer",
      owner: "Jordan",
      steps: [
        "Valider le canal Vanessa et le bot.",
        "Preparer les 20 videos Telegram.",
        "Definir les liens de tracking par source.",
        "Ajouter TELEGRAM_BOT_TOKEN dans Vercel si automatisation."
      ]
    },
    {
      title: "OF / MYM / PPV",
      goal: "Suivre revenus, PPV et contenu hors plateformes fragiles.",
      status: "Manuel d'abord",
      owner: "Marvin",
      steps: [
        "Demarrer avec saisie ou export hebdo.",
        "Lister les KPI: revenue MTD, abos, PPV, customs, contenu importe.",
        "Documenter le funnel hors OF.",
        "Eviter tout scraping risque tant qu'une solution fiable n'est pas validee."
      ]
    },
    {
      title: "Recette equipe",
      goal: "Donner demain des acces propres sans perdre le controle.",
      status: "A completer",
      owner: "Jordan",
      steps: [
        "Definir un mot de passe par role.",
        "Ajouter les variables Vercel ILM_PASSWORD_*.",
        "Tester chaque acces dans une fenetre privee.",
        "Donner a chacun uniquement son lien et son mot de passe."
      ]
    }
  ],
  deadlines: [
    ["2026-04-10", "MYM Vanessa + repartition MYM/OF", "Marvin", true],
    ["2026-04-10", "Questions Juliette casque, moto, IA, tenues", "Louis + Jordan", true],
    ["2026-04-11", "Niche Olesia", "Jordan + Ned", false],
    ["2026-04-11", "Emploi du temps chatteurs", "Marvin", false],
    ["2026-04-11", "Skrill MYM Vanessa", "Marvin", false],
    ["2026-04-12", "Questionnaire + Drive Juliette", "Juliette", false],
    ["2026-04-12", "Reels Olesia", "Ned", false],
    ["2026-04-12", "Scripts chatting Vanessa", "Marvin", false],
    ["2026-04-12", "Infloww tous OF", "Marvin", false],
    ["2026-04-14", "OF n2 Juliette certifier", "Jordan", false],
    ["2026-04-14", "OFFMY tous MYM", "Marvin", false],
    ["2026-04-14", "IG Olesia a jour", "Ned", false],
    ["2026-04-16", "Feed Juliette", "Louis", false],
    ["2026-04-16", "Retro-planning toutes modeles", "Marvin", false],
    ["2026-04-18", "Contenu Vanessa avant vacances", "Jordan", false],
    ["2026-04-18", "Vacances Marvin + Sophie / Vanessa jusqu'au 26/04", "-", false],
    ["Quotidien", "Alimenter MYM Vanessa", "Marvin", false]
  ],
  processes: [
    ["Warm-up TikTok", "7 jours, 10-25 min/jour. Camera TikTok sur les 5 premiers posts."],
    ["Warm-up Instagram", "J1 creation 4G, J2-3 confiance, J4 stories, J5 post+lien, S2 montee, S3-4 croissance."],
    ["Model Script Brief", "6 phases: intro, clothed tease, undressing, soft, masturbation, climax. 2-3 par semaine."],
    ["Regles IG", "0 hashtag interdit, 5-10 par post, max 20 follows/jour, max 30 likes/session, meme appareil et IP 2 semaines."],
    ["Formats", "Photo 1080x1350, story/reel 1080x1920, JPEG 85-95%, H.264 30fps+."]
  ]
};
