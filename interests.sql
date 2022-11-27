-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 04 juil. 2022 à 13:30
-- Version du serveur :  10.1.48-MariaDB-0+deb9u2
-- Version de PHP : 7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `socials`
--

-- --------------------------------------------------------

--
-- Structure de la table `interests`
--

CREATE TABLE `interests` (
  `id` int(11) NOT NULL,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `is_accepted` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `interests`
--

INSERT INTO `interests` (`id`, `name`, `description`, `is_accepted`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, '{\r\n\"name_en\": \"Business and Industry\",\r\n\"name_fr\": \"Affaires et industrie\",\r\n\"name_de\": \"Gewerbe und Industrie\",\r\n\"name_es\": \"negocios e industria\",\r\n\"name_ar\": \"التجارة والصناعة\",\r\n\"name_pt\": \"Negócios e indústria\",\r\n\"name_pl\": \"Biznes i przemysł\",\r\n\"name_nl\": \"Bedrijf en industrie\",\r\n\"name_fa\": \"تجارت و صنعت\",\r\n\"name_sv\": \"Näringsliv och industri\",\r\n\"name_fi\": \"Liiketoiminta ja teollisuus\",\r\n\"name_it\": \"Affari e industria\"\r\n}', '{\r\n\"name_en\": \"Business and Industry\",\r\n\"name_fr\": \"Affaires et industrie\",\r\n\"name_de\": \"Gewerbe und Industrie\",\r\n\"name_es\": \"negocios e industria\",\r\n\"name_ar\": \"التجارة والصناعة\",\r\n\"name_pt\": \"Negócios e indústria\",\r\n\"name_pl\": \"Biznes i przemysł\",\r\n\"name_nl\": \"Bedrijf en industrie\",\r\n\"name_fa\": \"تجارت و صنعت\",\r\n\"name_sv\": \"Näringsliv och industri\",\r\n\"name_fi\": \"Liiketoiminta ja teollisuus\",\r\n\"name_it\": \"Affari e industria\"\r\n}', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(2, '{\r\n  \"name_en\": \"Entertainment\",\r\n  \"name_fr\": \"Divertissement\",\r\n  \"name_de\": \"Unterhaltung\",\r\n  \"name_es\": \"Entretenimiento\",\r\n  \"name_ar\": \"وسائل الترفيه\",\r\n  \"name_pt\": \"Entretenimento\",\r\n  \"name_pl\": \"Zabawa\",\r\n  \"name_nl\": \"Amusement\",\r\n  \"name_fa\": \"سرگرمی\",\r\n  \"name_sv\": \"Underhållning\",\r\n  \"name_fi\": \"Viihde\",\r\n  \"name_it\": \"Divertimento\"\r\n  }', '{\r\n  \"name_en\": \"Entertainment\",\r\n  \"name_fr\": \"Divertissement\",\r\n  \"name_de\": \"Unterhaltung\",\r\n  \"name_es\": \"Entretenimiento\",\r\n  \"name_ar\": \"وسائل الترفيه\",\r\n  \"name_pt\": \"Entretenimento\",\r\n  \"name_pl\": \"Zabawa\",\r\n  \"name_nl\": \"Amusement\",\r\n  \"name_fa\": \"سرگرمی\",\r\n  \"name_sv\": \"Underhållning\",\r\n  \"name_fi\": \"Viihde\",\r\n  \"name_it\": \"Divertimento\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(3, '{\r\n  \"name_en\": \"Family and relationships\",\r\n  \"name_fr\": \"Famille et relations\",\r\n  \"name_de\": \"Familie und Beziehungen\",\r\n  \"name_es\": \"Familia y relaciones\",\r\n  \"name_ar\": \"الأسرة والعلاقات\",\r\n  \"name_pt\": \"Família e relacio namentos\",\r\n  \"name_pl\": \"Rodzina i związki\",\r\n  \"name_nl\": \"Familie en relaties\",\r\n  \"name_fa\": \"خانواده و روابط\",\r\n  \"name_sv\": \"Familj och relationer\",\r\n  \"name_fi\": \"Perhe ja ihmissuhteet\",\r\n  \"name_it\": \"Famiglia e relazioni\"\r\n  }', '{\r\n  \"name_en\": \"Family and relationships\",\r\n  \"name_fr\": \"Famille et relations\",\r\n  \"name_de\": \"Familie und Beziehungen\",\r\n  \"name_es\": \"Familia y relaciones\",\r\n  \"name_ar\": \"الأسرة والعلاقات\",\r\n  \"name_pt\": \"Família e relacio namentos\",\r\n  \"name_pl\": \"Rodzina i związki\",\r\n  \"name_nl\": \"Familie en relaties\",\r\n  \"name_fa\": \"خانواده و روابط\",\r\n  \"name_sv\": \"Familj och relationer\",\r\n  \"name_fi\": \"Perhe ja ihmissuhteet\",\r\n  \"name_it\": \"Famiglia e relazioni\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(4, '{\r\n  \"name_en\": \"Fitness and wellness\",\r\n  \"name_fr\": \"Fitness et bien-être\",\r\n  \"name_de\": \"Fitness und Wellness\",\r\n  \"name_es\": \"Fitness y bienestar\",\r\n  \"name_ar\": \"اللياقة والعافية\",\r\n  \"name_pt\": \"Fitness e bem-estar\",\r\n  \"name_pl\": \"Fitness i wellness\",\r\n  \"name_nl\": \"Fitness en welzijn\",\r\n  \"name_fa\": \"تناسب اندام و تندرستی\",\r\n  \"name_sv\": \"Fitness och friskvård\",\r\n  \"name_fi\": \"Kunto ja hyvinvointi\",\r\n  \"name_it\": \"Fitness e benessere\"\r\n  }', '{\r\n  \"name_en\": \"Fitness and wellness\",\r\n  \"name_fr\": \"Fitness et bien-être\",\r\n  \"name_de\": \"Fitness und Wellness\",\r\n  \"name_es\": \"Fitness y bienestar\",\r\n  \"name_ar\": \"اللياقة والعافية\",\r\n  \"name_pt\": \"Fitness e bem-estar\",\r\n  \"name_pl\": \"Fitness i wellness\",\r\n  \"name_nl\": \"Fitness en welzijn\",\r\n  \"name_fa\": \"تناسب اندام و تندرستی\",\r\n  \"name_sv\": \"Fitness och friskvård\",\r\n  \"name_fi\": \"Kunto ja hyvinvointi\",\r\n  \"name_it\": \"Fitness e benessere\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(5, '{\r\n  \"name_en\": \"Gastronomy\",\r\n  \"name_fr\": \"Gastronomie\",\r\n  \"name_de\": \"Gastronomie\",\r\n  \"name_es\": \"Gastronomía\",\r\n  \"name_ar\": \"فن الطهو\",\r\n  \"name_pt\": \"Gastronomia\",\r\n  \"name_pl\": \"Gastronomia\",\r\n  \"name_nl\": \"Gastronomie\",\r\n  \"name_fa\": \"غذا شناسی\",\r\n  \"name_sv\": \"Gastronomi\",\r\n  \"name_fi\": \"Gastronomia\",\r\n  \"name_it\": \"Gastronomia\"\r\n  }', '{\r\n  \"name_en\": \"Gastronomy\",\r\n  \"name_fr\": \"Gastronomie\",\r\n  \"name_de\": \"Gastronomie\",\r\n  \"name_es\": \"Gastronomía\",\r\n  \"name_ar\": \"فن الطهو\",\r\n  \"name_pt\": \"Gastronomia\",\r\n  \"name_pl\": \"Gastronomia\",\r\n  \"name_nl\": \"Gastronomie\",\r\n  \"name_fa\": \"غذا شناسی\",\r\n  \"name_sv\": \"Gastronomi\",\r\n  \"name_fi\": \"Gastronomia\",\r\n  \"name_it\": \"Gastronomia\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(6, '{\r\n  \"name_en\": \"Hobbies and activities\",\r\n  \"name_fr\": \"Loisirs et activités\",\r\n  \"name_de\": \"Hobbys und Aktivitäten\",\r\n  \"name_es\": \"pasatiempos y actividades\",\r\n  \"name_ar\": \"الهوايات والأنشطة\",\r\n  \"name_pt\": \"Passatempos e atividades\",\r\n  \"name_pl\": \"Hobby i zajęcia\",\r\n  \"name_nl\": \"Hobby\'s en activiteiten\",\r\n  \"name_fa\": \"سرگرمی ها و فعالیت ها\",\r\n  \"name_sv\": \"Hobbyer och aktiviteter\",\r\n  \"name_fi\": \"Harrastukset ja harrastukset\",\r\n  \"name_it\": \"Hobby e attività\"\r\n  }', '{\r\n  \"name_en\": \"Hobbies and activities\",\r\n  \"name_fr\": \"Loisirs et activités\",\r\n  \"name_de\": \"Hobbys und Aktivitäten\",\r\n  \"name_es\": \"pasatiempos y actividades\",\r\n  \"name_ar\": \"الهوايات والأنشطة\",\r\n  \"name_pt\": \"Passatempos e atividades\",\r\n  \"name_pl\": \"Hobby i zajęcia\",\r\n  \"name_nl\": \"Hobby\'s en activiteiten\",\r\n  \"name_fa\": \"سرگرمی ها و فعالیت ها\",\r\n  \"name_sv\": \"Hobbyer och aktiviteter\",\r\n  \"name_fi\": \"Harrastukset ja harrastukset\",\r\n  \"name_it\": \"Hobby e attività\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(7, '{\r\n  \"name_en\": \"Shopping and fashion\",\r\n  \"name_fr\": \"Shopping et mode\",\r\n  \"name_de\": \"Einkaufen und Mode\",\r\n  \"name_es\": \"compras y moda\",\r\n  \"name_ar\": \"التسوق والموضة\",\r\n  \"name_pt\": \"Compras e moda\",\r\n  \"name_pl\": \"Zakupy i moda\",\r\n  \"name_nl\": \"Winkelen en mode\",\r\n  \"name_fa\": \"خرید و مد\",\r\n  \"name_sv\": \"Shopping och mode\",\r\n  \"name_fi\": \"Ostoksia ja muotia\",\r\n  \"name_it\": \"Shopping e moda\"\r\n  }', '{\r\n  \"name_en\": \"Shopping and fashion\",\r\n  \"name_fr\": \"Shopping et mode\",\r\n  \"name_de\": \"Einkaufen und Mode\",\r\n  \"name_es\": \"compras y moda\",\r\n  \"name_ar\": \"التسوق والموضة\",\r\n  \"name_pt\": \"Compras e moda\",\r\n  \"name_pl\": \"Zakupy i moda\",\r\n  \"name_nl\": \"Winkelen en mode\",\r\n  \"name_far\": \"خرید و مد\",\r\n  \"name_sv\": \"Shopping och mode\",\r\n  \"name_fi\": \"Ostoksia ja muotia\",\r\n  \"name_it\": \"Shopping e moda\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(8, '{\r\n  \"name_en\": \"Sports and outdoor activities\",\r\n  \"name_fr\": \"Sports et activités d\'extérieur\",\r\n  \"name_de\": \"Sport und Outdoor-Aktivitäten\",\r\n  \"name_es\": \"Deportes y actividades al aire libre\",\r\n  \"name_ar\": \"الرياضة والأنشطة الخارجية\",\r\n  \"name_pt\": \"Esportes e atividades ao ar livre\",\r\n  \"name_pl\": \"Sport i zajęcia na świeżym powietrzu\",\r\n  \"name_nl\": \"Sport en buitenactiviteiten\",\r\n  \"name_fa\": \"ورزش و فعالیت در فضای باز\",\r\n  \"name_sv\": \"Sport och utomhusaktiviteter\",\r\n  \"name_fi\": \"Urheilu ja ulkoilu\",\r\n  \"name_it\": \"Sport e attività all\'aria aperta\"\r\n  }', '{\r\n  \"name_en\": \"Sports and outdoor activities\",\r\n  \"name_fr\": \"Sports et activités d\'extérieur\",\r\n  \"name_de\": \"Sport und Outdoor-Aktivitäten\",\r\n  \"name_es\": \"Deportes y actividades al aire libre\",\r\n  \"name_ar\": \"الرياضة والأنشطة الخارجية\",\r\n  \"name_pt\": \"Esportes e atividades ao ar livre\",\r\n  \"name_pl\": \"Sport i zajęcia na świeżym powietrzu\",\r\n  \"name_nl\": \"Sport en buitenactiviteiten\",\r\n  \"name_fa\": \"ورزش و فعالیت در فضای باز\",\r\n  \"name_sv\": \"Sport och utomhusaktiviteter\",\r\n  \"name_fi\": \"Urheilu ja ulkoilu\",\r\n  \"name_it\": \"Sport e attività all\'aria aperta\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(9, '{\r\n  \"name_en\": \"Technology\",\r\n  \"name_fr\": \"La technologie\",\r\n  \"name_de\": \"Technologie\",\r\n  \"name_es\": \"La tecnologia\",\r\n  \"name_ar\": \"التكنولوجيا\",\r\n  \"name_pt\": \"Tecnologia\",\r\n  \"name_pl\": \"Technologia\",\r\n  \"name_nl\": \"Technologie\",\r\n  \"name_fa\": \"فن آوری\",\r\n  \"name_sv\": \"Teknologi\",\r\n  \"name_fi\": \"Tekniikka\",\r\n  \"name_it\": \"Tecnologia\"\r\n  }', '{\r\n  \"name_en\": \"Technology\",\r\n  \"name_fr\": \"La technologie\",\r\n  \"name_de\": \"Technologie\",\r\n  \"name_es\": \"La tecnologia\",\r\n  \"name_ar\": \"التكنولوجيا\",\r\n  \"name_pt\": \"Tecnologia\",\r\n  \"name_pl\": \"Technologia\",\r\n  \"name_nl\": \"Technologie\",\r\n  \"name_fa\": \"فن آوری\",\r\n  \"name_sv\": \"Teknologi\",\r\n  \"name_fi\": \"Tekniikka\",\r\n  \"name_it\": \"Tecnologia\"\r\n  }', 1, 0, '2022-05-19 00:00:00', '2022-05-19 00:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
