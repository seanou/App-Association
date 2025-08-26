// This file uses server-side code.
'use server';

/**
 * @fileOverview Recommends associations based on user interests.
 *
 * - recommendAssociations - A function that recommends associations based on user interests.
 * - RecommendAssociationsInput - The input type for the recommendAssociations function.
 * - RecommendAssociationsOutput - The return type for the recommendAssociations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const associationData = `
## **ACCA - Association Communale de Chasse Agréée d'Allaire**
**Descriptif :** Chasse au gibier sédentaire et migrateurs, régulation des ESOD (sangliers, renards, etc.)
**Horaires :** Ouverture septembre à février selon arrêté préfectoral
**Contacts :** 
- Christian Deleter (Président) : 06 33 68 09 22 - christian.deleter@orange.fr
- René Pichon (Vice-président) : 06 74 46 93 57
- Mickaël Boulo (Trésorier) : 06 81 20 54 78

---

## **Action Sociale - Mobilité Solidaire**
**Descriptif :** Transport bénévole pour personnes en difficulté de mobilité
**Horaires :** Du lundi au vendredi (sauf exception)
**Contact :** 06 83 16 89 48
**Tarif :** 0,40€/km à partir du domicile de l'accompagnateur

---

## **ADMR d'Allaire et sa région**
**Descriptif :** Services d'aide à domicile (ménage, repas, aide aux personnes âgées/handicapées)
**Horaires :** Intervention 7j/7, secrétariat du lundi au vendredi
**Contacts :**
- Guy Viaud (Président) : 02 99 91 09 05
- Secrétariat : 02 99 71 85 77 - allaire@admr56.com
**Lieu :** 14 rue de la Libération, 56350 ALLAIRE

---

## **ALSH O'Merveilles**
**Descriptif :** Accueil de loisirs municipal pour enfants 3-11 ans
**Horaires :** 
- Centre : 9h-17h
- Garderie : 7h30-9h et 17h-18h30
**Contacts :** 
- Virginie Mangouëro ou Noémie Mahé : 02 99 71 86 08 / 06 59 71 68 26
- alsh@allaire.bzh
**Lieu :** Maison du Temps Libre, 6 rue Saint Hilaire

---

## **Alternatives Rôlistes**
**Descriptif :** Découverte et pratique du jeu de rôle dans un cadre inclusif
**Contact :** 06 19 37 02 42 - alternatives.rolistes@gmail.com
**Lieu :** Ludothèque

---

## **AMAP Bois**
**Descriptif :** Gestion durable des forêts locales, vente de bois via contrats AMAP
**Contact :** 06 95 34 49 88 - amap.allaire.bois@mailo.bzh

---

## **À ma Portée - AMAP paniers diversifiés**
**Descriptif :** Légumes, produits laitiers, pain, volailles, œufs bio et locaux
**Horaires :** Mercredi 18h30-19h30 (jeudi pour volaille mensuellement)
**Contacts :**
- Catherine Guillemot : 02 99 71 83 65 / 06 42 75 24 15
- Michaël Lefèvre : 06 08 52 00 85 - amaportee@gmail.com
**Lieu :** Bar associatif Au Bon Muscadet, Place de l'Église
**Adhésion :** 15€/an

---

## **À Corps Dansés**
**Descriptif :** Biodanza et Sophrodanse pour expression et bien-être
**Horaires :**
- Biodanza : Mardi 19h-21h30
- Sophrodanse : Jeudi tous les 15 jours 19h-20h30
**Contacts :**
- Manuela Bigot : 06 83 78 70 46 - manubigot.biodanza@gmail.com
- Audrey Duez (Secrétaire)
**Lieu :** Ferme de Coueslé
**Tarifs :** Biodanza 320€/an, Sophrodanse 160€/an

---

## **Les Amis de la moto d'Allaire**
**Descriptif :** Balades moto, visites, participation manifestations caritatives
**Contact :** Philippe Michelo : 06 60 74 26 52 - lesamisdelamotodallaire@gmail.com
**Tarif :** Carte membre 25€

---

## **ARNB - Association des Randonneurs Naturistes de Bretagne**
**Descriptif :** Randonnée naturiste, bowling, sorties en mer
**Horaires :** En journée (exceptés mercredi, week-end, jours fériés)
**Contacts :**
- Alain Cochet (Président)
- Patrice Chaudeur Mauriamé (Trésorier)
- contact@arnb.fr - arnb.fr

---

## **Association de conjoints survivants et parents d'orphelins du Morbihan**
**Descriptif :** Accueil et aide aux personnes frappées par le veuvage
**Horaires :** Permanences Vannes mardi & jeudi 14h-17h
**Contact :** 02 97 47 42 80 - asso.veuves56@orange.fr
**Lieu :** Maison de la Famille, 47 rue Ferdinand le Dressay, VANNES

---

## **Au Bon Muscadet**
**Descriptif :** Lieu de rencontre, concerts, théâtre, sessions, valorisation produits locaux
**Horaires :** Vendredi à partir de 16h30 (été) ou 18h (hiver)
**Contact :** aubonmus@gmail.com - aubonmuscadet.fr
**Lieu :** Place de l'Église
**Tarif :** Adhésion prix libre

---

## **Bouille de Môme**
**Descriptif :** Organisation concerts et événements culturels, Festival TouT VenanT
**Contact :** Jules Berthe : 06 38 81 10 51 - bouille2mome@yahoo.fr

---

## **CACHA - Comité d'Action Catholique et Humanitaire d'Allaire**
**Descriptif :** Collecte vieux papiers, journaux, cartons pour associations caritatives
**Contact :** Jean-Claude Dayon : 02 99 71 94 10
**Lieux collecte :** Presbytère & remorque Vaujouan (journaux), Vaujouan (cartons)

---

## **Centre Psychophonie Héliogramme**
**Descriptif :** Harmonie par le chant, pose de voix, formation humaine
**Horaires :** Jeudi 19h-21h à partir du 18 septembre 2025 (tous les 15 jours)
**Contacts :**
- Jeanne Le Gall (Vice-présidente)
- Solange Delbassée : 02 99 71 95 88 / 06 64 33 28 70
- centreheliogramme@orange.fr
**Lieu :** 171, les Charbonnais, Route de Deil

---

## **CLAC**
**Descriptif :** Accès culture et loisirs, activités variées enfants/adultes
**Horaires permanences :**
- Sept-oct : mardi, mercredi, jeudi 14h-17h30
- Nov-juin : mercredi 14h-17h30
**Contact :** 02 99 71 87 96 - contact@clacallaire.org
**Lieu :** Centre associatif, 19 rue de Redon
**Site :** www.clacallaire.org

### **Activités CLAC - Enfants :**
- **Baby Gym** (2-4 ans) : Lundi 17h-17h45, 75€/an
- **Gymnastique enfants** (4-12 ans) : Mercredi/Samedi selon âges, 75-80€/an
- **Art thérapie enfants-parents** (CP+) : Samedi 11h30-12h30, 95€
- **Sophrologie Enfant** (6-10 ans) : Jeudi 17h15-18h, 110€/an
- **Danse Hip-hop** (7+) : Lundi 18h-19h/19h-20h, 135€/an
- **Danse expression libre** (5-7 ans) : Mardi 17h-17h45, 135€/an
- **Danse improvisée** (8-12 ans) : Mardi 18h-19h, 150€/an
- **Improvisation théâtrale** (8+) : Mercredi 13h30-14h30/15h-16h30, 180-200€/an
- **Multisports** (5-10 ans) : Mercredi 13h30-14h30/15h-16h, 80€/an
- **Chorale Ramdam** (7+ et parents) : Samedi 10h-11h, 120-200€/an

### **Activités CLAC - Enfants et Adultes :**
- **Bande dessinée** (10+) : Mercredi 15h-17h, 187€/an
- **Dessin et peinture** (10+) : Lundi 17h-18h30/18h-20h, 150-200€/an
- **Couture** (12+) : Samedi 9h30-12h30/14h-17h, 200€/an
- **Badminton** (15+) : Jeudi dès 17h15, 35€/an

### **Activités CLAC - Adultes :**
- **Atelier d'écriture** (15+) : Jeudi 17h-19h, 60€/an
- **Sophrologie** (15+) : Jeudi 18h30-19h30, 130€/an
- **Art floral** : Mardi 14h-16h/20h-22h, 80€/an
- **Art thérapie** : Samedi 9h30-11h, 90€
- **Découverte des vins** : Mardi 20h-22h, 100€/an
- **Gymnastique douce** : Lundi 18h-19h/19h-20h, 80€/an
- **Vannerie** : Mardi selon calendrier, 150€/an
- **Pilates adapté** : Vendredi 18h-19h, 160€/an
- **Yoga** : Lundi/Mardi/Mercredi/Jeudi selon créneaux, 250€/an

### **Spect'allaire - Événements culturels :**
- Cinétoiles : 19 septembre 2025
- Festival Itinérances : 24-25 janvier 2026
- Mars à CLAC : 21 mars 2026
- Fête de la Bascule : 30-31 mai 2026

---

## **CLARA - Club de loisirs et d'animation des retraités d'Allaire**
**Descriptif :** Rencontres amicales, jeux, voyages, gymnastique pour retraités
**Activités régulières :**
- Jeux : 2ème et 4ème jeudis au Centre Associatif
- Danse, pétanque, cartes : mardis après-midi Ferme de Coueslé
- Gymnastique : mardi 10h-11h15 Salle Omnisports
- Marche : 2ème lundi du mois + lundis/jeudis 9h30-10h30
**Contacts :**
- Jean-Luc Duchesne (Président) : 02 99 71 82 89 / 06 33 48 13 69
- Christine Berthe (Secrétaire) : 06 61 59 32 07
**Adhésion :** 17€

---

## **Club Socios**
**Descriptif :** Organisation Trail des Jambes Allaire (courses enfants/adultes)
**Contact :** Yann Le Clouërec : 06 52 32 69 75 - organisation.trail.allaire@gmail.com
**Site :** traildesjambesallaire.fr

---

## **Club Saint Gaudence - Basketball**
**Descriptif :** 70 adhérents, 6 catégories U9 à seniors
**Horaires :** Jeunes mardi/mercredi/vendredi soir, Seniors vendredi soir
**Contact :** Léa Sérot : 07 82 79 17 31 - stgaudence.basket@gmail.com
**Lieu :** Salle Omnisports
**Tarif :** 80€ jeunes et seniors

---

## **Club Saint Gaudence - Pétanque**
**Descriptif :** Entraînements, concours, championnats, participation Téléthon
**Horaires :** Entraînements mardi/vendredi 14h-20h, concours samedi/dimanche
**Contacts :**
- Patrick Bavent (Président) : 06 15 09 28 64 - pavent@free.fr
- Hugues Le Chesne (Trésorier)
- Jean-Louis Revert (Secrétaire)
**Lieu :** Stade municipal
**Tarifs :** Licence 37€, Carte membre 22€

---

## **Club Saint Gaudence - Football**
**Descriptif :** École de foot, jeunes, seniors, sport loisirs
**Horaires :**
- Jeunes : entraînements mardi/mercredi/jeudi, matchs samedi
- Seniors : entraînements mercredi/vendredi, matchs dimanche
- Sport loisirs : matchs vendredi soir
**Contacts :**
- Damien Méhat (Président) : 06 64 92 58 85
- Gilles Launay (VP seniors) : 07 89 87 07 64
- Arnaud Tourneux (VP école foot) : 06 74 44 11 36
- Cyrille Goislard (VP GJPA) : 06 09 59 38 63
- Rémi Paris (Secrétaire) : 06 81 10 09 69
**Lieu :** Stade municipal
**Tarifs :** U6-U7: 75€, U8-U13: 85€, U14-U18: 90€, Seniors: 110€

---

## **Club Saint Gaudence - Club Cyclo VTT Marche**
**Descriptif :** Cyclotourisme, VTT, marche sans compétition
**Horaires :**
- Marche-VTT : Dimanche 8h30
- Cyclo : Dimanche matin (8h15/8h30/9h selon période)
**Contact :** Remy Potier : 06 73 92 34 77 - remy.potier1@orange.fr
**Lieu :** Terrain des sports
**Tarifs :** Licence FFVélo 54,50€ adultes/38€ -25ans, FFRandonnée 28,70€

---

## **Club Saint Gaudence - Judo Club d'Allaire**
**Descriptif :** Judo dès 4 ans, découverte self-défense/jujitsu/taiso
**Horaires :** Mardi/Jeudi selon catégories d'âge (17h30-20h30)
**Contacts :**
- Sophie Jan (Présidente) : 06 79 84 19 95 - judocluballaire@gmail.com
- Christelle Moudurier (Secrétaire)
- Pierre & Alexandre Hurtel (Trésoriers)
**Lieu :** Dojo Salle Omnisports
**Tarifs :** Baby: 142€, 2018-2011: 172€, 2010+: 192€ (+ 20€ hors Allaire)

---

## **Club Saint Gaudence - Tennis Club d'Allaire**
**Descriptif :** Tennis loisir/compétition, école de tennis dès 4 ans
**Horaires :**
- École tennis : Lundi 17h15-20h, Mercredi 16h15-19h45, Jeudi 17h30-18h45
- Adultes : Lundi 20h-21h45, Mardi 20h-21h45, Samedi 9h45-11h30
**Contacts :**
- Jean-Louis Torlay (Président) : 06 85 85 28 84
- Wendy Potier (Secrétaire) : tcallaire@gmail.com
- Mickaël Levallois (Trésorier) : 07 55 59 42 33
**Lieu :** Salle des sports
**Tarifs :** 110-180€ selon niveau

---

## **Comité d'animations maison de retraite d'Allaire**
**Descriptif :** Aide financière résidents pour événements et animations
**Contacts :**
- Chantal Mattera (Présidente) : 06 67 59 49 46
- Catherine Mignet (VP) : 02 99 71 87 53
**Lieu :** EHPAD, 5 rue des Bruyères

---

## **La Compagnie des Voix**
**Descriptif :** Ateliers expression orale/corporelle, spectacles voix
**Activités :**
- **Chant Trad DEDANS-DEHORS** : 1 mercredi/mois 18h-19h30, 80€+5€
- **Le P'tit Cabaret Sonné** : Week-end 15-16 novembre 2025
**Contacts :**
- Accompagnement : laciedesvoix@gmail.com
- Direction artistique : annegaelle.bzh@gmail.com / 06 60 65 02 22
**Lieu :** 260, Le Val de Vilaine / Bocquéreaux / Ferme de Coueslé

---

## **Conseil Municipal d'Enfants**
**Descriptif :** Dialogue adultes-enfants, projets communaux pour 9-11 ans
**Contacts :**
- Séverine Mahé (Adjointe enfance jeunesse)
- Virginie Mangouëro : 06 59 71 68 26 - vmangouerohercelin@allaire.bzh

---

## **Donneurs de sang de Saint-Jacut-les-Pins et sa région**
**Descriptif :** Organisation collectes Allaire, Saint-Jacut, Malansac, Peillac
**Contacts :**
- Jean-François Berthe (VP) : 02 56 24 99 11
- Jean-Paul Burban (VP) : 02 99 71 90 56
- Marie-Noëlle Ollivier (Secrétaire) : 02 99 91 35 74
- Hubert Nué (Trésorier) : 02 99 91 84 45

---

## **Dynamik'air**
**Descriptif :** Cross-training, kick boxing, aérokick
**Contact :** 07 83 29 66 78 - dynamikair35@gmail.com

---

## **Amicale école Renaudeau**
**Descriptif :** Récolte fonds projets pédagogiques, événements familiaux
**Événements :** Fun Allaire (22-23 nov), Noël, chasse œufs, vide grenier, fête école
**Contacts :**
- Maximilien Sourdril (Président) : 07 82 34 69 00
- Marie Duveau (Trésorière)
- Intissar Legal (Vice-trésorière)
- Antoine Martin (Secrétaire)

---

## **APEL - Collège Saint-Hilaire**
**Descriptif :** Parents bénévoles vie/animation collège, représentation instances
**Contacts :**
- Maryline Naël (Présidente) : 06 61 53 76 02
- Laurence Magré (Secrétaire)
- Michaël Morel (Trésorier)

---

## **APEL - École Sainte-Anne**
**Descriptif :** Parents bénévoles financement sorties/activités, animations
**Événements :** Belote octobre, marché Noël décembre, kermesse juin
**Contacts :**
- Nathalie Bourdiec (Présidente)
- Carole Noury-Ducasse (Secrétaire) : 06 42 89 30 10 - apel.ecole.allaire56@gmail.com
- Pascal Andrieux (Chef établissement) : 02 99 71 91 19
**Lieu :** 26 rue de Deil

---

## **École de Musique Traditionnelle**
**Descriptif :** Enseignement musique traditionnelle, transmission orale
**Horaires mercredi :** Éveil 16h30-17h15, Découverte 17h15-18h, cours instruments 14h30-21h
**Ateliers :** Pratique collective 18h-18h45, groupe ados après-midi, adultes 20h30
**Contact :** 02 99 71 36 50 - ecole@gcbpv.org - gcbpv.org
**Tarifs :** Éveil 90€, Découverte 140€, Instruments 310/350€, Ateliers 125€

---

## **Les Écuries du Petit Manoir**
**Descriptif :** Centre équestre, poneys-club, équi-handi, randonnées
**Horaires :** Mardi-vendredi 14h-18h pour infos
**Contact :** Sylvie Sigrist : 06 20 50 10 26
**Lieu :** 71 Séjourné

---

## **Équilibre et Bien-être**
**Descriptif :** Cours équilibre et mouvements doux pour seniors
**Horaires :** Mercredi 14h-15h30 (17 sept-24 juin)
**Contacts :**
- Myriam Charles (Présidente) : 02 99 71 90 97 - myriam-charles@orange.fr
- Yvette Ménager (Secrétaire) : 02 99 71 86 36
**Tarif :** 55€

---

## **Espace Jeunes**
**Descriptif :** Lieu rencontre 10+ ans, activités vacances
**Horaires :**
- Hors vacances : Mercredi/samedi 14h-18h30
- Vacances : Lundi-samedi 14h-18h30
**Contact :** Jean-François Lebel : 06 87 69 48 64 - jflebel@allaire.bzh
**Lieu :** 265 rue Saint Hilaire

---

## **La Fédé - Centre Social Intercommunal**
**Descriptif :** Animation enfance/jeunesse, famille/adulte, soutien parentalité
**Contact :** Alexia Fournel-Teigné : 02 99 71 99 11 - centre.social@lafede.fr
**Lieu :** 19 rue de Redon

---

## **La Fédé - Épicerie solidaire 'Graines d'Envies'**
**Descriptif :** Épicerie sociale, vestiboutique, ateliers
**Horaires :** 
- Épicerie : Lundi 14h-18h, Mardi 12h-18h
- Vestiboutique : Lundi 14h-18h, Mardi 12h-18h, Samedi 10h-12h
**Contacts :** 
- Émilie Gorska : 02 99 71 99 11 / 06 95 60 41 84
- grainesdenvies@lafede.fr
**Lieu :** 1 rue Le Mauff
`;

const RecommendAssociationsInputSchema = z.string();
export type RecommendAssociationsInput = z.infer<
  typeof RecommendAssociationsInputSchema
>;

const RecommendAssociationsOutputSchema = z.array(z.string()).describe("A list of association names that are recommended based on the user's interests.");
export type RecommendAssociationsOutput = z.infer<
  typeof RecommendAssociationsOutputSchema
>;

export async function recommendAssociations(
  interests: RecommendAssociationsInput
): Promise<RecommendAssociationsOutput> {
  const result = await recommendAssociationsFlow(interests);
  return result;
}

const recommendAssociationsPrompt = ai.definePrompt({
  name: 'recommendAssociationsPrompt',
  input: { schema: RecommendAssociationsInputSchema },
  output: { schema: RecommendAssociationsOutputSchema },
  prompt: `You are an expert at recommending local associations to people based on their interests.
You have access to a list of associations in the town of Allaire, France.
Your task is to analyze the user's interests and recommend a list of relevant associations from the provided data.
Only return the names of the associations. Do not return any other information.
If no associations match the user's interests, return an empty list.

User Interests: {{{json input}}}

Association Data:
${associationData}
`,
});


const recommendAssociationsFlow = ai.defineFlow(
  {
    name: 'recommendAssociationsFlow',
    inputSchema: RecommendAssociationsInputSchema,
    outputSchema: RecommendAssociationsOutputSchema,
  },
  async (interests) => {
    const { output } = await recommendAssociationsPrompt(interests);
    return output ?? [];
  }
);
